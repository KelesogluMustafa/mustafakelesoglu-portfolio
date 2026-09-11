'use strict';

/**
 * Flat ESLint config without extra packages: a focused subset of the recommended rules plus
 * explicit globals for Node (server, tests, scripts) and the browser (public/js).
 */
const coreRules = {
  'no-unused-vars': ['error', { argsIgnorePattern: '^_|^next$|^req$|^res$', caughtErrors: 'none' }],
  'no-undef': 'error',
  'no-unreachable': 'error',
  'no-dupe-keys': 'error',
  'no-duplicate-case': 'error',
  'no-unsafe-finally': 'error',
  'no-const-assign': 'error',
  'no-redeclare': 'error',
  'no-shadow-restricted-names': 'error',
  'no-var': 'error',
  'prefer-const': 'error',
  eqeqeq: ['error', 'always'],
  'no-implicit-globals': 'error',
  'no-eval': 'error',
  'no-implied-eval': 'error',
  'no-new-func': 'error',
  'no-debugger': 'error',
  'no-empty': ['error', { allowEmptyCatch: true }],
  'no-prototype-builtins': 'error',
  'no-self-assign': 'error',
  'no-sparse-arrays': 'error',
  'use-isnan': 'error',
  'valid-typeof': 'error',
  curly: ['error', 'multi-line'],
};

const nodeGlobals = {
  require: 'readonly',
  module: 'writable',
  exports: 'writable',
  process: 'readonly',
  __dirname: 'readonly',
  __filename: 'readonly',
  Buffer: 'readonly',
  console: 'readonly',
  setTimeout: 'readonly',
  clearTimeout: 'readonly',
  setInterval: 'readonly',
  clearInterval: 'readonly',
  fetch: 'readonly',
  URL: 'readonly',
  URLSearchParams: 'readonly',
};

const browserGlobals = {
  window: 'readonly',
  document: 'readonly',
  localStorage: 'readonly',
  history: 'readonly',
  navigator: 'readonly',
  IntersectionObserver: 'readonly',
  setTimeout: 'readonly',
  clearTimeout: 'readonly',
  URL: 'readonly',
  URLSearchParams: 'readonly',
  console: 'readonly',
};

module.exports = [
  { ignores: ['node_modules/**', 'qa/**', 'public/fonts/**', 'public/img/**'] },
  {
    files: ['src/**/*.js', 'tests/**/*.js', 'scripts/**/*.js', 'eslint.config.js'],
    languageOptions: { ecmaVersion: 2022, sourceType: 'commonjs', globals: nodeGlobals },
    rules: coreRules,
  },
  {
    files: ['public/js/**/*.js'],
    languageOptions: { ecmaVersion: 2022, sourceType: 'module', globals: browserGlobals },
    rules: coreRules,
  },
];
