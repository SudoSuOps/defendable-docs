---
title: Honey · Jelly · Propolis (severities)
description: The three severities the referee emits. Honey = no flags + approved. Jelly = noncritical flags. Propolis = any critical flag. Royal Jelly is a separate dataset-tier concept on DefendableLedger.
---

:::note[3 severities, not 4]
Earlier docs surfaced a 4-tier classification (HONEY · ROYAL_JELLY · JELLY · PROPOLIS) on Tribunal verdicts. That conflated two different ladders. The verdict ladder is **3 severities**; **Royal Jelly** is a *dataset-tier* concept used by [DefendableLedger / SwarmJelly](/defendableledger/royal-jelly-tiers/) to rank training pairs (Apex · Honey · Jelly · Pollen · Propolis), not a verdict severity.
:::

## The verdict ladder · 3 severities

| Severity | When the referee emits it |
|---|---|
| **honey** | No flags + human approved. |
| **jelly** | One or more mid- or low-tier flags; **no** high-tier flags. |
| **propolis** | **Any** high-tier flag present. |

Severity is **flag-driven**. The score (`score_100`) measures % of declared rules satisfied. Severity measures *which kind of flag was raised*. Both ride the receipt.

## What each severity implies

| Severity | Client-ready? | Recommended next move |
|---|---|---|
| **honey** | Yes | Approve · mint receipt · share. |
| **jelly** | Sometimes (depends on the lane's `human_approval_required` policy) | Review · likely approve with notes. |
| **propolis** | No | Route the flag by [three-bucket](/defendableos/rulebook-engine/#the-three-bucket-flag-taxonomy): work-defect → resubmit; deal-finding → report to client; stack-fit → upgrade conversation. |

## Why Royal Jelly is NOT a verdict tier

Royal Jelly is the [SwarmJelly dataset-tier system](/defendableledger/royal-jelly-tiers/) — every extracted training pair is routed to one of five tiers (Apex · Honey · Jelly · Pollen · Propolis) based on its grade. That ladder governs **corpus curation** — what training data lands where, for which downstream cook (specialist Hacks vs. SwarmFixer vs. breadth corpus).

The verdict ladder governs **per-Run severity** — whether this particular agent submission cleared the declared rulebook.

The two ladders share names (honey · jelly · propolis appear in both) but live in different domains. **Royal Jelly does not appear on a verdict.** It appears on training-pair routing decisions in the books-and-records lane.

## Severity threshold rules (locked)

These threshold rules are non-bypassable — the engine never lets an operator override them:

- A propolis flag **cannot** be promoted to jelly or honey.
- A jelly flag **cannot** be promoted to honey via "looks good."
- Honey requires **both** zero flags **and** human approval.

That is the V03 enforcement discipline. The doctrine survives because the thresholds are mechanical.

***

🐝 *Three severities. Flag-driven. Royal Jelly lives on the ledger. To the shed.*
