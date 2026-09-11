# Decisions

Record of the choices made during the autonomous build session on `fable/initial-build`. The master brief and `CLAUDE.md` stay authoritative; this file explains how they were applied where the brief left room.

## Architecture

**Express 4 + EJS, server-rendered, no build step.** `src/app.js` builds the app (`createApp()`), `src/server.js` listens. Every page lives under `/:locale/...` and is handled by one locale router that resolves the dictionary, exposes template helpers (`t`, `url`, `dict`, `nav`) and sets `Content-Language`. Root `/` is a server-side 302 to `/de/` (or `/en/`, `/tr/` when `Accept-Language` clearly prefers them); `/de` without slash is a 301 to `/de/`; inner paths with trailing slashes 301 to the slash-less form so there is one canonical URL per page.

**Content model.** Structured content (`src/content/projects.js`, `services.js`, `skills.js`, `site.js`) is language-independent data with an `i18n` block per entry. UI copy and long-form page copy live in `src/locales/{de,en,tr}.js`. A test asserts that the three dictionaries have identical key structures, so a missing translation fails CI instead of showing another language on the page.

**Assets without a bundler.** CSS is split into small modules (tokens, base, layout, components, pages) and linked in order from a manifest in `src/lib/assets.js`; JavaScript ships as native ES modules (`public/js/main.js` imports `modules/*`). Every asset URL carries a content hash (`?v=`) so long cache lifetimes are safe. This keeps the Hostinger deployment to `npm install && npm start`. If the module count ever hurts performance, a concatenation step can be added later without changing the source layout.

**No database.** The site has no state to persist. Contact requests are validated and logged (without personal data) until a delivery provider is approved.

**Vendored dependencies during the initial session.** The original build environment had no access to the npm registry. Runtime dependencies (`express`, `ejs`, `helmet`, `express-rate-limit`, `compression`, `dotenv` and their trees) were fetched from their GitHub release tags or the local npm cache for testing only; nothing vendored was committed. A later Codex review completed a normal install, generated `package-lock.json`, and recorded the result in `docs/CODEX_REVIEW.md`.

## Design direction

**Concept: "technical spec sheet, not a landing-page template".** The visual system leans on strong typography, hairline rules, a numbered service index and fact sheets styled like technical data sheets. Cards are used only where a bounded object is being shown (a project media frame, an aside box). Sections alternate between plain, tinted and one dark band (the security differentiator), so the page has rhythm without gradients on every block.

**Palette.** Deep navy `#0b1f3a` as brand/ink, off-white `#f5f7fa` ground, white surfaces, a single teal accent `#0f766e` (text-safe `#0b5f58`). Dark mode uses navy-black `#0b1220` with teal `#2dd4bf`. All text/background pairs used for body or UI text were checked to be at least 4.5:1 (light faint text was darkened to `#5b6a7d` after the check).

**Typography.** Manrope (OFL) as a single variable font, subset to Latin + Latin Extended (covers German and Turkish) and served locally as TTF (`public/fonts/Manrope-latin-ext.ttf`, 87 KB) with a system-UI fallback stack. WOFF2 conversion was not possible in the build environment (no Brotli); see the asset checklist. Fluid type scale via `clamp()`, headings with tight tracking, long German compounds handled with `overflow-wrap: anywhere` and `hyphens: auto`.

**Hero without portrait.** Text-led: eyebrow, display headline (the approved German line), supporting text, location line, two buttons and the CV text link. A compact fact sheet on the right (location, focus, languages, availability) plus a truthful "live" line listing the three public domains. When an approved portrait arrives, it can replace the fact sheet on wide screens without touching the copy.

**Media frames instead of fake screenshots.** Where no approved screenshot exists, project entries render a browser-style frame with a text-led spec panel (title, tagline, type, status, stack). It is clearly not a screenshot and the detail page omits the media section entirely until real files exist in `public/img/projects/`. Dropping the files in switches both views automatically.

**Motion.** One restrained reveal-on-scroll for list groups (translateY 14px, 480 ms), hover translations on arrows and media frames, and a small mobile-menu icon transition. All of it is disabled under `prefers-reduced-motion`. No scroll hijacking, parallax, cursor effects or intro animation.

**Theme.** Light by default, follows the system, and a header toggle stores an explicit choice in `localStorage` only. A nonce-protected inline script applies the stored theme before first paint to avoid a flash. The privacy policy mentions this local storage.

## Localization

Locales `de` (default), `en`, `tr`. HTML `lang`, `Content-Language`, canonical, `hreflang` (+ `x-default` → German), `og:locale` and `og:locale:alternate`, navigation, form labels, validation errors, 404/500 copy and legal pages exist in all three. The language switcher links to the same page in the other locales. Translations were written as natural copy, not word by word; the German versions of imprint and privacy policy are marked as authoritative in the other two languages.

## SEO

Unique title/description per page and locale, canonical URLs, hreflang cluster, Open Graph and Twitter cards with a generated default share image and one per project (`public/img/og/*.png`, generated from HTML by `scripts/generate-images.js`, text-led), JSON-LD (`Person`, `WebSite`, `ProfessionalService` on home/about; `SoftwareApplication`/`WebSite` + `BreadcrumbList` on projects; `ItemList` on services), `sitemap.xml` with `xhtml:link` alternates and `robots.txt`. Error pages carry `noindex`. Location terms (Dinslaken, Duisburg, NRW, remote) appear in natural sentences only.

## Security

Helmet with a strict CSP: `default-src 'self'`, scripts only from self plus a per-request nonce for the theme bootstrap, styles only from self (no inline `style` attributes anywhere; a test enforces this), `frame-ancestors 'none'`, `form-action 'self'`. HSTS and `upgrade-insecure-requests` are enabled only in production. Rate limiting applies to dynamic routes (300/min) and separately to the contact POST (5 per 15 minutes per IP, configurable). Contact input is normalised and validated server-side (`src/lib/contact-validation.js`, pure and unit-tested), control characters are stripped, URLs are parsed with the WHATWG parser, and the body parser is capped at 32 KB. Spam protection uses an off-screen honeypot field plus a render timestamp (submissions faster than 3 s or older than 24 h are rejected without revealing why). Logging is structured JSON and never includes names, emails or message bodies. The central error handler renders a localized page, hides stack traces in production and logs them only outside production. `trust proxy` is configurable for Hostinger.

**No penetration-testing claims** anywhere in the copy; the services page states this explicitly.

## Contact delivery

`CONTACT_TRANSPORT=log` (default) validates, logs a data-free event and tells the visitor plainly that delivery is not active yet, with the direct email address as fallback. There is no "thank you" state until a provider is approved and `deliver()` reports `delivered: true`. Adding SMTP or an API provider later is a single function in `src/lib/contact-delivery.js` plus environment variables.

## Assumptions

- Postal code 46535 for Dinslaken is used in the imprint skeleton; the street address is a visible placeholder to be filled by the owner before publication (never taken from documents).
- The GitHub profile URL defaults to `https://github.com/KelesogluMustafa` (from the repository owner); LinkedIn stays empty until supplied via `SOCIAL_LINKEDIN`.
- Project years remain unset and are hidden in the interface until confirmed by the owner.
- Client case-study content comes from public, read-only inspection of the live sites. Security bullets on client projects are phrased as implementation principles, not audited outcomes.

## Deliberately not done

- No deployment, DNS, email provider, credentials, paid services, repository settings changes or merge (stop conditions).
- `package-lock.json` was added during the later Codex review.
- No WOFF2 font, no real screenshots, no portrait, no CV PDF (see `ASSET_CHECKLIST.md`).
- No analytics or cookies of any kind.
- No React/Vue/Svelte, no CSS framework, no bundler.
- The design skills named in the task (`frontend-design`, `web-design-guidelines`, `accessibility`, `i18n`, `technical-seo`, `web-security`) were not available in this environment; the same checks were done manually and with the Playwright scripts, as documented in `SESSION_REPORT.md`.
