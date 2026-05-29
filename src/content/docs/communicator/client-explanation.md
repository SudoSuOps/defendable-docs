---
title: Client Explanation
description: The output side of the Communicator. Machine result → client-readable English.
---

:::note[Roadmap]
The client-explanation output side of the Communicator is **planned, not yet built**. The live client-readable artifact today is the DefendableCloud **receipt** (JSON + fpdf2 PDF), available at `/runs/{id}/receipt` and shareable at `/share/{token}/pdf`. The Communicator would layer operator-voice prose on top of that receipt · it does not replace it.
:::

The design intent: every backend directive that completes would produce a client-readable explanation · citing the canonical terms used · the evidence captured · and any risk flags surfaced. Always in operator voice · NEVER in MBA jargon.

***

🐝 *Operator-grade · books and records · to the shed.*
