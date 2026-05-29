---
title: StreetLedger · Overview
description: The planned public proof layer for DefendableOS. Design intent for a verifiable books-and-records surface; the shipped chain today is DefendableCloud's per-org DCR-* receipts.
---

:::caution[Status — audited-prototype reality]
This page describes design intent for the DefendableOS ecosystem. In the current independently
audited prototype this capability is **ROADMAP / NOT YET IMPLEMENTED** as a public/production
service unless explicitly shown as fielded. The only fielded, Codex-audited surface today is the
controlled **synthetic** agent-operations demo — see [Field Proof v0.1](/field-release/overview/).
**NOT CLEARED FOR PRODUCTION · NOT CLEARED FOR EXTERNAL SAAS ENFORCEMENT.** SHA-256 hashes here
provide content-integrity linkage only — not signatures, owner approval, external attestation, or
blockchain anchoring.
:::


:::caution[Now a legacy surface]
As of 2026-05-24, the canonical books-and-records surface for the DefendableOS ecosystem is **[DefendableLedger](/defendableledger/overview/)** at [defendableledger.com](https://defendableledger.com). StreetLedger remains live as a legacy display for the 62 deeded vocabulary terms and the ENS/IPFS sibling at `streetledger.eth.limo`. New receipts · verdicts · pairs · deeds publish to DefendableLedger.
:::

## What StreetLedger is

StreetLedger is the planned public proof surface designed to expose every DefendableOS-issued deed as a verifiable books-and-records artifact. The legacy display at [ledger.mrdefendable.com](https://ledger.mrdefendable.com) and the ENS/IPFS sibling at `streetledger.eth.limo` carry the 62 deeded vocabulary terms today; new receipts, verdicts, pairs, and deeds publish to [DefendableLedger](/defendableledger/overview/).

The live, hash-chained receipt system shipping today is the DefendableCloud per-org chain (`DCR-*` receipts, `/ledger` + `/ledger/verify`). StreetLedger is the public-facing presentation layer that the vision composes on top of that integrity surface.

## What it is designed to show

- The deeded vocabulary canon (DDEED-VOCAB) from Defend-A-Pedia
- Per-term deed JSON · canonical hash · markdown hash · ENS read-mirror reference
- Manifest with ledger root hash · SHA256SUMS for every file
- Client-side verify rail · paste any JSON · compute SHA-256 in your browser · match against the public canon

## Why it matters for buyers

The design intent is that a buyer doing pre-market DD on DefendableOS hits StreetLedger first and sees:

- The vocabulary canon is real (publicly browsable).
- Every claim has a hash (operator-grade discipline).
- The verify rail works (zero round-trip · zero trust required).
- The chain-of-title is auditable end-to-end.

That converts a "trust us" claim into a "verify it yourself" experience. Closing accelerates.

## What you read next

- [Deeded Vocabulary](/streetledger/deeded-vocabulary/) — how a term becomes a deed.
- [Receipts](/streetledger/receipts/) — the per-event record structure.
- [Manifests](/streetledger/manifests/) — the per-snapshot books-and-records bundle.
- [SHA-256 Hashing](/streetledger/sha256-hashing/) — the hash discipline.
- [Object Storage Layout](/streetledger/object-storage-layout/) — directory structure for any deed class.
- [Verify a Deed](/streetledger/verify-a-deed/) — step-by-step verification walkthrough.
- [Books and Records](/streetledger/books-and-records/) — the doctrine that turns deeds into trust.

***

🐝 *Operator-grade · books and records · to the shed.*
