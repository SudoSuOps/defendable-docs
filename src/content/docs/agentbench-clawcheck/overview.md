---
title: AgentBench / ClawCheck · Overview
description: Agent benchmarking and adversarial testing inside DefendableOS.
---

:::caution[Status — audited-prototype reality]
This page describes design intent for the DefendableOS ecosystem. In the current independently
audited prototype this capability is **ROADMAP / NOT YET IMPLEMENTED** as a public/production
service unless explicitly shown as fielded. The only fielded, Codex-audited surface today is the
controlled **synthetic** agent-operations demo — see [Field Proof v0.1](/field-release/overview/).
**NOT CLEARED FOR PRODUCTION · NOT CLEARED FOR EXTERNAL SAAS ENFORCEMENT.** SHA-256 hashes here
provide content-integrity linkage only — not signatures, owner approval, external attestation, or
blockchain anchoring.
:::


AgentBench and ClawCheck are the planned agent-testing surface of the DefendableOS
ecosystem. They are design intent, not a fielded service.

:::note[Roadmap]
The capability described below is not built or deployed. It is the intended shape of
the surface, documented honestly so the books and records show the plan, not a claim.
The live, hash-chained proof surface today is **DefendableCloud** — the Defendable Run
and its eval flight-sheet lane at `api.defendablecloud.com`.
:::

**AgentBench** is designed to let you submit an agent, run it against a standard
benchmark pack, and return a structured verdict. The verdict is planned to integrate
with the Tribunal roadmap (a declared rulebook applying flags, not a judge model) — it
will be a ruleset-audit outcome, never a quality opinion. **ClawCheck** is designed as
the adversarial-security companion: a set of CVE-sourced agent-security attack templates
and a structured defense pattern for exercising an agent under hostile inputs.

Until these land, the built analogue is the DefendableCloud verdict tiers
(honey = pass · jelly = risk · propolis = fail) and per-org hash-chained receipts.

***

🐝 *Operator-grade · books and records · to the shed.*
