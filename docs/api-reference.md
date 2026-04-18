# API Reference

Complete reference for all Decksmith components, types, and the state API.

When authoring a deck in this repo, import the API from `decksmith` inside `src/App.svelte`.

## Components

### `<Deck>`

Root container for a presentation. One per presentation.

```svelte
<Deck theme="obsidian" transition="slide" contentSize="M" aspectRatio="16:9">
  <Slide h={1} v={0}>...</Slide>
</Deck>
```

| Prop | Type | Default |
|------|------|---------|
| `theme` | `"obsidian" \| "air" \| "executive" \| "startup" \| "editorial" \| "technical" \| "playful" \| "cinematic"` | `"obsidian"` |
| `transition` | `"none" \| "fade" \| "slide" \| "convex" \| "concave" \| "zoom"` | `"slide"` |
| `transitionSpeed` | `"default" \| "fast" \| "slow"` | `"default"` |
| `contentSize` | `"S" \| "M" \| "L" \| "XL"` | `"M"` |
| `aspectRatio` | `"16:9" \| "4:3" \| "1:1" \| "9:16" \| "21:9"` | `"16:9"` |
| `controls` | `boolean` | `true` |
| `progress` | `boolean` | `true` |
| `slideNumber` | `boolean` | `true` |
| `hash` | `boolean` | `true` |
| `overview` | `boolean` | `true` |
| `touch` | `boolean` | `true` |
| `keyboard` | `boolean` | `true` |
| `loop` | `boolean` | `false` |
| `scrollView` | `boolean` | `false` |
| `scrollLayout` | `"full" \| "compact"` | `"full"` |
| `scrollSnap` | `boolean` | `true` |

In normal slide mode, `aspectRatio` controls the virtual slide shape. When `scrollView={true}`, `aspectRatio` is ignored (Decksmith logs a warning if you pass a value other than `"16:9"`).

---

### `<Slide>`

Individual slide.

```svelte
<Slide h={1} v={0} background="#1a1a2e" transition="fade" autoAnimate>
  <h1>Content</h1>
</Slide>
```

| Prop | Type | Default |
|------|------|---------|
| `h` | `number` | `1` |
| `v` | `number` | `0` |
| `transition` | `TransitionType` | _(from Deck)_ |
| `background` | `string` | `""` |
| `backgroundImage` | `string` | `""` |
| `backgroundSize` | `string` | `"cover"` |
| `backgroundPosition` | `string` | `"center"` |
| `id` | `string` | — |
| `autoAnimate` | `boolean` | `false` |

---

### `<Fragment>`

Step-by-step content reveal.

```svelte
<Fragment index={0} style="fade-up">
  <p>Revealed content</p>
</Fragment>
```

| Prop | Type | Default |
|------|------|---------|
| `index` | `number` | `0` |
| `style` | `FragmentStyle` | `"fade-in"` |

---

### `<Notes>`

Speaker notes (invisible in presentation, visible in speaker view).

```svelte
<Notes text="Talk about this topic for ~2 minutes." />
```

| Prop | Type | Default |
|------|------|---------|
| `text` | `string` | `""` |

---

### `<Markdown>`

Markdown content renderer.

```svelte
<Markdown content={`## Heading\n\n- Item 1\n- Item 2`} />
```

| Prop | Type | Default |
|------|------|---------|
| `content` | `string` | `""` |

---

### `<Code>`

Syntax-highlighted code block with optional line step-through.

```svelte
<Code language="typescript" lineNumbers highlightLines="1-3|5-7" code={`...`} />
```

| Prop | Type | Default |
|------|------|---------|
| `code` | `string` | `""` |
| `language` | `string` | _(auto-detect)_ |
| `lineNumbers` | `boolean` | `false` |
| `highlightLines` | `string` | `""` |
| `lineNumberStart` | `number` | `1` |

---

## Types

### `TransitionType`

```typescript
type TransitionType = "none" | "fade" | "slide" | "convex" | "concave" | "zoom"
```

### `FragmentStyle`

```typescript
type FragmentStyle =
  | "fade-in" | "fade-out"
  | "fade-up" | "fade-down" | "fade-left" | "fade-right"
  | "fade-in-then-out" | "fade-in-then-semi-out"
  | "grow" | "shrink" | "strike"
  | "highlight-red" | "highlight-green" | "highlight-blue"
  | "highlight-current-red" | "highlight-current-green" | "highlight-current-blue"
```

### `ThemeName`

```typescript
type ThemeName = "obsidian" | "air" | "executive" | "startup" | "editorial" | "technical" | "playful" | "cinematic"
```

### `ScrollLayout`

```typescript
type ScrollLayout = "full" | "compact"
```

### `ContentSize`

```typescript
type ContentSize = "S" | "M" | "L" | "XL"
```

### `AspectRatio`

```typescript
type AspectRatio = "16:9" | "4:3" | "1:1" | "9:16" | "21:9"
```

### `DeckConfig`

Runtime state on `DeckState.config`. `width` and `height` are derived from `aspectRatio` (1080px-tall internal canvas); they are not `<Deck>` props.

```typescript
interface DeckConfig {
  width: number;
  height: number;
  transition: TransitionType;
  transitionSpeed: "default" | "fast" | "slow";
  controls: boolean;
  progress: boolean;
  slideNumber: boolean;
  hash: boolean;
  overview: boolean;
  touch: boolean;
  keyboard: boolean;
  loop: boolean;
  theme: ThemeName;
  scrollView: boolean;
  scrollLayout: ScrollLayout;
  scrollSnap: boolean;
}
```

### `SlideInfo`

```typescript
interface SlideInfo {
  h: number;
  v: number;
  id?: string;
  notes?: string;
  fragmentCount: number;
  autoAnimate?: boolean;
  autoAnimateId?: string;
}
```

### `SlidePosition`

```typescript
interface SlidePosition {
  h: number;
  v: number;
  f: number;
}
```

---

## DeckState API

The `DeckState` class manages all presentation state. Access it via Svelte context:

```typescript
import { getContext } from "svelte";
import type { DeckState } from "decksmith";

const deck = getContext<DeckState>("deck");
```

### Properties

| Property | Type | Description |
|----------|------|-------------|
| `currentH` | `number` | Current horizontal slide index |
| `currentV` | `number` | Current vertical slide index |
| `currentFragment` | `number` | Current fragment index (-1 = none shown) |
| `isOverview` | `boolean` | Overview mode active |
| `isPaused` | `boolean` | Presentation paused (blackout) |
| `config` | `DeckConfig` | Current configuration |
| `slides` | `SlideInfo[][]` | 2D array of registered slides |
| `currentNotes` | `string` | Notes for current slide (derived) |
| `totalHorizontal` | `number` | Horizontal slide count (derived) |
| `totalSlides` | `number` | Total slide count (derived) |
| `progress` | `number` | Progress 0–1 (derived) |
| `canGoLeft` | `boolean` | Can navigate left (derived) |
| `canGoRight` | `boolean` | Can navigate right (derived) |
| `canGoUp` | `boolean` | Can navigate up (derived) |
| `canGoDown` | `boolean` | Can navigate down (derived) |
| `currentFragmentCount` | `number` | Fragments on current slide (derived) |

### Methods

| Method | Description |
|--------|-------------|
| `next()` | Next fragment or slide |
| `prev()` | Previous fragment or slide |
| `left()` | Previous horizontal slide |
| `right()` | Next horizontal slide |
| `up()` | Previous vertical slide |
| `down()` | Next vertical slide |
| `goTo(h, v?, f?)` | Jump to position |
| `goToFirst()` | Jump to first slide |
| `goToLast()` | Jump to last slide |
| `toggleOverview()` | Toggle overview mode |
| `togglePause()` | Toggle pause/blackout |
| `getPosition()` | Get current `{h, v, f}` |
| `getSlideAt(h, v)` | Get `SlideInfo` at position |
| `registerSlide(info)` | Register a slide |
| `updateFragmentCount(h, v, count)` | Update fragment count |
| `updateNotes(h, v, notes)` | Update speaker notes |

---

## Local Imports

```typescript
import {
  Deck,
  Slide,
  Fragment,
  Notes,
  Markdown,
  Code,
  DeckState,
  THEMES,
} from "decksmith";

import type {
  TransitionType,
  FragmentStyle,
  ThemeName,
  ScrollLayout,
  DeckConfig,
  SlideInfo,
  SlidePosition,
  NavigationDirection,
} from "decksmith";
```
