# Corporate Presentation

A business-focused template using the parchment theme.

Paste this into `src/App.svelte`:

```svelte
<script lang="ts">
  import { Deck, Slide, Fragment, Notes } from "decksmith";
</script>

<Deck theme="parchment" transition="fade" transitionSpeed="fast">
  <Slide h={0} v={0}>
    <h1>Q4 Business Review</h1>
    <p>December 2025</p>
    <Notes text="Welcome everyone to the quarterly review." />
  </Slide>

  <Slide h={1} v={0}>
    <h2>Key Metrics</h2>
    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1.5em; margin-top: 1em;">
      <Fragment index={0} style="fade-in">
        <div style="padding: 1em; background: rgba(0,0,0,0.05); border-radius: 8px; text-align: center;">
          <div style="font-size: 2.5em; font-weight: bold; color: var(--ds-accent);">$4.2M</div>
          <p>Revenue</p>
        </div>
      </Fragment>
      <Fragment index={1} style="fade-in">
        <div style="padding: 1em; background: rgba(0,0,0,0.05); border-radius: 8px; text-align: center;">
          <div style="font-size: 2.5em; font-weight: bold; color: var(--ds-accent);">+23%</div>
          <p>Growth YoY</p>
        </div>
      </Fragment>
      <Fragment index={2} style="fade-in">
        <div style="padding: 1em; background: rgba(0,0,0,0.05); border-radius: 8px; text-align: center;">
          <div style="font-size: 2.5em; font-weight: bold; color: var(--ds-accent);">12K</div>
          <p>New Customers</p>
        </div>
      </Fragment>
      <Fragment index={3} style="fade-in">
        <div style="padding: 1em; background: rgba(0,0,0,0.05); border-radius: 8px; text-align: center;">
          <div style="font-size: 2.5em; font-weight: bold; color: var(--ds-accent);">94%</div>
          <p>Retention Rate</p>
        </div>
      </Fragment>
    </div>
  </Slide>

  <Slide h={2} v={0}>
    <h2>Strategic Priorities</h2>
    <div style="text-align: left; margin-top: 1em;">
      <Fragment index={0} style="fade-up">
        <p><strong>1. Market Expansion</strong> — Enter 3 new regions</p>
      </Fragment>
      <Fragment index={1} style="fade-up">
        <p><strong>2. Product Innovation</strong> — Launch v3.0 platform</p>
      </Fragment>
      <Fragment index={2} style="fade-up">
        <p><strong>3. Team Growth</strong> — Hire 40 engineers</p>
      </Fragment>
    </div>
    <Notes text="Emphasize that these priorities are interdependent." />
  </Slide>

  <Slide h={3} v={0}>
    <h2>Timeline</h2>
    <div style="display: flex; justify-content: space-between; margin-top: 2em; text-align: center;">
      <Fragment index={0} style="fade-in">
        <div>
          <div style="font-size: 1.2em; font-weight: bold;">Q1</div>
          <p style="font-size: 0.8em;">Foundation</p>
        </div>
      </Fragment>
      <Fragment index={1} style="fade-in">
        <div>
          <div style="font-size: 1.2em; font-weight: bold;">Q2</div>
          <p style="font-size: 0.8em;">Build</p>
        </div>
      </Fragment>
      <Fragment index={2} style="fade-in">
        <div>
          <div style="font-size: 1.2em; font-weight: bold;">Q3</div>
          <p style="font-size: 0.8em;">Launch</p>
        </div>
      </Fragment>
      <Fragment index={3} style="fade-in">
        <div>
          <div style="font-size: 1.2em; font-weight: bold;">Q4</div>
          <p style="font-size: 0.8em;">Scale</p>
        </div>
      </Fragment>
    </div>
  </Slide>

  <Slide h={4} v={0}>
    <h1>Questions?</h1>
    <p style="margin-top: 0.5em; opacity: 0.6;">Thank you for your time</p>
  </Slide>
</Deck>
```
