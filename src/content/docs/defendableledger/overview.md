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

DefendableLedger is the doctrine and the destination: **the house owns its own trust layer end to end.** No external chain anchoring. No hosted-LLM tax. Receipts compound *inside* the books, not on someone else's chain.

Today that doctrine is real in two concrete, honest layers:

### Layer 1 — REAL · LIVE: the cloud per-org hash chain

DefendableCloud ships a **per-organization append-only hash chain**, persisted in Postgres and served at **api.defendablecloud.com**. Every receipt carries:

- `org_seq` — sequential index from `0`, per org
- `parent_hash` — links to the prior receipt's `receipt_sha256` (genesis parent = sixty-four zeros)
- `receipt_sha256` — `sha256_hex(orjson.dumps(payload, OPT_SORT_KEYS))`
- `receipt_id` — `DCR-{org_seq:06d}-{hex8}`

Two endpoints expose it:

- `GET /ledger` — the org's chain in `org_seq` order
- `GET /ledger/verify` — server-side recompute of every `receipt_sha256`, sequential-`org_seq` check, and parent-link check; returns `{ok, receipts_checked, errors[]}`

:::note
`/ledger/verify` is **authenticated and server-side** (scoped to the caller's org). It is *not* an anonymous client-side WebCrypto verifier — verification runs in the API and recomputes the hashes from the stored Postgres payloads. The Tigris JSON+PDF artifact upload alongside each receipt is **best-effort** (wrapped in try/except); the chain itself lives in Postgres, so a storage outage degrades gracefully and never blocks a receipt.
:::

[Hash-Chain Format →](/defendableledger/hash-chain/) · [Verify a Receipt →](/defendableledger/verify/)

### Layer 2 — REAL · LOCAL: router checksummed receipts

DefendableRouter (v0.1, local / not publicly deployed) writes flat **checksummed-not-chained** receipts to `data/receipts/YYYY-MM-DD.receipts.jsonl`. Each line carries a `checksum_sha256` over the canonical JSON of the receipt (excluding the checksum field). These are tamper-evident per line but are **not** linked into a hash chain like the cloud's. Say so honestly.

[Verify a Receipt →](/defendableledger/verify/)

## The four rails — roadmap

:::note[Roadmap / design intent — not built]
The four-rail pipeline (Receipt → Tribunal Verdict → SwarmJelly Training Pair → DefendableLedger Deed), the public **defendableledger.com** `/records` and `/verify` pages, Tribunal-as-API grading, SwarmJelly tier routing, and DDEED anchoring are **design intent**, not shipped code. The doctrine below is canonical; the pipeline is not yet implemented.
:::

The intended shape, once built:

1. **Receipt** · the canonical event record · hashed + provenance-stamped
2. **Verdict** · Tribunal · SwarmCurator-9B grades on the 4-dimension rubric
3. **Training Pair** · SwarmJelly · extracts the (input → output) pair · routes to a Royal Jelly tier
4. **Deed** · seals verdict + pair + receipt into an append-only hash-chained record

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

:::note[Roadmap / design intent — not built]
The end-to-end media-to-ledger flow below (Tribunal grading, SwarmJelly tiering, hash-chained Deeds, the batch publisher, and a public defendableledger.com render) is **design intent**, not shipped code. Today the real, live hash chain is the cloud's per-org chain at api.defendablecloud.com.
:::

```
Receipt
  ↓
SwarmCurator-9B grades · 4-dim rubric · Verdict minted        (roadmap)
  ↓
SwarmJelly extracts pair · Royal Jelly tier assigned          (roadmap)
  ↓
DefendableLedger record appended · hash-chained               (roadmap)
  ↓
Batch publisher commits to defendable-ledger repo             (roadmap)
  ↓
CF Pages rebuilds → defendableledger.com renders publicly     (roadmap)
```

[Publication Flow →](/defendableledger/publication-flow/)

## Verify a receipt

The live cloud chain verifies server-side: `GET /ledger/verify` recomputes each `receipt_sha256` over the canonical (orjson sorted-keys) payload, checks the sequential `org_seq`, and checks each `parent_hash` link. Tamper a stored payload and `ok` flips to `false`, pinpointing the offending `org_seq`. It is authenticated and scoped to the caller's org — not an anonymous client-side check.

[Verify a Receipt →](/defendableledger/verify/)

## Related surfaces

- **defendableledger.com** — intended public surface for the four-rails pipeline (roadmap · `/records` + `/verify` not built)
- **ledger.mrdefendable.com** — legacy subdomain · pre-doctrine display
- **streetledger.eth.limo** — ENS-resolved IPFS gateway · 62 deeded vocabulary terms · legacy/secondary
- **DefendableRouter spine** — v0.1 local backend (not publicly deployed) · writes checksummed receipts · [/defendablerouter/overview/](/defendablerouter/overview/)
- **api.defendablecloud.com** — the LIVE surface for the per-org hash chain (`/ledger`, `/ledger/verify`)

## What you read next

- [Four Rails](/defendableledger/four-rails/) — Receipt · Verdict · Pair · Deed
- [Royal Jelly Tiers](/defendableledger/royal-jelly-tiers/) — Apex · Honey · Jelly · Pollen · Propolis
- [Hash-Chain Format](/defendableledger/hash-chain/) — the real per-org chain (org_seq · parent_hash · receipt_sha256)
- [Kill Hedera](/defendableledger/kill-hedera/) — the in-house anchoring doctrine
- [Publication Flow](/defendableledger/publication-flow/) — the intended batched-public design (roadmap)
- [Verify a Receipt](/defendableledger/verify/) — the real `/ledger/verify` and router checksum paths
- [Books and Records](/defendableledger/books-and-records/) — the doctrine that turns deeds into trust

***

🐝 *Operator-grade · books and records · to the shed.*
