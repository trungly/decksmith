# Themes

Decksmith includes 5 built-in themes. Set the theme on the `<Deck>` component:

```svelte
<Deck theme="moon">
```

## Built-in Themes

| Theme | Background | Text | Accent | Style |
|-------|-----------|------|--------|-------|
| `black` | #111 (dark) | #eee (light) | #42affa (blue) | Modern, high contrast |
| `white` | #fff (white) | #222 (dark) | #2a76dd (blue) | Clean, minimal |
| `moon` | #002b36 (dark teal) | #93a1a1 (gray) | #268bd2 (blue) | Soft, professional |
| `serif` | #f0edde (warm cream) | #333 (dark) | #6c4b2a (brown) | Classic, editorial |
| `blood` | #1a1626 (dark purple) | #eee (light) | #a23 (red) | Bold, dramatic |

## CSS Variables

Each theme defines CSS custom properties you can use in your slides:

```css
--ds-bg              /* Background color */
--ds-fg              /* Text color */
--ds-heading         /* Heading color */
--ds-link            /* Link color */
--ds-link-hover      /* Link hover color */
--ds-accent          /* Accent color (controls, progress bar) */
--ds-code-bg         /* Inline code background */
--ds-selection-bg    /* Text selection background */
--ds-selection-fg    /* Text selection text color */
```

### Using Variables in Slides

```svelte
<Slide h={0} v={0}>
  <div style="border: 2px solid var(--ds-accent); padding: 1em; border-radius: 8px;">
    <p>Themed border</p>
  </div>
</Slide>
```

## Custom Styling

Override theme variables with inline styles or a `<style>` block:

```svelte
<Deck theme="black">
  <Slide h={0} v={0}>
    <h1 style="color: coral;">Custom Color</h1>
  </Slide>
</Deck>

<style>
  :global(.theme-black) {
    --ds-accent: #ff6b6b;
  }
</style>
```

## Typography

All themes set consistent typography:

- **h1**: 2.5em, bold, sans-serif (serif theme uses serif fonts)
- **h2**: 1.8em, bold
- **h3**: 1.3em, bold
- **Body**: 24px base, line-height 1.5
- **Code**: monospace, slightly smaller, with subtle background
