---
title: Receipt Schema
description: The canonical receipt JSON schema. Every deed has at least one source receipt.
---

:::note[Roadmap]
Two layers, two states. **Receipts are LIVE and hash-chained today** — minted by DefendableCloud at `api.defendablecloud.com`, with a per-org sequential chain and a `receipt_sha256` over canonical JSON that `/ledger/verify` recomputes (see [Schemas · Receipt](/schemas/receipt/)). The **deed aggregation** layer — "many receipts → one deed" — is DefendableLedger roadmap, not yet built.
:::

The receipt is the live, per-event books-and-records primitive: every Defendable Run seals its inputs, evidence, checks, verdict, and approval into a receipt whose hash links to the prior one in the org's chain — see [Schemas · Receipt](/schemas/receipt/) for the canonical fields. The deed is the *vision* layer above it: a durable record that rolls many receipts up into one aggregated artifact. Pattern (design intent): many receipts → one deed. Until that aggregation ships, the chain of individual receipts is the authoritative record.

***

🐝 *Operator-grade · books and records · to the shed.*
