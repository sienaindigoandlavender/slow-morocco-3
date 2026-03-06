import { Metadata } from "next";
import { TourismFlowContent } from "./TourismFlowContent";

export const revalidate = 3600;

const BASE_URL = "https://www.slowmorocco.com";
const SLUG = "tourism-flow";
const CANONICAL = `${BASE_URL}/stories/${SLUG}`;

// ─────────────────────────────────────────────────────────────────────────────
// METADATA
// ─────────────────────────────────────────────────────────────────────────────

export const metadata: Metadata = {
  title: "Where 17.4 Million Tourists Go — Morocco Tourism Flow Visualization | Slow Morocco",
  description: "Follow the flow of 17.4 million visitors through Morocco — from source country to gateway airport to destination city. Interactive Sankey diagram with 2024 data on arrivals, overnight stays, and 112 billion MAD in tourism revenue.",
  keywords: ["Morocco tourism", "Morocco visitors 2024", "Morocco tourism flow", "Marrakech tourism", "Morocco airports", "Morocco overnight stays", "Morocco tourism revenue", "MRE diaspora"],
  authors: [{ name: "J. Ng", url: `${BASE_URL}/about` }],
  alternates: { canonical: CANONICAL },
  openGraph: {
    title: "Where 17.4 Million Tourists Go — Morocco Tourism Flow",
    description: "Source country → gateway → destination. 17.4M visitors, 112B MAD revenue, 28.7M overnight stays. Interactive flow visualization.",
    url: CANONICAL,
    siteName: "Slow Morocco",
    locale: "en_GB",
    type: "article",
    authors: ["J. Ng"],
    tags: ["Morocco", "tourism", "data visualization", "Sankey diagram", "travel"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Where 17.4 Million Tourists Go — Morocco Tourism Flow",
    description: "Source country → gateway → destination. Interactive flow visualization of Morocco's 2024 tourism data.",
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
      "headline": "Where 17.4 Million Tourists Go — Morocco Tourism Flow Visualization",
      "description": "Follow the flow of 17.4 million visitors through Morocco — from source country to gateway airport to destination city.",
      "datePublished": "2025-01-01",
      "dateModified": new Date().toISOString().split("T")[0],
      "author": { "@type": "Person", "name": "J. Ng", "url": `${BASE_URL}/about` },
      "publisher": { "@type": "Organization", "name": "Slow Morocco", "url": BASE_URL },
      "mainEntityOfPage": CANONICAL,
      "articleSection": "Tourism Intelligence",
    },
    {
      "@type": "Dataset",
      "@id": `${CANONICAL}#dataset`,
      "name": "Morocco Tourism Flow — 2024 Visitor Arrivals, Gateways & Destinations",
      "description": "Comprehensive dataset of Morocco's 2024 tourism flows: 17.4M visitors (8.8M foreign + 8.6M diaspora), gateway airports, destination cities, and 112B MAD revenue breakdown. Sources include Ministry of Tourism, ONDA, Office des Changes, and Observatoire du Tourisme.",
      "url": CANONICAL,
      "creator": { "@type": "Organization", "name": "Ministère du Tourisme / ONDA / Office des Changes" },
      "spatialCoverage": "Morocco",
      "temporalCoverage": "2024",
    },
    {
      "@type": "FAQPage",
      "@id": `${CANONICAL}#faq`,
      "mainEntity": [
        {
          "@type": "Question",
          "name": "How many tourists visited Morocco in 2024?",
          "acceptedAnswer": { "@type": "Answer", "text": "Morocco welcomed 17.4 million visitors in 2024, comprising 8.8 million foreign tourists and 8.6 million Moroccan diaspora (MRE). This made Morocco Africa's most-visited nation, surpassing Egypt for the first time." },
        },
        {
          "@type": "Question",
          "name": "What is Morocco's tourism revenue?",
          "acceptedAnswer": { "@type": "Answer", "text": "Morocco's tourism revenue hit 112 billion MAD ($11.3 billion) in 2024, up 43% from pre-pandemic levels. The largest spending categories are accommodation (30%), food & drink (20%), and transport (15%)." },
        },
        {
          "@type": "Question",
          "name": "Which city in Morocco receives the most tourists?",
          "acceptedAnswer": { "@type": "Answer", "text": "Marrakech dominates with 40% of all overnight stays in Morocco — 11.5 million out of 28.7 million total. Agadir is second with 20%, followed by Casablanca at 11%." },
        },
      ],
    },
    {
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Slow Morocco", "item": BASE_URL },
        { "@type": "ListItem", "position": 2, "name": "Stories", "item": `${BASE_URL}/stories` },
        { "@type": "ListItem", "position": 3, "name": "Tourism Flow", "item": CANONICAL },
      ],
    },
  ],
};

// ─────────────────────────────────────────────────────────────────────────────
// PAGE
// ─────────────────────────────────────────────────────────────────────────────

export default function TourismFlowPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <TourismFlowContent />
    </>
  );
}
