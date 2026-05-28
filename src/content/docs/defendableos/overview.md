---
title: DefendableOS · Overview
description: The engine that verifies agentic work. The referee is a rulebook, not a judge. DefendableOS runs the rulebook; DefendableCloud runs the receipts.
---

## What DefendableOS is

DefendableOS is **the engine that verifies agentic work**. It runs the [referee](/defendableos/rulebook-engine/) — a deterministic **rulebook engine** that applies declared rules and throws **flags**. It never grades by opinion. It is not a judge model.

> **DefendableOS** is the engine. **[DefendableCloud](/defendablecloud/overview/)** is the hosted proof vault. The engine runs the rulebook; the vault runs the receipts.

The rulebook lives in **Flight Sheets** — versioned, declared eval templates carried by DefendableCloud. The engine consumes a Flight Sheet + an agent submission and emits a deterministic verdict: which rules passed, which raised flags, what tier (low/mid/high), and what severity (honey/jelly/propolis). A human approves; the Cloud mints a hash-chained receipt.

## Why it exists

> *"Offense goes dark. The business is offline. It can't score."*

Most AI platforms build offense — bigger models, faster agents, prettier dashboards. Few build defense. We build defense. When AI offense fails — and it does · constantly — DefendableOS is the layer that says **what happened · why · what failed · what got repaired · and what trains the next model**.

## The three things the engine does

1. **Run the rulebook.** Each Flight Sheet declares the rules: structure, schema, math re-derivation, evidence requirements, policy gates. The engine applies them deterministically.
2. **Throw flags.** A check passes or raises a flag. Each flag has a tier (low/mid/high) and contributes to severity (honey/jelly/propolis). Score = % of declared rules satisfied.
3. **Sort the failure.** Every flag falls into one of three buckets: **work-defect** (math/schema/evidence — the agent missed; fixable, resubmit), **deal-finding** (policy gate failed — the math is right, the rule says no; not a rework), **stack-fit** (model/compute below the lane — bigger brain, not a resubmit).

That's the entire engine doctrine.

## What you read next

- [What It Is](/defendableos/what-it-is/) — plain English · principal-grade.
- [What It Is NOT](/defendableos/what-it-is-not/) — disambiguation from generic AI SaaS, judge models, and Web3 token projects.
- [Rulebook Engine](/defendableos/rulebook-engine/) — how the referee actually works (deterministic checks, structured executor, math re-derivation, DSL gates, variable penalty).
- [Why Now](/defendableos/why-now/) — the market timing argument.
- [Buyer Profile](/defendableos/buyer-profile/) — the 5 personas + 8 verticals.
- [Use Cases](/defendableos/use-cases/) — what the platform actually does in production.
- [Pricing Philosophy](/defendableos/pricing-philosophy/) — trust infrastructure pricing.
- [Board Flight Sheet](/defendableos/board-flight-sheet/) — *(engagement-model doc · the CRE-broker pre-market plan, distinct from the eval Flight Sheets carried by DefendableCloud).*

***

🐝 *The engine runs the rulebook · to the shed.*
