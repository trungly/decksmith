# Contributing to Decksmith

Glad you want to help out! Here's the short version of how things work.

## Getting Started

### Prerequisites

- [Bun](https://bun.sh/) 1.0 or later

### Local Development Setup

```bash
git clone git@github.com:trungly/decksmith.git my-presentation
cd my-presentation
bun install
bun start          # Start dev server at http://localhost:5173
```

Other useful commands:

```bash
bun run build      # Production build
bun run lint       # Run ESLint
bun run format     # Format code with Prettier
bun run format:check  # Check formatting without writing
```

## How to Contribute

### Found a Bug?

Open a **Bug Report** issue. Include what you expected, what actually happened,
and a minimal way to reproduce it — that's all I need to dig in.

### Have an Idea?

Open a **Feature Request** issue and describe what you're trying to do. No need
to write a formal proposal — a quick description is fine.

### Sending a PR?

1. Fork the repo and create a branch from `main`.
2. Keep the change focused — one thing per PR is easier to review.
3. Make sure it lints (`bun run lint`) and is formatted (`bun run format:check`).
4. Fill in the PR description briefly so I know what it does.

### Commit Messages

I loosely follow conventional commits, but don't stress about it:

```
feat: add new theme variant
fix: correct fragment ordering on vertical slides
docs: update installation guide
chore: bump highlight.js dependency
```

## Code Style

- **TypeScript** — avoid `any`.
- **Svelte 5** with runes (`$state`, `$derived`, `$effect`).
- **Prettier** for formatting; **ESLint** for linting.

## License

Contributions are covered by the [MIT License](./LICENSE).
