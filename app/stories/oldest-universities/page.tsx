import { Metadata } from "next";
import { OldestUniversitiesContent } from "./OldestUniversitiesContent";

export const revalidate = 3600;

const BASE_URL = "https://www.slowmorocco.com";
const SLUG = "oldest-universities";
const CANONICAL = `${BASE_URL}/stories/${SLUG}`;

// ─────────────────────────────────────────────────────────────────────────────
// METADATA
// ─────────────────────────────────────────────────────────────────────────────

export const metadata: Metadata = {
  title: "The World's Oldest Universities — Morocco's Al-Qarawiyyin and Ben Youssef Madrasa | Slow Morocco",
  description:
    "229 years before Bologna. 237 before Oxford. Morocco's claim to the oldest continuously operating university in the world — Al-Qarawiyyin, founded by Fatima al-Fihri in 859 CE.",
  keywords: [
    "Al-Qarawiyyin", "oldest university", "Fatima al-Fihri", "Fez Morocco",
    "Ben Youssef Madrasa", "Marrakech", "Islamic education", "madrasa",
    "University of Bologna", "Oxford", "ijazah", "Marinid", "Saadian",
    "Morocco heritage", "oldest library", "Islamic scholarship",
  ],
  authors: [{ name: "J. Ng", url: `${BASE_URL}/about` }],
  alternates: { canonical: CANONICAL },
  openGraph: {
    title: "The World's Oldest Universities — Al-Qarawiyyin & Ben Youssef Madrasa",
    description: "229 years before Bologna. 237 before Oxford. Morocco's claim to the oldest continuously operating university in the world.",
    url: CANONICAL,
    siteName: "Slow Morocco",
    locale: "en_GB",
    type: "article",
    authors: ["J. Ng"],
    tags: ["Al-Qarawiyyin", "Morocco", "oldest university", "Fatima al-Fihri", "Islamic education", "Fez", "Marrakech"],
  },
  twitter: {
    card: "summary_large_image",
    title: "The World's Oldest Universities — Al-Qarawiyyin & Ben Youssef",
    description: "229 years before Bologna. 237 before Oxford. Founded by a woman in 859 CE.",
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
      "headline": "The World's Oldest Universities — Morocco's Al-Qarawiyyin and Ben Youssef Madrasa",
      "description": "229 years before Bologna. 237 before Oxford. Morocco's claim to the oldest continuously operating university in the world — Al-Qarawiyyin, founded by Fatima al-Fihri in 859 CE.",
      "datePublished": "2025-01-01",
      "dateModified": new Date().toISOString().split("T")[0],
      "author": { "@type": "Person", "name": "J. Ng", "url": `${BASE_URL}/about` },
      "publisher": { "@type": "Organization", "name": "Slow Morocco", "url": BASE_URL },
      "mainEntityOfPage": CANONICAL,
      "keywords": "Al-Qarawiyyin, oldest university, Fatima al-Fihri, Fez, Ben Youssef Madrasa, Marrakech, Islamic education, ijazah, Morocco",
      "articleSection": "Culture & Heritage",
      "spatialCoverage": { "@type": "Place", "name": "Fez & Marrakech, Morocco", "geo": { "@type": "GeoShape", "box": "31.0 -10.0 35.0 -4.0" } },
    },
    {
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Slow Morocco", "item": BASE_URL },
        { "@type": "ListItem", "position": 2, "name": "Stories", "item": `${BASE_URL}/stories` },
        { "@type": "ListItem", "position": 3, "name": "The World's Oldest Universities", "item": CANONICAL },
      ],
    },
  ],
};

// ─────────────────────────────────────────────────────────────────────────────
// PAGE
// ─────────────────────────────────────────────────────────────────────────────

export default function OldestUniversitiesPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <OldestUniversitiesContent />
    </>
  );
}
