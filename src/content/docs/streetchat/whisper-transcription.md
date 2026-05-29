---
title: Whisper Transcription
description: Local transcription via faster-whisper. Optional dependency · paste fallback always works.
---

:::note[Roadmap — CLI not yet built]
Local transcription via faster-whisper is the **designed** local-transcription path for StreetChat. The `streetchat` CLI described here is **not yet built** in the audited codebase. (See the [overview](/streetchat/overview/) for full status.)
:::

## Installation

```bash
make install-whisper    # adds faster-whisper (~1.5GB model on first run)
```

## Usage

```bash
streetchat transcribe --session latest
```

Designed default model: `base.en` · CPU mode · int8 compute. Tunable via `.env`.

## Output

Per-session transcript JSON with:

- per-segment timestamps
- speaker placeholder (diarization Phase 2)
- per-segment confidence
- language detection
- duration · engine · model · generated_at

## Paste fallback

If faster-whisper is not installed (or transcription was done elsewhere) · the design falls back to `ingest-transcript` mode. The pipeline is intended to not require Whisper to function — paste always works.

***

🐝 *Operator-grade · books and records · to the shed.*
