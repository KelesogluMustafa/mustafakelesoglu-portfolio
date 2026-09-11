# CLAUDE.md

## Mission

Build the production-quality multilingual portfolio for **Mustafa Keleşoğlu** at `mustafakelesoglu.de`.

Before changing code, read:

1. `README.md`
2. `docs/PORTFOLIO_MASTER_BRIEF.md`

The master brief is authoritative for scope, positioning, content, design constraints, and acceptance criteria.

## Autonomous work mode

The owner may be unavailable for 3–4 hours. Continue independently within the approved scope.

- Do not pause for routine design or implementation choices.
- Choose the simplest professional solution consistent with the master brief.
- Record meaningful assumptions and trade-offs in `docs/DECISIONS.md`.
- Work in small, coherent commits.
- Run build, lint, tests, accessibility checks, and browser QA when supported.
- Fix issues found during QA instead of only reporting them.
- Finish with `docs/SESSION_REPORT.md` describing work completed, checks run, remaining gaps, and exact next steps.

## Git workflow

- Work on the `fable/initial-build` branch.
- Do not push implementation directly to `main`.
- Commit and push completed work.
- Open a draft pull request to `main` if the environment supports it.
- Do not merge the pull request.

## Fixed technical direction

- Node.js 20+
- Express
- EJS
- Modern modular CSS
- Modular vanilla JavaScript
- Server-rendered multilingual routes
- German default, English and Turkish complete variants
- No WordPress or Elementor for this repository
- No React/Vue/Svelte unless a concrete blocker is documented and the owner approves later
- No database unless a real requirement is demonstrated

## Non-negotiable content rules

- Never invent clients, testimonials, analytics, revenue, conversion rates, performance scores, user counts, awards, employment, or certifications.
- Clearly label SaveFold as in development/technical beta.
- Clearly label AuthorityLab as validation/security R&D.
- Distinguish personal work from team or client work.
- Do not expose private repository content, credentials, personal documents, home address, phone number, or sensitive certificate data.
- Do not use lorem ipsum or fake dashboard statistics.

## Design rules

- Professional, clean, technical, trustworthy, and distinctive.
- Avoid hacker clichés, Matrix rain, hooded figures, excessive neon, glow-heavy interfaces, repetitive card grids, fake terminal decorations, and template-like bento layouts.
- Use strong typography, generous spacing, consistent tokens, real project media where available, and restrained purposeful motion.
- Respect `prefers-reduced-motion`.
- Maintain excellent mobile behavior and keyboard accessibility.

## External-action boundaries

Without explicit owner approval, do not:

- Deploy to Hostinger or any production environment
- Change DNS or domain settings
- Buy services or domains
- Create or reuse credentials
- Configure production email delivery
- Modify SaveFold, AuthorityLab, or any client website/repository
- Publish personal data
- Make repository visibility or settings changes
- Merge a pull request

Public client sites may be inspected read-only for accurate case-study content and screenshots.

## Missing assets

If portrait, CV, certificates, product screenshots, or approved project images are unavailable:

- Do not use random stock imagery as a final substitute.
- Build a polished text-led layout that remains complete without them.
- Add explicit entries to `docs/ASSET_CHECKLIST.md`.
- Use clearly identified development-only placeholders only when structurally necessary.

## Definition of done for the autonomous session

A successful session should leave:

- A coherent application architecture
- Complete core routes in DE/EN/TR
- Accurate project and service content
- Responsive desktop/mobile implementation
- Security and accessibility foundations
- SEO metadata, sitemap, robots, structured data, and error pages
- Tests and CI
- Browser-verified core navigation
- Documentation of decisions, assets, and remaining work
- No deployment and no merge
