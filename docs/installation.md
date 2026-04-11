# Installation

Decksmith is typically used as a standalone local tool. The normal workflow is to clone this repo, edit `src/App.svelte`, and run the presentation locally.

## Prerequisites

- [Bun](https://bun.sh/) 1.0 or later

## Clone Decksmith

```bash
git clone https://github.com/trungly/decksmith.git my-presentation
cd my-presentation
bun install
```

## Development

```bash
bun start
```

Opens a local dev server (default `http://localhost:5173`). Edit `src/App.svelte` and changes hot-reload instantly.

Import Decksmith components directly from `decksmith`:

```svelte
<script lang="ts">
  import { Deck, Slide, Fragment, Notes, Markdown, Code } from "decksmith";
</script>
```

## Production Build

```bash
bun run build
```

Outputs a static site to `dist/`. Deploy to any static hosting (Netlify, Vercel, GitHub Pages, S3, etc.).

Preview the production build locally:

```bash
bun run preview
```

## PDF Export

Add `?print-pdf` to the URL, then use the browser's print dialog (Ctrl+P / Cmd+P):

```
http://localhost:5173/?print-pdf
```

## Project Structure

```
my-presentation/
├── src/
│   ├── main.ts          Entry point
│   ├── App.svelte       Your presentation
│   ├── lib/             Decksmith components and utilities
│   └── ...
├── index.html           HTML shell
├── package.json
├── vite.config.ts
└── tsconfig.json
```

## Scripts

| Command | Description |
|---------|-------------|
| `bun start` | Start development server |
| `bun run build` | Build for production |
| `bun run preview` | Preview production build |
| `bun run lint` | Run ESLint |
| `bun run format` | Format with Prettier |
