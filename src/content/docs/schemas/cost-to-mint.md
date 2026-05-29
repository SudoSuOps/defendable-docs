---
title: Cost to Mint Schema
description: The per-artifact economics record · 9 cost dimensions + 2 comparisons. Canonical-shape / roadmap.
---

The **Cost to Mint** record is the economics readout for the
[Pain-in-the-Shed](/painintheshed/) "Cost to Mint" segment — the per-artifact
accounting of what a defendable asset actually cost to produce, in dollars.

:::note[Canonical-shape / roadmap]
This is a **declared economics schema**, not a deployed field on any receipt.
DefendableCloud receipts carry a single `compute_usd` transparency figure (on
cook receipts); the full Cost-to-Mint breakdown below is the canonical spec for
the show's published ledger, not a wired API field today.
:::

## Schema

```json
{
  "compute_usd": 0.0,
  "human_review_usd": 0.0,
  "validator_usd": 0.0,
  "storage_usd": 0.0,
  "energy_usd": 0.0,
  "retries_usd": 0.0,
  "repair_usd": 0.0,
  "deed_issuance_usd": 0.0,
  "total_usd": 0.0,

  "hyperscaler_equivalent_usd": 0.0,
  "human_only_equivalent_usd": 0.0
}
```

| Field | Type | What it carries |
|---|---|---|
| `compute_usd` | USD | GPU / inference cost. |
| `human_review_usd` | USD | Operator review time, costed. |
| `validator_usd` | USD | Referee / curator pass. |
| `storage_usd` | USD | Object-storage cost. |
| `energy_usd` | USD | Energy is the receipt. |
| `retries_usd` | USD | Cost of re-runs. |
| `repair_usd` | USD | SwarmFixer repair lift. |
| `deed_issuance_usd` | USD | Cost to seal + issue the record. |
| `total_usd` | USD | Sum of the eight inputs. |
| `hyperscaler_equivalent_usd` | USD | What the same artifact would cost on a hyperscaler. |
| `human_only_equivalent_usd` | USD | What the same artifact would cost human-only. |

## Reconciliation with the deed economics proof

The deed's `five_proofs.economics.cost_to_mint` carries a **reduced subset**
(`compute_usd`, `human_review_min`, `storage_kb`) — not the full eleven-field
record above. The Cost-to-Mint schema is the **complete** economics record; the
deed seals a trimmed pointer to it. (See [Deed Schema](/schemas/deed/).) When
the deed economics proof is wired, the canonical home is the full `*_usd` shape
above.

## Source of truth

The canonical home for the Cost-to-Mint segment spec is `brand/painintheshed`
in the `defend-A-pedia--vocabulary` repo (the show's published-ledger spec).

***

🐝 *Energy is the receipt · what did the run cost in dollars and watts · to the shed.*
