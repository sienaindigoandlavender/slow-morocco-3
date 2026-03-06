import { Metadata } from "next";
import AutomotiveIndustryContent from "./AutomotiveIndustryContent";

export const revalidate = 3600;

const BASE_URL = "https://www.slowmorocco.com";
const SLUG = "automotive-industry";
const CANONICAL = `${BASE_URL}/stories/${SLUG}`;

// ─────────────────────────────────────────────────────────────────────────────
// METADATA
// ─────────────────────────────────────────────────────────────────────────────

export const metadata: Metadata = {
  title: "Morocco's Automotive Revolution — From SOMACA to Africa's #1 Car Producer | Slow Morocco",
  description:
    "Morocco produces over 700,000 vehicles a year across three assembly plants — Renault Tangier, SOMACA Casablanca, and Stellantis Kenitra. With $17B in exports, 270+ suppliers, and the EU's top auto exporter ranking, the kingdom is rewriting Africa's industrial map.",
  keywords: [
    "Morocco automotive industry", "Renault Tangier", "Stellantis Kenitra",
    "SOMACA Casablanca", "Morocco car production", "Dacia Sandero Morocco",
    "Morocco auto exports", "Tanger Med vehicles", "Morocco EV production",
    "Africa car manufacturer", "Morocco free zones", "Morocco industrial policy",
    "Gotion High-Tech Morocco", "Morocco battery factory", "Kenitra auto plant",
    "Morocco automotive suppliers",
  ],
  authors: [{ name: "J. Ng", url: `${BASE_URL}/about` }],
  alternates: { canonical: CANONICAL },
  openGraph: {
    title: "Morocco's Automotive Revolution — Africa's #1 Car Producer",
    description: "Three plants, 270+ suppliers, $17B in exports. How Morocco became the EU's largest automotive exporter by value — 14 km from Spain.",
    url: CANONICAL,
    siteName: "Slow Morocco",
    locale: "en_GB",
    type: "article",
    authors: ["J. Ng"],
    tags: ["automotive", "Morocco", "industry", "Renault", "Stellantis", "EV", "manufacturing"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Morocco's Automotive Revolution — Africa's #1 Car Producer",
    description: "Three plants, $17B exports, 270+ suppliers. Morocco's auto industry mapped.",
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
      "headline": "Morocco's Automotive Revolution — From SOMACA to Africa's #1 Car Producer",
      "description": "Morocco produces over 700,000 vehicles a year across three assembly plants. With $17B in exports, 270+ suppliers, and first-place ranking as the EU's top auto exporter by value, the kingdom is rewriting Africa's industrial map.",
      "datePublished": "2025-01-01",
      "dateModified": new Date().toISOString().split("T")[0],
      "author": { "@type": "Person", "name": "J. Ng", "url": `${BASE_URL}/about` },
      "publisher": { "@type": "Organization", "name": "Slow Morocco", "url": BASE_URL },
      "mainEntityOfPage": CANONICAL,
      "keywords": "Morocco automotive, Renault Tangier, Stellantis Kenitra, SOMACA, Dacia Sandero, Morocco car exports, Tanger Med, EV production Africa",
      "articleSection": "Industry & Economy",
      "spatialCoverage": { "@type": "Place", "name": "Morocco", "geo": { "@type": "GeoShape", "box": "27.6 -13.2 35.9 -1.0" } },
    },
    {
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Slow Morocco", "item": BASE_URL },
        { "@type": "ListItem", "position": 2, "name": "Stories", "item": `${BASE_URL}/stories` },
        { "@type": "ListItem", "position": 3, "name": "Morocco's Automotive Revolution", "item": CANONICAL },
      ],
    },
  ],
};

// ─────────────────────────────────────────────────────────────────────────────
// PAGE
// ─────────────────────────────────────────────────────────────────────────────

export default function AutomotiveIndustryPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <AutomotiveIndustryContent />
    </>
  );
}
