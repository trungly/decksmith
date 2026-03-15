# Scroll View

Scroll view renders the presentation as a scrollable page instead of the default slide-by-slide navigation.

## Enabling Scroll View

```svelte
<Deck scrollView>
  <Slide h={0} v={0}>...</Slide>
  <Slide h={1} v={0}>...</Slide>
</Deck>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `scrollView` | `boolean` | `false` | Enable scroll view mode |
| `scrollLayout` | `"full" \| "compact"` | `"full"` | Slide sizing mode |
| `scrollSnap` | `boolean` | `true` | Snap to slide boundaries |

## Layout Modes

### Full (default)

Each slide fills the entire viewport height:

```svelte
<Deck scrollView scrollLayout="full">
```

### Compact

Slides use their natural content height with padding:

```svelte
<Deck scrollView scrollLayout="compact">
```

## Scroll Snap

When enabled, scrolling snaps to slide boundaries for clean alignment:

```svelte
<Deck scrollView scrollSnap>
```

Disable for free-scrolling:

```svelte
<Deck scrollView scrollSnap={false}>
```

## Behavior

In scroll view mode:

- All slides are visible simultaneously (stacked vertically)
- Transitions are disabled (no slide animations)
- Fragments reveal based on scroll position
- Keyboard navigation still works (arrow keys scroll to slides)
- A vertical progress bar shows scroll position
- Overview mode and pause (blackout) still work
- Hash routing is disabled (scroll position determines the current slide)

## Use Cases

- Sharing presentations as readable web pages
- Accessibility (no hidden content)
- Mobile-friendly viewing
- Print-friendly layout
