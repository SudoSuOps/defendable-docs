---
title: DefendableCloud API
description: Current API surface for auth, orgs, projects, runs, evidence, audits, receipts, datasets, models, cooks, incidents, membership, and admin.
---

Base URL:

```text
https://api.defendablecloud.com
```

Local development:

```bash
cd defendable-cloud-v2/api
python3 -m venv .venv
. .venv/bin/activate
pip install -r requirements.txt
cp .env.example .env
alembic upgrade head
uvicorn app.main:app --reload --port 8080
```

## Core Routes

| Method | Path | Purpose |
|---|---|---|
| `GET` | `/healthz` | Service, database, and storage health. |
| `POST` | `/auth/request` | Request magic-link sign-in. |
| `POST` | `/auth/verify` | Exchange one-time token for JWT. |
| `POST` | `/auth/accept-invite` | Accept owner-created organization invite. |
| `GET` | `/auth/me` | Current authenticated principal. |
| `GET` | `/org` | Current organization. |
| `GET/POST` | `/org/api-keys` | Owner-managed API keys. |
| `GET` | `/org/members` | Organization members. |
| `PUT` | `/org/members/{user_id}/role` | Owner updates member role. |
| `GET/POST` | `/org/invites` | Owner invite flow. |
| `GET` | `/org/usage` | Usage summary. |
| `GET/POST` | `/projects` | Project list/create. |
| `GET/POST` | `/runs` | Run list/create. |
| `GET` | `/runs/{run_id}` | Composite run detail. |
| `POST` | `/runs/{run_id}/evidence` | Attach evidence metadata/content. |
| `POST` | `/runs/{run_id}/evidence/upload` | Upload and hash file evidence. |
| `POST` | `/runs/{run_id}/submission` | Attach agent submission. |
| `POST` | `/runs/{run_id}/audit` | Run flight-sheet audit. |
| `PATCH` | `/runs/{run_id}/checks/{check_id}` | Grade checklist rule. |
| `POST` | `/runs/{run_id}/checks` | Run core check engine. |
| `POST` | `/runs/{run_id}/approve` | Approval decision. |
| `POST` | `/runs/{run_id}/receipt` | Mint run receipt. |
| `GET` | `/share/{token}` | Public redacted receipt JSON. |
| `GET` | `/share/{token}/pdf` | Public receipt PDF. |
| `GET` | `/ledger` | Public ledger view. |
| `GET` | `/ledger/verify` | Verify chain integrity. |

## Asset and Enterprise Routes

| Method | Path | Purpose |
|---|---|---|
| `GET` | `/datasets` | Members-only dataset list (entitlement-aware). |
| `GET` | `/datasets/catalog` | Public dataset catalog. |
| `GET` | `/datasets/catalog/{slug}` | Dataset package detail. |
| `POST` | `/datasets/catalog/{slug}/download` | Members-only dataset download grant and receipt. |
| `GET` | `/datasets/catalog/{slug}/samples` | Dataset samples. |
| `GET` | `/models/catalog` | Model catalog. |
| `GET` | `/models/catalog/{slug}` | Model card. |
| `POST` | `/models/catalog/{slug}/pin` | Pin a model choice into a receipt. |
| `POST` | `/runs/{run_id}/cook` | Create cook request. |
| `GET` | `/cooks` | List cook jobs. |
| `GET` | `/cooks/{cook_id}` | Cook detail. |
| `POST` | `/runner/cooks/next` | Runner claims next cook (internal-key gated). |
| `POST` | `/runner/cooks/{cook_id}/status` | Runner status update. |
| `POST` | `/runner/cooks/{cook_id}/complete` | Runner completion. |
| `POST` | `/runner/cooks/{cook_id}/fail` | Runner failure. |
| `GET/POST/PATCH` | `/incidents` | Incident records and updates. |
| `POST` | `/incidents/{incident_id}/receipt` | Incident receipt. |
| `GET/POST` | `/agent-profiles` | Agent profile registry. |
| `POST` | `/agent-profiles/{profile_id}/watchdog` | Agent health incident hook. |
| `GET` | `/stack-planner/options` | Compute/model planning choices. |
| `POST` | `/stack-assessment` | Compute/model fit report. |
| `GET` | `/membership` | Current membership state. |
| `POST` | `/membership/apply` | Submit a membership application. |
| `POST` | `/membership/approve` | Approve an application (internal-key gated). |
| `POST` | `/membership/checkout` | Create a Stripe Checkout session ($100/yr). |
| `GET` | `/policy/training-data` | Training-data policy. |
| `POST` | `/stripe/webhook` | Stripe webhook activation. |
| `GET/POST` | `/internal/*` | Internal staging surfaces gated by internal key. |
| `GET` | `/admin/applications` | Admin: list membership applications. |
| `POST` | `/admin/applications/{slug}/approve` | Admin: approve an application. |
| `GET` | `/admin/health` | Admin: gated health/diagnostics. |

## Authentication

User auth uses bearer JWTs from magic-link verification.

API keys are owner-created and hashed at rest. Use API keys for service automation where a full user session is not appropriate.

Internal runner/stager routes use internal credentials and should never be exposed as public unauthenticated surfaces.

## OpenAPI Contract

The API contract is protected by tests in the cloud repo. A route or schema break should fail CI before merge.

```bash
cd defendable-cloud-v2/api
pytest tests/test_openapi.py
```

