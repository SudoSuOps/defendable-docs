---
title: DefendableLedger · Verify a Record
description: Every record carries its own SHA-256. Verification is client-side WebCrypto. Zero round-trip. Zero trust required.
---

## What you can verify

- A **DefendableRouter receipt** (full `router_receipt.json`)
- A **Tribunal verdict** (full `verdict.json`)
- A **SwarmJelly training pair** (full `<pair_id>.json`)
- A **DefendableLedger record** (single JSONL line)
- The **entire ledger chain** (every record's `parent_hash` matches the prior `record_sha256`)

## Verify a single record (web)

1. Go to [defendableledger.com/verify](https://defendableledger.com/verify).
2. Paste the record's JSON into the input box.
3. Paste the claimed `record_sha256` (or `receipt_sha256` etc.) into the claimed-hash box.
4. Click **Compute SHA-256**.
5. The page computes both:
   - **Raw SHA-256** — over the bytes as-pasted.
   - **Canonical SHA-256** — over the JSON with keys sorted and no whitespace.
6. Result shows ✓ MATCH if either matches the claimed hash.

WebCrypto runs in your browser. **Nothing is sent to a server.** Verification is client-side and offline-capable after first page load.

## Verify a single record (CLI)

```bash
defendablerouter receipt hash --file path/to/router_receipt.json
# prints: <sha256>  path/to/router_receipt.json
```

Compare the printed hash against the claimed `receipt_sha256` or `record_sha256`.

## Verify a full run directory

```bash
defendablerouter receipt verify --run data/runs/DRR-20260524-XYZ
```

This walks the run directory and checks:

- `canonical_receipt_sha256` reproduces from the volatile-stripped receipt body
- `receipt_sha256` reproduces from the canonical-hash-injected body
- `manifest_sha256` reproduces from the file list
- `SHA256SUMS.txt` matches the manifest entries
- Every file in the manifest hashes to its stored digest

Output: PASS or FAIL with the exact mismatch surfaced.

## Verify the ledger chain

```bash
defendablerouter ledger verify
# walks defendable_ledger.jsonl
# checks every record's parent_hash points at the prior record_sha256
# checks every record_sha256 recomputes correctly
# reports first chain break (if any) with ledger_seq
```

Any tamper to any record downstream of `ledger_seq N` breaks the chain at `N`. The verifier surfaces the exact line.

## The canonicalization rule

There is one canonicalization rule across the spine. Use it for any custom verification:

1. Take the JSON object.
2. Strip volatile fields:
   - For receipts: `created_at`, `hashes`
   - For manifests: `manifest_id`, `created_at`, `manifest_sha256`
   - For ledger records: `record_sha256` itself
3. Sort keys alphabetically · all levels of nesting.
4. Serialize as JSON with no whitespace · UTF-8.
5. SHA-256 over the resulting bytes.

This rule lives in `defendablerouter/core/canonicalize.py`. The `/verify` page on defendableledger.com applies the same rule in WebCrypto.

## Verify the publication itself

Each entry on `/records` at defendableledger.com carries:

- The full record JSON
- Its `record_sha256` and `parent_hash`
- A link to the `payload_ref` artifact (also published)

Verify by:
1. Compute SHA-256 of the published record body → must equal stored `record_sha256`.
2. Compute SHA-256 of the payload artifact → must equal stored `payload_hash`.
3. Check `parent_hash` against the prior record on the public site.

Three checks. Three SHA-256s. Provenance proven.

***

🐝 *Verify anything · trust no one · books and records · to the shed.*
