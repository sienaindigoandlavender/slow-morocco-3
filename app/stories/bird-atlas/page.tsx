import { Metadata } from "next";
import { BirdAtlasContent } from "./BirdAtlasContent";

export const revalidate = 3600;

const BASE_URL = "https://www.slowmorocco.com";
const SLUG = "bird-atlas";
const CANONICAL = `${BASE_URL}/stories/${SLUG}`;

// ─────────────────────────────────────────────────────────────────────────────
// METADATA
// ─────────────────────────────────────────────────────────────────────────────

export const metadata: Metadata = {
  title: "The Bird Atlas — North Africa's Migration Superhighways | Slow Morocco",
  description:
    "North Africa sits at the crossroads of three migration superhighways. 450,000 raptors at Gibraltar, 2.3 million waders at Banc d'Arguin, 27 IBA sites across 5 countries mapped with flyways, threatened species, and habitat types.",
  keywords: [
    "bird atlas North Africa", "Morocco bird migration", "Strait of Gibraltar raptors",
    "Northern Bald Ibis Morocco", "Banc d'Arguin waders", "Merja Zerga wetland",
    "Souss-Massa National Park birds", "IBA sites North Africa", "East Atlantic Flyway",
    "Cap Bon raptor migration", "Ichkeul National Park birds", "Morocco birding",
    "North Africa flyways", "Mediterranean bird crossing", "threatened birds Morocco",
  ],
  authors: [{ name: "J. Ng", url: `${BASE_URL}/about` }],
  alternates: { canonical: CANONICAL },
  openGraph: {
    title: "The Bird Atlas — North Africa's Migration Superhighways",
    description: "450,000 raptors at Gibraltar. 2.3M waders at Banc d'Arguin. 27 IBA sites across 5 countries. Three flyways mapped.",
    url: CANONICAL,
    siteName: "Slow Morocco",
    locale: "en_GB",
    type: "article",
    authors: ["J. Ng"],
    tags: ["birds", "migration", "North Africa", "flyways", "IBA sites", "threatened species"],
  },
  twitter: {
    card: "summary_large_image",
    title: "The Bird Atlas — North Africa's Migration Superhighways",
    description: "450,000 raptors at Gibraltar. 2.3M waders at Banc d'Arguin. 27 IBA sites. Three flyways mapped.",
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
      "headline": "The Bird Atlas — North Africa's Migration Superhighways",
      "description": "North Africa sits at the crossroads of three migration superhighways. 450,000 raptors at Gibraltar, 2.3 million waders at Banc d'Arguin, 27 IBA sites across 5 countries mapped with flyways, threatened species, and habitat types.",
      "datePublished": "2025-01-01",
      "dateModified": new Date().toISOString().split("T")[0],
      "author": { "@type": "Person", "name": "J. Ng", "url": `${BASE_URL}/about` },
      "publisher": { "@type": "Organization", "name": "Slow Morocco", "url": BASE_URL },
      "mainEntityOfPage": CANONICAL,
      "keywords": "bird atlas, North Africa, migration flyways, Gibraltar raptors, Banc d'Arguin, IBA sites, Northern Bald Ibis, threatened species",
      "articleSection": "Nature",
      "spatialCoverage": { "@type": "Place", "name": "North Africa — Morocco, Algeria, Tunisia, Libya, Mauritania", "geo": { "@type": "GeoShape", "box": "19.88 -16.25 37.16 23.60" } },
    },
    {
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Slow Morocco", "item": BASE_URL },
        { "@type": "ListItem", "position": 2, "name": "Stories", "item": `${BASE_URL}/stories` },
        { "@type": "ListItem", "position": 3, "name": "The Bird Atlas", "item": CANONICAL },
      ],
    },
  ],
};

// ─────────────────────────────────────────────────────────────────────────────
// PAGE
// ─────────────────────────────────────────────────────────────────────────────

export default function BirdAtlasPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <BirdAtlasContent />
    </>
  );
}
