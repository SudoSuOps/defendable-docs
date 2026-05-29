---
title: Term Format
description: The 13-section term schema. Every DDEED-VOCAB entry follows the same structure.
---

## The 13 sections

1. **Street definition** — how an operator says it in conversation
2. **CRE operator meaning** — what it meant in 30 years of CRE
3. **DefendableOS definition** — what it means inside the platform
4. **Client explanation** — how the principal explains it to a customer
5. **Backend representation** — JSON fields · enums · validator hooks · receipt hooks
6. **Tribunal use** — what role this term plays in classification
7. **Evidence required** — what must be present for this term to apply
8. **Failure modes** — known ways this term gets misused or misclassified
9. **Related terms** — cross-references inside Defend-A-Pedia
10. **Scoring impact** — assignment success · repair lift · risk temperature · validator weight · probability of close
11. **Deed/receipt impact** — which Proof gets touched · which DDEED class applies
12. **Source** — the source markdown file · repo · commit · lineage
13. **Hashes** — SHA-256 over canonical JSON · SHA-256 over source markdown

## Why 13 sections

Each section is required because operators · developers · validators · clients · and buyers each read the term from a different angle. Skipping a section breaks alignment for one of these audiences.

## See the canonical spec

The full term-format schema lives at `github.com/SudoSuOps/defend-A-pedia--vocabulary/docs/schemas/vocabulary_term.schema.json`.

***

🐝 *Operator-grade · books and records · to the shed.*
