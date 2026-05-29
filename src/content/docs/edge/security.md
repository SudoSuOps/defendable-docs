---
title: Security
description: Receipt integrity · auth · device hardening. Today vs roadmap.
---

What is real today is **integrity through hashing and real auth**:

- **Receipt integrity** — DefendableCloud mints per-org **hash-chained** receipts (`receipt_sha256` over canonical JSON, `parent_hash` linking each receipt to the prior one). DefendableRouter v0.1 writes a **local JSONL ledger** where every record carries a `checksum_sha256` over its canonical content (the router's receipts are checksummed but not hash-chained — said honestly).
- **Verification** — the cloud exposes `/ledger/verify`, which recomputes each hash, checks sequential `org_seq`, and validates parent links; tampering with a stored payload flips `ok:false` and pinpoints the offending receipt.
- **Auth** — DefendableCloud uses **JWT magic-link** auth; DefendableRouter's worker contract uses a **bearer worker-token** (only `/workers/*` is authenticated in v0.1).

:::note[Roadmap]
Per-device hardening (read-only filesystems), signed-image auto-update, and centralized audit-log shipping are **roadmap** for the edge appliance program — not implemented today. There is **no ENS-keyed device authentication**; integrity comes from the SHA-256 checksums and hash chains described above, not from any on-chain key.
:::

***

🐝 *Operator-grade · books and records · to the shed.*
