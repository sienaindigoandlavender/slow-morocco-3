import { Metadata } from "next";
import { IslamicSpainContent } from "./IslamicSpainContent";

export const revalidate = 3600;

const BASE_URL = "https://www.slowmorocco.com";
const SLUG = "islamic-spain";
const CANONICAL = `${BASE_URL}/stories/${SLUG}`;

// ─────────────────────────────────────────────────────────────────────────────
// METADATA
// ─────────────────────────────────────────────────────────────────────────────

export const metadata: Metadata = {
  title: "Islamic Spain — 781 Years of Al-Andalus | Slow Morocco",
  description:
    "From Tariq ibn Ziyad's 711 crossing to the fall of Granada in 1492. 781 years of conquest, scholarship, art, and slow retreat — traced on a vertical timeline and interactive map.",
  keywords: [
    "Islamic Spain", "Al-Andalus", "Moorish Spain", "711 conquest", "fall of Granada",
    "Córdoba caliphate", "Alhambra", "Reconquista", "Tariq ibn Ziyad", "Abd al-Rahman",
    "Almohad", "Almoravid", "Nasrid", "Morocco Spain history", "Berber dynasties",
    "Great Mosque Córdoba", "Medina Azahara", "Averroes", "Maimonides",
    "Islamic history Iberia", "Muslim Spain timeline",
  ],
  authors: [{ name: "J. Ng", url: `${BASE_URL}/about` }],
  alternates: { canonical: CANONICAL },
  openGraph: {
    title: "Islamic Spain — 781 Years of Al-Andalus",
    description: "From Tariq ibn Ziyad's 711 crossing to the fall of Granada in 1492. 781 years of conquest, scholarship, art, and slow retreat.",
    url: CANONICAL,
    siteName: "Slow Morocco",
    locale: "en_GB",
    type: "article",
    authors: ["J. Ng"],
    tags: ["Islamic Spain", "Al-Andalus", "Morocco", "history", "Reconquista", "Alhambra", "Córdoba"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Islamic Spain — 781 Years of Al-Andalus",
    description: "From the 711 crossing to the 1492 fall of Granada. 781 years traced on a vertical timeline and interactive map.",
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
      "headline": "Islamic Spain — 781 Years of Al-Andalus",
      "description": "From Tariq ibn Ziyad's 711 crossing to the fall of Granada in 1492. 781 years of conquest, scholarship, art, and slow retreat — traced on a vertical timeline and interactive map.",
      "datePublished": "2025-01-01",
      "dateModified": new Date().toISOString().split("T")[0],
      "author": { "@type": "Person", "name": "J. Ng", "url": `${BASE_URL}/about` },
      "publisher": { "@type": "Organization", "name": "Slow Morocco", "url": BASE_URL },
      "mainEntityOfPage": CANONICAL,
      "keywords": "Islamic Spain, Al-Andalus, Moorish Spain, Córdoba caliphate, Alhambra, Reconquista, Tariq ibn Ziyad, Almohad, Almoravid, Nasrid, Morocco Spain history",
      "articleSection": "Culture & Heritage",
      "spatialCoverage": { "@type": "Place", "name": "Al-Andalus — Iberian Peninsula & North Africa", "geo": { "@type": "GeoShape", "box": "31.0 -10.0 47.0 4.0" } },
    },
    {
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Slow Morocco", "item": BASE_URL },
        { "@type": "ListItem", "position": 2, "name": "Stories", "item": `${BASE_URL}/stories` },
        { "@type": "ListItem", "position": 3, "name": "Islamic Spain", "item": CANONICAL },
      ],
    },
  ],
};

// ─────────────────────────────────────────────────────────────────────────────
// PAGE
// ─────────────────────────────────────────────────────────────────────────────

export default function IslamicSpainPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <IslamicSpainContent />
    </>
  );
}
