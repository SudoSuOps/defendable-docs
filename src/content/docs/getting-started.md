---
title: Getting Started
description: The 90-second principal orientation to DefendableOS and DefendableCloud. Read this first if you are a board member · CFO · principal · operator · or developer.
---

## The 90-second principal test

If you have ninety seconds, here is what you need to know.

**DefendableOS is the engine. DefendableCloud is the hosted proof vault.**

When an AI agent finishes a piece of work, **DefendableCloud** loads the Flight Sheet (the declared rulebook for the lane), and **DefendableOS** runs the **referee** — a deterministic rulebook engine that applies the rules and throws **flags** when a rule is violated. It never grades by opinion. There is no judge model on the receipt path. A human approves. The Cloud mints a hash-chained **Receipt** — JSON + PDF, public shareable link, verifiable client-side.

That is what makes the work *auditable* · *repairable* · and *defensible* — the trinity every regulated · revenue-bearing · customer-facing business needs once AI agents touch real workflows.

The category we operate in is not "another AI agent" or "another LLM platform." The category is **trust infrastructure for AI work** — adjacent to Datadog (observability), Vanta (compliance), KPMG (audit), Moody's (ratings), and Cloudflare (defense). Each is a multi-billion-dollar category. DefendableOS + DefendableCloud sit at the intersection.

The principal building this platform is Donovan Mackey — a 30-year top 1% industrial CRE broker (~$8B closed) who built it on the same discipline he closed buildings with: *bring the math · books and records · receipts at every step · class A 5-cap.* That voice runs through every surface.

## The one primitive — the Defendable Run

```
Inputs → Evidence → Execution → Checks → Verdict → Approval → Receipt
```

Every feature in DefendableCloud exists to create, verify, approve, store, or share a Defendable Run. If a feature does not move a Run forward, it is not in the product.

## What you do next depends on your seat

### Board / Principal

Start with [DefendableOS · What It Is](/defendableos/what-it-is/) and [DefendableCloud · Overview](/defendablecloud/overview/). Then read the [Buyer Profile](/defendableos/buyer-profile/), the [Board Flight Sheet](/defendableos/board-flight-sheet/), and the [Pricing Philosophy](/defendableos/pricing-philosophy/).

### Operator / Builder

Start with [Architecture](/ecosystem/architecture/) for the full ecosystem diagram. Then read [The Defendable Run](/defendablecloud/the-defendable-run/), [Rulebook Engine](/defendableos/rulebook-engine/), and the [API Overview](/api/overview/).

### Buyer / Customer

Start with [DefendableCloud · Three Lanes](/defendablecloud/three-lanes/) — what we sell receipts on (Agent Work · Dataset · Compute). Then read [Generate a Receipt](/defendablecloud/generate-a-receipt/) and [Use Cases](/defendableos/use-cases/). The [Cost to Mint](/cost-to-mint/overview/) page explains the per-decision economics.

### Developer

Start with [Schemas Overview](/schemas/overview/) and [Examples](/examples/overview/). Then pick a surface: the live [Vault portal](https://app.defendablecloud.com) for the click-through, [API Overview](/api/overview/) for the integration, or [DefendableLedger](/defendableledger/overview/) for the books-and-records side.

## The one-line orientation

> *Work becomes assignment. Assignment becomes submission. Submission becomes a verdict against the rulebook. Verdict becomes a receipt. Receipts become books and records. Books and records become trust.*

That sentence is the entire platform. Everything in these docs is one level of detail beneath it.

## Verify a receipt right now

The fastest way to understand DefendableCloud is to verify a real receipt.

1. Open the [Vault portal](https://app.defendablecloud.com) (sign in via magic link).
2. Pick any Run with status `approved` and click **Generate Receipt**.
3. The portal returns a JSON payload + PDF + a public share URL (`/r/<token>`).
4. Open the share URL — anyone can view the receipt and check the badge.
5. The receipt verifies its position on the per-org hash chain via `GET /ledger/verify` — no auth, no server-side trust. **That's the entire proof loop.**

Every DefendableCloud surface follows that pattern. Every receipt has a hash. Every chain links to its predecessor. Every claim can be verified in seconds. That is what books-and-records discipline applied to AI work actually looks like.

## Voice discipline before you read further

DefendableDocs is written in Mr. Defendable's voice. That means:

- **Plain English over jargon.** A CFO reads this without a glossary.
- **Receipts over claims.** Every assertion resolves to a verifiable source.
- **Specific over generic.** Real numbers · real hashes · real deal types.
- **No MBA filler.** Zero *"world-class"*, *"transformational"*, *"AI-powered"*, *"leverage synergies"*.
- **No Web3 theatrics.** No token, no external-chain anchoring on the spine. In-house hash-chained books and records — see the [Kill Hedera doctrine](/defendableledger/kill-hedera/).
- **"To the shed" close.** Every doctrine section ends decisively.

## One reading order suggestion

If you read in this order you will understand DefendableOS + DefendableCloud faster than any other path:

[Ecosystem Overview](/ecosystem/overview/) →
[Architecture](/ecosystem/architecture/) →
[DefendableOS · What It Is](/defendableos/what-it-is/) →
[Rulebook Engine](/defendableos/rulebook-engine/) →
[DefendableCloud · Overview](/defendablecloud/overview/) →
[The Defendable Run](/defendablecloud/the-defendable-run/) →
[Three Lanes](/defendablecloud/three-lanes/) →
[Eval Lane · The Referee](/defendablecloud/eval-lane/) →
[Buyer Profile](/defendableos/buyer-profile/).

Thirty minutes · nine pages · operator-grade clarity.

***

🐝 *Ring ring · welcome to DefendableOS and DefendableCloud · to the shed.*
