<script lang="ts">
  import { Deck, Slide, Fragment, Notes, Markdown, Code } from "decksmith";
</script>

<Deck theme="obsidian" transition="slide">
  <!-- Slide 1: Title -->
  <Slide h={0} v={0}>
    <h1>Decksmith</h1>
    <p>A standalone local presentation tool built with Svelte 5</p>
    <p style="margin-top: 1em; opacity: 0.5; font-size: 0.7em;">
      Press <kbd>Space</kbd> or <kbd>→</kbd> to navigate &bull; <kbd>Esc</kbd> for
      overview
    </p>
    <Notes
      text="Welcome to Decksmith! This is the title slide. Press S to open speaker notes."
    />
  </Slide>

  <!-- Slide 2: Features -->
  <Slide h={1} v={0}>
    <h2>Core Features</h2>
    <div style="text-align: left; margin-top: 1em;">
      <Fragment index={0} style="fade-up">
        <p>Horizontal &amp; vertical slide navigation</p>
      </Fragment>
      <Fragment index={1} style="fade-up">
        <p>Beautiful slide transitions</p>
      </Fragment>
      <Fragment index={2} style="fade-up">
        <p>Fragment animations (like this!)</p>
      </Fragment>
      <Fragment index={3} style="fade-up">
        <p>Speaker notes, overview mode, &amp; more</p>
      </Fragment>
    </div>
    <Notes
      text="This slide demonstrates fragment animations. Each bullet point appears one at a time."
    />
  </Slide>

  <!-- Slide 3: Vertical slides demo -->
  <Slide h={2} v={0}>
    <h2>Vertical Slides</h2>
    <p>Press <kbd>↓</kbd> to explore vertical slides</p>
    <Notes text="Vertical slides allow you to organize content in a 2D grid." />
  </Slide>

  <Slide h={2} v={1} background="#2d2d2d">
    <h3>Vertical Slide 1</h3>
    <p>Slides can have custom background colors</p>
  </Slide>

  <Slide
    h={2}
    v={2}
    background="linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
  >
    <h3>Vertical Slide 2</h3>
    <p>Or even gradient backgrounds!</p>
    <p style="margin-top: 0.5em; opacity: 0.6; font-size: 0.7em;">
      Press <kbd>↓</kbd> or <kbd>→</kbd> to continue
    </p>
  </Slide>

  <!-- Slide 4: Markdown -->
  <Slide h={3} v={0}>
    <h2>Markdown Support</h2>
    <Markdown
      content={`
Write your slides using **Markdown** syntax:

- Bullet points
- **Bold** and *italic* text
- \`inline code\` snippets
- [Links](https://example.com)

> Blockquotes work too!
    `}
    />
  </Slide>

  <!-- Slide 5: Transitions -->
  <Slide h={4} v={0} transition="fade">
    <h2>Transitions</h2>
    <p>This slide uses the <strong>fade</strong> transition</p>
    <div style="margin-top: 1em; text-align: left; font-size: 0.8em;">
      <p><code>none</code> — Instant switch</p>
      <p><code>fade</code> — Opacity crossfade</p>
      <p><code>slide</code> — Directional slide</p>
      <p><code>convex</code> — 3D flip forward</p>
      <p><code>concave</code> — 3D flip backward</p>
      <p><code>zoom</code> — Scale in/out</p>
    </div>
    <Notes
      text="Each transition type creates a different visual effect. You can set transitions globally on the Deck or per-slide."
    />
  </Slide>

  <!-- Slide 6: Fragment styles -->
  <Slide h={5} v={0}>
    <h2>Fragment Styles</h2>
    <div
      style="display: grid; grid-template-columns: repeat(3, 160px); gap: 1em; margin-top: 1.5em; justify-content: center;"
    >
      <Fragment index={0} style="fade-in">
        <span
          style="display: block; padding: 0.4em 0.6em; background: var(--ds-border); border-radius: 4px; text-align: center;"
          >fade-in</span
        >
      </Fragment>
      <Fragment index={1} style="fade-up">
        <span
          style="display: block; padding: 0.4em 0.6em; background: var(--ds-border); border-radius: 4px; text-align: center;"
          >fade-up</span
        >
      </Fragment>
      <Fragment index={2} style="grow">
        <span
          style="display: block; padding: 0.4em 0.6em; background: var(--ds-border); border-radius: 4px; text-align: center;"
          >grow</span
        >
      </Fragment>
      <Fragment index={3} style="shrink">
        <span
          style="display: block; padding: 0.4em 0.6em; background: var(--ds-border); border-radius: 4px; text-align: center;"
          >shrink</span
        >
      </Fragment>
      <Fragment index={4} style="highlight-red">
        <span
          style="display: block; padding: 0.4em 0.6em; background: var(--ds-border); border-radius: 4px; text-align: center;"
          >highlight-red</span
        >
      </Fragment>
      <Fragment index={5} style="highlight-blue">
        <span
          style="display: block; padding: 0.4em 0.6em; background: var(--ds-border); border-radius: 4px; text-align: center;"
          >highlight-blue</span
        >
      </Fragment>
    </div>
    <p style="margin-top: 1.5em; opacity: 0.5; font-size: 0.7em;">
      Press <kbd>Space</kbd> to reveal each fragment
    </p>
  </Slide>

  <!-- Slide 7: Themes -->
  <Slide h={6} v={0}>
    <h2>Built-in Themes</h2>
    <div
      style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 0.75em; margin-top: 1em; text-align: left; font-size: 0.8em;"
    >
      <div
        style="padding: 0.8em 1em; background: #0f1117; color: #c9d1d9; border-radius: 8px; border-left: 3px solid #58a6ff;"
      >
        <strong style="color: #f0f2f5;">obsidian</strong>
        <div style="margin-top: 0.2em; opacity: 0.7;">Deep dark, modern</div>
      </div>
      <div
        style="padding: 0.8em 1em; background: #f8fafc; color: #334155; border-radius: 8px; border-left: 3px solid #2563eb;"
      >
        <strong style="color: #0f172a;">air</strong>
        <div style="margin-top: 0.2em; opacity: 0.7;">Light, minimal</div>
      </div>
      <div
        style="padding: 0.8em 1em; background: #1e2433; color: #a9b1d6; border-radius: 8px; border-left: 3px solid #7aa2f7;"
      >
        <strong style="color: #c0caf5;">dusk</strong>
        <div style="margin-top: 0.2em; opacity: 0.7;">Deep navy, focused</div>
      </div>
      <div
        style="padding: 0.8em 1em; background: #f6f1e7; color: #3d2e1e; border-radius: 8px; border-left: 3px solid #8b5e3c; font-family: Georgia, serif;"
      >
        <strong style="color: #1c1209;">parchment</strong>
        <div style="margin-top: 0.2em; opacity: 0.7;">Warm serif, editorial</div>
      </div>
      <div
        style="padding: 0.8em 1em; background: #1a1520; color: #ddd0e6; border-radius: 8px; border-left: 3px solid #e07b99; grid-column: 2 / 4;"
      >
        <strong style="color: #f0e8fa;">ember</strong>
        <div style="margin-top: 0.2em; opacity: 0.7;">Dark plum, rose-coral accents</div>
      </div>
    </div>
    <Notes text="Five built-in themes, each with a distinct character. Use the theme prop on Deck to switch." />
  </Slide>

  <!-- Slide 8: Code with syntax highlighting -->
  <Slide h={7} v={0}>
    <h2>Syntax Highlighting</h2>
    <p style="margin-bottom: 0.5em; opacity: 0.6; font-size: 0.7em;">
      Press <kbd>Space</kbd> to step through highlighted lines
    </p>
    <Code
      language="svelte"
      lineNumbers
      highlightLines="1-2|3-4|5-8|9"
      code={`<Deck theme="obsidian" transition="slide">
  <Slide h={0} v={0}>
    <h1>My Presentation</h1>
    <p>Built with Decksmith</p>
    <Fragment index={0} style="fade-up"
            >
      <p>Revealed step by step</p>
    </Fragment>
  </Slide>
</Deck>`}
    />
    <Notes
      text="Code blocks support syntax highlighting with highlight.js and line-by-line step-through. Each press advances to the next highlighted section."
    />
  </Slide>

  <!-- Slide 8b: Code - another language -->
  <Slide h={7} v={1}>
    <h2>Multi-Language Support</h2>
    <Code
      language="typescript"
      lineNumbers
      highlightLines="1-2|4-6|8-10"
      code={`import { Deck, Slide, Fragment } from 'decksmith';
import type { DeckConfig } from 'decksmith';

const config: DeckConfig = {
  theme: 'dusk',
  transition: 'convex',
};

function startPresentation() {
  console.log('Ready!');
}`}
    />
  </Slide>

  <!-- Slide 9: Auto-animate -->
  <Slide h={8} v={0} autoAnimate>
    <div
      style="display: flex; align-items: center; justify-content: space-between; width: 100%; gap: 2em;"
    >
      <div
        data-id="box"
        style="width: 120px; height: 120px; background: var(--ds-accent, #42affa); border-radius: 16px; flex-shrink: 0;"
      ></div>
      <div style="text-align: right; flex: 1;">
        <h2 data-id="title">Auto-Animate</h2>
        <p data-id="desc" style="margin-top: 0.5em; opacity: 0.7;">
          Navigate forward to see it
        </p>
      </div>
    </div>
  </Slide>

  <Slide h={9} v={0} autoAnimate>
    <div
      style="display: flex; align-items: center; justify-content: space-between; width: 100%; gap: 2em;"
    >
      <div style="text-align: left; flex: 1;">
        <h2 data-id="title">Auto-Animate</h2>
        <p data-id="desc" style="margin-top: 0.5em; opacity: 0.7;">
          Elements move and morph between slides
        </p>
      </div>
      <div
        data-id="box"
        style="width: 120px; height: 120px; background: var(--ds-accent, #42affa); border-radius: 50%; flex-shrink: 0;"
      ></div>
    </div>
  </Slide>

  <!-- Slide 10: Keyboard shortcuts -->
  <Slide h={10} v={0}>
    <h2>Keyboard Shortcuts</h2>
    <div
      style="display: grid; grid-template-columns: auto 1fr; gap: 0.3em 1.5em; text-align: left; font-size: 0.75em; margin-top: 1em;"
    >
      <kbd>→</kbd> <span>Next slide</span>
      <kbd>←</kbd> <span>Previous slide</span>
      <kbd>↓</kbd> <span>Next vertical slide</span>
      <kbd>↑</kbd> <span>Previous vertical slide</span>
      <kbd>Space</kbd> <span>Next / Shift+Space: Previous</span>
      <kbd>Esc</kbd> <span>Toggle overview</span>
      <kbd>F</kbd> <span>Toggle fullscreen</span>
      <kbd>S</kbd> <span>Open speaker notes</span>
      <kbd>B</kbd> <span>Pause (blackout)</span>
      <kbd>Home</kbd> <span>First slide</span>
      <kbd>End</kbd> <span>Last slide</span>
    </div>
  </Slide>

  <!-- Slide 11: End -->
  <Slide
    h={11}
    v={0}
    background="linear-gradient(135deg, #0c0c1d 0%, #1a1a3e 100%)"
  >
    <h1>Thank You</h1>
    <p style="margin-top: 0.5em; opacity: 0.7;">
      Built with Svelte 5 &bull; Open Source
    </p>
    <Notes text="Thank you for checking out Decksmith!" />
  </Slide>
</Deck>

<style>
  :global(kbd) {
    display: inline-block;
    padding: 0.15em 0.5em;
    background: rgba(255, 255, 255, 0.1);
    border: 1px solid rgba(255, 255, 255, 0.2);
    border-radius: 4px;
    font-family: monospace;
    font-size: 0.9em;
  }
</style>
