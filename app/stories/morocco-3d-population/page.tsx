import { Metadata } from "next";
import { Morocco3dPopulationContent } from "./Morocco3dPopulationContent";

export const revalidate = 3600;

const BASE_URL = "https://www.slowmorocco.com";
const SLUG = "morocco-3d-population";
const CANONICAL = `${BASE_URL}/stories/${SLUG}`;

// ─────────────────────────────────────────────────────────────────────────────
// METADATA
// ─────────────────────────────────────────────────────────────────────────────

export const metadata: Metadata = {
  title: "Morocco 3D Population Density — 37.8 Million People Mapped | Slow Morocco",
  description:
    "Morocco's population density in three dimensions. Each grid cell is extruded by density — from Casablanca's 14,000 people per km² to the empty Sahara. Data from HCP 2024 census, WorldPop estimates, and citypopulation.de.",
  keywords: [
    "Morocco population density", "Morocco 3D population map", "Morocco demographics",
    "Casablanca population", "Morocco census 2024", "HCP Morocco",
    "Morocco urban population", "Rabat population", "Marrakech population",
    "Fes population", "Tangier population", "Morocco Atlantic corridor",
    "Morocco Sahara population", "WorldPop Morocco", "Morocco population visualization",
  ],
  authors: [{ name: "J. Ng", url: `${BASE_URL}/about` }],
  alternates: { canonical: CANONICAL },
  openGraph: {
    title: "Morocco 3D Population Density — 37.8 Million People Mapped",
    description: "Each grid cell extruded by density. Casablanca peaks at 14,000/km². The Sahara holds almost nobody. Data from HCP 2024 census and WorldPop.",
    url: CANONICAL,
    siteName: "Slow Morocco",
    locale: "en_GB",
    type: "article",
    authors: ["J. Ng"],
    tags: ["Morocco", "population density", "demographics", "3D visualization", "census 2024", "Casablanca"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Morocco 3D Population Density — 37.8 Million People",
    description: "Population density in three dimensions. Casablanca peaks at 14,000/km². The Sahara holds almost nobody.",
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
      "headline": "Morocco 3D Population Density — 37.8 Million People Mapped",
      "description": "Morocco's population density in three dimensions. Each grid cell is extruded by density — from Casablanca's 14,000 people per km² to the empty Sahara. Data from HCP 2024 census, WorldPop estimates, and citypopulation.de.",
      "datePublished": "2025-01-01",
      "dateModified": new Date().toISOString().split("T")[0],
      "author": { "@type": "Person", "name": "J. Ng", "url": `${BASE_URL}/about` },
      "publisher": { "@type": "Organization", "name": "Slow Morocco", "url": BASE_URL },
      "mainEntityOfPage": CANONICAL,
      "keywords": "Morocco population density, 3D population map, Casablanca, HCP 2024 census, WorldPop, demographics, Atlantic corridor, Sahara",
      "articleSection": "Demographics",
      "spatialCoverage": { "@type": "Place", "name": "Morocco", "geo": { "@type": "GeoShape", "box": "27.5 -13.5 36.0 -1.0" } },
    },
    {
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Slow Morocco", "item": BASE_URL },
        { "@type": "ListItem", "position": 2, "name": "Stories", "item": `${BASE_URL}/stories` },
        { "@type": "ListItem", "position": 3, "name": "Morocco 3D Population Density", "item": CANONICAL },
      ],
    },
  ],
};

// ─────────────────────────────────────────────────────────────────────────────
// PAGE
// ─────────────────────────────────────────────────────────────────────────────

export default function Morocco3dPopulationPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Morocco3dPopulationContent />
    </>
  );
}
