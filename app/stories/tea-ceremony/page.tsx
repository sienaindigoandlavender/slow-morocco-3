import { Metadata } from "next";
import { TeaCeremonyContent } from "./TeaCeremonyContent";

export const revalidate = 3600;

const BASE_URL = "https://www.slowmorocco.com";
const SLUG = "tea-ceremony";
const CANONICAL = `${BASE_URL}/stories/${SLUG}`;

// ─────────────────────────────────────────────────────────────────────────────
// METADATA
// ─────────────────────────────────────────────────────────────────────────────

export const metadata: Metadata = {
  title: "The Tea Ceremony Topology — Three Glasses, One Pot, the Architecture of Moroccan Hospitality | Slow Morocco",
  description: "Six steps, three glasses, one proverb. Morocco imports 82,000 tonnes of Chinese gunpowder green tea annually. The data, ritual, and regional variation behind the Moroccan tea ceremony.",
  keywords: ["Moroccan tea ceremony", "mint tea Morocco", "atay", "gunpowder green tea", "three glasses", "Moroccan hospitality", "tea ritual", "sugar mint ratio"],
  authors: [{ name: "J. Ng", url: `${BASE_URL}/about` }],
  alternates: { canonical: CANONICAL },
  openGraph: {
    title: "The Tea Ceremony Topology",
    description: "Three glasses. One pot. Six steps. 82,000 tonnes of Chinese gunpowder tea. The architecture of Moroccan hospitality, mapped.",
    url: CANONICAL,
    siteName: "Slow Morocco",
    locale: "en_GB",
    type: "article",
    authors: ["J. Ng"],
    tags: ["Morocco", "tea", "culture", "hospitality", "ceremony"],
  },
  twitter: {
    card: "summary_large_image",
    title: "The Tea Ceremony Topology",
    description: "Three glasses. One pot. The architecture of Moroccan hospitality, mapped.",
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
      "headline": "The Tea Ceremony Topology — Three Glasses, One Pot, the Architecture of Moroccan Hospitality",
      "description": "Six steps, three glasses, one proverb. Morocco imports 82,000 tonnes of Chinese gunpowder green tea annually. The data, ritual, and regional variation behind the Moroccan tea ceremony.",
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
      "name": "The Tea Ceremony Topology — Ceremony Steps, Composition & Regional Variation",
      "description": "Data on Morocco's tea ceremony: six steps, three-glass composition (mint, sugar, tannin, caffeine), regional sugar-to-mint ratios across 11 cities, and temperature cooling curves. Sources include AMITC, Euromonitor, ITC, and ethnographic observation.",
      "url": CANONICAL,
      "creator": { "@type": "Organization", "name": "AMITC / Euromonitor / ITC" },
      "spatialCoverage": "Morocco",
      "temporalCoverage": "1700/2025",
    },
    {
      "@type": "FAQPage",
      "@id": `${CANONICAL}#faq`,
      "mainEntity": [
        {
          "@type": "Question",
          "name": "What are the six steps of the Moroccan tea ceremony?",
          "acceptedAnswer": { "@type": "Answer", "text": "The six steps are: The Rinse (washing tea leaves with boiling water and discarding), The Charge (adding fresh mint and sugar), The Steep (3-4 minutes of infusion), The Test (host tastes and calibrates sweetness), The Pour (from 30+ cm height to create foam), and The Three Glasses (three infusions from the same pot, each progressively stronger and more bitter)." },
        },
        {
          "@type": "Question",
          "name": "Why is Moroccan tea poured from a height?",
          "acceptedAnswer": { "@type": "Answer", "text": "Moroccan tea is poured from 30+ cm above the glass to aerate the stream and create a crown of foam called the 'turban.' The higher the pour, the greater the honour shown to the guest. A pour below 30 cm produces no foam and is considered a failure of hospitality." },
        },
        {
          "@type": "Question",
          "name": "What does the Moroccan proverb about three glasses of tea mean?",
          "acceptedAnswer": { "@type": "Answer", "text": "The proverb states: 'The first glass is as gentle as life, the second as strong as love, the third as bitter as death.' It describes how the same tea leaves produce three different infusions — the first is sweet and minty, the second balanced with rising tannins, and the third bitter as the leaves are exhausted. It mirrors the arc of a conversation deepening over time." },
        },
      ],
    },
    {
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Slow Morocco", "item": BASE_URL },
        { "@type": "ListItem", "position": 2, "name": "Stories", "item": `${BASE_URL}/stories` },
        { "@type": "ListItem", "position": 3, "name": "The Tea Ceremony Topology", "item": CANONICAL },
      ],
    },
  ],
};

// ─────────────────────────────────────────────────────────────────────────────
// PAGE
// ─────────────────────────────────────────────────────────────────────────────

export default function TeaCeremonyPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <TeaCeremonyContent />
    </>
  );
}
