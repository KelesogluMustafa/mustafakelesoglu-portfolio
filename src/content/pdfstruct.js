'use strict';

/**
 * PDFStruct landing page (/pdfstruct): the single source for version, links, formats, images
 * and copy. Downloads, source and release notes stay on GitHub; the site hosts only this page.
 *
 * Rules:
 * - `version` is the latest PUBLIC stable release. Update it here and nowhere else.
 * - Only assets that exist in that release are linked. Things from the repository's main
 *   branch that are not released yet are described as "next release", never linked.
 * - No measured speed, accuracy or token-saving figures.
 */
const config = require('../config');

const version = 'v0.2.1';
const number = version.replace(/^v/, '');
const repo = 'https://github.com/KelesogluMustafa/pdfstruct';
const asset = (name) => `${repo}/releases/download/${version}/${name}`;

const links = {
  repo,
  latest: `${repo}/releases/latest`,
  release: `${repo}/releases/tag/${version}`,
  license: `${repo}/blob/main/LICENSE`,
  checksums: asset('SHA256SUMS.txt'),
  windowsSetup: asset(`PDFStruct-Windows-Setup-${number}.zip`),
  plugin: asset('pdfstruct-plugin.zip'),
  wheel: asset(`pdfstruct-${number}-py3-none-any.whl`),
  skill: asset('pdfstruct-skill.zip'),
  mcpb: asset(`pdfstruct-${number}.mcpb`),
  // Empty until the owner sets PDFSTRUCT_DONATION_URL; the template then renders no link.
  donation: config.pdfstruct.donationUrl,
};

const inputs = ['PDF', 'DOCX', 'TXT', 'Markdown', 'HTML', 'JPG', 'PNG', 'TIFF', 'BMP', 'WebP'];
const formats = ['JSON', 'HTML', 'TXT', 'Markdown', 'CSV', 'XLSX', 'DOCX', 'JSONL', 'SQLite', 'PDF'];

// English artwork, used unchanged in every locale. Widths are the generated WebP variants.
const IMG = '/img/pdfstruct';
const images = {
  logoOnDark: { base: `${IMG}/logo-on-dark`, widths: [360, 720], width: 720, height: 240 },
  logoOnLight: { base: `${IMG}/logo-on-light`, widths: [360, 720], width: 720, height: 237 },
  hero: { base: `${IMG}/hero`, widths: [640, 1100, 1672], width: 1672, height: 941 },
  how: { base: `${IMG}/how-it-works`, widths: [480, 720, 1092], width: 1092, height: 1440 },
  claude: { base: `${IMG}/claude-context`, widths: [480, 720, 1122], width: 1122, height: 1402 },
  og: `${IMG}/og-banner.jpg`,
};

const tools = ['inspect', 'search', 'read_excerpt', 'convert'];

const i18n = {
  en: {
    meta: {
      title: 'PDFStruct — Convert documents on your computer',
      description:
        'Free, open-source document converter with OCR: PDF, DOCX, text and images to 10 formats on your computer. Claude gets short results, not the whole file.',
    },
    hero: {
      badge: 'Free & open source · MIT',
      title: 'Convert documents on your computer, not in Claude’s context.',
      text: 'PDFStruct turns PDF, DOCX, text and image files into ten structured formats on your own machine. Claude gets short results instead of the whole file, which can cut context and token use, especially for large documents.',
      download: 'Download the latest release',
      source: 'View on GitHub',
      versionLabel: 'Current version',
      imageAlt:
        'PDFStruct illustration: PDF, DOCX, TXT and image files pass through native extraction or OCR and come out as JSON, XLSX, DOCX and PDF.',
    },
    proof: ['10 output formats', 'OCR when a page needs it', 'Less context and fewer tokens in Claude', 'Free and open source'],
    why: {
      title: 'Why PDFStruct?',
      cards: [
        {
          title: 'Your documents are processed on your computer',
          text: 'Files are read and converted on your own machine. Nothing is uploaded to a PDFStruct server, and the source file is never overwritten.',
        },
        {
          title: 'Large documents stay out of Claude’s context',
          text: 'Claude starts the conversion and gets back a short status and the output paths. It reads the content only when you ask, and then only in small pieces.',
        },
        {
          title: 'One read, ten output formats',
          text: 'Each input is read once. Every format you ask for is produced from the same structured result, and unchanged jobs can be run again safely.',
        },
      ],
    },
    how: {
      title: 'How it works',
      text: 'Four steps, the same for every way of using PDFStruct.',
      steps: [
        { title: 'PDF, DOCX, text or image', text: 'Give it one file, several files or a folder.' },
        {
          title: 'Native extraction or OCR',
          text: 'If a page has a usable text layer, it is read directly. Weak or scanned pages go through OCR.',
        },
        {
          title: 'raw.json',
          text: 'One structured result per document. Low-confidence pages are listed in review_pages.',
        },
        { title: '10 output formats', text: 'All requested formats are written from that one result.' },
      ],
      imageAlt:
        'Diagram “One read. Ten outputs.”: 1 PDF, DOCX, TXT and images; 2 native extraction or OCR; 3 raw.json; 4 JSON, XLSX, DOCX, PDF and six more formats.',
    },
    claude: {
      eyebrow: 'With Claude',
      title: 'Less context, fewer tokens',
      text: 'With the local MCP server, Claude works with your documents without receiving them in full. Each tool returns only what is needed:',
      items: [
        'returns short metadata about the file, not its content.',
        'brings back targeted matches for a query.',
        'reads at most 2,000 characters per call.',
        'returns a short status and the output paths instead of the document text.',
      ],
      note: 'How much context and how many tokens this saves depends on the document. There is no measured or guaranteed figure.',
      imageAlt:
        'Illustration “Don’t send the whole document to Claude”: a document on a laptop is processed by PDFStruct, and only Inspect, Search and excerpts of up to 2,000 characters reach Claude.',
    },
    formats: {
      title: 'Supported formats',
      text: 'Ten input types and ten output formats. Nothing else is supported.',
      inputTitle: 'Input',
      outputTitle: 'Output',
    },
    use: {
      title: 'Use it your way',
      text: 'One engine behind every option. Claude is optional: PDFStruct works without it.',
      cards: [
        {
          title: 'Desktop window',
          text: 'Drag files in, tick the formats, press Convert. On Windows, the setup ZIP installs PDFStruct into its own folder; it needs Python 3.10 to 3.13.',
          note: 'Updates are installed only after you confirm them; nothing runs in the background. This release has no portable build.',
          linkLabel: 'Download the Windows setup ZIP',
          link: 'windowsSetup',
        },
        {
          title: 'Command line and scripts',
          text: 'A keyboard menu in the terminal, or a single command without prompts for scripts and automation. Installed with pip from the wheel; needs Python 3.10 or newer.',
          note: 'Not on PyPI yet.',
          linkLabel: 'Download the Python wheel',
          link: 'wheel',
        },
        {
          title: 'Claude Code and Claude for Windows',
          text: 'A plugin for Claude Code (the skill plus the MCP server registration) and a .mcpb extension for the Claude desktop app let Claude run conversions on your computer.',
          note: 'Both are launchers without a copy of PDFStruct: install PDFStruct with the Windows setup first. If you use the plugin, do not add the separate skill ZIP as well.',
          linkLabel: 'Install order in the release notes',
          link: 'release',
        },
      ],
    },
    privacy: {
      title: 'Privacy',
      lead: 'Your documents are processed on your computer.',
      items: [
        'Documents are not uploaded to a PDFStruct server.',
        'No account is needed.',
        'No telemetry by default.',
        'No artificial usage limits and no mandatory payment.',
      ],
      note: 'One exception to know about: the first time OCR is needed, PDFStruct downloads its OCR models once (about 70 MB). That step needs an internet connection.',
    },
    limits: {
      title: 'What it does not do',
      text: 'PDFStruct extracts text and structure. It is not a table extractor and not a layout-preserving converter.',
      items: [
        'It does not rebuild tables. CSV and XLSX outputs are lists of text blocks, not real tables.',
        'DOCX to PDF does not keep the original layout. The PDF it writes is a readable re-flow.',
        'It does not summarise documents or extract fields with AI.',
        'There are no measured speed or accuracy figures.',
        'The first OCR run downloads its models (about 70 MB).',
      ],
    },
    free: {
      title: 'Free and open source',
      items: [
        'MIT licensed.',
        'Free to use.',
        'No Premium or Pro tier.',
        'No core feature depends on a donation.',
        'The source code is on GitHub.',
      ],
    },
    donate: {
      title: 'Support the project',
      text: 'PDFStruct is free and open source. If it saves you time, you can support its development by buying me a tea or coffee.',
      note: 'A donation is voluntary and unlocks nothing: every feature is already free.',
      button: 'Buy me a tea or coffee',
      soon: 'Coming soon',
    },
    faq: {
      title: 'Questions',
      items: [
        {
          q: 'Is PDFStruct free?',
          a: 'Yes. It is MIT licensed, has no Premium or Pro tier and no usage limits. Donations are voluntary and unlock nothing.',
        },
        {
          q: 'Are my documents uploaded?',
          a: 'No. Documents are processed on your computer and are not sent to a PDFStruct server. The only download is the OCR models (about 70 MB), once, the first time OCR is needed.',
        },
        {
          q: 'When is OCR used?',
          a: 'Only when a page needs it. If the page’s text layer is good enough, the text is read directly. Weak or scanned pages and images go through OCR.',
        },
        {
          q: 'How does it reduce Claude’s token and context use?',
          a: 'The whole document is never sent to Claude. inspect returns short metadata, search returns targeted matches, read_excerpt reads at most 2,000 characters per call, and convert returns a status and output paths. The saving depends on the document; there is no guaranteed figure.',
        },
        {
          q: 'Which formats does it support?',
          a: 'Input: PDF, DOCX, TXT, Markdown, HTML, JPG, PNG, TIFF, BMP and WebP. Output: JSON, HTML, TXT, Markdown, CSV, XLSX, DOCX, JSONL, SQLite and PDF.',
        },
        {
          q: 'Does it keep tables and page layout?',
          a: 'No. It does not rebuild tables: CSV and XLSX contain text blocks. A PDF made from a DOCX is a readable re-flow, not a copy of the original layout.',
        },
      ],
    },
    final: {
      title: 'Get PDFStruct',
      text: 'Download the latest stable release or read the source.',
    },
    labels: {
      releaseNotes: 'Release notes',
      checksums: 'SHA256 checksums',
      license: 'MIT license',
      logoAlt: 'PDFStruct',
      inFigure: 'The illustration is in English.',
    },
  },

  de: {
    meta: {
      title: 'PDFStruct — Dokumente auf dem eigenen Rechner umwandeln',
      description:
        'Kostenloser Open-Source-Konverter mit OCR: PDF, DOCX, Text und Bilder in 10 Formate auf deinem Rechner. Claude erhält kurze Ergebnisse statt der ganzen Datei.',
    },
    hero: {
      badge: 'Kostenlos & Open Source · MIT',
      title: 'Dokumente auf deinem Rechner umwandeln, nicht in Claudes Kontext.',
      text: 'PDFStruct wandelt PDF-, DOCX-, Text- und Bilddateien auf deinem eigenen Rechner in zehn strukturierte Formate um. Claude erhält kurze Ergebnisse statt der ganzen Datei. Das kann Kontext und Tokens sparen, besonders bei großen Dokumenten.',
      download: 'Aktuelle Version herunterladen',
      source: 'Auf GitHub ansehen',
      versionLabel: 'Aktuelle Version',
      imageAlt:
        'PDFStruct-Illustration: PDF-, DOCX-, TXT- und Bilddateien laufen durch native Extraktion oder OCR und werden als JSON, XLSX, DOCX und PDF ausgegeben.',
    },
    proof: ['10 Ausgabeformate', 'OCR, wenn eine Seite es braucht', 'Weniger Kontext und Tokens in Claude', 'Kostenlos und Open Source'],
    why: {
      title: 'Warum PDFStruct?',
      cards: [
        {
          title: 'Deine Dokumente werden auf deinem Rechner verarbeitet',
          text: 'Dateien werden auf deinem eigenen Rechner gelesen und umgewandelt. Nichts wird auf einen PDFStruct-Server hochgeladen, und die Quelldatei wird nie überschrieben.',
        },
        {
          title: 'Große Dokumente bleiben außerhalb von Claudes Kontext',
          text: 'Claude startet die Umwandlung und bekommt einen kurzen Status und die Ausgabepfade zurück. Den Inhalt liest Claude nur, wenn du es verlangst, und dann nur in kleinen Stücken.',
        },
        {
          title: 'Einmal lesen, zehn Ausgabeformate',
          text: 'Jede Eingabe wird einmal gelesen. Alle gewünschten Formate entstehen aus demselben strukturierten Ergebnis, und unveränderte Aufträge lassen sich gefahrlos erneut ausführen.',
        },
      ],
    },
    how: {
      title: 'So funktioniert es',
      text: 'Vier Schritte, bei jeder Art der Nutzung gleich.',
      steps: [
        { title: 'PDF, DOCX, Text oder Bild', text: 'Eine Datei, mehrere Dateien oder ein Ordner.' },
        {
          title: 'Native Extraktion oder OCR',
          text: 'Hat eine Seite eine brauchbare Textebene, wird sie direkt gelesen. Schwache oder gescannte Seiten laufen über OCR.',
        },
        {
          title: 'raw.json',
          text: 'Ein strukturiertes Ergebnis pro Dokument. Seiten mit geringer Sicherheit stehen in review_pages.',
        },
        { title: '10 Ausgabeformate', text: 'Alle gewünschten Formate werden aus diesem einen Ergebnis geschrieben.' },
      ],
      imageAlt:
        'Diagramm „One read. Ten outputs.“: 1 PDF, DOCX, TXT und Bilder; 2 native Extraktion oder OCR; 3 raw.json; 4 JSON, XLSX, DOCX, PDF und sechs weitere Formate.',
    },
    claude: {
      eyebrow: 'Mit Claude',
      title: 'Weniger Kontext, weniger Tokens',
      text: 'Über den lokalen MCP-Server arbeitet Claude mit deinen Dokumenten, ohne sie vollständig zu erhalten. Jedes Werkzeug liefert nur, was gebraucht wird:',
      items: [
        'liefert kurze Metadaten zur Datei, nicht ihren Inhalt.',
        'bringt gezielte Treffer zu einer Suchanfrage.',
        'liest höchstens 2.000 Zeichen pro Aufruf.',
        'gibt einen kurzen Status und die Ausgabepfade zurück statt des Dokumenttexts.',
      ],
      note: 'Wie viel Kontext und wie viele Tokens das spart, hängt vom Dokument ab. Es gibt keinen gemessenen oder garantierten Wert.',
      imageAlt:
        'Illustration „Don’t send the whole document to Claude“: Ein Dokument auf einem Laptop wird von PDFStruct verarbeitet; nur Inspect, Search und Auszüge bis 2.000 Zeichen erreichen Claude.',
    },
    formats: {
      title: 'Unterstützte Formate',
      text: 'Zehn Eingabetypen und zehn Ausgabeformate. Mehr wird nicht unterstützt.',
      inputTitle: 'Eingabe',
      outputTitle: 'Ausgabe',
    },
    use: {
      title: 'So nutzt du es',
      text: 'Hinter jeder Variante steckt dieselbe Engine. Claude ist optional: PDFStruct funktioniert auch ohne.',
      cards: [
        {
          title: 'Desktop-Fenster',
          text: 'Dateien hineinziehen, Formate ankreuzen, auf Convert klicken. Unter Windows installiert das Setup-ZIP PDFStruct in einen eigenen Ordner; es benötigt Python 3.10 bis 3.13.',
          note: 'Updates werden erst installiert, nachdem du sie bestätigt hast; im Hintergrund läuft nichts. Dieses Release enthält keine portable Version.',
          linkLabel: 'Windows-Setup-ZIP herunterladen',
          link: 'windowsSetup',
        },
        {
          title: 'Kommandozeile und Skripte',
          text: 'Ein Tastaturmenü im Terminal oder ein einzelner Befehl ohne Rückfragen für Skripte und Automatisierung. Installation per pip aus dem Wheel; benötigt Python 3.10 oder neuer.',
          note: 'Noch nicht auf PyPI.',
          linkLabel: 'Python-Wheel herunterladen',
          link: 'wheel',
        },
        {
          title: 'Claude Code und Claude für Windows',
          text: 'Ein Plugin für Claude Code (der Skill plus die Registrierung des MCP-Servers) und eine .mcpb-Erweiterung für die Claude-Desktop-App lassen Claude Umwandlungen auf deinem Rechner starten.',
          note: 'Beide sind nur Starter ohne eigene PDFStruct-Kopie: Installiere PDFStruct zuerst mit dem Windows-Setup. Wenn du das Plugin nutzt, füge das separate Skill-ZIP nicht zusätzlich hinzu.',
          linkLabel: 'Installationsreihenfolge in den Release Notes',
          link: 'release',
        },
      ],
    },
    privacy: {
      title: 'Datenschutz',
      lead: 'Deine Dokumente werden auf deinem Rechner verarbeitet.',
      items: [
        'Dokumente werden nicht auf einen PDFStruct-Server hochgeladen.',
        'Es ist kein Konto nötig.',
        'Standardmäßig keine Telemetrie.',
        'Keine künstlichen Nutzungsgrenzen und keine Pflichtzahlung.',
      ],
      note: 'Eine Ausnahme solltest du kennen: Wenn OCR zum ersten Mal gebraucht wird, lädt PDFStruct die OCR-Modelle einmal herunter (etwa 70 MB). Dafür ist eine Internetverbindung nötig.',
    },
    limits: {
      title: 'Was es nicht kann',
      text: 'PDFStruct extrahiert Text und Struktur. Es ist kein Tabellen-Extraktor und kein layoutgetreuer Konverter.',
      items: [
        'Es baut keine Tabellen nach. CSV- und XLSX-Ausgaben sind Listen von Textblöcken, keine echten Tabellen.',
        'DOCX zu PDF behält das ursprüngliche Layout nicht bei. Das erzeugte PDF ist ein lesbarer Neuumbruch.',
        'Es fasst Dokumente nicht mit KI zusammen und extrahiert keine Felder.',
        'Es gibt keine gemessenen Werte zu Geschwindigkeit oder Genauigkeit.',
        'Beim ersten OCR-Lauf werden die Modelle heruntergeladen (etwa 70 MB).',
      ],
    },
    free: {
      title: 'Kostenlos und Open Source',
      items: [
        'MIT-Lizenz.',
        'Kostenlos nutzbar.',
        'Keine Premium- oder Pro-Stufe.',
        'Keine Kernfunktion hängt von einer Spende ab.',
        'Der Quellcode liegt auf GitHub.',
      ],
    },
    donate: {
      title: 'Das Projekt unterstützen',
      text: 'PDFStruct ist kostenlos und Open Source. Wenn es dir Zeit spart, kannst du die Entwicklung mit einem Tee oder Kaffee unterstützen.',
      note: 'Eine Spende ist freiwillig und schaltet nichts frei: Alle Funktionen sind bereits kostenlos.',
      button: 'Einen Tee oder Kaffee spendieren',
      soon: 'Demnächst',
    },
    faq: {
      title: 'Fragen',
      items: [
        {
          q: 'Ist PDFStruct kostenlos?',
          a: 'Ja. Es steht unter der MIT-Lizenz, hat keine Premium- oder Pro-Stufe und keine Nutzungsgrenzen. Spenden sind freiwillig und schalten nichts frei.',
        },
        {
          q: 'Werden meine Dokumente hochgeladen?',
          a: 'Nein. Dokumente werden auf deinem Rechner verarbeitet und nicht an einen PDFStruct-Server gesendet. Heruntergeladen werden nur die OCR-Modelle (etwa 70 MB), einmalig, wenn OCR zum ersten Mal gebraucht wird.',
        },
        {
          q: 'Wann wird OCR verwendet?',
          a: 'Nur, wenn eine Seite es braucht. Ist die Textebene der Seite gut genug, wird der Text direkt gelesen. Schwache oder gescannte Seiten und Bilder laufen über OCR.',
        },
        {
          q: 'Wie senkt es den Token- und Kontextverbrauch in Claude?',
          a: 'Das ganze Dokument wird nie an Claude geschickt. inspect liefert kurze Metadaten, search gezielte Treffer, read_excerpt liest höchstens 2.000 Zeichen pro Aufruf, und convert gibt einen Status und Ausgabepfade zurück. Die Ersparnis hängt vom Dokument ab; einen garantierten Wert gibt es nicht.',
        },
        {
          q: 'Welche Formate werden unterstützt?',
          a: 'Eingabe: PDF, DOCX, TXT, Markdown, HTML, JPG, PNG, TIFF, BMP und WebP. Ausgabe: JSON, HTML, TXT, Markdown, CSV, XLSX, DOCX, JSONL, SQLite und PDF.',
        },
        {
          q: 'Bleiben Tabellen und Seitenlayout erhalten?',
          a: 'Nein. Tabellen werden nicht nachgebaut: CSV und XLSX enthalten Textblöcke. Ein aus einem DOCX erzeugtes PDF ist ein lesbarer Neuumbruch, keine Kopie des ursprünglichen Layouts.',
        },
      ],
    },
    final: {
      title: 'PDFStruct holen',
      text: 'Lade die aktuelle stabile Version herunter oder lies den Quellcode.',
    },
    labels: {
      releaseNotes: 'Release Notes',
      checksums: 'SHA256-Prüfsummen',
      license: 'MIT-Lizenz',
      logoAlt: 'PDFStruct',
      inFigure: 'Die Abbildung ist auf Englisch.',
    },
  },

  tr: {
    meta: {
      title: 'PDFStruct — Belgelerini kendi bilgisayarında dönüştür',
      description:
        'OCR destekli ücretsiz, açık kaynak dönüştürücü: PDF, DOCX, metin ve görselleri bilgisayarında 10 formata çevirir. Claude dosyanın tamamını değil, kısa sonuçları alır.',
    },
    hero: {
      badge: 'Ücretsiz ve açık kaynak · MIT',
      title: 'Belgelerini bilgisayarında dönüştür, Claude’un context’inde değil.',
      text: 'PDFStruct; PDF, DOCX, metin ve görsel dosyalarını kendi bilgisayarında on yapılandırılmış formata dönüştürür. Claude dosyanın tamamı yerine kısa sonuçlar alır. Bu, özellikle büyük belgelerde context ve token kullanımını azaltabilir.',
      download: 'Son sürümü indir',
      source: 'GitHub’da incele',
      versionLabel: 'Güncel sürüm',
      imageAlt:
        'PDFStruct görseli: PDF, DOCX, TXT ve görsel dosyaları yerel metin çıkarımı veya OCR’dan geçip JSON, XLSX, DOCX ve PDF olarak çıkıyor.',
    },
    proof: ['10 çıktı formatı', 'Sayfa gerektirdiğinde OCR', 'Claude’da daha az context ve token', 'Ücretsiz ve açık kaynak'],
    why: {
      title: 'Neden PDFStruct?',
      cards: [
        {
          title: 'Belgelerin bilgisayarında işlenir',
          text: 'Dosyalar kendi bilgisayarında okunur ve dönüştürülür. PDFStruct sunucusuna hiçbir şey yüklenmez ve kaynak dosyanın üzerine asla yazılmaz.',
        },
        {
          title: 'Büyük belgeler Claude’un context’ine taşınmaz',
          text: 'Claude dönüştürmeyi başlatır ve yalnızca kısa bir durum bilgisi ile çıktı yollarını alır. İçeriği ancak sen istediğinde ve küçük parçalar hâlinde okur.',
        },
        {
          title: 'Tek okuma, on çıktı formatı',
          text: 'Her girdi bir kez okunur. İstediğin bütün formatlar aynı yapılandırılmış sonuçtan üretilir ve değişmemiş işler güvenle yeniden çalıştırılabilir.',
        },
      ],
    },
    how: {
      title: 'Nasıl çalışır?',
      text: 'Dört adım; hangi yolla kullanırsan kullan aynı.',
      steps: [
        { title: 'PDF, DOCX, metin veya görsel', text: 'Tek dosya, birkaç dosya ya da bir klasör ver.' },
        {
          title: 'Yerel metin çıkarımı veya OCR',
          text: 'Sayfanın metin katmanı yeterliyse doğrudan okunur. Zayıf veya taranmış sayfalar OCR’dan geçer.',
        },
        {
          title: 'raw.json',
          text: 'Her belge için tek bir yapılandırılmış sonuç. Güveni düşük sayfalar review_pages içinde işaretlenir.',
        },
        { title: '10 çıktı formatı', text: 'İstenen bütün formatlar bu tek sonuçtan yazılır.' },
      ],
      imageAlt:
        '“One read. Ten outputs.” şeması: 1 PDF, DOCX, TXT ve görseller; 2 yerel metin çıkarımı veya OCR; 3 raw.json; 4 JSON, XLSX, DOCX, PDF ve altı format daha.',
    },
    claude: {
      eyebrow: 'Claude ile',
      title: 'Daha az context, daha az token',
      text: 'Yerel MCP sunucusu sayesinde Claude, belgelerinin tamamını almadan onlarla çalışır. Her araç yalnızca gerekeni döndürür:',
      items: [
        'dosyanın içeriğini değil, kısa metadata bilgisini döndürür.',
        'bir sorgu için hedefli sonuçlar getirir.',
        'çağrı başına en fazla 2.000 karakter okur.',
        'belge metni yerine kısa bir durum bilgisi ve çıktı yollarını döndürür.',
      ],
      note: 'Ne kadar context ve token tasarrufu sağlandığı belgeye göre değişir. Ölçülmüş ya da garanti edilen bir oran yoktur.',
      imageAlt:
        '“Don’t send the whole document to Claude” görseli: dizüstü bilgisayardaki belge PDFStruct tarafından işleniyor; Claude’a yalnızca Inspect, Search ve en fazla 2.000 karakterlik alıntılar ulaşıyor.',
    },
    formats: {
      title: 'Desteklenen formatlar',
      text: 'On girdi türü ve on çıktı formatı. Bunların dışındakiler desteklenmez.',
      inputTitle: 'Girdi',
      outputTitle: 'Çıktı',
    },
    use: {
      title: 'İstediğin şekilde kullan',
      text: 'Her seçeneğin arkasında aynı motor var. Claude isteğe bağlı: PDFStruct onsuz da çalışır.',
      cards: [
        {
          title: 'Masaüstü penceresi',
          text: 'Dosyaları sürükle, formatları işaretle, Convert’e bas. Windows’ta kurulum ZIP’i PDFStruct’ı kendi klasörüne kurar; Python 3.10–3.13 gerekir.',
          note: 'Güncellemeler ancak sen onayladıktan sonra kurulur; arka planda hiçbir şey çalışmaz. Bu sürümde taşınabilir paket yok.',
          linkLabel: 'Windows kurulum ZIP’ini indir',
          link: 'windowsSetup',
        },
        {
          title: 'Komut satırı ve betikler',
          text: 'Terminalde klavyeyle kullanılan bir menü ya da betikler ve otomasyon için soru sormayan tek komut. Wheel dosyasından pip ile kurulur; Python 3.10 veya üstü gerekir.',
          note: 'Henüz PyPI’da değil.',
          linkLabel: 'Python wheel dosyasını indir',
          link: 'wheel',
        },
        {
          title: 'Claude Code ve Windows için Claude',
          text: 'Claude Code için plugin (skill ve MCP sunucusu kaydı) ve Claude masaüstü uygulaması için .mcpb eklentisi, Claude’un dönüştürmeleri senin bilgisayarında çalıştırmasını sağlar.',
          note: 'İkisi de yalnızca başlatıcıdır, içlerinde PDFStruct yoktur: önce PDFStruct’ı Windows kurulumuyla kur. Plugin kullanıyorsan ayrı skill ZIP’ini ayrıca ekleme.',
          linkLabel: 'Kurulum sırası sürüm notlarında',
          link: 'release',
        },
      ],
    },
    privacy: {
      title: 'Gizlilik',
      lead: 'Belgelerin kendi bilgisayarında işlenir.',
      items: [
        'Belgeler PDFStruct sunucusuna yüklenmez.',
        'Hesap gerekmez.',
        'Varsayılan olarak telemetri yoktur.',
        'Yapay kullanım limiti ve zorunlu ödeme yoktur.',
      ],
      note: 'Bilmen gereken tek istisna: OCR ilk kez gerektiğinde PDFStruct, OCR modellerini bir kez indirir (yaklaşık 70 MB). Bu adım için internet bağlantısı gerekir.',
    },
    limits: {
      title: 'Yapmadıkları',
      text: 'PDFStruct metni ve yapıyı çıkarır. Bir tablo çıkarma aracı ya da sayfa düzenini koruyan bir dönüştürücü değildir.',
      items: [
        'Tablo yapısını yeniden kurmaz. CSV ve XLSX çıktıları gerçek tablo değil, metin bloklarının listesidir.',
        'DOCX’ten PDF’e dönüştürme özgün düzeni birebir korumaz. Üretilen PDF, okunabilir bir yeniden akıştır.',
        'Yapay zekâyla özetleme veya alan çıkarımı yapmaz.',
        'Ölçülmüş bir hız ya da doğruluk oranı yoktur.',
        'İlk OCR kullanımında modeller indirilir (yaklaşık 70 MB).',
      ],
    },
    free: {
      title: 'Ücretsiz ve açık kaynak',
      items: [
        'MIT lisanslı.',
        'Kullanımı ücretsiz.',
        'Premium ya da Pro katmanı yok.',
        'Hiçbir temel özellik bağışa bağlı değil.',
        'Kaynak kod GitHub’da.',
      ],
    },
    donate: {
      title: 'Projeyi destekle',
      text: 'PDFStruct ücretsiz ve açık kaynak. İşine yaradıysa bana bir çay veya kahve ısmarlayarak geliştirmeyi destekleyebilirsin.',
      note: 'Bağış tamamen gönüllüdür ve hiçbir özelliği açmaz: bütün özellikler zaten ücretsiz.',
      button: 'Bir çay veya kahve ısmarla',
      soon: 'Yakında',
    },
    faq: {
      title: 'Sorular',
      items: [
        {
          q: 'PDFStruct ücretsiz mi?',
          a: 'Evet. MIT lisanslıdır, Premium ya da Pro katmanı ve kullanım limiti yoktur. Bağışlar gönüllüdür ve hiçbir özelliği açmaz.',
        },
        {
          q: 'Belgelerim bir yere yükleniyor mu?',
          a: 'Hayır. Belgeler bilgisayarında işlenir ve PDFStruct sunucusuna gönderilmez. İndirilen tek şey, OCR ilk kez gerektiğinde bir defaya mahsus inen OCR modelleridir (yaklaşık 70 MB).',
        },
        {
          q: 'OCR ne zaman kullanılıyor?',
          a: 'Yalnızca sayfa gerektirdiğinde. Sayfanın metin katmanı yeterliyse metin doğrudan okunur. Zayıf veya taranmış sayfalar ile görseller OCR’dan geçer.',
        },
        {
          q: 'Claude’un token ve context tüketimini nasıl azaltıyor?',
          a: 'Belgenin tamamı Claude’a hiç gönderilmez. inspect kısa metadata döndürür, search hedefli sonuçlar getirir, read_excerpt çağrı başına en fazla 2.000 karakter okur, convert ise durum bilgisi ve çıktı yollarını döndürür. Tasarruf belgeye göre değişir; garanti edilen bir oran yoktur.',
        },
        {
          q: 'Hangi formatları destekliyor?',
          a: 'Girdi: PDF, DOCX, TXT, Markdown, HTML, JPG, PNG, TIFF, BMP ve WebP. Çıktı: JSON, HTML, TXT, Markdown, CSV, XLSX, DOCX, JSONL, SQLite ve PDF.',
        },
        {
          q: 'Tabloları ve sayfa düzenini koruyor mu?',
          a: 'Hayır. Tabloları yeniden kurmaz: CSV ve XLSX metin blokları içerir. DOCX’ten üretilen PDF, özgün düzenin kopyası değil, okunabilir bir yeniden akıştır.',
        },
      ],
    },
    final: {
      title: 'PDFStruct’ı edin',
      text: 'Son kararlı sürümü indir ya da kaynak kodu incele.',
    },
    labels: {
      releaseNotes: 'Sürüm notları',
      checksums: 'SHA256 özetleri',
      license: 'MIT lisansı',
      logoAlt: 'PDFStruct',
      inFigure: 'Görsel İngilizcedir.',
    },
  },
};

function localized(locale) {
  return { links, version, images, tools, inputList: inputs, formatList: formats, ...(i18n[locale] || i18n.de) };
}

module.exports = { links, version, inputs, formats, images, localized };
