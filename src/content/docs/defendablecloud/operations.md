---
title: DefendableCloud Operations
description: Deployment, environment variables, CI, backups, monitoring, incident response, and restore drills for DefendableCloud.
---

DefendableCloud is a three-part deploy:

```text
site/  → defendablecloud.com          → Cloudflare Pages
app/   → app.defendablecloud.com      → Cloudflare Pages
api/   → api.defendablecloud.com      → Fly.io or equivalent container host
```

## Marketing Site

```bash
cd defendable-cloud-v2/site
npm install
npm run dev
npm run build
```

Cloudflare Pages:

- root directory: `site/`
- build command: `npm run build`
- output directory: `site/dist`
- Node: `22.12.0` or newer

## Vault App

```bash
cd defendable-cloud-v2/app
npm install
npm run dev
npm run build
```

Cloudflare Pages:

- root directory: `app/`
- build command: `npm run build`
- output directory: `app/dist`
- SPA fallback through `app/public/_redirects`
- API base through `VITE_API_BASE`

## API

```bash
cd defendable-cloud-v2/api
python3 -m venv .venv
. .venv/bin/activate
pip install -r requirements.txt
cp .env.example .env
alembic upgrade head
uvicorn app.main:app --reload --port 8080
```

Production should run behind HTTPS with explicit CORS and non-default secrets. The API refuses unsafe production configuration.

## Required Environment

| Variable | Purpose |
|---|---|
| `DATABASE_URL` | Postgres connection (asyncpg). |
| `JWT_SECRET` | JWT signing secret; must be non-default in production. |
| `JWT_TTL_HOURS` | JWT lifetime (default `720` = 30 days). |
| `CORS_ORIGINS` | Explicit app/site origins. |
| `API_BASE_URL` | Public API base for share/receipt link generation (used to build `/share/{token}` URLs). |
| `APP_BASE_URL` | Vault SPA origin (magic-link landing, Stripe redirect allowlist). |
| `RESEND_API_KEY` | Magic-link and notification email. |
| `AWS_ACCESS_KEY_ID` / `AWS_SECRET_ACCESS_KEY` | Object storage credentials. |
| `AWS_ENDPOINT_URL_S3` | Tigris/S3-compatible endpoint (default `https://fly.storage.tigris.dev`). |
| `TIGRIS_BUCKET` | Object storage bucket (default `defendable-cloud`). |
| `INTERNAL_API_KEY` | Internal staging surfaces. |
| `RUNNER_TOKEN` | Cook runner claim/status surfaces. |
| `STRIPE_API_KEY` / `STRIPE_WEBHOOK_SECRET` / `STRIPE_PRICE_ID` | Stripe membership checkout + webhook verification. |
| `DATASET_DOWNLOAD_DAILY_LIMIT` | Application-level dataset anti-abuse limit (default `500`). |

## CI Gates

Minimum merge gate:

```bash
cd defendable-cloud-v2/api
pytest

cd ../cli
pytest

cd ../app
npm run build

cd ../site
npm run build
```

The cloud repo includes GitHub Actions for build/test checks. Keep OpenAPI contract tests in the required path before merging route or schema changes.

## Incident Response

First 15 minutes:

1. Declare incident owner.
2. Freeze deploys unless rollback is the fix.
3. Capture affected domains, orgs, routes, and time window.
4. Preserve logs.
5. Rotate credentials first if exposure is plausible.

Containment examples:

- revoke API keys
- rotate internal/stager/runner secrets
- disable affected Cloudflare route
- pause dataset stager
- block abusive route at WAF
- publish status update for SEV-1/SEV-2

Every material incident should generate an incident receipt.

## Backup and Restore Drill

Monthly:

1. Restore Postgres into isolated environment.
2. Point staging API at restored DB and staging bucket.
3. Run `/healthz`.
4. Run `/ledger/verify`.
5. Open a sample `/share/{token}`.
6. Verify one dataset-download receipt and one run receipt.
7. Record the drill as a Defendable Run.

