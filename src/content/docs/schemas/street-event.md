---
title: Street Event Schema
description: The StreetChat event canonical JSON. Canonical-shape / roadmap.
---

A **street-event** is the canonical capture record for the StreetChat intake
lane — a recorded conversation, call, or field capture that can be graded and
mined into training pairs.

:::note[Roadmap]
StreetChat intake is part of the **vision lane**, not a deployed endpoint. The
schema below is the **declared shape**; there is no live ingestion endpoint
accepting street-events today.
:::

## Schema

```json
{
  "event_type": "call | session | field_capture",
  "event_id": "…",
  "source_type": "voice | text | recording",
  "title": "…",
  "recorded_at": "2026-05-29T20:00:00Z",

  "participants": ["…"],
  "duration": 0,
  "raw_audio": "…",
  "transcript": "…",
  "street_meaning": "…",
  "tribunal": { "verdict": "…" },
  "pairs": ["SPAIR-…"],
  "ledger": { "deed_id": "…" }
}
```

| Field | Required | Meaning |
|---|---|---|
| `event_type` | yes | The kind of capture. |
| `event_id` | yes | Stable id. |
| `source_type` | yes | Capture modality. |
| `title` | yes | Human label. |
| `recorded_at` | yes | ISO timestamp. |
| `participants` | no | Speakers. |
| `duration` | no | Length. |
| `raw_audio` | no | Pointer to source audio. |
| `transcript` | no | Text transcript. |
| `street_meaning` | no | Operator-vocabulary annotation. |
| `tribunal` | no | The referee grade, when applied. |
| `pairs` | no | Training pairs extracted (see [Street Pair](/schemas/street-pair/)). |
| `ledger` | no | DefendableLedger deed pointer, when sealed. |

## Source of truth

The declared schema lives at `streetchat/schemas/street_event.schema.json` — the
canonical-shape repo pointer, not a live ingestion endpoint.

***

🐝 *Operator-grade · books and records · to the shed.*
