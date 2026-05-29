---
title: Evidence Rules
description: Evidence is a set of declared rules — non-empty, cited, labeled. The legacy 0-1 evidence-strength dial is superseded.
---

:::note[Legacy 0-1 dial — SUPERSEDED]
Earlier docs described a 0-1 evidence-strength dial computed as *color × source weight × freshness*. That dial was an **opinion grade**. It is **superseded** as of the 2026-05-27 doctrine lock. The referee evaluates evidence by declared rules, not by a continuous quality dial.
:::

## How the referee evaluates evidence today

Evidence is checked by **declared rules** on each Flight Sheet. Each rule passes or raises a flag. There are two real machine-evaluable shapes the live engine ships today:

**1 · The evidence-non-empty pattern (`app/executor.py`, step 3).** An `evidence_check` names an array (`match_field`) and an evidence field. The executor confirms every item in that array carries a non-empty value for one of `evidence_reference` · `source_location` · `source`. If any item is blank, it raises a flag; if the condition isn't one of those machine-evaluable patterns, the check is honestly marked `skip` (not faked).

**2 · The `citations_present` auto rule (`app/eval.py`).** A free-text submission passes if it contains a citation marker (`source`, `per the`, `according to`, `exhibit`, `rent roll`, `t12`, `page`, `[`, `cited`, `provided`); otherwise it flags *"No evidence citations detected."*

:::note[Rule keys are author-declared, not a fixed vocabulary]
Beyond `citations_present` and `evidence_attached`, **specific evidence rule keys are declared per Flight Sheet** — there is no fixed engine vocabulary of evidence-rule names. The keys below are **illustrative examples a Flight Sheet author MAY declare**, not built-in engine keys. This page is a *how-you-could-model-it* guide; what actually runs is the two patterns above plus whatever structured rules the sheet declares.
:::

A Flight Sheet author might, for example, declare evidence rules like:

| Illustrative rule (author-declared) | What it would check | Suggested tier |
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

| Old dial axis | New rule shape (illustrative — a Flight Sheet *could* declare it) |
|---|---|
| Color (operator-rich context) | A sheet could require named operator context as a structure rule (e.g. an author-declared `comp_set_present` / `tenant_credit_disclosed` check). |
| Source weight (operator-verified > deeded > scraped) | A sheet could declare a per-claim source field and require, say, `confidence: provided` for high-tier claims. (`confidence: provided/inferred/missing` is an *example enum a sheet could declare* — not a built-in engine field.) |
| Freshness | Lanes that care about staleness could declare a `data_as_of` rule and a freshness window. |

These are modeling examples, not fixed engine fields. The Flight Sheet is the rulebook: if the dimension matters in your lane, declare a rule for it — the engine runs whatever structured rules you declare, plus the two evidence patterns above.

## What "strong evidence" means now

> *Strong evidence is evidence that passes every rule the Flight Sheet declared for it.*

Not a grade. Not a vibe. A binary pass against a declared rule list.

***

🐝 *Declared rules. Binary outcomes. No dials. To the shed.*
