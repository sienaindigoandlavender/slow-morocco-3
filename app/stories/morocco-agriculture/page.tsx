import { Metadata } from "next";
import { MoroccoAgricultureContent } from "./MoroccoAgricultureContent";

export const revalidate = 3600;

const BASE_URL = "https://www.slowmorocco.com";
const SLUG = "morocco-agriculture";
const CANONICAL = `${BASE_URL}/stories/${SLUG}`;

// ─────────────────────────────────────────────────────────────────────────────
// METADATA
// ─────────────────────────────────────────────────────────────────────────────

export const metadata: Metadata = {
  title: "What Morocco Grows & Sends to the World — ~$6.5B in Agri-Food Exports | Slow Morocco",
  description:
    "Morocco exports ~$6.5 billion in agricultural and seafood products — from sardines and tomatoes to argan oil and avocados. An interactive radial chart mapping eight top export crops by value, region, and global ranking.",
  keywords: [
    "Morocco agriculture", "Morocco exports", "Morocco farming", "Morocco seafood",
    "Morocco tomatoes", "Morocco citrus", "Morocco olives", "Morocco argan oil",
    "Morocco berries", "Morocco avocados", "Morocco green beans",
    "Souss-Massa agriculture", "Morocco agri-food", "Morocco trade",
  ],
  authors: [{ name: "J. Ng", url: `${BASE_URL}/about` }],
  alternates: { canonical: CANONICAL },
  openGraph: {
    title: "What Morocco Grows & Sends to the World — ~$6.5B in Exports",
    description: "Sardines, tomatoes, berries, citrus, olives, argan oil — Morocco's eight largest agri-food exports mapped in a radial chart.",
    url: CANONICAL,
    siteName: "Slow Morocco",
    locale: "en_GB",
    type: "article",
    authors: ["J. Ng"],
    tags: ["agriculture", "Morocco", "exports", "seafood", "farming", "trade"],
  },
  twitter: {
    card: "summary_large_image",
    title: "What Morocco Grows & Sends to the World",
    description: "~$6.5B in agri-food exports. Eight crops mapped by value.",
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
      "headline": "What Morocco Grows & Sends to the World — ~$6.5 Billion in Agri-Food Exports",
      "description": "Morocco exports ~$6.5 billion in agricultural and seafood products annually. This interactive radial chart maps the eight largest export categories — from sardines ($3B) and tomatoes ($1.05B) to argan oil ($120M) and avocados ($95M).",
      "datePublished": "2025-01-01",
      "dateModified": new Date().toISOString().split("T")[0],
      "author": { "@type": "Person", "name": "J. Ng", "url": `${BASE_URL}/about` },
      "publisher": { "@type": "Organization", "name": "Slow Morocco", "url": BASE_URL },
      "mainEntityOfPage": CANONICAL,
      "keywords": "Morocco agriculture, Morocco exports, sardines, tomatoes, citrus, olives, argan oil, berries, avocados, green beans, Souss-Massa",
      "articleSection": "Agriculture & Trade",
      "spatialCoverage": { "@type": "Place", "name": "Morocco", "geo": { "@type": "GeoShape", "box": "27.6 -13.2 35.9 -1.0" } },
    },
    {
      "@type": "Dataset",
      "@id": `${CANONICAL}#dataset`,
      "name": "Morocco Agricultural & Seafood Exports by Crop",
      "description": "Export values for Morocco's eight largest agri-food categories: seafood ($3B), tomatoes ($1.05B), berries ($750M), citrus ($451M), olives ($380M), green beans ($220M), argan oil ($120M), and avocados ($95M). Data: 2022–2024.",
      "url": CANONICAL,
      "creator": { "@type": "Organization", "name": "FAO / EastFruit / Morocco Ministry of Agriculture" },
      "spatialCoverage": "Morocco",
      "temporalCoverage": "2022/2024",
    },
    {
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Slow Morocco", "item": BASE_URL },
        { "@type": "ListItem", "position": 2, "name": "Stories", "item": `${BASE_URL}/stories` },
        { "@type": "ListItem", "position": 3, "name": "Morocco Agriculture", "item": CANONICAL },
      ],
    },
  ],
};

// ─────────────────────────────────────────────────────────────────────────────
// PAGE
// ─────────────────────────────────────────────────────────────────────────────

export default function MoroccoAgriculturePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <MoroccoAgricultureContent />
    </>
  );
}
