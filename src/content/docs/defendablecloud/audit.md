---
title: Docs Audit and Alignment
description: What changed in DefendableDocs to align public documentation with the live DefendableCloud implementation.
---

This audit aligns DefendableDocs with the current DefendableCloud implementation.

## Findings

| Severity | Finding | Fix |
|---|---|---|
| High | The docs emphasized older ecosystem concepts before explaining the live cloud product. | Added a first-class DefendableCloud section near the top of the sidebar. |
| High | Getting Started described future public anchoring as if it were universally live. | Reoriented Start Here around current product surfaces and marked broader ecosystem language as context. |
| High | API docs were not aligned to the current FastAPI route set. | Added a current API surface page with route groups from `defendable-cloud-v2/api/app/routes`. |
| Medium | Enterprise controls existed in the cloud repo but were not visible in public docs. | Added Enterprise Security and Operations pages. |
| Medium | CLI docs were trapped in the cloud repo README. | Added CLI guide with end-to-end workflow. |
| Medium | Dataset and model receipt flows were missing from public docs. | Added Datasets and Models page. |

## Current Truth

DefendableCloud is the production-facing proof vault:

```text
Inputs → Evidence → Execution → Checks → Verdict → Approval → Receipt
```

The broader DefendableOS language remains useful, but it must not obscure the live system.

## Remaining Work

- Add generated OpenAPI reference once production schema is finalized.
- Add screenshots of the Vault app.
- Add public trust pages for terms, privacy, DPA, status, and security contact.
- Add enterprise SSO docs after OIDC/SAML is implemented.
- Add a Cloudflare WAF export/checklist artifact.
- Add backup/restore drill receipt examples.

