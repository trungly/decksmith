# Basic Presentation

A minimal working presentation with 3 slides.

```svelte
<script lang="ts">
  import Deck from "./lib/components/Deck.svelte";
  import Slide from "./lib/components/Slide.svelte";
</script>

<Deck theme="black" transition="slide">
  <Slide h={0} v={0}>
    <h1>Welcome</h1>
    <p>A simple presentation</p>
  </Slide>

  <Slide h={1} v={0}>
    <h2>Main Point</h2>
    <p>Keep it simple.</p>
  </Slide>

  <Slide h={2} v={0}>
    <h1>Thank You</h1>
  </Slide>
</Deck>
```
