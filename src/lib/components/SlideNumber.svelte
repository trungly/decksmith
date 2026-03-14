<script lang="ts">
  import { getContext } from 'svelte';
  import type { DeckState } from '../state/deck-state.svelte.js';

  const deck = getContext<DeckState>('deck');

  const display = $derived.by(() => {
    const h = deck.currentH + 1;
    const v = deck.currentV;
    const total = deck.totalHorizontal;
    if (v > 0) {
      return `${h}.${v + 1} / ${total}`;
    }
    return `${h} / ${total}`;
  });
</script>

{#if deck.config.slideNumber && !deck.isOverview}
  <div class="deck-slide-number">
    {display}
  </div>
{/if}

<style>
  .deck-slide-number {
    position: absolute;
    bottom: 14px;
    left: 14px;
    z-index: 30;
    font-size: 12px;
    font-family: system-ui, sans-serif;
    opacity: 0.5;
    font-variant-numeric: tabular-nums;
    color: inherit;
  }
</style>
