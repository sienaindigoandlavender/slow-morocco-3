import { Metadata } from "next";
import SardineCurrentContent from "./SardineCurrentContent";

export const revalidate = 3600;

const BASE_URL = "https://www.slowmorocco.com";
const SLUG = "sardine-current";
const CANONICAL = `${BASE_URL}/stories/${SLUG}`;

// ─────────────────────────────────────────────────────────────────────────────
// METADATA
// ─────────────────────────────────────────────────────────────────────────────

export const metadata: Metadata = {
  title: "The Sardine Current — From Galicia to Senegal, One Upwelling Feeds Eight Nations | Slow Morocco",
  description:
    "The Canary Current runs 5,000km from Portugal to Senegal. Morocco is the world's largest sardine exporter. Portugal's stocks collapsed 80%. Eight nations share one current, one fish, one crisis. Landings crashed 57% in three years. Frozen exports banned Feb 2026.",
  keywords: [
    "sardine Morocco", "Canary Current", "upwelling Morocco", "Morocco fishing",
    "sardine export ban Morocco", "Morocco canned sardines", "Safi sardines",
    "Agadir fishing", "Cape Ghir upwelling", "Portugal sardine collapse",
    "Senegal fishing", "West Africa fisheries", "Dakhla fishing",
    "sardine stock decline", "Morocco seafood industry", "Canary Current upwelling system",
  ],
  authors: [{ name: "J. Ng", url: `${BASE_URL}/about` }],
  alternates: { canonical: CANONICAL },
  openGraph: {
    title: "The Sardine Current — One Upwelling Feeds Eight Nations",
    description: "5,000km of cold, nutrient-rich water. Morocco cans half the world's sardines. Landings crashed 57%. The abundance era is ending.",
    url: CANONICAL,
    siteName: "Slow Morocco",
    locale: "en_GB",
    type: "article",
    authors: ["J. Ng"],
    tags: ["sardines", "fishing", "Morocco", "ocean", "Canary Current", "upwelling"],
  },
  twitter: {
    card: "summary_large_image",
    title: "The Sardine Current — One Upwelling Feeds Eight Nations",
    description: "5,000km of cold water. 8 nations. Morocco's sardine crisis mapped.",
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
      "headline": "The Sardine Current — From Galicia to Senegal, One Upwelling Feeds Eight Nations",
      "description": "The Canary Current runs 5,000km from Portugal to Senegal. Morocco is the world's largest sardine exporter — half of all canned sardines in global supermarkets. Landings crashed 57% in three years. Frozen exports banned Feb 2026.",
      "datePublished": "2025-01-01",
      "dateModified": new Date().toISOString().split("T")[0],
      "author": { "@type": "Person", "name": "J. Ng", "url": `${BASE_URL}/about` },
      "publisher": { "@type": "Organization", "name": "Slow Morocco", "url": BASE_URL },
      "mainEntityOfPage": CANONICAL,
      "keywords": "sardine Morocco, Canary Current, upwelling, Morocco fishing, sardine export ban, Safi, Agadir, Dakhla, Portugal sardine collapse, Senegal fisheries",
      "articleSection": "Ocean & Environment",
      "spatialCoverage": { "@type": "Place", "name": "Canary Current — Portugal to Senegal", "geo": { "@type": "GeoShape", "box": "10.0 -17.5 43.0 -1.0" } },
    },
    {
      "@type": "Dataset",
      "@id": `${CANONICAL}#dataset`,
      "name": "Canary Current Sardine Landings — Portugal & Morocco",
      "description": "Sardine landing data for Portugal (Iberian stock, ICES) and Morocco (national landings) from 2006 to 2025. Includes port-level data for Safi, Agadir, Tan-Tan, Laayoune, and Dakhla.",
      "url": CANONICAL,
      "creator": { "@type": "Organization", "name": "ICES / Morocco ONP / SeafoodSource" },
      "spatialCoverage": "Canary Current — Portugal to Senegal",
      "temporalCoverage": "2006/2025",
    },
    {
      "@type": "FAQPage",
      "@id": `${CANONICAL}#faq`,
      "mainEntity": [
        {
          "@type": "Question",
          "name": "Why did Morocco ban frozen sardine exports?",
          "acceptedAnswer": { "@type": "Answer", "text": "Morocco banned frozen sardine exports on February 1, 2026, after landings crashed from 965,000 tonnes (2022) to 525,000 (2024) to 419,000 (2025) — a 57% decline in three years. The ban aims to protect domestic supply and the canning industry, which processes 91% of its raw material from sardines." },
        },
        {
          "@type": "Question",
          "name": "What is the Canary Current?",
          "acceptedAnswer": { "@type": "Answer", "text": "The Canary Current is one of four major eastern boundary upwelling systems on Earth. It flows from 43°N off Galicia and Portugal southward along Morocco, Western Sahara, and Mauritania to roughly 10°N near Guinea-Bissau. Trade winds push surface water offshore; cold, nutrient-rich water rises to replace it, feeding one of the world's most productive fishing grounds." },
        },
        {
          "@type": "Question",
          "name": "How much of the world's sardines come from Morocco?",
          "acceptedAnswer": { "@type": "Answer", "text": "Morocco is the world's largest exporter of canned sardines, shipping 152,137 tonnes worth MAD 5.9 billion in 2022. Approximately half of all canned sardines in global supermarkets are Moroccan. Sardines account for 62% of Morocco's total fish catch." },
        },
      ],
    },
    {
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Slow Morocco", "item": BASE_URL },
        { "@type": "ListItem", "position": 2, "name": "Stories", "item": `${BASE_URL}/stories` },
        { "@type": "ListItem", "position": 3, "name": "The Sardine Current", "item": CANONICAL },
      ],
    },
  ],
};

// ─────────────────────────────────────────────────────────────────────────────
// PAGE
// ─────────────────────────────────────────────────────────────────────────────

export default function SardineCurrentPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <SardineCurrentContent />
    </>
  );
}
