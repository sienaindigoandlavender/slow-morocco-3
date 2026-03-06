import { Metadata } from "next";
import AlAndalusContent from "./AlAndalusContent";

export const revalidate = 3600;

const BASE_URL = "https://www.slowmorocco.com";
const SLUG = "al-andalus-corridor";
const CANONICAL = `${BASE_URL}/stories/${SLUG}`;

// ─────────────────────────────────────────────────────────────────────────────
// METADATA
// ─────────────────────────────────────────────────────────────────────────────

export const metadata: Metadata = {
  title: "The Al-Andalus Corridor — Eight Centuries of Shared Civilization from Seville to Fes | Slow Morocco",
  description:
    "One continuous cultural bridge from Seville to Fes. Architecture, music, food, language — four layers of shared DNA mapped across 28 cultural points spanning Spain, Portugal, and Morocco. The arch in Seville and the arch in Fes are the same arch.",
  keywords: [
    "Al-Andalus", "Moorish architecture", "Andalusi music", "Morocco Spain connection",
    "Alhambra", "Koutoubia", "Giralda", "Hassan Tower", "zellige", "muqarnas",
    "flamenco Arabic origins", "Andalusi nuba", "Fes medina", "Córdoba mosque",
    "Mudéjar", "Arabic words in Spanish", "Strait of Gibraltar", "cultural corridor",
    "Morocco heritage", "Seville Morocco", "Islamic art Spain",
  ],
  authors: [{ name: "J. Ng", url: `${BASE_URL}/about` }],
  alternates: { canonical: CANONICAL },
  openGraph: {
    title: "The Al-Andalus Corridor — Seville to Fes, One Shared Civilization",
    description: "Architecture, music, food, language — four layers of shared DNA mapped across 28 cultural points spanning Spain, Portugal, and Morocco.",
    url: CANONICAL,
    siteName: "Slow Morocco",
    locale: "en_GB",
    type: "article",
    authors: ["J. Ng"],
    tags: ["Al-Andalus", "Morocco", "Spain", "architecture", "music", "food", "language", "cultural heritage"],
  },
  twitter: {
    card: "summary_large_image",
    title: "The Al-Andalus Corridor — Seville to Fes",
    description: "Eight centuries of shared civilization. 28 cultural points. Four layers of DNA. One corridor.",
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
      "headline": "The Al-Andalus Corridor — Eight Centuries of Shared Civilization from Seville to Fes",
      "description": "One continuous cultural bridge from Seville to Fes. Architecture, music, food, language — four layers of shared DNA mapped across 28 cultural points spanning Spain, Portugal, and Morocco.",
      "datePublished": "2025-01-01",
      "dateModified": new Date().toISOString().split("T")[0],
      "author": { "@type": "Person", "name": "J. Ng", "url": `${BASE_URL}/about` },
      "publisher": { "@type": "Organization", "name": "Slow Morocco", "url": BASE_URL },
      "mainEntityOfPage": CANONICAL,
      "keywords": "Al-Andalus, Moorish architecture, Andalusi music, Morocco Spain, Alhambra, Koutoubia, Giralda, zellige, flamenco, Fes, Córdoba",
      "articleSection": "Culture & Heritage",
      "spatialCoverage": { "@type": "Place", "name": "Al-Andalus Corridor — Seville to Fes", "geo": { "@type": "GeoShape", "box": "31.0 -10.0 41.0 -1.0" } },
    },
    {
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Slow Morocco", "item": BASE_URL },
        { "@type": "ListItem", "position": 2, "name": "Stories", "item": `${BASE_URL}/stories` },
        { "@type": "ListItem", "position": 3, "name": "The Al-Andalus Corridor", "item": CANONICAL },
      ],
    },
  ],
};

// ─────────────────────────────────────────────────────────────────────────────
// PAGE
// ─────────────────────────────────────────────────────────────────────────────

export default function AlAndalusCorridor() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <AlAndalusContent />
    </>
  );
}
