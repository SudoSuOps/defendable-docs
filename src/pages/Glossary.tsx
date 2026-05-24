import { Page, H2, P, Code, NextPrev, Eyebrow } from "../components/DocsPage";

export default function Glossary() {
  return (
    <Page
      title="Glossary"
      intro={
        <>
          <Eyebrow>REFERENCE · KEY TERMS</Eyebrow>
          <p className="mt-4">
            Vocabulary for the DefendableOS doctrine. CRE-due-diligence
            adjacent where it matters · because business buyers already
            know that vocabulary.
          </p>
        </>
      }
    >
      <H2 id="terms">Terms · alphabetical</H2>

      <div className="mt-6 space-y-5">
        {TERMS.map((t) => (
          <div key={t.term} id={slug(t.term)} className="scroll-mt-24 rounded-xl border border-stone-800 bg-neutral-950/60 px-5 py-4">
            <div className="font-mono text-amber-300 font-semibold text-base">{t.term}</div>
            <p className="mt-1.5 text-sm text-stone-300 leading-relaxed">{t.def}</p>
          </div>
        ))}
      </div>

      <H2 id="acronym-stack">DefendableOS acronyms</H2>
      <P>
        Core stack of three-letter and named identifiers used
        throughout the rail.
      </P>
      <ul className="list-disc list-inside space-y-1 text-stone-300 text-sm">
        <li><Code>DOV</Code> · Defendable Operating Value · prefix on every deed_id</li>
        <li><Code>DDEED</Code> · Defendable Deed</li>
        <li><Code>DCLAW</Code> · Defendable Claw · prefix for receipts + pair-candidate IDs</li>
        <li><Code>DCOMP</Code> · Defendable Compute · prefix for compute intake IDs</li>
        <li><Code>AIOV</Code> · AI Opinion of Value · for asset-side valuation</li>
        <li><Code>ARID</Code> · Agent Risk ID · public disclosure identifier in DefendableHack bounty</li>
      </ul>

      <NextPrev prev={{ label: "DefendableCloud", href: "/cloud" }} />
    </Page>
  );
}

function slug(s: string): string {
  return s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

const TERMS = [
  { term: "Agent", def: "An AI worker that performs business tasks. Singular intentionally · the agent is a 'who' not a 'what' for the operator." },
  { term: "Assignment", def: "An atomic task given to an agent. Each completed assignment becomes one play in the deed ledger." },
  { term: "Bakery vault", def: "Tigris-backed durable storage where every receipt · pair-candidate · deed · and Tribunal verdict lives forever. Survives Fly redeploys (proven 2026-05-23)." },
  { term: "ClawCheck", def: "The free intake at /defend-the-claw. Captures 5 dimensions of an agent (worker · deployment · access · model · memory) and outputs a deterministic Risk Tier." },
  { term: "ClawForge", def: "Continuous adversarial case generator. Disabled by default. Candidates land in pair-candidates/pending/ with synthetic=true." },
  { term: "Compute Bench", def: "Benchmark-attested proof of utility for AI-capable hardware. 4 grades (Identity · Health · Utility · Evidence) · E0-E7 deployment profiles." },
  { term: "DefendableHack", def: "The researcher / bounty rail. Find a PROPOLIS failure in the wild · submit · auto-Tribunal validates · failure becomes a pack v.next adversarial case · you get paid." },
  { term: "Defendable Agent Deed", def: "The artifact: a per-agent attestation record bound to a specific compute deed + benchmark run + Tribunal verdict. ENS-anchored. SHA-256 sealed." },
  { term: "Defendable Operating Value (DOV)", def: "The prefix on every deed ID. Asserts the deed describes a value-supporting operating record · not a marketing claim." },
  { term: "Defendable Work Unit Deed", def: "The bundle: Compute Deed + Agent Deed + Economic Opinion in one issuable producing-asset record. The moat." },
  { term: "Doctrine pack", def: "MIT-licensed test suite + rule layer for an agent class. Defines tasks · adversarial cases · hard-fail rules · judging criteria. Versioned." },
  { term: "Drift Alerts", def: "Early-warning notifications when an agent's flag rate trends up · tribunal mix shifts · pack version lags · or insurance baseline breach forecast crosses threshold." },
  { term: "Fixers", def: "DefendableFixers · the closer layer. Read the lien ledger · ship pack-rule fixes · re-measure · issue the lift deed. 3 tiers (Self-Serve / Managed / Embedded)." },
  { term: "HoneyBox", def: "Physical edge appliance (Jetson family). $249-$5K+ tiers. Stores per-agent ledger locally. Raw data never leaves. The data-residency wedge." },
  { term: "Honey · Jelly · Propolis", def: "Tribunal verdicts. Honey = validated. Jelly = repair candidate. Propolis = adversarial preserved · never auto-flipped." },
  { term: "Lien", def: "An encumbrance on a deed · the way a real estate deed can carry liens. Types: PATTERN_FLAG · PACK_VERSION_LAG · TRUST_DEFICIT · AMBIGUITY · OPERATOR_DRIFT." },
  { term: "Morning Brief", def: "The daily email summary of every deed issued at 06:00. 1-click decisions · 30/60/90 day trend lines · the only product surface most customers ever see." },
  { term: "Pair candidate", def: "A potential training pair · graded by the Pair Factory after Validator review. Lives in pair-candidates/{pending · honey · jelly · jelly-repaired · propolis-failures · quarantined}." },
  { term: "Play", def: "One atomic agent assignment. Each play gets its own deed entry. A payroll agent runs ~3 plays/month · a refund agent runs ~200/day · a coding agent runs ~10K/day." },
  { term: "Reconciliation", def: "Nightly 02:00 batch grading. Pulls the day's plays · grades through the Tribunal · clusters flags into liens · issues the daily deed · delivers the morning brief." },
  { term: "Router", def: "DefendableRouter · the software middleware that intercepts agent traffic and writes receipts. Write-only · no blocking · <5ms POST." },
  { term: "Tribunal", def: "The grading system. Rule layer first (deterministic · can only downgrade) · LLM judge second (Kimi K2.6 default). Outputs Honey / Jelly / Propolis." },
  { term: "Validator", def: "12-check doctrine chain that reviews every pair-candidate before training admission. 7 critical checks + 5 advisory. Independent of the Tribunal." },
  { term: "Validate the Validator", def: "Doctrine: we publish our grading methodology AND grade the graders themselves. Open positioning lane · no incumbent claims it." },
];
