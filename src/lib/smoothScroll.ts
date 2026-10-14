"use client";

let lenisInstance: any = null;

export function setLenisInstance(instance: any) {
  lenisInstance = instance;
}

export function getLenisInstance() {
  return lenisInstance;
}

export function smoothScrollTo(
  target: HTMLElement | string, 
  headerClearance = 76, 
  duration = 900
) {
  if (typeof window === "undefined") return;

  // If scrolling to top / hero section
  if (target === "#about" || target === "#" || target === "top") {
    if (lenisInstance && typeof lenisInstance.scrollTo === "function") {
      try {
        lenisInstance.scrollTo(0, {
          duration: duration / 1000,
          easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        });
        return;
      } catch {
        // Fallback below
      }
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
    return;
  }

  const section = typeof target === "string" ? document.querySelector(target) : target;
  if (!section) return;

  // Find the primary heading element inside the section so the visual screen starts cleanly with the heading
  const heading = (section as HTMLElement).querySelector(
    "h2, [class*='uppercase tracking'], h1, h3, .section-heading"
  ) as HTMLElement | null;

  // Use the heading position if found, otherwise the section element itself
  const anchorElement = heading || (section as HTMLElement);

  const startY = window.pageYOffset || document.documentElement.scrollTop;
  const targetRect = anchorElement.getBoundingClientRect();
  const targetY = Math.max(0, startY + targetRect.top - headerClearance);
  const distance = targetY - startY;

  if (Math.abs(distance) < 2) return;

  // 1. If Lenis instance exists, scroll precisely to targetY
  if (lenisInstance && typeof lenisInstance.scrollTo === "function") {
    try {
      lenisInstance.scrollTo(targetY, {
        duration: duration / 1000,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      });
      return;
    } catch {
      // Fallback to RAF below if Lenis throws
    }
  }

  // 2. Buttery smooth cubic ease-in-out RAF scroll
  const startTime = performance.now();
  const easeInOutCubic = (t: number) =>
    t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

  function step(currentTime: number) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const ease = easeInOutCubic(progress);

    window.scrollTo(0, startY + distance * ease);

    if (progress < 1) {
      requestAnimationFrame(step);
    }
  }

  requestAnimationFrame(step);
}
