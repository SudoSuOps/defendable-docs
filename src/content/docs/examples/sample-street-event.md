---
title: Sample Street Event
description: Proposed STREETCHAT_EVENT JSON — roadmap, not a deployed endpoint.
---

:::note[Roadmap shape — StreetChat is vision, not deployed]
StreetChat is a planned intake surface. There is **no public StreetChat endpoint** today (no `chat.mrdefendable.com` pull). The JSON below is the proposed canonical event shape — see [Schemas · Street Event](/schemas/street-event/) — not output from a running session.
:::

A proposed `STREETCHAT_EVENT`, consistent with the canonical schema (required: `event_type` · `event_id` · `source_type` · `title` · `recorded_at`):

```json
{
  "event_type": "STREETCHAT_EVENT",
  "event_id": "SCHAT-20260524-01KSDTAE9MJ3TPTAWD9G7RC1PZ",
  "source_type": "voice_memo",
  "title": "LOU + 1031 amendment ship directive",
  "recorded_at": "2026-05-24T22:33:26Z",
  "participants": ["Mr. Defendable"],
  "duration_sec": 41,
  "transcript": "Ship me the executable LOU and the 1031 amendment by end of day.",
  "street_meaning": "Today directive: produce and send the LOU and the 1031 amendment.",
  "pairs": ["SPAIR-20260524-01KSDTAEFG..."],
  "ledger": { "ledger_seq": null }
}
```

Optional fields (`participants`, `duration`, `raw_audio`, `transcript`, `street_meaning`, `tribunal`, `pairs`, `ledger`) attach as a session is processed. Extracted pairs would route to the [Communicator pair](/examples/sample-street-pair/) shape.

***

🐝 *Operator-grade · books and records · to the shed.*
