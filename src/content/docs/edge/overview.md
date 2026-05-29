---
title: Edge · Overview
description: Edge appliances · HoneyBox · Defendable Box · GPU fleet · object-storage sync · offline mode. Roadmap.
---

:::note[Roadmap]
The DefendableOS edge / appliance program described in this section is **vision and roadmap** — it is not yet a shipped product. What is **live today** is **DefendableCloud** at `api.defendablecloud.com` (the Defendable Run, the eval flight-sheet lane, and per-org hash-chained receipts), plus the **DefendableRouter v0.1** spine, which is real and CI-verified but runs locally and is **not publicly deployed**. Treat everything below as where we are taking the edge — not where it ships today.
:::

The doctrine is operator-owned hardware first. The roadmap is for DefendableOS to run at the edge — operator-owned boxes, minimal hyperscaler dependency for the core rails — so the trust layer can live where the work happens. Today that trust layer lives in DefendableCloud; the edge appliances below are the planned local-first extension of it.

Cloud is the surface that exists now. Cross-region replication and DDEED anchoring are roadmap items — the cloud's receipts are hash-chained in Postgres today; publishing those chains to an external anchor (DDEED) is planned, not live.

***

🐝 *Operator-grade · books and records · to the shed.*
