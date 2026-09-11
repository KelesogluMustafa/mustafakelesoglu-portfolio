'use strict';

/**
 * Skills grouped by practical use. No percentages, no skill bars.
 * Only technologies backed by project or profile evidence (master brief §11).
 */
const groups = [
  {
    key: 'frontend',
    items: ['HTML', 'CSS', 'JavaScript', 'Responsive Design', 'Accessibility'],
    i18n: {
      de: {
        title: 'Frontend',
        text: 'Semantisches HTML, modernes CSS und modulares JavaScript ohne schwere Frameworks, wenn sie nicht nötig sind.',
      },
      en: {
        title: 'Frontend',
        text: 'Semantic HTML, modern CSS and modular JavaScript, without heavy frameworks when they are not needed.',
      },
      tr: { title: 'Frontend', text: 'Semantik HTML, modern CSS ve gerekmedikçe ağır framework kullanmayan modüler JavaScript.' },
    },
  },
  {
    key: 'cms',
    items: ['WordPress', 'Elementor', 'WooCommerce', 'Migration'],
    i18n: {
      de: { title: 'CMS', text: 'WordPress-Websites, die Kunden selbst pflegen können, inklusive Shop und Umzug.' },
      en: { title: 'CMS', text: 'WordPress websites clients can maintain themselves, including shop and migration.' },
      tr: { title: 'CMS', text: 'Müşterilerin kendi yönetebildiği WordPress siteleri; mağaza ve taşıma dâhil.' },
    },
  },
  {
    key: 'backend',
    items: ['Node.js', 'Express', 'EJS', 'REST APIs', 'Authentication'],
    i18n: {
      de: {
        title: 'Backend / API',
        text: 'Serverseitig gerenderte Anwendungen mit sauberer Routen-Struktur, Validierung und Authentifizierung.',
      },
      en: { title: 'Backend / API', text: 'Server-rendered applications with a clean route structure, validation and authentication.' },
      tr: {
        title: 'Backend / API',
        text: 'Temiz rota yapısı, doğrulama ve kimlik doğrulama ile sunucu tarafında render edilen uygulamalar.',
      },
    },
  },
  {
    key: 'data',
    items: ['MySQL', 'MariaDB'],
    i18n: {
      de: { title: 'Daten', text: 'Relationale Datenmodelle, Migrationen und sichere Abfragen.' },
      en: { title: 'Data', text: 'Relational data models, migrations and safe queries.' },
      tr: { title: 'Veri', text: 'İlişkisel veri modelleri, migration’lar ve güvenli sorgular.' },
    },
  },
  {
    key: 'security',
    items: ['Secure Coding', 'Access Control', 'CSP / Security Headers', 'Validation', 'Logging', 'SOC / SIEM Fundamentals'],
    i18n: {
      de: { title: 'Sicherheit', text: 'Sichere Entwicklungsmuster und Grundlagen aus SOC, SIEM, Log-Analyse und Systemsicherheit.' },
      en: { title: 'Security', text: 'Secure development patterns and fundamentals from SOC, SIEM, log analysis and system security.' },
      tr: { title: 'Güvenlik', text: 'Güvenli geliştirme desenleri ile SOC, SIEM, log analizi ve sistem güvenliği temelleri.' },
    },
  },
  {
    key: 'delivery',
    items: ['Git', 'GitHub', 'CI/CD', 'Hostinger'],
    i18n: {
      de: { title: 'Auslieferung', text: 'Versionierung, automatisierte Prüfungen und wiederholbare Deployments.' },
      en: { title: 'Delivery', text: 'Version control, automated checks and repeatable deployments.' },
      tr: { title: 'Teslimat', text: 'Sürüm kontrolü, otomatik kontroller ve tekrarlanabilir deployment.' },
    },
  },
  {
    key: 'engineering',
    items: ['Analytical Problem Solving', 'Technical Project Work'],
    i18n: {
      de: {
        title: 'Ingenieurhintergrund',
        text: 'Maschinenbau-Studium: strukturiertes Denken, Dokumentation und technische Projektarbeit.',
      },
      en: {
        title: 'Engineering background',
        text: 'Mechanical engineering degree: structured thinking, documentation and technical project work.',
      },
      tr: {
        title: 'Mühendislik altyapısı',
        text: 'Makine mühendisliği eğitimi: yapılandırılmış düşünme, dokümantasyon ve teknik proje çalışması.',
      },
    },
  },
];

function allLocalized(locale) {
  return groups.map((g) => ({ key: g.key, items: g.items, ...(g.i18n[locale] || g.i18n.de) }));
}

module.exports = { groups, allLocalized };
