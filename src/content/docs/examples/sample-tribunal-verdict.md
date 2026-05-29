---
title: Sample Verdict
description: A real defendablecloud.verdict/v1 emitted by the referee on a CRE eval Run.
---

A live verdict from `cre_memo_dscr_ltv_v1` (the **DSCR and LTV Analysis** Flight Sheet) on a deal whose math is correct but whose DSCR comes in below the declared lending gate.

The referee returns the rolled-up **verdict** plus the full list of applied rules. Below is the verdict object as emitted by `GET /runs/{id}/verdict`:

```json
{
  "outcome": "fail",
  "summary": "Math reconciled; DSCR below the declared 1.20 gate.",
  "score": 0.875,
  "score_100": 88,
  "severity": "propolis",
  "client_ready": "Not client-ready: one high-tier policy flag.",
  "recommended_action": "review",
  "checks_passed": 7,
  "checks_failed": 1,
  "risk_breakdown": { "high": ["dscr_gate"], "mid": [], "low": [] }
}
```

The applied rules (`GET /runs/{id}/checks`) — each rule passes or raises a flag, deterministically. `check_key` is the rule id; `severity` here is the **rule's** declared pre-weight (a RuleSeverity), which `tier_of()` normalizes to a tier:

```json
[
  { "check_key": "sections_present",   "label": "Required sections present", "category": "structure", "status": "pass", "severity": "critical",    "detail": null },
  { "check_key": "citations_present",  "label": "Evidence is referenced",    "category": "evidence",  "status": "pass", "severity": "noncritical", "detail": null },
  { "check_key": "math_ltv",           "label": "LTV recompute",             "category": "math",      "status": "pass", "severity": "critical",    "detail": "ltv=0.7500" },
  { "check_key": "math_debt_service",  "label": "Debt service recompute",    "category": "math",      "status": "pass", "severity": "critical",    "detail": "annual_debt_service=703452" },
  { "check_key": "math_dscr",          "label": "DSCR recompute",            "category": "math",      "status": "pass", "severity": "critical",    "detail": "dscr=1.022" },
  { "check_key": "ltv_gate",           "label": "LTV <= 0.80",               "category": "policy",    "status": "pass", "severity": "noncritical", "detail": "ltv=0.7500 <= 0.80" },
  { "check_key": "coc_nonneg",         "label": "Cash-on-cash >= 0",         "category": "policy",    "status": "pass", "severity": "noncritical", "detail": null }
]
```

And the one flag — the **findings** array is the subset of checks whose `status` is `flag`:

```json
[
  {
    "check_key": "dscr_gate",
    "label": "DSCR >= 1.20",
    "category": "policy",
    "status": "flag",
    "severity": "critical",
    "detail": "DSCR recomputed 1.022 — gate 1.20 — MISMATCH"
  }
]
```

## How to read this

- **The math is right.** `math_ltv`, `math_debt_service`, `math_dscr` all `pass` — the referee recomputed every claimed number from the agent's own inputs and they reconciled.
- **The deal does not pencil under the declared gate.** `dscr_gate` flagged because the recomputed DSCR (1.022) is below the lane's declared threshold (1.20).
- **`outcome: "fail"`, `severity: "propolis"`** because the flag normalizes to a **high** tier. One high-tier flag is enough. (`outcome` is `pass | risk | fail`; `severity` is `honey | jelly | propolis`.)
- **This is a deal-finding, not a rework.** A `policy`-category flag means the math is right and the rule says no. Report it to the client.
- **`score_100: 88`, `score: 0.875`** — 7 of 8 declared rules satisfied, weighted by tier. Score is mechanical, not a quality grade.
- **`risk_breakdown`** is **lists of `check_key`s** by tier — `{ high: ["dscr_gate"], mid: [], low: [] }` — not counts. `client_ready` is a **string** readiness note.
- **`recommended_action: "review"`** — the rulebook surfaces this for client conversation, not for resubmission.

***

🐝 *Math right · gate failed · deal-finding · to the client · to the shed.*
