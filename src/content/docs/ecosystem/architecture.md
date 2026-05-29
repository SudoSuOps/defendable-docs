---
title: Architecture
description: The five mandatory diagrams of the DefendableOS ecosystem. Full system flow · StreetChat capture flow · DefendableRouter flow · DDEED proof stack · Cost to Mint formula.
---

The five diagrams every operator · board member · and developer needs to understand DefendableOS.

:::note[Roadmap — full ecosystem vision]
These five diagrams depict the **full ecosystem vision**, not what is wired today. As of now, two pieces are actually built:

- **DefendableCloud — the Defendable Run** is LIVE at [api.defendablecloud.com](https://api.defendablecloud.com) (healthz reports db + storage + email all true). The Inputs → Evidence → Execution → Checks → Verdict → Approval → Receipt primitive, the deterministic referee, and the per-org hash-chained receipts are real and verifiable.
- **DefendableRouter v0.1** is a real spine — FastAPI + SQLite + Typer CLI + local JSONL receipt ledger, committed to main and CI-verified — but it is **local, not publicly deployed**.

StreetChat, the Communicator, Tribunal-as-a-rail, DDEED anchoring, SwarmFixer, and the ENS read-mirrors shown below are **roadmap surfaces**. Read the diagrams as the target architecture; check each box against the status notes that follow.
:::

## 1. Full DefendableOS ecosystem

Every AI work-product in the system flows through one chain:

```
Human / Client / Board / Agent
        │
        ▼
┌──────────────────────────┐
│  StreetChat / Router     │  ← capture layer
│  (intake · receipt-write)│
└────────────┬─────────────┘
             │
             ▼
┌──────────────────────────┐
│  Communicator             │  ← meaning layer
│  (street talk → directive)│
└────────────┬─────────────┘
             │
             ▼
┌──────────────────────────┐
│  Tribunal                 │  ← judgment layer
│  (validator chain · judges)│
└────────────┬─────────────┘
             │
             ▼
┌──────────────────────────┐
│  Honey · Royal Jelly      │  ← classification
│  · Jelly · Propolis       │
└────────────┬─────────────┘
             │
             ▼
┌──────────────────────────┐
│  Receipt                  │  ← per-event record
└────────────┬─────────────┘
             │
             ▼
┌──────────────────────────┐
│  DDEED                    │  ← 5-Proof deed
│  (origin · quality · process│
│   · economics · trust)    │
└────────────┬─────────────┘
             │
             ▼
┌──────────────────────────┐
│  StreetLedger             │  ← public proof layer
│  (in-house per-org        │
│   hash chain · no external│
│   chain anchor)           │
└────────────┬─────────────┘
             │
             ▼
┌──────────────────────────┐
│  SwarmFixer               │  ← repair + training
│  → Communicator vNext     │
└──────────────────────────┘
```

Every step writes a record. Every record gets hashed. Every hash is verifiable. **No step skips · no record is silent.**

## 2. StreetChat flow

:::note[Roadmap — StreetChat is not yet deployed]
StreetChat (the live-capture rail) is a **vision surface**, not a built product. The flow below is the target design. None of these stages are running in production today; the only live receipt path is the DefendableCloud Defendable Run (diagram 1's right-hand chain).
:::

How live human speech becomes a deeded books-and-records artifact:

```
Audio / Spaces / Calls / Mic
        │
        ▼
 ┌─────────────────┐
 │ Whisper          │   ← transcription (optional · paste fallback)
 │ (segments · spk) │
 └────────┬────────┘
          │
          ▼
 ┌─────────────────┐
 │ Transcript       │   ← canonical JSON · per-segment timestamps
 └────────┬────────┘
          │
          ▼
 ┌─────────────────┐
 │ Street Meaning   │   ← canonical terms · directives · claims ·
 │ extraction       │     risk flags · unknowns · call markers
 └────────┬────────┘
          │
          ▼
 ┌─────────────────┐
 │ Defend-A-Pedia   │   ← phrase → canonical term mapping
 │ mapping          │
 └────────┬────────┘
          │
          ▼
 ┌─────────────────┐
 │ Street Pair      │   ← input → output training pair
 │ generation       │     (Communicator · SwarmFixer · Vocab)
 └────────┬────────┘
          │
          ▼
 ┌─────────────────┐
 │ Tribunal verdict │   ← HONEY / ROYAL_JELLY / JELLY / PROPOLIS
 └────────┬────────┘
          │
          ▼
 ┌─────────────────┐
 │ DDEED-CHAT       │   ← 5 Proofs · in-house per-org hash chain ·
 │                  │     StreetLedger pub (no external chain anchor)
 └─────────────────┘
```

See [StreetChat Overview](/streetchat/overview/) for the per-stage detail.

## 3. DefendableRouter flow

:::note[Status — Router v0.1 is real but local, and the object-storage / ledger tail is roadmap]
The DefendableRouter spine is **built and CI-verified** (FastAPI + SQLite + Typer CLI + a local JSONL receipt ledger) but it is **not publicly deployed**. What ships today: org / member / dataset / compute / job endpoints, a worker contract, and **local JSONL receipts at `data/receipts/YYYY-MM-DD.receipts.jsonl`, each line carrying a `checksum_sha256` over canonical JSON** — checksummed, but **not hash-chained** (unlike the Cloud's per-org chain). The object-storage path layout, the ENS-prefixed identifiers, and the live Router → Tribunal → StreetLedger publish chain are the **target architecture** — label them roadmap.
:::

How agent or system events become receipt-bearing chains (target architecture — see status note):

```
 Org ID / Member ID / Agent ID
          │
          ▼
 ┌───────────────────────┐
 │ DefendableRouter       │  ← write-only intake · ID resolver
 │ (v0.1 · local only)    │
 └──────────┬────────────┘
            │
            ▼
 ┌───────────────────────┐
 │ Local JSONL ledger     │  ← data/receipts/YYYY-MM-DD.receipts.jsonl
 │ (TODAY)                │     one receipt per line · checksum_sha256
 └──────────┬────────────┘
            │
            ▼  ········ roadmap below this line ········
 ┌───────────────────────┐
 │ Object Storage         │  ← durable receipt persistence (planned)
 │ (ROADMAP)              │
 └──────────┬────────────┘
            │
            ▼
 ┌───────────────────────┐
 │ Tribunal-as-a-rail     │  ← scores the artifact (ROADMAP · not wired)
 └──────────┬────────────┘
            │
            ▼
 ┌───────────────────────┐
 │ StreetLedger           │  ← publicly visible deed + verify (ROADMAP)
 └───────────────────────┘
```

The Router is intentionally minimal — its only job is to **capture cheaply at the edge** and **route durably** into the rest of the rails. Today it does the capture half locally; the durable-publish tail is on the roadmap.

## 4. DDEED proof stack

Every deed contains five proofs. No exceptions.

```
┌─────────────────────────────────────────┐
│              D D E E D                  │
├─────────────────────────────────────────┤
│  ▌Proof of Origin    │ who/when/where  │
│  ▌Proof of Quality   │ tribunal · checks│
│  ▌Proof of Process   │ pipeline · steps │
│  ▌Proof of Economics │ cost · value     │
│  ▌Proof of Trust     │ hash · anchor    │
└─────────────────────────────────────────┘
```

The 5 Proofs framework is the brand's IP. Every artifact across every rail uses this exact structure. See [DDEED Overview](/ddeed/overview/) for the full schema.

## 5. Cost to Mint formula

The economics behind every deeded artifact:

```
  COMPUTE
+ HUMAN VALIDATOR
+ VALIDATOR (model)
+ STORAGE
+ ENERGY
+ RETRIES
+ REPAIR (SwarmFixer)
+ HASHING
+ DEED ISSUANCE
─────────────────────
= COST TO MINT (USD)

Compared to:
  • hyperscaler equivalent
  • human-only equivalent
```

Default baselines (operator-tunable):

| Input | Rate |
|---|---|
| Electricity | $0.10 / kWh (US avg) |
| Owned RTX 6000 amortized | $0.80 / hour |
| Validator pass (Qwen-9B equivalent) | $0.0001 / pass |
| Storage (Tigris-equivalent) | $0.023 / GB / month |
| Hyperscaler comparison (AWS p4d.24xlarge) | $32.77 / hour |
| Human-only analyst | $200 / hour |

The full [Cost to Mint](/cost-to-mint/overview/) section breaks down each input, and the [Pain in the Shed](/media/pain-in-the-shed/) podcast publishes the cumulative cost-to-mint ledger of the show itself.

## Cross-rail data flow (one paragraph)

Audio enters via StreetChat. Transcript and street-meaning are extracted locally. Communicator maps to canonical vocabulary from Defend-A-Pedia (which lives publicly on DefendableLedger). The [rulebook engine](/defendableos/rulebook-engine/) evaluates the event against the declared Flight Sheet. Receipt and DDEED-CHAT are emitted; the deed joins the in-house per-org hash chain. SwarmFixer reads any propolis-tier flags for repair-corpus training. The cycle compounds — *no external chain anchor on the spine, see [Kill Hedera doctrine](/defendableledger/kill-hedera/)*.

## Next reads

- [Glossary](/ecosystem/glossary/) — every term in the diagrams in one line.
- [Domain Map](/ecosystem/domain-map/) — every brand surface.
- [DDEED Schema](/ddeed/deed-schema/) — the canonical JSON for every deed.
- [Rulebook Engine](/defendableos/rulebook-engine/) — how the referee actually works.

***

🐝 *Five diagrams · one ecosystem · one audit trail · to the shed.*
