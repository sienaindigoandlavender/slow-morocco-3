import { Metadata } from "next";
import ArganTriangleContent from "./ArganTriangleContent";

export const revalidate = 3600;

const BASE_URL = "https://www.slowmorocco.com";
const SLUG = "argan-triangle";
const CANONICAL = `${BASE_URL}/stories/${SLUG}`;

// ─────────────────────────────────────────────────────────────────────────────
// METADATA
// ─────────────────────────────────────────────────────────────────────────────

export const metadata: Metadata = {
  title: "The Argan Triangle — Morocco's Liquid Gold | Slow Morocco",
  description:
    "Twenty million argan trees across 830,000 hectares of UNESCO-protected biosphere. From Essaouira to Agadir to the Anti-Atlas. 688 women's cooperatives, 3 million people supported, and $370M+ global market. The women-led economy of Morocco's liquid gold.",
  keywords: [
    "argan oil Morocco", "argan triangle", "argan cooperative", "Argania spinosa",
    "UNESCO argan biosphere", "Morocco argan oil", "Essaouira argan",
    "Agadir argan", "Anti-Atlas argan", "women cooperatives Morocco",
    "amlou Morocco", "argan cosmetic oil", "culinary argan oil",
    "Souss Valley argan", "Amazigh women argan", "argan tree Morocco",
  ],
  authors: [{ name: "J. Ng", url: `${BASE_URL}/about` }],
  alternates: { canonical: CANONICAL },
  openGraph: {
    title: "The Argan Triangle — Morocco's Liquid Gold",
    description: "20 million trees. 830,000 hectares. 688 women's cooperatives. The only place on earth argan grows — mapped, measured, and explained.",
    url: CANONICAL,
    siteName: "Slow Morocco",
    locale: "en_GB",
    type: "article",
    authors: ["J. Ng"],
    tags: ["argan", "Morocco", "cooperatives", "UNESCO", "Amazigh", "agriculture"],
  },
  twitter: {
    card: "summary_large_image",
    title: "The Argan Triangle — Morocco's Liquid Gold",
    description: "20 million trees. 688 women's cooperatives. Morocco's liquid gold economy mapped.",
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
      "headline": "The Argan Triangle — Morocco's Liquid Gold",
      "description": "Twenty million argan trees across 830,000 hectares of UNESCO-protected biosphere. 688 women's cooperatives lead the extraction process. From Essaouira to Agadir to the Anti-Atlas — the women-led economy of Morocco's liquid gold.",
      "datePublished": "2025-01-01",
      "dateModified": new Date().toISOString().split("T")[0],
      "author": { "@type": "Person", "name": "J. Ng", "url": `${BASE_URL}/about` },
      "publisher": { "@type": "Organization", "name": "Slow Morocco", "url": BASE_URL },
      "mainEntityOfPage": CANONICAL,
      "keywords": "argan oil Morocco, argan triangle, argan cooperative, Argania spinosa, UNESCO argan biosphere, women cooperatives Morocco, amlou, Souss Valley, Amazigh",
      "articleSection": "Agriculture & Economy",
      "spatialCoverage": { "@type": "Place", "name": "Argan Triangle — Essaouira to Agadir to Anti-Atlas, Morocco", "geo": { "@type": "GeoShape", "box": "29.5 -10.0 31.6 -8.5" } },
    },
    {
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Slow Morocco", "item": BASE_URL },
        { "@type": "ListItem", "position": 2, "name": "Stories", "item": `${BASE_URL}/stories` },
        { "@type": "ListItem", "position": 3, "name": "The Argan Triangle", "item": CANONICAL },
      ],
    },
  ],
};

// ─────────────────────────────────────────────────────────────────────────────
// PAGE
// ─────────────────────────────────────────────────────────────────────────────

export default function ArganTrianglePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ArganTriangleContent />
    </>
  );
}
