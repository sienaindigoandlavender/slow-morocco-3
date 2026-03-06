import { Metadata } from "next";
import { MoroccanCalendarContent } from "./MoroccanCalendarContent";

export const revalidate = 3600;

const BASE_URL = "https://www.slowmorocco.com";
const SLUG = "moroccan-calendar";
const CANONICAL = `${BASE_URL}/stories/${SLUG}`;

// ─────────────────────────────────────────────────────────────────────────────
// METADATA
// ─────────────────────────────────────────────────────────────────────────────

export const metadata: Metadata = {
  title: "The Moroccan Calendar — Four Calendars, One Year, Time Is Not Singular Here | Slow Morocco",
  description:
    "Morocco operates on four overlapping calendars simultaneously: Gregorian national holidays, Islamic lunar observances, Amazigh agricultural seasons, and French school terms. 9 national holidays, 5 Islamic observances, 7 Amazigh events, and 6 school terms mapped across one year.",
  keywords: [
    "Moroccan calendar", "Morocco holidays", "Ramadan Morocco", "Eid al-Fitr",
    "Eid al-Adha", "Yennayer", "Amazigh calendar", "Islamic calendar Morocco",
    "Morocco school calendar", "Throne Day", "Independence Day Morocco",
    "Amazigh New Year", "Moroccan public holidays", "rentrée scolaire Morocco",
  ],
  authors: [{ name: "J. Ng", url: `${BASE_URL}/about` }],
  alternates: { canonical: CANONICAL },
  openGraph: {
    title: "The Moroccan Calendar — Four Calendars, One Year",
    description: "Gregorian, Islamic, Amazigh, and school: four calendars layered across one Moroccan year. Every holiday, harvest, and holiday break mapped.",
    url: CANONICAL,
    siteName: "Slow Morocco",
    locale: "en_GB",
    type: "article",
    authors: ["J. Ng"],
    tags: ["Morocco", "calendar", "Ramadan", "Amazigh", "holidays", "school calendar"],
  },
  twitter: {
    card: "summary_large_image",
    title: "The Moroccan Calendar — Four Calendars, One Year",
    description: "9 national holidays. 5 Islamic observances. 7 Amazigh events. 6 school terms. One year.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-snippet": -1, "max-image-preview": "large" },
  },
};

// ─────────────────────────────────────────────────────────────────────────────
// JSON-LD
// ─────────────────────────────────────────────────────────────────────────────

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Article",
      "@id": `${CANONICAL}#article`,
      "headline": "The Moroccan Calendar — Four Calendars, One Year, Time Is Not Singular Here",
      "description": "Morocco operates on four overlapping calendars simultaneously: Gregorian national holidays, Islamic lunar observances, Amazigh agricultural seasons, and French school terms. All mapped across one year.",
      "datePublished": "2025-01-01",
      "dateModified": new Date().toISOString().split("T")[0],
      "author": { "@type": "Person", "name": "J. Ng", "url": `${BASE_URL}/about` },
      "publisher": { "@type": "Organization", "name": "Slow Morocco", "url": BASE_URL },
      "mainEntityOfPage": CANONICAL,
      "keywords": "Moroccan calendar, Morocco holidays, Ramadan, Eid, Yennayer, Amazigh calendar, Islamic calendar, school calendar",
      "articleSection": "Culture & Society",
      "spatialCoverage": { "@type": "Place", "name": "Morocco", "geo": { "@type": "GeoShape", "box": "27.0 -13.5 36.0 -1.0" } },
    },
    {
      "@type": "Dataset",
      "@id": `${CANONICAL}#dataset`,
      "name": "Moroccan Calendar Events — Gregorian, Islamic, Amazigh & School 2025–2026",
      "description": "Complete mapping of Morocco's four overlapping calendar systems: 9 national holidays, 5 Islamic lunar observances (with 2026 approximate Gregorian dates), 7 Amazigh agricultural events, and 6 school terms.",
      "url": CANONICAL,
      "creator": { "@type": "Organization", "name": "Slow Morocco" },
      "spatialCoverage": "Morocco",
      "temporalCoverage": "2025/2026",
    },
    {
      "@type": "FAQPage",
      "@id": `${CANONICAL}#faq`,
      "mainEntity": [
        {
          "@type": "Question",
          "name": "How many calendars does Morocco use?",
          "acceptedAnswer": { "@type": "Answer", "text": "Morocco operates on four overlapping calendars simultaneously: the Gregorian calendar (state and business), the Islamic lunar calendar (Ramadan, Eid, religious observances), the Amazigh agricultural calendar (planting, harvest, solstice cycles), and the French-inherited school calendar (rentrée, vacances). A Moroccan family tracks all four." },
        },
        {
          "@type": "Question",
          "name": "When is Yennayer, the Amazigh New Year?",
          "acceptedAnswer": { "@type": "Answer", "text": "Yennayer falls on January 13 and became a Moroccan national holiday in 2024. It marks the Amazigh agricultural new year — year 2976 in the Amazigh count. Families celebrate with couscous with seven vegetables. The date marks a calendar system older than both the Islamic and Gregorian systems in North Africa." },
        },
        {
          "@type": "Question",
          "name": "Why does Ramadan move every year in Morocco?",
          "acceptedAnswer": { "@type": "Answer", "text": "The Islamic calendar is 354 days long (lunar), compared to 365 in the Gregorian calendar. Ramadan shifts approximately 11 days earlier each Gregorian year, cycling through all seasons over a 33-year period. This means a Moroccan born in 1990 has experienced Ramadan in winter (short, cold days) and summer (16-hour scorching days)." },
        },
      ],
    },
    {
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Slow Morocco", "item": BASE_URL },
        { "@type": "ListItem", "position": 2, "name": "Stories", "item": `${BASE_URL}/stories` },
        { "@type": "ListItem", "position": 3, "name": "The Moroccan Calendar", "item": CANONICAL },
      ],
    },
  ],
};

// ─────────────────────────────────────────────────────────────────────────────
// PAGE
// ─────────────────────────────────────────────────────────────────────────────

export default function MoroccanCalendarPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <MoroccanCalendarContent />
    </>
  );
}
