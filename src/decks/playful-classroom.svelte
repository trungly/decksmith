<script lang="ts">
  import { Deck, Slide, Code, Fragment, Callout, Split, Card } from "decksmith";
  import { playgroundDeck } from "../playground/content-size.svelte.ts";
</script>

<Deck theme="playful" transition="slide" contentSize={playgroundDeck.contentSize}>
  <!-- Slide 1: Title -->
  <Slide h={1} v={0}>
    <h1 style="font-size: 3em; transform: rotate(-1deg);">Building with Prompts! 🏗️</h1>
    <p>Modular prompts, checks, and harnesses for better engineering.</p>
  </Slide>

  <!-- Slide 2: What is Modularity? -->
  <Slide h={2} v={0}>
    <h2>What is Modularity? 📦</h2>
    <div style="margin-top: 1.5em;">
      <Callout variant="info" title="In one sentence">
        <p>Modularity means breaking down big prompts into small, reusable chunks.</p>
        <p style="font-size: 0.9em; opacity: 0.6; font-style: italic;">Think LEGO blocks for LLMs.</p>
      </Callout>
    </div>
  </Slide>

  <!-- Slide 3: The Prompt Engine -->
  <Slide h={3} v={0}>
    <h2>The Prompt Engine 🚂</h2>
    <div style="margin-top: 2em;">
      <Split columns={3} gap="1em">
        {#snippet first()}
          <Card title="Base">
            <p style="font-size: 0.85em; text-align: center;">The core instructions.</p>
          </Card>
        {/snippet}
        {#snippet second()}
          <Card title="Add-on">
            <p style="font-size: 0.85em; text-align: center;">Extra details or context.</p>
          </Card>
        {/snippet}
        {#snippet third()}
          <Card title="Style">
            <p style="font-size: 0.85em; text-align: center;">Tone and formatting rules.</p>
          </Card>
        {/snippet}
      </Split>
    </div>
  </Slide>

  <!-- Slide 4: Eval Harnesses -->
  <Slide h={4} v={0}>
    <h2>Testing Your AI 🧪</h2>
    <p>How do we know if it's actually good? We use <strong>Eval Harnesses</strong>.</p>
    <div style="text-align: left; margin-top: 1.5em;">
      <Callout variant="success" title="Three checks that scale">
        <Fragment index={0} style="fade-in">
          <p>✅ <strong>Deterministic Checks:</strong> Does it contain specific words?</p>
        </Fragment>
        <Fragment index={1} style="fade-in">
          <p>✅ <strong>LLM-as-a-Judge:</strong> Ask another AI to score it.</p>
        </Fragment>
        <Fragment index={2} style="fade-in">
          <p>✅ <strong>Regression Tests:</strong> Did it get worse than before?</p>
        </Fragment>
      </Callout>
    </div>
  </Slide>

  <!-- Slide 5: Exercise Time -->
  <Slide h={5} v={0}>
    <h2>Coding Challenge! 💻</h2>
    <p>Build an eval check that ensures the AI doesn't leak secrets.</p>
    <Code code={`test("No secrets in prompt", () => {
  const result = generatePrompt("My password is 123");
  expect(result).not.toContain("123");
});`} language="typescript" />
  </Slide>

  <Slide h={6} v={0}>
    <h1 style="font-size: 3em;">Go Build! 🚀</h1>
    <div style="margin-top: 1.5em;">
      <Callout variant="warning" title="Homework">
        <p style="margin: 0;">Build a modular prompt system for a chatbot.</p>
      </Callout>
    </div>
  </Slide>
</Deck>
