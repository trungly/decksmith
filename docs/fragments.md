# Fragments

Fragments reveal content step-by-step within a single slide. Press Space or → to advance.

## Basic Usage

```svelte
<Slide h={0} v={0}>
  <h2>Key Points</h2>
  <Fragment index={0} style="fade-up"><p>First point</p></Fragment>
  <Fragment index={1} style="fade-up"><p>Second point</p></Fragment>
  <Fragment index={2} style="fade-up"><p>Third point</p></Fragment>
</Slide>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `index` | `number` | `0` | Order of appearance (0 = first to appear) |
| `style` | `FragmentStyle` | `"fade-in"` | Animation style |

## Fragment Styles

### Appear/Disappear

| Style | Effect |
|-------|--------|
| `fade-in` | Fade from invisible to visible |
| `fade-out` | Visible initially, fades out when activated |
| `fade-in-then-out` | Fades in, then fades out on the next step |
| `fade-in-then-semi-out` | Fades in, then dims to 30% opacity on next step |

### Directional

| Style | Effect |
|-------|--------|
| `fade-up` | Fades in while sliding upward |
| `fade-down` | Fades in while sliding downward |
| `fade-left` | Fades in while sliding left |
| `fade-right` | Fades in while sliding right |

### Transform

| Style | Effect |
|-------|--------|
| `grow` | Scales up from 50% to full size |
| `shrink` | Scales down from 100% to 70% |
| `strike` | Adds strikethrough to text |

### Highlight

| Style | Effect |
|-------|--------|
| `highlight-red` | Changes text color to red (#ff2c2d) |
| `highlight-green` | Changes text color to green (#17ff2e) |
| `highlight-blue` | Changes text color to blue (#1b91ff) |
| `highlight-current-red` | Red only while this is the current step |
| `highlight-current-green` | Green only while this is the current step |
| `highlight-current-blue` | Blue only while this is the current step |

The `highlight-current-*` variants revert to the original color once the next fragment advances.

## Ordering

The `index` prop determines order. Fragments with the same index appear simultaneously:

```svelte
<Fragment index={0} style="fade-in"><p>These appear</p></Fragment>
<Fragment index={0} style="fade-in"><p>at the same time</p></Fragment>
<Fragment index={1} style="fade-up"><p>This appears next</p></Fragment>
```

## Nesting

Fragments can be nested for multi-step reveals:

```svelte
<Fragment index={0} style="fade-in">
  <div>
    <p>This paragraph appears first</p>
    <Fragment index={1} style="highlight-blue">
      <p>Then this text turns blue</p>
    </Fragment>
  </div>
</Fragment>
```

## With Code Blocks

The `<Code>` component's `highlightLines` prop creates fragment steps automatically. See [Code Highlighting](./code-highlighting.md).
