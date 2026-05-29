---
title: Street Talk → Directive
description: "Worked example: client utterance to structured directive · with canonical-term mapping."
---

:::note[Roadmap]
This is an **illustrative target output** of the planned Communicator rail · not a live endpoint. There is no shipped street-talk-to-directive API today. The example below shows the shape the meaning layer is designed to produce.
:::

Input:

```text
can you pull color on that asset and get me a flight sheet by EOD
```

Target output:

```json
{
  "action": "flight_sheet",
  "urgency": "TODAY",
  "evidence_required": ["color on the asset"],
  "canonical_terms": ["color", "flight-sheet", "probability-of-close"]
}
```

***

🐝 *Operator-grade · books and records · to the shed.*
