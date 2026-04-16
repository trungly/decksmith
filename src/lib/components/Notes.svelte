<script lang="ts">
  import { getContext, onMount, tick } from "svelte";
  import type { DeckState } from "../state/deck-state.svelte.ts";

  interface Props {
    slideH?: number;
    slideV?: number;
    text?: string;
  }

  const { slideH, slideV, text = "" }: Props = $props();

  const deck = getContext<DeckState>("deck");
  const slide = getContext<{ h: number; v: number }>("slide");

  onMount(async () => {
    if (text) {
      // Wait for the parent Slide to finish its own onMount (registerSlide)
      // before updating notes, since children mount before parents in Svelte.
      await tick();
      deck.updateNotes(slideH ?? slide?.h ?? 0, slideV ?? slide?.v ?? 0, text);
    }
  });
</script>

<!-- Notes are invisible — content is stored in deck state for the speaker view -->
