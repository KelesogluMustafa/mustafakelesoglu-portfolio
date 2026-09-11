'use strict';

/**
 * Structured project content.
 *
 * Rules (from docs/PORTFOLIO_MASTER_BRIEF.md):
 * - Only verifiable facts. No user counts, revenue, scores or invented outcomes.
 * - SaveFold is "In Development / Technical Beta".
 * - AuthorityLab is "Validation Phase / Security R&D".
 * - Client sites are described from public, read-only inspection.
 *
 * `group` is either "product" (Software Products & Security Labs) or "client" (Client Websites).
 * `media` entries reference files under /public/img/projects; missing files are listed in
 * docs/ASSET_CHECKLIST.md and the template renders a text-led frame instead.
 */

const projects = [
  {
    slug: 'savefold',
    group: 'product',
    kind: 'personal',
    featured: true,
    order: 1,
    year: null,
    liveUrl: null,
    repoUrl: null,
    statusKey: 'inDevelopment',
    tech: ['Node.js', 'Express', 'EJS', 'CSS', 'JavaScript', 'MySQL/MariaDB', 'REST API', 'PWA', 'GitHub', 'Hostinger Node.js'],
    media: { desktop: 'savefold-desktop.png', mobile: 'savefold-mobile.png' },
    accent: 'teal',
    i18n: {
      de: {
        title: 'SaveFold',
        tagline: 'Links und Inhalte aus dem Web sammeln, ordnen und wiederfinden.',
        summary:
          'SaveFold ist eine Web-Anwendung, mit der nützliche Links und geteilte Inhalte aus Websites, YouTube, X/Twitter, Instagram und anderen Quellen gespeichert, kategorisiert, durchsucht und verwaltet werden. Es ist mein zentrales Full-Stack-Produktprojekt und befindet sich in der technischen Beta.',
        problem:
          'Interessante Inhalte landen verstreut in Browser-Lesezeichen, Chat-Nachrichten und Social-Media-Apps. Später wiederfinden ist mühsam, und die meisten Werkzeuge sind entweder zu einfach oder an eine einzelne Plattform gebunden. Gebraucht wurde ein eigener, plattformunabhängiger Ort, an dem Links mit Kategorien, Notizen und Aufgaben zusammenlaufen.',
        role: 'Konzept, Datenmodell, Backend, Frontend, Sicherheit, Tests und Deployment-Workflow – als eigenes Produktprojekt vollständig selbst umgesetzt.',
        solution:
          'Eine serverseitig gerenderte Express/EJS-Anwendung mit relationaler Datenbank und einer REST-API. Nutzer registrieren sich, legen eine persönliche Bibliothek mit Kategorien und Unterkategorien an, versehen Einträge mit Aufgaben und finden Inhalte über Suche und Filter wieder. Die Anwendung ist als PWA nutzbar; das Speichern von unterwegs ist über die Teilen-Funktion des Smartphones vorgesehen.',
        features: [
          'Registrierung, Login und Sitzungsverwaltung',
          'Bibliothek mit Einträgen, Kategorien und Unterkategorien',
          'Aufgaben und Aktionen zu gespeicherten Inhalten',
          'Suche und Filter über die gesamte Bibliothek',
          'REST-API für Client- und Automatisierungszugriffe',
          'Teilen aus dem Smartphone (iOS-Kurzbefehl, Android Share-Target) und PWA-Installation',
          'Rollen, Pläne und administrative Kontrollen',
          'Export der eigenen Daten',
        ],
        security: [
          'Serverseitige Validierung aller Eingaben und Zugriffskontrolle auf Datensatzebene',
          'Sicherheits-Header, sichere Session-Konfiguration und geschützte Admin-Bereiche',
          'Automatisierte Tests für Kernabläufe',
          'Versionierter Deployment-Workflow von GitHub zur Hostinger-Node.js-Umgebung',
        ],
        outcomes: ['Lauffähige technische Beta mit den oben genannten Kernfunktionen', 'Reproduzierbarer Build- und Deployment-Prozess'],
        outcomesNote: 'Nutzerzahlen oder Marktdaten werden bewusst nicht angegeben, weil das Produkt noch nicht öffentlich gestartet ist.',
        ctaTitle: 'Ähnliche Web-Anwendung geplant?',
        ctaText:
          'Ich entwickle individuelle Web-Anwendungen und MVPs mit sauberem Datenmodell, sicherer Authentifizierung und nachvollziehbarem Deployment.',
      },
      en: {
        title: 'SaveFold',
        tagline: 'Collect, organise and find links and content from across the web.',
        summary:
          'SaveFold is a web application for saving, categorising, searching and managing useful links and shared content from websites, YouTube, X/Twitter, Instagram and other sources. It is my main full-stack product project and is currently in technical beta.',
        problem:
          'Interesting content ends up scattered across browser bookmarks, chat messages and social media apps. Finding it again later is tedious, and most tools are either too basic or tied to a single platform. What was needed was a self-owned, platform-independent place where links, categories, notes and tasks come together.',
        role: 'Concept, data model, backend, frontend, security, tests and deployment workflow, all implemented by me as a personal product project.',
        solution:
          'A server-rendered Express/EJS application backed by a relational database and a REST API. Users register, build a personal library with categories and subcategories, attach tasks to entries and retrieve content through search and filters. The app works as a PWA, and saving on the go is designed around the phone share sheet.',
        features: [
          'Registration, login and session management',
          'Library with entries, categories and subcategories',
          'Tasks and actions attached to saved content',
          'Search and filtering across the whole library',
          'REST API for client and automation access',
          'Sharing from the phone (iOS Shortcut, Android share target) and PWA installation',
          'Roles, plans and administrative controls',
          'Export of your own data',
        ],
        security: [
          'Server-side validation of all input and record-level access control',
          'Security headers, safe session configuration and protected admin areas',
          'Automated tests for core flows',
          'Versioned deployment workflow from GitHub to the Hostinger Node.js environment',
        ],
        outcomes: ['Working technical beta with the core features listed above', 'Reproducible build and deployment process'],
        outcomesNote: 'User numbers or market figures are deliberately not stated because the product has not launched publicly yet.',
        ctaTitle: 'Planning a similar web application?',
        ctaText:
          'I build custom web applications and MVPs with a clean data model, secure authentication and a deployment process you can follow.',
      },
      tr: {
        title: 'SaveFold',
        tagline: 'Web’den gelen bağlantı ve içerikleri toplayın, düzenleyin, yeniden bulun.',
        summary:
          'SaveFold; web siteleri, YouTube, X/Twitter, Instagram ve diğer kaynaklardan gelen faydalı bağlantı ve içerikleri kaydetmek, kategorilendirmek, aramak ve yönetmek için geliştirdiğim bir web uygulamasıdır. Ana full-stack ürün projem olup şu anda teknik beta aşamasındadır.',
        problem:
          'İlginç içerikler tarayıcı yer imlerine, sohbet mesajlarına ve sosyal medya uygulamalarına dağılıyor. Sonradan bulmak zahmetli; mevcut araçlar ya çok basit ya da tek bir platforma bağlı. Bağlantıların, kategorilerin, notların ve görevlerin bir arada durduğu, platformdan bağımsız ve kullanıcının kendine ait bir alan gerekiyordu.',
        role: 'Konsept, veri modeli, backend, frontend, güvenlik, testler ve deployment akışı; kişisel ürün projesi olarak tamamen kendim geliştirdim.',
        solution:
          'İlişkisel veritabanı ve REST API ile desteklenen, sunucu tarafında render edilen bir Express/EJS uygulaması. Kullanıcılar kayıt olur, kategori ve alt kategorilerden oluşan kişisel bir kütüphane kurar, kayıtlara görev ekler ve içeriği arama ile filtreler üzerinden geri bulur. Uygulama PWA olarak çalışır; hareket hâlindeyken kaydetme telefonun paylaşım menüsü üzerinden tasarlanmıştır.',
        features: [
          'Kayıt, giriş ve oturum yönetimi',
          'Kayıtlar, kategoriler ve alt kategorilerden oluşan kütüphane',
          'Kaydedilen içeriklere bağlı görev ve eylemler',
          'Tüm kütüphanede arama ve filtreleme',
          'İstemci ve otomasyon erişimi için REST API',
          'Telefondan paylaşım (iOS Kısayolu, Android share target) ve PWA kurulumu',
          'Roller, paketler ve yönetim kontrolleri',
          'Kullanıcının kendi verisini dışa aktarması',
        ],
        security: [
          'Tüm girdilerin sunucu tarafında doğrulanması ve kayıt düzeyinde erişim kontrolü',
          'Güvenlik başlıkları, güvenli oturum yapılandırması ve korumalı yönetim alanları',
          'Temel akışlar için otomatik testler',
          'GitHub’dan Hostinger Node.js ortamına sürümlü deployment akışı',
        ],
        outcomes: ['Yukarıdaki temel özelliklerle çalışan teknik beta', 'Tekrarlanabilir build ve deployment süreci'],
        outcomesNote:
          'Ürün henüz herkese açık olarak yayınlanmadığı için kullanıcı sayısı veya pazar verisi bilinçli olarak verilmemiştir.',
        ctaTitle: 'Benzer bir web uygulaması mı planlıyorsunuz?',
        ctaText:
          'Temiz veri modeli, güvenli kimlik doğrulama ve izlenebilir deployment süreciyle özel web uygulamaları ve MVP’ler geliştiriyorum.',
      },
    },
  },
  {
    slug: 'authoritylab',
    group: 'product',
    kind: 'personal',
    featured: true,
    order: 2,
    year: null,
    liveUrl: null,
    repoUrl: null,
    statusKey: 'validation',
    tech: ['Node.js', 'CLI', 'CI-Integration', 'Web GUI', 'JavaScript', 'Security Research'],
    media: { desktop: 'authoritylab-desktop.png', mobile: 'authoritylab-mobile.png' },
    accent: 'navy',
    i18n: {
      de: {
        title: 'AuthorityLab',
        tagline: 'Deterministische Prüfung von Berechtigungsänderungen für KI-Agenten, die in Repositories definiert sind.',
        summary:
          'AuthorityLab ist ein Sicherheitsforschungs- und Produktentwicklungsprojekt. Es soll analysieren, welche Befugnisse ein in einem Repository konfigurierter KI-Agent hat, wie sich diese Befugnisse durch Änderungen verschieben und ob eine Änderung erlaubt, angepasst oder blockiert werden sollte. Das Projekt befindet sich in der Validierungsphase.',
        problem:
          'KI-Agenten werden zunehmend über Dateien im Repository konfiguriert: Hooks, Skripte, Befehle, MCP-Server. Eine kleine Änderung kann einem Agenten unbemerkt mehr Rechte geben, als beabsichtigt war – etwa durch Delegation oder durch Umgehung bestehender Schranken. Diese Verschiebungen sind schwer zu erkennen, weil sie sich über mehrere Dateien und Ebenen verteilen.',
        role: 'Eigenes Forschungs- und Entwicklungsprojekt: Konzept, Entscheidungsmodell, Architektur und Validierungsplanung.',
        solution:
          'Der geplante deterministische Entscheidungskern soll den Berechtigungszustand vor und nach einer Änderung vergleichen (Transitive Authority Regression Check) und ein nachvollziehbares Ergebnis liefern: ALLOW, MODIFY oder BLOCK. Unbekannte Elemente sollen weder automatisch als sicher noch automatisch als kritisch eingestuft, sondern ausdrücklich als UNKNOWN ausgewiesen werden. Jede Entscheidung soll mit erklärbaren, prüfbaren Belegen begründet werden.',
        features: [
          'Transitive Authority Regression Check über Repository-Konfiguration',
          'Deterministischer Entscheidungskern mit ALLOW / MODIFY / BLOCK',
          'Explizite UNKNOWN-Klasse statt stillschweigender Annahmen',
          'Erkennung von Delegation und Umgehung bestehender Schranken',
          'Erklärbare, auditierbare Belege je Entscheidung',
          'Geplante lokale und CI-taugliche Kommandozeile',
          'Konzept für eine schlanke Web-GUI mit bereinigter Berichtshistorie',
        ],
        security: [
          'Kandidaten-Befehle, Hooks, Skripte oder MCP-Server werden nie ausgeführt – die Analyse ist rein statisch',
          'Geheimniswerte werden weder gelesen noch gespeichert',
          'Berichte werden vor der Anzeige bereinigt',
        ],
        outcomes: [
          'Definiertes Entscheidungsmodell mit dokumentierter Semantik',
          'Dokumentierte Architektur und Validierungsplan für CLI und Web-Oberfläche',
        ],
        outcomesNote:
          'Gehostetes Produkt, Laufzeit-Durchsetzung, Attestierung, Pilotkunden oder kommerzielle Validierung sind nicht abgeschlossen und werden hier nicht behauptet.',
        ctaTitle: 'Sicherheitsbewusste Entwicklung für Ihr Projekt?',
        ctaText:
          'Das Denken aus diesem Projekt – klare Berechtigungen, nachvollziehbare Entscheidungen, keine stillen Annahmen – fließt in jede Web-Anwendung ein, die ich baue.',
      },
      en: {
        title: 'AuthorityLab',
        tagline: 'Deterministic analysis of authority changes for AI agents defined in repositories.',
        summary:
          'AuthorityLab is a security research and product development project. It is designed to analyse which authority an AI agent configured inside a repository holds, how that authority shifts when the configuration changes, and whether a change should be allowed, modified or blocked. The project is in its validation phase.',
        problem:
          'AI agents are increasingly configured through files in the repository: hooks, scripts, commands, MCP servers. A small change can quietly give an agent more authority than intended, for example through delegation or by bypassing an existing boundary. These shifts are hard to spot because they spread across several files and layers.',
        role: 'Personal research and development project: concept, decision model, architecture and validation planning.',
        solution:
          'The planned deterministic decision core is intended to compare the authority state before and after a change (Transitive Authority Regression Check) and produce a traceable result: ALLOW, MODIFY or BLOCK. Unknown elements should be treated neither as safe nor as critical by default; they should be reported explicitly as UNKNOWN. Each decision is intended to include explainable, auditable evidence.',
        features: [
          'Transitive Authority Regression Check across repository configuration',
          'Deterministic decision core with ALLOW / MODIFY / BLOCK semantics',
          'Explicit UNKNOWN class instead of silent assumptions',
          'Detection of delegation and bypass of existing boundaries',
          'Explainable, auditable evidence for each decision',
          'Planned local and CI-friendly command line interface',
          'Concept for a thin web GUI with sanitised report history',
        ],
        security: [
          'Candidate commands, hooks, scripts or MCP servers are never executed; the analysis is purely static',
          'Secret values are neither read nor stored',
          'Reports are sanitised before they are displayed',
        ],
        outcomes: [
          'Defined decision model with documented semantics',
          'Documented architecture and validation plan for a CLI and web interface',
        ],
        outcomesNote:
          'A hosted product, runtime enforcement, attestation, pilot customers or commercial validation are not complete and are not claimed here.',
        ctaTitle: 'Security-minded development for your project?',
        ctaText:
          'The thinking behind this project, clear authority, traceable decisions and no silent assumptions, goes into every web application I build.',
      },
      tr: {
        title: 'AuthorityLab',
        tagline: 'Repository içinde tanımlanan yapay zekâ ajanlarının yetki değişimlerinin deterministik analizi.',
        summary:
          'AuthorityLab bir güvenlik araştırması ve ürün geliştirme projesidir. Bir repository içinde yapılandırılan yapay zekâ ajanının hangi yetkilere sahip olduğunu, yapılandırma değiştiğinde bu yetkilerin nasıl kaydığını ve bir değişikliğe izin verilmesi mi, değiştirilmesi mi yoksa engellenmesi mi gerektiğini analiz etmek üzere tasarlanmıştır. Proje doğrulama aşamasındadır.',
        problem:
          'Yapay zekâ ajanları giderek repository içindeki dosyalarla yapılandırılıyor: hook’lar, script’ler, komutlar, MCP sunucuları. Küçük bir değişiklik, delegasyon veya mevcut bir sınırın atlanması yoluyla ajana fark edilmeden amaçlanandan fazla yetki verebilir. Bu kaymalar birden fazla dosyaya ve katmana yayıldığı için görülmesi zordur.',
        role: 'Kişisel araştırma ve geliştirme projesi: konsept, karar modeli, mimari ve doğrulama planlaması.',
        solution:
          'Planlanan deterministik karar çekirdeği, değişiklik öncesi ve sonrası yetki durumunu karşılaştırmak (Transitive Authority Regression Check) ve izlenebilir bir sonuç üretmek üzere tasarlanmıştır: ALLOW, MODIFY veya BLOCK. Bilinmeyen öğelerin varsayılan olarak ne güvenli ne de kritik kabul edilmesi; açıkça UNKNOWN olarak raporlanması hedeflenir. Her kararın açıklanabilir, denetlenebilir kanıtlarla desteklenmesi amaçlanır.',
        features: [
          'Repository yapılandırması üzerinde Transitive Authority Regression Check',
          'ALLOW / MODIFY / BLOCK semantiğine sahip deterministik karar çekirdeği',
          'Sessiz varsayımlar yerine açık UNKNOWN sınıfı',
          'Delegasyon ve mevcut sınırların atlanmasının tespiti',
          'Her karar için açıklanabilir, denetlenebilir kanıt',
          'Planlanan yerel ve CI uyumlu komut satırı arayüzü',
          'Temizlenmiş rapor geçmişine sahip sade web arayüzü konsepti',
        ],
        security: [
          'Aday komutlar, hook’lar, script’ler veya MCP sunucuları asla çalıştırılmaz; analiz tamamen statiktir',
          'Gizli değerler okunmaz ve saklanmaz',
          'Raporlar gösterilmeden önce temizlenir',
        ],
        outcomes: ['Belgelenmiş semantiğe sahip tanımlı karar modeli', 'CLI ve web arayüzü için belgelenmiş mimari ve doğrulama planı'],
        outcomesNote:
          'Barındırılan ürün, çalışma zamanında zorlama, attestation, pilot müşteriler veya ticari doğrulama tamamlanmamıştır ve burada iddia edilmemektedir.',
        ctaTitle: 'Projeniz için güvenlik odaklı geliştirme?',
        ctaText:
          'Bu projenin arkasındaki düşünce (net yetkiler, izlenebilir kararlar, sessiz varsayım yok) geliştirdiğim her web uygulamasına yansıyor.',
      },
    },
  },
  {
    slug: 'pv-solar',
    group: 'client',
    kind: 'client',
    featured: true,
    order: 3,
    year: null,
    liveUrl: 'https://pvsolargmbh.com/',
    repoUrl: null,
    statusKey: 'live',
    tech: ['WordPress', 'Elementor', 'Responsive Design', 'Formulare', 'Hosting', 'Deployment'],
    media: { desktop: 'pv-solar-desktop.png', mobile: 'pv-solar-mobile.png' },
    accent: 'amber',
    i18n: {
      de: {
        title: 'PV Solar GmbH',
        tagline: 'Unternehmenswebsite für einen Dienstleister mit mehreren Geschäftsbereichen.',
        summary:
          'Kunden-Website für die PV Solar GmbH aus Duisburg: ein Unternehmen, das Photovoltaik- und Elektroinstallationen, Hallenbau und Montage, Logistik sowie IT-Dienstleistungen anbietet. Die Seite präsentiert alle Geschäftsbereiche klar strukturiert und führt Interessenten zu einer Projektanfrage.',
        problem:
          'Das Unternehmen bündelt sehr unterschiedliche Leistungen unter einem Dach. Die Website musste diese Vielfalt ordnen, ohne unübersichtlich zu werden, für gewerbliche Kunden seriös wirken und auf jedem Gerät zuverlässig funktionieren – inklusive eines direkten Weges zur Anfrage.',
        role: 'Konzeption der Seitenstruktur, Umsetzung mit WordPress und Elementor, responsive Gestaltung, Formular- und Kontaktwege, Hosting-Einrichtung und Veröffentlichung.',
        solution:
          'Eine WordPress-Website auf Elementor-Basis mit eigener Seite je Geschäftsbereich, einer klaren Hauptnavigation (Über uns, Dienstleistungen, Karriere, Kontakt, Projektanfrage) und einem vierstufig erklärten Ablauf von der Anfrage bis zur Umsetzung. Rechtliche Seiten (Impressum, Datenschutz, rechtlicher Hinweis) sind vollständig eingebunden.',
        features: [
          'Mehrere Leistungsbereiche mit eigenen Unterseiten',
          'Projektanfrage-Formular und Kontaktseite',
          'Karriereseite für Bewerbungen',
          'Responsive Layout für Desktop, Tablet und Smartphone',
          'Impressum, Datenschutzerklärung und rechtliche Hinweise',
        ],
        security: [
          'HTTPS-Verbindung auf der veröffentlichten Website',
          'Formular- und Kontaktwege mit serverseitiger Verarbeitung',
          'WordPress- und Hosting-Struktur für laufende Wartung',
        ],
        outcomes: ['Website ist live und dient als zentrale Anlaufstelle für Anfragen', 'Alle Geschäftsbereiche sind online abgebildet'],
        outcomesNote: null,
        ctaTitle: 'Unternehmenswebsite mit mehreren Leistungsbereichen?',
        ctaText: 'Ich strukturiere komplexe Angebote verständlich und setze sie als schnelle, wartbare WordPress-Website um.',
      },
      en: {
        title: 'PV Solar GmbH',
        tagline: 'Corporate website for a service company with several business areas.',
        summary:
          'Client website for PV Solar GmbH, a Duisburg-based company offering photovoltaic and electrical installations, industrial hall construction and assembly, logistics and IT services. The site presents every business area in a clear structure and leads prospects to a project request.',
        problem:
          'The company bundles quite different services under one roof. The website had to organise this variety without becoming cluttered, look credible to business customers and work reliably on any device, including a direct path to a request.',
        role: 'Site structure, implementation with WordPress and Elementor, responsive design, form and contact journeys, hosting setup and publishing.',
        solution:
          'A WordPress website built with Elementor, with a dedicated page per business area, a clear main navigation (About, Services, Careers, Contact, Project request) and a four-step process explained from request to implementation. Legal pages (imprint, privacy policy, legal notice) are fully integrated.',
        features: [
          'Several service areas with their own subpages',
          'Project request form and contact page',
          'Careers page for applications',
          'Responsive layout for desktop, tablet and phone',
          'Imprint, privacy policy and legal notices',
        ],
        security: [
          'HTTPS connection on the published website',
          'Form and contact paths with server-side processing',
          'WordPress and hosting structure designed for ongoing maintenance',
        ],
        outcomes: ['Website is live and serves as the central entry point for requests', 'All business areas are represented online'],
        outcomesNote: null,
        ctaTitle: 'Corporate website with several service areas?',
        ctaText: 'I structure complex offerings clearly and implement them as fast, maintainable WordPress websites.',
      },
      tr: {
        title: 'PV Solar GmbH',
        tagline: 'Birden fazla iş alanına sahip bir hizmet şirketi için kurumsal web sitesi.',
        summary:
          'Duisburg merkezli PV Solar GmbH için müşteri web sitesi. Şirket fotovoltaik ve elektrik tesisatı, endüstriyel hangar inşaatı ve montaj, lojistik ve IT hizmetleri sunuyor. Site tüm iş alanlarını net bir yapıyla sunuyor ve ziyaretçileri proje talebine yönlendiriyor.',
        problem:
          'Şirket oldukça farklı hizmetleri tek çatı altında topluyor. Web sitesinin bu çeşitliliği karmaşıklaştırmadan düzenlemesi, kurumsal müşterilere güven vermesi ve her cihazda sorunsuz çalışması gerekiyordu; talep formuna giden doğrudan bir yol da şarttı.',
        role: 'Site yapısının tasarımı, WordPress ve Elementor ile uygulama, responsive tasarım, form ve iletişim akışları, hosting kurulumu ve yayına alma.',
        solution:
          'Elementor ile kurulmuş bir WordPress sitesi: her iş alanı için ayrı sayfa, net bir ana menü (Hakkımızda, Hizmetler, Kariyer, İletişim, Proje Talebi) ve talepten uygulamaya dört adımda anlatılan süreç. Yasal sayfalar (künye, gizlilik politikası, yasal uyarı) eksiksiz entegre edildi.',
        features: [
          'Kendi alt sayfalarına sahip birden fazla hizmet alanı',
          'Proje talep formu ve iletişim sayfası',
          'Başvurular için kariyer sayfası',
          'Masaüstü, tablet ve telefon için responsive düzen',
          'Künye, gizlilik politikası ve yasal uyarılar',
        ],
        security: [
          'Yayınlanan sitede HTTPS bağlantısı',
          'Sunucu tarafında işlenen form ve iletişim yolları',
          'Devamlı bakıma uygun WordPress ve hosting yapısı',
        ],
        outcomes: ['Site yayında ve taleplerin merkezi giriş noktası olarak kullanılıyor', 'Tüm iş alanları çevrim içi temsil ediliyor'],
        outcomesNote: null,
        ctaTitle: 'Birden fazla hizmet alanı olan kurumsal site mi?',
        ctaText: 'Karmaşık hizmet yapılarını anlaşılır hâle getirip hızlı ve sürdürülebilir WordPress siteleri olarak hayata geçiriyorum.',
      },
    },
  },
  {
    slug: 'bestfood-chur',
    group: 'client',
    kind: 'client',
    featured: true,
    order: 4,
    year: null,
    liveUrl: 'https://bestfoodchur.ch/',
    repoUrl: null,
    statusKey: 'live',
    tech: ['WordPress', 'WooCommerce', 'Elementor', 'WhatsApp-Bestellung', 'Responsive Design'],
    media: { desktop: 'bestfood-chur-desktop.png', mobile: 'bestfood-chur-mobile.png' },
    accent: 'rose',
    i18n: {
      de: {
        title: 'BestFood Chur',
        tagline: 'Restaurant-Website mit Produktkatalog und Bestellweg über WhatsApp.',
        summary:
          'Website für BestFood, ein Restaurant in Chur (Schweiz) mit hausgemachten Burgern, Gözleme, Wraps, Tellergerichten und mehr. Gäste sehen die Speisekarte als Produktkatalog, wählen ihr Gericht und bestellen bequem per WhatsApp.',
        problem:
          'Das Restaurant wollte seine Speisekarte online präsentieren und Bestellungen entgegennehmen, ohne ein aufwendiges Bestellsystem mit Zahlungsabwicklung zu betreiben. Der Weg von der Karte zur Bestellung sollte auf dem Smartphone so kurz wie möglich sein.',
        role: 'Aufbau der Website mit WordPress und WooCommerce, Strukturierung der Menükategorien, Einrichtung des WhatsApp-Bestellwegs, responsive Umsetzung und Veröffentlichung.',
        solution:
          'Ein WooCommerce-Katalog mit klar getrennten Kategorien (Burger, Gözleme, Wraps, Tellergerichte, Salate, Snacks, Desserts, Getränke) und Preisen in CHF. Statt eines Warenkorbs mit Zahlung führt der Bestellweg direkt in eine WhatsApp-Nachricht – ein Ablauf, den die Gäste ohne Erklärung verstehen.',
        features: [
          'Produktkatalog mit Menükategorien und Varianten',
          'Bestellweg über WhatsApp',
          'Preise in CHF und Produktoptionen',
          'Responsive Darstellung für die Bestellung vom Smartphone',
          'Suche und Merkliste im Katalog',
        ],
        security: [
          'WooCommerce ohne Zahlungsabwicklung – keine Zahlungsdaten auf der Website',
          'HTTPS-Verbindung auf der veröffentlichten Website',
          'Übergabe der Bestellung an WhatsApp statt eines eigenen Zahlungs-Checkout',
        ],
        outcomes: ['Website ist live; Gäste können Menü ansehen und per WhatsApp bestellen'],
        outcomesNote: 'Einzelne Textbereiche der Theme-Vorlage werden noch mit dem Kunden überarbeitet.',
        ctaTitle: 'Restaurant- oder Bestell-Website geplant?',
        ctaText:
          'Ich setze Menükarten, Kataloge und Bestellwege um, die auf dem Smartphone wirklich funktionieren – mit oder ohne Online-Zahlung.',
      },
      en: {
        title: 'BestFood Chur',
        tagline: 'Restaurant website with a product catalogue and a WhatsApp ordering path.',
        summary:
          'Website for BestFood, a restaurant in Chur (Switzerland) serving homemade burgers, gözleme, wraps, plate dishes and more. Guests browse the menu as a product catalogue, pick their dish and order conveniently via WhatsApp.',
        problem:
          'The restaurant wanted to present its menu online and receive orders without running a heavy ordering system with payment processing. The path from menu to order had to be as short as possible on a phone.',
        role: 'Building the website with WordPress and WooCommerce, structuring the menu categories, setting up the WhatsApp ordering path, responsive implementation and publishing.',
        solution:
          'A WooCommerce catalogue with clearly separated categories (burgers, gözleme, wraps, plate dishes, salads, snacks, desserts, drinks) and prices in CHF. Instead of a cart with payment, the ordering path leads straight into a WhatsApp message, a flow guests understand without explanation.',
        features: [
          'Product catalogue with menu categories and variants',
          'Ordering path via WhatsApp',
          'Prices in CHF and product options',
          'Responsive presentation for ordering from a phone',
          'Search and wishlist in the catalogue',
        ],
        security: [
          'WooCommerce without payment processing, so no payment data on the website',
          'HTTPS connection on the published website',
          'Orders are handed off to WhatsApp instead of an on-site payment checkout',
        ],
        outcomes: ['Website is live; guests can view the menu and order via WhatsApp'],
        outcomesNote: 'A few text areas from the theme template are still being revised with the client.',
        ctaTitle: 'Planning a restaurant or ordering website?',
        ctaText: 'I build menus, catalogues and ordering paths that actually work on a phone, with or without online payment.',
      },
      tr: {
        title: 'BestFood Chur',
        tagline: 'Ürün kataloğu ve WhatsApp sipariş akışına sahip restoran web sitesi.',
        summary:
          'Chur’da (İsviçre) ev yapımı burger, gözleme, dürüm, tabak yemekleri ve daha fazlasını sunan BestFood restoranı için web sitesi. Misafirler menüyü ürün kataloğu olarak inceliyor, yemeğini seçiyor ve WhatsApp üzerinden kolayca sipariş veriyor.',
        problem:
          'Restoran, ödeme altyapısı gerektiren ağır bir sipariş sistemi kurmadan menüsünü çevrim içi sunmak ve sipariş almak istiyordu. Menüden siparişe giden yolun telefonda olabildiğince kısa olması gerekiyordu.',
        role: 'WordPress ve WooCommerce ile sitenin kurulumu, menü kategorilerinin yapılandırılması, WhatsApp sipariş akışının kurulması, responsive uygulama ve yayına alma.',
        solution:
          'Net ayrılmış kategorilere (burger, gözleme, dürüm, tabak yemekleri, salatalar, atıştırmalıklar, tatlılar, içecekler) ve CHF fiyatlara sahip bir WooCommerce kataloğu. Ödemeli sepet yerine sipariş akışı doğrudan bir WhatsApp mesajına gidiyor; misafirlerin açıklama gerektirmeden anladığı bir akış.',
        features: [
          'Menü kategorileri ve varyantlarıyla ürün kataloğu',
          'WhatsApp üzerinden sipariş akışı',
          'CHF fiyatlar ve ürün seçenekleri',
          'Telefondan sipariş için responsive sunum',
          'Katalogda arama ve favori listesi',
        ],
        security: [
          'Ödeme işlemi olmayan WooCommerce; sitede ödeme verisi tutulmuyor',
          'Yayınlanan sitede HTTPS bağlantısı',
          'Site içi ödeme ekranı yerine siparişin WhatsApp’a aktarılması',
        ],
        outcomes: ['Site yayında; misafirler menüyü görüntüleyip WhatsApp ile sipariş verebiliyor'],
        outcomesNote: 'Tema şablonundan kalan birkaç metin alanı müşteriyle birlikte hâlâ gözden geçiriliyor.',
        ctaTitle: 'Restoran veya sipariş sitesi mi planlıyorsunuz?',
        ctaText: 'Telefonda gerçekten çalışan menüler, kataloglar ve sipariş akışları kuruyorum; çevrim içi ödemeli ya da ödemesiz.',
      },
    },
  },
  {
    slug: 'verein-rhein',
    group: 'client',
    kind: 'client',
    featured: false,
    order: 5,
    year: null,
    liveUrl: 'https://vereinrhein.ch/',
    repoUrl: null,
    statusKey: 'live',
    tech: ['WordPress', 'Elementor', 'Kontaktformular', 'Responsive Design', 'Content Management'],
    media: { desktop: 'verein-rhein-desktop.png', mobile: 'verein-rhein-mobile.png' },
    accent: 'sky',
    i18n: {
      de: {
        title: 'Verein Rhein',
        tagline: 'Website für einen Verein mit Veranstaltungen, Arbeitsgruppen und Mitgliedschaft.',
        summary:
          'Website für den Verein Rhein für Integration, Kultur und Dialog, einen 2024 gegründeten Verein in Graubünden (Schweiz). Die Seite informiert über den Verein, seine Arbeitsgruppen und Veranstaltungen und bietet einen direkten Kontakt- und Mitgliedschaftsweg.',
        problem:
          'Ein junger Verein braucht eine Website, die Vertrauen schafft, Veranstaltungen ankündigt und neue Mitglieder anspricht – und die von Ehrenamtlichen ohne technische Vorkenntnisse selbst gepflegt werden kann.',
        role: 'Aufbau der WordPress-Website, Seitenstruktur, Veranstaltungs- und Arbeitsgruppen-Seiten, Kontaktformular, responsive Umsetzung und Übergabe an das Vereinsteam.',
        solution:
          'Eine WordPress-Website mit klarer Struktur: Über uns, Verein unterstützen, Veranstaltungen (etwa Kinderfest, Muttertag, Iftar), Arbeitsgruppen (Kultur und Bildung, Frauenkommission, Dialog, Jugendkommission), Mitgliedschaft, Presse und Kontakt. Inhalte lassen sich vom Verein selbst ergänzen.',
        features: [
          'Veranstaltungsseiten mit Ankündigungen',
          'Arbeitsgruppen- und Vereinsinformationen',
          'Mitgliedschafts- und Unterstützungsseiten',
          'Kontaktformular',
          'Pressebereich',
          'Inhaltspflege durch das Vereinsteam',
        ],
        security: [
          'HTTPS-Verbindung auf der veröffentlichten Website',
          'Kontaktformular für direkte Anfragen',
          'WordPress-Struktur für die redaktionelle Inhaltspflege',
        ],
        outcomes: ['Website ist live und wird vom Verein für Veranstaltungen und Mitgliederinformation genutzt'],
        outcomesNote: null,
        ctaTitle: 'Website für Ihren Verein oder Ihre Organisation?',
        ctaText: 'Ich baue Vereins- und Community-Websites, die sich ohne technisches Vorwissen pflegen lassen.',
      },
      en: {
        title: 'Verein Rhein',
        tagline: 'Website for an association with events, working groups and membership.',
        summary:
          'Website for Verein Rhein für Integration, Kultur und Dialog, an association founded in 2024 in Graubünden (Switzerland). The site presents the association, its working groups and events, and offers a direct contact and membership path.',
        problem:
          'A young association needs a website that builds trust, announces events and attracts new members, and that volunteers without technical background can maintain themselves.',
        role: 'Building the WordPress website, page structure, event and working-group pages, contact form, responsive implementation and handover to the association team.',
        solution:
          'A WordPress website with a clear structure: About, Support the association, Events (such as a children’s festival, Mother’s Day and Iftar), Working groups (Culture and education, Women’s commission, Dialogue, Youth commission), Membership, Press and Contact. The association can add content on its own.',
        features: [
          'Event pages with announcements',
          'Working group and association information',
          'Membership and support pages',
          'Contact form',
          'Press section',
          'Content maintenance by the association team',
        ],
        security: [
          'HTTPS connection on the published website',
          'Contact form for direct enquiries',
          'WordPress structure for editorial content maintenance',
        ],
        outcomes: ['Website is live and used by the association for events and member information'],
        outcomesNote: null,
        ctaTitle: 'A website for your association or organisation?',
        ctaText: 'I build association and community websites that can be maintained without technical knowledge.',
      },
      tr: {
        title: 'Verein Rhein',
        tagline: 'Etkinlikler, çalışma grupları ve üyelik içeren dernek web sitesi.',
        summary:
          '2024’te Graubünden’de (İsviçre) kurulan Verein Rhein für Integration, Kultur und Dialog derneği için web sitesi. Site derneği, çalışma gruplarını ve etkinliklerini tanıtıyor; doğrudan iletişim ve üyelik yolu sunuyor.',
        problem:
          'Genç bir derneğin güven veren, etkinlikleri duyuran ve yeni üyeler çeken bir web sitesine ihtiyacı vardı; üstelik teknik bilgisi olmayan gönüllülerin kendi başına yönetebileceği bir site.',
        role: 'WordPress sitesinin kurulumu, sayfa yapısı, etkinlik ve çalışma grubu sayfaları, iletişim formu, responsive uygulama ve dernek ekibine devir.',
        solution:
          'Net yapıya sahip bir WordPress sitesi: Hakkımızda, Derneği Destekle, Etkinlikler (çocuk şenliği, Anneler Günü, iftar gibi), Çalışma Grupları (Kültür ve Eğitim, Kadın Komisyonu, Diyalog, Gençlik Komisyonu), Üyelik, Basın ve İletişim. İçerikleri dernek kendisi ekleyebiliyor.',
        features: [
          'Duyurulu etkinlik sayfaları',
          'Çalışma grubu ve dernek bilgileri',
          'Üyelik ve destek sayfaları',
          'İletişim formu',
          'Basın bölümü',
          'Dernek ekibi tarafından içerik yönetimi',
        ],
        security: [
          'Yayınlanan sitede HTTPS bağlantısı',
          'Doğrudan talepler için iletişim formu',
          'Editoryal içerik bakımı için WordPress yapısı',
        ],
        outcomes: ['Site yayında ve dernek tarafından etkinlik ve üye bilgilendirmesi için kullanılıyor'],
        outcomesNote: null,
        ctaTitle: 'Derneğiniz veya kuruluşunuz için web sitesi?',
        ctaText: 'Teknik bilgi gerektirmeden yönetilebilen dernek ve topluluk siteleri kuruyorum.',
      },
    },
  },
];

function all() {
  return [...projects].sort((a, b) => a.order - b.order);
}

function bySlug(slug) {
  return projects.find((p) => p.slug === slug) || null;
}

const fs = require('fs');
const path = require('path');
const MEDIA_DIR = path.join(__dirname, '..', '..', 'public', 'img', 'projects');
const mediaCache = new Map();

/** Check once per file whether a screenshot exists; missing files render a text-led frame. */
function mediaAvailability(project) {
  const key = project.slug;
  if (!mediaCache.has(key)) {
    mediaCache.set(key, {
      desktop: fs.existsSync(path.join(MEDIA_DIR, project.media.desktop)),
      mobile: fs.existsSync(path.join(MEDIA_DIR, project.media.mobile)),
    });
  }
  return mediaCache.get(key);
}

function localized(project, locale) {
  const copy = project.i18n[locale] || project.i18n.de;
  return { ...project, ...copy, i18n: undefined, mediaAvailable: mediaAvailability(project) };
}

function allLocalized(locale) {
  return all().map((p) => localized(p, locale));
}

module.exports = { all, bySlug, localized, allLocalized, slugs: projects.map((p) => p.slug) };
