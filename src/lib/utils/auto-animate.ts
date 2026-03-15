/**
 * Auto-animate: FLIP animation between slides with matching data-id elements.
 *
 * When two consecutive slides both have autoAnimate enabled, elements with
 * matching `data-id` attributes are animated from their position in the
 * previous slide to their position in the next slide.
 */

interface ElementRect {
  x: number;
  y: number;
  width: number;
  height: number;
  opacity: string;
  transform: string;
  fontSize: string;
  color: string;
  backgroundColor: string;
  borderRadius: string;
}

function getRect(el: HTMLElement): ElementRect {
  const rect = el.getBoundingClientRect();
  const style = getComputedStyle(el);
  return {
    x: rect.left,
    y: rect.top,
    width: rect.width,
    height: rect.height,
    opacity: style.opacity,
    transform: style.transform,
    fontSize: style.fontSize,
    color: style.color,
    backgroundColor: style.backgroundColor,
    borderRadius: style.borderRadius,
  };
}

export function autoAnimate(
  fromSlide: HTMLElement,
  toSlide: HTMLElement,
  duration: number = 800,
): Animation[] {
  const animations: Animation[] = [];

  const fromElements = fromSlide.querySelectorAll<HTMLElement>("[data-id]");
  const toMap = new Map<string, HTMLElement>();

  toSlide.querySelectorAll<HTMLElement>("[data-id]").forEach((el) => {
    const id = el.getAttribute("data-id");
    if (id) toMap.set(id, el);
  });

  fromElements.forEach((fromEl) => {
    const id = fromEl.getAttribute("data-id");
    if (!id) return;
    const toEl = toMap.get(id);
    if (!toEl) return;

    const first = getRect(fromEl);
    const last = getRect(toEl);

    // FLIP: calculate the inversion
    const dx = first.x - last.x;
    const dy = first.y - last.y;
    const sw = first.width / (last.width || 1);
    const sh = first.height / (last.height || 1);

    const keyframes: Keyframe[] = [
      {
        transform: `translate(${dx}px, ${dy}px) scale(${sw}, ${sh})`,
        fontSize: first.fontSize,
        color: first.color,
        backgroundColor: first.backgroundColor,
        borderRadius: first.borderRadius,
        opacity: first.opacity,
      },
      {
        transform: "translate(0, 0) scale(1, 1)",
        fontSize: last.fontSize,
        color: last.color,
        backgroundColor: last.backgroundColor,
        borderRadius: last.borderRadius,
        opacity: last.opacity,
      },
    ];

    const anim = toEl.animate(keyframes, {
      duration,
      easing: "cubic-bezier(0.25, 0.1, 0.25, 1)",
      fill: "backwards",
    });

    animations.push(anim);
  });

  return animations;
}
