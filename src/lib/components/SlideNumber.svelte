<script lang="ts">
  import { getContext } from "svelte";
  import type { DeckState } from "../state/deck-state.svelte.js";

  const deck = getContext<DeckState>("deck");

  const display = $derived.by(() => {
    const h = deck.currentH + 1;
    const v = deck.currentV;
    const total = deck.totalHorizontal;
    return v > 0 ? `${h}.${v + 1} / ${total}` : `${h} / ${total}`;
  });

  const fragmentTotal = $derived(deck.currentFragmentCount);
  const fragmentIndex = $derived(deck.currentFragment);
</script>

{#if deck.config.slideNumber && !deck.isOverview}
  <div class="deck-slide-number">
    <span class="label">{display}</span>
    {#if fragmentTotal > 0}
      <div
        class="fragment-dots"
        role="group"
        aria-label="Fragment {fragmentIndex + 1} of {fragmentTotal}"
      >
        {#each { length: fragmentTotal } as _, i (i)}
          <span
            class="dot"
            class:filled={i <= fragmentIndex}
            role="presentation"
          ></span>
        {/each}
      </div>
    {/if}
  </div>
{/if}

<style>
  .deck-slide-number {
    position: absolute;
    bottom: 16px;
    left: 16px;
    z-index: 30;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 5px;
  }

  .label {
    font-size: 11px;
    font-family: system-ui, sans-serif;
    font-variant-numeric: tabular-nums;
    color: white;
    background: rgba(0, 0, 0, 0.4);
    backdrop-filter: blur(6px);
    padding: 3px 9px;
    border-radius: 20px;
    letter-spacing: 0.03em;
    white-space: nowrap;
  }

  .fragment-dots {
    display: flex;
    gap: 4px;
    align-items: center;
  }

  .dot {
    width: 5px;
    height: 5px;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.25);
    border: 1px solid rgba(255, 255, 255, 0.5);
    transition: background 0.2s;
  }

  .dot.filled {
    background: white;
    border-color: white;
  }
</style>
