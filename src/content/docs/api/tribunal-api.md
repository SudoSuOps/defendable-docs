---
title: Tribunal API
description: Tribunal-as-API is roadmap. The real grading lane today is the DefendableCloud eval flight-sheet run.
---

:::note[Roadmap]
A standalone, public Tribunal-as-API is **vision, not yet built**. There is no `/v1/tribunal/*`
endpoint and there is no judge-model grading service to call. What exists *today* — and what you
should use — is the eval flight-sheet lane inside the live DefendableCloud Defendable Run.
:::

## The real grading lane (live at `api.defendablecloud.com`)

The eval lane runs against a declared flight sheet (50 sheets loaded) through the Defendable Run.
No `/v1` prefix:

- `POST /runs` — open a run on the eval flight-sheet lane.
- `POST /runs/{id}/submission` — attach the agent submission to be audited.
- `POST /runs/{id}/audit` — run the deterministic executor / ruleset audit over the submission.
- `GET /runs/{id}/checks` — the deterministic check results.
- `GET /runs/{id}/flags` — the flags the referee threw.
- `GET /runs/{id}/verdict` — the verdict tier.
- `POST /runs/{id}/approve` — operator approval.
- `POST /runs/{id}/receipt` — mint the receipt (no `GET` variant; read it via `/share/{token}` or `/receipts/recent`).

## We are math and code — the referee is a rulebook, not a judge

The eval lane uses a **deterministic executor** (`app/executor.py`): JSON-schema field checks, type
checks, MATH re-derivation of each calculation from its own inputs and formula, and a structured
rule DSL. The referee applies a *declared rulebook* — the flight sheet — and throws **flags**. It
is **not** a judge model. It never renders a quality opinion. Like a football referee: it applies
the rules and throws flags; it does not invent or opine.

Verdict tiers:

- **honey** — pass (no/low flags).
- **jelly** — risk (a mid-severity flag).
- **propolis** — fail (a high-severity flag).

The verdict, the flags, and the approval all roll into the receipt — see the Receipts API.

***

🐝 *Operator-grade · books and records · to the shed.*
