# Transitions

Transitions control how slides animate when navigating between them.

## Setting Transitions

### Global (all slides)

```svelte
<Deck transition="fade">
  ...
</Deck>
```

### Per-slide override

```svelte
<Slide h={1} v={0} transition="zoom">
  ...
</Slide>
```

## Available Transitions

| Type | Description |
|------|-------------|
| `none` | Instant switch with no animation |
| `fade` | Smooth opacity crossfade |
| `slide` | Slides directionally — left/right for horizontal, up/down for vertical |
| `convex` | 3D rotation forward, like turning a page |
| `concave` | 3D rotation backward, like flipping a page back |
| `zoom` | Next slide zooms in, previous slide zooms out |

## Transition Speed

Control animation duration:

```svelte
<Deck transition="slide" transitionSpeed="fast">
```

| Speed | Duration |
|-------|----------|
| `fast` | 400ms |
| `default` | 800ms |
| `slow` | 1200ms |

## How Direction Works

Transitions are direction-aware:

- **Horizontal navigation** (← →): Slides translate or rotate left/right
- **Vertical navigation** (↑ ↓): Slides translate or rotate up/down

For example, `slide` transition:
- Going right: current slide exits left, next slide enters from right
- Going down: current slide exits up, next slide enters from below
