---
title: DefendableLedger · Royal Jelly Tiers
description: Every training pair gets a tier. Five tiers · Apex · Honey · Jelly · Pollen · Propolis. The corpus compounds toward operator-grade Hacks.
---

:::note[Roadmap / design intent — taxonomy is canonical, tooling is not built]
The Royal Jelly **tier taxonomy and grading doctrine on this page are canonical**. But the tooling that would emit them — SwarmJelly pair extraction, SwarmCurator-9B (Qwen 3.5) tiering, the `data/swarmjelly/<tier>/` directories, and the `SJP-` / `DRR-` / `TRIB-` id schemes — is **design intent, not shipped code**. No `DRR-`, `TRIB-`, or `SJP-` receipts are emitted today. The real receipt id forms that exist are `rcpt_<hex>` (router, checksummed-not-chained) and `DCR-{org_seq:06d}-{hex8}` (cloud, hash-chained). Treat the pseudocode and directory layout below as illustrative design, and the compounding math as a projection.
:::

## The five tiers

In the design, SwarmJelly assigns one of five Royal Jelly tiers to every extracted training pair, based on SwarmCurator's 4-dimension grade.

| tier | score band | what it is | use |
|---|---|---|---|
| **Apex** | 4.5–5.0 | Operator-grade ground truth · principal-level signal | Primary fine-tune corpus for Atlas + Curator + specialist Hacks |
| **Honey** | 3.5–4.5 | Production-ready · strong | Production fine-tune blends · validator chain training |
| **Jelly** | 2.5–3.5 | Solid corpus material · workhorse | Breadth coverage · DPO pair candidates |
| **Pollen** | 1.5–2.5 | Broad coverage · breadth signal | Diversity sampling · low-weight inclusion |
| **Propolis** | < 1.5 | Edge cases · failure modes · repair lift | SwarmFixer corpus · repair-pair training |

## How the tier is assigned (illustrative design)

```python
score = mean([accuracy, cre_judgment, format, score_overall])

if score >= 4.5:  tier = "apex"
elif score >= 3.5: tier = "honey"
elif score >= 2.5: tier = "jelly"
elif score >= 1.5: tier = "pollen"
else:              tier = "propolis"
```

The 4-dim rubric is held by SwarmCurator-9B (Qwen 3.5 base · in-house cook). No external grader. No hosted-LLM tax.

## Why tiering matters

A flat corpus is a wasted corpus. Mixing apex signal with propolis edge cases at equal weight dilutes both ends — your fine-tune learns muddy ground truth AND fails to focus on the actual repair lift. Tiering preserves signal density.

**Apex** is what you train the *first pass* on. **Propolis** is what you train **SwarmFixer** on. **Pollen + Jelly** are the breadth corpus. **Honey** is the production-ready blend.

This is how the corpus compounds toward operator-grade Hacks without drifting.

## What would live in each tier directory (design)

```
data/swarmjelly/
├── apex/
│   ├── SJP-20260524-01KSE...AKVHNB.json
│   └── SJP-20260524-01KSE...XYZ.json
├── honey/
├── jelly/
├── pollen/
├── propolis/
└── corpus_index.jsonl        # streaming index of all pairs (one line each)
```

Each pair file:

```json
{
  "pair_id": "SJP-YYYYMMDD-ULID",
  "receipt_id": "DRR-YYYYMMDD-ULID",
  "verdict_id": "TRIB-YYYYMMDD-ULID",
  "tier": "apex|honey|jelly|pollen|propolis",
  "input": "<raw client language>",
  "output": { "assignment_type": "...", "expected_outputs": [...] },
  "rubric_scores": { "accuracy": 4.5, "cre_judgment": 4.7, "format": 4.8, "score": 4.6 },
  "created_at": "2026-05-24T22:33:26Z",
  "pair_sha256": "<sha256>"
}
```

## The 88K-pair compounding math (projection)

This is a **projection** of the design's potential, not a measured throughput. At one receipt every ~6 minutes (a steady principal cadence), the eco system would mint **~88,000 training pairs per year** — entirely sovereign · zero marginal cost · automatically tiered. Five years compounds to **~440K pairs / ~242K in Apex+Honey** ready for fine-tune blends.

Compare to outsourced labeling at $2/pair market rate: $96K/yr of equivalent value · captured for $0 marginal · with full provenance · without sending operator-grade data to a third-party labeler.

***

🐝 *The corpus compounds · the cook gets sharper · to the shed.*
