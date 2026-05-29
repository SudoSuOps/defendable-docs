---
title: Authentication
description: Current DefendableCloud authentication, organization roles, invites, API keys, and internal credentials.
---

DefendableCloud authentication is email-first for users and token-first for services.

## User Auth

Current user auth uses magic links:

| Route | Purpose |
|---|---|
| `POST /auth/request` | Request sign-in link for an email address. |
| `POST /auth/verify` | Exchange the one-time token for a JWT. |
| `GET /auth/me` | Read the current principal. |
| `POST /auth/accept-invite` | Join an organization from an owner-created invite. |

Magic-link tokens are hashed at rest and one-time use.

With `RESEND_API_KEY` unset in local development, the API can return a `dev_link` so developers can verify auth without sending email.

## Organization Model

Every user belongs to an organization. Current roles:

| Role | Capabilities |
|---|---|
| `owner` | Manage API keys, invites, member roles, organization administration. |
| `member` | Use member-scoped product surfaces such as runs, datasets, receipts, and catalog access where allowed. |

Owner-only routes include API key management, invites, and role updates.

## API Keys

API keys are for automation. They are created by organization owners and hashed at rest.

Routes:

| Route | Purpose |
|---|---|
| `GET /org/api-keys` | List keys. |
| `POST /org/api-keys` | Create key and return the plaintext key once. |
| `DELETE /org/api-keys/{key_id}` | Revoke key. |

Use API keys for service automation. Use user JWTs for interactive workflows.

## Internal Credentials

Internal surfaces are not user-facing product APIs.

| Credential | Purpose |
|---|---|
| `INTERNAL_API_KEY` | Dataset stager and internal staging routes. |
| `RUNNER_TOKEN` | Cook runner claim/status/complete/fail routes. |
| `STRIPE_WEBHOOK_SECRET` | Stripe webhook signature verification. |

These secrets should be rotated through the [Enterprise Security](/defendablecloud/enterprise-security/) protocol and never committed to repos, screenshots, issue trackers, or docs.

## Enterprise SSO Roadmap

OIDC/SAML/SCIM are roadmap, not enabled in v1.

Until SSO exists, enterprise onboarding uses:

- owner-created invites
- magic-link auth
- owner/member RBAC
- API keys for automation
- audit receipts for sensitive actions where implemented

