# Decksmith Repo Consolidation Plan

This runbook consolidates the local playground into the public decksmith repository while keeping core library quality and release flow intact.

## Goal

- Keep one repository: `trungly/decksmith`
- Keep one publishable core package in `src/lib`
- Keep one integrated playground app in `src/App.svelte` + `src/decks`
- Keep shared end-to-end smoke tests in `tests`

## Current State Snapshot

- Remote is already `origin https://github.com/trungly/decksmith.git`
- Working tree currently contains playground integration edits and new files
- This means migration is mostly a cleanup + formalization step, not a cross-repo code copy

## Target Structure

Keep this high-level layout:

```text
src/
  lib/          # core library (published)
  decks/        # integrated sample decks (playground assets)
  App.svelte    # playground deck selector app
tests/          # smoke/e2e tests (deck switching, navigation)
docs/           # library docs + this consolidation plan
```

## Execution Steps

1. Create a consolidation branch.

   ```bash
   git checkout -b integrate-playground
   ```

2. Review changed files and remove non-essential local artifacts.

   Keep:
   - `src/decks/**`
   - `src/App.svelte`
   - `tests/**`
   - `playwright.config.ts`
   - any core bug fixes needed by playground behavior

   Consider removing before merge if not intentional for OSS:
   - `.gemini/**`
   - `playwright-testing.skill`
   - duplicate skill packs that are local tooling only

3. Validate quality gates locally.

   ```bash
   npm run lint
   npm run build
   ```

   Optional e2e smoke:

   ```bash
   npx playwright test
   ```

4. Open one migration PR with commit groups in this order:
   - `feat(playground): add integrated deck gallery and sample decks`
   - `fix(core): align overview and slide indexing for deck thumbnails`
   - `test(playground): add navigation/deck-switch smoke coverage`
   - `docs: document integrated playground usage`

5. Merge to `main` after review and publish a patch release if core behavior changed.

## PR Checklist

- [ ] Playground deck selector works for all options, including DevOps Strategy
- [ ] Overview thumbnails show correct first slide (no blank placeholder)
- [ ] `npm run lint` passes
- [ ] `npm run build` passes
- [ ] Optional Playwright smoke test passes
- [ ] Local-only tooling artifacts are either removed or documented intentionally
- [ ] README mentions integrated playground usage

## Optional History-Preserving Import (if a separate local playground git repo still exists)

If you still maintain a separate local playground repository and want to preserve its commit history, run this in a fresh clone of `trungly/decksmith`:

```bash
git checkout -b integrate-playground-history
git remote add playground-local /absolute/path/to/local/playground/.git
git fetch playground-local
git subtree add --prefix archived/playground-source playground-local <branch-name>
```

Then selectively copy desired files from `archived/playground-source` into `src/decks`, `src/App.svelte`, and `tests`, and remove `archived/playground-source` before final merge if you only wanted temporary import context.
