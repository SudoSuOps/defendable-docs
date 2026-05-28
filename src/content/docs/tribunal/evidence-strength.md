---
title: Evidence Rules
description: Evidence is a set of declared rules — non-empty, cited, labeled. The legacy 0-1 evidence-strength dial is superseded.
---

:::note[Legacy 0-1 dial — SUPERSEDED]
Earlier docs described a 0-1 evidence-strength dial computed as *color × source weight × freshness*. That dial was an **opinion grade**. It is **superseded** as of the 2026-05-27 doctrine lock. The referee evaluates evidence by declared rules, not by a continuous quality dial.
:::

## How the referee evaluates evidence today

Evidence is checked by a small set of **declared rules** on each Flight Sheet. Each rule passes or raises a flag:

| Rule key | What it checks | Default tier |
|---|---|---|
| `evidence_references_present` | Every `claims[]` entry carries an `evidence_reference`. | mid |
| `all_claims_cited` | No claim made without a source pointer. | mid |
| `missing_inputs_disclosed` | The submission lists what it could *not* compute due to absent evidence. | low |
| `assumptions_labeled` | Every assumption is labeled (not silently embedded in a calculation). | low |
| `no_fabricated_evidence` | Source pointers map to evidence that was actually attached. | high |

Each rule is **rule-shaped**, not opinion-shaped. There is no continuous *"how strong is this evidence"* score. A claim either carries an evidence reference or it doesn't. A calculation either labels its assumptions or it doesn't.

## Why the 0-1 dial is gone

A continuous dial is an opinion. *"How strong is this evidence on a 0-1 scale?"* requires judgment — exactly the thing the [rulebook doctrine](/defendableos/rulebook-engine/) forbids on the receipt path.

The new model preserves what the dial *tried* to capture (depth of supporting context, source quality, recency) by making each dimension a **declared rule** with a binary pass/flag outcome. If a Flight Sheet wants stricter evidence handling, it adds rules — it does not turn a knob.

## Where the dimensions live now

| Old dial axis | New rule shape |
|---|---|
| Color (operator-rich context) | Flight Sheets in domains like CRE require named operator context — they declare it as a structure rule (e.g. `comp_set_present`, `tenant_credit_disclosed`). |
| Source weight (operator-verified > deeded > scraped) | Declared via the source `confidence` enum on each claim: `provided` · `inferred` · `missing`. Rules can require `confidence: provided` for high-tier claims. |
| Freshness | Lanes that care about staleness declare a `data_as_of` rule and a freshness window. |

The Flight Sheet is the rulebook. If the dimension matters in your lane, declare it.

## What "strong evidence" means now

> *Strong evidence is evidence that passes every rule the Flight Sheet declared for it.*

Not a grade. Not a vibe. A binary pass against a declared rule list.

***

🐝 *Declared rules. Binary outcomes. No dials. To the shed.*
