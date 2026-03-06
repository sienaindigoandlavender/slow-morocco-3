import { Metadata } from "next";
import { TheNomadPulseContent } from "./TheNomadPulseContent";

export const revalidate = 3600;

const BASE_URL = "https://www.slowmorocco.com";
const SLUG = "the-nomad-pulse";
const CANONICAL = `${BASE_URL}/stories/${SLUG}`;

// ─────────────────────────────────────────────────────────────────────────────
// METADATA
// ─────────────────────────────────────────────────────────────────────────────

export const metadata: Metadata = {
  title: "The Nomad Pulse — Morocco's Remote Work Geography | Slow Morocco",
  description:
    "Where connectivity meets the surf. Morocco's remote work geography — mapped, timed, and priced. GMT+1 time zone advantage, 5G rollout, co-living corridors, and the cost of the digital nomad lifestyle.",
  keywords: [
    "Morocco digital nomad", "Morocco remote work", "Taghazout coworking",
    "Morocco co-living", "Morocco 5G", "Morocco internet speed",
    "GMT+1 remote work", "Tamraght digital nomad", "Essaouira coworking",
    "Marrakech coworking", "Morocco nomad visa", "Morocco cost of living",
    "SunDesk Taghazout", "Morocco surf and work", "Morocco time zone advantage",
  ],
  authors: [{ name: "J. Ng", url: `${BASE_URL}/about` }],
  alternates: { canonical: CANONICAL },
  openGraph: {
    title: "The Nomad Pulse — Morocco's Remote Work Geography",
    description: "GMT+1 time zone advantage, 5G rollout, co-living corridors, and the cost of the digital nomad lifestyle — mapped, timed, and priced.",
    url: CANONICAL,
    siteName: "Slow Morocco",
    locale: "en_GB",
    type: "article",
    authors: ["J. Ng"],
    tags: ["digital nomad", "Morocco", "remote work", "coworking", "co-living", "5G", "Taghazout"],
  },
  twitter: {
    card: "summary_large_image",
    title: "The Nomad Pulse — Morocco's Remote Work Geography",
    description: "GMT+1 time zone advantage, 5G rollout, co-living corridors, and the cost of the digital nomad lifestyle in Morocco.",
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
      "headline": "The Nomad Pulse — Morocco's Remote Work Geography",
      "description": "Where connectivity meets the surf. Morocco's remote work geography — mapped, timed, and priced. GMT+1 time zone advantage, 5G rollout, co-living corridors, and the cost of the digital nomad lifestyle.",
      "datePublished": "2025-01-01",
      "dateModified": new Date().toISOString().split("T")[0],
      "author": { "@type": "Person", "name": "J. Ng", "url": `${BASE_URL}/about` },
      "publisher": { "@type": "Organization", "name": "Slow Morocco", "url": BASE_URL },
      "mainEntityOfPage": CANONICAL,
      "keywords": "Morocco digital nomad, remote work, coworking, co-living, 5G, GMT+1, Taghazout, Tamraght, Essaouira, Marrakech, cost of living",
      "articleSection": "Remote Work Intelligence",
      "spatialCoverage": { "@type": "Place", "name": "Morocco", "geo": { "@type": "GeoShape", "box": "27.6 -13.2 35.9 -1.0" } },
    },
    {
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Slow Morocco", "item": BASE_URL },
        { "@type": "ListItem", "position": 2, "name": "Stories", "item": `${BASE_URL}/stories` },
        { "@type": "ListItem", "position": 3, "name": "The Nomad Pulse", "item": CANONICAL },
      ],
    },
  ],
};

// ─────────────────────────────────────────────────────────────────────────────
// PAGE
// ─────────────────────────────────────────────────────────────────────────────

export default function TheNomadPulsePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <TheNomadPulseContent />
    </>
  );
}
