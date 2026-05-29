---
title: Alignment Checks
description: "Round-trip verification: did the agent output actually match the original intent?"
---

:::note[Roadmap]
Round-trip alignment checks and SwarmFixer repair-pair generation are **planned, not built**. This page describes the design intent for the Communicator rail · it is not a live capability. Today's verifiable alignment surface is the DefendableCloud eval lane: a deterministic referee that applies a declared rulebook and throws flags.
:::

The design intent: every assignment runs round-trip · original intent (from intake) → agent output → re-translation back to operator voice → comparison to the original intent. Drift would trigger a SwarmFixer repair pair. Round-trip discipline is meant to be the alignment moat.

***

🐝 *Operator-grade · books and records · to the shed.*
