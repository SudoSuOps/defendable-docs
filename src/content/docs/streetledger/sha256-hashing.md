---
title: SHA-256 Hashing
description: The hash discipline. Canonical JSON · deterministic · reproducible. Same algorithm on both server and browser.
---

## The algorithm

JSON canonicalization: sorted keys · no whitespace · UTF-8 encoding. SHA-256 over the canonical bytes. The exact algorithm runs identically in:

- Python `streetchat.ledger.canonicalize()` + `hashlib.sha256`
- TypeScript `canonicalize()` in `street-ledger/scripts/build-ledger.ts`
- TypeScript `canonicalize()` in `street-ledger/src/pages/Verify.tsx` (browser · `crypto.subtle.digest`)

## Why determinism matters

If the hash depends on key ordering · whitespace · or encoding choice · the proof breaks. Two parties computing the hash from the same JSON must always get the same answer. Otherwise the chain-of-title is fiction.

## How to verify locally

```bash
# Pull the term JSON
curl -s https://ledger.mrdefendable.com/ledger/terms/cre_terms/{slug}/v1/term.json > term.json

# Hash it (must match the publicly stamped hash)
python3 -c "import json, hashlib; raw=json.load(open(term.json)); ..." # or use the streetchat CLI
```

Same algorithm · same output · every time.

***

🐝 *Operator-grade · books and records · to the shed.*


> This is a foundational page in the DefendableDocs ecosystem map. The structure is committed · the deep content extends as the platform matures. Cross-references are live below.
