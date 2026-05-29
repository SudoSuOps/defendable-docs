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
| Deployment | Cloudflare Pages for static site/app, container host for API. |
| API runtime | Production boot checks for CORS, HTTPS, JWT secret, email, and quotas. |
| WAF | Cloudflare managed rules, OWASP, bot posture, and route limits. |
| CI | API tests, CLI tests, app build, site build, OpenAPI contract tests. |
| Logs | Auth, API keys, org roles, dataset grants, receipts, storage, webhooks. |
| Backups | Postgres daily backups, monthly restore drill, object storage hash samples. |
| Incidents | SEV classification, containment checklist, incident receipt. |
| Secrets | Rotate by protocol, never document live values. |

