# Auto-Animate

Auto-animate smoothly transitions matching elements between consecutive slides using FLIP animations.

## Basic Usage

Add `autoAnimate` to two consecutive slides and use `data-id` to match elements:

```svelte
<Slide h={0} v={0} autoAnimate>
  <div data-id="box" style="width: 100px; height: 100px; background: #42affa;"></div>
  <h2 data-id="title">Hello</h2>
</Slide>

<Slide h={1} v={0} autoAnimate>
  <div data-id="box" style="width: 200px; height: 200px; background: #42affa; border-radius: 50%;"></div>
  <h2 data-id="title" style="font-size: 3em;">Hello!</h2>
</Slide>
```

When navigating from slide 0 to slide 1:
- The box smoothly grows and becomes circular
- The heading smoothly scales up

## How It Works

1. Both slides must have `autoAnimate={true}`
2. Elements are matched by their `data-id` attribute
3. Decksmith captures position, size, and style of each matched element in the "from" slide
4. Applies a FLIP animation to smoothly interpolate to the "to" slide state

## Animated Properties

- **Position** — translate (x, y)
- **Size** — width, height (via scale)
- **Font size**
- **Color** — text color
- **Background color**
- **Border radius**
- **Opacity**

## Animation Duration

Duration follows the `transitionSpeed` setting:

| Speed | Duration |
|-------|----------|
| `fast` | 400ms |
| `default` | 800ms |
| `slow` | 1200ms |

## Tips

- Every element you want to animate must have a unique `data-id` on both slides
- Elements without a matching `data-id` on the other slide won't animate
- Auto-animate only works between adjacent slides (not across gaps)
- Works with any HTML element — divs, headings, images, etc.
- Use inline styles for properties you want to animate (CSS classes work but the computed style must differ)
