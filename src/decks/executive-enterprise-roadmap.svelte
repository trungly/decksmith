<script lang="ts">
  import {
    Deck,
    Slide,
    Fragment,
    Split,
    Card,
    Table,
    Stat,
  } from "decksmith";
</script>

<Deck theme="executive" transition="fade">
  <!-- Slide 1: Title -->
  <Slide h={1} v={0}>
    <h1 style="font-size: 2.5em; letter-spacing: -0.02em;">Modernization Roadmap 2026</h1>
    <p style="opacity: 0.7; font-weight: 500;">Q3-Q4 Strategic Technical Initiatives</p>
    <div style="margin-top: 2em; font-size: 0.9em; text-transform: uppercase; letter-spacing: 0.1em; opacity: 0.5;">Confidential | Engineering Leadership</div>
  </Slide>

  <!-- Slide 2: Context & Objectives -->
  <Slide h={2} v={0}>
    <h2>Strategic Context</h2>
    <div style="text-align: left; max-width: 800px; margin: 1em auto;">
      <p style="font-size: 1.1em; margin-bottom: 1.5em;">Our goal is to reduce technical debt and improve developer velocity by 30% through modular architecture.</p>
      <Split gap="2em">
        {#snippet first()}
          <Card title="Efficiency">
            <p style="font-size: 0.9em;">Consolidate redundant services into a shared platform layer.</p>
          </Card>
        {/snippet}
        {#snippet second()}
          <Card title="Reliability">
            <p style="font-size: 0.9em;">Targeting 99.99% uptime for core checkout and search services.</p>
          </Card>
        {/snippet}
      </Split>
    </div>
  </Slide>

  <!-- Slide 3: Roadmap Overview -->
  <Slide h={3} v={0}>
    <h2>Roadmap Overview</h2>
    <div style="display: flex; gap: 1em; margin-top: 1.5em; justify-content: space-around;">
      <Fragment index={0} style="fade-up">
        <div style="border-left: 4px solid var(--ds-accent); padding: 0.5em 1em; text-align: left;">
          <p style="font-weight: bold;">Q3: Foundation</p>
          <p style="font-size: 0.8em; opacity: 0.8;">Modular infra & adapter patterns</p>
        </div>
      </Fragment>
      <Fragment index={1} style="fade-up">
        <div style="border-left: 4px solid var(--ds-accent); padding: 0.5em 1em; text-align: left;">
          <p style="font-weight: bold;">Q4: Migration</p>
          <p style="font-size: 0.8em; opacity: 0.8;">Phased service cutover & e2e testing</p>
        </div>
      </Fragment>
      <Fragment index={2} style="fade-up">
        <div style="border-left: 4px solid var(--ds-accent); padding: 0.5em 1em; text-align: left;">
          <p style="font-weight: bold;">2027: Scale</p>
          <p style="font-size: 0.8em; opacity: 0.8;">Global expansion & performance tuning</p>
        </div>
      </Fragment>
    </div>
  </Slide>

  <!-- Slide 4: Sequencing -->
  <Slide h={4} v={0}>
    <h2>Sequencing & Dependencies</h2>
    <div style="text-align: left; margin-top: 1em;">
      <ul style="line-height: 1.8;">
        <li><strong>Step 1:</strong> Interface definition and mock adapters</li>
        <li><strong>Step 2:</strong> Parallel run of modular vs monolithic pipeline</li>
        <li><strong>Step 3:</strong> Shadow-mode validation with production traffic</li>
        <li><strong>Step 4:</strong> Gradual canary rollout (1% → 10% → 100%)</li>
      </ul>
    </div>
  </Slide>

  <!-- Slide 5: Risk Management -->
  <Slide h={5} v={0}>
    <h2>Risk Management</h2>
    <div style="margin-top: 1em;">
      <Table
        caption="Top risks"
        headers={["Risk", "Impact", "Mitigation"]}
        rows={[
          ["Data inconsistency", "Critical", "Dual-write with integrity checks"],
          ["Performance regression", "Moderate", "Pre-production load benchmarks"],
        ]}
        columnAlign={["left", "left", "left"]}
      />
    </div>
  </Slide>

  <!-- Slide 6: Outcomes -->
  <Slide h={6} v={0}>
    <h2>Measurable Outcomes</h2>
    <div style="margin-top: 2em;">
      <Split columns={3} gap="1em">
        {#snippet first()}
          <Stat value="-40%" label="Build duration" delta="vs baseline" deltaTone="positive" />
        {/snippet}
        {#snippet second()}
          <Stat value="+25%" label="Deployment frequency" delta="leading indicator" deltaTone="positive" />
        {/snippet}
        {#snippet third()}
          <Stat value="-15%" label="Cloud spend" delta="annualized" deltaTone="positive" />
        {/snippet}
      </Split>
    </div>
  </Slide>

  <Slide h={7} v={0}>
    <h1>Next Steps</h1>
    <p style="margin-top: 1em;">Bi-weekly progress updates via the Modernization Steering Committee.</p>
  </Slide>
</Deck>
