---
title: Offline Mode
description: Operating disconnected from the internet with deferred sync. Roadmap.
---

:::note[Roadmap]
Offline / disconnected edge operation with deferred sync is **roadmap** — it is not built. The pieces that make it possible *are* real today, but the offline-queue-and-resync behavior itself is not yet implemented.
:::

The foundation a future offline mode would build on already exists: **receipts are content-addressed today.** DefendableCloud mints per-org **hash-chained** receipts (each `receipt_sha256` computed over canonical JSON, linked by `parent_hash`), and DefendableRouter v0.1 writes a **local JSONL ledger** where every line carries a `checksum_sha256` over its canonical content. Deterministic hashing over deterministic IDs is exactly what an offline queue needs to defer and later reconcile writes.

The roadmap design is for an edge appliance to run disconnected, hold its local receipt records, and resume sync on the next connection — building on those content-addressed records. **Deeds / DDEED anchoring are roadmap**, not a local queue that exists today. We do **not** claim conflict-free re-sync exists — reconciliation semantics for disconnected operation are part of the design work, not a shipped guarantee.

***

🐝 *Operator-grade · books and records · to the shed.*
