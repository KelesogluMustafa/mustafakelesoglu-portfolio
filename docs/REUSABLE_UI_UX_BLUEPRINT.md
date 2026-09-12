# Reusable UI/UX Blueprint — extracted from mustafakelesoglu-portfolio

This document is a design-system extraction, not a design-advice essay. Every rule below was reverse-engineered from the actual implementation of the `mustafakelesoglu-portfolio` codebase (`public/css/**`, `views/**/*.ejs`, `public/js/modules/**`, `src/content/**`, `src/locales/**`). It exists so a **different** project — a different company, product, portfolio, or service — can be designed to the same standard of craft without becoming a copy of this site.

Nothing here is generic "good design" advice. Where a rule is stated, it is stated because a specific file/selector/value in this repository does it, and that reference is named so a future session can go verify or extend it.

---

## 1. Purpose

Use this file when starting the **visual and UX design** of a new, unrelated project. It captures the *reasoning system* behind mustafakelesoglu.de — how it decides spacing, color, section structure, navigation behavior, and restraint — so a new project can reach equivalent quality while looking, and being, entirely its own thing.

This is not a component library or a theme to install. It is a set of decision rules plus one master prompt (Section 25) that a future Claude session reads together with the *new* project's own content, brand, and constraints.

Two documents in this same repo hold supporting evidence for the reasoning here and are worth a quick read if more grounding is needed: `docs/DECISIONS.md` (why choices were made) and `CLAUDE.md` (the anti-cliché rules that were already in force when this design was built).

---

## 2. Design DNA of the reference site

This is the part meant to travel to every future project unchanged. It is not "navy and teal" — it's a way of deciding things:

1. **The page is a document with hierarchy, not a stack of decorated boxes.** Most of the layout is built from typography, spacing and hairline rules (`border-top`, `border-bottom`) rather than cards with shadows. Cards (`.media-frame`, `.hero__facts`, `.project-aside__box`) are reserved for content that really is a bounded, self-contained object — a screenshot, a fact panel, an aside. A numbered service list (`.service-index`) and a project row (`.project-row`) are deliberately **not** cards.
2. **One accent color, used as punctuation, never as wallpaper.** Teal (`--color-accent`) appears on small, specific things — an active nav underline, a button, an icon, a 3px rule before an evidence label, a left border on a note. It never becomes a background fill or a gradient wash. This is what keeps a single accent from feeling like a "startup gradient" site.
3. **Every section type has its own layout, chosen by what the content actually is.** The hero is a two-column split with a fact panel. Projects are alternating media/text rows. Services are a flat numbered index, not tiles. Process is four numbered steps with top borders. A differentiator gets one full-bleed dark inverted band. This variety produces rhythm; a page that repeats one card grid five times in a row cannot.
4. **Dark is not an afterthought toggle — it's a first-class palette with its own accent values**, not the light palette with brightness inverted (see Section 6). This is what makes the dark theme look "designed" instead of "auto-inverted."
5. **Restraint is enforced structurally, not by taste.** Borders are 1px (`--color-border`) or 1.5–2px (`--color-border-strong`) hairlines, radii are small (`--radius-sm: 6px`, `--radius: 12px`, `--radius-lg: 20px` — never pill-everything), shadows are barely-there (`--shadow-sm`, `--shadow`) and used only on elevated surfaces (media frame, hero fact card), and motion is one 240ms reveal, nothing else.
6. **Responsive discipline is content discipline, not a media-query afterthought.** Fixed-width label columns, `flex-shrink: 0` on controls that must never wrap, `nowrap` where wrapping would look broken (language switch, buttons), and `overflow-wrap: anywhere` / `hyphens: auto` on headings for long compound words are load-bearing rules, not polish.
7. **The mobile version is a different, complete navigation experience, not a squeezed desktop nav** — see Section 10.

What is *not* part of the DNA: navy/teal as colors, the specific fonts, the specific section names, the specific content types (projects/services/skills). Those are Section 22 material — they change every time.

---

## 3. Visual system

The system is built from four layers that other projects should also separate, because it's what keeps "change the brand" from becoming "rewrite the CSS":

- **Tokens** (`public/css/tokens.css`): raw values only — colors, type scale, spacing scale, radii, shadows, motion durations. No component knows a hex code; everything reads `var(--color-*)`.
- **Base** (`public/css/base.css`): resets, global typography defaults, small reusable utility classes (`.eyebrow`, `.lead`, `.muted`, `.tag-list`, `.status`) — the vocabulary every page reuses instead of one-off inline styling. Notably: the CSP forbids inline `style="…"` attributes entirely (enforced by a test), which is *why* utilities like `.mt-3`, `.spacer-7`, `.text-sm` exist — they replace what would otherwise be inline styles.
- **Layout** (`public/css/layout.css`): structural primitives shared across pages — `.container`, `.section`, `.section--tinted`, `.section--dark`, `.split`, `.fact-sheet`, `.page-header`, `.notice`. These are the "sentence structures" pages are built from.
- **Components/Pages** (`public/css/components/*.css`, `public/css/pages/*.css`): the specific things — header, buttons, cards, media frames, and per-page layout (home hero, project detail).

A new project should keep this exact separation (tokens → base → layout → components → pages), because it's what lets you re-skin the tokens file for a new brand without touching thirty component files.

---

## 4. Color philosophy

The palette (`tokens.css`) is deliberately narrow: one ink/brand color, one neutral scale, one accent, and semantic status colors (success/warning/danger/info) that exist only for functional states, never for decoration.

Light palette: brand/ink `#0b1f3a` (deep navy), background `#f5f7fa` (off-white, not pure white — pure white next to pure black text is harsher and reads more "template"), surfaces `#ffffff`, borders `#d9e0e8` / `#b9c4d1`, text `#0f1b2d` / muted `#4a586b` / faint `#5b6a7d`, accent `#0f766e` (teal) with a text-safe darker variant `#0b5f58` used specifically where teal-on-light-background would fail contrast on body text or links.

Why a *separate* "accent-text" token (`--color-accent-text`) exists at all: the decorative accent (`--color-accent`, `#0f766e`) doesn't meet AA contrast for small text on the light background, so a second, darker value is used anywhere teal is doing double duty as a link or label color. This split — one accent for fills/borders/underlines, a second darker one for text-on-light — is the actual mechanism that keeps the accent "controlled": it is legally not allowed to become body text color unless it's the safe variant.

**Why the accent doesn't dominate:** it is used in exactly these places and nowhere else — active nav-link underline (2px), current-language pill background, primary button fill (dark mode only — see below), a 3px rule before evidence labels and project-section headings, icons inside bullet lists (`.service-detail__points svg`, `.project-section li::before`), and the left border of callout notes. It is never a background, never a gradient stop covering more than ~13% opacity (`hero::before`'s radial glow, discussed in Section 11), and never applied to more than one element per visual "unit" (a card never has both a teal border and a teal icon and a teal heading at once).

**Per-project accent colors** (`--accent-teal/navy/amber/rose/sky`) exist as a *separate, secondary* palette used only inside `.media-frame` variants, to visually distinguish project cards from each other without touching the site's single brand accent. This is a pattern worth reusing: a small rotating palette scoped to one repeating content type (cards, tags, categories), kept fully separate from the one true brand accent.

Rationale for navy+teal specifically was Mustafa's brand and **must not** carry over; the *pattern* (one ink neutral, one working accent, one text-safe accent variant, a small secondary rotation palette for repeating items) is what should carry over.

---

## 5. Dark/light theme behavior

Dark mode here is a **second complete palette with different accent values**, not an inverted light palette. Compare: light accent is `#0f766e` (a muted, ink-adjacent teal that reads as "professional" against off-white); dark accent is `#2dd4bf` (a much brighter, higher-chroma teal) because the same muted teal would look dead and low-contrast against navy-black (`#0b1220`). This is the single biggest reason the dark theme reads as *designed* rather than *auto-dark-mode-plugin*: someone chose a brighter, more saturated accent specifically for the dark background, and adjusted every derived value (`--color-accent-hover: #5eead4`, `--color-accent-soft: #113b3a`, `--color-accent-text: #7ee8db`) to match.

Other dark-specific decisions worth keeping as a pattern:
- Background is not black but a desaturated navy-black (`#0b1220`), and surfaces step up in a very tight range (`#111a2b`, `#172236`) — enough separation to imply elevation without harsh contrast jumps.
- Shadows switch from soft colored shadows (`rgba(15,27,45,…)`) to pure black shadows (`rgba(0,0,0,…)`) at higher opacity, because colored shadows disappear against a dark background.
- The primary button (`.button--primary`) swaps its whole strategy in dark mode: on light it's brand-navy-fill/off-white-text; in dark it becomes accent-fill/near-black-text (`#06201d`) — because a navy button on a navy-black page would vanish, but a bright teal button pops.

**Which theme is default, and how the switch actually works** — read this from the real files, not from convention: `views/partials/head.ejs` hardcodes `data-theme="dark"` directly on the `<html>` tag at server-render time. A tiny nonce-protected inline script, injected before any CSS or paint, checks `localStorage.getItem('theme')`: if it is exactly `"light"` or `"dark"`, it overwrites the `data-theme` attribute; otherwise dark stands. `public/js/modules/theme.js` only ever writes an *explicit* user choice to `localStorage`; the system `prefers-color-scheme` media query is present in `tokens.css` purely as a fallback for the (extremely rare) case where JS is disabled and no explicit theme was ever set — it is not consulted for the initial render once the inline script has run. Net effect: **every first-time visitor sees dark by default, on every device, regardless of OS theme**, and only an explicit click on the toggle changes that, permanently, for that browser. This was an explicit product decision (`docs/DECISIONS.md`, "Theme" section) — a portfolio for a security/web engineer reads more premium in dark by default. A different project may reasonably choose the opposite (light default) — the *mechanism* to copy is: hardcode the default in the server-rendered HTML, apply a stored override before first paint via a nonce'd inline script, and never let system preference silently overwrite an explicit user choice.

The theme toggle itself (`.theme-toggle` in `header.css`) is a single icon button that swaps a sun/moon SVG pair via `display:none` toggling keyed off `[data-theme='dark']` and the media query fallback — no animation, no label text, just an icon with an `aria-label`. This is intentionally the smallest possible control: a portfolio's dark-mode toggle should not compete visually with primary navigation.

---

## 6. Typography system

Single variable typeface (Manrope, self-hosted `public/fonts/Manrope-latin-ext.ttf`, weight range 200–800, `font-display: swap`), with a system-UI fallback stack — no second display font, no serif accent font. One typeface family used consistently at different weights is what reads as "considered" rather than "assembled from a font pairing generator."

**Fluid type scale**, all via `clamp()`, so text genuinely resizes with viewport instead of jumping at breakpoints:
```
--text-xs: 0.8125rem        (fixed — labels, meta)
--text-sm: 0.9rem           (fixed — nav, buttons)
--text-base: 1.0625rem      (fixed — body; note: larger than the browser default 16px, a deliberate legibility choice)
--text-md: 1.1875rem        (fixed — lead paragraphs, sub-headings)
--text-lg:  clamp(1.3rem, 1.1rem + 0.8vw, 1.6rem)
--text-xl:  clamp(1.7rem, 1.35rem + 1.4vw, 2.3rem)
--text-2xl: clamp(2.1rem, 1.6rem + 2.2vw, 3.2rem)
--text-display: clamp(2.5rem, 1.8rem + 3.6vw, 4.6rem)
```
Note the pattern: small/body sizes are **fixed rem values** (predictable line length and rhythm at any viewport); only heading-and-up sizes are fluid. This avoids the common mistake of making body text fluid, which causes reflow jitter while scrolling/resizing.

**Hierarchy is built from four levers used together, not font-size alone:** size (the scale above), weight (`800` for hero/display headings, `700` for h1–h4 and buttons, `600` for emphasis/labels, `400` body), letter-spacing (`--tracking-tight: -0.02em` pulls large headings together so they don't look loose; `--tracking-wide: 0.08em` opens up uppercase labels like `.eyebrow` and `dt` fact labels so all-caps small text stays legible), and color (headings full `--color-text`, body `--color-text-muted`, meta/labels `--color-text-faint` — a three-step text-color ladder, not just one gray).

**Line-height is content-aware, not one global value**: `--leading-tight: 1.1` for display/h1, `--leading-snug: 1.25` for smaller headings, `--leading-normal: 1.6` for body, `--leading-relaxed: 1.7` for longer-form paragraphs (lead text, prose, card descriptions). Tighter leading on large text, looser on small text, is why nothing feels cramped or sprawling.

**Multilingual typography safety**: `overflow-wrap: anywhere` and `hyphens: auto` are applied globally to headings and paragraphs (`base.css`), because German compounds ("Sicherheitsschwerpunkte"-scale words) will otherwise overflow containers or force horizontal scroll. `text-wrap: balance` is used on the hero title specifically so a 2–3 line headline breaks evenly rather than leaving one short orphan word. Any multilingual project should treat long-word overflow as a typography rule, not a bug to patch later.

---

## 7. Spacing and layout system

One geometric-ish spacing scale used everywhere (`--space-1` 0.25rem through `--space-9` 6rem), plus one fluid `--section-y` (`clamp(3.5rem, 2.5rem + 4vw, 6.5rem)`) that controls vertical rhythm between all major sections. Nothing uses ad-hoc pixel margins; every gap/padding/margin in the component CSS references one of these tokens. This is what makes the page feel like it has one rhythm instead of every section inventing its own spacing.

Containers: `--container: 74rem` (main content width), `--container-narrow: 46rem` (prose/legal pages, narrower for readability), `--gutter: clamp(1rem, 0.6rem + 2.2vw, 2.5rem)` (fluid side padding, so mobile isn't cramped against the viewport edge and desktop isn't awkwardly narrow). Radii are small and few: `6px` / `12px` / `20px` — there is no `9999px`-everything pill aesthetic except on the two things that specifically read as "pills" by convention (tags, language-switch is actually square/segmented, not pill).

The **two-column asymmetric split** (`.split`, `minmax(0, 1.6fr) minmax(16rem, 1fr)`) recurs across hero, about, contact, and project detail — a wide primary column plus a narrower supporting column (fact sheet, aside, sticky nav) — rather than a naive 50/50 split, because the supporting content (facts, links) genuinely needs less horizontal space than prose. `.split--reverse` and `.split--even` are the two variants used when that assumption doesn't hold.

---

## 8. Header and navigation

The header (`.site-header`, `components/header.css`) is `position: sticky; top: 0` with a **transparent border that only appears after scrolling** (`.is-scrolled`, toggled by `nav.js` on `window.scrollY > 4`) — so the header doesn't visually compete with the hero at the top of the page, but gains definition once content is scrolling underneath it. The background itself is a translucent blur (`color-mix(in srgb, var(--color-bg) 88%, transparent)` + `backdrop-filter: blur(10px) saturate(160%)`), not a solid fill — this keeps it feeling light even though it's always present.

Desktop nav links get **no background pill and no box** for their active/hover state — hover is a very subtle `--color-surface-2` tint, and "current page" is marked by a 2px accent underline positioned with absolute positioning (`::after`), not a color change alone. This is quieter than most template navs, which tend to box or shade the active item.

The brand mark uses `--color-brand` in light mode and switches to `--color-accent` in dark mode (`header.css`) — the same "swap strategy per theme" pattern as the primary button (Section 5): a navy mark would be nearly invisible on a navy-black background, so dark mode gives it the accent color instead of just relying on contrast tricks.

Three "tools" live in the nav's trailing group in a fixed order (`.site-nav__tools`): language switch, theme toggle, primary CTA button. On desktop they sit in a row after the links; the CTA is real (a filled button), not another text link, so there is exactly one "loudest" thing in the header.

---

## 9. Mobile navigation

This is one of the most specific, most reusable patterns in the codebase, and it deliberately does **not** just collapse the desktop nav into a stacked list.

Below `56rem`, the desktop `<nav>` becomes an absolutely positioned full-width panel (`top: 100%; left:0; right:0`) that drops down under the sticky header, with its own background, its own bottom border, a real shadow, and a scroll cap (`max-height: calc(100dvh - 4.25rem); overflow-y: auto`) so a long menu never pushes off-screen on short devices. Links inside it are **full-width, 3rem-tall tap targets with a bottom hairline each** (`border-bottom: 1px solid var(--color-border)`) — not compressed to text height like they are on desktop — because touch targets need to be large and unambiguous, and a list of hairline-separated rows reads as a proper menu, not a shrunk desktop bar.

The hamburger icon (`.nav-toggle__icon`) is hand-built from three absolutely positioned 2px bars, not an icon font/SVG asset, and animates to an X with a pure CSS transform on `[aria-expanded='true']` (bar 1 rotates+translates down, bar 2 fades out, bar 3 rotates+translates up) — a small but real piece of craft that a generic hamburger icon swap wouldn't have.

Behaviorally (`public/js/modules/nav.js`): Escape closes and returns focus to the toggle button; clicking outside the open panel closes it; clicking a same-page anchor link inside the panel closes it; resizing past the breakpoint force-closes it; opening the menu **locks body scroll** (`document.body.style.overflow = 'hidden'`) only while both the menu is open and the viewport still matches the mobile media query; and focus is moved to the first focusable element inside the panel on open. This is a real mobile navigation implementation with keyboard and focus management, not `display:none` toggled by a class alone.

The **tools row reorders** inside the mobile panel (`order: 0/1/2` on lang-switch/theme-toggle/CTA in `header.css`) so language and theme controls sit first (in a `flex-wrap: wrap; justify-content: space-between` row) and the primary CTA becomes a full-width button last — the CTA gets *more* visual weight on mobile (full width, 3rem tall), not less, because on mobile it may be the only path to the contact page once the menu is open.

---

## 10. Language switcher (structured multi-option control)

Not one of the 23 requested section names verbatim, but important enough to call out on its own because it's a genuinely tricky responsive problem this codebase solved concretely: a 3-option control (`DE / EN / TR`) that must **never wrap to two rows**, on any viewport, in the header or in the mobile panel.

The mechanism (`components/header.css`, `.lang-switch`): the list is `display:inline-flex; flex-wrap: nowrap`, each item has `flex-shrink: 0` and `white-space: nowrap`, and the whole control has `flex-shrink: 0` on its wrapper too, so a parent flex container is never allowed to compress it into wrapping. It's a segmented control (shared border, internal dividers via `border-right`, current item gets a solid fill in the brand or accent color depending on theme) rather than three separate buttons with gaps — visually reading as one unit, "pick one of three," rather than three independent nav items.

**Reusable rule**: any small, fixed-cardinality control (language switch, a 2–4 way toggle, a segmented filter) should get explicit `flex-wrap: nowrap` + `flex-shrink: 0` on both the control and its items, rather than trusting the parent flex layout not to compress it — flexbox will wrap or shrink text before you expect it to, especially at in-between viewport widths (not just at your named breakpoints).

---

## 11. Hero composition

The hero (`.hero`, `pages/home.css`) is **text-led with no portrait/photo dependency**, built to look complete with or without a person's photo — a real constraint from this project (`docs/DECISIONS.md`: "Hero without portrait") that is a genuinely useful *pattern*, not just a workaround: don't design a hero that looks unfinished until an asset arrives.

Structure: eyebrow line → display headline (`--text-display`, weight 800, `max-width: 14ch` so it wraps into 2–3 short lines instead of one long line or an awkward 4th line, `text-wrap: balance`) → supporting paragraph (`--text-lg`, muted color, `max-width: 34rem` — a deliberately narrow measure for readability) → one small "context" line with an icon (location/availability-type detail) → a button row (primary + secondary + optional tertiary text link) → on wide screens, a **fact-sheet card** in a second column (`.hero__facts`, built from the shared `.fact-sheet` pattern, Section 12).

The **only decorative element** in the entire hero is one radial gradient glow (`.hero::before`), positioned off to one side (`circle 32rem at 88% 8%`), using the accent color at **13% mixed opacity fading to transparent**, `pointer-events: none`, sitting behind everything. That's it — one quiet accent glow, not a blob field, not an animated gradient mesh, not a grid-pattern background. This is exactly the amount of "hero decoration" the anti-patterns list (Section 21) still allows.

**Why this hero reads as strong without being a huge, empty "SaaS hero":** it commits real space to *specific* information (a fact sheet with actual location/focus/availability data) instead of vague reassurance copy, the two-column grid means the fact sheet is doing visual work opposite the headline rather than leaving a huge empty right half, and there is exactly one visual accent (the glow) — nothing is fighting the headline for attention.

The two-column split only activates at `min-width: 62rem` (`minmax(0,1.5fr) minmax(18rem,1fr)`); below that the fact sheet stacks under the text, full width — it never gets awkwardly squeezed into a too-narrow column.

---

## 12. Fact-sheet / structured information pattern

`.fact-sheet` (`layout.css`) is the single most reused structural pattern in the site: a `<dl>` styled as label/value rows with hairline separators (`border-top` on the whole list, `border-bottom` per row), used for the hero fact card, the project-detail fact card, and any other "here are 4–6 specific facts" moment. It deliberately looks like a technical spec sheet (`docs/DECISIONS.md` names this concept explicitly: "technical spec sheet, not a landing-page template") rather than a marketing feature list with icons.

Row structure: `grid-template-columns: minmax(7rem, max-content) minmax(0, 1fr)` generically, but the **hero and project-hero variants override this to a fixed `8.25rem` label column with `white-space: nowrap` on the label** (`.hero__facts .fact-sheet__row`, `pages/home.css`) — this specific fix exists because a real label ("Schwerpunkte" / "Focus areas") was wrapping mid-word at certain viewport widths when the column was allowed to be content-sized (`max-content`). The lesson to reuse: **when a fact-sheet label column uses `max-content` sizing, measure the actual longest label string in every supported language at every breakpoint** — a language-independent `minmax()` will silently break on your longest translated word, and the fix is a fixed-width column plus `white-space: nowrap`, with the mobile breakpoint switching to a single stacked column (`grid-template-columns: 1fr`) below `30rem` so nothing is ever forced to fit a fixed width that's too narrow for a small screen.

Labels are uppercase, small, letter-spaced, and colored `--color-text-faint` (quietest text color in the ladder); values are `font-weight: 600` in the normal text color — this weight+color pairing (quiet label, confident value) is what makes a fact sheet scan well without needing icons per row.

**Why it feels "balanced":** consistent row height via consistent padding (`--space-3` vertical), a single top rule and per-row bottom rules (not a boxed table with all four borders, which would feel heavier), and a card wrapper (`.hero__facts`, `1px solid` border, `--radius-lg`, `--shadow-sm`) that gives the whole block one soft edge rather than each row having its own box.

---

## 13. Evidence/trust strip pattern

`.evidence` (`components/cards.css`) is a 2-up (mobile) / 4-up (desktop, `min-width: 56rem`) grid of plain items separated by hairline dividers (`border-right` between items, collapsing to a 2×2 grid with both right and bottom dividers on mobile). This is the section most likely to become a cliché "big number stat strip" (see the requirement history: the numeric version, `3 / 2 / 3`, was explicitly removed and replaced with this descriptive version — `docs/DECISIONS.md`, "Refinements applied").

The current version has **no numerals at all**. Each `.evidence__item` is: a small 3px accent bar (`.evidence__label::before`, `1.5rem` wide) → a bold short label (`--text-base`, `--leading-snug`) → a smaller faint detail line (`--text-xs`, `--color-text-faint`). The accent bar takes the place a big number or icon would normally occupy — it signals "this is a discrete fact" without asserting a quantified claim that (for a freelancer/portfolio site) usually can't be honestly substantiated anyway.

**Why descriptive text beats big numbers here specifically:** `CLAUDE.md`'s non-negotiable content rules explicitly forbid inventing metrics ("Never invent … analytics, revenue, conversion rates, performance scores, user counts"). A stat strip with fabricated-sounding big numbers ("500+ projects", "99.9% uptime") is both dishonest for a solo portfolio and is exactly the pattern every generic template uses — removing the numerals removed the "AI template" smell *and* removed the temptation to invent numbers. A different project that has real, verifiable numbers (an established company with real revenue/customer counts) can legitimately use numerals here — the anti-pattern is *meaningless or unverifiable* big numbers, not numbers themselves (see Section 21).

---

## 14. Section rhythm

The home/services/projects pages alternate section *types*, not just alternating background tints on the same layout. In order on the home page: hero (two-column, gradient glow) → evidence strip (bordered 4-up row, `.evidence`, full-bleed with 1px top/bottom border) → featured projects (alternating media/text rows, `.project-row--feature`, `:nth-child(even)` flips the media to the right) → services (numbered flat index, `.service-index`, explicitly *not* cards) → security/differentiator band (one full-bleed `.section--dark` inverted section with a 2-column icon-point grid) → about teaser (asymmetric split) → CTA band (`.cta-band`, brand-colored full bleed).

Backgrounds cycle deliberately: default `--color-bg` → `.section--tinted` (`--color-surface-2`, a very subtle step up) → back to default → **one** `.section--dark` (brand-color inversion, the only section that flips text-on-dark) → default → `.cta-band` (also brand-colored, so the page ends on the same "loud" color it used once in the middle, bookending it). Using the dark/brand inversion exactly **once** in the middle of the page and once at the very end (as the CTA) is what keeps it feeling like emphasis rather than "half the page is a different theme."

**Why not identical card grids per section:** a process list (`.process`, numbered steps with top borders, 2-up then 4-up) looks structurally different from a service index (flat list rows) which looks different from an evidence strip (bordered inline items) which looks different from a project row (alternating media+text). If every one of those were rendered as "N cards in a 3-column grid," the page would have visual rhythm of exactly one beat repeated five times — which is the single most common tell of a generated/template site. Choosing a distinct layout *per content type* (a numbered index for services because services are a sequential, browsable list; alternating rows for projects because each project needs room for both an image and real detail; a plain bordered strip for evidence because these are quick facts, not things to click into) is the actual design decision to copy — not any one of the specific layouts.

---

## 15. Project/content presentation

Projects use `.project-row--feature`: an asymmetric two-column grid (`1.15fr` / `1fr`) with a media frame on one side and metadata+copy on the other, alternating sides every other row via `:nth-child(even)` flipping `order` on the media column — this is what gives a project list visual movement without carousels or auto-playing anything. Compact rows (`.project-row--compact`, used on the index page) drop to a simpler two-column split with a top hairline, for when you need to list more projects with less space each.

The **media frame** (`components/media.css`, `.media-frame`) is a deliberate "browser chrome" treatment (three dot indicators + a fake URL pill) wrapping either a real screenshot (`.media-frame__img`) or — critically — a **text-led spec panel fallback** (`.media-frame__spec`) when no approved screenshot exists yet: title, tagline, and a 3-column mini fact grid (type/status/stack), on a subtle grid-line background tinted with that project's accent color. This fallback is explicitly *not* a placeholder image or a gray box — it's a fully designed alternative state that looks intentional. `docs/DECISIONS.md` states the reasoning directly: "It is clearly not a screenshot," meaning it is honest about what it is rather than faking a product screenshot that doesn't exist yet (`CLAUDE.md`: "Do not use random stock imagery as a final substitute"). **Reusable rule**: when a project doesn't have final visual assets, design a real fallback state built from the same design tokens as everything else, not a lorem-ipsum gray box — and make the fallback and the real-asset version visually consistent (same frame chrome, same aspect ratio) so swapping in a real screenshot later requires no layout change.

Project detail pages (`pages/project.css`) use a similar hero-facts pattern (Section 12) plus a two-column body (`2fr` main copy / narrower sticky-feeling aside with links and a CTA box) — long-form project write-ups get the asymmetric-split treatment too, for the same "wide primary column, narrow support column" reason as the homepage hero.

---

## 16. Services presentation

Services are a **numbered flat list** (`.service-index`), explicitly commented in the CSS as "not cards": each row is `number · icon · title+description · arrow`, full-width, separated by hairlines, with the whole list bounded top and bottom by a slightly heavier rule (`--color-border-strong`). On hover, only the background tints and the arrow nudges right (`translateX(4px)`) — there's no card lift, shadow, or scale.

This is a genuinely different choice from "services grid with icon cards," and the reasoning is about what services *are*: a short, ranked, browsable list a visitor scans top to bottom (like a menu or an index), not a set of unrelated peer items best scanned in a 2D grid. **Rule to generalize**: use a flat numbered/ordered list layout when items have a natural sequence or hierarchy worth implying (services in order of what's offered first, a numbered process); use a grid only when items are genuinely peer/unordered (skill tags, a photo gallery).

Individual service detail sections (`.service-detail`) on the services page expand this into a two-column layout per service: icon+title+short-pitch on the left, a bullet list of specific points plus a highlighted note (left-accent-bordered callout, `.service-detail__note`) on the right — again reusing the "icon in a soft-accent square" treatment (`.service-detail__icon`, `background: var(--color-accent-soft)`) consistently with the checkmark bullets (`.service-detail__points svg`), so the accent color ties the whole block together without introducing a new visual idea per section.

---

## 17. CTA hierarchy

Three distinct button/link visual weights exist and are used consistently for three distinct intents, never interchangeably:

- **Primary** (`.button--primary`): solid fill (brand navy in light mode, accent teal in dark mode — see Section 5), used for exactly one "main" action per view (hero's primary button, nav's `Request project` CTA, CTA-band button, project aside's contact CTA). There is deliberately never more than one primary button visible in the same viewport region.
- **Secondary** (`.button--secondary`): outlined (`border-color: var(--color-border-strong)`, transparent fill), used for the "second, still important" action right next to a primary (hero's "View projects" next to "Contact me").
- **Tertiary** (`.link-arrow` / `.link-plain`, `base.css`): plain text with an arrow icon that nudges on hover — used for "learn more"/"see all" style navigation that shouldn't visually compete with real buttons at all.

The **evidence, service, and project-row "arrow" links** (`.service-index__arrow`, `.project-row__title a:hover`, `.link-arrow`) all share the same `translateX(4px)`-on-hover micro-interaction — one consistent motion vocabulary for "this row/link leads somewhere," rather than a different hover effect per component. **Why the CTA isn't repeated everywhere**: the anti-pattern being avoided is a "Contact us" button after every single section: this site places its primary contact CTA in exactly three load-bearing spots (nav bar always-visible CTA, hero, and the one CTA-band at the very end) plus one contextual one on project detail asides — not after every section.

---

## 18. Responsive design rules

Breakpoints used are content-driven `rem` values, not a fixed device-width grid: `30rem` (~480px, stacks hero facts / makes hero buttons full-width), `40rem` (~640px, 2-up skill/security grids), `48rem` (~768px, 2-up process grid, compact project rows split into two columns), `56rem` (~896px, mobile nav breakpoint — nav collapses to the hamburger panel below this), `62rem` (~992px, hero/split two-column activation, wide `.split` layouts), `64rem` (~1024px, 4-up process/skill grids, desktop CTA visible in header).

The project brief itself calls for verified behavior at 1440/1024/768/390/360px — treat that list as the actual QA matrix: desktop-wide, laptop, tablet, large phone, small phone. `overflow-x: clip` is set globally on `body` (`base.css`) as a hard guard against any component accidentally introducing horizontal scroll — a cheap, global insurance policy worth copying into any new project's base stylesheet.

Structural rule used throughout instead of ad-hoc `overflow: hidden` on individual grid children: every multi-column grid/flex container that holds text-heavy children also sets `min-width: 0` on those children (`.project-row > *`, `.project-body > *`, `.device-pair > *`) — this is the fix for the extremely common CSS grid bug where a child with intrinsic text content refuses to shrink below its content width and blows out the grid on narrow viewports. Any new project using CSS grid with flexible text columns should apply this defensively by default, not only after seeing the overflow bug.

---

## 19. Accessibility rules

Concrete, testable rules actually implemented, not aspirational ones:

- A visible skip-link (`.skip-link`) that is off-screen until focused, jumping to `#main`.
- Every interactive control has a real accessible name: icon-only buttons (`.theme-toggle`, `.nav-toggle`) carry `aria-label`/`title`; the mobile toggle's label text swaps between open/close strings (`data-label-open`/`data-label-close` read by `nav.js`).
- `aria-current="page"` on the active nav link (computed server-side in `header.ejs` by comparing `currentPath`), `aria-expanded`/`aria-controls` wired correctly on the mobile toggle, `aria-pressed` on segmented/filter controls.
- `:focus-visible` is styled globally and unmissable (`outline: 3px solid var(--color-focus); outline-offset: 3px`) and is **never** suppressed anywhere in the codebase — there is no `outline: none` without a replacement.
- Text-color pairs were audited for WCAG AA (4.5:1) and one token was changed as a direct result: light-theme `--color-text-faint` was darkened to `#5b6a7d` specifically because the original lighter gray failed contrast on small label text (`docs/DECISIONS.md`, palette note). **Rule to reuse**: don't just pick a palette that "looks right" — check the actual faint/muted text tokens against their actual backgrounds at the actual font sizes they're used at (small uppercase labels are the usual failure point), and be willing to darken/lighten a token even if it slightly changes the intended mood.
- `prefers-reduced-motion: reduce` globally collapses all transition/animation durations to near-zero and force-shows anything gated behind the reveal-on-scroll system (`base.css`, bottom media query) — this is a blanket rule, not per-component opt-out.
- Language switch links are real `<a>` elements to real alternate-locale URLs (crawlable, bookmarkable, back-button-safe), not a JS-driven dropdown that mutates in place.

---

## 20. Motion and interaction rules

There are exactly three motion "systems" in the entire site, and no others:

1. **Reveal-on-scroll** (`public/js/modules/reveal.js` + `.js [data-reveal-group] > *` in `base.css`): opt-in per section via a `data-reveal-group` wrapper, children fade+translateY(14px)→0 over 480ms using `--ease-out` (`cubic-bezier(0.22, 1, 0.36, 1)`, a gentle deceleration curve), staggered by `min(index, 5) * 60ms` so at most a 300ms stagger regardless of how many items are in a group. Only triggers once per element (`io.unobserve` after reveal). Has a 2.5s safety timeout that force-reveals everything, so a broken observer or a hidden group can never permanently hide content. Fully disabled (elements start visible) when `prefers-reduced-motion: reduce` matches or `IntersectionObserver` doesn't exist.
2. **Micro-interactions on hover**: arrow nudges (`translateX(2–4px)`) on links/buttons/service rows, a media-frame lift (`translateY(-3px)` + shadow increase) on project hover, a button press (`translateY(1px)` on `:active`). All under 250ms, all using the same fast/`--ease-out` timing tokens.
3. **The mobile hamburger→X transform** (Section 9) — a one-off, purpose-built transition, not part of a general icon-animation system.

There is **no** page-load intro animation, no parallax, no scroll-hijacking, no cursor-follow effect, no auto-playing carousel, no animated gradient background. `CLAUDE.md` explicitly rules these out ("restrained purposeful motion"), and the *absence* of them is as much a deliberate design decision as the reveal system's presence — copy the restraint, not just the specific easing curve.

---

## 21. Anti-patterns — do not do these

Explicit bans, because each one is a specific, common way an AI-assisted or template-derived site ends up looking generic. If a new design is trending toward any of these, stop and redesign that piece rather than shipping it:

- **Everything is a rounded card.** If a numbered list, a plain text row, or a hairline-separated index would communicate the content better (see Section 14/16), don't wrap it in a bordered, shadowed, rounded box just for visual consistency with other cards on the page.
- **Every section is a 3-column grid.** Repeating the same grid shape section after section is the single fastest way to look machine-generated. Vary layout by content type (Section 14).
- **Big, meaningless statistic numbers.** "500+", "99.9%", "10k users" with no real, verifiable source behind them. If real numbers exist and are honest, they're fine; invented or unverifiable ones are not (Section 13).
- **Excessive gradients** — full-section gradient backgrounds, gradient text, gradient buttons everywhere. This codebase uses exactly one gradient in the entire site (the hero's 13%-opacity radial glow). A gradient should be rare enough that you can name every instance.
- **Glassmorphism as decoration.** The header's blur (Section 8) is functional (keeps a sticky bar legible over scrolling content) and subtle (88% opacity, not a heavy frosted panel). Frosted-glass panels used purely for a "modern" look, especially on cards or hero panels, are not part of this system.
- **Decorative blobs / abstract shapes** floating behind content with no relationship to the content.
- **Unnecessary drop shadows** on flat elements that aren't actually elevated (text, plain sections, non-interactive dividers). Shadows here exist only on genuinely elevated surfaces (media frames, fact cards, the mobile nav panel) and are all barely-there (`--shadow-sm` is `0 1px 2px` at 6–8% opacity).
- **Icon soup** — an icon next to every list item, every label, every heading "for visual interest." This system uses icons sparingly and functionally: a checkmark on a real confirmation point, an arrow on a real navigational link, a status dot on a real state. A label like a `dt` fact-sheet term gets no icon at all.
- **Excessive animation** — anything beyond Section 20's three systems. No animated counters, no typewriter text, no floating/bobbing elements, no scroll-triggered pinning.
- **A huge, meaningless hero** — full-viewport-height hero with vague copy ("We build the future of X") and no real information. This hero is generous but not empty: it contains a real fact panel and specific text, and its height is content-driven (`clamp()` padding), not forced to `100vh`.
- **Repeating the identical CTA after every section.** One primary CTA path, reinforced at a few load-bearing points (Section 17), not a "Get Started" button bolted to the bottom of every block.
- **Mobile as a shrunk desktop.** Don't just collapse desktop nav into a stack at smaller font size — design mobile navigation as its own experience with appropriately large tap targets, its own hierarchy, and its own interaction rules (Section 9).
- **The generic AI/SaaS template look** — recognizable by the combination of: a hero with a gradient blob and two pill buttons, a 3-up "features" grid of icon cards immediately below it, a logo strip, a big numbers stat bar, a testimonial carousel with stock headshots, pricing cards, and a final gradient CTA band — all in one default sans-serif font at one accent color used everywhere including buttons, links, icons, gradients and highlights simultaneously. If a new design's outline matches that list in order, it needs to be restructured using Section 14's principle (choose layout per actual content), not just re-skinned.

---

## 22. What should change for a different brand/project (do not carry over)

Everything content- and brand-specific must be re-derived from the *new* project, never copied:

- Brand color(s), the ink/neutral color, and the accent color(s) — pick colors that suit the new brand and industry; re-run the same contrast-auditing process (Section 19) on the new palette, don't assume any hex value here is safe elsewhere.
- Logo/brand mark and wordmark.
- Typeface — Manrope was chosen for this project's tone (technical, modern, geometric); a different project may call for a different single typeface (or a two-typeface system if genuinely justified), chosen for *its* tone.
- Industry-specific hero composition and copy — the "fact sheet next to a headline" *shape* can stay, but what's *in* the fact sheet (availability/focus/languages here) should be whatever facts actually matter for the new project (e.g., for a SaaS product: plan/uptime/integration count; for a restaurant: hours/cuisine/reservation link; for a corporate site: HQ/founded/team size).
- The specific content types and their layouts — this site has projects/services/skills because that's what a freelance developer portfolio needs. A different project needs its own content taxonomy first (see the master prompt, Section 25) and only then gets to decide which of this document's *layout patterns* (numbered index vs. alternating rows vs. flat grid vs. dark differentiator band) fits which content type.
- CTAs and their copy/destinations — "Request project"/"Contact me" is specific to a freelancer's funnel; a SaaS product's primary CTA might be "Start free trial," a corporate site's might be "Book a demo" or "Download the brochure."
- Images/screenshots — real assets specific to the new project; the *fallback-when-missing* pattern (Section 15) should be reused, not the specific fake-browser-chrome visual if it doesn't fit the new content (a physical-product company might use a different honest placeholder, e.g. a labeled diagram instead of a browser frame).
- Any section that only exists because of this project's specific offering (the dark "security differentiator" band exists because security/AuthorityLab is this developer's specific niche) — a new project should ask "what is *our* one differentiator worth a full inverted band?" rather than reusing "security."
- Legal/imprint content, structured data (`Person`/`ProfessionalService` JSON-LD here) — must reflect the new entity, not be copied verbatim.
- Default theme choice (dark-first) — reasonable for this brand/audience; re-decide per new project's context (Section 6).

---

## 23. What should remain as reusable design principles

The inverse of Section 22 — carry these regardless of what the new project is:

- Token-first architecture: tokens → base → layout → components → pages, nothing hardcoded outside `tokens.css`.
- One accent color used as punctuation (small, specific elements) never as a fill/wash, plus a separate contrast-safe text variant of that accent for anywhere it's used as body/link text (Section 4).
- A genuinely separate, from-scratch dark palette (different accent chroma, different shadow strategy) if dark mode is offered at all — never a CSS filter-invert or a single "make it darker" pass (Section 5).
- Choosing layout per content type instead of one repeating card grid (Section 14); a numbered/flat list for sequential or ranked content, alternating asymmetric rows for content needing both media and detail, a bordered plain strip for quick facts, at most one full-bleed inverted band for a single genuine differentiator.
- A fluid type scale with fixed small sizes and fluid large sizes, a 3–4 step text-color ladder (full/muted/faint), and multilingual-safe overflow handling if there's any chance of long words/translated strings (Section 6).
- One consistent spacing scale (no ad-hoc pixel values) and one fluid section-vertical-rhythm token (Section 7).
- A sticky header that gains a border only on scroll, not from the first pixel (Section 8).
- A fully custom, fully accessible mobile navigation panel with real tap targets, focus management, and Escape/outside-click handling — never a naive "hide the desktop nav, stack it" approach (Section 9).
- A hero built from real, specific supporting information (a fact panel) rather than only a headline and vague copy, with at most one restrained decorative accent (Section 11).
- The fact-sheet label/value pattern for any "here are N specific facts" moment, including checking real translated label lengths before fixing a label column width (Section 12).
- Exactly one number-free (unless real, verified numbers exist) evidence/trust element (Section 13).
- Three clearly distinct, consistently-applied CTA weights (primary/secondary/tertiary), with the primary reserved for one action per view and reused at only a few load-bearing points (Section 17).
- The specific responsive defensive rules: `min-width: 0` on flexible grid/flex children holding text, `overflow-x: clip` on `body`, `flex-shrink: 0` + `nowrap` on any small fixed-cardinality control (Section 18).
- The full accessibility checklist in Section 19 as a floor, not a ceiling.
- Exactly the three motion systems in Section 20 (reveal-on-scroll, hover micro-interactions, one purpose-built control animation) and nothing more, always gated behind `prefers-reduced-motion`.
- Every anti-pattern in Section 21, permanently.

---

## 24. Pre-launch UI/UX checklist

Run through this before considering a new project's design "done," the same way this project's own QA worked:

1. Every color in the design lives in a token file; grep the CSS for raw hex codes outside `tokens.css` and there should be none.
2. Every text/background pair actually used for body copy or UI labels has been checked at ≥4.5:1 contrast — including the *faint*/muted tier, which is where failures actually happen.
3. Dark mode (if offered) has its own accent chroma and its own shadow strategy — it was not produced by inverting or dimming the light palette.
4. No section repeats the exact same layout shape as the section immediately before or after it.
5. The evidence/stat area contains only numbers you can actually stand behind, or contains no numbers at all.
6. The mobile menu has been tested as its own flow: opens with the right icon animation, traps focus reasonably, closes on Escape/outside-click/link-activation, and every tap target is comfortably large.
7. Any fixed-cardinality small control (language switch, a toggle group) has been checked at the narrowest supported viewport for wrapping.
8. Any label/value list with a fixed-width label column has been checked with the *actual longest translated string* in every supported language, not just the design-language original.
9. The page has been checked at every breakpoint the project actually needs (this project's matrix: 1440/1024/768/390/360) for horizontal overflow, cramped touch targets, and orphaned/widowed text.
10. `prefers-reduced-motion: reduce` has been tested and every animation/transition genuinely stops or becomes instant.
11. Every interactive element has a real accessible name and a visible focus state; none rely on color alone to communicate state.
12. Long/compound words in every supported language have been checked against headings and narrow columns for overflow.
13. Count the CTAs on the busiest page. If it's more than 3–4 distinct calls to action, or the exact same CTA repeats after every section, reduce it.
14. Look at the page outline (headings + layout shapes only, content stripped away). Does it read as "designed for this content," or could it be any SaaS product with the words swapped? If the latter, revisit Section 21.

---

## 25. Reusable master prompt for Claude

Paste this whole section into a new Claude session, together with this file, at the start of a new project's design work. Fill in what you know; leave the rest as-is and instruct Claude to infer, from the new repository's own code/content/README, whatever is missing — never to invent brand facts.

```
You are designing the UI/UX for a new, unrelated project. I am giving you a reference
document, REUSABLE_UI_UX_BLUEPRINT.md, extracted from a different, already-built site
(a multilingual freelance developer portfolio). Do NOT copy that site's colors, content,
industry, section names, or specific layouts. Copy its DESIGN REASONING: how it decides
color usage, typography hierarchy, spacing, section rhythm, navigation behavior, dark
mode, and restraint (Sections 2, 4–23 of that file, especially the Anti-Patterns list in
Section 21 and the "what should remain as design principles" list in Section 23).

Project variables (fill in what you know; for anything left blank or marked "infer",
inspect this repository's own README, package.json, existing content files, and any
brief/issue/spec documents FIRST, and only ask me if it genuinely cannot be inferred —
never invent a brand fact, a metric, or content that isn't real):

- PROJECT_NAME: {{PROJECT_NAME}}
- PROJECT_TYPE: {{PROJECT_TYPE}}                 (e.g. SaaS product, corporate site, personal portfolio, service business, e-commerce, nonprofit)
- BUSINESS/PRODUCT: {{BUSINESS_OR_PRODUCT}}      (what it actually does/sells, in plain language)
- TARGET_AUDIENCE: {{TARGET_AUDIENCE}}           (who visits this site and what decision they're making)
- PRIMARY_GOAL: {{PRIMARY_GOAL}}                 (the one action the site exists to drive — signup, contact, purchase, application, donation, etc.)
- BRAND_COLOR: {{BRAND_COLOR}}                   (a starting brand color if one exists — a logo, an existing style guide; if none, infer a fitting direction from PROJECT_TYPE/BUSINESS/TARGET_AUDIENCE and propose one, explaining why)
- LANGUAGES: {{LANGUAGES}}                       (one or many; if many, apply Section 6's multilingual-safety rules and Section 12's translated-label-length rule)
- TECH_STACK: {{TECH_STACK}}                     (framework/rendering approach — infer from the repo if not given)
- REQUIRED_PAGES: {{REQUIRED_PAGES}}             (infer from the repo's existing routes/content/README if not given)
- PRIMARY_CTA: {{PRIMARY_CTA}}                   (the exact label/action for the one primary button used at load-bearing points, per Section 17)
- AVAILABLE_ASSETS: {{AVAILABLE_ASSETS}}         (real photos/screenshots/logo available now vs. not yet — for anything "not yet," design a real, on-brand fallback state per Section 15, never a lorem-ipsum placeholder)

Workflow:
1. Read this repository's existing code, content, README, and any brief/spec/issue
   before proposing anything. Ground every decision in what this specific project
   actually is — never in generic "modern website" assumptions.
2. Propose a token set (colors incl. a contrast-safe accent-text variant per Section 4,
   type scale, spacing scale) grounded in PROJECT_TYPE/BUSINESS/TARGET_AUDIENCE — explain
   each choice the way Section 4–7 of the blueprint explain theirs (why this color reads
   right for this audience, why this type scale, etc.), don't just assert it.
3. Decide dark/light default and behavior per Section 5's reasoning (which mode fits this
   audience/brand?) — if dark is offered, give it its own accent chroma and shadow
   strategy, never an inverted light palette.
4. For each real content type this project actually has (map it yourself from
   REQUIRED_PAGES/the repo content — don't assume "projects/services/skills"), choose a
   distinct layout following Section 14's principle: what is this content's natural
   shape (sequential list? paired media+detail? quick facts? one genuine differentiator
   worth a full band?), and design accordingly.
5. Design the header/nav and a REAL mobile navigation experience per Sections 8–9 —
   not a shrunk desktop nav.
6. Design a hero with real, specific supporting information (not vague copy) per
   Section 11, with at most one restrained decorative accent.
7. Apply the full CTA hierarchy (Section 17), motion restraint (Section 20), and
   accessibility floor (Section 19).
8. Before finishing, check every item in Section 21 (anti-patterns) against what you
   built, and run the Section 24 checklist.
9. Produce an original site that could believably belong to THIS project and no other —
   if I could swap PROJECT_NAME for something else and nothing would need to change,
   start over on that piece.
```

---

## 26. Quick start prompt (small projects)

For a small site/landing page where the full workflow above is overkill, paste this instead:

```
Design this project's UI using the design REASONING (not the content or colors) from
REUSABLE_UI_UX_BLUEPRINT.md, attached. In short: one accent color used sparingly as
punctuation (never a wash), never as body text unless it's a contrast-safe darker
variant; one real dark palette with its own accent chroma if dark mode exists, not an
inversion; a token-based type scale with a 3-step text-color ladder (full/muted/faint);
one consistent spacing scale; a different layout per content type instead of repeating
one card grid (flat list for sequential content, alternating rows for media+detail,
plain bordered strip for quick facts); a real, purpose-built mobile nav with large tap
targets, not a shrunk desktop nav; a hero with specific real information, not vague
copy, and at most one quiet decorative accent; exactly one primary CTA style reused at
just a few key points; motion limited to a subtle scroll-reveal and small hover
nudges, always respecting prefers-reduced-motion. Explicitly avoid: rounded-card-
everything, repeating 3-column grids, fabricated big stat numbers, heavy gradients or
glassmorphism, decorative blobs, icon soup, and anything that would read as a generic
AI/SaaS template. Base every content decision (sections, copy, imagery) on this
project's own actual content and industry — infer what you can from this repo before
asking me anything.
```
