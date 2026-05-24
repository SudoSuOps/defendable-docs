---
title: Domain Map
description: Every brand surface in the DefendableOS ecosystem · their roles · their relationships · and the ENS quartet that underlies them all.
---

## The four publicly facing brand surfaces

| Surface | Role | URL |
|---|---|---|
| Mr. Defendable | FACE · principal voice | [mrdefendable.com](https://mrdefendable.com) |
| DefendableOS | SYSTEM · the platform | [defendableos.com](https://defendableos.com) |
| StreetLedger | LEDGER · public proof layer | [ledger.mrdefendable.com](https://ledger.mrdefendable.com) |
| StreetChat | CHAT · live capture rail | [chat.mrdefendable.com](https://chat.mrdefendable.com) |

## The forthcoming surfaces

| Surface | Role | Status |
|---|---|---|
| Offense to the Shed | CULTURE · written 5-pillar blog | Domain acquired · awaiting bootstrap |
| Pain in the Shed | MEDIA · cost-of-intelligence podcast | Domain acquired · awaiting bootstrap |
| StreetLedger ETH | LEDGER-IPFS · ENS-resolved mirror | Same `dist/` · awaiting IPFS pin + ENS contenthash on `streetledger.eth` |

## The documentation surfaces

| Surface | Role | URL |
|---|---|---|
| DefendableDocs (canonical) | DOCS · this site | [defendabledocs.com](https://defendabledocs.com) |
| docs.defendableos.com | DOCS (subdomain) | Same source · identical content |

## The 4-ENS quartet

These four ENS names underpin the rails and the brand stack. Each is independently deeded.

| ENS | Role |
|---|---|
| `defendapedia.eth` | Vocabulary canon · 62+ DDEED-VOCAB anchored |
| `streetvocab.eth` | Vocabulary as deeded asset class · `defendable_value` of the language itself |
| `streetledger.eth` | Books and records · receipts + deeds + manifests pathing |
| `streetchat.eth` | Live conversation intake · per-session object-storage prefix |

## The relationships

The surfaces are siblings, not parent/child. Each has one role.

```
                              mrdefendable.com
                              (the principal · voice · face)
                                       │
        ┌──────────────┬───────────────┼───────────────┬──────────────┐
        │              │               │               │              │
defendableos.com  ledger.*  chat.*  docs.* / defendabledocs.com   offensetotheshed.com  painintheshed.com
(SYSTEM · product) (LEDGER) (CHAT)  (DOCS · this site)            (CULTURE · blog)      (MEDIA · podcast)
        │              │               │
        └──────────────┴───────────────┘
                       │
                       ▼
              4-ENS quartet
              (defendapedia · streetvocab ·
               streetledger · streetchat)
                       │
                       ▼
              Hedera HCS topic 0.0.10291838
              (immutable mainnet anchor for every deed)
```

## How docs.defendableos.com and defendabledocs.com relate

Both domains serve identical content from one source — this Astro Starlight repo. The split exists for audience routing:

| Domain | Audience signal |
|---|---|
| `docs.defendableos.com` | Technical · operator · API-first |
| `defendabledocs.com` | Principal · board · doctrine-first |

Same docs · different doorway. Operators reach for the `.com`, builders reach for the subdomain. Cross-linking is symmetric.

## The repo map

| Surface | Repository |
|---|---|
| mrdefendable.com | `SudoSuOps/mr-defendable` |
| defendableos.com | `SudoSuOps/defendable` |
| ledger.mrdefendable.com | `SudoSuOps/street-ledger` |
| chat.mrdefendable.com | `SudoSuOps/street-chat` |
| Defend-A-Pedia vocabulary | `SudoSuOps/defend-A-pedia--vocabulary` |
| DefendableDocs | `SudoSuOps/defendable-docs` (this repo) |
| defendablecloud.com | `SudoSuOps/defendable-cloud` |
| defendablerouter.com | `SudoSuOps/defendable-router` |

## What lives on Hedera

| Class | Anchor |
|---|---|
| DDEED-VOCAB | Hedera HCS topic `0.0.10291838` |
| DDEED-AWARD | Same topic · per-engagement deeds |
| DDEED-CHAT | Same topic · per-session capture deeds |
| DDEED-MEDIA-POST | Same topic · per-blog-post deeds |
| DDEED-MEDIA-POD | Same topic · per-podcast-episode deeds |
| DDEED-FOUNDER-ORIGIN | Same topic · founding-story preservation deeds |

One topic · one chain · one audit trail · forever-verifiable at [hashscan.io/mainnet/topic/0.0.10291838](https://hashscan.io/mainnet/topic/0.0.10291838).

***

🐝 *The geography of the stack · one principal · multiple surfaces · one audit trail · to the shed.*
