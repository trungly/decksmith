# Installation

## Prerequisites

- [Node.js](https://nodejs.org/) 18 or later
- npm (included with Node.js)

## Setup

```bash
git clone <repo-url> my-presentation
cd my-presentation
npm install
```

## Development

```bash
npm run dev
```

Opens a local dev server (default `http://localhost:5173`). Changes to `src/App.svelte` hot-reload instantly.

## Production Build

```bash
npm run build
```

Outputs a static site to `dist/`. Deploy to any static hosting (Netlify, Vercel, GitHub Pages, S3, etc.).

Preview the production build locally:

```bash
npm run preview
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
│   ├── App.svelte       Your presentation (edit this)
│   ├── app.css          Global styles
│   └── lib/             Decksmith framework (don't edit)
├── index.html           HTML shell
├── package.json
├── vite.config.ts
└── tsconfig.json
```

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |
| `npm run lint` | Run ESLint |
| `npm run format` | Format with Prettier |
