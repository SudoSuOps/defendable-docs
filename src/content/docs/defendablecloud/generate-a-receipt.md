---
title: Generate a Receipt
description: The killer-button walkthrough. New Run → evidence → submission → audit → approve → receipt → share. Five minutes end to end on the live Vault portal.
---

The fastest way to understand DefendableCloud is to generate a real receipt. This page walks the full loop — from a new Run to a public share link — on the live [Vault portal](https://app.defendablecloud.com).

> Five minutes. One receipt. End to end. Verifiable client-side.

## Prerequisites

- An organization on the Vault. Magic-link sign-in via the portal — request the link at [app.defendablecloud.com](https://app.defendablecloud.com), check your inbox, click through.
- For an Agent Work Run: an agent profile (model + harness + tools + runtime) and an evidence packet (e.g. a property memo). For a Dataset or Compute Run: a manifest / a benchmark output.

## Step 1 · Pick a Flight Sheet

In the portal, **New Eval Run** opens the Flight Sheet picker. The library is ranked by lane (agent / dataset / compute / document / compliance / finance / GenAI / evidence-extraction / repair). Pick the one that matches the work — for example `cre_memo_dscr_ltv_v1` for a CRE underwriting eval.

The Flight Sheet's assignment text loads into the Run as the editable starting point.

## Step 2 · Attach the agent profile

Click **Agent Profile** on the Run detail page and either pick an existing profile or create one:

- **harness** + **version** (e.g. claude-code 1.2, openhands 0.5, claw 0.3)
- **model** + **provider** + **served_by** (e.g. `hermes3:8b` on Ollama on this rig)
- **runtime** — host + OS + hardware + vRAM
- **tools** — what the agent is granted (web, shell, vision, code-exec)
- **context_window** in tokens
- **capability_tier** — `edge` (3-4B) · `small` (7-14B) · `mid` (27-34B) · `frontier` (70B+)

The agent profile rides the receipt. Future Runs against the same profile build a **capability profile** — what lanes the agent has *earned* (≥3 honey & 0 propolis = approved).

## Step 3 · Attach evidence

For Agent Work Runs, click **Add Evidence** and attach the document, memo, dataset sample, or instrumentation output the agent needs. Files are hashed and stored in Tigris; the hash becomes part of the receipt.

For Dataset / Compute Runs, the evidence is the manifest / benchmark output itself.

## Step 4 · Paste the submission

The agent has run (anywhere — owner compute, hosted, hybrid). Take the agent's structured JSON output and paste it into the Run's **Submission** field. The submission must match the Flight Sheet's `required_output_schema`. The canonical shape:

```json
{
  "assignment_id": "cre_memo_dscr_ltv_v1",
  "agent_summary": "...",
  "inputs_used": ["appraised_value", "loan_amount", "..."],
  "missing_inputs": [],
  "claims": [...],
  "calculations": [
    {"name": "DSCR", "formula": "noi / annual_debt_service",
     "inputs": {"noi": 920000, "annual_debt_service": 706253},
     "result": 1.303, "units": "ratio"}
  ],
  "risks": [...], "assumptions": [...], "open_questions": [...],
  "final_output": "PASS",
  "self_check": {...}
}
```

**Math is re-derived from the agent's own inputs** — get the formula and the inputs right, and the engine confirms the claim.

## Step 5 · Run the audit

Click **Run Audit**. The [referee](/defendableos/rulebook-engine/) applies the rulebook deterministically — structure, schema, math re-derivation, evidence, policy DSL. The portal shows each check as `pass` · `flag` · `open` in real time.

## Step 6 · Read the findings

The findings panel shows:

- **Score** (% of declared rules satisfied), **severity** (honey · jelly · propolis), **risk breakdown** (high / mid / low flag count), **client-ready** boolean, **recommended action**.
- **Flag list** ranked high → low — each flag carries its tier, severity, and the *spot of the foul* (e.g. *"DSCR recomputed 1.022 — gate 1.20 — MISMATCH"*).
- **Three-bucket sort** — every flag tagged as **work-defect** (fixable), **deal-finding** (policy gate failed), or **stack-fit** (agent capability below lane).

If the verdict is **propolis**, the **Repair Plan** card splits the response: work-defects route back to the agent for resubmission; deal-findings go to the client; stack-fit flags suggest the upgrade.

## Step 7 · Approve

Click **Approve** when the work is ready to be sealed. (Or **Reject** to close the Run without a receipt.) The approver's identity is recorded into the receipt payload.

> **No receipt without approval.** This is the trust boundary.

## Step 8 · Generate the Receipt

Click **Generate Receipt**. The Cloud mints the receipt:

- **JSON** payload (canonical, sorted keys).
- **PDF** rendered via `fpdf2` — regenerable from the payload.
- **Public share URL** (`/r/<token>`) — anyone can view, no auth required.

The receipt is **hash-chained** to the org's prior receipt (the per-org chain). The chain is verifiable client-side via `GET /ledger/verify`.

## Step 9 · Share + verify

Copy the share URL. Open it in an incognito window. The public view shows:

- The verdict, severity, score, risk breakdown.
- The findings, ranked.
- The agent profile (the stack).
- The receipt hash + parent hash (the chain link).
- A *Verified* badge — recomputed from the payload client-side via WebCrypto.

That's the entire loop. Five minutes, end to end, from new Run to public verifiable receipt.

## Repair loop (when the verdict is not honey)

If the verdict is **jelly** or **propolis**:

- **work-defect** flags → the **Submit Corrected Version** button re-opens the Submission field. Paste a fixed version → re-run the audit → re-issue the verdict. The corrected Run rides on the same Flight Sheet; the eventual receipt records the resubmission history.
- **deal-finding** flags → the math is right; the rule says no. Not a rework. Report to the client.
- **stack-fit** flags → the agent's model/compute is below the lane. Bigger brain, bigger compute, different lane. **This is the upgrade conversation.**

## The trust boundary, restated

> *"DefendableCloud is not AI judging AI. It is agent work tested against a declared rulebook."*

The proof layer is math and code. The referee has the rulebook. The receipt is the books-and-records artifact. The human owns the final trust decision.

***

🐝 *Five minutes · one Run · one receipt · public proof. To the shed.*
