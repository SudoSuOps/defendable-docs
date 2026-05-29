---
title: SHA-256 Hashing
description: The hash discipline. Canonical JSON · deterministic · reproducible. Same algorithm on both server and browser.
---

:::note[Roadmap — vision layer]
The StreetLedger public hashing surface is **design intent**. The canonicalization *principle* on this page is real and is exactly what the shipped systems already do — see the two live code paths below.
:::

## The principle

JSON canonicalization: sorted keys · no whitespace · UTF-8 encoding. SHA-256 over the canonical bytes. If the hash depended on key ordering, whitespace, or encoding choice the proof would break — two parties computing the hash from the same JSON must always get the same answer. Otherwise the chain-of-title is fiction.

## The real, shipped code paths

This exact discipline ships in production today in two places:

- **DefendableCloud** (`api/app/hashing.py`, used by `api/app/ledger.py`): canonical JSON via `orjson.dumps(obj, option=orjson.OPT_SORT_KEYS)`, then `sha256_hex(canonical(payload))`. This is what backs the per-org `DCR-*` hash chain at `/ledger` + `/ledger/verify`.
- **DefendableRouter** (`core/pricing.py` / receipt writer): canonical JSON with `sort_keys`, fixed separators, `Decimal` rendered to 2-decimal strings, and ISO timestamps — hashed into `checksum_sha256` for each JSONL receipt line (checksummed, not chained).

## Why determinism matters

Same algorithm · same output · every time. A buyer, a regulator, or a model can recompute the hash from the canonical JSON and get the same 64 characters the issuer stamped — no trust required, no round-trip required.

***

🐝 *Operator-grade · books and records · to the shed.*
