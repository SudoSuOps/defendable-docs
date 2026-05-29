---
title: Submit an Agent
description: How to submit an agent for benchmarking.
---

:::note[Roadmap — not yet implemented]
There is no AgentBench submission flow today. The entire flow below is unbuilt design
intent, documented so the plan is on the record. To produce a real, hash-chained proof
right now, use the **DefendableCloud Defendable Run** at `api.defendablecloud.com`, whose
receipts are live and verifiable.
:::

The intended submission flow would work like this:

1. Submit via the AgentBench submission interface (planned).
2. Provide the agent identifier, runtime endpoint, API schema, and test credentials.
3. AgentBench would run the standard benchmark pack against the agent.
4. The run would produce a structured verdict.

DDEED anchoring of these submissions is a **roadmap** item — no `DDEED-BENCH-*` receipt
type exists yet, and none is emitted today. The real, built proof mechanism is the
DefendableCloud receipt: each run mints a receipt in a per-org hash chain
(`DCR-{org_seq}-{hex}`) that `/ledger/verify` can recompute and confirm.

***

🐝 *Operator-grade · books and records · to the shed.*
