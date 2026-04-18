<script lang="ts">
  import {
    Deck,
    Slide,
    Notes,
    Callout,
    Stat,
    Split,
    Card,
    Media,
    Table,
  } from "decksmith";
  import { playgroundDeck } from "../playground/content-size.svelte.ts";
</script>

<Deck theme="startup" transition="slide" contentSize={playgroundDeck.contentSize}>
  <!-- Slide 1: Title -->
  <Slide h={1} v={0}>
    <h1 style="font-size: 3em;">Decksmith AI</h1>
    <p>The AI-native presentation builder for product and engineering teams.</p>
    <Notes text="Welcome! We're reimagining how teams create decks." />
  </Slide>

  <!-- Slide 2: Problem -->
  <Slide h={2} v={0}>
    <h2>The Problem</h2>
    <div style="margin-top: 1em;">
      <Callout variant="warning" title="What slows teams down today">
        <p>Slides are slow and tedious to build manually.</p>
        <p>Existing tools lack technical context (code, docs).</p>
        <p>Consistency across teams is hard to maintain.</p>
      </Callout>
    </div>
    <Notes text="Engineers hate slides because they're disconnected from their workflow." />
  </Slide>

  <!-- Slide 3: Solution -->
  <Slide h={3} v={0}>
    <h2>The Solution</h2>
    <p>Decksmith is a code-first, AI-native framework for presentations.</p>
    <div style="margin-top: 1em;">
      <Split gap="1em">
        {#snippet first()}
          <Card title="AI-Powered">
            <p>Generates content from docs and codebase.</p>
          </Card>
        {/snippet}
        {#snippet second()}
          <Card title="Developer-First">
            <p>Uses Svelte, Markdown, and standard Git workflows.</p>
          </Card>
        {/snippet}
      </Split>
    </div>
    <Notes text="We bridge the gap between engineering and communication." />
  </Slide>

  <!-- Slide 4: Traction -->
  <Slide h={4} v={0}>
    <h2>Traction</h2>
    <div style="margin-top: 1.5em;">
      <Split columns={3} gap="1rem">
        {#snippet first()}
          <Stat value="50k" label="Beta users" delta="Strong waitlist" deltaTone="positive" />
        {/snippet}
        {#snippet second()}
          <Stat value="200%" label="MoM growth" delta="Early curve" deltaTone="positive" />
        {/snippet}
        {#snippet third()}
          <Stat value="0" label="Slides named “final_v7”" delta="(we hope)" deltaTone="neutral" />
        {/snippet}
      </Split>
    </div>
    <Notes text="Our initial open-source launch saw incredible adoption." />
  </Slide>

  <!-- Slide 5: Product Demo Narrative -->
  <Slide h={5} v={0}>
    <h2>Product Demo</h2>
    <p>From prompt to polished deck in seconds.</p>
    <div style="margin-top: 1em;">
      <Media
        kind="image"
        src="https://picsum.photos/seed/decksmith-demo/880/495"
        alt="Illustrative deck builder screenshot"
        caption="Concept: prompt in, structured slides out."
        objectFit="cover"
      />
    </div>
    <div style="margin-top: 1em;">
      <Callout variant="info" title="Try it">
        <p style="font-family: monospace; font-size: 0.9em; margin: 0;">
          <span style="color: var(--ds-link);">prompt&gt;</span> Build me a pitch for our new microservices architecture…
        </p>
      </Callout>
    </div>
    <Notes text="The AI understands your components and generates the structure." />
  </Slide>

  <!-- Slide 6: Business Model -->
  <Slide h={6} v={0}>
    <h2>Business Model</h2>
    <div style="margin-top: 1em;">
      <Table
        caption="Packaging"
        headers={["Tier", "Who it's for", "Highlights"]}
        rows={[
          ["Free", "Individuals & open source", "Core authoring, community themes"],
          ["Pro", "Power users & small teams", "$20/mo — advanced AI features"],
          ["Enterprise", "IT & compliance", "SSO, audit logs, custom themes"],
        ]}
        columnAlign={["left", "left", "left"]}
      />
    </div>
    <Notes text="SaaS model with a strong free tier to drive adoption." />
  </Slide>

  <!-- Slide 7: Go-to-Market -->
  <Slide h={7} v={0}>
    <h2>Go-to-Market</h2>
    <p>Developer advocacy and community-led growth.</p>
    <div style="margin-top: 1em;">
      <Callout variant="success" title="Near-term beats">
        <p>Launching at DevConf 2026</p>
        <p>Strategic partnerships with cloud providers</p>
      </Callout>
    </div>
    <Notes text="Focusing on the platforms where developers already live." />
  </Slide>

  <!-- Slide 8: Team -->
  <Slide h={8} v={0}>
    <h2>The Team</h2>
    <div style="margin-top: 1em;">
      <Split gap="2rem">
        {#snippet first()}
          <Card title="CEO" subtitle="Serial entrepreneur">
            {#snippet footer()}
              <span>Go-to-market & fundraising</span>
            {/snippet}
            <div
              style="width: 100px; height: 100px; background: var(--ds-border); border-radius: 50%; margin: 0 auto;"
              aria-hidden="true"
            ></div>
          </Card>
        {/snippet}
        {#snippet second()}
          <Card title="CTO" subtitle="Ex-FAANG lead">
            {#snippet footer()}
              <span>Platform & AI architecture</span>
            {/snippet}
            <div
              style="width: 100px; height: 100px; background: var(--ds-border); border-radius: 50%; margin: 0 auto;"
              aria-hidden="true"
            ></div>
          </Card>
        {/snippet}
      </Split>
    </div>
    <Notes text="We have the technical and business expertise." />
  </Slide>

  <!-- Slide 9: Competitive Landscape -->
  <Slide h={9} v={0}>
    <h2>Why Now?</h2>
    <p>The convergence of generative AI and developer-centric workflows.</p>
    <div style="margin-top: 1em;">
      <Callout variant="neutral" title="The shift">
        <p>Traditional tools have not evolved for the modern tech stack.</p>
      </Callout>
    </div>
    <Notes text="Traditional tools haven't evolved for the modern tech stack." />
  </Slide>

  <!-- Slide 10: The Ask -->
  <Slide h={10} v={0}>
    <h2>The Ask</h2>
    <div style="margin-top: 0.5em;">
      <Stat value="$2M seed" label="To scale AI engineering and reach 1M users" />
    </div>
    <p style="margin-top: 1rem; opacity: 0.6;">invest@decksmith.ai</p>
    <Notes text="Join us in building the future of presentations." />
  </Slide>
</Deck>
