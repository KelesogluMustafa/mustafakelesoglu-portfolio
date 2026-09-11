// Project filter on the projects index. Progressive: without JS all groups are visible.
export function initFilters() {
  const bar = document.querySelector('[data-filter-bar]');
  if (!bar) return;
  const buttons = bar.querySelectorAll('[data-filter]');
  const groups = document.querySelectorAll('[data-project-group]');
  const count = document.querySelector('[data-filter-count]');
  const template = count ? count.dataset.template : '';

  function apply(value) {
    let visible = 0;
    groups.forEach((group) => {
      const show = value === 'all' || group.dataset.projectGroup === value;
      group.hidden = !show;
      if (show) visible += group.querySelectorAll('[data-project]').length;
    });
    buttons.forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.filter === value)));
    if (count) count.textContent = template.replace('{count}', String(visible));
    try {
      const url = new URL(window.location.href);
      if (value === 'all') url.searchParams.delete('filter');
      else url.searchParams.set('filter', value);
      history.replaceState(null, '', url);
    } catch {
      /* ignore */
    }
  }

  buttons.forEach((b) => b.addEventListener('click', () => apply(b.dataset.filter)));

  const initial = new URLSearchParams(window.location.search).get('filter');
  apply(initial === 'product' || initial === 'client' ? initial : 'all');
}
