<script lang="ts">
  import { onMount, tick } from "svelte";
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

  const defaultDeck = deckRegistry[0].key;
  const deckPickerButtonId = "deck-picker-toggle";
  const deckPickerSelectId = "deck-picker-select";

  function isDeckKey(value: string | null): value is DeckKey {
    return deckRegistry.some((deck) => deck.key === value);
  }

  function getDeckFromSearch(search: string): DeckKey | undefined {
    const deck = new URLSearchParams(search).get("deck");
    return isDeckKey(deck) ? deck : undefined;
  }

  let selectedDeck = $state<DeckKey>(
    typeof window === "undefined" ? defaultDeck : getDeckFromSearch(window.location.search) ?? defaultDeck,
  );
  let isDeckPickerOpen = $state(false);

  const DeckComponent = $derived(deckRegistry.find((d) => d.key === selectedDeck)?.component ?? deckRegistry[0].component);

  function syncDeckInUrl(deck: DeckKey) {
    const url = new URL(window.location.href);
    if (url.searchParams.get("deck") === deck) return;

    url.searchParams.set("deck", deck);
    window.history.replaceState(window.history.state, "", `${url.pathname}${url.search}${url.hash}`);
  }

  function focusDeckPickerButton() {
    const deckPickerButton = document.getElementById(deckPickerButtonId);
    if (deckPickerButton instanceof HTMLButtonElement) {
      deckPickerButton.focus();
    }
  }

  async function closeDeckPicker(restoreFocus = false) {
    isDeckPickerOpen = false;
    if (!restoreFocus) return;

    await tick();
    focusDeckPickerButton();
  }

  async function toggleDeckPicker() {
    if (isDeckPickerOpen) {
      await closeDeckPicker();
      return;
    }

    isDeckPickerOpen = true;
    await tick();
    const deckSelect = document.getElementById(deckPickerSelectId);
    if (deckSelect instanceof HTMLSelectElement) {
      deckSelect.focus();
    }
  }

  async function handleDeckChange(event: Event) {
    const nextDeck = (event.currentTarget as HTMLSelectElement).value;
    if (!isDeckKey(nextDeck)) return;

    selectedDeck = nextDeck;
    syncDeckInUrl(nextDeck);
    await closeDeckPicker(true);
  }

  function handleDeckPickerKeydown(event: KeyboardEvent) {
    if (event.key === "Escape") {
      event.preventDefault();
      void closeDeckPicker(true);
    }
  }

  onMount(() => {
    syncDeckInUrl(selectedDeck);
  });
</script>

<svelte:head>
  <title>Decksmith Presentation</title>
</svelte:head>

<div class="deck-selector">
  <button
    id={deckPickerButtonId}
    type="button"
    class="deck-picker-toggle"
    aria-label="Choose presentation deck"
    aria-expanded={isDeckPickerOpen}
    onclick={toggleDeckPicker}
  >
    Decks
  </button>

  {#if isDeckPickerOpen}
    <select
      id={deckPickerSelectId}
      value={selectedDeck}
      aria-label="Select presentation deck"
      onchange={handleDeckChange}
      onkeydown={handleDeckPickerKeydown}
    >
      {#each deckRegistry as deck (deck.key)}
        <option value={deck.key}>{deck.label}</option>
      {/each}
    </select>
  {/if}
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
    display: flex;
    align-items: center;
    gap: 6px;
  }
  .deck-selector button,
  .deck-selector select {
    font-size: 12px;
  }
  .deck-picker-toggle {
    background: #333;
    color: white;
    border: 1px solid #555;
    padding: 5px 8px;
    border-radius: 4px;
  }
  .deck-selector select {
    background: #333;
    color: white;
    border: 1px solid #555;
    padding: 5px;
  }
</style>
