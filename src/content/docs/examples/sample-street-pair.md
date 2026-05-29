---
title: Sample Street Pair
description: Proposed Communicator pair shape — roadmap, not a deployed endpoint.
---

:::note[Roadmap shape — Communicator is vision, not built]
This is the **proposed** Communicator / StreetChat pair shape. There is **no** `chat.mrdefendable.com` or Communicator endpoint deployed today — this JSON illustrates the intended pair-extraction format, not output from a running service. The grade shown mirrors the live DefendableCloud verdict vocabulary so the shape stays consistent across the ecosystem.
:::

Proposed Communicator pair, illustrated from a sample transcript:

```json
{
  "pair_type": "COMMUNICATOR",
  "pair_id": "SPAIR-20260524-01KSDTAEFG...",
  "source_event_id": "SCHAT-20260524-01KSDTAE9MJ3TPTAWD9G7RC1PZ",
  "input": {
    "raw_street_language": "Ship me the executable LOU and the 1031 amendment by end of day.",
    "context": "Pain in the Shed · Sample",
    "speaker": "Mr. Defendable"
  },
  "output": {
    "structured_intent": "SHIP · urgency=TODAY",
    "canonical_terms": ["to-the-shed", "books-and-records"],
    "client_explanation": "You asked us to ship · we read this as a today directive.",
    "backend_directive": "action=ship; urgency=TODAY; owner=Mr. Defendable",
    "evidence_required": [],
    "risk_flags": ["LEGAL_TAX"]
  },
  "grade": { "outcome": "pass", "severity": "honey", "score": 0.73, "score_100": 73 },
  "training_value": { "value_score": 0.8, "use_for_training": true }
}
```

The `grade` block uses the current verdict vocabulary — `outcome` (pass · risk · fail), `severity` (honey · jelly · propolis, lowercase), `score` (0–1) plus `score_100`. The legacy `tribunal_grade: { classification: "HONEY" }` enum has been retired in favor of the flag-driven `severity`. See [Sample Verdict](/examples/sample-tribunal-verdict/).

***

🐝 *Operator-grade · books and records · to the shed.*
