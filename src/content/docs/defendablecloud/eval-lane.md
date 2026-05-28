---
title: Eval Lane · The Referee
description: How DefendableCloud runs the Agent Work eval lane — Flight Sheet → Assignment → Submission → Audit → Findings → Approval → Eval Receipt. The referee is a rulebook engine, not a judge.
---

The Eval Lane is the most common Defendable Run. It is where an AI agent's work gets tested against a declared rulebook and turned into a receipt.

> **The referee is a rulebook, not a judge.** (See [Rulebook Engine](/defendableos/rulebook-engine/) for the full doctrine.)

## The flow

```
Flight Sheet  ───►  Assignment  ───►  Submission  ───►  Audit  ───►  Findings  ───►  Approval  ───►  Eval Receipt
   (rulebook)       (work order)      (agent output)     (referee     (ranked by      (human)         (chain-linked)
                                                          runs rules)   tier h/m/l)
```

Every step is declared, deterministic, and human-approvable.

## 1. Flight Sheet — the rulebook

A **Flight Sheet** is a versioned, declared eval template. It carries:

- `slug`, `name`, `version`, `lane` (`agent` for this lane).
- `assignment_instructions` — what the agent is told to do (evidence-only, label assumptions, flag missing inputs, no fabrication).
- `required_inputs` — what the agent needs to be given.
- `expected_outputs` — what the submission must contain.
- `eval_spec` — the executable spec the referee runs:
  - `required_output_schema` — structure the submission must match.
  - `deterministic_checks` — structure / schema / required-fields auto rules.
  - `math_checks` — formulas the engine recomputes from agent inputs.
  - `evidence_checks` — evidence-non-empty / assumptions-labeled rules.
  - `rules` — declared yes/no policy gates in the DSL.
  - `penalty` — variable-penalty bands for magnitude-driven flags.
- `audit_checks` — the rule list each check belongs to, with `kind` (auto/checklist), `category`, `tier`, `severity`.

Flight Sheets are content, not migrations. The library is upserted by slug at boot from `api/flight_sheets/*.json`.

## 2. Assignment — the work order

When a client creates an Eval Run, they pick a Flight Sheet and copy (or customize) the `assignment_instructions` into the Run. The Run also carries:

- The **agent profile** (the stack — model + harness + tools + runtime).
- The **evidence** the agent will need (property memo, T-12, source documents, etc.).

## 3. Submission — the agent's output

The agent runs (anywhere — owner compute, hosted, hybrid). It produces a **structured JSON submission** that conforms to the Flight Sheet's `required_output_schema`. The canonical submission shape:

```json
{
  "assignment_id": "<flight-sheet slug>",
  "agent_summary": "<one sentence>",
  "inputs_used": ["<field>", "..."],
  "missing_inputs": [],
  "claims": [{"claim": "<one>", "evidence_reference": "<source>", "confidence": "provided"}],
  "calculations": [
    {"name": "DSCR", "formula": "noi / annual_debt_service",
     "inputs": {"noi": 920000, "annual_debt_service": 706253}, "result": 1.303, "units": "ratio"}
  ],
  "risks": [],
  "assumptions": [],
  "open_questions": [],
  "final_output": "PASS",
  "self_check": {"all_required_sections_completed": true, "all_numbers_have_sources": true,
                 "assumptions_labeled": true, "missing_inputs_disclosed": true}
}
```

**Math has to be re-derivable.** Every `calculations[]` entry carries its own `formula` + `inputs` + claimed `result`. The referee recomputes the result from those inputs and flags if it disagrees.

## 4. Audit — the referee runs the rules

The referee runs the [rulebook engine](/defendableos/rulebook-engine/) over the submission:

1. **Structure** — required fields present? Missing → flag.
2. **Schema** — fields obey declared types? Wrong type → flag.
3. **Math re-derivation** — recompute every `calculations[]` result from its own inputs via a safe AST evaluator (handles the mortgage amortization formula, compound expressions). Beyond tolerance → flag with **variable penalty** (small miss = mid; ≥10% rel or material absolute $ = high).
4. **Evidence** — required fields non-empty; assumptions labeled; missing inputs disclosed.
5. **Policy DSL** — declared gates (e.g. `DSCR >= 1.20`) checked against the agent's own numbers. Missing operand → `skip` (never false-flag).

No LLM is called on the receipt path. A judge-model slot exists for *advisory* hallucination / readiness signals later, but it never gates the receipt.

## 5. Findings — the ranked report

The referee emits:

- **Score** = % of declared rules satisfied.
- **Severity** = honey · jelly · propolis (driven by the highest-tier flag).
- **Risk breakdown** = `{high, mid, low}` count of flag tiers.
- **Client ready** boolean.
- **Recommended action** = `resubmit | review | approve | reject` (what the rulebook implies).
- **Findings** = the flag list ranked **high → low** (catastrophic events surface first), each with its spot of the foul (`"DSCR recomputed 1.022 — gate 1.20 — MISMATCH"`).

Each flag is also sorted into one of three buckets via the [three-bucket taxonomy](/defendableos/rulebook-engine/#the-three-bucket-flag-taxonomy):

- **work-defect** — fixable; correct & resubmit (the agent).
- **deal-finding** — the math is right, the rule says no (the client).
- **stack-fit** — the model/compute is below the lane (the operator). *This is the sale.*

## 6. Approval — the human signs

Approval is required. The portal's **Approve** button (or `POST /runs/{id}/approve`) records the approver's identity into the receipt payload. **No receipt without approval.**

## 7. Eval Receipt — the chain-linked record

The eval receipt is minted via `POST /runs/{id}/receipt`:

- **Schema:** `defendablecloud.eval-receipt/v1`.
- **Payload:** Flight Sheet version, agent profile, assignment text, evidence hashes, submission hash, findings (ranked), verdict, approver, timestamp.
- **Chain:** `parent_hash` points at the org's prior receipt. SHA-256 over the canonical payload.
- **Render:** PDF via `fpdf2`, regenerable from the payload.
- **Share:** public `/r/<token>` URL — anyone can verify client-side, no auth.

## The Flight Sheet library

The eval lane is powered by a live library of ~50 Flight Sheets covering CRE underwriting, lending, dataset QA, compute attestation, document drafting, evidence extraction, financial math, GenAI checks, compliance, and repair-eligibility. Lanes are added by extending the library content (not by migrations).

The library is loaded at API boot from `api/flight_sheets/*.json`. The loader upserts by slug and deactivates anything absent. Historical Runs keep their `flight_sheet_id`.

> **Authoring discipline:** Flight Sheets are authored via a forge that validates against a rule registry — never hand-edited. Unknown auto-rule keys are rejected, not silently accepted. *(Forge tooling and the Kit-side rulebook sync are tracked separately; this docs sprint covers the lane doctrine itself.)*

## The trust boundary

> *"DefendableCloud is not AI judging AI. It is agent work tested against a declared rulebook."*

The proof layer is math and code. The referee has the rulebook. The referee throws flags. The human owns the final trust decision.

***

🐝 *Flight sheet · submission · audit · approval · receipt. The referee is a rulebook. To the shed.*
