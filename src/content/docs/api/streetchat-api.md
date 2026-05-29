---
title: StreetChat API
description: StreetChat is a roadmap rail — not yet a public API.
---

:::note[Roadmap]
StreetChat is a **vision rail, not yet built** as a public API. There is no `/v1/chat/*`
endpoint — no session registration, no transcript fetch, no per-session pair list — and there is no
WebSocket transcription server mode available today.
:::

The intent is for StreetChat to be the field-intake surface: conversations and transcripts that get
graded and routed into the training corpus. Until that ships as a real, deployed API, treat every
StreetChat route shape as interface intent only — do not point integrations at it.

The live, public surface today is DefendableCloud at `api.defendablecloud.com` — its Defendable Run,
eval flight-sheet lane, and hash-chained receipts. See the Receipts API and the Tribunal API pages
for what you can call right now.

***

🐝 *Operator-grade · books and records · to the shed.*
