import { useEffect } from "react";

// Adds .is-visible to every .nlf-reveal element when it scrolls into view (300 ms CSS
// transition, see index.css). No library. With prefers-reduced-motion the CSS shows
// everything at once, so this only toggles a class that has no visible effect.
export const useReveal = () => {
  useEffect(() => {
    const items = Array.from(document.querySelectorAll<HTMLElement>(".nlf-reveal:not(.is-visible)"));
    if (!("IntersectionObserver" in window)) {
      items.forEach((el) => el.classList.add("is-visible"));
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            io.unobserve(entry.target);
          }
        });
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0.1 },
    );
    items.forEach((el) => io.observe(el));
    return () => io.disconnect();
  });
};

// Counts up to a real number (from the statement) once; instant with reduced motion.
export const prefersReducedMotion = () =>
  typeof window !== "undefined" &&
  window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
