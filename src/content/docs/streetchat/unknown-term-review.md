---
title: Unknown Term Review
description: What happens when StreetChat detects a phrase not in Defend-A-Pedia.
---

:::note[Roadmap — not yet built]
The unknown-term review loop, DDEED-VOCAB minting, and the Defend-A-Pedia canon are **designed**, not built in the audited codebase. This page documents the intended flow. (See the [overview](/streetchat/overview/) for full status.)
:::

## The flow

1. StreetChat extractor detects a "strong phrase" not in the canon
2. Vocabulary pair generated with proposed slug + context
3. Pair flagged `use_for_training=false` · routes to validator review queue
4. Operator reviews · either:
   - **APPROVE** → mint as DDEED-VOCAB-* · add to canon · close pair as Honey
   - **REJECT** → discard pair · log as Propolis-tier for pattern study
   - **AMEND** → propose alternate canonical mapping · re-route for second review

## Why this matters

The vocabulary canon expands organically from real conversations · NOT from synthetic dictionaries. Every term in Defend-A-Pedia has provenance back to a real operator utterance.

***

🐝 *Operator-grade · books and records · to the shed.*
