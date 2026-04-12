<script lang="ts">
  export type ChartType = "line" | "bar" | "area" | "donut";
  export type ChartLegend = "hidden" | "top" | "right" | "bottom";
  export type ChartAxisMode = "hidden" | "minimal" | "standard";
  export type ChartValueFormat = "number" | "compact" | "percent" | "currency";
  export type ChartPalette = "neutral" | "brand" | "categorical";

  export interface ChartRow {
    [key: string]: string | number | null;
  }

  interface Props {
    type: ChartType;
    title?: string;
    rows?: ChartRow[];
    xKey?: string;
    yKeys?: string[];
    legend?: ChartLegend;
    axis?: ChartAxisMode;
    valueFormat?: ChartValueFormat;
    palette?: ChartPalette;
    renderer?: "auto" | "svg" | "external";
    className?: string;
    ariaLabel?: string;
  }

  const {
    type,
    title,
    rows = [],
    xKey,
    yKeys = [],
    legend = "hidden",
    axis = "minimal",
    valueFormat = "number",
    palette = "brand",
    className = "",
    ariaLabel,
  }: Props = $props();

  const key = $derived(yKeys[0] ?? "");
  const maxValue = $derived(
    rows.reduce((max, row) => {
      const vals = yKeys.map((k) => row[k]).filter((v): v is number => typeof v === "number");
      return Math.max(max, vals.length > 0 ? Math.max(...vals) : 0);
    }, 0),
  );

  function labelFor(row: ChartRow, index: number): string {
    return xKey ? String(row[xKey] ?? `Row ${index + 1}`) : `Row ${index + 1}`;
  }

  function formatValue(value: number): string {
    if (valueFormat === "percent") return `${value}%`;
    if (valueFormat === "currency") return `$${value.toLocaleString()}`;
    if (valueFormat === "compact") {
      return new Intl.NumberFormat("en", { notation: "compact", maximumFractionDigits: 1 }).format(value);
    }
    return value.toLocaleString();
  }

  const DONUT_MAX_SEGMENTS = 8;
  const donutRows = $derived(rows.slice(0, DONUT_MAX_SEGMENTS));
  const donutTotal = $derived(
    donutRows.reduce((sum, row) => sum + (typeof row[key] === "number" ? (row[key] as number) : 0), 0),
  );
  const R = 68;
  const CIRC = $derived(2 * Math.PI * R);
  const donutSegments = $derived(
    donutTotal > 0
      ? donutRows.reduce(
          (acc, row, i) => {
            const v = typeof row[key] === "number" ? (row[key] as number) : 0;
            const frac = v / donutTotal;
            const dash = frac * CIRC;
            const offset = acc.length > 0 ? acc[acc.length - 1].offset + acc[acc.length - 1].dash : 0;
            acc.push({
              label: labelFor(row, i),
              value: formatValue(v),
              dash,
              gap: CIRC - dash,
              offset,
            });
            return acc;
          },
          [] as Array<{ label: string; value: string; dash: number; gap: number; offset: number }>,
        )
      : [],
  );

  const W = 400;
  const H = 160;
  const PADDING_X = 32;
  const PADDING_Y = 20;
  const PLOT_H = $derived(H - PADDING_Y - 20);

  const linePoints = $derived(
    rows.map((row, i) => {
      const v = typeof row[key] === "number" ? (row[key] as number) : 0;
      const x = PADDING_X + (i / Math.max(rows.length - 1, 1)) * (W - PADDING_X * 2);
      const y = PADDING_Y + (1 - (maxValue > 0 ? v / maxValue : 0)) * PLOT_H;
      return { x, y, label: labelFor(row, i) };
    }),
  );
  const linePath = $derived(linePoints.map((pt, i) => `${i === 0 ? "M" : "L"} ${pt.x} ${pt.y}`).join(" "));
  const areaPath = $derived(
    linePoints.length > 0
      ? `${linePath} L ${linePoints[linePoints.length - 1].x} ${H - 20} L ${linePoints[0].x} ${H - 20} Z`
      : "",
  );

  const segmentColors = [
    "var(--ds-accent)",
    "var(--ds-link)",
    "#22c55e",
    "#f59e0b",
    "#ef4444",
    "var(--ds-muted)",
    "#a78bfa",
    "#06b6d4",
  ];
</script>

<section class={`ds-chart palette-${palette} ${className}`} aria-label={ariaLabel || title || `${type} chart`}>
  {#if title}
    <h4>{title}</h4>
  {/if}

  {#if rows.length === 0}
    <p class="empty">No chart data provided.</p>
  {:else if type === "bar"}
    <div class="columns" data-axis={axis}>
      {#each rows as row, i (`bar-${i}`)}
        {@const raw = row[key]}
        {@const value = typeof raw === "number" ? raw : 0}
        {@const heightPct = maxValue > 0 ? (value / maxValue) * 100 : 0}
        <div class="col">
          <span class="value">{formatValue(value)}</span>
          <div class="fill-wrap"><div class="fill" style="height: {heightPct}%"></div></div>
          <span class="label">{labelFor(row, i)}</span>
        </div>
      {/each}
    </div>
  {:else if type === "donut"}
    {#if donutSegments.length === 0}
      <p class="empty">No chart data provided.</p>
    {:else}
      <div class="donut-wrap">
        <svg viewBox="0 0 160 160" role="img" aria-label={ariaLabel || title || "donut chart"}>
          <circle cx="80" cy="80" r={R} fill="none" stroke="var(--ds-border, rgba(255,255,255,0.2))" stroke-width="24" />
          {#each donutSegments as seg, i (i)}
            <circle
              cx="80"
              cy="80"
              r={R}
              fill="none"
              stroke={segmentColors[i % segmentColors.length]}
              stroke-width="24"
              stroke-dasharray="{seg.dash} {seg.gap}"
              stroke-dashoffset={-(seg.offset - CIRC * 0.25)}
            />
          {/each}
        </svg>
        <ul>
          {#each donutSegments as seg, i (i)}
            <li>
              <span class="swatch" style="background: {segmentColors[i % segmentColors.length]}"></span>
              <span class="seg-label">{seg.label}</span>
              <span class="seg-value">{seg.value}</span>
            </li>
          {/each}
        </ul>
      </div>
    {/if}
  {:else if type === "line" || type === "area"}
    <svg viewBox="0 0 {W} {H}" class="line" role="img" aria-label={ariaLabel || title || `${type} chart`}>
      {#if type === "area" && areaPath}
        <path d={areaPath} fill="var(--ds-accent)" fill-opacity="0.15" />
      {/if}
      <path d={linePath} fill="none" stroke="var(--ds-accent)" stroke-width="2" stroke-linejoin="round" />
      {#each linePoints as pt, i (i)}
        <circle cx={pt.x} cy={pt.y} r="3" fill="var(--ds-accent)" />
        <text x={pt.x} y={H - 4} text-anchor="middle" font-size="9" fill="var(--ds-muted)">{pt.label}</text>
      {/each}
    </svg>
  {:else}
    <div class="rows" data-axis={axis}>
      {#each rows as row, i (`row-${i}`)}
        {@const raw = row[key]}
        {@const value = typeof raw === "number" ? raw : 0}
        {@const width = maxValue > 0 ? (value / maxValue) * 100 : 0}
        <div class="row" style="--w:{width}%">
          <span class="label">{labelFor(row, i)}</span>
          <span class="bar"></span>
          <span class="value">{formatValue(value)}</span>
        </div>
      {/each}
    </div>
  {/if}

  {#if legend !== "hidden" && yKeys.length > 0}
    <p class="legend">Legend: {yKeys.join(", ")}</p>
  {/if}
</section>

<style>
  .ds-chart {
    border: 1px solid var(--ds-border, rgba(255, 255, 255, 0.2));
    border-radius: 12px;
    background: color-mix(in srgb, var(--ds-code-bg, rgba(255, 255, 255, 0.06)), transparent 45%);
    padding: 0.9rem;
    display: grid;
    gap: 0.7rem;
    text-align: left;
  }
  .empty,
  .legend {
    margin: 0;
    color: var(--ds-muted);
    font-size: 0.86em;
  }
  .columns {
    display: flex;
    align-items: flex-end;
    gap: 0.35rem;
    height: 120px;
  }
  .col {
    flex: 1;
    height: 100%;
    display: flex;
    flex-direction: column;
    gap: 0.2rem;
    align-items: center;
  }
  .fill-wrap {
    flex: 1;
    width: 100%;
    display: flex;
    align-items: flex-end;
  }
  .fill {
    width: 100%;
    min-height: 2px;
    border-radius: 6px 6px 0 0;
    background: linear-gradient(180deg, var(--ds-accent), color-mix(in srgb, var(--ds-accent), #000 30%));
  }
  .label,
  .value {
    font-size: 0.76em;
    color: var(--ds-muted);
    white-space: nowrap;
  }
  .donut-wrap {
    display: flex;
    gap: 0.8rem;
    align-items: center;
    flex-wrap: wrap;
  }
  .donut-wrap svg {
    width: 120px;
    height: 120px;
    flex-shrink: 0;
  }
  .donut-wrap ul {
    margin: 0;
    padding: 0;
    list-style: none;
    display: grid;
    gap: 0.28rem;
    min-width: 120px;
  }
  .donut-wrap li {
    display: flex;
    align-items: center;
    gap: 0.35rem;
    font-size: 0.8em;
  }
  .swatch {
    width: 8px;
    height: 8px;
    border-radius: 2px;
    flex-shrink: 0;
  }
  .seg-label {
    color: var(--ds-muted);
    flex: 1;
  }
  .line {
    width: 100%;
    height: auto;
    display: block;
  }
  .rows {
    display: grid;
    gap: 0.45rem;
  }
  .row {
    display: grid;
    grid-template-columns: minmax(80px, 1fr) 3fr auto;
    gap: 0.5rem;
    align-items: center;
  }
  .bar {
    position: relative;
    height: 10px;
    border-radius: 999px;
    background: color-mix(in srgb, var(--ds-border, rgba(255, 255, 255, 0.2)), transparent 40%);
    overflow: hidden;
  }
  .bar::after {
    content: "";
    position: absolute;
    inset: 0;
    width: var(--w);
    background: linear-gradient(90deg, var(--ds-accent), color-mix(in srgb, var(--ds-accent), #000 30%));
  }
</style>