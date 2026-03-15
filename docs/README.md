# Decksmith Documentation

Decksmith is a presentation framework built with Svelte 5. Create interactive, themeable slide decks using components.

## Getting Started

1. Clone the repository and install dependencies:

```bash
git clone <repo-url> my-presentation
cd my-presentation
npm install
```

2. Start the development server:

```bash
npm run dev
```

3. Edit `src/App.svelte` to create your presentation. The dev server hot-reloads on every save.

4. Build for production:

```bash
npm run build
```

The output goes to `dist/` — a static HTML bundle you can deploy anywhere.

## Minimal Presentation

```svelte
<script lang="ts">
  import Deck from "./lib/components/Deck.svelte";
  import Slide from "./lib/components/Slide.svelte";
</script>

<Deck theme="black" transition="slide">
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
