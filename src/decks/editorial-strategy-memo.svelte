<script lang="ts">
  import { Deck, Slide, Fragment, Split, Card, Callout, Table } from "decksmith";
  import { playgroundDeck } from "../playground/content-size.svelte.ts";
</script>

<Deck theme="editorial" transition="fade" contentSize={playgroundDeck.contentSize}>
  <!-- Slide 1: Title -->
  <Slide h={1} v={0}>
    <h1 style="font-size: 3em; font-weight: 300; font-family: serif;">Strategic Pivot</h1>
    <p style="font-style: italic; opacity: 0.6;">Growth vs. Product Depth</p>
    <div style="margin-top: 3em; font-size: 0.8em; letter-spacing: 0.05em; text-transform: uppercase;">Founder Update | April 2026</div>
  </Slide>

  <!-- Slide 2: The Fork in the Road -->
  <Slide h={2} v={0}>
    <h2>The Current Dilemma</h2>
    <div style="text-align: left; margin: 1.5em auto; max-width: 600px; font-size: 1.2em; line-height: 1.6;">
      <p>We've reached product-market fit. Now, we face a critical choice:</p>
      <ul style="margin-top: 1em;">
        <li>Accelerate user acquisition via aggressive marketing</li>
        <li>Deepen the product moat with advanced AI integrations</li>
      </ul>
    </div>
  </Slide>

  <!-- Slide 3: Growth Initiative Options -->
  <Slide h={3} v={0}>
    <h2>Growth Initiative Options</h2>
    <div style="margin-top: 2em;">
      <Split gap="2em">
        {#snippet first()}
          <Card title="Option A: Expansion" subtitle="Enterprise outbound">
            <p style="font-size: 0.9em; opacity: 0.8;">Launch enterprise tier and dedicated sales outbound.</p>
            <p style="font-weight: bold; margin-top: 0.5em;">Cost: $50k/mo</p>
          </Card>
        {/snippet}
        {#snippet second()}
          <Card title="Option B: Innovation" subtitle="Context engine">
            <p style="font-size: 0.9em; opacity: 0.8;">Build the "Context Engine" for automated asset ingestion.</p>
            <p style="font-weight: bold; margin-top: 0.5em;">Cost: $20k/mo</p>
          </Card>
        {/snippet}
      </Split>
    </div>
  </Slide>

  <!-- Slide 4: Decision Criteria -->
  <Slide h={4} v={0}>
    <h2>Decision Criteria</h2>
    <div style="text-align: left; margin-top: 1.5em;">
      <Fragment index={0} style="fade-in">
        <p>📊 <strong>Runway:</strong> Maintain &gt;18 months of cash.</p>
      </Fragment>
      <Fragment index={1} style="fade-in">
        <p>📈 <strong>Defensibility:</strong> Can competition copy us in 6 months?</p>
      </Fragment>
      <Fragment index={2} style="fade-in">
        <p>🚀 <strong>Founder Passion:</strong> Where do I want to spend 80h/week?</p>
      </Fragment>
    </div>
  </Slide>

  <!-- Slide 5: Recommendation -->
  <Slide h={5} v={0}>
    <h2>Recommendation: Innovation First</h2>
    <div style="margin-top: 1em;">
      <Callout variant="neutral" title="Founder note">
        <p style="font-size: 1.3em; font-family: serif; font-style: italic; margin: 0;">
          "Build the platform that others can't ignore, then build the sales team that won't have to sell."
        </p>
      </Callout>
    </div>
  </Slide>

  <!-- Slide 6: 30-Day Plan -->
  <Slide h={6} v={0}>
    <h2>The 30-Day Plan</h2>
    <div style="margin-top: 1em;">
      <Table
        caption="Milestones"
        headers={["When", "Focus", "Outcome"]}
        rows={[
          ["Week 1", "Context Engine v1", "Internal prototype only"],
          ["Week 2", "Beta design", "Top 5% power users invited"],
          ["Week 4", "Ship", "First context-aware deck in beta"],
        ]}
        compact
      />
    </div>
  </Slide>
</Deck>
