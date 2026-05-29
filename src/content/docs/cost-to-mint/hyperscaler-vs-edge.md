---
title: Hyperscaler vs Edge
description: Why owned-edge compute wins at the margin · how the math compounds across years.
---

This is the page where the compute line turns into a strategy. The shape of the two cost curves is different, and the shape is what wins — not any single hourly rate.

## Convex rental vs linear owned cost

Hyperscaler pay-per-hour is **convex with usage**: every hour of work is a fresh charge, so total cost climbs in lockstep with how hard you run. Owned-edge is **linear fixed cost**: you pay the capital once and the marginal hour is nearly free (just energy). The two curves cross.

```
rental_total = hours_used × hourly_rate          # climbs with every hour
owned_total  = fixed_capital + hours_used × energy # mostly flat after purchase
```

The crossover lands around **~30% sustained utilization** for a typical fleet. Below that, the rental's pay-only-when-you-use-it shape is genuinely cheaper. Above ~30%, owned-edge wins; above ~60% sustained, it dominates by roughly **5-10x** because the fixed cost is spread across so many productive hours. Idle iron kills the math — utilization is the whole bet. See [Compute Cost](../compute-cost/) for the per-hour rates that feed this curve.

:::note[Illustrative modeling]
The crossover point (~30%) and dominance multiples (5-10x at ~60%) are illustrative cost-of-intelligence modeling — roadmap economics, not measured production telemetry. They describe the *shape* of the decision, not a metered result from the live fleet.
:::

***

🐝 *Operator-grade · books and records · to the shed.*
