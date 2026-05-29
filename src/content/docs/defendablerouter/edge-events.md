---
title: Worker Contract (v0.2)
description: DefendableRouter v0.2 worker contract — the real, bearer-token-authenticated integration surface for compute workers. Local backend, not publicly deployed.
---

:::note[Status — worker contract (v0.2, CI-verified)]
The worker contract below is **real and verified in source** (`api/workers.py`,
`services/workers.py`, `services/leases.py`), CI green. It is the **only authenticated surface**
in the router (`/workers/*`, bearer token). The backend is **local and not publicly deployed** —
there is no SDK, sidecar, webhook, or edge-event intake.
:::

A **worker** is a process running on a GPU node that registers with the router, heartbeats, leases
queued jobs, runs them, and reports results. This is the real external integration surface.

## Auth

Every `/workers/*` call (except `register`) carries the `worker_token` as a bearer token. The
router authenticates via `HTTPBearer` in `core/security.py` (`require_worker`): a missing/invalid
token → `401`; a `banned` worker → `403`.

## Lifecycle

1. **Register** — `POST /workers/register` with `WorkerRegisterRequest {node_id, name, hostname,
   endpoint_url?, capabilities, tags, version, heartbeat_interval_seconds}`. Returns
   `WorkerRegisterResponse {worker_id, worker_token, status}`; mints a `worker_registered` receipt.
   The `worker_token` is the long-lived bearer credential.

2. **Heartbeat** — `POST /workers/heartbeat` with `{status, capabilities?, current_jobs, metrics}`.
   Returns `{ok, worker_id, server_time, next_heartbeat_seconds}`.

3. **Lease** — `POST /workers/jobs/lease` with `{supported_job_types[], supported_gpu_skus[],
   max_jobs}`. The router matches capabilities to the oldest queued job and returns
   `WorkerLeaseResponse {lease_id, lease_token, job, expires_at, message}`. The `lease_token` has a
   **600-second TTL**; the server stores **only its hash**.

4. **Accept** — `POST /workers/jobs/{id}/accept` with `{lease_token}` → job moves to `running`.

5. **Status** — `POST /workers/jobs/{id}/status` with `{lease_token, event_type, message?, payload}`.

6. **Logs** — `POST /workers/jobs/{id}/logs` with `{lease_token, message, payload}`.

7. **Artifacts** — `POST /workers/jobs/{id}/artifacts` with `{lease_token, artifact_type, name, uri,
   checksum_sha256?, size_bytes?, metadata}`; mints an `artifact_reported` receipt.

8. **Complete** — `POST /workers/jobs/{id}/complete` with `{lease_token, output_uri?, metrics,
   final_message?}`. Computes `actual_hours` and `actual_cost_usd` via server-side pricing; mints
   the completion receipts and sets the job's `receipt_id`.

9. **Fail** — `POST /workers/jobs/{id}/fail` with `{lease_token, error_code?, message, payload}`.
   No charge in v0.2.

Every lease-bearing call verifies the lease with `hmac.compare_digest` against the stored hash and
checks it has not expired. See [Routing Model](/defendablerouter/routing-model/) for the lease
state machine and [Receipt Capture](/defendablerouter/receipt-capture/) for the receipts minted.

***

🐝 *Operator-grade · books and records · to the shed.*
