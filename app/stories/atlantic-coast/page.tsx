import { Metadata } from "next";
import AtlanticCoastContent from "./AtlanticCoastContent";

export const revalidate = 3600;

const BASE_URL = "https://www.slowmorocco.com";
const SLUG = "atlantic-coast";
const CANONICAL = `${BASE_URL}/stories/${SLUG}`;

// ─────────────────────────────────────────────────────────────────────────────
// METADATA
// ─────────────────────────────────────────────────────────────────────────────

export const metadata: Metadata = {
  title: "The Atlantic Coast — Tangier to Dakhla, 3,500 km of Wind, Fish & Megaports | Slow Morocco",
  description:
    "Morocco's Atlantic coast stretches 3,500 km from Tangier to Dakhla. Africa's largest fishing industry, 25 GW of wind potential, a $1.6B deepwater port under construction, and 12 cities mapped from the Strait of Gibraltar to the Saharan frontier.",
  keywords: [
    "Morocco Atlantic coast", "Tangier to Dakhla", "Morocco coastline",
    "Dakhla Atlantic Port", "Tanger Med port", "Morocco wind energy",
    "Morocco fishing industry", "Essaouira wind", "Agadir fishing port",
    "Morocco surf coast", "Casablanca port", "Safi sardines",
    "Morocco renewable energy", "Tarfaya wind farm", "Morocco coastal cities",
    "Western Sahara coast",
  ],
  authors: [{ name: "J. Ng", url: `${BASE_URL}/about` }],
  alternates: { canonical: CANONICAL },
  openGraph: {
    title: "The Atlantic Coast — 3,500 km of Wind, Fish & Megaports",
    description: "Tangier to Dakhla. 12 coastal cities mapped. Africa's largest fishing industry, a 25 GW wind corridor, and a $1.6B port at the edge of the Sahara.",
    url: CANONICAL,
    siteName: "Slow Morocco",
    locale: "en_GB",
    type: "article",
    authors: ["J. Ng"],
    tags: ["Atlantic coast", "Morocco", "fishing", "wind energy", "ports", "Dakhla", "Tangier"],
  },
  twitter: {
    card: "summary_large_image",
    title: "The Atlantic Coast — Tangier to Dakhla",
    description: "3,500 km of coastline. 12 cities. Africa's largest fishing industry and a $1.6B megaport under construction.",
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
      "headline": "The Atlantic Coast — Tangier to Dakhla, 3,500 km of Wind, Fish & Megaports",
      "description": "Morocco's Atlantic coast stretches 3,500 km from Tangier to Dakhla. Africa's largest fishing industry, 25 GW of wind potential, a $1.6B deepwater port under construction, and 12 cities mapped from the Strait of Gibraltar to the Saharan frontier.",
      "datePublished": "2025-01-01",
      "dateModified": new Date().toISOString().split("T")[0],
      "author": { "@type": "Person", "name": "J. Ng", "url": `${BASE_URL}/about` },
      "publisher": { "@type": "Organization", "name": "Slow Morocco", "url": BASE_URL },
      "mainEntityOfPage": CANONICAL,
      "keywords": "Morocco Atlantic coast, Tangier, Dakhla, Tanger Med, wind energy, fishing, sardines, Essaouira, Agadir, Casablanca, surf, megaports",
      "articleSection": "Coastal Intelligence",
      "spatialCoverage": { "@type": "Place", "name": "Morocco Atlantic Coast — Tangier to Dakhla", "geo": { "@type": "GeoShape", "box": "23.6 -16.0 35.8 -5.8" } },
    },
    {
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Slow Morocco", "item": BASE_URL },
        { "@type": "ListItem", "position": 2, "name": "Stories", "item": `${BASE_URL}/stories` },
        { "@type": "ListItem", "position": 3, "name": "The Atlantic Coast", "item": CANONICAL },
      ],
    },
  ],
};

// ─────────────────────────────────────────────────────────────────────────────
// PAGE
// ─────────────────────────────────────────────────────────────────────────────

export default function AtlanticCoastPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <AtlanticCoastContent />
    </>
  );
}
