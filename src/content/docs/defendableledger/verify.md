---
title: DefendableLedger · Verify a Receipt
description: The real verification path. Cloud /ledger/verify recomputes the per-org chain server-side. Router receipts are per-line checksummed. Honest books and records.
---

## The real verification path

There are two real things to verify today, and they verify differently. Be precise about which one you have.

| surface | what it is | how it verifies |
|---|---|---|
| **DefendableCloud** (LIVE, api.defendablecloud.com) | per-org hash chain in Postgres | `GET /ledger/verify` — server-side recompute, authenticated |
| **DefendableRouter** (v0.1, local, not deployed) | flat checksummed receipts in JSONL | recompute `checksum_sha256` per line |

## Verify the cloud chain · `GET /ledger/verify`

The live, authoritative verifier is the cloud endpoint. It is **authenticated and server-side** — scoped to the caller's org, recomputed inside the API. It is *not* an anonymous client-side WebCrypto verifier.

```bash
curl -H "Authorization: Bearer $DC_API_KEY" \
  https://api.defendablecloud.com/ledger/verify
```

What it does (`app/routes/public.py · verify_ledger`):

1. Loads the org's receipts ordered by `org_seq` ascending.
2. For each receipt, recomputes `receipt_sha256 = sha256_hex(orjson.dumps(payload, OPT_SORT_KEYS))` and compares to the stored value.
3. Checks `org_seq == index` (no sequence gaps).
4. Checks `parent_hash` points at the prior receipt's `receipt_sha256` (genesis parent = sixty-four zeros).

Response shape:

```json
{
  "ok": true,
  "receipts_checked": 42,
  "errors": []
}
```

On tamper, `ok` flips to `false` and `errors[]` pinpoints the offending `org_seq`:

```json
{
  "ok": false,
  "receipts_checked": 42,
  "errors": [
    { "org_seq": 17, "error": "hash mismatch" }
  ]
}
```

Error kinds: `hash mismatch`, `sequence gap (expected N)`, `broken parent link`. (`errors[]` is capped at the first 20.)

## Verify a router receipt · `checksum_sha256`

DefendableRouter writes flat receipts to `data/receipts/YYYY-MM-DD.receipts.jsonl`, one per line. Each line carries a `checksum_sha256` over the canonical JSON of the receipt **excluding the checksum field itself**. These are **per-line checksummed, NOT hash-chained** — there is no `parent_hash`, no cross-line link.

The real canonicalizer (`defendable_router/core/receipts.py`):

```python
def canonical_json(payload):
    # _normalize: Decimal -> "{:.2f}" string, datetime -> isoformat()
    return json.dumps(_normalize(payload), sort_keys=True,
                      separators=(",", ":"), ensure_ascii=True)

def checksum_receipt(payload_without_checksum):
    return hashlib.sha256(canonical_json(payload_without_checksum).encode()).hexdigest()
```

To verify a router receipt by hand:

1. Take the receipt line, drop the `checksum_sha256` field.
2. Re-derive any `Decimal` as `"{:.2f}"` and any timestamp as ISO 8601.
3. Serialize with `sort_keys=True`, `separators=(",", ":")`, `ensure_ascii=True`.
4. `sha256` the UTF-8 bytes.
5. Compare to the stored `checksum_sha256`.

Note this is a **different canonicalizer** from the cloud's orjson `OPT_SORT_KEYS`. Do not assume one tool verifies both.

## Roadmap items

:::note[Roadmap / not built]
A router CLI verb (e.g. `defendablerouter ledger verify`), a shared `canonicalize.py` verifier path, and the public **defendableledger.com** `/records` + `/verify` WebCrypto pages are **design intent**, not shipped. The non-existent `defendablerouter receipt verify --run`, `canonical_receipt_sha256`, `manifest_sha256`, and `SHA256SUMS.txt` flows are not part of the real codebase. The authoritative verifier today is the cloud's `GET /ledger/verify`.
:::

***

🐝 *Recompute the hash · check the chain · books and records · to the shed.*
