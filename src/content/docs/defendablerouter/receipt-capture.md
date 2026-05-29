---
title: Receipt Capture
description: DefendableRouter v0.1 local receipt ledger — hash-chained JSONL receipts written for every billable/lifecycle event. Tamper-evident, like the Cloud.
---

:::note[Status — receipt capture (v0.1, CI-verified)]
The receipt ledger below is **real and verified in source** (`core/receipts.py`), CI green. It
writes to the **local filesystem** — the router is **not publicly deployed**.
:::

Every billable and lifecycle event mints a receipt. Receipts are appended, one per line, to a
daily JSONL ledger on local disk.

## Storage

```
data/receipts/YYYY-MM-DD.receipts.jsonl
```

One receipt per line (newline-delimited JSON). The directory is `core/config.py`'s
`receipts_dir` (default `./data/receipts`), created on first write.

## Receipt fields

| Field | Notes |
| --- | --- |
| `receipt_id` | `rcpt_{hex}` (uuid4 hex). |
| `receipt_type` | One of the types below. |
| `member_id` | The member the event bills/belongs to. |
| `job_id` | Job id, or `null`. |
| `dataset_ids` | List of dataset ids (may be empty). |
| `amount_usd` | Decimal serialized to a 2-dp string. |
| `metadata` | Free-form event context. |
| `seq` | Monotonic chain index, starting at `0` (the house chain). |
| `parent_hash` | The `checksum_sha256` of the prior receipt; genesis is 64 zeros. |
| `created_at` | ISO-8601 timestamp. |
| `checksum_sha256` | sha256 over the canonical JSON of all other fields (incl. `seq` + `parent_hash`). |

## Checksum algorithm

`checksum_sha256 = sha256( canonical_json(receipt without checksum) )`, where `canonical_json`
normalizes the payload and serializes deterministically:

- `Decimal` → 2-dp string (e.g. `"10.00"`)
- datetimes → `.isoformat()` (ISO-8601)
- `json.dumps(..., sort_keys=True, separators=(",", ":"), ensure_ascii=True)`
- the `checksum_sha256` field itself is **excluded** from the hashed payload

To verify a line: parse the JSON, drop `checksum_sha256`, recompute, and compare.

## Hash chain

Router receipts are **hash-chained**, mirroring the DefendableCloud per-org chain. Each receipt
carries a `seq` (monotonic from `0`) and a `parent_hash` equal to the prior receipt's
`checksum_sha256` — and because those two fields are inside the hashed body, the link is itself
tamper-evident. The genesis receipt's `parent_hash` is 64 zeros (`0000…0000`). The router keeps
**one house-wide chain** (single-tenant spine), where the Cloud keeps one chain per org.

Verify the whole chain:

- `GET /receipts` — the chain in `seq` order (coordinates only).
- `GET /receipts/verify` — recomputes every `checksum_sha256`, confirms `seq` runs `0,1,2,…` with
  no gaps, and confirms each `parent_hash` links to the prior receipt. Returns
  `{ ok, receipts_checked, errors }`.
- CLI: `defendable-router verify-ledger` (exit `0` if `ok`, `1` otherwise).

Tamper with any stored receipt and `/receipts/verify` flips `ok: false` and pinpoints the offending
`seq` — the same guarantee the Cloud's `/ledger/verify` gives.

## The twelve receipt types

`membership` · `dataset_access` · `compute_quote` · `compute_job` · `fine_tune_job` ·
`worker_registered` · `job_leased` · `worker_job_accepted` · `artifact_reported` ·
`worker_job_completed` · `worker_job_failed` · `lease_expired`

A job that is a `fine_tune` mints `fine_tune_job` receipts; all other job types mint `compute_job`
receipts. Lifecycle receipts (`job_leased`, `worker_job_accepted`, `worker_job_failed`,
`lease_expired`, `worker_registered`) carry `amount_usd` of `0.00`.

***

🐝 *Operator-grade · books and records · to the shed.*
