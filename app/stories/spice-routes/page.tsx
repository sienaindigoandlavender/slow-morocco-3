import { Metadata } from "next";
import { SpiceRoutesContent } from "./SpiceRoutesContent";

export const revalidate = 3600;

const BASE_URL = "https://www.slowmorocco.com";
const SLUG = "spice-routes";
const CANONICAL = `${BASE_URL}/stories/${SLUG}`;

// ─────────────────────────────────────────────────────────────────────────────
// METADATA
// ─────────────────────────────────────────────────────────────────────────────

export const metadata: Metadata = {
  title: "The Spice Routes — 14 Spices, 60,000 Tons, Rivers of Colour | Slow Morocco",
  description: "Every tagine is a trade route. 14 spices mapped from origin to souk to plate — saffron from Taliouine, cumin from Alnif, cinnamon from Sri Lanka via Arab maritime networks a thousand years old.",
  keywords: ["Morocco spices", "spice routes", "Moroccan cuisine", "ras el hanout", "saffron Taliouine", "Moroccan souk", "spice trade", "cumin Alnif", "Moroccan food"],
  authors: [{ name: "J. Ng", url: `${BASE_URL}/about` }],
  alternates: { canonical: CANONICAL },
  openGraph: {
    title: "The Spice Routes — 14 Spices, 60,000 Tons, Rivers of Colour",
    description: "Every tagine is a trade route. 14 spices mapped from origin to souk to plate.",
    url: CANONICAL,
    siteName: "Slow Morocco",
    locale: "en_GB",
    type: "article",
    authors: ["J. Ng"],
    tags: ["Morocco", "spices", "cuisine", "trade routes", "saffron", "ras el hanout"],
  },
  twitter: {
    card: "summary_large_image",
    title: "The Spice Routes — 14 Spices, 60,000 Tons",
    description: "Every tagine is a trade route. 14 spices mapped from origin to plate.",
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
      "headline": "The Spice Routes — 14 Spices, 60,000 Tons, Rivers of Colour",
      "description": "Every tagine is a trade route. 14 spices mapped from origin to souk to plate — saffron from Taliouine, cumin from Alnif, cinnamon from Sri Lanka.",
      "datePublished": "2025-01-01",
      "dateModified": new Date().toISOString().split("T")[0],
      "author": { "@type": "Person", "name": "J. Ng", "url": `${BASE_URL}/about` },
      "publisher": { "@type": "Organization", "name": "Slow Morocco", "url": BASE_URL },
      "mainEntityOfPage": CANONICAL,
      "articleSection": "Food & Culture",
    },
    {
      "@type": "Dataset",
      "@id": `${CANONICAL}#dataset`,
      "name": "Morocco Spice Routes — 14 Core Spices",
      "description": "Dataset of 14 core Moroccan spices with origins, trade routes, prices (origin/souk/Europe), volumes, seasonality, and culinary uses. Includes ras el hanout composition.",
      "url": CANONICAL,
      "creator": { "@type": "Organization", "name": "ONSSA / FAO / Field Research" },
      "spatialCoverage": "Morocco, Indian Ocean, East Africa, South Asia",
      "temporalCoverage": "2024/2025",
    },
    {
      "@type": "FAQPage",
      "@id": `${CANONICAL}#faq`,
      "mainEntity": [
        {
          "@type": "Question",
          "name": "What are the most important spices in Moroccan cuisine?",
          "acceptedAnswer": { "@type": "Answer", "text": "Morocco's cuisine relies on 14 core spices. Eight are grown domestically — cumin (Alnif), paprika (Béni Mellal), saffron (Taliouine), coriander (Meknes), anise, caraway, fenugreek, and mint. Six are imported via Indian Ocean trade routes: black pepper, turmeric, ginger, cinnamon, cloves, and nutmeg." },
        },
        {
          "@type": "Question",
          "name": "What is ras el hanout?",
          "acceptedAnswer": { "@type": "Answer", "text": "Ras el hanout means 'head of the shop' — it is the master spice blend of Moroccan cuisine, typically containing 17 or more ingredients. Every attar (spice merchant) has a unique recipe, but common ingredients include cumin, coriander, turmeric, paprika, black pepper, ginger, cinnamon, nutmeg, cloves, cardamom, and rose petals." },
        },
        {
          "@type": "Question",
          "name": "Where does Moroccan saffron come from?",
          "acceptedAnswer": { "@type": "Answer", "text": "90% of Moroccan saffron comes from Taliouine in the Anti-Atlas mountains. It takes 200,000 flowers to produce one kilogram. Taliouine saffron has PDO (Protected Designation of Origin) status. It costs around $2,000/kg at origin and up to $5,000/kg in Paris." },
        },
      ],
    },
    {
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Slow Morocco", "item": BASE_URL },
        { "@type": "ListItem", "position": 2, "name": "Stories", "item": `${BASE_URL}/stories` },
        { "@type": "ListItem", "position": 3, "name": "The Spice Routes", "item": CANONICAL },
      ],
    },
  ],
};

// ─────────────────────────────────────────────────────────────────────────────
// PAGE
// ─────────────────────────────────────────────────────────────────────────────

export default function SpiceRoutesPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <SpiceRoutesContent />
    </>
  );
}
