import { Metadata } from "next";
import { ShadowMoucharabiehContent } from "./ShadowMoucharabiehContent";

export const revalidate = 3600;

const BASE_URL = "https://www.slowmorocco.com";
const SLUG = "shadow-moucharabieh";
const CANONICAL = `${BASE_URL}/stories/${SLUG}`;

// ─────────────────────────────────────────────────────────────────────────────
// METADATA
// ─────────────────────────────────────────────────────────────────────────────

export const metadata: Metadata = {
  title: "The Shadow of the Moucharabieh — Traditional Lattice Screens vs Modern Heat | Slow Morocco",
  description:
    "How Moroccan moucharabieh lattice screens process climate data — and how +1.6°C of warming since 1990 is rewriting the algorithm. Interactive visualisation of three cities, hourly temperatures, and heat stress thresholds.",
  keywords: [
    "moucharabieh Morocco", "Moroccan lattice screen", "traditional architecture Morocco",
    "climate change Morocco", "Marrakech heat", "Ouarzazate temperature", "Tangier climate",
    "passive cooling Morocco", "riad courtyard cooling", "Islamic geometric screen",
    "moucharabieh design", "Morocco warming", "heat stress Morocco", "cedar lattice",
    "traditional Moroccan building", "Morocco climate data",
  ],
  authors: [{ name: "J. Ng", url: `${BASE_URL}/about` }],
  alternates: { canonical: CANONICAL },
  openGraph: {
    title: "The Shadow of the Moucharabieh — Traditional Lattice vs Modern Heat",
    description: "Morocco has warmed +1.6°C since 1990. The moucharabieh lattice screen — centuries-old analogue climate processor — is being tested by heat its builders never imagined.",
    url: CANONICAL,
    siteName: "Slow Morocco",
    locale: "en_GB",
    type: "article",
    authors: ["J. Ng"],
    tags: ["moucharabieh", "climate", "Morocco", "architecture", "heat stress", "traditional design"],
  },
  twitter: {
    card: "summary_large_image",
    title: "The Shadow of the Moucharabieh — Lattice vs Modern Heat",
    description: "+1.6°C of warming. Three cities. One ancient lattice screen. Morocco's passive cooling mapped.",
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
      "headline": "The Shadow of the Moucharabieh — Traditional Lattice Screens vs Modern Heat",
      "description": "How Moroccan moucharabieh lattice screens process climate data — and how +1.6°C of warming since 1990 is rewriting the algorithm. Interactive visualisation covering Marrakech, Tangier, and Ouarzazate.",
      "datePublished": "2025-01-01",
      "dateModified": new Date().toISOString().split("T")[0],
      "author": { "@type": "Person", "name": "J. Ng", "url": `${BASE_URL}/about` },
      "publisher": { "@type": "Organization", "name": "Slow Morocco", "url": BASE_URL },
      "mainEntityOfPage": CANONICAL,
      "keywords": "moucharabieh Morocco, lattice screen, traditional architecture, climate change Morocco, passive cooling, Marrakech heat, Ouarzazate temperature, riad courtyard",
      "articleSection": "Climate & Architecture",
      "spatialCoverage": { "@type": "Place", "name": "Morocco — Marrakech, Tangier, Ouarzazate", "geo": { "@type": "GeoShape", "box": "30.0 -10.0 36.0 -1.0" } },
    },
    {
      "@type": "Dataset",
      "@id": `${CANONICAL}#dataset`,
      "name": "Moroccan City Climate Data — Marrakech, Tangier, Ouarzazate",
      "description": "Monthly high/low temperatures, sunshine hours, and rainfall for three Moroccan cities representing semi-arid, Mediterranean, and cold desert climates. WMO 1991–2020 normals.",
      "url": CANONICAL,
      "creator": { "@type": "Organization", "name": "WMO / ClimateToTravel / Weather Atlas" },
      "spatialCoverage": "Morocco — Marrakech, Tangier, Ouarzazate",
      "temporalCoverage": "1991/2020",
    },
    {
      "@type": "FAQPage",
      "@id": `${CANONICAL}#faq`,
      "mainEntity": [
        {
          "@type": "Question",
          "name": "What is a moucharabieh?",
          "acceptedAnswer": { "@type": "Answer", "text": "A moucharabieh is a carved wooden lattice screen used in traditional Moroccan and Islamic architecture to regulate light, air flow, and privacy. Its star-shaped apertures function as a passive climate processor — opening at dawn and contracting at midday to filter intense solar radiation." },
        },
        {
          "@type": "Question",
          "name": "How much has Morocco warmed?",
          "acceptedAnswer": { "@type": "Answer", "text": "Morocco has warmed approximately +1.6°C since 1990, based on German Weather Service (DWD) station analysis. August 2023 was the warmest month on record with a 27.9°C national average. July peaks in Ouarzazate now reach 39.5°C." },
        },
        {
          "@type": "Question",
          "name": "Is traditional Moroccan architecture still effective against heat?",
          "acceptedAnswer": { "@type": "Answer", "text": "Traditional cooling methods — moucharabieh screens, riad courtyards, pisé walls, and wind towers — were calibrated for a cooler climate. As temperatures rise and nighttime minimums increase, passive thermal mass cannot fully discharge overnight. In interior cities like Marrakech and Ouarzazate, these systems are approaching their effective limits." },
        },
      ],
    },
    {
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Slow Morocco", "item": BASE_URL },
        { "@type": "ListItem", "position": 2, "name": "Stories", "item": `${BASE_URL}/stories` },
        { "@type": "ListItem", "position": 3, "name": "The Shadow of the Moucharabieh", "item": CANONICAL },
      ],
    },
  ],
};

// ─────────────────────────────────────────────────────────────────────────────
// PAGE
// ─────────────────────────────────────────────────────────────────────────────

export default function ShadowMoucharabiehPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ShadowMoucharabiehContent />
    </>
  );
}
