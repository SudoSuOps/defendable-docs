---
title: The Defendable Run
description: The one primitive — Inputs → Evidence → Execution → Checks → Verdict → Approval → Receipt. Every feature in DefendableCloud serves the Run.
---

## The one primitive

```
Inputs → Evidence → Execution → Checks → Verdict → Approval → Receipt
```

Every Defendable Run carries the same shape. The lane changes (Agent Work, Dataset, Compute, Cook, Incident). The rulebook changes (Flight Sheets are per-lane, per-domain). The seven stages do not.

## Stage by stage

### 1. Inputs

The client creates a Run in the [Vault portal](https://app.defendablecloud.com) (or via `POST /runs` on the API). The Run carries:

- The **project** it belongs to (organizational scope).
- The **agent profile** (the stack — model + harness + tools + runtime).
- The **Flight Sheet** (the declared rulebook for the lane).
- The **assignment** (what the work is — copied from the Flight Sheet's `assignment_instructions` or customized).

### 2. Evidence

Evidence is what the agent needed to do the work. Common shapes:

- A property memo (CRE)
- A T-12, a rent roll, a deal term sheet
- A dataset manifest
- An instrumentation report from a GPU benchmark
- A document draft + its source citations

Evidence is attached via `POST /runs/{id}/evidence` or uploaded through the portal. Evidence is **hashed** and stored in Tigris. The hash becomes part of the receipt — anyone verifying later can confirm the evidence has not changed.

### 3. Execution

The agent runs (anywhere — owner compute, hosted, hybrid). For Agent Work lanes, the agent produces a **structured submission**: a JSON object that matches the Flight Sheet's `required_output_schema`. The submission carries:

- The agent's `assignment_id` and `agent_summary`.
- The `inputs_used` and `missing_inputs`.
- The `claims` (each with an `evidence_reference`).
- The `calculations` (each with `formula`, `inputs`, `result`, `units` — re-derivable).
- The `risks`, `assumptions`, `open_questions`.
- A `final_output` and a `self_check` block.

For non-agent lanes (Dataset, Compute), the "submission" is the dataset manifest or benchmark output.

### 4. Checks

The [referee](/defendableos/rulebook-engine/) runs all declared rules from the Flight Sheet, in order:

1. **Structure** — required sections present.
2. **Schema** — fields obey declared types.
3. **Math re-derivation** — every `calculations[]` entry is recomputed from its own inputs via a safe AST evaluator. Disagree with the claim beyond tolerance → flag.
4. **Evidence** — required fields non-empty; assumptions labeled; missing inputs disclosed.
5. **Policy DSL** — declared gates (e.g. `DSCR >= 1.20`) checked against the agent's own numbers.

Each check returns `pass` · `flag` · `open`. Each flag carries a tier (low/mid/high) and severity (critical → propolis, noncritical → jelly).

### 5. Verdict

The verdict is **deterministic** — computed from the check results, no model opinion.

- **Score** = % of declared rules satisfied.
- **Severity** = honey (no flags + approved) · jelly (mid/low flags only) · propolis (any high-tier flag).
- **Risk breakdown** = `{high: N, mid: N, low: N}` count of flag tiers.
- **Client ready** = boolean.
- **Recommended action** = the next move the rulebook implies (`resubmit · review · approve · reject`).
- **Flag list** ranked high → low (catastrophic events surface first).

### 6. Approval

A human approves (or rejects). **Receipts only mint on approval.** This is the trust boundary: even with a clean deterministic verdict, no receipt without a human signing off.

Approval is `POST /runs/{id}/approve` or the portal's *Approve* button. The approver's identity is part of the receipt payload.

### 7. Receipt

The receipt is **minted** via `POST /runs/{id}/receipt`:

- The receipt payload is the canonical record of the Run (Flight Sheet version, agent profile, evidence hashes, submission hash, findings, verdict, approver).
- The payload is canonicalized (sorted keys, no whitespace, UTF-8) and hashed (SHA-256).
- The receipt's `parent_hash` points at the prior receipt for the same org (per-org hash chain).
- The receipt is rendered to **PDF** via `fpdf2` (regenerable from the JSON payload — no separate PDF storage).
- A **public share token** is issued (`/r/<token>`) — anyone can view the receipt and check the chain.

## Verification

Verification is **client-side** WebCrypto. Anyone holding a receipt can:

1. Pull the prior receipt by `parent_hash`.
2. Canonicalize and hash it.
3. Confirm it matches the `parent_hash` field.
4. Walk the chain back to the genesis receipt.

Or call `GET /ledger/verify` for the org-wide chain integrity check.

**No external chain anchoring on the spine** — see the [Kill Hedera doctrine](/defendableledger/kill-hedera/). The trust layer is per-org, in-house, and verifiable end to end.

## What rides the same primitive

- **Eval Receipts** — the most common Run; the agent-work lane.
- **Cook Receipts** — the fine-tune lift Run; before-and-after eval on the same Flight Sheet, claim of lift only minted when the after-eval actually beats the before.
- **Incident Receipts** — Agent Ops governance events (lane locked due to recurring critical flags, dark/rogue alert, spend cap breach). Same chain, same shape, different `schema`.

One primitive. Many lanes. One audit trail per org.

***

🐝 *Seven stages · one chain · one receipt at a time. To the shed.*
