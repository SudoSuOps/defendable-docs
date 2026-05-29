---
title: Communicator Training
description: How StreetChat pairs feed the Communicator vNext training cycle.
---

:::note[Roadmap — not yet built]
The Communicator and SwarmFixer training loops described here are **designed**, not yet built in the audited codebase. This page documents the intended tiering. (See the [overview](/streetchat/overview/) for full status.)
:::

## Designed routing

StreetChat is designed to route each graded street pair by its verdict tier:

- **Honey / Royal Jelly** → feeds the next Communicator training cycle. These are the clean, client-ready pairs.
- **Jelly** → routed to SwarmFixer as repair-training data — risk-flagged but recoverable.
- **Propolis** → held for root-cause review. These do **not** enter training; they are studied for the failure pattern first.

This tiering maps directly to the verdict tiers that ARE real in DefendableCloud (`defendable-cloud-v2`): **honey = pass**, **jelly = risk**, **propolis = fail**. The classification a pair carries here is the same rulebook vocabulary the Cloud referee applies — math and code, not a judge model.

The training step itself is designed to be operator-extensible to any HuggingFace-compatible training stack.

***

🐝 *Operator-grade · books and records · to the shed.*
