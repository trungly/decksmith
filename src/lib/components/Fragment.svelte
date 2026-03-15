<script lang="ts">
  import { getContext, type Snippet } from "svelte";
  import type { DeckState } from "../state/deck-state.svelte.js";
  import type { FragmentStyle } from "../types.js";

  interface Props {
    index?: number;
    style?: FragmentStyle;
    children?: Snippet;
  }

  const { index = 0, style = "fade-in", children }: Props = $props();

  const deck = getContext<DeckState>("deck");
  const slide = getContext<{
    h: number;
    v: number;
    registerFragment: (i: number) => void;
  }>("slide");

  // Register synchronously so Slide.onMount sees the correct count.
  // svelte-ignore state_referenced_locally
  slide.registerFragment(index);

  const isCurrentSlide = $derived(
    slide.h === deck.currentH && slide.v === deck.currentV,
  );
  const isVisible = $derived(isCurrentSlide && deck.currentFragment >= index);
  const wasVisible = $derived(isCurrentSlide && deck.currentFragment > index);
</script>

<div
  class="fragment {style}"
  class:visible={isVisible}
  class:was-visible={wasVisible}
  data-fragment-index={index}
>
  {#if children}
    {@render children()}
  {/if}
</div>

<style>
  .fragment {
    display: block;
  }

  /* Default: fade-in */
  .fragment.fade-in {
    opacity: 0;
    transition:
      opacity 0.4s ease,
      transform 0.4s ease;
  }
  .fragment.fade-in.visible {
    opacity: 1;
  }

  .fragment.fade-out {
    opacity: 1;
    transition: opacity 0.4s ease;
  }
  .fragment.fade-out.visible.was-visible {
    opacity: 0;
  }

  .fragment.fade-up {
    opacity: 0;
    transform: translateY(40px);
    transition:
      opacity 0.4s ease,
      transform 0.4s ease;
  }
  .fragment.fade-up.visible {
    opacity: 1;
    transform: translateY(0);
  }

  .fragment.fade-down {
    opacity: 0;
    transform: translateY(-40px);
    transition:
      opacity 0.4s ease,
      transform 0.4s ease;
  }
  .fragment.fade-down.visible {
    opacity: 1;
    transform: translateY(0);
  }

  .fragment.fade-left {
    opacity: 0;
    transform: translateX(40px);
    transition:
      opacity 0.4s ease,
      transform 0.4s ease;
  }
  .fragment.fade-left.visible {
    opacity: 1;
    transform: translateX(0);
  }

  .fragment.fade-right {
    opacity: 0;
    transform: translateX(-40px);
    transition:
      opacity 0.4s ease,
      transform 0.4s ease;
  }
  .fragment.fade-right.visible {
    opacity: 1;
    transform: translateX(0);
  }

  .fragment.fade-in-then-out {
    opacity: 0;
    transition: opacity 0.4s ease;
  }
  .fragment.fade-in-then-out.visible {
    opacity: 1;
  }
  .fragment.fade-in-then-out.was-visible {
    opacity: 0;
  }

  .fragment.fade-in-then-semi-out {
    opacity: 0;
    transition: opacity 0.4s ease;
  }
  .fragment.fade-in-then-semi-out.visible {
    opacity: 1;
  }
  .fragment.fade-in-then-semi-out.was-visible {
    opacity: 0.3;
  }

  .fragment.grow {
    opacity: 0;
    transform: scale(0.5);
    transition:
      opacity 0.4s ease,
      transform 0.4s ease;
  }
  .fragment.grow.visible {
    opacity: 1;
    transform: scale(1);
  }

  .fragment.shrink {
    transform: scale(1);
    transition:
      opacity 0.4s ease,
      transform 0.4s ease;
  }
  .fragment.shrink.visible {
    transform: scale(0.7);
  }

  .fragment.strike {
    transition: text-decoration 0.4s ease;
  }
  .fragment.strike.visible {
    text-decoration: line-through;
  }

  .fragment.highlight-red {
    transition: color 0.4s ease;
  }
  .fragment.highlight-red.visible {
    color: #ff2c2d;
  }

  .fragment.highlight-green {
    transition: color 0.4s ease;
  }
  .fragment.highlight-green.visible {
    color: #17ff2e;
  }

  .fragment.highlight-blue {
    transition: color 0.4s ease;
  }
  .fragment.highlight-blue.visible {
    color: #1b91ff;
  }

  .fragment.highlight-current-red {
    transition: color 0.4s ease;
  }
  .fragment.highlight-current-red.visible:not(.was-visible) {
    color: #ff2c2d;
  }

  .fragment.highlight-current-green {
    transition: color 0.4s ease;
  }
  .fragment.highlight-current-green.visible:not(.was-visible) {
    color: #17ff2e;
  }

  .fragment.highlight-current-blue {
    transition: color 0.4s ease;
  }
  .fragment.highlight-current-blue.visible:not(.was-visible) {
    color: #1b91ff;
  }
</style>
