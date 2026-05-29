---
title: Street Pair Schema
description: The training-pair record across COMMUNICATOR / SWARMFIXER / VOCABULARY pair types. Canonical-shape / roadmap.
---

A **street-pair** is a single training pair extracted from a graded
[street-event](/schemas/street-event/) — input/output plus its provenance and
grade.

:::note[Canonical-shape / roadmap]
Street-pairs feed the **SwarmFixer / Communicator / vocabulary** lanes, which
are vision — not deployed. The schema below is the **declared training-pair
shape**, not a live extraction endpoint.
:::

## Schema

Pattern: `SPAIR-{YYYYMMDD}-{ULID}`.

```json
{
  "pair_type": "communicator | swarmfixer | vocabulary",
  "pair_id": "SPAIR-20260529-01J…",
  "source_event_id": "…",
  "input": "…",
  "output": "…",

  "tribunal_grade": { "severity": "honey | jelly | propolis", "score_100": 0 },
  "training_value": "apex | honey | jelly | pollen | propolis"
}
```

| Field | Required | Meaning |
|---|---|---|
| `pair_type` | yes | Which downstream lane the pair feeds. |
| `pair_id` | yes | `SPAIR-{YYYYMMDD}-{ULID}`. |
| `source_event_id` | yes | The street-event it was extracted from. |
| `input` | yes | The prompt / situation. |
| `output` | yes | The graded response. |
| `tribunal_grade` | no | The referee grade applied to the pair. |
| `training_value` | no | Royal Jelly tier routing. |

***

🐝 *Operator-grade · books and records · to the shed.*
