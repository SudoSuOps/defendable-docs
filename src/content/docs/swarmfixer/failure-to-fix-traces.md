---
title: Failure → Fix Traces
description: The proposed trace structure that would prove a fix happened.
---

:::note[Roadmap]
The failure → fix trace structure described here is **design intent**, not built.
No SwarmFixer service produces these traces today. The schema below is proposed.
:::

Every repair attempt would produce a trace with the proposed fields:

- `failure_id`
- `failure_mode`
- `repair_directive`
- `pre_score`
- `post_score`
- `repair_lift`
- `time_to_fix`

When built, these traces would be recorded against the same **content-integrity
SHA-256 hash-chain pattern** DefendableCloud receipts use today — a per-org chain
persisted in Postgres, with each entry linking to the prior receipt's hash. That is
content-integrity linkage, not a blockchain anchor. DDEED anchoring is roadmap and
vision, not deployed; these traces would not be written to any external chain.

***

🐝 *Operator-grade · books and records · to the shed.*
