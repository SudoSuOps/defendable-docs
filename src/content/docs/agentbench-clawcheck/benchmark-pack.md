---
title: Benchmark Pack
description: The standard benchmark pack. 6 RJ-task categories · 35 signal types per failure.
---

:::note[Roadmap — not yet implemented]
The benchmark pack is design intent, not a fielded service. Nothing on this page is
running today. It documents the intended structure so the plan is on the record.
:::

The standard pack is planned to cover **6 task categories** — refund · classification ·
summarization · reasoning · tool-use · safety. Each category will carry a set of
**failure signal types** (drawn from the SwarmJelly signal taxonomy) used to classify
exactly how an agent failed, rather than just whether it passed.

The intended design separates three things:

- **Categories** — the task families an agent is exercised against.
- **Signal types** — the specific failure modes flagged within a category (the *what
  went wrong*, not a score).
- **Holdout rotation** — a protected test set held back from any training corpus and
  rotated on a schedule so results stay meaningful and resist memorization.

This mirrors the live DefendableCloud eval lane, where a deterministic executor applies
declared schema/type/math rules and throws flags — math and code, not a judge model.

***

🐝 *Operator-grade · books and records · to the shed.*
