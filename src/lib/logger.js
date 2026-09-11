'use strict';

const config = require('../config');

/**
 * Minimal structured logger. Writes one JSON line per event so hosting log viewers can
 * filter it. Callers must never pass personal data (names, emails, message bodies).
 */
function write(level, event, data) {
  if (config.isTest && level !== 'error') return;
  const line = JSON.stringify({ ts: new Date().toISOString(), level, event, ...data });
  if (level === 'error') process.stderr.write(line + '\n');
  else process.stdout.write(line + '\n');
}

module.exports = {
  info: (event, data = {}) => write('info', event, data),
  warn: (event, data = {}) => write('warn', event, data),
  error: (event, data = {}) => write('error', event, data),
};
