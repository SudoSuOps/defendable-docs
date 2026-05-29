---
title: DefendableLedger · Hash-Chain Format
description: The real per-org hash chain. Postgres-backed · org_seq + parent_hash + receipt_sha256 · recomputed server-side. Tamper-evident · in-house · no external anchor.
---

## The real chain — DefendableCloud, LIVE

The hash chain that exists today is the **DefendableCloud per-organization receipt chain**. It is backed by Postgres rows (table `receipts`), one row per minted receipt, and served at **api.defendablecloud.com**. There is no `/v1` prefix and no separate JSONL ledger file — the chain *is* the Postgres rows, ordered by `org_seq`.

## Receipt fields

Each receipt row carries:

```text
org_seq         int     sequential index, per org, starting at 0
parent_hash     str     prior receipt's receipt_sha256 (genesis parent = 64 zeros)
receipt_sha256  str     sha256_hex(orjson.dumps(payload, OPT_SORT_KEYS))
receipt_id      str     DCR-{org_seq:06d}-{hex8}
payload         json    the canonical receipt body that gets hashed
```

The `payload` is the canonical receipt body. It includes `org_seq` and `parent_hash` so the chain link is *inside* the hashed bytes — you cannot reorder or relink a receipt without changing its `receipt_sha256`.

## How `receipt_sha256` is computed

The cloud canonicalizer is orjson with sorted keys:

```python
# app/hashing.py
def canonical(obj):           # bytes
    return orjson.dumps(obj, option=orjson.OPT_SORT_KEYS)

def sha256_hex(data):         # hex digest
    return hashlib.sha256(data).hexdigest()
```

When a receipt is minted (`app/ledger.py · mint_receipt`):

1. Look up the org's last receipt to get `last.org_seq` and `last.receipt_sha256`.
2. `org_seq = last.org_seq + 1` (or `0` for the first receipt).
3. `parent_hash = last.receipt_sha256` (or `ZERO_HASH` = sixty-four zeros for genesis).
4. `receipt_id = f"DCR-{org_seq:06d}-{new_id()[:8]}"`.
5. Build the canonical `payload` (it embeds `org_seq` and `parent_hash`).
6. `receipt_sha256 = sha256_hex(canonical(payload))`.
7. Persist the row in Postgres.

## Artifact upload is best-effort

After the hash is computed, a JSON copy (`{...payload, receipt_sha256}`) and a rendered PDF are uploaded to Tigris (S3). That upload is wrapped in `try/except` and is **best-effort**:

```python
try:
    put_object(json_key, json_bytes, content_type="application/json")
    put_object(pdf_key,  pdf_bytes,  content_type="application/pdf")
except Exception:
    pass  # storage outage never blocks the receipt
```

The authoritative chain lives in Postgres. A storage outage degrades gracefully — the receipt and its chain link are already durable in the database.

## How the chain is verified

`GET /ledger/verify` (authenticated, scoped to the caller's org) walks the rows in `org_seq` order and recomputes everything server-side:

```python
# app/routes/public.py · verify_ledger
prev = ZERO_HASH
for i, r in enumerate(rows):                       # rows ordered by org_seq asc
    recomputed = sha256_hex(canonical(r.payload))
    if recomputed != r.receipt_sha256:
        errors.append({"org_seq": r.org_seq, "error": "hash mismatch"})
    if r.org_seq != i:
        errors.append({"org_seq": r.org_seq, "error": f"sequence gap (expected {i})"})
    if r.payload.get("parent_hash") != prev:
        errors.append({"org_seq": r.org_seq, "error": "broken parent link"})
    prev = r.receipt_sha256
return {"ok": len(errors) == 0, "receipts_checked": len(rows), "errors": errors[:20]}
```

Three checks per receipt: **hash recompute**, **sequential org_seq**, **parent link**. Tamper a stored payload and `ok` flips to `false`, pinpointing the offending `org_seq`. This recompute is server-side — not anonymous WebCrypto.

## Genesis link

The first receipt for any org has `org_seq = 0` and `parent_hash = "0" * 64` (the canonical `ZERO_HASH`). Every subsequent receipt's `parent_hash` equals the prior receipt's `receipt_sha256`.

## The router is checksummed-not-chained — a separate algorithm

Do **not** conflate the two. DefendableRouter (v0.1, local) writes flat receipts to `data/receipts/YYYY-MM-DD.receipts.jsonl`, one per line. Each carries a `checksum_sha256` computed by a **different canonicalizer**:

```python
# defendable_router/core/receipts.py
def canonical_json(payload):   # NOT orjson
    return json.dumps(_normalize(payload), sort_keys=True,
                      separators=(",", ":"), ensure_ascii=True)
# _normalize: Decimal -> "{:.2f}" str, datetime -> isoformat()

def checksum_receipt(payload_without_checksum):
    return hashlib.sha256(canonical_json(payload_without_checksum).encode()).hexdigest()
```

Router receipts are **per-line checksummed** (tamper-evident individually) but **not hash-chained** — there is no `parent_hash`, no `org_seq` link between lines. Two different rails, two different canonicalizers; this is not "one algorithm."

## Roadmap: a separate public JSONL ledger

:::note[Roadmap / not built]
A separate public, hash-chained `defendable_ledger.jsonl` (with `DLR-` ids and a `ledger_seq`) is still envisioned for the four-rails Deed pipeline, but **it does not exist today**. Do not treat `DLR-`, `ledger_seq`, or `record_sha256` as real fields — the real chain field is `receipt_sha256` on the cloud's Postgres receipts.
:::

***

🐝 *Per-org chain · org_seq + parent_hash + receipt_sha256 · books and records · to the shed.*
