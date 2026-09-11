# Portfolio Master Brief

## 1. Product

A professional multilingual portfolio and client-acquisition website for **Mustafa Keleşoğlu**.

- Canonical production domain: `https://mustafakelesoglu.de`
- Repository: `KelesogluMustafa/mustafakelesoglu-portfolio`
- Deployment target after approval: Hostinger Node.js Application
- Current phase: design and implementation
- Production deployment is outside the current autonomous session

## 2. Business goals

The website must support three outcomes:

1. Win direct website and web-application projects from companies in Germany and Europe.
2. Provide credible case-study links for freelance-platform proposals.
3. Strengthen applications for web development, IT, and security-oriented roles.

The site is not merely an online CV. It must combine professional identity, evidence, case studies, services, and clear conversion paths.

## 3. Positioning

Primary identity:

**Mustafa Keleşoğlu — Web Developer | WordPress, Full-Stack & Security**

Preferred German positioning:

**Webentwickler für Websites und Web-Anwendungen mit Fokus auf Sicherheit.**

Supporting message:

Mustafa builds fast, responsive, maintainable websites and web applications for companies, associations, and digital products. WordPress client delivery, full-stack product development, and security-minded engineering are complementary strengths under one web-developer identity.

Do not position Mustafa primarily as a pentester, cybersecurity expert, generic IT consultant, or mechanical engineer.

## 4. Verified profile context

Use these facts carefully and without exaggeration:

- Location: Dinslaken, Nordrhein-Westfalen, Germany
- Work mode: NRW and remote
- Turkish: native
- German: C1 Beruf
- English: B2
- Mechanical Engineering degree with a positive ZAB degree evaluation comparable to a German Bachelor degree
- Cybersecurity learning and practical exposure includes SOC, SIEM, log analysis, and system security
- Web experience includes WordPress, Elementor, WooCommerce, responsive sites, forms, migration, hosting, and deployment
- Full-stack experience includes Node.js, Express, EJS, JavaScript, REST APIs, authentication, MySQL/MariaDB, Git, GitHub, CI/CD, and Hostinger

Do not publish scans of identity documents, residence documents, certificates, or degree evaluations during this session.

## 5. Audiences and conversion paths

### Business owner

Needs proof that Mustafa can deliver a reliable company website or web application.

Primary path:

Home → Services → relevant client case study → Project inquiry

### Freelance client

Needs concise scope, role, technology, real examples, communication languages, and availability.

Primary path:

English home → Projects → case study → Contact

### Recruiter or technical team

Needs skills, product work, engineering approach, GitHub, languages, location, and downloadable CV.

Primary path:

Home → Software projects → About/Skills → CV/GitHub

## 6. Information architecture

Required routes in every supported language where applicable:

- `/{locale}/` — Home
- `/{locale}/projects` — Projects index
- `/{locale}/projects/savefold`
- `/{locale}/projects/authoritylab`
- `/{locale}/projects/pv-solar`
- `/{locale}/projects/bestfood-chur`
- `/{locale}/projects/verein-rhein`
- `/{locale}/services`
- `/{locale}/about`
- `/{locale}/skills`
- `/{locale}/cv`
- `/{locale}/contact`
- `/{locale}/imprint`
- `/{locale}/privacy`
- localized 404 and safe error pages

Locales:

- `de` — default
- `en`
- `tr`

Root `/` should redirect to `/de/` without client-side-only routing.

## 7. Homepage

Recommended order:

1. Minimal header and navigation
2. Hero with name, value proposition, location, and two clear actions
3. Short credibility/evidence strip using only true facts
4. Featured work
5. Services
6. Work process
7. Security-focused development differentiator
8. Short about section
9. Skills grouped by outcome
10. Contact CTA
11. Footer and legal navigation

Preferred German hero starting point:

### Heading

**Websites & Web-Anwendungen mit Fokus auf Sicherheit.**

### Supporting text

**Ich entwickle schnelle, responsive Websites und individuelle Web-Anwendungen für Unternehmen, Vereine und digitale Projekte — mit WordPress, Elementor und modernen Full-Stack-Technologien.**

### Context

**Standort Dinslaken · Projekte in NRW und remote**

### Actions

- `Projekte ansehen`
- `Projekt anfragen`
- secondary text link: `Lebenslauf herunterladen`

Copy may be refined for natural German, English, and Turkish, but its meaning and claim level must remain conservative.

## 8. Project organization

Separate projects into:

### Software Products & Security Labs

- SaveFold
- AuthorityLab

### Client Websites

- PV Solar GmbH
- BestFood Chur
- Verein Rhein

Each project detail page must contain:

1. Accurate short summary
2. Problem/context
3. Mustafa's role
4. Solution
5. Technology
6. Important functionality
7. Security/performance considerations
8. Desktop/mobile media where available
9. Only verifiable outcomes
10. Live link or clearly labeled project status
11. Relevant contact CTA

## 9. Project facts

### SaveFold

Position as the primary full-stack product project.

Purpose:

Capture, organize, search, and manage useful links and shared content from platforms such as websites, YouTube, X/Twitter, and Instagram.

Relevant implemented/planned product areas may include:

- Registration and login
- Library and item management
- Categories and subcategories
- Actions/tasks
- Search and filtering
- REST API
- iOS Shortcut and Android share-target integration
- PWA support
- Roles, plans, coupons, and administrative controls
- Export
- Security headers and access controls
- Automated tests
- GitHub-to-Hostinger workflow

Stack context:

- Node.js 20+
- Express
- EJS
- Plain CSS/JavaScript
- MySQL/MariaDB
- Hostinger Node.js

Status label:

**In Development / Technical Beta**

Do not claim public user counts, revenue, market adoption, or finished features without repository evidence.

### AuthorityLab

Position as a security R&D and product-development project.

Core concept:

Deterministic analysis of authority changes and risks for repository-defined AI agents.

Relevant concepts:

- Transitive Authority Regression Check
- Deterministic decision core
- ALLOW / MODIFY / BLOCK semantics
- UNKNOWN is neither automatically safe nor automatically critical
- Explainable and auditable evidence
- Delegation and bypass detection
- Local/CI CLI
- Thin web GUI and sanitized report history
- Candidate commands, hooks, scripts, or MCP servers are not executed
- Secret values are not read or stored

Status label:

**Validation Phase / Security R&D**

Do not claim that the hosted product, runtime enforcement, attestation, pilots, or commercial validation are complete.

### PV Solar GmbH

Live URL: `https://pvsolargmbh.com/`

Case-study angle:

- Corporate WordPress/Elementor website
- Multiple business service areas
- Responsive layout
- Service presentation and contact journeys
- Hosting and publishing work

Do not modify the client site. Public read-only inspection is allowed.

### BestFood Chur

Live URL: `https://bestfoodchur.ch/`

Case-study angle:

- Restaurant website and product catalogue
- WordPress/WooCommerce
- Menu categories
- WhatsApp ordering path
- Responsive experience

Do not modify the client site. Do not reproduce stale theme/demo copy in the portfolio.

### Verein Rhein

Live URL: `https://vereinrhein.ch/`

Case-study angle:

- Association and community website
- Events and organizational information
- Content management
- Contact flow

Do not overemphasize that it was the first website. Present it professionally as a community/association project.

## 10. Services

Use concise, customer-oriented service groups:

- Business and corporate websites
- WordPress & Elementor
- WooCommerce and ordering experiences
- Web applications & MVPs
- Website migration and deployment
- Maintenance and optimization
- Security-focused web development

Security-focused development can include secure authentication patterns, role/access control, input validation, security headers, logging, and safe configuration. Do not advertise penetration testing unless separately validated and approved.

## 11. Skills

Avoid percentages and skill bars. Group skills by practical use:

- Frontend: HTML, CSS, JavaScript, responsive design, accessibility
- CMS: WordPress, Elementor, WooCommerce, migration
- Backend/API: Node.js, Express, EJS, REST APIs, authentication
- Data: MySQL, MariaDB
- Security: secure coding, access control, CSP/security headers, validation, logging, SOC/SIEM fundamentals
- Delivery: Git, GitHub, CI/CD, Hostinger
- Engineering background: analytical problem solving and technical project work

Only show technologies supported by project or profile evidence.

## 12. About

Present the engineering background as a differentiator, not the main offer.

Core narrative:

Mustafa is a security-minded web developer with a mechanical-engineering background. He combines analytical engineering habits with practical WordPress delivery, full-stack product work, and cybersecurity learning to build usable, maintainable digital solutions.

Include location, languages, GitHub, LinkedIn placeholder configuration, and CV availability. Do not publish private contact data from screenshots or documents.

## 13. Contact

Required form fields:

- Name
- Company
- Email
- Project type
- Existing website
- Approximate budget
- Target date
- Project description
- Privacy consent

Implementation requirements:

- Server-side validation and normalization
- Rate limiting
- Honeypot or equivalent low-friction spam protection
- Security headers
- Safe error messages
- No sensitive logging
- No secret in client code
- Environment variables for external providers
- No production email delivery until credentials/provider are approved

If email delivery is not configured, keep the development behavior explicit and testable. Never pretend a message was delivered.

Planned professional address after owner setup:

`info@mustafakelesoglu.de`

## 14. Design direction

Desired qualities:

- Professional
- Clean and airy
- Technical but approachable
- Trustworthy
- Distinctive without being theatrical
- Strong typography
- Clear German-language readability
- High-quality mobile behavior

Suggested palette character:

- Deep navy or charcoal
- True white or a deliberate neutral surface
- Blue or teal accent
- Minimal neon

Avoid:

- Hacker stock photography
- Matrix/code rain
- Hooded figures
- Heavy glow
- Excessive gradients
- Decorative terminal windows
- Fake metrics
- Repetitive bento/card grids
- A pill or badge above every heading
- Lorem ipsum
- Generic AI-generated corporate filler

Prefer a text-led hero if an approved portrait is unavailable. Use genuine project screenshots when legally and technically available.

## 15. Interaction

Use JavaScript only when it improves the experience:

- Mobile navigation
- Project filters
- Language navigation
- Accessible project galleries
- Contact-form feedback
- Theme preference if implemented
- Restrained reveal/motion
- A truthful SaveFold product preview
- A small educational AuthorityLab ALLOW/MODIFY/BLOCK visualization

Avoid scroll hijacking, long intro animation, autoplay media with sound, cursor replacement, or motion that blocks navigation.

## 16. SEO

Implement:

- Unique localized title and description
- Canonical URLs
- Correct hreflang relationships
- Open Graph/Twitter metadata
- Semantic headings
- Sitemap
- robots.txt
- Structured data suitable for a person/professional portfolio
- Project-specific share metadata
- Image alt text
- Human-readable URLs

Use Dinslaken, Duisburg, NRW, Germany, remote, web development, WordPress, and full-stack terms naturally. Do not keyword-stuff or create doorway pages.

## 17. Accessibility and performance

Required:

- Keyboard-operable navigation and forms
- Visible focus
- Correct form labels and errors
- Good contrast
- Semantic landmarks
- Responsive images
- Lazy-loading below the fold
- Reduced-motion support
- No horizontal overflow
- Long German words handled safely
- Touch targets suitable for mobile
- Stable layout without avoidable shift

Verify at minimum:

- 1440px desktop
- 1024px laptop/tablet
- 768px tablet
- 390px mobile
- 360px small mobile

## 18. Engineering and security baseline

Expected repository outputs:

- Clear modular application structure
- Centralized content/data model
- Localized copy separated from templates
- Reusable EJS partials/components
- Central design tokens
- Secure Express defaults
- Helmet or equivalent headers
- Compression where appropriate
- Rate limiting for state-changing endpoints
- Safe input handling
- `.env.example` without secrets
- `.gitignore`
- Dependency scripts for dev, start, test, lint, and formatting
- CI workflow
- Tests for routes, localization, metadata, form validation, and security behavior
- Error handling that does not expose stack traces in production

Do not add a database merely to make the site appear full-stack.

## 19. Autonomous implementation sequence

The owner may be away for 3–4 hours. Do not wait for routine approval.

1. Audit repository and write a short plan.
2. Establish architecture, content schema, localization, and design system.
3. Build the first viewport and verify its responsive behavior.
4. Implement remaining pages and project detail routes.
5. Add security, SEO, error handling, and contact-form foundation.
6. Add tests and CI.
7. Run the application and inspect desktop/mobile views.
8. Fix visible and functional defects.
9. Document missing real assets.
10. Commit and push to `fable/initial-build`.
11. Open a draft PR if supported.
12. Write `docs/SESSION_REPORT.md`.

Routine choices should be made independently and recorded in `docs/DECISIONS.md`.

## 20. Stop conditions

Stop and report instead of guessing when an action would require:

- A password, API key, token, or payment
- Production deployment
- DNS/domain modification
- Sending real messages
- Publishing personal/private data
- Modifying another repository or live client site
- Destructive changes outside this repository
- Making unverifiable professional claims
- Merging into `main`

Missing non-sensitive design assets are not a stop condition. Continue with a polished text-led implementation and record the asset requirement.

## 21. Session acceptance criteria

The autonomous session should produce a reviewable, runnable implementation on its feature branch with:

- Complete core pages and localized routing
- Accurate project/status representation
- Responsive professional design
- Functional navigation and form validation
- Security and accessibility foundation
- SEO essentials
- Tests and CI
- Documentation
- No production deployment
- No merge to main
