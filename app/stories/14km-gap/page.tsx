import { Metadata } from "next";
import FourteenKmGapContent from "./FourteenKmGapContent";

export const revalidate = 3600;

const BASE_URL = "https://www.slowmorocco.com";
const SLUG = "14km-gap";
const CANONICAL = `${BASE_URL}/stories/${SLUG}`;

// ─────────────────────────────────────────────────────────────────────────────
// METADATA
// ─────────────────────────────────────────────────────────────────────────────

export const metadata: Metadata = {
  title: "The 14km Gap — Morocco vs Spain: 18 Metrics Across the Strait of Gibraltar | Slow Morocco",
  description: "Morocco and Spain are separated by 14 kilometres of water. The distance between their economies is measured in multiples. GDP, life expectancy, tourism, infrastructure — 18 metrics compared.",
  keywords: ["Morocco Spain comparison", "Strait of Gibraltar", "Morocco GDP", "Morocco vs Spain", "14km gap", "Morocco economy", "Spain Morocco divide"],
  authors: [{ name: "J. Ng", url: `${BASE_URL}/about` }],
  alternates: { canonical: CANONICAL },
  openGraph: {
    title: "The 14km Gap — Morocco vs Spain Compared",
    description: "14 kilometres of water. 5.3× GDP gap. 18 metrics compared across the Strait of Gibraltar.",
    url: CANONICAL,
    siteName: "Slow Morocco",
    locale: "en_GB",
    type: "article",
    authors: ["J. Ng"],
    tags: ["Morocco", "Spain", "economy", "comparison", "Strait of Gibraltar"],
  },
  twitter: {
    card: "summary_large_image",
    title: "The 14km Gap — Morocco vs Spain Compared",
    description: "14km of water. 5.3× GDP gap. 18 metrics across the Strait.",
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
      "headline": "The 14km Gap — Morocco vs Spain: 18 Metrics Across the Strait of Gibraltar",
      "description": "Morocco and Spain are separated by 14 kilometres. The distance between their economies is measured in multiples.",
      "datePublished": "2025-01-01",
      "dateModified": new Date().toISOString().split("T")[0],
      "author": { "@type": "Person", "name": "J. Ng", "url": `${BASE_URL}/about` },
      "publisher": { "@type": "Organization", "name": "Slow Morocco", "url": BASE_URL },
      "mainEntityOfPage": CANONICAL,
      "articleSection": "Economy & Society",
    },
    {
      "@type": "Dataset",
      "@id": `${CANONICAL}#dataset`,
      "name": "Morocco vs Spain — 18 Comparative Metrics",
      "description": "Comparative dataset of 18 metrics across economy, demographics, infrastructure, and society for Morocco and Spain. Sources include IMF, WHO, World Bank, UNWTO, and national statistics offices.",
      "url": CANONICAL,
      "creator": { "@type": "Organization", "name": "IMF / WHO / World Bank / UNWTO" },
      "spatialCoverage": "Morocco, Spain, Strait of Gibraltar",
      "temporalCoverage": "2024/2025",
    },
    {
      "@type": "FAQPage",
      "@id": `${CANONICAL}#faq`,
      "mainEntity": [
        {
          "@type": "Question",
          "name": "How far apart are Morocco and Spain?",
          "acceptedAnswer": { "@type": "Answer", "text": "Morocco and Spain are separated by just 14 kilometres across the Strait of Gibraltar. On a clear day, you can see one country from the other. Despite this proximity, the economic gap between the two countries is measured in multiples — GDP per capita is 5.3× higher in Spain." },
        },
        {
          "@type": "Question",
          "name": "What is the GDP gap between Morocco and Spain?",
          "acceptedAnswer": { "@type": "Answer", "text": "Spain's GDP per capita (PPP) is approximately $46,400 compared to Morocco's $8,800 — a ratio of 5.3×. Spain's total GDP is $1,582 billion versus Morocco's $183 billion, a ratio of 8.6×." },
        },
        {
          "@type": "Question",
          "name": "In what areas does Morocco outperform Spain?",
          "acceptedAnswer": { "@type": "Answer", "text": "Morocco outperforms Spain in several areas: education spending as a share of GDP (6.8% vs 4.6%), mobile phone subscriptions per 100 people (137 vs 117), birth rate (16.8 vs 7.1 per 1,000), and lower public debt-to-GDP ratio (69.5% vs 107.7%). Morocco also has Africa's only high-speed rail line." },
        },
      ],
    },
    {
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Slow Morocco", "item": BASE_URL },
        { "@type": "ListItem", "position": 2, "name": "Stories", "item": `${BASE_URL}/stories` },
        { "@type": "ListItem", "position": 3, "name": "The 14km Gap", "item": CANONICAL },
      ],
    },
  ],
};

// ─────────────────────────────────────────────────────────────────────────────
// PAGE
// ─────────────────────────────────────────────────────────────────────────────

export default function FourteenKmGapPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <FourteenKmGapContent />
    </>
  );
}
