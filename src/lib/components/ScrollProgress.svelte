<script lang="ts">
  interface Props {
    value?: number;
  }

  const { value = 0 }: Props = $props();
</script>

<div class="scroll-progress">
  <div class="scroll-progress-bar" style="height: {value * 100}%"></div>
</div>

<style>
  .scroll-progress {
    position: fixed;
    top: 0;
    right: 0;
    width: 3px;
    height: 100vh;
    z-index: 30;
    background: rgba(255, 255, 255, 0.1);
  }

  .scroll-progress-bar {
    width: 100%;
    background: var(--ds-accent, #42affa);
    transition: height 0.1s ease;
  }
</style>
