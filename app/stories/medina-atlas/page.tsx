import { Metadata } from "next";
import { MedinaAtlasContent } from "./MedinaAtlasContent";

export const revalidate = 3600;

const BASE_URL = "https://www.slowmorocco.com";
const SLUG = "medina-atlas";
const CANONICAL = `${BASE_URL}/stories/${SLUG}`;

// ─────────────────────────────────────────────────────────────────────────────
// METADATA
// ─────────────────────────────────────────────────────────────────────────────

export const metadata: Metadata = {
  title: "The Medina Atlas — Gates, Souks, Landmarks of Marrakech | Slow Morocco",
  description:
    "Marrakech medina mapped: 12 gates, 16 quarters, 18 souks, 16 km of ramparts. Every gate, souk, and landmark in the walled city — from Bab Agnaou to Jemaa el-Fna. A spatial cartography of 600 hectares.",
  keywords: [
    "Marrakech medina", "medina atlas", "Marrakech gates", "Marrakech souks",
    "Bab Agnaou", "Jemaa el-Fna", "Bahia Palace", "Ben Youssef Medersa",
    "Marrakech quarters", "Moroccan medina", "UNESCO Marrakech", "souk map",
    "Marrakech landmarks", "Almoravid", "Almohad", "Saadian Tombs",
  ],
  authors: [{ name: "J. Ng", url: `${BASE_URL}/about` }],
  alternates: { canonical: CANONICAL },
  openGraph: {
    title: "The Medina Atlas — Gates, Souks, Landmarks of Marrakech",
    description: "12 gates, 16 quarters, 18 souks, 16 km of ramparts. Every gate, souk, and landmark in the walled city of Marrakech.",
    url: CANONICAL,
    siteName: "Slow Morocco",
    locale: "en_GB",
    type: "article",
    authors: ["J. Ng"],
    tags: ["medina", "Marrakech", "Morocco", "souks", "gates", "architecture"],
  },
  twitter: {
    card: "summary_large_image",
    title: "The Medina Atlas — Gates, Souks, Landmarks of Marrakech",
    description: "12 gates, 16 quarters, 18 souks, 16 km of ramparts. Every gate, souk, and landmark in the walled city of Marrakech.",
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
      "headline": "The Medina Atlas — Gates, Souks, Landmarks of Marrakech",
      "description": "Marrakech medina mapped: 12 gates, 16 quarters, 18 souks, 16 km of ramparts. Every gate, souk, and landmark in the walled city — a spatial cartography of 600 hectares.",
      "datePublished": "2025-01-01",
      "dateModified": new Date().toISOString().split("T")[0],
      "author": { "@type": "Person", "name": "J. Ng", "url": `${BASE_URL}/about` },
      "publisher": { "@type": "Organization", "name": "Slow Morocco", "url": BASE_URL },
      "mainEntityOfPage": CANONICAL,
      "keywords": "Marrakech medina, medina atlas, Marrakech gates, Marrakech souks, Jemaa el-Fna, Bahia Palace, Ben Youssef Medersa, UNESCO Marrakech",
      "articleSection": "Spatial Cartography",
      "spatialCoverage": { "@type": "Place", "name": "Morocco", "geo": { "@type": "GeoShape", "box": "27.6 -13.2 35.9 -1.0" } },
    },
    {
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Slow Morocco", "item": BASE_URL },
        { "@type": "ListItem", "position": 2, "name": "Stories", "item": `${BASE_URL}/stories` },
        { "@type": "ListItem", "position": 3, "name": "The Medina Atlas", "item": CANONICAL },
      ],
    },
  ],
};

// ─────────────────────────────────────────────────────────────────────────────
// PAGE
// ─────────────────────────────────────────────────────────────────────────────

export default function MedinaAtlasPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <MedinaAtlasContent />
    </>
  );
}
