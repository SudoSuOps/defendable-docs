---
title: Object Storage Sync
description: Intended edge-node → object-storage sync architecture. Roadmap.
---

:::note[Roadmap]
Edge-node object-storage sync is **roadmap** — it is not built. What exists today is **DefendableCloud's own best-effort artifact upload to Tigris** (S3-compatible): when a receipt is minted, its JSON and PDF artifacts are pushed to object storage inside a `try/except`. The **hash chain itself persists in Postgres regardless of storage**, so a storage outage degrades gracefully and never blocks a receipt. The edge-side sync described below is the future architecture, not current behavior.
:::

In the intended design, edge nodes **would** write receipts locally first — local is the source of truth — and then asynchronously sync artifacts up to centralized object storage (Tigris · R2 · S3) on a tunable interval. The local hash chain (or local checksummed ledger) **would** remain authoritative, so the sync layer would be best-effort and never sit on the critical path of minting a receipt — mirroring how the cloud already treats its Tigris upload today.

Offline operation (deferred sync when a node is disconnected) is a related roadmap item — see the Offline Mode page.

***

🐝 *Operator-grade · books and records · to the shed.*
