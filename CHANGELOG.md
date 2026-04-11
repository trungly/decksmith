# Changelog

## 1.0.2

- Overhaul theme system with 8 professional theme families (Executive, Startup, Editorial, Technical, Playful, Cinematic, Air, Obsidian).
- Refactor `Slide`, `Markdown`, and `Code` components to use theme-driven CSS variables for layout, typography, and spacing.
- Introduce theme-controlled motion defaults (duration and timing) for transitions.

## 1.0.1

- Align `Slide` horizontal indexing with 1-based `h` values at the authoring API boundary while preserving 0-based internal navigation state.
- Fix slide-number output for vertical slides after the 1-based coordinate change.
- Add basic release helper scripts for patch releases.
