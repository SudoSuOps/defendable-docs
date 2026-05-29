---
title: DefendableLedger · Kill Hedera Doctrine
description: We hash our datasets in-house. We don't need Hedera extraction. We built DefendableLedger for a reason. Tribunal and record on the ledger. Kabish.
---

## The doctrine

> **"We hash our datasets in-house we don't need hedera extraction · we build defendableLedger for a reason · we tribunal and record on the ledger kabish · drop in swarmCurator and get swarmJelly in also · that's how we create real value add."**
>
> — Mr. Defendable · 2026-05-24

LOCKED. No external chain anchoring on the spine's hot path.

## What changed

Earlier ecosystem documentation referenced **Hedera HCS topic 0.0.10291838** as the anchor for DDEED records. As of 2026-05-24, that approach is **SUPERSEDED for spine work**. Historical entries that mention Hedera anchoring stay as books-and-records (they were true at the time) — but new spine records do not anchor to Hedera.

## Why

External chain anchoring is a *form* of dependency that does not compound the eco system's own corpus or trust layer. The right shape:

```
In-house hash → in-house ledger → in-house tiered training pairs → in-house Hacks
```

The house owns the rail **end to end**.

## What we kept · what we killed

| we kept | we killed |
|---|---|
| SHA-256 canonical hashing (already in-house) | Hedera HCS anchor on every receipt |
| Append-only books-and-records discipline | External chain dependency for the ledger record |
| Public verifiable proof layer | Per-record external API token cost |
| ENS namespace (`streetledger.eth` legacy + `defendableledger.eth` if acquired) | "Anchored" status that depended on a third party's uptime |

## Why the math made this obvious

Cost-to-mint math per receipt:

| layer | external chain | in-house DefendableLedger |
|---|---|---|
| anchoring fee | network gas + service tax | sovereign disk · ~$0 |
| latency | network round-trip · seconds–minutes | local append · no network round-trip |
| dependency surface | external chain + bridge service | the house |
| compounding | none · adversary chain doesn't grow our corpus | every record compounds the trust layer |

Bring the math. Nothing burns time and dollars without ROI.

## The ROI doctrine connection

This doctrine is a direct extension of the **No Burning Compute or Money** doctrine: every dial needs ROI math before the spend. Hedera anchoring was a recurring tax on every receipt with no asset-minting return — exactly the shape we banned.

[Cost to Mint →](/cost-to-mint/overview/)

## When external broadcast IS appropriate

A single periodic publication of the **ledger root hash** to a public surface (a tweet, a static page, a low-cost L1 OP_RETURN, an IPFS pin of the manifest) is fine. That's a cron, not a per-record cost. Books-and-records can broadcast a root once a day or once a week without becoming dependent on it for hot-path operation.

The rule:
- **Hot path** · in-house only. Always.
- **External broadcast** · periodic, root-only, cron'd. Never per-record.

## The summary line

**"The cracked ledger is the house's own rail. The house anchors itself."**

***

🐝 *Sovereign · in-house · books and records · to the shed.*
