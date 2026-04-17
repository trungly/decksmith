<script lang="ts">
  import { getContext } from "svelte";
  import type { DeckState } from "../state/deck-state.svelte.ts";

  const deck = getContext<DeckState>("deck");
</script>

{#if deck.config.controls && !deck.isOverview}
  <div class="deck-controls">
    <button
      class="control control-left"
      class:enabled={deck.canGoPrev}
      disabled={!deck.canGoPrev}
      onclick={() => deck.prev()}
      aria-label="Previous slide or fragment"
    >
      <svg viewBox="0 0 24 24"
        ><path d="M15.41 16.59L10.83 12l4.58-4.59L14 6l-6 6 6 6z" /></svg
      >
    </button>
    <button
      class="control control-right"
      class:enabled={deck.canGoNext}
      disabled={!deck.canGoNext}
      onclick={() => deck.next()}
      aria-label="Next slide or fragment"
    >
      <svg viewBox="0 0 24 24"
        ><path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6z" /></svg
      >
    </button>
    <button
      class="control control-up"
      class:enabled={deck.canGoPrev}
      disabled={!deck.canGoPrev}
      onclick={() => deck.prev()}
      aria-label="Previous slide or fragment"
    >
      <svg viewBox="0 0 24 24"
        ><path d="M7.41 15.41L12 10.83l4.59 4.58L18 14l-6-6-6 6z" /></svg
      >
    </button>
    <button
      class="control control-down"
      class:enabled={deck.canGoNext}
      disabled={!deck.canGoNext}
      onclick={() => deck.next()}
      aria-label="Next slide or fragment"
    >
      <svg viewBox="0 0 24 24"
        ><path d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6z" /></svg
      >
    </button>
  </div>
{/if}

<style>
  .deck-controls {
    position: absolute;
    bottom: 16px;
    right: 16px;
    z-index: 30;
    display: grid;
    grid-template-areas:
      ". up ."
      "left . right"
      ". down .";
    gap: 4px;
    opacity: 1;
    transition: opacity 0.4s ease;
  }

  .control {
    width: 34px;
    height: 34px;
    padding: 6px;
    border: none;
    background: rgba(0, 0, 0, 0.45);
    backdrop-filter: blur(6px);
    border-radius: 50%;
    cursor: pointer;
    color: white;
    opacity: 0.4;
    transition:
      opacity 0.2s,
      background 0.2s,
      transform 0.15s;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .control svg {
    width: 18px;
    height: 18px;
    fill: currentColor;
    display: block;
  }

  .control.enabled {
    opacity: 0.75;
  }

  .control.enabled:hover {
    opacity: 1;
    background: rgba(0, 0, 0, 0.65);
    transform: scale(1.1);
  }

  .control.enabled:active {
    transform: scale(0.95);
  }

  .control.enabled:focus-visible {
    opacity: 1;
    outline: 2px solid var(--ds-accent, #42affa);
    outline-offset: 2px;
  }

  .control:not(.enabled) {
    pointer-events: none;
  }

  .control-left {
    grid-area: left;
  }
  .control-right {
    grid-area: right;
  }
  .control-up {
    grid-area: up;
  }
  .control-down {
    grid-area: down;
  }
</style>
