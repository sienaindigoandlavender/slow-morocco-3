import { Metadata } from "next";
import { TheTeaRoadContent } from "./TheTeaRoadContent";

export const revalidate = 3600;

const BASE_URL = "https://www.slowmorocco.com";
const SLUG = "the-tea-road";
const CANONICAL = `${BASE_URL}/stories/${SLUG}`;

// ─────────────────────────────────────────────────────────────────────────────
// METADATA
// ─────────────────────────────────────────────────────────────────────────────

export const metadata: Metadata = {
  title: "The Tea Road — China to Morocco | Slow Morocco",
  description: "Morocco imports more Chinese tea than all of North America combined. 81,000 metric tons in 2024 — tracing gunpowder green from Zhejiang to the medina mint glass.",
  keywords: ["Moroccan tea", "Chinese tea exports", "gunpowder green tea", "atay", "mint tea", "tea trade", "Morocco China trade", "tea ceremony", "Zhejiang"],
  authors: [{ name: "J. Ng", url: `${BASE_URL}/about` }],
  alternates: { canonical: CANONICAL },
  openGraph: {
    title: "The Tea Road — China to Morocco",
    description: "Morocco imports more Chinese tea than all of North America combined. 81,000 metric tons in 2024 — the gunpowder green road from Zhejiang to the medina.",
    url: CANONICAL,
    siteName: "Slow Morocco",
    locale: "en_GB",
    type: "article",
    authors: ["J. Ng"],
    tags: ["Morocco", "China", "tea", "gunpowder green", "atay", "mint tea", "trade"],
  },
  twitter: {
    card: "summary_large_image",
    title: "The Tea Road — China to Morocco",
    description: "Morocco imports more Chinese tea than all of North America combined. 81,000 metric tons in 2024.",
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
      "headline": "The Tea Road — China to Morocco",
      "description": "Morocco imports more Chinese tea than all of North America combined. 81,000 metric tons in 2024 — tracing gunpowder green from Zhejiang to the medina mint glass.",
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
      "name": "The Tea Road — Chinese Tea Exports & Moroccan Imports",
      "description": "Dataset covering Chinese tea export destinations, Moroccan import volumes, global tea trade figures, the atay ceremony, and the historical timeline of tea's journey from China to Morocco.",
      "url": CANONICAL,
      "creator": { "@type": "Organization", "name": "STiR / UN COMTRADE / ITC / FAO" },
      "spatialCoverage": "China, Morocco, West Africa, Global",
      "temporalCoverage": "-2737/2025",
    },
    {
      "@type": "FAQPage",
      "@id": `${CANONICAL}#faq`,
      "mainEntity": [
        {
          "@type": "Question",
          "name": "Why does Morocco import so much Chinese tea?",
          "acceptedAnswer": { "@type": "Answer", "text": "Morocco imported 81,000 metric tons of Chinese tea in 2024 — more than all of North America combined. Tea (atay) is central to Moroccan social life: it is served at every home, shop, and office. Morocco buys raw gunpowder green tea in bulk from Zhejiang province at $3.01/kg, blends it with fresh mint and sugar, and also re-exports to West African countries, making Casablanca a green tea distribution hub for the continent." },
        },
        {
          "@type": "Question",
          "name": "What is the Moroccan tea proverb about three glasses?",
          "acceptedAnswer": { "@type": "Answer", "text": "The Moroccan proverb says: 'The first glass is bitter as life. The second is gentle as love. The third is sweet as death.' Each glass in the atay ceremony is progressively sweeter. The ritual requires serving and accepting all three glasses — to refuse the third is to insult the host. The ceremony uses gunpowder green tea from China, fresh spearmint from the Meknès plateau, and sugar." },
        },
        {
          "@type": "Question",
          "name": "How did tea arrive in Morocco?",
          "acceptedAnswer": { "@type": "Answer", "text": "Tea arrived in Morocco through two waves. In the 1700s, Moroccan sultans received Chinese gunpowder green tea as diplomatic gifts — it remained a court luxury. Then the Crimean War of 1854 disrupted British tea supply chains, and merchants redirected stock to Moroccan ports at bargain prices. Within a generation, tea had spread from palace to medina to village. By the 1880s, mint tea was universal across all social classes." },
        },
      ],
    },
    {
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Slow Morocco", "item": BASE_URL },
        { "@type": "ListItem", "position": 2, "name": "Stories", "item": `${BASE_URL}/stories` },
        { "@type": "ListItem", "position": 3, "name": "The Tea Road", "item": CANONICAL },
      ],
    },
  ],
};

// ─────────────────────────────────────────────────────────────────────────────
// PAGE
// ─────────────────────────────────────────────────────────────────────────────

export default function TheTeaRoadPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <TheTeaRoadContent />
    </>
  );
}
