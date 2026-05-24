---
title: Whisper Transcription
description: Local transcription via faster-whisper. Optional dependency · paste fallback always works.
---

## Installation

```bash
make install-whisper    # adds faster-whisper (~1.5GB model on first run)
```

## Usage

```bash
streetchat transcribe --session latest
```

Default model: `base.en` · CPU mode · int8 compute. Tunable via `.env`.

## Output

Per-session transcript JSON with:

- per-segment timestamps
- speaker placeholder (diarization Phase 2)
- per-segment confidence
- language detection
- duration · engine · model · generated_at

## Paste fallback

If faster-whisper is not installed (or transcription was done elsewhere) · use `ingest-transcript` mode. Pipeline does not require Whisper to function.

***

🐝 *Operator-grade · books and records · to the shed.*


> This is a foundational page in the DefendableDocs ecosystem map. The structure is committed · the deep content extends as the platform matures. Cross-references are live below.
