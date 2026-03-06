import { Metadata } from "next";
import { YennayerContent } from "./YennayerContent";

export const revalidate = 3600;

const BASE_URL = "https://www.slowmorocco.com";
const SLUG = "yennayer";
const CANONICAL = `${BASE_URL}/stories/${SLUG}`;

// ─────────────────────────────────────────────────────────────────────────────
// METADATA
// ─────────────────────────────────────────────────────────────────────────────

export const metadata: Metadata = {
  title: "Yennayer — The Berber Pharaoh & the 3,000-Year Calendar | Slow Morocco",
  description:
    "In 943 BC, a Berber chief became Pharaoh of Egypt. The Amazigh calendar counts from that throne. Yennayer is the oldest New Year still celebrated — from the Nile Delta to the Atlas Mountains to the Sahara.",
  keywords: [
    "Yennayer", "Amazigh New Year", "Berber calendar", "Sheshonq I",
    "22nd Dynasty Egypt", "Amazigh identity", "Morocco national holiday",
    "Berber pharaoh", "Amazigh calendar 2976", "North Africa culture",
    "Amazigh traditions", "Berber culture Morocco",
  ],
  authors: [{ name: "J. Ng", url: `${BASE_URL}/about` }],
  alternates: { canonical: CANONICAL },
  openGraph: {
    title: "Yennayer — The Berber Pharaoh & the 3,000-Year Calendar",
    description: "In 943 BC, a Berber chief became Pharaoh of Egypt. The Amazigh calendar counts from that throne. The oldest New Year still celebrated.",
    url: CANONICAL,
    siteName: "Slow Morocco",
    locale: "en_GB",
    type: "article",
    authors: ["J. Ng"],
    tags: ["Morocco", "Amazigh", "Yennayer", "Berber", "culture", "calendar"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Yennayer — The Berber Pharaoh & the 3,000-Year Calendar",
    description: "In 943 BC, a Berber chief became Pharaoh of Egypt. The Amazigh calendar counts from that throne.",
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
      "headline": "Yennayer — The Berber Pharaoh & the 3,000-Year Calendar",
      "description": "In 943 BC, a Berber chief became Pharaoh of Egypt. The Amazigh calendar counts from that throne. Yennayer is the oldest New Year still celebrated.",
      "datePublished": "2025-01-01",
      "dateModified": new Date().toISOString().split("T")[0],
      "author": { "@type": "Person", "name": "J. Ng", "url": `${BASE_URL}/about` },
      "publisher": { "@type": "Organization", "name": "Slow Morocco", "url": BASE_URL },
      "mainEntityOfPage": CANONICAL,
      "keywords": "Yennayer, Amazigh New Year, Berber calendar, Sheshonq I, 22nd Dynasty, Amazigh identity, Morocco",
      "articleSection": "Culture & Identity",
      "spatialCoverage": { "@type": "Place", "name": "Morocco, Algeria, North Africa, Egypt", "geo": { "@type": "GeoShape", "box": "23.0 -14.0 37.0 36.0" } },
    },
    {
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Slow Morocco", "item": BASE_URL },
        { "@type": "ListItem", "position": 2, "name": "Stories", "item": `${BASE_URL}/stories` },
        { "@type": "ListItem", "position": 3, "name": "Yennayer", "item": CANONICAL },
      ],
    },
  ],
};

// ─────────────────────────────────────────────────────────────────────────────
// PAGE
// ─────────────────────────────────────────────────────────────────────────────

export default function YennayerPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <YennayerContent />
    </>
  );
}
