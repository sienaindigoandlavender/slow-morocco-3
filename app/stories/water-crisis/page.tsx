import { Metadata } from "next";
import { WaterCrisisContent } from "./WaterCrisisContent";

export const revalidate = 3600;

const BASE_URL = "https://www.slowmorocco.com";
const SLUG = "water-crisis";
const CANONICAL = `${BASE_URL}/stories/${SLUG}`;

// ─────────────────────────────────────────────────────────────────────────────
// METADATA
// ─────────────────────────────────────────────────────────────────────────────

export const metadata: Metadata = {
  title: "Morocco's Water Crisis — Dam Recovery, Drought Data & Desalination Strategy | Slow Morocco",
  description: "Seven years of drought drained Morocco's dams to 28%. The rains of winter 2025–2026 refilled them to 70.7% in twelve months — a +155% recovery. But per-capita water has fallen from 2,560 m³ to ~500 m³ since the 1960s.",
  keywords: ["Morocco water crisis", "Morocco drought", "Morocco dam fill rate", "Morocco desalination", "Morocco water scarcity", "Morocco rainfall recovery", "Morocco water basins"],
  authors: [{ name: "J. Ng", url: `${BASE_URL}/about` }],
  alternates: { canonical: CANONICAL },
  openGraph: {
    title: "Morocco's Water Crisis — Dam Recovery & Desalination Strategy",
    description: "Seven years of drought drained the dams to 28%. Then +155% recovery in 12 months. But the structural crisis isn't over.",
    url: CANONICAL,
    siteName: "Slow Morocco",
    locale: "en_GB",
    type: "article",
    authors: ["J. Ng"],
    tags: ["Morocco", "water crisis", "drought", "desalination", "environment"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Morocco's Water Crisis — Dam Recovery & Desalination Strategy",
    description: "28% to 70.7% in 12 months. But per-capita water is still falling.",
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
      "headline": "Morocco's Water Crisis — Dam Recovery, Drought Data & Desalination Strategy",
      "description": "Seven years of drought drained Morocco's dams to 28%. The rains of winter 2025–2026 brought a +155% recovery. But per-capita water continues to fall.",
      "datePublished": "2025-01-01",
      "dateModified": new Date().toISOString().split("T")[0],
      "author": { "@type": "Person", "name": "J. Ng", "url": `${BASE_URL}/about` },
      "publisher": { "@type": "Organization", "name": "Slow Morocco", "url": BASE_URL },
      "mainEntityOfPage": CANONICAL,
      "articleSection": "Environment & Water",
    },
    {
      "@type": "Dataset",
      "@id": `${CANONICAL}#dataset`,
      "name": "Morocco Water Crisis — Dam Fill Rates, Basin Data & Desalination Projects",
      "description": "Dam fill rate history (2015–2026), water basin fill rates by region, desalination plant data, and rainfall recovery metrics. Sources include Ministry of Equipment and Water, World Bank, FAO AQUASTAT.",
      "url": CANONICAL,
      "creator": { "@type": "Organization", "name": "Ministry of Equipment and Water / World Bank / FAO AQUASTAT" },
      "spatialCoverage": "Morocco",
      "temporalCoverage": "2015/2026",
    },
    {
      "@type": "FAQPage",
      "@id": `${CANONICAL}#faq`,
      "mainEntity": [
        {
          "@type": "Question",
          "name": "What is Morocco's current dam fill rate?",
          "acceptedAnswer": { "@type": "Answer", "text": "As of February 2026, Morocco's national average dam fill rate is 70.7%, storing 11.86 billion cubic meters. This represents a +155% recovery from the 28% low in 2024, driven by exceptional rainfall in winter 2025–2026." },
        },
        {
          "@type": "Question",
          "name": "How long did Morocco's drought last?",
          "acceptedAnswer": { "@type": "Answer", "text": "Morocco experienced seven consecutive years of drought from 2018 to 2025. Dam fill rates declined from 72% in 2015 to a low of 28% in 2024. The drought was declared officially over on January 12, 2026 by Minister Nizar Baraka." },
        },
        {
          "@type": "Question",
          "name": "What is Morocco's desalination strategy?",
          "acceptedAnswer": { "@type": "Answer", "text": "Morocco has 17 desalination plants operating, 4 under construction, and 9 more planned. The government targets desalination to supply 50% of drinking water by 2030. The Casablanca SWRO mega-plant will be the world's largest powered entirely by renewable energy." },
        },
      ],
    },
    {
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Slow Morocco", "item": BASE_URL },
        { "@type": "ListItem", "position": 2, "name": "Stories", "item": `${BASE_URL}/stories` },
        { "@type": "ListItem", "position": 3, "name": "Morocco's Water Crisis", "item": CANONICAL },
      ],
    },
  ],
};

// ─────────────────────────────────────────────────────────────────────────────
// PAGE
// ─────────────────────────────────────────────────────────────────────────────

export default function WaterCrisisPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <WaterCrisisContent />
    </>
  );
}
