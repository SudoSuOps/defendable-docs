---
title: Verify a Deed
description: Step-by-step verification walkthrough. Three modes · hash · slug · pasted JSON. Zero round-trip · browser-side SHA-256.
---

## Mode 1 · by SHA-256 hash

1. Open [ledger.mrdefendable.com/verify](https://ledger.mrdefendable.com/verify)
2. Paste any hash (with or without the `sha256:` prefix)
3. Hit search · either the canon owns it or it does not

## Mode 2 · by slug or DDEED id

1. Same verify page
2. Type a slug like `probability-of-close` or a DDEED id like `DDEED-VOCAB-CRE_TERMS-CAP-RATE-v1`
3. Match returns the full deed + canonical hash

## Mode 3 · by pasted canonical JSON

1. Same verify page · third panel
2. Paste any DDEED-VOCAB JSON
3. The browser computes SHA-256 client-side (`crypto.subtle.digest`)
4. Compare against `term.hashes.json_sha256` from the published canon

**Zero round-trip · zero trust required. The math is the math.**

***

🐝 *Operator-grade · books and records · to the shed.*


> This is a foundational page in the DefendableDocs ecosystem map. The structure is committed · the deep content extends as the platform matures. Cross-references are live below.
