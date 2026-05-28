---
title: Three Lanes
description: Agent Work · Dataset · Compute. The three lanes DefendableCloud runs at launch, each with its own Flight Sheet library and receipt type. Cook and Incident receipts ride the same hash chain.
---

DefendableCloud runs three primary lanes at launch. Each lane has its own **Flight Sheet library** (the declared rulebooks) and its own **receipt type** — but every lane rides the **same [Defendable Run](/defendablecloud/the-defendable-run/) primitive** and the **same per-org hash chain**.

## Agent Work Receipts

**What it proves:** an AI agent did the work it claimed — math re-derivable from its own inputs, evidence cited, declared rules satisfied, severity ranked.

**Example Flight Sheets (from the live library):**

- `cre_memo_dscr_ltv_v1` — CRE underwriting · DSCR ≥ 1.20 gate · LTV ≤ 0.80 gate · debt-service formula re-derived.
- `cre_memo_noi_cap_rate_v1` — NOI + cap-rate reconciliation.
- `fin_wacc_calculation_v1` — WACC formula re-derived.
- `genai_evidence_citation_v1` — every claim carries an evidence reference; unsupported-claim flagging.
- `evx_numerical_fact_extraction_v1` — numerical facts extracted with source pointers.

**Lane shape:**

```
Flight Sheet (rulebook) → Assignment text + Evidence → Agent submission (JSON) →
Referee runs structured executor → Findings ranked by tier → Verdict → Approval → Eval Receipt
```

**Use cases:** CRE underwriting, lending due-diligence, document drafting against policy, evidence extraction for legal/compliance work, GenAI output verification.

The full eval-lane mechanics live in [Eval Lane · The Referee](/defendablecloud/eval-lane/).

## Dataset Receipts

**What it proves:** a dataset meets declared quality rules — schema, balance, dedup, provenance, no PII, no content-safety violations.

**Example Flight Sheets:**

- `dataset_schema_validation_v1` — every record matches the declared schema.
- `dataset_class_balance_v1` — class distribution within declared tolerance.
- `dataset_duplicate_detection_v1` — duplicates flagged at a declared threshold.
- `dataset_provenance_completeness_v1` — every record carries its source.
- `dataset_content_safety_scan_v1` — content-safety rules applied.
- `dataset_train_test_integrity_v1` — train/test split independence.
- `dataset_missing_value_audit_v1` — missing-value rate within declared bounds.

**Lane shape:**

```
Flight Sheet → Dataset manifest + Sample → Auto rules + Operator checklist →
Findings → Verdict → Approval → Dataset Receipt
```

**Use cases:** AI vendor pre-sale dataset attestation, regulated-dataset compliance receipts, model-card backing data.

## Compute Receipts

**What it proves:** a compute run hit declared performance/efficiency/thermal thresholds — from **real instrumentation**, not LLM-generated numbers.

**Example Flight Sheets:**

- `compute_benchmark_score_validation_v1` — benchmark output matches declared thresholds.
- `compute_inference_latency_v1` — measured tok/s against the lane's floor.
- `compute_gpu_spec_verification_v1` — declared GPU + memory + driver vs measured.
- `compute_thermal_power_check_v1` — temperature + power draw under load.
- `compute_memory_bandwidth_v1` — measured vs spec.
- `compute_efficiency_metrics_v1` — perf-per-watt declared bands.
- `compute_system_readiness_v1` — boot + runtime + free-disk + model-load.

**Lane shape:**

```
Flight Sheet → Real instrumentation output (nvidia-smi, vendor benchmark, etc.) →
Declared thresholds checked → Verdict → Approval → Compute Receipt
```

**Use cases:** GPU marketplace provenance, sovereign-compute attestation, owner-compute fitness for a declared lane.

> **Discipline:** compute-lane Runs should consume **measured** evidence, not LLM-generated numbers. If a Flight Sheet expects values the operator can read from `nvidia-smi`, the submission should carry those measured values — not an agent's generation.

## Additional receipt types on the same chain

These ride the same per-org hash chain and the same Run primitive — they are not separate "lanes" so much as additional **receipt schemas**.

### Cook Receipts

**What it proves:** a fine-tune cook produced **measured lift** on the same Flight Sheet, before → after — and the lift was minted only because it actually happened (honest by design; canary-then-cook discipline).

The Cook Run carries: base model, dataset, pre-cook eval verdict, post-cook eval verdict, lift delta. Receipt mints only when the post-cook verdict beats the pre-cook verdict on the declared Flight Sheet.

### Incident Receipts

**What it proves:** a governance event happened and was handled per declared policy — for example, a lane was locked because a capability profile crossed the recurring-flag threshold, or an agent dark/rogue alert fired, or a spend cap was breached.

The Incident Run carries: trigger (e.g. `recurring_flag` · `dark` · `rogue` · `spend_breach`), affected agent profile, response (`lane_locked` · `human_approval_required` · `repair_task_recommended`), and the policy clause it cites.

## One vault. Three lanes. Same chain.

| | Eval | Dataset | Compute | Cook | Incident |
|---|---|---|---|---|---|
| Primitive | Defendable Run | Defendable Run | Defendable Run | Defendable Run | Defendable Run |
| Rulebook | Flight Sheet | Flight Sheet | Flight Sheet | declared Flight Sheet + lift threshold | declared governance policy |
| Receipt schema | `defendablecloud.eval-receipt/v1` | `defendablecloud.dataset-receipt/v1` | `defendablecloud.compute-receipt/v1` | `defendablecloud.cook-receipt/v1` | `defendablecloud.incident-receipt/v1` |
| Hash chain | per-org | per-org | per-org | per-org | per-org |

***

🐝 *Three lanes · same chain · one audit trail per org · to the shed.*
