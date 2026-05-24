---
title: Street Pairs
description: The training-data unit. Communicator · SwarmFixer · Vocabulary pair types.
---

## What a street pair is

The unit of operator-language training data. Each pair is `input → output`:

| Pair type | Input | Output |
|---|---|---|
| **COMMUNICATOR** | Raw street language | Structured intent · canonical terms · client explanation · backend directive |
| **SWARMFIXER** | Failed agent output OR risk-flagged segment | Repair directive · remediation hint |
| **VOCABULARY** | Unknown emerging phrase | Proposed canonical term · slug · category |

## Schema

```json
{
  "pair_type": "COMMUNICATOR | SWARMFIXER | VOCABULARY",
  "pair_id": "SPAIR-{YYYYMMDD}-{ULID}",
  "source_event_id": "...",
  "input": { ... },
  "output": { ... },
  "tribunal_grade": { "classification": ..., "score": ..., "reason": ... },
  "training_value": { "value_score": ..., "use_for_training": true }
}
```

## Output format

Pairs are written as `.jsonl` files (one JSON object per line) for direct ingestion by training pipelines. See [Examples · Sample Street Pair](/examples/sample-street-pair/) for a complete example.

***

🐝 *Operator-grade · books and records · to the shed.*


> This is a foundational page in the DefendableDocs ecosystem map. The structure is committed · the deep content extends as the platform matures. Cross-references are live below.
