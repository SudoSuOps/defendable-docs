---
title: Repair Intelligence
description: What would make SwarmFixer different from just re-running the agent.
---

:::note[Roadmap]
The repair-intelligence approach described here is **design intent**, not built.
:::

Re-running gets you the same failure. The planned SwarmFixer approach instead:
extract the failure mode · map it to a known taxonomy · generate a targeted repair
directive · re-run with the directive prepended.

Repair lift would be measurable per failure mode. The intended input is real: the
DefendableCloud eval lane already produces pre/post verdict-tier data (honey / jelly /
propolis) from its deterministic rulebook referee. That existing signal is what a
future SwarmFixer would consume to measure whether a repair directive actually moved a
flagged output toward a clean verdict.

***

🐝 *Operator-grade · books and records · to the shed.*
