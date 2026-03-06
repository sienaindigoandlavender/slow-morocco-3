import { Metadata } from "next";
import { TheMemoryInTheStoneContent } from "./TheMemoryInTheStoneContent";

export const revalidate = 3600;

const BASE_URL = "https://www.slowmorocco.com";
const SLUG = "the-memory-in-the-stone";
const CANONICAL = `${BASE_URL}/stories/${SLUG}`;

// ─────────────────────────────────────────────────────────────────────────────
// METADATA
// ─────────────────────────────────────────────────────────────────────────────

export const metadata: Metadata = {
  title: "The Memory in the Stone — Rock Art Across Africa | Slow Morocco",
  description:
    "75,000 years. 50,000+ sites. One climate archive. Africa holds the oldest, densest, and most diverse rock art on Earth — from Blombos Cave to Tassili n'Ajjer to the Drakensberg.",
  keywords: [
    "African rock art", "Blombos Cave", "Tassili n'Ajjer",
    "Saharan rock art", "San rock paintings", "Drakensberg",
    "Twyfelfontein", "Dabous Giraffes", "Laas Geel",
    "UNESCO rock art", "Green Sahara", "petroglyphs",
    "climate archive", "rock engravings", "prehistoric art",
  ],
  authors: [{ name: "J. Ng", url: `${BASE_URL}/about` }],
  alternates: { canonical: CANONICAL },
  openGraph: {
    title: "The Memory in the Stone — Rock Art Across Africa",
    description: "75,000 years. 50,000+ sites. 2M+ images. The longest-running documentation project in human history — and nobody planned it.",
    url: CANONICAL,
    siteName: "Slow Morocco",
    locale: "en_GB",
    type: "article",
    authors: ["J. Ng"],
    tags: ["African rock art", "Saharan rock art", "San paintings", "UNESCO", "climate archive"],
  },
  twitter: {
    card: "summary_large_image",
    title: "The Memory in the Stone — Rock Art Across Africa",
    description: "75,000 years. 50,000+ sites. 2M+ images. Africa's rock art is not decoration. It is testimony.",
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
      "headline": "The Memory in the Stone — Rock Art Across Africa",
      "description": "75,000 years. 50,000+ sites. One climate archive. Africa holds the oldest, densest, and most diverse rock art on Earth — from Blombos Cave to Tassili n'Ajjer to the Drakensberg.",
      "datePublished": "2025-01-01",
      "dateModified": new Date().toISOString().split("T")[0],
      "author": { "@type": "Person", "name": "J. Ng", "url": `${BASE_URL}/about` },
      "publisher": { "@type": "Organization", "name": "Slow Morocco", "url": BASE_URL },
      "mainEntityOfPage": CANONICAL,
      "keywords": "African rock art, Blombos Cave, Tassili n'Ajjer, Saharan rock art, San paintings, Drakensberg, Twyfelfontein, Dabous Giraffes, Laas Geel, UNESCO rock art",
      "articleSection": "Cultural Intelligence",
      "spatialCoverage": { "@type": "Place", "name": "Africa", "geo": { "@type": "GeoCoordinates", "latitude": 5.0, "longitude": 20.0 } },
    },
    {
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Slow Morocco", "item": BASE_URL },
        { "@type": "ListItem", "position": 2, "name": "Stories", "item": `${BASE_URL}/stories` },
        { "@type": "ListItem", "position": 3, "name": "The Memory in the Stone", "item": CANONICAL },
      ],
    },
  ],
};

// ─────────────────────────────────────────────────────────────────────────────
// PAGE
// ─────────────────────────────────────────────────────────────────────────────

export default function TheMemoryInTheStonePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <TheMemoryInTheStoneContent />
    </>
  );
}
