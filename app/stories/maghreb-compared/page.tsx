import { Metadata } from "next";
import { MaghrebComparedContent } from "./MaghrebComparedContent";

export const revalidate = 3600;

const BASE_URL = "https://www.slowmorocco.com";
const SLUG = "maghreb-compared";
const CANONICAL = `${BASE_URL}/stories/${SLUG}`;

// ─────────────────────────────────────────────────────────────────────────────
// METADATA
// ─────────────────────────────────────────────────────────────────────────────

export const metadata: Metadata = {
  title: "The Maghreb Compared — Morocco, Tunisia & Algeria in Numbers | Slow Morocco",
  description:
    "Morocco, Tunisia, and Algeria — the overview that doesn't exist in one place. Population, GDP, tourism, HDI, and 15 more indicators from the World Bank, IMF, and UN (2024).",
  keywords: [
    "Maghreb comparison", "Morocco statistics", "Tunisia statistics", "Algeria statistics",
    "North Africa data", "Maghreb GDP", "Maghreb population", "Morocco GDP per capita",
    "Algeria GDP", "Tunisia tourism", "Morocco tourism arrivals", "North Africa economy",
    "HDI Morocco Tunisia Algeria", "Maghreb urbanization", "Morocco unemployment",
  ],
  authors: [{ name: "J. Ng", url: `${BASE_URL}/about` }],
  alternates: { canonical: CANONICAL },
  openGraph: {
    title: "The Maghreb Compared — Morocco, Tunisia & Algeria in Numbers",
    description: "97.9 million people. $481 billion GDP. Every number from the World Bank, IMF, and UN — in one place.",
    url: CANONICAL,
    siteName: "Slow Morocco",
    locale: "en_GB",
    type: "article",
    authors: ["J. Ng"],
    tags: ["Maghreb", "Morocco", "Tunisia", "Algeria", "data", "economy", "North Africa"],
  },
  twitter: {
    card: "summary_large_image",
    title: "The Maghreb Compared — Morocco, Tunisia & Algeria in Numbers",
    description: "97.9 million people. $481 billion GDP. The Maghreb overview that didn't exist — until now.",
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
      "headline": "The Maghreb Compared — Morocco, Tunisia & Algeria in Numbers",
      "description": "Morocco, Tunisia, and Algeria — the overview that doesn't exist in one place. Population, GDP, tourism, HDI, and 15 more indicators from the World Bank, IMF, and UN (2024).",
      "datePublished": "2025-01-01",
      "dateModified": new Date().toISOString().split("T")[0],
      "author": { "@type": "Person", "name": "J. Ng", "url": `${BASE_URL}/about` },
      "publisher": { "@type": "Organization", "name": "Slow Morocco", "url": BASE_URL },
      "mainEntityOfPage": CANONICAL,
      "keywords": "Maghreb comparison, Morocco statistics, Tunisia statistics, Algeria statistics, North Africa data, GDP, population, tourism, HDI",
      "articleSection": "Data",
      "spatialCoverage": { "@type": "Place", "name": "The Maghreb — Morocco, Tunisia, Algeria", "geo": { "@type": "GeoShape", "box": "18.0 -17.0 37.5 12.0" } },
    },
    {
      "@type": "Dataset",
      "@id": `${CANONICAL}#dataset`,
      "name": "Maghreb Compared — Morocco, Tunisia & Algeria Key Indicators",
      "description": "Comparative data for Morocco, Tunisia, and Algeria covering population, GDP, GDP per capita, growth, unemployment, inflation, tourism, internet penetration, urbanization, HDI, remittances, FDI, CO2 emissions, and women in parliament. Sources: World Bank, IMF, UNDP, UNWTO, UN Population Division (2024).",
      "url": CANONICAL,
      "creator": { "@type": "Organization", "name": "World Bank / IMF / UNDP" },
      "spatialCoverage": "The Maghreb — Morocco, Tunisia, Algeria",
      "temporalCoverage": "2024",
    },
    {
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Slow Morocco", "item": BASE_URL },
        { "@type": "ListItem", "position": 2, "name": "Stories", "item": `${BASE_URL}/stories` },
        { "@type": "ListItem", "position": 3, "name": "The Maghreb Compared", "item": CANONICAL },
      ],
    },
  ],
};

// ─────────────────────────────────────────────────────────────────────────────
// PAGE
// ─────────────────────────────────────────────────────────────────────────────

export default function MaghrebComparedPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <MaghrebComparedContent />
    </>
  );
}
