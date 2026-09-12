'use strict';

const config = require('../config');

/**
 * Global, language-independent facts about the site owner.
 * Only verified profile facts from docs/PORTFOLIO_MASTER_BRIEF.md belong here.
 */
module.exports = {
  name: 'Mustafa Kelesoglu',
  givenName: 'Mustafa',
  familyName: 'Kelesoglu',
  domain: 'mustafakelesoglu.de',
  siteUrl: config.siteUrl,
  location: {
    city: 'Dinslaken',
    region: 'Nordrhein-Westfalen',
    regionShort: 'NRW',
    country: 'Deutschland',
    countryCode: 'DE',
  },
  email: config.contact.toAddress,
  github: config.social.github,
  linkedin: config.social.linkedin,
  // Proficiency levels are intentionally not published; order is display order.
  languages: [{ code: 'de' }, { code: 'en' }, { code: 'tr' }],
  // Owner-approved portrait is not available yet; the hero stays text-led.
  portrait: null,
  themeColor: { light: '#f5f7fa', dark: '#0b1220' },
};
