# Creating Presentations

A Decksmith presentation is a Svelte component. The `<Deck>` component wraps `<Slide>` components, which contain your content.

## Basic Structure

```svelte
<script lang="ts">
  import Deck from "./lib/components/Deck.svelte";
  import Slide from "./lib/components/Slide.svelte";
  import Fragment from "./lib/components/Fragment.svelte";
  import Notes from "./lib/components/Notes.svelte";
</script>

<Deck theme="black" transition="slide">
  <Slide h={0} v={0}>
    <h1>Title Slide</h1>
    <p>Subtitle</p>
  </Slide>

  <Slide h={1} v={0}>
    <h2>Content Slide</h2>
    <p>Your content here</p>
  </Slide>
</Deck>
```

## Slide Coordinates

Every slide needs `h` (horizontal) and `v` (vertical) coordinates. The main sequence uses `v=0`:

```
h=0  →  h=1  →  h=2  →  h=3
```

Vertical sub-slides share the same `h` value:

```
h=2, v=0  (main slide)
    ↓
h=2, v=1  (sub-slide)
    ↓
h=2, v=2  (sub-slide)
```

Navigate horizontal slides with ← → keys, vertical slides with ↑ ↓ keys.

## Adding Content

Slides accept any HTML/Svelte content:

```svelte
<Slide h={0} v={0}>
  <h1>Heading</h1>
  <p>Paragraph text</p>
  <img src="/image.png" alt="Description" />
  <ul>
    <li>Bullet point</li>
  </ul>
</Slide>
```

## Incremental Reveals

Use `<Fragment>` to reveal content step-by-step:

```svelte
<Slide h={1} v={0}>
  <h2>Key Points</h2>
  <Fragment index={0} style="fade-up"><p>First</p></Fragment>
  <Fragment index={1} style="fade-up"><p>Second</p></Fragment>
  <Fragment index={2} style="fade-up"><p>Third</p></Fragment>
</Slide>
```

Press Space or → to reveal each fragment in order.

## Speaker Notes

Add notes visible only in the speaker view (press `S`):

```svelte
<Slide h={0} v={0}>
  <h1>Title</h1>
  <Notes text="Remember to introduce the team before this slide." />
</Slide>
```

## Slide Backgrounds

```svelte
<!-- Solid color -->
<Slide h={0} v={0} background="#2d2d2d">

<!-- Gradient -->
<Slide h={1} v={0} background="linear-gradient(135deg, #667eea, #764ba2)">

<!-- Image -->
<Slide h={2} v={0} backgroundImage="/images/photo.jpg">
```

## Full Example

```svelte
<script lang="ts">
  import Deck from "./lib/components/Deck.svelte";
  import Slide from "./lib/components/Slide.svelte";
  import Fragment from "./lib/components/Fragment.svelte";
  import Notes from "./lib/components/Notes.svelte";
  import Markdown from "./lib/components/Markdown.svelte";
  import Code from "./lib/components/Code.svelte";
</script>

<Deck theme="moon" transition="fade">
  <Slide h={0} v={0}>
    <h1>My Talk</h1>
    <p>By Author Name</p>
    <Notes text="Welcome everyone." />
  </Slide>

  <Slide h={1} v={0}>
    <h2>Agenda</h2>
    <Fragment index={0} style="fade-up"><p>Introduction</p></Fragment>
    <Fragment index={1} style="fade-up"><p>Demo</p></Fragment>
    <Fragment index={2} style="fade-up"><p>Q&A</p></Fragment>
  </Slide>

  <Slide h={2} v={0}>
    <h2>Code</h2>
    <Code language="javascript" lineNumbers code={`console.log("Hello!");`} />
  </Slide>

  <Slide h={3} v={0} background="linear-gradient(135deg, #0c0c1d, #1a1a3e)">
    <h1>Thank You</h1>
  </Slide>
</Deck>
```
