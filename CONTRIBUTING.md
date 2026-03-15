# Contributing to Decksmith

Thank you for your interest in contributing! This document explains how to get involved.

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) v18 or later
- npm v9 or later

### Local Development Setup

```bash
git clone https://github.com/trungly/decksmith.git
cd decksmith
npm install
npm start          # Start dev server at http://localhost:5173
```

Other useful commands:

```bash
npm run build      # Production build
npm run lint       # Run ESLint
npm run format     # Format code with Prettier
npm run format:check  # Check formatting without writing
```

## How to Contribute

### Reporting Bugs

Before opening a bug report, please search existing issues to avoid duplicates.
When filing an issue, use the **Bug Report** template and include:

- A clear, minimal reproduction (steps or a code snippet)
- What you expected vs. what actually happened
- Environment details (browser, Node.js version, OS)

### Suggesting Features

Open a **Feature Request** issue describing:

- The problem you are trying to solve
- Your proposed solution
- Any alternatives you considered

Please open an issue **before** starting significant feature work so we can discuss
the approach and avoid wasted effort.

### Submitting Pull Requests

1. Fork the repository and create a branch from `main`.
2. Keep changes focused — one logical change per PR.
3. Ensure the code lints cleanly (`npm run lint`) and is formatted (`npm run format:check`).
4. Update or add documentation in `docs/` if your change affects public API or behavior.
5. Fill out the pull request template when opening your PR.

### Commit Messages

Use the conventional commits style where possible:

```
feat: add new theme variant
fix: correct fragment ordering on vertical slides
docs: update installation guide
chore: bump highlight.js dependency
```

## Code Style

- **TypeScript** for all logic; avoid `any`.
- **Svelte 5** with runes-based reactivity (`$state`, `$derived`, `$effect`).
- **Prettier** for formatting (config in `.prettierrc`).
- **ESLint** for linting (config in `eslint.config.js`).

Run both before pushing:

```bash
npm run lint
npm run format:check
```

## License

By contributing, you agree that your contributions will be licensed under the
[MIT License](./LICENSE) that covers this project.
