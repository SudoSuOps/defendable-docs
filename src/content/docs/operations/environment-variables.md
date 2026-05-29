---
title: Environment Variables
description: The real env-var reference for the DefendableCloud API and the DefendableRouter backend.
---

Two components, two honest tables. Values come from `api/.env.example` + `api/app/config.py` (cloud) and `.env.example` + `core/config.py` (router). Never document live secret values.

## DefendableCloud API

| Variable | Notes |
|---|---|
| `APP_ENV` | `development` / `production`. Drives the production fail-fast (below). |
| `APP_NAME` | App name shown on the API. Default `DefendableCloud API`. |
| `PORT` | Default `8080`. |
| `APP_BASE_URL` | Public Vault app URL; magic links point here. |
| `API_BASE_URL` | Public API URL; used to build share links. |
| `DATABASE_URL` | Postgres via asyncpg: `postgresql+asyncpg://...`. |
| `AWS_ENDPOINT_URL_S3` | S3 endpoint. Default `https://fly.storage.tigris.dev`. |
| `AWS_ACCESS_KEY_ID` | Object-storage key. |
| `AWS_SECRET_ACCESS_KEY` | Object-storage secret. |
| `AWS_REGION` | Default `auto` (Tigris). |
| `TIGRIS_BUCKET` | Bucket name. Default `defendable-cloud` (prod `fly.toml` sets `defendable-cloud-v2`). |
| `JWT_SECRET` | Magic-link/session signing secret. |
| `JWT_TTL_HOURS` | Session TTL. Default `720` (30 days). |
| `MAGIC_TTL_MINUTES` | Magic-link TTL. Default `30`. |
| `RESEND_API_KEY` | Resend email delivery for magic links. |
| `EMAIL_FROM` | Sender. Default `DefendableCloud <build@defendableos.com>`. |
| `CORS_ORIGINS` | Comma-separated. Blank = `*` (development only). |
| `CHECKOUT_RETURN_ORIGINS` | Stripe checkout redirect allowlist; `APP_BASE_URL` is always included. |
| `STRIPE_API_KEY` | Stripe secret key (test/live). |
| `STRIPE_WEBHOOK_SECRET` | Verifies `/stripe/webhook` signatures. |
| `STRIPE_PRICE_ID` | Membership annual price. All three unset = checkout 503 (fail-closed). |
| `INTERNAL_API_KEY` | Shared key for `/internal/*` (`X-Internal-Key`). Unset = `/internal/*` refuses all calls (fail-closed). |
| `ADMIN_EMAILS` | Comma-separated lowercase emails allowed at `/admin/*`. |
| `MEMBERSHIP_CAP` | Members-only cap. Default `100`. |
| `DATASET_DOWNLOAD_DAILY_LIMIT` | Grants per email/principal per rolling 24h. Default `500`. |
| `RUNNER_TOKEN` | Shared bearer for the cook-runner (GPU rig) API. |
| `RIG_USD_PER_HOUR` | Amortized $/hr shown on receipts. Default `0.80`. |

:::caution[Production fail-fast]
`Settings.validate_runtime()` refuses to boot in production unless: `JWT_SECRET` is a strong, non-default value `>= 32` chars; `RESEND_API_KEY` is set (so magic links are never returned inline); `CORS_ORIGINS` is explicit (no `*`); and both `APP_BASE_URL` and `API_BASE_URL` are `https://`.
:::

## DefendableRouter (operator-local)

| Variable | Notes |
|---|---|
| `DEFENDABLE_ROUTER_ENV` | Default `local`. |
| `DEFENDABLE_ROUTER_DATABASE_URL` | SQLite. Default `sqlite:///./data/defendable_router.db`. |
| `DEFENDABLE_ROUTER_RECEIPTS_DIR` | Local JSONL receipt directory. Default `./data/receipts`. |

***

🐝 *Operator-grade · books and records · to the shed.*
