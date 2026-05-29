---
title: SwarmFixer · Overview
description: The planned repair-intelligence layer. Turns Jelly-tier (risk) eval verdicts into repair training pairs.
---

:::note[Roadmap]
SwarmFixer is **design intent**, not a built feature. It is not implemented in
defendable-cloud-v2 or defendable-router, and there is no public or production
SwarmFixer service. The SHA-256 hashes referenced across these pages provide
**content-integrity linkage only** — not signatures, owner approval, external
attestation, or blockchain anchoring. This matches the real cloud receipt
chain, which is a per-org SHA-256 hash-chain persisted in Postgres.
:::

SwarmFixer is the planned repair-intelligence layer for the Defendable stack. The
idea: take the **jelly (risk)** verdicts the DefendableCloud eval lane already
produces and turn them into repair training pairs instead of dead ends.

Today, the eval lane is real and live at `api.defendablecloud.com`. Its
deterministic executor (`app/executor.py`) applies a declared rulebook — JSON-schema
field checks, type checks, math re-derivation, and a structured rule DSL — and
throws flags. The referee is math and code, never a judge model. From those flags
it assigns one of three verdict tiers:

- **honey** — pass (no or low flags)
- **jelly** — risk (mid-severity flag)
- **propolis** — fail (high-severity flag)

SwarmFixer's job, when built, would sit downstream of that: for each **jelly**
verdict, extract the failure mode, generate a repair directive, and emit a repair
pair (input = the flagged output · output = the repair directive). Repair pairs
that themselves grade clean would feed the in-house training corpora — closing the
flywheel where eval risk becomes repair signal rather than waste.

None of that downstream loop exists yet. The real, fielded piece it would build on
is the eval lane and its verdict tiers; everything else on these pages is proposed
schema and design intent.

***

🐝 *Operator-grade · books and records · to the shed.*
