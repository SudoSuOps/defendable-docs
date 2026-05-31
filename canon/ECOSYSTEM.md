# The Defendable House — Ecosystem Map

> The single canonical map of the Defendable ecosystem. If you have five minutes, read the Thesis and the Live-Canonical Repos table. Everything else is detail for builders and auditors.
>
> Last reconciled: 2026-05-31 · Org: `SudoSuOps` / Swarm & Bee LLC

---

## 1. The Thesis

**DefendableOS is the engine; DefendableCloud is the operating layer.** DefendableOS turns an AI run into a verifiable execution trail — inputs, tools, evidence, checks, approvals, verdicts, and receipts — with a human owner kept in final authority. We call this **Proof of Execution**. DefendableCloud is the hosted layer that operates that engine: you upload agent work (or a dataset, or a compute job), it runs the declared rulebook, issues a hash-chained receipt, and stores the artifact in a proof vault. The house doctrine is **"we are math and code, we don't judge"** — the referee applies a declared rulebook and throws flags (like a football ref); it never opinion-grades and never asks you to trust a black-box model. Every number is meant to be re-derived by the recipient. Around that engine + operating layer sits a ring of surfaces — a router (the gate/meter/spine), a ledger (canonical books-and-records), a graph (the proof network), a dashboard (visibility), datasets, docs, an open-standards layer, and a cook ledger (reproducible model recipes) — all minting or verifying receipts onto one compounding trust layer.

---

## 2. Live-Canonical Repos

These are the repos that are LIVE and CANONICAL. Touch these; do not touch their superseded ancestors (Section 3).

| Repo | Role | Domain | Tech | Receipts |
|---|---|---|---|---|
| **defendable-os-v2** | SYSTEM brand anchor / marketing site — "Proof of Execution" | `defendableos.com` | Astro 5 · Tailwind · CF Pages + Functions · Resend | None minted (marketing site; describes receipts conceptually) |
| **defendable-cloud-v2** | DefendableCloud — hosted proof vault; mints hash-chained receipts for agent work, datasets, compute, model pins | `defendablecloud.com`, `api.*`, `app.*` | FastAPI · asyncpg · Postgres · SQLAlchemy 2 · Tigris (S3) · Stripe · FPDF2 · React/Vite (app) · Astro (site) | **Hash-chained**, per-org `(org_seq + parent_hash + receipt_sha256)`, SHA-256, 6 schemas (receipt/cook/eval/incident/dataset-download/model-pin v1), JSON + PDF |
| **defendable-router** | SPINE — member gate · dataset broker · compute meter · job router · receipt ledger; v0.2 worker contract | `defendablerouter.com` | Python 3.11 · FastAPI · SQLAlchemy · Pydantic · Typer · SQLite (Postgres planned) · React/Vite (site) | **Hash-chained** JSONL, `seq + parent_hash → checksum_sha256`, genesis = 64 zeros; types: membership, dataset_access, compute_quote, compute_job, fine_tune_job (+ worker lifecycle). Verify via `GET /receipts/verify` |
| **defendable-ledger** | LEDGER — canonical public books-and-records; receipts, verdicts, training pairs, deeds | `defendableledger.com` | Vite · React 18 · TS · Tailwind · WebCrypto SHA-256 (client-side) · CF Pages | **Hash-chained** append-only, dual-hash (`canonical_receipt_sha256` + `receipt_sha256`), `parent_hash` links; record types RECEIPT / VERDICT / PAIR / AUDIT / REG-SAM. ~82 records indexed |
| **defendable-dash** | Visibility surface — watch cooks, verify ledgers, fleet telemetry. "The blackbox days are over." | `defendabledash.com` | Next.js 15 · React 19 · Tailwind · CF Pages/Workers · Recharts | **Reads/verifies** dual chains (Cloud org chain + optional sovereign Router chain via CF Tunnel). On-demand `/ledger/verify`; never fabricates |
| **defendable-graph** | Living proof graph — agents, models, datasets, workers, verdicts, receipts, deeds as an inspectable network | `defendablegraph.com` (`defendable-graph.pages.dev`) | Next.js 15 · React 19 · React Flow · Prisma · CF Pages (nodejs_compat) | **Displays only** (pull-only). Fetches `/receipts/recent` + `/datasets/catalog` from Cloud; projects receipts to graph nodes. Daily 06:00 UTC catalog snapshot |
| **defendable-docs** | Operating manual + canonical schema/receipt reference for OS + Cloud | `defendabledocs.com`, `docs.defendableos.com` | Astro 5 · Starlight 0.30 · CF Pages | **Documents only** (no minting). Canonical schema definitions for Cloud and Router receipts (both **hash-chained** — see `open-defendable/RECEIPT-SCHEMA.md`) |
| **defendable-datasets** | Open datasets with receipts + Quality Foundry (ingest→validate→dedupe→grade→split→manifest→export) | `defendabledatasets.com` | Next.js 16 · React 19 · React Flow · CF Pages/Workers · Python Quality Foundry (Typer/Pydantic) | **Checksummed** per-stage JSON receipts (SHA-256, file + content level). Royal Jelly tiers (royal_jelly/honey/jelly/propolis). "No proof, no honey." |
| **open-defendable** | Open standards + community layer — receipt schemas, worker contracts, policy packs, conformance | `opendefendable.com` | Vite · React 18 · TS · Tailwind · CF Pages | **Checksummed** schema-based, `defendable-receipt-v0.1`, SHA-256 over canonical JSON (ex-checksum field). Explicitly content-integrity only — not authorship/anchoring/certification |
| **defendable-dos-cli** | Spec→engine bridge — runs Kimi governance specs through 4 audited DefendableOS engines, manifests their receipts | n/a (CLI, GitHub-only) | Python 3 · argparse · PyYAML · bash subprocess · SHA-256 | **Checksummed** `dos_run_manifest`, `manifest_hash` over canonical JSON. Status: READY_WITH_LIMITATIONS · PRODUCTION NOT_CLEARED · CLIENT_USE HOLD |
| **Defendable-Gold-Cooks** | Canonical cook ledger — reproducible ML recipes + honest receipts for every model fine-tune | `defendabledash.com` (telemetry → `/tune`) | Python · Unsloth · transformers · TRL · peft · Qwen3.5 (4B/9B/27B) · vLLM/ollama/GGUF | **Checksummed** corpus (`train_sha256`/`eval_sha256`); RECIPE.md = canary + cook + beat-base A/B receipts; JellyScore tiers. PRIVATE. "Moving forward this is the truth." |
| **swarmandbee-app** | Apex brand orchestrator SPA — 15+ subdomains (firm, bakery/CCIR, edge, legal, family office) | `swarmandbee.ai` (+ ~20 subdomains), `defendable.eth.limo` | Vite · React 18 · TS · CF Pages/Workers/Functions · FastAPI shim (NAS) · Resend · Stripe · IPFS · Hedera HCS | **Checksummed + Hedera-anchored**, SHA-256 (Web Crypto) on order/bundle payloads, optional HCS anchor (topic `0.0.10291838`), settlement proof rail (Stripe/USDC/BTC) |
| **swarmchain** | Sovereign AI validation + deed recording — judges/scores/seals training pairs, Merkle-roots to Hedera | `swarmchain.eth(.limo)`, `swarmandbee.ai` | Python · FastAPI · Click · SQLAlchemy/Postgres · Qwen/Gemma judges · Hedera HCS · Redis · Docker · React (Glass Wall) | **Merkle-rooted** titled deeds (`receipts.jsonl`), SHA-256 leaves → root every 50 blocks → Hedera HCS topic `0.0.10291838`. Tiers honey/royal-jelly/propolis |
| **virgin-jelly** | Canonical grader — **JellyScorer** (crown jewel) | n/a (grader pkg) | Python (royal_jelly protocol) | Produces `JellyScoreResult` (score/tier/gates/fingerprint). Supersedes all LLM-as-judge graders |
| **mr-defendable** | FACE layer — principal-voice site | `mrdefendable.com` | static site · CF Pages | None |
| **pain-in-the-shed** | MEDIA layer — cost-of-intelligence podcast | `painintheshed.com` | static site · CF Pages | None |
| **offensetotheshed** | CULTURE layer — operator blog / war-room notes | `offensetotheshed.com` | static site · CF Pages | None |
| **defend-A-pedia--vocabulary** | Language constitution of DefendableOS — feeds StreetLedger/StreetChat | n/a (vocabulary) | static/data | None (vocabulary corpus) |
| **street-chat** | StreetChat — live street-language intake rail (record→unpack→map→tribunal→deed→train) | n/a (intake rail) | — | Feeds ledger/tribunal downstream |
| **defendable-brand** | Brand assets — gold-shield mark family | n/a (assets) | static assets | None |
| **defendable-apps** | DefendableApps — edge AI agents (Jetson-class) that escalate to Cloud | n/a (edge agents) | edge runtime | Escalates to Cloud for receipts |
| **sigedge-defense** | Edge defense rail — field intake, flag-spotter, canary; injects synthetic edge cases, feeds the propolis corpus → SwarmFixer | n/a (Jetson `192.168.0.79`) | Python · ollama (swarm-marketer) · cron | Flags `propolis`/`FAILED`/low-score records → intake spine; flagged records become training corpus |

> **Receipt vocabulary, honestly:** "Hash-chained" (Cloud, Router, Ledger) means each receipt links to the prior one via `parent_hash`, so tampering is detectable by walking the chain. "Checksummed" (Datasets, OpenDefendable, dos-cli, Gold-Cooks, swarmandbee-app) means each artifact carries a SHA-256 of its own canonical JSON — content-integrity, not a linked chain. "Merkle-rooted + Hedera" (swarmchain, swarmandbee-app) adds a third-party consensus anchor. Per house doctrine (kill-hedera), **new spine work hashes in-house on DefendableLedger**; the Hedera anchors in swarmchain/swarmandbee-app are legacy/audit-trail rails, not the canonical path.

---

## 3. Supersession Chains — Do Not Touch Dead Repos

Each row: the **canonical** repo on the left replaces the **superseded** repos on the right. Editing a superseded repo for a live surface is a mistake.

| Canonical (edit this) | Supersedes (archive / do not edit) | Why |
|---|---|---|
| **defendable-os-v2** | `defendable`, `defendableos` | Old repos are "Proof of Value" positioning; v2 is the "Proof of Execution" Astro rebuild for `defendableos.com` |
| **defendable-cloud-v2** | `defendable-cloud`, `defendable-api-fly-tigris`, `defendablecloud-kit` | v2 is the consolidated site+api+app; `-api-fly-tigris` was the fork PARENT (backend migrated in); `defendable-cloud` was the old SPA; `-kit` is empty |
| **defendable-router** | `defendablerouter-stage` | Backend spine consolidated into `defendable-router` (`b9622a8`); stage was an earlier local-only package |
| **defendable-ledger** | `street-ledger`, `hive-ledger` | `defendableledger.com` is THE canonical ledger; StreetLedger retains a niche vocabulary-deed role but is superseded *as the canonical ledger*; hive-ledger is an early surface |
| **virgin-jelly** (JellyScorer) | `SwarmTribunal`, `tribunal`, `swarm-tribunal`*, LLM-as-judge graders in `swarmchain`/`gemma-4` | Per cook doctrine, deterministic JellyScorer replaces all LLM-as-judge grading. *Preserve `swarm-tribunal`'s 600 crystal-clear corpus before archiving the shell* |
| **virgin-jelly** | `Swarm-Jelly` | Royal-Jelly tiering folded into the JellyScorer line (verify before archive) |
| **swarmchain** | `Swarn-chain` (typo fork), `swarm-genesis` | `Swarn-chain` is an abandoned misspelled duplicate; swarmchain is the live validation stack |
| **defendable-docs** | legacy `/v1/*` API namespace; 6-dimension evidence-strength scoring model | Both explicitly marked superseded 2026-05-27; docs now reflect the real v0.1 spine |
| **Defendable-Gold-Cooks** | `swarm-qwen-27B-Gold-Standard-Build-LLM` (operationalized), `atlas-3.6-27B-cook-book`, per-domain forks (`credit-sniper-llm`, `swarm-capital-markets`, `Swarm-Jelly`, `Swarm-Signal`) | The canonical cook ledger folds the build doctrine + review chain + per-domain recipes into one truth |

**Other archive candidates** (research/one-off artifacts — fold durable findings into docs/ledger, then archive): `defendable-compute-wedge`, `defendableos-swarm-research`, `DEFENDABLEOS-FEDERAL-DEMAND-INTELLIGENCE-SWARM`, `defendableos-tribunal-audit`.

> **Naming hygiene risk (not a dup):** several repos have a local-checkout dir name that differs from the GitHub repo name — `mr-defendable`↔`mrdefendable`, `offensetotheshed`↔`offense-to-the-shed`, `street-ledger`↔`streetledger`, `defendable-os-v2`↔`defendableos-site`, `defendable-dos-cli`↔`defendable-dos-cli-work`. Same repo, mismatched dir. Reconcile to avoid a divergent second source-of-truth (especially `mr-defendable`).

---

## 4. The Brand Domains

The house brand stack. The first six are the canonical "brand stack"; the rest are product surfaces.

| Domain | Role | Repo |
|---|---|---|
| **mrdefendable.com** | FACE — the principal's voice | mr-defendable |
| **defendableos.com** | SYSTEM — the engine, Proof of Execution | defendable-os-v2 |
| **defendablerouter.com** | SPINE — gate, broker, meter, router, receipt ledger | defendable-router |
| **defendableledger.com** | LEDGER — canonical books-and-records | defendable-ledger |
| **painintheshed.com** | MEDIA — cost-of-intelligence podcast | pain-in-the-shed |
| **offensetotheshed.com** | CULTURE — operator blog / war-room | offensetotheshed |
| defendablecloud.com | Hosted proof vault (operating layer) | defendable-cloud-v2 |
| defendabledash.com | Visibility surface — watch it cook, verify chains | defendable-dash |
| defendablegraph.com | Living proof graph | defendable-graph |
| defendabledocs.com / docs.defendableos.com | Operating manual + schema reference | defendable-docs |
| defendabledatasets.com | Open datasets with receipts | defendable-datasets |
| opendefendable.com | Open standards + community layer | open-defendable |
| swarmandbee.ai (+ subdomains) | Apex firm / CCIR bakery brand orchestrator | swarmandbee-app |

> Legacy/secondary ledger surfaces, kept for niche roles but **not** canonical: `ledger.mrdefendable.com`, `streetledger.eth.limo` (ENS-IPFS, defend-A-pedia vocabulary deeds).

---

## 5. How the Pieces Connect — One Flow

The compounding trust layer is a single flow. Each step mints or verifies a receipt onto one chain.

```
  PLAN ──▶ COOK ──▶ EVAL ──▶ RECEIPT ──▶ LEDGER ──▶ GRAPH ──▶ DASH
   │        │        │          │          │          │         │
 docs/    Gold-    Cloud      Cloud /    Defendable  pulls    reads &
 open-    Cooks    (rulebook  Router     Ledger      /receipts verifies
 defendable        referee,   mint       (canonical  /recent   both chains
 declare   recipe  no judge)  hash-      books +     projects  (Cloud +
 the       + canary           chained    in-house    to nodes  sovereign
 rulebook  + A/B              receipt)   hashing)              Router)
```

1. **PLAN** — the rulebook (Flight Sheet / assignment) and receipt schemas are declared in **defendable-docs** and **open-defendable**. The referee applies declared rules; it does not judge.
2. **COOK** — a model fine-tune runs from a reproducible recipe in **Defendable-Gold-Cooks** (canary-then-cook discipline, deterministic gates). Live telemetry streams to **defendable-dash** `/tune`. Corpora are graded/tiered by **virgin-jelly** (JellyScorer) and validated/sealed by **swarmchain**.
3. **EVAL** — work (agent output, a cooked model's beat-base A/B, a dataset) is run against the rulebook in **defendable-cloud-v2** (pure rules engine, "Show the Math").
4. **RECEIPT** — the eval/cook/dataset/compute event mints a **hash-chained receipt** in DefendableCloud (`org_seq + parent_hash + receipt_sha256`, JSON + PDF in Tigris). **defendable-router** mints the access/compute/job receipts at the operational boundary (member gate → dataset broker → compute meter → job router).
5. **LEDGER** — receipts, Tribunal verdicts, SwarmJelly training pairs, and deeds publish to **defendable-ledger** (`defendableledger.com`), the canonical append-only books-and-records surface with client-side SHA-256 verification. Datasets are promoted and catalogued via **defendable-datasets** (Quality Foundry → manifest → catalog).
6. **GRAPH** — **defendable-graph** pulls `/receipts/recent` and `/datasets/catalog` and renders the whole verified network (agents, models, workers, datasets, verdicts, receipts, deeds) as an inspectable entity-relationship graph. Pull-only; it mirrors, it does not mint.
7. **DASH** — **defendable-dash** is the command center: it reads and re-verifies both chains (the Cloud org chain and the optional sovereign Router chain over a CF Tunnel), re-derives the math, and shows honest "not wired"/empty states. Nothing is fabricated.

**The minting boundary, stated plainly:** receipts are minted **upstream** (Cloud, Router, Ledger, swarmchain) and **read downstream** (Graph, Dash, Docs). Graph and Dash never write the chain. This is what lets a customer/auditor verify `1+1=2` themselves instead of trusting a model.

---

## 6. Live vs Roadmap — Honest Status

**Live and verified (E2E on the 5090 rig, 2026-05-29):** defendable-cloud-v2 (hash-chain + tamper test proven), defendable-router backend (26 pytest, worker contract walked), defendable-ledger (82 records), defendable-graph, defendable-dash (incl. `/tune` live cook view), defendable-docs (171 pages, audited), defendable-datasets, open-defendable, swarmchain. First proven cooked model with a real beat-base receipt: **cs-edge-4b** (Defendable-Gold-Cooks, beat base 10/24 vs 0/24).

**Live with documented limitations:** defendable-router public site is a positioning surface (backend is the real spine; site carries an honest "not yet independently verified" banner per Codex F4). defendable-dos-cli is READY_WITH_LIMITATIONS (PRODUCTION NOT_CLEARED, CLIENT_USE HOLD, owner approval simulated in tests). DefendableCloud app is on CF Pages (`*.pages.dev`) — full domain migration to `app.defendablecloud.com` pending.

**Roadmap / not yet live:** Router Postgres + Stripe + Kubernetes + Merkle-anchoring; ENS-signed receipts and reconciliation deeds (schema-level stubs exist in the Router spine, not wired); open-defendable v0.2 RFC; Cloud public trust pages (terms/privacy/DPA/status), OpenAPI ref, backup drills; dos-cli Router integration and lanes 3–5 of 5 (only customer_support + books_records mapped).

**Doctrine reminders for anyone extending the house:** we don't judge (referee = rulebook, not a judge model); clean the rig before any cook; check for dups across projectors before declaring done; open data must be crystal-clear (recipient verifies samples + schema + hash + filesize themselves); receipts hash in-house on DefendableLedger (kill-hedera for new spine work); everything we cook and do must be visible — no black box.
