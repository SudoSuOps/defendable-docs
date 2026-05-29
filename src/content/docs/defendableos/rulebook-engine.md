---
title: The Rulebook Engine
description: How the DefendableOS referee actually works. Deterministic checks, structured executor, math re-derivation, DSL gates, variable penalty, three-tier risk weighting. No judge model.
---

## The doctrine

> **"The referee is a rulebook, not a judge."** — Mr. Defendable, 2026-05-27

The DefendableOS engine consumes a **Flight Sheet** (the declared rulebook for a lane) plus an agent's **structured submission**, and applies the rules deterministically. Every check **passes** or raises a **flag**. There is no "seems good." There is no 1-100 quality dial. Score = **% of declared rules satisfied**.

This page is the operational detail behind the doctrine.

## What a rule looks like

Two kinds of rules:

- **Auto** — the engine decides pass / flag from code. Used for schema, structure, math re-derivation, evidence presence, and machine-precise yes/no policy gates.
- **Checklist** — a human operator applies a *binary* rule (satisfied | raise flag). Used for human-judgment lanes where the rule is rule-shaped but the application is human. **Never opinion-shaped.**

Every rule carries:

- A **key** — declared in the Flight Sheet.
- A **kind** — `auto` | `checklist`.
- A **category** — `structure` · `schema` · `math` · `evidence` · `policy`.
- A **tier** — `low` | `mid` | `high` (the pre-weighted risk weight).
- A **severity** — `critical` (→ propolis on flag) | `noncritical` (→ jelly on flag).

## The five things the engine does in order

1. **Structure** — does the submission match the declared output schema? Missing required fields → flag.
2. **Schema** — does each field obey its declared type / enum / shape? Type errors → flag.
3. **Math re-derivation** — every `calculations[]` entry carries its own formula + inputs + claimed result. The engine recomputes the result from the inputs via a **safe AST arithmetic evaluator** (handles compound expressions like the mortgage amortization formula). If the recompute disagrees with the claim beyond tolerance → flag.
4. **Evidence** — required evidence fields non-empty; assumptions labeled; missing inputs disclosed.
5. **Policy DSL** — declared rules expressed in a small machine-precise DSL: operands `{calc} / {field} / {len} / literal`; ops `== != >= <= > <`, `in`, `all_nonempty`, `and / or / not`, `if`. Missing operand → `skip` (never false-flag). Example: `dscr >= 1.20`, `ltv <= 0.80`, `noi > 0`.

All checks are deterministic. No LLM is called on the receipt path. A judge-model slot exists for *advisory* hallucination / readiness signals, but it never gates a receipt.

## Tier and severity — the pre-weighted scorecard

Mr. Defendable's football analogy:

> *"Not all penalties are the same. The flight sheet knows what we're looking for, and so does the owner reading the report. A 5-cap penciled at 10-cap is a game-changer. A citation typo is a 5-yard penalty."*

Each rule is **pre-weighted** with a tier:

| Tier | Weight | Examples |
|---|---|---|
| **high** | 5× | Math miss > 10% on a monetary value · core lending gate (DSCR < threshold) · structure/schema breakage |
| **mid** | 2× | Math miss in the 2-10% band · evidence missing · secondary policy gate |
| **low** | 1× | Citation typo · format nit |

Severity is rolled up from the flag tiers:

| Severity | Trigger |
|---|---|
| **honey** | No flags + human approved |
| **jelly** | Mid- or low-tier flags only |
| **propolis** | Any high-tier flag |

The owner's report ranks flags **high → low** so catastrophic events surface first.

## Variable penalty — the spot of the foul

For **math** and **approx** checks, severity scales with the **size** of the miss (the football "spot of the foul"):

- Within **1%** → pass (rounding / immaterial).
- **2% – 10%** rel (or material absolute $ + ≥ 2%) → mid-tier flag (jelly · *"minor variance"*).
- **≥ 10%** rel (or material absolute $ + ≥ 2%) → high-tier flag (propolis · *"high-dollar impact"*).

Monetary detection by units + name. Bands declarable per Flight Sheet via `eval_spec.penalty`. The flag detail shows the spot: *"off by $4,900 (4.9%)"*.

## The three-bucket flag taxonomy

Every flag sorts into exactly one bucket — answer differs:

| Bucket | What it means | Who owns it |
|---|---|---|
| **work-defect** | Math / schema / evidence — the agent missed. Fixable. | The agent. Correct & resubmit; the engine re-runs and re-checks. |
| **deal-finding** | Policy gate failed (e.g. `DSCR < 1.20`). The math is right; the declared rule says no. Not a rework. | The client. The work is right, but the deal doesn't pencil under the declared gate. |
| **stack-fit** | The agent's model/compute is below the lane (3B claw asked to underwrite CRE). Not a math miss, not a deal flaw. | The operator. Bigger brain · bigger compute · different lane. **This is the sale.** |

## "$4,900 typo = repair · DSCR fail = decision · undersized stack = upgrade"

That sentence is the entire repair pipeline. The referee names the bucket so the next move is obvious.

## What the engine refuses to do

- Run a Flight Sheet that declares a check key the engine doesn't implement. A silently-skipped check is a **false honey** — the worst possible outcome. Refuse to load.
- Issue a receipt without human approval.
- Use a model opinion as the verdict.
- Anchor a receipt on an external chain (per the [Kill Hedera doctrine](/defendableledger/kill-hedera/)).

## How a Flight Sheet declares its rulebook

Every Flight Sheet carries an `eval_spec`:

```json
{
  "required_output_schema": { "required": ["assignment_id", "calculations", "..."] },
  "deterministic_checks": ["json_valid", "calculations_present", "evidence_references_present"],
  "math_checks": [{"formula_id": "dscr", "formula": "noi / annual_debt_service", "tolerance": 0.01}],
  "evidence_checks": ["all_claims_cited"],
  "rules": [
    {"id": "dscr_gate", "category": "policy", "risk": "high", "expr": {"op": ">=", "left": {"calc": "dscr"}, "right": 1.20}},
    {"id": "ltv_gate",  "category": "policy", "risk": "mid",  "expr": {"op": "<=", "left": {"calc": "ltv"},  "right": 0.80}}
  ],
  "penalty": { "monetary_critical_pct": 0.10, "monetary_noncritical_pct": 0.02 }
}
```

The Flight Sheet is **content**, not migrations — loaded from the Flight Sheet library, upserted by slug, deactivated when removed from the library. *(See [DefendableCloud · Eval Lane](/defendablecloud/eval-lane/) for the library and the forge that builds new sheets.)*

## What "rulebook engine" means in practice

- **Math you can recompute.** Every claimed number is checkable against the inputs the agent itself provided.
- **Gates you can read.** Every policy rule is a yes/no expression you can read aloud.
- **Flags you can rank.** Every flag has a tier and a severity; high-tier flags surface first.
- **A trust boundary that doesn't move.** Model assistance is advisory; the receipt path is deterministic.

That is the moat. *"DefendableOS is not AI judging AI. It is agent work tested against a declared rulebook."*

***

🐝 *Rulebook · flags · receipts. To the shed.*
