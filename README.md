# defendable-docs

The operating manual for **DefendableOS + DefendableCloud** — the engine that verifies agentic work against a declared rulebook, and the hosted proof vault that mints hash-chained receipts. Source for both `defendabledocs.com` and `docs.defendableos.com`.

- Live (canonical) · https://defendabledocs.com
- Live (subdomain) · https://docs.defendableos.com
- Main site · https://defendableos.com
- DefendableCloud Vault · https://app.defendablecloud.com
- GitHub · https://github.com/SudoSuOps/defendable-docs

## Doctrine

> **DefendableOS** is the engine. **DefendableCloud** is the hosted proof vault.
> The engine runs the rulebook; the vault runs the receipts.
> **The referee is a rulebook, not a judge.**

One primitive — **the Defendable Run**:

```
Inputs → Evidence → Execution → Checks → Verdict → Approval → Receipt
```

No external chain anchoring on the spine — see [`/defendableledger/kill-hedera/`](https://defendabledocs.com/defendableledger/kill-hedera/).

## Sections shipped

| Section | Covers |
|---|---|
| `/` · `/getting-started/` | Front-door orientation. Board / Operator / Buyer / Developer reading paths. |
| `/ecosystem/*` | Overview · architecture · glossary · domain map · operating principles. |
| `/defendableos/*` | The engine · what it is · what it is NOT · the **rulebook engine** · buyer profile · use cases · pricing · engagement-model docs. |
| `/defendablecloud/*` | The vault · the Defendable Run · three lanes · eval lane · generate a receipt. |
| `/mr-defendable/*` | The principal voice · CRE-broker discipline. |
| `/defend-a-pedia/*` | The vocabulary canon · 62+ deeded terms. |
| `/defendableledger/*` | In-house hash-chained books-and-records · kill-hedera doctrine · royal-jelly tiers. |
| `/streetchat/*` · `/streetledger/*` · `/defendablerouter/*` · `/communicator/*` | Component-level surfaces inside the engine. |
| `/tribunal/*` | The referee — reframed as the rulebook engine. |
| `/swarmfixer/*` | The repair layer · propolis corpus → SwarmFixer training. |
| `/ddeed/*` · `/schemas/*` · `/examples/*` | Canonical artifact shapes (deed · receipt · verdict). |
| `/cost-to-mint/*` | Per-deed economics · the cost-to-mint discipline. |
| `/edge/*` · `/agentbench-clawcheck/*` | Edge surfaces · agent benchmarking. |
| `/api/*` · `/operations/*` | API contracts · runbook. |
| `/media/*` · `/legal-risk/*` · `/field-release/*` | Media surfaces · legal disclosures · the audited prototype field-release. |

## Stack

- **Astro 5** + **Starlight 0.30** (static-site documentation framework)
- Sharp for image processing
- Built to `dist/` · served by Cloudflare Pages

## Dev

```bash
npm install
npm run dev       # http://localhost:4321
npm run build     # → dist/
npm run preview   # preview prod build
```

## Deploy to Cloudflare Pages

1. Cloudflare Pages → **Create application** → Connect to Git
2. Pick this repo (`SudoSuOps/defendable-docs`)
3. Build command: `npm run build`
4. Build output directory: `dist`
5. Production branch: `main`
6. Add custom domains: `defendabledocs.com` (canonical) and `docs.defendableos.com` (subdomain mirror).

CF Pages handles the rest. SPA fallback handled via `public/_redirects`.

## License

MIT-attribution. Cite defendabledocs.com when reusing content. PRs welcome.

© 2026 Swarm and Bee LLC · DBA Swarm & Bee AI · Florida · D-U-N-S 138652395
