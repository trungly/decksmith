<script lang="ts">
  import { Deck, Slide, Notes, Fragment } from "decksmith";
</script>

<Deck theme="cinematic" transition="slide">
  <!-- Slide 1: Title -->
  <Slide h={1} v={0}>
    <h1 style="font-size: 4em; letter-spacing: -0.05em; font-weight: 800;">The Polished Pixel</h1>
    <p style="font-size: 1.5em; opacity: 0.6; font-style: italic;">From raw AI to refined product.</p>
    <Notes text="Welcome! Today we're talking about the bridge between generation and craft." />
  </Slide>

  <!-- Slide 2: The Raw Input -->
  <Slide h={2} v={0}>
    <h2>The Rough Edge</h2>
    <div style="text-align: left; margin: 2em auto; max-width: 600px; font-size: 1.4em; opacity: 0.8; line-height: 1.6;">
      <p>AI gives us the raw material. It's fast, but it's often unpolished. A block of stone waiting for the chisel.</p>
    </div>
  </Slide>

  <!-- Slide 3: The Iterative Chisel -->
  <Slide h={3} v={0}>
    <h2>Quality is a Loop</h2>
    <div style="display: flex; justify-content: center; align-items: center; height: 300px; font-size: 2em; gap: 1em;">
      <div style="border: 2px solid var(--ds-accent); padding: 1em; border-radius: 50%;">Loop</div>
      <div style="font-size: 0.5em; opacity: 0.4;">→</div>
      <div style="border: 2px solid var(--ds-accent); padding: 1em; border-radius: 50%;">Refine</div>
      <div style="font-size: 0.5em; opacity: 0.4;">→</div>
      <div style="border: 2px solid var(--ds-accent); padding: 1em; border-radius: 50%;">Perfect</div>
    </div>
  </Slide>

  <!-- Slide 4: Real World Example -->
  <Slide h={4} v={0}>
    <h2>A Case Study in Polish</h2>
    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 2em; margin-top: 2em;">
      <Fragment index={0} style="fade-in">
        <div style="background: rgba(0,0,0,0.1); padding: 2em; border-radius: 12px; text-align: left;">
          <h4 style="color: #f00;">Before</h4>
          <p style="font-size: 0.8em; opacity: 0.6;">A functional but soulless dashboard generated in 3 seconds.</p>
        </div>
      </Fragment>
      <Fragment index={1} style="fade-in">
        <div style="background: rgba(var(--ds-accent-rgb), 0.1); padding: 2em; border-radius: 12px; text-align: left;">
          <h4 style="color: var(--ds-accent);">After</h4>
          <p style="font-size: 0.8em; opacity: 0.6;">Hand-tuned typography, intentional spacing, and curated interactions.</p>
        </div>
      </Fragment>
    </div>
  </Slide>

  <!-- Slide 5: The Human Element -->
  <Slide h={5} v={0}>
    <h2>The Human in the Loop</h2>
    <p style="font-size: 1.8em; margin-top: 1.5em; font-weight: 300;">AI is our collaborator, not our replacement.</p>
    <Notes text="We provide the vision, AI provides the speed." />
  </Slide>

  <Slide h={6} v={0}>
    <h1 style="font-size: 3em;">Stay Polished</h1>
    <p style="opacity: 0.5; margin-top: 2em;">github.com/trungly/decksmith</p>
  </Slide>
</Deck>
