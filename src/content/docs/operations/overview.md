---
title: Operations · Overview
description: Deploying, monitoring, backing up, and operating DefendableCloud and DefendableOS components.
---

Operations runbook for DefendableCloud and the broader DefendableOS stack.

For the current production-facing cloud product, use:

- [DefendableCloud Operations](/defendablecloud/operations/)
- [Enterprise Security](/defendablecloud/enterprise-security/)
- [API Surface](/defendablecloud/api/)
- [CLI Guide](/defendablecloud/cli/)

## Cloud Operating Baseline

| Area | Required Practice |
|---|---|
| Deployment | Fly.io for the DefendableCloud API (app `defendable-cloud-api`, region `iad`); Cloudflare Pages for site/app/docs; DefendableRouter runs local (SQLite) and is CI-verified, not publicly deployed. |
| API runtime | Production boot checks for CORS, HTTPS, JWT secret, email, and quotas. |
| WAF | Cloudflare managed rules, OWASP, bot posture, and route limits. |
| CI | cloud — pytest (api) + npm build & npm audit (app, site); router — pytest + boot-smoke (init-db, seed, /health, $10/$6 quote assertions, 403 access gate). |
| Logs | Auth, API keys, org roles, dataset grants, receipts, storage, webhooks. |
| Backups | Postgres daily backups, monthly restore drill, object storage hash samples. |
| Incidents | SEV classification, containment checklist, incident receipt. |
| Secrets | Rotate by protocol, never document live values. |

