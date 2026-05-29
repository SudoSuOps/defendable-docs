---
title: Failure Flags
description: How failures get classified and routed.
---

:::note[Roadmap]
The failure-flag routing and the SwarmFixer repair queue described here are planned, not
built. SwarmFixer is a roadmap component, not a live service. This page records the
intended classification model.
:::

Each failure is intended to be flagged with four attributes:

- **Category** — which task family the failure occurred in.
- **Signal type** — the specific failure mode (the declared *what went wrong*).
- **Severity** — how serious the flag is, on the same flag-driven scale used across the
  ecosystem (critical vs non-critical).
- **Recommended remediation** — the suggested next step to repair the gap.

Under the planned design, critical failures (security · safety) would route to immediate
operator review, while non-critical failures would aggregate into the SwarmFixer repair
queue once that component exists. As with the live DefendableCloud referee, a flag is a
rulebook outcome — never a quality opinion or a judge-model verdict.

***

🐝 *Operator-grade · books and records · to the shed.*
