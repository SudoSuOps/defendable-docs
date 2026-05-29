---
title: Router API
description: DefendableRouter v0.1 backend surface. Real and CI-verified, not yet publicly deployed.
---

:::caution[Status — not publicly deployed]
DefendableRouter is a **real, CI-verified v0.1 backend** — but it is **not** a public endpoint yet.
There is no hosted Router URL. Do not point traffic at it. The live, public surface today is
DefendableCloud at `api.defendablecloud.com`. The shapes below are the actual v0.1 routes you get
when you run the router locally.
:::

## Stack

FastAPI + SQLite + a Typer CLI + a local JSONL receipt ledger. (Postgres/Alembic, Stripe, and
object storage are roadmap — not built in v0.1.) No `/v1` prefix.

## Authentication

Only the `/workers/*` worker contract is authenticated (bearer token). The member and admin
endpoints are **unauthenticated in v0.1** — which is exactly why the backend must not be exposed
publicly until auth lands on those rails.

## Endpoints

**Health**

- `GET /health`

**Admin**

- `GET /admin/summary`
- `GET /admin/workers`, `GET /admin/workers/{id}`

**Members**

- `POST /members`
- `GET /members/{id}`
- `POST /members/{id}/activate`
- `GET /members/{id}/status`

**Datasets**

- `POST /datasets`, `GET /datasets`
- `GET /datasets/{id}`
- `POST /datasets/{id}/access` — grant an active member access (emits a `dataset_access` receipt); 403 for inactive members.

**Compute**

- `GET /compute/inventory`
- `POST /compute/register-node`
- `POST /compute/quote`

**Jobs**

- `POST /jobs`, `GET /jobs/{id}`
- `POST /jobs/{id}/start`, `/jobs/{id}/complete`, `/jobs/{id}/cancel`

Job types: `inference`, `fine_tune`, `eval`, `dataset_build`, `embedding`, `batch`.
Statuses: `queued`, `leased`, `running`, `completed`, `failed`, `canceled`.

**Workers (bearer-authenticated)**

- `POST /workers/register`, `POST /workers/heartbeat`
- `POST /workers/jobs/lease`
- `POST /workers/jobs/{id}/accept`, `/status`, `/logs`, `/artifacts`, `/complete`, `/fail`

Worker contract v0.2: register → `worker_token`; heartbeat; lease (`lease_token`, hashed, 600s TTL);
accept; status/logs; artifacts; complete (computes actual cost) / fail.

## Pricing

Pricing constants live server-side in `core/pricing.py`. The server **never** trusts a
caller-supplied rate:

- Annual membership: `$100.00`
- `rtx6000_blackwell_96gb`: `$5/hr`
- `rog_astral_5090_32gb`: `$2/hr`

Quote math is plain multiplication: 2h on the RTX 6000 = `$10`; 3h on the 5090 = `$6`.

## Receipts

Router receipts are written to local JSONL at `data/receipts/YYYY-MM-DD.receipts.jsonl`, one
receipt per line. Each has `checksum_sha256` = SHA-256 over canonical JSON (sorted keys, compact
separators, `Decimal` → 2-dp string, ISO timestamps) **excluding** the checksum field.

Receipt types: `membership`, `dataset_access`, `compute_quote`, `compute_job`, `fine_tune_job`,
`worker_registered`, `job_leased`, `worker_job_accepted`, `artifact_reported`,
`worker_job_completed`, `worker_job_failed`, `lease_expired`.

:::note
Router receipts are **checksummed but not hash-chained** — there is no `parent_hash` linkage here.
That is different from the DefendableCloud receipt API, where receipts form a per-org hash chain.
We say so honestly.
:::

***

🐝 *Operator-grade · books and records · to the shed.*
