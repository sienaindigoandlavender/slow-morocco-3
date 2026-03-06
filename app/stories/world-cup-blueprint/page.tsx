import { Metadata } from "next";
import { WorldCupBlueprintContent } from "./WorldCupBlueprintContent";

export const revalidate = 3600;

const BASE_URL = "https://www.slowmorocco.com";
const SLUG = "world-cup-blueprint";
const CANONICAL = `${BASE_URL}/stories/${SLUG}`;

// ─────────────────────────────────────────────────────────────────────────────
// METADATA
// ─────────────────────────────────────────────────────────────────────────────

export const metadata: Metadata = {
  title: "Road to 2030 — The World Cup Blueprint | Slow Morocco",
  description:
    "Morocco approved MAD 380 billion ($41 billion) for World Cup 2030 infrastructure. High-speed rail stitching five cities into one corridor. Airport capacity doubled. A stadium seating 115,000 people. The complete economic blueprint.",
  keywords: [
    "Morocco World Cup 2030", "World Cup blueprint", "Morocco infrastructure investment",
    "LGV high-speed rail", "Grand Stade Hassan II", "AFCON 2025",
    "Morocco GDP", "Morocco tourism", "Morocco economy",
    "World Cup economics", "Morocco development",
  ],
  authors: [{ name: "J. Ng", url: `${BASE_URL}/about` }],
  alternates: { canonical: CANONICAL },
  openGraph: {
    title: "Road to 2030 — The World Cup Blueprint",
    description: "$41 billion in infrastructure. High-speed rail stitching five cities into one corridor. The complete World Cup economic blueprint.",
    url: CANONICAL,
    siteName: "Slow Morocco",
    locale: "en_GB",
    type: "article",
    authors: ["J. Ng"],
    tags: ["Morocco", "World Cup 2030", "infrastructure", "economics", "high-speed rail"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Road to 2030 — The World Cup Blueprint",
    description: "$41 billion. 200K+ jobs. 26M tourist target. The World Cup economic blueprint.",
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
      "headline": "Road to 2030 — The World Cup Blueprint",
      "description": "Morocco approved MAD 380 billion ($41 billion) for World Cup 2030 infrastructure. The complete economic blueprint: rail, airports, stadiums, hotels, highways, and spillover effects.",
      "datePublished": "2025-01-01",
      "dateModified": new Date().toISOString().split("T")[0],
      "author": { "@type": "Person", "name": "J. Ng", "url": `${BASE_URL}/about` },
      "publisher": { "@type": "Organization", "name": "Slow Morocco", "url": BASE_URL },
      "mainEntityOfPage": CANONICAL,
      "keywords": "Morocco World Cup 2030, infrastructure investment, LGV high-speed rail, Grand Stade Hassan II, AFCON 2025, Morocco economy",
      "articleSection": "Infrastructure Economics",
      "spatialCoverage": { "@type": "Place", "name": "Morocco", "geo": { "@type": "GeoShape", "box": "27.0 -14.0 36.0 0.0" } },
    },
    {
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Slow Morocco", "item": BASE_URL },
        { "@type": "ListItem", "position": 2, "name": "Stories", "item": `${BASE_URL}/stories` },
        { "@type": "ListItem", "position": 3, "name": "Road to 2030 — The World Cup Blueprint", "item": CANONICAL },
      ],
    },
  ],
};

// ─────────────────────────────────────────────────────────────────────────────
// PAGE
// ─────────────────────────────────────────────────────────────────────────────

export default function WorldCupBlueprintPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <WorldCupBlueprintContent />
    </>
  );
}
