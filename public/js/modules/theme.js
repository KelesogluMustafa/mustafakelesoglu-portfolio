// Theme preference: system by default, explicit light/dark stored locally in the browser only.
const KEY = 'theme';

function read() {
  try {
    return localStorage.getItem(KEY);
  } catch {
    return null;
  }
}

function write(value) {
  try {
    if (value) localStorage.setItem(KEY, value);
    else localStorage.removeItem(KEY);
  } catch {
    /* storage unavailable: theme stays for this page only */
  }
}

function current() {
  const attr = document.documentElement.getAttribute('data-theme');
  if (attr === 'light' || attr === 'dark') return attr;
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

export function initTheme() {
  const button = document.querySelector('[data-theme-toggle]');
  if (!button) return;

  const stored = read();
  if (stored === 'light' || stored === 'dark') document.documentElement.setAttribute('data-theme', stored);

  button.addEventListener('click', () => {
    const next = current() === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', next);
    write(next);
  });
}
