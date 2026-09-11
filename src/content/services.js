'use strict';

/**
 * Customer-oriented service groups. Penetration testing is intentionally not offered.
 * `related` links a service to the case studies that show it in practice.
 */
const services = [
  {
    slug: 'business-websites',
    icon: 'layout',
    related: ['pv-solar', 'verein-rhein'],
    i18n: {
      de: {
        title: 'Unternehmens- und Firmenwebsites',
        short: 'Klar strukturierte Websites, die Leistungen verständlich zeigen und Anfragen bringen.',
        description:
          'Für Unternehmen, Handwerksbetriebe, Dienstleister und Vereine: eine Website, die in wenigen Sekunden erklärt, wer Sie sind und was Sie anbieten. Ich plane die Seitenstruktur, schreibe mit Ihnen an den Inhalten und setze alles responsiv, schnell und wartbar um.',
        points: [
          'Seitenstruktur und Inhaltsplanung',
          'Responsives Design für alle Geräte',
          'Kontakt- und Anfragewege',
          'Rechtssichere Grundseiten (Impressum, Datenschutz)',
        ],
      },
      en: {
        title: 'Business and corporate websites',
        short: 'Clearly structured websites that explain your services and bring in enquiries.',
        description:
          'For companies, trades, service providers and associations: a website that explains within seconds who you are and what you offer. I plan the site structure, work on the content with you and implement everything responsive, fast and maintainable.',
        points: [
          'Site structure and content planning',
          'Responsive design for every device',
          'Contact and enquiry paths',
          'Legal base pages (imprint, privacy)',
        ],
      },
      tr: {
        title: 'Kurumsal ve işletme web siteleri',
        short: 'Hizmetlerinizi anlaşılır biçimde gösteren ve talep getiren net yapılı web siteleri.',
        description:
          'Şirketler, zanaat işletmeleri, hizmet sağlayıcılar ve dernekler için: kim olduğunuzu ve ne sunduğunuzu saniyeler içinde anlatan bir web sitesi. Site yapısını planlıyor, içerikleri sizinle birlikte hazırlıyor ve her şeyi responsive, hızlı ve sürdürülebilir şekilde hayata geçiriyorum.',
        points: [
          'Site yapısı ve içerik planlaması',
          'Her cihaz için responsive tasarım',
          'İletişim ve talep akışları',
          'Yasal temel sayfalar (künye, gizlilik)',
        ],
      },
    },
  },
  {
    slug: 'wordpress-elementor',
    icon: 'wordpress',
    related: ['pv-solar', 'bestfood-chur', 'verein-rhein'],
    i18n: {
      de: {
        title: 'WordPress & Elementor',
        short: 'Individuelle WordPress-Websites, die Sie später selbst pflegen können.',
        description:
          'WordPress ist die richtige Wahl, wenn Inhalte regelmäßig von Ihrem Team gepflegt werden sollen. Ich baue Elementor-Websites ohne Vorlagen-Ballast, mit klarer Seitenstruktur, sauberer Plugin-Auswahl und einer kurzen Einweisung für Ihr Team.',
        points: [
          'Individuelles Layout statt fertiger Theme-Demo',
          'Sinnvolle Plugin-Auswahl',
          'Redaktions-Einweisung',
          'Mehrsprachigkeit auf Wunsch',
        ],
      },
      en: {
        title: 'WordPress & Elementor',
        short: 'Custom WordPress websites you can maintain yourself later on.',
        description:
          'WordPress is the right choice when your team needs to update content regularly. I build Elementor websites without template clutter, with a clear page structure, a lean plugin selection and a short editorial briefing for your team.',
        points: [
          'Custom layout instead of a theme demo',
          'Sensible plugin selection',
          'Editorial briefing',
          'Multilingual setup on request',
        ],
      },
      tr: {
        title: 'WordPress & Elementor',
        short: 'Sonradan kendinizin yönetebileceği özel WordPress siteleri.',
        description:
          'İçerikler ekibiniz tarafından düzenli olarak güncellenecekse WordPress doğru seçimdir. Şablon karmaşası olmayan, net sayfa yapısına ve sade eklenti seçimine sahip Elementor siteleri kuruyor ve ekibinize kısa bir editör eğitimi veriyorum.',
        points: ['Hazır tema demosu yerine özel düzen', 'Mantıklı eklenti seçimi', 'Editör eğitimi', 'İstek üzerine çok dilli yapı'],
      },
    },
  },
  {
    slug: 'woocommerce-ordering',
    icon: 'cart',
    related: ['bestfood-chur'],
    i18n: {
      de: {
        title: 'WooCommerce und Bestellerlebnisse',
        short: 'Produktkataloge, Menükarten und Bestellwege, die auf dem Smartphone funktionieren.',
        description:
          'Vom einfachen Katalog bis zum Shop: Ich richte WooCommerce so ein, dass Kunden schnell finden, was sie suchen, und ohne Umwege bestellen – per Warenkorb, Anfrage oder WhatsApp, je nachdem, was zu Ihrem Geschäft passt.',
        points: [
          'Produkt- und Kategoriestruktur',
          'Bestellwege per Warenkorb, Anfrage oder WhatsApp',
          'Mobile-first Bestellablauf',
          'Varianten, Preise und Verfügbarkeiten',
        ],
      },
      en: {
        title: 'WooCommerce and ordering experiences',
        short: 'Product catalogues, menus and ordering paths that work on a phone.',
        description:
          'From a simple catalogue to a shop: I set up WooCommerce so customers quickly find what they are looking for and order without detours, via cart, enquiry or WhatsApp, depending on what suits your business.',
        points: [
          'Product and category structure',
          'Ordering via cart, enquiry or WhatsApp',
          'Mobile-first ordering flow',
          'Variants, prices and availability',
        ],
      },
      tr: {
        title: 'WooCommerce ve sipariş deneyimleri',
        short: 'Telefonda çalışan ürün katalogları, menüler ve sipariş akışları.',
        description:
          'Basit katalogdan mağazaya: WooCommerce’i müşterilerin aradığını hızla bulup dolambaçsız sipariş verebileceği şekilde kuruyorum; işinize uyan yöntemle sepet, talep formu veya WhatsApp üzerinden.',
        points: [
          'Ürün ve kategori yapısı',
          'Sepet, talep veya WhatsApp ile sipariş',
          'Mobil öncelikli sipariş akışı',
          'Varyantlar, fiyatlar ve stok durumu',
        ],
      },
    },
  },
  {
    slug: 'web-applications',
    icon: 'app',
    related: ['savefold'],
    i18n: {
      de: {
        title: 'Web-Anwendungen & MVPs',
        short: 'Individuelle Anwendungen mit Node.js, wenn eine Website nicht mehr reicht.',
        description:
          'Wenn Ihr Vorhaben Logins, Datenverwaltung, Rollen oder eine API braucht, entwickle ich eine eigene Web-Anwendung: serverseitig gerendert, mit sauberem Datenmodell, REST-API und nachvollziehbarem Deployment. Ideal für interne Tools und erste Produktversionen.',
        points: [
          'Node.js, Express und EJS',
          'Authentifizierung und Rollen',
          'REST-APIs und Datenbankanbindung',
          'MVP-Umfang, der in Wochen statt Monaten steht',
        ],
      },
      en: {
        title: 'Web applications & MVPs',
        short: 'Custom applications with Node.js when a website is no longer enough.',
        description:
          'When your project needs logins, data management, roles or an API, I build a dedicated web application: server-rendered, with a clean data model, REST API and a deployment you can follow. Well suited to internal tools and first product versions.',
        points: [
          'Node.js, Express and EJS',
          'Authentication and roles',
          'REST APIs and database integration',
          'MVP scope that ships in weeks, not months',
        ],
      },
      tr: {
        title: 'Web uygulamaları ve MVP’ler',
        short: 'Bir web sitesi yetmediğinde Node.js ile özel uygulamalar.',
        description:
          'Projeniz giriş, veri yönetimi, roller veya API gerektiriyorsa özel bir web uygulaması geliştiriyorum: sunucu tarafında render edilen, temiz veri modeline, REST API’ye ve izlenebilir deployment sürecine sahip. Dahili araçlar ve ilk ürün sürümleri için uygundur.',
        points: [
          'Node.js, Express ve EJS',
          'Kimlik doğrulama ve roller',
          'REST API ve veritabanı entegrasyonu',
          'Aylar değil haftalar içinde çıkan MVP kapsamı',
        ],
      },
    },
  },
  {
    slug: 'migration-deployment',
    icon: 'move',
    related: ['pv-solar'],
    i18n: {
      de: {
        title: 'Website-Migration und Deployment',
        short: 'Umzüge, Hosting-Einrichtung und Veröffentlichung ohne Ausfall.',
        description:
          'Ob Wechsel des Hosters, Umzug einer bestehenden WordPress-Seite oder das erste Deployment einer Node.js-Anwendung: Ich plane den Umzug, richte Hosting, HTTPS und Domains ein und prüfe nach dem Umzug jede Seite.',
        points: [
          'WordPress- und Domain-Umzüge',
          'Hosting- und HTTPS-Einrichtung',
          'Node.js-Deployment (z. B. Hostinger)',
          'Prüfung nach der Umstellung',
        ],
      },
      en: {
        title: 'Website migration and deployment',
        short: 'Moves, hosting setup and publishing without downtime.',
        description:
          'Whether you are changing hosts, moving an existing WordPress site or deploying a Node.js application for the first time: I plan the move, set up hosting, HTTPS and domains and check every page after the switch.',
        points: [
          'WordPress and domain moves',
          'Hosting and HTTPS setup',
          'Node.js deployment (for example Hostinger)',
          'Post-migration checks',
        ],
      },
      tr: {
        title: 'Web sitesi taşıma ve deployment',
        short: 'Kesinti olmadan taşıma, hosting kurulumu ve yayına alma.',
        description:
          'Hosting değişikliği, mevcut bir WordPress sitesinin taşınması veya bir Node.js uygulamasının ilk deployment’ı: Taşımayı planlıyor; hosting, HTTPS ve alan adlarını kuruyor ve geçişten sonra her sayfayı kontrol ediyorum.',
        points: [
          'WordPress ve alan adı taşıma',
          'Hosting ve HTTPS kurulumu',
          'Node.js deployment (ör. Hostinger)',
          'Geçiş sonrası kontroller',
        ],
      },
    },
  },
  {
    slug: 'maintenance',
    icon: 'tool',
    related: [],
    i18n: {
      de: {
        title: 'Wartung und Optimierung',
        short: 'Updates, Sicherheitspflege und Geschwindigkeit für bestehende Websites.',
        description:
          'Eine Website bleibt nur dann sicher und schnell, wenn sie gepflegt wird. Ich übernehme Updates von Core, Theme und Plugins, prüfe Ladezeiten und Formulare und beseitige Altlasten, bevor sie zum Problem werden.',
        points: [
          'Regelmäßige Updates',
          'Ladezeit- und Mobile-Optimierung',
          'Fehleranalyse und Reparatur',
          'Kleine Erweiterungen und Anpassungen',
        ],
      },
      en: {
        title: 'Maintenance and optimisation',
        short: 'Updates, security care and speed for existing websites.',
        description:
          'A website only stays secure and fast if it is looked after. I handle core, theme and plugin updates, check load times and forms and remove legacy issues before they become a problem.',
        points: ['Regular updates', 'Load time and mobile optimisation', 'Troubleshooting and repair', 'Small extensions and adjustments'],
      },
      tr: {
        title: 'Bakım ve optimizasyon',
        short: 'Mevcut siteler için güncelleme, güvenlik bakımı ve hız.',
        description:
          'Bir web sitesi ancak bakımı yapılırsa güvenli ve hızlı kalır. Çekirdek, tema ve eklenti güncellemelerini üstleniyor, yükleme sürelerini ve formları kontrol ediyor, eski sorunları probleme dönüşmeden gideriyorum.',
        points: [
          'Düzenli güncellemeler',
          'Yükleme süresi ve mobil optimizasyonu',
          'Hata analizi ve onarım',
          'Küçük eklemeler ve uyarlamalar',
        ],
      },
    },
  },
  {
    slug: 'security-focused-development',
    icon: 'shield',
    related: ['savefold', 'authoritylab'],
    i18n: {
      de: {
        title: 'Sicherheitsbewusste Webentwicklung',
        short: 'Sichere Anmeldung, Zugriffskontrolle und sichere Konfiguration von Anfang an.',
        description:
          'Sicherheit ist kein Zusatzpaket, sondern Teil der Entwicklung. In meinen Projekten gehören sichere Authentifizierung, Rollen- und Zugriffskontrolle, Eingabevalidierung, Sicherheits-Header, sinnvolles Logging und eine sichere Konfiguration von Anfang an dazu.',
        points: [
          'Sichere Authentifizierungsmuster',
          'Rollen- und Zugriffskontrolle',
          'Eingabevalidierung und Sicherheits-Header',
          'Logging und sichere Konfiguration',
        ],
        note: 'Ich biete keine professionellen Penetrationstests an. Sicherheitsbewusste Entwicklung heißt: die typischen Fehler von vornherein vermeiden.',
      },
      en: {
        title: 'Security-focused web development',
        short: 'Secure sign-in, access control and safe configuration from the start.',
        description:
          'Security is not an add-on, it is part of development. My projects include secure authentication, role and access control, input validation, security headers, sensible logging and safe configuration from day one.',
        points: [
          'Secure authentication patterns',
          'Role and access control',
          'Input validation and security headers',
          'Logging and safe configuration',
        ],
        note: 'I do not offer professional penetration testing. Security-focused development means avoiding the typical mistakes in the first place.',
      },
      tr: {
        title: 'Güvenlik odaklı web geliştirme',
        short: 'Baştan itibaren güvenli giriş, erişim kontrolü ve güvenli yapılandırma.',
        description:
          'Güvenlik bir ek paket değil, geliştirmenin parçasıdır. Projelerimde güvenli kimlik doğrulama, rol ve erişim kontrolü, girdi doğrulama, güvenlik başlıkları, anlamlı loglama ve güvenli yapılandırma ilk günden yer alır.',
        points: [
          'Güvenli kimlik doğrulama desenleri',
          'Rol ve erişim kontrolü',
          'Girdi doğrulama ve güvenlik başlıkları',
          'Loglama ve güvenli yapılandırma',
        ],
        note: 'Profesyonel sızma testi hizmeti sunmuyorum. Güvenlik odaklı geliştirme, tipik hataları en baştan önlemek demektir.',
      },
    },
  },
];

function allLocalized(locale) {
  return services.map((s) => ({ ...s, ...(s.i18n[locale] || s.i18n.de), i18n: undefined }));
}

module.exports = { services, allLocalized };
