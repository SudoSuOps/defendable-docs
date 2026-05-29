---
title: Assignment Success
description: Under the referee, assignment success is not a vibe — it is every required declared rule satisfied with no high-tier flag. honey + pass + human-approved.
---

> *"Success isn't 'looks done.' Success is: every rule the owner declared got satisfied, and no game-changer flag is on the board."* — Mr. Defendable

## What "success" means under the rulebook

The referee does not judge whether the work *feels* finished. It applies the declared rulebook (the Flight Sheet) and checks one thing: **did every REQUIRED declared rule pass, with no high-tier flag raised?**

Concretely, an assignment is a success when all of these hold:

- **Required output fields present** — every field the sheet's `required_output_schema.required` lists is in the submission (`required_fields_present` passes).
- **Schema / structure intact** — declared `deterministic_checks` (type, value-in-set, required-keys on array items, expected value) all pass.
- **Math re-derivation within tolerance** — every calculation is recomputed from its own `inputs` + `formula` and lands inside the declared `penalty` band (no `≥ critical_rel` or high-dollar miss).
- **Declared policy gates pass** — every structured rule (the rule DSL — thresholds, cross-field, conditionals) the sheet declared evaluates `True`.
- **No high-tier flag** — nothing escalated to `high`, so the verdict severity is **honey**.

## Tied to the real verdict fields

Success maps to a specific verdict shape (see [Verdict JSON](/tribunal/verdict-json/)):

| Field | Success value |
|---|---|
| `outcome` | `pass` |
| `severity` | `honey` |
| `client_ready` | `"Yes"` (or `"Yes — minor notes only"` when only low-tier nits are present) |
| `risk_breakdown.high` | `[]` — empty |

A single **high**-tier flag flips `severity` to `propolis` and `outcome` to `fail` — that is *not* a success, no matter how complete the rest of the submission looks. Mid-tier flags land at `jelly` / `risk` — usable with limitations or after repair, but not a clean pass.

And the final gate: **a human still approves.** A receipt only mints on `decision='approved'`. Success under the books-and-records doctrine is *honey verdict + human approval*, not the machine score alone.

## Roadmap

:::note[Vision — not built into the live eval lane]
The earlier framing — *success = original intent re-translated through a **Communicator** round-trip, with failures auto-classified and routed to **SwarmFixer*** — is **roadmap, not current behavior**. The live eval lane does not run an intent round-trip or auto-route to a repair model. Today, success is the deterministic rulebook result above (required rules satisfied, no high flag, human-approved). The Communicator round-trip and SwarmFixer repair routing are on the roadmap and not wired into the deployed referee.
:::

***

🐝 *Operator-grade · books and records · to the shed.*
