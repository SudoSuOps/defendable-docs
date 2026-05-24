---
title: Object Storage Export
description: The StreetLedger-compatible bundle. Per-session tree structure · manifests · SHA256SUMS.
---

## The export tree

```
data/exports/<event_id>/
  raw/                  audio_original.<ext>
  transcripts/          transcript.json · transcript.md
  extracted/            street_meaning.json · directives.json · claims.json ·
                        risk_flags.json · term_map.json
  pairs/                communicator_pairs.jsonl · swarmfixer_pairs.jsonl ·
                        vocabulary_pairs.jsonl
  tribunal/             verdict.json
  receipts/             receipt.json
  deeds/                deed.json
  manifests/            manifest.json
  SHA256SUMS.txt
```

## Cross-rail flow

This tree maps 1:1 to the StreetLedger object-storage layout under `streetchat/sessions/<event_id>/`. Operators can `aws s3 sync` or `ipfs add -r` the tree directly.

***

🐝 *Operator-grade · books and records · to the shed.*


> This is a foundational page in the DefendableDocs ecosystem map. The structure is committed · the deep content extends as the platform matures. Cross-references are live below.
