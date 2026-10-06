'use strict';

/**
 * PDFStruct landing page (/pdfstruct). Static content only: downloads, source and
 * release notes stay on GitHub; the site hosts nothing but this page.
 */
const links = {
  repo: 'https://github.com/KelesogluMustafa/pdfstruct',
  latest: 'https://github.com/KelesogluMustafa/pdfstruct/releases/latest',
  release: 'https://github.com/KelesogluMustafa/pdfstruct/releases/tag/v0.1.0',
  checksums: 'https://github.com/KelesogluMustafa/pdfstruct/releases/download/v0.1.0/SHA256SUMS.txt',
  license: 'https://github.com/KelesogluMustafa/pdfstruct/blob/main/LICENSE',
};

const version = 'v0.1.0';
const formats = ['JSON', 'HTML', 'TXT', 'Markdown', 'CSV', 'XLSX', 'DOCX', 'JSONL', 'SQLite'];

const i18n = {
  en: {
    meta: {
      title: 'PDFStruct — Free Open Source PDF OCR & Conversion Tool',
      description:
        'PDFStruct extracts native PDF text, falls back to OCR automatically and converts PDFs locally into JSON, XLSX, DOCX, Markdown and more. Free, open source, no account.',
    },
    eyebrow: 'Open-source tool',
    subtitle: 'Free & Open Source PDF Extraction, OCR & Conversion',
    intro:
      'PDFStruct automatically extracts native PDF text when available and uses OCR when needed. Convert PDFs locally into structured, reusable formats.',
    download: 'Download PDFStruct',
    source: 'View Source',
    versionLabel: 'Current version',
    releaseNotes: 'Release notes',
    checksums: 'SHA256 checksums',
    licenseLabel: 'MIT license',
    easy: {
      title: 'Easy usage',
      text: 'Open a terminal in a folder with PDFs and run one command. PDFStruct asks for the rest.',
      steps: [
        'PDFStruct scans the PDFs in the current folder.',
        'Select one or more PDF files.',
        'Select one or more output formats.',
        'Convert.',
      ],
      keysTitle: 'Keys in the menu',
      keys: [
        ['↑ ↓', 'move'],
        ['SPACE', 'select / deselect'],
        ['A', 'select all'],
        ['ENTER', 'continue'],
        ['B', 'back'],
        ['Q', 'quit'],
      ],
      fileTitle: 'One file',
      fileText: 'Choose the output formats interactively for a single PDF.',
      advancedTitle: 'Scripts and automation',
      advancedText: 'Pass the format explicitly, or use one of the format aliases. No menu, no prompt.',
    },
    features: {
      title: 'Features',
      items: [
        'Automatic native text extraction',
        'Automatic OCR fallback',
        'Interactive terminal interface',
        'Multi-PDF selection',
        'Multi-format selection',
        'Batch processing',
        'Local processing',
        'No account required',
        'No telemetry',
        'Free and open source',
      ],
    },
    formats: { title: 'Output formats', text: 'Every PDF is read once; every selected format is produced from the same structured data.' },
    how: {
      title: 'How it works',
      steps: [
        ['PDF', 'A file, a folder or a whole batch.'],
        ['Native text check', 'Each page gets a quality score for its text layer.'],
        ['Native text', 'If the text layer is good, it is used directly. Fast, exact, no OCR.'],
        ['Automatic OCR', 'Scanned or photographed pages go through OCR on your CPU.'],
        ['Structured data', 'Pages, lines, positions, method and confidence per page.'],
        ['Your format', 'JSON, XLSX, DOCX, Markdown or any of the other formats.'],
      ],
    },
    privacy: {
      title: 'Privacy',
      lead: 'PDF processing happens locally on your computer.',
      items: [
        'does not require an account',
        'does not upload your PDFs to PDFStruct servers',
        'has no telemetry by default',
        'has no artificial usage limits',
      ],
      note: 'The first time OCR is needed, PDFStruct downloads the OCR models once (about 70 MB) and keeps them in a local cache.',
    },
    platforms: {
      title: 'Platform support',
      text: 'Native extraction and CPU OCR were verified with automated tests on GitHub Actions for:',
      items: ['Windows x86_64', 'Linux x86_64', 'macOS Apple Silicon'],
      note: 'The interactive terminal menu was also checked by hand on Windows with a physical keyboard. Other platforms are not listed as supported.',
    },
    free: {
      title: 'Free and open source',
      lead: 'PDFStruct is free and open source.',
      items: [
        'MIT licensed',
        'no Pro or Premium tier',
        'no artificial usage limits',
        'no mandatory accounts',
        'no telemetry by default',
        'all core functionality is free',
      ],
      note: 'Donations will be entirely voluntary later on and will never unlock features.',
    },
    release: { title: 'Version and release' },
  },

  de: {
    meta: {
      title: 'PDFStruct — Kostenloses Open-Source-Tool für PDF-OCR und -Konvertierung',
      description:
        'PDFStruct liest nativen PDF-Text, nutzt bei Bedarf automatisch OCR und wandelt PDFs lokal in JSON, XLSX, DOCX, Markdown und mehr um. Kostenlos, Open Source, ohne Konto.',
    },
    eyebrow: 'Open-Source-Tool',
    subtitle: 'Free & Open Source PDF Extraction, OCR & Conversion',
    intro:
      'PDFStruct liest nativen PDF-Text, wenn er vorhanden ist, und nutzt OCR, wenn es nötig ist. PDFs werden lokal in strukturierte, weiterverwendbare Formate umgewandelt.',
    download: 'PDFStruct herunterladen',
    source: 'Quellcode ansehen',
    versionLabel: 'Aktuelle Version',
    releaseNotes: 'Release Notes',
    checksums: 'SHA256-Prüfsummen',
    licenseLabel: 'MIT-Lizenz',
    easy: {
      title: 'Einfache Nutzung',
      text: 'Ein Terminal im Ordner mit den PDFs öffnen und einen Befehl ausführen. Den Rest fragt PDFStruct ab.',
      steps: [
        'PDFStruct sucht die PDFs im aktuellen Ordner.',
        'Eine oder mehrere PDF-Dateien auswählen.',
        'Ein oder mehrere Ausgabeformate auswählen.',
        'Umwandeln.',
      ],
      keysTitle: 'Tasten im Menü',
      keys: [
        ['↑ ↓', 'bewegen'],
        ['LEERTASTE', 'auswählen / abwählen'],
        ['A', 'alle auswählen'],
        ['ENTER', 'weiter'],
        ['B', 'zurück'],
        ['Q', 'beenden'],
      ],
      fileTitle: 'Eine Datei',
      fileText: 'Die Ausgabeformate für ein einzelnes PDF interaktiv wählen.',
      advancedTitle: 'Skripte und Automatisierung',
      advancedText: 'Das Format direkt angeben oder einen der Format-Aliase nutzen. Kein Menü, keine Rückfrage.',
    },
    features: {
      title: 'Funktionen',
      items: [
        'Automatische Extraktion von nativem Text',
        'Automatischer OCR-Fallback',
        'Interaktive Terminal-Oberfläche',
        'Auswahl mehrerer PDFs',
        'Auswahl mehrerer Formate',
        'Stapelverarbeitung',
        'Lokale Verarbeitung',
        'Kein Konto nötig',
        'Keine Telemetrie',
        'Kostenlos und Open Source',
      ],
    },
    formats: {
      title: 'Ausgabeformate',
      text: 'Jedes PDF wird einmal gelesen; jedes gewählte Format entsteht aus denselben strukturierten Daten.',
    },
    how: {
      title: 'So funktioniert es',
      steps: [
        ['PDF', 'Eine Datei, ein Ordner oder ein ganzer Stapel.'],
        ['Prüfung des nativen Texts', 'Jede Seite bekommt eine Qualitätsbewertung für ihre Textebene.'],
        ['Nativer Text', 'Ist die Textebene gut, wird sie direkt verwendet. Schnell, exakt, ohne OCR.'],
        ['Automatisches OCR', 'Gescannte oder fotografierte Seiten laufen per OCR über die CPU.'],
        ['Strukturierte Daten', 'Seiten, Zeilen, Positionen, Methode und Konfidenz pro Seite.'],
        ['Ihr Format', 'JSON, XLSX, DOCX, Markdown oder eines der anderen Formate.'],
      ],
    },
    privacy: {
      title: 'Datenschutz',
      lead: 'Die Verarbeitung der PDFs findet lokal auf Ihrem Rechner statt.',
      items: [
        'benötigt kein Konto',
        'lädt Ihre PDFs nicht auf PDFStruct-Server hoch',
        'hat standardmäßig keine Telemetrie',
        'hat keine künstlichen Nutzungsgrenzen',
      ],
      note: 'Wenn OCR zum ersten Mal gebraucht wird, lädt PDFStruct die OCR-Modelle einmal herunter (rund 70 MB) und behält sie in einem lokalen Cache.',
    },
    platforms: {
      title: 'Unterstützte Plattformen',
      text: 'Native Extraktion und CPU-OCR wurden mit automatisierten Tests auf GitHub Actions geprüft für:',
      items: ['Windows x86_64', 'Linux x86_64', 'macOS Apple Silicon'],
      note: 'Das interaktive Terminal-Menü wurde unter Windows zusätzlich von Hand mit einer physischen Tastatur geprüft. Andere Plattformen werden nicht als unterstützt angegeben.',
    },
    free: {
      title: 'Kostenlos und Open Source',
      lead: 'PDFStruct ist kostenlos und Open Source.',
      items: [
        'MIT-Lizenz',
        'keine Pro- oder Premium-Stufe',
        'keine künstlichen Nutzungsgrenzen',
        'keine Kontopflicht',
        'standardmäßig keine Telemetrie',
        'alle Kernfunktionen sind kostenlos',
      ],
      note: 'Spenden werden später vollständig freiwillig sein und schalten nie Funktionen frei.',
    },
    release: { title: 'Version und Release' },
  },

  tr: {
    meta: {
      title: 'PDFStruct — Ücretsiz, Açık Kaynak PDF OCR ve Dönüştürme Aracı',
      description:
        'PDFStruct PDF’lerdeki yerel metni okur, gerektiğinde otomatik OCR kullanır ve PDF’leri yerel olarak JSON, XLSX, DOCX, Markdown ve diğer formatlara dönüştürür. Ücretsiz, açık kaynak, hesap gerekmez.',
    },
    eyebrow: 'Açık kaynak araç',
    subtitle: 'Free & Open Source PDF Extraction, OCR & Conversion',
    intro:
      'PDFStruct, varsa PDF’in kendi metnini otomatik okur; gerektiğinde OCR kullanır. PDF’leri bilgisayarınızda yapılandırılmış, yeniden kullanılabilir formatlara dönüştürür.',
    download: 'PDFStruct’ı indir',
    source: 'Kaynak kodu',
    versionLabel: 'Güncel sürüm',
    releaseNotes: 'Sürüm notları',
    checksums: 'SHA256 özetleri',
    licenseLabel: 'MIT lisansı',
    easy: {
      title: 'Kolay kullanım',
      text: 'PDF’lerin olduğu klasörde bir terminal açın ve tek komut yazın. Gerisini PDFStruct sorar.',
      steps: [
        'PDFStruct bulunduğunuz klasördeki PDF’leri tarar.',
        'Bir veya daha fazla PDF dosyası seçin.',
        'Bir veya daha fazla çıktı formatı seçin.',
        'Dönüştürün.',
      ],
      keysTitle: 'Menüdeki tuşlar',
      keys: [
        ['↑ ↓', 'gezin'],
        ['SPACE', 'seç / kaldır'],
        ['A', 'hepsini seç'],
        ['ENTER', 'devam'],
        ['B', 'geri'],
        ['Q', 'çık'],
      ],
      fileTitle: 'Tek dosya',
      fileText: 'Tek bir PDF için çıktı formatlarını etkileşimli seçin.',
      advancedTitle: 'Betikler ve otomasyon',
      advancedText: 'Formatı doğrudan verin ya da format kısayollarından birini kullanın. Menü yok, soru yok.',
    },
    features: {
      title: 'Özellikler',
      items: [
        'Yerel metni otomatik çıkarma',
        'Otomatik OCR yedeği',
        'Etkileşimli terminal arayüzü',
        'Birden çok PDF seçimi',
        'Birden çok format seçimi',
        'Toplu işleme',
        'Yerel işleme',
        'Hesap gerekmez',
        'Telemetri yok',
        'Ücretsiz ve açık kaynak',
      ],
    },
    formats: { title: 'Çıktı formatları', text: 'Her PDF bir kez okunur; seçilen her format aynı yapılandırılmış veriden üretilir.' },
    how: {
      title: 'Nasıl çalışır',
      steps: [
        ['PDF', 'Bir dosya, bir klasör ya da toplu bir yığın.'],
        ['Yerel metin kontrolü', 'Her sayfanın metin katmanı için bir kalite puanı hesaplanır.'],
        ['Yerel metin', 'Metin katmanı iyiyse doğrudan kullanılır. Hızlı, kesin, OCR’siz.'],
        ['Otomatik OCR', 'Taranmış veya fotoğraflanmış sayfalar işlemcinizde OCR’dan geçer.'],
        ['Yapılandırılmış veri', 'Sayfa, satır, konum, yöntem ve sayfa başına güven değeri.'],
        ['İstediğiniz format', 'JSON, XLSX, DOCX, Markdown veya diğer formatlardan biri.'],
      ],
    },
    privacy: {
      title: 'Gizlilik',
      lead: 'PDF işleme, bilgisayarınızda yerel olarak yapılır.',
      items: [
        'hesap gerektirmez',
        'PDF’lerinizi PDFStruct sunucularına yüklemez',
        'varsayılan olarak telemetri içermez',
        'yapay kullanım sınırı koymaz',
      ],
      note: 'OCR ilk kez gerektiğinde PDFStruct, OCR modellerini bir kez indirir (yaklaşık 70 MB) ve yerel bir önbellekte tutar.',
    },
    platforms: {
      title: 'Platform desteği',
      text: 'Yerel çıkarım ve CPU OCR, GitHub Actions üzerinde otomatik testlerle şu platformlarda doğrulandı:',
      items: ['Windows x86_64', 'Linux x86_64', 'macOS Apple Silicon'],
      note: 'Etkileşimli terminal menüsü Windows’ta ayrıca gerçek klavyeyle elle denendi. Diğer platformlar destekleniyor olarak listelenmez.',
    },
    free: {
      title: 'Ücretsiz ve açık kaynak',
      lead: 'PDFStruct ücretsiz ve açık kaynaktır.',
      items: [
        'MIT lisanslı',
        'Pro veya Premium katmanı yok',
        'yapay kullanım sınırı yok',
        'zorunlu hesap yok',
        'varsayılan olarak telemetri yok',
        'tüm temel işlevler ücretsiz',
      ],
      note: 'Bağışlar ileride tamamen gönüllü olacak ve hiçbir zaman özellik açmayacak.',
    },
    release: { title: 'Sürüm ve yayın' },
  },
};

function localized(locale) {
  return { links, version, formatList: formats, ...(i18n[locale] || i18n.de) };
}

module.exports = { links, version, formats, localized };
