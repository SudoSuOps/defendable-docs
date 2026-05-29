---
title: Compute Cost
description: GPU hours · model size · throughput. Owned-fleet vs hyperscaler-rental economics.
---

Compute is the first line of cost to mint, and it's where owning the iron beats renting it. The math is simple: a GPU you bought is a fixed capital cost amortized across every hour it runs. A GPU you rent is a fresh bill every hour, whether or not the work mints anything.

## Owned-fleet amortized vs hyperscaler rental

Take the card straight: an owned RTX 6000 amortized over its service life pencils to roughly **$0.80/hr** at sweet-spot utilization. The hyperscaler equivalent (e.g. an AWS p4d.24xlarge slice) runs around **$32.77/hr**. That's a ~40x differential — but only if you keep the owned card busy. Idle iron is the most expensive compute there is, because the capital cost runs whether the fans spin or not. Utilization is the whole game; see [Hyperscaler vs Edge](../hyperscaler-vs-edge/) for the crossover math.

:::note[Illustrative figures · distinct from router pricing]
These are illustrative cost-of-intelligence figures — internal economics modeling for the cost-to-mint vision, not measured production billing.

Do not confuse them with **DefendableRouter's customer-facing GPU rental rates** — `rtx6000_blackwell_96gb` at $5/hr and `rog_astral_5090_32gb` at $2/hr. Those are real, server-side pricing constants and a *separate line* documented in the router pricing section. This page is about what compute *costs the house to operate*; router pricing is what a customer *pays to rent*.
:::

***

🐝 *Operator-grade · books and records · to the shed.*
