'use strict';

module.exports = {
  meta: {
    siteName: 'Mustafa Keleşoğlu',
    titleSuffix: ' · Mustafa Keleşoğlu',
    identity: 'Web Developer | WordPress, Full-Stack & Security',
    positioning: 'Web developer for websites and web applications with a focus on security.',
    pages: {
      home: {
        title: 'Web Developer in Dinslaken, Germany · WordPress, Full-Stack & Security',
        description:
          'Mustafa Keleşoğlu builds fast, responsive websites and custom web applications for companies, associations and digital projects. WordPress, Node.js and security-focused development from Dinslaken, NRW, Germany and remote.',
      },
      projects: {
        title: 'Projects & Case Studies',
        description:
          'Client websites built with WordPress and WooCommerce plus personal software and security projects with Node.js, each with role, technology and verifiable status.',
      },
      services: {
        title: 'Services: Websites, WordPress, Web Applications',
        description:
          'Business websites, WordPress & Elementor, WooCommerce, web applications and MVPs, migration, maintenance and security-focused development for clients in Germany, Europe and remote.',
      },
      about: {
        title: 'About',
        description:
          'Security-minded web developer with a mechanical engineering background, based in Dinslaken, Germany: WordPress projects, full-stack development with Node.js, working in German, English and Turkish.',
      },
      skills: {
        title: 'Skills & Technologies',
        description:
          'Frontend, WordPress, Node.js/Express, MySQL, security and deployment, grouped by practical use, without percentage bars.',
      },
      cv: {
        title: 'CV',
        description:
          'Short profile, education, languages and focus areas of Mustafa Keleşoğlu. CV as PDF on request or available for download once approved.',
      },
      contact: {
        title: 'Request a project',
        description:
          'Planning a website, WordPress project or web application? Describe your project briefly and get a reply in English, German or Turkish.',
      },
      imprint: { title: 'Imprint', description: 'Provider identification and legal notices for mustafakelesoglu.de.' },
      privacy: { title: 'Privacy Policy', description: 'Information on the processing of personal data on mustafakelesoglu.de.' },
      notFound: { title: 'Page not found', description: 'The requested page does not exist.' },
      error: { title: 'Something went wrong', description: 'The request could not be processed.' },
    },
  },

  nav: {
    home: 'Home',
    projects: 'Projects',
    services: 'Services',
    about: 'About',
    skills: 'Skills',
    cv: 'CV',
    contact: 'Contact',
    imprint: 'Imprint',
    privacy: 'Privacy',
    menu: 'Menu',
    openMenu: 'Open menu',
    closeMenu: 'Close menu',
    primaryLabel: 'Main navigation',
    legalLabel: 'Legal',
    requestProject: 'Request a project',
  },

  common: {
    skipToContent: 'Skip to content',
    language: 'Language',
    languageSwitch: 'Switch language',
    currentLanguage: 'Current language',
    theme: 'Colour scheme',
    themeLight: 'Light',
    themeDark: 'Dark',
    themeSystem: 'System',
    themeToggle: 'Toggle colour scheme',
    readMore: 'Learn more',
    viewProject: 'Read case study',
    viewAllProjects: 'View all projects',
    viewServices: 'All services',
    liveSite: 'Open live website',
    externalLink: 'opens in a new tab',
    github: 'GitHub',
    linkedin: 'LinkedIn',
    email: 'Email',
    location: 'Location',
    languages: 'Languages',
    availability: 'Availability',
    focus: 'Focus',
    status: 'Status',
    year: 'Period',
    role: 'Role',
    technology: 'Technologies',
    client: 'Client project',
    personal: 'Personal project',
    backToProjects: 'Back to projects',
    nextProject: 'Next project',
    downloadCv: 'Download CV',
    cvPending: 'CV as PDF will follow once approved',
    statusLabels: {
      live: 'Live',
      inDevelopment: 'In development · Technical beta',
      validation: 'Validation phase · Security R&D',
    },
    languageLevels: { native: 'Native', C1: 'C1 (professional)', B2: 'B2' },
    languageNames: { de: 'German', en: 'English', tr: 'Turkish' },
    workMode: 'NRW and remote',
    locationLine: 'Dinslaken, North Rhine-Westphalia, Germany',
    responseLanguages: 'Reply in English, German or Turkish',
  },

  hero: {
    eyebrow: 'Mustafa Keleşoğlu · Web Developer',
    title: 'Websites & web applications with a focus on security.',
    text: 'I build fast, responsive websites and custom web applications for companies, associations and digital projects, using WordPress, Elementor and modern full-stack technologies.',
    context: 'Based in Dinslaken, Germany · Projects in NRW and remote',
    primary: 'View projects',
    secondary: 'Request a project',
    tertiary: 'Download CV',
    facts: [
      { label: 'Location', value: 'Dinslaken, Germany · remote' },
      { label: 'Focus', value: 'WordPress · Node.js · Security' },
      { label: 'Languages', value: 'English · Deutsch · Türkçe' },
      { label: 'Currently', value: 'Open for website and web app projects' },
    ],
  },

  home: {
    evidence: {
      label: 'Verifiable',
      items: [
        { value: '3', label: 'Live client websites', detail: 'WordPress, Elementor, WooCommerce' },
        { value: '2', label: 'Personal software projects', detail: 'Full-stack product and security R&D' },
        { value: '3', label: 'Working languages', detail: 'German C1 · English B2 · Turkish native' },
        { value: 'DE + remote', label: 'Service area', detail: 'Dinslaken, Duisburg, NRW, and anywhere online' },
      ],
    },
    featured: {
      eyebrow: 'Selected work',
      title: 'Client websites and personal software projects',
      text: 'Real projects with a clearly stated role, technology and status. No demos.',
    },
    services: {
      eyebrow: 'Services',
      title: 'What I can build for you',
      text: 'From a business website to a custom web application. Everything responsive, maintainable and built with security in mind.',
    },
    process: {
      eyebrow: 'How I work',
      title: 'How a project runs',
      steps: [
        {
          title: 'Understand',
          text: 'A short conversation about goal, audience, content and budget. You get an honest assessment of what makes sense and what does not.',
        },
        {
          title: 'Plan',
          text: 'Site structure, technology decision (WordPress or a custom application), timeline and a clear scope. No surprises.',
        },
        { title: 'Build', text: 'Development in traceable steps with interim versions you can check in your browser.' },
        {
          title: 'Check & hand over',
          text: 'Responsive tests, forms, security basics and a short briefing so you can maintain the site yourself.',
        },
      ],
    },
    security: {
      eyebrow: 'The difference',
      title: 'Built security-minded, not patched afterwards',
      text: 'I come at the web not only from design but also from the systems side: SOC, SIEM, log analysis and system security are part of my ongoing practice. That changes how I build websites and applications.',
      points: [
        { title: 'Secure sign-in', text: 'Password hashing, session protection and roles instead of "one admin for everything".' },
        {
          title: 'Validation everywhere',
          text: 'Every input is checked and normalised on the server, including forms on WordPress sites.',
        },
        {
          title: 'Safe headers and configuration',
          text: 'Content Security Policy, HTTPS, secure cookies and no secrets in frontend code.',
        },
        { title: 'Traceability', text: 'Sensible logging without personal data, so problems can be found without creating new risks.' },
      ],
      note: 'What I do not offer: professional penetration testing. What you get: a website that avoids the typical mistakes from the start.',
    },
    about: {
      eyebrow: 'About',
      title: 'Web developer with an engineering background',
      text: 'I am Mustafa Keleşoğlu, a web developer based in Dinslaken, Germany. My path led from a mechanical engineering degree to web development, and I kept the analytical thinking and clean documentation. Today I combine WordPress projects for clients, personal full-stack products with Node.js and a security-minded way of working.',
      cta: 'More about me',
    },
    skills: {
      eyebrow: 'Skills',
      title: 'Tools, grouped by what they are used for',
      cta: 'All skills',
    },
    contact: {
      eyebrow: 'Contact',
      title: "Let's talk about your project",
      text: 'Describe briefly what you have in mind. I usually reply within a few working days, in English, German or Turkish.',
      cta: 'Request a project',
    },
  },

  projects: {
    eyebrow: 'Projects',
    title: 'Projects & Case Studies',
    intro:
      'Two kinds of work: websites I built for clients with WordPress, and personal software projects where I combine full-stack development and security research. Every project states what my role was and what the current status is.',
    groups: {
      product: {
        title: 'Software Products & Security Labs',
        text: 'Personal products and research projects with Node.js, honestly labelled by development stage.',
      },
      client: { title: 'Client Websites', text: 'Client projects with WordPress, Elementor and WooCommerce, live and publicly reachable.' },
    },
    filter: { label: 'Filter projects', all: 'All', product: 'Software & security', client: 'Client websites', count: '{count} projects' },
    sections: {
      summary: 'In short',
      problem: 'Starting point',
      role: 'My role',
      solution: 'Solution',
      technology: 'Technologies',
      features: 'Key functionality',
      security: 'Security & performance',
      media: 'Views',
      outcomes: 'Outcome',
      status: 'Status',
      links: 'Links',
    },
    mediaPending: 'Screenshot to follow once approved',
    mediaDesktop: 'Desktop view',
    mediaMobile: 'Mobile view',
    kindClient: 'Client project',
    kindPersonal: 'Personal project',
    facts: { role: 'Role', status: 'Status', stack: 'Stack', year: 'Period', type: 'Type' },
    preview: {
      savefold: {
        title: 'How SaveFold works',
        text: 'Simplified, static preview of the flow. No live data.',
        steps: ['Share or paste a link', 'Assign a category and a task', 'Find it again later via search'],
        sampleCategories: ['Reading', 'Tools', 'Recipes', 'Videos'],
        sampleItems: [
          { title: 'Article on Content Security Policy', source: 'Website', category: 'Reading' },
          { title: 'Express middleware explained', source: 'YouTube', category: 'Videos' },
          { title: 'CLI tool for Git workflows', source: 'X', category: 'Tools' },
        ],
      },
      authoritylab: {
        title: 'ALLOW, MODIFY or BLOCK?',
        text: 'A small learning example: pick a configuration change and see how the decision core classifies it. Static, nothing is executed.',
        chooseLabel: 'Choose a change',
        cases: [
          {
            label: 'Hook only reads files inside the project folder',
            decision: 'ALLOW',
            reason: 'No new authority: read access stays within the already permitted area.',
          },
          {
            label: 'Script additionally gains write access to the CI configuration',
            decision: 'MODIFY',
            reason: 'Expansion detected. Suggestion: limit write access to the target folder, then re-check.',
          },
          {
            label: 'MCP server delegates commands to an undeclared tool',
            decision: 'BLOCK',
            reason: 'Delegation bypasses the declared boundary. Transitive authority would no longer be traceable.',
          },
          {
            label: 'New command with unknown origin',
            decision: 'UNKNOWN',
            reason: 'Neither automatically safe nor automatically critical: the case is flagged for manual review.',
          },
        ],
        legend: { ALLOW: 'Allowed', MODIFY: 'Adjust', BLOCK: 'Block', UNKNOWN: 'Unknown' },
      },
    },
  },

  services: {
    eyebrow: 'Services',
    title: 'Services for companies, associations and digital projects',
    intro:
      'I take websites and web applications from planning to publishing, and look after them afterwards. WordPress when your team should maintain content themselves; a custom Node.js application when logic, logins or data come into play.',
    relatedLabel: 'Examples',
    ctaTitle: 'Not sure what you need?',
    ctaText:
      'Just describe your goal. I will tell you honestly whether a WordPress website is enough or a custom application makes more sense.',
    cta: 'Request a project',
    fit: {
      title: 'A good fit if you …',
      items: [
        'need a website that brings in enquiries rather than just existing',
        'want to maintain your own content later on',
        'are planning an internal tool or a first product version',
        'want to move, repair or secure an existing site',
      ],
    },
  },

  about: {
    eyebrow: 'About',
    title: 'Security-minded web developer with an engineering background',
    lead: 'I am Mustafa Keleşoğlu, a web developer based in Dinslaken, North Rhine-Westphalia, Germany. I build websites and web applications that load fast, work on every device and are configured securely from the start.',
    story: [
      'My path into web development began with a completed degree in mechanical engineering. The German Central Office for Foreign Education (ZAB) evaluated the degree positively and rated it as comparable to a German bachelor’s degree. From that time I kept habits that help me every day: breaking problems down in a structured way, documenting decisions and checking results before calling them done.',
      'I grew in practice through client projects with WordPress, Elementor and WooCommerce: company sites, a restaurant website with an ordering path, an association website. Add to that migrations, hosting and deployment, the unglamorous work that decides whether a site runs reliably.',
      'Alongside client work I develop my own software with Node.js, Express and EJS: SaveFold as a full-stack product and AuthorityLab as a security research project. Security is not an extra here. I work with SOC, SIEM, log analysis and system security, and that knowledge goes into every application I build.',
    ],
    factsTitle: 'At a glance',
    facts: [
      { label: 'Location', value: 'Dinslaken, North Rhine-Westphalia, Germany' },
      { label: 'Working area', value: 'NRW (Duisburg, Ruhr area, Lower Rhine) and remote' },
      { label: 'Languages', value: 'Turkish (native), German (C1 professional), English (B2)' },
      { label: 'Education', value: 'Mechanical engineering degree, ZAB evaluation comparable to a German bachelor’s degree' },
      { label: 'Web', value: 'WordPress, Elementor, WooCommerce, migration, hosting' },
      { label: 'Full-stack', value: 'Node.js, Express, EJS, REST APIs, MySQL/MariaDB, Git, CI/CD' },
      { label: 'Security', value: 'Secure development, SOC/SIEM fundamentals, log analysis' },
    ],
    workingTitle: 'How I work',
    working: [
      {
        title: 'Clear communication',
        text: 'You learn early what is feasible, what it costs and where the risks are. In English, German or Turkish.',
      },
      { title: 'Honest about status', text: 'I describe projects as they are, including what is still in progress.' },
      { title: 'Built to be maintained', text: 'No special solutions only I understand. Your website should keep running without me.' },
    ],
    linksTitle: 'Profiles',
    cta: 'Request a project',
    cvCta: 'View CV',
  },

  skills: {
    eyebrow: 'Skills',
    title: 'Skills by practical use',
    intro: 'No percentage bars, no buzzword cloud. This is what I work with and what I use it for, backed by the projects on this site.',
    evidenceTitle: 'Backed by',
    approachTitle: 'How I choose technology',
    approach: [
      {
        title: 'As simple as possible',
        text: 'WordPress when it is enough. A custom application when logic and data demand it. No framework out of habit.',
      },
      {
        title: 'Verifiable',
        text: 'I only list technologies I have used in real projects. I keep learning new things, and I say when something is new.',
      },
      {
        title: 'Configured securely',
        text: 'Every technology is used with its security standards: headers, validation, access rights, updates.',
      },
    ],
  },

  cv: {
    eyebrow: 'CV',
    title: 'Curriculum Vitae',
    intro: 'Short profile for companies, clients and teams. A downloadable PDF will follow once it has been approved.',
    downloadTitle: 'PDF download',
    downloadPending: 'The CV as PDF is currently being prepared. Until then I am happy to send it on request.',
    requestCv: 'Request CV',
    sections: {
      profile: 'Profile',
      focus: 'Focus areas',
      projects: 'Projects',
      education: 'Education',
      languages: 'Languages',
      skills: 'Skills',
      links: 'Links',
    },
    profile:
      'Web developer focused on WordPress, full-stack development (Node.js) and security-minded implementation. Mechanical engineering background, based in Dinslaken, Germany, working in NRW and remote.',
    focus: [
      'WordPress, Elementor and WooCommerce websites for companies, restaurants and associations',
      'Custom web applications with Node.js, Express, EJS, REST APIs and MySQL/MariaDB',
      'Security-minded development: authentication, access control, validation, security headers',
      'Migration, hosting, deployment and maintenance',
    ],
    education: [
      { title: 'Degree in mechanical engineering', text: 'ZAB evaluation: comparable to a German bachelor’s degree.' },
      {
        title: 'Continuing education in IT security',
        text: 'Learning and hands-on experience in SOC, SIEM, log analysis and system security.',
      },
    ],
    note: 'Certificates, transcripts and the ZAB evaluation are provided on request and are not published online.',
  },

  contact: {
    eyebrow: 'Contact',
    title: 'Request a project',
    intro:
      'Describe your project briefly. The more concrete the goal, scope and timeframe, the faster I can tell whether and how I can help. I usually reply within a few working days.',
    asideTitle: 'Reach me directly',
    asideText: 'You can also write to me directly. I reply in English, German or Turkish.',
    asideNote: 'No newsletter, no sharing of your data. Details in the privacy policy.',
    form: {
      legend: 'Project request',
      name: 'Name',
      company: 'Company / organisation',
      companyHint: 'Optional',
      email: 'Email address',
      projectType: 'Type of project',
      projectTypePlaceholder: 'Please select',
      projectTypes: {
        website: 'New website',
        wordpress: 'WordPress / Elementor',
        shop: 'WooCommerce / ordering',
        app: 'Web application / MVP',
        migration: 'Migration / move',
        maintenance: 'Maintenance / optimisation',
        other: 'Other',
      },
      website: 'Existing website',
      websiteHint: 'Optional, e.g. https://…',
      budget: 'Approximate budget',
      budgetPlaceholder: 'Please select',
      budgets: {
        unknown: 'Not decided yet',
        b1: 'up to €1,500',
        b2: '€1,500 – 4,000',
        b3: '€4,000 – 10,000',
        b4: 'over €10,000',
      },
      deadline: 'Target date',
      deadlineHint: 'Optional, e.g. "end of Q1" or a date',
      message: 'Project description',
      messageHint: 'Goal, audience, desired features, examples, anything that helps.',
      consent: 'I have read the privacy policy and agree to the processing of my details for handling my request.',
      consentLink: 'privacy policy',
      submit: 'Send request',
      submitting: 'Sending …',
      required: 'Required',
      optional: 'optional',
      charsLeft: '{count} characters left',
    },
    errors: {
      summary: 'Please check the highlighted fields.',
      summaryCount: 'The form contains {count} errors.',
      name: 'Please enter your name (2 to 100 characters).',
      email: 'Please enter a valid email address.',
      projectType: 'Please select a project type.',
      website: 'Please enter a valid web address or leave the field empty.',
      budget: 'Please select a valid option.',
      deadline: 'Please shorten this entry (maximum 100 characters).',
      message: 'Please describe your project (20 to 3000 characters).',
      consent: 'Please agree to the processing of your details.',
      company: 'Please shorten this entry (maximum 150 characters).',
      spam: 'The request could not be accepted.',
      rateLimit: 'Too many requests in a short time. Please try again in a few minutes.',
      generic: 'The request could not be processed right now. Please try again later or write to me directly by email.',
    },
    success: {
      title: 'Thank you for your request',
      text: 'Your details have arrived. I usually get back to you within a few working days.',
      back: 'Back to the home page',
    },
    devNotice: {
      title: 'Request validated, delivery not active yet',
      text: 'This website is still being set up. Your details were validated but not delivered, because email delivery will only be activated after approval. Until then, please write directly to {email}.',
    },
  },

  legal: {
    imprint: {
      title: 'Imprint',
      intro: 'Information according to § 5 DDG (German Digital Services Act)',
      sections: [
        {
          title: 'Provider',
          lines: ['Mustafa Keleşoğlu', 'Web development', '46537 Dinslaken', 'Germany'],
        },
        { title: 'Contact', lines: ['Email: {email}'] },
        { title: 'Responsible for content', lines: ['Mustafa Keleşoğlu'] },
        {
          title: 'Liability for content',
          lines: [
            'The content of this website has been created with great care. However, no guarantee can be given for the accuracy, completeness or timeliness of the content. As a service provider I am responsible for my own content on these pages under the general laws.',
          ],
        },
        {
          title: 'Liability for links',
          lines: [
            'This website contains links to external third-party websites over whose content I have no influence. The respective provider or operator is always responsible for that content. The linked pages were checked for possible legal violations at the time of linking.',
          ],
        },
        {
          title: 'Copyright',
          lines: [
            'The content and works created by the site operator on these pages are subject to German copyright law. Third-party contributions, in particular names and brands of the presented client projects, are marked as such and remain the property of their respective owners.',
          ],
        },
        {
          title: 'Dispute resolution',
          lines: ['I am neither willing nor obliged to participate in dispute resolution proceedings before a consumer arbitration board.'],
        },
      ],
    },
    privacy: {
      title: 'Privacy Policy',
      updated: 'Last updated: September 2026',
      sections: [
        {
          title: '1. Controller',
          paragraphs: ['The controller for data processing on this website is Mustafa Keleşoğlu, Dinslaken, Germany. Contact: {email}.'],
        },
        {
          title: '2. Hosting and server log files',
          paragraphs: [
            'This website is operated by an external hosting provider. When you visit the website, the server automatically processes technical information transmitted by your browser: IP address, date and time, requested page, amount of data transferred, browser type and operating system, and the previously visited page (referrer).',
            'This data is required for the secure and stable operation of the website. The legal basis is Art. 6(1)(f) GDPR (legitimate interest in secure operation). Log files are deleted after a short period unless they are needed to investigate a security incident.',
          ],
        },
        {
          title: '3. Contact form and email',
          paragraphs: [
            'If you use the contact form, the details you enter (name, email address, optionally company and existing website, project type, budget range, target date and project description) are processed to handle your request. The legal basis is Art. 6(1)(b) GDPR (pre-contractual measures) and, where you consent, Art. 6(1)(a) GDPR.',
            'To protect against automated requests the form uses an invisible check field and a limit on requests per period. Your IP address is processed briefly for this purpose but not stored permanently.',
            'Your details are deleted once the request has been fully handled and no statutory retention obligations apply. If a contract is concluded, the data continues to be processed for the purpose of fulfilling that contract.',
          ],
        },
        {
          title: '4. Cookies and local storage',
          paragraphs: [
            'This website does not use tracking or analytics cookies. If you manually switch the colour scheme (light/dark), this setting is stored only locally in your browser (local storage). No data is transmitted to me or to third parties.',
          ],
        },
        {
          title: '5. External links and fonts',
          paragraphs: [
            'The website links to external services (for example GitHub or the websites of presented client projects). When you follow these links, the privacy policy of the respective provider applies. Fonts are served locally from this website’s own server; no connection to external font services is made.',
          ],
        },
        {
          title: '6. Your rights',
          paragraphs: [
            'You have the right of access (Art. 15 GDPR), rectification (Art. 16), erasure (Art. 17), restriction of processing (Art. 18), data portability (Art. 20) and objection (Art. 21). You may withdraw any consent given at any time with effect for the future. You also have the right to lodge a complaint with a data protection supervisory authority; the competent authority includes the State Commissioner for Data Protection and Freedom of Information of North Rhine-Westphalia.',
          ],
        },
        {
          title: '7. Changes',
          paragraphs: [
            'This privacy policy will be updated when the website or the legal requirements change. The version published here applies. The German version is authoritative.',
          ],
        },
      ],
    },
  },

  errors: {
    notFound: {
      code: '404',
      title: 'This page does not exist',
      text: 'The address may be misspelled, outdated, or the page has been moved. One of these paths may help:',
      home: 'Go to the home page',
      projects: 'Go to projects',
      contact: 'Get in touch',
    },
    server: {
      code: 'Error',
      title: 'Something went wrong',
      text: 'The request could not be processed. The error has been logged internally. Please try again shortly.',
      home: 'Go to the home page',
    },
  },

  footer: {
    tagline: 'Websites & web applications with a focus on security.',
    location: 'Dinslaken, Germany · Projects in NRW and remote',
    navTitle: 'Pages',
    projectsTitle: 'Projects',
    contactTitle: 'Contact',
    legalTitle: 'Legal',
    rights: 'All rights reserved.',
    builtWith: 'Built by me with Node.js, Express and EJS. No tracking.',
  },
};
