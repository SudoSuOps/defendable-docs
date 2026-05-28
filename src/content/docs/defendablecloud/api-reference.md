---
title: API Reference
description: Every endpoint on api.defendablecloud.com — magic-link auth, the Run lifecycle, share, ledger. Each response is locked by a named Pydantic schema.
---

The DefendableCloud REST API. Base URL: `https://api.defendablecloud.com`.

> Every response shape is locked by a named Pydantic schema in `components.schemas` of the [OpenAPI doc](https://api.defendablecloud.com/openapi.json). The doctrine vocabulary (`Severity`, `RuleSeverity`, `TierLevel`, `CheckStatus`, `IncidentKind`) is enforced at the wire — drift fails contract tests before it ships.

## Conventions

- **Auth.** Every authenticated endpoint requires `Authorization: Bearer <JWT>`. Get the JWT via the magic-link flow below.
- **Content type.** JSON in and out. `Content-Type: application/json` on writes.
- **Errors.** Non-2xx responses return `{"detail": "<message>"}`. Status codes: `400` (bad input) · `401` (no/expired auth) · `404` (not found) · `409` (state conflict — e.g. approve before audit) · `5xx` (server).
- **Versioning.** The CLI ([defendable](/defendablecloud/cli/)) is the canonical generated client. Hand-rolled HTTP clients are welcome — the OpenAPI doc has the typed shapes.

## Authentication

### `POST /auth/request`

Trigger a magic-link sign-in email.

```bash
curl -X POST https://api.defendablecloud.com/auth/request \
  -H "Content-Type: application/json" \
  -d '{"email":"you@org.com"}'
```

→ `{"ok": true, "sent": true}` (or `"dev_link": "..."` in non-prod when email isn't configured)

### `POST /auth/verify`

Trade the magic-link token (the `token=` value from the URL in the email) for a JWT.

```bash
curl -X POST https://api.defendablecloud.com/auth/verify \
  -H "Content-Type: application/json" \
  -d '{"token":"<TOKEN-FROM-EMAIL>"}'
```

→ `{"access_token": "eyJ...", "token_type": "bearer", "user": {...}}`

The JWT lives 30 days (`JWT_TTL_HOURS=720`). Send it on every subsequent request as `Authorization: Bearer <JWT>`.

### `GET /auth/me`

Show the signed-in user.

```bash
curl https://api.defendablecloud.com/auth/me \
  -H "Authorization: Bearer $JWT"
```

→ `{"id": "...", "email": "...", "org_id": "...", "org_name": "..."}`

CLI: `defendable auth login --email <email>` → `defendable auth verify <token>` → `defendable auth status`.

## Projects

### `GET /projects` · `POST /projects`

```bash
curl https://api.defendablecloud.com/projects -H "Authorization: Bearer $JWT"

curl -X POST https://api.defendablecloud.com/projects \
  -H "Authorization: Bearer $JWT" -H "Content-Type: application/json" \
  -d '{"name":"my product"}'
```

CLI: `defendable projects ls` · `defendable projects create --name <name>`.

## Flight Sheets

### `GET /flight-sheets`

List the active rulebook library. Returns a `FlightSheetList`:

```bash
curl https://api.defendablecloud.com/flight-sheets \
  -H "Authorization: Bearer $JWT"
```

```json
{
  "flight_sheets": [
    {
      "id": "fs_01...",
      "slug": "cre_memo_dscr_ltv_v1",
      "name": "DSCR and LTV Analysis",
      "version": "1.0",
      "lane": "agent",
      "summary": "...",
      "pass_threshold": 80,
      "fail_threshold": 60,
      "audit_checks": [
        {
          "key": "dscr_gate",
          "label": "DSCR ≥ 1.20",
          "category": "policy",
          "kind": "auto",
          "severity": "critical"
        }
      ]
    }
  ]
}
```

CLI: `defendable flight-sheets ls [--lane <l>]` · `defendable flight-sheets show <slug>`.

## Run lifecycle

The Defendable Run primitive — every stage maps to one endpoint.

### `POST /runs` · `GET /runs` · `GET /runs/{id}`

Create / list / show. Composite `GET /runs/{id}` returns flight sheet, agent profile, evidence, checks, verdict, approval, receipt, ownership.

```bash
curl -X POST https://api.defendablecloud.com/runs \
  -H "Authorization: Bearer $JWT" -H "Content-Type: application/json" \
  -d '{"project_id":"p...", "flight_sheet_id":"fs...", "title":"Q2 deal"}'
```

CLI: `defendable runs new` · `defendable runs ls` · `defendable runs show <id>`.

### Evidence

```
POST /runs/{id}/evidence          # text / note / url / etc.
POST /runs/{id}/evidence/upload   # file (multipart, 25 MB max)
```

```bash
curl -X POST https://api.defendablecloud.com/runs/$RUN_ID/evidence \
  -H "Authorization: Bearer $JWT" -H "Content-Type: application/json" \
  -d '{"kind":"note","label":"deal terms","content":"Loan 8.625M..."}'

curl -X POST https://api.defendablecloud.com/runs/$RUN_ID/evidence/upload \
  -H "Authorization: Bearer $JWT" \
  -F "file=@./memo.pdf" -F "label=property memo"
```

CLI: `defendable evidence add` · `defendable evidence upload`.

### Submission

```
POST /runs/{id}/submission
```

```bash
curl -X POST https://api.defendablecloud.com/runs/$RUN_ID/submission \
  -H "Authorization: Bearer $JWT" -H "Content-Type: application/json" \
  -d @./agent-output.json
```

The submission JSON body should match the Flight Sheet's `required_output_schema`. The canonical shape is described on [Integrate · Developer Quickstart](/defendablecloud/integrate/).

CLI: `defendable submission add <run-id> --output-file <path>`.

### Audit

```
POST   /runs/{id}/audit        # apply the rulebook
PATCH  /runs/{id}/checks/{id}  # grade a checklist rule
POST   /runs/{id}/findings     # finalize the verdict
```

```bash
curl -X POST https://api.defendablecloud.com/runs/$RUN_ID/audit \
  -H "Authorization: Bearer $JWT"
```

The audit response carries `checks` (per-rule results), `verdict` (if deterministic), `needs_grading` (boolean), `deterministic` (boolean).

If `needs_grading: true`, walk the checks where `status="open"` and apply them:

```bash
curl -X PATCH https://api.defendablecloud.com/runs/$RUN_ID/checks/$CHECK_ID \
  -H "Authorization: Bearer $JWT" -H "Content-Type: application/json" \
  -d '{"status":"pass"}'   # or "flag"
```

Then finalize:

```bash
curl -X POST https://api.defendablecloud.com/runs/$RUN_ID/findings \
  -H "Authorization: Bearer $JWT"
```

CLI: `defendable audit run` · `defendable audit grade` · `defendable audit finalize`.

### Approval

```
POST /runs/{id}/approve
```

→ Returns an `Approval`:

```bash
curl -X POST https://api.defendablecloud.com/runs/$RUN_ID/approve \
  -H "Authorization: Bearer $JWT" -H "Content-Type: application/json" \
  -d '{"decision":"approved","note":"ship it"}'
```

`decision` ∈ `approved` · `rejected` · `escalated`. Receipts only mint on `approved`.

CLI: `defendable approval set <run-id> --decision <d>`.

### Receipt

```
POST /runs/{id}/receipt
```

→ Returns a `Receipt` (locked schema):

```bash
curl -X POST https://api.defendablecloud.com/runs/$RUN_ID/receipt \
  -H "Authorization: Bearer $JWT"
```

```json
{
  "receipt_id": "DCR-000004-3a7c9f2b",
  "org_seq": 4,
  "parent_hash": "9c2f...e1a4",
  "receipt_sha256": "a83e...77f1",
  "share_token": "shr_3f7c...8d21",
  "share_url": "https://api.defendablecloud.com/share/shr_3f7c...8d21",
  "pdf_url": "https://api.defendablecloud.com/share/shr_3f7c...8d21/pdf"
}
```

CLI: `defendable receipt generate <run-id>`.

## Run projections — one per doctrine concept

These give Submission · Check · Finding · Verdict each a focused endpoint. All return a single named schema.

| Method · Path | Returns |
|---|---|
| `GET /runs/{id}/submission` | `Submission` |
| `GET /runs/{id}/checks` | `ChecksList` |
| `GET /runs/{id}/flags` | `FlagsList` (Findings only — checks with `status="flag"`) |
| `GET /runs/{id}/verdict` | `Verdict` |

```bash
curl https://api.defendablecloud.com/runs/$RUN_ID/flags \
  -H "Authorization: Bearer $JWT" | jq '.flags[] | {key,severity,detail}'
```

CLI: `defendable runs submission` · `runs checks` · `runs flags` · `runs verdict`.

## Public · share + verify (no auth)

### `GET /share/{token}` · `GET /share/{token}/pdf`

Public receipt view. Returns a `PublicReceipt` with `verified` boolean (server-side hash recompute).

```bash
curl https://api.defendablecloud.com/share/shr_3f7c...8d21
```

Anyone can recompute the verification themselves — every receipt carries `payload_hash` and `receipt_sha256`; the chain is per-org and walkable.

CLI: `defendable verify <token-or-url>`.

## Ledger · the per-org hash chain

### `GET /ledger`

List the chain in `org_seq` order. No payload — just chain coordinates.

```bash
curl https://api.defendablecloud.com/ledger \
  -H "Authorization: Bearer $JWT"
```

Returns a `LedgerList` of `LedgerEntry`:

```json
{
  "entries": [
    {
      "receipt_id": "DCR-000000-...",
      "org_seq": 0,
      "parent_hash": "0000...0000",
      "receipt_sha256": "a83e...",
      "created_at": "..."
    }
  ]
}
```

### `GET /ledger/verify`

Walk the chain and check hash + parent linkage. Returns a `LedgerVerifyResult`:

```bash
curl https://api.defendablecloud.com/ledger/verify \
  -H "Authorization: Bearer $JWT"
```

```json
{"ok": true, "receipts_checked": 4, "errors": []}
```

CLI: `defendable ledger ls` · `defendable ledger verify`.

## Doctrine vocabulary (named enums)

These are emitted as named OpenAPI components and enforced at every response boundary:

| Type | Values | Where it appears |
|---|---|---|
| `Severity` | `honey` · `jelly` · `propolis` | `Verdict.severity` |
| `VerdictOutcome` | `pass` · `risk` · `fail` | `Verdict.outcome` |
| `TierLevel` | `low` · `mid` · `high` | flag tiering |
| `CheckStatus` | `pass` · `flag` · `open` · `skip` | `Check.status` |
| `CheckCategory` | `structure` · `schema` · `math` · `evidence` · `policy` | `Check.category` |
| `CheckKind` | `auto` · `checklist` | `FlightSheetRule.kind` |
| `RuleSeverity` | `high · mid · medium · low · critical · noncritical · honey · jelly · propolis · minor` | `Check.severity` · `FlightSheetRule.severity` |
| `ApprovalDecision` | `approved` · `rejected` · `escalated` | `Approval.decision` |
| `IncidentKind` | `rogue` · `dark` · `policy_violation` · `recurring_flag` | `IncidentIn.kind` |

`tier_of()` normalizes any `RuleSeverity` value to a `TierLevel`. Why the union accepts so many values: legacy flight sheets (Kimi Library V1) used `critical` / `noncritical`; the newer doctrine prefers `high` / `mid` / `low`; both stay valid.

`IncidentKind` intentionally does NOT include `single_flag` — a single flag is a Run-level work-defect / deal-finding handled by the [repair plan](/defendableos/rulebook-engine/#the-three-bucket-flag-taxonomy). Crossing into incident-land requires either a declared `policy_violation` or a `recurring_flag` operational pattern.

## Generating clients

The OpenAPI doc is canonical:

```bash
curl https://api.defendablecloud.com/openapi.json
```

Every doctrine schema is a named component (`FlightSheet`, `Submission`, `Check`, `Finding`, `Verdict`, `Approval`, `Receipt`, `LedgerEntry`, `PublicReceipt`, etc.). Standard OpenAPI generators (`openapi-generator`, `openapi-typescript`, etc.) produce typed clients in any language.

The Python CLI uses a thin `httpx` wrapper directly (no generated stubs in v1). If you want a TypeScript client for the Vault SPA or a Go client for a service, generate from `openapi.json`.

***

🐝 *Every endpoint locked by a named schema. The wire is the contract. To the shed.*
