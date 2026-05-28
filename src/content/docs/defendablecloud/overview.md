---
title: DefendableCloud · Overview
description: The hosted proof vault for agentic work. Build-A-Bility — plan the stack, prove the work against a rulebook, keep the receipts. The vault that runs the Defendable Run.
---

## What DefendableCloud is

DefendableCloud is the **hosted proof vault** for agentic work. It runs the [Defendable Run](/defendablecloud/the-defendable-run/) end to end: take an agent submission, load the **Flight Sheet** (the declared rulebook for the lane), let the [DefendableOS referee](/defendableos/rulebook-engine/) apply the rules, collect the flags, get human approval, and mint a hash-chained **Receipt** — JSON + PDF + public share link.

> **DefendableOS** is the engine. **DefendableCloud** is the hosted proof vault. The engine runs the rulebook; the vault runs the receipts.

## The hero positioning

> **"Build-A-Bility for agentic work."**
>
> Plan the stack, prove the work against a rulebook, keep the receipts —
> so the AI agents you build can be trusted in production.

## The one primitive — the Defendable Run

```
Inputs → Evidence → Execution → Checks → Verdict → Approval → Receipt
```

Every feature in DefendableCloud serves the Run. If it doesn't help create, verify, approve, store, or share a Defendable Run, it is not in v1. *(See [The Defendable Run](/defendablecloud/the-defendable-run/) for the stage-by-stage walkthrough.)*

## The three lanes at launch

| Lane | What it proves |
|---|---|
| **[Agent Work Receipts](/defendablecloud/three-lanes/#agent-work-receipts)** | An AI agent did the work it claimed (math re-derivable, evidence cited, declared rules satisfied). |
| **[Dataset Receipts](/defendablecloud/three-lanes/#dataset-receipts)** | A dataset meets declared quality rules (schema, balance, dedup, provenance, no PII). |
| **[Compute Receipts](/defendablecloud/three-lanes/#compute-receipts)** | A compute run hit declared performance/efficiency thresholds (real instrumentation, not LLM-generated numbers). |

Additional receipt types ride the same per-org hash chain:

- **Cook Receipts** — fine-tune lift, before → after, minted only on a real measured improvement.
- **Incident Receipts** — Agent Ops governance events (recurring-flag lane lock, dark/rogue alerts, spend-cap breach). Same chain. *Same proof shape.*

## The one killer button

> **Generate Receipt.**

That's the action that closes the Run. Until a human approves, no receipt mints. Once approved, the receipt is hash-chained to the org's prior receipt and served three ways: JSON payload, PDF, and a public `/r/<token>` URL anyone can verify client-side.

## Where it lives

| Surface | URL | Role |
|---|---|---|
| Marketing site | [defendablecloud.com](https://defendablecloud.com) | Public site · positioning · contact form |
| API | [api.defendablecloud.com](https://api.defendablecloud.com) | FastAPI · Postgres · Tigris · the hash chain |
| Vault portal | [app.defendablecloud.com](https://app.defendablecloud.com) | React SPA · sign in (magic link) · Runs · receipts · share links |

Hosted on Fly.io (api), Cloudflare Pages (site + app). Per-org hash-chained receipts in Postgres; PDFs regenerated from the canonical JSON payload via `fpdf2`; public share links served without auth.

## The build law

> If a feature does not help **create · verify · approve · store · share** a Defendable Run, it is not in v1.

That rule has held through every Phase. It is the discipline that keeps the vault on the one primitive.

## What you read next

- [The Defendable Run](/defendablecloud/the-defendable-run/) — the one primitive, stage by stage.
- [Three Lanes](/defendablecloud/three-lanes/) — Agent / Dataset / Compute · what each lane proves.
- [Eval Lane · The Referee](/defendablecloud/eval-lane/) — Flight Sheet → Submission → Audit → Findings → Receipt.
- [Generate a Receipt](/defendablecloud/generate-a-receipt/) — the killer-button walkthrough.

***

🐝 *Build the agent. Prove the work. Keep the receipts. To the shed.*
