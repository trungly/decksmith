<script lang="ts">
  import { getContext } from 'svelte';
  import type { DeckState } from '../state/deck-state.svelte.js';

  const deck = getContext<DeckState>('deck');
</script>

{#if deck.config.controls && !deck.isOverview}
  <div class="deck-controls">
    <button
      class="control control-left"
      class:enabled={deck.canGoLeft}
      onclick={() => deck.left()}
      aria-label="Previous horizontal slide"
    >
      <svg viewBox="0 0 24 24"><path d="M15.41 16.59L10.83 12l4.58-4.59L14 6l-6 6 6 6z"/></svg>
    </button>
    <button
      class="control control-right"
      class:enabled={deck.canGoRight}
      onclick={() => deck.right()}
      aria-label="Next horizontal slide"
    >
      <svg viewBox="0 0 24 24"><path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6z"/></svg>
    </button>
    <button
      class="control control-up"
      class:enabled={deck.canGoUp}
      onclick={() => deck.up()}
      aria-label="Previous vertical slide"
    >
      <svg viewBox="0 0 24 24"><path d="M7.41 15.41L12 10.83l4.59 4.58L18 14l-6-6-6 6z"/></svg>
    </button>
    <button
      class="control control-down"
      class:enabled={deck.canGoDown}
      onclick={() => deck.down()}
      aria-label="Next vertical slide"
    >
      <svg viewBox="0 0 24 24"><path d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6z"/></svg>
    </button>
  </div>
{/if}

<style>
  .deck-controls {
    position: absolute;
    bottom: 14px;
    right: 14px;
    z-index: 30;
    display: grid;
    grid-template-areas:
      ". up ."
      "left . right"
      ". down .";
    gap: 4px;
  }
  .control {
    width: 36px;
    height: 36px;
    padding: 4px;
    border: none;
    background: rgba(255,255,255,0.1);
    border-radius: 4px;
    cursor: pointer;
    opacity: 0.3;
    transition: opacity 0.2s, background 0.2s;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .control svg {
    width: 20px;
    height: 20px;
    fill: currentColor;
    color: inherit;
  }
  .control.enabled {
    opacity: 0.7;
  }
  .control.enabled:hover {
    opacity: 1;
    background: rgba(255,255,255,0.2);
  }
  .control:not(.enabled) {
    pointer-events: none;
  }
  .control-left { grid-area: left; }
  .control-right { grid-area: right; }
  .control-up { grid-area: up; }
  .control-down { grid-area: down; }
</style>
