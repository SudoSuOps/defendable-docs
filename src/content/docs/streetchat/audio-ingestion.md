---
title: Audio Ingestion
description: Bringing audio into StreetChat. CLI · paste mode · ffmpeg normalization · spaces recording (future).
---

:::note[Roadmap — not yet implemented]
StreetChat is a **designed/roadmap** capability. The ingest CLI described below is design intent and is **not present in the audited codebase**. No production StreetChat service is deployed today. (See the [overview](/streetchat/overview/) for full status.)
:::

## Two modes

The `streetchat` CLI will provide two ingest modes.

### Mode 1 · audio file ingest

```bash
streetchat ingest --file ./recordings/pain-in-the-shed-001.m4a --title "Pain in the Shed 001"
```

Copies the audio into `data/raw_audio/<event_id>.<ext>` · computes SHA-256 · normalizes to 16kHz mono WAV via ffmpeg (when available).

### Mode 2 · transcript paste

```bash
streetchat ingest-transcript --file ./transcripts/sample.json --title "Sample"
```

Skips audio · ingests a pre-built transcript JSON directly. Useful for testing · or when transcription was done elsewhere.

## Spaces recording (Phase 2)

X Spaces · podcast feeds · meeting recordings · all forthcoming. Backend service mode (FastAPI) will wrap these into the pipeline once the server is hosted.

***

🐝 *Operator-grade · books and records · to the shed.*
