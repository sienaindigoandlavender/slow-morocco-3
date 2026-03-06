import { Metadata } from "next";
import { OliveOilEconomyContent } from "./OliveOilEconomyContent";

export const revalidate = 3600;

const BASE_URL = "https://www.slowmorocco.com";
const SLUG = "olive-oil-economy";
const CANONICAL = `${BASE_URL}/stories/${SLUG}`;

// ─────────────────────────────────────────────────────────────────────────────
// METADATA
// ─────────────────────────────────────────────────────────────────────────────

export const metadata: Metadata = {
  title: "The Olive Oil Economy — Morocco's Green Gold | Slow Morocco",
  description:
    "1.2 million hectares of olive trees. Half a million families. One dominant cultivar. From Phoenician roots to US tariff advantage — Morocco's olive oil economy mapped across six regions, four varieties, and the arithmetic of drought and recovery.",
  keywords: [
    "olive oil Morocco", "Moroccan olive oil", "Picholine Marocaine",
    "Morocco olive regions", "Fès-Meknès olive oil", "Moroccan EVOO",
    "olive oil production Morocco", "Morocco agriculture",
    "Green Morocco Plan", "olive oil export Morocco",
    "Haouzia olive", "Menara olive", "Morocco Gold",
    "olive oil drought Morocco", "US tariff olive oil",
  ],
  authors: [{ name: "J. Ng", url: `${BASE_URL}/about` }],
  alternates: { canonical: CANONICAL },
  openGraph: {
    title: "The Olive Oil Economy — Morocco's Green Gold",
    description: "1.2M hectares. 500,000+ families. 96% one cultivar. Morocco's olive oil economy mapped across six regions and the arithmetic of drought and recovery.",
    url: CANONICAL,
    siteName: "Slow Morocco",
    locale: "en_GB",
    type: "article",
    authors: ["J. Ng"],
    tags: ["olive oil", "Morocco", "agriculture", "economy", "Picholine", "EVOO"],
  },
  twitter: {
    card: "summary_large_image",
    title: "The Olive Oil Economy — Morocco's Green Gold",
    description: "1.2M hectares. 500,000+ families. Morocco's olive oil economy mapped across six regions.",
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
      "headline": "The Olive Oil Economy — Morocco's Green Gold",
      "description": "1.2 million hectares of olive trees. Half a million families. One dominant cultivar. From Phoenician roots to US tariff advantage — Morocco's olive oil economy mapped across six regions, four varieties, and the arithmetic of drought and recovery.",
      "datePublished": "2025-01-01",
      "dateModified": new Date().toISOString().split("T")[0],
      "author": { "@type": "Person", "name": "J. Ng", "url": `${BASE_URL}/about` },
      "publisher": { "@type": "Organization", "name": "Slow Morocco", "url": BASE_URL },
      "mainEntityOfPage": CANONICAL,
      "keywords": "olive oil Morocco, Picholine Marocaine, Moroccan EVOO, Fès-Meknès, olive oil production, Green Morocco Plan, Morocco agriculture",
      "articleSection": "Agriculture & Economy",
      "spatialCoverage": { "@type": "Place", "name": "Morocco — Olive-producing regions from Tangier to Souss-Massa", "geo": { "@type": "GeoShape", "box": "29.5 -10.0 35.5 -1.5" } },
    },
    {
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Slow Morocco", "item": BASE_URL },
        { "@type": "ListItem", "position": 2, "name": "Stories", "item": `${BASE_URL}/stories` },
        { "@type": "ListItem", "position": 3, "name": "The Olive Oil Economy", "item": CANONICAL },
      ],
    },
  ],
};

// ─────────────────────────────────────────────────────────────────────────────
// PAGE
// ─────────────────────────────────────────────────────────────────────────────

export default function OliveOilEconomyPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <OliveOilEconomyContent />
    </>
  );
}
