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
  title: "Ramadan & the Moon — 30 Nights, 33-Year Drift, Fasting Hours in Marrakech | Slow Morocco",
  description:
    "The Islamic calendar is purely lunar — 354 days, 11 shorter than the Gregorian year. Ramadan drifts backward through the seasons, completing a full rotation every 33 years. The crescent moon begins it. The crescent moon ends it.",
  keywords: [
    "Ramadan Morocco", "Islamic lunar calendar", "Ramadan fasting hours",
    "Laylat al-Qadr", "Night of Power", "Ramadan moon phases",
    "33-year Ramadan cycle", "Ramadan Marrakech", "hilal crescent",
    "Eid al-Fitr", "Ramadan seasonal drift", "fasting hours Morocco",
    "Islamic calendar", "Ramadan 2026", "lunar year",
  ],
  authors: [{ name: "J. Ng", url: `${BASE_URL}/about` }],
  alternates: { canonical: CANONICAL },
  openGraph: {
    title: "Ramadan & the Moon — 30 Nights, a 33-Year Drift",
    description: "354-day lunar year. 11-day annual drift. In one lifetime you fast in every season. Moon phases, fasting hours, and the Night of Power visualised.",
    url: CANONICAL,
    siteName: "Slow Morocco",
    locale: "en_GB",
    type: "article",
    authors: ["J. Ng"],
    tags: ["Ramadan", "Morocco", "Islamic calendar", "lunar", "fasting", "Marrakech"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Ramadan & the Moon — 30 Nights, a 33-Year Drift",
    description: "354-day lunar year. 11-day annual drift. In one lifetime you fast in every season. Fasting hours in Marrakech visualised.",
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
      "headline": "Ramadan & the Moon — 30 Nights, 33-Year Drift, Fasting Hours in Marrakech",
      "description": "The Islamic calendar is purely lunar — 354 days, 11 shorter than the Gregorian year. Ramadan drifts backward through the seasons, completing a full rotation every 33 years. The crescent moon begins it. The crescent moon ends it.",
      "datePublished": "2025-01-01",
      "dateModified": new Date().toISOString().split("T")[0],
      "author": { "@type": "Person", "name": "J. Ng", "url": `${BASE_URL}/about` },
      "publisher": { "@type": "Organization", "name": "Slow Morocco", "url": BASE_URL },
      "mainEntityOfPage": CANONICAL,
      "keywords": "Ramadan Morocco, Islamic lunar calendar, Ramadan fasting hours, Laylat al-Qadr, Night of Power, 33-year Ramadan cycle, hilal crescent, Eid al-Fitr, Marrakech",
      "articleSection": "Cultural Intelligence",
      "spatialCoverage": { "@type": "Place", "name": "Morocco", "geo": { "@type": "GeoShape", "box": "27.6 -13.2 35.9 -1.0" } },
    },
    {
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Slow Morocco", "item": BASE_URL },
        { "@type": "ListItem", "position": 2, "name": "Stories", "item": `${BASE_URL}/stories` },
        { "@type": "ListItem", "position": 3, "name": "Ramadan & the Moon", "item": CANONICAL },
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
