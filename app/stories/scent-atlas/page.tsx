import { Metadata } from "next";
import { ScentAtlasContent } from "./ScentAtlasContent";

export const revalidate = 3600;

const BASE_URL = "https://www.slowmorocco.com";
const SLUG = "scent-atlas";
const CANONICAL = `${BASE_URL}/stories/${SLUG}`;

// ─────────────────────────────────────────────────────────────────────────────
// METADATA
// ─────────────────────────────────────────────────────────────────────────────

export const metadata: Metadata = {
  title: "The Scent Atlas — Morocco's Olfactory Geography | Slow Morocco",
  description:
    "16 scents mapped across Morocco — from Damask rose in the Dades Valley to leather tanneries in Fes. Each scent charted by source, chemistry, season, and place. The invisible country, rendered visible.",
  keywords: [
    "Morocco scents", "scent atlas Morocco", "Moroccan olfactory geography",
    "Damask rose Morocco", "orange blossom Morocco", "Atlas cedar",
    "Fes tannery", "argan oil scent", "Moroccan mint tea",
    "saffron Taliouine", "thuya wood Essaouira", "frankincense Morocco",
    "oud Morocco", "Moroccan perfume", "hammam scent", "jasmine Marrakech",
  ],
  authors: [{ name: "J. Ng", url: `${BASE_URL}/about` }],
  alternates: { canonical: CANONICAL },
  openGraph: {
    title: "The Scent Atlas — Morocco's Olfactory Geography",
    description: "16 scents mapped across Morocco. Rose, cedar, leather, saffron, mint, oud — charted by source, chemistry, and season.",
    url: CANONICAL,
    siteName: "Slow Morocco",
    locale: "en_GB",
    type: "article",
    authors: ["J. Ng"],
    tags: ["scent", "Morocco", "olfactory", "rose", "cedar", "saffron", "mint", "tannery"],
  },
  twitter: {
    card: "summary_large_image",
    title: "The Scent Atlas — Morocco's Olfactory Geography",
    description: "16 scents mapped across Morocco. The invisible country, rendered visible.",
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
      "headline": "The Scent Atlas — Morocco's Olfactory Geography",
      "description": "16 scents mapped across Morocco — from Damask rose in the Dades Valley to leather tanneries in Fes. Each scent charted by source, chemistry, season, and place. The invisible country, rendered visible.",
      "datePublished": "2025-01-01",
      "dateModified": new Date().toISOString().split("T")[0],
      "author": { "@type": "Person", "name": "J. Ng", "url": `${BASE_URL}/about` },
      "publisher": { "@type": "Organization", "name": "Slow Morocco", "url": BASE_URL },
      "mainEntityOfPage": CANONICAL,
      "keywords": "Morocco scents, scent atlas, olfactory geography, Damask rose, orange blossom, Atlas cedar, Fes tannery, saffron, mint, oud, frankincense, hammam",
      "articleSection": "Sensory Intelligence",
      "spatialCoverage": { "@type": "Place", "name": "Morocco", "geo": { "@type": "GeoShape", "box": "27.6 -13.2 35.9 -1.0" } },
    },
    {
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Slow Morocco", "item": BASE_URL },
        { "@type": "ListItem", "position": 2, "name": "Stories", "item": `${BASE_URL}/stories` },
        { "@type": "ListItem", "position": 3, "name": "The Scent Atlas", "item": CANONICAL },
      ],
    },
  ],
};

// ─────────────────────────────────────────────────────────────────────────────
// PAGE
// ─────────────────────────────────────────────────────────────────────────────

export default function ScentAtlasPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ScentAtlasContent />
    </>
  );
}
