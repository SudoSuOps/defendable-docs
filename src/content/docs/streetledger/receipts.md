---
title: Receipts
description: The per-event record structure. RCPT-* schema · what gets recorded · why every event has a receipt.
---

:::note[Roadmap — vision layer]
The `RCPT-*` class taxonomy below is the **planned StreetLedger event-record model** (vision layer). It is distinct from the two receipt systems that ship today:

- **DefendableCloud** — per-org **hash-chained** `DCR-*` receipts, verifiable via `/ledger` and `/ledger/verify`. See [Generate a Receipt](/defendablecloud/generate-a-receipt/).
- **DefendableRouter** — **checksummed (not chained)** JSONL receipts written locally per day.

Treat the schema below as design intent, not a built endpoint.
:::

## What a receipt is

A receipt is the per-event record that captures WHAT happened · WHEN · in WHAT context · with WHAT hashes. Every receipt is the input to one or more deeds.

Pattern: `RCPT-{CLASS}-{YYYYMMDD}-{ULID}`

## Receipt classes

| Class | What it records |
|---|---|
| `RCPT-VOCAB-*` | A vocabulary term mint |
| `RCPT-CHAT-*` | A StreetChat session event |
| `RCPT-AWARD-*` | An engagement award |
| `RCPT-MEDIA-*` | A media artifact (blog post · podcast episode) |
| `RCPT-VALIDATION-*` | A validator chain pass |
| `RCPT-MINTING-*` | A deed-issuance event |

## What a receipt always contains

- `receipt_id` · `source_event_id`
- Hashes of every related artifact
- Count of related extracted entities (terms · directives · risk flags · pairs)
- `tribunal_classification` (inherited from upstream verdict)
- `issued_at` · `issued_by` · `status`

***

🐝 *Operator-grade · books and records · to the shed.*
