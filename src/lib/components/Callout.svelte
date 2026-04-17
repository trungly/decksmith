<script lang="ts">
  import type { Snippet } from "svelte";

  type CalloutVariant =
    | "neutral"
    | "info"
    | "success"
    | "warning"
    | "danger";

  interface Props {
    variant?: CalloutVariant;
    title?: string;
    className?: string;
    ariaLabel?: string;
    children?: Snippet;
  }

  const {
    variant = "neutral",
    title,
    className = "",
    ariaLabel,
    children,
  }: Props = $props();
</script>

<aside
  class={`ds-callout variant-${variant} ${className}`.trim()}
  aria-label={ariaLabel}
>
  {#if title}
    <p class="ds-callout-title">{title}</p>
  {/if}
  {#if children}
    <div class="ds-callout-body">
      {@render children()}
    </div>
  {/if}
</aside>

<style>
  .ds-callout {
    box-sizing: border-box;
    width: 100%;
    max-width: min(100%, var(--ds-content-max-width, 52ch));
    text-align: left;
    border-radius: 10px;
    padding: 0.9rem 1rem;
    border: 1px solid var(--ds-border, rgba(255, 255, 255, 0.18));
    background: color-mix(in srgb, var(--ds-bg) 92%, var(--ds-fg) 8%);
  }
  .ds-callout-title {
    margin: 0 0 0.45rem;
    font-weight: 700;
    font-size: 0.95em;
    color: var(--ds-heading);
  }
  .ds-callout-body {
    margin: 0;
    font-size: 0.92em;
    line-height: var(--ds-line-height, 1.55);
    color: var(--ds-fg);
  }
  .ds-callout-body :global(p:last-child) {
    margin-bottom: 0;
  }
  .variant-neutral {
    border-left: 4px solid var(--ds-muted);
  }
  .variant-info {
    border-left: 4px solid var(--ds-link);
    background: color-mix(in srgb, var(--ds-bg) 88%, var(--ds-link) 12%);
  }
  .variant-success {
    border-left: 4px solid #22c55e;
    background: color-mix(in srgb, var(--ds-bg) 90%, #22c55e 10%);
  }
  .variant-warning {
    border-left: 4px solid #f59e0b;
    background: color-mix(in srgb, var(--ds-bg) 90%, #f59e0b 10%);
  }
  .variant-danger {
    border-left: 4px solid #ef4444;
    background: color-mix(in srgb, var(--ds-bg) 90%, #ef4444 10%);
  }
</style>
