---
title: Defendable CLI
description: defendable — drive the DefendableCloud proof vault from your terminal. Install, quickstart, every command, every flag.
---

`defendable` — the official CLI for DefendableCloud. Every command maps to an API endpoint locked by a named Pydantic schema. **The CLI surface IS the doctrine** — drift on either side fails contract tests on the other.

> The referee is a rulebook, not a judge. To the shed.

## Install

```bash
pip install defendablecloud-cli
```

The `defendable` binary lands on your `PATH`. Requires Python 3.10+.

To install from the monorepo:

```bash
git clone git@github.com:SudoSuOps/defendable-cloud-v2.git
pip install -e ./defendable-cloud-v2/cli
```

## Quickstart · end to end in 6 commands

```bash
# 1. sign in
defendable auth login --email you@org.com
# check inbox, copy the token= value from the URL:
defendable auth verify <TOKEN-FROM-EMAIL>

# 2. pick a rulebook
defendable flight-sheets ls --lane agent
# → shows ~10 sheets for the agent lane

# 3. create a project + run
defendable projects create --name "IC reviews"
defendable runs new \
  --project <project-id> \
  --flight-sheet cre_memo_dscr_ltv_v1

# 4. attach evidence + the agent's submission
defendable evidence add <run-id> --kind note --label "deal" --content "..."
defendable submission add <run-id> --output-file ./agent-output.json

# 5. run the rulebook + finalize
defendable audit run <run-id>
defendable audit finalize <run-id>

# 6. approve + mint
defendable approval set <run-id> --decision approved
defendable receipt generate <run-id>

# anyone with the share URL can verify (no auth):
defendable verify <share-url-or-token>
```

## Configuration

| Setting | How |
|---|---|
| API base URL | `--api https://...` flag · `DEFENDABLE_API` env · saved profile |
| JWT bearer | `DEFENDABLE_TOKEN` env (overrides saved) · `defendable auth verify` |
| Profile directory | `DEFENDABLE_HOME` env (default `~/.defendable`) |

Credentials live at `~/.defendable/credentials.json` with mode 0600.

Every command supports `--json` for machine-readable output:

```bash
defendable runs ls --json | jq '.[] | select(.verdict == "fail")'
```

## Command reference

### Auth

| Command | What |
|---|---|
| `defendable auth login --email <email>` | Request a magic-link sign-in email |
| `defendable auth verify <token>` | Trade the magic-link token for a JWT |
| `defendable auth status` | Show signed-in user + org (exit 2 if not signed in) |
| `defendable auth logout` | Forget local credentials |

The magic-link token is the `token=` value in the URL inside the email — copy it and paste into `verify`.

### Projects

| Command | What |
|---|---|
| `defendable projects ls` | List your org's projects |
| `defendable projects create --name <name>` | Create a project |

### Flight Sheets

| Command | What |
|---|---|
| `defendable flight-sheets ls [--lane <l>]` | List active flight sheets · filter by `agent` · `dataset` · `compute` · `other` |
| `defendable flight-sheets show <slug-or-id>` | Show one sheet — assignment text, expected outputs, every rule + tier |

### Runs

| Command | What |
|---|---|
| `defendable runs ls [--project <id>] [--limit N]` | List recent Runs |
| `defendable runs new --project <id> --flight-sheet <slug-or-id> [--agent-profile <id>] [--title <text>]` | Create a Run |
| `defendable runs show <run-id>` | Full Run detail (composite) |
| `defendable runs submission <run-id>` | The latest agent submission |
| `defendable runs checks <run-id>` | All applied rules |
| `defendable runs flags <run-id>` | The thrown flags (Findings), sorted by tier |
| `defendable runs verdict <run-id>` | The latest verdict |

### Evidence

| Command | What |
|---|---|
| `defendable evidence add <run-id> --kind <k> --label <l> [--content <text>]` | Attach text / note / url / observation / tool_output / model_output / log evidence |
| `defendable evidence upload <run-id> --file <path> [--label <l>]` | Upload a file as evidence (25 MB max, hashed at upload) |

### Submission

```bash
# pass a file
defendable submission add <run-id> --output-file ./output.json [--agent <name>] [--model <name>] [--provider <p>]

# inline
defendable submission add <run-id> --output-text '{"assignment_id":"..."}'

# stdin
cat output.json | defendable submission add <run-id> --output-text -
```

### Audit

| Command | What |
|---|---|
| `defendable audit run <run-id>` | Apply the rulebook |
| `defendable audit grade <run-id> <check-id> <pass|flag>` | Operator applies a checklist rule (binary, not an opinion grade) |
| `defendable audit finalize <run-id>` | Mint the verdict from the applied rules |

### Approval

| Command | What |
|---|---|
| `defendable approval set <run-id> --decision <approved|rejected|escalated> [--note <text>]` | The human gate. Receipts only mint on `approved`. |

### Receipt

| Command | What |
|---|---|
| `defendable receipt generate <run-id>` | Mint the hash-chained receipt — JSON + PDF + public share URL |

### Ledger

| Command | What |
|---|---|
| `defendable ledger ls` | Walk the per-org chain in `org_seq` order |
| `defendable ledger verify` | Check hash + parent linkage end-to-end |

### Public verify (no auth)

| Command | What |
|---|---|
| `defendable verify <share-url-or-token>` | Hash-check any receipt. Accepts a full share URL, a `/r/<token>` path, or a raw token. |

## Output

The default output is rich human-readable — colored severity badges (`honey` green · `jelly` yellow · `propolis` red), colored statuses (`pass` green · `flag` red · `open` yellow), tables for lists, key/value for single objects.

Pass `--json` on any command to get scripted output:

```bash
# pipe-friendly
defendable ledger ls --json | jq '.[].receipt_id'

# fail-fast in CI
if ! defendable ledger verify --json | jq -e '.ok' > /dev/null; then
  echo "chain broken"; exit 1
fi
```

## End-to-end test

The CLI ships with an end-to-end test that drives the full Run lifecycle against the live API. To run it:

```bash
# easiest: sign in, then pytest reads your stored JWT
defendable auth login --email you@org.com
defendable auth verify <TOKEN-FROM-EMAIL>
pytest cli/tests/e2e -v

# CI: explicit token
export DEFENDABLE_E2E_TOKEN="eyJ..."
pytest cli/tests/e2e -v
```

The test runs in an isolated `DEFENDABLE_HOME` so it never touches your real credentials.

## Versioning

The CLI is wire-locked against the DefendableCloud API doctrine schemas (`FlightSheet`, `Submission`, `Check`, `Finding`, `Verdict`, `Approval`, `Receipt`, `LedgerEntry`, `Severity`, `RuleSeverity`, `IncidentKind`). A future PR that drops or renames one of those fails the API's contract tests before it ships.

```bash
defendable --version
# → defendable 0.1.0
```

***

🐝 *Drive the vault. Mint the receipt. To the shed.*
