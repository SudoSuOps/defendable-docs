---
title: Datasets and Models
description: How DefendableCloud handles dataset packages, download grants, model catalog cards, model pin receipts, cooks, and runners.
---

DefendableCloud treats datasets and model choices as assets that need receipts.

## Dataset Library

The dataset library exposes catalog packages through `/library`.

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
| `GET` | `/library` | Catalog view. |
| `GET` | `/library/{slug}` | Package detail. |
| `POST` | `/library/{slug}/download` | Download grant and receipt. |
| `GET` | `/library/{slug}/samples` | Public/sample rows. |

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
| `GET` | `/models` | Model catalog. |
| `GET` | `/models/{slug}` | Model card. |
| `POST` | `/models/{slug}/pin` | Pin model into receipt. |

Model pin receipts are useful when the buyer needs a record that a workflow used a specific model family, tier, or hardware recommendation at a point in time.

## Cooks and Runners

Cooks represent model/data preparation jobs. Runners are worker processes that claim jobs, update status, complete, or fail.

Relevant routes:

| Method | Path | Purpose |
|---|---|---|
| `POST` | `/runs/{run_id}/cook` | Create cook request. |
| `GET` | `/cooks` | List cook jobs. |
| `GET` | `/cooks/{cook_id}` | Cook detail. |
| `POST` | `/cooks/next` | Runner claims next cook. |
| `POST` | `/cooks/{cook_id}/status` | Runner status update. |
| `POST` | `/cooks/{cook_id}/complete` | Runner completion. |
| `POST` | `/cooks/{cook_id}/fail` | Runner failure. |

Runners should never be public unauthenticated services. They use runner credentials and should be deployed on controlled compute.

