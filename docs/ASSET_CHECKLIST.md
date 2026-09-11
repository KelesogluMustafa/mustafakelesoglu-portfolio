# Asset checklist

Real materials that were not available during the autonomous session. The site is complete and reviewable without them; each item switches on automatically or with a one-line configuration change once supplied. Nothing in this list should be replaced by stock imagery or invented content.

## Portrait

| Item                           | Format            | Size                                                | Used on                                                                                                                  | Status                                   |
| ------------------------------ | ----------------- | --------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------ | ---------------------------------------- |
| Approved professional portrait | JPG or WebP, sRGB | 1200 × 1500 px (4:5) and a 600 × 600 px square crop | Home hero (right column, replaces the fact sheet on wide screens), About page aside, Open Graph default image (optional) | Missing. Hero stays text-led until then. |

To add: place the files in `public/img/portrait/` and reference them from `src/content/site.js` (`portrait` field), then adjust `views/pages/home.ejs` hero right column.

## Project screenshots

All frames fall back to a text-led spec panel and the detail page hides the media section until files exist. File names are fixed in `src/content/projects.js`.

| Project       | Desktop file                                    | Mobile file                                    | Recommended size                              | Note                                                                                 |
| ------------- | ----------------------------------------------- | ---------------------------------------------- | --------------------------------------------- | ------------------------------------------------------------------------------------ |
| SaveFold      | `public/img/projects/savefold-desktop.png`      | `public/img/projects/savefold-mobile.png`      | 1600 × 1000 px (16:10) / 780 × 1560 px (9:18) | Screenshot of the technical beta; blur or remove any real user data.                 |
| AuthorityLab  | `public/img/projects/authoritylab-desktop.png`  | `public/img/projects/authoritylab-mobile.png`  | same                                          | CLI output or the thin web GUI; sanitise repository names and paths.                 |
| PV Solar GmbH | `public/img/projects/pv-solar-desktop.png`      | `public/img/projects/pv-solar-mobile.png`      | same                                          | Public site; confirm with the client that screenshots may be shown in the portfolio. |
| BestFood Chur | `public/img/projects/bestfood-chur-desktop.png` | `public/img/projects/bestfood-chur-mobile.png` | same                                          | Same as above. Capture after the remaining template text has been replaced.          |
| Verein Rhein  | `public/img/projects/verein-rhein-desktop.png`  | `public/img/projects/verein-rhein-mobile.png`  | same                                          | Same as above.                                                                       |

PNG or WebP; keep desktop files under 400 KB where possible (WebP recommended). The templates already set `width`/`height`, `loading="lazy"` and `decoding="async"`.

The build environment could not reach the live client sites, so no screenshots were captured automatically. They can be produced locally with Playwright once network access is available, for example `npx playwright screenshot --viewport-size=1600,1000 https://pvsolargmbh.com/ public/img/projects/pv-solar-desktop.png`.

## Share images

| Item                                          | Status                                                                                                         |
| --------------------------------------------- | -------------------------------------------------------------------------------------------------------------- |
| `public/img/og-default.png` (1200 × 630)      | Generated, text-led, from `scripts/generate-images.js`. Replace with a portrait-based version if desired.      |
| `public/img/og/<slug>.png` per project        | Generated, text-led. Can be regenerated at any time with `node scripts/generate-images.js` (needs Playwright). |
| `public/img/apple-touch-icon.png` (180 × 180) | Generated from the mark.                                                                                       |
| `public/favicon.svg`                          | Included (navy square with an "M" mark). Owner may want a designed logo.                                       |

## Fonts

| Item                                                         | Status                                                                                                                                        |
| ------------------------------------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------- |
| Manrope variable, Latin + Latin Extended subset, TTF (87 KB) | Included under the SIL Open Font License (`public/fonts/OFL-Manrope.txt`).                                                                    |
| WOFF2 version (roughly 40 KB)                                | Missing: convert with `pyftsubset` + Brotli or `woff2_compress` and add a `format('woff2')` source before the TTF in `public/css/tokens.css`. |

## Profile and legal data

| Item                                              | Where                                                               | Status                                                                                                           |
| ------------------------------------------------- | ------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------- |
| Street and house number for the imprint (§ 5 DDG) | `src/locales/*.js` → `legal.imprint.sections[0].lines`              | Placeholder text in brackets, visibly marked. Must be filled before go-live. Never copy from a scanned document. |
| Professional email `info@mustafakelesoglu.de`     | `CONTACT_TO` env, shown on contact, footer, imprint                 | Mailbox does not exist yet; create it at the hosting provider before go-live.                                    |
| LinkedIn URL                                      | `SOCIAL_LINKEDIN` env                                               | Empty: link is hidden until set.                                                                                 |
| GitHub URL                                        | `SOCIAL_GITHUB` env (default `https://github.com/KelesogluMustafa`) | Confirm this is the public profile to show.                                                                      |
| Project years                                     | `src/content/projects.js` → `year`                                  | Approximate; confirm.                                                                                            |

## Certificates and degree evaluation

Not published, on purpose (master brief §4). The CV and About pages say that transcripts, certificates and the ZAB evaluation are available on request. No scans should be added to the repository.

## Contact-form delivery

Not an asset, but a prerequisite for go-live: an approved email provider (SMTP credentials or an API key) stored only in the hosting environment. Until then the form validates and tells visitors delivery is not active. See `docs/DECISIONS.md` → Contact delivery.
