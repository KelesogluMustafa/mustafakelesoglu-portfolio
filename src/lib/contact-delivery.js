'use strict';

const config = require('../config');
const logger = require('../lib/logger');
const nodemailer = require('nodemailer');

let smtpTransporter;

function assertSmtpConfig(smtp) {
  const missing = ['host', 'port', 'user', 'pass', 'from'].filter((key) => !smtp[key]);
  if (missing.length) {
    const err = new Error(`SMTP transport is not configured: missing ${missing.join(', ')}`);
    err.status = 500;
    throw err;
  }
}

function getSmtpTransporter() {
  if (smtpTransporter) return smtpTransporter;
  const smtp = config.contact.smtp;
  assertSmtpConfig(smtp);
  smtpTransporter = nodemailer.createTransport({
    host: smtp.host,
    port: smtp.port,
    secure: smtp.secure,
    auth: { user: smtp.user, pass: smtp.pass },
    connectionTimeout: 10000,
    greetingTimeout: 10000,
    socketTimeout: 20000,
  });
  return smtpTransporter;
}

function composeText(locale, values) {
  return [
    `Portfolio contact request (${locale})`,
    '',
    `Name: ${values.name}`,
    `Email: ${values.email}`,
    `Company: ${values.company || '—'}`,
    `Website: ${values.website || '—'}`,
    `Project type: ${values.projectType}`,
    `Budget: ${values.budget}`,
    `Target date: ${values.targetDate || '—'}`,
    '',
    'Message:',
    values.message,
  ].join('\n');
}

/**
 * Contact-form delivery abstraction.
 *
 * The default "log" transport records that a valid request arrived, without personal
 * data, and reports `delivered: false`. SMTP is implemented but stays disabled until
 * CONTACT_TRANSPORT=smtp and the mailbox credentials are configured in the host.
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

  if (transport === 'smtp') {
    const info = await getSmtpTransporter().sendMail({
      from: config.contact.smtp.from,
      to: config.contact.toAddress,
      replyTo: { name: values.name, address: values.email },
      subject: `[Portfolio] ${values.projectType}`,
      text: composeText(locale, values),
    });
    const delivered = Array.isArray(info.accepted) ? info.accepted.length > 0 : Boolean(info.messageId);
    if (!delivered) {
      const err = new Error('SMTP provider did not accept the contact request');
      err.status = 502;
      throw err;
    }
    return { delivered: true, transport, to: config.contact.toAddress, messageId: info.messageId || null };
  }

  // Unknown or not-yet-implemented transports fail safely.
  const err = new Error(`Contact transport "${transport}" is not implemented`);
  err.status = 500;
  throw err;
}

module.exports = { deliver, composeText, assertSmtpConfig };
