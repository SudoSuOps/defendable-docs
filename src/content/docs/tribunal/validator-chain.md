---
title: Validator Chain
description: The deterministic sequence the referee runs across every submission. Structure → schema → math → evidence → policy. No model on the chain.
---

The validator chain is the deterministic sequence the referee runs across every Defendable Run. It is **rule-only** — no model is called on the chain. Each stage either passes or raises a flag; a critical flag (high tier) at any stage caps the verdict at propolis.

## The five-stage chain

```
1. Structure   →  required sections present
2. Schema      →  fields obey declared types
3. Math        →  re-derive every claimed number from the agent's own inputs
4. Evidence    →  required fields non-empty · assumptions labeled · missing inputs disclosed
5. Policy DSL  →  declared gates (e.g. DSCR >= 1.20) evaluated against the agent's own numbers
```

Each stage is governed by the Flight Sheet's `eval_spec`. The full operational detail lives in [Rulebook Engine](/defendableos/rulebook-engine/).

## Each stage in one line

| Stage | What it checks | Tier on flag |
|---|---|---|
| **Structure** | `required_output_schema.required` keys are all present. | high (missing = false-honey risk) |
| **Schema** | Each field's value obeys the declared type / enum / shape. | high |
| **Math** | Every `calculations[]` result is recomputed via the safe AST evaluator and compared to the claimed result within tolerance. Variable penalty by magnitude. | low / mid / high (by spot of the foul) |
| **Evidence** | Required evidence fields non-empty; assumptions labeled; missing inputs disclosed. | mid (typical) |
| **Policy DSL** | Declared gates expressed in the DSL (`{calc}`/`{field}`/`{len}`/literal operands; `== != >= <= > <`, `in`, `all_nonempty`, `and`, `or`, `not`, `if` ops) evaluated against the agent's own numbers. Missing operand → `skip` (never false-flag). | declared per rule |

## What's NOT on the chain

- **No LLM call.** The chain is pure code + math.
- **No external service call** for verification (no third-party fact-checker, no chain anchor). Receipt verification is client-side WebCrypto over the per-org hash chain.
- **No silent skips.** Every declared check key must be implemented by the engine. If a Flight Sheet references an unknown check key, the engine refuses to load the sheet — a silently-skipped check is a false honey.

## Why this matters

Every stage is **declarable on the Flight Sheet** and **verifiable by re-running the engine**. The verdict is reproducible: the same Flight Sheet + the same submission → the same verdict, every time. That is the trust boundary. Model assistance lives outside this chain, advisory only, never on the receipt path.

***

🐝 *Five stages · all code · all reproducible. To the shed.*
