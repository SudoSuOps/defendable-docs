---
title: Verdicts
description: Per-submission verdict structure.
---

:::note[Roadmap]
The verdict schema below is a proposed structure for the planned AgentBench/ClawCheck
surface, not a live one. No verdicts are produced today, and DDEED anchoring is a roadmap
item — there is no `DDEED-BENCH-*` identifier in service.
:::

The intended per-submission verdict would carry:

- **Classification** — a Tribunal-roadmap ruleset-audit outcome (flags applied from a
  declared rulebook, never a judge-model quality opinion).
- **Per-category pass-rate** — pass-rate across the benchmark task families.
- **Failure-flag list** — the category/signal/severity/remediation flags raised.
- **Repair-lift estimate** — projected improvement after remediation.

Public discoverability of verdicts (for example via StreetLedger) is a **roadmap**
capability, not something available to opt into today. The built analogue that exists now
is in DefendableCloud: real verdict tiers — **honey** (pass) · **jelly** (risk) ·
**propolis** (fail) — recorded in per-org hash-chained receipts that
`/ledger/verify` can independently recompute.

***

🐝 *Operator-grade · books and records · to the shed.*
