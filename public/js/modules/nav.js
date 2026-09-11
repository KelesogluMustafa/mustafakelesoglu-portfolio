// Mobile navigation: toggle, Escape to close, click outside, focus management, scroll state.
export function initNav() {
  const header = document.querySelector('[data-header]');
  const toggle = document.querySelector('[data-nav-toggle]');
  const nav = document.querySelector('[data-nav]');
  if (!toggle || !nav) return;

  const mq = window.matchMedia('(max-width: 56rem)');

  function setOpen(open) {
    nav.classList.toggle('is-open', open);
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open ? toggle.dataset.labelClose : toggle.dataset.labelOpen);
    document.body.style.overflow = open && mq.matches ? 'hidden' : '';
    if (open) {
      const first = nav.querySelector('a, button');
      if (first) first.focus({ preventScroll: true });
    }
  }

  toggle.addEventListener('click', () => setOpen(!nav.classList.contains('is-open')));

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && nav.classList.contains('is-open')) {
      setOpen(false);
      toggle.focus();
    }
  });

  document.addEventListener('click', (e) => {
    if (!nav.classList.contains('is-open')) return;
    if (nav.contains(e.target) || toggle.contains(e.target)) return;
    setOpen(false);
  });

  // Close when a link inside the menu is activated (same-page anchors) or on resize to desktop.
  nav.addEventListener('click', (e) => {
    if (e.target.closest('a') && mq.matches) setOpen(false);
  });
  mq.addEventListener('change', (e) => {
    if (!e.matches) setOpen(false);
  });

  // Border on scroll
  if (header) {
    const update = () => header.classList.toggle('is-scrolled', window.scrollY > 4);
    update();
    window.addEventListener('scroll', update, { passive: true });
  }
}
