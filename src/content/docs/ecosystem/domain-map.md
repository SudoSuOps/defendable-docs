---
title: Domain Map
description: Every brand surface in the DefendableOS + DefendableCloud ecosystem · their roles · their relationships · the in-house hash-chain that underlies them all.
---

:::note[What is live today vs forthcoming]
Two anchors are **verified live right now**:

- **[api.defendablecloud.com](https://api.defendablecloud.com)** — the DefendableCloud API (healthz reports db + storage + email all true).
- **This docs site** — [defendabledocs.com](https://defendabledocs.com) / `docs.defendableos.com`.

`app.defendablecloud.com` (the portal) and `defendablecloud.com` (the marketing surface) sit in front of the live API. **Forthcoming / roadmap** surfaces below — listed for completeness, not yet deployed: StreetChat (`chat.mrdefendable.com`), DefendableLedger as a standalone product, and the four ENS read-mirrors (which are **read-mirrors, explicitly NOT anchors** — the trust layer is the in-house per-org hash chain). The DefendableRouter is **not public** anywhere and is not in this map.
:::

## The two product surfaces

| Surface | Role | URL | Status |
|---|---|---|---|
| **DefendableOS** | The ENGINE — *verify it* (rulebook + referee) | [defendableos.com](https://defendableos.com) | Referee engine ships inside the live Cloud API |
| **DefendableCloud** | The VAULT — *prove it* (hosted proof vault) | [defendablecloud.com](https://defendablecloud.com) · [api.defendablecloud.com](https://api.defendablecloud.com) · [app.defendablecloud.com](https://app.defendablecloud.com) | **LIVE** — `api.` verified (db+storage+email) |

## The voice + books surfaces

| Surface | Role | URL | Status |
|---|---|---|---|
| **Mr. Defendable** | FACE · principal voice | [mrdefendable.com](https://mrdefendable.com) | Voice/brand surface |
| **DefendableLedger** | LEDGER · canonical books-and-records surface | [defendableledger.com](https://defendableledger.com) | Domain held · standalone product is roadmap |
| StreetChat | CHAT · live capture rail (subdomain) | [chat.mrdefendable.com](https://chat.mrdefendable.com) | **Roadmap** — not yet deployed |
| StreetLedger (legacy) | LEDGER subdomain · superseded by defendableledger.com | [ledger.mrdefendable.com](https://ledger.mrdefendable.com) | Legacy / secondary |

## The forthcoming surfaces

| Surface | Role | Status |
|---|---|---|
| Offense to the Shed | CULTURE · written 5-pillar blog | Domain acquired · awaiting bootstrap |
| Pain in the Shed | MEDIA · cost-of-intelligence podcast | Domain acquired · awaiting bootstrap |
| streetledger.eth (read-mirror) | ENS-resolved IPFS gateway · NOT an anchor | Awaiting IPFS pin + ENS contenthash |

## The documentation surfaces

| Surface | Role | URL |
|---|---|---|
| DefendableDocs (canonical) | DOCS · this site | [defendabledocs.com](https://defendabledocs.com) |
| docs.defendableos.com | DOCS (subdomain) | Same source · identical content |

## The 4-ENS quartet (read-mirror only)

These four ENS names underpin the published vocabulary mirrors. They are **read-mirrors**, not anchors — the trust layer is the in-house per-org hash chain.

| ENS | Role |
|---|---|
| `defendapedia.eth` | Vocabulary canon · 62+ deeded terms |
| `streetvocab.eth` | Vocabulary as deeded asset class · value of the language itself |
| `streetledger.eth` | Books and records read-mirror · receipts + deeds + manifests pathing |
| `streetchat.eth` | Live conversation intake · per-session object-storage prefix |

## The relationships

The surfaces are siblings, not parent/child. Each has one role.

```
                              mrdefendable.com
                              (the principal · voice · face)
                                       │
        ┌──────────────┬───────────────┼───────────────┬──────────────────────┐
        │              │               │               │                      │
defendableos.com  defendablecloud.com  defendableledger.com  defendabledocs.com  offensetotheshed.com / painintheshed.com
(ENGINE · rulebook) (VAULT · receipts)  (BOOKS · ledger)      (DOCS · this site)  (CULTURE · MEDIA)
        │              │                       │
        └──────┬───────┴───────────────────────┘
               │
               ▼
       Per-org hash chain
       (in-house · client-side verifiable · NO external chain anchor)
```

## How docs.defendableos.com and defendabledocs.com relate

Both domains serve identical content from one source — this Astro Starlight repo. The split exists for audience routing:

| Domain | Audience signal |
|---|---|
| `docs.defendableos.com` | Technical · operator · API-first |
| `defendabledocs.com` | Principal · board · doctrine-first |

Same docs · different doorway. Operators reach for the `.com`, builders reach for the subdomain. Cross-linking is symmetric.

## What lives where (in-house trust)

| Class | Surface | Trust mechanism |
|---|---|---|
| Eval / Cook / Dataset / Compute / Incident **receipts** | DefendableCloud | Per-org SHA-256 hash chain — see [Schemas · Receipt](/schemas/receipt/). |
| Vocabulary **deeds** (DDEED-VOCAB · DDEED-MEDIA · DDEED-FOUNDER-ORIGIN) | DefendableLedger | Append-only JSONL hash chain — see [DefendableLedger · Hash-Chain Format](/defendableledger/hash-chain/). |
| Books-and-records publications | defendableledger.com | Batch publication from in-house records to the public canonical surface. |

No external chain anchoring on the spine — see the [Kill Hedera doctrine](/defendableledger/kill-hedera/). The full audit trail is reproducible client-side, in-house, end to end.

***

🐝 *Two product surfaces · books on the ledger · in-house hash chain · to the shed.*
