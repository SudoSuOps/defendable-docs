---
title: Energy
description: Power draw · thermal limits · cost per kWh. Energy IS the receipt.
---

Energy is the line nobody else prints. Every trusted artifact has a watt cost behind it, and watts don't lie — they're the most honest receipt in the stack.

## The kWh math

Run it straight. US average electricity sits around **$0.10/kWh**. An RTX 6000 under sustained load draws roughly **300W**, which is **0.3 kWh per hour**. So an hour of cooking costs about $0.03 in raw power. At sweet-spot per-deed throughput that energy line works out to roughly **$0.00033 per deed** — small in dollars, but it's a real, measurable physical cost, and printing it is the point.

```
energy_per_hour = 0.300 kWh × $0.10/kWh = $0.030/hr
energy_per_deed = $0.030/hr ÷ (deeds per hour at sweet spot) ≈ $0.00033
```

:::note[Per-deed energy line is roadmap]
The per-deed energy figure above is illustrative, and a standalone **"Proof of Economics"** artifact — a receipt that itemizes the energy and dollar cost of each minted deed — is **roadmap**, not deployed.

What is live today is the DefendableCloud **Receipt**: a per-org hash-chained *verdict* receipt that proves what passed the declared rulebook. It is not yet an economics breakdown. "Energy IS the receipt" is the vision we're building toward, not a metered field on today's receipt.
:::

***

🐝 *Operator-grade · books and records · to the shed.*
