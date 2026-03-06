import { Metadata } from "next";
import BeforeTheCrescentContent from "./BeforeTheCrescentContent";

export const revalidate = 3600;

const BASE_URL = "https://www.slowmorocco.com";
const SLUG = "before-the-crescent";
const CANONICAL = `${BASE_URL}/stories/${SLUG}`;

// ─────────────────────────────────────────────────────────────────────────────
// METADATA
// ─────────────────────────────────────────────────────────────────────────────

export const metadata: Metadata = {
  title: "Before the Crescent — 315,000 Years of Pre-Islamic Morocco | Slow Morocco",
  description:
    "Morocco before Islam: 315,000 years of human habitation, six civilizations, and the Amazigh who outlasted them all. From the oldest Homo sapiens at Jebel Irhoud to Phoenician trading posts, Roman Volubilis, and Byzantine Ceuta — the layers beneath the crescent.",
  keywords: [
    "pre-Islamic Morocco", "Morocco before Islam", "Jebel Irhoud", "oldest Homo sapiens",
    "Amazigh history", "Berber history", "Phoenician Morocco", "Roman Morocco",
    "Volubilis", "Mauretania Tingitana", "Carthage North Africa", "Byzantine Morocco",
    "Lixus garum", "Juba II", "Morocco archaeology", "North Africa ancient history",
    "Tifinagh script", "Morocco prehistory", "Vandals North Africa", "Kahina warrior queen",
  ],
  authors: [{ name: "J. Ng", url: `${BASE_URL}/about` }],
  alternates: { canonical: CANONICAL },
  openGraph: {
    title: "Before the Crescent — 315,000 Years of Pre-Islamic Morocco",
    description: "Six civilizations layered on one land before Islam arrived. The Amazigh outlasted them all.",
    url: CANONICAL,
    siteName: "Slow Morocco",
    locale: "en_GB",
    type: "article",
    authors: ["J. Ng"],
    tags: ["Morocco", "history", "pre-Islamic", "Amazigh", "archaeology", "Volubilis", "Jebel Irhoud"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Before the Crescent — 315,000 Years of Pre-Islamic Morocco",
    description: "Six civilizations. 315,000 years. The Amazigh outlasted them all.",
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
      "headline": "Before the Crescent — 315,000 Years of Pre-Islamic Morocco",
      "description": "Morocco before Islam: from the oldest known Homo sapiens at Jebel Irhoud through Phoenician, Carthaginian, Roman, Vandal, and Byzantine layers — six civilizations on one land. The Amazigh outlasted them all.",
      "datePublished": "2025-01-01",
      "dateModified": new Date().toISOString().split("T")[0],
      "author": { "@type": "Person", "name": "J. Ng", "url": `${BASE_URL}/about` },
      "publisher": { "@type": "Organization", "name": "Slow Morocco", "url": BASE_URL },
      "mainEntityOfPage": CANONICAL,
      "keywords": "pre-Islamic Morocco, Jebel Irhoud, Amazigh, Berber, Phoenician, Roman Morocco, Volubilis, Mauretania, Carthage, Byzantine, North Africa ancient history",
      "articleSection": "History & Archaeology",
      "spatialCoverage": { "@type": "Place", "name": "Morocco", "geo": { "@type": "GeoShape", "box": "27.6 -13.2 35.9 -1.0" } },
    },
    {
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Slow Morocco", "item": BASE_URL },
        { "@type": "ListItem", "position": 2, "name": "Stories", "item": `${BASE_URL}/stories` },
        { "@type": "ListItem", "position": 3, "name": "Before the Crescent", "item": CANONICAL },
      ],
    },
  ],
};

// ─────────────────────────────────────────────────────────────────────────────
// PAGE
// ─────────────────────────────────────────────────────────────────────────────

export default function BeforeTheCrescentPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <BeforeTheCrescentContent />
    </>
  );
}
