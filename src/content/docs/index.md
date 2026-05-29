---
title: DefendableDocs
description: Enterprise documentation for DefendableCloud and DefendableOS. The engine verifies. The vault proves. Receipts, datasets, model operations, and edge agent infrastructure.
template: splash
hero:
  tagline: |
    The operating manual for DefendableOS and DefendableCloud.
    The engine verifies. The vault proves.
    Proof of Execution. Receipts. Datasets. Agent operations.
  image:
    file: ../../assets/logo.svg
  actions:
    - text: Start Here
      link: /getting-started/
      icon: right-arrow
      variant: primary
    - text: DefendableCloud
      link: /defendablecloud/overview/
      icon: external
    - text: CLI Guide
      link: /defendablecloud/cli/
      icon: external
---

:::tip[Current product truth]
**DefendableCloud** is the live proof vault: `Inputs -> Evidence -> Execution -> Checks -> Verdict -> Approval -> Receipt`.
Start with [DefendableCloud Overview](/defendablecloud/overview/), [The Defendable Run](/defendablecloud/the-defendable-run/), and the [CLI Guide](/defendablecloud/cli/).
Older ecosystem pages remain useful context, but the cloud docs now describe the production-facing platform.
:::

:::note[What is deployed today]
DefendableCloud is the only publicly deployed surface, live at `api.defendablecloud.com`. DefendableRouter is a real backend (v0.1 spine, CI-verified) but runs locally and is not a public endpoint yet. Everything else on the map is roadmap.
:::

## DefendableOS is the engine. DefendableCloud is the vault.

DefendableOS runs the rulebook. DefendableCloud stores and shares the proof.

Every piece of agentic work that flows through the platform follows one primitive:

```text
Inputs -> Evidence -> Execution -> Checks -> Verdict -> Approval -> Receipt
```

A client uploads work or sends an agent submission. The Cloud loads the Flight Sheet, the declared rulebook for the lane. The referee engine runs deterministic checks and throws flags when a rule is violated. A human approves. The Cloud mints a receipt on a per-org hash chain, and `/ledger/verify` recomputes every hash, sequence number, and parent link so anyone can prove the chain has not been tampered with.

No hidden judge model. No "seems good." No quality vibes. The referee is a rulebook.

## What The Docs Now Cover

- DefendableCloud overview, Run lifecycle, three lanes, CLI, API, datasets/models, enterprise security, and operations
- DefendableOS rulebook and verification language
- DefendableDatasets and DefendableApps context
- Receipts, ledgers, schemas, examples, and operating principles

## Read In This Order

1. [DefendableCloud Overview](/defendablecloud/overview/)
2. [The Defendable Run](/defendablecloud/the-defendable-run/)
3. [Three Lanes](/defendablecloud/three-lanes/)
4. [Defendable CLI](/defendablecloud/cli/)
5. [Current API Surface](/defendablecloud/api/)
6. [Enterprise Security](/defendablecloud/enterprise-security/)
7. [Operations Runbook](/defendablecloud/operations/)

## The Platform Map

| Product | Job | Status |
|---|---|---|
| DefendableCloud | Hosted proof vault for Runs, receipts, datasets, models, incidents, and enterprise audit trails. | Live (`api.defendablecloud.com`) |
| DefendableOS | Verification doctrine and rulebook layer. | Live (embodied in the Cloud) |
| DefendableRouter | Routing layer for members, datasets, compute lanes, and jobs. Mints local checksummed receipts (a SHA-256 over canonical JSON per receipt), distinct from the Cloud's per-org hash chain. | v0.1 spine, local + CI-verified, not publicly deployed yet |
| DefendableDatasets | Dataset graph, registry, manifests, hashes, and fine-tuning pack exports. | Roadmap / vision |
| DefendableApps | Small edge agents for Jetson-class devices. | Roadmap / vision |
| DefendableLedger / DDEED | Longer-term public proof and deed language. | Roadmap / vision |

## Enterprise Position

DefendableCloud is an enterprise-grade launch foundation. It has real controls for auth, RBAC, API keys, receipt chains, public redaction, dataset quotas, WAF guidance, backups, incidents, secrets rotation, and CI gates.

It is not yet a full hyperscale cloud provider. SSO/SAML/OIDC, SCIM, external penetration testing, formal SOC2 audit, and public SLA/status workflows remain roadmap until implemented and tested.

## Doctrine

> The referee is a rulebook, not a judge.

> A receipt is only as defensible as the checks behind it.

> No proof, no honey.

> The docs are part of the control surface.

