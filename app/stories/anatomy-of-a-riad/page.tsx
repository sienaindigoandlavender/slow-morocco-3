import { Metadata } from "next";
import AnatomyOfARiadContent from "./AnatomyOfARiadContent";

export const revalidate = 3600;

const BASE_URL = "https://www.slowmorocco.com";
const SLUG = "anatomy-of-a-riad";
const CANONICAL = `${BASE_URL}/stories/${SLUG}`;

// ─────────────────────────────────────────────────────────────────────────────
// METADATA
// ─────────────────────────────────────────────────────────────────────────────

export const metadata: Metadata = {
  title: "The Anatomy of a Riad — Architecture, Climate, Craft | Slow Morocco",
  description:
    "12 architectural elements, 6 passive climate systems, 1,000 years of evolution. The Moroccan riad is a machine for privacy, beauty, and climate control — courtyard, fountain, zellige, tadelakt, cedar, moucharabieh. Zero street-facing windows.",
  keywords: [
    "riad architecture", "Moroccan riad", "anatomy of a riad", "riad courtyard",
    "zellige mosaic", "tadelakt plaster", "moucharabieh lattice", "Moroccan architecture",
    "passive cooling Morocco", "riad vs dar", "Islamic architecture", "Marrakech riad",
    "Fes riad", "cedar wood Morocco", "gebs carved stucco", "chahar bagh",
  ],
  authors: [{ name: "J. Ng", url: `${BASE_URL}/about` }],
  alternates: { canonical: CANONICAL },
  openGraph: {
    title: "The Anatomy of a Riad — Architecture, Climate, Craft",
    description: "12 elements, 6 climate systems, 0 street-facing windows. The thousand-year-old Moroccan machine for privacy, beauty, and climate control.",
    url: CANONICAL,
    siteName: "Slow Morocco",
    locale: "en_GB",
    type: "article",
    authors: ["J. Ng"],
    tags: ["riad", "architecture", "Morocco", "zellige", "tadelakt", "climate"],
  },
  twitter: {
    card: "summary_large_image",
    title: "The Anatomy of a Riad — Architecture, Climate, Craft",
    description: "12 elements, 6 climate systems, 0 street-facing windows. A thousand-year-old machine for privacy, beauty, and climate control.",
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
      "headline": "The Anatomy of a Riad — Architecture, Climate, Craft",
      "description": "12 architectural elements, 6 passive climate systems, 1,000 years of evolution. The Moroccan riad is a machine for privacy, beauty, and climate control. Zero street-facing windows.",
      "datePublished": "2025-01-01",
      "dateModified": new Date().toISOString().split("T")[0],
      "author": { "@type": "Person", "name": "J. Ng", "url": `${BASE_URL}/about` },
      "publisher": { "@type": "Organization", "name": "Slow Morocco", "url": BASE_URL },
      "mainEntityOfPage": CANONICAL,
      "keywords": "riad architecture, Moroccan riad, zellige, tadelakt, moucharabieh, passive cooling, courtyard house, Islamic architecture, riad vs dar",
      "articleSection": "Architecture & Design",
      "spatialCoverage": { "@type": "Place", "name": "Morocco", "geo": { "@type": "GeoShape", "box": "27.6 -13.2 35.9 -1.0" } },
    },
    {
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Slow Morocco", "item": BASE_URL },
        { "@type": "ListItem", "position": 2, "name": "Stories", "item": `${BASE_URL}/stories` },
        { "@type": "ListItem", "position": 3, "name": "The Anatomy of a Riad", "item": CANONICAL },
      ],
    },
  ],
};

// ─────────────────────────────────────────────────────────────────────────────
// PAGE
// ─────────────────────────────────────────────────────────────────────────────

export default function AnatomyOfARiadPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <AnatomyOfARiadContent />
    </>
  );
}
