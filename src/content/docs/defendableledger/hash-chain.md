---
title: DefendableLedger · Hash-Chain Format
description: Append-only hash-chained JSONL. Each record links to the prior. Tamper-evident · client-side verifiable · the in-house anchoring layer.
---

## Format

DefendableLedger is an **append-only hash-chained JSONL file**. One record per line. Each record carries `parent_hash` pointing at the prior record's `record_sha256`. Walking the chain from the genesis record verifies the entire ledger.

```
data/ledger/defendable_ledger.jsonl
```

## Record schema

```json
{
  "ledger_seq": 42,
  "record_id": "DLR-20260524-01KSE...ABC",
  "record_type": "RECEIPT | VERDICT | PAIR | DEED",
  "created_at": "2026-05-24T22:33:26Z",
  "parent_hash": "<prior record_sha256, or 64 zeros for genesis>",
  "payload_ref": "data/runs/DRR-20260524-XYZ/router_receipt.json",
  "payload_hash": "<sha256 of the payload file content>",
  "issued_by": "DefendableRouter | Tribunal | SwarmJelly",
  "host": "smash",
  "record_sha256": "<sha256 of this record with record_sha256 nulled>"
}
```

## How `record_sha256` is computed

1. Take the record JSON.
2. Set `record_sha256` to `null`.
3. Canonicalize: sort keys · no whitespace · UTF-8.
4. Compute SHA-256 over the canonical bytes.
5. The result IS the record's `record_sha256`.

This is the same canonicalization rule the spine uses for receipt hashes. One algorithm. One verifier path.

## How the chain is verified

```python
expected_parent = "0" * 64  # genesis link
for line in open("defendable_ledger.jsonl"):
    rec = json.loads(line)
    assert rec["parent_hash"] == expected_parent, "chain break"
    assert rec["record_sha256"] == compute_record_sha256(rec), "tamper"
    expected_parent = rec["record_sha256"]
```

Any single record mutation breaks every link downstream. The verifier surfaces the exact `ledger_seq` of the break.

## Why this beats external chain anchoring

| dimension | external chain (Hedera / IPFS / OP_RETURN) | DefendableLedger (in-house) |
|---|---|---|
| **anchoring cost per record** | external API tokens · per-tx fees | sovereign disk · ~$0 |
| **latency to anchor** | seconds–minutes (network round-trip) | sub-millisecond |
| **dependency** | external chain availability + their priorities | the house · always-on |
| **verification** | requires external node / explorer | client-side SHA-256 · WebCrypto |
| **trust layer** | shared with everyone else on that chain | compounds *inside the house* |
| **data sovereignty** | partial (metadata leaked) | full |
| **publication** | separate step | git push → CF Pages → public proof |

The chain's job is **tamper-evidence**, not third-party validation. SHA-256 + append-only + parent_hash links give tamper-evidence at zero external cost.

For external broadcast of the ledger root (when needed), a **single periodic hash anchor** can be published to a public surface — that's a cron, not a per-record cost. The hot path stays sovereign.

## Genesis record

The first record in any new ledger:

```json
{
  "ledger_seq": 0,
  "record_id": "DLR-<date>-GENESIS",
  "record_type": "GENESIS",
  "created_at": "<iso>",
  "parent_hash": "0000000000000000000000000000000000000000000000000000000000000000",
  "payload_ref": "",
  "payload_hash": "0000000000000000000000000000000000000000000000000000000000000000",
  "issued_by": "DefendableLedger",
  "host": "<host>",
  "record_sha256": "<computed>"
}
```

## Append rules

- Records are written one per line, JSON, no trailing whitespace.
- Each append is fsync'd before returning to the caller (durability).
- `ledger_seq` is monotonic · the writer holds an exclusive lock for the write.
- No edits. No deletes. The ledger only grows.

***

🐝 *Append-only · hash-chained · books and records · to the shed.*
