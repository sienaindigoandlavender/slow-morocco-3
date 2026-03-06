import { Metadata } from "next";
import { MedinaDataContent } from "./MedinaDataContent";

export const revalidate = 3600;

const BASE_URL = "https://www.slowmorocco.com";
const SLUG = "medina-data";
const CANONICAL = `${BASE_URL}/stories/${SLUG}`;

// ─────────────────────────────────────────────────────────────────────────────
// METADATA
// ─────────────────────────────────────────────────────────────────────────────

export const metadata: Metadata = {
  title: "The Medina Data — 12,900 Features, Seven Concentric Rings | Slow Morocco",
  description:
    "Infrastructure cartography of the Marrakech medina: 186 mosques, 97 foundouks, ~12,000 riads, 400 derbs, and 16 km of ramparts mapped across seven concentric rings from centre to edge. The spatial grammar of Islamic urbanism.",
  keywords: [
    "medina Marrakech", "medina data", "Marrakech infrastructure", "Islamic urbanism",
    "concentric rings medina", "Koutoubia mosque", "foundouks Marrakech", "riads Marrakech",
    "derbs medina", "souks Marrakech", "hammams Morocco", "medina spatial grammar",
    "Marrakech ramparts", "UNESCO Marrakech", "Morocco urban history",
  ],
  authors: [{ name: "J. Ng", url: `${BASE_URL}/about` }],
  alternates: { canonical: CANONICAL },
  openGraph: {
    title: "The Medina Data — 12,900 Features, Seven Concentric Rings",
    description: "186 mosques, 97 foundouks, ~12,000 riads, 16 km of ramparts. The spatial grammar of Islamic urbanism mapped centre to edge.",
    url: CANONICAL,
    siteName: "Slow Morocco",
    locale: "en_GB",
    type: "article",
    authors: ["J. Ng"],
    tags: ["medina", "Marrakech", "Islamic urbanism", "infrastructure", "data", "Morocco"],
  },
  twitter: {
    card: "summary_large_image",
    title: "The Medina Data — 12,900 Features, Seven Concentric Rings",
    description: "186 mosques. 97 foundouks. ~12,000 riads. The spatial grammar of Islamic urbanism.",
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
      "headline": "The Medina Data — 12,900 Features, Seven Concentric Rings",
      "description": "Infrastructure cartography of the Marrakech medina: 186 mosques, 97 foundouks, ~12,000 riads, 400 derbs, and 16 km of ramparts mapped across seven concentric rings from centre to edge.",
      "datePublished": "2025-01-01",
      "dateModified": new Date().toISOString().split("T")[0],
      "author": { "@type": "Person", "name": "J. Ng", "url": `${BASE_URL}/about` },
      "publisher": { "@type": "Organization", "name": "Slow Morocco", "url": BASE_URL },
      "mainEntityOfPage": CANONICAL,
      "keywords": "medina Marrakech, Islamic urbanism, concentric rings, Koutoubia, foundouks, riads, derbs, souks, hammams, ramparts",
      "articleSection": "Infrastructure & Urbanism",
      "spatialCoverage": { "@type": "Place", "name": "Medina of Marrakech, Morocco", "geo": { "@type": "GeoCoordinates", "latitude": 31.63, "longitude": -7.99 } },
    },
    {
      "@type": "Dataset",
      "@id": `${CANONICAL}#dataset`,
      "name": "Marrakech Medina Infrastructure Features",
      "description": "12,900 infrastructure features across seven concentric rings of the Marrakech medina, including mosques, foundouks, riads, derbs, souks, hammams, and defensive structures.",
      "url": CANONICAL,
      "creator": { "@type": "Organization", "name": "UNESCO / ADER-Marrakech / Ministry of Habous" },
      "spatialCoverage": "Medina of Marrakech, Morocco",
      "temporalCoverage": "1147/2025",
    },
    {
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Slow Morocco", "item": BASE_URL },
        { "@type": "ListItem", "position": 2, "name": "Stories", "item": `${BASE_URL}/stories` },
        { "@type": "ListItem", "position": 3, "name": "The Medina Data", "item": CANONICAL },
      ],
    },
  ],
};

// ─────────────────────────────────────────────────────────────────────────────
// PAGE
// ─────────────────────────────────────────────────────────────────────────────

export default function MedinaDataPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <MedinaDataContent />
    </>
  );
}
