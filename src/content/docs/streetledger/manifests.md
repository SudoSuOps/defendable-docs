---
title: Manifests
description: The per-snapshot books-and-records bundle. Manifest schema · SHA256SUMS · ledger root computation.
---

:::note[Roadmap — vision layer]
The manifest / ledger-root bundle described here is the **planned StreetLedger snapshot format** (vision layer), not a currently produced artifact. The live integrity surface shipping today is the DefendableCloud `/ledger` + `/ledger/verify` per-org hash chain over `DCR-*` receipts — see [DefendableCloud](/defendablecloud/overview/).
:::

## What a manifest is

A manifest is the per-snapshot bundle that records EVERY file in a deed export tree · with its hash · its bytes · its type. The manifest IS the books-and-records of the ledger itself.

## Manifest schema

```json
{
  "manifest_type": "STREETLEDGER_VOCABULARY_MANIFEST",
  "manifest_id": "STREETLEDGER-MANIFEST-v1",
  "created_at": "2026-05-24T19:53:52.370Z",
  "source_repo": "defend-A-pedia--vocabulary",
  "term_count": 62,
  "deed_count": 62,
  "receipt_count": 124,
  "categories": { "client_terms": 8, "cre_terms": 11, ... },
  "classifications": { "ROYAL_JELLY": 12, "HONEY": 38, ... },
  "ledger_root_sha256": "1f21f6b154718cd4...",
  "files": [
    { "path": "...", "sha256": "...", "bytes": ..., "type": "term|deed|receipt|manifest" }
  ]
}
```

## SHA256SUMS

A plain-text file with one line per artifact in the tree · `{sha256}  {path}` · readable by any SHA-256 tool. Standard Unix `sha256sum -c SHA256SUMS.txt` will verify the entire tree.

## Ledger root

The `ledger_root_sha256` is SHA-256 over the sorted concatenation of every file hash. It is the single 64-character value that anchors the entire snapshot. Cross-check it against the published manifest's `ledger_root_sha256` field — same canonicalization rule, same result.

*No external chain anchoring on the spine — see the [Kill Hedera doctrine](/defendableledger/kill-hedera/). Earlier docs cross-checked this root on Hedera HCS topic `0.0.10291838`; that anchor is superseded for new manifests.*

***

🐝 *Operator-grade · books and records · to the shed.*
