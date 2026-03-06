import { Metadata } from "next";
import { TheSacredSmokeContent } from "./TheSacredSmokeContent";

export const revalidate = 3600;

const BASE_URL = "https://www.slowmorocco.com";
const SLUG = "the-sacred-smoke";
const CANONICAL = `${BASE_URL}/stories/${SLUG}`;

// ─────────────────────────────────────────────────────────────────────────────
// METADATA
// ─────────────────────────────────────────────────────────────────────────────

export const metadata: Metadata = {
  title: "The Sacred Smoke — Incense Traditions Across Civilisations | Slow Morocco",
  description:
    "Every civilisation burned something precious and called it prayer. Twelve traditions mapped across six continents — from Moroccan bkhour to Mesoamerican copal. The same instinct, everywhere.",
  keywords: [
    "sacred smoke", "incense traditions", "Moroccan bkhour", "frankincense",
    "copal", "oud", "myrrh", "palo santo", "white sage", "sandalwood",
    "incense history", "sacred plants", "purification rituals", "Morocco incense",
    "convergent evolution culture", "taqkhir", "fassoukh", "harmel",
  ],
  authors: [{ name: "J. Ng", url: `${BASE_URL}/about` }],
  alternates: { canonical: CANONICAL },
  openGraph: {
    title: "The Sacred Smoke — Incense Traditions Across Civilisations",
    description: "Twelve traditions. Six continents. At least five with no shared origin. The same instinct, everywhere: let the smoke rise.",
    url: CANONICAL,
    siteName: "Slow Morocco",
    locale: "en_GB",
    type: "article",
    authors: ["J. Ng"],
    tags: ["incense", "Morocco", "bkhour", "frankincense", "sacred plants", "cultural intelligence"],
  },
  twitter: {
    card: "summary_large_image",
    title: "The Sacred Smoke — Incense Traditions Across Civilisations",
    description: "Twelve traditions. Six continents. At least five with no shared origin. Let the smoke rise.",
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
      "headline": "The Sacred Smoke — Incense Traditions Across Civilisations",
      "description": "Every civilisation burned something precious and called it prayer. Twelve traditions mapped across six continents — from Moroccan bkhour to Mesoamerican copal. The same instinct, everywhere.",
      "datePublished": "2025-01-01",
      "dateModified": new Date().toISOString().split("T")[0],
      "author": { "@type": "Person", "name": "J. Ng", "url": `${BASE_URL}/about` },
      "publisher": { "@type": "Organization", "name": "Slow Morocco", "url": BASE_URL },
      "mainEntityOfPage": CANONICAL,
      "keywords": "sacred smoke, incense traditions, Moroccan bkhour, frankincense, copal, oud, myrrh, palo santo, white sage, sandalwood, taqkhir, convergent evolution",
      "articleSection": "Cultural Intelligence",
      "spatialCoverage": { "@type": "Place", "name": "Global", "geo": { "@type": "GeoShape", "box": "-90 -180 90 180" } },
    },
    {
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Slow Morocco", "item": BASE_URL },
        { "@type": "ListItem", "position": 2, "name": "Stories", "item": `${BASE_URL}/stories` },
        { "@type": "ListItem", "position": 3, "name": "The Sacred Smoke", "item": CANONICAL },
      ],
    },
  ],
};

// ─────────────────────────────────────────────────────────────────────────────
// PAGE
// ─────────────────────────────────────────────────────────────────────────────

export default function TheSacredSmokePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <TheSacredSmokeContent />
    </>
  );
}
