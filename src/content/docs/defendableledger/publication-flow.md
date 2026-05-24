---
title: DefendableLedger · Publication Flow
description: Router writes local records fast. The batch publisher commits to the defendable-ledger repo. CF Pages rebuilds. The public proof at defendableledger.com updates.
---

## The flow

```
1. DefendableRouter receives intake
       │
       ▼
2. Receipt + Verdict + Pair + Deed minted (4 rails)
       │
       ▼
3. Records appended locally to smash:~/defendablerouter/data/ledger/defendable_ledger.jsonl
   Pairs routed to smash:~/defendablerouter/data/swarmjelly/<tier>/*.json
       │  (fast · sub-millisecond · sovereign disk)
       │
       ▼
4. Batch publisher (cron OR explicit CLI) copies new records into:
   github.com/SudoSuOps/defendable-ledger/public/records/*.json
       │
       ▼
5. git push → CF Pages CI build → /dist updated
       │
       ▼
6. defendableledger.com renders the new records publicly
```

## Why batched, not per-intake

Two reasons:

1. **Intake stays fast.** Per-intake git commit + push + CF rebuild would block the HTTP response by minutes. Records are written to local disk in milliseconds.
2. **Git history stays sane.** 88K intakes/year = 88K commits if per-intake. Batched (hourly / daily / on-demand) keeps the repo readable.

## Publisher CLI (planned)

```bash
defendablerouter ledger publish \
  --since "2026-05-24T00:00:00Z" \
  --repo ~/Desktop/defendable-ledger \
  --commit \
  --push
```

What it does:
1. Reads `data/ledger/defendable_ledger.jsonl` from `--since` cursor.
2. Reads referenced payload files (receipts, verdicts, pairs).
3. Copies them into the `defendable-ledger` repo under `public/records/<YYYY>/<MM>/`.
4. Updates `public/records/index.json` with new entries.
5. Commits with a deterministic message: `Publish records <N> · ledger_seq <a>–<b>`.
6. Pushes to origin/main. CF Pages auto-rebuilds.

## What lives in the public repo vs the spine

| location | what lives there |
|---|---|
| `smash:~/defendablerouter/data/` | hot path · all receipts · all pairs · ledger JSONL · spine state of truth |
| `SudoSuOps/defendable-ledger/public/records/` | published subset · normalized JSON · what the public site renders |

The spine is the source of truth. The repo is the publication mirror.

## Privacy & redaction (when needed)

Not every record published. The publisher honors a `--redact` mode that strips fields flagged `classification != UNCLASSIFIED`. The hash chain still verifies because canonical hashes are computed before redaction.

Public-by-default is the principle. Operator-grade discretion is the guardrail.

## Verification still works after publication

Each published record carries its `record_sha256`. The `/verify` page on defendableledger.com recomputes locally via WebCrypto. Anyone can:

1. Open `/records/<id>`.
2. Click "Verify".
3. Browser computes SHA-256 of the canonical record.
4. Match against the published `record_sha256`.

Client-side. Zero trust required.

## ENS / IPFS sibling

For the legacy `streetledger.eth.limo` audience, the publisher can also pin the latest `/dist` to IPFS and update the ENS contenthash record. Optional · one cron away · not on the hot path.

***

🐝 *Local fast · batched public · books and records · to the shed.*
