import { Metadata } from "next";
import { ImperialCitiesContent } from "./ImperialCitiesContent";

export const revalidate = 3600;

const BASE_URL = "https://www.slowmorocco.com";
const SLUG = "imperial-cities";
const CANONICAL = `${BASE_URL}/stories/${SLUG}`;

// ─────────────────────────────────────────────────────────────────────────────
// METADATA
// ─────────────────────────────────────────────────────────────────────────────

export const metadata: Metadata = {
  title: "The Four Imperial Cities — Fez, Marrakech, Meknès, Rabat | Slow Morocco",
  description:
    "Seven dynasties, four capitals, 1,233 years of political architecture. From the Idrisids founding Fez in 789 to Rabat becoming the modern seat of power in 1912. The imperial cities of Morocco — mapped, measured, and explained.",
  keywords: [
    "imperial cities Morocco", "Fez Morocco", "Marrakech Morocco", "Meknès Morocco",
    "Rabat Morocco", "Moroccan dynasties", "Idrisid dynasty", "Almoravid dynasty",
    "Almohad dynasty", "Marinid dynasty", "Saadian dynasty", "Alaouite dynasty",
    "al-Qarawiyyin university", "Koutoubia Mosque", "Hassan Tower",
    "Moulay Ismail", "Morocco history", "UNESCO Morocco",
  ],
  authors: [{ name: "J. Ng", url: `${BASE_URL}/about` }],
  alternates: { canonical: CANONICAL },
  openGraph: {
    title: "The Four Imperial Cities — Fez, Marrakech, Meknès, Rabat",
    description: "Seven dynasties, four capitals, 1,233 years. The political architecture of Morocco — mapped, measured, and explained.",
    url: CANONICAL,
    siteName: "Slow Morocco",
    locale: "en_GB",
    type: "article",
    authors: ["J. Ng"],
    tags: ["imperial cities", "Morocco", "dynasties", "Fez", "Marrakech", "Meknès", "Rabat", "UNESCO"],
  },
  twitter: {
    card: "summary_large_image",
    title: "The Four Imperial Cities — Fez, Marrakech, Meknès, Rabat",
    description: "Seven dynasties, four capitals, 1,233 years. The political architecture of Morocco.",
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
      "headline": "The Four Imperial Cities — Fez, Marrakech, Meknès, Rabat",
      "description": "Seven dynasties, four capitals, 1,233 years of political architecture. From the Idrisids founding Fez in 789 to Rabat becoming the modern seat of power in 1912. The imperial cities of Morocco — mapped, measured, and explained.",
      "datePublished": "2025-01-01",
      "dateModified": new Date().toISOString().split("T")[0],
      "author": { "@type": "Person", "name": "J. Ng", "url": `${BASE_URL}/about` },
      "publisher": { "@type": "Organization", "name": "Slow Morocco", "url": BASE_URL },
      "mainEntityOfPage": CANONICAL,
      "keywords": "imperial cities Morocco, Fez, Marrakech, Meknès, Rabat, Moroccan dynasties, Idrisid, Almoravid, Almohad, Marinid, Saadian, Alaouite, al-Qarawiyyin, Koutoubia, Hassan Tower, UNESCO",
      "articleSection": "Political & Cultural Intelligence",
      "spatialCoverage": { "@type": "Place", "name": "Imperial Cities of Morocco — Fez, Marrakech, Meknès, Rabat", "geo": { "@type": "GeoShape", "box": "31.0 -8.5 34.5 -4.5" } },
    },
    {
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Slow Morocco", "item": BASE_URL },
        { "@type": "ListItem", "position": 2, "name": "Stories", "item": `${BASE_URL}/stories` },
        { "@type": "ListItem", "position": 3, "name": "The Four Imperial Cities", "item": CANONICAL },
      ],
    },
  ],
};

// ─────────────────────────────────────────────────────────────────────────────
// PAGE
// ─────────────────────────────────────────────────────────────────────────────

export default function ImperialCitiesPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ImperialCitiesContent />
    </>
  );
}
