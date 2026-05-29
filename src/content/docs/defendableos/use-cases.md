---
title: Use Cases
description: The one real production flow today — the Defendable Run / eval flight-sheet lane ending in a hash-chained receipt — plus the roadmap rails it grows into.
---

## Scenario · an AI agent completes an eval assignment (shipped today)

This is the lane that is **live in production** at `api.defendablecloud.com` — the [Defendable Run](/defendablecloud/eval-lane/), executed by the [rulebook engine](/defendableos/rulebook-engine/). The primitive is: **Inputs → Evidence → Execution → Checks → Verdict → Approval → Receipt.**

| Step | What happens | Where |
|---|---|---|
| 1 | A **Flight Sheet** declares the rulebook for the lane (required output schema, math checks, evidence checks, policy DSL rules, penalty bands). 50 sheets loaded. | `GET /flight-sheets` |
| 2 | The agent's work is filed against a Run as a structured **submission** plus **evidence** (uploads are best-effort to Tigris). | `POST /runs`, `/runs/{id}/submission`, `/runs/{id}/evidence` |
| 3 | The **deterministic executor** runs: structure check, schema/type checks, **math re-derivation** of every calculation from its own inputs + formula via a safe AST evaluator, evidence presence, and the policy DSL gates. No model is called on the receipt path. | `app/executor.py`, `app/eval.py` |
| 4 | Every check **passes** or raises a **flag** with a tier (low/mid/high). Score = % of declared rules satisfied — not a quality opinion. | `/runs/{id}/checks`, `/runs/{id}/flags` |
| 5 | Flags roll up to a **verdict tier**: `honey` (pass · no/low flags), `jelly` (risk · mid flag), `propolis` (fail · high flag). | `/runs/{id}/verdict` |
| 6 | A human **approves**. The engine refuses to issue a receipt without approval. | `/runs/{id}/approve` |
| 7 | A **receipt** is minted into the per-org **hash chain**: `DCR-{org_seq}-{hex8}`, with `parent_hash` linking to the prior receipt and `receipt_sha256` over canonical JSON. The chain lives in Postgres; JSON+PDF artifact upload to Tigris is best-effort and never blocks the receipt. | `/runs/{id}/receipt`, `app/ledger.py` |
| 8 | Anyone can **verify** the chain: `/ledger/verify` recomputes each hash, checks sequential `org_seq`, and checks parent links. Tamper a stored payload and it flips `ok:false` and pinpoints the receipt. A share link (`/share/{token}` + `/pdf` + `/download`) lets a buyer's DD confirm it independently. | `/ledger/verify`, `/share/{token}` |

That is the real moat today: **math you can recompute, gates you can read aloud, a hash chain you can verify yourself.** *"We are math and code."*

:::note[Roadmap — where this is going · not yet built]
The scenarios below are the **vision** for the rest of the rails. They are positioning, not shipped behavior — none of these are deployed today. The [DefendableRouter](/defendablerouter/overview/) spine is real and CI-verified but runs locally (not a public endpoint); StreetChat, Tribunal-as-API, DDEED anchoring, SwarmFixer, and the Defend-A-Pedia vocabulary loop are roadmap.

**Client calls Mr. Defendable about a deal** — StreetChat captures and transcribes the call · a Communicator extracts canonical terms, directives, claims, and risk flags · the session is graded and receipted · pairs route to the training corpus.

**Vocabulary expansion** — StreetChat surfaces an unknown phrase · a Communicator proposes a canonical mapping · the founder reviews against the V03 voice validator · the term publishes to Defend-A-Pedia and the public vocabulary index.

**False-honey incident** — an agent produces output that sounds correct · the ruleset audit catches the failure · the verdict downgrades to propolis · the failure trace feeds SwarmFixer repair-pattern training · the lesson surfaces in a *Pain in the Shed* episode.
:::

***

🐝 *Inputs · checks · verdict · receipt. To the shed.*
