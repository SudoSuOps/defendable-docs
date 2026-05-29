---
title: Object Storage Export
description: The StreetLedger-compatible bundle. Per-session tree structure · manifests · SHA256SUMS.
---

:::note[Roadmap — not yet implemented]
The export bundle and its StreetLedger mapping are **designed**, not implemented in the audited codebase. The tree below is the *proposed* bundle layout. (See the [overview](/streetchat/overview/) for full status.)
:::

## The proposed export tree

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

This tree will map 1:1 to the planned StreetLedger object-storage layout under `streetchat/sessions/<event_id>/`. Once the export is built, operators would be able to `aws s3 sync` or `ipfs add -r` the tree directly. DDEED anchoring of the bundle (the `deeds/` directory above) is also roadmap — not yet wired.

***

🐝 *Operator-grade · books and records · to the shed.*
