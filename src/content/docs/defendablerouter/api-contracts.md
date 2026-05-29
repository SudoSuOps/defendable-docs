---
title: API Contracts
description: DefendableRouter v0.1 HTTP API — real route groups verified in source. Local backend, not publicly deployed.
---

:::note[Status — Router API contracts (v0.1, CI-verified)]
The routes below are **real and verified in source**, with CI green (PR #1). The backend is
**local and not publicly deployed**. **Only `/workers/*` is authenticated** (bearer token); the
member, admin, dataset, compute, and job routes are **unauthenticated in v0.1 and must not be
exposed publicly**. There is **no `/v1` prefix** anywhere — routes are mounted at their bare
group paths.
:::

Eight real route groups are mounted in `main.py`: members, datasets, compute, jobs, workers,
admin, health (plus the worker sub-routes under jobs/lease). All paths are exactly as written —
no version prefix.

## Health

| Method | Path | Notes |
| --- | --- | --- |
| `GET` | `/health` | Liveness. |

## Members — `/members`

| Method | Path | Body / Response |
| --- | --- | --- |
| `POST` | `/members` | `MemberCreate {email, name}` → `MemberRead`. |
| `GET` | `/members/{member_id}` | → `MemberRead`. |
| `POST` | `/members/{member_id}/activate` | Marks annual fee paid, sets membership window → `MemberRead`; mints a `membership` receipt for `$100.00`. |
| `GET` | `/members/{member_id}/status` | → `MemberStatusRead {member_id, status, active, annual_fee_paid, membership_expires_at}`. |

`MemberRead` fields: `id, email, name, status, annual_fee_paid, membership_started_at,
membership_expires_at, created_at`.

## Datasets — `/datasets`

| Method | Path | Body / Response |
| --- | --- | --- |
| `POST` | `/datasets` | `DatasetCreate` → `DatasetRead`. |
| `GET` | `/datasets` | → `list[DatasetRead]`. |
| `GET` | `/datasets/{dataset_id}` | → `DatasetRead`. |
| `POST` | `/datasets/{dataset_id}/access` | `DatasetAccessRequest {member_id}` → `DatasetAccessResponse`; mints a `dataset_access` receipt. |

`DatasetRead` fields: `id, title, domain, description, object_uri, license_type, quality_tier,
checksum_sha256 (64-hex), size_bytes, row_count, is_member_access, created_at`.
`DatasetAccessResponse`: `access_granted, dataset_id, member_id, receipt_id, object_uri`.

## Compute — `/compute`

| Method | Path | Body / Response |
| --- | --- | --- |
| `GET` | `/compute/inventory` | → `list[ComputeNodeRead]`. |
| `POST` | `/compute/register-node` | `ComputeNodeCreate` → `ComputeNodeRead`. |
| `POST` | `/compute/quote` | `ComputeQuoteRequest {member_id, requested_gpu_sku, estimated_hours>0, job_type}` → `ComputeQuoteResponse`; mints a `compute_quote` receipt. |

Quotes use **server-side pricing only** (`core/pricing.py`) — the caller's rate is never trusted.
`ComputeQuoteResponse`: `member_id, requested_gpu_sku, gpu_display_name, hourly_rate_usd,
estimated_hours, estimated_cost_usd, job_type, receipt_id`. Worked examples:
**2h `rtx6000_blackwell_96gb` = $10.00**; **3h `rog_astral_5090_32gb` = $6.00**.

## Jobs — `/jobs`

| Method | Path | Body / Response |
| --- | --- | --- |
| `POST` | `/jobs` | `JobCreate {member_id, job_type, requested_gpu_sku, estimated_hours>0, input_dataset_ids[], output_uri?}` → `JobRead`. |
| `GET` | `/jobs/{job_id}` | → `JobRead`. |
| `POST` | `/jobs/{job_id}/start` | → `JobRead`. |
| `POST` | `/jobs/{job_id}/complete` | → `JobRead`. |
| `POST` | `/jobs/{job_id}/cancel` | → `JobRead`. |

`JobRead` fields: `id, member_id, job_type, requested_gpu_sku, assigned_node_id, status,
estimated_hours, estimated_cost_usd, actual_started_at, actual_finished_at, actual_hours,
actual_cost_usd, input_dataset_ids, output_uri, receipt_id, created_at`.

## Workers — `/workers` (authenticated — bearer token)

| Method | Path | Body / Response |
| --- | --- | --- |
| `POST` | `/workers/register` | `WorkerRegisterRequest` → `WorkerRegisterResponse {worker_id, worker_token, status}`. |
| `POST` | `/workers/heartbeat` | `WorkerHeartbeatRequest` → `WorkerHeartbeatResponse {ok, worker_id, server_time, next_heartbeat_seconds}`. |
| `POST` | `/workers/jobs/lease` | `WorkerLeaseRequest {supported_job_types[], supported_gpu_skus[], max_jobs}` → `WorkerLeaseResponse {lease_id, lease_token, job, expires_at, message}`. |
| `POST` | `/workers/jobs/{job_id}/accept` | `LeaseTokenRequest {lease_token}` → `JobRead`. |
| `POST` | `/workers/jobs/{job_id}/status` | `WorkerStatusRequest`. |
| `POST` | `/workers/jobs/{job_id}/logs` | `WorkerLogRequest`. |
| `POST` | `/workers/jobs/{job_id}/artifacts` | `WorkerArtifactRequest`. |
| `POST` | `/workers/jobs/{job_id}/complete` | `WorkerCompleteRequest` → `JobRead` (computes actual cost). |
| `POST` | `/workers/jobs/{job_id}/fail` | `WorkerFailRequest` → `JobRead` (no charge in v0.2). |

`register` returns the long-lived `worker_token`; `lease` returns a `lease_token` (server stores
only its hash, 600s TTL). See [Worker Contract (v0.2)](/defendablerouter/edge-events/).

## Admin — `/admin`

| Method | Path | Notes |
| --- | --- | --- |
| `GET` | `/admin/summary` | Fleet/member/job summary. |
| `GET` | `/admin/workers` | List workers. |
| `GET` | `/admin/workers/{worker_id}` | One worker. |

***

🐝 *Operator-grade · books and records · to the shed.*
