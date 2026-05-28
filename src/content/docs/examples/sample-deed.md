---
title: Sample Deed
description: A DDEED-VOCABULARY-TERM with all 5 Proofs filled out. In-house hash-chained · no external anchor.
---

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
        "schema": "defendablecloud.verdict/v1",
        "severity": "honey",
        "score_100": 100.0,
        "client_ready": true,
        "recommended_action": "approve",
        "risk_breakdown": { "high": 0, "mid": 0, "low": 0 }
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

The `quality` proof previously carried a fixed `tribunal_classification` enum + `validator_confidence` dial. It now embeds a [defendablecloud.verdict/v1](/schemas/tribunal-verdict/) — 3 severities (honey · jelly · propolis), score = % of declared rules satisfied, risk breakdown by tier.

See [Kill Hedera doctrine](/defendableledger/kill-hedera/) for the rationale.

***

🐝 *Five proofs · in-house hash · no external anchor · to the shed.*
