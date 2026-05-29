---
title: Proof of Process
description: Pipeline version · engines · steps logged.
---

:::note[Roadmap]
Proof of Process is part of the DefendableLedger 5-Proof deed vision — design intent, not a built service. Today the live surface that records execution provenance is the DefendableCloud Defendable Run (Inputs → Evidence → Execution → Checks → Verdict → Approval → Receipt), sealed into a hash-chained receipt (see [Schemas · Receipt](/schemas/receipt/)).
:::

Proof of Process answers **how** an artifact was produced — its pipeline provenance and reproducibility. The intended fields name the machinery: pipeline_version · transcript_engine · extraction_engine · steps_logged. The goal is that a deed should be reproducible-by-description: anyone reading it can see which version of which pipeline ran, and whether each step was logged, without re-running the work or trusting a summary. DefendableCloud already practices this at the run level — every check and verdict is recorded deterministically before a receipt is minted.

***

🐝 *Operator-grade · books and records · to the shed.*
