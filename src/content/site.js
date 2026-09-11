'use strict';

const config = require('../config');

/**
 * Global, language-independent facts about the site owner.
 * Only verified profile facts from docs/PORTFOLIO_MASTER_BRIEF.md belong here.
 */
module.exports = {
  name: 'Mustafa Keleşoğlu',
  givenName: 'Mustafa',
  familyName: 'Keleşoğlu',
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
  cvPath: config.cvPath,
  languages: [
    { code: 'tr', level: 'native' },
    { code: 'de', level: 'C1' },
    { code: 'en', level: 'B2' },
  ],
  // Owner-approved portrait is not available yet; the hero stays text-led.
  portrait: null,
  themeColor: { light: '#f5f7fa', dark: '#0b1220' },
};
