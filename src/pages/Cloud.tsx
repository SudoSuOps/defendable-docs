import { Page, H2, P, Code, CodeBlock, Callout, NextPrev, Eyebrow } from "../components/DocsPage";

export default function Cloud() {
  return (
    <Page
      title="DefendableCloud"
      intro={
        <>
          <Eyebrow>PRODUCT · HOSTED INFERENCE · 128 RTX 6000 BLACKWELL · OPEN WEIGHTS</Eyebrow>
          <p className="mt-4">
            Privacy-native AI inference on Defendable-owned hardware.
            Open-weight models · contractual no-logging · doctrine pack
            rules inline · same deed pipeline as HoneyBox.
          </p>
        </>
      }
    >
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
        Keys are provisioned via <Code>/contact</Code> on defendableos.com
        · we issue per-account keys with scoped permissions.
      </P>

      <H2 id="models">Available models</H2>
      <P>
        All open-weight. Forever-runnable. Pinnable to a specific
        version that won't be deprecated by the upstream vendor.
      </P>

      <div className="my-6 overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-stone-800">
              <th className="text-left py-2 pr-3 text-[10px] uppercase tracking-[0.18em] text-stone-500 font-semibold">Model ID</th>
              <th className="text-left py-2 px-3 text-[10px] uppercase tracking-[0.18em] text-stone-500 font-semibold">Footprint</th>
              <th className="text-left py-2 px-3 text-[10px] uppercase tracking-[0.18em] text-stone-500 font-semibold">Best for</th>
              <th className="text-left py-2 pl-3 text-[10px] uppercase tracking-[0.18em] text-stone-500 font-semibold">$ / M tokens</th>
            </tr>
          </thead>
          <tbody>
            {[
              ["qwen-2.5-32b", "1 card", "Default for ClawCheck Tribunal grading", "$5"],
              ["llama-3.3-70b", "2 cards FP16", "Long context · most balanced general purpose", "$5"],
              ["deepseek-v3", "4 cards 4-bit", "Frontier reasoning · best for hard problems", "$10"],
              ["mixtral-8x22b", "2 cards MoE", "Cost-efficient with constrained tool calling", "$5"],
              ["phi-4", "1 card half", "Lightweight · fast · cheap", "$5"],
            ].map((r, i) => (
              <tr key={i} className="border-b border-stone-900/60">
                <td className="py-3 pr-3 font-mono text-amber-300">{r[0]}</td>
                <td className="py-3 px-3 text-stone-400 font-mono text-xs">{r[1]}</td>
                <td className="py-3 px-3 text-stone-300">{r[2]}</td>
                <td className="py-3 pl-3 font-mono text-stone-200">{r[3]}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <H2 id="drop-in">Drop-in example · OpenAI SDK</H2>
      <CodeBlock label="python · zero rewrites">{`from openai import OpenAI

client = OpenAI(
    base_url="https://api.defendablecloud.com/v1",
    api_key=DEFENDABLE_API_KEY,
)

response = client.chat.completions.create(
    model="qwen-2.5-32b",
    messages=[
        {"role": "system", "content": "You are a customer support agent."},
        {"role": "user", "content": "I need a refund for order RFD-12345"},
    ],
    extra_headers={
        "X-Defendable-Agent-Id": "refund-bot-prod-001",
        "X-Defendable-Task-Class": "refund_decision",
    },
)`}</CodeBlock>

      <CodeBlock label="typescript · same shape">{`import OpenAI from "openai";

const client = new OpenAI({
  baseURL: "https://api.defendablecloud.com/v1",
  apiKey: process.env.DEFENDABLE_API_KEY,
});

const response = await client.chat.completions.create({
  model: "llama-3.3-70b",
  messages: [...],
  // OpenAI SDK passes through extra headers via fetch options
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
        VRAM · paid in full · zero GPU debt. Aggregate fleet throughput
        ~12M tokens/hour. COGS ~$0.50/M tokens (vs $5-15 for cloud-leased
        equivalent). 10× margin advantage we share with you.
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
              ["Logs your prompts", "Yes (default)", "Never"],
              ["Trains on your data", "Possible (TOS varies)", "Never"],
              ["BAA available", "Limited / Enterprise only", "Yes · standard"],
              ["Models you can run", "Closed only", "Open weights · pinnable"],
              ["Doctrine pack inline", "No", "Yes"],
              ["Issues a deed", "No", "Yes"],
              ["Owns the GPUs", "Leases AWS/GCP", "Owns · 128 cards paid in full"],
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
