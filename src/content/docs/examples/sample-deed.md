---
title: Sample Deed
description: A DDEED-VOCABULARY-TERM with all 5 Proofs filled out. In-house hash-chained · no external anchor.
---

:::note[Roadmap shape — not a live API artifact]
This is the **proposed shape** for a DDEED vocabulary deed (Defend-A-Pedia · [DefendableLedger](/defendableledger/kill-hedera/)). There is **no deployed deed-minting endpoint** today. The live, hash-chained artifact right now is the per-org **eval / cook / incident / dataset-download / model-pin receipt** minted by `api.defendablecloud.com` — see [Sample Receipt](/examples/sample-receipt/). The deed below illustrates the books-and-records direction, not running output.
:::

A `DDEED_VOCABULARY_TERM` from Defend-A-Pedia v0.3.0 — the vocabulary term *Probability of Close*, deeded into the DefendableLedger books-and-records:

```json
{
  "deed_type": "DDEED_VOCABULARY_TERM",
  "deed_id": "DDEED-VOCAB-CRE_TERMS-PROBABILITY-OF-CLOSE-v1",
  "deed_version": "v1",
  "term": "Probability of Close",
  "slug": "probability-of-close",
  "category": "cre_terms",
  "five_proofs": {
    "origin": {
      "speakers": ["Mr. Defendable"],
      "recorded_at": "2026-05-24T22:33:26Z",
      "session_id": "SCHAT-20260524-01KSDTAE9MJ3TPTAWD9G7RC1PZ"
    },
    "quality": {
      "verdict": {
        "outcome": "pass",
        "severity": "honey",
        "score_100": 100,
        "client_ready": "Client-ready: no flags, approved.",
        "recommended_action": "approve",
        "checks_passed": 6,
        "checks_failed": 0,
        "risk_breakdown": { "high": [], "mid": [], "low": [] }
      }
    },
    "process": {
      "pipeline_version": "vocab-mint-v1",
      "rulebook_version": "defend-a-pedia-vocab-rules/v1"
    },
    "economics": {
      "cost_to_mint": {
        "compute_usd": 0.0006,
        "human_review_min": 4,
        "storage_kb": 12
      }
    },
    "trust": {
      "payload_sha256": "71fb7a3a8c1f2e9d6b4a3c5e7f8a9b0c1d2e3f4a5b6c7d8e9f0a1b2c3d4e5f6a",
      "ledger_seq": 42,
      "parent_hash": "d508f5a9b6c4e1d2f8a3b7c5e9d0f1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8"
    }
  },
  "hashes": {
    "markdown_sha256": "d508f5a9b6c4e1d2f8a3b7c5e9d0f1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8",
    "json_sha256": "71fb7a3a8c1f2e9d6b4a3c5e7f8a9b0c1d2e3f4a5b6c7d8e9f0a1b2c3d4e5f6a"
  },
  "minted_at_utc": "2026-05-24T22:35:00Z"
}
```

## What changed from the legacy sample

The 2026-05-24 doctrine lock removed external chain anchoring from the spine. **Trust proofs no longer carry a `hedera_topic` field** (or any external chain transaction id). Trust is established by the in-house per-org hash chain (for receipts) and the append-only JSONL hash chain (for ledger deeds).

The `quality` proof previously carried a fixed `tribunal_classification` enum + `validator_confidence` dial. It now mirrors the real verdict rollup — the same shape DefendableCloud emits at `GET /runs/{id}/verdict`: `outcome` (pass · risk · fail), `severity` (honey · jelly · propolis), `score_100` = % of declared rules satisfied, `checks_passed`/`checks_failed`, `client_ready` as a string, and `risk_breakdown` as **lists of `check_key`s** by tier. See [Sample Verdict](/examples/sample-tribunal-verdict/) for the live shape.

See [Kill Hedera doctrine](/defendableledger/kill-hedera/) for the rationale.

***

🐝 *Five proofs · in-house hash · no external anchor · to the shed.*
