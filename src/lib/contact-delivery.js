'use strict';

const config = require('../config');
const logger = require('../lib/logger');

/**
 * Contact-form delivery abstraction.
 *
 * Production email delivery is intentionally NOT configured in this session (see
 * docs/DECISIONS.md and the stop conditions in the master brief). The default "log"
 * transport records that a valid request arrived, without personal data, and reports
 * `delivered: false` so the UI can tell the visitor honestly that delivery is not active.
 *
 * To activate real delivery later, implement a transport (for example SMTP via a provider)
 * behind CONTACT_TRANSPORT and return `{ delivered: true }` only after the provider
 * confirmed acceptance.
 */
async function deliver({ locale, values }) {
  const transport = config.contact.transport;

  if (transport === 'log') {
    logger.info('contact_request_received_not_delivered', {
      locale,
      projectType: values.projectType,
      budget: values.budget,
      messageLength: values.message.length,
      hasCompany: Boolean(values.company),
      hasWebsite: Boolean(values.website),
    });
    return { delivered: false, transport, to: config.contact.toAddress };
  }

  // Unknown or not-yet-implemented transports fail safely.
  const err = new Error(`Contact transport "${transport}" is not implemented`);
  err.status = 500;
  throw err;
}

module.exports = { deliver };
