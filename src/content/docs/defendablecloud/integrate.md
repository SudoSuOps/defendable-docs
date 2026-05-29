---
title: Integrate · Developer Quickstart
description: From an AI agent producing output to a shareable hash-chained receipt — 5 minutes end-to-end. CLI, curl, or Python httpx.
---

You have an agent. We have a vault. Here is how they connect.

DefendableCloud doesn't run your agent — it **grades the work your agent already produced**, against a declared rulebook, and mints a hash-chained receipt you can hand to a client or an auditor. This page walks the integration end-to-end.

> The referee is a rulebook, not a judge. Five minutes to a verifiable receipt.

## The 7 stages your integration touches

Every integration hits the same 7 stages — the [Defendable Run](/defendablecloud/the-defendable-run/) primitive:

```
Inputs → Evidence → Execution → Checks → Verdict → Approval → Receipt
```

You provide the agent submission. Cloud provides the rulebook, the executor, the chain, and the proof.

## Quickstart · three ways

The [CLI](/defendablecloud/cli/) is the easiest path. Each stage maps to one command. The raw API (curl / httpx / fetch) works the same way — every endpoint is locked by a named OpenAPI schema you can generate clients from.

### 1 · Sign in

```bash
# CLI (recommended)
defendable auth login --email you@org.com
# check the email, copy the token= value from the URL, then:
defendable auth verify <TOKEN-FROM-EMAIL>
```

```bash
# curl
curl -X POST https://api.defendablecloud.com/auth/request \
  -H "Content-Type: application/json" \
  -d '{"email":"you@org.com"}'

# get the magic-link token from the email, then:
curl -X POST https://api.defendablecloud.com/auth/verify \
  -H "Content-Type: application/json" \
  -d '{"token":"<TOKEN-FROM-EMAIL>"}'
# response → {"access_token": "eyJ...", "user": {...}}
```

The JWT bearer is what every subsequent request sends as `Authorization: Bearer <JWT>`.

### 2 · Create a project + pick a Flight Sheet

A **Flight Sheet** is the declared rulebook for a lane. There are ~50 in the live library — CRE underwriting, dataset quality, compute benchmarks, document checks, evidence extraction, financial math, GenAI compliance, and more.

```bash
defendable projects create --name "my product"
defendable flight-sheets ls --lane agent     # browse the library
defendable flight-sheets show cre_memo_dscr_ltv_v1   # the rulebook detail
```

```bash
curl https://api.defendablecloud.com/projects \
  -H "Authorization: Bearer $JWT" \
  -H "Content-Type: application/json" \
  -d '{"name":"my product"}'

curl https://api.defendablecloud.com/flight-sheets \
  -H "Authorization: Bearer $JWT"
```

### 3 · Create a Run

```bash
defendable runs new \
  --project <project-id> \
  --flight-sheet cre_memo_dscr_ltv_v1 \
  --title "Q2 deal — Lakeside Terrace"
```

```bash
curl -X POST https://api.defendablecloud.com/runs \
  -H "Authorization: Bearer $JWT" \
  -H "Content-Type: application/json" \
  -d '{
    "project_id": "<project-id>",
    "flight_sheet_id": "<flight-sheet-id>",
    "title": "Q2 deal — Lakeside Terrace"
  }'
```

### 4 · Attach evidence + the agent's structured submission

Evidence is what your agent was given (a memo, a T-12, a dataset manifest, a tool output). The submission is what your agent produced — a structured JSON conforming to the Flight Sheet's required output schema.

```bash
# evidence — text note
defendable evidence add <run-id> \
  --kind note --label "deal terms" \
  --content "Loan 8.625M · NOI 920k · 7.25% · 30yr am"

# evidence — file upload (hashed at upload, 25 MB max)
defendable evidence upload <run-id> --file ./property-memo.pdf

# submission — the agent's structured JSON output
defendable submission add <run-id> \
  --output-file ./agent-output.json \
  --agent claude-code --model claude-opus --provider anthropic
```

The submission JSON shape is canonical — every Flight Sheet expects:

```json
{
  "assignment_id": "cre_memo_dscr_ltv_v1",
  "agent_summary": "...",
  "inputs_used": ["..."],
  "missing_inputs": [],
  "claims": [{"claim": "...", "evidence_reference": "...", "confidence": "provided"}],
  "calculations": [
    {
      "name": "DSCR",
      "formula": "noi / annual_debt_service",
      "inputs": {"noi": 920000, "annual_debt_service": 706253},
      "result": 1.303,
      "units": "ratio"
    }
  ],
  "risks": [],
  "assumptions": [],
  "open_questions": [],
  "final_output": "PASS",
  "self_check": {"all_required_sections_completed": true}
}
```

The referee will **recompute** every claim in `calculations[]` from the agent's own `inputs` + `formula` and flag mismatches beyond tolerance. Don't fake the math — get the formula right.

### 5 · Run the audit

```bash
defendable audit run <run-id>
# if any rules show status='open', grade them and finalize:
defendable audit grade <run-id> <check-id> pass     # checklist rule — operator binary
defendable audit finalize <run-id>
```

The referee applies the rulebook — structure, schema, math re-derivation, evidence, policy DSL — and emits the verdict.

### 6 · Approve + generate the receipt

```bash
defendable approval set <run-id> --decision approved --note "ship it"
defendable receipt generate <run-id>
```

Output:

```
✓ receipt minted

  receipt_id      DCR-000004-3a7c9f2b
  org_seq         4
  parent_hash     9c2f4e5d…e1a4
  receipt_sha256  a83e1b2c…77f1
  share_url       https://api.defendablecloud.com/share/kQ8vN2xJ7pR4tW1mZ9bL3cF6
  pdf_url         https://api.defendablecloud.com/share/kQ8vN2xJ7pR4tW1mZ9bL3cF6/pdf
```

The receipt is now on the per-org hash chain. JSON + PDF are stored; the share URL works for anyone, no auth required.

### 7 · Verify (public, no auth)

Anyone holding the share URL can confirm the receipt's hash matches what was sealed at mint time:

```bash
defendable verify kQ8vN2xJ7pR4tW1mZ9bL3cF6
# ✓ hash verified · receipt_id DCR-000004-3a7c9f2b
```

```bash
curl https://api.defendablecloud.com/share/kQ8vN2xJ7pR4tW1mZ9bL3cF6
# {"verified": true, "receipt_id": "...", "receipt_sha256": "...", "payload": {...}}
```

The API serves the receipt at `GET /share/{token}`. The Vault SPA may render a friendlier human-facing proof page at `app.defendablecloud.com/r/<token>` on top of that endpoint — `/r/<token>` is the app's client-side route, `/share/{token}` is the API path.

## Walking the chain

You can list and verify the whole per-org chain:

```bash
defendable ledger ls       # org_seq order, no payload — just coordinates
defendable ledger verify   # walk + check hash + parent linkage
```

```bash
curl https://api.defendablecloud.com/ledger -H "Authorization: Bearer $JWT"
curl https://api.defendablecloud.com/ledger/verify -H "Authorization: Bearer $JWT"
```

## What the integration buys you

| Before | After |
|---|---|
| *"how do I know the AI did this?"* — unanswered | A receipt the client can verify themselves |
| Manual spreadsheets reconciling AI output to evidence | Math re-derived from the agent's own inputs |
| Vibes about "looks good" | Honey · jelly · propolis severity, flag-driven, deterministic |
| Hand-built proof packets for audit | JSON + PDF + public share URL, hash-chained |

> The referee is a rulebook, not a judge. Math and code. To the shed.

## Next reads

- [The Defendable Run](/defendablecloud/the-defendable-run/) — every stage in detail
- [Eval Lane · The Referee](/defendablecloud/eval-lane/) — how the rulebook engine works
- [Defendable CLI](/defendablecloud/cli/) — every command, every flag
- [API Reference](/defendablecloud/api-reference/) — every endpoint with curl + CLI examples
- [Three Lanes](/defendablecloud/three-lanes/) — Agent Work · Dataset · Compute receipts

***

🐝 *You have an agent. We have a vault. To the shed.*
