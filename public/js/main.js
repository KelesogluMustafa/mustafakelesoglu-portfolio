// Entry point. Native ES modules, no bundler. Each module is a no-op when its markup is absent.
import { initNav } from './modules/nav.js';
import { initTheme } from './modules/theme.js';
import { initReveal } from './modules/reveal.js';
import { initFilters } from './modules/filters.js';
import { initContactForm } from './modules/form.js';
import { initSaveFoldPreview } from './modules/savefold-preview.js';
import { initAuthorityLabDemo } from './modules/authoritylab-demo.js';

document.documentElement.classList.add('js');

initTheme();
initNav();
initReveal();
initFilters();
initContactForm();
initSaveFoldPreview();
initAuthorityLabDemo();
