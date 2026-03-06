import { Metadata } from "next";
import { MoroccanTeaContent } from "./MoroccanTeaContent";

export const revalidate = 3600;

const BASE_URL = "https://www.slowmorocco.com";
const SLUG = "moroccan-tea";
const CANONICAL = `${BASE_URL}/stories/${SLUG}`;

// ─────────────────────────────────────────────────────────────────────────────
// METADATA
// ─────────────────────────────────────────────────────────────────────────────

export const metadata: Metadata = {
  title: "The Anatomy of Moroccan Tea — Three Ingredients from Three Continents | Slow Morocco",
  description: "Chinese gunpowder green tea, Moroccan spearmint, sugar deepened by colonial economics. Morocco imports 60,000 tonnes of tea a year and grows none. The data behind the national drink.",
  keywords: ["Moroccan tea", "mint tea Morocco", "atay", "gunpowder green tea", "Moroccan culture", "tea ritual", "Morocco China tea trade"],
  authors: [{ name: "J. Ng", url: `${BASE_URL}/about` }],
  alternates: { canonical: CANONICAL },
  openGraph: {
    title: "The Anatomy of Moroccan Tea",
    description: "Three ingredients from three continents. 60,000 tonnes imported annually, none grown domestically. The data behind Morocco's national drink.",
    url: CANONICAL,
    siteName: "Slow Morocco",
    locale: "en_GB",
    type: "article",
    authors: ["J. Ng"],
    tags: ["Morocco", "tea", "culture", "food", "trade"],
  },
  twitter: {
    card: "summary_large_image",
    title: "The Anatomy of Moroccan Tea",
    description: "Three ingredients from three continents. 60,000 tonnes imported, none grown. The data behind atay.",
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
      "headline": "The Anatomy of Moroccan Tea — Three Ingredients from Three Continents",
      "description": "Chinese gunpowder green tea, Moroccan spearmint, sugar deepened by colonial economics. Morocco imports 60,000 tonnes of tea a year and grows none.",
      "datePublished": "2025-01-01",
      "dateModified": new Date().toISOString().split("T")[0],
      "author": { "@type": "Person", "name": "J. Ng", "url": `${BASE_URL}/about` },
      "publisher": { "@type": "Organization", "name": "Slow Morocco", "url": BASE_URL },
      "mainEntityOfPage": CANONICAL,
      "articleSection": "Food & Cultural Intelligence",
    },
    {
      "@type": "Dataset",
      "@id": `${CANONICAL}#dataset`,
      "name": "The Anatomy of Moroccan Tea — Trade & Consumption Data",
      "description": "Data on Morocco's tea imports, consumption patterns, and the cultural anatomy of atay. Sources include FAO, ITC, AMITC, and Statista.",
      "url": CANONICAL,
      "creator": { "@type": "Organization", "name": "FAO / ITC / AMITC / Statista" },
      "spatialCoverage": "Morocco, China, Zhejiang Province",
      "temporalCoverage": "1700/2025",
    },
    {
      "@type": "FAQPage",
      "@id": `${CANONICAL}#faq`,
      "mainEntity": [
        {
          "@type": "Question",
          "name": "What is Moroccan mint tea made of?",
          "acceptedAnswer": { "@type": "Answer", "text": "Moroccan mint tea (atay) is made from three ingredients: Chinese gunpowder green tea imported from Zhejiang Province, fresh spearmint (nanah) grown domestically, and sugar — traditionally from large hard cones (pain de sucre). Morocco imports approximately 60,000 tonnes of tea annually from China and grows none of its own." },
        },
        {
          "@type": "Question",
          "name": "How much tea does Morocco import?",
          "acceptedAnswer": { "@type": "Answer", "text": "Morocco imports approximately 60,000–82,000 tonnes of tea annually, 95% from China and predominantly from Zhejiang Province. Morocco absorbs 46% of China's gunpowder tea exports and 16% of all Chinese tea exports, making it China's single largest tea-export partner." },
        },
        {
          "@type": "Question",
          "name": "Why are three glasses of Moroccan tea served?",
          "acceptedAnswer": { "@type": "Answer", "text": "Three glasses is the traditional minimum. A Moroccan proverb explains: the first glass is gentle as life, the second strong as love, the third bitter as death. Refusing a glass is considered a discourtesy. The tea is served on a sinia (silver tray) in small decorated glasses, poured from height to produce foam (rghwa)." },
        },
      ],
    },
    {
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Slow Morocco", "item": BASE_URL },
        { "@type": "ListItem", "position": 2, "name": "Stories", "item": `${BASE_URL}/stories` },
        { "@type": "ListItem", "position": 3, "name": "The Anatomy of Moroccan Tea", "item": CANONICAL },
      ],
    },
  ],
};

// ─────────────────────────────────────────────────────────────────────────────
// PAGE
// ─────────────────────────────────────────────────────────────────────────────

export default function MoroccanTeaPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <MoroccanTeaContent />
    </>
  );
}
