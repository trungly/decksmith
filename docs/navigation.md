# Navigation

## Keyboard Shortcuts

| Key | Action |
|-----|--------|
| `→` / `Space` | Next fragment or slide |
| `←` / `Shift+Space` | Previous fragment or slide |
| `↓` | Next vertical slide |
| `↑` | Previous vertical slide |
| `Esc` | Toggle overview mode |
| `Home` | Jump to first slide |
| `End` | Jump to last slide |
| `F` | Toggle fullscreen |
| `S` | Open speaker notes window |
| `B` / `.` | Pause (blackout screen) |

Keyboard shortcuts are disabled when typing in form inputs.

## Touch / Swipe

On touch devices:
- **Swipe left** → next slide
- **Swipe right** → previous slide
- **Swipe up** → next vertical slide
- **Swipe down** → previous vertical slide

Disable with `<Deck touch={false}>`.

## URL Hash Routing

The URL hash reflects the current slide position:

```
http://localhost:5173/#/0      → Slide h=0, v=0
http://localhost:5173/#/2      → Slide h=2, v=0
http://localhost:5173/#/2/1    → Slide h=2, v=1
```

Share a URL to link directly to a specific slide. Disable with `<Deck hash={false}>`.

## Navigation Order

When pressing Space or →:

1. If the current slide has unrevealed fragments → reveal next fragment
2. If all fragments are shown → go to next slide
3. At the last slide with `loop={true}` → wrap to the first slide

When pressing ← or Shift+Space:

1. If fragments have been revealed → hide the last shown fragment
2. If no fragments are shown → go to previous slide

## Overview Mode

Press `Esc` to toggle a bird's-eye grid of all slides. Click a slide to navigate to it. Disable with `<Deck overview={false}>`.

## Disabling Navigation

```svelte
<Deck keyboard={false} touch={false} controls={false}>
```
