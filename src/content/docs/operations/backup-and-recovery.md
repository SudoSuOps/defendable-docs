---
title: Backup and Recovery
description: Verified durability — Postgres system of record, per-org receipt hash chain, best-effort Tigris artifacts, and local router JSONL receipts.
---

Durability built on what actually exists: a Postgres system of record and a verifiable receipt hash chain.

## DefendableCloud

**Postgres is the system of record.** Every receipt and the chain that links them is persisted in Postgres, so a storage outage never blocks a receipt.

Receipts form a **per-org hash chain**:

- `org_seq` is sequential from `0` per org.
- `parent_hash` links each receipt to the prior `receipt_sha256` (genesis = 64 zeros).
- `receipt_sha256` is `sha256` over the canonical JSON (orjson, sorted keys).
- `GET /ledger/verify` recomputes each hash, checks the sequential `org_seq`, and checks the parent links. Tamper with a stored payload and it flips `ok:false` and pinpoints the offending receipt.

**Tigris artifact upload (JSON + PDF) is best-effort** — it is wrapped in try/except and degrades gracefully. The chain itself lives in Postgres, so a storage outage never blocks a receipt.

**Recommended discipline:** Postgres daily backups + a monthly restore drill (the operating baseline in the [Operations overview](/operations/overview/)).

## DefendableRouter (operator-local)

The router writes **local daily JSONL receipt files** at `data/receipts/YYYY-MM-DD.receipts.jsonl`. Each line is checksummed (`checksum_sha256` over canonical JSON, excluding the checksum field) but **not** hash-chained — back up the `data/receipts` directory (and the SQLite DB).

:::note[Roadmap — not built]
A publicly resolvable ENS read-mirror and NAS Merkle cold snapshots are roadmap, not built. Today's durability is Postgres + the in-house hash chain (cloud) and local checksummed JSONL (router).
:::

***

🐝 *Operator-grade · books and records · to the shed.*
