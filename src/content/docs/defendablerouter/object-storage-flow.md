---
title: Object Storage Flow
description: How a receipt flows from router POST to durable object storage to StreetLedger publication.
---

1. POST → router validates ENS/App/Agent · 2. Canonicalize + hash · 3. Write to S3/R2/Tigris under streetledger.eth/{class}/{path} · 4. Async Tribunal pickup · 5. DDEED issuance · 6. Hedera anchor · 7. StreetLedger publication.

***

🐝 *Operator-grade · books and records · to the shed.*


> This is a foundational page in the DefendableDocs ecosystem map. The structure is committed · the deep content extends as the platform matures. Cross-references are live below.
