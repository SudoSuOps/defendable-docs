---
title: Privacy
description: How the live DefendableCloud handles access control and the data operators submit.
---

Privacy posture of the live DefendableCloud (api.defendablecloud.com):

- **Access control.** Authentication is JWT magic-link. Programmatic access uses per-org `dc_` API keys, scoped to the organization. There is no anonymous data access.
- **What gets stored.** Operators control the payload data they submit into a Run. The platform stores Run inputs, evidence, checks, verdicts, and the resulting receipt. Receipts are hash-chained per-org in Postgres (parent_hash links · sha256 over canonical JSON); Tigris artifact copies (JSON + PDF) are stored best-effort alongside the chain.
- **Operator responsibility.** Because you control what enters a Run, the simplest privacy control is to avoid submitting personal data you do not need to prove the run.

:::note[Roadmap · StreetChat / DDEED / ENS]
The following are vision, not deployed behavior: automated PII scanning and redaction (e.g. a redaction-status check), ENS-keyed access controls, and a GDPR deletion path where deletes are themselves anchored as deeds. These belong to the StreetChat, DDEED, and ENS-identity lanes. Do not rely on them as live controls today.
:::

***

🐝 *Operator-grade · books and records · to the shed.*
