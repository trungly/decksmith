# Decksmith

A standalone local presentation tool built with **Svelte 5**. Create beautiful, interactive presentations by editing a Svelte deck and running it locally.

Decksmith was originally inspired by [Reveal.js](https://revealjs.com/).

## Features

- **Slide Navigation** — Horizontal and vertical 2D slide grid
- **Transitions** — Fade, slide, convex, concave, zoom (per-slide or global)
- **Fragments** — Step-by-step reveals with 17 animation styles
- **Keyboard & Touch** — Full keyboard navigation + mobile swipe support
- **Overview Mode** — Bird's-eye view of all slides (ESC key)
- **Speaker Notes** — Separate speaker window with timer and notes
- **Markdown** — Write slide content in Markdown
- **Code Highlighting** — Syntax highlighting with line-by-line step-through
- **Auto-Animate** — Automatically animate matching elements between slides
- **Scroll View** — Render as a scrollable page
- **Themes** — 5 built-in themes (Obsidian, Air, Dusk, Parchment, Ember)
- **Hash Routing** — URL reflects current slide for deep-linking
- **Auto-Scaling** — Content scales to fit any viewport
- **PDF Export** — Print-friendly layout via `?print-pdf`
- **Progress Bar & Slide Numbers** — Configurable UI controls

## Local Development

Clone this repo to start a presentation:

```bash
git clone https://github.com/trungly/decksmith.git my-presentation
cd my-presentation
npm install
npm start
```

Open `http://localhost:5173` and edit `src/App.svelte`. Changes hot-reload instantly.

When you're ready to share it, build a static site with `npm run build`. The output goes to `dist/`.

## Integrated Playground

This repository includes both the core Decksmith library and an integrated playground experience.

- `src/lib` contains the publishable framework components and runtime.
- `src/App.svelte` is the local deck selector playground shell.
- `src/decks` contains curated sample decks used for demos and regression checks.

Use the top-right selector in the running app to switch between deck examples and quickly validate navigation, overview mode, and theme behavior.

## Minimal Presentation

Place this in `src/App.svelte`:

```svelte
<script lang="ts">
  import { Deck, Slide, Fragment } from "decksmith";
</script>

<Deck theme="obsidian" transition="slide">
  <Slide h={1} v={0}>
    <h1>Hello World</h1>
  </Slide>

  <Slide h={2} v={0}>
    <h2>Second Slide</h2>
    <Fragment index={0} style="fade-up">
      <p>Appears on click</p>
    </Fragment>
  </Slide>
</Deck>
```

## Slide Coordinate System

Slides are arranged in a 2D grid using `h` (horizontal) and `v` (vertical) coordinates:

```
h=1,v=0  →  h=2,v=0  →  h=3,v=0  →  h=4,v=0
                         ↓
                         h=3,v=1
                         ↓
                         h=3,v=2
```

- `h` increments left-to-right for the main sequence, starting at `1`.
- `v` increments top-to-bottom for sub-slides under a given `h`.
- Every presentation starts at `h=1, v=0`.
- Vertical slides (`v > 0`) are navigated with ↑/↓ keys.

## Component API

### `<Deck>` — Root Container

Wraps all slides. One per presentation.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `theme` | `"obsidian" \| "air" \| "dusk" \| "parchment" \| "ember"` | `"obsidian"` | Visual theme |
| `transition` | `"none" \| "fade" \| "slide" \| "convex" \| "concave" \| "zoom"` | `"slide"` | Default slide transition |
| `transitionSpeed` | `"default" \| "fast" \| "slow"` | `"default"` | Transition duration (400ms / 800ms / 1200ms) |
| `width` | `number` | `960` | Base slide width in px |
| `height` | `number` | `700` | Base slide height in px |
| `controls` | `boolean` | `true` | Show navigation arrows |
| `progress` | `boolean` | `true` | Show progress bar |
| `slideNumber` | `boolean` | `true` | Show slide number |
| `hash` | `boolean` | `true` | URL hash routing (`#/h/v`) |
| `overview` | `boolean` | `true` | Enable overview mode (Esc key) |
| `touch` | `boolean` | `true` | Enable touch/swipe navigation |
| `keyboard` | `boolean` | `true` | Enable keyboard navigation |
| `loop` | `boolean` | `false` | Loop from last slide to first |
| `scrollView` | `boolean` | `false` | Scrollable page mode instead of slides |
| `scrollLayout` | `"full" \| "compact"` | `"full"` | Scroll slide sizing (viewport-height or natural) |
| `scrollSnap` | `boolean` | `true` | CSS scroll-snap in scroll view |

### `<Slide>` — Individual Slide

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `h` | `number` | `1` | Horizontal position |
| `v` | `number` | `0` | Vertical position |
| `transition` | `TransitionType` | _(inherits from Deck)_ | Override transition for this slide |
| `background` | `string` | `""` | CSS background (color, gradient) |
| `backgroundImage` | `string` | `""` | Background image URL |
| `backgroundSize` | `string` | `"cover"` | CSS background-size |
| `backgroundPosition` | `string` | `"center"` | CSS background-position |
| `id` | `string` | — | Optional slide identifier |
| `autoAnimate` | `boolean` | `false` | Enable auto-animate with adjacent slide |

### `<Fragment>` — Step-by-Step Reveal

Wraps content that appears incrementally on the same slide.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `index` | `number` | `0` | Order of appearance (0 = first) |
| `style` | `FragmentStyle` | `"fade-in"` | Animation style |

**Fragment styles:**

| Style | Effect |
|-------|--------|
| `fade-in` | Fade in (opacity 0 → 1) |
| `fade-out` | Fade out (opacity 1 → 0) |
| `fade-up` | Fade in + slide up from below |
| `fade-down` | Fade in + slide down from above |
| `fade-left` | Fade in + slide from right |
| `fade-right` | Fade in + slide from left |
| `fade-in-then-out` | Fade in, then fade out on next step |
| `fade-in-then-semi-out` | Fade in, then dim to 30% on next step |
| `grow` | Scale up from 50% with fade |
| `shrink` | Scale down to 70% |
| `strike` | Strikethrough text |
| `highlight-red` | Turn text red |
| `highlight-green` | Turn text green |
| `highlight-blue` | Turn text blue |
| `highlight-current-red` | Red only while current step |
| `highlight-current-green` | Green only while current step |
| `highlight-current-blue` | Blue only while current step |

### `<Notes>` — Speaker Notes

Invisible in the presentation. Displayed in the speaker notes window (press `S`).

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `text` | `string` | `""` | Speaker notes content |

### `<Markdown>` — Markdown Content

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `content` | `string` | `""` | Markdown string to render |

### `<Code>` — Syntax-Highlighted Code

Renders code with highlight.js. Supports line-by-line step-through as fragments.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `code` | `string` | `""` | Code to display |
| `language` | `string` | _(auto-detect)_ | Language for highlighting |
| `lineNumbers` | `boolean` | `false` | Show line numbers |
| `highlightLines` | `string` | `""` | Line highlight steps (pipe-separated) |
| `lineNumberStart` | `number` | `1` | Starting line number |

**`highlightLines` format:** Pipe-separated steps, each with comma-separated lines or ranges.

```
"1"           → Highlight line 1
"1-3"         → Highlight lines 1 through 3
"1,4,7"       → Highlight lines 1, 4, and 7
"1-2|3-5|7"   → Step 1: lines 1-2, Step 2: lines 3-5, Step 3: line 7
```

## Transitions

| Type | Visual Effect |
|------|---------------|
| `none` | Instant switch |
| `fade` | Opacity crossfade |
| `slide` | Directional slide |
| `convex` | 3D rotation forward |
| `concave` | 3D rotation backward |
| `zoom` | Scale transition |

Set globally on `<Deck transition="...">` or override per-slide with `<Slide transition="...">`.

## Common Patterns

### Title Slide

```svelte
<Slide h={1} v={0}>
  <h1>Presentation Title</h1>
  <p>Subtitle or author name</p>
</Slide>
```

### Bullet List with Fragments

```svelte
<Slide h={2} v={0}>
  <h2>Key Points</h2>
  <Fragment index={0} style="fade-up"><p>First point</p></Fragment>
  <Fragment index={1} style="fade-up"><p>Second point</p></Fragment>
  <Fragment index={2} style="fade-up"><p>Third point</p></Fragment>
</Slide>
```

### Code Walkthrough

```svelte
<Slide h={2} v={0}>
  <h2>Code Example</h2>
  <Code
    language="typescript"
    lineNumbers
    highlightLines="1-2|4-6|8"
    code={`import { serve } from "bun";

// Create a server
const server = serve({
  port: 3000,
  fetch(req) {
    return new Response("Hello!");
  },
});`}
  />
</Slide>
```

### Two-Column Layout

```svelte
<Slide h={3} v={0}>
  <h2>Comparison</h2>
  <div style="display: flex; gap: 2em; margin-top: 1em; text-align: left;">
    <div style="flex: 1;">
      <h3>Before</h3>
      <p>Old approach description</p>
    </div>
    <div style="flex: 1;">
      <h3>After</h3>
      <p>New approach description</p>
    </div>
  </div>
</Slide>
```

### Background Image Slide

```svelte
<Slide h={4} v={0} backgroundImage="/images/photo.jpg" backgroundSize="cover">
  <h1 style="text-shadow: 0 2px 10px rgba(0,0,0,0.5);">Over an Image</h1>
</Slide>
```

### Gradient Background

```svelte
<Slide h={5} v={0} background="linear-gradient(135deg, #667eea 0%, #764ba2 100%)">
  <h2>Gradient Slide</h2>
</Slide>
```

### Vertical Sub-Slides

```svelte
<Slide h={2} v={0}>
  <h2>Main Topic</h2>
  <p>Press ↓ for details</p>
</Slide>
<Slide h={2} v={1}>
  <h3>Detail 1</h3>
</Slide>
<Slide h={2} v={2}>
  <h3>Detail 2</h3>
</Slide>
```

### Markdown Slide

```svelte
<Slide h={6} v={0}>
  <Markdown content={`
## Features

- **Bold** and *italic* text
- \`inline code\`
- [Links](https://example.com)

> Blockquotes work too!
  `} />
</Slide>
```

## Auto-Animate

Consecutive slides with `autoAnimate` will smoothly animate matching elements between them. Match elements using the `data-id` attribute.

```svelte
<Slide h={1} v={0} autoAnimate>
  <div data-id="box" style="width: 100px; height: 100px; background: blue;"></div>
  <h2 data-id="title">Hello</h2>
</Slide>

<Slide h={2} v={0} autoAnimate>
  <div data-id="box" style="width: 200px; height: 200px; background: red; border-radius: 50%;"></div>
  <h2 data-id="title" style="font-size: 3em;">Hello!</h2>
</Slide>
```

Animated properties: position, size, font-size, color, background-color, border-radius, opacity.

## Scroll View

Render the presentation as a scrollable page instead of slide-by-slide navigation:

```svelte
<Deck scrollView scrollLayout="full" scrollSnap>
  ...slides...
</Deck>
```

- `scrollLayout="full"` — Each slide fills the viewport height
- `scrollLayout="compact"` — Slides use natural content height
- `scrollSnap` — Scroll snaps to slide boundaries

## PDF Export

Append `?print-pdf` to the dev server URL, then print to PDF via Cmd+P / Ctrl+P:

```
http://localhost:5173/?print-pdf
```

## Keyboard Shortcuts

| Key                 | Action                   |
| ------------------- | ------------------------ |
| `→` / `Space`       | Next slide/fragment      |
| `←` / `Shift+Space` | Previous slide/fragment  |
| `↑` / `↓`           | Navigate vertical slides |
| `Esc`               | Toggle overview mode     |
| `F`                 | Toggle fullscreen        |
| `S`                 | Open speaker notes       |
| `B` / `.`           | Pause (blackout)         |
| `Home` / `End`      | First / last slide       |

## Themes

Set the theme on the `<Deck>` component:

```svelte
<Deck theme="obsidian">
```

Available: `obsidian` (default), `air`, `dusk`, `parchment`, `ember`

## Documentation

See the [docs/](./docs/) directory for complete documentation:

- [Getting Started](./docs/README.md)
- [Installation](./docs/installation.md)
- [Creating Presentations](./docs/creating-presentations.md)
- [Slides](./docs/slides.md)
- [Fragments](./docs/fragments.md)
- [Transitions](./docs/transitions.md)
- [Themes](./docs/themes.md)
- [Navigation](./docs/navigation.md)
- [Speaker Notes](./docs/speaker-notes.md)
- [Code Highlighting](./docs/code-highlighting.md)
- [Markdown](./docs/markdown.md)
- [Auto-Animate](./docs/auto-animate.md)
- [Scroll View](./docs/scroll-view.md)
- [PDF Export](./docs/pdf-export.md)
- [Overview Mode](./docs/overview-mode.md)
- [Configuration](./docs/configuration.md)
- [API Reference](./docs/api-reference.md)
- [LLM Guide](./docs/llm-guide.md) — For AI-assisted presentation generation

## For LLMs / AI Agents

- **[CLAUDE.md](./CLAUDE.md)** — Structured reference for Claude Code and Claude-based agents (component API, rules, selection guides)
- **[docs/llm-guide.md](./docs/llm-guide.md)** — Generation workflow, templates, and a complete example
- **[llms.txt](./llms.txt)** — Machine-readable project summary per the [llms.txt spec](https://llmstxt.org)

## Tech Stack

- [Svelte 5](https://svelte.dev/) — Runes-based reactivity
- [Vite](https://vitejs.dev/) — Fast build tooling
- [TypeScript](https://www.typescriptlang.org/) — Type safety
- [Marked](https://marked.js.org/) — Markdown parsing

## License

Decksmith is released under the [MIT License](./LICENSE).
