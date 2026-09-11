'use strict';

const site = require('../content/site');
const { LOCALE_META, alternates, localePath, DEFAULT_LOCALE } = require('../i18n');

/**
 * Build the metadata object every page template receives.
 *
 * @param {object} opts
 * @param {string} opts.locale
 * @param {string} opts.pagePath   locale-free path, e.g. "/projects/savefold"
 * @param {string} opts.title      page title without suffix
 * @param {string} opts.description
 * @param {string} [opts.type]     Open Graph type
 * @param {string} [opts.image]    absolute or root-relative share image
 * @param {boolean} [opts.noindex]
 * @param {object[]} [opts.structuredData] array of JSON-LD objects
 */
function buildMeta(opts) {
  const { locale, pagePath, title, description, type = 'website', image, noindex = false, structuredData = [] } = opts;
  const dict = require('../i18n').getDictionary(locale);
  const fullTitle = pagePath === '/' ? `${title}${dict.meta.titleSuffix}` : `${title}${dict.meta.titleSuffix}`;
  const canonical = `${site.siteUrl}${localePath(locale, pagePath)}`;
  const alts = alternates(pagePath).map((a) => ({ ...a, href: `${site.siteUrl}${a.href}` }));
  const shareImage = image ? (image.startsWith('http') ? image : `${site.siteUrl}${image}`) : `${site.siteUrl}/img/og-default.png`;

  return {
    title: fullTitle,
    rawTitle: title,
    description,
    canonical,
    alternates: alts,
    xDefault: `${site.siteUrl}${localePath(DEFAULT_LOCALE, pagePath)}`,
    ogLocale: LOCALE_META[locale].ogLocale,
    ogAlternateLocales: alts.filter((a) => a.code !== locale).map((a) => a.ogLocale),
    type,
    image: shareImage,
    noindex,
    structuredData,
  };
}

/** Person + WebSite JSON-LD, used on the home page. */
function personSchema(locale) {
  const dict = require('../i18n').getDictionary(locale);
  const sameAs = [site.github, site.linkedin].filter(Boolean);
  return [
    {
      '@context': 'https://schema.org',
      '@type': 'Person',
      name: site.name,
      givenName: site.givenName,
      familyName: site.familyName,
      jobTitle: dict.meta.identity,
      description: dict.meta.positioning,
      url: `${site.siteUrl}${localePath(locale, '/')}`,
      email: `mailto:${site.email}`,
      address: {
        '@type': 'PostalAddress',
        addressLocality: site.location.city,
        addressRegion: site.location.region,
        addressCountry: site.location.countryCode,
      },
      knowsLanguage: ['tr', 'de', 'en'],
      knowsAbout: ['Web Development', 'WordPress', 'Elementor', 'WooCommerce', 'Node.js', 'Express', 'Web Security'],
      sameAs,
    },
    {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      name: site.name,
      url: site.siteUrl,
      inLanguage: ['de', 'en', 'tr'],
    },
    {
      '@context': 'https://schema.org',
      '@type': 'ProfessionalService',
      name: `${site.name} – Webentwicklung`,
      url: `${site.siteUrl}${localePath(locale, '/')}`,
      email: site.email,
      areaServed: ['Dinslaken', 'Duisburg', 'Nordrhein-Westfalen', 'Deutschland', 'Remote'],
      address: {
        '@type': 'PostalAddress',
        addressLocality: site.location.city,
        addressRegion: site.location.region,
        addressCountry: site.location.countryCode,
      },
      founder: { '@type': 'Person', name: site.name },
    },
  ];
}

/** CreativeWork / SoftwareApplication JSON-LD for a project detail page. */
function projectSchema(project, locale) {
  const base = {
    '@context': 'https://schema.org',
    '@type': project.group === 'product' ? 'SoftwareApplication' : 'WebSite',
    name: project.title,
    description: project.summary,
    author: { '@type': 'Person', name: site.name },
    inLanguage: locale,
  };
  if (project.liveUrl) base.url = project.liveUrl;
  if (project.group === 'product') {
    base.applicationCategory = project.slug === 'authoritylab' ? 'SecurityApplication' : 'WebApplication';
    base.operatingSystem = 'Web';
  }
  return [base];
}

/** BreadcrumbList JSON-LD. items: [{name, path}] with locale-free paths. */
function breadcrumbSchema(locale, items) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: `${site.siteUrl}${localePath(locale, item.path)}`,
    })),
  };
}

module.exports = { buildMeta, personSchema, projectSchema, breadcrumbSchema };
