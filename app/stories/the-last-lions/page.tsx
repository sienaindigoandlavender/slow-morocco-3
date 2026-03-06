import { Metadata } from "next";
import { TheLastLionsContent } from "./TheLastLionsContent";

export const revalidate = 3600;

const BASE_URL = "https://www.slowmorocco.com";
const SLUG = "the-last-lions";
const CANONICAL = `${BASE_URL}/stories/${SLUG}`;

// ─────────────────────────────────────────────────────────────────────────────
// METADATA
// ─────────────────────────────────────────────────────────────────────────────

export const metadata: Metadata = {
  title: "The Last Lions — The Atlas Lion, From Roman Arena to Royal Zoo | Slow Morocco",
  description:
    "The Barbary lion ruled North Africa for 100,000 years. Romans captured thousands for the Colosseum. Moroccan sultans kept them as symbols of power. By 1942 they were gone from the wild. ~90 descendants survive in zoos. This is their story.",
  keywords: [
    "Barbary lion", "Atlas lion", "Panthera leo leo", "Morocco lion",
    "Barbary lion extinct", "Rabat Zoo lion", "Atlas Mountains lion",
    "lion conservation", "Moroccan royal lion", "Tizi n'Tichka lion",
    "North Africa wildlife", "lion population decline", "Colosseum lions",
    "Berber lion", "Barbary lion reintroduction",
  ],
  authors: [{ name: "J. Ng", url: `${BASE_URL}/about` }],
  alternates: { canonical: CANONICAL },
  openGraph: {
    title: "The Last Lions — The Atlas Lion, From Roman Arena to Royal Zoo",
    description: "100,000 years in North Africa, then gone. The Barbary lion's story — from Roman arena to royal zoo to the last ~90 descendants.",
    url: CANONICAL,
    siteName: "Slow Morocco",
    locale: "en_GB",
    type: "article",
    authors: ["J. Ng"],
    tags: ["Barbary lion", "Atlas lion", "Morocco", "conservation", "wildlife", "North Africa"],
  },
  twitter: {
    card: "summary_large_image",
    title: "The Last Lions — The Atlas Lion, From Roman Arena to Royal Zoo",
    description: "100,000 years in North Africa. ~90 descendants in zoos. The Barbary lion mapped.",
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
      "headline": "The Last Lions — The Atlas Lion, From Roman Arena to Royal Zoo",
      "description": "The Barbary lion ruled North Africa for 100,000 years. Romans captured thousands for the Colosseum. Moroccan sultans kept them as symbols of power. By 1942 they were gone from the wild. ~90 descendants survive in zoos.",
      "datePublished": "2025-01-01",
      "dateModified": new Date().toISOString().split("T")[0],
      "author": { "@type": "Person", "name": "J. Ng", "url": `${BASE_URL}/about` },
      "publisher": { "@type": "Organization", "name": "Slow Morocco", "url": BASE_URL },
      "mainEntityOfPage": CANONICAL,
      "keywords": "Barbary lion, Atlas lion, Panthera leo leo, Morocco, North Africa, lion conservation, Rabat Zoo, royal lion, Tizi n'Tichka",
      "articleSection": "Cultural Intelligence",
      "spatialCoverage": { "@type": "Place", "name": "North Africa — Morocco to Egypt", "geo": { "@type": "GeoShape", "box": "28.0 -10.0 37.5 31.0" } },
    },
    {
      "@type": "Dataset",
      "@id": `${CANONICAL}#dataset`,
      "name": "Barbary Lion Historic Range, Sightings & Zoo Populations",
      "description": "Geographic data on Barbary lion historic range across North Africa, last confirmed wild sightings (1891–1965), zoo populations descended from Moroccan royal collection, and contemporary wild lion populations worldwide.",
      "url": CANONICAL,
      "creator": { "@type": "Organization", "name": "IUCN / University of Kent / Rabat National Zoo" },
      "spatialCoverage": "North Africa — Morocco to Egypt",
      "temporalCoverage": "-100000/2025",
    },
    {
      "@type": "FAQPage",
      "@id": `${CANONICAL}#faq`,
      "mainEntity": [
        {
          "@type": "Question",
          "name": "When did the Barbary lion go extinct in the wild?",
          "acceptedAnswer": { "@type": "Answer", "text": "The last confirmed wild Barbary lion — a lioness — was shot at the Tizi n'Tichka pass in Morocco's High Atlas in 1942. However, University of Kent research (2013) suggests small populations may have persisted in Algeria until ~1958, when forests were destroyed during the French-Algerian War." },
        },
        {
          "@type": "Question",
          "name": "Are there any Barbary lions alive today?",
          "acceptedAnswer": { "@type": "Answer", "text": "Approximately 90 descendants of the Moroccan royal lion collection survive in zoos across Morocco and Europe. Rabat National Zoo holds the largest group (30–40 individuals). These lions descend from Atlas Mountain lions captured by Berber tribes and presented to Moroccan sultans over centuries." },
        },
        {
          "@type": "Question",
          "name": "How many lions are left in the world?",
          "acceptedAnswer": { "@type": "Answer", "text": "An estimated 20,000–25,000 wild lions remain, down from ~200,000 in 1900 — a 90% decline. They are extinct in 26+ countries and have lost 94% of their historic range. About 700 Asiatic lions survive in India's Gir Forest. West African lions are Critically Endangered with fewer than 250 mature adults." },
        },
      ],
    },
    {
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Slow Morocco", "item": BASE_URL },
        { "@type": "ListItem", "position": 2, "name": "Stories", "item": `${BASE_URL}/stories` },
        { "@type": "ListItem", "position": 3, "name": "The Last Lions", "item": CANONICAL },
      ],
    },
  ],
};

// ─────────────────────────────────────────────────────────────────────────────
// PAGE
// ─────────────────────────────────────────────────────────────────────────────

export default function TheLastLionsPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <TheLastLionsContent />
    </>
  );
}
