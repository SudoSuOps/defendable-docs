import { Page, H2, H3, P, Code, CodeBlock, Callout, NextPrev, Eyebrow } from "../components/DocsPage";

export default function Cloud() {
  return (
    <Page
      title="DefendableCloud"
      intro={
        <>
          <Eyebrow>PRODUCT · HOSTED INFERENCE · 128 RTX 6000 BLACKWELL · OPERATOR-OWNED</Eyebrow>
          <p className="mt-4">
            Operator-owned private inference with three product lanes on one
            fleet: <strong className="text-stone-100">Inference</strong> (per-million-token
            billing, OpenAI-SDK compatible), <strong className="text-stone-100">AgentBench</strong> (Tribunal
            grading + Defendable Agent Deeds), and <strong className="text-stone-100">SwarmCurator</strong> (receipted
            dataset curation with Bakery Packs on the shelf or custom concierge intake).
            <strong className="text-amber-300"> SwarmFixer</strong> closes the bench grade→fix loop.
          </p>
          <p className="mt-3 text-stone-400">
            Full product surface lives at{" "}
            <a href="https://defendablecloud.com" className="text-amber-300 hover:text-amber-200">
              defendablecloud.com
            </a>
            . This page is the technical reference.
          </p>
        </>
      }
    >
      <H2 id="three-lanes">Three lanes on one fleet</H2>
      <P>
        DefendableCloud is not a single API · it's a 3-lane rail on the same
        128 RTX 6000 Blackwell fleet. Use one lane, all three, or any
        combination · billing is independent per lane.
      </P>

      <div className="my-6 overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-stone-800">
              <th className="text-left py-2 pr-3 text-[10px] uppercase tracking-[0.18em] text-stone-500 font-semibold">Lane</th>
              <th className="text-left py-2 px-3 text-[10px] uppercase tracking-[0.18em] text-stone-500 font-semibold">What</th>
              <th className="text-left py-2 px-3 text-[10px] uppercase tracking-[0.18em] text-stone-500 font-semibold">Meter</th>
              <th className="text-left py-2 pl-3 text-[10px] uppercase tracking-[0.22em] text-amber-300 font-semibold">Deliverable</th>
            </tr>
          </thead>
          <tbody>
            {[
              ["01 · Inference",    "OpenAI-SDK compatible inference",            "$ per 1M tokens",  "Stream / completion"],
              ["02 · AgentBench",   "Tribunal grading of your agent",             "$ per pack run",   "Defendable Agent Deed™"],
              ["03 · SwarmCurator", "Bakery Packs + custom dataset curation",     "$ per pack/dataset", "JSONL · Parquet · HF · LoRA"],
              ["Closer · SwarmFixer", "Agent refinery · ships fixes for flagged patterns", "tier subscription", "PRs · re-bench · lift deed"],
            ].map((r, i) => (
              <tr key={i} className="border-b border-stone-900/60">
                <td className="py-3 pr-3 font-mono text-amber-300">{r[0]}</td>
                <td className="py-3 px-3 text-stone-300">{r[1]}</td>
                <td className="py-3 px-3 text-stone-400 font-mono text-xs">{r[2]}</td>
                <td className="py-3 pl-3 text-stone-200">{r[3]}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <H2 id="api-base">API base URL</H2>
      <CodeBlock label="endpoint">{`https://api.defendablecloud.com/v1`}</CodeBlock>
      <P>
        OpenAI-SDK compatible. Drop in your existing agent code · change
        the <Code>base_url</Code> · same SDK calls work. No client
        library changes required.
      </P>

      <H2 id="auth">Authentication</H2>
      <P>
        Bearer-token auth via <Code>Authorization: Bearer &lt;DEFENDABLE_API_KEY&gt;</Code>.
        Keys are provisioned via concierge intake today · email{" "}
        <Code>build@defendableos.com</Code> with your lane, use case, and
        compliance posture (HIPAA / GDPR / SOC2 / none). Self-serve console
        ships Q3 2026.
      </P>

      <H2 id="models">Available models · v1 menu</H2>
      <P>
        All open-weight. Forever-runnable. Pinnable to a specific
        version that won't be deprecated by the upstream vendor. Two are
        custom Defendable fine-tunes for the domains we operate in (CRE,
        Grants); two are clean base models.
      </P>

      <div className="my-6 overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-stone-800">
              <th className="text-left py-2 pr-3 text-[10px] uppercase tracking-[0.18em] text-stone-500 font-semibold">Model ID</th>
              <th className="text-left py-2 px-3 text-[10px] uppercase tracking-[0.18em] text-stone-500 font-semibold">Base</th>
              <th className="text-left py-2 px-3 text-[10px] uppercase tracking-[0.18em] text-stone-500 font-semibold">Context</th>
              <th className="text-left py-2 pl-3 text-[10px] uppercase tracking-[0.18em] text-stone-500 font-semibold">Best for</th>
            </tr>
          </thead>
          <tbody>
            {[
              ["cre-atlas-27b",   "Gemma 27B · fine-tune",  "128K", "CRE underwriting · cap rate / NOI / NNN / 1031"],
              ["swarmgrant-9b",   "Qwen 9B · fine-tune",    "32K",  "Grant-writing · SBIR / STTR / NIH / foundations"],
              ["qwen-32b-base",   "Qwen 2.5 32B",            "128K", "General reasoning · tool-use · code · structured output"],
              ["gemma-27b-base",  "Google Gemma 27B",        "128K", "Long-context fluency · RAG · structured extraction"],
            ].map((r, i) => (
              <tr key={i} className="border-b border-stone-900/60">
                <td className="py-3 pr-3 font-mono text-amber-300">{r[0]}</td>
                <td className="py-3 px-3 text-stone-400 font-mono text-xs">{r[1]}</td>
                <td className="py-3 px-3 text-stone-400 font-mono text-xs">{r[2]}</td>
                <td className="py-3 pl-3 text-stone-300">{r[3]}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Callout kind="info" title="v2 menu · operator request">
        Llama 70B · DeepSeek · Mixtral available on operator request. We
        spin these on dedicated partitions when sized workload warrants ·
        not maintained as always-warm tier 1.
      </Callout>

      <H2 id="drop-in">Drop-in example · OpenAI SDK</H2>
      <CodeBlock label="python · zero rewrites">{`from openai import OpenAI

client = OpenAI(
    base_url="https://api.defendablecloud.com/v1",
    api_key=DEFENDABLE_API_KEY,
)

response = client.chat.completions.create(
    model="cre-atlas-27b",
    messages=[
        {"role": "system", "content": "You are a CRE underwriter."},
        {"role": "user", "content": "Given a $4.2M NOI on a 7-cap NNN, value the asset and explain the 1031 reinvestment window."},
    ],
    extra_headers={
        "X-Defendable-Agent-Id": "underwriter-prod-001",
        "X-Defendable-Task-Class": "cre_valuation",
    },
)`}</CodeBlock>

      <CodeBlock label="typescript · same shape">{`import OpenAI from "openai";

const client = new OpenAI({
  baseURL: "https://api.defendablecloud.com/v1",
  apiKey: process.env.DEFENDABLE_API_KEY,
});

const response = await client.chat.completions.create({
  model: "swarmgrant-9b",
  messages: [
    { role: "user", content: "Draft a 250-word SBIR Phase I narrative." },
  ],
});`}</CodeBlock>

      <H2 id="doctrine-headers">Doctrine headers</H2>
      <P>
        Tag every call so receipts route to the right per-agent ledger.
        Headers are optional but recommended:
      </P>
      <ul className="list-disc list-inside space-y-1 text-stone-300 text-sm">
        <li><Code>X-Defendable-Agent-Id</Code> · routes to your agent ledger</li>
        <li><Code>X-Defendable-Task-Class</Code> · which doctrine pack to grade against</li>
        <li><Code>X-Defendable-Operator</Code> · ENS subdomain for receipt delivery</li>
      </ul>

      <H2 id="agentbench">Lane 02 · AgentBench</H2>
      <P>
        Submit your agent · we run it through a doctrine pack on the
        dedicated <Code>bench-blackwell-06</Code> partition (6 RTX 6000 cards,
        576 GB · isolated from inference traffic) · the Tribunal grades it
        with the 5-grade rubric · you receive a Defendable Agent Deed™.
      </P>

      <div className="my-4 grid sm:grid-cols-3 gap-2 text-xs">
        {[
          ["01 · Submit",         "Adapter or API endpoint · wrapped in pack runner"],
          ["02 · Tribunal",       "Honey / Jelly / Propolis · rule-then-judge"],
          ["03 · 5-Grade",        "Capability 25 · Truth 20 · Safety 20 · Numeric 15 · Efficiency 10 · Reproducibility 10"],
          ["04 · Deed issued",    "DDEED-DOV-AGENT-* · SHA-256 record_hash · ENS reserved"],
          ["05 · Verify",         "Public verify URL · lifecycle status fields"],
          ["06 · Fix (SwarmFixer)", "Flagged patterns → SwarmFixer ships the fix → re-bench → lift deed"],
        ].map((s, i) => (
          <div key={i} className="rounded border border-stone-800 bg-neutral-950/60 px-3 py-3">
            <div className="text-[9px] uppercase tracking-[0.22em] text-amber-400/80 font-semibold font-mono">{s[0]}</div>
            <div className="mt-1.5 text-stone-300">{s[1]}</div>
          </div>
        ))}
      </div>

      <H3 id="swarmfixer">SwarmFixer · the agent refinery</H3>
      <P>
        The deed is only as good as the fix it delivers. SwarmFixer is the
        Defendable agent that takes bench-flagged patterns and ships actual
        fixes (prompt patches · tool-use repairs · guardrail additions),
        then re-runs the bench on the same pack to prove the lift. Three
        tiers:
      </P>
      <ul className="list-disc list-inside space-y-1 text-stone-300 text-sm">
        <li><strong className="text-stone-100">Self-serve</strong> · patch suggestions in the deed PDF · you apply them</li>
        <li><strong className="text-stone-100">Managed</strong> · SwarmFixer ships PRs against your agent repo · you merge</li>
        <li><strong className="text-stone-100">Embedded</strong> · 90-day Fix-or-Refund · SwarmFixer + Defendable ops embedded</li>
      </ul>

      <H2 id="swarmcurator">Lane 03 · SwarmCurator</H2>
      <P>
        Bring raw signal · receive a fine-tune-ready dataset. Two ways to buy:
      </P>

      <H3 id="bakery-packs">Bakery Packs · ready-baked · ship today</H3>
      <P>
        Curated datasets pre-baked in the Claw Bakery · pick from the shelf
        · ship today. Reconciled, Tribunal-graded, manifest-receipted ·
        same rigor as a custom engagement · zero queue time.
      </P>

      <div className="my-4 overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-stone-800">
              <th className="text-left py-2 pr-3 text-[10px] uppercase tracking-[0.18em] text-stone-500 font-semibold">Pack</th>
              <th className="text-left py-2 px-3 text-[10px] uppercase tracking-[0.18em] text-stone-500 font-semibold">Rows</th>
              <th className="text-left py-2 px-3 text-[10px] uppercase tracking-[0.18em] text-stone-500 font-semibold">Formats</th>
              <th className="text-left py-2 pl-3 text-[10px] uppercase tracking-[0.22em] text-amber-300 font-semibold">Status</th>
            </tr>
          </thead>
          <tbody>
            {[
              ["CRE MarketReady",         "118K",   "JSONL · Parquet · LoRA",    "FRESH"],
              ["Grants Foundation Pack",  "42K",    "JSONL · HF dataset",        "FRESH"],
              ["Compute Inspector Eval",  "6K",     "JSONL · pack-runner",       "FRESH"],
              ["STNL Underwrite Pack",    "8K",     "JSONL · Parquet",           "ON THE OVEN"],
              ["Legal Discovery Pack",    "ETA Q3", "JSONL · Parquet",           "QUEUED"],
              ["Your Custom Domain",      "on demand", "any format",             "ON-DEMAND"],
            ].map((r, i) => (
              <tr key={i} className="border-b border-stone-900/60">
                <td className="py-3 pr-3 text-stone-200 font-medium">{r[0]}</td>
                <td className="py-3 px-3 text-stone-400 font-mono text-xs">{r[1]}</td>
                <td className="py-3 px-3 text-stone-400 font-mono text-xs">{r[2]}</td>
                <td className="py-3 pl-3 text-amber-300 font-mono text-xs">{r[3]}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <H3 id="custom-curation">Custom curation · concierge intake</H3>
      <P>
        When the shelf doesn't have your pack, we bake one. 4-step
        pipeline: <strong className="text-stone-100">Ingest</strong> raw
        signal · <strong className="text-stone-100">Reconcile</strong> (dedupe,
        normalize, cross-reference, label) ·{" "}
        <strong className="text-stone-100">Tribunal</strong>{" "}
        grade row by row (only Honey + Jelly ship · Propolis goes to reject
        log with reason codes) ·{" "}
        <strong className="text-stone-100">Package</strong> in any output
        format with the receipted reconciliation manifest.
      </P>

      <H2 id="privacy-posture">Privacy posture</H2>
      <Callout kind="success" title="Contractual commitments">
        No logging · no training on prompts · no third-party share ·
        BAA-ready · SOC2 Type II in progress · open-weight models
        only. These are written into the standard DefendableCloud
        terms · not buried in TOS opt-outs.
      </Callout>

      <H2 id="capacity">Capacity</H2>
      <P>
        128 NVIDIA RTX PRO 6000 Blackwell cards · 12,288 GB aggregate
        VRAM · paid in full · zero GPU debt · DC-owned. Aggregate fleet
        throughput ~12M tokens/hour. 6 cards isolated in the{" "}
        <Code>bench-blackwell-06</Code> partition for AgentBench (Lane 02).
        COGS ~$0.50/M tokens vs $5-15 for cloud-leased equivalent · the
        margin advantage we share with you.
      </P>

      <H2 id="vs-bigtech">Side-by-side · vs Big Tech</H2>
      <div className="my-4 overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-stone-800">
              <th className="text-left py-2 pr-3 text-[10px] uppercase tracking-[0.18em] text-stone-500 font-semibold">Capability</th>
              <th className="text-left py-2 px-3 text-[10px] uppercase tracking-[0.18em] text-stone-500 font-semibold">OpenAI / Anthropic / Azure</th>
              <th className="text-left py-2 pl-3 text-[10px] uppercase tracking-[0.22em] text-amber-300 font-semibold">DefendableCloud</th>
            </tr>
          </thead>
          <tbody>
            {[
              ["Logs your prompts",      "Yes (default)",              "Never · contractual"],
              ["Trains on your data",    "Possible (TOS varies)",      "Never · contractual"],
              ["BAA available",          "Limited / Enterprise only",  "Yes · standard"],
              ["Models you can run",     "Closed only",                "Open weights · pinnable"],
              ["Custom domain fine-tune", "Limited / no",              "Yes · CRE-Atlas + SwarmGrant"],
              ["Agent bench rail",       "No",                         "Yes · DDEED-DOV-AGENT"],
              ["Agent refinery (fixer)", "No",                         "Yes · SwarmFixer 3 tiers"],
              ["Dataset curation rail",  "No",                         "Yes · SwarmCurator + Bakery Packs"],
              ["Owns the GPUs",          "Leases hyperscaler",         "Owns · 128 cards paid in full"],
            ].map((r, i) => (
              <tr key={i} className="border-b border-stone-900/60">
                <td className="py-3 pr-3 text-stone-300 font-medium">{r[0]}</td>
                <td className="py-3 px-3 text-stone-400">{r[1]}</td>
                <td className="py-3 pl-3 text-amber-300 font-medium">{r[2]}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <NextPrev
        prev={{ label: "HoneyBox", href: "/honeybox" }}
        next={{ label: "Glossary", href: "/glossary" }}
      />
    </Page>
  );
}
