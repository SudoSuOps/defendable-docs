---
title: Cloudflare Pages
description: Per-project CF Pages configuration for the DefendableCloud site, Vault app, and docs.
---

The DefendableCloud **site**, **app (Vault)**, and **docs** deploy to Cloudflare Pages. The API does not — it runs on Fly.io.

## Build configuration

- `NODE_VERSION=22` (matches CI's `22.12.0`).
- Build command: `npm run build`.
- The **app** and **site** each build from their own directory (`app/`, `site/`) in the `defendable-cloud-v2` monorepo.
- CI runs `npm audit --audit-level=low` before the build for both projects.

## Output directories

Confirm the output dir against each project's build config rather than assuming:

- **site** (`site/`) — Astro, `output: "static"` → emits `dist/`.
- **app** (`app/`) — Vite React SPA, `build.outDir: "dist"` → emits `dist/`.

## Domains and SSL

Custom domains are added in the Cloudflare Pages UI. SSL auto-provisions in roughly 10 minutes after the domain is attached.

***

🐝 *Operator-grade · books and records · to the shed.*
