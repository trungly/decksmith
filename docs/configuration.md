# Configuration

All configuration is set as props on the `<Deck>` component.

## All Options

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `theme` | `ThemeName` | `"black"` | Visual theme: `"black"`, `"white"`, `"moon"`, `"serif"`, `"blood"` |
| `transition` | `TransitionType` | `"slide"` | Default transition: `"none"`, `"fade"`, `"slide"`, `"convex"`, `"concave"`, `"zoom"` |
| `transitionSpeed` | `string` | `"default"` | Speed: `"fast"` (400ms), `"default"` (800ms), `"slow"` (1200ms) |
| `width` | `number` | `960` | Base slide width in pixels |
| `height` | `number` | `700` | Base slide height in pixels |
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
  theme="moon"
  transition="fade"
  transitionSpeed="fast"
  width={1280}
  height={720}
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

Slides automatically scale to fit the browser viewport while maintaining the configured aspect ratio. The base dimensions (`width` and `height`) define the coordinate space for slide content. Common presets:

| Aspect Ratio | Width | Height |
|--------------|-------|--------|
| 4:3 | 960 | 700 |
| 16:9 | 1280 | 720 |
| 16:10 | 1280 | 800 |
