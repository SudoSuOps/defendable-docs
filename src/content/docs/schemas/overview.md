---
title: Schemas · Overview
description: Every schema published across the Defendable stack · grouped by what is LIVE, what is real-but-local, and what is canonical-shape / roadmap.
---

Schemas are grouped here by **deployment honesty**, not by lane. A schema being
declared is not the same as a schema being wired into a deployed endpoint —
we say which is which.

## LIVE — deployed and minting on `api.defendablecloud.com`

These are produced by DefendableCloud in production. Every one rides the
**per-org hash chain** and is verifiable via `GET /ledger/verify`.

| Schema | What it is |
|---|---|
| `defendablecloud.receipt/v1` family (6 ids) | The receipt minted by a Defendable Run — generic run, eval, cook, incident, dataset-download, model-pin. See [Receipt Schema](/schemas/receipt/). |
| `defendablecloud.verdict/v1` | The deterministic verdict the referee produces (`compute_verdict()`). See [Verdict Schema](/schemas/tribunal-verdict/). |

## REAL-BUT-LOCAL — DefendableRouter v0.1

The spine is real and CI-verified, but it is **not a publicly deployed
endpoint** yet.

| Schema | What it is |
|---|---|
| DefendableRouter JSONL receipt | Local append-only receipt at `data/receipts/YYYY-MM-DD.receipts.jsonl`. **Checksummed (sha256), not hash-chained.** Documented in [Receipt Schema · DefendableRouter receipt](/schemas/receipt/#defendablerouter-receipt-local-jsonl). |

## CANONICAL-SHAPE / ROADMAP — declared, not yet wired

:::note[Declared shapes — not deployed]
The schemas below are **canonical declarations**. The in-house hashing
discipline is locked, but none of these are wired into a deployed mint or
ingestion endpoint today. They are the books-and-records targets for the
vision lanes (DefendableLedger, StreetChat, SwarmFixer, Communicator,
Defend-A-Pedia, Pain-in-the-Shed).
:::

| Schema | Lane | Page |
|---|---|---|
| `DDEED-{CLASS}` deed | DefendableLedger books-and-records | [Deed Schema](/schemas/deed/) |
| street-event | StreetChat intake | [Street Event Schema](/schemas/street-event/) |
| street-pair | SwarmFixer / Communicator / Vocabulary training pairs | [Street Pair Schema](/schemas/street-pair/) |
| vocabulary-term | Defend-A-Pedia | [Vocabulary Term Schema](/schemas/vocabulary-term/) |
| cost-to-mint | Pain-in-the-Shed economics record | [Cost to Mint Schema](/schemas/cost-to-mint/) |

***

🐝 *Operator-grade · books and records · to the shed.*
