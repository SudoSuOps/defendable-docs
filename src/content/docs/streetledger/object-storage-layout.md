---
title: Object Storage Layout
description: The directory structure for any DDEED class. ENS-keyed paths · S3-compatible · IPFS-pinnable.
---

## The layout

```
s3://streetledger/
  vocabulary/
    v0.3.0/
      terms/<category>/<slug>/v1/term.json
                              /v1/deed.json
                              /v1/receipts.json
      manifests/manifest.json
      SHA256SUMS.txt

  streetchat/
    sessions/<event_id>/
      raw/audio_original.<ext>
      transcripts/transcript.{json,md}
      extracted/{street_meaning,directives,claims,risk_flags,term_map}.json
      pairs/{communicator,swarmfixer,vocabulary}_pairs.jsonl
      tribunal/verdict.json
      receipts/receipt.json
      deeds/deed.json
      manifests/manifest.json
      SHA256SUMS.txt

  media/
    posts/<slug>/v1/post.md + deed.json + receipt.json
    podcasts/<num>-<slug>/v1/audio.mp3 + transcript.json + deed.json + receipt.json

  engagement/
    awards/<deed_id>.json
    rep-agreements/<deed_id>.json
    qualifications/<deed_id>.json
```

## ENS pathing

Every object-storage path mirrors an ENS-resolvable path:

| ENS | Maps to |
|---|---|
| `defendapedia.eth/{cat}/{slug}` | The canon vocabulary surface |
| `streetledger.eth/{class}/{deed_id}` | The deeded record |
| `streetchat.eth/sessions/{event_id}` | The session intake |

S3-compatible storage (Tigris · R2 · AWS S3) plus IPFS pinning provides 3-of-3 redundancy.

***

🐝 *Operator-grade · books and records · to the shed.*


> This is a foundational page in the DefendableDocs ecosystem map. The structure is committed · the deep content extends as the platform matures. Cross-references are live below.
