import { Metadata } from "next";
import AlphabetOfCraftContent from "./AlphabetOfCraftContent";

export const revalidate = 3600;

const BASE_URL = "https://www.slowmorocco.com";
const SLUG = "alphabet-of-craft";
const CANONICAL = `${BASE_URL}/stories/${SLUG}`;

// ─────────────────────────────────────────────────────────────────────────────
// METADATA
// ─────────────────────────────────────────────────────────────────────────────

export const metadata: Metadata = {
  title: "The Moroccan Alphabet of Craft — 60 Traditions, One Illustrated Plate | Slow Morocco",
  description:
    "Sixty Moroccan craft traditions — from zellige tilework to rammed-earth construction — arranged as specimens on a single illustrated plate. Ten categories: tile, textile, leather, metalwork, wood, pottery, stone, fibre, body craft, and architecture. Each entry: name, region, technique, materials.",
  keywords: [
    "Moroccan craft", "zellige", "Moroccan textile", "Moroccan leather",
    "Moroccan pottery", "Beni Ourain rug", "tadelakt", "Fassi embroidery",
    "Moroccan metalwork", "thuya marquetry", "Moroccan artisan",
    "Moroccan handcraft", "Safi pottery", "Tamegroute", "babouche",
    "Moroccan architecture", "rammed earth Morocco", "craft taxonomy",
  ],
  authors: [{ name: "J. Ng", url: `${BASE_URL}/about` }],
  alternates: { canonical: CANONICAL },
  openGraph: {
    title: "The Moroccan Alphabet of Craft — 60 Traditions, One Illustrated Plate",
    description: "Sixty craft traditions. Ten categories. One illustrated plate. Every major Moroccan craft — from zellige to rammed earth — drawn as a specimen.",
    url: CANONICAL,
    siteName: "Slow Morocco",
    locale: "en_GB",
    type: "article",
    authors: ["J. Ng"],
    tags: ["craft", "Morocco", "zellige", "textile", "pottery", "leather", "artisan"],
  },
  twitter: {
    card: "summary_large_image",
    title: "The Moroccan Alphabet of Craft — 60 Traditions, One Illustrated Plate",
    description: "Sixty Moroccan craft traditions arranged as specimens on a single plate. Ten categories. One country.",
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
      "headline": "The Moroccan Alphabet of Craft — 60 Traditions, One Illustrated Plate",
      "description": "Sixty Moroccan craft traditions — from zellige tilework to rammed-earth construction — arranged as specimens on a single illustrated plate. Ten categories: tile, textile, leather, metalwork, wood, pottery, stone, fibre, body craft, and architecture.",
      "datePublished": "2025-01-01",
      "dateModified": new Date().toISOString().split("T")[0],
      "author": { "@type": "Person", "name": "J. Ng", "url": `${BASE_URL}/about` },
      "publisher": { "@type": "Organization", "name": "Slow Morocco", "url": BASE_URL },
      "mainEntityOfPage": CANONICAL,
      "keywords": "Moroccan craft, zellige, textile, leather, pottery, metalwork, wood, artisan, Fes, Marrakech, Safi, Essaouira",
      "articleSection": "Craft & Design",
      "spatialCoverage": { "@type": "Place", "name": "Morocco", "geo": { "@type": "GeoShape", "box": "27.0 -13.0 36.0 -1.0" } },
    },
    {
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Slow Morocco", "item": BASE_URL },
        { "@type": "ListItem", "position": 2, "name": "Stories", "item": `${BASE_URL}/stories` },
        { "@type": "ListItem", "position": 3, "name": "The Moroccan Alphabet of Craft", "item": CANONICAL },
      ],
    },
  ],
};

// ─────────────────────────────────────────────────────────────────────────────
// PAGE
// ─────────────────────────────────────────────────────────────────────────────

export default function AlphabetOfCraftPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <AlphabetOfCraftContent />
    </>
  );
}
