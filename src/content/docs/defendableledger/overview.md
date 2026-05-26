---
title: DefendableLedger · Overview
description: The cracked ledger of the DefendableOS ecosystem. Sovereign · in-house · hash-verifiable. The canonical books-and-records surface for receipts · verdicts · training pairs · deeds.
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


## What DefendableLedger is

The sovereign in-house ledger for the DefendableOS ecosystem. Every Router receipt, every Tribunal verdict, every SwarmJelly training pair, every Deed — recorded here. The canonical books-and-records surface. Live at [defendableledger.com](https://defendableledger.com).

DefendableLedger is **the house's own rail**. No external chain anchoring. No hosted-LLM tax. The eco system owns its own trust layer end to end.

## The four rails per receipt

Every intake mints four artifacts:

1. **Receipt** · issued by DefendableRouter · the canonical event record · hashed + provenance-stamped
2. **Verdict** · issued by Tribunal · SwarmCurator-9B grades the receipt on the 4-dimension rubric
3. **Training Pair** · issued by SwarmJelly · extracts the (input → output) pair · routes to a Royal Jelly tier
4. **Deed** · issued by DefendableLedger · seals the verdict + pair + receipt into an append-only hash-chained record

[Four Rails →](/defendableledger/four-rails/)

## The doctrine

> Language becomes Assignment.
> Assignment becomes Receipt.
> Receipt becomes Verdict.
> Verdict becomes Deed.
> Deed becomes Books and Records.
> Books and Records become Trust.

[Books and Records →](/defendableledger/books-and-records/)

## Why this beats external chain anchoring

External chain anchoring (Hedera, IPFS pin, BTC OP_RETURN, etc.) is a *form* of dependency that does not compound the eco system's own corpus or trust. The right shape is:

- In-house hash → in-house ledger → in-house tiered training pairs → in-house Hacks
- The house owns the rail end to end
- Trust layer compounds *inside* the books, not on someone else's chain

[Kill Hedera doctrine →](/defendableledger/kill-hedera/)

## Where the records flow

```
DefendableRouter receipt
  ↓
SwarmCurator-9B grades · 4-dim rubric · Verdict minted
  ↓
SwarmJelly extracts pair · Royal Jelly tier assigned
  ↓
DefendableLedger record appended · hash-chained
  ↓
Batch publisher commits to defendable-ledger repo
  ↓
CF Pages rebuilds → defendableledger.com renders the new records publicly
```

[Publication Flow →](/defendableledger/publication-flow/)

## Verify any record

Every record carries its own SHA-256. Every chain link references the prior `record_sha256`. Verification is client-side WebCrypto · no server round-trip · no trust required.

[Verify a Record →](/defendableledger/verify/)

## Related surfaces

- **defendableledger.com** — canonical public surface (this docs section's primary target)
- **ledger.mrdefendable.com** — legacy subdomain · pre-doctrine display
- **streetledger.eth.limo** — ENS-resolved IPFS gateway · 62 deeded vocabulary terms · legacy/secondary
- **DefendableRouter spine** — where the receipts originate · [/defendablerouter/overview/](/defendablerouter/overview/)

## What you read next

- [Four Rails](/defendableledger/four-rails/) — Receipt · Verdict · Pair · Deed
- [Royal Jelly Tiers](/defendableledger/royal-jelly-tiers/) — Apex · Honey · Jelly · Pollen · Propolis
- [Hash-Chain Format](/defendableledger/hash-chain/) — the append-only ledger record schema
- [Kill Hedera](/defendableledger/kill-hedera/) — the in-house anchoring doctrine
- [Publication Flow](/defendableledger/publication-flow/) — Router → local → batched commit → public
- [Verify a Record](/defendableledger/verify/) — step-by-step verification walkthrough
- [Books and Records](/defendableledger/books-and-records/) — the doctrine that turns deeds into trust

***

🐝 *Operator-grade · books and records · to the shed.*
