# Decisions

Record of the choices made during the autonomous build session on `fable/initial-build`. The master brief and `CLAUDE.md` stay authoritative; this file explains how they were applied where the brief left room.

## Architecture

**Express 4 + EJS, server-rendered, no build step.** `src/app.js` builds the app (`createApp()`), `src/server.js` listens. Every page lives under `/:locale/...` and is handled by one locale router that resolves the dictionary, exposes template helpers (`t`, `url`, `ditt`, `nav`) and sets `Content-Language`. Root `/` is a server-side 302 to `/de/` (or `/en/`, `/tr/` when `Accept-Language` clearly prefers them); `/de` without slash is a 301 to `/de/`; inner paths with trailing slashes 301 to the slash-less form so there is one canonical URL per page.

**Content model.** Structured content (`src/content/projects.js`, `services.js`, `skills.js`, `site.js`) is language-independent data with an `i18n` block per entry. UI copy and long-form page copy live in `src/locales/{de,en,tr}.js`. A test asserts that the three dictionaries have identical key structures, so a missing translation fails CI instead of showing another language on the page.

**Assets without a bundler.** CSS is split into small modules (tokens, base, layout, components, pages) and linked in order from a manifest in `src/lib/assets.js`; JavaScript ships as native ES modules (`public/js/main.js` imports `modules/*`). Every asset URL carries a content hash (`?v=`) so long cache lifetimes are safe. This keeps the Hostinger deployment to `npm install && npm start`. If the module count ever hurts performance, a concatenation step can be added later without changing the source layout.

**No database.** The site has no state to persist. Contact requests are validated and logged (without personal data) until a delivery provider is approved.

**Vendored dependencies during the initial session.** The original build environment had no access to the npm registry. Runtime dependencies (`express`, `ejs`, `helmet`, `express-rate-limit`, `compression`, `dotenv` and their trees) were fetched from their GitHub release tags or the local npm cache for testing only; nothing vendored was committed. A later Codex review completed a normal install, generated `package-lock.json`, and recorded the result in `docs/CODEX_REVIEW.md`.

## Design direction

**Concept: "technical spec sheet, not a landing-page template".** The visual system leans on strong typography, hairline rules, a numbered service index and fact sheets styled like technical data sheets. Cards are used only where a bounded object is being shown (a project media frame, an aside box). Sections alternate between plain, tinted and one dark band (the security differentiator), so the page has rhythm without gradients on every block.

**Palette.** Deep navy `#0b1f3a` as brand/ink, off-white `#f5f7fa` ground, white surfaces, a single teal accent `#0f766e` (text-safe `#0b5f58`). Dark mode uses navy-black `#0b1220` with teal `#2dd4bf`. All text/background pairs used for body or UI text were checked to be at least 4.5:1 (light faint text was darkened to `#5b6a7d` after the check).

**Typography.** Manrope (OFL) as a single variable font, subset to Latin + Latin Extended (covers German and Turkish) and served locally as TTF (`public/fonts/Manrope-latin-ext.ttf`, 87 KB) with a system-UI fallback stack. WOFF2 conversion was not possible in the build environment (no Brotli); see the asset checklist. Fluid type scale via `clamp()`, headings with tight tracking, long German compounds handled with `overflow-wrap: anywhere` and `hyphens: auto`.

**Hero without portrait.** Text-led: eyebrow, display headline (the approved German line), supporting text, location line and two buttons. A compact fact sheet on the right (location, focus, languages, availability) plus a truthful "live" line listing the three public domains. When an approved portrait arrives, it can replace the fact sheet on wide screens without touching the copy.

**Media frames instead of fake screenshots.** Where no approved screenshot exists, project entries render a browser-style frame with a text-led spec panel (title, tagline, type, status, stack). It is clearly not a screenshot and the detail page omits the media section entirely until real files exist in `public/img/projects/`. Dropping the files in switches both views automatically.

**Motion.** One restrained reveal-on-scroll for list groups (translateY 14px, 480 ms), hover translations on arrows and media frames, and a small mobile-menu icon transition. All of it is disabled under `prefers-reduced-motion`. No scroll hijacking, parallax, cursor effects or intro animation.

**Theme.** Dark is the initial theme on every first load (owner decision, 2026-09-12). A header toggle switches to light and stores the explicit choice in `localStorage` only; a nonce-protected inline script applies a stored choice before first paint to avoid a flash. The system colour-scheme preference is no longer consulted for the initial state. The privacy policy mentions this local storage.

## Localization

Locales `de` (default), `en`, `tr`. HTML `lang`, `Content-Language`, canonical, `hreflang` (+ `x-default` → German), `og:locale` and `og:locale:alternate`, navigation, form labels, validation errors, 404/500 copy and legal pages exist in all three. The language switcher links to the same page in the other locales. Translations were written as natural copy, not word by word; the German versions of imprint and privacy policy are marked as authoritative in the other two languages.

## SEO

Unique title/description per page and locale, canonical URLs, hreflang cluster, Open Graph and Twitter cards with a generated default share image and one per project (`public/img/og/*.png`, generated from HTML by `scripts/generate-images.js`, text-led), JSON-LD (`Person`, `WebSite`, `ProfessionalService` on home/about; `SoftwareApplication`/`WebSite` + `BreadcrumbList` on projects; `ItemList` on services), `sitemap.xml` with `xhtml:link` alternates and `robots.txt`. Error pages carry `noindex`. Location terms (Dinslaken, Duisburg, NRW, remote) appear in natural sentences only.

## Security

Helmet with a strict CSP: `default-src 'self'`, scripts only from self plus a per-request nonce for the theme bootstrap, styles only from self (no inline `style` attributes anywhere; a test enforces this), `frame-ancestors 'none'`, `form-action 'self'`. HSTS and `upgrade-insecure-requests` are enabled only in production. Rate limiting applies to dynamic routes (300/min) and separately to the contact POST (5 per 15 minutes per IP, configurable). Contact input is normalised and validated server-side (`src/lib/contact-validation.js`, pure and unit-tested), control characters are stripped, URLs are parsed with the WHATWG parser, and the body parser is capped at 32 KB. Spam protection uses an off-screen honeypot field plus a render timestamp (submissions faster than 3 s or older than 24 h are rejected without revealing why). Logging is structured JSON and never includes names, emails or message bodies. The central error handler renders a localized page, hides stack traces in production and logs them only outside production. `trust proxy` is configurable for Hostinger.

**No penetration-testing claims** anywhere in the copy; the services page states this explicitly.

## Contact delivery

`CONTACT_TRANSPORT=log` (default) validates, logs a data-free event and tells the visitor plainly that delivery is not active yet, with the direct email address as fallback. SMTP delivery through Nodemailer is implemented behind `CONTACT_TRANSPORT=smtp`, but remains disabled until the `info@mustafakelesoglu.de` mailbox exists and the SMTP credentials are configured only in the hosting environment. There is no "thank you" state until the provider accepts the message and `deliver()` reports `delivered: true`.

## Assumptions

- The owner explicitly chose to publish the personal portfolio with only `46537 Dinslaken` and the public email address in the imprint. No street or house number is stored in the repository.
- The GitHub profile URL defaults to `https://github.com/KelesogluMustafa` (from the repository owner); LinkedIn stays empty until supplied via `SOCIAL_LINKEDIN`.
- Project years remain unset and are hidden in the interface until confirmed by the owner.
- Client case-study content comes from public, read-only inspection of the live sites. Security bullets on client projects are phrased as implementation principles, not audited outcomes.

## Deliberately not done

- No deployment, DNS, email provider, credentials, paid services, repository settings changes or merge (stop conditions).
- `package-lock.json` was added during the later Codex review.
- The CV route and download were intentionally removed at the owner's request.
- No WOFF2 font, no real screenshots or portrait (see `ASSET_CHECKLIST.md`).
- No analytics or cookies of any kind.
- No React/Vue/Svelte, no CSS framework, no bundler.
- The design skills named in the task (`frontend-design`, `web-design-guidelines`, `accessibility`, `i18n`, `technical-seo`, `web-security`) were not available in this environment; the same checks were done manually and with the Playwright scripts, as documented in `SESSION_REPORT.md`.

## Refinements applied on 2026-09-12

Visible name spelled `Mustafa Kelesoglu` (Latin only) across UI, metadata, JSON-LD and generated share images; proficiency levels (C1/B2) removed from every language listing, which now reads `Deutsch · Englisch · Türkçe` (localised); evidence strip rebuilt as descriptive cards without oversized numerals; hero fact-sheet label column fixed at 8.25rem with `white-space: nowrap` so `Schwerpunkte` never breaks; language switcher forced onto one row (`flex-wrap: nowrap`, `flex-shrink: 0`) in header and mobile menu; dark mode as the initial theme with the toggle kept.

## Contact form: optional attachments and a 5000-character description (2026-09-12)

**Description limit raised to 5000 characters.** `LIMITS.message.max` in `contact-validation.js` is the single source of truth; the textarea's `maxlength`/`minlength`, the JS character counter and the three locale error strings all read from it (directly or via the rendered HTML attribute), so there is one number to change, not four.

**Optional attachments, 0–5 files, 10 MB combined, no disk persistence.** The build environment has no npm registry access (confirmed: `npm view` returns 403 for both the registry and GitHub), so a well-known multipart library (multer, busboy) could not be installed or, more importantly, tested here. Rather than declare an unverifiable dependency, `src/lib/multipart.js` and `src/lib/raw-body.js` implement a small, unit-tested parser for exactly what a browser contact form sends (bounded field/file parts, no streaming-to-disk, no chunked transfer edge cases beyond what `fetch`/browsers produce). Files are held in memory only for the duration of one request — validated, attached to the outgoing Nodemailer message when SMTP is active, and never written under `public/` or anywhere else on disk.

**Validation is layered, not extension-only.** `validateAttachments()` in `contact-validation.js` checks, in order: file count (≤5), combined byte size (≤10 MB total, not per file), extension allowlist, declared MIME type against an allowlist (or a generic `application/octet-stream` fallback, since browsers do not always guess correctly), and finally a real file-signature ("magic bytes") check — PDF/DOC/DOCX have known binary headers; `.txt` is rejected if it contains a NUL byte or opens with an HTML/PHP/script tag. A short blocklist of executable signatures (PE/ELF/Mach-O) is checked on every file regardless of its claimed type, specifically so a renamed executable is rejected even when its extension and declared Content-Type both say "pdf". Filenames are sanitised (path separators and `..` stripped) before use anywhere, even though they are never turned into a filesystem path.

**The contact route now reads its own body.** `express.urlencoded()` was replaced with `readContactBody()`, which branches on Content-Type: multipart/form-data (the real shape once the form gained a file input — sent whether or not a file was actually chosen) goes through the custom parser; anything else is parsed as `application/x-www-form-urlencoded` via `URLSearchParams`, preserving the exact previous behaviour and request shape for any client that still posts that way. `contactRateLimiter()`'s `limit` option became a function re-read per request instead of a number captured once, purely so it stays configurable — the route table (and therefore the rate limiter) is built once per process and shared by every `createApp()` call.

**Form alignment fix.** The two-column rows (`Existing website` / `Approximate budget` and the others) could end up visually misaligned because one field's `.field` grid could be stretched taller than its own content by a taller sibling, and the browser's default content-distribution inside that stretched grid is inconsistent. Fixed structurally, not with a per-field margin hack: `.form__row` now sets `align-items: start` (columns never stretch to match each other) and `.field` sets `align-content: start` (a field's own label/control/hint/error rows always pack from the top). This fixes every two-column row in the form, not only the one that was reported.

## SaveFold: status changed from "Technical Beta" to "Live" (2026-09-12)

**SaveFold is now live at `https://staging.savefold.site/`.** Its content entry in `src/content/projects.js` was updated from `statusKey: 'inDevelopment'` / `liveUrl: null` to `statusKey: 'live'` / `liveUrl: 'https://staging.savefold.site/'`. Because every "Live" indicator, the hero fact-sheet status row, the aside "STAND" box with its clickable domain, the "Open live website" button and the Projects listing badge are all driven purely by `project.statusKey` and `project.liveUrl` (see `views/pages/project.ejs`, `views/partials/project-card.ejs`, `views/partials/project-media.ejs`), no new markup, CSS or status component was needed — SaveFold now renders with exactly the same green "Live" styling and clickable-domain pattern already used for PV Solar GmbH, BestFood Chur and Verein Rhein.

**Description text.** The DE/EN/TR summary and outcomes text no longer call SaveFold "technische Beta / technical beta / teknik beta"; only the now-inaccurate status clause was rewritten (not the surrounding paragraph) to say the product is released, live, and under active continued development with new features and releases, explicitly not implying that development has stopped. The `outcomesNote` sentence explaining why no user/market numbers are given was kept, only its now-false "not launched publicly yet" justification was removed.

**Turkish "live" label.** `common.statusLabels.live` in `src/locales/tr.js` was changed from `Yayında` to `Canlı` (the wording the owner specified for SaveFold's status). Because that status label is shared by every project marked `statusKey: 'live'`, this also renames the Turkish status badge for PV Solar GmbH, BestFood Chur and Verein Rhein from "Yayında" to "Canlı" — both words mean "live/online" in Turkish, and the change was made deliberately rather than introducing a second "live" status key, per the instruction to reuse the existing localization system instead of creating new status variants.
