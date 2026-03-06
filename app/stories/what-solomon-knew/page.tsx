import { Metadata } from "next";
import { WhatSolomonKnewContent } from "./WhatSolomonKnewContent";

export const revalidate = 3600;

const BASE_URL = "https://www.slowmorocco.com";
const SLUG = "what-solomon-knew";
const CANONICAL = `${BASE_URL}/stories/${SLUG}`;

// ─────────────────────────────────────────────────────────────────────────────
// METADATA
// ─────────────────────────────────────────────────────────────────────────────

export const metadata: Metadata = {
  title: "What Solomon Knew — The Unified Knowledge System Before the Disciplines Fractured | Slow Morocco",
  description:
    "Before the disciplines fractured, one man held the whole map. Nine domains of knowledge — from cosmology to pharmacology — laid out in the Wisdom of Solomon. The Testament of Solomon as a diagnostic manual. Josephus as eyewitness. The fracture timeline from 500 BCE to now.",
  keywords: [
    "Solomon knowledge", "Wisdom of Solomon", "Testament of Solomon",
    "ancient knowledge systems", "unified knowledge", "nine domains",
    "cosmology pharmacology", "systems thinking", "Josephus exorcism",
    "Solomonic tradition", "Islamic Golden Age", "ethnobotany",
    "ancient medicine", "diagnostic demonology", "knowledge history",
  ],
  authors: [{ name: "J. Ng", url: `${BASE_URL}/about` }],
  alternates: { canonical: CANONICAL },
  openGraph: {
    title: "What Solomon Knew — The Unified Knowledge System",
    description: "Nine domains of knowledge. One unified system. Before the disciplines fractured, one man held the whole map.",
    url: CANONICAL,
    siteName: "Slow Morocco",
    locale: "en_GB",
    type: "article",
    authors: ["J. Ng"],
    tags: ["Solomon", "knowledge systems", "ancient wisdom", "ethnobotany", "cosmology", "pharmacology"],
  },
  twitter: {
    card: "summary_large_image",
    title: "What Solomon Knew — The Unified Knowledge System",
    description: "Nine domains of knowledge. One unified system. Before the disciplines fractured, one man held the whole map.",
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
      "headline": "What Solomon Knew — The Unified Knowledge System Before the Disciplines Fractured",
      "description": "Before the disciplines fractured, one man held the whole map. Nine domains of knowledge — from cosmology to pharmacology — laid out in the Wisdom of Solomon. The Testament of Solomon as a diagnostic manual. Josephus as eyewitness.",
      "datePublished": "2025-01-01",
      "dateModified": new Date().toISOString().split("T")[0],
      "author": { "@type": "Person", "name": "J. Ng", "url": `${BASE_URL}/about` },
      "publisher": { "@type": "Organization", "name": "Slow Morocco", "url": BASE_URL },
      "mainEntityOfPage": CANONICAL,
      "keywords": "Solomon, Wisdom of Solomon, Testament of Solomon, ancient knowledge systems, unified knowledge, cosmology, pharmacology, systems thinking, Josephus, Islamic Golden Age",
      "articleSection": "Knowledge & Cultural Intelligence",
    },
    {
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Slow Morocco", "item": BASE_URL },
        { "@type": "ListItem", "position": 2, "name": "Stories", "item": `${BASE_URL}/stories` },
        { "@type": "ListItem", "position": 3, "name": "What Solomon Knew", "item": CANONICAL },
      ],
    },
  ],
};

// ─────────────────────────────────────────────────────────────────────────────
// PAGE
// ─────────────────────────────────────────────────────────────────────────────

export default function WhatSolomonKnewPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <WhatSolomonKnewContent />
    </>
  );
}
