<script lang="ts">
  import { getContext, onMount } from 'svelte';
  import type { DeckState } from '../state/deck-state.svelte.js';

  interface Props {
    slideH?: number;
    slideV?: number;
    text?: string;
  }

  let { slideH = 0, slideV = 0, text = '' }: Props = $props();

  const deck = getContext<DeckState>('deck');

  onMount(() => {
    if (text) {
      deck.updateNotes(slideH, slideV, text);
    }
  });
</script>

<!-- Notes are invisible — content is stored in deck state for the speaker view -->
