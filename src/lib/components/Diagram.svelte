<script lang="ts">
  type DiagramType =
    | "flow"
    | "timeline"
    | "hierarchy"
    | "comparison"
    | "matrix"
    | "pyramid";

  type DiagramLayout = "horizontal" | "vertical" | "auto";
  type DiagramDensity = "compact" | "normal" | "roomy";
  type DiagramEmphasis = "neutral" | "info" | "success" | "warning" | "danger";

  interface DiagramNode {
    id: string;
    label: string;
    detail?: string;
    icon?: string;
    group?: string;
    value?: number | string;
    children?: DiagramNode[];
  }

  interface DiagramEdge {
    from: string;
    to: string;
    label?: string;
    kind?: "solid" | "dashed" | "arrow";
  }

  interface Props {
    type: DiagramType;
    title?: string;
    nodes?: DiagramNode[];
    edges?: DiagramEdge[];
    layout?: DiagramLayout;
    density?: DiagramDensity;
    emphasis?: DiagramEmphasis;
    className?: string;
    ariaLabel?: string;
  }

  const {
    type,
    title,
    nodes = [],
    layout = "auto",
    density = "normal",
    emphasis = "neutral",
    className = "",
    ariaLabel,
  }: Props = $props();

  const hasNodes = $derived(nodes.length > 0);
  const flowLayout = $derived(
    layout === "auto"
      ? nodes.length <= 5
        ? "horizontal"
        : "vertical"
      : layout,
  );
  const pyramidNodes = $derived([...nodes].reverse());
</script>

<section
  class={`ds-diagram type-${type} density-${density} emphasis-${emphasis} ${className}`}
  aria-label={ariaLabel || title || `${type} diagram`}
>
  {#if title}
    <h4>{title}</h4>
  {/if}

  {#if !hasNodes}
    <p class="empty">No diagram data provided.</p>
  {:else if type === "flow"}
    <div class="flow" class:vertical={flowLayout === "vertical"}>
      {#each nodes as node, i (node.id)}
        <div class="flow-item">
          <div class="node">
            <span class="step">{i + 1}</span>
            <strong>{node.label}</strong>
            {#if node.detail}
              <p>{node.detail}</p>
            {/if}
          </div>
          {#if i < nodes.length - 1}
            <span class="arrow">{flowLayout === "vertical" ? "↓" : "→"}</span>
          {/if}
        </div>
      {/each}
    </div>
  {:else if type === "timeline"}
    <ol class="timeline">
      {#each nodes as node (node.id)}
        <li>
          <div class="dot"></div>
          <div class="node-copy">
            <strong>{node.label}</strong>
            {#if node.detail}
              <p>{node.detail}</p>
            {/if}
          </div>
        </li>
      {/each}
    </ol>
  {:else if type === "hierarchy"}
    <ul class="tree">
      {#each nodes as node (node.id)}
        <li>
          <div class="node-line">
            <span class="mini-dot"></span>
            <strong>{node.label}</strong>
            {#if node.detail}<span class="detail">{node.detail}</span>{/if}
          </div>
          {#if node.children && node.children.length > 0}
            <ul class="children">
              {#each node.children as child (child.id)}
                <li>
                  <div class="node-line">
                    <span class="mini-dot"></span>
                    <strong>{child.label}</strong>
                    {#if child.detail}<span class="detail">{child.detail}</span
                      >{/if}
                  </div>
                </li>
              {/each}
            </ul>
          {/if}
        </li>
      {/each}
    </ul>
  {:else if type === "pyramid"}
    <div class="pyramid">
      {#each pyramidNodes as node, i (node.id)}
        {@const widthPct = 40 + (i / Math.max(pyramidNodes.length - 1, 1)) * 60}
        <div class="band" style="width: {widthPct}%">
          <strong>{node.label}</strong>
          {#if node.detail}<span>{node.detail}</span>{/if}
        </div>
      {/each}
    </div>
  {:else}
    <div class="grid" class:comparison={type === "comparison"}>
      {#each nodes as node (node.id)}
        <article class="node-card">
          <strong>{node.label}</strong>
          {#if node.detail}
            <p>{node.detail}</p>
          {/if}
        </article>
      {/each}
    </div>
  {/if}
</section>

<style>
  .ds-diagram {
    border: 1px solid var(--ds-border, rgba(255, 255, 255, 0.2));
    border-radius: 12px;
    background: color-mix(
      in srgb,
      var(--ds-code-bg, rgba(255, 255, 255, 0.06)),
      transparent 45%
    );
    padding: 0.9rem;
    display: grid;
    gap: 0.7rem;
    text-align: left;
  }
  h4,
  p {
    margin: 0;
  }
  .empty,
  .detail,
  .node p,
  .node-copy p,
  .band span {
    font-size: 0.82em;
    color: var(--ds-muted);
  }
  .flow {
    display: flex;
    gap: 0.45rem;
    flex-wrap: wrap;
  }
  .flow.vertical {
    flex-direction: column;
  }
  .flow-item {
    display: flex;
    align-items: center;
    gap: 0.45rem;
  }
  .flow.vertical .flow-item {
    flex-direction: column;
    align-items: flex-start;
  }
  .node {
    border: 1px solid var(--ds-border, rgba(255, 255, 255, 0.2));
    border-radius: 8px;
    padding: 0.45rem 0.55rem;
    min-width: 100px;
    display: grid;
    gap: 0.2rem;
  }
  .step {
    font-size: 0.72em;
    font-weight: 700;
    color: var(--ds-accent);
  }
  .timeline {
    list-style: none;
    margin: 0;
    padding: 0 0 0 0.9rem;
    border-left: 2px solid var(--ds-border, rgba(255, 255, 255, 0.2));
    display: grid;
    gap: 0.7rem;
  }
  .timeline li {
    position: relative;
  }
  .dot {
    position: absolute;
    left: -1.2rem;
    top: 0.36rem;
    width: 8px;
    height: 8px;
    border-radius: 999px;
    background: var(--ds-accent);
  }
  .tree,
  .children {
    list-style: none;
    margin: 0;
    padding: 0;
    display: grid;
    gap: 0.45rem;
  }
  .children {
    margin-left: 0.9rem;
    padding-left: 0.7rem;
    border-left: 1px dashed var(--ds-border, rgba(255, 255, 255, 0.2));
  }
  .node-line {
    display: flex;
    align-items: baseline;
    gap: 0.35rem;
  }
  .mini-dot {
    width: 6px;
    height: 6px;
    border-radius: 999px;
    background: var(--ds-muted);
  }
  .pyramid {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.3rem;
  }
  .band {
    border: 1px solid var(--ds-border, rgba(255, 255, 255, 0.2));
    border-radius: 8px;
    padding: 0.32rem 0.55rem;
    text-align: center;
    display: grid;
    gap: 0.1rem;
  }
  .grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
    gap: 0.55rem;
  }
  .grid.comparison {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
  .node-card {
    border: 1px solid var(--ds-border, rgba(255, 255, 255, 0.2));
    border-radius: 8px;
    padding: 0.5rem;
    display: grid;
    gap: 0.25rem;
  }
  .node-card p {
    font-size: 0.88em;
    color: var(--ds-muted);
  }
  .density-compact {
    padding: 0.65rem;
  }
  .density-roomy {
    padding: 1.2rem;
  }
  .emphasis-info {
    border-color: color-mix(in srgb, var(--ds-link), transparent 50%);
  }
  .emphasis-success {
    border-color: color-mix(in srgb, #22c55e, transparent 45%);
  }
  .emphasis-warning {
    border-color: color-mix(in srgb, #f59e0b, transparent 45%);
  }
  .emphasis-danger {
    border-color: color-mix(in srgb, #ef4444, transparent 45%);
  }
</style>
