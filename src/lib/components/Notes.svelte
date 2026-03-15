<script lang="ts">
  import { getContext, onMount, tick } from "svelte";
  import type { DeckState } from "../state/deck-state.svelte.js";

  interface Props {
    slideH?: number;
    slideV?: number;
    text?: string;
  }

  const { slideH = 0, slideV = 0, text = "" }: Props = $props();

  const deck = getContext<DeckState>("deck");

  onMount(async () => {
    if (text) {
      // Wait for the parent Slide to finish its own onMount (registerSlide)
      // before updating notes, since children mount before parents in Svelte.
      await tick();
      deck.updateNotes(slideH, slideV, text);
    }
  });
</script>

<!-- Notes are invisible — content is stored in deck state for the speaker view -->
