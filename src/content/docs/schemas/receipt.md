---
title: Receipt Schema
description: defendablecloud.<lane>-receipt/v1 — per-org hash-chained receipts minted by DefendableCloud. Flat JSON payload + PDF + public share URL. Plus the DefendableRouter local JSONL receipt.
---

## Schema family

Every receipt minted by DefendableCloud rides the **per-org hash chain** and
shares a common flat envelope. The schema id names the lane. There are six
real ids — one per `build_*_payload` in `app/receipts.py`:

| Schema id | Lane | Builder |
|---|---|---|
| `defendablecloud.receipt/v1` | Generic Run (heuristic checks engine). | `build_payload` |
| `defendablecloud.eval-receipt/v1` | Flight-sheet eval (deterministic executor). | `build_eval_payload` |
| `defendablecloud.cook-receipt/v1` | Fine-tune lift (before → after). | `build_cook_payload` |
| `defendablecloud.incident-receipt/v1` | Agent Ops governance event. | `build_incident_payload` |
| `defendablecloud.dataset-download-receipt/v1` | Dataset access grant. | `build_dataset_download_payload` |
| `defendablecloud.model-pin-receipt/v1` | Model card pin (declared model identity). | `build_model_pin_payload` |

## Common envelope

The payload is **flat** — there is no nested `payload` wrapper. Every builder
opens with the same chain coordinates, then adds its lane block(s), then
`share_url`:

```json
{
  "schema": "defendablecloud.<lane>-receipt/v1",
  "receipt_id": "DCR-000004-9a3f1c0e",
  "org_seq": 4,
  "parent_hash": "0000…  (64 hex; prior receipt's receipt_sha256, or 64 zeros at genesis)",
  "created_at": "2026-05-29T20:14:33Z",
  "organization": { "id": "org_…", "name": "Swarm & Bee" },

  "...lane block(s)...": {},

  "share_url": "https://api.defendablecloud.com/share/<token>"
}
```

:::note[receipt_sha256 is not in the hashed payload]
The hashed body is exactly the payload above — **without** any `receipt_sha256`
field. After hashing, the route appends `receipt_sha256` to the JSON that gets
stored to Tigris (`{**payload, "receipt_sha256": …}`). It is persisted in
Postgres on the `Receipt` row. It is never part of the bytes that were hashed.
:::

`receipt_id` format is `DCR-{org_seq:06d}-{hex8}` — the six-digit zero-padded
org sequence plus an 8-char hex suffix (e.g. `DCR-000004-9a3f1c0e`).

## Per-lane payload shapes

These are the actual `build_*_payload` returns.

### Eval receipt (`build_eval_payload`)

```json
{
  "schema": "defendablecloud.eval-receipt/v1",
  "receipt_id": "DCR-000004-9a3f1c0e",
  "org_seq": 4,
  "parent_hash": "…",
  "created_at": "2026-05-29T20:14:33Z",
  "organization": { "id": "org_…", "name": "Swarm & Bee" },
  "flight_sheet": { "name": "cre_memo_dscr_ltv", "version": "1.0" },
  "assignment": { "title": "DSCR/LTV memo", "sha256": "…" },
  "submission": {
    "agent_name": "STNL-DG",
    "model_name": "swarmatlas-9b",
    "provider": "in-house",
    "sha256": "…"
  },
  "evidence": [ { "kind": "file", "label": "rent_roll.csv", "sha256": "…" } ],
  "findings": [
    { "label": "DSCR re-derivation", "category": "math", "status": "flag",
      "severity": "high", "detail": "DSCR recomputed 1.022 — gate 1.20 — MISMATCH" }
  ],
  "verdict": {
    "outcome": "fail",
    "score_100": 78,
    "severity": "propolis",
    "client_ready": "No — high-risk flag",
    "recommended_action": "HIGH-RISK — resolve before release: DSCR re-derivation.",
    "summary": "7/8 rules passed · 1 high-risk, 0 mid, 0 low flag(s) · 78/100 weighted."
  },
  "ownership": {
    "agent_created": "STNL-DG",
    "audited_by": "DefendableCloud Eval",
    "referee_logic": "cre_memo_dscr_ltv v1.0",
    "final_authority": "minechain@proton.me",
    "approval": "approved"
  },
  "agent_profile": { "name": "…", "capability_tier": "…", "harness": "…", "model": "…" },
  "share_url": "https://api.defendablecloud.com/share/<token>"
}
```

### Cook receipt (`build_cook_payload`)

```json
{
  "schema": "defendablecloud.cook-receipt/v1",
  "receipt_id": "DCR-000005-1b77aa20",
  "org_seq": 5,
  "parent_hash": "…",
  "created_at": "2026-05-29T20:20:00Z",
  "organization": { "id": "org_…", "name": "Swarm & Bee" },
  "run": { "id": "run_…", "lane": "cook", "title": "Atlas-Qwen-27B cook" },
  "cook": {
    "base_model": "qwen3.5-27b",
    "dataset": "cre_cre_honey",
    "pairs": 28412,
    "eval_before": 0.61,
    "eval_after": 0.74,
    "lift": 0.13,
    "runner": "rtx6000_blackwell_96gb",
    "metrics": {},
    "compute_usd": 41.20
  },
  "share_url": "https://api.defendablecloud.com/share/<token>"
}
```

If the org has a prior `model-pin-receipt/v1` for the cook's `base_model` slug,
the most recent pin is sealed into the cook payload as a `pinned_model` block
(slug, name, base, params_b, card_sha256, pinned_at, declaration, client_ref,
pin_receipt_id, pin_receipt_sha256, pin_share_url) — a tamper-evident pointer
from the cook to the model declaration.

### Incident receipt (`build_incident_payload`)

```json
{
  "schema": "defendablecloud.incident-receipt/v1",
  "receipt_id": "DCR-000006-c401de9f",
  "org_seq": 6,
  "parent_hash": "…",
  "created_at": "2026-05-29T21:03:00Z",
  "organization": { "id": "org_…", "name": "Swarm & Bee" },
  "incident": {
    "id": "inc_…",
    "kind": "recurring_flag",
    "tier": "high",
    "title": "Repeated DSCR mismatch on STNL lane",
    "detail": "Third high-risk flag in 24h.",
    "lane": "cre_stnl",
    "response": ["lane_locked", "human_approval_required", "repair_task_recommended"],
    "status": "open",
    "opened_at": "2026-05-29T21:03:00Z"
  },
  "agent_profile": { "name": "…", "capability_tier": "…" },
  "share_url": "https://api.defendablecloud.com/share/<token>"
}
```

The `dataset-download-receipt/v1` and `model-pin-receipt/v1` payloads follow
the same envelope; see `build_dataset_download_payload` and
`build_model_pin_payload` for their `package` / `model` blocks.

## Hash-chain rules

1. The first receipt for an org has `parent_hash` = 64 zeros (genesis).
2. Every subsequent receipt has `parent_hash` = the prior receipt's `receipt_sha256`.
3. `org_seq` is sequential from `0`, per org.
4. `receipt_sha256` = SHA-256 over the **canonical JSON of the payload** — `orjson`
   with sorted keys, no whitespace, UTF-8 — with the `receipt_sha256` field
   **absent** (not nulled). It is appended to the stored JSON *after* hashing.
5. Verification is the **server route `GET /ledger/verify`**, which recomputes
   each receipt's hash from its stored payload, checks the `org_seq` sequence,
   and checks that each `parent_hash` links to the prior receipt's
   `receipt_sha256`. Tampering with a stored payload flips `ok` to `false` and
   pinpoints the receipt.

The Tigris artifact upload (JSON + PDF) is **best-effort** — wrapped in
try/except. The chain itself lives in Postgres, so a storage outage degrades
gracefully and never blocks a receipt.

## What is NOT in a receipt

- No external chain transaction id. No Hedera HCS topic. No blockchain anchor.
- No model "quality grade" — the verdict carries `score_100` and `severity`,
  both rule-driven.
- No PDF in the JSON — the PDF is rendered on demand from the payload via `fpdf2`.

## DefendableRouter receipt (local JSONL)

:::note[Router is v0.1 · not publicly deployed]
DefendableRouter is a real, CI-verified backend, but it is **not deployed as a
public endpoint**. Its receipts are local files. They are **checksummed, not
hash-chained** — there is no per-org `parent_hash` link the way the cloud chain
has.
:::

Receipts are appended one-per-line to `data/receipts/YYYY-MM-DD.receipts.jsonl`.
Each line is one receipt:

```json
{
  "receipt_id": "rcpt_9f1c…",
  "receipt_type": "compute_quote",
  "member_id": "mem_…",
  "job_id": null,
  "dataset_ids": [],
  "amount_usd": "10.00",
  "metadata": {},
  "created_at": "2026-05-29T20:00:00+00:00",
  "checksum_sha256": "<sha256 over canonical JSON, excluding checksum_sha256>"
}
```

- `checksum_sha256` = SHA-256 over the canonical JSON of the receipt **excluding
  the `checksum_sha256` field**. Canonicalization: `sort_keys`, compact
  separators, `Decimal` → 2-dp string, datetimes → ISO.
- `receipt_type` ∈ `membership` · `dataset_access` · `compute_quote` ·
  `compute_job` · `fine_tune_job` · `worker_registered` · `job_leased` ·
  `worker_job_accepted` · `artifact_reported` · `worker_job_completed` ·
  `worker_job_failed` · `lease_expired`.
- The router does **not** hash-chain. It is a checksummed local ledger, by
  design, at v0.1.

## Source of truth

- DefendableCloud: `api/app/receipts.py` (payload builders + PDF), `api/app/ledger.py`
  (chain mint), `api/app/hashing.py` (canonicalization) in `defendable-cloud-v2`.
- DefendableRouter: `defendable_router/core/receipts.py` in `defendable-router`.

***

🐝 *Per-org hash chain · in-house · server-verifiable at /ledger/verify · to the shed.*
