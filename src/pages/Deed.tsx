import { Page, H2, H3, P, Code, CodeBlock, Callout, NextPrev, Eyebrow } from "../components/DocsPage";

export default function Deed() {
  return (
    <Page
      title="The Deed"
      intro={
        <>
          <Eyebrow>CORE CONCEPT · DEFENDABLE AGENT DEED · DDEED-DOV-*</Eyebrow>
          <p className="mt-4">
            The deed is a running ledger · not a one-time certificate.
            Every task an agent runs in production gets its own deed
            entry · daily/weekly/monthly rollup deeds prove the agent's
            win rate over time.
          </p>
        </>
      }
    >
      <H2 id="schema">Full JSON schema</H2>
      <P>
        This is a real deed · issued 2026-05-23 against an actual
        benchmark run on Defendable infrastructure. Every field is
        load-bearing. Every hash is verifiable.
      </P>

      <CodeBlock label="DDEED-DOV-AGENT-COMPUTE-INSPECTOR-000001-v1.json">{`{
  "deed_id": "DDEED-DOV-AGENT-COMPUTE-INSPECTOR-000001-v1",
  "deed_type": "DEFENDABLE_AGENT_DEED",
  "issued_at": "2026-05-23T09:42:00Z",
  "issued_by": "defendable.eth",

  "subject_agent": {
    "agent_id": "compute-inspector-v1",
    "agent_class": "compute_inspector_v1",
    "operator": "compute-inspector.swarmbee.defendable.eth",
    "deployment_target": "edge_device"
  },

  "benchmark_run": {
    "pack_id":                  "compute_inspector_v1",
    "pack_version":             "v1.0-alpha",
    "run_id":                   "ag-20260523T094008Z-5c5c",
    "tasks_executed":           6,
    "adversarial_cases_resisted": "3 / 3"
  },

  "grades_5d": {
    "capability":            70.5,
    "truth":                 95.0,
    "safety":                100.0,
    "numeric_structural":    82.3,
    "efficiency":            "INCOMPLETE_MVP_STUB",
    "reproducibility":       90.0
  },
  "composite_score": 70.5,

  "tribunal_breakdown": {
    "honey_percent":    66.7,
    "jelly_percent":    33.3,
    "propolis_percent": 0.0
  },

  "deployment_tier":   "OBSERVED",
  "deployment_status": "PASS_WITH_OBSERVATIONS",
  "deed_eligibility":  "ELIGIBLE_AFTER_REVIEW",
  "pack_status_cap_applied": true,

  "limitations": [
    "MVP stub",
    "Mock reference agent",
    "Judge stub (deterministic policy)",
    "Efficiency INCOMPLETE"
  ],

  "bound_artifacts": {
    "compute_deed":     "DDEED-DOV-COMPUTE-000001-BENCH-v2",
    "bench_bundle_sha": "sha256:4105a3ff99f2ba39c54167c43da2f54bcf42c0d2fea8776b9ae0a8fbfd23aefc"
  },

  "record_hash": "sha256:ff7385b0f5319a11ebf7b7e43fb86a80bae5730ab61e29b7d5cb5fd6580a8733",
  "ens_anchor":  "ddeed-dov-agent-compute-inspector-000001-v1.swarmbee.defendable.eth",

  "doctrine_note": "pack-alpha cap applied · MVP stub limitations named · not a final value opinion · validator review pending"
}`}</CodeBlock>

      <H2 id="field-reference">Field reference</H2>

      <H3 id="deed-id">deed_id</H3>
      <P>
        Globally unique · semantic · sortable. Format:
        <Code>DDEED-DOV-&lt;ASSET-CLASS&gt;-&lt;SEQUENCE&gt;-v&lt;VERSION&gt;</Code>.
        DOV = Defendable Operating Value. Anyone can read the deed_id
        and know what asset class it covers.
      </P>

      <H3 id="deed-type">deed_type</H3>
      <P>
        Discriminator. One of:
      </P>
      <ul className="list-disc list-inside space-y-1 text-stone-300 text-sm">
        <li><Code>DEFENDABLE_AGENT_DEED</Code> · per-agent attestation</li>
        <li><Code>DEFENDABLE_COMPUTE_DEED</Code> · per-machine attestation</li>
        <li><Code>DEFENDABLE_WORK_UNIT_DEED</Code> · agent + compute + economic bundle</li>
      </ul>

      <H3 id="grades-5d">grades_5d · five-dimension benchmark</H3>
      <P>
        ALL FIVE always published. No single composite hides weak
        dimensions. Capability · Truth · Safety · Numeric/Structural ·
        Efficiency · Reproducibility. Each scored 0-100 or named status
        constant (e.g., <Code>INCOMPLETE_MVP_STUB</Code>).
      </P>

      <Callout kind="warn" title="Anti-puffery clause">
        We never publish <Code>composite_score</Code> without the
        five-dimension breakdown that produced it. If you see a deed
        with only composite · it's not a real Defendable Deed.
      </Callout>

      <H3 id="tribunal-breakdown">tribunal_breakdown</H3>
      <P>
        Per-task Honey/Jelly/Propolis percentages. PROPOLIS is
        preserved adversarial · never auto-flipped to honey. See{" "}
        <Code>/tribunal</Code> for the full taxonomy.
      </P>

      <H3 id="deployment-tier">deployment_tier</H3>
      <P>
        5-tier ladder · agent can move up or get downgraded based on
        field performance:
      </P>
      <ul className="list-disc list-inside space-y-1 text-stone-300 text-sm">
        <li><Code>OBSERVED</Code> · MVP / alpha pack-capped</li>
        <li><Code>SCOPED</Code> · narrow defined lane</li>
        <li><Code>CONDITIONAL</Code> · works within named bounds</li>
        <li><Code>APPROVED</Code> · production-eligible across class</li>
        <li><Code>AUTHORITY</Code> · trusted to make calls within its scope</li>
      </ul>

      <H3 id="pack-status-cap">pack_status_cap_applied</H3>
      <P>
        When pack is alpha/beta · the deed grade is hard-capped at
        OBSERVED tier regardless of how the agent scored. Honest
        framing baked in.
      </P>

      <H3 id="record-hash">record_hash</H3>
      <P>
        SHA-256 of canonical JSON. Verify locally · compare with our
        Bakery vault · cross-check ENS. The tamper-evidence seal.
      </P>

      <CodeBlock label="bash · verify a deed">{`# Canonicalize the deed JSON · hash it · compare
cat deed.json | jq -S -c . | sha256sum
# Should match the record_hash field inside the deed`}</CodeBlock>

      <H3 id="ens-anchor">ens_anchor</H3>
      <P>
        Resolvable on ENS · anyone queries the deed identity ·
        cross-vendor portable · regulator-acceptable · forever-resolvable.
        Format: <Code>&lt;deed-id-slug&gt;.&lt;operator&gt;.defendable.eth</Code>
      </P>

      <H3 id="doctrine-note">doctrine_note</H3>
      <P>
        Plain-English limitation summary. The buyer knows exactly what
        the deed means · AND what it does NOT mean. The anti-puffery
        clause made explicit.
      </P>

      <H2 id="verification">Verifying a deed</H2>
      <P>
        Three-step verification any third party can do:
      </P>
      <ol className="list-decimal list-inside space-y-1 text-stone-300 text-sm">
        <li>Recompute the <Code>record_hash</Code> from the canonical JSON</li>
        <li>Resolve the <Code>ens_anchor</Code> on ENS to confirm public identity</li>
        <li>Pull the <Code>bound_artifacts.compute_deed</Code> and validate the chain</li>
      </ol>

      <NextPrev
        prev={{ label: "Architecture", href: "/architecture" }}
        next={{ label: "Tribunal", href: "/tribunal" }}
      />
    </Page>
  );
}
