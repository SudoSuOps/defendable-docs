---
title: Storage (v0.1)
description: DefendableRouter v0.1 persistence — local SQLite plus the local JSONL receipt ledger. Postgres, Alembic, and object storage are roadmap, not built.
---

:::note[Status — storage (v0.1, CI-verified)]
The persistence below is **real and verified in source** (`core/config.py`, `core/receipts.py`),
CI green, and entirely **local**. The router has **no object-storage flow** — that was never built.
(Do not confuse this with DefendableCloud's real Tigris S3 flow, which is a separate, live system.)
:::

DefendableRouter v0.1 persists to two places, both on local disk.

## 1. SQLite (relational state)

Members, datasets, compute nodes, jobs, leases, workers, and status events live in a local SQLite
database:

```
sqlite:///./data/defendable_router.db
```

This is the default `database_url` in `core/config.py` (override via the
`DEFENDABLE_ROUTER_DATABASE_URL` env var). SQLAlchemy ORM models back the API.

## 2. JSONL receipt ledger (books and records)

Every billable/lifecycle event appends a checksummed receipt line to a daily file:

```
./data/receipts/YYYY-MM-DD.receipts.jsonl
```

See [Receipt Capture](/defendablerouter/receipt-capture/) for the receipt fields, the canonical
checksum algorithm, and the honest note that these receipts are **checksummed, not hash-chained**.

:::note[Roadmap — not built]
**Postgres**, **Alembic** migrations, and **object storage** are roadmap for the router and are
**not built** in v0.1. v0.1 is SQLite + local JSONL, full stop.
:::

***

🐝 *Operator-grade · books and records · to the shed.*
