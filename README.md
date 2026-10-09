# Mustafa Keleşoğlu — Portfolio

Source code of [mustafakelesoglu.de](https://mustafakelesoglu.de/en/), a multilingual developer portfolio.

**Live site:** [https://mustafakelesoglu.de/en/](https://mustafakelesoglu.de/en/)

## What is it?

A server-rendered website that presents client websites, full-stack product work and open-source tools in German (default), English and Turkish. It is written for companies looking for a website or web application, freelance clients, and recruiters and engineering teams.

## Technology

- Node.js 20+ and Express
- EJS templates, server-rendered routes per language (`/de/`, `/en/`, `/tr/`)
- Modern CSS with design tokens and modular vanilla JavaScript, no frontend framework
- `node:test` integration tests, ESLint, Prettier, Playwright browser flows
- Hosted as a Node.js application on Hostinger

## Local development

```bash
cp .env.example .env      # optional, the defaults work for local development
npm install
npm run dev               # http://localhost:3000 redirects to /de/
npm run check             # lint, format check and tests
```

Browser flows need a running server and Playwright with Chromium:

```bash
BASE_URL=http://localhost:3000 npm run test:e2e
```

No secrets are required to run the site. See `.env.example` for the available settings.

## Project structure

```
src/        Express app, routes, middleware, i18n, locales and structured content
views/      EJS pages and partials
public/     CSS, JavaScript modules, fonts and images
tests/      Integration tests (routes, i18n, metadata, contact, security)
scripts/    Playwright QA and share-image generation
docs/       Project brief, design decisions and asset checklist
```

## Project status

Live in production at [mustafakelesoglu.de](https://mustafakelesoglu.de/en/). Every push runs lint, format check, tests and browser flows in GitHub Actions.

## License

No license has been granted. All rights reserved.
