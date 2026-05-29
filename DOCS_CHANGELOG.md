# DefendableDocs — internal changelog & alignment log

> Internal books-and-records for the docs themselves. This is NOT a published
> product page — it lives at the repo root, outside `src/content/docs`, so it
> does not sit alongside the product reference. Moved here 2026-05-29 from the
> former `/defendablecloud/audit/` route.

## 2026-05-29 — Alignment pass: docs ↔ live DefendableCloud

Aligned DefendableDocs with the current DefendableCloud implementation
(`defendable-cloud-v2/api`).

| Severity | Finding | Fix |
|---|---|---|
| High | Docs emphasized older ecosystem concepts before explaining the live cloud product. | Added a first-class DefendableCloud section near the top of the sidebar. |
| High | Getting Started described future public anchoring as if it were universally live. | Reoriented Start Here around current product surfaces and marked broader ecosystem language as context. |
| High | API docs were not aligned to the current FastAPI route set. | Added a current API surface page with route groups from `defendable-cloud-v2/api/app/routes`. |
| High | `/v1/*` namespace, `shr_`-prefixed share tokens, and a `payload_hash` field were documented but do not exist in the codebase. | Purged `/v1/*`; replaced share tokens with real url-safe `token_urlsafe(24)` samples; corrected the public view to `receipt_sha256` + server-recomputed `verified` boolean. |
| High | Asset/enterprise route prefixes were wrong (`/library`, `/models`, bare `/cooks/next`). | Corrected to real prefixes: `/datasets/catalog/*`, `/models/catalog/*`, `/runner/cooks/*`. Expanded `/membership/*` and `/admin/*` to real routes. |
| Medium | Enterprise controls existed in the cloud repo but were not visible in public docs. | Added Enterprise Security and Operations pages. |
| Medium | CLI docs were trapped in the cloud repo README. | Added CLI guide with end-to-end workflow. |
| Medium | Dataset and model receipt flows were missing from public docs. | Added Datasets and Models page. |

## Current truth

DefendableCloud is the production-facing proof vault, live at
`api.defendablecloud.com`:

```text
Inputs → Evidence → Execution → Checks → Verdict → Approval → Receipt
```

The broader DefendableOS language remains useful as context, but it must not
obscure the live system.

## Remaining work (roadmap)

- Add generated OpenAPI reference once the production schema is finalized.
- Add screenshots of the Vault app.
- Add public trust pages for terms, privacy, DPA, status, and security contact.
- Add enterprise SSO docs after OIDC/SAML is implemented.
- Add a Cloudflare WAF export/checklist artifact.
- Add backup/restore drill receipt examples.
