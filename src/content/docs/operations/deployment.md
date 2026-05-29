---
title: Deployment
description: How DefendableCloud and DefendableRouter actually deploy — Fly.io API, Cloudflare Pages frontends, operator-local router.
---

Two real deployment targets. The cloud is live; the router is operator-local and CI-verified.

## DefendableCloud (live — `api.defendablecloud.com`)

The API deploys to **Fly.io** (app `defendable-cloud-api`, primary region `iad`). The runtime is FastAPI + Postgres (asyncpg) + Tigris S3 (boto3).

- `fly.toml` sets `force_https = true`, `internal_port = 8080`, and an HTTP health check on `GET /healthz` (30s interval). `min_machines_running = 1`.
- Deploy with `fly deploy` from `api/`.
- Secrets are set with `flyctl secrets set` — never committed: `DATABASE_URL`, `AWS_ACCESS_KEY_ID`, `AWS_SECRET_ACCESS_KEY`, `JWT_SECRET`, `RESEND_API_KEY`, `STRIPE_API_KEY`, `STRIPE_WEBHOOK_SECRET`, `STRIPE_PRICE_ID`, `INTERNAL_API_KEY`.
- Non-secret config lives in `[env]` in `fly.toml`: `APP_ENV=production`, `AWS_ENDPOINT_URL_S3=https://fly.storage.tigris.dev`, `AWS_REGION=auto`, `TIGRIS_BUCKET`, `APP_BASE_URL`, `API_BASE_URL`.

The **site, app (Vault), and docs** frontends deploy to **Cloudflare Pages** (Node 22). The marketing site (`site/`) is an Astro static build; the Vault app (`app/`) is a Vite React SPA; both emit `dist/`.

## DefendableRouter (operator-local — not publicly deployed)

DefendableRouter is a real FastAPI + SQLite + Typer CLI backend with a local JSONL receipt ledger. It is CI-green (pytest + boot-smoke) and runs operator-local today. It is **not** exposed as a public endpoint.

- Init and run locally: `defendable-router init-db`, `defendable-router seed-demo`, then `uvicorn defendable_router.main:app`.
- Config via `DEFENDABLE_ROUTER_*` env vars; storage is `sqlite:///./data/defendable_router.db` with receipts under `./data/receipts`.

:::note[Roadmap — not built]
Public deployment of the router (managed Postgres, object storage, Stripe billing) is roadmap, not built. So are `swarmrails` and per-customer edge appliances. The router spine is real and CI-verified; it just isn't a public service yet.
:::

***

🐝 *Operator-grade · books and records · to the shed.*
