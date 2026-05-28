---
title: What DefendableOS Is
description: Plain-English principal-grade definition of DefendableOS — the engine that verifies agentic work against a declared rulebook.
---

## In one sentence

DefendableOS is the engine that verifies agentic work against a declared rulebook, and runs the referee that throws flags when rules are violated — deterministic, math-and-code, never a judge model.

## In one paragraph

Every piece of agentic work that flows through the platform is tested against a **Flight Sheet** — a versioned, declared rulebook carried by [DefendableCloud](/defendablecloud/overview/). The engine consumes the Flight Sheet plus the agent's structured submission and applies the rules deterministically: structure checks, schema validation, math re-derivation (the engine recomputes every claimed number from the agent's own inputs), evidence requirements, and policy gates expressed in a small machine-precise DSL. Each rule passes or raises a flag with a tier (low/mid/high) and severity (honey/jelly/propolis). A human approves. [DefendableCloud](/defendablecloud/overview/) mints a hash-chained **Receipt** — JSON + PDF + public share link, verifiable client-side. Anything classified as a *work-defect* loops back to the agent for correction; *deal-findings* go to the client (the policy says no); *stack-fit* flags go to the operator (bigger model, bigger compute, different lane).

## What that gets the business

- **Audit trail** every AI decision has — receipt per Run, hash chain per org.
- **Repair path** for every failure mode — flags map to one of three buckets, each with a different response.
- **Books and records** that survive a court · a board · a regulator — declared rules + recomputed math beat *"the model said so"* every time.
- **Buyer-ready disposition asset** if the business ever sells — the receipts are the books.

## What the engine refuses to do

- **Grade by opinion.** No 1-100 quality dial. No "seems good." Score = % of declared rules satisfied.
- **Use a judge model on the receipt path.** Model help is advisory only, clearly separated, never on the chain.
- **Skip declared checks silently.** If a Flight Sheet declares a check the engine doesn't implement, the engine refuses to run. A silently-skipped check is a false honey.
- **Anchor on someone else's chain.** Trust compounds inside the house. The per-org hash chain is the trust layer. See the [Kill Hedera doctrine](/defendableledger/kill-hedera/).

## The "Validate the Validator · Prove the Location" tagline

That phrase IS the engine. The validator is the AI agent doing the work. The platform validates the validator (Flight Sheet → Referee → flags → receipt). The location is the per-org hash chain — the books and records that survive scrutiny.

***

🐝 *The referee is a rulebook. Math and code. To the shed.*
