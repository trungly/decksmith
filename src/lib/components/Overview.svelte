<script lang="ts">
  import { getContext, tick } from "svelte";
  import { fade } from "svelte/transition";
  import type { DeckState } from "../state/deck-state.svelte.js";

  const deck = getContext<DeckState>("deck");

  function selectSlide(h: number, v: number) {
    deck.goTo(h, v);
    deck.isOverview = false;
  }

  // Auto-focus current slide button when overview opens
  async function autoFocus(node: HTMLElement) {
    await tick();
    const current = node.querySelector<HTMLElement>(
      "button[aria-current='step']",
    );
    current?.focus();
  }

  const THUMB_W = 192;
  const thumbH = $derived(
    Math.round((THUMB_W * deck.config.height) / deck.config.width),
  );
  const thumbScale = $derived(THUMB_W / deck.config.width);

  function slidePreview(node: HTMLElement, params: { h: number; v: number }) {
    function populate({ h, v }: { h: number; v: number }) {
      const slideEl = document.querySelector<HTMLElement>(
        `.deck-slides .slide[data-h="${h}"][data-v="${v}"]`,
      );
      if (!slideEl) return;
      node.innerHTML = slideEl.innerHTML;
      if (slideEl.style.background)
        node.style.background = slideEl.style.background;
      if (slideEl.style.backgroundImage) {
        node.style.backgroundImage = slideEl.style.backgroundImage;
        node.style.backgroundSize = slideEl.style.backgroundSize;
        node.style.backgroundPosition = slideEl.style.backgroundPosition;
      }
    }
    populate(params);
    return { update: populate };
  }
</script>

{#if deck.isOverview}
  <div
    class="deck-overview"
    role="dialog"
    aria-label="Slide overview"
    tabindex="-1"
    use:autoFocus
    onclick={() => (deck.isOverview = false)}
    onkeydown={(e) => {
      if (e.key === "Escape") {
        e.preventDefault();
        deck.isOverview = false;
      }
    }}
    transition:fade={{ duration: 180 }}
  >
    {#each deck.slides as column, h (h)}
      <div class="overview-column">
        {#each column as _slide, v (v)}
          <div class="overview-item">
            <button
              class="overview-slide"
              class:current={h === deck.currentH && v === deck.currentV}
              aria-current={h === deck.currentH && v === deck.currentV
                ? "step"
                : undefined}
              style="width: {THUMB_W}px; height: {thumbH}px;"
              onclick={(e) => {
                e.stopPropagation();
                selectSlide(h, v);
              }}
              aria-label="Slide {h + 1}{v > 0 ? '.' + (v + 1) : ''}"
            >
              <div
                class="slide-preview"
                style="width: {deck.config.width}px; height: {deck.config
                  .height}px; transform: scale({thumbScale});"
                use:slidePreview={{ h, v }}
              ></div>
            </button>
            <div class="overview-label">
              {h + 1}{v > 0 ? "." + (v + 1) : ""}
            </div>
          </div>
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
    background: rgba(0, 0, 0, 0.88);
    display: flex;
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;
    gap: 20px;
    padding: 48px 40px;
    backdrop-filter: blur(6px);
    overflow: auto;
    align-content: center;
  }

  .overview-column {
    display: flex;
    flex-direction: column;
    gap: 16px;
    flex-shrink: 0;
  }

  .overview-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 6px;
  }

  .overview-slide {
    overflow: hidden;
    background: var(--ds-bg, #111);
    border: 2px solid rgba(255, 255, 255, 0.2);
    border-radius: 6px;
    cursor: pointer;
    transition:
      border-color 0.15s,
      box-shadow 0.15s,
      transform 0.15s;
    padding: 0;
    display: block;
    flex-shrink: 0;
  }

  .overview-slide:hover {
    border-color: var(--ds-accent, #42affa);
    box-shadow: 0 0 0 2px var(--ds-accent, #42affa);
    transform: scale(1.05);
  }

  .overview-slide.current {
    border-color: var(--ds-accent, #42affa);
    box-shadow: 0 0 0 3px var(--ds-accent, #42affa);
  }

  .slide-preview {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 40px;
    text-align: center;
    transform-origin: 0 0;
    pointer-events: none;
    overflow: hidden;
    background: var(--ds-bg, #111);
    color: var(--ds-fg, #eee);
  }

  .overview-label {
    font-size: 11px;
    font-weight: 600;
    opacity: 0.5;
    color: white;
    letter-spacing: 0.05em;
  }
</style>
