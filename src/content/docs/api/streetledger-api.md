---
title: StreetLedger API
description: StreetLedger vocabulary publishing is roadmap. The real ledger today is the DefendableCloud receipt chain.
---

:::note[Roadmap]
A public StreetLedger API — manifest with root hash, paginated vocabulary terms, deeds-by-class — is
**vision, not yet built**. There is no `/v1/ledger/*` endpoint. StreetLedger/DDEED vocabulary
publishing remains a roadmap rail.
:::

## The real ledger today

DefendableCloud (`api.defendablecloud.com`) exposes a working ledger right now: the per-org receipt
hash chain. No `/v1` prefix:

- `GET /ledger` — lists the org's receipt chain in sequence.
- `GET /ledger/verify` — recomputes every receipt's `receipt_sha256`, checks `org_seq` is sequential
  with no gaps, and checks each `parent_hash` links to the prior receipt. Returns `ok: false` and
  pinpoints the receipt if a stored payload was tampered.

This is the canonical, verifiable books-and-records surface today. When StreetLedger ships as a
public vocabulary/deeds API, it will publish on top of this proven chain — not instead of it.

***

🐝 *Operator-grade · books and records · to the shed.*
