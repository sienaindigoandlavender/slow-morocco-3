import { Metadata } from "next";
import { TheStoneLanguageContent } from "./TheStoneLanguageContent";

export const revalidate = 3600;

const BASE_URL = "https://www.slowmorocco.com";
const SLUG = "the-stone-language";
const CANONICAL = `${BASE_URL}/stories/${SLUG}`;

// ─────────────────────────────────────────────────────────────────────────────
// METADATA
// ─────────────────────────────────────────────────────────────────────────────

export const metadata: Metadata = {
  title: "The Stone Language — When Every Culture Stacks Rocks | Slow Morocco",
  description:
    "Nine cultures on five continents independently invented the same solution: stack rocks. From Amazigh kerkour to Inuit inuksuit to Mongolian ovoo — the universal language written in stone.",
  keywords: [
    "cairn", "kerkour", "inuksuk", "ovoo", "apacheta", "varde",
    "stone stacking", "cultural convergence", "Amazigh", "Inuit",
    "Mongolia", "Andes", "Scotland", "Korea", "stone cairn",
    "independent invention", "treeless terrain", "convergent evolution",
  ],
  authors: [{ name: "J. Ng", url: `${BASE_URL}/about` }],
  alternates: { canonical: CANONICAL },
  openGraph: {
    title: "The Stone Language — When Every Culture Stacks Rocks",
    description: "Nine cultures. Five continents. One instinct. No connection between them. The universal language written in stone.",
    url: CANONICAL,
    siteName: "Slow Morocco",
    locale: "en_GB",
    type: "article",
    authors: ["J. Ng"],
    tags: ["cairn", "stone stacking", "cultural convergence", "kerkour", "inuksuk", "ovoo"],
  },
  twitter: {
    card: "summary_large_image",
    title: "The Stone Language — When Every Culture Stacks Rocks",
    description: "Nine cultures. Five continents. One instinct. The universal language written in stone.",
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
      "headline": "The Stone Language — When Every Culture Stacks Rocks",
      "description": "Nine cultures on five continents independently invented the same solution to the same problem: stack rocks. From Amazigh kerkour to Inuit inuksuit to Mongolian ovoo — convergent evolution written in stone.",
      "datePublished": "2025-01-01",
      "dateModified": new Date().toISOString().split("T")[0],
      "author": { "@type": "Person", "name": "J. Ng", "url": `${BASE_URL}/about` },
      "publisher": { "@type": "Organization", "name": "Slow Morocco", "url": BASE_URL },
      "mainEntityOfPage": CANONICAL,
      "keywords": "cairn, kerkour, inuksuk, ovoo, apacheta, varde, stone stacking, cultural convergence, independent invention, treeless terrain",
      "articleSection": "Cultural Intelligence",
      "spatialCoverage": { "@type": "Place", "name": "Five continents — Arctic to Andes, Atlas to Mongolia", "geo": { "@type": "GeoShape", "box": "-43.5 -68.0 64.1 172.0" } },
    },
    {
      "@type": "Dataset",
      "@id": `${CANONICAL}#dataset`,
      "name": "The Stone Language — Nine Independent Stone-Stacking Traditions",
      "description": "Comparative dataset of nine independent stone-stacking traditions across five continents: Kerkour (North Africa), Inuksuk (Arctic), Ovoo (Mongolia), Apacheta (Andes), Varde (Scandinavia), Highland Cairn (Scotland), San-shin (Korea), Gal-Ed (Levant), and Stupa origins (India/Tibet).",
      "url": CANONICAL,
      "creator": { "@type": "Organization", "name": "Slow Morocco" },
      "spatialCoverage": "Five continents",
      "temporalCoverage": "-8000/2026",
    },
    {
      "@type": "FAQPage",
      "@id": `${CANONICAL}#faq`,
      "mainEntity": [
        {
          "@type": "Question",
          "name": "Why do so many cultures stack rocks?",
          "acceptedAnswer": { "@type": "Answer", "text": "In treeless terrain — tundra, desert, mountain passes above the tree line — loose stone is the only available construction material. When humans need to mark trails, graves, borders, or sacred sites, they stack rocks because it is the only possible solution. This has happened independently on every inhabited continent." },
        },
        {
          "@type": "Question",
          "name": "What is a kerkour?",
          "acceptedAnswer": { "@type": "Answer", "text": "A kerkour is the Amazigh (Berber) name for stone cairns found across North Africa — in the Atlas Mountains, Sahara, and Maghreb. The oldest kerkour predate the desertification of the Sahara and are estimated at 8,000+ years old. They mark mountain passes, graves, sacred sites, and tribal territorial boundaries." },
        },
        {
          "@type": "Question",
          "name": "Are these stone-stacking traditions connected to each other?",
          "acceptedAnswer": { "@type": "Answer", "text": "No. The Inuit and the Amazigh have never met. The Mongols and the Quechua share no ancestor for 15,000 years. The Scottish and Korean traditions evolved on opposite ends of Eurasia with no contact. This is convergent evolution — the same problem solved the same way independently — not cultural transmission." },
        },
      ],
    },
    {
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Slow Morocco", "item": BASE_URL },
        { "@type": "ListItem", "position": 2, "name": "Stories", "item": `${BASE_URL}/stories` },
        { "@type": "ListItem", "position": 3, "name": "The Stone Language", "item": CANONICAL },
      ],
    },
  ],
};

// ─────────────────────────────────────────────────────────────────────────────
// PAGE
// ─────────────────────────────────────────────────────────────────────────────

export default function TheStoneLanguagePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <TheStoneLanguageContent />
    </>
  );
}
