---
title: How DefendableCloud Works
description: The Defendable Run lifecycle from project creation to public receipt verification.
---

DefendableCloud is built around an append-only proof workflow.

## Lifecycle

1. **Authenticate**

   Users sign in with magic-link auth. Organizations can manage members, invites, owner/member roles, and API keys.

2. **Create a Project**

   A project groups Runs for one client, workflow, dataset, cook, or operating lane.

3. **Create a Run**

   A Run declares the flight sheet or lane that will judge the work.

4. **Attach Evidence**

   Evidence can be a note, URL, observation, tool output, model output, log, or file upload. Uploaded files are hashed and stored through object storage.

5. **Attach Submission**

   The agent or operator submits the output to be checked.

6. **Run the Rulebook**

   DefendableCloud applies deterministic checks from the selected flight sheet. Checks create pass/warn/fail findings.

7. **Mint Verdict**

   The verdict summarizes severity and tier. Current tiers map to the Defendable quality language: honey, jelly, and propolis.

8. **Approve or Reject**

   A human approval gate records whether the work is approved, rejected, or escalated.

9. **Generate Receipt**

   The receipt payload is canonicalized, hashed, linked to the prior org receipt, rendered as JSON/PDF, and exposed through a redacted public share view.

10. **Verify**

    Public parties verify the hash, parent linkage, receipt metadata, and public projection without access to private object keys.

## Receipt Chain

Each organization has a hash-chained ledger. A receipt records:

- run or asset id
- payload hash
- receipt hash
- parent receipt hash
- public share token
- created timestamp
- receipt kind

The public ledger verification endpoint walks the chain and reports broken parent linkage or hash mismatches.

## Where Determinism Matters

The platform does not rely on a model saying “looks good.” Checks are deterministic where possible:

- required evidence exists
- file hashes match
- required fields are present
- numeric formulas evaluate correctly
- approval gates are closed
- public projections redact private fields
- dataset download grants honor quota and membership state

LLMs can prepare or review work, but the receipt is only defendable when the rulebook can explain what it checked.

## Data Boundaries

Private data stays inside authenticated API surfaces and object storage. Public share pages are deliberately smaller:

- no raw storage keys
- no internal principal ids
- no private staging paths
- no full dataset package dump unless the route is explicitly a signed download grant

