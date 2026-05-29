---
title: Books and Records
description: The doctrine that turns deeds into trust. How vocabulary becomes audit-grade books-and-records.
---

## The doctrine

> *"Most platforms treat language like marketing copy."*
> *"We treat language like a regulated asset."*

Every term in DefendableOS gets the same treatment a closed real estate transaction gets at the recorder's office: source documents · hashed inputs · receipted actions · deeded outputs · permanent ledger.

:::note[Roadmap — what ships today vs what is planned]
Today the **DefendableCloud** stack delivers **L1** (PostgreSQL) and **L2** (the per-org SHA-256 hash chain, verifiable via `/ledger` + `/ledger/verify`). **L3** (Merkle root + NAS cold archive) and **L4** (ENS read-mirror) are **roadmap** — design intent for the StreetLedger vision layer, not yet built. ENS, where it appears, is a **read-mirror only · NOT an anchor**.
:::

## The 4-layer finality stack

| Layer | Tech | Role |
|---|---|---|
| L1 | PostgreSQL | Live operator database |
| L2 | Per-org hash chain | SHA-256 chain over canonical receipt payloads · in-house · client-side verifiable |
| L3 | Merkle root + NAS archive | Synology DS1525+ · per-snapshot hash · long-term cold storage |
| L4 | ENS publishing surface | streetledger.eth · streetvocab.eth · defendapedia.eth · streetchat.eth (read-mirror only, NOT an anchor) |

4 layers · in-house end to end · books-and-records-grade. *No external chain anchoring on the spine — see the [Kill Hedera doctrine](/defendableledger/kill-hedera/).*

## Why this matters

Buyers can DD it. Regulators can audit it. Boards can review it. Operators can extend it. Models can train on it. **No layer fails alone · because every layer is corroborated by the next.**

***

🐝 *Operator-grade · books and records · to the shed.*
