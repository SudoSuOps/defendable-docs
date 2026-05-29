---
title: Webhooks
description: Outbound webhooks are roadmap. The one real webhook today is inbound /stripe/webhook.
---

:::note[Roadmap]
Outbound webhooks are **not yet built**. There are no per-event-class subscriptions
(`receipts.created`, `deeds.minted`, `tribunal.verdict`, `repair.lift-recorded`), no ENS-key
signing of webhook payloads, and no retry/backoff delivery policy. Treat all of that as vision.
:::

## The one real webhook today: inbound Stripe

DefendableCloud (`api.defendablecloud.com`) accepts **one** webhook — and it is inbound, from
Stripe, not outbound to you. No `/v1` prefix:

- `POST /stripe/webhook` — verifies the Stripe signature against `STRIPE_WEBHOOK_SECRET` and, on a
  successful payment event, activates the org's membership.

This is how membership goes live after checkout. It is the only webhook surface that exists right
now; everything else on this page is roadmap.

***

🐝 *Operator-grade · books and records · to the shed.*
