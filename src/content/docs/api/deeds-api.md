---
title: Deeds API
description: DDEED anchoring is a roadmap rail. Provenance today lives in the DefendableCloud receipt hash chain.
---

:::note[Roadmap]
A public Deeds API for DDEED anchoring is **vision, not yet built**. There is no `/v1/deeds/*`
endpoint — no fetch-by-id, no verify-by-hash, no class/category listing exposed as a public API.
DDEED anchoring (publishing vocabulary, verdicts, and provenance as on-chain deeds) remains a
vision rail on the roadmap.
:::

## Where provenance actually lives today

You do not need a deed to get verifiable provenance right now. The live DefendableCloud surface
(`api.defendablecloud.com`) already gives you a tamper-evident, per-org receipt hash chain — no
`/v1` prefix:

- `POST /runs/{id}/receipt` — mints the receipt for a specific Defendable Run (no `GET` variant).
- `GET /receipts/recent` — recent receipts for your org.
- `GET /share/{token}` — public, verifiable view of a minted receipt.
- `GET /ledger` — the org's receipt chain in sequence.
- `GET /ledger/verify` — recomputes every hash and validates `org_seq` order and `parent_hash`
  links; flips `ok: false` and pinpoints the receipt if anything was tampered.

That chain is the real books-and-records surface today. When DDEED anchoring ships, it will publish
*from* this chain — it does not replace it.

***

🐝 *Operator-grade · books and records · to the shed.*
