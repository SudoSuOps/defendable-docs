---
title: Verdict Schema
description: defendablecloud.verdict/v1 — the verdict record emitted by the referee. Severity · score_100 · client_ready · recommended_action · risk_breakdown · checks · findings.
---

## Schema

`defendablecloud.verdict/v1` — the verdict shape produced by `api/app/eval.py` in `defendable-cloud-v2` and stamped onto every Run.

```json
{
  "schema": "defendablecloud.verdict/v1",
  "severity": "honey | jelly | propolis",
  "score_100": 100.0,
  "client_ready": true,
  "recommended_action": "approve | review | resubmit | reject",
  "risk_breakdown": { "high": 0, "mid": 0, "low": 0 },
  "checks": [
    {
      "key": "<rule-key from Flight Sheet>",
      "label": "<human label>",
      "category": "structure | schema | math | evidence | policy",
      "kind": "auto | checklist",
      "tier": "low | mid | high",
      "status": "pass | flag | open",
      "detail": "<optional explanation, e.g. 'DSCR recomputed 1.022 — gate 1.20 — MISMATCH'>"
    }
  ],
  "findings": [
    {
      "key": "<rule-key>",
      "label": "<human label>",
      "tier": "low | mid | high",
      "severity": "critical | noncritical",
      "detail": "<spot of the foul>",
      "bucket": "work_defect | deal_finding | stack_fit"
    }
  ]
}
```

## Field meanings

| Field | Required | Meaning |
|---|---|---|
| `schema` | yes | Schema id + version. Always `defendablecloud.verdict/v1` for current runs. |
| `severity` | yes | Verdict severity. `honey` (no flags + approved) · `jelly` (mid/low flags only) · `propolis` (any high-tier flag). |
| `score_100` | yes | `(rules_satisfied / rules_declared) × 100`. % of declared rules satisfied. **Not** a quality grade. |
| `client_ready` | yes | Derived from severity + lane's `human_approval_required` policy. |
| `recommended_action` | yes | The next move the rulebook implies. |
| `risk_breakdown` | yes | Count of flags by tier. Used to rank the findings. |
| `checks` | yes | Per-check result list. Status ∈ `pass` · `flag` · `open`. |
| `findings` | yes | Flag list ranked **high → low**. Each flag is bucketed by the three-bucket taxonomy. |

## Status values for `checks[].status`

| Status | Meaning |
|---|---|
| `pass` | Rule satisfied. |
| `flag` | Rule violated; contributes to severity. |
| `open` | Rule applies but operand missing (`skip` — never false-flag). |

## Tier semantics

| Tier | Weight for ranking | Severity if flagged |
|---|---|---|
| `high` | 5× | critical → propolis |
| `mid` | 2× | noncritical → jelly |
| `low` | 1× | noncritical → jelly |

## The three-bucket sort

Every flag is sorted into one bucket:

- `work_defect` — the agent missed (math / schema / evidence). Fixable; resubmit.
- `deal_finding` — policy gate failed (math is right, rule says no). Not a rework.
- `stack_fit` — agent capability below the lane. Bigger brain · bigger compute · different lane.

See [Tribunal · Verdict JSON](/tribunal/verdict-json/) for the operational walkthrough and [Rulebook Engine · The three-bucket flag taxonomy](/defendableos/rulebook-engine/#the-three-bucket-flag-taxonomy) for the doctrine.

## Source of truth

The schema lives in code: `api/app/schemas/verdict.py` in `defendable-cloud-v2`. The verdict is produced by `api/app/eval.py` from the structured executor + DSL rules. It is **deterministic** — same Flight Sheet + same submission → same verdict, every time.

***

🐝 *defendablecloud.verdict/v1 · the canonical verdict shape · to the shed.*
