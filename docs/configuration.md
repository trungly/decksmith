# Configuration

All configuration is set as props on the `<Deck>` component.

## All Options

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `theme` | `ThemeName` | `"obsidian"` | Visual theme: `"obsidian"`, `"air"`, `"executive"`, `"startup"`, `"editorial"`, `"technical"`, `"playful"`, `"cinematic"` |
| `transition` | `TransitionType` | `"slide"` | Default transition: `"none"`, `"fade"`, `"slide"`, `"convex"`, `"concave"`, `"zoom"` |
| `transitionSpeed` | `string` | `"default"` | Speed: `"fast"` (400ms), `"default"` (800ms), `"slow"` (1200ms) |
| `contentSize` | `ContentSize` | `"comfortable"` | How large slide body content feels: `"comfortable"` (largest text and spacing), `"cozy"`, `"compact"` (tightest). Themes scale typography and slide padding via `--ds-content-size-scale`. |
| `aspectRatio` | `AspectRatio` | `"16:9"` | Slide shape: `"16:9"`, `"4:3"`, `"1:1"`, `"9:16"`, `"21:9"`. Internal canvas is 1080px tall; width is derived from the ratio. |
| `controls` | `boolean` | `true` | Show navigation arrow buttons |
| `progress` | `boolean` | `true` | Show progress bar at bottom |
| `slideNumber` | `boolean` | `true` | Show slide number |
| `hash` | `boolean` | `true` | Enable URL hash routing (`#/h/v`) |
| `overview` | `boolean` | `true` | Enable overview mode (Esc key) |
| `touch` | `boolean` | `true` | Enable touch/swipe navigation |
| `keyboard` | `boolean` | `true` | Enable keyboard shortcuts |
| `loop` | `boolean` | `false` | Wrap from last slide to first |
| `scrollView` | `boolean` | `false` | Scrollable page mode |
| `scrollLayout` | `ScrollLayout` | `"full"` | Scroll slide sizing: `"full"` or `"compact"` |
| `scrollSnap` | `boolean` | `true` | CSS scroll-snap in scroll view |

## Example

```svelte
<Deck
  theme="technical"
  transition="fade"
  transitionSpeed="fast"
  contentSize="cozy"
  aspectRatio="16:9"
  controls={false}
  progress={true}
  slideNumber={true}
  hash={true}
  loop={true}
>
  ...
</Deck>
```

## Auto-Scaling

Slides automatically scale to fit the browser viewport while preserving `aspectRatio`. The library uses a fixed internal canvas height of **1080px** and derives width from the chosen ratio (for example, `16:9` → 1920×1080). `contentSize` adjusts how large content feels by setting a CSS variable (`--ds-content-size-scale`) that themes multiply into font-size, padding, and stack gap.
