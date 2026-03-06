import { Metadata } from "next";
import { TheApothecaryContent } from "./TheApothecaryContent";

export const revalidate = 3600;

const BASE_URL = "https://www.slowmorocco.com";
const SLUG = "the-apothecary";
const CANONICAL = `${BASE_URL}/stories/${SLUG}`;

// ─────────────────────────────────────────────────────────────────────────────
// METADATA
// ─────────────────────────────────────────────────────────────────────────────

export const metadata: Metadata = {
  title: "The Apothecary — Morocco's Living Pharmacopoeia | Slow Morocco",
  description:
    "Morocco has 7,000 plant species. 800 are medicinal. 40 are endemic. From the Rif Mountains to the pre-Saharan south, the attar still prescribes what Ibn al-Baytar catalogued in the 13th century. 16 key plants, 9 medicinal regions, and 800 years of scholarly lineage — mapped and explained.",
  keywords: [
    "Morocco medicinal plants", "Moroccan pharmacopoeia", "attar Morocco",
    "ethnobotany Morocco", "Bellakhdar", "Ibn al-Baytar", "Moroccan herbs",
    "oregano Morocco", "argan oil", "saffron Taliouine", "Lamiaceae Morocco",
    "traditional medicine Morocco", "Rif Mountains plants", "Atlas cedar",
    "Darija herb names", "Moroccan herbal remedies",
  ],
  authors: [{ name: "J. Ng", url: `${BASE_URL}/about` }],
  alternates: { canonical: CANONICAL },
  openGraph: {
    title: "The Apothecary — Morocco's Living Pharmacopoeia",
    description: "7,000 plant species. 800 medicinal. 40 endemic. The attar in the souk still prescribes what was catalogued walking from Málaga to Damascus in the 13th century.",
    url: CANONICAL,
    siteName: "Slow Morocco",
    locale: "en_GB",
    type: "article",
    authors: ["J. Ng"],
    tags: ["Morocco", "medicinal plants", "ethnobotany", "pharmacopoeia", "attar", "herbs"],
  },
  twitter: {
    card: "summary_large_image",
    title: "The Apothecary — Morocco's Living Pharmacopoeia",
    description: "7,000 plant species. 800 medicinal. 40 endemic. Morocco's living pharmacopoeia mapped.",
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
      "headline": "The Apothecary — Morocco's Living Pharmacopoeia",
      "description": "Morocco has 7,000 plant species. 800 are medicinal. 40 are endemic. From the Rif Mountains to the pre-Saharan south, the attar still prescribes what Ibn al-Baytar catalogued in the 13th century. 16 key plants, 9 medicinal regions, and 800 years of scholarly lineage.",
      "datePublished": "2025-01-01",
      "dateModified": new Date().toISOString().split("T")[0],
      "author": { "@type": "Person", "name": "J. Ng", "url": `${BASE_URL}/about` },
      "publisher": { "@type": "Organization", "name": "Slow Morocco", "url": BASE_URL },
      "mainEntityOfPage": CANONICAL,
      "keywords": "Morocco medicinal plants, Moroccan pharmacopoeia, attar, ethnobotany, Bellakhdar, Ibn al-Baytar, Lamiaceae, saffron Taliouine, argan, Atlas cedar",
      "articleSection": "Ethnobotany & Traditional Medicine",
      "spatialCoverage": { "@type": "Place", "name": "Morocco — Rif Mountains to pre-Saharan South", "geo": { "@type": "GeoShape", "box": "29.0 -10.0 35.5 -1.0" } },
    },
    {
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Slow Morocco", "item": BASE_URL },
        { "@type": "ListItem", "position": 2, "name": "Stories", "item": `${BASE_URL}/stories` },
        { "@type": "ListItem", "position": 3, "name": "The Apothecary", "item": CANONICAL },
      ],
    },
  ],
};

// ─────────────────────────────────────────────────────────────────────────────
// PAGE
// ─────────────────────────────────────────────────────────────────────────────

export default function TheApothecaryPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <TheApothecaryContent />
    </>
  );
}
