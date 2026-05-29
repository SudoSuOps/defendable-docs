---
title: HoneyBox
description: The DefendableOS-on-a-box appliance concept. Always-on low-power edge node. Roadmap.
---

:::note[Roadmap]
HoneyBox is a **roadmap appliance concept**, not a purchasable or deployed product today. The live trust layer runs in **DefendableCloud** at `api.defendablecloud.com`. The spec below is the **reference build** we are designing against on owned hardware — not a shipping SKU.
:::

HoneyBox is the small end of the edge roadmap: an always-on, low-power edge appliance meant to put a DefendableOS node where the work happens without a rack or a hyperscaler bill. The intent is a box that sits quietly on an SMB's shelf, holds receipts and light inference locally, and reaches the cloud only when it needs to.

The reference build (owned N150-class hardware) targets: Intel N150 (~14 GB) with an integrated NPU at roughly 40 TOPS · always-on · a local object store (MinIO) behind Nginx · a `cloudflared` tunnel for reachability · and a lightweight inference path (BitNet-class). That is the development reference, not a product spec we are selling.

***

🐝 *Operator-grade · books and records · to the shed.*
