---
title: Getting Started
description: Start here for DefendableCloud, DefendableOS, the CLI, the API, enterprise controls, and the proof workflow.
---

## The 90-Second Orientation

DefendableCloud is the hosted proof vault for AI and agentic work.

DefendableOS is the engine. DefendableCloud is the vault. The engine runs the rulebook; the vault stores and shares the proof.

The central workflow is:

```text
Inputs -> Evidence -> Execution -> Checks -> Verdict -> Approval -> Receipt
```

A Run is not "the model said it is good." A Run is evidence plus a rulebook plus a verdict plus an approval plus a hash-chained receipt.

:::note[Which doc set you want]
DefendableCloud is the live public surface at `api.defendablecloud.com`. These docs describe it end to end. DefendableRouter is a real but local v0.1 spine (CI-verified, not yet publicly deployed); it is documented separately. If you came here for the live proof vault, the CLI and API docs below are your path.
:::

## Pick Your Path

### Builder

Start here:

- [The Defendable Run](/defendablecloud/the-defendable-run/)
- [Three Lanes](/defendablecloud/three-lanes/) (including the eval flight-sheet lane and its deterministic executor)
- [Defendable CLI](/defendablecloud/cli/)
- [Current API Surface](/defendablecloud/api/)
- [Integrate](/defendablecloud/integrate/)

### Operator

Start here:

- [Enterprise Security](/defendablecloud/enterprise-security/)
- [Operations Runbook](/defendablecloud/operations/)
- [Datasets and Models](/defendablecloud/datasets-models/)

### Buyer or Enterprise Reviewer

Start here:

- [DefendableCloud Overview](/defendablecloud/overview/)
- [Three Lanes](/defendablecloud/three-lanes/)
- [Generate a Receipt](/defendablecloud/generate-a-receipt/)
- [The Defendable Run](/defendablecloud/the-defendable-run/)

## Run Lifecycle With The CLI

```bash
defendable auth login --email you@org.com
defendable auth verify <TOKEN-FROM-EMAIL>
defendable projects create --name "Proof run"
defendable flight-sheets ls --lane agent
defendable runs new --project <project-id> --flight-sheet cre_memo_dscr_ltv_v1
defendable evidence add <run-id> --kind note --label "source facts" --content "..."
defendable submission add <run-id> --output-file ./agent-output.json --agent claude-code --model claude-opus
defendable audit run <run-id>
defendable audit finalize <run-id>
defendable approval set <run-id> --decision approved
defendable receipt generate <run-id>
defendable verify <share-url-or-token>
```

## What Exists Now

Current live/foundation surfaces:

- DefendableCloud marketing site, Vault app, API, and CLI
- authenticated organizations and roles
- projects and Runs
- evidence, submissions, audits, approvals, receipts
- public receipt sharing and ledger verification
- dataset library and download receipts
- model catalog and model pin receipts
- cook runner routes
- incidents and stack assessment
- enterprise runbooks and WAF guidance

:::note
DefendableRouter is real backend code (v0.1 spine, CI-verified) but runs locally and is not part of the live public surface above. It is documented separately and mints its own local checksummed receipts, distinct from the Cloud's per-org hash chain.
:::

Roadmap surfaces:

- enterprise SSO/SAML/OIDC
- SCIM
- external security review
- formal SOC2 audit
- public SLA/status program
- generated OpenAPI reference
- DDEED public anchoring beyond the current per-org receipt-chain verification

## Read Next

Best sequence:

1. [DefendableCloud Overview](/defendablecloud/overview/)
2. [The Defendable Run](/defendablecloud/the-defendable-run/)
3. [CLI Guide](/defendablecloud/cli/)
4. [Current API Surface](/defendablecloud/api/)
5. [Enterprise Security](/defendablecloud/enterprise-security/)

