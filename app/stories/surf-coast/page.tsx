import { Metadata } from "next";
import { SurfCoastContent } from "./SurfCoastContent";

export const revalidate = 3600;

const BASE_URL = "https://www.slowmorocco.com";
const SLUG = "surf-coast";
const CANONICAL = `${BASE_URL}/stories/${SLUG}`;

// ─────────────────────────────────────────────────────────────────────────────
// METADATA
// ─────────────────────────────────────────────────────────────────────────────

export const metadata: Metadata = {
  title: "Morocco's Surf Coast — 15 Breaks from Safi to Essaouira | Slow Morocco",
  description:
    "Anchor Point, Killer Point, The Bay at Imsouane, Sidi Kaouki, Safi. Fifteen breaks mapped with swell direction, tide windows, ride length, and the economics of a 50,000-guest-per-year surf boom.",
  keywords: [
    "Morocco surf", "Taghazout surf", "Anchor Point Morocco",
    "Killer Point Morocco", "Imsouane Bay", "Morocco surf spots",
    "Sidi Kaouki", "Safi barrel", "Morocco surf coast",
    "Taghazout surf schools", "Morocco surf season",
    "Banana Point Aourir", "Hash Point Taghazout",
    "Morocco longboard", "Morocco surf economy",
  ],
  authors: [{ name: "J. Ng", url: `${BASE_URL}/about` }],
  alternates: { canonical: CANONICAL },
  openGraph: {
    title: "Morocco's Surf Coast — 15 Breaks from Safi to Essaouira",
    description: "Fifteen breaks mapped from Safi to Essaouira — swell direction, tide windows, ride length, and the economics of a 50,000-guest-per-year surf boom.",
    url: CANONICAL,
    siteName: "Slow Morocco",
    locale: "en_GB",
    type: "article",
    authors: ["J. Ng"],
    tags: ["surf", "Morocco", "Taghazout", "Anchor Point", "Imsouane", "Essaouira", "Safi"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Morocco's Surf Coast — 15 Breaks from Safi to Essaouira",
    description: "Fifteen breaks mapped with swell direction, tide windows, ride length, and the economics of Morocco's surf boom.",
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
      "headline": "Morocco's Surf Coast — 15 Breaks from Safi to Essaouira",
      "description": "Anchor Point, Killer Point, The Bay at Imsouane, Sidi Kaouki, Safi. Fifteen breaks mapped with swell direction, tide windows, ride length, and the economics of a 50,000-guest-per-year surf boom.",
      "datePublished": "2025-01-01",
      "dateModified": new Date().toISOString().split("T")[0],
      "author": { "@type": "Person", "name": "J. Ng", "url": `${BASE_URL}/about` },
      "publisher": { "@type": "Organization", "name": "Slow Morocco", "url": BASE_URL },
      "mainEntityOfPage": CANONICAL,
      "keywords": "Morocco surf, Taghazout, Anchor Point, Killer Point, Imsouane, Sidi Kaouki, Safi, surf coast, surf economy, surf season",
      "articleSection": "Coastal Intelligence",
      "spatialCoverage": { "@type": "Place", "name": "Morocco Surf Coast — Safi to Essaouira", "geo": { "@type": "GeoShape", "box": "30.5 -9.9 32.4 -9.2" } },
    },
    {
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Slow Morocco", "item": BASE_URL },
        { "@type": "ListItem", "position": 2, "name": "Stories", "item": `${BASE_URL}/stories` },
        { "@type": "ListItem", "position": 3, "name": "Morocco's Surf Coast", "item": CANONICAL },
      ],
    },
  ],
};

// ─────────────────────────────────────────────────────────────────────────────
// PAGE
// ─────────────────────────────────────────────────────────────────────────────

export default function SurfCoastPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <SurfCoastContent />
    </>
  );
}
