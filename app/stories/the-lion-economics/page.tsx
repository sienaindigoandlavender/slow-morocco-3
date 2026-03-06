import { Metadata } from "next";
import { TheLionEconomicsContent } from "./TheLionEconomicsContent";

export const revalidate = 3600;

const BASE_URL = "https://www.slowmorocco.com";
const SLUG = "the-lion-economics";
const CANONICAL = `${BASE_URL}/stories/${SLUG}`;

// ─────────────────────────────────────────────────────────────────────────────
// METADATA
// ─────────────────────────────────────────────────────────────────────────────

export const metadata: Metadata = {
  title: "The Lion Economics — Conservation Economics of Africa's Last Lions | Slow Morocco",
  description:
    "200,000 became 23,000. Extinct in 26 countries. Lions drive 8.5% of Africa's GDP but 90% of their protected areas are underfunded. The economics of a species being allowed to disappear.",
  keywords: [
    "African lion population", "lion conservation economics", "safari tourism Africa",
    "lion habitat loss", "wildlife tourism GDP", "trophy hunting economics",
    "lion protected areas", "conservation funding gap", "human-wildlife conflict",
    "lion population decline", "Serengeti lions", "Cecil the lion",
    "West African lions", "lion extinction", "community conservancies",
  ],
  authors: [{ name: "J. Ng", url: `${BASE_URL}/about` }],
  alternates: { canonical: CANONICAL },
  openGraph: {
    title: "The Lion Economics — Conservation Economics of Africa's Last Lions",
    description: "200,000 became 23,000. Extinct in 26 countries. They drive 8.5% of Africa's GDP but 90% of their protected areas are underfunded.",
    url: CANONICAL,
    siteName: "Slow Morocco",
    locale: "en_GB",
    type: "article",
    authors: ["J. Ng"],
    tags: ["lions", "conservation", "economics", "Africa", "wildlife", "safari tourism"],
  },
  twitter: {
    card: "summary_large_image",
    title: "The Lion Economics — Africa's Last Lions",
    description: "200,000 became 23,000. Extinct in 26 countries. The economics of a species being allowed to disappear.",
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
      "headline": "The Lion Economics — Conservation Economics of Africa's Last Lions",
      "description": "200,000 became 23,000. Extinct in 26 countries. Lions drive 8.5% of Africa's GDP but 90% of their protected areas are underfunded. The economics of a species being allowed to disappear.",
      "datePublished": "2025-01-01",
      "dateModified": new Date().toISOString().split("T")[0],
      "author": { "@type": "Person", "name": "J. Ng", "url": `${BASE_URL}/about` },
      "publisher": { "@type": "Organization", "name": "Slow Morocco", "url": BASE_URL },
      "mainEntityOfPage": CANONICAL,
      "keywords": "African lion population, lion conservation economics, safari tourism, lion habitat loss, wildlife tourism GDP, trophy hunting, conservation funding gap, human-wildlife conflict",
      "articleSection": "Conservation Economics",
      "spatialCoverage": { "@type": "Place", "name": "Sub-Saharan Africa — Tanzania, South Africa, Botswana, Kenya, Zambia", "geo": { "@type": "GeoShape", "box": "-35.00 -18.00 15.00 52.00" } },
    },
    {
      "@type": "Dataset",
      "@id": `${CANONICAL}#dataset`,
      "name": "African Lion Population & Conservation Economics",
      "description": "African lion population data (1900–2025), conservation funding analysis, safari tourism revenue, regional population trends, and threat breakdown. Covers 26 countries where lions are now extinct and remaining strongholds.",
      "url": CANONICAL,
      "creator": { "@type": "Organization", "name": "IUCN CatSG / LionAid / WildCRU / AWF" },
      "spatialCoverage": "Sub-Saharan Africa",
      "temporalCoverage": "1900/2025",
    },
    {
      "@type": "FAQPage",
      "@id": `${CANONICAL}#faq`,
      "mainEntity": [
        {
          "@type": "Question",
          "name": "How many lions are left in Africa?",
          "acceptedAnswer": { "@type": "Answer", "text": "Approximately 23,000 wild lions remain in Africa as of 2025, down from an estimated 200,000 in 1900 — an 88% decline. Lions are now extinct in 26 African countries and occupy only 7% of their historical range. Tanzania holds roughly half of all remaining lions." },
        },
        {
          "@type": "Question",
          "name": "How much is Africa's safari tourism industry worth?",
          "acceptedAnswer": { "@type": "Answer", "text": "Africa's safari tourism market is worth $20.5 billion (2025) and growing at 6.7% CAGR. Wildlife tourism supports 24 million jobs and contributes 8.5% of continental GDP. Lions are the primary draw — 80% of international visitors cite wildlife as their reason for coming." },
        },
        {
          "@type": "Question",
          "name": "What is the main threat to African lions?",
          "acceptedAnswer": { "@type": "Answer", "text": "Habitat loss and fragmentation is the primary threat, responsible for approximately 40% of lion decline. 93% of historical lion range has been converted to farms, roads, and cities. Human-wildlife conflict (25%), prey depletion (15%), and poaching (10%) are the other major threats." },
        },
      ],
    },
    {
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Slow Morocco", "item": BASE_URL },
        { "@type": "ListItem", "position": 2, "name": "Stories", "item": `${BASE_URL}/stories` },
        { "@type": "ListItem", "position": 3, "name": "The Lion Economics", "item": CANONICAL },
      ],
    },
  ],
};

// ─────────────────────────────────────────────────────────────────────────────
// PAGE
// ─────────────────────────────────────────────────────────────────────────────

export default function TheLionEconomicsPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <TheLionEconomicsContent />
    </>
  );
}
