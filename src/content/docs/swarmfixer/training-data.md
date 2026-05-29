---
title: Training Data
description: How repaired pairs would feed model training.
---

:::note[Roadmap]
This training-data design is **intent** for the planned SwarmFixer pipeline. No
SwarmFixer corpus exists today.
:::

Every successful repair would generate two training examples:

1. **Repair-model pair** — failure → repair directive.
2. **Agent pair** — original input + repair directive → correct output.

Both would feed downstream training corpora. This is the honest extension of the real
flywheel doctrine — eval verdicts feeding training corpora — but a SwarmFixer corpus
of these pairs does not exist yet; only the upstream eval verdicts are real and live.

***

🐝 *Operator-grade · books and records · to the shed.*
