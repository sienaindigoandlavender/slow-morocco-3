import { Metadata } from "next";
import { WildlifeAtlasContent } from "./WildlifeAtlasContent";

export const revalidate = 3600;

const BASE_URL = "https://www.slowmorocco.com";
const SLUG = "wildlife-atlas";
const CANONICAL = `${BASE_URL}/stories/${SLUG}`;

// ─────────────────────────────────────────────────────────────────────────────
// METADATA
// ─────────────────────────────────────────────────────────────────────────────

export const metadata: Metadata = {
  title: "The Wildlife Atlas — Morocco's Endangered Species & National Parks | Slow Morocco",
  description:
    "118 mammal species, 490 bird species, 40 ecosystems — but three apex predators lost from the wild. The Barbary lion, Atlas bear, and leopard mapped alongside Morocco's eight national parks and IUCN conservation status.",
  keywords: [
    "wildlife atlas Morocco", "Barbary lion", "Atlas bear extinct", "Barbary leopard",
    "Northern Bald Ibis Morocco", "Barbary macaque", "Morocco national parks",
    "IUCN Red List Morocco", "endangered species Morocco", "Souss-Massa National Park",
    "Toubkal National Park", "Mediterranean monk seal", "Morocco conservation",
    "Atlas Mountains wildlife", "Morocco biodiversity",
  ],
  authors: [{ name: "J. Ng", url: `${BASE_URL}/about` }],
  alternates: { canonical: CANONICAL },
  openGraph: {
    title: "The Wildlife Atlas — Morocco's Endangered Species & National Parks",
    description: "118 mammal species. 490 bird species. 3 apex predators lost. 8 national parks. Morocco's wildlife mapped by IUCN status.",
    url: CANONICAL,
    siteName: "Slow Morocco",
    locale: "en_GB",
    type: "article",
    authors: ["J. Ng"],
    tags: ["wildlife", "conservation", "Morocco", "endangered species", "national parks", "IUCN"],
  },
  twitter: {
    card: "summary_large_image",
    title: "The Wildlife Atlas — Morocco's Endangered Species & National Parks",
    description: "118 mammal species. 490 bird species. 3 apex predators lost. 8 national parks mapped.",
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
      "headline": "The Wildlife Atlas — Morocco's Endangered Species & National Parks",
      "description": "118 mammal species, 490 bird species, 40 ecosystems — but three apex predators lost from the wild. The Barbary lion, Atlas bear, and leopard mapped alongside Morocco's eight national parks and IUCN conservation status.",
      "datePublished": "2025-01-01",
      "dateModified": new Date().toISOString().split("T")[0],
      "author": { "@type": "Person", "name": "J. Ng", "url": `${BASE_URL}/about` },
      "publisher": { "@type": "Organization", "name": "Slow Morocco", "url": BASE_URL },
      "mainEntityOfPage": CANONICAL,
      "keywords": "wildlife atlas, Morocco, Barbary lion, Atlas bear, endangered species, national parks, IUCN Red List, conservation",
      "articleSection": "Nature",
      "spatialCoverage": { "@type": "Place", "name": "Morocco", "geo": { "@type": "GeoShape", "box": "27.66 -13.17 35.92 -1.01" } },
    },
    {
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Slow Morocco", "item": BASE_URL },
        { "@type": "ListItem", "position": 2, "name": "Stories", "item": `${BASE_URL}/stories` },
        { "@type": "ListItem", "position": 3, "name": "The Wildlife Atlas", "item": CANONICAL },
      ],
    },
  ],
};

// ─────────────────────────────────────────────────────────────────────────────
// PAGE
// ─────────────────────────────────────────────────────────────────────────────

export default function WildlifeAtlasPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <WildlifeAtlasContent />
    </>
  );
}
