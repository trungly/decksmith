<script lang="ts">
  import StartupInvestorPitch from "./decks/startup-investor-pitch.svelte";
  import ExecutiveEnterpriseRoadmap from "./decks/executive-enterprise-roadmap.svelte";
  import TechnicalDesignReview from "./decks/technical-design-review.svelte";
  import EditorialStrategyMemo from "./decks/editorial-strategy-memo.svelte";
  import AirWorkshop from "./decks/air-workshop.svelte";
  import CinematicKeynote from "./decks/cinematic-keynote.svelte";
  import PlayfulClassroom from "./decks/playful-classroom.svelte";
  import ObsidianDevopsStrategy from "./decks/obsidian-devops-strategy.svelte";

  const decks = {
    startup: StartupInvestorPitch,
    executive: ExecutiveEnterpriseRoadmap,
    technical: TechnicalDesignReview,
    editorial: EditorialStrategyMemo,
    air: AirWorkshop,
    cinematic: CinematicKeynote,
    playful: PlayfulClassroom,
    obsidian: ObsidianDevopsStrategy,
  } as const;

  type DeckKey = keyof typeof decks;
  let selectedDeck = $state<DeckKey>("startup");

  const DeckComponent = $derived(decks[selectedDeck]);
</script>

<svelte:head>
  <title>Decksmith Presentation</title>
</svelte:head>

<div class="deck-selector">
  <select bind:value={selectedDeck}>
    <option value="startup">Startup Investor Pitch (Startup Theme)</option>
    <option value="executive">Enterprise Roadmap (Executive Theme)</option>
    <option value="technical">Technical Design Review (Technical Theme)</option>
    <option value="editorial">Internal Strategy Memo (Editorial Theme)</option>
    <option value="air">Workshop Training (Air Theme)</option>
    <option value="cinematic">Storytelling Keynote (Cinematic Theme)</option>
    <option value="playful">Educational Classroom (Playful Theme)</option>
    <option value="obsidian">DevOps Strategy (Obsidian Theme)</option>
  </select>
</div>

{#key selectedDeck}
  <DeckComponent />
{/key}

<style>
  .deck-selector {
    position: fixed;
    top: 10px;
    right: 10px;
    z-index: 9999;
    background: rgba(0, 0, 0, 0.5);
    padding: 5px;
    border-radius: 4px;
  }
  .deck-selector select {
    background: #333;
    color: white;
    border: 1px solid #555;
    padding: 5px;
    font-size: 12px;
  }
</style>
