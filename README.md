# mustafakelesoglu.de

Professional multilingual portfolio website for **Mustafa Keleşoğlu**.

The site presents client websites, full-stack product work, and security-focused software projects for three audiences:

- Companies looking for a website or web application
- Freelance clients
- Recruiters and engineering teams

## Production domain

[https://mustafakelesoglu.de](https://mustafakelesoglu.de)

## Planned stack

- Node.js 20+
- Express
- EJS
- Modern CSS
- Modular vanilla JavaScript
- Server-rendered multilingual routes
- Hostinger Node.js Application

## Languages

- German (default)
- English
- Turkish

## Featured work

- SaveFold — full-stack link capture and organization product
- AuthorityLab — security research and authorization analysis
- PV Solar GmbH — corporate WordPress/Elementor website
- BestFood Chur — restaurant and WooCommerce website
- Verein Rhein — association and community website

## Project status

Initial design and implementation phase. Production deployment and DNS changes are intentionally excluded until the implementation has been reviewed.

## Development

Read [CLAUDE.md](CLAUDE.md) and [docs/PORTFOLIO_MASTER_BRIEF.md](docs/PORTFOLIO_MASTER_BRIEF.md) before making changes. Decisions, missing assets and the last session report live in `docs/`.

```bash
cp .env.example .env      # optional, defaults work for local development
npm install
npm run dev               # http://localhost:3000 → redirects to /de/
npm test                  # route, i18n, metadata, contact and security tests
npm run lint && npm run format:check
npm run test:e2e          # browser flows (needs a running server, BASE_URL, Playwright + Chromium)
node scripts/screenshots.js qa/screenshots   # responsive screenshots at 1440/1024/768/390/360
```

### Structure

```
src/
  app.js            Express app factory (security, static, routers, errors)
  server.js         entry point
  config/           environment configuration
  i18n/             locale registry and helpers
  locales/          de.js, en.js, tr.js (UI and page copy)
  content/          site, projects, services, skills (structured, per-locale fields)
  lib/              seo, assets, contact validation/delivery, logger
  middleware/       locale resolution, security headers, error handling
  routes/           system (redirects, sitemap, robots), pages, contact
views/              EJS pages and partials
public/             css (tokens, base, layout, components, pages), js (ES modules), fonts, img
tests/              node:test integration tests
scripts/            Playwright QA (screenshots, e2e), share-image generator
docs/               brief, decisions, asset checklist, session report
```

### Environment

See `.env.example`. No secrets are required to run the site. Contact-form delivery stays in the honest `log` mode until a provider is approved.

## License

No license has been granted. All rights reserved.
