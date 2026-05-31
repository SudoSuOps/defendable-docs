# CONSOLIDATION-PLAYBOOK.md

**Collapse 100+ repos into the canonical Defendable house.**
Org: `SudoSuOps` · Date: 2026-05-31 · Doctrine: one domain → one canonical repo; everything else ARCHIVE / REDIRECT / MERGE.

This is an action plan, not a survey. Every entry has a decisive verb and the exact command. Ordered by leverage (highest blast-radius / lowest risk first).

---

## 0. Doctrine (the rule we apply)

- **One domain, one canonical repo.** If two repos render the same domain, one is wrong.
- **Salvage before archive.** Crystal-clear corpora, unique backend code, and recipe IP get folded into canon FIRST; only then archive the shell.
- **Archive ≠ delete.** `gh repo archive` is reversible (read-only). We never `gh repo delete` in this playbook — too lossy, and history is provenance.
- **Mark loudly.** Every superseded repo gets the `deprecated` topic AND a `DEPRECATED.md` banner pointing at canon, so a stranger landing on it cannot mistake it for live.
- **Verify the live binding before archiving any site repo.** Confirm CF Pages / Fly is pointed at the canonical repo BEFORE archiving the old one. Archiving does not break a deploy, but a still-connected old repo means the cutover never happened.

---

## 1. The exact DEPRECATED.md banner template

Drop this file at the repo root of every REDIRECT / superseded repo, fill the `{...}` fields, commit, then archive.

```markdown
# ⚠️ DEPRECATED — DO NOT USE

This repository is **superseded** and no longer maintained.

**Canonical repository:** [`SudoSuOps/{CANONICAL_REPO}`](https://github.com/SudoSuOps/{CANONICAL_REPO})
**Live surface:** {CANONICAL_DOMAIN_OR_NA}

| | |
|---|---|
| Status | SUPERSEDED → archived {YYYY-MM-DD} |
| Replaced by | `SudoSuOps/{CANONICAL_REPO}` |
| Reason | {one line: e.g. "Proof-of-Value positioning replaced by Proof-of-Execution v2"} |
| Salvaged into canon | {what was folded in, or "nothing — pure shell"} |

Do not open PRs, file issues, or deploy from this repo. All work moves to the canonical repo above.

— Defendable house consolidation, 2026-05-31
```

Commit message for every banner:

```
chore: deprecate → point at SudoSuOps/{CANONICAL_REPO}

Co-Authored-By: Claude Opus 4.8 (1M context) <noreply@anthropic.com>
```

---

## 2. The canonical allowlist — DO NOT TOUCH

These 22 repos are the house. They are LIVE-CANONICAL. Never archive, never deprecate, never rename without an explicit cutover plan. Each owns exactly one mandate.

| Repo | Domain | Brand role |
|---|---|---|
| `defendable-os-v2` | defendableos.com | SYSTEM (marketing) |
| `defendable-cloud-v2` | defendablecloud.com | CLOUD / proof vault |
| `defendable-router` | defendablerouter.com | SPINE (gate/broker/meter/router) |
| `defendable-ledger` | defendableledger.com | LEDGER (public proof minter) |
| `defendable-dash` | defendabledash.com | VISIBILITY surface |
| `defendable-graph` | defendablegraph (pages.dev) | proof graph |
| `defendable-docs` | defendabledocs.com / docs.defendableos.com | DOCS (canonical reference) |
| `defendable-datasets` | defendabledatasets.com | DATASETS + Quality Foundry |
| `open-defendable` | opendefendable.com | OPEN standards layer |
| `Defendable-Gold-Cooks` | n/a (private) | COOK LEDGER (recipe IP) |
| `defendable-dos-cli` | n/a (gated) | spec→engine bridge CLI |
| `defendable-brand` | n/a (assets) | brand asset store |
| `defendable-apps` | n/a (edge agents) | edge AI agents |
| `defend-A-pedia--vocabulary` | n/a | language constitution |
| `street-chat` | n/a (intake) | StreetChat capture rail |
| `swarmchain` | n/a (validation/deed) | SwarmChain validation + Merkle/Hedera anchor |
| `virgin-jelly` | n/a (grader) | JellyScorer — canonical grader |
| `swarmandbee-app` | swarmandbee.ai (+15 subdomains) | apex brand orchestrator |
| `mr-defendable` | mrdefendable.com | FACE |
| `pain-in-the-shed` | painintheshed.com | MEDIA |
| `offensetotheshed` | offensetotheshed.com | CULTURE |
| `sigedge-defense` | n/a (Jetson edge) | edge defense / flag-spotter / canary → propolis corpus |

**Caveat inside the allowlist** (hygiene, not archival):
- `defendable-router` carries TWO receipt implementations (`defendable_router/` simple hash-chain vs `spine/defendablerouter/` Tribunal/DDEED stub, excluded from setuptools). KEEP both for now but track: decide one canonical receipt spine before v0.2 worker contract ships. Do NOT split into a new repo — that re-creates the sprawl.
- `defendable-graph` vs `defendable-dash`: both are visibility surfaces but DIFFERENT scope (proof-trace network vs enterprise BFF dashboard). KEEP both. Not a dup.
- Local-dir name drift (`mr-defendable`↔`mrdefendable`, `offensetotheshed`↔`offense-to-the-shed`, `defendable-os-v2`↔`defendableos-site`, etc.) is a checkout-naming risk, NOT repo sprawl. See §7.

---

## 3. Safe to ARCHIVE today (no salvage needed)

These are stale shells, empty scaffolds, or fully-superseded sites whose replacement is live and verified. The canonical code already exists elsewhere; nothing unique is lost. Run the two commands per repo (deprecate topic + archive), after the one-line pre-check.

> Pre-check for the two SITE repos (`defendable`, `defendableos`, `defendable-cloud`): confirm CF Pages is pointed at the v2 repo, not these. Command: `gh api repos/SudoSuOps/{repo}` and check the CF Pages dashboard project's connected repo. If still connected, cut it over to v2 FIRST.

### 3a. OS site cluster
```bash
# defendable — old Vite SPA, "Proof of Value", superseded by defendable-os-v2
gh repo edit SudoSuOps/defendable --add-topic deprecated
gh repo archive SudoSuOps/defendable --yes

# defendableos — old OS sprawl repo, no local checkout, empty description
gh repo edit SudoSuOps/defendableos --add-topic deprecated
gh repo archive SudoSuOps/defendableos --yes
```

### 3b. Cloud cluster
```bash
# defendable-cloud — old SPA, "128 RTX 6000" positioning, superseded by defendable-cloud-v2
gh repo edit SudoSuOps/defendable-cloud --add-topic deprecated
gh repo archive SudoSuOps/defendable-cloud --yes

# defendablecloud-kit — dead/empty scaffold, overlaps cloud-v2 by name
gh repo edit SudoSuOps/defendablecloud-kit --add-topic deprecated
gh repo archive SudoSuOps/defendablecloud-kit --yes
```

### 3c. Ledger / chain / tribunal stale shells
```bash
# hive-ledger — early ledger, superseded by defendable-ledger
gh repo edit SudoSuOps/hive-ledger --add-topic deprecated
gh repo archive SudoSuOps/hive-ledger --yes

# tribunal — early bare repo, last push 2026-05-08, grading moved to virgin-jelly
gh repo edit SudoSuOps/tribunal --add-topic deprecated
gh repo archive SudoSuOps/tribunal --yes

# SwarmTribunal — MCP LLM-as-judge graders, superseded by virgin-jelly JellyScorer
gh repo edit SudoSuOps/SwarmTribunal --add-topic deprecated
gh repo archive SudoSuOps/SwarmTribunal --yes

# defendableos-tribunal-audit — one-off point-in-time audit
gh repo edit SudoSuOps/defendableos-tribunal-audit --add-topic deprecated
gh repo archive SudoSuOps/defendableos-tribunal-audit --yes
```

### 3d. Typo'd duplicate
```bash
# Swarn-chain — misspelled stale fork of swarmchain (verify empty first; if it has unique commits, move to §4)
gh repo view SudoSuOps/Swarn-chain --json pushedAt,diskUsage   # sanity check it's a dead typo fork
gh repo edit SudoSuOps/Swarn-chain --add-topic deprecated
gh repo archive SudoSuOps/Swarn-chain --yes
```

**Recommended:** add a DEPRECATED.md banner (§1) to the three SITE repos (`defendable`, `defendableos`, `defendable-cloud`) before archiving — they may still get organic traffic / stars. The empty scaffolds (`defendablecloud-kit`, `defendableos-tribunal-audit`, `Swarn-chain`) don't need a banner; topic + archive is enough.

---

## 4. Salvage-then-ARCHIVE (extract value FIRST, then archive)

Do NOT archive these until the salvage commit lands in canon. Each has something worth keeping.

### 4.1 `defendable-api-fly-tigris` — fork PARENT of cloud-v2 (HIGH leverage, verify-gated)
- **Risk:** this is the ancestor Fly.io API. If a live independent API endpoint still serves from it, archiving the repo won't kill the deploy, but it orphans the source.
- **Salvage / verify:**
  ```bash
  flyctl apps list                      # is there a live app fed by this repo?
  flyctl status -a {app-name}           # confirm it's the migrated-into-cloud-v2 path, not independent
  ```
  Backend logic is already migrated into `defendable-cloud-v2/api`. Confirm no unique migrations/routes remain (`git -C /home/swarm/Desktop/defendable-api-fly-tigris log --oneline -20` vs cloud-v2/api).
- **Action once confirmed superseded:** REDIRECT banner → `defendable-cloud-v2`, then archive.
  ```bash
  # after DEPRECATED.md committed + Fly endpoint confirmed retired-or-migrated:
  gh repo edit SudoSuOps/defendable-api-fly-tigris --add-topic deprecated
  gh repo archive SudoSuOps/defendable-api-fly-tigris --yes
  ```

### 4.2 `swarm-tribunal` — has the 600-row crystal-clear corpus (SALVAGE the corpus)
- **Salvage:** the 600 crystal-clear tribunal corpus is real value-add training data. Promote it into `defendable-datasets` (Quality Foundry) as a receipt-backed dataset BEFORE archiving.
  ```bash
  # copy corpus into defendable-datasets ingest, run through Quality Foundry (defdata), mint receipts
  # then commit to defendable-datasets, NOT left to rot in an archived tribunal shell
  ```
- **Action:** REDIRECT banner → `virgin-jelly` (grading) + note corpus moved to `defendable-datasets`, then archive.
  ```bash
  gh repo edit SudoSuOps/swarm-tribunal --add-topic deprecated
  gh repo archive SudoSuOps/swarm-tribunal --yes
  ```

### 4.3 `Swarm-Jelly` — earlier Royal-Jelly tiering (SALVAGE if tiering logic not folded in)
- **Salvage:** verify whether the Royal-Jelly tier-extraction logic is fully reimplemented in `virgin-jelly`'s JellyScorer. If `virgin-jelly` already supersedes it (per cook canon, it does), nothing to salvage. If any tiering edge-case lives only here, fold into `virgin-jelly` first.
  ```bash
  # diff tiering rubric: Swarm-Jelly vs virgin-jelly/score.py
  ```
- **Action:** MERGE residual tiering into `virgin-jelly`, then REDIRECT banner → `virgin-jelly`, archive.
  ```bash
  gh repo edit SudoSuOps/Swarm-Jelly --add-topic deprecated
  gh repo archive SudoSuOps/Swarm-Jelly --yes
  ```

### 4.4 `defendablerouter-stage` — earlier router receipt-spine package (LOCAL-ONLY, diff-then-delete)
- **Note:** No matching GitHub repo found in the org list — this is a local-only staging checkout at `/home/swarm/Desktop/defendablerouter-stage`.
- **Salvage:** diff `defendablerouter-stage/defendablerouter/` against `defendable-router/spine/defendablerouter/` for any unique receipt-spine code.
  ```bash
  diff -rq /home/swarm/Desktop/defendablerouter-stage /home/swarm/Desktop/defendable-router/spine 2>/dev/null
  ```
- **Action:** if no unique code, delete the local dir (no GitHub archive needed). If unique code exists, MERGE into `defendable-router/spine/` first.

### 4.5 Research / one-off corpora — fold findings, then archive
These are point-in-time research/campaign artifacts, NOT products. Salvage = lift durable findings into `defendable-docs` (reference) or `defendable-ledger` (record), then archive the corpus.

```bash
# defendable-compute-wedge — compute-valuation research wedge
#   SALVAGE: fold the defensible-compute-valuation thesis into defendable-docs (or defendable-cloud-v2 OM material), then:
gh repo edit SudoSuOps/defendable-compute-wedge --add-topic deprecated
gh repo archive SudoSuOps/defendable-compute-wedge --yes

# defendableos-swarm-research — OS research corpus
gh repo edit SudoSuOps/defendableos-swarm-research --add-topic deprecated
gh repo archive SudoSuOps/defendableos-swarm-research --yes

# DEFENDABLEOS-FEDERAL-DEMAND-INTELLIGENCE-SWARM — federal demand-intel campaign artifact
#   SALVAGE: if any SAM.gov / federal-registration findings are durable, they belong with the REG-SAM record in defendable-ledger, then:
gh repo edit SudoSuOps/DEFENDABLEOS-FEDERAL-DEMAND-INTELLIGENCE-SWARM --add-topic deprecated
gh repo archive SudoSuOps/DEFENDABLEOS-FEDERAL-DEMAND-INTELLIGENCE-SWARM --yes
```

---

## 5. KEEP-but-supersede-as-a-role (REDIRECT only, do NOT archive)

### 5.1 `street-ledger` — niche role survives, ledger role does not
- `street-ledger` (streetledger.eth.limo) is SUPERSEDED **as the canonical ledger** by `defendable-ledger`, but it retains a distinct niche: the public deeded-**vocabulary** ledger feeding Defend-A-Pedia.
- **Action: REDIRECT-PARTIAL, do NOT archive.** Add a top-of-README banner clarifying scope, pointing canonical-ledger traffic to `defendable-ledger` while keeping the vocabulary-deed role. Use a trimmed banner (NOT the full DEPRECATED template, since it's not fully dead):

```markdown
> ℹ️ **Scope note:** StreetLedger is the public **vocabulary-deed** surface for Defend-A-Pedia.
> The canonical books-and-records ledger for the Defendable ecosystem is now
> [`SudoSuOps/defendable-ledger`](https://github.com/SudoSuOps/defendable-ledger) (defendableledger.com).
> Use defendable-ledger for receipts/verdicts/pairs/deeds. StreetLedger remains live for vocabulary deeds only.
```

- **Local-dir reconcile:** local checkout is `streetledger` (no hyphen); repo is `street-ledger`. See §7.

---

## 6. Cluster-by-cluster decision table (ordered by leverage)

| # | Cluster | Canonical (KEEP) | Action on the rest |
|---|---|---|---|
| 1 | **Cloud / defendablecloud.com** | `defendable-cloud-v2` | `defendable-cloud` ARCHIVE today (§3b) · `defendablecloud-kit` ARCHIVE today (§3b) · `defendable-api-fly-tigris` salvage-verify→ARCHIVE (§4.1) |
| 2 | **OS / defendableos.com** | `defendable-os-v2` | `defendable` ARCHIVE today (§3a) · `defendableos` ARCHIVE today (§3a) |
| 3 | **Tribunal grading** | `virgin-jelly` (grader) + `swarmchain` (validation/anchor) | `tribunal` ARCHIVE today (§3c) · `SwarmTribunal` ARCHIVE today (§3c) · `defendableos-tribunal-audit` ARCHIVE today (§3c) · `swarm-tribunal` salvage-600-corpus→ARCHIVE (§4.2) |
| 4 | **Ledger** | `defendable-ledger` | `hive-ledger` ARCHIVE today (§3c) · `street-ledger` REDIRECT-PARTIAL keep (§5.1) |
| 5 | **Router / spine** | `defendable-router` | `defendablerouter-stage` local diff→delete (§4.4) |
| 6 | **Jelly / grading** | `virgin-jelly` | `Swarm-Jelly` salvage-tiering→ARCHIVE (§4.3) |
| 7 | **Chain / validation** | `swarmchain` | `Swarn-chain` (typo) ARCHIVE today (§3d) · `swarm-genesis`/`swarm-os-genesis` verify→ARCHIVE-candidate (not in profiles; check `gh repo view`) |
| 8 | **Research / one-off corpora** | (none — fold into docs/ledger) | `defendable-compute-wedge` · `defendableos-swarm-research` · `DEFENDABLEOS-FEDERAL-DEMAND-INTELLIGENCE-SWARM` all salvage→ARCHIVE (§4.5) |

---

## 7. Naming hygiene (no archival — prevents the NEXT sprawl)

Local checkout dir names diverge from GitHub repo names. This is a divergent-second-source-of-truth risk, especially for the FACE site. Reconcile local dirs to match repo names so nobody edits the wrong checkout:

| GitHub repo | Local dir (current) | Fix |
|---|---|---|
| `mr-defendable` | `/home/swarm/Desktop/mrdefendable` | rename local dir → `mr-defendable` (HIGH — confirm which deploys to mrdefendable.com) |
| `offensetotheshed` | `/home/swarm/Desktop/offense-to-the-shed` | rename local dir → `offensetotheshed` |
| `street-ledger` | `/home/swarm/Desktop/streetledger` | rename local dir → `street-ledger` |
| `defendable-os-v2` | `/home/swarm/Desktop/defendableos-site` | rename local dir → `defendable-os-v2` |
| `defendable-dos-cli` | `/home/swarm/Desktop/defendable-dos-cli-work` | rename local dir → `defendable-dos-cli` |

No `gh` action — `git -C <dir> remote -v` to confirm the remote, then `mv` the local dir. Verify the live CF Pages project is connected to the GitHub repo (not a stray local push) for each.

---

## 8. Execution order (the runbook)

1. **Pre-flight binding checks** (5 min): for `defendable`, `defendableos`, `defendable-cloud`, `defendable-api-fly-tigris` — confirm CF Pages / Fly points at the v2 repo, not the old one. This is the only step that can break a live site if skipped.
2. **Batch ARCHIVE §3** (9 repos, no salvage): run the deprecate+archive pairs. Highest leverage, zero risk. Add DEPRECATED.md banners to the 3 site repos first.
3. **Salvage §4** (in order of value): 600-corpus from `swarm-tribunal` → `defendable-datasets`; verify `defendable-api-fly-tigris` Fly state; diff `Swarm-Jelly` tiering vs `virgin-jelly`; diff `defendablerouter-stage` locally; fold research findings into docs/ledger. THEN archive each.
4. **REDIRECT-PARTIAL §5**: banner `street-ledger`, keep live.
5. **Naming hygiene §7**: rename local dirs (no GitHub change).
6. **Verify clean**: `gh repo list SudoSuOps --topic deprecated` should list every archived repo; `gh repo list SudoSuOps --no-archived` should be ~the §2 allowlist + active satellites.

---

## 9. Net effect

- **Archived:** ~16 repos (`defendable`, `defendableos`, `defendable-cloud`, `defendablecloud-kit`, `defendable-api-fly-tigris`, `hive-ledger`, `tribunal`, `SwarmTribunal`, `defendableos-tribunal-audit`, `Swarn-chain`, `swarm-tribunal`, `Swarm-Jelly`, `defendable-compute-wedge`, `defendableos-swarm-research`, `DEFENDABLEOS-FEDERAL-DEMAND-INTELLIGENCE-SWARM`, + `swarm-genesis` pending verify).
- **Local-only deleted:** `defendablerouter-stage` (after diff).
- **Redirect-partial kept:** `street-ledger`.
- **Canonical house:** 20 repos, one per mandate (§2).
- **Salvaged into canon:** swarm-tribunal 600-corpus → datasets; compute-wedge/federal findings → docs/ledger; any residual jelly tiering → virgin-jelly.

One domain. One canonical repo. Everything else loudly marked dead and pointing home.

---
*Generated 2026-05-31. Verify `gh` auth (`gh auth status`) and org write access before running. `gh repo archive` is reversible; no `gh repo delete` is used in this playbook.*
