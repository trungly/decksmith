# Decksmith — AI Agent Reference

Decksmith is a standalone local presentation tool built with Svelte 5. Presentations typically live in `src/App.svelte` and use Decksmith's `<Deck>`, `<Slide>`, `<Fragment>`, `<Notes>`, `<Markdown>`, and `<Code>` components.

## Quick Start Template

```svelte
<script lang="ts">
  import { Deck, Slide, Fragment, Notes, Markdown, Code } from "decksmith";
</script>

<Deck theme="obsidian" transition="slide">
  <Slide h={1} v={0}>
    <h1>Title</h1>
    <p>Subtitle</p>
    <Notes text="Speaker notes for this slide." />
  </Slide>

  <Slide h={2} v={0}>
    <h2>Second Slide</h2>
    <Fragment index={0} style="fade-up">
      <p>First point</p>
    </Fragment>
    <Fragment index={1} style="fade-up">
      <p>Second point</p>
    </Fragment>
  </Slide>
</Deck>
```

## Rules for Code Generation

Follow these rules when generating or editing a Decksmith presentation:

1. **Every `<Slide>` must have `h` and `v` props.** The first slide is always `h={1} v={0}`.
2. **`h` values must be sequential** starting from 1. No gaps allowed.
3. **`v` values must start at 0** for each `h` column and increment: `v={0}`, `v={1}`, `v={2}`.
4. **Fragment `index` values start at 0** and increment sequentially within a slide.
5. **One `<Deck>` per presentation.** All `<Slide>` components must be direct children of `<Deck>`.
6. **Use valid prop values only.** See enums in Component API below.
7. **Inline styles only.** Do not generate `<style>` blocks unless specifically needed for global selectors.
8. **Escape backticks in template literals.** When `code` or `content` props contain backticks, escape them: `` \` ``.
9. **Import only what you use.** `import { Deck, Slide, Fragment, Notes, Markdown, Code } from "decksmith";`
10. **Return complete files.** Never return partial snippets when editing — always the full `src/App.svelte`.

## Slide Coordinate System

Slides are arranged in a 2D grid using `h` (horizontal) and `v` (vertical) coordinates:

```
h=1,v=0  →  h=2,v=0  →  h=3,v=0  →  h=4,v=0
                         ↓
                         h=3,v=1
                         ↓
                         h=3,v=2
```

- `h` increments left-to-right for the main sequence, starting at 1.
- `v` increments top-to-bottom for sub-slides under a given `h`, starting at 0.
- Every presentation starts at `h=1, v=0`.
- Vertical slides (v > 0) are navigated with ↑/↓ keys.

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
| `h` | `number` | `1` | Horizontal position (1-based) |
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
| `highlight-red` | Turn text red (#ff2c2d) |
| `highlight-green` | Turn text green (#17ff2e) |
| `highlight-blue` | Turn text blue (#1b91ff) |
| `highlight-current-red` | Red only while current step |
| `highlight-current-green` | Green only while current step |
| `highlight-current-blue` | Blue only while current step |

### `<Notes>` — Speaker Notes

Invisible in the presentation. Displayed in the speaker notes window (press `S`).

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `text` | `string` | `""` | Speaker notes content |

Place `<Notes>` inside a `<Slide>`.

### `<Markdown>` — Markdown Content

Renders Markdown inside a slide.

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

Each step acts as a fragment. Non-highlighted lines dim to 35% opacity.

## Themes

| Theme | Background | Text | Accent | Description |
|-------|-----------|------|--------|-------------|
| `obsidian` | #0f1117 | #c9d1d9 | #58a6ff | Deep dark, high contrast, modern |
| `air` | #f8fafc | #334155 | #2563eb | Light, clean, minimal |
| `dusk` | #1e2433 | #a9b1d6 | #7aa2f7 | Deep navy, professional, focused |
| `parchment` | #f6f1e7 | #3d2e1e | #8b5e3c | Warm cream, serif, classic editorial |
| `ember` | #1a1520 | #ddd0e6 | #e07b99 | Dark plum, rose-coral accents, dramatic |

### CSS Variables (for custom styling within slides)

```css
--ds-bg              /* Background color */
--ds-fg              /* Text color */
--ds-heading         /* Heading color */
--ds-link            /* Link color */
--ds-link-hover      /* Link hover color */
--ds-accent          /* Accent color (progress bar, highlights) */
--ds-muted           /* De-emphasized text color */
--ds-border          /* Subtle border/separator color */
--ds-code-bg         /* Inline code background */
--ds-pre-bg          /* Code block background */
--ds-selection-bg    /* Text selection background */
--ds-selection-fg    /* Text selection text color */
```

## Transitions

| Type | Visual Effect |
|------|---------------|
| `none` | Instant switch, no animation |
| `fade` | Opacity crossfade |
| `slide` | Directional slide (left/right/up/down) |
| `convex` | 3D rotation forward (like turning a page) |
| `concave` | 3D rotation backward (like flipping a page back) |
| `zoom` | Scale transition (zoom in for next, zoom out for previous) |

Set globally on `<Deck>` or per-slide on `<Slide>`.

## Selection Guides

### Theme by Audience

| Audience / Context | Recommended Theme |
|--------------------|-------------------|
| Tech conference | `obsidian` or `dusk` |
| Business / corporate | `parchment` or `air` |
| Academic / research | `air` or `parchment` |
| Creative / bold | `ember` |
| General purpose | `obsidian` |

### Transition by Content Type

| Content Type | Recommended Transition |
|--------------|------------------------|
| Technical / code-heavy | `none` or `fade` |
| Storytelling / narrative | `slide` |
| Dramatic reveals | `zoom` |
| Professional / polished | `convex` or `concave` |
| Fast-paced | `fade` with `transitionSpeed="fast"` |

### Fragment Style by Use Case

| Use Case | Recommended Style |
|----------|-------------------|
| Sequential bullet points | `fade-up` |
| Key reveals | `grow` |
| Before/after comparison | `fade-in-then-out` |
| Progressive highlighting | `highlight-current-blue` |
| Emphasis | `highlight-red` |
| Strikethrough / corrections | `strike` |

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

## Scroll View Mode

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

Append `?print-pdf` to the dev server URL to activate print layout:

```
http://localhost:5173/?print-pdf
```

Then use the browser's print dialog (Cmd+P / Ctrl+P) and print to PDF. Each slide renders as a full page.

## Keyboard Shortcuts

| Key | Action |
|-----|--------|
| `→` / `Space` | Next slide or fragment |
| `←` / `Shift+Space` | Previous slide or fragment |
| `↑` | Previous vertical slide |
| `↓` | Next vertical slide |
| `Esc` | Toggle overview mode |
| `F` | Toggle fullscreen |
| `S` | Open speaker notes window |
| `B` / `.` | Pause (blackout screen) |
| `Home` | First slide |
| `End` | Last slide |

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
<Slide h={3} v={0}>
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
<Slide h={4} v={0}>
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
<Slide h={5} v={0} backgroundImage="/images/photo.jpg" backgroundSize="cover">
  <h1 style="text-shadow: 0 2px 10px rgba(0,0,0,0.5);">Over an Image</h1>
</Slide>
```

### Gradient Background

```svelte
<Slide h={6} v={0} background="linear-gradient(135deg, #667eea 0%, #764ba2 100%)">
  <h2>Gradient Slide</h2>
</Slide>
```

### Vertical Sub-Slides

```svelte
<Slide h={3} v={0}>
  <h2>Main Topic</h2>
  <p>Press ↓ for details</p>
</Slide>
<Slide h={3} v={1}>
  <h3>Detail 1</h3>
</Slide>
<Slide h={3} v={2}>
  <h3>Detail 2</h3>
</Slide>
```

### Markdown Slide

```svelte
<Slide h={7} v={0}>
  <Markdown content={`
## Features

- **Bold** and *italic* text
- \`inline code\`
- [Links](https://example.com)

> Blockquotes work too!
  `} />
</Slide>
```

## File Structure

```
src/
├── main.ts                         Entry point
├── App.svelte                      Your presentation
├── app.css                         Global base styles
└── lib/
    ├── index.js                    Public API exports
    ├── types.ts                    TypeScript types
    ├── state/
    │   └── deck-state.svelte.ts    Core reactive state
    ├── components/
    │   ├── Deck.svelte             Root container
    │   ├── Slide.svelte            Individual slide
    │   ├── Fragment.svelte         Step reveal
    │   ├── Notes.svelte            Speaker notes
    │   ├── Markdown.svelte         Markdown renderer
    │   ├── Code.svelte             Code highlighting
    │   ├── Controls.svelte         Nav arrows
    │   ├── Progress.svelte         Progress bar
    │   ├── SlideNumber.svelte      Slide counter
    │   ├── Overview.svelte         Overview grid
    │   └── ScrollProgress.svelte   Scroll progress bar
    ├── themes/                     CSS theme files
    ├── transitions/                Transition definitions
    └── utils/                      Keyboard, touch, hash, etc.
```

## Build & Run

```bash
npm install
npm start         # Development server
npm run build     # Production build
npm run preview   # Preview production build
```

Edit `src/App.svelte` to build your presentation.
