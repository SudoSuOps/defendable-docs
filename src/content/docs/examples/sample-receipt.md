---
title: Sample Receipt
description: A live defendablecloud.eval-receipt/v1 from DefendableCloud — the agent-work eval lane.
---

A live `defendablecloud.eval-receipt/v1` minted by [DefendableCloud](/defendablecloud/overview/) on an Agent Work eval Run:

```json
{
  "schema": "defendablecloud.eval-receipt/v1",
  "org_seq": 4,
  "receipt_id": "DCR-000004",
  "issued_at_utc": "2026-05-27T20:14:33Z",
  "issued_by": { "user_id": "u_01H...", "display": "Donovan Mackey" },
  "org": { "id": "org_01H...", "slug": "swarm-and-bee" },

  "parent_hash": "9c2f...e1a4",
  "payload_hash": "4d1b...8c7e",
  "receipt_sha256": "a83e...77f1",

  "payload": {
    "run_id": "run_01J...",
    "flight_sheet": { "slug": "cre_memo_dscr_ltv_v1", "version": "1.0" },
    "agent_profile": {
      "harness": "claude-code",
      "harness_version": "1.2",
      "model": "swarmatlas-9b",
      "provider": "ollama",
      "served_by": "smash-5090",
      "runtime": { "host": "smash", "os": "Linux 6.17", "hardware": "RTX 5090 32GB" },
      "capability_tier": "small"
    },
    "assignment_text_hash": "b71c...3f2a",
    "evidence_hashes": ["e1d5...c0a9"],
    "submission_hash": "f04a...1e6d",
    "verdict": {
      "schema": "defendablecloud.verdict/v1",
      "severity": "honey",
      "score_100": 100.0,
      "client_ready": true,
      "recommended_action": "approve",
      "risk_breakdown": { "high": 0, "mid": 0, "low": 0 },
      "findings": []
    },
    "approver": {
      "user_id": "u_01H...",
      "display": "Donovan Mackey",
      "approved_at_utc": "2026-05-27T20:13:50Z"
    }
  },

  "share_token": "shr_3f7c...8d21",
  "pdf_available": true
}
```

## How to read this

- **`org_seq: 4`** — this is the 4th receipt for this org. The chain is **per-org**.
- **`parent_hash`** — points at the org's 3rd receipt's `receipt_sha256`. Walk the chain back to seq 1 (where `parent_hash` = 64 zeros) to verify.
- **`payload_hash`** — SHA-256 over the canonical payload. Anyone can recompute and confirm.
- **`receipt_sha256`** — SHA-256 over the receipt JSON with `receipt_sha256` nulled (so the field doesn't reference itself).
- **`verdict.severity: honey`** — no flags, human approved. Score 100.
- **`agent_profile.capability_tier: small`** — this run rode a 9B model; its capability profile builds toward earned lanes.
- **`share_token`** — opaque token mapping to a public `/r/shr_3f7c...8d21` URL. Anyone can view + verify, no auth required.

## What's not in this receipt

- **No external chain transaction id.** No Hedera HCS topic. No blockchain anchor. *(See [Kill Hedera doctrine](/defendableledger/kill-hedera/).)*
- **No PDF blob.** The PDF is regenerated from the payload via `fpdf2` on demand.
- **No model "quality grade."** The verdict carries `score_100` (% rules satisfied) and `severity` (flag-driven). Both rule-driven, neither an opinion.

***

🐝 *DCR-000004 · per-org chain · share token · to the shed.*
