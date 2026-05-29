---
title: Data Retention
description: How long DefendableOS retains different artifact classes.
---

Default retention for the live DefendableCloud: receipts are retained as permanent books-and-records. Each receipt is hash-chained per-org in Postgres (DCR-{org_seq}-{hex8} · parent_hash links · sha256 over canonical JSON), so the chain is the record of permanent retention — verifiable end-to-end via `/ledger/verify`. Tigris artifact copies (JSON + PDF) are stored best-effort alongside the chain. Operators control what payload data they submit into a Run in the first place.

:::note[Roadmap · StreetChat capture retention]
Class-based retention windows for raw audio and transcripts — and a deletion window for personal-data fields — are part of the planned StreetChat capture lane. They are NOT yet live, configurable DefendableOS behavior. The receipts hash chain above is the only retention surface that is built and verified today.
:::

***

🐝 *Operator-grade · books and records · to the shed.*
