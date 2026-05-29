---
title: Sample Receipt
description: A live defendablecloud.eval-receipt/v1 from DefendableCloud — the agent-work eval lane.
---

A live `defendablecloud.eval-receipt/v1` minted by [DefendableCloud](/defendablecloud/overview/) on an Agent Work eval Run. This is the **canonical receipt body** built by `build_eval_payload` — flat top-level keys, no wrapper:

```json
{
  "schema": "defendablecloud.eval-receipt/v1",
  "receipt_id": "DCR-000004-a83e1f7c",
  "org_seq": 4,
  "parent_hash": "9c2f1b6d4e8a0c3f5b7d9e1a2c4f6b8d0e2a4c6f8b0d2e4a6c8f0b2d4e6a8c0f",
  "created_at": "2026-05-27T20:14:33Z",
  "organization": { "id": "org_01H...", "name": "Swarm and Bee" },
  "flight_sheet": { "name": "DSCR and LTV Analysis", "version": "1.0" },
  "assignment": {
    "title": "DSCR and LTV Analysis",
    "sha256": "b71c3f2a8d5e0a9c1f4b7d2e6a0c3f5b8d1e4a7c0f3b6d9e2a5c8f1b4d7e0a3c"
  },
  "submission": {
    "agent_name": "swarmatlas-9b harness",
    "model_name": "swarmatlas-9b",
    "provider": "ollama",
    "sha256": "f04a1e6d2c5b8a0f3e6d9c2b5a8f1e4d7c0b3a6f9e2d5c8b1a4f7e0d3c6b9a2e"
  },
  "evidence": [
    { "kind": "file", "label": "property_memo.txt", "sha256": "e1d5c0a9..." }
  ],
  "findings": [
    {
      "label": "DSCR >= 1.20 lending gate",
      "category": "policy",
      "status": "flag",
      "severity": "critical",
      "detail": "DSCR recomputed 1.022 — gate 1.20 — MISMATCH"
    }
  ],
  "verdict": {
    "outcome": "fail",
    "score_100": 88,
    "severity": "propolis",
    "client_ready": "Not client-ready: one high-tier policy flag.",
    "recommended_action": "review",
    "summary": "Math reconciled; DSCR below the declared 1.20 gate."
  },
  "ownership": {
    "agent_created": "swarmatlas-9b harness",
    "audited_by": "DefendableCloud Eval",
    "referee_logic": "DSCR and LTV Analysis v1.0",
    "final_authority": "donovan@swarmandbee.ai",
    "approval": "approved"
  },
  "agent_profile": {
    "harness": "claude-code",
    "model": "swarmatlas-9b",
    "provider": "ollama",
    "capability_tier": "small"
  },
  "share_url": "https://api.defendablecloud.com/share/shr_3f7c8d21"
}
```

## How to read this

- **`receipt_id: DCR-000004-a83e1f7c`** — format is `DCR-{org_seq:06d}-{hex8}`. The six-digit number is the org sequence; the hex8 suffix is a per-receipt id fragment.
- **`org_seq: 4`** — the 5th receipt for this org. The chain is **per-org** and sequential **starting at 0**. The genesis receipt (`org_seq: 0`) carries `parent_hash` = sixty-four zeros.
- **`parent_hash`** — points at the prior receipt's `receipt_sha256`. Walk the chain back to `org_seq: 0` to verify; [`/ledger/verify`](/defendablecloud/overview/) recomputes every hash and checks the sequence + parent links.
- **`verdict.severity: propolis`** — one high-tier flag. `score_100: 88` is the **% of declared rules satisfied**, weighted by tier — mechanical, not a quality opinion. `client_ready` is a **string** (the human-readable readiness note), not a boolean.
- **`findings`** — only the flagged rules ride here, each with the *rule's* declared `severity` (e.g. `critical`). The full applied-rule list is on the [verdict page](/examples/sample-tribunal-verdict/).
- **`share_url`** — the public `/share/{token}` URL. Anyone can view + verify, no auth required. A PDF is regenerated on demand at `/share/{token}/pdf`.

## Where the hash lives

`receipt_sha256` is **not embedded in the body**. The chain coordinates (`org_seq`, `parent_hash`) are part of the canonical body that gets hashed; the `receipt_sha256` itself is computed over that canonical JSON (orjson, sorted keys) and returned in the **Receipt envelope** by `POST /runs/{id}/receipt` at mint time (and re-served at `GET /share/{token}`):

```json
{
  "receipt_id": "DCR-000004-a83e1f7c",
  "org_seq": 4,
  "parent_hash": "9c2f...8c0f",
  "receipt_sha256": "a83e...77f1",
  "share_token": "shr_3f7c8d21",
  "share_url": "https://api.defendablecloud.com/share/shr_3f7c8d21",
  "pdf_url": "https://api.defendablecloud.com/share/shr_3f7c8d21/pdf",
  "created_at": "2026-05-27T20:14:33Z"
}
```

## What's not in this receipt

- **No external chain transaction id.** No Hedera HCS topic. No blockchain anchor. The chain is the in-house per-org hash chain, persisted in Postgres. *(See [Kill Hedera doctrine](/defendableledger/kill-hedera/).)*
- **No PDF blob.** The PDF is regenerated from the body via `fpdf2` on demand. Tigris artifact upload (JSON + PDF) is best-effort — a storage outage never blocks a receipt; the chain lives in Postgres.
- **No model "quality grade."** The verdict carries `score_100` (% rules satisfied) and `severity` (flag-driven). Both rule-driven, neither an opinion.

***

🐝 *DCR-000004 · per-org chain · share token · to the shed.*
