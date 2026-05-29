---
title: Routing Model
description: How DefendableRouter v0.1 routes GPU compute jobs to workers — job types, statuses, and the v0.2 lease lifecycle.
---

:::note[Status — routing model (v0.1, CI-verified)]
The job-routing and lease model below is **real and verified in source** (`services/leases.py`,
`services/job_router.py`), with CI green. The backend is **local and not publicly deployed**.
The v0.2 worker contract is **bearer-token authenticated** (`/workers/*` only).
:::

DefendableRouter routes **GPU compute jobs** to registered workers. There is **no ENS, App ID, or
Agent ID path resolution** — routing is a match between a queued job's requested GPU SKU and job
type and a worker's declared capabilities.

## Job types

`inference` · `fine_tune` · `eval` · `dataset_build` · `embedding` · `batch`

## Job statuses

`queued` · `leased` · `running` · `completed` · `failed` · `canceled`

The terminal (final) statuses are `completed`, `failed`, and `canceled`.

## The v0.2 lease lifecycle

The lease flow lives in `services/leases.py`:

1. **`lease_next_job`** — a worker calls `POST /workers/jobs/lease` with its
   `supported_job_types` and `supported_gpu_skus`. The router intersects the worker's declared
   capabilities (from its registration `capabilities.gpu_skus`) with the request, then picks the
   **oldest `queued` job** whose `requested_gpu_sku` and `job_type` match. It mints a
   **hashed `lease_token`** (only the hash is stored) with `DEFAULT_LEASE_SECONDS = 600` (10-minute
   TTL), sets the job to `leased`, marks the worker `busy`, links the assigned node, and writes a
   `job_leased` receipt plus a `compute_job`/`fine_tune_job` (leased phase) receipt.

2. **`accept_job`** — `POST /workers/jobs/{id}/accept` verifies the active lease (token ownership
   via `hmac.compare_digest`, not expired) and moves the job to **`running`**; writes a
   `worker_job_accepted` receipt.

3. **Status / logs / artifacts** — `record_worker_status` and the artifact route append status
   events and an `artifact_reported` receipt; each verifies the active lease first.

4. **`complete_worker_job`** — `POST /workers/jobs/{id}/complete` computes `actual_hours` from the
   start/finish timestamps (or a supplied `duration_seconds`), derives `actual_cost_usd` via
   **server-side pricing** (`services/billing.actual_compute_cost`), sets the job `completed`,
   completes the lease, and writes `compute_job`/`fine_tune_job` (completed phase) plus a
   `worker_job_completed` receipt. The job's `receipt_id` is set to the completion receipt.

5. **`fail_worker_job`** — `POST /workers/jobs/{id}/fail` sets the job `failed`, releases the lease
   and node, and writes a `worker_job_failed` receipt. **No compute charge is applied on failure
   in v0.2** (amount `0.00`).

6. **`expire_stale_leases`** — any active lease past `expires_at` is marked `expired`; if its job is
   not in a final status, the job is returned to **`queued`** (and unassigned from its node), and a
   `lease_expired` receipt is written.

## Capability matching

A worker only leases jobs whose `requested_gpu_sku` is in the intersection of the worker's
registered `gpu_skus` and the SKUs it offers at lease time, and whose `job_type` is one of the six
valid types. If there is no capability overlap or no matching queued job, the lease returns empty.

See the [Worker Contract (v0.2)](/defendablerouter/edge-events/) for the full request/response
shapes and [Receipt Capture](/defendablerouter/receipt-capture/) for the receipts each step mints.

***

🐝 *Operator-grade · books and records · to the shed.*
