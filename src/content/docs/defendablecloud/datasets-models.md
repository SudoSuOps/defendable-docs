---
title: Datasets and Models
description: How DefendableCloud handles dataset packages, download grants, model catalog cards, model pin receipts, cooks, and runners.
---

DefendableCloud treats datasets and model choices as assets that need receipts.

## Dataset Library

The dataset library exposes catalog packages through `/datasets/catalog`. A plain members-only list (entitlement-aware) is at `GET /datasets`.

Flow:

1. Member browses catalog.
2. Member requests package download.
3. API checks membership and quota.
4. API creates short-lived signed URL.
5. API mints dataset-download receipt.
6. Public receipt redacts storage keys while preserving proof fields.

Relevant routes:

| Method | Path | Purpose |
|---|---|---|
| `GET` | `/datasets` | Members-only dataset list (entitlement-aware). |
| `GET` | `/datasets/catalog` | Catalog view. |
| `GET` | `/datasets/catalog/{slug}` | Package detail. |
| `POST` | `/datasets/catalog/{slug}/download` | Download grant and receipt. |
| `GET` | `/datasets/catalog/{slug}/samples` | Public/sample rows. |

The download grant mints a receipt with schema `defendablecloud.dataset-download-receipt/v1`.

## Dataset Anti-Abuse

Controls:

- authenticated members only
- `DATASET_DOWNLOAD_DAILY_LIMIT`
- Cloudflare route limits
- short-lived object URLs
- grant receipts
- public receipt redaction
- logging and alerts on spikes

## Model Catalog

The model catalog records what model is recommended, pinned, or used for a proof lane.

Relevant routes:

| Method | Path | Purpose |
|---|---|---|
| `GET` | `/models/catalog` | Model catalog. |
| `GET` | `/models/catalog/{slug}` | Model card. |
| `POST` | `/models/catalog/{slug}/pin` | Pin model into receipt. |

The pin mints a receipt with schema `defendablecloud.model-pin-receipt/v1`.

Model pin receipts are useful when the buyer needs a record that a workflow used a specific model family, tier, or hardware recommendation at a point in time.

## Cooks and Runners

Cooks represent model/data preparation jobs. Runners are worker processes that claim jobs, update status, complete, or fail.

Relevant routes:

| Method | Path | Purpose |
|---|---|---|
| `POST` | `/runs/{run_id}/cook` | Create cook request. |
| `GET` | `/cooks` | List cook jobs. |
| `GET` | `/cooks/{cook_id}` | Cook detail. |
| `POST` | `/runner/cooks/next` | Runner claims next cook (internal-key gated). |
| `POST` | `/runner/cooks/{cook_id}/status` | Runner status update. |
| `POST` | `/runner/cooks/{cook_id}/complete` | Runner completion. |
| `POST` | `/runner/cooks/{cook_id}/fail` | Runner failure. |

Runners should never be public unauthenticated services. They use runner credentials and should be deployed on controlled compute.

