# Slides

The `<Slide>` component represents a single slide in your presentation.

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `h` | `number` | `0` | Horizontal position in the slide grid |
| `v` | `number` | `0` | Vertical position (0 = main sequence) |
| `transition` | `TransitionType` | _(from Deck)_ | Override the default transition |
| `background` | `string` | `""` | CSS background value (color, gradient) |
| `backgroundImage` | `string` | `""` | URL for background image |
| `backgroundSize` | `string` | `"cover"` | CSS background-size |
| `backgroundPosition` | `string` | `"center"` | CSS background-position |
| `id` | `string` | — | Optional identifier for the slide |
| `autoAnimate` | `boolean` | `false` | Enable auto-animate with adjacent slide |

## Positioning

Slides are positioned using `h` and `v` coordinates:

```svelte
<!-- Main horizontal sequence -->
<Slide h={0} v={0}>...</Slide>   <!-- First slide -->
<Slide h={1} v={0}>...</Slide>   <!-- Second slide -->
<Slide h={2} v={0}>...</Slide>   <!-- Third slide -->

<!-- Vertical sub-slides under h=2 -->
<Slide h={2} v={1}>...</Slide>
<Slide h={2} v={2}>...</Slide>
```

## Backgrounds

### Solid Color

```svelte
<Slide h={0} v={0} background="#1a1a2e">
  <h1>Dark Blue</h1>
</Slide>
```

### Gradient

```svelte
<Slide h={0} v={0} background="linear-gradient(135deg, #667eea 0%, #764ba2 100%)">
  <h1>Gradient</h1>
</Slide>
```

### Image

```svelte
<Slide h={0} v={0} backgroundImage="/images/hero.jpg">
  <h1 style="text-shadow: 0 2px 10px rgba(0,0,0,0.7);">Title</h1>
</Slide>
```

Control image sizing:

```svelte
<Slide
  h={0} v={0}
  backgroundImage="/images/pattern.png"
  backgroundSize="contain"
  backgroundPosition="top left"
>
```

## Per-Slide Transitions

Override the Deck's default transition for a specific slide:

```svelte
<Deck transition="slide">
  <Slide h={0} v={0}>...</Slide>                          <!-- Uses "slide" -->
  <Slide h={1} v={0} transition="fade">...</Slide>        <!-- Uses "fade" -->
  <Slide h={2} v={0} transition="zoom">...</Slide>        <!-- Uses "zoom" -->
</Deck>
```

## Layout Tips

Slides are centered flexbox containers by default. Use inline styles or custom CSS for layout:

### Two Columns

```svelte
<Slide h={0} v={0}>
  <h2>Comparison</h2>
  <div style="display: flex; gap: 2em; text-align: left;">
    <div style="flex: 1;"><h3>Left</h3><p>Content</p></div>
    <div style="flex: 1;"><h3>Right</h3><p>Content</p></div>
  </div>
</Slide>
```

### Grid Layout

```svelte
<Slide h={0} v={0}>
  <h2>Grid</h2>
  <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1em;">
    <div>Cell 1</div>
    <div>Cell 2</div>
    <div>Cell 3</div>
    <div>Cell 4</div>
  </div>
</Slide>
```
