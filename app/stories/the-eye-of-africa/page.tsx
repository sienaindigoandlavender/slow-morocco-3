import { Metadata } from "next";
import { TheEyeOfAfricaContent } from "./TheEyeOfAfricaContent";

export const revalidate = 3600;

const BASE_URL = "https://www.slowmorocco.com";
const SLUG = "the-eye-of-africa";
const CANONICAL = `${BASE_URL}/stories/${SLUG}`;

// ─────────────────────────────────────────────────────────────────────────────
// METADATA
// ─────────────────────────────────────────────────────────────────────────────

export const metadata: Metadata = {
  title: "The Eye of Africa — The Richat Structure, Mauritania | Slow Morocco",
  description:
    "The Richat Structure is a 40-kilometre geological dome in the Mauritanian Sahara, visible from orbit, formed 100 million years ago when the Atlantic Ocean opened. 7 ring layers, 32 carbonatite dikes, and the Atlantis question — mapped and explained.",
  keywords: [
    "Richat Structure", "Eye of Africa", "Mauritania geology",
    "Richat dome", "Atlantis Richat", "concentric rings Sahara",
    "geological heritage site", "IUGS heritage", "carbonatite dikes",
    "kimberlite Mauritania", "Adrar Plateau", "Sahara geology",
    "Matton Jébrak", "alkaline hydrothermal complex", "Gemini IV Richat",
    "Green Sahara", "Acheulean tools Mauritania",
  ],
  authors: [{ name: "J. Ng", url: `${BASE_URL}/about` }],
  alternates: { canonical: CANONICAL },
  openGraph: {
    title: "The Eye of Africa — The Richat Structure, Mauritania",
    description: "40 km diameter. 100 million years old. 32 carbonatite dikes. 0 cities found. The Richat Structure is not Atlantis — it is something far older and far more real.",
    url: CANONICAL,
    siteName: "Slow Morocco",
    locale: "en_GB",
    type: "article",
    authors: ["J. Ng"],
    tags: ["Mauritania", "Richat Structure", "geology", "Atlantis", "Sahara", "IUGS heritage"],
  },
  twitter: {
    card: "summary_large_image",
    title: "The Eye of Africa — The Richat Structure, Mauritania",
    description: "40 km diameter. 100 million years old. 0 cities found. The Richat Structure mapped and explained.",
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
      "headline": "The Eye of Africa — The Richat Structure, Mauritania",
      "description": "The Richat Structure is a 40-kilometre geological dome in the Mauritanian Sahara, visible from orbit, formed 100 million years ago when the Atlantic Ocean opened. 7 ring layers, 32 carbonatite dikes, and the Atlantis question — mapped and explained.",
      "datePublished": "2025-01-01",
      "dateModified": new Date().toISOString().split("T")[0],
      "author": { "@type": "Person", "name": "J. Ng", "url": `${BASE_URL}/about` },
      "publisher": { "@type": "Organization", "name": "Slow Morocco", "url": BASE_URL },
      "mainEntityOfPage": CANONICAL,
      "keywords": "Richat Structure, Eye of Africa, Mauritania geology, Atlantis, carbonatite dikes, kimberlite, IUGS heritage, Adrar Plateau, Green Sahara",
      "articleSection": "Geology & Earth Science",
      "spatialCoverage": { "@type": "Place", "name": "Richat Structure, Adrar Plateau, Mauritania", "geo": { "@type": "GeoCoordinates", "latitude": 21.124, "longitude": -11.401 } },
    },
    {
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Slow Morocco", "item": BASE_URL },
        { "@type": "ListItem", "position": 2, "name": "Stories", "item": `${BASE_URL}/stories` },
        { "@type": "ListItem", "position": 3, "name": "The Eye of Africa", "item": CANONICAL },
      ],
    },
  ],
};

// ─────────────────────────────────────────────────────────────────────────────
// PAGE
// ─────────────────────────────────────────────────────────────────────────────

export default function TheEyeOfAfricaPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <TheEyeOfAfricaContent />
    </>
  );
}
