---
title: Receipt Capture
description: DefendableRouter v0.1 local receipt ledger — checksummed JSONL receipts written for every billable/lifecycle event. Checksummed, not hash-chained.
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
| `created_at` | ISO-8601 timestamp. |
| `checksum_sha256` | sha256 over the canonical JSON of all other fields. |

## Checksum algorithm

`checksum_sha256 = sha256( canonical_json(receipt without checksum) )`, where `canonical_json`
normalizes the payload and serializes deterministically:

- `Decimal` → 2-dp string (e.g. `"10.00"`)
- datetimes → `.isoformat()` (ISO-8601)
- `json.dumps(..., sort_keys=True, separators=(",", ":"), ensure_ascii=True)`
- the `checksum_sha256` field itself is **excluded** from the hashed payload

To verify a line: parse the JSON, drop `checksum_sha256`, recompute, and compare.

:::caution[Checksummed, NOT hash-chained]
Router receipts are **checksummed but NOT hash-chained**. Each line is **independently
verifiable** (its own sha256 over its own fields), but receipts are **not linked parent→child**.
This is different from the **DefendableCloud per-org hash chain**, where each receipt carries a
`parent_hash` linking it to the prior receipt and `/ledger/verify` validates the whole chain.
The router does not (yet) chain its receipts — say so honestly.
:::

## The twelve receipt types

`membership` · `dataset_access` · `compute_quote` · `compute_job` · `fine_tune_job` ·
`worker_registered` · `job_leased` · `worker_job_accepted` · `artifact_reported` ·
`worker_job_completed` · `worker_job_failed` · `lease_expired`

A job that is a `fine_tune` mints `fine_tune_job` receipts; all other job types mint `compute_job`
receipts. Lifecycle receipts (`job_leased`, `worker_job_accepted`, `worker_job_failed`,
`lease_expired`, `worker_registered`) carry `amount_usd` of `0.00`.

***

🐝 *Operator-grade · books and records · to the shed.*
