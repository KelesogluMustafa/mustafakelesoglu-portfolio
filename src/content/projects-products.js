'use strict';

/**
 * Catalogue entries for the three developer tools added after PDFStruct.
 *
 * - RunnerManager and ResearchStruct have a short product page (pageUrl); the long form lives
 *   in content/products.js.
 * - VisualStruct has no page on this site: its card links straight to the public repository
 *   (externalUrl).
 *
 * Every statement comes from the project's own README. Card artwork is the owner's.
 */

const runnermanager = {
  slug: 'runnermanager',
  group: 'product',
  kind: 'personal',
  featured: true,
  order: 1.2,
  year: 2026,
  liveUrl: null,
  previewUrl: null,
  repoUrl: null,
  pageUrl: '/runnermanager',
  statusKey: 'unreleased',
  tech: ['.NET 8', 'WPF', 'GitHub CLI', 'GitHub Actions', 'Windows'],
  media: {
    desktop: 'runnermanager-desktop.png',
    mobile: 'runnermanager-mobile.png',
    card: { base: '/img/runnermanager/dashboard', widths: [480, 728], width: 728, height: 422 },
  },
  accent: 'sky',
  i18n: {
    de: {
      title: 'RunnerManager',
      tagline: 'GitHub Actions für Windows: Self-Hosted Runner und CI aus einer Desktop-App.',
      summary:
        'RunnerManager ist eine Windows-Desktop-Anwendung für lokale Self-Hosted Runner von GitHub Actions. Sie startet und stoppt den Runner, zeigt den CI-Status mehrerer Repositories und exportiert Berichte als TXT oder CSV. Die Anmeldung läuft vollständig über die GitHub CLI.',
      problem:
        'Wer CI-Jobs auf dem eigenen Rechner ausführt, wechselt ständig zwischen Terminal, Runner-Fenster und GitHub-Seiten, um Status und Fehler zu sehen.',
      role: 'Konzept, WPF-Anwendung, GitHub-CLI-Anbindung, Berichte, Tests und Windows-Paket als eigenes Projekt.',
      solution:
        'Eine WPF-Anwendung auf .NET 8 mit sieben Seiten: Dashboard, Repositories, Workflows, Runner, Läufe, Berichte und Einstellungen. Alle GitHub-Zugriffe laufen über die GitHub CLI.',
      features: [
        'Lokalen Runner starten, stoppen und überwachen',
        'CI-Status und letzte Läufe pro Projekt',
        'Mehrere Repositories in einer Anwendung',
        'Berichte als TXT und Excel-kompatibles CSV',
        'Helles und dunkles Design, Deutsch, Englisch und Türkisch',
      ],
      security: [
        'RunnerManager speichert kein GitHub-Token; die Anmeldung liegt bei der GitHub CLI',
        'Einstellungen und Verlauf bleiben lokal unter %APPDATA%',
        'Warnung beim Hinzufügen eines öffentlichen Repositorys',
      ],
      outcomes: ['Lauffähiges, eigenständiges Windows-Paket; noch nicht öffentlich veröffentlicht'],
      outcomesNote: 'Nur GitHub.com; die ausführbare Datei ist nicht signiert.',
      ctaTitle: 'Desktop-Werkzeug oder CI-Automatisierung geplant?',
      ctaText: 'Ich baue fokussierte Werkzeuge, die wiederkehrende Entwicklerarbeit an einem Ort bündeln.',
    },
    en: {
      title: 'RunnerManager',
      tagline: 'GitHub Actions for Windows: self-hosted runner and CI from one desktop app.',
      summary:
        'RunnerManager is a Windows desktop application for local GitHub Actions self-hosted runners. It starts and stops the runner, shows CI status across multiple repositories and exports reports as TXT or CSV. Sign-in is delegated entirely to the GitHub CLI.',
      problem:
        'Running CI jobs on your own machine means switching between a terminal, the runner window and GitHub pages to see status and failures.',
      role: 'Concept, WPF application, GitHub CLI integration, reports, tests and Windows package as a personal project.',
      solution:
        'A WPF application on .NET 8 with seven pages: Dashboard, Repositories, Workflows, Runner, Runs, Reports and Settings. All GitHub access goes through the GitHub CLI.',
      features: [
        'Start, stop and monitor the local runner',
        'CI status and latest runs per project',
        'Multiple repositories in one application',
        'Reports as TXT and Excel-compatible CSV',
        'Light and dark themes, English, German and Turkish',
      ],
      security: [
        'RunnerManager stores no GitHub token; sign-in lives in the GitHub CLI',
        'Settings and history stay local under %APPDATA%',
        'Warning when a public repository is added',
      ],
      outcomes: ['Working self-contained Windows package; not publicly released yet'],
      outcomesNote: 'GitHub.com only; the executable is not code-signed.',
      ctaTitle: 'Planning a desktop tool or CI automation?',
      ctaText: 'I build focused tools that bring recurring developer work into one place.',
    },
    tr: {
      title: 'RunnerManager',
      tagline: 'Windows için GitHub Actions: self-hosted runner ve CI tek masaüstü uygulamasında.',
      summary:
        'RunnerManager, yerel GitHub Actions self-hosted runner’ları için bir Windows masaüstü uygulamasıdır. Runner’ı başlatır ve durdurur, birden çok deponun CI durumunu gösterir ve raporları TXT veya CSV olarak dışa aktarır. Oturum açma tamamen GitHub CLI üzerinden yapılır.',
      problem:
        'CI işlerini kendi bilgisayarında çalıştıran biri, durumu ve hataları görmek için terminal, runner penceresi ve GitHub sayfaları arasında sürekli gidip gelir.',
      role: 'Konsept, WPF uygulaması, GitHub CLI entegrasyonu, raporlar, testler ve Windows paketi; kişisel proje olarak.',
      solution:
        '.NET 8 üzerinde yedi sayfalı bir WPF uygulaması: Dashboard, Repositories, Workflows, Runner, Runs, Reports ve Settings. Tüm GitHub erişimi GitHub CLI üzerinden yapılır.',
      features: [
        'Yerel runner’ı başlat, durdur ve izle',
        'Proje başına CI durumu ve son çalışmalar',
        'Tek uygulamada birden çok depo',
        'TXT ve Excel uyumlu CSV raporları',
        'Açık ve koyu tema; İngilizce, Almanca ve Türkçe',
      ],
      security: [
        'RunnerManager GitHub token’ı saklamaz; oturum GitHub CLI’da durur',
        'Ayarlar ve geçmiş yerelde, %APPDATA% altında kalır',
        'Herkese açık bir depo eklenirken uyarı verir',
      ],
      outcomes: ['Çalışan, kendi kendine yeten Windows paketi; henüz herkese açık yayımlanmadı'],
      outcomesNote: 'Yalnızca GitHub.com; çalıştırılabilir dosya imzalı değil.',
      ctaTitle: 'Masaüstü aracı veya CI otomasyonu mu planlıyorsunuz?',
      ctaText: 'Tekrarlayan geliştirici işlerini tek yerde toplayan, odaklı araçlar geliştiriyorum.',
    },
  },
};

const researchstruct = {
  slug: 'researchstruct',
  group: 'product',
  kind: 'personal',
  featured: true,
  order: 1.6,
  year: 2026,
  liveUrl: null,
  previewUrl: null,
  repoUrl: null,
  pageUrl: '/researchstruct',
  statusKey: 'preRelease',
  tech: ['Python', 'CLI', 'MCP', 'BM25', 'httpx', 'MIT'],
  media: {
    desktop: 'researchstruct-desktop.png',
    mobile: 'researchstruct-mobile.png',
    card: { base: '/img/researchstruct/hero', widths: [640, 1100], width: 1672, height: 941 },
  },
  accent: 'navy',
  i18n: {
    de: {
      title: 'ResearchStruct',
      tagline: 'Lokale Web-Recherche ohne Sprachmodell: Belege mit Quellen statt roher Webseiten.',
      summary:
        'ResearchStruct ist ein Python-Kommandozeilenwerkzeug und ein lokaler MCP-Server. Zu einer Frage sucht es im Web, lädt Seiten und Text-PDFs, entfernt Dubletten, bewertet die Textstellen und schreibt die besten als JSON und Markdown in einen Ordner. Claude erhält so ausgewählte Belege statt ganzer Seiten.',
      problem: 'Ganze Webseiten in eine KI-Unterhaltung zu laden verbraucht Kontext und verdeckt die wenigen relevanten Zeilen.',
      role: 'Konzept, Python-Paket, Ranking, MCP-Server, Tests, CI und Releases als eigenes Projekt.',
      solution:
        'Eine Pipeline aus Suche, Abruf, Inhaltsextraktion, Dublettenprüfung und Ranking mit festen Gewichten. CLI und MCP-Server nutzen denselben Kern; ein zweiter Befehl macht aus ganzen Dokumenten strukturierte Datensätze.',
      features: [
        '8 bis 25 bewertete Textstellen pro Lauf, jede mit Quell-URL',
        'Ranking mit BM25, TF-IDF, Begriffen, Überschriften, Quellenqualität und Aktualität',
        'Warnungen bei dünner Beleglage',
        'Vier MCP-Werkzeuge für Claude Code und Claude Desktop',
        'Strukturierte Extraktion ganzer Dokumente',
      ],
      security: [
        'Läuft lokal, ohne API-Schlüssel und ohne KI-Dienst',
        'Text aus dem Web gilt als nicht vertrauenswürdige Daten, nie als Anweisung',
        'MCP-Server nur über stdio, öffnet keine Ports',
      ],
      outcomes: ['Version 0.4.2 als Release im derzeit privaten Repository; CI auf Windows, Ubuntu und macOS'],
      outcomesNote: 'Vor Version 1.0; kein OCR, nicht auf PyPI.',
      ctaTitle: 'Recherche- oder Datenpipeline geplant?',
      ctaText: 'Ich baue nachvollziehbare Werkzeuge, die Quellen sammeln, bewerten und sauber belegen.',
    },
    en: {
      title: 'ResearchStruct',
      tagline: 'Local, LLM-free web research: evidence with sources instead of raw web pages.',
      summary:
        'ResearchStruct is a Python command-line tool and a local MCP server. Given a question, it searches the web, fetches pages and text PDFs, removes duplicates, ranks the passages and writes the best ones to a folder as JSON and Markdown. Claude then receives selected evidence instead of whole pages.',
      problem: 'Loading whole web pages into an AI conversation uses up context and buries the few lines that matter.',
      role: 'Concept, Python package, ranking, MCP server, tests, CI and releases as a personal project.',
      solution:
        'A pipeline of search, fetch, content extraction, de-duplication and ranking with fixed weights. The CLI and the MCP server share one core; a second command turns whole documents into structured records.',
      features: [
        '8 to 25 ranked passages per run, each with its source URL',
        'Ranking with BM25, TF-IDF, terms, headings, source quality and freshness',
        'Warnings when the evidence is weak',
        'Four MCP tools for Claude Code and Claude desktop',
        'Structured extraction of whole documents',
      ],
      security: [
        'Runs locally, with no API key and no AI service',
        'Text from the web is treated as untrusted data, never as instructions',
        'The MCP server is stdio only and opens no ports',
      ],
      outcomes: ['Version 0.4.2 released in the currently private repository; CI on Windows, Ubuntu and macOS'],
      outcomesNote: 'Pre-1.0; no OCR, not on PyPI.',
      ctaTitle: 'Planning a research or data pipeline?',
      ctaText: 'I build transparent tools that collect, rank and properly cite sources.',
    },
    tr: {
      title: 'ResearchStruct',
      tagline: 'Dil modeli kullanmayan yerel web araştırması: ham sayfa yerine kaynaklı kanıt.',
      summary:
        'ResearchStruct bir Python komut satırı aracı ve yerel bir MCP sunucusudur. Bir soru için web’de arar, sayfaları ve metin PDF’lerini indirir, tekrarları ayıklar, pasajları sıralar ve en iyilerini JSON ve Markdown olarak bir klasöre yazar. Böylece Claude bütün sayfalar yerine seçilmiş kanıtları alır.',
      problem: 'Bütün web sayfalarını bir yapay zekâ sohbetine yüklemek bağlamı tüketir ve önemli birkaç satırı gömer.',
      role: 'Konsept, Python paketi, sıralama, MCP sunucusu, testler, CI ve sürümler; kişisel proje olarak.',
      solution:
        'Arama, indirme, içerik çıkarma, tekrar ayıklama ve sabit ağırlıklı sıralamadan oluşan bir işlem hattı. CLI ve MCP sunucusu aynı çekirdeği kullanır; ikinci bir komut bütün belgeleri yapılandırılmış kayıtlara çevirir.',
      features: [
        'Çalıştırma başına 8–25 sıralı pasaj, her biri kaynak adresiyle',
        'BM25, TF-IDF, terimler, başlıklar, kaynak kalitesi ve güncellikle sıralama',
        'Kanıt zayıfsa uyarı',
        'Claude Code ve Claude masaüstü için dört MCP aracı',
        'Bütün belgelerin yapılandırılmış çıkarımı',
      ],
      security: [
        'Yerelde çalışır; API anahtarı ve yapay zekâ servisi gerekmez',
        'Web’den gelen metin güvenilmeyen veri sayılır, asla talimat değildir',
        'MCP sunucusu yalnızca stdio kullanır, port açmaz',
      ],
      outcomes: ['0.4.2 sürümü, şu an özel olan depoda yayımlandı; Windows, Ubuntu ve macOS’ta CI'],
      outcomesNote: '1.0 öncesi; OCR yok, PyPI’da değil.',
      ctaTitle: 'Araştırma veya veri hattı mı planlıyorsunuz?',
      ctaText: 'Kaynakları toplayan, sıralayan ve düzgün biçimde gösteren şeffaf araçlar geliştiriyorum.',
    },
  },
};

const visualstruct = {
  slug: 'visualstruct',
  group: 'product',
  kind: 'personal',
  featured: true,
  order: 1.8,
  year: 2026,
  liveUrl: null,
  previewUrl: null,
  repoUrl: 'https://github.com/KelesogluMustafa/visualstruct',
  // No landing page on this site: the card opens the public repository.
  externalUrl: 'https://github.com/KelesogluMustafa/visualstruct',
  statusKey: 'live',
  tech: ['TypeScript', 'Node.js', 'MCP', 'D2', 'SVG.js', 'MIT'],
  media: {
    desktop: 'visualstruct-desktop.png',
    mobile: 'visualstruct-mobile.png',
    card: { base: '/img/visualstruct/card', widths: [640, 1280], width: 1280, height: 714 },
  },
  accent: 'teal',
  i18n: {
    de: {
      title: 'VisualStruct',
      tagline: 'Open Source · Lokaler Visual-Compiler: kleine semantische Spezifikation rein, fertige Grafiken raus.',
      summary:
        'VisualStruct ist ein lokaler Visual-Compiler. Eine kurze Spezifikation in YAML oder JSON beschreibt, was die Grafik bedeutet; VisualStruct übernimmt Layout, Icons, Stil und Export und schreibt SVG, PNG und HTML, auf Wunsch auch PDF, PPTX und DOCX. Ein MCP-Werkzeug macht es für Claude nutzbar.',
      problem:
        'Wenn ein KI-Assistent Diagramme als SVG oder HTML von Hand schreibt, kostet das viele Tokens und das Ergebnis sieht jedes Mal anders aus.',
      role: 'Konzept, TypeScript-Compiler, Render-Engines, MCP-Integration, Tests, CI und Releases als eigenes Open-Source-Projekt.',
      solution:
        'Eine validierte Spezifikation ohne Koordinaten, rohes SVG oder CSS. Diagramme entstehen mit D2, Infografiken und Vergleiche mit SVG.js; aus einem Master-SVG werden alle Formate exportiert.',
      features: [
        'Architektur-, Ablauf- und Sequenzdiagramme, Infografiken, Vergleiche, Zeitachsen',
        'Ausgabe als SVG, PNG und HTML, optional PDF, PPTX und DOCX',
        'Vier Themes, Icons über Lucide-Namen',
        'Kommandozeile und ein MCP-Werkzeug (visual_render)',
        'Dieselbe Spezifikation ergibt immer dieselbe Grafik',
      ],
      security: [
        'Rendering auf dem eigenen Rechner; kein Konto, kein Upload',
        'Unbekannte Schlüssel in der Spezifikation werden abgelehnt',
        'Das MCP-Werkzeug gibt nur Dateipfade und Warnungen zurück',
      ],
      outcomes: ['Version 0.3.4 öffentlich auf GitHub, MIT-Lizenz; automatisierte Tests auf Windows und Ubuntu'],
      outcomesNote: 'Frühe Version; entwickelt und getestet unter Windows 11.',
      ctaTitle: 'Dokumentation oder Diagramme automatisieren?',
      ctaText: 'Ich baue Werkzeuge, die aus strukturierten Daten konsistente, wiederverwendbare Ausgaben erzeugen.',
    },
    en: {
      title: 'VisualStruct',
      tagline: 'Open source · Local visual compiler: a small semantic spec in, polished visuals out.',
      summary:
        'VisualStruct is a local visual compiler. A short spec in YAML or JSON says what the visual means; VisualStruct does the layout, icons, styling and export and writes SVG, PNG and HTML, plus PDF, PPTX and DOCX on request. One MCP tool makes it available to Claude.',
      problem:
        'When an AI assistant writes diagrams as SVG or HTML by hand, it spends many tokens and the result looks different every time.',
      role: 'Concept, TypeScript compiler, render engines, MCP integration, tests, CI and releases as a personal open-source project.',
      solution:
        'A validated spec with no coordinates, raw SVG or CSS. Diagrams are rendered with D2, infographics and comparisons with SVG.js; one master SVG is exported to every format.',
      features: [
        'Architecture, flow and sequence diagrams, infographics, comparisons, timelines',
        'Output as SVG, PNG and HTML, optionally PDF, PPTX and DOCX',
        'Four themes, icons by Lucide name',
        'Command line and one MCP tool (visual_render)',
        'The same spec always gives the same visual',
      ],
      security: [
        'Rendering happens on your machine; no account, no upload',
        'Unknown keys in a spec are rejected',
        'The MCP tool returns file paths and warnings only',
      ],
      outcomes: ['Version 0.3.4 public on GitHub under the MIT licence; automated tests on Windows and Ubuntu'],
      outcomesNote: 'Early release; developed and tested on Windows 11.',
      ctaTitle: 'Automating documentation or diagrams?',
      ctaText: 'I build tools that turn structured data into consistent, reusable output.',
    },
    tr: {
      title: 'VisualStruct',
      tagline: 'Açık kaynak · Yerel görsel derleyici: küçük bir anlamsal tanım girer, hazır görseller çıkar.',
      summary:
        'VisualStruct yerel bir görsel derleyicidir. YAML veya JSON ile yazılan kısa bir tanım görselin ne anlattığını söyler; yerleşimi, ikonları, stili ve dışa aktarımı VisualStruct yapar ve SVG, PNG ve HTML dosyaları yazar; istenirse PDF, PPTX ve DOCX de üretir. Tek bir MCP aracıyla Claude tarafından kullanılabilir.',
      problem:
        'Bir yapay zekâ asistanı diyagramları elle SVG veya HTML olarak yazdığında çok token harcar ve sonuç her seferinde farklı görünür.',
      role: 'Konsept, TypeScript derleyici, çizim motorları, MCP entegrasyonu, testler, CI ve sürümler; kişisel açık kaynak proje olarak.',
      solution:
        'Koordinat, ham SVG veya CSS içermeyen, doğrulanan bir tanım. Diyagramlar D2 ile, infografikler ve karşılaştırmalar SVG.js ile çizilir; tek bir ana SVG tüm formatlara aktarılır.',
      features: [
        'Mimari, akış ve sıra diyagramları, infografikler, karşılaştırmalar, zaman çizelgeleri',
        'SVG, PNG ve HTML çıktısı; isteğe bağlı PDF, PPTX ve DOCX',
        'Dört tema, Lucide adlarıyla ikonlar',
        'Komut satırı ve tek MCP aracı (visual_render)',
        'Aynı tanım her zaman aynı görseli verir',
      ],
      security: [
        'Çizim kendi bilgisayarında yapılır; hesap yok, yükleme yok',
        'Tanımdaki bilinmeyen anahtarlar reddedilir',
        'MCP aracı yalnızca dosya yollarını ve uyarıları döndürür',
      ],
      outcomes: ['0.3.4 sürümü GitHub’da herkese açık, MIT lisanslı; Windows ve Ubuntu’da otomatik testler'],
      outcomesNote: 'Erken sürüm; Windows 11’de geliştirildi ve test edildi.',
      ctaTitle: 'Dokümantasyon veya diyagramları otomatikleştirmek mi istiyorsunuz?',
      ctaText: 'Yapılandırılmış veriden tutarlı, yeniden kullanılabilir çıktılar üreten araçlar geliştiriyorum.',
    },
  },
};

module.exports = [runnermanager, researchstruct, visualstruct];
