---
title: Monitoring
description: Real health surfaces — cloud /healthz (db, storage, email), router /health (db_status), Fly.io checks, and /ledger/verify for receipt integrity.
---

Monitoring built on the health surfaces that actually exist.

## Health endpoints

- **Cloud `GET /healthz`** reports `db`, `storage`, and `email` status — all three verified `true` live at `api.defendablecloud.com`.
- **Router `GET /health`** reports `db_status` — the router's boot-smoke CI job asserts it returns `ok`.

## Platform checks

Fly.io runs a built-in HTTP health check against the cloud's `/healthz` on a **30s interval** (from `fly.toml`), with auto-start and `min_machines_running = 1`.

## Receipt / ledger integrity

Integrity monitoring is framed around **`GET /ledger/verify`**, which recomputes the per-org receipt hash chain (sequential `org_seq`, parent links, `receipt_sha256`) and flips `ok:false` on any tamper. Run it on a schedule to catch drift.

These are operator-grade health and integrity surfaces — not a full metrics/APM platform.

:::note[Roadmap — not built]
Per-rail metrics such as deeds/min, Tribunal verdict latency, validator-chain pass rate, and repair-lift trend are roadmap, not built. There is no live metrics pipeline emitting them today.
:::

***

🐝 *Operator-grade · books and records · to the shed.*
