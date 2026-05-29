---
title: Verdict Schema
description: defendablecloud.verdict/v1 — the deterministic verdict produced by compute_verdict(). Outcome · score · severity · client_ready · recommended_action · risk_breakdown.
---

## Schema

The verdict is `class Verdict` in `api/app/schemas.py`, produced by
`compute_verdict()` in `api/app/eval.py` in `defendable-cloud-v2`. It is the
shape stamped into the `verdict` block of an eval receipt.

```json
{
  "outcome": "fail",
  "score": 0.78,
  "score_100": 78,
  "severity": "propolis",
  "client_ready": "No — high-risk flag",
  "recommended_action": "HIGH-RISK — resolve before release: DSCR re-derivation.",
  "summary": "7/8 rules passed · 1 high-risk, 0 mid, 0 low flag(s) · 78/100 weighted.",
  "checks_passed": 7,
  "checks_failed": 1,
  "risk_breakdown": {
    "high": ["DSCR re-derivation"],
    "mid": [],
    "low": []
  }
}
```

There is **no** top-level `schema` field on the verdict object, and the verdict
does **not** embed the `checks[]` / `findings[]` arrays — those are the
run-level check record (see below).

## Field meanings

| Field | Type | Meaning |
|---|---|---|
| `outcome` | string | `fail` (any high flag) · `risk` (mid flag) · `pass` (low/no flags). |
| `score` | float | `score_100 / 100`, rounded to 4 dp. |
| `score_100` | int | `round(100 × passed_weight / total_weight)`. % of declared rules satisfied, **tier-weighted**. Not a quality grade. |
| `severity` | string | Flag-driven tier: `propolis` (any high flag) · `jelly` (mid flag, no high) · `honey` (low/no flags). |
| `client_ready` | **string** | One of: `"Yes"` · `"Yes — minor notes only"` · `"With limitations / after repair"` · `"No — high-risk flag"`. Severity-tier-driven. |
| `recommended_action` | string | The next move the rulebook implies, naming the flagged labels. |
| `summary` | string | One-line readout: rules passed, flags by tier, weighted score. |
| `checks_passed` | int | Count of `pass` checks. |
| `checks_failed` | int | Count of `flag` checks. |
| `risk_breakdown` | `Dict[str, List[str]]` | Lists of **flagged rule labels** by tier: `{high: [...], mid: [...], low: [...]}`. |

## Tier semantics

Score is tier-weighted (`TIER_WEIGHT = {high: 5, mid: 2, low: 1}`) so a
high-risk miss drops it hard. `tier_of()` normalizes a rule's declared
severity (including legacy values) to `high | mid | low`.

| Tier | Weight | Severity if flagged |
|---|---|---|
| `high` | 5× | propolis (a game-changer — do not release) |
| `mid` | 2× | jelly (usable with limitations / after repair) |
| `low` | 1× | honey (small hit — safe to release, noted) |

## CheckResult (Run-level)

The per-rule check records are a **separate shape** from the verdict. They are
produced by `run_audit()` in `api/app/eval.py` (one record per declared rule)
and carried in the receipt's own `checks` / `findings` arrays — not inside the
verdict object.

| Field | Meaning |
|---|---|
| `check_key` | Rule key from the Flight Sheet. |
| `label` | Human label. |
| `category` | `structure` · `schema` · `math` · `evidence` · `policy`. |
| `kind` | `auto` (code applies it) · `checklist` (operator applies a binary rule). |
| `severity` | The rule's declared pre-weight; `tier_of()` normalizes it. |
| `source` | `auto` or `operator`. |
| `status` | `pass` · `flag` · `open` (operand missing / operator not yet applied — never false-flag). |
| `detail` | Spot of the foul, e.g. `DSCR recomputed 1.022 — gate 1.20 — MISMATCH`. |

A `Finding` is a `Check` whose `status` is `flag` — a *located defect*, bucketed
by category: `work_defect` (math/schema/structure/evidence — correct & resubmit)
· `deal_finding` (policy — the math is right, the rule says no) · `stack_fit`
(attributed by the run's agent_profile capability tier).

:::note[Two referees, one rulebook]
The `auto` checks in `eval.py` are **heuristic text rules**. The
**deterministic** JSON-schema field checks, type checks, and MATH re-derivation
of each calculation from its own inputs + formula live in the structured
executor, `api/app/executor.py`. Both apply a declared rulebook and throw
flags — neither is a judge model and neither emits a quality opinion. We are
math and code.
:::

## Source of truth

`class Verdict` in `api/app/schemas.py`, produced by `compute_verdict()` in
`api/app/eval.py`, in `defendable-cloud-v2`. It is **deterministic** — same
Flight Sheet + same submission → same verdict, every time.

***

🐝 *defendablecloud.verdict/v1 · the canonical verdict shape · to the shed.*
