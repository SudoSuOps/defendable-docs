# POSITIONING-CANON.md

**The locked, consistent way every repo in the Defendable / Swarm & Bee house presents itself.**

Status: **CANONICAL** · Owner: Mr. Defendable (`minechain@proton.me`) · Last locked: 2026-05-31

This file is the single source of truth for positioning. If a repo's README, site copy, or
package description contradicts this file, **this file wins** — open a PR to reconcile the repo,
not this canon. When in doubt: *math and code, no blackbox, no fake claims.*

---

## 1. The Canonical Thesis

### Thesis line (one sentence — use verbatim)

> **Defendable is Proof of Execution for agentic work: every AI run becomes a verifiable trail of inputs, evidence, checks, verdicts, approvals, and hash-anchored receipts — with a human owner in final authority.**

### Elevator paragraph (use for "about" sections, decks, and the first paragraph of ECOSYSTEM.md)

> The AI "trust-me-bro" era is over. Defendable turns agentic work into evidence you can
> independently verify. An agent's run is tested against a **declared rulebook** — not judged
> by another AI — and the referee throws flags where the rules aren't met. Every run produces a
> **receipt**: a checksummed, hash-chained record with the math shown and the artifact stored.
> **DefendableOS** is the engine (Proof of Execution). **DefendableCloud** is the hosted operating
> layer where work is run, proven, and kept. **DefendableRouter** is the spine that gates members,
> brokers datasets, meters compute, and routes jobs. **DefendableLedger** is the canonical
> books-and-records surface. The whole stack is sovereign, in-house, and inspectable — you verify
> 1 + 1 = 2 yourself, you don't take our word for it.

---

## 2. Locked Product Taxonomy

Each product has **one** role and **one** one-liner. Do not re-describe a product in a way that
overlaps another product's mandate. The cardinal rule: **only DefendableCloud, DefendableRouter,
DefendableLedger, and the dataset/cook surfaces MINT receipts. The site/visibility/docs/graph
surfaces DISPLAY or EXPLAIN them.**

| Product | Brand role | Mints receipts? | Canonical one-liner |
|---|---|---|---|
| **DefendableOS** | SYSTEM / ENGINE | No (engine spec; surfaced via Cloud) | Proof of Execution for agentic work — the engine that turns AI runs into verifiable execution trails against a declared rulebook. |
| **DefendableCloud** | Operating layer | **Yes** (hash-chained, per-org) | The hosted proof vault — upload work, run checks, issue proof, store the artifact; mints hash-chained receipts for agent work, datasets, compute, and model pins. |
| **DefendableRouter** | SPINE | **Yes** (hash-chained, JSONL) | The operational spine — member gate, dataset broker, compute meter, and job router that mints the first-boundary receipts. |
| **DefendableLedger** | LEDGER | **Yes** (canonical minter) | The cracked ledger — the canonical, sovereign, hash-verifiable books-and-records surface for every receipt, verdict, training pair, and deed. |
| **DefendableGraph** | Product (proof graph) | No (projects/mirrors) | The living proof graph — connects agents, models, workers, datasets, verdicts, receipts, and deeds into one inspectable system of record. |
| **DefendableDash** | Product (visibility) | No (reads/verifies) | The enterprise visibility surface — watch cooks run live, verify hash chains on demand, inspect fleet telemetry; the math re-derived, no blackbox. |
| **DefendableDocs** | Product (docs) | No (documents schemas) | The operating manual — canonical reference for the OS engine, the Cloud vault, and every receipt schema. |
| **DefendableDatasets** | Product (data) | **Yes** (checksummed, Quality Foundry) | Open datasets with receipts — a static-first registry and quality foundry; no proof, no honey. |
| **OpenDefendable** | Open standards layer | No (**owns** the standard; reference impl + examples only, does not mint in production) | The open standards and community layer — public receipt schemas, worker contracts, and proof-of-execution patterns teams can inspect, implement, and improve in public. Home of the canonical `defendable.receipt/v1` spec + reference adapter. |
| **Defendable-Gold-Cooks** | Cook ledger (private) | **Yes** (checksummed) | The canonical cook ledger — reproducible ML recipes plus honest receipts for every Defendable model fine-tune. |

### Brand-stack layers (the human-facing surfaces)

| Layer | Domain | Repo | One-liner |
|---|---|---|---|
| FACE | mrdefendable.com | `mr-defendable` | The principal's voice. |
| SYSTEM | defendableos.com | `defendable-os-v2` | The engine: Proof of Execution. |
| LEDGER | defendableledger.com | `defendable-ledger` | The canonical books-and-records. |
| MEDIA | painintheshed.com | `pain-in-the-shed` | The cost-of-intelligence podcast. |
| CULTURE | offensetotheshed.com | `offensetotheshed` | Operator war-room notes. |

---

## 3. README HEADER TEMPLATE (every repo must adopt)

Paste this block at the top of every repo's `README.md`, filled in. Keep the badge line, the
one-liner, the ecosystem link, and the honest status. **Do not invent status — match reality.**

```markdown
<!-- DEFENDABLE CANON HEADER — keep in sync with POSITIONING-CANON.md -->

# <Product Name>

![status](https://img.shields.io/badge/status-<LIVE|ROADMAP|READY__WITH__LIMITATIONS|SUPERSEDED>-<green|blue|orange|lightgrey>)
![receipts](https://img.shields.io/badge/receipts-<hash--chained|checksummed|displays|documents|none>-blue)
![blackbox](https://img.shields.io/badge/blackbox-none-black)

> **<One canonical one-liner from POSITIONING-CANON.md §2 — exact text.>**

Part of the **Defendable ecosystem** → [ECOSYSTEM.md](./ECOSYSTEM.md) · [defendabledocs.com](https://defendabledocs.com)

**Status:** <LIVE on `<domain>` | ROADMAP | READY_WITH_LIMITATIONS — production NOT cleared>
**Role:** <SYSTEM | operating layer | SPINE | LEDGER | product | open standards | cook ledger>
**Receipts:** <mints hash-chained | mints checksummed | displays (does not mint) | documents | none>
**Supersedes / Superseded by:** <repo name or "none">

---
```

**Rules for the header:**
- The one-liner MUST be copied verbatim from §2. No bespoke rewording per repo.
- The `receipts` badge MUST be honest: `displays` for Graph/Dash, `documents` for Docs,
  `standard` for OpenDefendable (owns the spec, doesn't mint in prod), `none` for marketing-only
  sites (e.g. `defendable-os-v2`), `hash-chained` for Cloud / Router / Ledger, `checksummed` for
  Datasets / Gold-Cooks. (Field-name unification: all chained minters converge on
  `defendable.receipt/v1` per `open-defendable/RECEIPT-SCHEMA.md` — §5(3) drift is being closed.)
- Every repo MUST link to `ECOSYSTEM.md` (a per-repo copy or symlink of the taxonomy table in §2).
- Status MUST distinguish LIVE from ROADMAP from READY_WITH_LIMITATIONS. Never label roadmap
  work as live.

---

## 4. Language Rules (from doctrine — non-negotiable)

These are locked operator doctrines. Violating them is a positioning bug.

### 4.1 We are math and code — not a judge model
- **DO** say: "tested against a declared rulebook," "math re-derived," "verify it yourself."
- **DON'T** say: "AI judges quality," "our model scores your work," "quality grade."
- A score is **% of declared rules satisfied** — never a quality opinion.

### 4.2 Referee / rulebook — not AI judging AI
- The referee applies a declared **Flight Sheet** rulebook and throws **flags**. Like a football
  ref: applies rules, throws flags; never invents, never opines.
- **DO** say: "ruleset audit," "unsupported-claim flagging," "client-readiness checklist."
- **DON'T** say: "AI judge," "hallucination detection," "judgment." Model help is **advisory only,
  never proof**.
- Verdict tiers are flag-driven: **propolis** = critical flag, **jelly** = non-critical flag,
  **honey** = no flags + approved. (Note the §5 collision warning below.)

### 4.3 No blackbox — everything visible
- "Everything we cook and do will be visible. We can no longer work in a black-box. The AI
  trust-me-bro is over." Every number is drillable; every receipt is independently re-derivable
  client-side. Reject LLM-as-judge and SaaS-only observability where a deterministic check works.

### 4.4 No fake claims — honest ledgers only
- Never claim production-ready, certified, insured, anchored, or audited without explicit clearance.
- SHA-256 checksums establish **content-integrity linkage only** — they do NOT prove authorship,
  owner approval, certification, insurance, blockchain anchoring, or production clearance. Say so.
- Mark roadmap as roadmap. Mark READY_WITH_LIMITATIONS honestly. "No proof, no honey."

### 4.5 Sovereign in-house — kill external extraction
- Datasets hash in-house; DefendableLedger is the anchor. **Hedera is killed from the spine**
  (kill-hedera doctrine, 2026-05-24). Any repo still anchoring to Hedera HCS is OUT OF CANON.

---

## 5. Worst Current Positioning Inconsistencies (flagged for repair)

Ranked by blast radius. These contradict the canon above and must be reconciled.

1. **HEDERA STILL ON THE SPINE (doctrine violation — highest priority).**
   `swarmandbee-app` and `swarmchain` both still anchor receipts to **Hedera HCS topic
   0.0.10291838** as a "defensibility-grade third-party ledger." This directly violates §4.5
   (kill-hedera, hash in-house, DefendableLedger is the anchor). DefendableDocs already marks
   Hedera as "kill-hedera doctrine." **Fix:** route these receipts to DefendableLedger; demote
   any Hedera reference to legacy/archived.

2. **VERDICT-TIER vs RULE-SEVERITY NAME COLLISION (honey/jelly/propolis used for two things).**
   The same three words name (a) referee **verdict severities** (no-flag / non-critical / critical
   — `defendable-cloud-v2`, `defendable-dash` flight sheets) AND (b) **dataset/cook quality tiers**
   (royal_jelly/honey/jelly/pollen/propolis scored 0–100 — `defendable-datasets`,
   `Defendable-Gold-Cooks`, `swarmchain`). These are semantically opposite systems (flags vs.
   quality) sharing a vocabulary, which collides head-on with §4.1/§4.2 ("score is rules-satisfied,
   not quality"). **Fix:** publish a canonical glossary that disambiguates *verdict severity* from
   *Royal Jelly quality tier*, and never let a quality tier leak into referee copy.

3. **RECEIPT FIELD-NAME DRIFT ACROSS THE STACK (`receipt_sha256` vs `checksum_sha256` vs
   `receipt_hash`).** Cloud/Graph/Dash use `receipt_sha256`; Router/Ledger/OpenDefendable use
   `checksum_sha256`; the dos-cli and cook engines drift between `receipt_hash` and
   `receipt_sha256`. Same semantic, three field names — undermines the "one verifiable system of
   record" promise. **Fix:** OpenDefendable owns the canonical field name; all minters conform or
   publish an explicit alias map.

4. **"PROOF OF VALUE" GHOST POSITIONING (stale market promise).** The superseded `defendable`
   and `defendableos` repos still say "Proof of Value / evidence-backed valuation," fundamentally
   different from the locked "Proof of Execution." `defendable-os-v2` is correct. **Fix:** archive
   the old repos after confirming CF Pages points at v2; never let "Proof of Value" surface again.

5. **MIXED VERIFICATION MESSAGING IN ONE REPO (`defendable-router`).** Public `README.md` says
   "local source demo only, not yet independently verified" while `README.backend.md` says
   "E2E-verified 2026-05-29, 26 pytests, tamper test passed." Plus a second receipt implementation
   in `spine/` (Tribunal/DDEED stubs, different author persona "Mr. Defendable" vs "DefendableCloud").
   This reads as the repo not knowing its own status. **Fix:** one status statement; clearly label
   `spine/` as out-of-tree design-intent, not shipped.

6. **CANONICAL-LEDGER OWNERSHIP IS SPLIT (Router vs Ledger vs SwarmChain all "mint").**
   DefendableRouter mints hash-chained JSONL receipts, DefendableLedger calls itself "the
   production minter of DefendableOS proof records," and SwarmChain mints Merkle-rooted deeds.
   §2 says Router mints first-boundary receipts and Ledger is the canonical books-and-records
   surface — but the data shows three independent minters with no published flow-of-record.
   **Fix:** document the canonical pipeline (Router mints → publishes to Ledger → Graph/Dash
   display) and label SwarmChain's Merkle/Hedera path as legacy validation, superseded by the
   in-house Ledger.

7. **GRAPH vs DASH SCOPE BLUR.** `defendable-graph` (proof-chain visualization) and
   `defendable-dash` (enterprise observability) both present as "the visibility surface" with no
   stated supersession. §2 separates them (Graph = entity-relationship proof graph; Dash =
   live cook/ledger/fleet command center). **Fix:** adopt the §2 one-liners verbatim so the
   scopes stop overlapping in copy.

8. **BRAND DRIFT IN `swarmandbee-app` (CRE firm vs CCIR bakery vs multi-vertical).** README says
   "AI-native CRE Capital Markets firm" and forbids medical/legal/aviation, yet the codebase ships
   Medical, Legal, LegalSniper, and DefendableOS umbrella pages, and the public surfaces lean into
   "Commercial Compute Intelligence Refinery." Living evolution the README hasn't caught up to.
   **Fix:** update README to the actual multi-surface reality; pick the apex one-liner and hold it.

9. **REPO-NAME vs LOCAL-DIR DIVERGENCE (second-source-of-truth risk).** `mr-defendable` ↔
   `mrdefendable`, `offensetotheshed` ↔ `offense-to-the-shed`, `street-ledger` ↔ `streetledger`,
   `defendable-os-v2` ↔ `defendableos-site`, `defendable-dos-cli` ↔ `defendable-dos-cli-work`.
   Not true dups, but a divergent-source hazard. **Fix:** reconcile local checkout names to repo
   names, especially the FACE repo `mr-defendable`.

---

## 6. Adoption Checklist (per repo)

- [ ] README starts with the §3 header template, filled in honestly.
- [ ] One-liner copied verbatim from §2 (no bespoke rewording).
- [ ] `receipts` badge matches actual behavior (mint vs display vs document vs none).
- [ ] `ECOSYSTEM.md` present and linked.
- [ ] No "Proof of Value," no "AI judge," no "hallucination detection," no "quality grade."
- [ ] No Hedera anchoring claimed as live (kill-hedera doctrine).
- [ ] Roadmap explicitly labeled roadmap; READY_WITH_LIMITATIONS stated where true.
- [ ] SHA-256 disclaimer present where receipts are minted (content-integrity only).
- [ ] Canonical receipt field name (or published alias map) used.

---

*math and code · referee not judge · no blackbox · no fake claims · sovereign in-house*
