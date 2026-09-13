'use strict';

// Preserves the existing project catalogue and extends it with Kırıkkale Taksicin.
const base = require('./projects-base');
const fs = require('fs');
const path = require('path');

const newProject = {
  slug: 'kirikkale-taksicin',
  group: 'client',
  kind: 'client',
  featured: true,
  order: 6,
  year: null,
  liveUrl: 'https://kirikkaletaksicin.com/',
  repoUrl: null,
  statusKey: 'live',
  tech: ['Online-Reservierungsformular', 'WhatsApp-Integration', 'Standortfreigabe', '24/7-Erreichbarkeit', 'Responsive Design'],
  media: { desktop: 'kirikkale-taksicin-desktop.png', mobile: 'kirikkale-taksicin-mobile.png' },
  accent: 'sky',
  i18n: {
    de: {
      title: 'Kırıkkale Taksicin',
      tagline: 'Buchungs- und Kontaktseite für einen Taxidienst in Kırıkkale, Türkei.',
      summary: 'Website für „Kırıkkale Merhaba Taksi“ (Taxifahrer Ahmet Torlak): Fahrgäste erreichen den Fahrer direkt per WhatsApp mit Standortfreigabe, per Telefon oder über ein Formular zur Vorausbuchung der Fahrt. Der Dienst ist rund um die Uhr erreichbar und deckt das Kırıkkale-Stadtzentrum ab.',
      problem: 'Ein einzelner Taxifahrer braucht einen einfachen, sofort nutzbaren Weg, wie Fahrgäste ihn erreichen und eine Fahrt anfragen können, ohne eine App zu installieren oder eine Vermittlungszentrale anzurufen – besonders dann, wenn der eigene Standort direkt geteilt werden soll.',
      role: 'Konzeption und Umsetzung der Website, einschließlich WhatsApp-Kontaktweg mit Standortfreigabe, Telefonkontakt und Formular zur Fahrtanfrage, sowie responsive Umsetzung und Veröffentlichung.',
      solution: 'Eine schlanke, einsprachige (türkische) Website mit einem direkten WhatsApp-Link zum Teilen des eigenen Standorts, einer sichtbar platzierten Telefonnummer für den sofortigen Anruf und einem Formular, über das Name, Abhol- und Zieladresse, Datum, Uhrzeit, Personenzahl und eine Notiz für eine vorausgeplante Fahrt übermittelt werden.',
      features: ['WhatsApp-Kontakt mit Standortfreigabe', 'Direkter Telefonkontakt', 'Formular zur Vorausbuchung einer Fahrt (Adresse, Datum, Uhrzeit, Personenzahl, Notiz)', '7/24 Erreichbarkeit', 'Adressangabe des Taxistands in Kırıkkale'],
      security: ['HTTPS-Verbindung auf der veröffentlichten Website', 'Keine Zahlungsabwicklung oder Speicherung sensibler Daten auf der Website', 'Kontaktaufnahme läuft über WhatsApp und Telefon statt über ein eigenes Konto- oder Zahlungssystem'],
      outcomes: ['Website ist live und wird für Fahrtanfragen und Kontakt genutzt'],
      outcomesNote: null,
      ctaTitle: 'Website für ein lokales Dienstleistungsunternehmen?',
      ctaText: 'Ich setze einfache, schnelle Kontakt- und Buchungswege um, die auch für kleine, lokale Dienstleister ohne technisches Team funktionieren.',
    },
    en: {
      title: 'Kırıkkale Taksicin',
      tagline: 'Booking and contact page for a taxi service in Kırıkkale, Turkey.',
      summary: 'Website for "Kırıkkale Merhaba Taksi" (driver Ahmet Torlak): passengers can reach the driver directly via WhatsApp with location sharing, by phone, or through a form to book a ride in advance. The service is available around the clock and covers the Kırıkkale city centre.',
      problem: 'A single taxi driver needs a simple, immediately usable way for passengers to reach him and request a ride without installing an app or calling a dispatch centre, especially when the passenger wants to share their own location directly.',
      role: 'Concept and implementation of the website, including the WhatsApp contact path with location sharing, phone contact and a ride-request form, plus responsive implementation and publishing.',
      solution: "A lean, single-language (Turkish) website with a direct WhatsApp link for sharing the passenger's own location, a clearly placed phone number for an immediate call, and a form that submits name, pickup and destination address, date, time, passenger count and a note for a ride planned in advance.",
      features: ['WhatsApp contact with location sharing', 'Direct phone contact', 'Advance ride-booking form (address, date, time, passenger count, note)', '24/7 availability', 'Address of the taxi stand in Kırıkkale'],
      security: ['HTTPS connection on the published website', 'No payment processing or storage of sensitive data on the website', 'Contact happens via WhatsApp and phone instead of a dedicated account or payment system'],
      outcomes: ['Website is live and used for ride requests and contact'],
      outcomesNote: null,
      ctaTitle: 'A website for a local service business?',
      ctaText: 'I build simple, fast contact and booking paths that work for small, local service providers without a technical team.',
    },
    tr: {
      title: 'Kırıkkale Taksicin',
      tagline: 'Kırıkkale’de bir taksi hizmeti için rezervasyon ve iletişim sayfası.',
      summary: '"Kırıkkale Merhaba Taksi" (şoför Ahmet Torlak) için web sitesi: yolcular şoföre doğrudan WhatsApp üzerinden konum paylaşarak, telefonla veya önceden yolculuk planlamak için bir form üzerinden ulaşabiliyor. Hizmet 7/24 erişilebilir ve Kırıkkale şehir merkezini kapsıyor.',
      problem: 'Tek bir taksi şoförünün, yolcuların bir uygulama kurmadan veya bir çağrı merkezini aramadan kendisine ulaşıp yolculuk talep edebileceği basit ve hemen kullanılabilir bir yola ihtiyacı vardı; özellikle yolcunun kendi konumunu doğrudan paylaşmak istediği durumlarda.',
      role: 'Web sitesinin konsept ve uygulaması; konum paylaşımlı WhatsApp iletişim yolu, telefon iletişimi ve yolculuk talep formu dahil, responsive uygulama ve yayına alma.',
      solution: 'Yolcunun kendi konumunu paylaşabileceği doğrudan bir WhatsApp bağlantısı, hemen arama için görünür şekilde yerleştirilmiş bir telefon numarası ve ad soyad, alınacak/gidilecek adres, tarih, saat, yolcu sayısı ve not bilgilerini ileten, önceden yolculuk planlamaya yönelik bir forma sahip; sade ve tek dilli (Türkçe) bir web sitesi.',
      features: ['Konum paylaşımlı WhatsApp iletişimi', 'Doğrudan telefon iletişimi', 'Önceden yolculuk rezervasyon formu (adres, tarih, saat, yolcu sayısı, not)', '7/24 erişilebilirlik', 'Kırıkkale’deki taksi durağının adres bilgisi'],
      security: ['Yayınlanan sitede HTTPS bağlantısı', 'Sitede ödeme işlemi veya hassas veri saklama yok', 'İletişim, kendi hesap veya ödeme sistemi yerine WhatsApp ve telefon üzerinden yürütülüyor'],
      outcomes: ['Site yayında ve yolculuk talepleri ile iletişim için kullanılıyor'],
      outcomesNote: null,
      ctaTitle: 'Yerel bir hizmet işletmesi için web sitesi mi?',
      ctaText: 'Teknik ekibi olmayan küçük, yerel hizmet sağlayıcılar için de çalışan basit ve hızlı iletişim ve rezervasyon yolları kuruyorum.',
    },
  },
};

const MEDIA_DIR = path.join(__dirname, '..', '..', 'public', 'img', 'projects');
function localizeNew(locale) {
  const copy = newProject.i18n[locale] || newProject.i18n.de;
  return {
    ...newProject,
    ...copy,
    i18n: undefined,
    mediaAvailable: {
      desktop: fs.existsSync(path.join(MEDIA_DIR, newProject.media.desktop)),
      mobile: fs.existsSync(path.join(MEDIA_DIR, newProject.media.mobile)),
    },
  };
}

function all() { return [...base.all(), newProject].sort((a, b) => a.order - b.order); }
function bySlug(slug) { return slug === newProject.slug ? newProject : base.bySlug(slug); }
function localized(project, locale) { return project.slug === newProject.slug ? localizeNew(locale) : base.localized(project, locale); }
function allLocalized(locale) { return all().map((project) => localized(project, locale)); }

module.exports = { all, bySlug, localized, allLocalized, slugs: [...base.slugs, newProject.slug] };
