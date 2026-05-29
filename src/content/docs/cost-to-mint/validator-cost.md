---
title: Validator Cost
description: Per-validator-pass cost. Deterministic Python validators vs model-backed validators.
---

The validator line is what makes an artifact *defendable* instead of just *produced*. We don't judge — we are math and code. The referee applies a declared rulebook and throws flags; it never renders a quality opinion and it is never a judge model.

## Grounded in the live deterministic referee

This isn't aspiration — it's how the live eval lane works today. The DefendableCloud executor (`app/executor.py`) runs the checkable rules against the agent's JSON output deterministically:

- **JSON-schema field checks** — type, value-in-set, required keys on array items, expected value.
- **MATH re-derivation** — each calculation's result is re-derived from its own inputs and formula and compared within tolerance. That's the real math referee.
- **Structured rule DSL** — declared primitives, applied verbatim.

Rules whose condition is free-text English fall through to a checklist a human applies as a binary (satisfied / raise flag). Any **model-backed check is advisory only** — it never produces proof and never sets the verdict. Verdict tiers come from the flags: honey (pass), jelly (risk), propolis (fail).

The cost shape: deterministic Python checks are compute-bound on owned GPU at roughly **$0.0001/pass**; advisory model-backed checks run around **$0.0005/pass**; across a ~12-check chain the blended cost is about **$0.0002/pass**.

:::note[Illustrative per-pass cost]
The deterministic referee, the flag tiers, and math re-derivation are **live** in DefendableCloud. The per-pass **dollar figures** above, however, are illustrative cost-of-intelligence estimates (roadmap economics) — not metered production costs.
:::

***

🐝 *Operator-grade · books and records · to the shed.*
