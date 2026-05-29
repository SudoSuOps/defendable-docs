---
title: DefendableCloud · Overview
description: The hosted proof vault for Defendable Runs, receipts, datasets, models, incidents, and enterprise audit trails.
---

DefendableCloud is the hosted proof vault for agentic work.

> **DefendableOS** is the engine. **DefendableCloud** is the vault. The engine runs the rulebook; the vault stores and shares the proof.

The core primitive is the **Defendable Run**:

```text
Inputs -> Evidence -> Execution -> Checks -> Verdict -> Approval -> Receipt
```

Every product surface exists to create, verify, approve, store, or share that Run. If a feature does not support that loop, it does not belong in v1.

## What Is Live

| Surface | Status | Purpose |
|---|---:|---|
| Marketing site | Live | Explains the cloud product and trust model. |
| Vault app | Live | User portal for projects, runs, evidence, checks, approvals, receipts, datasets, models, and account surfaces. |
| API | Live foundation | FastAPI backend for auth, projects, runs, receipts, ledger, datasets, models, cooks, incidents, membership, org/RBAC, and admin operations. |
| CLI | Launch foundation | Terminal workflow for the full Run lifecycle. |
| Dataset library | Launch foundation | Members-only dataset catalog, download grants, receipts, and quota controls. |
| Enterprise controls | Launch foundation | Runtime boot checks, RBAC, API keys, public receipt redaction, WAF guidance, backups, incident runbooks, and security docs. |

## The Lanes

| Lane | What it proves |
|---|---|
| Agent Work Receipts | An AI agent did the work it claimed, evidence was attached, checks ran, a verdict was minted, and a human approved or rejected it. |
| Dataset Receipts | A dataset package or download grant was tied to a member, quota, object, hash, provenance boundary, and public/private receipt boundary. |
| Compute Receipts | A cook, runner, model pin, or incident produced execution evidence and a hash-chained record. |

Additional receipt kinds can ride the same per-org chain: cook receipts, model pin receipts, incident receipts, and restore-drill receipts.

## The Button

> **Generate Receipt.**

That is the action that closes the Run. Until a human approves, no run receipt should mint. Once approved, the receipt is hash-chained to the organization's prior receipt and served as JSON, PDF, and a public share URL.

## Product Boundaries

DefendableCloud is not a generic chatbot, LLM host, or project-management app. It is the audit and proof layer.

It should answer:

- What work was requested?
- What evidence was attached?
- What rulebook checked the work?
- What passed, warned, or failed?
- Who approved it?
- What receipt was minted?
- Can another party verify the public proof without seeing private storage keys?

## Where It Lives

| Surface | URL |
|---|---|
| Marketing | `https://defendablecloud.com` |
| Vault app | `https://app.defendablecloud.com` or current Cloudflare Pages app host |
| API | `https://api.defendablecloud.com` |
| Docs | `https://defendabledocs.com` |

## Read Next

- [The Defendable Run](/defendablecloud/the-defendable-run/)
- [Three Lanes](/defendablecloud/three-lanes/)
- [How It Works](/defendablecloud/how-it-works/)
- [Defendable CLI](/defendablecloud/cli/)
- [Current API Surface](/defendablecloud/api/)
- [Enterprise Security](/defendablecloud/enterprise-security/)
- [Operations Runbook](/defendablecloud/operations/)

