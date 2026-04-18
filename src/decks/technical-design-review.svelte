<script lang="ts">
  import { Deck, Slide, Code, Callout, Split, Card } from "decksmith";
  import { playgroundDeck } from "../playground/content-size.svelte.ts";
</script>

<Deck theme="technical" transition="fade" contentSize={playgroundDeck.contentSize}>
  <!-- Slide 1: Title -->
  <Slide h={1} v={0}>
    <h1>Modular Prompt Pipeline</h1>
    <p>Architecture Review & Migration Strategy</p>
    <div style="margin-top: 2em; opacity: 0.6;">April 2026</div>
  </Slide>

  <!-- Slide 2: Problem Definition -->
  <Slide h={2} v={0}>
    <h2>Current State: Monolithic Pipeline</h2>
    <div style="margin-top: 1em;">
      <Callout variant="danger" title="Pain points">
        <p>High coupling between generation logic and provider SDKs.</p>
        <p>Inability to swap LLM providers without major refactors.</p>
        <p>Difficult to test individual prompt fragments in isolation.</p>
      </Callout>
    </div>
  </Slide>

  <!-- Slide 3: Proposed Architecture -->
  <Slide h={3} v={0}>
    <h2>Proposed: Modular Adapters</h2>
    <div style="margin-top: 1em;">
      <Split gap="1em">
        {#snippet first()}
          <Card title="Prompt fragments">
            <p style="font-size: 0.8em;">Reusable, versioned templates stored in a central registry.</p>
          </Card>
        {/snippet}
        {#snippet second()}
          <Card title="Provider adapters">
            <p style="font-size: 0.8em;">Abstracted interfaces for OpenAI, Anthropic, and local models.</p>
          </Card>
        {/snippet}
      </Split>
    </div>
  </Slide>

  <!-- Slide 4: Code Comparison -->
  <Slide h={4} v={0}>
    <h2>API Comparison</h2>
    <div style="margin-top: 1em; width: 100%;">
      <Split gap="1em" align="start">
        {#snippet first()}
          <div style="min-width: 0;">
            <h4>Before</h4>
            <Code
              code={`const res = await openai.chat.completions.create({
  model: "gpt-4",
  messages: [{ role: "user", content: \`Generate... \${context}\` }]
});`}
              language="typescript"
            />
          </div>
        {/snippet}
        {#snippet second()}
          <div style="min-width: 0;">
            <h4>After</h4>
            <Code
              code={`const pipeline = new Pipeline(provider);
const result = await pipeline.execute(
  "main-prompt",
  {
  context: "...",
  fragments: ["summary", "footer"]
  }
);`}
              language="typescript"
            />
          </div>
        {/snippet}
      </Split>
    </div>
  </Slide>

  <!-- Slide 5: Rollback Plan -->
  <Slide h={5} v={0}>
    <h2>Rollback Plan</h2>
    <div style="margin-top: 1em;">
      <Callout variant="info" title="Operational guardrails">
        <p><strong>Phase 1:</strong> Feature flag gated rollout to 5% of traffic.</p>
        <p><strong>Monitoring:</strong> Auto-revert if error rate &gt; 0.5% or latency &gt; 2s.</p>
        <p><strong>State:</strong> No state migration required (stateless pipeline).</p>
      </Callout>
    </div>
  </Slide>

  <!-- Slide 6: Q&A -->
  <Slide h={6} v={0}>
    <h1>Questions?</h1>
    <p>Internal documentation at <code>/docs/arch/modular-pipeline.md</code></p>
  </Slide>
</Deck>
