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
| **mid** | 2× | Material but recoverable — *should not pass review*. | Math miss in the 5–10% band · evidence missing for one claim · secondary policy gate violated · assumption unlabeled |
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
within 1%        → pass    (rounding / immaterial)
1 – 5%           → low      (honey · "minor variance")
5 – 10%          → mid      (jelly)
≥ 10% rel        → high     (propolis · "material miss")
material $ miss  → high     (propolis · "high-dollar impact")
```

Magnitude bands are declarable per Flight Sheet via `eval_spec.penalty`. The real keys (from `app/executor.py` `_penalty()`) with their defaults:

| Key | Default | Meaning |
|---|---|---|
| `tol_rel` | `0.01` | At/under this relative miss → **pass** (rounding/immaterial). |
| `low_rel` | `0.05` | At/over this → at least a **low** flag (below it but over `tol_rel` is low). |
| `critical_rel` | `0.10` | At/over this relative miss → **high** flag. |
| `critical_abs` | `1000.0` | Absolute-dollar floor for the high-dollar escalation. |
| `abs_floor_rel` | `0.02` | Relative floor that must also be met for the high-dollar escalation to fire. |

A miss escalates to **high** when `rel ≥ critical_rel`, *or* when the value is monetary and `abs_miss ≥ critical_abs` **and** `rel ≥ abs_floor_rel` (the high-dollar rule). Between `low_rel` and `critical_rel` the flag is **mid**; between `tol_rel` and `low_rel` it is **low**.

## Risk breakdown — the grouped flags

Every verdict carries a `risk_breakdown` — the raised flags grouped by tier, each tier a **list of flag labels** (not a count):

```json
"risk_breakdown": { "high": ["DSCR gate"], "mid": ["Comp set staleness"], "low": [] }
```

The grouped flags are the read for the owner: *"one game-changer (the DSCR gate), one material issue, zero nits — and here is exactly which rule each one is."* Combined with the ranked findings, the owner can decide the next move in seconds.

***

🐝 *Tier the flag. Rank the report. Catastrophic events first. To the shed.*
