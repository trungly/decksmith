<script lang="ts">
  import type { Snippet } from "svelte";

  interface Props {
    columns?: 2 | 3;
    gap?: string;
    ratios?: string;
    align?: "start" | "center" | "stretch";
    className?: string;
    first?: Snippet;
    second?: Snippet;
    third?: Snippet;
  }

  const {
    columns = 2,
    gap = "1.5rem",
    ratios,
    align = "stretch",
    className = "",
    first,
    second,
    third,
  }: Props = $props();

  const template = $derived(
    ratios?.trim() ||
      (columns === 3 ? "minmax(0, 1fr) minmax(0, 1fr) minmax(0, 1fr)" : "minmax(0, 1fr) minmax(0, 1fr)"),
  );
</script>

<div
  class={`ds-split align-${align} ${className}`.trim()}
  style:--ds-split-gap={gap}
  style:grid-template-columns={template}
>
  <div class="ds-split-cell">
    {#if first}{@render first()}{/if}
  </div>
  <div class="ds-split-cell">
    {#if second}{@render second()}{/if}
  </div>
  {#if columns === 3}
    <div class="ds-split-cell">
      {#if third}{@render third()}{/if}
    </div>
  {/if}
</div>

<style>
  .ds-split {
    display: grid;
    gap: var(--ds-split-gap, 1.5rem);
    width: 100%;
    text-align: left;
  }
  @media (max-width: 640px) {
    .ds-split {
      grid-template-columns: 1fr !important;
    }
  }
  .align-start .ds-split-cell {
    align-self: start;
  }
  .align-center .ds-split-cell {
    align-self: center;
  }
  .align-stretch .ds-split-cell {
    align-self: stretch;
  }
  .ds-split-cell {
    min-width: 0;
  }
</style>
