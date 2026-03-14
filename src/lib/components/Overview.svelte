<script lang="ts">
  import { getContext } from 'svelte';
  import type { DeckState } from '../state/deck-state.svelte.js';

  const deck = getContext<DeckState>('deck');

  function selectSlide(h: number, v: number) {
    deck.goTo(h, v);
    deck.isOverview = false;
  }
</script>

{#if deck.isOverview}
  <div class="deck-overview" role="grid" aria-label="Slide overview">
    {#each deck.slides as column, h}
      <div class="overview-column">
        {#each column as slide, v}
          <button
            class="overview-slide"
            class:current={h === deck.currentH && v === deck.currentV}
            onclick={() => selectSlide(h, v)}
            aria-label="Slide {h + 1}{v > 0 ? '.' + (v + 1) : ''}"
          >
            <div class="overview-label">{h + 1}{v > 0 ? '.' + (v + 1) : ''}</div>
          </button>
        {/each}
      </div>
    {/each}
  </div>
{/if}

<style>
  .deck-overview {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 50;
    background: rgba(0, 0, 0, 0.85);
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 16px;
    padding: 40px;
    backdrop-filter: blur(4px);
  }
  .overview-column {
    display: flex;
    flex-direction: column;
    gap: 16px;
  }
  .overview-slide {
    width: 160px;
    height: 120px;
    background: rgba(255,255,255,0.08);
    border: 2px solid rgba(255,255,255,0.15);
    border-radius: 6px;
    cursor: pointer;
    transition: border-color 0.2s, transform 0.2s, background 0.2s;
    display: flex;
    align-items: center;
    justify-content: center;
    color: inherit;
  }
  .overview-slide:hover {
    border-color: var(--ds-accent, #42affa);
    background: rgba(255,255,255,0.12);
    transform: scale(1.05);
  }
  .overview-slide.current {
    border-color: var(--ds-accent, #42affa);
    background: rgba(66, 175, 250, 0.15);
  }
  .overview-label {
    font-size: 1.2em;
    font-weight: 600;
    opacity: 0.7;
  }
</style>
