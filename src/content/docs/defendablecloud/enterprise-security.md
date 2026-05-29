---
title: Enterprise Security
description: Enterprise-grade launch controls for DefendableCloud, including auth, RBAC, WAF, receipts, datasets, logs, backups, secrets, SSO roadmap, and SOC2-style controls.
---

DefendableCloud is an enterprise-grade launch foundation, not yet a completed best-in-class hyperscale cloud provider. The distinction matters.

## Controls In Place

| Area | Control |
|---|---|
| Runtime boot | Production boot validates non-default JWT secrets, explicit CORS, HTTPS URLs, email delivery, and dataset quota settings. |
| Auth | Magic-link tokens are one-time use and hashed at rest. |
| API keys | Owner-created API keys are hashed at rest. |
| RBAC | Organization roles support `owner` and `member`; owner-only paths gate invites, API keys, and role updates. |
| Receipts | Receipts are hash-chained per organization and public projections are redacted. |
| Dataset downloads | Members-only grants, short-lived URLs, quota controls, and download receipts. |
| Security headers | API sets content-type, referrer, permissions policy, and HSTS in production. |
| CI | API and CLI have tests for core logic and OpenAPI contract stability. |
| Public docs | Security, privacy/DPA/terms placeholders, incident runbooks, and operational protocols exist. |

## Cloudflare Edge Baseline

Use Cloudflare in front of marketing, app, and API surfaces.

Minimum rules:

- Cloudflare Managed Ruleset
- OWASP Core Ruleset at paranoia level 1 to start
- bot challenge below account baseline
- no caching for authenticated API responses
- strict rate limits for auth, invites, dataset grants, public downloads, and webhooks

Recommended launch limits:

| Route | Edge Limit |
|---|---|
| `POST /auth/request` | 5 requests per email/IP per 10 minutes |
| `POST /auth/verify` | 20 requests per IP per 10 minutes |
| `POST /auth/accept-invite` | 20 requests per IP per 10 minutes |
| `POST /datasets/catalog/*/download` | 60 requests per org/IP per hour, plus API daily quota |
| `GET /share/*/download` | 120 requests per token/IP per hour |
| `/internal/*` | allow only private/operator egress IPs, plus API internal key |

## Dataset Anti-Abuse

Dataset downloads should be protected by both edge and application controls.

- Require authenticated member.
- Enforce `DATASET_DOWNLOAD_DAILY_LIMIT`.
- Mint a dataset-download receipt for grants.
- Use short-lived signed object URLs.
- Redact storage keys from public receipt views.
- Alert on quota spikes.

## Logging and Alerts

Capture:

- auth request and verify events
- invite acceptance
- API key create/revoke
- role changes
- dataset catalog and download events
- receipt generation
- public share access errors
- webhook signature failures
- storage failures
- internal stager calls

Alert immediately on:

- receipt hash mismatch
- elevated 401/403 spikes
- webhook signature failures
- public receipt projection errors
- dataset download quota spikes
- object storage errors on signed grants

## Backups and Restore

Postgres:

- daily encrypted backups
- point-in-time recovery where available
- monthly restore test into isolated environment
- verify user/org counts, receipt counts, and ledger chain

Object storage:

- versioning where supported
- lifecycle stale temporary objects
- monthly sample hash verification

Restore drills should themselves be recorded as Defendable Runs.

## Secrets Rotation

Rotate immediately after suspected leak, offboarding, failed secret scan, public exposure, or provider incident.

Order:

1. Add new secret in provider.
2. Deploy and readiness check.
3. Revoke old secret.
4. Verify logs for failed old-secret attempts.
5. Record rotation receipt.

Critical secrets:

- `JWT_SECRET`
- `INTERNAL_API_KEY`
- `RUNNER_TOKEN`
- `STRIPE_WEBHOOK_SECRET`
- object storage keys
- `RESEND_API_KEY`

## SSO / SAML / OIDC

Enterprise SSO is roadmap, not enabled in v1.

Recommended sequence:

1. OIDC for Google Workspace, Microsoft Entra ID, and Okta.
2. SAML 2.0 for customers that require it.
3. SCIM for provisioning/deprovisioning.

Required controls:

- verified domains
- break-glass owner account
- JIT group mapping to owner/member
- session revocation on IdP membership change
- receipts for IdP configuration changes

## SOC2-Style Control Map

This is not a SOC2 report. It is the control map DefendableCloud operates toward.

| Trust Principle | Current Foundation |
|---|---|
| Security | Auth, RBAC, API keys, WAF baseline, production boot checks. |
| Availability | Health endpoint, static Cloudflare deploys, backup/restore protocol, incident runbook. |
| Confidentiality | Public receipt redaction, private storage boundaries, internal-key surfaces. |
| Processing Integrity | Hash-chained receipts, ledger verification, deterministic checks, CI gates. |
| Privacy | Data minimization in public views, privacy/DPA placeholders, security contact path. |

## External Review

Before the first regulated enterprise customer, package:

- architecture diagram
- redacted env var inventory
- OpenAPI schema
- migration history
- recent CI run
- security headers
- WAF/rate-limit export
- backup/restore drill receipt

