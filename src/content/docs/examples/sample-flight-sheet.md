---
title: Sample Flight Sheet
description: A live DefendableCloud eval Flight Sheet — the assignment plus the declared rulebook.
---

A **Flight Sheet** is the product primitive: the declared assignment plus the rulebook the referee applies. This is `cre_memo_dscr_ltv_v1` — one of the sheets live on the `/flight-sheets` surface at `api.defendablecloud.com`.

```json
{
  "slug": "cre_memo_dscr_ltv_v1",
  "name": "DSCR and LTV Analysis",
  "version": "1.0",
  "lane": "agent",
  "summary": "Calculate DSCR and LTV from deal terms, compare against standard lending thresholds (DSCR >= 1.20, LTV <= 0.80), and flag threshold violations.",
  "required_inputs": ["appraised_value", "loan_amount", "interest_rate", "amortization_years", "noi"],
  "pass_threshold": 80,
  "fail_threshold": 60,
  "audit_checks": [
    { "key": "sections_present",  "label": "Required sections present", "category": "structure", "kind": "auto",      "severity": "critical" },
    { "key": "citations_present", "label": "Evidence is referenced",    "category": "evidence",  "kind": "auto",      "severity": "noncritical" },
    { "key": "missing_dscr_calculation", "label": "Missing DSCR calculation", "category": "math",  "kind": "checklist", "severity": "critical" },
    { "key": "dscr_below_threshold",     "label": "DSCR below threshold",     "category": "policy", "kind": "checklist", "severity": "noncritical" },
    { "key": "math_result_incorrect",    "label": "Math result incorrect",    "category": "math",  "kind": "checklist", "severity": "critical" }
  ]
}
```

The sheet also carries a structured `eval_spec` consumed by the deterministic executor (`app/executor.py`): a `required_output_schema` (JSON-schema field presence), `math_checks` (each formula re-derived from its own inputs against an `expected_result` + `tolerance`), `evidence_checks`, `flag_rules`, and a `rules` DSL. One declared rule:

```json
{
  "id": "dscr_gate",
  "label": "DSCR >= 1.20 lending gate",
  "category": "policy",
  "expr": { "op": ">=", "left": { "calc": "Debt Service Coverage Ratio" }, "right": 1.2 },
  "risk": "high"
}
```

## How to read this

- **`category`** is one of `structure | schema | math | evidence | policy`.
- **`kind`** is `auto` (the engine decides pass/flag deterministically) or `checklist` (a binary human-applied rule: satisfied or raise a flag).
- **`severity` / `risk`** is the rule's declared pre-weight; `tier_of()` normalizes it to a tier (`low | mid | high`). A `high`-tier flag rolls the verdict to `propolis`.
- **`math_checks`** are the heart of "we are math and code" — the referee re-derives each calculation from its own inputs and formula, then compares to the expected result within tolerance. No model opinion.

This is the rulebook behind the [Sample Verdict](/examples/sample-tribunal-verdict/) and [Sample Receipt](/examples/sample-receipt/) — same sheet, end to end.

***

🐝 *The declared game plan · math and code · to the shed.*
