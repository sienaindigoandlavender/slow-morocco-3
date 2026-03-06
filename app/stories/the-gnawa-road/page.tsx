import { Metadata } from "next";
import { TheGnawaRoadContent } from "./TheGnawaRoadContent";

export const revalidate = 3600;

const BASE_URL = "https://www.slowmorocco.com";
const SLUG = "the-gnawa-road";
const CANONICAL = `${BASE_URL}/stories/${SLUG}`;

// ─────────────────────────────────────────────────────────────────────────────
// METADATA
// ─────────────────────────────────────────────────────────────────────────────

export const metadata: Metadata = {
  title: "The Gnawa Road — From West Africa to Morocco to the World | Slow Morocco",
  description:
    "A spiritual technology carried across the Sahara by enslaved peoples. Seven spirit families, seven colours, three guembri strings, and 500 years of continuous practice. The trans-Saharan slave trade, the lila ceremony, the maalem lineages, and the diaspora parallels — mapped and explained.",
  keywords: [
    "Gnawa music", "Gnawa Morocco", "guembri", "sintir", "lila ceremony",
    "maalem", "Mahmoud Guinia", "Essaouira Gnaoua festival", "UNESCO intangible heritage",
    "trans-Saharan slave trade", "seven colours Gnawa", "mluk spirits",
    "Gnawa trance", "qraqeb", "Moroccan music", "West African diaspora",
  ],
  authors: [{ name: "J. Ng", url: `${BASE_URL}/about` }],
  alternates: { canonical: CANONICAL },
  openGraph: {
    title: "The Gnawa Road — From West Africa to Morocco to the World",
    description: "Seven spirit families. Three guembri strings. 500 years of continuous practice. A spiritual technology carried across the Sahara by enslaved peoples.",
    url: CANONICAL,
    siteName: "Slow Morocco",
    locale: "en_GB",
    type: "article",
    authors: ["J. Ng"],
    tags: ["Morocco", "Gnawa", "music", "spirituality", "trans-Saharan", "UNESCO heritage"],
  },
  twitter: {
    card: "summary_large_image",
    title: "The Gnawa Road — From West Africa to Morocco to the World",
    description: "Seven spirit families. Three guembri strings. 500 years of continuous practice. The Gnawa road mapped.",
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
      "headline": "The Gnawa Road — From West Africa to Morocco to the World",
      "description": "A spiritual technology carried across the Sahara by enslaved peoples. Seven spirit families, seven colours, three guembri strings, and 500 years of continuous practice. The trans-Saharan slave trade, the lila ceremony, the maalem lineages, and the diaspora parallels.",
      "datePublished": "2025-01-01",
      "dateModified": new Date().toISOString().split("T")[0],
      "author": { "@type": "Person", "name": "J. Ng", "url": `${BASE_URL}/about` },
      "publisher": { "@type": "Organization", "name": "Slow Morocco", "url": BASE_URL },
      "mainEntityOfPage": CANONICAL,
      "keywords": "Gnawa music, guembri, sintir, lila ceremony, maalem, Mahmoud Guinia, Essaouira, UNESCO intangible heritage, trans-Saharan slave trade, seven colours, mluk spirits, Moroccan music",
      "articleSection": "Sacred & Spiritual Intelligence",
      "spatialCoverage": { "@type": "Place", "name": "Morocco — Essaouira, Marrakech, Tangier, and trans-Saharan corridors", "geo": { "@type": "GeoShape", "box": "12.0 -16.0 36.0 15.0" } },
    },
    {
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Slow Morocco", "item": BASE_URL },
        { "@type": "ListItem", "position": 2, "name": "Stories", "item": `${BASE_URL}/stories` },
        { "@type": "ListItem", "position": 3, "name": "The Gnawa Road", "item": CANONICAL },
      ],
    },
  ],
};

// ─────────────────────────────────────────────────────────────────────────────
// PAGE
// ─────────────────────────────────────────────────────────────────────────────

export default function TheGnawaRoadPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <TheGnawaRoadContent />
    </>
  );
}
