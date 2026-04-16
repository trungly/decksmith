<script lang="ts">
  import { Deck, Slide, Code, Fragment, Callout, Split, Stat, Table } from "decksmith";

  const chainOfThoughtExample =
    '"Think step by step before generating the final implementation."';
</script>

<Deck theme="air" transition="slide">
  <!-- Slide 1: Title -->
  <Slide h={1} v={0}>
    <h1 style="font-size: 3.5em; font-weight: 200;">Mastering AI Prompts</h1>
    <p style="font-size: 1.2em; letter-spacing: 0.1em; opacity: 0.5;">A workshop for developers</p>
  </Slide>

  <!-- Slide 2: The Core Principle -->
  <Slide h={2} v={0}>
    <h2>The Golden Rule</h2>
    <div style="margin-top: 1em;">
      <Callout variant="info" title="Context is king 👑">
        <p style="opacity: 0.85;">An AI only knows what you tell it. The better the context, the better the code.</p>
      </Callout>
    </div>
  </Slide>

  <!-- Slide 3: The Prompt Anatomy -->
  <Slide h={3} v={0}>
    <h2>Anatomy of a Great Prompt</h2>
    <div style="text-align: left; margin-top: 1em; display: grid; gap: 0.5em;">
      <Fragment index={0} style="fade-in">
        <p>🏷️ <strong>Role:</strong> Act as a senior systems engineer...</p>
      </Fragment>
      <Fragment index={1} style="fade-in">
        <p>🎯 <strong>Objective:</strong> Refactor this function for O(n) complexity...</p>
      </Fragment>
      <Fragment index={2} style="fade-in">
        <p>🛠️ <strong>Constraints:</strong> Use only standard library, no extra deps...</p>
      </Fragment>
      <Fragment index={3} style="fade-in">
        <p>📦 <strong>Context:</strong> Here is the related interface definition...</p>
      </Fragment>
    </div>
  </Slide>

  <!-- Slide 4: Exercise 1 -->
  <Slide h={4} v={0}>
    <h2>Exercise 1: The Vague Prompt</h2>
    <p style="font-size: 0.9em; opacity: 0.6; margin-bottom: 1em;">Turn this into a "pro" prompt:</p>
    <Code code='"Write a script to clean some data"' language="markdown" />
    <div style="margin-top: 1em;">
      <Callout variant="warning" title="Hints">
        <p style="margin: 0; font-style: italic;">Consider the format, the cleaning logic, and the error handling.</p>
      </Callout>
    </div>
  </Slide>

  <!-- Slide 5: The "Chain of Thought" -->
  <Slide h={5} v={0}>
    <h2>Chain of Thought</h2>
    <p>Ask the AI to explain its reasoning <strong>before</strong> writing code.</p>
    <Code code={chainOfThoughtExample} language="markdown" />
    <div style="margin-top: 1em;">
      <Table
        caption="More patterns"
        headers={["Step", "Example"]}
        rows={[
          ["Prime", '"Think step by step before coding."'],
          ["Verify", '"List assumptions, then implement."'],
        ]}
        compact
      />
    </div>
  </Slide>

  <!-- Slide 6: Feedback Loop -->
  <Slide h={6} v={0}>
    <h2>Quality loop</h2>
    <div style="margin-top: 2em;">
      <Split columns={3} gap="1.25em">
        {#snippet first()}
          <Stat value="1" label="Generate" />
        {/snippet}
        {#snippet second()}
          <Stat value="2" label="Review" />
        {/snippet}
        {#snippet third()}
          <Stat value="3" label="Refine" />
        {/snippet}
      </Split>
    </div>
  </Slide>

  <Slide h={7} v={0}>
    <h1>Happy Coding!</h1>
    <p style="margin-top: 1em; opacity: 0.4;">Feedback link: bit.ly/prompt-workshop-feedback</p>
  </Slide>
</Deck>
