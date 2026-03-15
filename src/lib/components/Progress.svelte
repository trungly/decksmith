<script lang="ts">
  import { getContext } from "svelte";
  import type { DeckState } from "../state/deck-state.svelte.js";

  const deck = getContext<DeckState>("deck");

  const progressValue = $derived(deck.progress);
</script>

{#if deck.config.progress && !deck.isOverview}
  <div class="deck-progress">
    <div class="deck-progress-bar" style="width: {progressValue * 100}%"></div>
  </div>
{/if}

<style>
  .deck-progress {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 3px;
    z-index: 30;
    background: rgba(255, 255, 255, 0.08);
  }
  .deck-progress-bar {
    height: 100%;
    background: var(--ds-accent, #42affa);
    transition: width 0.5s cubic-bezier(0.4, 0, 0.2, 1);
    box-shadow: 0 0 6px var(--ds-accent, #42affa);
  }
</style>
