'use strict';

/**
 * Short product landing pages: /runnermanager and /researchstruct.
 * One template (views/pages/product.ejs) renders both from the data below.
 *
 * Rules:
 * - Copy states only what each project's own README documents. No user counts, speed or
 *   saving figures, and nothing the tool does not do.
 * - A call to action never points at something a visitor cannot open. RunnerManager has no
 *   public download yet and the ResearchStruct repository is private, so both links stay empty
 *   until the owner sets RUNNERMANAGER_DOWNLOAD_URL / RESEARCHSTRUCT_REPO_URL; the template
 *   then shows an honest "not public yet" state instead of a dead link.
 * - Artwork comes from the owner's own image folders and is used unchanged in every locale.
 */
const config = require('../config');

const RM = '/img/runnermanager';
const RS = '/img/researchstruct';

const products = {
  runnermanager: {
    slug: 'runnermanager',
    name: 'RunnerManager',
    path: '/runnermanager',
    applicationCategory: 'DeveloperApplication',
    primaryUrl: config.products.runnermanagerDownloadUrl,
    primaryIcon: 'download',
    secondaryHref: '#how',
    icons: ['tool', 'monitor', 'layout', 'log'],
    images: {
      hero: { base: `${RM}/dashboard`, widths: [480, 728], width: 728, height: 422 },
      runs: { base: `${RM}/runs`, widths: [479], width: 479, height: 334 },
      reports: { base: `${RM}/reports`, widths: [496], width: 496, height: 334 },
      og: `${RM}/og-banner.jpg`,
    },
    i18n: {
      en: {
        meta: {
          title: 'RunnerManager — GitHub Actions on your own Windows machine',
          description:
            'Windows desktop app for GitHub Actions self-hosted runners: start and stop your runner, monitor workflow runs across repositories and export TXT or CSV reports.',
        },
        hero: {
          eyebrow: 'GitHub Actions for Windows',
          title: 'Run GitHub Actions on your own machine. Keep the control.',
          text: 'RunnerManager helps you manage your self-hosted runner, monitor workflow runs, detect failures and export reports — without using GitHub-hosted runner minutes for those jobs.',
          primary: 'Download for Windows',
          pending: 'Not public yet',
          secondary: 'See how it works',
          note: 'The Windows package has not been published yet. This page describes the current development build.',
          points: ['Self-Hosted Runner', 'CI Monitoring', 'Multiple Repositories', 'TXT & CSV Reports'],
          imageAlt: 'RunnerManager dashboard in dark mode: runner status, GitHub connection, run counters and the latest workflow runs',
        },
        features: {
          title: 'Everything you need for your self-hosted runner.',
          cards: [
            { title: 'Runner Management', text: 'Start, stop and monitor your local GitHub Actions runner.' },
            { title: 'Workflow Monitoring', text: 'Track successful, failed, queued and running CI jobs.' },
            { title: 'Multiple Repositories', text: 'Manage multiple GitHub projects from one desktop application.' },
            { title: 'Reports & Export', text: 'Review CI history and export reports as TXT or CSV.' },
          ],
        },
        how: {
          title: 'From GitHub to your own machine.',
          steps: [
            { title: 'GitHub Repository', text: 'Your code and workflows stay in GitHub.' },
            { title: 'GitHub Actions', text: 'A workflow is triggered as usual.' },
            { title: 'Self-Hosted Runner', text: 'The job runs on your own Windows machine.' },
            { title: 'RunnerManager', text: 'Monitor your runner, workflows, results and reports in one place.' },
          ],
        },
        splits: [
          {
            image: 'runs',
            title: 'A clear overview of your CI activity.',
            text: 'See runner status, recent workflow runs, branches, commits, durations and failures without constantly switching between terminals and GitHub pages.',
            items: [
              'Runner status at a glance',
              'Detailed workflow history',
              'Failed job visibility',
              'Quick GitHub and repository actions',
            ],
            imageAlt: 'RunnerManager run history: workflow runs with repository, branch, duration and time, filtered by status and date',
          },
          {
            image: 'reports',
            title: 'Understand what happened in your CI.',
            text: 'Review your workflow history by date, repository and status, inspect individual runs and export the results for documentation or analysis.',
            items: [
              'Daily, weekly and monthly views',
              'Run and job details',
              'Local runner activity',
              'TXT and Excel-compatible CSV export',
            ],
            imageAlt: 'RunnerManager reports page: summary of runs for a period with CSV and TXT export buttons',
          },
        ],
        panel: {
          title: 'Native. Simple. Focused.',
          text: 'RunnerManager is a lightweight Windows desktop application designed for developers working with GitHub Actions self-hosted runners.',
          items: [
            'Windows desktop application',
            'GitHub CLI authentication',
            'No GitHub token stored by RunnerManager',
            'Self-contained Windows package',
          ],
          note: 'Requires Windows 10/11 x64 and the GitHub CLI. An existing self-hosted runner is needed for runner control; RunnerManager does not register or configure runners.',
        },
        final: {
          title: 'Ready to take control of your CI?',
          text: 'Run GitHub Actions on your own machine, keep an eye on your workflows and manage your self-hosted runner from one place.',
          primary: 'Download RunnerManager for Windows',
          contact: 'Ask about RunnerManager',
        },
      },
      de: {
        meta: {
          title: 'RunnerManager — GitHub Actions auf dem eigenen Windows-Rechner',
          description:
            'Windows-Desktop-App für GitHub Actions Self-Hosted Runner: Runner starten und stoppen, Workflow-Läufe über mehrere Repositories verfolgen, Berichte als TXT oder CSV exportieren.',
        },
        hero: {
          eyebrow: 'GitHub Actions für Windows',
          title: 'GitHub Actions auf dem eigenen Rechner. Die Kontrolle bleibt bei Ihnen.',
          text: 'RunnerManager hilft, den eigenen Self-Hosted Runner zu verwalten, Workflow-Läufe zu überwachen, Fehler zu erkennen und Berichte zu exportieren – ohne für diese Jobs Minuten der von GitHub gehosteten Runner zu verbrauchen.',
          primary: 'Download für Windows',
          pending: 'Noch nicht öffentlich',
          secondary: 'So funktioniert es',
          note: 'Das Windows-Paket ist noch nicht veröffentlicht. Diese Seite beschreibt den aktuellen Entwicklungsstand.',
          points: ['Self-Hosted Runner', 'CI-Monitoring', 'Mehrere Repositories', 'TXT- & CSV-Berichte'],
          imageAlt: 'RunnerManager-Dashboard im dunklen Design: Runner-Status, GitHub-Verbindung, Zähler und die letzten Workflow-Läufe',
        },
        features: {
          title: 'Alles, was Ihr Self-Hosted Runner braucht.',
          cards: [
            { title: 'Runner-Verwaltung', text: 'Den lokalen GitHub-Actions-Runner starten, stoppen und überwachen.' },
            { title: 'Workflow-Monitoring', text: 'Erfolgreiche, fehlgeschlagene, wartende und laufende CI-Jobs im Blick behalten.' },
            { title: 'Mehrere Repositories', text: 'Mehrere GitHub-Projekte aus einer Desktop-Anwendung verwalten.' },
            { title: 'Berichte & Export', text: 'Den CI-Verlauf auswerten und Berichte als TXT oder CSV exportieren.' },
          ],
        },
        how: {
          title: 'Von GitHub auf den eigenen Rechner.',
          steps: [
            { title: 'GitHub-Repository', text: 'Code und Workflows bleiben in GitHub.' },
            { title: 'GitHub Actions', text: 'Ein Workflow wird wie gewohnt ausgelöst.' },
            { title: 'Self-Hosted Runner', text: 'Der Job läuft auf dem eigenen Windows-Rechner.' },
            { title: 'RunnerManager', text: 'Runner, Workflows, Ergebnisse und Berichte an einem Ort verfolgen.' },
          ],
        },
        splits: [
          {
            image: 'runs',
            title: 'Die CI-Aktivität klar im Überblick.',
            text: 'Runner-Status, letzte Workflow-Läufe, Branches, Commits, Laufzeiten und Fehler auf einen Blick – ohne ständig zwischen Terminals und GitHub-Seiten zu wechseln.',
            items: [
              'Runner-Status auf einen Blick',
              'Detaillierter Workflow-Verlauf',
              'Fehlgeschlagene Jobs sichtbar',
              'Schnelle GitHub- und Repository-Aktionen',
            ],
            imageAlt: 'RunnerManager-Verlauf: Workflow-Läufe mit Repository, Branch, Dauer und Zeit, gefiltert nach Status und Datum',
          },
          {
            image: 'reports',
            title: 'Verstehen, was in der CI passiert ist.',
            text: 'Den Workflow-Verlauf nach Datum, Repository und Status auswerten, einzelne Läufe prüfen und die Ergebnisse für Dokumentation oder Analyse exportieren.',
            items: [
              'Tages-, Wochen- und Monatsansichten',
              'Details zu Läufen und Jobs',
              'Lokale Runner-Aktivität',
              'Export als TXT und Excel-kompatibles CSV',
            ],
            imageAlt: 'RunnerManager-Berichtsseite: Zusammenfassung der Läufe eines Zeitraums mit Schaltflächen für CSV- und TXT-Export',
          },
        ],
        panel: {
          title: 'Nativ. Einfach. Fokussiert.',
          text: 'RunnerManager ist eine schlanke Windows-Desktop-Anwendung für Entwicklerinnen und Entwickler, die mit Self-Hosted Runnern für GitHub Actions arbeiten.',
          items: [
            'Windows-Desktop-Anwendung',
            'Anmeldung über die GitHub CLI',
            'RunnerManager speichert kein GitHub-Token',
            'Eigenständiges Windows-Paket',
          ],
          note: 'Voraussetzung: Windows 10/11 x64 und die GitHub CLI. Für die Runner-Steuerung muss ein Self-Hosted Runner bereits eingerichtet sein; RunnerManager registriert oder konfiguriert keine Runner.',
        },
        final: {
          title: 'Bereit, die eigene CI in die Hand zu nehmen?',
          text: 'GitHub Actions auf dem eigenen Rechner ausführen, die Workflows im Blick behalten und den Self-Hosted Runner an einem Ort verwalten.',
          primary: 'RunnerManager für Windows herunterladen',
          contact: 'Frage zu RunnerManager stellen',
        },
      },
      tr: {
        meta: {
          title: 'RunnerManager — GitHub Actions kendi Windows bilgisayarında',
          description:
            'GitHub Actions self-hosted runner’ları için Windows masaüstü uygulaması: runner’ı başlat ve durdur, birden çok depodaki workflow çalışmalarını izle, raporları TXT veya CSV olarak dışa aktar.',
        },
        hero: {
          eyebrow: 'Windows için GitHub Actions',
          title: 'GitHub Actions’ı kendi bilgisayarında çalıştır. Kontrol sende kalsın.',
          text: 'RunnerManager; self-hosted runner’ını yönetmene, workflow çalışmalarını izlemene, hataları fark etmene ve rapor almana yardımcı olur. Bu işler için GitHub’ın barındırdığı runner dakikalarını kullanmazsın.',
          primary: 'Windows için indir',
          pending: 'Henüz yayında değil',
          secondary: 'Nasıl çalışır?',
          note: 'Windows paketi henüz yayımlanmadı. Bu sayfa güncel geliştirme sürümünü anlatır.',
          points: ['Self-Hosted Runner', 'CI izleme', 'Birden çok depo', 'TXT ve CSV raporları'],
          imageAlt: 'Koyu temada RunnerManager paneli: runner durumu, GitHub bağlantısı, sayaçlar ve son workflow çalışmaları',
        },
        features: {
          title: 'Self-hosted runner’ın için gereken her şey.',
          cards: [
            { title: 'Runner yönetimi', text: 'Yerel GitHub Actions runner’ını başlat, durdur ve izle.' },
            { title: 'Workflow izleme', text: 'Başarılı, başarısız, sırada bekleyen ve çalışan CI işlerini takip et.' },
            { title: 'Birden çok depo', text: 'Birden çok GitHub projesini tek masaüstü uygulamasından yönet.' },
            { title: 'Raporlar ve dışa aktarım', text: 'CI geçmişini incele, raporları TXT veya CSV olarak dışa aktar.' },
          ],
        },
        how: {
          title: 'GitHub’dan kendi bilgisayarına.',
          steps: [
            { title: 'GitHub deposu', text: 'Kodun ve workflow’ların GitHub’da kalır.' },
            { title: 'GitHub Actions', text: 'Workflow her zamanki gibi tetiklenir.' },
            { title: 'Self-Hosted Runner', text: 'İş, kendi Windows bilgisayarında çalışır.' },
            { title: 'RunnerManager', text: 'Runner’ı, workflow’ları, sonuçları ve raporları tek yerden izle.' },
          ],
        },
        splits: [
          {
            image: 'runs',
            title: 'CI etkinliğine net bir bakış.',
            text: 'Runner durumunu, son workflow çalışmalarını, dalları, commit’leri, süreleri ve hataları terminaller ile GitHub sayfaları arasında gidip gelmeden gör.',
            items: ['Runner durumu tek bakışta', 'Ayrıntılı workflow geçmişi', 'Başarısız işler görünür', 'Hızlı GitHub ve depo işlemleri'],
            imageAlt:
              'RunnerManager çalışma geçmişi: depo, dal, süre ve zaman bilgisiyle workflow çalışmaları; durum ve tarihe göre filtre',
          },
          {
            image: 'reports',
            title: 'CI’da ne olduğunu anla.',
            text: 'Workflow geçmişini tarihe, depoya ve duruma göre incele, tek tek çalışmalara bak ve sonuçları dokümantasyon ya da analiz için dışa aktar.',
            items: [
              'Günlük, haftalık ve aylık görünümler',
              'Çalışma ve iş ayrıntıları',
              'Yerel runner etkinliği',
              'TXT ve Excel uyumlu CSV dışa aktarımı',
            ],
            imageAlt: 'RunnerManager rapor sayfası: bir dönemdeki çalışmaların özeti, CSV ve TXT dışa aktarma düğmeleri',
          },
        ],
        panel: {
          title: 'Yerel. Basit. Odaklı.',
          text: 'RunnerManager, GitHub Actions self-hosted runner’larıyla çalışan geliştiriciler için tasarlanmış hafif bir Windows masaüstü uygulamasıdır.',
          items: [
            'Windows masaüstü uygulaması',
            'GitHub CLI ile kimlik doğrulama',
            'RunnerManager GitHub token’ı saklamaz',
            'Kendi kendine yeten Windows paketi',
          ],
          note: 'Gereksinim: Windows 10/11 x64 ve GitHub CLI. Runner’ı kontrol etmek için kurulu bir self-hosted runner gerekir; RunnerManager runner kaydetmez veya yapılandırmaz.',
        },
        final: {
          title: 'CI’ın kontrolünü almaya hazır mısın?',
          text: 'GitHub Actions’ı kendi bilgisayarında çalıştır, workflow’larını gözünün önünde tut ve self-hosted runner’ını tek yerden yönet.',
          primary: 'RunnerManager’ı Windows için indir',
          contact: 'RunnerManager hakkında sor',
        },
      },
    },
  },

  researchstruct: {
    slug: 'researchstruct',
    name: 'ResearchStruct',
    path: '/researchstruct',
    applicationCategory: 'DeveloperApplication',
    version: 'v0.4.2',
    primaryUrl: config.products.researchstructRepoUrl,
    primaryIcon: 'github',
    secondaryHref: '#how',
    icons: ['search', 'filter', 'shield'],
    images: {
      hero: { base: `${RS}/hero`, widths: [640, 1100, 1672], width: 1672, height: 941 },
      flow: { base: `${RS}/flow`, widths: [480, 720, 1000], width: 1000, height: 1000 },
      og: `${RS}/og-banner.jpg`,
    },
    i18n: {
      en: {
        meta: {
          title: 'ResearchStruct — Local web research that returns evidence',
          description:
            'Local, LLM-free web research with a CLI and an MCP server: it searches, fetches and ranks on your computer and returns a small evidence pack with sources instead of raw web pages.',
        },
        hero: {
          eyebrow: 'Local web research · CLI & MCP',
          title: 'Web research on your computer. Evidence instead of raw pages.',
          text: 'ResearchStruct searches the web, fetches pages and text PDFs, removes duplicates and ranks the passages locally. You or Claude get a small evidence pack with sources. No language model is involved in any of these steps.',
          primary: 'View on GitHub',
          pending: 'Repository is private',
          secondary: 'See how it works',
          note: 'Version 0.4.2 · MIT licence · Python 3.10+ · the repository is currently private.',
          points: ['Python CLI', 'Local MCP server', 'No API key', 'Source for every passage'],
          imageAlt: 'ResearchStruct artwork: web pages and PDFs flow into a local pipeline that returns a short ranked list of evidence',
        },
        features: {
          title: 'What you get back.',
          cards: [
            {
              title: 'Small, citable input',
              text: 'A run returns 8 to 25 ranked passages, each with its source URL and, for PDFs, the page number.',
            },
            {
              title: 'Deterministic ranking',
              text: 'BM25, TF-IDF, exact terms, headings, source quality and freshness, combined with fixed weights.',
            },
            {
              title: 'Honest about weak evidence',
              text: 'Warnings such as missing key terms or a missing official source are part of every result.',
            },
          ],
        },
        how: {
          title: 'From a question to an evidence pack.',
          steps: [
            { title: 'Ask', text: 'Give it a question or a URL, on the command line or through Claude.' },
            { title: 'Search & fetch', text: 'It runs a web search and downloads the pages and text PDFs it finds.' },
            { title: 'Clean & rank', text: 'Main content is extracted, duplicates are removed and passages are ranked.' },
            { title: 'Evidence pack', text: 'The best passages are written to a folder as JSON and Markdown.' },
          ],
        },
        splits: [
          {
            image: 'flow',
            title: 'Why ResearchStruct?',
            text: 'Reading whole web pages into a conversation costs context and buries the relevant lines. ResearchStruct does the collecting and ranking on your computer, so the assistant only sees what was selected.',
            items: [
              'Runs locally: the only network traffic is the search and the pages it fetches',
              'One core, two front-ends: the CLI and the MCP server run the same pipeline',
              'Four MCP tools for Claude Code and Claude desktop',
              'A second command turns a whole document into structured records',
            ],
            imageAlt: 'ResearchStruct logo artwork: several web pages merge into one ranked list of three results',
          },
        ],
        panel: {
          title: 'Scope and limits.',
          text: 'ResearchStruct is pre-1.0 and maintained by one person. It is deliberately narrow.',
          items: [
            'No OCR: scanned PDFs are reported and skipped',
            'No embeddings and no language model',
            'One search backend',
            'Not published on PyPI',
          ],
          note: 'Text returned from the web is treated as untrusted data, never as instructions.',
        },
        final: {
          title: 'Interested in ResearchStruct?',
          text: 'The repository is private for now. Write to me if you want to try it or use the same approach in your own project.',
          primary: 'View ResearchStruct on GitHub',
          contact: 'Get in touch',
        },
      },
      de: {
        meta: {
          title: 'ResearchStruct — Lokale Web-Recherche, die Belege liefert',
          description:
            'Lokale Web-Recherche ohne Sprachmodell, mit CLI und MCP-Server: Suche, Abruf und Ranking laufen auf dem eigenen Rechner. Zurück kommt ein kleines Belegpaket mit Quellen statt roher Webseiten.',
        },
        hero: {
          eyebrow: 'Lokale Web-Recherche · CLI & MCP',
          title: 'Web-Recherche auf dem eigenen Rechner. Belege statt roher Webseiten.',
          text: 'ResearchStruct durchsucht das Web, lädt Seiten und Text-PDFs, entfernt Dubletten und bewertet die Textstellen lokal. Sie oder Claude erhalten ein kleines Belegpaket mit Quellen. An keinem dieser Schritte ist ein Sprachmodell beteiligt.',
          primary: 'Auf GitHub ansehen',
          pending: 'Repository ist privat',
          secondary: 'So funktioniert es',
          note: 'Version 0.4.2 · MIT-Lizenz · Python 3.10+ · das Repository ist derzeit privat.',
          points: ['Python-CLI', 'Lokaler MCP-Server', 'Kein API-Schlüssel', 'Quelle zu jeder Textstelle'],
          imageAlt:
            'ResearchStruct-Grafik: Webseiten und PDFs fließen in eine lokale Pipeline, die eine kurze, sortierte Liste von Belegen zurückgibt',
        },
        features: {
          title: 'Was zurückkommt.',
          cards: [
            {
              title: 'Kleine, zitierbare Eingabe',
              text: 'Ein Lauf liefert 8 bis 25 bewertete Textstellen, jede mit Quell-URL und bei PDFs mit Seitenzahl.',
            },
            {
              title: 'Deterministisches Ranking',
              text: 'BM25, TF-IDF, exakte Begriffe, Überschriften, Quellenqualität und Aktualität, mit festen Gewichten kombiniert.',
            },
            {
              title: 'Ehrlich bei dünner Beleglage',
              text: 'Warnungen wie fehlende Schlüsselbegriffe oder eine fehlende offizielle Quelle gehören zu jedem Ergebnis.',
            },
          ],
        },
        how: {
          title: 'Von der Frage zum Belegpaket.',
          steps: [
            { title: 'Fragen', text: 'Eine Frage oder eine URL übergeben, in der Kommandozeile oder über Claude.' },
            { title: 'Suchen & abrufen', text: 'Eine Websuche läuft, gefundene Seiten und Text-PDFs werden geladen.' },
            { title: 'Bereinigen & bewerten', text: 'Der Hauptinhalt wird extrahiert, Dubletten entfallen, Textstellen werden bewertet.' },
            { title: 'Belegpaket', text: 'Die besten Textstellen landen als JSON und Markdown in einem Ordner.' },
          ],
        },
        splits: [
          {
            image: 'flow',
            title: 'Warum ResearchStruct?',
            text: 'Ganze Webseiten in eine Unterhaltung zu laden kostet Kontext und verdeckt die relevanten Zeilen. ResearchStruct sammelt und bewertet auf dem eigenen Rechner, sodass der Assistent nur die Auswahl sieht.',
            items: [
              'Läuft lokal: Netzwerkverkehr entsteht nur durch die Suche und die abgerufenen Seiten',
              'Ein Kern, zwei Zugänge: CLI und MCP-Server nutzen dieselbe Pipeline',
              'Vier MCP-Werkzeuge für Claude Code und Claude Desktop',
              'Ein zweiter Befehl macht aus einem ganzen Dokument strukturierte Datensätze',
            ],
            imageAlt: 'ResearchStruct-Logografik: mehrere Webseiten laufen zu einer sortierten Liste mit drei Ergebnissen zusammen',
          },
        ],
        panel: {
          title: 'Umfang und Grenzen.',
          text: 'ResearchStruct ist vor Version 1.0 und wird von einer Person gepflegt. Der Umfang ist bewusst schmal.',
          items: [
            'Kein OCR: gescannte PDFs werden gemeldet und übersprungen',
            'Keine Embeddings und kein Sprachmodell',
            'Ein Such-Backend',
            'Nicht auf PyPI veröffentlicht',
          ],
          note: 'Text aus dem Web gilt als nicht vertrauenswürdige Daten, nie als Anweisung.',
        },
        final: {
          title: 'Interesse an ResearchStruct?',
          text: 'Das Repository ist vorerst privat. Schreiben Sie mir, wenn Sie es ausprobieren oder denselben Ansatz im eigenen Projekt nutzen möchten.',
          primary: 'ResearchStruct auf GitHub ansehen',
          contact: 'Kontakt aufnehmen',
        },
      },
      tr: {
        meta: {
          title: 'ResearchStruct — Kanıt döndüren yerel web araştırması',
          description:
            'Dil modeli kullanmayan yerel web araştırması; CLI ve MCP sunucusuyla. Arama, indirme ve sıralama kendi bilgisayarında yapılır. Ham web sayfaları yerine kaynaklı küçük bir kanıt paketi döner.',
        },
        hero: {
          eyebrow: 'Yerel web araştırması · CLI ve MCP',
          title: 'Web araştırması kendi bilgisayarında. Ham sayfa yerine kanıt.',
          text: 'ResearchStruct web’de arar, sayfaları ve metin PDF’lerini indirir, tekrarları ayıklar ve pasajları yerelde sıralar. Sen ya da Claude, kaynaklı küçük bir kanıt paketi alırsınız. Bu adımların hiçbirinde dil modeli kullanılmaz.',
          primary: 'GitHub’da görüntüle',
          pending: 'Depo şu an özel',
          secondary: 'Nasıl çalışır?',
          note: 'Sürüm 0.4.2 · MIT lisansı · Python 3.10+ · depo şu an özel.',
          points: ['Python CLI', 'Yerel MCP sunucusu', 'API anahtarı yok', 'Her pasaj için kaynak'],
          imageAlt: 'ResearchStruct görseli: web sayfaları ve PDF’ler yerel bir işlem hattına akar, kısa ve sıralı bir kanıt listesi döner',
        },
        features: {
          title: 'Geriye ne döner?',
          cards: [
            {
              title: 'Küçük, alıntılanabilir girdi',
              text: 'Bir çalıştırma 8 ile 25 arasında sıralı pasaj döndürür; her birinin kaynak adresi, PDF’lerde sayfa numarası vardır.',
            },
            {
              title: 'Deterministik sıralama',
              text: 'BM25, TF-IDF, tam terimler, başlıklar, kaynak kalitesi ve güncellik; sabit ağırlıklarla birleştirilir.',
            },
            {
              title: 'Zayıf kanıtı gizlemez',
              text: 'Eksik anahtar terimler veya eksik resmi kaynak gibi uyarılar her sonucun parçasıdır.',
            },
          ],
        },
        how: {
          title: 'Sorudan kanıt paketine.',
          steps: [
            { title: 'Sor', text: 'Komut satırından ya da Claude üzerinden bir soru veya adres ver.' },
            { title: 'Ara ve indir', text: 'Web araması yapılır, bulunan sayfalar ve metin PDF’leri indirilir.' },
            { title: 'Temizle ve sırala', text: 'Ana içerik çıkarılır, tekrarlar ayıklanır, pasajlar sıralanır.' },
            { title: 'Kanıt paketi', text: 'En iyi pasajlar JSON ve Markdown olarak bir klasöre yazılır.' },
          ],
        },
        splits: [
          {
            image: 'flow',
            title: 'Neden ResearchStruct?',
            text: 'Bütün web sayfalarını sohbete yüklemek bağlamı tüketir ve önemli satırları gömer. ResearchStruct toplama ve sıralamayı kendi bilgisayarında yapar; asistan yalnızca seçilenleri görür.',
            items: [
              'Yerelde çalışır: ağ trafiği yalnızca arama ve indirilen sayfalardır',
              'Tek çekirdek, iki arayüz: CLI ve MCP sunucusu aynı işlem hattını kullanır',
              'Claude Code ve Claude masaüstü için dört MCP aracı',
              'İkinci bir komut, bütün bir belgeyi yapılandırılmış kayıtlara çevirir',
            ],
            imageAlt: 'ResearchStruct logo görseli: birkaç web sayfası üç sonuçluk sıralı bir listede birleşir',
          },
        ],
        panel: {
          title: 'Kapsam ve sınırlar.',
          text: 'ResearchStruct 1.0 öncesi bir sürümdür ve tek kişi tarafından geliştirilir. Kapsamı bilinçli olarak dardır.',
          items: [
            'OCR yok: taranmış PDF’ler bildirilir ve atlanır',
            'Embedding yok, dil modeli yok',
            'Tek arama altyapısı',
            'PyPI’da yayımlanmadı',
          ],
          note: 'Web’den gelen metin güvenilmeyen veri sayılır, asla talimat olarak işlenmez.',
        },
        final: {
          title: 'ResearchStruct ilgini çekti mi?',
          text: 'Depo şimdilik özel. Denemek ya da aynı yaklaşımı kendi projende kullanmak istersen bana yaz.',
          primary: 'ResearchStruct’ı GitHub’da görüntüle',
          contact: 'İletişime geç',
        },
      },
    },
  },
};

const slugs = Object.keys(products);

function bySlug(slug) {
  return Object.prototype.hasOwnProperty.call(products, slug) ? products[slug] : null;
}

function localized(slug, locale) {
  const product = bySlug(slug);
  if (!product) return null;
  return { ...product, i18n: undefined, ...(product.i18n[locale] || product.i18n.de) };
}

module.exports = { slugs, bySlug, localized, paths: slugs.map((slug) => products[slug].path) };
