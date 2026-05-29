---
title: Identity & Auth
description: DefendableRouter v0.1/v0.2 identity and auth — member gating, worker bearer tokens, and hashed lease-token ownership. Local backend, not publicly deployed.
---

:::note[Status — identity & auth (v0.1/v0.2, CI-verified)]
The auth primitives below are **real and verified in source** (`core/security.py`,
`services/workers.py`, `services/leases.py`), CI green. The backend is **local and not publicly
deployed**. There is **no ENS, App ID, or Agent ID** identity in the router — those were never
built and are not on the roadmap.
:::

The router has three real identity/auth primitives.

## Member identity & gating

A member is identified by `member_id`. Dataset and compute actions are gated by
`require_active_member` (`core/security.py`), which fetches the member and checks
`is_member_active` (exists, fee paid, membership window current). A missing or inactive member →
`403 Active membership required`.

:::caution[Member/admin endpoints are UNAUTHENTICATED in v0.1]
`require_active_member` enforces **membership**, not request **authentication** — the caller still
supplies the `member_id`. The member, admin, dataset, compute, and job routes have **no bearer/API
key** in v0.1 and **must not be exposed publicly**. Run the router behind a trusted boundary until
a public auth surface ships.
:::

## Worker bearer-token auth

Workers authenticate with a bearer token. `register` returns a long-lived `worker_token`; every
other `/workers/*` call presents it via `HTTPBearer` (`require_worker`). Missing/invalid token →
`401`; a `banned` worker → `403`. This `/workers/*` group is the **only authenticated surface** in
the router.

## Hashed lease-token ownership

When a worker leases a job, the router mints a `lease_token` and stores **only its hash**
(`lease_token_hash`). Subsequent accept/status/logs/artifacts/complete/fail calls re-present the
raw token, which the router checks against the stored hash using **`hmac.compare_digest`**
(constant-time) in `services/leases.py` (`verify_active_lease`), along with an expiry check
(600-second TTL). A wrong or expired token → the call is rejected.

See the [Worker Contract (v0.2)](/defendablerouter/edge-events/) for the full authenticated flow.

***

🐝 *Operator-grade · books and records · to the shed.*
