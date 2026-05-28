---
title: Scoring Model
description: Score = % of declared rules satisfied. Pre-weighted tiers (low/mid/high) drive severity. No opinion grade · no 6-dimension weighted dial · the legacy model is superseded.
---

:::note[Legacy 6-dim weighted model — SUPERSEDED]
Earlier docs described a 6-dimension weighted dial: term density (3×) · directive owner (2×) · claim evidence (1.5×) · ring-ring marker (1×) · to-the-shed marker (1×) · risk-flag penalty (−1.5×). That model is **superseded** as of 2026-05-27. The referee is a rulebook engine, not an opinion grader.
:::

## The current scoring model

```
score = (rules_satisfied / rules_declared) × 100
```

That is the entire formula. **Score = % of declared rules satisfied.** No opinion. No weighted dimensions. No quality vibes.

## How rules contribute to the verdict

Each rule on a Flight Sheet carries a **tier** (the pre-weighted risk weight) and a **severity** (what raising a flag implies):

| Tier | Weight (for ranking) | Example flags |
|---|---|---|
| **high** | 5× | Math miss ≥ 10% on a monetary value · core lending gate (DSCR < 1.20) · structure / schema breakage |
| **mid** | 2× | Math miss 2–10% rel · evidence missing · secondary policy gate |
| **low** | 1× | Citation typo · format nit |

The weighted score is used to **rank** the findings (high tier surfaces first in the owner's report), not to grade quality. The verdict severity is driven by the highest-tier flag present, not by the weighted total:

| Verdict | Rule |
|---|---|
| **honey** | No flags + human approved. |
| **jelly** | Mid- or low-tier flags only. |
| **propolis** | Any high-tier flag present. |

## Variable penalty — the spot of the foul

For **math** and **approx** checks, severity scales with the **size** of the miss (the football "spot of the foul"):

| Miss size | Tier | Severity |
|---|---|---|
| Within 1% (rounding / immaterial) | — | pass |
| 2–10% rel (or material absolute $ + ≥ 2%) | **mid** | jelly · *"minor variance"* |
| ≥ 10% rel (or material absolute $ + ≥ 2%) | **high** | propolis · *"high-dollar impact"* |

Bands are declarable per Flight Sheet via `eval_spec.penalty`. The flag detail shows the spot: *"off by $4,900 (4.9%)"*.

## What the scoring model is NOT

- **NOT an AI quality grade.** No model is grading the work on the receipt path.
- **NOT a single number that bears interpretation.** The score is mechanical; the severity is the actual decision signal.
- **NOT weighted-by-opinion.** Tier weights are declared on the Flight Sheet, in advance, by the rulebook author.
- **NOT term-density or rhetoric-pattern based.** Those were the legacy 6-dim model. Gone.

## Worked example

A CRE Run on `cre_memo_dscr_ltv_v1` with:

- All 8 declared rules satisfied: structure ✓, schema ✓, evidence ✓, math (DSCR) ✓, math (LTV) ✓, `dscr_gate` (≥1.20) ✓, `ltv_gate` (≤0.80) ✓, `coc_nonneg` ✓.
- 0 flags.

→ score = 8/8 × 100 = **100.0**. Verdict = **honey** (no flags + human approved).

Same Run but DSCR comes in at 1.022 (the deal doesn't pencil):

- 7 rules satisfied, 1 high-tier flag: `dscr_gate` violated (declared rule says ≥ 1.20).
- 1 propolis flag.

→ score = 7/8 × 100 = **87.5**. Verdict = **propolis** (any high-tier flag = propolis). Sorted into the **deal-finding** bucket (math is right; rule says no). Not a rework.

***

🐝 *Percent of declared rules satisfied. That's the score. To the shed.*
