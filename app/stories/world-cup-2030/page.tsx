import { Metadata } from "next";
import { WorldCup2030Content } from "./WorldCup2030Content";

export const revalidate = 3600;

const BASE_URL = "https://www.slowmorocco.com";
const SLUG = "world-cup-2030";
const CANONICAL = `${BASE_URL}/stories/${SLUG}`;

// ─────────────────────────────────────────────────────────────────────────────
// METADATA
// ─────────────────────────────────────────────────────────────────────────────

export const metadata: Metadata = {
  title: "2030 World Cup Infrastructure Map — Every Stadium, Railway, Highway & Airport | Slow Morocco",
  description:
    "Every stadium, railway line, highway, airport, and hotel project across Morocco, Spain, and Portugal — the complete infrastructure picture for the first World Cup across two continents. Twenty stadiums. Seventeen cities. Forty-one billion dollars in Moroccan infrastructure alone.",
  keywords: [
    "2030 World Cup", "Morocco World Cup", "World Cup infrastructure", "Grand Stade Hassan II",
    "Morocco stadiums", "Spain stadiums", "Portugal stadiums", "Al Boraq HSR",
    "Morocco high-speed rail", "World Cup 2030 venues", "FIFA 2030",
    "Morocco infrastructure", "World Cup host cities",
  ],
  authors: [{ name: "J. Ng", url: `${BASE_URL}/about` }],
  alternates: { canonical: CANONICAL },
  openGraph: {
    title: "2030 World Cup Infrastructure Map — Every Stadium, Railway, Highway & Airport",
    description: "Twenty stadiums. Seventeen cities. Forty-one billion dollars in Moroccan infrastructure alone. The complete infrastructure picture for the first World Cup across two continents.",
    url: CANONICAL,
    siteName: "Slow Morocco",
    locale: "en_GB",
    type: "article",
    authors: ["J. Ng"],
    tags: ["Morocco", "World Cup 2030", "infrastructure", "stadiums", "high-speed rail"],
  },
  twitter: {
    card: "summary_large_image",
    title: "2030 World Cup Infrastructure Map",
    description: "Twenty stadiums. Seventeen cities. $41B in Moroccan infrastructure. The complete World Cup 2030 infrastructure map.",
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
      "headline": "2030 World Cup Infrastructure Map — Every Stadium, Railway, Highway & Airport",
      "description": "Every stadium, railway line, highway, airport, and hotel project across Morocco, Spain, and Portugal — the complete infrastructure picture for the first World Cup across two continents.",
      "datePublished": "2025-01-01",
      "dateModified": new Date().toISOString().split("T")[0],
      "author": { "@type": "Person", "name": "J. Ng", "url": `${BASE_URL}/about` },
      "publisher": { "@type": "Organization", "name": "Slow Morocco", "url": BASE_URL },
      "mainEntityOfPage": CANONICAL,
      "keywords": "2030 World Cup, Morocco World Cup, World Cup infrastructure, Grand Stade Hassan II, Al Boraq HSR, FIFA 2030",
      "articleSection": "Infrastructure Intelligence",
      "spatialCoverage": { "@type": "Place", "name": "Morocco, Spain, Portugal", "geo": { "@type": "GeoShape", "box": "27.0 -15.0 44.0 5.0" } },
    },
    {
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Slow Morocco", "item": BASE_URL },
        { "@type": "ListItem", "position": 2, "name": "Stories", "item": `${BASE_URL}/stories` },
        { "@type": "ListItem", "position": 3, "name": "2030 World Cup Infrastructure Map", "item": CANONICAL },
      ],
    },
  ],
};

// ─────────────────────────────────────────────────────────────────────────────
// PAGE
// ─────────────────────────────────────────────────────────────────────────────

export default function WorldCup2030Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <WorldCup2030Content />
    </>
  );
}
