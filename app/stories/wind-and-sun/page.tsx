import { Metadata } from "next";
import { WindAndSunContent } from "./WindAndSunContent";

export const revalidate = 3600;

const BASE_URL = "https://www.slowmorocco.com";
const SLUG = "wind-and-sun";
const CANONICAL = `${BASE_URL}/stories/${SLUG}`;

// ─────────────────────────────────────────────────────────────────────────────
// METADATA
// ─────────────────────────────────────────────────────────────────────────────

export const metadata: Metadata = {
  title: "Wind & Sun — Morocco's Renewable Energy Mapped as Radial Blooms | Slow Morocco",
  description:
    "Morocco's renewable energy installations mapped as radial blooms — solar, wind, and hydro. 3,000 hours of sunshine, 60% wind capacity factor, 44% renewable share. Noor Ouarzazate, Tarfaya, and 13 major installations visualised by monthly output.",
  keywords: [
    "Morocco renewable energy", "Noor Ouarzazate solar", "Tarfaya wind farm",
    "Morocco solar energy", "Morocco wind energy", "MASEN", "Morocco hydro power",
    "renewable energy Africa", "Morocco energy transition", "Noor Midelt",
    "Morocco 52% renewable target", "radial bloom chart", "energy data visualisation",
    "Morocco clean energy", "concentrated solar power Morocco",
  ],
  authors: [{ name: "J. Ng", url: `${BASE_URL}/about` }],
  alternates: { canonical: CANONICAL },
  openGraph: {
    title: "Wind & Sun — Morocco's Renewable Energy Mapped as Radial Blooms",
    description: "3,000 hours of sun. 60% wind capacity factor. 44% renewable share. 13 installations mapped as radial blooms by monthly output.",
    url: CANONICAL,
    siteName: "Slow Morocco",
    locale: "en_GB",
    type: "article",
    authors: ["J. Ng"],
    tags: ["renewable energy", "solar", "wind", "hydro", "Morocco", "data visualisation"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Wind & Sun — Morocco's Renewable Energy Mapped as Radial Blooms",
    description: "3,000 hours of sun. 60% wind capacity factor. 44% renewable share. 13 installations mapped.",
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
      "headline": "Wind & Sun — Morocco's Renewable Energy Mapped as Radial Blooms",
      "description": "Morocco's renewable energy installations mapped as radial blooms — solar, wind, and hydro. 3,000 hours of sunshine, 60% wind capacity factor, 44% renewable share.",
      "datePublished": "2025-01-01",
      "dateModified": new Date().toISOString().split("T")[0],
      "author": { "@type": "Person", "name": "J. Ng", "url": `${BASE_URL}/about` },
      "publisher": { "@type": "Organization", "name": "Slow Morocco", "url": BASE_URL },
      "mainEntityOfPage": CANONICAL,
      "keywords": "renewable energy, Morocco, solar, wind, hydro, Noor Ouarzazate, Tarfaya, MASEN, radial bloom",
      "articleSection": "Energy",
      "spatialCoverage": { "@type": "Place", "name": "Morocco", "geo": { "@type": "GeoShape", "box": "26.13 -14.50 35.65 -4.73" } },
    },
    {
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Slow Morocco", "item": BASE_URL },
        { "@type": "ListItem", "position": 2, "name": "Stories", "item": `${BASE_URL}/stories` },
        { "@type": "ListItem", "position": 3, "name": "Wind & Sun", "item": CANONICAL },
      ],
    },
  ],
};

// ─────────────────────────────────────────────────────────────────────────────
// PAGE
// ─────────────────────────────────────────────────────────────────────────────

export default function WindAndSunPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <WindAndSunContent />
    </>
  );
}
