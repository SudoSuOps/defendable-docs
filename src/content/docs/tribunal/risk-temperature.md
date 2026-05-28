---
title: Risk Tier · low · mid · high
description: The pre-weighted tier system. Each Flight Sheet rule declares its tier; flags inherit it; the report ranks high → low so catastrophic events surface first.
---

:::note[Renamed]
Previously documented as "Risk Temperature" (LOW / MEDIUM / HIGH). Reframed to the **declared tier** model (low / mid / high) used by the live rulebook engine.
:::

## The doctrine

> *"Not all penalties are the same. The flight sheet knows what we're looking for, and so does the owner reading the report."* — Mr. Defendable

Each rule on a Flight Sheet declares a **tier** — its pre-weighted risk weight. Flags inherit the tier of the rule they raised. The owner's report **ranks flags high → low** so a catastrophic event (a CRE 5-cap penciled at 10-cap, a $5k check that should be $100) surfaces before a citation typo.

## The three tiers

| Tier | Weight | When to declare it | Example flags |
|---|---|---|---|
| **high** | 5× | Game-changing miss — *catastrophic if undetected*. | Math off ≥ 10% on a monetary value · core lending gate (DSCR < 1.20) · structure / schema breakage · missing required input · fabricated evidence |
| **mid** | 2× | Material but recoverable — *should not pass review*. | Math miss in the 2–10% band · evidence missing for one claim · secondary policy gate violated · assumption unlabeled |
| **low** | 1× | Nit — *quality polish, not a decision*. | Citation typo · format nit · cosmetic value out of canonical case |

## How tier drives severity

| Severity | Trigger |
|---|---|
| **honey** | No flags present + human approved. |
| **jelly** | Mid- or low-tier flags only. |
| **propolis** | **Any** high-tier flag. |

A single high-tier flag is enough for propolis — *that's the point of the tier*. A high-tier rule is a rule the owner cares about catastrophically.

## How magnitude becomes tier (variable penalty)

For **math** and **approx** checks, the engine maps the **size** of the miss to a tier (the football "spot of the foul"):

```
within 1%    → pass    (rounding / immaterial)
2 – 10%      → mid     (jelly · "minor variance")
≥ 10% rel    → high    (propolis · "high-dollar impact")
material $   → high
```

Magnitude bands are declarable per Flight Sheet via `eval_spec.penalty`. Default monetary thresholds: `monetary_critical_pct: 0.10`, `monetary_noncritical_pct: 0.02`.

## Risk breakdown — the count

Every verdict carries a `risk_breakdown`:

```json
"risk_breakdown": { "high": 1, "mid": 2, "low": 0 }
```

That count is the read for the owner: *"one game-changer, two material issues, zero nits."* Combined with the ranked findings, the owner can decide the next move in seconds.

***

🐝 *Tier the flag. Rank the report. Catastrophic events first. To the shed.*
