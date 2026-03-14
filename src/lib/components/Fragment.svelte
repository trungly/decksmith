<script lang="ts">
  import { getContext, onMount, type Snippet } from 'svelte';
  import type { DeckState } from '../state/deck-state.svelte.js';
  import type { FragmentStyle } from '../types.js';

  interface Props {
    index?: number;
    style?: FragmentStyle;
    /** The h/v of the parent slide — set automatically by Slide if using Decksmith patterns */
    slideH?: number;
    slideV?: number;
    children?: Snippet;
  }

  let {
    index = 0,
    style = 'fade-in',
    slideH = -1,
    slideV = -1,
    children,
  }: Props = $props();

  const deck = getContext<DeckState>('deck');

  // Register this fragment with the parent slide
  onMount(() => {
    if (slideH >= 0 && slideV >= 0) {
      const slide = deck.getSlideAt(slideH, slideV);
      if (slide && index + 1 > slide.fragmentCount) {
        deck.updateFragmentCount(slideH, slideV, index + 1);
      }
    }
  });

  const isCurrentSlide = $derived(
    slideH === deck.currentH && slideV === deck.currentV
  );

  const isVisible = $derived(
    isCurrentSlide && deck.currentFragment >= index
  );

  const wasVisible = $derived(
    isCurrentSlide && deck.currentFragment > index
  );
</script>

<span
  class="fragment {style}"
  class:visible={isVisible}
  class:was-visible={wasVisible}
  data-fragment-index={index}
>
  {#if children}
    {@render children()}
  {/if}
</span>

<style>
  .fragment {
    display: inline-block;
  }

  /* Default: fade-in */
  .fragment.fade-in {
    opacity: 0;
    transition: opacity 0.4s ease, transform 0.4s ease;
  }
  .fragment.fade-in.visible { opacity: 1; }

  .fragment.fade-out {
    opacity: 1;
    transition: opacity 0.4s ease;
  }
  .fragment.fade-out.visible.was-visible { opacity: 0; }

  .fragment.fade-up {
    opacity: 0;
    transform: translateY(40px);
    transition: opacity 0.4s ease, transform 0.4s ease;
  }
  .fragment.fade-up.visible { opacity: 1; transform: translateY(0); }

  .fragment.fade-down {
    opacity: 0;
    transform: translateY(-40px);
    transition: opacity 0.4s ease, transform 0.4s ease;
  }
  .fragment.fade-down.visible { opacity: 1; transform: translateY(0); }

  .fragment.fade-left {
    opacity: 0;
    transform: translateX(40px);
    transition: opacity 0.4s ease, transform 0.4s ease;
  }
  .fragment.fade-left.visible { opacity: 1; transform: translateX(0); }

  .fragment.fade-right {
    opacity: 0;
    transform: translateX(-40px);
    transition: opacity 0.4s ease, transform 0.4s ease;
  }
  .fragment.fade-right.visible { opacity: 1; transform: translateX(0); }

  .fragment.fade-in-then-out {
    opacity: 0;
    transition: opacity 0.4s ease;
  }
  .fragment.fade-in-then-out.visible { opacity: 1; }
  .fragment.fade-in-then-out.was-visible { opacity: 0; }

  .fragment.fade-in-then-semi-out {
    opacity: 0;
    transition: opacity 0.4s ease;
  }
  .fragment.fade-in-then-semi-out.visible { opacity: 1; }
  .fragment.fade-in-then-semi-out.was-visible { opacity: 0.3; }

  .fragment.grow {
    opacity: 0;
    transform: scale(0.5);
    transition: opacity 0.4s ease, transform 0.4s ease;
  }
  .fragment.grow.visible { opacity: 1; transform: scale(1); }

  .fragment.shrink {
    transform: scale(1);
    transition: opacity 0.4s ease, transform 0.4s ease;
  }
  .fragment.shrink.visible { transform: scale(0.7); }

  .fragment.strike {
    transition: text-decoration 0.4s ease;
  }
  .fragment.strike.visible { text-decoration: line-through; }

  .fragment.highlight-red {
    transition: color 0.4s ease;
  }
  .fragment.highlight-red.visible { color: #ff2c2d; }

  .fragment.highlight-green {
    transition: color 0.4s ease;
  }
  .fragment.highlight-green.visible { color: #17ff2e; }

  .fragment.highlight-blue {
    transition: color 0.4s ease;
  }
  .fragment.highlight-blue.visible { color: #1b91ff; }

  .fragment.highlight-current-red {
    transition: color 0.4s ease;
  }
  .fragment.highlight-current-red.visible:not(.was-visible) { color: #ff2c2d; }

  .fragment.highlight-current-green {
    transition: color 0.4s ease;
  }
  .fragment.highlight-current-green.visible:not(.was-visible) { color: #17ff2e; }

  .fragment.highlight-current-blue {
    transition: color 0.4s ease;
  }
  .fragment.highlight-current-blue.visible:not(.was-visible) { color: #1b91ff; }
</style>
