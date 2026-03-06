import { Metadata } from "next";
import { RamadanMoonContent } from "./RamadanMoonContent";

export const revalidate = 3600;

const BASE_URL = "https://www.slowmorocco.com";
const SLUG = "ramadan-moon";
const CANONICAL = `${BASE_URL}/stories/${SLUG}`;

// ─────────────────────────────────────────────────────────────────────────────
// METADATA
// ─────────────────────────────────────────────────────────────────────────────

export const metadata: Metadata = {
  title: "The Islamic Calendar — Ramadan, Eid al-Fitr & Eid al-Adha | Slow Morocco",
  description:
    "The Hijri calendar is purely lunar — 12 months, 354 days, each month beginning at the sighting of the crescent moon. Three observances shape the rhythm of Moroccan life: Ramadan, Eid al-Fitr, and Eid al-Adha.",
  keywords: [
    "Islamic calendar", "Hijri calendar", "lunar calendar",
    "Ramadan Morocco", "Eid al-Fitr", "Eid al-Adha",
    "Islamic months", "hilal crescent", "Shawwal", "Dhul Hijjah",
    "Morocco holidays", "Islamic observances", "lunar year",
  ],
  authors: [{ name: "J. Ng", url: `${BASE_URL}/about` }],
  alternates: { canonical: CANONICAL },
  openGraph: {
    title: "The Islamic Calendar — Ramadan, Eid al-Fitr & Eid al-Adha",
    description: "12 lunar months. 354 days. Three observances that drift through the seasons, completing a full rotation every 33 years.",
    url: CANONICAL,
    siteName: "Slow Morocco",
    locale: "en_GB",
    type: "article",
    authors: ["J. Ng"],
    tags: ["Islamic calendar", "Ramadan", "Eid al-Fitr", "Eid al-Adha", "Morocco", "lunar"],
  },
  twitter: {
    card: "summary_large_image",
    title: "The Islamic Calendar — Ramadan, Eid al-Fitr & Eid al-Adha",
    description: "12 lunar months. 354 days. Three observances that drift through the seasons, completing a full rotation every 33 years.",
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
      "headline": "The Islamic Calendar — Ramadan, Eid al-Fitr & Eid al-Adha",
      "description": "The Hijri calendar is purely lunar — 12 months, 354 days, each month beginning at the sighting of the crescent moon. Three observances shape the rhythm of Moroccan life.",
      "datePublished": "2025-01-01",
      "dateModified": new Date().toISOString().split("T")[0],
      "author": { "@type": "Person", "name": "J. Ng", "url": `${BASE_URL}/about` },
      "publisher": { "@type": "Organization", "name": "Slow Morocco", "url": BASE_URL },
      "mainEntityOfPage": CANONICAL,
      "keywords": "Islamic calendar, Hijri calendar, Ramadan Morocco, Eid al-Fitr, Eid al-Adha, lunar calendar, Islamic months, hilal crescent",
      "articleSection": "Cultural Intelligence",
      "spatialCoverage": { "@type": "Place", "name": "Morocco", "geo": { "@type": "GeoShape", "box": "27.6 -13.2 35.9 -1.0" } },
    },
    {
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Slow Morocco", "item": BASE_URL },
        { "@type": "ListItem", "position": 2, "name": "Stories", "item": `${BASE_URL}/stories` },
        { "@type": "ListItem", "position": 3, "name": "The Islamic Calendar", "item": CANONICAL },
      ],
    },
  ],
};

// ─────────────────────────────────────────────────────────────────────────────
// PAGE
// ─────────────────────────────────────────────────────────────────────────────

export default function RamadanMoonPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <RamadanMoonContent />
    </>
  );
}
