'use strict';

const express = require('express');
const projects = require('../content/projects');
const services = require('../content/services');
const skills = require('../content/skills');
const site = require('../content/site');
const { buildMeta, personSchema, projectSchema, breadcrumbSchema } = require('../lib/seo');

const router = express.Router({ mergeParams: true });

function page(res, view, { pagePath, metaKey, extra = {}, structuredData, bodyClass, image, type, title, description }) {
  const dict = res.locals.dict;
  const pageMeta = metaKey ? dict.meta.pages[metaKey] : {};
  const meta = buildMeta({
    locale: res.locals.locale,
    pagePath,
    title: title || pageMeta.title,
    description: description || pageMeta.description,
    structuredData,
    image,
    type,
  });
  res.render(view, { meta, bodyClass: bodyClass || `page-${metaKey || 'generic'}`, pagePath, ...extra });
}

router.get('/', (req, res) => {
  const locale = res.locals.locale;
  const all = projects.allLocalized(locale);
  page(res, 'pages/home', {
    pagePath: '/',
    metaKey: 'home',
    bodyClass: 'page-home',
    structuredData: personSchema(locale),
    extra: {
      featured: all.filter((p) => p.featured),
      services: services.allLocalized(locale).slice(0, 7),
      skillGroups: skills.allLocalized(locale),
    },
  });
});

router.get('/projects', (req, res) => {
  const locale = res.locals.locale;
  const all = projects.allLocalized(locale);
  page(res, 'pages/projects', {
    pagePath: '/projects',
    metaKey: 'projects',
    structuredData: [
      breadcrumbSchema(locale, [
        { name: res.locals.dict.nav.home, path: '/' },
        { name: res.locals.dict.nav.projects, path: '/projects' },
      ]),
    ],
    extra: {
      groups: [
        { key: 'product', ...res.locals.dict.projects.groups.product, items: all.filter((p) => p.group === 'product') },
        { key: 'client', ...res.locals.dict.projects.groups.client, items: all.filter((p) => p.group === 'client') },
      ],
      allProjects: all,
    },
  });
});

router.get('/projects/:slug', (req, res, next) => {
  const locale = res.locals.locale;
  const raw = projects.bySlug(req.params.slug);
  if (!raw) return next();
  const project = projects.localized(raw, locale);
  const all = projects.allLocalized(locale);
  const index = all.findIndex((p) => p.slug === project.slug);
  const nextProject = all[(index + 1) % all.length];
  const relatedServices = services.allLocalized(locale).filter((s) => s.related.includes(project.slug));
  const dict = res.locals.dict;
  page(res, 'pages/project', {
    pagePath: `/projects/${project.slug}`,
    bodyClass: `page-project project-${project.slug}`,
    title: `${project.title} – ${dict.projects.eyebrow}`,
    description: project.tagline,
    type: 'article',
    image: `/img/og/${project.slug}.png`,
    structuredData: [
      ...projectSchema(project, locale),
      breadcrumbSchema(locale, [
        { name: dict.nav.home, path: '/' },
        { name: dict.nav.projects, path: '/projects' },
        { name: project.title, path: `/projects/${project.slug}` },
      ]),
    ],
    extra: { project, nextProject, relatedServices, preview: dict.projects.preview[project.slug] || null },
  });
});

router.get('/services', (req, res) => {
  const locale = res.locals.locale;
  const all = projects.allLocalized(locale);
  const list = services.allLocalized(locale).map((s) => ({
    ...s,
    relatedProjects: s.related.map((slug) => all.find((p) => p.slug === slug)).filter(Boolean),
  }));
  page(res, 'pages/services', {
    pagePath: '/services',
    metaKey: 'services',
    structuredData: [
      breadcrumbSchema(locale, [
        { name: res.locals.dict.nav.home, path: '/' },
        { name: res.locals.dict.nav.services, path: '/services' },
      ]),
      {
        '@context': 'https://schema.org',
        '@type': 'ItemList',
        itemListElement: list.map((s, i) => ({ '@type': 'ListItem', position: i + 1, name: s.title })),
      },
    ],
    extra: { services: list },
  });
});

router.get('/about', (req, res) => {
  page(res, 'pages/about', {
    pagePath: '/about',
    metaKey: 'about',
    structuredData: personSchema(res.locals.locale),
    extra: { skillGroups: skills.allLocalized(res.locals.locale) },
  });
});

router.get('/skills', (req, res) => {
  const locale = res.locals.locale;
  const all = projects.allLocalized(locale);
  page(res, 'pages/skills', {
    pagePath: '/skills',
    metaKey: 'skills',
    extra: { skillGroups: skills.allLocalized(locale), projects: all },
  });
});

router.get('/cv', (req, res) => {
  const locale = res.locals.locale;
  page(res, 'pages/cv', {
    pagePath: '/cv',
    metaKey: 'cv',
    extra: { skillGroups: skills.allLocalized(locale), projects: projects.allLocalized(locale), cvPath: site.cvPath },
  });
});

router.get('/imprint', (req, res) => {
  page(res, 'pages/imprint', { pagePath: '/imprint', metaKey: 'imprint' });
});

router.get('/privacy', (req, res) => {
  page(res, 'pages/privacy', { pagePath: '/privacy', metaKey: 'privacy' });
});

module.exports = router;
