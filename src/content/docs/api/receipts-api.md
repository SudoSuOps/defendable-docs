---
title: Receipts API
description: Read and verify DefendableCloud receipts — the per-org hash chain.
---

Receipts are the proof primitive of DefendableCloud (live at `api.defendablecloud.com`). You do
**not** POST a receipt directly — a receipt is *minted* at the tail of a Defendable Run
(Inputs → Evidence → Execution → Checks → Verdict → Approval → Receipt). Once approved, the run
mints a receipt onto the org's hash chain. There is no `/v1` prefix anywhere on this API.

## Mint, then read

- `POST /runs/{id}/receipt` — *mints* the receipt at the tail of an approved Run and returns the
  receipt envelope. This is the only `/runs/{id}/receipt` route — there is **no `GET` variant**.

## Read a receipt

- `GET /receipts/recent` — recent receipts for the authenticated org.
- `GET /share/{token}` — public, unauthenticated view of a shared receipt.
- `GET /share/{token}/pdf` — the same receipt rendered as a PDF (fpdf2).
- `GET /share/{token}/download` — the raw receipt artifact.

## Verify the chain

- `GET /ledger` — lists the org's receipt chain in sequence.
- `GET /ledger/verify` — recomputes every hash and validates chain integrity.

## Receipt shape

Each receipt carries:

- **`receipt_id`** — format `DCR-{org_seq:06d}-{hex8}` (e.g. `DCR-000042-9af3b1c0`).
- **`org_seq`** — sequential index within the org, starting at `0`.
- **`parent_hash`** — the `receipt_sha256` of the prior receipt. The genesis receipt's parent is
  64 zeros (`0000…0000`).
- **`receipt_sha256`** — SHA-256 over the canonical JSON of the receipt body (orjson, sorted keys).

The chain is persisted in Postgres. Artifact upload to Tigris (JSON + PDF) is **best-effort**
(wrapped in try/except), so a storage outage degrades gracefully and never blocks a receipt — the
books and records are the chain in the database, not the object store.

## What `/ledger/verify` actually checks

1. Recomputes `receipt_sha256` for each receipt and compares to the stored value.
2. Checks `org_seq` runs `0, 1, 2, …` with no gaps.
3. Checks each `parent_hash` links to the prior receipt's `receipt_sha256`.

Tamper with a stored payload and `/ledger/verify` flips `ok: false` and pinpoints the offending
receipt. That is the whole point.

***

🐝 *Operator-grade · books and records · to the shed.*
