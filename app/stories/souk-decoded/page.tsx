import { Metadata } from "next";
import { SoukDecodedContent } from "./SoukDecodedContent";

export const revalidate = 3600;

const BASE_URL = "https://www.slowmorocco.com";
const SLUG = "souk-decoded";
const CANONICAL = `${BASE_URL}/stories/${SLUG}`;

// ─────────────────────────────────────────────────────────────────────────────
// METADATA
// ─────────────────────────────────────────────────────────────────────────────

export const metadata: Metadata = {
  title: "The Souk Decoded — How a Moroccan Market Works | Slow Morocco",
  description: "A Moroccan souk is a thousand-year-old operating system — guilds, elected leaders, spatial rules, and a negotiation protocol that both parties know by heart. 18 named souks, 2,600+ artisan shops, decoded.",
  keywords: ["Moroccan souk", "Marrakech souk", "souk guide", "Moroccan market", "souk guilds", "souk negotiation", "medina market", "Marrakech medina"],
  authors: [{ name: "J. Ng", url: `${BASE_URL}/about` }],
  alternates: { canonical: CANONICAL },
  openGraph: {
    title: "The Souk Decoded — How a Moroccan Market Works",
    description: "18 named souks. 2,600+ artisan shops. Guilds, spatial logic, and negotiation protocol — decoded.",
    url: CANONICAL,
    siteName: "Slow Morocco",
    locale: "en_GB",
    type: "article",
    authors: ["J. Ng"],
    tags: ["Morocco", "souk", "Marrakech", "medina", "guilds", "artisans"],
  },
  twitter: {
    card: "summary_large_image",
    title: "The Souk Decoded — How a Moroccan Market Works",
    description: "18 named souks. 2,600+ shops. A thousand-year-old operating system, decoded.",
  },
  robots: {
    index: true, follow: true,
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
      "headline": "The Souk Decoded — How a Moroccan Market Works",
      "description": "A Moroccan souk is a thousand-year-old operating system — guilds, elected leaders, spatial rules, and a negotiation protocol decoded.",
      "datePublished": "2025-01-01",
      "dateModified": new Date().toISOString().split("T")[0],
      "author": { "@type": "Person", "name": "J. Ng", "url": `${BASE_URL}/about` },
      "publisher": { "@type": "Organization", "name": "Slow Morocco", "url": BASE_URL },
      "mainEntityOfPage": CANONICAL,
      "articleSection": "Urban Intelligence",
    },
    {
      "@type": "Dataset",
      "@id": `${CANONICAL}#dataset`,
      "name": "The Souk Decoded — Marrakech Market Data",
      "description": "Dataset covering 18 named souk sections, guild hierarchy, spatial logic rules, negotiation protocol, and economic data for Marrakech medina. Sources include field documentation, guild records, and cultural ethnography.",
      "url": CANONICAL,
      "creator": { "@type": "Organization", "name": "Field documentation / HCP Morocco" },
      "spatialCoverage": "Marrakech, Morocco",
      "temporalCoverage": "2024/2026",
    },
    {
      "@type": "FAQPage",
      "@id": `${CANONICAL}#faq`,
      "mainEntity": [
        {
          "@type": "Question",
          "name": "How are Moroccan souks organized?",
          "acceptedAnswer": { "@type": "Answer", "text": "Moroccan souks follow a spatial logic developed over centuries: the most valuable goods (gold, spices) occupy the protected center near the mosque and kissaria, while smelly trades (tanneries, dyers) are placed at the edges. Similar trades cluster together under the guild (hanta) system, and food markets are positioned near medina gates for daily access." },
        },
        {
          "@type": "Question",
          "name": "What is the guild system in a Moroccan souk?",
          "acceptedAnswer": { "@type": "Answer", "text": "Every souk trade is organized into a guild (hanta) with five ranks: Amine (elected guild leader), Mohtasib (market inspector), Maalem (master craftsman), Sanayi (journeyman), and Moutaallim (apprentice). The Amine arbitrates disputes, sets quality standards, and represents the trade to city authorities. This system still functions in Marrakech and Fes." },
        },
        {
          "@type": "Question",
          "name": "How does negotiation work in a Moroccan souk?",
          "acceptedAnswer": { "@type": "Answer", "text": "Souk negotiation follows a seven-step protocol: greeting (salam), browsing, the vendor's first price (typically 2-3x final price), your counter-offer (30-50% of asking), the negotiation dance, the walk-away test, and the handshake agreement. It is a structured ritual, not haggling — both parties know the protocol." },
        },
      ],
    },
    {
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Slow Morocco", "item": BASE_URL },
        { "@type": "ListItem", "position": 2, "name": "Stories", "item": `${BASE_URL}/stories` },
        { "@type": "ListItem", "position": 3, "name": "The Souk Decoded", "item": CANONICAL },
      ],
    },
  ],
};

// ─────────────────────────────────────────────────────────────────────────────
// PAGE
// ─────────────────────────────────────────────────────────────────────────────

export default function SoukDecodedPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <SoukDecodedContent />
    </>
  );
}
