'use strict';

const config = require('./config');
const { createApp } = require('./app');
const logger = require('./lib/logger');

const app = createApp();

const server = app.listen(config.port, config.host, () => {
  logger.info('server_started', { port: config.port, host: config.host, env: config.env });
});

function shutdown(signal) {
  logger.info('server_shutdown', { signal });
  server.close(() => process.exit(0));
  setTimeout(() => process.exit(1), 5000).unref();
}

process.on('SIGTERM', () => shutdown('SIGTERM'));
process.on('SIGINT', () => shutdown('SIGINT'));
