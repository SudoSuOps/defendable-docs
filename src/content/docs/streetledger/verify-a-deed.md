---
title: Verify a Deed
description: Step-by-step verification walkthrough. Three modes · hash · slug · pasted JSON. Zero round-trip · browser-side SHA-256.
---

:::note[Roadmap — vision layer]
The public verify rail at `ledger.mrdefendable.com/verify` is **design intent and not yet deployed**. The three modes below describe the planned UX. A real, shipped verification path exists today on **DefendableCloud** — see "Verify it yourself today" at the bottom of this page.
:::

## Mode 1 · by SHA-256 hash (planned)

1. Open the StreetLedger verify page
2. Paste any hash (with or without the `sha256:` prefix)
3. Hit search · either the canon owns it or it does not

## Mode 2 · by slug or DDEED id (planned)

1. Same verify page
2. Type a slug like `probability-of-close` or a DDEED id like `DDEED-VOCAB-CRE_TERMS-CAP-RATE-v1`
3. Match returns the full deed + canonical hash

## Mode 3 · by pasted canonical JSON (planned)

1. Same verify page · third panel
2. Paste any DDEED-VOCAB JSON
3. The browser computes SHA-256 client-side (`crypto.subtle.digest`)
4. Compare against the published canonical `json_sha256`

## Verify it yourself today (shipped)

DefendableCloud already supports zero-trust verification of its per-org `DCR-*` receipt chain:

- **Client-side recompute** — `GET /ledger`, then recompute `receipt_sha256` over the canonical JSON (orjson sorted-keys) of each receipt and confirm it matches the stamped value and parent-hash link.
- **Server recompute** — `GET /ledger/verify` walks the whole chain, recomputes every hash, checks sequential `org_seq`, and checks each `parent_hash` link. Tamper with a stored payload and `ok` flips to `false`, pinpointing the offending receipt.

**Zero round-trip · zero trust required. The math is the math.**

***

🐝 *Operator-grade · books and records · to the shed.*
