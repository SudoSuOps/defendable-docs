---
title: Sample Verdict
description: A real defendablecloud.verdict/v1 emitted by the referee on a CRE eval Run.
---

A live verdict from `cre_memo_dscr_ltv_v1` (the DSCR + LTV analysis Flight Sheet) on a deal whose math is correct but whose DSCR comes in below the declared lending gate:

```json
{
  "schema": "defendablecloud.verdict/v1",
  "severity": "propolis",
  "score_100": 87.5,
  "client_ready": false,
  "recommended_action": "review",
  "risk_breakdown": { "high": 1, "mid": 0, "low": 0 },
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
      "key": "citations_present",
      "label": "Evidence is referenced",
      "category": "evidence",
      "kind": "auto",
      "tier": "mid",
      "status": "pass",
      "detail": null
    },
    {
      "key": "math_ltv",
      "label": "LTV recompute",
      "category": "math",
      "kind": "auto",
      "tier": "high",
      "status": "pass",
      "detail": "ltv=0.7500"
    },
    {
      "key": "math_debt_service",
      "label": "Debt service recompute",
      "category": "math",
      "kind": "auto",
      "tier": "high",
      "status": "pass",
      "detail": "debt_service=706253"
    },
    {
      "key": "math_dscr",
      "label": "DSCR recompute",
      "category": "math",
      "kind": "auto",
      "tier": "high",
      "status": "pass",
      "detail": "dscr=1.022"
    },
    {
      "key": "ltv_gate",
      "label": "LTV ≤ 0.80",
      "category": "policy",
      "kind": "auto",
      "tier": "mid",
      "status": "pass",
      "detail": "ltv=0.7500 ≤ 0.80"
    },
    {
      "key": "dscr_gate",
      "label": "DSCR ≥ 1.20",
      "category": "policy",
      "kind": "auto",
      "tier": "high",
      "status": "flag",
      "detail": "DSCR recomputed 1.022 — gate 1.20 — MISMATCH"
    },
    {
      "key": "coc_nonneg",
      "label": "Cash-on-cash ≥ 0",
      "category": "policy",
      "kind": "auto",
      "tier": "mid",
      "status": "pass",
      "detail": null
    }
  ],
  "findings": [
    {
      "key": "dscr_gate",
      "label": "DSCR ≥ 1.20",
      "tier": "high",
      "severity": "critical",
      "detail": "DSCR recomputed 1.022 — gate 1.20 — MISMATCH",
      "bucket": "deal_finding"
    }
  ]
}
```

## How to read this

- **The math is right.** `math_ltv`, `math_debt_service`, `math_dscr` all `pass` — the referee recomputed every claimed number from the agent's own inputs and they reconciled.
- **The deal does not pencil under the declared gate.** `dscr_gate` flagged because the recomputed DSCR (1.022) is below the lane's declared threshold (1.20).
- **Severity = propolis** because the flag's tier is `high`. One high-tier flag is enough.
- **Bucket = `deal_finding`** — the math is right, the rule says no. **This is not a rework.** It is a real result. Report to the client.
- **score_100 = 87.5** — 7 of 8 declared rules satisfied. Score is mechanical, not a quality grade.
- **recommended_action = "review"** — the rulebook surfaces this for client conversation, not for resubmission.

***

🐝 *Math right · gate failed · deal-finding · to the client · to the shed.*
