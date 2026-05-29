---
title: Vocabulary Term Schema
description: The Defend-A-Pedia term canonical JSON · 13 sections. Canonical-shape / roadmap.
---

A **vocabulary-term** is a canonical [Defend-A-Pedia](/defend-a-pedia/overview/)
entry — an operator term documented in the same 13-section structure so
operators, developers, validators, clients, and buyers each read it from their
own angle.

:::note[Canonical-shape / roadmap]
The vocabulary-term schema is a **declared shape**. Defend-A-Pedia is the
books-and-records vocabulary lane; there is **no deployed lookup or mint
endpoint** for terms today. The structure is locked; the surface is roadmap.
:::

## The 13 sections

1. **Street definition** — how an operator says it in conversation.
2. **CRE operator meaning** — what it meant in 30 years of CRE.
3. **DefendableOS definition** — what it means inside the platform.
4. **Client explanation** — how the principal explains it to a customer.
5. **Backend representation** — JSON fields · enums · validator hooks · receipt hooks.
6. **Tribunal use** — what role this term plays in classification.
7. **Evidence required** — what must be present for this term to apply.
8. **Failure modes** — known ways this term gets misused or misclassified.
9. **Related terms** — cross-references inside Defend-A-Pedia.
10. **Scoring impact** — assignment success · repair lift · risk temperature · validator weight · probability of close.
11. **Deed/receipt impact** — which Proof gets touched · which DDEED class applies.
12. **Source** — the source markdown file · repo · commit · lineage.
13. **Hashes** — SHA-256 over canonical JSON · SHA-256 over source markdown.

The full canonical spec, with field-level detail, is at
[Defend-A-Pedia · Term Format](/defend-a-pedia/term-format/).

## Source of truth

The declared schema lives at
`defend-A-pedia--vocabulary/docs/schemas/vocabulary_term.schema.json` — the
canonical-shape repo pointer, not a deployed lookup endpoint.

***

🐝 *Operator-grade · books and records · to the shed.*
