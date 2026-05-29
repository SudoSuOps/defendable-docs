---
title: Deeded Vocabulary
description: How a Defend-A-Pedia term becomes a public deed · the 7-step pipeline · the schemas · the ENS pathing.
---

:::note[Roadmap — vision layer]
The vocabulary-deeding pipeline below is **design intent** for the StreetLedger / Defend-A-Pedia vision layer. It is **not a built endpoint**. The live, shipped receipt chain today is the DefendableCloud per-org `DCR-*` hash chain (`/ledger` + `/ledger/verify`) — see [DefendableCloud](/defendablecloud/overview/).
:::

## The 7-step pipeline (vocabulary deeding)

1. Term drafted in markdown (operator discipline · 13-section format)
2. Canonicalize to JSON (deterministic · sorted-keys serialization)
3. SHA-256 hash of canonical JSON
4. SHA-256 hash of source markdown
5. Mint `DDEED-VOCAB-{CATEGORY}-{SLUG}-v{N}` · publish to object storage tree
6. Add to manifest · update SHA256SUMS · recompute ledger root
7. Append to the in-house DefendableLedger JSONL hash chain · publish to ENS read-mirror at `defendapedia.eth/{category}/{slug}` *(read-mirror only · NOT an anchor · see [Kill Hedera doctrine](/defendableledger/kill-hedera/))*

## The deed schema

Every DDEED-VOCAB entry includes the 5 Proofs (Origin · Quality · Process · Economics · Trust) and a complete cross-reference set to related terms · source files · validator hooks.

See [DDEED Schema](/ddeed/deed-schema/) for the full canonical structure.

***

🐝 *Operator-grade · books and records · to the shed.*
