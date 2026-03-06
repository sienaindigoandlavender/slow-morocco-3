import { Metadata } from "next";
import BreadOfMoroccoContent from "./BreadOfMoroccoContent";

export const revalidate = 3600;

const BASE_URL = "https://www.slowmorocco.com";
const SLUG = "bread-of-morocco";
const CANONICAL = `${BASE_URL}/stories/${SLUG}`;

// ─────────────────────────────────────────────────────────────────────────────
// METADATA
// ─────────────────────────────────────────────────────────────────────────────

export const metadata: Metadata = {
  title: "The Bread of Morocco — Eight Breads, One Communal Oven, a Nation's Grain Dependency | Slow Morocco",
  description:
    "From khobz to tafarnout, eight breads define Moroccan daily life. The communal ferran shaped medina society for centuries. Morocco imports 60%+ of its wheat — $1.78 billion in 2024. Bread is torn, never cut, kissed if dropped, and served at every meal.",
  keywords: [
    "Moroccan bread", "khobz Morocco", "msemen", "baghrir", "harcha",
    "rghaif", "batbout", "tafarnout", "krachel", "ferran communal oven",
    "Morocco wheat imports", "Morocco bread culture", "Moroccan food",
    "bread etiquette Morocco", "Morocco grain dependency", "Amazigh bread",
    "Morocco bakery", "Moroccan flatbread", "bread riots Morocco",
  ],
  authors: [{ name: "J. Ng", url: `${BASE_URL}/about` }],
  alternates: { canonical: CANONICAL },
  openGraph: {
    title: "The Bread of Morocco — Eight Breads That Define a Nation",
    description: "Khobz means bread and livelihood. 60%+ of wheat is imported. The ferran shaped medina life. Bread is torn, kissed if dropped, served at every meal.",
    url: CANONICAL,
    siteName: "Slow Morocco",
    locale: "en_GB",
    type: "article",
    authors: ["J. Ng"],
    tags: ["bread", "Morocco", "food", "wheat", "ferran", "khobz", "Amazigh"],
  },
  twitter: {
    card: "summary_large_image",
    title: "The Bread of Morocco — Eight Breads That Define a Nation",
    description: "Eight breads. One communal oven. A $1.78B wheat import dependency. Morocco's bread culture mapped.",
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
      "headline": "The Bread of Morocco — Eight Breads, One Communal Oven, a Nation's Grain Dependency",
      "description": "From khobz to tafarnout, eight breads define Moroccan daily life. The communal ferran shaped medina society for centuries. Morocco imports 60%+ of its wheat — $1.78 billion in 2024. Bread is torn, never cut, kissed if dropped, and served at every meal.",
      "datePublished": "2025-01-01",
      "dateModified": new Date().toISOString().split("T")[0],
      "author": { "@type": "Person", "name": "J. Ng", "url": `${BASE_URL}/about` },
      "publisher": { "@type": "Organization", "name": "Slow Morocco", "url": BASE_URL },
      "mainEntityOfPage": CANONICAL,
      "keywords": "Moroccan bread, khobz, msemen, baghrir, harcha, ferran, wheat imports Morocco, bread culture, Amazigh bread, tafarnout",
      "articleSection": "Food & Culture",
      "spatialCoverage": { "@type": "Place", "name": "Morocco", "geo": { "@type": "GeoShape", "box": "27.6 -13.2 35.9 -1.0" } },
    },
    {
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Slow Morocco", "item": BASE_URL },
        { "@type": "ListItem", "position": 2, "name": "Stories", "item": `${BASE_URL}/stories` },
        { "@type": "ListItem", "position": 3, "name": "The Bread of Morocco", "item": CANONICAL },
      ],
    },
  ],
};

// ─────────────────────────────────────────────────────────────────────────────
// PAGE
// ─────────────────────────────────────────────────────────────────────────────

export default function BreadOfMoroccoPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <BreadOfMoroccoContent />
    </>
  );
}
