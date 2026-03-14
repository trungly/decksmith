import { type DeckConfig, type SlideInfo, type SlidePosition, DEFAULT_CONFIG } from '../types.js';

export class DeckState {
  // Core navigation state
  currentH = $state(0);
  currentV = $state(0);
  currentFragment = $state(-1);

  // UI state
  isOverview = $state(false);
  isPaused = $state(false);

  // Configuration
  config: DeckConfig = $state({ ...DEFAULT_CONFIG });

  // Slide registry: slides[h] = array of vertical slides at that horizontal index
  slides: SlideInfo[][] = $state([]);

  // Speaker notes for current slide
  currentNotes = $derived(this.getSlideAt(this.currentH, this.currentV)?.notes ?? '');

  // Total horizontal slide count
  totalHorizontal = $derived(this.slides.length);

  // Flat total of all slides
  totalSlides = $derived(
    this.slides.reduce((sum, col) => sum + col.length, 0)
  );

  // Linear index for progress calculation
  linearIndex = $derived(() => {
    let idx = 0;
    for (let h = 0; h < this.currentH && h < this.slides.length; h++) {
      idx += this.slides[h].length;
    }
    idx += this.currentV;
    return idx;
  });

  // Progress (0 to 1)
  progress = $derived(() => {
    const total = this.slides.reduce((sum, col) => sum + col.length, 0);
    if (total <= 1) return 0;
    let idx = 0;
    for (let h = 0; h < this.currentH && h < this.slides.length; h++) {
      idx += this.slides[h].length;
    }
    idx += this.currentV;
    return idx / (total - 1);
  });

  // Navigation availability
  canGoLeft = $derived(this.currentH > 0);
  canGoRight = $derived(this.currentH < this.slides.length - 1);
  canGoUp = $derived(this.currentV > 0);
  canGoDown = $derived(
    this.slides[this.currentH] !== undefined &&
    this.currentV < this.slides[this.currentH].length - 1
  );

  // Current slide fragment count
  currentFragmentCount = $derived(
    this.getSlideAt(this.currentH, this.currentV)?.fragmentCount ?? 0
  );

  getSlideAt(h: number, v: number): SlideInfo | undefined {
    return this.slides[h]?.[v];
  }

  registerSlide(info: SlideInfo) {
    const { h, v } = info;
    while (this.slides.length <= h) {
      this.slides.push([]);
    }
    while (this.slides[h].length <= v) {
      this.slides[h].push({ h: h, v: this.slides[h].length, fragmentCount: 0 });
    }
    this.slides[h][v] = info;
  }

  updateFragmentCount(h: number, v: number, count: number) {
    const slide = this.getSlideAt(h, v);
    if (slide) {
      slide.fragmentCount = count;
    }
  }

  updateNotes(h: number, v: number, notes: string) {
    const slide = this.getSlideAt(h, v);
    if (slide) {
      slide.notes = notes;
    }
  }

  // Navigation methods
  next() {
    // First advance through fragments
    if (this.currentFragment < this.currentFragmentCount - 1) {
      this.currentFragment++;
      return;
    }
    // Then try going down (vertical)
    if (this.canGoDown) {
      this.down();
      return;
    }
    // Then go right (next horizontal)
    if (this.canGoRight) {
      this.right();
      return;
    }
    // Loop if enabled
    if (this.config.loop && this.slides.length > 0) {
      this.goTo(0, 0);
    }
  }

  prev() {
    // First go back through fragments
    if (this.currentFragment >= 0) {
      this.currentFragment--;
      return;
    }
    // Then try going up (vertical)
    if (this.canGoUp) {
      this.up();
      return;
    }
    // Then go left (prev horizontal)
    if (this.canGoLeft) {
      this.left();
      // Go to last vertical slide and last fragment
      const col = this.slides[this.currentH];
      if (col && col.length > 1) {
        this.currentV = col.length - 1;
      }
      this.currentFragment = this.currentFragmentCount - 1;
      return;
    }
    // Loop if enabled
    if (this.config.loop && this.slides.length > 0) {
      const lastH = this.slides.length - 1;
      const lastV = this.slides[lastH].length - 1;
      this.goTo(lastH, lastV);
      this.currentFragment = this.currentFragmentCount - 1;
    }
  }

  left() {
    if (this.canGoLeft) {
      this.currentH--;
      this.currentV = 0;
      this.currentFragment = -1;
    }
  }

  right() {
    if (this.canGoRight) {
      this.currentH++;
      this.currentV = 0;
      this.currentFragment = -1;
    }
  }

  up() {
    if (this.canGoUp) {
      this.currentV--;
      this.currentFragment = -1;
    }
  }

  down() {
    if (this.canGoDown) {
      this.currentV++;
      this.currentFragment = -1;
    }
  }

  goTo(h: number, v: number = 0, f: number = -1) {
    if (h >= 0 && h < this.slides.length) {
      this.currentH = h;
      const col = this.slides[h];
      this.currentV = Math.min(v, col ? col.length - 1 : 0);
      this.currentFragment = f;
    }
  }

  toggleOverview() {
    if (this.config.overview) {
      this.isOverview = !this.isOverview;
    }
  }

  togglePause() {
    this.isPaused = !this.isPaused;
  }

  getPosition(): SlidePosition {
    return { h: this.currentH, v: this.currentV, f: this.currentFragment };
  }

  goToFirst() {
    this.goTo(0, 0);
  }

  goToLast() {
    if (this.slides.length > 0) {
      const lastH = this.slides.length - 1;
      const lastV = this.slides[lastH].length - 1;
      this.goTo(lastH, lastV);
    }
  }
}
