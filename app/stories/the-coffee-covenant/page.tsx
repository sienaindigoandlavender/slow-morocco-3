import { Metadata } from "next";
import { TheCoffeeCovenantContent } from "./TheCoffeeCovenantContent";

export const revalidate = 3600;

const BASE_URL = "https://www.slowmorocco.com";
const SLUG = "the-coffee-covenant";
const CANONICAL = `${BASE_URL}/stories/${SLUG}`;

// ─────────────────────────────────────────────────────────────────────────────
// METADATA
// ─────────────────────────────────────────────────────────────────────────────

export const metadata: Metadata = {
  title: "The Coffee Covenant — From Kaffa to the World | Slow Morocco",
  description: "Every commercial coffee plant on Earth descends from seeds stolen from Ethiopia. The $485-billion global industry traced from Kaffa's wild forests through the buna ceremony to your cup.",
  keywords: ["Ethiopian coffee", "coffee origins", "Kaffa", "buna ceremony", "coffee history", "Arabica", "Yirgacheffe", "coffee trade", "stolen genetics"],
  authors: [{ name: "J. Ng", url: `${BASE_URL}/about` }],
  alternates: { canonical: CANONICAL },
  openGraph: {
    title: "The Coffee Covenant — From Kaffa to the World",
    description: "Every commercial coffee plant on Earth descends from seeds stolen from Ethiopia. The buna ceremony — three cups, two hours — is a social technology older than any café.",
    url: CANONICAL,
    siteName: "Slow Morocco",
    locale: "en_GB",
    type: "article",
    authors: ["J. Ng"],
    tags: ["Ethiopia", "coffee", "Kaffa", "buna ceremony", "Arabica", "trade history"],
  },
  twitter: {
    card: "summary_large_image",
    title: "The Coffee Covenant — From Kaffa to the World",
    description: "Every commercial coffee plant on Earth descends from seeds stolen from Ethiopia.",
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
      "headline": "The Coffee Covenant — From Kaffa to the World",
      "description": "Every commercial coffee plant on Earth descends from seeds stolen from Ethiopia. The $485-billion global industry traced from Kaffa's wild forests through the buna ceremony to your cup.",
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
      "name": "The Coffee Covenant — Ethiopian Coffee & Global Production",
      "description": "Dataset covering Ethiopian coffee regions, global production figures, the buna ceremony, and the historical timeline of coffee's spread from Kaffa to the world via colonial theft.",
      "url": CANONICAL,
      "creator": { "@type": "Organization", "name": "ECTA / USDA FAS / ICO / FAO" },
      "spatialCoverage": "Ethiopia, Yemen, Global",
      "temporalCoverage": "850/2025",
    },
    {
      "@type": "FAQPage",
      "@id": `${CANONICAL}#faq`,
      "mainEntity": [
        {
          "@type": "Question",
          "name": "Where did coffee originate?",
          "acceptedAnswer": { "@type": "Answer", "text": "Coffee (Coffea arabica) is native to the highlands of southwestern Ethiopia, specifically the Kaffa region — from which the word 'coffee' derives. The plant still grows wild there in cloud forests between 1,500 and 2,100 metres altitude. Ethiopia remains the only top-producing country where coffee is indigenous." },
        },
        {
          "@type": "Question",
          "name": "What is the Ethiopian buna ceremony?",
          "acceptedAnswer": { "@type": "Answer", "text": "The buna ceremony is Ethiopia's traditional coffee ritual. Green beans are roasted over charcoal, ground by hand, and brewed three times in a clay jebena. The three cups — Abol (strongest), Tona (balanced), and Baraka (the blessing) — are served over approximately two hours. The ceremony is social technology: the third cup is considered the most important, carrying blessings." },
        },
        {
          "@type": "Question",
          "name": "How did coffee spread from Ethiopia to the rest of the world?",
          "acceptedAnswer": { "@type": "Answer", "text": "Coffee spread through a series of thefts. Sufi monks brought it to Yemen by the 15th century. The Dutch stole a plant from the port of Mocha in 1616 and planted stolen seedlings in Java in 1696. The French acquired plants from the Dutch, and Gabriel de Clieu smuggled one to Martinique in 1723. Brazil obtained its first coffee plants from French Guiana in 1727. Every commercial coffee plant on Earth descends from these stolen Ethiopian genetics." },
        },
      ],
    },
    {
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Slow Morocco", "item": BASE_URL },
        { "@type": "ListItem", "position": 2, "name": "Stories", "item": `${BASE_URL}/stories` },
        { "@type": "ListItem", "position": 3, "name": "The Coffee Covenant", "item": CANONICAL },
      ],
    },
  ],
};

// ─────────────────────────────────────────────────────────────────────────────
// PAGE
// ─────────────────────────────────────────────────────────────────────────────

export default function TheCoffeeCovenantPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <TheCoffeeCovenantContent />
    </>
  );
}
