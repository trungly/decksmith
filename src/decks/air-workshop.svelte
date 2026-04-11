<script lang="ts">
  import { Deck, Slide, Code, Fragment } from "decksmith";
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
    <div style="background: rgba(0,0,0,0.02); padding: 2em; border-radius: 20px; border: 1px solid rgba(0,0,0,0.05); margin-top: 1em;">
      <p style="font-size: 1.5em; color: var(--ds-accent);">Context is King 👑</p>
      <p style="opacity: 0.7;">An AI only knows what you tell it. The better the context, the better the code.</p>
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
    <Code code={`"Write a script to clean some data"`} language="markdown" />
    <div style="margin-top: 1em;">
      <p style="font-style: italic;">Hint: Consider the format, the cleaning logic, and the error handling.</p>
    </div>
  </Slide>

  <!-- Slide 5: The "Chain of Thought" -->
  <Slide h={5} v={0}>
    <h2>Chain of Thought</h2>
    <p>Ask the AI to explain its reasoning <strong>before</strong> writing code.</p>
    <Code code={`"Think step by step before generating the final implementation."`} language="markdown" />
  </Slide>

  <!-- Slide 6: Feedback Loop -->
  <Slide h={6} v={0}>
    <h2>品質 Loop</h2>
    <div style="display: flex; justify-content: space-around; margin-top: 2em;">
      <div style="text-align: center;">
        <div style="font-size: 2em;">1</div>
        <p>Generate</p>
      </div>
      <div style="text-align: center;">
        <div style="font-size: 2em;">2</div>
        <p>Review</p>
      </div>
      <div style="text-align: center;">
        <div style="font-size: 2em;">3</div>
        <p>Refine</p>
      </div>
    </div>
  </Slide>

  <Slide h={7} v={0}>
    <h1>Happy Coding!</h1>
    <p style="margin-top: 1em; opacity: 0.4;">Feedback link: bit.ly/prompt-workshop-feedback</p>
  </Slide>
</Deck>
