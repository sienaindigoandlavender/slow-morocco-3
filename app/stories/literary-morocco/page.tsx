import { Metadata } from "next";
import { LiteraryMoroccoContent } from "./LiteraryMoroccoContent";

export const revalidate = 3600;

const BASE_URL = "https://www.slowmorocco.com";
const SLUG = "literary-morocco";
const CANONICAL = `${BASE_URL}/stories/${SLUG}`;

// ─────────────────────────────────────────────────────────────────────────────
// METADATA
// ─────────────────────────────────────────────────────────────────────────────

export const metadata: Metadata = {
  title: "Literary Morocco — Tangier's Writers, Beats & Moroccan Voices | Slow Morocco",
  description:
    "Twelve writers across four eras — from Ibn Battuta in 1325 to Tahar Ben Jelloun today. Bowles, Burroughs, Choukri, Genet, Canetti, and the literary geography of Tangier, Marrakech, and beyond. The map of Morocco's literary history.",
  keywords: [
    "literary Morocco", "Tangier writers", "Paul Bowles Tangier", "Burroughs Naked Lunch Tangier",
    "Mohamed Choukri For Bread Alone", "Beat Generation Morocco", "Interzone Tangier",
    "literary geography Morocco", "Jean Genet Larache", "Elias Canetti Marrakesh",
    "Ibn Battuta Rihla", "Tahar Ben Jelloun", "Morocco literature",
    "Brion Gysin Tangier", "Isabelle Eberhardt", "Edith Wharton Morocco",
  ],
  authors: [{ name: "J. Ng", url: `${BASE_URL}/about` }],
  alternates: { canonical: CANONICAL },
  openGraph: {
    title: "Literary Morocco — Tangier's Writers, Beats & Moroccan Voices",
    description: "12 writers. 4 eras. From Ibn Battuta (1325) to Ben Jelloun. Bowles, Burroughs, Choukri, Genet — the literary geography of Morocco mapped.",
    url: CANONICAL,
    siteName: "Slow Morocco",
    locale: "en_GB",
    type: "article",
    authors: ["J. Ng"],
    tags: ["literature", "Morocco", "Tangier", "Beat Generation", "Choukri", "Bowles"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Literary Morocco — Tangier's Writers, Beats & Moroccan Voices",
    description: "12 writers. 4 eras. Bowles, Burroughs, Choukri, Genet — Morocco's literary history mapped.",
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
      "headline": "Literary Morocco — Tangier's Writers, Beats & Moroccan Voices",
      "description": "Twelve writers across four eras — from Ibn Battuta in 1325 to Tahar Ben Jelloun today. Bowles, Burroughs, Choukri, Genet, Canetti, and the literary geography of Tangier, Marrakech, and beyond.",
      "datePublished": "2025-01-01",
      "dateModified": new Date().toISOString().split("T")[0],
      "author": { "@type": "Person", "name": "J. Ng", "url": `${BASE_URL}/about` },
      "publisher": { "@type": "Organization", "name": "Slow Morocco", "url": BASE_URL },
      "mainEntityOfPage": CANONICAL,
      "keywords": "literary Morocco, Tangier writers, Paul Bowles, Burroughs, Choukri, Beat Generation Morocco, Interzone, Ibn Battuta, Ben Jelloun, Genet, Canetti",
      "articleSection": "Cultural Intelligence",
      "spatialCoverage": { "@type": "Place", "name": "Morocco — Tangier, Marrakech, Fes, Larache", "geo": { "@type": "GeoShape", "box": "29.0 -10.0 36.0 -1.0" } },
    },
    {
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Slow Morocco", "item": BASE_URL },
        { "@type": "ListItem", "position": 2, "name": "Stories", "item": `${BASE_URL}/stories` },
        { "@type": "ListItem", "position": 3, "name": "Literary Morocco", "item": CANONICAL },
      ],
    },
  ],
};

// ─────────────────────────────────────────────────────────────────────────────
// PAGE
// ─────────────────────────────────────────────────────────────────────────────

export default function LiteraryMoroccoPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <LiteraryMoroccoContent />
    </>
  );
}
