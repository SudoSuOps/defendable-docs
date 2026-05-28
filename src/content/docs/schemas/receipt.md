---
title: Receipt Schema
description: defendablecloud.<lane>-receipt/v1 — per-org hash-chained receipts minted by DefendableCloud. JSON payload + PDF + public share URL. Eval · Cook · Incident · Dataset · Compute.
---

## Schema family

Every receipt minted by DefendableCloud rides the **per-org hash chain** and shares a common envelope. The receipt schema is named by lane:

| Schema id | Lane |
|---|---|
| `defendablecloud.eval-receipt/v1` | Agent Work eval (the most common Run). |
| `defendablecloud.dataset-receipt/v1` | Dataset quality. |
| `defendablecloud.compute-receipt/v1` | Compute benchmark / efficiency / thermal. |
| `defendablecloud.cook-receipt/v1` | Fine-tune lift (before → after). |
| `defendablecloud.incident-receipt/v1` | Agent Ops governance event. |

## Common envelope

```json
{
  "schema": "defendablecloud.<lane>-receipt/v1",
  "org_seq": 4,
  "receipt_id": "DCR-000004",
  "issued_at_utc": "2026-05-27T20:14:33Z",
  "issued_by": { "user_id": "...", "display": "Donovan Mackey" },
  "org": { "id": "...", "slug": "..." },

  "parent_hash": "<sha256 of the prior receipt in this org's chain · 64 zeros for genesis>",
  "payload_hash": "<sha256 of the canonical payload>",
  "receipt_sha256": "<sha256 of this receipt with receipt_sha256 nulled>",

  "payload": { /* lane-specific payload — see below */ },

  "share_token": "<opaque · maps to /r/<token> public URL>",
  "pdf_available": true
}
```

## Per-lane payload shapes

### Eval receipt payload

```json
{
  "run_id": "...",
  "flight_sheet": { "slug": "cre_memo_dscr_ltv_v1", "version": "1.0" },
  "agent_profile": { "harness": "...", "model": "...", "runtime": "..." },
  "assignment_text_hash": "...",
  "evidence_hashes": ["...", "..."],
  "submission_hash": "...",
  "verdict": { /* defendablecloud.verdict/v1 — see /schemas/tribunal-verdict/ */ },
  "approver": { "user_id": "...", "approved_at_utc": "..." }
}
```

### Cook receipt payload

```json
{
  "run_id": "...",
  "base_model": { "name": "swarmatlas-9b", "version": "..." },
  "dataset": { "slug": "...", "version": "..." },
  "pre_cook_verdict": { /* full verdict shape */ },
  "post_cook_verdict": { /* full verdict shape */ },
  "lift": { "score_delta": 12.4, "severity_change": "jelly → honey" },
  "approver": { "..." }
}
```

### Incident receipt payload

```json
{
  "trigger": "recurring_flag | dark | rogue | spend_breach",
  "agent_profile_id": "...",
  "lane": "...",
  "response": ["lane_locked", "human_approval_required", "repair_task_recommended"],
  "policy_clause_cited": "<policy_id>",
  "opened_at_utc": "...",
  "resolved_at_utc": null,
  "approver": { "..." }
}
```

## Hash chain rules

1. The very first receipt for an org has `parent_hash` = 64 zeros (genesis).
2. Every subsequent receipt has `parent_hash` = the prior receipt's `receipt_sha256`.
3. `payload_hash` = SHA-256 over the canonical (sorted-keys, no whitespace, UTF-8) payload.
4. `receipt_sha256` = SHA-256 over the canonical receipt JSON with `receipt_sha256` nulled.
5. Verification is **client-side** WebCrypto. `GET /ledger/verify` runs the org-wide chain integrity check.

## What's NOT in a receipt

- No external chain transaction id. No Hedera HCS topic. No blockchain anchor.
- No model "quality grade" — the verdict carries `score_100` and `severity`, both rule-driven.
- No PDF in the JSON — the PDF is rendered on demand from the payload via `fpdf2`.

See [DefendableLedger · Hash-Chain Format](/defendableledger/hash-chain/) for the chain rules and the canonicalization algorithm. See [DefendableCloud · Generate a Receipt](/defendablecloud/generate-a-receipt/) for the operator walkthrough.

***

🐝 *Per-org hash chain · in-house · client-side verifiable · to the shed.*
