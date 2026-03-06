import { Metadata } from "next";
import { TheFoodEquationContent } from "./TheFoodEquationContent";

export const revalidate = 3600;

const BASE_URL = "https://www.slowmorocco.com";
const SLUG = "the-food-equation";
const CANONICAL = `${BASE_URL}/stories/${SLUG}`;

// ─────────────────────────────────────────────────────────────────────────────
// METADATA
// ─────────────────────────────────────────────────────────────────────────────

export const metadata: Metadata = {
  title: "The Food Equation — Africa's $65B Import Paradox | Slow Morocco",
  description:
    "Africa owns 60% of the world's uncultivated arable land but spends $65 billion importing food it could grow. Crop yields run at less than 25% of their potential. The continent that should feed the world can barely feed itself — not because of scarcity, but because of underinvestment.",
  keywords: [
    "Africa food imports", "African agriculture", "food security Africa",
    "yield gap Africa", "Plan Maroc Vert", "Africa agribusiness",
    "sub-Saharan Africa food", "African crop yields", "food sovereignty Africa",
    "Africa arable land", "Morocco agriculture", "Africa food equation",
    "food processing Africa", "African farming", "Africa food systems",
  ],
  authors: [{ name: "J. Ng", url: `${BASE_URL}/about` }],
  alternates: { canonical: CANONICAL },
  openGraph: {
    title: "The Food Equation — Africa's $65B Import Paradox",
    description: "60% of the world's uncultivated arable land. $65B food import bill. Yields at 25% of potential. The continent that should feed the world imports its dinner.",
    url: CANONICAL,
    siteName: "Slow Morocco",
    locale: "en_GB",
    type: "article",
    authors: ["J. Ng"],
    tags: ["Africa", "agriculture", "food security", "Morocco", "yield gap", "agribusiness"],
  },
  twitter: {
    card: "summary_large_image",
    title: "The Food Equation — Africa's $65B Import Paradox",
    description: "60% of arable land. $65B imports. 25% yield potential. Africa's food equation explained.",
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
      "headline": "The Food Equation — Africa's $65B Import Paradox",
      "description": "Africa owns 60% of the world's uncultivated arable land but spends $65 billion importing food it could grow. Crop yields run at less than 25% of their potential. The continent that should feed the world can barely feed itself — not because of scarcity, but because of underinvestment.",
      "datePublished": "2025-01-01",
      "dateModified": new Date().toISOString().split("T")[0],
      "author": { "@type": "Person", "name": "J. Ng", "url": `${BASE_URL}/about` },
      "publisher": { "@type": "Organization", "name": "Slow Morocco", "url": BASE_URL },
      "mainEntityOfPage": CANONICAL,
      "keywords": "Africa food imports, African agriculture, food security, yield gap, Plan Maroc Vert, agribusiness, sub-Saharan Africa, food sovereignty",
      "articleSection": "Agriculture & Economy",
      "spatialCoverage": { "@type": "Place", "name": "Sub-Saharan Africa & Morocco", "geo": { "@type": "GeoShape", "box": "-35.0 -18.0 37.0 52.0" } },
    },
    {
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Slow Morocco", "item": BASE_URL },
        { "@type": "ListItem", "position": 2, "name": "Stories", "item": `${BASE_URL}/stories` },
        { "@type": "ListItem", "position": 3, "name": "The Food Equation", "item": CANONICAL },
      ],
    },
  ],
};

// ─────────────────────────────────────────────────────────────────────────────
// PAGE
// ─────────────────────────────────────────────────────────────────────────────

export default function TheFoodEquationPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <TheFoodEquationContent />
    </>
  );
}
