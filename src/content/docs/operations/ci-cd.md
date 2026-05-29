---
title: CI / CD
description: The two real GitHub Actions workflows — DefendableCloud (api/app/site) and DefendableRouter (pytest + boot-smoke).
---

Two repos, two GitHub Actions workflows. Both are real and green.

## DefendableCloud — `.github/workflows/ci.yml`

Three parallel jobs on push/PR (Python 3.13, Node `22.12.0`):

- **api** — `pip install -e ".[dev]"` then `pytest` (working directory `api/`).
- **app** — Vault SPA: `npm ci`, `npm audit --audit-level=low`, `npm run build` (working directory `app/`).
- **site** — marketing site: `npm ci`, `npm audit --audit-level=low`, `npm run build` (working directory `site/`).

## DefendableRouter — `.github/workflows/ci.yml`

Two jobs on push/PR (Python 3.12):

- **test** — `pytest -ra`.
- **smoke (boot-smoke)** — `init-db`, `seed-demo`, boot uvicorn, then assert behavior end-to-end: `/health` reports `db_status:"ok"`; the **server-side pricing** is correct (2h `rtx6000_blackwell_96gb` quotes `$10`, 3h `rog_astral_5090_32gb` quotes `$6`); and an inactive member hitting `/datasets/{id}/access` is gated with HTTP **403**.

## Deploy

- **Cloudflare Pages auto-deploys** the site, app, and docs frontends on push.
- The **API ships via `fly deploy`** to Fly.io (`defendable-cloud-api`, region `iad`).
- The **router is CI-verified and operator-local** — there is no auto-deploy; it is not a public service.

:::note[Roadmap — not built]
A Tribunal/V03 voice-validator pre-commit hook on documentation changes is a roadmap idea, not a wired CI step today.
:::

***

🐝 *Operator-grade · books and records · to the shed.*
