---
title: Deed Schema
description: DDEED-{CLASS} — books-and-records artifacts published to DefendableLedger. 5 Proofs · in-house hash-chained · NOT externally anchored.
---

## What a deed is

A **DDEED** is a books-and-records artifact published to [DefendableLedger](/defendableledger/overview/). Deeds are distinct from [DefendableCloud receipts](/schemas/receipt/):

| | Receipt | Deed |
|---|---|---|
| Surface | DefendableCloud Vault | DefendableLedger (books-and-records surface) |
| Chain | per-org hash chain (Cloud) | append-only JSONL ledger (DefendableLedger) |
| Lane | Agent / Dataset / Compute / Cook / Incident Runs | Vocabulary terms (DDEED-VOCAB) · Media artifacts (DDEED-MEDIA-*) · Founder origin (DDEED-FOUNDER-ORIGIN) · etc. |
| Required? | Yes — every Run mints one on approval. | Selectively — books-and-records artifacts only. |

Receipts and deeds **share the same in-house hashing discipline** and the same **no-external-anchoring** doctrine ([Kill Hedera](/defendableledger/kill-hedera/)).

## Schema

```json
{
  "deed_type": "DDEED_<CLASS>",
  "deed_id": "DDEED-<CLASS>-<TOPIC>-<SLUG>-v<N>",
  "deed_version": "v1",
  "five_proofs": {
    "origin":    { "speakers": ["..."], "recorded_at": "..." },
    "quality":   { "verdict": { /* defendablecloud.verdict/v1 */ } },
    "process":   { "pipeline_version": "...", "rulebook_version": "..." },
    "economics": { "cost_to_mint": { "compute_usd": 0.0, "human_review_min": 0, "storage_kb": 0 } },
    "trust":     { "payload_sha256": "...", "ledger_seq": 42, "parent_hash": "..." }
  },
  "hashes": {
    "markdown_sha256": "...",
    "json_sha256": "..."
  },
  "minted_at_utc": "..."
}
```

## Deed classes

Common classes seen in DefendableLedger:

| Class | Purpose |
|---|---|
| `DDEED_VOCABULARY_TERM` | A canonical Defend-A-Pedia term + its provenance. |
| `DDEED_MEDIA_POST` | A blog post on offensetotheshed.com. |
| `DDEED_MEDIA_POD` | A podcast episode on painintheshed.com. |
| `DDEED_FOUNDER_ORIGIN` | A founder-voice canonical record (immutable books-and-records). |
| `DDEED_ENGAGEMENT_RECORD` | A signed engagement award (e.g. listing brokerage). |

## The 5 Proofs

| Proof | What it carries |
|---|---|
| **Origin** | Who said / produced it · when · in what session / setting. |
| **Quality** | The verdict from the [referee](/defendableos/rulebook-engine/) when applicable. (For media + vocabulary deeds, the verdict is the linguistic curator's output; for engagement deeds it is the signed agreement.) |
| **Process** | What pipeline version produced this deed. Which rulebook version was applied. |
| **Economics** | Cost to mint — compute, human review time, storage, energy. *(See [Cost to Mint](/cost-to-mint/overview/) for the dimensions.)* |
| **Trust** | The hash chain coordinates — `payload_sha256`, position in the ledger, parent hash. **No external chain anchor field.** |

## Hash discipline

1. Canonicalize the deed JSON: sorted keys · no whitespace · UTF-8.
2. SHA-256 over the canonical bytes.
3. The result is the deed's `json_sha256`.
4. The deed's position in the DefendableLedger JSONL carries the `parent_hash` to the prior ledger record (see [DefendableLedger · Hash-Chain Format](/defendableledger/hash-chain/)).

## What changed from earlier docs

| Old field | New treatment |
|---|---|
| `five_proofs.trust.hedera_topic` | **Removed.** No external chain anchoring on the spine — see [Kill Hedera doctrine](/defendableledger/kill-hedera/). Trust proof carries the in-house chain coordinates only. |
| Classification `HONEY/ROYAL_JELLY/JELLY/PROPOLIS` on `five_proofs.quality` | Replaced with the [defendablecloud.verdict/v1](/schemas/tribunal-verdict/) shape (3 severities + 3 tiers + risk_breakdown). |
| `validator_confidence` 0-1 | **Removed.** Confidence dial superseded by declared rules + flag tiers. |

***

🐝 *Books and records · in-house hashes · no external anchor · to the shed.*
