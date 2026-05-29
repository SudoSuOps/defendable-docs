---
title: Cost to Mint · Overview
description: What one trusted AI artifact actually costs end-to-end.
---

Everybody talks about intelligence. Nobody talks about what it costs to mint. Cost to Mint is the operator-grade accounting for that question: not "what did the model output," but "what did this trusted artifact cost end to end, in dollars and watts."

## The eight-component formula

Cost to mint sums eight real lines:

```
cost_to_mint =
    compute           # GPU hours × amortized owned-fleet rate (or rental)
  + human_review      # operator/curator time on the artifact
  + validator         # referee passes against the declared rulebook
  + storage           # object-storage footprint of the artifact + evidence
  + energy            # kWh drawn × electricity rate — energy IS the receipt
  + retries           # re-runs to reach a passing verdict
  + repair            # SwarmFixer effort on flagged output
  + deed_issuance     # anchoring the artifact to a public books-and-records trail
```

Each line is a separate sub-page in this section. The thesis: a trusted artifact is worth more than a raw inference, and the only way to defend that premium is to show the books. Human review usually dominates the total — and that's the honest tell that provenance, not raw token cost, is the moat.

:::note[Vision / roadmap framing]
Cost to Mint is the cost-of-intelligence VISION for the ecosystem — an economics model and a public-transparency goal, not a deployed metering pipeline. The figures on these pages are illustrative.

The "deed issuance" line — DDEED anchoring of artifacts to a public ledger — is **roadmap**, not a deployed pipeline. What IS live today is DefendableCloud (api.defendablecloud.com): the Defendable Run, the deterministic eval referee, and per-org **hash-chained verdict receipts**. Those receipts prove *what passed the rulebook* — they are not yet an end-to-end economics breakdown.
:::

***

🐝 *Operator-grade · books and records · to the shed.*
