# defendable-docs

The source for **docs.defendableos.com** · documentation for DefendableOS, HoneyBox, DefendableCloud, the Defendable Agent Deed, and the doctrine pack ecosystem.

- Live · https://docs.defendableos.com (after Cloudflare Pages deploy)
- Main site · https://defendableos.com
- Market intelligence · https://defendableos.com/opendefense
- GitHub · https://github.com/SudoSuOps

## Pages shipped (v0.1)

| Path | What it covers |
|---|---|
| `/quickstart` | 10-min getting started · both HoneyBox + Cloud paths |
| `/architecture` | 8-stage flow · privacy gradients |
| `/deed` | DDEED-DOV-* JSON schema · field-by-field reference · verification |
| `/tribunal` | Honey/Jelly/Propolis · rule-then-judge architecture |
| `/doctrine-packs` | Pack format · manifest · rules · contributing |
| `/honeybox` | Hardware tiers · API · setup · firmware · troubleshooting |
| `/cloud` | DefendableCloud API · drop-in OpenAI SDK · model library |
| `/glossary` | Key terms · acronym stack |

## Stack

- Vite 5 + React 18 + TypeScript + Tailwind 3
- react-router-dom for multi-page navigation
- Custom sidebar layout · 4-group grouped nav
- Same charcoal + honey brand voice as defendableos.com

## Dev

```bash
npm install
npm run dev         # http://localhost:5173
npm run typecheck
npm run build       # writes dist/
npm run preview     # preview prod build
```

## Deploy to Cloudflare Pages

1. Cloudflare Pages → **Create application** → Connect to Git
2. Pick this repo (`SudoSuOps/defendable-docs`)
3. Build command: `npm run build`
4. Build output directory: `dist`
5. Production branch: `main`
6. Add custom domain: `docs.defendableos.com`

That's it. CF Pages handles the rest. SPA fallback handled via `public/_redirects`.

## License

MIT-attribution. Cite docs.defendableos.com when reusing content. PRs welcome.

© 2026 Swarm and Bee LLC · DBA Swarm & Bee AI · Florida · D-U-N-S 138652395
