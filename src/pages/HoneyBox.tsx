import { Page, H2, H3, P, Code, CodeBlock, Callout, NextPrev, Eyebrow } from "../components/DocsPage";

export default function HoneyBox() {
  return (
    <Page
      title="HoneyBox"
      intro={
        <>
          <Eyebrow>PRODUCT · EDGE APPLIANCE · DEFAULT TIER · NVIDIA JETSON ORIN NANO 8GB · 40 TOPS</Eyebrow>
          <p className="mt-4">
            Physical defense appliance on your premises. Raw data NEVER
            leaves the box. Local Tribunal · local deed issuance ·
            ENS-registered identity per agent.
          </p>
        </>
      }
    >
      <H2 id="hardware-tiers">Hardware tiers</H2>
      <div className="my-6 grid md:grid-cols-2 gap-4">
        <div className="rounded-xl border border-stone-800 bg-neutral-950/60 px-5 py-5">
          <div className="text-[10px] uppercase tracking-[0.22em] text-amber-300/80 font-semibold">Default · SMB</div>
          <div className="mt-2 text-base font-semibold text-stone-100">Jetson Orin Nano 8GB</div>
          <div className="mt-2 text-xs text-stone-400 leading-relaxed">$399 setup · $10/mo · 40 TOPS · ~10 agents · ~50K plays/month</div>
        </div>
        <div className="rounded-xl border border-stone-800 bg-neutral-950/60 px-5 py-5">
          <div className="text-[10px] uppercase tracking-[0.22em] text-amber-300/80 font-semibold">Mid-market / regulated</div>
          <div className="mt-2 text-base font-semibold text-stone-100">Jetson AGX Orin 64GB</div>
          <div className="mt-2 text-xs text-stone-400 leading-relaxed">$999 setup · $50/mo · ~50 agents · ~500K plays/month · imaging centers</div>
        </div>
        <div className="rounded-xl border border-stone-800 bg-neutral-950/60 px-5 py-5">
          <div className="text-[10px] uppercase tracking-[0.22em] text-amber-300/80 font-semibold">Heavy compute · local 70B</div>
          <div className="mt-2 text-base font-semibold text-stone-100">Workstation · RTX 6000</div>
          <div className="mt-2 text-xs text-stone-400 leading-relaxed">$2,500 setup · $200/mo · high-volume fleets · regulated industries</div>
        </div>
        <div className="rounded-xl border border-stone-800 bg-neutral-950/60 px-5 py-5">
          <div className="text-[10px] uppercase tracking-[0.22em] text-amber-300/80 font-semibold">Air-gap · sovereign</div>
          <div className="mt-2 text-base font-semibold text-stone-100">DGX-class</div>
          <div className="mt-2 text-xs text-stone-400 leading-relaxed">Quote · government · defense · financial services with strict isolation</div>
        </div>
      </div>

      <H2 id="setup">Setup · less than 10 minutes</H2>
      <ol className="list-decimal list-inside space-y-2 text-stone-300 text-sm leading-relaxed">
        <li>Receive the box · arrives pre-flashed with your ENS subdomain registered · QA tested</li>
        <li>Plug Ethernet to your switch · USB-C to wall</li>
        <li>DHCP picks it up · no static config</li>
        <li>Scan the QR code on the box · mobile config wizard (4 questions · 90 sec)</li>
        <li>Point your agents at the HoneyBox endpoint (one config line per agent)</li>
        <li>Sleep through the first night · brief lands at 06:00</li>
      </ol>

      <H2 id="api">API · POST /api/v1/plays</H2>
      <P>
        The HoneyBox accepts task receipts over plain HTTPS. Any agent
        framework that can POST JSON works.
      </P>

      <CodeBlock label="POST /api/v1/plays · request body">{`{
  "agent_id": "refund-bot-prod-001",
  "task_summary": "Process refund request RFD-12345",
  "task_started_at": "2026-05-24T14:30:12Z",
  "task_completed_at": "2026-05-24T14:30:47Z",
  "tools_used": ["lookup_order", "calculate_refund", "issue_refund"],
  "decisions_made": [
    {"decision": "approved_refund_47usd", "rule_basis": "WITHIN_THRESHOLD"}
  ],
  "downstream_effect": {
    "refund_amount_usd_cents": 4700,
    "approval_token": "appr_abc123"
  },
  "human_overridden": false
}`}</CodeBlock>

      <CodeBlock label="response · 201 Created">{`{
  "play_id": "PLAY-20260524T143012Z-7a3b",
  "receipt_id": "DCLAW-RECEIPT-ABCD1234",
  "received_at": "2026-05-24T14:30:48Z",
  "agent_ledger_count": 1247
}`}</CodeBlock>

      <H2 id="local-models">Local LLM judge models</H2>
      <P>
        For sensitive customers who don't want any judge prompts to
        leave the box, the HoneyBox can run a local LLM judge. All
        fit in the 40 TOPS envelope:
      </P>
      <ul className="list-disc list-inside space-y-1 text-stone-300 text-sm">
        <li><Code>phi-4:latest</Code> · 14B distilled · 14.7 GB Q4</li>
        <li><Code>gemma3:4b</Code> · 3.3 GB Q4 · fastest</li>
        <li><Code>qwen2.5:3b</Code> · most balanced for tribunal work</li>
        <li><Code>granite3.3:8b</Code> · IBM open weights · enterprise-friendly license</li>
      </ul>

      <Callout kind="info" title="Default · cloud judge with privacy">
        By default the HoneyBox uses DefendableCloud's hosted judge
        with redacted prompts (PII stripped before send). For full
        air-gap, switch to local-only judge in the config.
      </Callout>

      <H2 id="firmware-updates">Firmware updates</H2>
      <P>
        Monthly OTA updates via Defendable's signed update server.
        A/B partition layout means a bad update auto-rolls-back.
        Updates can be deferred via the operator config for
        change-managed environments.
      </P>

      <H2 id="troubleshooting">Troubleshooting</H2>
      <H3 id="ts-box-not-discovered">Box not appearing on network</H3>
      <P>
        Check DHCP lease table on your switch. Box's MAC starts with
        Defendable's OUI <Code>00:5A:BE:...</Code>. If still not
        visible, plug a monitor + keyboard into the Jetson and check
        the boot output.
      </P>

      <H3 id="ts-agent-not-posting">Agent can't reach the HoneyBox</H3>
      <P>
        Verify <Code>curl http://honeybox.local/healthz</Code> works
        from the agent's host. Common causes: agent is in a different
        VLAN · firewall blocks .local mDNS · HoneyBox waiting on
        first-boot ENS registration (~90 sec).
      </P>

      <NextPrev
        prev={{ label: "Doctrine Packs", href: "/doctrine-packs" }}
        next={{ label: "DefendableCloud", href: "/cloud" }}
      />
    </Page>
  );
}
