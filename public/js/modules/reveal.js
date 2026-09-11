// Restrained reveal-on-scroll. Respects prefers-reduced-motion and degrades to visible.
export function initReveal() {
  const groups = document.querySelectorAll('[data-reveal-group]');
  if (!groups.length) return;
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const items = [];
  groups.forEach((g) => items.push(...g.children));

  if (reduce || !('IntersectionObserver' in window)) {
    items.forEach((el) => el.classList.add('is-visible'));
    return;
  }

  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const el = entry.target;
        const siblings = Array.from(el.parentElement.children);
        const index = siblings.indexOf(el);
        el.style.transitionDelay = `${Math.min(index, 5) * 60}ms`;
        el.classList.add('is-visible');
        io.unobserve(el);
      });
    },
    { rootMargin: '0px 0px -8% 0px', threshold: 0.05 },
  );
  items.forEach((el) => io.observe(el));

  // Safety net: anything still hidden after 2.5s becomes visible (e.g. hidden groups).
  setTimeout(() => items.forEach((el) => el.classList.add('is-visible')), 2500);
}
