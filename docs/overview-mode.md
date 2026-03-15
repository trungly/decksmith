# Overview Mode

Overview mode shows a bird's-eye grid of all slides for quick navigation.

## Usage

Press `Esc` to toggle overview mode. Click any slide thumbnail to jump to it.

## Disabling

```svelte
<Deck overview={false}>
```

## Behavior

- Slides are displayed as scaled-down thumbnails in a grid
- The current slide is highlighted with the theme's accent color
- Clicking a thumbnail navigates to that slide and closes overview
- Clicking the background closes overview without navigating
- Keyboard navigation works in overview mode (arrow keys move between slides)
- Vertical sub-slides appear stacked in columns
