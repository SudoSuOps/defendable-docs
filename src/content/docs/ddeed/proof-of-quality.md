---
title: Proof of Quality
description: Tribunal classification · validator confidence · evidence strength.
---

:::note[Roadmap]
Proof of Quality is part of the DefendableLedger 5-Proof deed vision — design intent, not a built service. **It is not a judge model and not a quality or confidence score.** The live referee today is the DefendableCloud eval lane: a *deterministic rulebook*. It applies a declared flight sheet (JSON-schema field checks, type checks, math re-derivation of each calculation from its own inputs, and a structured rule DSL), throws **flags**, and emits a verdict tier — **honey** (pass / no or low flags), **jelly** (risk / mid flag), **propolis** (fail / high flag). We are math and code; the referee never opines on quality.
:::

Proof of Quality — better called a **ruleset-audit proof** — answers **whether an artifact survives scrutiny against a declared rulebook**, not whether a model "liked" it. In the live system, that scrutiny is the eval lane's flag set and its honey/jelly/propolis verdict.

The deed-vision fields below (`tribunal_classification`, `Royal Jelly` tiering, `validator_confidence`, `evidence_strength`, drift-check) are **DefendableLedger deed-vision fields, distinct from Cloud verdicts** — they describe how a future deed might summarize an audit, and should not be read as a live scoring service. Where a deed records a verdict, it records the *rulebook outcome* (flags + tier), not a judge's opinion.

***

🐝 *Operator-grade · books and records · to the shed.*
