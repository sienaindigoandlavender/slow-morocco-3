import { Metadata } from "next";
import { TheLionsRoadContent } from "./TheLionsRoadContent";

export const revalidate = 3600;

const BASE_URL = "https://www.slowmorocco.com";
const SLUG = "the-lions-road";
const CANONICAL = `${BASE_URL}/stories/${SLUG}`;

// ─────────────────────────────────────────────────────────────────────────────
// METADATA
// ─────────────────────────────────────────────────────────────────────────────

export const metadata: Metadata = {
  title: "The Lion's Road — How an Animal That Never Lived in China Became Its Guardian | Slow Morocco",
  description:
    "The Asiatic lion once ranged from Greece to India. China was never part of it. Yet China built the most prolific lion culture on earth. This is the story of how an idea travelled further than the animal ever could — through trade, Buddhism, and 2,000 years of reimagining.",
  keywords: [
    "Asiatic lion", "Chinese guardian lion", "Silk Road", "lion China",
    "shizi", "lion dance", "Buddhist lion", "Ashoka lion capital",
    "Forbidden City lions", "Gandhara", "Dunhuang", "cultural transmission",
    "Gir Forest", "Parthian Empire", "lion symbolism", "Chinese mythology",
  ],
  authors: [{ name: "J. Ng", url: `${BASE_URL}/about` }],
  alternates: { canonical: CANONICAL },
  openGraph: {
    title: "The Lion's Road — How an Animal That Never Lived in China Became Its Guardian",
    description: "Zero native lions. 2,000 years of reimagining. How Persia, Buddhism, and the Silk Road built China's most prolific animal symbol.",
    url: CANONICAL,
    siteName: "Slow Morocco",
    locale: "en_GB",
    type: "article",
    authors: ["J. Ng"],
    tags: ["lion", "China", "Silk Road", "Buddhism", "cultural history", "guardian lion"],
  },
  twitter: {
    card: "summary_large_image",
    title: "The Lion's Road — China's Guardian That Never Existed",
    description: "Zero native lions. 2,000 years of reimagining. The Silk Road story of China's most prolific animal symbol.",
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
      "headline": "The Lion's Road — How an Animal That Never Lived in China Became Its Guardian",
      "description": "The Asiatic lion once ranged from Greece to India. China was never part of it. Yet China built the most prolific lion culture on earth — guardian lions, lion dances, and a borrowed Persian word. This is the story of how an idea travelled further than the animal ever could.",
      "datePublished": "2025-01-01",
      "dateModified": new Date().toISOString().split("T")[0],
      "author": { "@type": "Person", "name": "J. Ng", "url": `${BASE_URL}/about` },
      "publisher": { "@type": "Organization", "name": "Slow Morocco", "url": BASE_URL },
      "mainEntityOfPage": CANONICAL,
      "keywords": "Asiatic lion, Chinese guardian lion, Silk Road, Buddhist lion, Ashoka, Gandhara, Dunhuang, Forbidden City, lion dance, shizi, cultural transmission",
      "articleSection": "Cultural Intelligence",
      "spatialCoverage": { "@type": "Place", "name": "Silk Road — Greece to China", "geo": { "@type": "GeoShape", "box": "14.0 22.0 43.0 121.5" } },
    },
    {
      "@type": "Dataset",
      "@id": `${CANONICAL}#dataset`,
      "name": "The Lion's Road — Asiatic Lion Range & Silk Road Transmission",
      "description": "Historic Asiatic lion range coordinates, Silk Road trade routes, key cultural transmission points, timeline of lion imagery in China from 120,000 BCE to present, and key artworks tracking the transformation from biology to mythology.",
      "url": CANONICAL,
      "creator": { "@type": "Organization", "name": "Slow Morocco" },
      "spatialCoverage": "Greece to China via Silk Road",
      "temporalCoverage": "-120000/2026",
    },
    {
      "@type": "FAQPage",
      "@id": `${CANONICAL}#faq`,
      "mainEntity": [
        {
          "@type": "Question",
          "name": "Did lions ever live in China?",
          "acceptedAnswer": { "@type": "Answer", "text": "No. The Asiatic lion's historic range extended from Greece through Turkey, Persia, Mesopotamia, Pakistan, and India — but never reached China. The first lion arrived in China in 87 CE as a diplomatic gift from the Parthian Empire." },
        },
        {
          "@type": "Question",
          "name": "How did the lion become a symbol in Chinese culture?",
          "acceptedAnswer": { "@type": "Answer", "text": "The lion entered China through five cultural streams over 2,000 years: Persian royal power (diplomatic tribute and the word shizi from Persian shir), Buddhist protection (the Buddha as 'Lion of the Shakya Clan'), Central Asian steppe art, indigenous Chinese mythology (the suan-ni), and imperial authority. These layers fused into the guardian lion we know today." },
        },
        {
          "@type": "Question",
          "name": "How many Asiatic lions survive today?",
          "acceptedAnswer": { "@type": "Answer", "text": "Approximately 700 Asiatic lions survive in the wild, all in the Gir Forest of Gujarat, India — an area of just 1,412 km². The species once ranged across three continents from Greece to India." },
        },
      ],
    },
    {
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Slow Morocco", "item": BASE_URL },
        { "@type": "ListItem", "position": 2, "name": "Stories", "item": `${BASE_URL}/stories` },
        { "@type": "ListItem", "position": 3, "name": "The Lion's Road", "item": CANONICAL },
      ],
    },
  ],
};

// ─────────────────────────────────────────────────────────────────────────────
// PAGE
// ─────────────────────────────────────────────────────────────────────────────

export default function TheLionsRoadPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <TheLionsRoadContent />
    </>
  );
}
