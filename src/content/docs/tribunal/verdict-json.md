---
title: Verdict JSON
description: The canonical verdict shape emitted by the referee. Severity · score_100 · client_ready · recommended_action · risk_breakdown · ranked findings.
---

:::note[Legacy schema — SUPERSEDED]
Earlier docs described a verdict with `classification: HONEY/ROYAL_JELLY/JELLY/PROPOLIS/UNCLASSIFIED`, `validator_confidence`, `evidence_strength`, `risk_temperature`, and `score_components` (the 6-dim weighted dial). That schema is **superseded**. The live shape is below.
:::

## The live verdict shape

```json
{
  "schema": "defendablecloud.verdict/v1",
  "severity": "honey",
  "score_100": 100.0,
  "client_ready": true,
  "recommended_action": "approve",
  "risk_breakdown": { "high": 0, "mid": 0, "low": 0 },
  "findings": [],
  "checks": [
    {
      "key": "sections_present",
      "label": "Required sections present",
      "category": "structure",
      "kind": "auto",
      "tier": "high",
      "status": "pass",
      "detail": null
    },
    {
      "key": "dscr_gate",
      "label": "DSCR ≥ 1.20",
      "category": "policy",
      "kind": "auto",
      "tier": "high",
      "status": "pass",
      "detail": "dscr=1.303"
    }
  ]
}
```

## Field meanings

| Field | What it is |
|---|---|
| `schema` | `defendablecloud.verdict/v1` — the verdict schema version. |
| `severity` | `honey` · `jelly` · `propolis`. Driven by the highest-tier flag present. |
| `score_100` | `(rules_satisfied / rules_declared) × 100`. % of declared rules satisfied. Not a quality grade. |
| `client_ready` | Boolean — derived from `severity` (`honey` → true) and any declared `human_approval_required` policy. |
| `recommended_action` | `approve` · `review` · `resubmit` · `reject`. What the rulebook implies for the next move. |
| `risk_breakdown` | Count of flags by tier. Used to rank the findings in the report. |
| `findings` | Ranked list of flags (high → low). Each flag carries the rule key, label, tier, severity, the spot of the foul (`detail`), and the three-bucket sort (`bucket`: `work_defect` · `deal_finding` · `stack_fit`). |
| `checks` | Full per-check result list. `status` ∈ `pass` · `flag` · `open`. `tier` and `severity` follow the Flight Sheet's declaration. |

## Severity rollup

| Severity | When |
|---|---|
| **honey** | No flags + human approved. |
| **jelly** | One or more mid- or low-tier flags; no high-tier flags. |
| **propolis** | Any high-tier flag present. |

## Finding shape (within `findings[]`)

```json
{
  "key": "dscr_gate",
  "label": "DSCR ≥ 1.20",
  "tier": "high",
  "severity": "critical",
  "detail": "DSCR recomputed 1.022 — gate 1.20 — MISMATCH",
  "bucket": "deal_finding"
}
```

`bucket` is the three-bucket sort:

- **`work_defect`** — math / schema / structure / evidence. Fixable; resubmit.
- **`deal_finding`** — policy gate failed (math is right, rule says no). Not a rework.
- **`stack_fit`** — model/compute below the lane. Bigger brain, bigger compute, different lane.

See [Rulebook Engine · The three-bucket flag taxonomy](/defendableos/rulebook-engine/#the-three-bucket-flag-taxonomy) for the operational doctrine.

## Schema source of truth

See [Schemas · Tribunal Verdict](/schemas/tribunal-verdict/) for the canonical field-by-field schema. The live verdict on a receipt is produced by `api/app/eval.py` in `defendable-cloud-v2` and rides the per-org hash chain along with the submission hash, evidence hashes, agent profile, and approver identity.

***

🐝 *One verdict shape. One chain. To the shed.*
