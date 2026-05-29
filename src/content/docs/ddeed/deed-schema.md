---
title: Deed Schema
description: The canonical DDEED JSON schema. Fields · types · required vs optional.
---

:::note[Roadmap]
The DDEED deed schema is part of the DefendableLedger books-and-records vision and is not yet implemented as a fielded service. Today the live, verifiable surface is DefendableCloud receipts — see [Schemas · Receipt](/schemas/receipt/) — which are hash-chained and verifiable at `api.defendablecloud.com`. A deed aggregates many such receipts into a single durable record; that aggregation layer is design intent, not a built endpoint.
:::

A deed is the durable, aggregated books-and-records artifact the DefendableLedger vision rolls many receipts up into. The intended shape: see [Schemas · Deed](/schemas/deed/) for the working JSON design. Required (design intent): deed_type · deed_id · five_proofs · minted_at. Per-class extensions add domain-specific fields (e.g., DDEED-CHAT adds source_event_id; DDEED-AWARD adds engagement_scope).

***

🐝 *Operator-grade · books and records · to the shed.*
