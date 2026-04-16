<script lang="ts">
  type DeltaTone = "neutral" | "positive" | "negative";

  interface Props {
    value: string;
    label: string;
    delta?: string;
    deltaTone?: DeltaTone;
    className?: string;
    ariaLabel?: string;
  }

  const {
    value,
    label,
    delta,
    deltaTone = "neutral",
    className = "",
    ariaLabel,
  }: Props = $props();
</script>

<div
  class={`ds-stat ${className}`.trim()}
  aria-label={ariaLabel ?? `${label}: ${value}`}
>
  <div class="ds-stat-value">{value}</div>
  <div class="ds-stat-label">{label}</div>
  {#if delta}
    <div class="ds-stat-delta tone-{deltaTone}">{delta}</div>
  {/if}
</div>

<style>
  .ds-stat {
    text-align: center;
    display: grid;
    gap: 0.25rem;
    justify-items: center;
  }
  .ds-stat-value {
    font-size: clamp(2rem, 5vw, 3rem);
    font-weight: 800;
    line-height: 1.05;
    letter-spacing: -0.02em;
    color: var(--ds-heading);
  }
  .ds-stat-label {
    font-size: 0.95em;
    color: var(--ds-muted);
    max-width: 22ch;
  }
  .ds-stat-delta {
    margin-top: 0.15rem;
    font-size: 0.85em;
    font-weight: 600;
  }
  .tone-neutral {
    color: var(--ds-muted);
  }
  .tone-positive {
    color: #22c55e;
  }
  .tone-negative {
    color: #ef4444;
  }
</style>
