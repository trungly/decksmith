<script lang="ts">
  type MediaKind = "image" | "video";

  interface Props {
    kind: MediaKind;
    src: string;
    alt?: string;
    caption?: string;
    aspectRatio?: string;
    objectFit?: "cover" | "contain";
    poster?: string;
    controls?: boolean;
    loop?: boolean;
    muted?: boolean;
    playsinline?: boolean;
    className?: string;
  }

  const {
    kind,
    src,
    alt = "",
    caption,
    aspectRatio = "16 / 9",
    objectFit = "contain",
    poster,
    controls = true,
    loop = false,
    muted = true,
    playsinline = true,
    className = "",
  }: Props = $props();
</script>

<figure class={`ds-media ${className}`.trim()}>
  <div
    class="ds-media-frame"
    style:aspect-ratio={aspectRatio}
    style:--ds-media-fit={objectFit}
  >
    {#if kind === "image"}
      <img {src} {alt} class="ds-media-asset" loading="lazy" decoding="async" />
    {:else}
      <video
        {src}
        class="ds-media-asset"
        {poster}
        {controls}
        {loop}
        {muted}
        {playsinline}
      ></video>
    {/if}
  </div>
  {#if caption}
    <figcaption class="ds-media-caption">{caption}</figcaption>
  {/if}
</figure>

<style>
  .ds-media {
    margin: 0;
    width: 100%;
    text-align: left;
    display: grid;
    gap: 0.45rem;
  }
  .ds-media-frame {
    width: 100%;
    border-radius: 10px;
    overflow: hidden;
    border: 1px solid var(--ds-border, rgba(255, 255, 255, 0.14));
    background: color-mix(in srgb, var(--ds-bg) 88%, var(--ds-fg) 12%);
    display: grid;
    place-items: center;
  }
  .ds-media-asset {
    width: 100%;
    height: 100%;
    object-fit: var(--ds-media-fit, contain);
    display: block;
  }
  .ds-media-caption {
    margin: 0;
    font-size: 0.85em;
    color: var(--ds-muted);
    line-height: var(--ds-line-height, 1.45);
  }
</style>
