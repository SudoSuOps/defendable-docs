---
title: Defendable CLI
description: End-to-end DefendableCloud terminal workflow for projects, runs, evidence, audits, approvals, receipts, ledger verification, and e2e tests.
---

`defendable` is the CLI for DefendableCloud, shipped in the monorepo at `defendable-cloud-v2/cli`.

Every command maps to an API endpoint locked by Pydantic schemas. The CLI surface tracks the API contract; the canonical client surface remains the [OpenAPI doc](https://api.defendablecloud.com/openapi.json).

## Install

Install editable from the monorepo (current canonical path):

```bash
git clone git@github.com:SudoSuOps/defendable-cloud-v2.git
pip install -e ./defendable-cloud-v2/cli
```

This installs the `defendable` console script (package name `defendablecloud-cli`).

:::note[Planned]
A published `pip install defendablecloud-cli` from PyPI is planned — the package is not on PyPI yet. Until then, use the monorepo editable install above.
:::

## Configuration

| Setting | Source |
|---|---|
| API base URL | `--api`, `DEFENDABLE_API`, or saved profile |
| JWT bearer | `DEFENDABLE_TOKEN` or `defendable auth verify` |
| Profile directory | `DEFENDABLE_HOME`, default `~/.defendable` |

Credentials are stored at `~/.defendable/credentials.json` with mode `0600`.

## End-to-End Flow

```bash
defendable auth login --email you@org.com
defendable auth verify <TOKEN-FROM-EMAIL>

defendable flight-sheets ls --lane agent
defendable projects create --name "Customer proof run"
defendable runs new --project <project-id> --flight-sheet cre_memo_dscr_ltv_v1

defendable evidence add <run-id> --kind note --label "deal terms" --content "loan 8.6M ..."
defendable submission add <run-id> --output-file ./agent-output.json --agent claude-code --model claude-opus

defendable audit run <run-id>
defendable audit finalize <run-id>

defendable approval set <run-id> --decision approved --note "approved for client package"
defendable receipt generate <run-id>
defendable verify <share-url-or-token>
```

## Command Reference

### Auth

| Command | What |
|---|---|
| `defendable auth login --email <email>` | Request a magic-link sign-in email. |
| `defendable auth verify <token>` | Trade the magic-link token for a JWT. |
| `defendable auth status` | Show signed-in user and org. |
| `defendable auth logout` | Forget local credentials. |

### Projects

| Command | What |
|---|---|
| `defendable projects ls` | List your organization's projects. |
| `defendable projects create --name <name>` | Create a project. |

### Flight Sheets

| Command | What |
|---|---|
| `defendable flight-sheets ls [--lane <lane>]` | List active flight sheets. |
| `defendable flight-sheets show <slug-or-id>` | Show one sheet, assignment text, expected outputs, and rules. |

### Runs

| Command | What |
|---|---|
| `defendable runs ls [--project <id>] [--limit N]` | List recent Runs. |
| `defendable runs new --project <id> --flight-sheet <slug-or-id>` | Create a Run. |
| `defendable runs show <run-id>` | Full Run detail. |
| `defendable runs submission <run-id>` | Latest agent submission. |
| `defendable runs checks <run-id>` | Applied rules. |
| `defendable runs flags <run-id>` | Findings sorted by severity. |
| `defendable runs verdict <run-id>` | Latest verdict. |

### Evidence and Submission

```bash
defendable evidence add <run-id> --kind note --label "facts" --content "..."
defendable evidence upload <run-id> --file ./source.pdf --label "source file"
defendable submission add <run-id> --output-file ./output.json --agent <name> --model <model>
cat output.json | defendable submission add <run-id> --output-text -
```

### Audit, Approval, Receipt

| Command | What |
|---|---|
| `defendable audit run <run-id>` | Apply the rulebook. |
| `defendable audit grade <run-id> <check-id> <pass|flag>` | Operator applies a checklist rule. |
| `defendable audit finalize <run-id>` | Mint the verdict from applied rules. |
| `defendable approval set <run-id> --decision <approved|rejected|escalated>` | Human gate. |
| `defendable receipt generate <run-id>` | Mint the hash-chained receipt. |

### Ledger and Public Verify

| Command | What |
|---|---|
| `defendable ledger ls` | Walk the per-org chain. |
| `defendable ledger verify` | Check hash and parent linkage. |
| `defendable verify <share-url-or-token>` | Verify any public receipt. |

## JSON Output

Every command should support human-readable output and `--json` for automation:

```bash
defendable runs ls --json | jq '.[] | select(.verdict == "fail")'
```

## E2E Test

The CLI has an end-to-end test that drives the full lifecycle against a real API when credentials exist. It skips cleanly without credentials.

```bash
export DEFENDABLE_E2E_API="https://api.defendablecloud.com"
export DEFENDABLE_E2E_TOKEN="eyJ..."
pytest cli/tests/e2e -v
```

The test creates artifacts in the target organization by design. DefendableCloud is append-only; do not run e2e tests against production unless that artifact trail is acceptable.

