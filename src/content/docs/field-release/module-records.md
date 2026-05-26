---
title: Module Records — Field Proof v0.1
description: Compact record for each audited DefendableOS agent-operations module — purpose, repo, verdict, demonstrated behavior, and limitations.
---

All four modules currently carry the verdict **VERIFIED_AS_REPAIRED_WITH_LIMITATIONS** from the
independent Codex Tribunal audit and repaired re-audit.

## Swarm-Doctor
- **Kind:** runtime triage + roster/continuity.
- **Repo:** <https://github.com/SudoSuOps/swarm-doctor>
- **Demonstrated:** health triage (dead/crash/hung/mismatch → treatment; healthy → discharge); continuity outcomes `BACKUP_RESTRICTED_DUTY` / `HUMAN_FAILOVER_SAFE_MODE` / `OPERATIONS_SUSPENDED`; production suspension escalates `PAGE_REQUIRED`.
- **Limitations:** offline/local; hand-entered observations except `--probe`; advisory continuity (no live activation). Receipt schema valid but not self-invoked (disclosed).

## Conditioning Coach
- **Kind:** advisory readiness review.
- **Repo:** <https://github.com/SudoSuOps/conditioning-coach>
- **Demonstrated:** five recommendations; transparent score; a critical incident overrides a high score to `REMOVE_FROM_ACTIVE_ROSTER_PENDING_REVIEW`.
- **Limitations:** advisory only — never changes roster/permissions/continuity/paging; weights are operational, not scientifically validated.

## Owner Roster Registry
- **Kind:** evidence registry + owner-approved roster state.
- **Repo:** <https://github.com/SudoSuOps/owner-roster-registry>
- **Demonstrated:** separates recommended / owner-approved / enforcement state; rejects tampered/identity-missing/unknown/doctrine-violating evidence; recommendation never auto-changes owner-approved state; backup never inherits starter authority.
- **Limitations:** local SQLite; enforcement honest-only (`NOT_ENFORCED` / `ACKNOWLEDGED_MANUAL_CONTROL` / `FUTURE_PERMISSION_BROKER_REQUIRED`).

## Permission Broker
- **Kind:** local broker enforcement (mock tools only).
- **Repo:** <https://github.com/SudoSuOps/permission-broker>
- **Demonstrated:** compiles policy from owner-approved registry snapshot; injured starter has no active authority; restricted backup runs only approved mock plays; `issue_refund` denied with zero side effects; refund-review queues without executing.
- **Limitations:** broker-routed local actions only; cannot stop a bypass; no external SaaS/credential/refund/paging; `external_enforcement_claimed` always false.

## Status legend
- **IMPLEMENTED + AUDITED WITH LIMITATIONS** — the public modules above.
- **CONTROLLED SYNTHETIC DEMO** — the DefendableCloud field scenario.
- **ROADMAP / NOT YET IMPLEMENTED** — external SaaS control, blockchain/ENS operations, insurance, production permission systems, hosted client environments.
