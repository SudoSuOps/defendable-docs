import { Page, H2, H3, P, Code, CodeBlock, Callout, NextPrev, Eyebrow } from "../components/DocsPage";

export default function Quickstart() {
  return (
    <Page
      title="Quickstart"
      intro={
        <>
          <Eyebrow>GET STARTED · ~10 MINUTES</Eyebrow>
          <p className="mt-4">
            From zero to first Defendable Agent Deed in roughly 10 minutes ·
            HoneyBox or DefendableCloud · either works.
          </p>
        </>
      }
    >
      <P>
        DefendableOS is a third-party defense rail. You don't have to
        change your agent code. You just have to point your agent's
        traffic at the rail and we do the rest.
      </P>

      <H2 id="path-a-honeybox">Path A · HoneyBox (edge appliance)</H2>
      <P>
        Recommended for regulated industries (healthcare · financial
        services · government · legal) and any operator who wants
        data residency on their own network.
      </P>

      <H3 id="step-1-receive-honeybox">1 · Receive the HoneyBox</H3>
      <P>
        Comes pre-flashed with your <Code>compliance.&lt;your-co&gt;.defendable.eth</Code> ENS
        subdomain registered. DOA-tested. NVMe SSD installed. USB-C PD
        power adapter in the box.
      </P>

      <H3 id="step-2-plug-in">2 · Plug it in</H3>
      <P>
        Ethernet to your office switch. USB-C to wall. DHCP discovers it ·
        no static config required. Healthcheck endpoint comes up in
        about 90 seconds.
      </P>

      <CodeBlock label="curl · verify the box is up">{`curl http://honeybox.local/healthz
# expected
{"service":"defendable-honeybox","driver":"local","version":"1.0.0",
 "agent_count":0,"events_recorded":0,"ready":true}`}</CodeBlock>

      <H3 id="step-3-scan-qr">3 · Scan the QR code</H3>
      <P>
        Mobile config wizard · 4 questions · 90 seconds. Sets up your
        operator profile · your compliance email · your timezone for
        the morning brief delivery.
      </P>

      <H3 id="step-4-point-agents">4 · Point your agents at it</H3>
      <P>
        One config line per agent. Any framework that can POST JSON
        works (LangChain · CrewAI · AutoGen · OpenAI SDK · custom).
      </P>

      <CodeBlock label="python · post a task receipt">{`import httpx

HONEYBOX = "http://honeybox.local"
AGENT_ID = "refund-bot-prod-001"

def on_task_complete(task, decisions, downstream_effect):
    httpx.post(f"{HONEYBOX}/api/v1/plays", json={
        "agent_id": AGENT_ID,
        "task_summary": task,
        "decisions_made": decisions,
        "downstream_effect": downstream_effect,
    }, timeout=5.0)  # fire-and-forget · no blocking`}</CodeBlock>

      <Callout kind="info" title="That's it">
        Your agent now writes receipts to the HoneyBox. Reconciliation
        runs at 2am · the deed lands at 6am · you read the morning
        brief over coffee. No code changes required to the agent
        itself.
      </Callout>

      <H2 id="path-b-cloud">Path B · DefendableCloud (no hardware)</H2>
      <P>
        Recommended for teams without a regulated workload · for low-stakes
        agents · or as a complement to a HoneyBox (regulated agents on
        the box · everything else in the cloud).
      </P>

      <H3 id="step-1-base-url">1 · Change your OpenAI base_url</H3>
      <P>
        DefendableCloud is OpenAI-SDK compatible. Drop in your existing
        agent code · change the <Code>base_url</Code> · same SDK calls work.
      </P>

      <CodeBlock label="python · drop-in OpenAI SDK">{`from openai import OpenAI

client = OpenAI(
    base_url="https://api.defendablecloud.com/v1",
    api_key=DEFENDABLE_API_KEY,  # provisioned via /contact
)

response = client.chat.completions.create(
    model="qwen-2.5-32b",  # see /cloud for full model list
    messages=[...],
)`}</CodeBlock>

      <H3 id="step-2-doctrine-headers">2 · Add doctrine headers</H3>
      <P>
        Tag every call with the agent_id + task class so receipts route
        to the right per-agent ledger.
      </P>

      <CodeBlock label="python · doctrine headers">{`response = client.chat.completions.create(
    model="qwen-2.5-32b",
    messages=[...],
    extra_headers={
        "X-Defendable-Agent-Id": "refund-bot-prod-001",
        "X-Defendable-Task-Class": "refund_decision",
    },
)`}</CodeBlock>

      <Callout kind="success" title="That's it · same receipt rail">
        Cloud calls flow through the same deed pipeline as HoneyBox.
        Reconciliation · morning brief · per-agent ledger · all
        identical. Switch between modes any time without changing
        the data model.
      </Callout>

      <H2 id="next-steps">Next steps</H2>
      <P>
        See <Code>/architecture</Code> for the full 8-stage flow ·
        <Code>/deed</Code> for the JSON schema reference ·
        <Code>/honeybox</Code> for hardware setup details ·
        <Code>/cloud</Code> for the model library + privacy posture.
      </P>

      <NextPrev next={{ label: "Architecture", href: "/architecture" }} />
    </Page>
  );
}
