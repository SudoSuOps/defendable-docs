---
title: DefendableDocs
description: The operating manual for DefendableOS and DefendableCloud. The engine that verifies agentic work. The hosted vault that proves it. Books and records.
template: splash
hero:
  tagline: |
    The operating manual for DefendableOS and DefendableCloud.
    The engine that verifies. The vault that proves.
    Ring ring · to the shed.
  image:
    file: ../../assets/logo.svg
  actions:
    - text: Start Here
      link: /getting-started/
      icon: right-arrow
      variant: primary
    - text: View Architecture
      link: /ecosystem/architecture/
      icon: external
    - text: Verify a Receipt
      link: /defendablecloud/generate-a-receipt/
      icon: external
---

:::tip[Field status — audited prototype]
A controlled, **synthetic** customer-support agent-operations demo is fielded and
independently audited (Codex audit, **VERIFIED_AS_REPAIRED_WITH_LIMITATIONS**).
See **[Field Proof v0.1](/field-release/overview/)**. The DefendableCloud Vault
(`api.defendablecloud.com` · `app.defendablecloud.com`) is live as a hosted
proof vault. SHA-256 establishes per-org hash-chained content integrity in-house —
no external chain anchoring on the spine.
:::

## DefendableOS is the engine. DefendableCloud is the proof vault.

> **DefendableOS** runs the rulebook. **DefendableCloud** runs the receipts.

Every piece of agentic work that flows through the platform follows **one primitive — the Defendable Run**:

```
Inputs → Evidence → Execution → Checks → Verdict → Approval → Receipt
```

A client uploads work or sends an agent submission. The Cloud loads the **Flight Sheet** — the declared rulebook for that lane. The OS's referee engine runs the rules deterministically and throws **flags** when a rule is violated. A human approves. The Cloud mints a hash-chained **Receipt**.

That's the whole loop. No hidden judge model. No "seems good." No quality vibes. The referee is a rulebook.

## The two surfaces of this manual

- **[DefendableOS](/defendableos/overview/)** — the engine · verifies work against a declared rulebook · the [referee](/tribunal/overview/) is a rulebook engine, not a judge model · throws flags, not opinions.
- **[DefendableCloud](/defendablecloud/overview/)** — the hosted vault · runs Defendable Runs across three lanes (Agent Work · Dataset · Compute Receipts) · stores receipts on a per-org hash chain · serves the [Vault portal](https://app.defendablecloud.com).

Around the two surfaces:

- **The Language** — [Defend-A-Pedia](/defend-a-pedia/overview/) · the vocabulary canon · [Glossary](/ecosystem/glossary/) · operator terms in plain English.
- **The Voice** — [Mr. Defendable](/mr-defendable/overview/) · principal voice · CRE-broker discipline · receipts before claims.
- **The Books** — [DefendableLedger](/defendableledger/overview/) · in-house hash-chained books and records · NOT external chain anchoring.

## The Defendable Run, end to end

```
Client / Operator / Agent
        ↓
Flight Sheet            ← the declared rulebook for the lane
        ↓
Assignment + Evidence   ← what the work is, what's on the table
        ↓
Submission              ← the agent's structured output (JSON, re-derivable)
        ↓
Referee (rulebook engine)
        ↓
Checks: pass / flag / open · per-rule severity · per-flag tier (low/mid/high)
        ↓
Verdict (score = % of declared rules satisfied)
   honey = no flags + approved · jelly = noncritical flags · propolis = critical flag
        ↓
Human Approval          ← always · receipts only mint on approval
        ↓
Receipt                 ← per-org hash chain · JSON + PDF · public shareable link
```

Every receipt links to its predecessor. Verification is client-side WebCrypto, no server round-trip. *(Status: the chain is live for Eval, Cook, and Incident receipts on `api.defendablecloud.com`. SHA-256 establishes content-integrity linkage. Public external anchoring is intentionally NOT in scope — see the [Kill Hedera doctrine](/defendableledger/kill-hedera/).)*

## The doctrine

> *"The referee is a rulebook, not a judge."*
> *"Agents earn their lanes."*
> *"A human holds final authority."*
> *"The trust layer compounds inside the house."*

> *"To the shed."* — Mr. Defendable

## Get oriented

- **Board / Principal** → [Getting Started](/getting-started/) → [DefendableOS · What It Is](/defendableos/what-it-is/) → [DefendableCloud · Overview](/defendablecloud/overview/)
- **Operator / Builder** → [Architecture](/ecosystem/architecture/) → [The Defendable Run](/defendablecloud/the-defendable-run/) → [Rulebook Engine](/defendableos/rulebook-engine/)
- **Buyer / Customer** → [DefendableCloud · Three Lanes](/defendablecloud/three-lanes/) → [Generate a Receipt](/defendablecloud/generate-a-receipt/) → [Buyer Profile](/defendableos/buyer-profile/)
- **Developer** → [Schemas](/schemas/overview/) → [Examples](/examples/overview/) → [API Overview](/api/overview/)

***

🐝 *Ring ring · Mr. Defendable speaking · to the shed.*
