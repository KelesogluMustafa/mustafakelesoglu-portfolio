// Static, truthful SaveFold preview: category filter + search over a handful of sample items.
export function initSaveFoldPreview() {
  const root = document.querySelector('[data-sf-preview]');
  if (!root) return;
  const cats = root.querySelectorAll('[data-sf-cat]');
  const items = root.querySelectorAll('[data-sf-item]');
  const search = root.querySelector('[data-sf-search]');
  const empty = root.querySelector('[data-sf-empty]');
  let category = 'all';
  let query = '';

  function apply() {
    let visible = 0;
    items.forEach((item) => {
      const matchCat = category === 'all' || item.dataset.sfCategory === category;
      const matchQuery = !query || item.textContent.toLowerCase().includes(query);
      const show = matchCat && matchQuery;
      item.hidden = !show;
      if (show) visible += 1;
    });
    if (empty) empty.hidden = visible > 0;
    cats.forEach((c) => c.setAttribute('aria-pressed', String(c.dataset.sfCat === category)));
  }

  cats.forEach((c) =>
    c.addEventListener('click', () => {
      category = c.dataset.sfCat;
      apply();
    }),
  );
  if (search) {
    search.addEventListener('input', () => {
      query = search.value.trim().toLowerCase();
      apply();
    });
  }
  apply();
}
