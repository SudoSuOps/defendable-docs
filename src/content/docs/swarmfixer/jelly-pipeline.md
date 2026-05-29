---
title: Jelly Pipeline
description: How Jelly-tier (risk) verdicts would flow through SwarmFixer.
---

:::note[Roadmap]
This pipeline is **design intent**, not built. The jelly verdict tier is real and
produced by the DefendableCloud eval lane today; the re-run / re-judge loop below is
the planned downstream SwarmFixer layer and does not exist yet.
:::

1. **jelly (risk) verdict assigned** — today the DefendableCloud eval lane assigns
   this tier via a deterministic rulebook referee (`app/executor.py`) that throws
   flags. It is not a Tribunal judge model and not a quality opinion — it is math and
   code applying a declared rulebook.
2. Failure mode extracted.
3. Repair directive generated.
4. Agent re-run with the directive.
5. Output re-judged against the same rulebook.
6. If honey / Royal-Jelly → feed training corpus.
7. If still jelly → escalate to operator review.
8. If propolis → walk and document.

Steps 2–8 are the proposed SwarmFixer loop. Verdict-tier names (honey / jelly /
propolis) match the real executor code.

***

🐝 *Operator-grade · books and records · to the shed.*
