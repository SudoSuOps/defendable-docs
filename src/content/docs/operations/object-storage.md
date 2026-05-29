---
title: Object Storage
description: S3-compatible object storage for DefendableCloud — Tigris by default, R2/AWS S3 as alternatives, via boto3.
---

DefendableCloud stores receipt artifacts (JSON + PDF) in S3-compatible object storage via boto3.

## Configuration

| Variable | Notes |
|---|---|
| `AWS_ENDPOINT_URL_S3` | Default `https://fly.storage.tigris.dev`. |
| `AWS_REGION` | Default `auto` (Tigris). |
| `AWS_ACCESS_KEY_ID` | Storage key. |
| `AWS_SECRET_ACCESS_KEY` | Storage secret. |
| `TIGRIS_BUCKET` | Bucket name. Default `defendable-cloud`; production `fly.toml` sets `defendable-cloud-v2`. |

**Tigris is the default backend** (the endpoint and `auto` region above). Because access goes through boto3, **R2 and AWS S3 are S3-compatible alternatives** — point `AWS_ENDPOINT_URL_S3` (and region/credentials) at the provider you want.

## Best-effort uploads

Artifact upload is **best-effort**: the JSON + PDF receipt write is wrapped in try/except. The authoritative **per-org hash chain lives in Postgres**, so a storage outage degrades gracefully and never blocks a receipt.

:::note
The DefendableRouter receipt spine is a separate component with its own local JSONL storage; any `STREETLEDGER_BUCKET`-style setting there does not belong to this cloud object-storage path.
:::

***

🐝 *Operator-grade · books and records · to the shed.*
