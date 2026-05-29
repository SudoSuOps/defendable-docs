---
title: Street Pairs
description: The training-data unit. Communicator · SwarmFixer · Vocabulary pair types.
---

:::note[Roadmap — proposed format, not yet emitted]
The street-pair schema below is the **designed** training-data unit. It is the *proposed* format and is **not yet emitted by built code** in the audited codebase. (See the [overview](/streetchat/overview/) for full status.)
:::

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

Pairs are designed to be written as `.jsonl` files (one JSON object per line) for direct ingestion by training pipelines. See [Examples · Sample Street Pair](/examples/sample-street-pair/) for a complete example.

The `tribunal_grade.classification` field carries the same verdict tiers that ARE real in DefendableCloud (`defendable-cloud-v2`): **honey** (pass), **jelly** (risk), **propolis** (fail). The street-pair grade speaks the Cloud referee's rulebook vocabulary.

***

🐝 *Operator-grade · books and records · to the shed.*
