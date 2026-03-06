import { Metadata } from "next";
import { WaterEquationContent } from "./WaterEquationContent";

export const revalidate = 3600;

const BASE_URL = "https://www.slowmorocco.com";
const SLUG = "water-equation";
const CANONICAL = `${BASE_URL}/stories/${SLUG}`;

// ─────────────────────────────────────────────────────────────────────────────
// METADATA
// ─────────────────────────────────────────────────────────────────────────────

export const metadata: Metadata = {
  title: "The Water Equation — Morocco's Water Crisis in One Page | Slow Morocco",
  description:
    "Morocco built 153 large dams in 65 years — more than any country in Africa. Seven consecutive drought years drained reservoirs to 28%. Aquifers dropping 2m/year. 17 desalination plants operational. A $45B National Water Plan. The crisis mapped.",
  keywords: [
    "Morocco water crisis", "Morocco dams", "Morocco drought", "Morocco desalination",
    "Morocco aquifer depletion", "Casablanca desalination plant", "Morocco water scarcity",
    "Oum Er-Rbia basin", "Souss aquifer", "Morocco National Water Plan",
    "Morocco reservoir fill rate", "Hassan II dam policy", "Morocco water infrastructure",
    "Agadir desalination", "Morocco groundwater", "Morocco water data",
  ],
  authors: [{ name: "J. Ng", url: `${BASE_URL}/about` }],
  alternates: { canonical: CANONICAL },
  openGraph: {
    title: "The Water Equation — Morocco's Water Crisis in One Page",
    description: "153 dams. 7 drought years. Reservoirs at 28%. Aquifers dropping 2m/year. 17 desalination plants. The race between depletion and infrastructure.",
    url: CANONICAL,
    siteName: "Slow Morocco",
    locale: "en_GB",
    type: "article",
    authors: ["J. Ng"],
    tags: ["water", "Morocco", "dams", "desalination", "drought", "aquifer", "crisis"],
  },
  twitter: {
    card: "summary_large_image",
    title: "The Water Equation — Morocco's Water Crisis in One Page",
    description: "153 dams. 7 drought years. 28% reservoir fill. The equation broke. Morocco's water crisis mapped.",
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
      "headline": "The Water Equation — Morocco's Water Crisis in One Page",
      "description": "Morocco built 153 large dams in 65 years. Seven consecutive drought years drained reservoirs to 28%. Aquifers dropping 2m/year. 17 desalination plants operational, 4 under construction. A $45 billion National Water Plan. The race between depletion and infrastructure.",
      "datePublished": "2025-01-01",
      "dateModified": new Date().toISOString().split("T")[0],
      "author": { "@type": "Person", "name": "J. Ng", "url": `${BASE_URL}/about` },
      "publisher": { "@type": "Organization", "name": "Slow Morocco", "url": BASE_URL },
      "mainEntityOfPage": CANONICAL,
      "keywords": "Morocco water crisis, Morocco dams, drought, desalination, aquifer depletion, Oum Er-Rbia, Souss, National Water Plan",
      "articleSection": "Water & Environment",
      "spatialCoverage": { "@type": "Place", "name": "Morocco", "geo": { "@type": "GeoShape", "box": "27.6 -13.2 35.9 -1.0" } },
    },
    {
      "@type": "Dataset",
      "@id": `${CANONICAL}#dataset`,
      "name": "Morocco Water Infrastructure — Dams, Basins, Aquifers & Desalination",
      "description": "Dam capacity growth 1960–2025, reservoir fill rates 2010–2025, aquifer depletion for 5 major aquifers, river basin fill rates for 9 basins, and desalination plant capacity for 7 facilities.",
      "url": CANONICAL,
      "creator": { "@type": "Organization", "name": "Morocco Ministry of Equipment and Water / World Bank" },
      "spatialCoverage": "Morocco",
      "temporalCoverage": "1960/2026",
    },
    {
      "@type": "FAQPage",
      "@id": `${CANONICAL}#faq`,
      "mainEntity": [
        {
          "@type": "Question",
          "name": "How many large dams does Morocco have?",
          "acceptedAnswer": { "@type": "Answer", "text": "Morocco has 153 large dams with a combined storage capacity of 20 billion cubic metres, with 16 more under construction. Morocco has built more large dams than any other country in Africa." },
        },
        {
          "@type": "Question",
          "name": "What caused Morocco's water crisis?",
          "acceptedAnswer": { "@type": "Answer", "text": "Seven consecutive drought years (2018–2024) drained Morocco's reservoirs to 28% capacity by 2024. Aquifers have dropped 20 to 65 metres over 30–60 years due to over-extraction, primarily for agriculture which uses 80% of Morocco's water. Climate change is reducing renewable water supply while demand grows." },
        },
        {
          "@type": "Question",
          "name": "How is Morocco addressing its water crisis?",
          "acceptedAnswer": { "@type": "Answer", "text": "Morocco has 17 desalination plants operational and 4 under construction, including the largest in Africa (Casablanca, 548K m³/day). The target is 1.7 billion m³ of desalinated water per year by 2030. A $45 billion National Water Plan (2020–2050) covers desalination, dam construction, water reuse, and irrigation modernisation." },
        },
      ],
    },
    {
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Slow Morocco", "item": BASE_URL },
        { "@type": "ListItem", "position": 2, "name": "Stories", "item": `${BASE_URL}/stories` },
        { "@type": "ListItem", "position": 3, "name": "The Water Equation", "item": CANONICAL },
      ],
    },
  ],
};

// ─────────────────────────────────────────────────────────────────────────────
// PAGE
// ─────────────────────────────────────────────────────────────────────────────

export default function WaterEquationPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <WaterEquationContent />
    </>
  );
}
