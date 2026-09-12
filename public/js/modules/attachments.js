// Optional multi-file attachment picker for the contact form.
// Purely a UX layer: the server re-validates count, combined size, extension and content on
// every submission regardless of what happens here (see src/lib/contact-validation.js).
export function initAttachments() {
  const form = document.querySelector('[data-contact-form]');
  const input = document.querySelector('[data-attachments-input]');
  if (!form || !input) return;

  const messages = JSON.parse(form.dataset.messages || '{}');
  const maxFiles = Number.parseInt(input.dataset.maxFiles || '5', 10);
  const maxTotalBytes = Number.parseInt(input.dataset.maxTotalBytes || String(10 * 1024 * 1024), 10);
  const allowedExtensions = (input.dataset.allowedExtensions || '')
    .split(',')
    .map((ext) => ext.trim().toLowerCase())
    .filter(Boolean);
  const countTemplate = input.dataset.countTemplate || '{count} / {max}';
  const totalTemplate = input.dataset.totalTemplate || '{size} / {max}';
  const removeTemplate = input.dataset.removeTemplate || 'Remove {name}';

  const wrapper = input.closest('.field');
  const list = form.querySelector('[data-attachment-list]');
  const summary = form.querySelector('[data-attachment-summary]');
  const errorEl = wrapper ? wrapper.querySelector('.field__error') : null;

  // Kept in JS (not just input.files) so a file can be removed individually and further
  // files can be added afterwards without the browser clearing the previous selection.
  const files = [];

  function extensionOf(name) {
    const match = /\.[a-z0-9]+$/i.exec(name || '');
    return match ? match[0].toLowerCase() : '';
  }

  function formatBytes(bytes) {
    if (bytes >= 1024 * 1024) return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
    if (bytes >= 1024) return `${Math.round(bytes / 1024)} KB`;
    return `${bytes} B`;
  }

  function totalBytes() {
    return files.reduce((sum, f) => sum + f.size, 0);
  }

  function setError(key) {
    if (!errorEl) return;
    errorEl.textContent = key ? messages[key] || '' : '';
    if (wrapper) wrapper.classList.toggle('is-invalid', Boolean(key));
    input.setAttribute('aria-invalid', String(Boolean(key)));
  }

  /** Client-side mirror of the server rules; returns an error key or null. */
  function validate() {
    if (files.length > maxFiles) return 'attachmentsCount';
    if (totalBytes() > maxTotalBytes) return 'attachmentsSize';
    if (allowedExtensions.length && files.some((f) => !allowedExtensions.includes(extensionOf(f.name)))) {
      return 'attachmentsType';
    }
    return null;
  }

  /** Rebuilds input.files from the current `files` array via a DataTransfer buffer. */
  function syncInput() {
    const dt = new DataTransfer();
    files.forEach((f) => dt.items.add(f));
    input.files = dt.files;
  }

  function render() {
    if (!list || !summary) return;

    list.innerHTML = '';
    files.forEach((file, index) => {
      const item = document.createElement('li');
      item.className = 'attachment-list__item';

      const name = document.createElement('span');
      name.className = 'attachment-list__name';
      name.textContent = file.name;

      const size = document.createElement('span');
      size.className = 'attachment-list__size';
      size.textContent = formatBytes(file.size);

      const remove = document.createElement('button');
      remove.type = 'button';
      remove.className = 'attachment-list__remove';
      remove.setAttribute('aria-label', removeTemplate.replace('{name}', file.name));
      remove.dataset.index = String(index);
      remove.textContent = '×';

      item.append(name, size, remove);
      list.append(item);
    });
    list.hidden = files.length === 0;

    if (files.length > 0) {
      const countText = countTemplate.replace('{count}', String(files.length)).replace('{max}', String(maxFiles));
      const totalText = totalTemplate
        .replace('{size}', formatBytes(totalBytes()))
        .replace('{max}', formatBytes(maxTotalBytes));
      summary.textContent = `${countText} · ${totalText}`;
      summary.hidden = false;
    } else {
      summary.textContent = '';
      summary.hidden = true;
    }

    setError(validate());
  }

  if (list) {
    list.addEventListener('click', (e) => {
      const button = e.target.closest('[data-index]');
      if (!button) return;
      const index = Number.parseInt(button.dataset.index, 10);
      files.splice(index, 1);
      syncInput();
      render();
    });
  }

  input.addEventListener('change', () => {
    const incoming = Array.from(input.files || []);
    // Merge rather than replace, so choosing files in two steps keeps both selections.
    const seen = new Set(files.map((f) => `${f.name}:${f.size}:${f.lastModified}`));
    incoming.forEach((f) => {
      const key = `${f.name}:${f.size}:${f.lastModified}`;
      if (!seen.has(key)) {
        files.push(f);
        seen.add(key);
      }
    });
    syncInput();
    render();
  });

  form.addEventListener('submit', (e) => {
    const errorKey = validate();
    if (errorKey) {
      e.preventDefault();
      setError(errorKey);
      input.focus();
    }
  });
}
