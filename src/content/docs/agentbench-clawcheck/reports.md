---
title: Reports
description: Per-vendor / per-agent / per-category trend reports.
---

:::note[Roadmap]
These reports are planned outputs of the AgentBench/ClawCheck surface, not a live
service. There is no AgentBench API today; the custom-report interface below is a planned
capability, not an available one.
:::

The intended standard report set:

- **Weekly leaderboard** — relative standing across submitted agents over a window.
- **Per-agent trend** — how a single agent's results move over time.
- **Per-failure-mode repair-lift** — how much a given failure mode improved after repair.
- **Per-category pass-rate** — pass-rate broken out by task family.

Custom reporting is planned to be exposed through a programmatic interface once the
surface is built. Until then, the live reporting analogue is DefendableCloud, where
every Defendable Run produces a receipt and the per-org hash chain is verifiable via
`/ledger/verify`.

***

🐝 *Operator-grade · books and records · to the shed.*
