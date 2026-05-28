---
title: Ecosystem Overview
description: DefendableOS + DefendableCloud in one read. The engine that verifies agentic work, the hosted vault that proves it, and the books-and-records surfaces around them.
---

DefendableOS is not one thing. It is the trust infrastructure layer that sits above the AI-agent ecosystem and turns AI work into defendable business records. **DefendableOS is the engine.** **DefendableCloud is the hosted proof vault.** Everything else in this docs site is either a language surface (Defend-A-Pedia, the voice), an adjacent product surface (DefendableLedger), or an internal component (Router, Communicator, Referee, Storage).

## The two product surfaces this manual covers

| Surface | Role | What it does | Lives at |
|---|---|---|---|
| **[DefendableOS](/defendableos/overview/)** | The ENGINE — *verify it* | Runs the [referee](/defendableos/rulebook-engine/) — a deterministic rulebook engine that applies declared rules and throws flags. Never a judge model. | defendableos.com |
| **[DefendableCloud](/defendablecloud/overview/)** | The VAULT — *prove it* | Hosted proof vault. Runs Defendable Runs across three lanes (Agent Work · Dataset · Compute Receipts). Mints hash-chained receipts. | defendablecloud.com · api.defendablecloud.com · app.defendablecloud.com |

The shape of this docs site mirrors that split: a section per surface, with the supporting language and books-and-records surfaces around them.

## The language and voice surfaces around them

| Surface | Role |
|---|---|
| **[Mr. Defendable](/mr-defendable/overview/)** | The FACE — principal voice · CRE-broker discipline · founder memos · proposal intake. Lives at `mrdefendable.com`. |
| **[Defend-A-Pedia](/defend-a-pedia/overview/)** | The VOCABULARY — the term canon · the rulebook for the rulebook · every operator term in plain English. |
| **[DefendableLedger](/defendableledger/overview/)** | The BOOKS — sovereign in-house hash-chained ledger · the canonical books-and-records surface · NOT external chain anchoring. Lives at `defendableledger.com`. |
| **offensetotheshed.com** | The CULTURE — operator doctrine + written 5-pillar blog (forthcoming surface). |
| **painintheshed.com** | The MEDIA — the cost-of-intelligence podcast (forthcoming surface). |

All surfaces are positioned as DEFENSE — even when the URL contains "offense" or "pain." That is the brand-doctrine move: we take offense and we put it in the shed.

## The one primitive — the Defendable Run

Every piece of agentic work that flows through DefendableOS + DefendableCloud follows one primitive:

```
Inputs → Evidence → Execution → Checks → Verdict → Approval → Receipt
```

A client uploads work or sends an agent submission to the Cloud. The Cloud loads the **Flight Sheet** (the declared rulebook for that lane). The OS's **referee** runs the rules deterministically and throws **flags** when a rule is violated. A human approves. The Cloud mints a hash-chained **Receipt** — JSON + PDF + public share link.

No hidden judge model. No 1-100 quality grade. Score = % of declared rules satisfied.

## The internal components (inside DefendableOS)

| Component | What it does |
|---|---|
| **[DefendableRouter](/defendablerouter/overview/)** | Intake — captures every event with org · app · agent identifiers and writes the structured submission at the edge. |
| **[Communicator](/communicator/overview/)** | Meaning — translates human street talk into structured directives both ways. Optional advisory layer; never on the receipt path. |
| **[Referee](/tribunal/overview/)** *(historically: Tribunal)* | Rulebook engine — applies declared rules · throws flags · emits honey / jelly / propolis severity. **Not a judge model.** |
| **Object Storage** | Memory — durable storage of receipts · transcripts · evidence (Tigris / R2 / S3). |
| **DefendableLedger** | Trust — every receipt joins the per-org hash chain · in-house · NOT external chain anchoring. |

Around the components sit the **vocabulary** ([Defend-A-Pedia](/defend-a-pedia/overview/)) and the **repair layer** ([SwarmFixer](/swarmfixer/overview/) · the propolis corpus is what trains the repair model).

## The Defendable Run, end to end

```
Client / Operator / Agent
        ↓
DefendableCloud loads the Flight Sheet (declared rulebook)
        ↓
Assignment + Evidence            ← what the work is, what's on the table
        ↓
Submission (structured JSON)     ← agent's output, re-derivable math
        ↓
Referee (DefendableOS · rulebook engine)
        ↓
Checks: pass / flag / open · per-flag tier (low/mid/high) · severity (honey/jelly/propolis)
        ↓
Verdict (score = % of declared rules satisfied)
        ↓
Human Approval                   ← receipts only mint on approval
        ↓
Receipt                          ← per-org hash chain · JSON + PDF + share link
        ↓
Failure modes → repair lift      ← propolis flags route to SwarmFixer corpus
```

No step skips. Every step writes its own record. The platform is **receipt-chained end to end**.

## What sits where

A simple way to remember the geography:

- **The vault** — `app.defendablecloud.com` (the portal) + `api.defendablecloud.com` (the API).
- **The engine** — the OS's referee + rulebook + receipt mint, served from the API.
- **The books** — `defendableledger.com` (the canonical public surface for published records).
- **The voice** — `mrdefendable.com` (the face) + Defend-A-Pedia (the vocabulary canon).
- **Underneath** — per-org hash-chained receipts in Postgres + Tigris object storage. *No external chain anchoring on the spine — see the [Kill Hedera doctrine](/defendableledger/kill-hedera/).*

## How the surfaces compose into a real-world flow

Pick any common operator scenario:

| Scenario | Path through the stack |
|---|---|
| **Client uploads an agent submission for eval** | DefendableCloud loads the Flight Sheet → DefendableOS referee runs structured executor + math re-derivation + DSL gates → flags raised → human approves → eval receipt minted. |
| **Lender underwrites a CRE deal via agent** | Agent submission carries calculations + evidence → referee re-derives DSCR / LTV from the agent's own inputs → declared lending gates (DSCR ≥ 1.20) checked → verdict honey or propolis → receipt. |
| **Dataset gets a quality receipt** | Dataset submission → schema/balance/dedup rules applied → flags by tier → dataset receipt. |
| **Compute benchmark gets a receipt** | Benchmark output → declared performance thresholds → compute receipt. |
| **Client diligence on any receipt** | Open the public share URL → SHA-256 chain verification client-side → match or no-match · zero server trust. |

Same vault. Different lanes. **One audit trail per org.**

## What this lets the business actually do

- **Prove what the AI did** — every Run has a deterministic verdict and a receipt.
- **Defend the decision later** — every flag cites the declared rule it violated.
- **Repair instead of re-run** — propolis flags route to the repair-corpus for SwarmFixer.
- **Sort the failure** — every flag falls into one of three buckets: **work-defect** (the agent missed) · **deal-finding** (the math is right, the policy says no) · **stack-fit** (the model/compute is below the lane).
- **Hand a buyer institutional-grade books-and-records on day one** — receipts are publicly verifiable from the moment they mint.

That last bullet is the moat. AI companies typically can't show buyers their books and records. We can. Because we **are** the books and records.

## Next reads

- [Architecture](/ecosystem/architecture/) — the core diagrams.
- [DefendableOS · What It Is](/defendableos/what-it-is/) — the engine in plain English.
- [DefendableCloud · Overview](/defendablecloud/overview/) — the vault in plain English.
- [The Defendable Run](/defendablecloud/the-defendable-run/) — the one primitive, in detail.
- [Rulebook Engine](/defendableos/rulebook-engine/) — how the referee works.
- [Glossary](/ecosystem/glossary/) — every operator term with one-liner definitions.

***

🐝 *Two product surfaces · one audit trail per org · the referee is a rulebook · to the shed.*
