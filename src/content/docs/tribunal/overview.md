---
title: Tribunal · Overview
description: The in-product judgment layer · reframed as the rulebook engine. The referee applies declared rules and throws flags · never a judge model.
---

:::caution[Status — Tribunal vs Codex Tribunal]
**Two distinct things share this name.** Disambiguate before reading further:

- **Codex Tribunal** (mentioned in [Field Proof v0.1](/field-release/overview/)) is a real, **external**, independent audit process that audited the field-release prototype.
- **The in-product Tribunal** described on this page is the **internal rulebook engine** that runs inside DefendableOS — the [referee](/defendableos/rulebook-engine/).

Earlier docs described the in-product Tribunal as a *"two-judge ensemble"* with a 6-dimension weighted scoring model. That framing is **superseded** as of the 2026-05-27 doctrine lock. The in-product Tribunal is a deterministic **rulebook engine**, not a judge model.
:::

## What the in-product Tribunal is

The in-product Tribunal is the **rulebook engine** inside DefendableOS — the referee that applies a declared [Flight Sheet](/defendablecloud/eval-lane/) to an agent submission and throws **flags** when a rule is violated. Every check **passes** or raises a flag. There is no opinion grade. There is no "seems good." Score = % of declared rules satisfied.

> **"The referee is a rulebook, not a judge."** — Mr. Defendable, 2026-05-27

See [Rulebook Engine](/defendableos/rulebook-engine/) for the full operational detail. The pages in this section document the legacy framing surfaces (scoring model, validator chain, verdict JSON) reframed to the new doctrine.

## What the referee does, briefly

1. **Run the rulebook.** Apply each declared rule from the Flight Sheet.
2. **Throw flags.** Each check passes or raises a flag with a tier (low/mid/high) and severity (critical → propolis, noncritical → jelly).
3. **Emit a deterministic verdict.** Score = % of declared rules satisfied. Severity = honey (no flags + approved) · jelly (mid/low only) · propolis (any high-tier flag). Risk breakdown = count of flag tiers.

No LLM is called on the receipt path. A judge-model slot is reserved for *advisory* hallucination/readiness signals later — never on the chain.

## The pages in this section

- [Scoring Model](/tribunal/scoring-model/) — score = % of declared rules satisfied; the 6-dim weighted opinion model is superseded.
- [Honey · Jelly · Propolis](/tribunal/honey-royal-jelly-jelly-propolis/) — the 3 severities the referee emits.
- [Risk Temperature](/tribunal/risk-temperature/) — the low/mid/high tier system used to rank flags.
- [Evidence Strength](/tribunal/evidence-strength/) — evidence is a set of declared rules (non-empty, cited, labeled), not a 0-1 dial.
- [Validator Chain](/tribunal/validator-chain/) — the deterministic sequence the referee runs.
- [Verdict JSON](/tribunal/verdict-json/) — the live verdict shape.
- [Assignment Success](/tribunal/assignment-success/) — what "success" means under the rulebook (all required rules satisfied).

***

🐝 *Rulebook · flags · receipts. The referee is a rulebook. To the shed.*
