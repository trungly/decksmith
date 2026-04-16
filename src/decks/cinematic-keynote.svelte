<script lang="ts">
  import { Deck, Slide, Notes, Fragment, Split, Card, Callout, Media } from "decksmith";
</script>

<Deck theme="cinematic" transition="slide">
  <!-- Slide 1: Title -->
  <Slide h={1} v={0}>
    <h1 style="font-size: 4em; letter-spacing: -0.05em; font-weight: 800;">
      The Polished Pixel
    </h1>
    <p style="font-size: 1.5em; opacity: 0.6; font-style: italic;">
      From raw AI to refined product.
    </p>
    <Notes
      text="Welcome! Today we're talking about the bridge between generation and craft."
    />
  </Slide>

  <!-- Slide 2: The Raw Input -->
  <Slide h={2} v={0}>
    <h2 style="margin: 0 0 0.2em; font-size: 2.8em;">The Rough Edge</h2>
    <div style="margin: 2em auto 0; max-width: 640px;">
      <Callout variant="neutral" title="The honest truth">
        <p style="font-size: 1.15em; opacity: 0.9; line-height: 1.6; margin: 0;">
          AI gives us the raw material. It's fast, but it's often unpolished. A block of stone waiting for the chisel.
        </p>
      </Callout>
    </div>
  </Slide>

  <!-- Slide 3: The Iterative Chisel -->
  <Slide h={3} v={0}>
    <h2>Quality is a Loop</h2>
    <div
      style="display: flex; flex-wrap: wrap; justify-content: center; align-items: center; margin: 1.5em auto 0; max-width: 760px; width: 100%; font-size: 1.4em; gap: 0.5em 0.9em;"
    >
      <div
        style="border: 2px solid var(--ds-accent); padding: 0.75em; border-radius: 50%; min-width: 4.2em; text-align: center;"
      >
        Loop
      </div>
      <div style="font-size: 0.5em; opacity: 0.4;">→</div>
      <div
        style="border: 2px solid var(--ds-accent); padding: 0.75em; border-radius: 50%; min-width: 4.2em; text-align: center;"
      >
        Refine
      </div>
      <div style="font-size: 0.5em; opacity: 0.4;">→</div>
      <div
        style="border: 2px solid var(--ds-accent); padding: 0.75em; border-radius: 50%; min-width: 4.2em; text-align: center;"
      >
        Perfect
      </div>
    </div>
    <div style="margin-top: 2em;">
      <Media
        kind="image"
        src="https://picsum.photos/seed/polished-pixel/900/420"
        alt="Abstract texture suggesting refinement"
        caption="Texture as metaphor: iteration turns noise into signal."
        objectFit="cover"
      />
    </div>
  </Slide>

  <!-- Slide 4: Real World Example -->
  <Slide h={4} v={0}>
    <h2>A Case Study in Polish</h2>
    <div style="margin-top: 2em;">
      <Split gap="2em" align="start">
        {#snippet first()}
          <Fragment index={0} style="fade-in">
            <Card title="Before" subtitle="Fast, flat">
              <p style="font-size: 0.85em; opacity: 0.75;">
                A functional but soulless dashboard generated in 3 seconds.
              </p>
            </Card>
          </Fragment>
        {/snippet}
        {#snippet second()}
          <Fragment index={1} style="fade-in">
            <Card title="After" subtitle="Intentional craft">
              <p style="font-size: 0.85em; opacity: 0.75;">
                Hand-tuned typography, intentional spacing, and curated interactions.
              </p>
            </Card>
          </Fragment>
        {/snippet}
      </Split>
    </div>
  </Slide>

  <!-- Slide 5: The Human Element -->
  <Slide h={5} v={0}>
    <h2>The Human in the Loop</h2>
    <div style="margin-top: 1.5em;">
      <Callout variant="success" title="How we work">
        <p style="font-size: 1.6em; font-weight: 300; margin: 0;">AI is our collaborator, not our replacement.</p>
      </Callout>
    </div>
    <Notes text="We provide the vision, AI provides the speed." />
  </Slide>

  <Slide h={6} v={0}>
    <h1 style="font-size: 3em;">Stay Polished</h1>
    <p style="opacity: 0.5; margin-top: 2em;">github.com/trungly/decksmith</p>
  </Slide>
</Deck>
