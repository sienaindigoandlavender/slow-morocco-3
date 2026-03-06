import { Metadata } from "next";
import { SolarCompassContent } from "./SolarCompassContent";

export const revalidate = 3600;

const BASE_URL = "https://www.slowmorocco.com";
const SLUG = "solar-compass";
const CANONICAL = `${BASE_URL}/stories/${SLUG}`;

// ─────────────────────────────────────────────────────────────────────────────
// METADATA
// ─────────────────────────────────────────────────────────────────────────────

export const metadata: Metadata = {
  title: "The Solar Compass — 580 MW of Concentrated Sunlight in the Saharan Foothills | Slow Morocco",
  description:
    "Noor-Ouarzazate is the world's largest concentrated solar plant: 580 MW, 3,000 hectares, 500,000 parabolic mirrors, 7,400 heliostats, and molten salt storage that generates electricity 7 hours after sunset. Morocco's renewable roadmap mapped.",
  keywords: [
    "Noor Ouarzazate", "Morocco solar energy", "concentrated solar power",
    "CSP Morocco", "molten salt storage", "parabolic trough", "solar tower",
    "Morocco renewable energy", "MASEN", "Ouarzazate solar plant",
    "Morocco energy mix", "Morocco 2030 energy target", "heliostats",
    "Noor I II III IV", "Morocco electricity", "Sahara solar",
  ],
  authors: [{ name: "J. Ng", url: `${BASE_URL}/about` }],
  alternates: { canonical: CANONICAL },
  openGraph: {
    title: "The Solar Compass — 580 MW of Concentrated Sunlight",
    description: "500,000 mirrors. 7,400 heliostats. Molten salt at 565°C. Morocco built a solar plant that generates electricity after dark.",
    url: CANONICAL,
    siteName: "Slow Morocco",
    locale: "en_GB",
    type: "article",
    authors: ["J. Ng"],
    tags: ["solar", "energy", "Morocco", "Ouarzazate", "CSP", "renewable"],
  },
  twitter: {
    card: "summary_large_image",
    title: "The Solar Compass — 580 MW of Concentrated Sunlight",
    description: "Noor-Ouarzazate: the world's largest CSP plant. Molten salt stores sunlight for 7 hours after dark.",
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
      "headline": "The Solar Compass — 580 MW of Concentrated Sunlight in the Saharan Foothills",
      "description": "Noor-Ouarzazate is the world's largest concentrated solar plant: 580 MW across four phases, with molten salt storage that generates electricity 7 hours after sunset. Morocco's renewable energy roadmap from 0.3 GW in 2009 to 10.5 GW target by 2030.",
      "datePublished": "2025-01-01",
      "dateModified": new Date().toISOString().split("T")[0],
      "author": { "@type": "Person", "name": "J. Ng", "url": `${BASE_URL}/about` },
      "publisher": { "@type": "Organization", "name": "Slow Morocco", "url": BASE_URL },
      "mainEntityOfPage": CANONICAL,
      "keywords": "Noor Ouarzazate, Morocco solar, CSP, concentrated solar power, molten salt, parabolic trough, solar tower, MASEN, Morocco renewable energy, heliostats",
      "articleSection": "Energy & Infrastructure",
      "spatialCoverage": { "@type": "Place", "name": "Ouarzazate, Morocco", "geo": { "@type": "GeoCoordinates", "latitude": 30.92, "longitude": -6.9 } },
    },
    {
      "@type": "Dataset",
      "@id": `${CANONICAL}#dataset`,
      "name": "Noor-Ouarzazate Solar Complex — Phase Data & Morocco Energy Mix",
      "description": "Phase-by-phase specifications for the Noor-Ouarzazate solar complex (capacity, storage, area, CO₂ offsets) plus Morocco's electricity mix 2023 and 2030 renewable targets.",
      "url": CANONICAL,
      "creator": { "@type": "Organization", "name": "MASEN / ANRE / IEA" },
      "spatialCoverage": "Ouarzazate, Morocco",
      "temporalCoverage": "2016/2030",
    },
    {
      "@type": "FAQPage",
      "@id": `${CANONICAL}#faq`,
      "mainEntity": [
        {
          "@type": "Question",
          "name": "How does Noor-Ouarzazate generate electricity after sunset?",
          "acceptedAnswer": { "@type": "Answer", "text": "Noor II and III use molten salt heated to 565°C by concentrated sunlight. The salt stores thermal energy and releases it through steam turbines for up to 7 hours after sunset, making CSP a dispatchable renewable energy source." },
        },
        {
          "@type": "Question",
          "name": "What is the total capacity of the Noor-Ouarzazate solar complex?",
          "acceptedAnswer": { "@type": "Answer", "text": "The complex has 580 MW across four phases: Noor I (160 MW parabolic trough), Noor II (200 MW parabolic trough), Noor III (150 MW solar tower), and Noor IV (72 MW photovoltaic). It covers approximately 3,000 hectares." },
        },
        {
          "@type": "Question",
          "name": "What is Morocco's renewable energy target for 2030?",
          "acceptedAnswer": { "@type": "Answer", "text": "Morocco targets 52% renewable electricity by 2030, requiring 10.5 GW of installed renewable capacity. As of 2023, renewables account for 40.7% of installed capacity (4.7 GW). The target includes 20% solar, 20% wind, and 12% hydro." },
        },
      ],
    },
    {
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Slow Morocco", "item": BASE_URL },
        { "@type": "ListItem", "position": 2, "name": "Stories", "item": `${BASE_URL}/stories` },
        { "@type": "ListItem", "position": 3, "name": "The Solar Compass", "item": CANONICAL },
      ],
    },
  ],
};

// ─────────────────────────────────────────────────────────────────────────────
// PAGE
// ─────────────────────────────────────────────────────────────────────────────

export default function SolarCompassPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <SolarCompassContent />
    </>
  );
}
