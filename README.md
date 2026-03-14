# Decksmith

A modern presentation framework built with **Svelte 5**. Create beautiful, interactive presentations using components and modern JavaScript.

Decksmith replicates the core features of Reveal.js using Svelte 5's runes-based reactivity, delivering a fast, type-safe, and developer-friendly experience.

## Features

- **Slide Navigation** — Horizontal and vertical 2D slide grid
- **Transitions** — Fade, slide, convex, concave, zoom (per-slide or global)
- **Fragments** — Step-by-step reveals with 17 animation styles
- **Keyboard & Touch** — Full keyboard navigation + mobile swipe support
- **Overview Mode** — Bird's-eye view of all slides (ESC key)
- **Speaker Notes** — Separate speaker window with timer and notes
- **Markdown** — Write slide content in Markdown
- **Auto-Animate** — Automatically animate matching elements between slides
- **Themes** — 5 built-in themes (Black, White, Moon, Serif, Blood)
- **Hash Routing** — URL reflects current slide for deep-linking
- **Auto-Scaling** — Content scales to fit any viewport
- **PDF Export** — Print-friendly layout via `?print-pdf`
- **Progress Bar & Slide Numbers** — Configurable UI controls

## Quick Start

```bash
git clone <repo-url> my-presentation
cd my-presentation
npm install
npm run dev
```

Edit `src/App.svelte` to create your presentation:

```svelte
<script lang="ts">
  import Deck from './lib/components/Deck.svelte';
  import Slide from './lib/components/Slide.svelte';
  import Fragment from './lib/components/Fragment.svelte';
</script>

<Deck theme="black" transition="slide">
  <Slide h={0} v={0}>
    <h1>Hello World</h1>
  </Slide>

  <Slide h={1} v={0}>
    <h2>Second Slide</h2>
    <Fragment index={0} style="fade-up" slideH={1} slideV={0}>
      <p>Appears on click</p>
    </Fragment>
  </Slide>
</Deck>
```

## Keyboard Shortcuts

| Key | Action |
|-----|--------|
| `→` / `Space` | Next slide/fragment |
| `←` / `Shift+Space` | Previous slide/fragment |
| `↑` / `↓` | Navigate vertical slides |
| `Esc` | Toggle overview mode |
| `F` | Toggle fullscreen |
| `S` | Open speaker notes |
| `B` / `.` | Pause (blackout) |
| `Home` / `End` | First / last slide |

## Themes

Set the theme on the `<Deck>` component:

```svelte
<Deck theme="moon">
```

Available: `black` (default), `white`, `moon`, `serif`, `blood`

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
- [Markdown](./docs/markdown.md)
- [Auto-Animate](./docs/auto-animate.md)
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

MIT
