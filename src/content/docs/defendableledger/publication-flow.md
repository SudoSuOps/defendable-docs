---
title: DefendableLedger · Publication Flow
description: The intended local-fast → batched-public publication design. Roadmap. The real live, verifiable, hash-chained receipts are served today at api.defendablecloud.com.
---

:::caution[Roadmap / design — none of the publication pipeline is built]
This page describes **design intent**. The batch publisher, `defendable_ledger.jsonl`, the public `defendable-ledger` repo, the `/records` + `/verify` pages on defendableledger.com, `--redact`, and IPFS/ENS pinning are **NOT BUILT**. There is no `defendablerouter ledger publish` command. For real, live, hash-chained, verifiable receipts today, use **api.defendablecloud.com** `GET /ledger` and `GET /ledger/verify` (auth-gated). See [Verify a Receipt](/defendableledger/verify/).
:::

## What is real today

- **Cloud (LIVE):** DefendableCloud serves the per-org hash chain at **api.defendablecloud.com** — `GET /ledger` (the chain in `org_seq` order) and `GET /ledger/verify` (server-side recompute, auth-gated). This is the surface to point anyone at when they want verifiable receipts.
- **Router (local):** DefendableRouter v0.1 writes flat **checksummed-not-chained** receipts to `data/receipts/YYYY-MM-DD.receipts.jsonl`, one line each with a `checksum_sha256`. There is no publisher and no public render — it is a local artifact only.

## The intended flow (roadmap)

```
1. Intake received
       │  (roadmap)
       ▼
2. Receipt + Verdict + Pair + Deed minted (4 rails)
       │  (roadmap — only Rail 1 receipts exist today)
       ▼
3. Records appended locally to a hash-chained ledger
       │  (roadmap — no defendable_ledger.jsonl today)
       ▼
4. Batch publisher copies new records into a public repo
       │  (roadmap — no publisher, no defendable-ledger repo)
       ▼
5. git push → CF Pages build
       │  (roadmap)
       ▼
6. defendableledger.com renders records publicly
          (roadmap — no /records or /verify pages)
```

## Why batched, not per-intake (design rationale)

The design favors batched publication over per-intake commits for two reasons, should it be built:

1. **Intake stays fast.** Per-intake git commit + push + CF rebuild would block the response. Local writes are milliseconds.
2. **Git history stays sane.** High intake volume would mean one commit per intake; batching keeps the repo readable.

## Publisher CLI (planned, not implemented)

:::note[Not implemented]
No `defendablerouter ledger publish` command exists. The sketch below is planned design only.
:::

```bash
# PLANNED — does not exist
defendablerouter ledger publish --since <iso> --repo <path> --commit --push
```

## Privacy & redaction (planned)

A `--redact` mode that strips classified fields before publication is **planned, not built**. Public-by-default with operator-grade discretion is the intended principle.

## Verification — use the real surface

Until the publication pipeline exists, verification runs against the live cloud chain: `GET /ledger/verify` recomputes each `receipt_sha256` over the canonical (orjson sorted-keys) payload, checks sequential `org_seq`, and checks each `parent_hash` link — server-side and auth-gated. [Verify a Receipt →](/defendableledger/verify/)

## ENS / IPFS sibling (planned)

Pinning a published `/dist` to IPFS and updating an ENS contenthash for the legacy `streetledger.eth.limo` audience is **planned**, contingent on the publisher existing first.

***

🐝 *Roadmap for the public render · the live chain is at api.defendablecloud.com · to the shed.*
