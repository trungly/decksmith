# Decksmith Documentation

Decksmith is a standalone local presentation tool built with Svelte 5. Create interactive, themeable slide decks by editing `src/App.svelte` in this repo.

It was originally inspired by [Reveal.js](https://revealjs.com/).

## Getting Started

1. Clone the repo and install dependencies:

```bash
git clone https://github.com/trungly/decksmith.git my-presentation
cd my-presentation
npm install
```

2. Start the development server:

```bash
npm start
```

3. Edit `src/App.svelte`. The dev server hot-reloads on every save.

4. Build for production when you're ready to share:

```bash
npm run build
```

The output goes to `dist/` as a static site you can deploy anywhere.

## Minimal Presentation

```svelte
<script lang="ts">
  import { Deck, Slide } from "decksmith";
</script>

<Deck theme="obsidian" transition="slide">
  <Slide h={0} v={0}>
    <h1>Hello World</h1>
  </Slide>

  <Slide h={1} v={0}>
    <h2>Second Slide</h2>
    <p>Press → to navigate</p>
  </Slide>
</Deck>
```

## Documentation Index

- **[Installation](./installation.md)** — Prerequisites, setup, and build commands
- **[Creating Presentations](./creating-presentations.md)** — How to structure a presentation
- **[Slides](./slides.md)** — Slide component, backgrounds, layouts
- **[Fragments](./fragments.md)** — Step-by-step reveal animations
- **[Transitions](./transitions.md)** — Slide transition effects
- **[Themes](./themes.md)** — Built-in themes and customization
- **[Code Highlighting](./code-highlighting.md)** — Syntax highlighting with line step-through
- **[Markdown](./markdown.md)** — Writing content in Markdown
- **[Navigation](./navigation.md)** — Keyboard, touch, and URL routing
- **[Speaker Notes](./speaker-notes.md)** — Speaker view with timer
- **[Auto-Animate](./auto-animate.md)** — Smooth element morphing between slides
- **[Scroll View](./scroll-view.md)** — Scrollable page mode
- **[Overview Mode](./overview-mode.md)** — Bird's-eye slide grid
- **[PDF Export](./pdf-export.md)** — Print-friendly layout
- **[Configuration](./configuration.md)** — All Deck options
- **[API Reference](./api-reference.md)** — Complete component API
- **[LLM Guide](./llm-guide.md)** — For AI-assisted presentation generation
