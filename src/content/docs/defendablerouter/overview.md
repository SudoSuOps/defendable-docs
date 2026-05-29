---
title: DefendableRouter · Overview
description: DefendableRouter v0.1 — member-only dataset and GPU-compute router. Real, CI-verified local backend (FastAPI + SQLite + Typer CLI + JSONL receipt ledger). Not yet publicly deployed.
---

:::note[Status — DefendableRouter v0.1]
The DefendableRouter spine is **real and CI-verified** (PR #1 green) but it **runs locally** —
there is **no public endpoint yet**. It is not on the live DefendableCloud demo path
(`api.defendablecloud.com` is the deployed, live surface; the router is not).

Security posture for v0.1: **only `/workers/*` is authenticated** (bearer token). The
member, admin, dataset, compute, and job routes are **unauthenticated in v0.1 and must not be
exposed publicly**. Treat this as a backend behind a trusted boundary until the public
auth surface lands.
:::

DefendableRouter is the **Router track** of the DefendableOS architecture — the member-only
broker that sits between the people who pay annual membership and the sovereign GPU fleet +
curated datasets they get access to. Every billable and lifecycle event mints a checksummed
receipt to a local JSONL ledger.

The v0.1 backend is **FastAPI + SQLite + a Typer CLI + a local JSONL receipt ledger**. Postgres,
Alembic, Stripe, and object-storage are **roadmap, not built**.

## The five real subsystems

1. **Member gate.** Annual membership is **$100.00**. Access to datasets and compute is gated by
   `require_active_member` (in `core/security.py`), which checks the member exists and the
   membership is active before any broker action proceeds.

2. **Dataset broker.** `GET /datasets` lists member-access datasets; `GET /datasets/{id}` returns
   one; `POST /datasets/{id}/access` records member access and mints a `dataset_access` receipt,
   returning the `object_uri` to the active member. See [API Contracts](/defendablerouter/api-contracts/).

3. **Server-side compute pricing.** Pricing constants live in `core/pricing.py` and are applied
   **server-side** — the router **never trusts a caller-supplied rate**. Two SKUs are priced:
   `rtx6000_blackwell_96gb` at **$5/hr** and `rog_astral_5090_32gb` at **$2/hr**. A quote of
   2h on the RTX 6000 = **$10**; 3h on the 5090 = **$6**.

4. **Job router.** Six job types (`inference`, `fine_tune`, `eval`, `dataset_build`, `embedding`,
   `batch`) and six statuses (`queued`, `leased`, `running`, `completed`, `failed`, `canceled`)
   move a job through its lifecycle, including the v0.2 worker lease flow. See
   [Routing Model](/defendablerouter/routing-model/).

5. **Local JSONL hash-chained receipts.** Every billable/lifecycle event writes a receipt line to
   `data/receipts/YYYY-MM-DD.receipts.jsonl` with a `checksum_sha256` over canonical JSON. Receipts
   are **hash-chained** — each carries a `seq` and a `parent_hash` linking it to the prior receipt
   (genesis = 64 zeros), mirroring the DefendableCloud chain (the router keeps one house-wide chain).
   `GET /receipts/verify` (or `defendable-router verify-ledger`) recomputes and validates the whole
   chain. See [Receipt Capture](/defendablerouter/receipt-capture/).

## Where to go next

- [Routing Model](/defendablerouter/routing-model/) — job types, statuses, and the v0.2 lease lifecycle.
- [API Contracts](/defendablerouter/api-contracts/) — the eight real route groups, with request/response shapes.
- [Receipt Capture](/defendablerouter/receipt-capture/) — the local JSONL ledger and checksum algorithm.
- [Worker Contract (v0.2)](/defendablerouter/edge-events/) — the only authenticated integration surface.
- [Identity & Auth](/defendablerouter/ens-app-agent-id/) — member gating, worker bearer tokens, lease ownership.
- [Storage (v0.1)](/defendablerouter/object-storage-flow/) — local SQLite + JSONL persistence.

***

🐝 *Operator-grade · books and records · to the shed.*
