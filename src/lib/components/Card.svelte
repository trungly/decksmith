<script lang="ts">
  import type { Snippet } from "svelte";

  interface Props {
    title?: string;
    subtitle?: string;
    className?: string;
    ariaLabel?: string;
    children?: Snippet;
    footer?: Snippet;
  }

  const {
    title,
    subtitle,
    className = "",
    ariaLabel,
    children,
    footer,
  }: Props = $props();
</script>

<section class={`ds-card ${className}`.trim()} aria-label={ariaLabel}>
  {#if title || subtitle}
    <header class="ds-card-header">
      {#if title}
        <h3 class="ds-card-title">{title}</h3>
      {/if}
      {#if subtitle}
        <p class="ds-card-subtitle">{subtitle}</p>
      {/if}
    </header>
  {/if}
  {#if children}
    <div class="ds-card-body">
      {@render children()}
    </div>
  {/if}
  {#if footer}
    <footer class="ds-card-footer">
      {@render footer()}
    </footer>
  {/if}
</section>

<style>
  .ds-card {
    text-align: left;
    border: 1px solid var(--ds-border, rgba(255, 255, 255, 0.18));
    border-radius: 12px;
    padding: 1rem 1.05rem;
    background: color-mix(in srgb, var(--ds-bg) 94%, var(--ds-fg) 6%);
    display: grid;
    gap: 0.65rem;
  }
  .ds-card-header {
    display: grid;
    gap: 0.2rem;
  }
  .ds-card-title {
    margin: 0;
    font-size: 1.15em;
    color: var(--ds-heading);
  }
  .ds-card-subtitle {
    margin: 0;
    font-size: 0.88em;
    color: var(--ds-muted);
  }
  .ds-card-body {
    font-size: 0.95em;
    line-height: var(--ds-line-height, 1.55);
    color: var(--ds-fg);
  }
  .ds-card-body :global(p:last-child) {
    margin-bottom: 0;
  }
  .ds-card-footer {
    padding-top: 0.35rem;
    border-top: 1px solid var(--ds-border, rgba(255, 255, 255, 0.12));
    font-size: 0.85em;
    color: var(--ds-muted);
  }
</style>
