<script lang="ts">
  import StartupInvestorPitch from "./decks/startup-investor-pitch.svelte";
  import ExecutiveEnterpriseRoadmap from "./decks/executive-enterprise-roadmap.svelte";
  import TechnicalDesignReview from "./decks/technical-design-review.svelte";
  import EditorialStrategyMemo from "./decks/editorial-strategy-memo.svelte";
  import AirWorkshop from "./decks/air-workshop.svelte";
  import CinematicKeynote from "./decks/cinematic-keynote.svelte";
  import PlayfulClassroom from "./decks/playful-classroom.svelte";
  import ObsidianDevopsStrategy from "./decks/obsidian-devops-strategy.svelte";

  const deckRegistry = [
    { key: "startup", label: "Startup Investor Pitch (Startup Theme)", component: StartupInvestorPitch },
    { key: "executive", label: "Enterprise Roadmap (Executive Theme)", component: ExecutiveEnterpriseRoadmap },
    { key: "technical", label: "Technical Design Review (Technical Theme)", component: TechnicalDesignReview },
    { key: "editorial", label: "Internal Strategy Memo (Editorial Theme)", component: EditorialStrategyMemo },
    { key: "air", label: "Workshop Training (Air Theme)", component: AirWorkshop },
    { key: "cinematic", label: "Storytelling Keynote (Cinematic Theme)", component: CinematicKeynote },
    { key: "playful", label: "Educational Classroom (Playful Theme)", component: PlayfulClassroom },
    { key: "obsidian", label: "DevOps Strategy (Obsidian Theme)", component: ObsidianDevopsStrategy },
  ] as const;

  type DeckKey = (typeof deckRegistry)[number]["key"];
  let selectedDeck = $state<DeckKey>("startup");

  const DeckComponent = $derived(deckRegistry.find((d) => d.key === selectedDeck)?.component ?? deckRegistry[0].component);
</script>

<svelte:head>
  <title>Decksmith Presentation</title>
</svelte:head>

<div class="deck-selector">
  <select bind:value={selectedDeck} aria-label="Select presentation deck">
    {#each deckRegistry as deck (deck.key)}
      <option value={deck.key}>{deck.label}</option>
    {/each}
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
