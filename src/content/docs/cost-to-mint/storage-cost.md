---
title: Storage Cost
description: Object storage · NAS · Tigris/R2/S3. Per-GB/month economics.
---

Storage is the cheapest line on the page and the one that keeps the artifact alive. A trusted output isn't trusted if the evidence behind it evaporated — so the cost of keeping the bytes around is part of the cost to mint.

## Object-storage economics

Commodity object storage (Tigris, Cloudflare R2, S3 and the like) runs on the order of **$0.023/GB/month**. Most artifacts are tiny next to that rate: a structured record plus its evidence is kilobytes to low megabytes, so effective per-artifact storage typically lands well under **$0.001/month**. The footprint is small; the discipline of *keeping* it is what matters.

:::note[Tigris is live · session-capture sizing is roadmap]
DefendableCloud **does** use Tigris object storage today: receipt artifacts (JSON + PDF) are uploaded on a **best-effort** basis — wrapped in try/except — while the receipt hash chain itself is persisted in Postgres. So a storage outage degrades gracefully and never blocks a receipt.

The per-session **DDEED-CHAT / StreetChat** capture sizing referenced for cost-to-mint is **roadmap**, not a deployed capture pipeline, and the $/GB figure above is illustrative commodity pricing.
:::

***

🐝 *Operator-grade · books and records · to the shed.*
