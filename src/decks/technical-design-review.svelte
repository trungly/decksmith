<script lang="ts">
  import { Deck, Slide, Code } from "decksmith";
</script>

<Deck theme="technical" transition="slide">
  <!-- Slide 1: Title -->
  <Slide h={1} v={0}>
    <h1>Modular Prompt Pipeline</h1>
    <p>Architecture Review & Migration Strategy</p>
    <div style="margin-top: 2em; opacity: 0.6;">April 2026</div>
  </Slide>

  <!-- Slide 2: Problem Definition -->
  <Slide h={2} v={0}>
    <h2>Current State: Monolithic Pipeline</h2>
    <div style="text-align: left; margin-top: 1em;">
      <p>❌ High coupling between generation logic and provider SDKs.</p>
      <p>❌ Inability to swap LLM providers without major refactors.</p>
      <p>❌ Difficult to test individual prompt fragments in isolation.</p>
    </div>
  </Slide>

  <!-- Slide 3: Proposed Architecture -->
  <Slide h={3} v={0}>
    <h2>Proposed: Modular Adapters</h2>
    <div style="display: flex; gap: 1em; margin-top: 1em;">
      <div
        style="flex: 1; border: 1px solid var(--ds-border); padding: 1em; border-radius: 4px;"
      >
        <h4>Prompt Fragments</h4>
        <p style="font-size: 0.8em;">
          Reusable, versioned templates stored in a central registry.
        </p>
      </div>
      <div
        style="flex: 1; border: 1px solid var(--ds-border); padding: 1em; border-radius: 4px;"
      >
        <h4>Provider Adapters</h4>
        <p style="font-size: 0.8em;">
          Abstracted interfaces for OpenAI, Anthropic, and local models.
        </p>
      </div>
    </div>
  </Slide>

  <!-- Slide 4: Code Comparison -->
  <Slide h={4} v={0}>
    <h2>API Comparison</h2>
    <div
      style="display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 1em; margin-top: 1em; width: 100%;"
    >
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
    </div>
  </Slide>

  <!-- Slide 5: Rollback Plan -->
  <Slide h={5} v={0}>
    <h2>Rollback Plan</h2>
    <div style="text-align: left; margin-top: 1em;">
      <p>
        <strong>Phase 1:</strong> Feature flag gated rollout to 5% of traffic.
      </p>
      <p>
        <strong>Monitoring:</strong> Auto-revert if error rate > 0.5% or latency >
        2s.
      </p>
      <p>
        <strong>State:</strong> No state migration required (stateless pipeline).
      </p>
    </div>
  </Slide>

  <!-- Slide 6: Q&A -->
  <Slide h={6} v={0}>
    <h1>Questions?</h1>
    <p>Internal documentation at <code>/docs/arch/modular-pipeline.md</code></p>
  </Slide>
</Deck>
