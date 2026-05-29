---
title: Glossary
description: Every operator term you will encounter in DefendableDocs. Mr. Defendable vocabulary · CRE-broker lineage · plain-English definitions.
---

Plain-English definitions for every operator term used across DefendableDocs. Each term cross-references the deeded canonical entry in [Defend-A-Pedia](https://ledger.mrdefendable.com/defend-a-pedia) when one exists.

## Operator vocabulary

| Term | Meaning |
|---|---|
| **Ring ring** | The signature opener of every Mr. Defendable conversation · cold-open principal-call cadence. |
| **To the shed** | The signature close · means *deal is closed · no loose ends · execution discipline.* |
| **In the pit** | Actively executing operator work · grinding · hands on the keyboard or phone. |
| **Color on the asset** | Qualitative context · background · the things numbers don't capture. |
| **Make the dial** | Direct outreach · principal-to-principal call · not email · not chat. |
| **Books and records** | The permanent audit trail. CRE underwriting + securities law origin. NOT just audit logs. |
| **Bring the math** | Operator discipline · only ask with receipts · only count with numbers · never with feelings. |
| **Flight sheet** | Broker pre-market analysis. NOT a pitch deck. |
| **The deal pencils** | The math works · economics are sound · proceed. |
| **List to last** | Long-term hold · don't churn the listing · committed engagement. |
| **White-glove** | Boutique service · principal attention · concierge-grade. |
| **Class A 5-cap** | Premium asset · highest-quality mandate · top-tier discipline applies. |
| **STNL** | Single-Tenant Net-Lease · the CRE asset class. Implies institutional-grade lease durability. |
| **Probability of close** | Operator read on whether a deal actually closes · NOT a conversion rate. |
| **Deal energy** | Principal pre-meeting read · the temperature of a mandate. |

## DefendableOS doctrine

| Term | Meaning |
|---|---|
| **PASS doctrine** | Refuse fantasy mandates. Let competitors burn the seller. Come in clean after. |
| **MAGIC funnel** | Meetings · Appraisals · Genuine interest · Ink · Close. The operator sales funnel. |
| **RAVE** | Respect · Value · Appreciate Everyone. NOT soft · top 1% trained to win. |
| **Offense goes dark** | The market reality that drives DefendableOS: when AI offense fails, the business is offline and can't score. |
| **We take offense to the shed** | The brand-doctrine line · we understand offense but specialize in defense. |
| **My math is better than his** | The operator move · realize there is a better seat with different math · hunt that seat. |
| **The 6am-to-6pm raise** | The trap-pattern · more hours sold as a raise. Origin of PASS doctrine. |

## Tribunal vocabulary

| Term | Meaning |
|---|---|
| **Honey** | Verdict tier · pass — no flags (or only low-severity flags) and approved · ships. |
| **Jelly** | Verdict tier · risk — a mid-severity flag was raised · repair-candidate · routes to SwarmFixer (roadmap) for repair. |
| **Propolis** | Verdict tier · fail — a high-severity flag was raised · do not ship · root-cause and PASS. |
| **Score** | **% of declared rules satisfied** — NOT a quality score and NOT a judge model's opinion. The referee applies the declared rulebook and throws flags; the tier follows from flag severity. |
| **Royal Jelly** | The training-corpus tiering scheme (apex / honey / jelly / pollen / propolis) used to route extracted pairs. Tier follows from rules-satisfied + flag severity, not from a quality grade. |
| **Validator chain** *(referee / rulebook engine)* | The real deterministic rulebook engine the referee runs (`app/executor.py`): JSON-schema field checks · type checks · **math re-derivation of each calculation from its own inputs + formula** · a structured rule DSL. It applies a declared Flight Sheet and **throws flags** — it is not a judge model. *(A formalized critical-vs-advisory check taxonomy is roadmap; today severity is flag-driven.)* |
| **Assignment success** | Did the assignment satisfy its declared rules? Reported as flags-satisfied against the Flight Sheet. |
| **Assignment failure** | Documented failure modes per assignment. Fuel for SwarmFixer training (roadmap). |
| **Evidence strength** | A declared-rule input · color × source weight × freshness, where a Flight Sheet uses it. |
| **Risk temperature** | LOW / MEDIUM / HIGH · the deal-flow risk read. |
| **Validator confidence** | The share of declared rules satisfied for a run · derived from the rulebook engine's flags, not a model's confidence. |
| **False Honey** | The classic failure mode · output sounded smart but failed a declared rule · the referee flags it regardless of how confident it reads. |

## Repair and training vocabulary

| Term | Meaning |
|---|---|
| **SwarmFixer** | *(Roadmap)* The repair-intelligence layer · turns Jelly into Royal Jelly via repair training pairs. Not yet deployed. |
| **Repair lift** | The delta between pre-repair and post-repair rules-satisfied. |
| **Street pair** | The unit of operator-language training data · raw input → structured output. |
| **Communicator** | *(Roadmap)* The bidirectional human-meaning model · NOT a chatbot. Bookend translator. Vision surface, not yet built. |
| **Cost to mint** | What one trusted AI artifact actually costs end-to-end. |
| **Energy is the receipt** | The doctrine that power-draw IS proof of compute spent. |

## Vocabulary as infrastructure

| Term | Meaning |
|---|---|
| **DDEED** | A DefendableOS-issued deed. Pattern: `DDEED-{class}-{id}-v{N}`. |
| **DDEED-VOCAB** | Deed class for vocabulary terms. 62+ live in Defend-A-Pedia. |
| **DDEED-AWARD** | Deed class for an engagement award. Marks the start of a broker mandate. |
| **DDEED-CHAT** | Deed class for a StreetChat session. Includes 5 Proofs over the conversation. |
| **DDEED-MEDIA-POST** | Deed class for a long-form blog post. |
| **DDEED-MEDIA-POD** | Deed class for a podcast episode. |
| **DDEED-FOUNDER-ORIGIN** | Deed class for founder/principal origin stories. |
| **5 Proofs** | Origin · Quality · Process · Economics · Trust. Every deed has all five. |
| **Books-record ENS** | The ENS path that anchors a class of records: `streetledger.eth/...`. |
| **Canon** | The deeded vocabulary canon at `defendapedia.eth`. |

## Rails and surfaces

:::note[What's built vs roadmap in this section]
Only two of these are real today: **DefendableCloud** (live at api.defendablecloud.com — the referee, the Defendable Run, and per-org hash-chained receipts) and the **DefendableRouter v0.1** spine (local, CI-verified, **not publicly deployed**, with **local JSONL checksummed receipts — not hash-chained**). The Communicator, Tribunal-as-a-separate-rail, StreetChat, StreetLedger, and Defend-A-Pedia surfaces below are **vision surfaces, not yet deployed**. The `.eth` names are read-mirrors, not anchors.
:::

| Term | Meaning |
|---|---|
| **DefendableRouter** | Intake + receipt-write spine · v0.1, local + CI-verified, **not publicly deployed**. Receipts are local JSONL with `checksum_sha256` (checksummed, not hash-chained). |
| **Communicator LLM** | *(Roadmap)* The meaning layer. Not yet built. |
| **Tribunal / Referee** | The rulebook engine that applies declared rules and throws flags. Live **inside DefendableCloud**; as a standalone routed rail it is roadmap. **Not a judge model.** |
| **Object Storage** | Durable storage of receipts/deeds/transcripts (Tigris on the live Cloud). |
| **DDEED** | *(Roadmap)* The trust-deed format for published records. |
| **StreetLedger** | *(Roadmap / legacy)* Public proof surface · `ledger.mrdefendable.com`. Not a live anchor. |
| **StreetChat** | *(Roadmap)* Live capture surface · `chat.mrdefendable.com`. Not yet deployed. |
| **Defend-A-Pedia** | *(Roadmap)* Vocabulary canon · read-mirrored at `defendapedia.eth`. The `.eth` name is a read-mirror, not an anchor. |
| **Mr. Defendable** | The FACE layer at mrdefendable.com. |

## CRE-broker engagement vocabulary

| Term | Meaning |
|---|---|
| **Disposition assignment** | Owner is selling an asset. Broker is the listing rep. Commission at closing. |
| **Listing rep** | The exclusive broker on a listing. Fiduciary duty to the seller. |
| **Rep agreement** | The executable agreement that defines commission · exclusivity · tail · marketing budget. |
| **Exclusivity period** | 12-month standard. Owner does not list with other brokers. |
| **Tail / protection period** | 12 months post-expiration. Commission applies if buyer was procured during exclusivity. |
| **Commission floor / cap** | Min and max commission · justifies broker pre-listing investment / caps owner exposure. |
| **Marketing budget allowance** | $50K cap · out-of-pocket only · NOT build costs. |
| **1031 exchange** | Tax-deferred reinvestment of real estate sale proceeds. 45-day ID · 180-day close. |
| **Qualified Intermediary (QI)** | Third-party escrow agent required for 1031 · cannot receive proceeds directly. |
| **DST / TIC** | Delaware Statutory Trust / Tenant-in-Common · fractional 1031 backup vehicles. |

***

🐝 *Operator-grade vocabulary · books and records · plain English · to the shed.*

Full deeded canon: **[defendapedia.eth](https://ledger.mrdefendable.com/defend-a-pedia)** · 62+ DDEED-VOCAB terms publicly verifiable.
