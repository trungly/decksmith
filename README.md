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

## Minimal Presentation

Place this in `src/App.svelte`:

```svelte
<script lang="ts">
  import { Deck, Slide, Fragment } from "decksmith";
</script>

<Deck theme="obsidian" transition="slide">
  <Slide h={0} v={0}>
    <h1>Hello World</h1>
  </Slide>

  <Slide h={1} v={0}>
    <h2>Second Slide</h2>
    <Fragment index={0} style="fade-up">
      <p>Appears on click</p>
    </Fragment>
  </Slide>
</Deck>
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

See [CLAUDE.md](./CLAUDE.md) for a structured reference designed for AI agents to read and generate presentations programmatically.

## Tech Stack

- [Svelte 5](https://svelte.dev/) — Runes-based reactivity
- [Vite](https://vitejs.dev/) — Fast build tooling
- [TypeScript](https://www.typescriptlang.org/) — Type safety
- [Marked](https://marked.js.org/) — Markdown parsing

## License

Decksmith is released under the [MIT License](./LICENSE).
