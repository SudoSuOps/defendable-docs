import { Page, H2, H3, P, Code, Callout, NextPrev, Eyebrow } from "../components/DocsPage";

export default function Architecture() {
  return (
    <Page
      title="Architecture"
      intro={
        <>
          <Eyebrow>SECTION I · THE 8-STAGE FLOW</Eyebrow>
          <p className="mt-4">
            How an agent task becomes a receipted deed entry. Eight
            stages · zero interruptions to the agent's offense workflow.
          </p>
        </>
      }
    >
      <H2 id="overview">Overview</H2>
      <P>
        The defense rail runs in the shadows of the agent's workday.
        Daytime is capture only · no latency · no gates. Reconciliation
        runs at 2am · grading happens batch · the morning brief lands
        by 6am.
      </P>

      <Callout title="Core principle">
        Defense never blocks offense. The agent runs free at full
        speed. We capture · receipt · grade · and reconcile.
        Interventions are escalations · not gates.
      </Callout>

      <H2 id="stages">The eight stages</H2>

      <H3 id="stage-1-receive">01 · Agent receives assignment</H3>
      <P>
        Customer's AI agent (refund · payroll · sales · radiology ·
        coding · etc.) is given a task by an operator or upstream
        system. Defendable does NOT intercept · no latency tax.
      </P>

      <H3 id="stage-2-execute">02 · Agent executes the assignment</H3>
      <P>
        Agent runs its tools · makes its calls · produces its outputs ·
        just like it would without us. Customer's offense workflow
        proceeds at full speed.
      </P>

      <H3 id="stage-3-capture">03 · Router captures the play</H3>
      <P>
        DefendableRouter (software middleware) writes a signed receipt
        of the play (task hash · tool calls · outcome · downstream
        effect) to the HoneyBox or DefendableCloud. Write-only · no
        blocking · POST returns in &lt;5ms.
      </P>

      <H3 id="stage-4-reconcile">04 · Reconciliation cron fires at 02:00</H3>
      <P>
        Nightly batch grading runs across all of yesterday's plays.
        Rule layer first (sub-millisecond) · then async LLM judge for
        ambiguous cases. Cheaper than real-time because batched off-peak.
      </P>

      <H3 id="stage-5-tribunal">05 · Tribunal labels every play</H3>
      <P>
        Each play gets HONEY / JELLY / PROPOLIS verdict. Rule layer
        can only DOWNGRADE · critical failures = PROPOLIS regardless
        of judge opinion. Doctrine is absolute. See{" "}
        <Code>/tribunal</Code> for the full taxonomy.
      </P>

      <H3 id="stage-6-liens">06 · Flag patterns clustered into liens</H3>
      <P>
        Flags are clustered into recurring patterns. Each pattern
        becomes a lien on the deed (PATTERN_FLAG · PACK_VERSION_LAG ·
        TRUST_DEFICIT · AMBIGUITY · OPERATOR_DRIFT) with severity,
        root cause, workout plan, expected lift.
      </P>

      <H3 id="stage-7-deed">07 · Daily Reconciliation Deed issued</H3>
      <P>
        Per-agent deed entry written to the Bakery vault · SHA-256
        hashed · ENS-anchored to your subdomain
        (<Code>compliance.&lt;your-co&gt;.defendable.eth</Code>).
        Insurer-readable · auditor-stampable · cross-vendor portable.
        See <Code>/deed</Code> for the full schema.
      </P>

      <H3 id="stage-8-brief">08 · Morning Brief delivered by 06:00</H3>
      <P>
        One email lands in your compliance inbox. Yesterday's deed
        per agent. Liens to clear (1-click approve). Compounding 30/60/90
        day trends. Workouts auto-scheduled. Sleep-through-the-night
        defense.
      </P>

      <H2 id="privacy-gradients">Privacy gradients</H2>
      <P>
        Three layers of data residency. Raw customer data stays put.
        Only signed metadata pings leave the HoneyBox automatically.
      </P>

      <Callout kind="info" title="Gradient 1 · inside the HoneyBox">
        Raw task content · per-play receipts · customer data · agent
        decisions · evidence. <strong>Customer only</strong> · Defendable
        NEVER unless per-pull authorization.
      </Callout>

      <Callout kind="info" title="Gradient 2 · outbound ping">
        Anonymized counts · severity flags · deed SHA-256 · NO content.
        Sent to <Code>defendable.eth</Code> resolver as notification only.
      </Callout>

      <Callout kind="info" title="Gradient 3 · cloud-side derived">
        Daily deed · grades · lien types · workout plans · NO PII.
        Stored at your compliance subdomain · auditor-readable on demand.
      </Callout>

      <NextPrev
        prev={{ label: "Quickstart", href: "/quickstart" }}
        next={{ label: "The Deed", href: "/deed" }}
      />
    </Page>
  );
}
