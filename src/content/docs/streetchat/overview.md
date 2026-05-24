---
title: StreetChat · Overview
description: Live street-language capture rail. Audio → transcript → meaning → tribunal → deed → StreetLedger.
---

## What StreetChat is

The capture rail for DefendableOS. Live at [chat.mrdefendable.com](https://chat.mrdefendable.com). Runs at the edge (operator-local Python CLI) and surfaces in the browser.

## The pipeline (8 stages)

1. **Ingest** — audio file OR transcript paste · session registered
2. **Transcribe** — faster-whisper OR pre-built segments
3. **Extract** — canonical terms · directives · claims · risk flags · unknowns
4. **Tribunal** — HONEY / ROYAL_JELLY / JELLY / PROPOLIS classification
5. **Pairs** — Communicator · SwarmFixer · Vocabulary training pairs
6. **Deed** — DDEED-CHAT issued · 5 Proofs filled
7. **Export** — StreetLedger-compatible object-storage tree
8. **Verify** — re-hash · validate · cross-check on StreetLedger

## Why it matters

StreetChat is where **the language enters the system.** Every podcast episode · every founder call · every operator conversation captured here becomes:

- A deeded books-and-records artifact
- New training pairs for the Communicator
- Vocabulary expansion candidates for Defend-A-Pedia
- Public proof on StreetLedger
- Repair training data for SwarmFixer

The media becomes the dataset. Marketing becomes corpus.

## What you read next

- [Audio Ingestion](/streetchat/audio-ingestion/) — how audio gets in.
- [Whisper Transcription](/streetchat/whisper-transcription/) — local transcription.
- [Street Pairs](/streetchat/street-pairs/) — the training-data unit.
- [Object Storage Export](/streetchat/object-storage-export/) — the StreetLedger-compatible bundle.

***

🐝 *Operator-grade · books and records · to the shed.*


> This is a foundational page in the DefendableDocs ecosystem map. The structure is committed · the deep content extends as the platform matures. Cross-references are live below.
