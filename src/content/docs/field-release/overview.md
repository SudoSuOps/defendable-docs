---
title: DefendableOS Agent Operations Prototype — Field Proof v0.1
description: The fielded, independently audited DefendableOS agent-operations prototype, the synthetic customer-support demo, what was verified, and what remains limited.
---

**Status:** IMPLEMENTED + AUDITED WITH LIMITATIONS · the public field surface is a
CONTROLLED SYNTHETIC DEMO.

This page describes what is **actually fielded and independently audited today** — not future
architecture.

## The four public runtime modules

DefendableOS agent operations is built from four small public modules, each independently
audited and re-audited by the Codex Tribunal:

- **Swarm-Doctor** — runtime triage + roster/continuity evidence. <https://github.com/SudoSuOps/swarm-doctor>
- **Conditioning Coach** — advisory preventive readiness review. <https://github.com/SudoSuOps/conditioning-coach>
- **Owner Roster Registry** — records validated evidence + owner-approved roster state. <https://github.com/SudoSuOps/owner-roster-registry>
- **Permission Broker** — local broker-routed action enforcement (mock tools only). <https://github.com/SudoSuOps/permission-broker>

Current verdict for all four and the cross-module flow: **VERIFIED_AS_REPAIRED_WITH_LIMITATIONS**.

## The synthetic customer-support field scenario

A controlled, **synthetic** demonstration is described by the audited public modules below:

:::note[Demo surface — roadmap]
The synthetic agent-operations walkthrough is described by the audited module repos below; a
dedicated hosted demo page on DefendableCloud is not yet fielded as a standalone route.
:::

- Starter `support-01.acme.defendable.eth` is `INJURED_RESERVE`.
- Backup `support-02.acme.defendable.eth` is `ACTIVE_BACKUP_RESTRICTED_DUTY`; coverage is `COVERED_BY_BACKUP_RESTRICTED_DUTY`.
- The backup may run **classify_ticket, draft_customer_response, route_escalation, update_case_notes**.
- The backup is **blocked** from **issue_refund, make_policy_exception, close_compliance_case**.

## What was verified

- Allowed plays execute against a synthetic local mock; drafts are never sent externally.
- The forbidden refund is **blocked** (`DENY_ACTION_NOT_IN_PERMISSION_ENVELOPE`, executed false), and **no refund execution record is created**.
- A refund-review request **queues for human review only** (`executed_sensitive_action: false`); the agent never inherits human authority.
- Every result carries a synthetic-demo label, decision, actor, and a content-integrity receipt hash.

## What remains limited / NOT cleared

- **NOT CLEARED FOR PRODUCTION**, **NOT CLEARED FOR EXTERNAL SAAS ENFORCEMENT**.
- No live permission revocation, no real refund execution, no real paging, no certification, no insurance, no blockchain/ENS operational anchoring, no authenticated owner signature proof.

:::caution[Hash integrity scope]
SHA-256 hashes in this prototype establish content-integrity linkage only. They do not
independently prove authorship, owner approval, trusted timestamping, immutability, blockchain
anchoring, external attestation, certification, insurance coverage, or external platform
enforcement.
:::

- Independent audit tape: <https://github.com/SudoSuOps/defendableos-tribunal-audit>
