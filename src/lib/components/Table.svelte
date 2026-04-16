<script lang="ts">
  type Cell = string | number | null | undefined;
  type Align = "left" | "center" | "right";

  interface Props {
    headers: string[];
    rows: Cell[][];
    columnAlign?: Align[];
    striped?: boolean;
    compact?: boolean;
    className?: string;
    caption?: string;
    ariaLabel?: string;
  }

  const {
    headers,
    rows = [],
    columnAlign,
    striped = true,
    compact = false,
    className = "",
    caption,
    ariaLabel,
  }: Props = $props();

  function alignAt(index: number): Align {
    return columnAlign?.[index] ?? "left";
  }

  function cellText(value: Cell): string {
    if (value === null || value === undefined) return "";
    return String(value);
  }

  const regionName = $derived(ariaLabel?.trim() || caption?.trim() || "");
</script>

<div
  class={`ds-table-wrap ${className}`.trim()}
  role={regionName ? "region" : undefined}
  aria-label={regionName || undefined}
>
  <table class="ds-table" class:striped class:compact>
    {#if caption}
      <caption class="ds-table-caption">{caption}</caption>
    {/if}
    <thead>
      <tr>
        {#each headers as header, i (i)}
          <th scope="col" style:text-align={alignAt(i)}>{header}</th>
        {/each}
      </tr>
    </thead>
    <tbody>
      {#each rows as row, ri (ri)}
        <tr>
          {#each headers as _, ci (ci)}
            <td style:text-align={alignAt(ci)}>{cellText(row[ci])}</td>
          {/each}
        </tr>
      {/each}
    </tbody>
  </table>
</div>

<style>
  .ds-table-wrap {
    width: 100%;
    overflow-x: auto;
    text-align: left;
  }
  .ds-table {
    width: 100%;
    border-collapse: collapse;
    font-size: 0.9em;
    color: var(--ds-fg);
  }
  .ds-table.compact :global(th),
  .ds-table.compact :global(td) {
    padding: 0.35rem 0.5rem;
  }
  .ds-table :global(th),
  .ds-table :global(td) {
    padding: 0.55rem 0.65rem;
    border-bottom: 1px solid var(--ds-border, rgba(255, 255, 255, 0.14));
    vertical-align: top;
  }
  .ds-table :global(th) {
    font-weight: 700;
    color: var(--ds-heading);
    background: color-mix(in srgb, var(--ds-bg) 90%, var(--ds-fg) 10%);
  }
  .ds-table.striped :global(tbody tr:nth-child(even)) {
    background: color-mix(in srgb, var(--ds-bg) 96%, var(--ds-fg) 4%);
  }
  .ds-table-caption {
    caption-side: top;
    text-align: left;
    font-weight: 600;
    color: var(--ds-heading);
    margin-bottom: 0.45rem;
  }
</style>
