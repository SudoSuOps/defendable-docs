---
title: DefendableLedger · Four Rails
description: The doctrine — work should mint defendable artifacts. The four-rail pipeline is roadmap; the real receipt rails (cloud hash chain + router checksummed receipts) are documented honestly.
---

## The doctrine

Work should mint **defendable artifacts**, not just outputs. Every meaningful step ought to leave behind a receipt that can be recomputed, checked, and stood behind. That doctrine is canonical.

The full four-rail pipeline that expresses it end to end is **roadmap**.

:::note[Roadmap / vision — not built]
The four-rail flow below (Receipt → Tribunal Verdict → SwarmJelly Training Pair → DefendableLedger Deed) is **design intent**. Tribunal-as-API grading, SwarmJelly tier routing, and hash-chained DefendableLedger Deeds are **not built**. What *is* built today: (1) the DefendableCloud per-org hash chain (LIVE), and (2) DefendableRouter v0.1 checksummed receipts (local). Those two are documented as real below.
:::

```
intake
  │
  ▼
Rail 1 · Receipt          REAL  (cloud hash chain / router checksummed receipt)
  │
  ▼
Rail 2 · Verdict          ROADMAP  (Tribunal · SwarmCurator-9B)
  │
  ▼
Rail 3 · Training Pair    ROADMAP  (SwarmJelly · Royal Jelly tier)
  │
  ▼
Rail 4 · Deed             ROADMAP  (hash-chained ledger record)
```

## Rail 1 · Receipt — REAL

Two real receipt rails exist today.

### Cloud receipt (LIVE · hash-chained)

DefendableCloud mints a per-org hash-chained receipt at **api.defendablecloud.com**:

- `receipt_id` = `DCR-{org_seq:06d}-{hex8}`
- `org_seq` (sequential from 0), `parent_hash` (prior `receipt_sha256`; genesis = 64 zeros)
- `receipt_sha256` = `sha256_hex(orjson.dumps(payload, OPT_SORT_KEYS))`
- persisted in Postgres; JSON+PDF copy uploaded to Tigris best-effort

[Hash-Chain Format →](/defendableledger/hash-chain/) · [Verify →](/defendableledger/verify/)

### Router receipt (local · checksummed-not-chained)

DefendableRouter v0.1 (local, not publicly deployed) writes flat receipts to `data/receipts/YYYY-MM-DD.receipts.jsonl`:

```json
{
  "receipt_id": "rcpt_<hex>",
  "receipt_type": "membership | dataset_access | compute_quote | compute_job | ...",
  "member_id": "...",
  "job_id": null,
  "dataset_ids": [],
  "amount_usd": "10.00",
  "metadata": {},
  "created_at": "2026-05-29T...",
  "checksum_sha256": "<sha256 over canonical JSON excluding this field>"
}
```

Flat, per-line `checksum_sha256`, **not hash-chained** (no `parent_hash`). Tamper-evident per line only.

## Rail 2 · Verdict — ROADMAP

:::note[Not built]
Tribunal grading via SwarmCurator-9B (Qwen 3.5 base, in-house) on a 4-dimension rubric (`accuracy · cre_judgment · format · score`) is design intent. No `verdict_id` is emitted by either codebase today.
:::

## Rail 3 · Training Pair — ROADMAP

:::note[Not built]
SwarmJelly pair extraction and Royal Jelly tier routing (`data/swarmjelly/<tier>/`) are design intent. See [Royal Jelly Tiers](/defendableledger/royal-jelly-tiers/) for the taxonomy (canonical) versus the unbuilt tooling.
:::

## Rail 4 · Deed — ROADMAP

:::note[Not built]
A separate hash-chained DefendableLedger "Deed" record (with `DLR-`/`ledger_seq` fields and a public defendableledger.com render) is design intent. The real hash chain that exists is the cloud's per-org chain described in Rail 1.
:::

## What is built vs roadmap — ROI

| rail | status | what exists | mints defendable asset |
|---|---|---|---|
| Receipt (cloud) | **REAL · LIVE** | per-org hash chain, Postgres, `/ledger` + `/ledger/verify` | ✅ recomputable, chained |
| Receipt (router) | **REAL · LOCAL** | flat `checksum_sha256` receipts in JSONL | ✅ tamper-evident per line |
| Verdict | roadmap | — | planned |
| Training Pair | roadmap | — | planned |
| Deed | roadmap | — | planned |

The doctrine — every step mints a defendable artifact — holds. Today it is honored by two real receipt rails; the verdict/pair/deed rails are the build ahead.

***

🐝 *Work mints artifacts · receipts you can stand behind · to the shed.*
