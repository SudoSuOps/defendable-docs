---
title: Model Versions
description: How a SwarmFixer model would track repair-lift improvements across versions.
---

:::note[Roadmap]
SwarmFixer model training and versioning is **planned**. No SwarmFixer model has
been trained or deployed. The scheme below is design intent.
:::

Models would be versioned `SwarmFixer-vN.M`. Each version would be logged with:
cumulative training-pair count · per-mode repair-lift baseline · holdout test scores.

In keeping with house doctrine, versions would **never be auto-promoted**. An
operator approves each promotion against **operator acceptance gates** — the specific
gate set is design intent and not yet defined from a real source. The discipline is
the point: operator approval, not automatic promotion.

***

🐝 *Operator-grade · books and records · to the shed.*
