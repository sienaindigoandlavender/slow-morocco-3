import { Metadata } from "next";
import { MigrationRoutesContent } from "./MigrationRoutesContent";

export const revalidate = 3600;

const BASE_URL = "https://www.slowmorocco.com";
const SLUG = "migration-routes";
const CANONICAL = `${BASE_URL}/stories/${SLUG}`;

// ─────────────────────────────────────────────────────────────────────────────
// METADATA
// ─────────────────────────────────────────────────────────────────────────────

export const metadata: Metadata = {
  title: "Migration Routes Through Morocco — Human Mobility Intelligence | Slow Morocco",
  description:
    "13 kilometres separate Morocco from Spain at the Strait's narrowest point. Four routes, six transit cities, 142,152 foreign nationals, 10,457 dead or missing on the Atlantic route in 2024. The border politics of three continents — mapped, measured, and explained.",
  keywords: [
    "Morocco migration routes", "Western Mediterranean route", "Atlantic route Canary Islands",
    "Strait of Gibraltar migration", "sub-Saharan migration Morocco", "Ceuta Melilla",
    "harraga", "EU border externalisation", "SNIA Morocco", "transit migration Morocco",
    "Oujda migration", "Nador Melilla", "Tangier migration", "Morocco refugee",
    "Africa to Europe migration", "migration policy Morocco",
  ],
  authors: [{ name: "J. Ng", url: `${BASE_URL}/about` }],
  alternates: { canonical: CANONICAL },
  openGraph: {
    title: "Migration Routes Through Morocco — Human Mobility Intelligence",
    description: "13 km at the Strait's narrowest. Four routes. Six transit cities. 142,152 foreign nationals. The border politics of three continents.",
    url: CANONICAL,
    siteName: "Slow Morocco",
    locale: "en_GB",
    type: "article",
    authors: ["J. Ng"],
    tags: ["migration", "Morocco", "Mediterranean", "Africa", "borders", "human rights"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Migration Routes Through Morocco — Human Mobility Intelligence",
    description: "13 km at the Strait. Four routes. Six transit cities. 10,457 dead on the Atlantic route in 2024.",
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
      "headline": "Migration Routes Through Morocco — Human Mobility Intelligence",
      "description": "13 kilometres separate Morocco from Spain at the Strait's narrowest point. Four routes, six transit cities, and the border politics of three continents — mapped, measured, and explained.",
      "datePublished": "2025-01-01",
      "dateModified": new Date().toISOString().split("T")[0],
      "author": { "@type": "Person", "name": "J. Ng", "url": `${BASE_URL}/about` },
      "publisher": { "@type": "Organization", "name": "Slow Morocco", "url": BASE_URL },
      "mainEntityOfPage": CANONICAL,
      "keywords": "Morocco migration routes, Western Mediterranean route, Atlantic route, Strait of Gibraltar, sub-Saharan migration, Ceuta, Melilla, harraga, EU border externalisation, SNIA",
      "articleSection": "Human Mobility",
      "spatialCoverage": { "@type": "Place", "name": "Morocco — migration corridors from sub-Saharan Africa to Europe", "geo": { "@type": "GeoShape", "box": "23.0 -16.0 36.0 -1.0" } },
    },
    {
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Slow Morocco", "item": BASE_URL },
        { "@type": "ListItem", "position": 2, "name": "Stories", "item": `${BASE_URL}/stories` },
        { "@type": "ListItem", "position": 3, "name": "Migration Routes", "item": CANONICAL },
      ],
    },
  ],
};

// ─────────────────────────────────────────────────────────────────────────────
// PAGE
// ─────────────────────────────────────────────────────────────────────────────

export default function MigrationRoutesPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <MigrationRoutesContent />
    </>
  );
}
