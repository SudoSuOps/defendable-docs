---
title: Architecture
description: The five mandatory diagrams of the DefendableOS ecosystem. Full system flow · StreetChat capture flow · DefendableRouter flow · DDEED proof stack · Cost to Mint formula.
---

The five diagrams every operator · board member · and developer needs to understand DefendableOS.

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
│  (Hedera-anchored)        │
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
 │ DDEED-CHAT       │   ← 5 Proofs · Hedera anchor · StreetLedger pub
 └─────────────────┘
```

See [StreetChat Overview](/streetchat/overview/) for the per-stage detail.

## 3. DefendableRouter flow

How agent or system events become receipt-bearing chains:

```
 ENS / App ID / Agent ID
          │
          ▼
 ┌───────────────────────┐
 │ DefendableRouter       │  ← write-only · <5ms POST overhead
 │ (intake · ID resolver) │
 └──────────┬────────────┘
            │
            ▼
 ┌───────────────────────┐
 │ Object Storage         │  ← streetledger.eth path layout
 │ (receipt persistence)  │
 └──────────┬────────────┘
            │
            ▼
 ┌───────────────────────┐
 │ Receipt                │  ← RCPT-* · canonical JSON · SHA-256
 └──────────┬────────────┘
            │
            ▼
 ┌───────────────────────┐
 │ Tribunal               │  ← scores the artifact in the receipt
 └──────────┬────────────┘
            │
            ▼
 ┌───────────────────────┐
 │ StreetLedger           │  ← publicly visible deed + verify path
 └───────────────────────┘
```

The Router is intentionally minimal — its only job is to **capture cheaply at the edge** and **route durably** into the rest of the rails.

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
