<script lang="ts">
  import { Deck, Slide, Code, Fragment } from "decksmith";
</script>

<Deck theme="playful" transition="slide">
  <!-- Slide 1: Title -->
  <Slide h={1} v={0}>
    <h1 style="font-size: 3em; transform: rotate(-1deg);">Building with Prompts! 🏗️</h1>
    <p>Modular prompts, checks, and harnesses for better engineering.</p>
  </Slide>

  <!-- Slide 2: What is Modularity? -->
  <Slide h={2} v={0}>
    <h2>What is Modularity? 📦</h2>
    <div style="text-align: left; margin-top: 1.5em; border: 2px dashed #000; padding: 1.5em; border-radius: 12px; background: rgba(0,0,0,0.02);">
      <p>Modularity means breaking down big prompts into small, reusable chunks.</p>
      <p style="font-size: 0.9em; opacity: 0.6; font-style: italic;">Think LEGO blocks for LLMs.</p>
    </div>
  </Slide>

  <!-- Slide 3: The Prompt Engine -->
  <Slide h={3} v={0}>
    <h2>The Prompt Engine 🚂</h2>
    <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 1em; margin-top: 2em; text-align: center;">
      <div style="background: rgba(0,0,0,0.05); padding: 1em; border-radius: 12px;">
        <h3>Base</h3>
        <p style="font-size: 0.7em;">The core instructions.</p>
      </div>
      <div style="background: rgba(0,0,0,0.05); padding: 1em; border-radius: 12px;">
        <h3>Add-on</h3>
        <p style="font-size: 0.7em;">Extra details or context.</p>
      </div>
      <div style="background: rgba(0,0,0,0.05); padding: 1em; border-radius: 12px;">
        <h3>Style</h3>
        <p style="font-size: 0.7em;">Tone and formatting rules.</p>
      </div>
    </div>
  </Slide>

  <!-- Slide 4: Eval Harnesses -->
  <Slide h={4} v={0}>
    <h2>Testing Your AI 🧪</h2>
    <p>How do we know if it's actually good? We use **Eval Harnesses**.</p>
    <div style="text-align: left; margin-top: 1.5em; padding-left: 2em; border-left: 4px solid #fecb2f;">
      <Fragment index={0} style="fade-in">
        <p>✅ **Deterministic Checks:** Does it contain specific words?</p>
      </Fragment>
      <Fragment index={1} style="fade-in">
        <p>✅ **LLM-as-a-Judge:** Ask another AI to score it.</p>
      </Fragment>
      <Fragment index={2} style="fade-in">
        <p>✅ **Regression Tests:** Did it get worse than before?</p>
      </Fragment>
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
    <p style="opacity: 0.6; margin-top: 2em;">Homework: Build a modular prompt system for a chatbot.</p>
  </Slide>
</Deck>
