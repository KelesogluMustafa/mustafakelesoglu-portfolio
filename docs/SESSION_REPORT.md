# Session report: initial build on `fable/initial-build`

Date: 2026-09-11. Autonomous session, owner away. Scope: GitHub Issue #1, `CLAUDE.md`, `docs/PORTFOLIO_MASTER_BRIEF.md`.

This is the historical report from the initial Fable build. The subsequent independent review is recorded in `docs/CODEX_REVIEW.md`. A later owner decision removed the CV route and download from the launch scope.

## Outcome in one paragraph

The multilingual portfolio is implemented end to end as an Express/EJS application: every route from the brief exists in German, English and Turkish with complete, natural copy; five case studies, services, about, skills, CV, contact, imprint, privacy, localized 404 and safe error pages; strict CSP and security defaults; sitemap, robots, hreflang, Open Graph, JSON-LD; 39 integration tests, 15 browser flows and a CI workflow, all green; responsive QA at five widths with zero horizontal overflow and zero console errors. What is not done, by design: deployment, DNS, email delivery, merge. What could not be done from this environment: the `git push` and the draft pull request (see "Git status" below), the `package-lock.json`, and screenshots of the live client sites.

## Pages completed (all in de / en / tr)

| Route                                                                            | Notes                                                                                                       |
| -------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------- |
| `/` → `/de/`                                                                     | Server-side 302, honours `Accept-Language` for en/tr, falls back to German                                  |
| `/{locale}/`                                                                     | Hero (approved German copy), evidence strip, featured work, services, process, security, about, skills, CTA |
| `/{locale}/projects`                                                             | Two groups (Software Products & Security Labs / Client Websites), filter with URL state                     |
| `/{locale}/projects/{savefold,authoritylab,pv-solar,bestfood-chur,verein-rhein}` | All eleven required sections; SaveFold static preview; AuthorityLab ALLOW/MODIFY/BLOCK/UNKNOWN demo         |
| `/{locale}/services`                                                             | Seven service groups, fit list, related case studies, explicit "no penetration testing" note                |
| `/{locale}/about`                                                                | Narrative, facts, working principles, profiles                                                              |
| `/{locale}/skills`                                                               | Grouped by use, evidence links to projects, no percentages                                                  |
| `/{locale}/contact`                                                              | Nine fields incl. consent; server validation, honeypot, timing check, rate limit; honest dev notice         |
| `/{locale}/imprint`, `/{locale}/privacy`                                         | § 5 DDG skeleton with visible address placeholder; GDPR privacy text incl. logs, form, local storage        |
| 404 / 500                                                                        | Localized via `Accept-Language`, `noindex`, no stack traces in production                                   |
| `/sitemap.xml`, `/robots.txt`, `/healthz`                                        | Sitemap with hreflang alternates for every page                                                             |

## Architecture

Express 4, EJS, modular CSS (12 files, linked from a manifest with content hashes), native ES modules for JavaScript (7 small modules), structured content in `src/content`, dictionaries in `src/locales`, no bundler, no database. Details and reasoning in `docs/DECISIONS.md`.

## Design

Navy / off-white / teal system with Manrope (self-hosted, subset). Text-led hero, technical fact sheets, numbered service index, alternating project rows, one dark band, restrained reveal motion, light and dark themes. Contrast of all text/background token pairs verified at 4.5:1 or better (light faint text darkened to reach it).

## Commits (local, on `fable/initial-build`)

```
e103206 feat: scaffold Express/EJS app with trilingual routing, content model and design system
7d14e1c test: add route, i18n, metadata, contact and security tests with lint, prettier and CI
(HEAD)  docs: add decisions, asset checklist, session report and README dev guide  — see git log for the hash
```

## Commands run

```bash
node -v                       # v22.22.2 (engines: >=20)
npm start / PORT=3210 node src/server.js
npm test                      # node --test (automatic test discovery)
npm run lint                  # eslint .
npm run format:check          # prettier --check
BASE_URL=http://127.0.0.1:3210 node scripts/screenshots.js <dir>
BASE_URL=http://127.0.0.1:3210 node scripts/e2e.js
node scripts/generate-images.js
```

Note: in this environment ESLint, Prettier and Playwright were run from global installs because the npm registry was not reachable; the `npm run` scripts are the equivalent commands for a normal machine.

## Test results

Unit/integration (`npm test`): **39 passed, 0 failed** across `routes`, `i18n`, `metadata`, `contact`, `security`.

Browser flows (`scripts/e2e.js`, Chromium): **15 passed, 0 failed**

1. Home opens in German with hero and skip link
2. Language switch keeps the page, changes `lang`
3. Projects list and filter (URL state)
4. Every project detail renders all sections; AuthorityLab demo and SaveFold preview react
5. Services → contact
6. Invalid form: client-side inline errors, focus on first invalid field; server answers 422
7. Valid development submission shows the "validated, not delivered" notice (no fake success)
8. Localized 404 with three recovery links
9. Mobile menu opens, `aria-expanded`, closes on Escape
10. Keyboard: skip link first, nav, language switch and theme toggle reachable, visible focus on every stop
11. Theme toggle switches and persists
12. `prefers-reduced-motion` disables reveal transitions
13. Labels, landmarks, alt text, heading order, `noopener` on external links
14. Mobile touch targets ≥ 36 px for primary controls (buttons are 44 px+)
15. No JavaScript or console errors

Lint: 0 problems. Prettier: all files formatted.

## Browser viewports checked

Full-page screenshots at **1440, 1024, 768, 390 and 360 px** for 14 URLs each (home in three languages, projects index, three project pages, services, about, skills, cv, contact, imprint, 404) plus the open mobile menu at 768/390/360. Automated checks: horizontal overflow = 0 px on every page and width; no failed requests; no console errors. Visual review of hero, featured work, project detail, contact form, projects index, mobile hero and mobile menu in light and dark theme.

Fixed during QA: CSP violations from inline `style` attributes (replaced with utility classes and a test that forbids them), hamburger icon geometry, nav label wrapping, fact-sheet label overflow on narrow screens, media-frame and preview widget overflow at 360/390 px, hero gradient edge, rate limiter counting static assets (moved after `express.static`), serve-static directory redirect loop, `aria-invalid` attribute rendering, `<a>` styling leaking into media frames.

## Security review (manual)

Helmet CSP (`default-src 'self'`, nonce for the single inline script, no `unsafe-inline`, `frame-ancestors 'none'`, `form-action 'self'`), HSTS in production, `Referrer-Policy`, `X-Content-Type-Options`, `X-Frame-Options`, `x-powered-by` removed, compression, `trust proxy` configurable. Contact: server-side validation and normalisation, control-character stripping, URL parsing, 32 KB body limit, honeypot + timestamp, 5 requests / 15 min per IP, escaped re-rendering (tested with a script payload), no personal data in logs, structured JSON logging, no secrets in the client, `.env.example` only. Error handling: central handler, localized page, stack traces only outside production. Dependency surface: six runtime packages, all current majors (`express@^4.21.2`, `ejs@^3.1.10`, `helmet@^8.1.0`, `express-rate-limit@^7.5.0`, `compression@^1.8.0`, `dotenv@^16.4.7`). `npm audit` could not run here (registry blocked) and should be run on the first install with network access.

## Accessibility review (manual + scripted)

Semantic landmarks, one `h1` per page (tested), logical heading order (tested), skip link, visible `:focus-visible` outline everywhere, keyboard-operable menu with Escape and focus management, `aria-expanded`/`aria-controls`, `aria-current` on nav and language switch, labelled form controls with `aria-describedby` hints and errors, error summary with links, `aria-invalid`, `aria-live` counters, `alt` on all images, external links announce "opens in a new tab", 44 px controls, `prefers-reduced-motion`, long German words wrap safely. Not run: an automated axe pass (package not available here); recommended as a follow-up.

## SEO review

Unique titles/descriptions (tested), canonical and hreflang cluster with `x-default` (tested), `Content-Language`, Open Graph/Twitter with generated images (tested), JSON-LD Person/WebSite/ProfessionalService/SoftwareApplication/BreadcrumbList/ItemList (tested), sitemap with alternates (tested), robots.txt, human-readable URLs, trailing-slash normalisation, `noindex` on error pages, no keyword stuffing.

## Missing real materials

See `docs/ASSET_CHECKLIST.md`: portrait, project screenshots (10 files), WOFF2 font, imprint street address, LinkedIn URL, confirmation of project years and of the GitHub profile URL, mailbox `info@mustafakelesoglu.de`.

## Known issues and limitations

- **The original session could not push or open a draft PR.** Its GitHub access was read-only for this repository ("not in this session's authorized repository set"), so its three commits existed only in the local clone. A bundle of the branch was handed to the owner in the chat as a fallback.
- A later Codex review generated and committed `package-lock.json`; `npm audit --audit-level=moderate` reports 0 vulnerabilities after a narrow `qs@6.16.0` override. See `docs/CODEX_REVIEW.md`.
- Font served as TTF (87 KB) instead of WOFF2 (~40 KB).
- The design-related skills named in the task were not available; equivalent checks were performed manually and with the scripts.
- `npm audit` and an axe-core pass are pending until a machine with registry access runs them.
- BestFood Chur still shows leftover template text on the live site; the case study mentions this neutrally and none of it was copied.

## Git status and exact next steps

Local branch `fable/initial-build` is three commits ahead of `origin/fable/initial-build`. To complete Issue #1:

1. From a machine with push rights:
   ```bash
   git fetch origin
   git checkout fable/initial-build
   # if the local clone from this session is not available, apply the bundle:
   #   git bundle verify fable-initial-build.bundle
   #   git pull fable-initial-build.bundle fable/initial-build
   git push origin fable/initial-build
   gh pr create --base main --head fable/initial-build --draft \
     --title "Initial multilingual portfolio build" \
     --body-file docs/SESSION_REPORT.md
   ```
2. Run `npm ci`, `npm audit`, `npm run check`, then `npm run test:e2e` against a local server; CI does the same.
3. Supply the assets from `docs/ASSET_CHECKLIST.md`; fill the imprint address; set `SOCIAL_LINKEDIN` when the profile URL is ready.
4. Activate the existing SMTP transport only after the `info@mustafakelesoglu.de` mailbox exists, and configure credentials only in the hosting environment.
5. Review copy in all three languages (claim level, project years), then approve the PR for merge and the Hostinger Node.js deployment (`npm ci && npm start`, `PORT` from the platform, `NODE_ENV=production`, `SITE_URL=https://mustafakelesoglu.de`, `TRUST_PROXY=1`).

## Stop conditions respected

No deployment, no DNS or domain change, no email provider configured, no purchases, no credentials created or used, no changes to SaveFold, AuthorityLab or the three client sites (read-only inspection only), no personal documents or private data published, no repository settings changed, no merge.
