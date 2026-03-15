<script lang="ts">
  import { getContext, onMount } from "svelte";
  import type { DeckState } from "../state/deck-state.svelte.js";

  const deck = getContext<DeckState>("deck");

  let visible = $state(true);
  let hideTimer: ReturnType<typeof setTimeout>;

  function show() {
    visible = true;
    clearTimeout(hideTimer);
    hideTimer = setTimeout(() => {
      visible = false;
    }, 3000);
  }

  onMount(() => {
    show();
    window.addEventListener("mousemove", show);
    window.addEventListener("touchstart", show);
    return () => {
      window.removeEventListener("mousemove", show);
      window.removeEventListener("touchstart", show);
      clearTimeout(hideTimer);
    };
  });
</script>

{#if deck.config.controls && !deck.isOverview}
  <div class="deck-controls" class:hidden={!visible}>
    <button
      class="control control-left"
      class:enabled={deck.canGoLeft}
      onclick={() => deck.left()}
      aria-label="Previous horizontal slide"
    >
      <svg viewBox="0 0 24 24"
        ><path d="M15.41 16.59L10.83 12l4.58-4.59L14 6l-6 6 6 6z" /></svg
      >
    </button>
    <button
      class="control control-right"
      class:enabled={deck.canGoRight}
      onclick={() => deck.right()}
      aria-label="Next horizontal slide"
    >
      <svg viewBox="0 0 24 24"
        ><path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6z" /></svg
      >
    </button>
    <button
      class="control control-up"
      class:enabled={deck.canGoUp}
      onclick={() => deck.up()}
      aria-label="Previous vertical slide"
    >
      <svg viewBox="0 0 24 24"
        ><path d="M7.41 15.41L12 10.83l4.59 4.58L18 14l-6-6-6 6z" /></svg
      >
    </button>
    <button
      class="control control-down"
      class:enabled={deck.canGoDown}
      onclick={() => deck.down()}
      aria-label="Next vertical slide"
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

  .deck-controls.hidden {
    opacity: 0;
    pointer-events: none;
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
    opacity: 0.25;
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
