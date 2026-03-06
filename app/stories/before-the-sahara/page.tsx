import { Metadata } from "next";
import BeforeTheSaharaContent from "./BeforeTheSaharaContent";

export const revalidate = 3600;

const BASE_URL = "https://www.slowmorocco.com";
const SLUG = "before-the-sahara";
const CANONICAL = `${BASE_URL}/stories/${SLUG}`;

// ─────────────────────────────────────────────────────────────────────────────
// METADATA
// ─────────────────────────────────────────────────────────────────────────────

export const metadata: Metadata = {
  title: "Before the Sahara — Desertification, Oasis Collapse & Morocco's Green Frontier | Slow Morocco",
  description:
    "93% of Morocco's territory is affected by desertification. Two-thirds of its oases have vanished. Date palms fell from 15 million to 6 million. NDVI vegetation data, climate zones, six threatened oases, and the green projects holding the line against the Sahara.",
  keywords: [
    "Morocco desertification", "Sahara expansion", "Morocco oasis collapse",
    "pre-Saharan landscape", "NDVI Morocco", "Draa Valley oasis",
    "Morocco climate zones", "Great Green Wall", "Morocco drought",
    "date palm Morocco", "Tafilalet oasis", "Skoura desertification",
    "Morocco land degradation", "UNCCD Morocco", "Morocco reforestation",
    "sand encroachment Morocco",
  ],
  authors: [{ name: "J. Ng", url: `${BASE_URL}/about` }],
  alternates: { canonical: CANONICAL },
  openGraph: {
    title: "Before the Sahara — Desertification & Morocco's Green Frontier",
    description: "93% of territory affected. Two-thirds of oases lost. 15 million date palms reduced to 6 million. The land between Atlas and sand, mapped.",
    url: CANONICAL,
    siteName: "Slow Morocco",
    locale: "en_GB",
    type: "article",
    authors: ["J. Ng"],
    tags: ["desertification", "Morocco", "Sahara", "oases", "environment", "NDVI"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Before the Sahara — Desertification & Morocco's Green Frontier",
    description: "93% of Morocco affected by desertification. Oasis collapse, NDVI data, and six green projects mapped.",
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
      "headline": "Before the Sahara — Desertification, Oasis Collapse & Morocco's Green Frontier",
      "description": "93% of Morocco's territory is affected by desertification. Two-thirds of its oases have vanished in a century. Date palms fell from 15 million to 6 million. NDVI vegetation data, climate zones, six threatened oases, and the green projects holding the line.",
      "datePublished": "2025-01-01",
      "dateModified": new Date().toISOString().split("T")[0],
      "author": { "@type": "Person", "name": "J. Ng", "url": `${BASE_URL}/about` },
      "publisher": { "@type": "Organization", "name": "Slow Morocco", "url": BASE_URL },
      "mainEntityOfPage": CANONICAL,
      "keywords": "Morocco desertification, Sahara expansion, oasis collapse, NDVI, Draa Valley, Tafilalet, Great Green Wall, pre-Saharan landscape, Morocco drought, date palms",
      "articleSection": "Environment & Land",
      "spatialCoverage": { "@type": "Place", "name": "Morocco — Pre-Saharan Belt", "geo": { "@type": "GeoShape", "box": "28.0 -13.0 36.0 -1.0" } },
    },
    {
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Slow Morocco", "item": BASE_URL },
        { "@type": "ListItem", "position": 2, "name": "Stories", "item": `${BASE_URL}/stories` },
        { "@type": "ListItem", "position": 3, "name": "Before the Sahara", "item": CANONICAL },
      ],
    },
  ],
};

// ─────────────────────────────────────────────────────────────────────────────
// PAGE
// ─────────────────────────────────────────────────────────────────────────────

export default function BeforeTheSaharaPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <BeforeTheSaharaContent />
    </>
  );
}
