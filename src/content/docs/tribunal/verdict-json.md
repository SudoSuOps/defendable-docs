---
title: Verdict JSON
description: The canonical verdict shape emitted by the referee. Severity · score_100 · client_ready · recommended_action · risk_breakdown · ranked findings.
---

:::note[Legacy schema — SUPERSEDED]
Earlier docs described a verdict with `classification: HONEY/ROYAL_JELLY/JELLY/PROPOLIS/UNCLASSIFIED`, `validator_confidence`, `evidence_strength`, `risk_temperature`, and `score_components` (the 6-dim weighted dial). That schema is **superseded**. The live shape is below.
:::

## The live verdict shape

This is the exact object emitted by `_verdict_out()` in `api/app/routes/runs.py` (built by `compute_verdict()` in `app/eval.py`). The verdict carries **no `schema` field** and **no embedded `checks[]`** — checks ride a separate endpoint (see below).

```json
{
  "outcome": "pass",
  "summary": "8/8 rules passed · 0 high-risk, 0 mid, 0 low flag(s) · 100/100 weighted.",
  "score": 1.0,
  "score_100": 100,
  "severity": "honey",
  "client_ready": "Yes",
  "recommended_action": "No flags raised. Approve and issue the receipt.",
  "checks_passed": 8,
  "checks_failed": 0,
  "risk_breakdown": { "high": [], "mid": [], "low": [] },
  "created_at": "2026-05-29T14:02:11Z"
}
```

## Field meanings

| Field | What it is |
|---|---|
| `outcome` | `pass` · `risk` · `fail`. The headline result. (`pass`↔honey, `risk`↔jelly, `fail`↔propolis.) |
| `summary` | Free-text one-liner — `N/M rules passed · h high, m mid, l low flag(s) · S/100 weighted.` |
| `score` | Float `0.0 – 1.0` — `score_100 / 100`. |
| `score_100` | Integer `0 – 100`. `(passed_weight / total_weight) × 100`, tier-weighted (high=5, mid=2, low=1). The **% of declared rules satisfied**, not a quality grade. |
| `severity` | `honey` · `jelly` · `propolis`. Driven by the highest-tier flag present. |
| `client_ready` | **A string, not a boolean.** Examples: `"Yes"` · `"Yes — minor notes only"` · `"With limitations / after repair"` · `"No — high-risk flag"`. |
| `recommended_action` | **Advisory free-text sentence**, not an enum. E.g. `"HIGH-RISK — resolve before release: DSCR gate."` or `"No flags raised. Approve and issue the receipt."` |
| `checks_passed` / `checks_failed` | Integer counts of applied checks that passed / flagged. |
| `risk_breakdown` | `{ high: [labels], mid: [labels], low: [labels] }` — raised-flag **labels** grouped by tier. Used to rank the report. |
| `created_at` | ISO timestamp the verdict was computed. |

## Where the checks live: `/runs/{id}/checks`

The per-check results are **not** embedded in the verdict — they are fetched from `GET /runs/{id}/checks` (serialized by `_check_out_full`). Each check is:

```json
{
  "check_key": "dscr_gate",
  "label": "DSCR ≥ 1.20",
  "category": "policy",
  "status": "flag",
  "severity": "high",
  "source": "auto",
  "detail": "DSCR recomputed 1.022 — gate 1.20 — MISMATCH"
}
```

| Field | What it is |
|---|---|
| `check_key` | The rule's stable key. |
| `label` | Human-readable rule name. |
| `category` | `structure` · `schema` · `math` · `evidence` · `policy`. |
| `status` | `pass` · `flag` · `open` (operator checklist rule awaiting a human) · `skip` (not machine-evaluable in v1). |
| `severity` | The rule's declared/escalated tier — `high` · `mid` · `low`. |
| `source` | `auto` (engine) or `operator` (human applies the binary rule). |
| `detail` | The spot of the foul — what was checked and what was found. |

## Severity rollup

| Severity | When |
|---|---|
| **honey** | No flags + human approved. |
| **jelly** | One or more mid- or low-tier flags; no high-tier flags. |
| **propolis** | Any high-tier flag present. |

## Findings on the receipt

The eval **receipt** (`build_eval_receipt`, schema `defendablecloud.eval-receipt/v1`) embeds the verdict object alongside a **separate flattened `findings[]`** array. Each finding is the real shape below — there is **no `tier`, no `key`, and no `bucket`** field emitted on the wire:

```json
{
  "label": "DSCR ≥ 1.20",
  "category": "policy",
  "status": "flag",
  "severity": "high",
  "detail": "DSCR recomputed 1.022 — gate 1.20 — MISMATCH"
}
```

| Field | What it is |
|---|---|
| `label` | Human-readable rule name. |
| `category` | `structure` · `schema` · `math` · `evidence` · `policy`. |
| `status` | `flag` (findings on the receipt are the flagged checks). |
| `severity` | The flag's tier — `high` · `mid` · `low`. |
| `detail` | The spot of the foul. |

### `bucket` is doctrine, not a field

The three-bucket sort is a **doctrine attribution derived from `category`** at read time — it is **not an emitted field**. The mapping:

- **`work_defect`** — `category` ∈ `math` · `schema` · `structure` · `evidence`. Fixable; resubmit.
- **`deal_finding`** — `category` = `policy` (the math is right; the rule says no). Not a rework.
- **`stack_fit`** — attributed from the run's `agent_profile` capability tier (model/compute below the lane). Bigger brain, bigger compute, different lane.

See [Rulebook Engine · The three-bucket flag taxonomy](/defendableos/rulebook-engine/#the-three-bucket-flag-taxonomy) for the operational doctrine.

## Schema source of truth

The live verdict is produced by `compute_verdict()` in `api/app/eval.py` (`defendable-cloud-v2`) and serialized by `_verdict_out()` in `app/routes/runs.py`; the receipt envelope is built by `build_eval_receipt()` in `app/receipts.py`. The eval receipt rides the **per-org hash chain** along with the submission hash, evidence hashes, agent profile, and approver identity.

***

🐝 *One verdict shape. One chain. To the shed.*
