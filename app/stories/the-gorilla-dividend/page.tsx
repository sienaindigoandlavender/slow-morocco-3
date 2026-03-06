import { Metadata } from "next";
import { TheGorillaDividendContent } from "./TheGorillaDividendContent";

export const revalidate = 3600;

const BASE_URL = "https://www.slowmorocco.com";
const SLUG = "the-gorilla-dividend";
const CANONICAL = `${BASE_URL}/stories/${SLUG}`;

// ─────────────────────────────────────────────────────────────────────────────
// METADATA
// ─────────────────────────────────────────────────────────────────────────────

export const metadata: Metadata = {
  title: "The Gorilla Dividend — Rwanda's $1,500 Permit and the Economics of Survival | Slow Morocco",
  description:
    "Rwanda charges $1,500 for one hour with the mountain gorillas. 96 permits per day. No exceptions. 1,063 gorillas alive — the only great ape that's increasing. $647M tourism revenue (2024). The price is why there are gorillas left.",
  keywords: [
    "mountain gorilla", "Rwanda gorilla permit", "gorilla trekking Rwanda",
    "Volcanoes National Park", "conservation economics", "gorilla tourism",
    "Rwanda tourism revenue", "Virunga Massif", "Dian Fossey",
    "gorilla population recovery", "wildlife conservation Africa",
    "revenue sharing conservation", "gorilla permit price",
    "endangered species recovery", "high-value low-volume tourism",
  ],
  authors: [{ name: "J. Ng", url: `${BASE_URL}/about` }],
  alternates: { canonical: CANONICAL },
  openGraph: {
    title: "The Gorilla Dividend — Rwanda's $1,500 Permit and the Economics of Survival",
    description: "96 permits per day. $1,500 each. 1,063 gorillas alive. The only great ape that's increasing. Rwanda built an economy around keeping them alive.",
    url: CANONICAL,
    siteName: "Slow Morocco",
    locale: "en_GB",
    type: "article",
    authors: ["J. Ng"],
    tags: ["gorillas", "conservation", "Rwanda", "tourism", "economics", "wildlife"],
  },
  twitter: {
    card: "summary_large_image",
    title: "The Gorilla Dividend — Rwanda's $1,500 Permit",
    description: "96 permits/day. 1,063 gorillas. The only great ape increasing. Conservation economics mapped.",
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
      "headline": "The Gorilla Dividend — Rwanda's $1,500 Permit and the Economics of Survival",
      "description": "Rwanda charges $1,500 for one hour with the mountain gorillas. 96 permits per day. 1,063 gorillas alive — the only great ape that's increasing. $647M tourism revenue (2024). The price is carrying capacity expressed in currency.",
      "datePublished": "2025-01-01",
      "dateModified": new Date().toISOString().split("T")[0],
      "author": { "@type": "Person", "name": "J. Ng", "url": `${BASE_URL}/about` },
      "publisher": { "@type": "Organization", "name": "Slow Morocco", "url": BASE_URL },
      "mainEntityOfPage": CANONICAL,
      "keywords": "mountain gorilla, Rwanda gorilla permit, gorilla trekking, Volcanoes National Park, conservation economics, Virunga Massif, Dian Fossey, gorilla population recovery",
      "articleSection": "Conservation Economics",
      "spatialCoverage": { "@type": "Place", "name": "Virunga Massif — Rwanda, Uganda, DRC", "geo": { "@type": "GeoShape", "box": "-1.60 29.20 -0.90 29.75" } },
    },
    {
      "@type": "Dataset",
      "@id": `${CANONICAL}#dataset`,
      "name": "Mountain Gorilla Population & Tourism Revenue — Rwanda",
      "description": "Mountain gorilla population census data (1981–2024) and Rwanda gorilla tourism revenue data (2014–2024). Includes permit pricing history, revenue sharing breakdown, and per-gorilla economic analysis.",
      "url": CANONICAL,
      "creator": { "@type": "Organization", "name": "RDB / IUCN / Dian Fossey Gorilla Fund / WTTC" },
      "spatialCoverage": "Virunga Massif — Rwanda, Uganda, DRC",
      "temporalCoverage": "1981/2024",
    },
    {
      "@type": "FAQPage",
      "@id": `${CANONICAL}#faq`,
      "mainEntity": [
        {
          "@type": "Question",
          "name": "Why does Rwanda charge $1,500 for a gorilla permit?",
          "acceptedAnswer": { "@type": "Answer", "text": "Rwanda charges $1,500 per gorilla trekking permit as a high-value, low-volume conservation strategy. With only 96 permits available per day (8 visitors per habituated group × 12 groups), the price ensures carrying capacity is not exceeded while generating approximately $200M in annual gorilla tourism revenue. The price funds park management, ranger salaries, research, and community revenue-sharing programmes." },
        },
        {
          "@type": "Question",
          "name": "How many mountain gorillas are left?",
          "acceptedAnswer": { "@type": "Answer", "text": "As of the most recent census data, approximately 1,063 mountain gorillas survive in the wild. They are found in two populations: the Virunga Massif (spanning Rwanda, Uganda, and DRC) and Uganda's Bwindi Impenetrable Forest. The mountain gorilla is the only great ape whose population is increasing — up from 254 in 1981." },
        },
        {
          "@type": "Question",
          "name": "How much revenue does gorilla tourism generate for Rwanda?",
          "acceptedAnswer": { "@type": "Answer", "text": "In 2024, Rwanda's total tourism revenue reached $647 million, of which gorilla tourism contributed approximately $200 million (31%). Each gorilla generates roughly $515 per day or $188,000 per year in tourism revenue. 10% of park revenue is shared directly with communities adjacent to the parks." },
        },
      ],
    },
    {
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Slow Morocco", "item": BASE_URL },
        { "@type": "ListItem", "position": 2, "name": "Stories", "item": `${BASE_URL}/stories` },
        { "@type": "ListItem", "position": 3, "name": "The Gorilla Dividend", "item": CANONICAL },
      ],
    },
  ],
};

// ─────────────────────────────────────────────────────────────────────────────
// PAGE
// ─────────────────────────────────────────────────────────────────────────────

export default function TheGorillaDividendPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <TheGorillaDividendContent />
    </>
  );
}
