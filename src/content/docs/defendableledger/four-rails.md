---
title: DefendableLedger · Four Rails
description: Every receipt mints four artifacts. Receipt · Verdict · Training Pair · Deed. One pass. Sovereign compute. Books and records.
---

## The four rails per intake

```
Client / StreetChat / API / Edge
  │
  ▼
┌─────────────────────────────────────────────────────┐
│ Rail 1 · Receipt                                    │
│ DefendableRouter                                    │
│ canonical receipt object · hashed · provenance      │
└─────────────────────────────────────────────────────┘
  │
  ▼
┌─────────────────────────────────────────────────────┐
│ Rail 2 · Verdict                                    │
│ Tribunal · SwarmCurator-9B (Qwen 3.5 · in-house)    │
│ 4-dim rubric: accuracy · cre_judgment · format · score │
└─────────────────────────────────────────────────────┘
  │
  ▼
┌─────────────────────────────────────────────────────┐
│ Rail 3 · Training Pair                              │
│ SwarmJelly                                          │
│ pair extracted · Royal Jelly tier assigned          │
│ in-house corpus grows                               │
└─────────────────────────────────────────────────────┘
  │
  ▼
┌─────────────────────────────────────────────────────┐
│ Rail 4 · Deed                                       │
│ DefendableLedger                                    │
│ append-only · hash-chained · sealed record          │
│ → defendableledger.com publication                  │
└─────────────────────────────────────────────────────┘
```

## Rail 1 · Receipt

**Issued by:** DefendableRouter
**Schema:** `router_receipt.json`
**Hashes:** `canonical_receipt_sha256` + `receipt_sha256`
**Provenance:** host · GPU · CUDA · issued_by

Captures: client meaning · assignment · route · object-storage prefix · Tribunal stub · DDEED stub.

[Receipt schema →](/schemas/router-receipt/)

## Rail 2 · Verdict

**Issued by:** Tribunal · SwarmCurator-9B
**Model:** in-house Qwen 3.5 base · sovereign GPU · no external API tax
**Rubric (4 dimensions, 0.0–5.0):**

- **accuracy** — how factually grounded and verifiable the assignment is
- **cre_judgment** — how operator-grade and CRE-broker-like the assignment is
- **format** — how cleanly structured the parsed assignment is
- **score** — overall holistic score

**Outputs:** `verdict_id` · per-dim scores · `assignment_success` · `tier` · operator notes.

## Rail 3 · Training Pair

**Issued by:** SwarmJelly
**Format:** `{pair_id, receipt_id, verdict_id, tier, input, output, rubric_scores, pair_sha256}`
**Routes to:** `data/swarmjelly/<tier>/<pair_id>.json` + appends to `corpus_index.jsonl`

Five Royal Jelly tiers: **Apex · Honey · Jelly · Pollen · Propolis**.
[Royal Jelly Tiers →](/defendableledger/royal-jelly-tiers/)

## Rail 4 · Deed

**Issued by:** DefendableLedger
**Schema:** append-only hash-chained JSONL
**Chain link:** each record's `parent_hash` = prior record's `record_sha256`

Sealed record carries: `ledger_seq` · `record_id` · `record_type` · `parent_hash` · `payload_ref` · `payload_hash` · `issued_by` · `record_sha256`.

[Hash-Chain Format →](/defendableledger/hash-chain/)

## End-to-end ROI

| rail | cost | latency | mints asset |
|---|---|---|---|
| Receipt | sovereign GPU only | ms | ✅ |
| Verdict | SwarmCurator-9B inference (sovereign) | 1–3s | ✅ |
| Training Pair | extraction + tier assignment | ms | ✅ corpus compounds |
| Deed | hash + write | ms | ✅ |

**Every intake = 4 defendable assets minted · cost stays in cost-to-mint band.**

***

🐝 *Four rails · one receipt · every call · to the shed.*
