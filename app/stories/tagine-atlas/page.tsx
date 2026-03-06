import { Metadata } from "next";
import { TagineAtlasContent } from "./TagineAtlasContent";

export const revalidate = 3600;

const BASE_URL = "https://www.slowmorocco.com";
const SLUG = "tagine-atlas";
const CANONICAL = `${BASE_URL}/stories/${SLUG}`;

// ─────────────────────────────────────────────────────────────────────────────
// METADATA
// ─────────────────────────────────────────────────────────────────────────────

export const metadata: Metadata = {
  title: "The Tagine Atlas — Regional Variations Mapped | Slow Morocco",
  description:
    "10 regional tagine styles mapped across Morocco. Lamb with prunes in Marrakech, chicken with preserved lemon in Fes, fish chermoula on the Atlantic coast. The spice pantry, the vessel, and the cultural rules of Morocco's most iconic dish.",
  keywords: [
    "tagine Morocco", "Moroccan tagine regional styles", "tagine atlas",
    "Marrakech tagine", "Fes chicken tagine", "fish chermoula Essaouira",
    "kefta mkaouara", "Berber tagine", "mrouzia Eid", "tangia Marrakech",
    "Moroccan spices", "ras el hanout", "preserved lemon Morocco",
    "Moroccan cuisine", "tagine pot", "Moroccan cooking",
  ],
  authors: [{ name: "J. Ng", url: `${BASE_URL}/about` }],
  alternates: { canonical: CANONICAL },
  openGraph: {
    title: "The Tagine Atlas — Regional Variations Mapped",
    description: "10 regional tagine styles mapped across Morocco. What goes into the pot depends on what grows nearby.",
    url: CANONICAL,
    siteName: "Slow Morocco",
    locale: "en_GB",
    type: "article",
    authors: ["J. Ng"],
    tags: ["tagine", "Moroccan cuisine", "Morocco", "food", "culinary", "regional cooking"],
  },
  twitter: {
    card: "summary_large_image",
    title: "The Tagine Atlas — Regional Variations Mapped",
    description: "10 regional tagine styles mapped across Morocco. The spice pantry, the vessel, the rules of the pot.",
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
      "headline": "The Tagine Atlas — Regional Variations Mapped",
      "description": "10 regional tagine styles mapped across Morocco. Lamb with prunes in Marrakech, chicken with preserved lemon in Fes, fish chermoula on the Atlantic coast. The spice pantry, the vessel, and the cultural rules of Morocco's most iconic dish.",
      "datePublished": "2025-01-01",
      "dateModified": new Date().toISOString().split("T")[0],
      "author": { "@type": "Person", "name": "J. Ng", "url": `${BASE_URL}/about` },
      "publisher": { "@type": "Organization", "name": "Slow Morocco", "url": BASE_URL },
      "mainEntityOfPage": CANONICAL,
      "keywords": "tagine Morocco, Moroccan tagine, regional tagine styles, Marrakech, Fes, Essaouira, kefta, Berber tagine, mrouzia, tangia, Moroccan spices, ras el hanout",
      "articleSection": "Culinary Intelligence",
      "spatialCoverage": { "@type": "Place", "name": "Morocco", "geo": { "@type": "GeoShape", "box": "27.6 -13.2 35.9 -1.0" } },
    },
    {
      "@type": "Dataset",
      "@id": `${CANONICAL}#dataset`,
      "name": "Tagine Regional Styles — Morocco",
      "description": "10 regional tagine variations mapped across Morocco with coordinates, protein, spice profiles, and cultural context. Includes spice pantry data and vessel specifications.",
      "url": CANONICAL,
      "creator": { "@type": "Organization", "name": "Slow Morocco" },
      "spatialCoverage": "Morocco",
    },
    {
      "@type": "FAQPage",
      "@id": `${CANONICAL}#faq`,
      "mainEntity": [
        {
          "@type": "Question",
          "name": "What are the main regional tagine styles in Morocco?",
          "acceptedAnswer": { "@type": "Answer", "text": "Morocco has at least 10 distinct regional tagine styles: lamb with prunes and almonds (Marrakech), chicken with preserved lemon and olives (Fes), fish with chermoula (Atlantic coast), kefta mkaouara (national), Berber tagine (High Atlas), mrouzia (Eid al-Adha), tangia Marrakchia (Marrakech), seven-vegetable tagine (national), sardine tagine (Safi), and Rif chicken with olives and thyme (northern Morocco)." },
        },
        {
          "@type": "Question",
          "name": "What is ras el hanout?",
          "acceptedAnswer": { "@type": "Answer", "text": "Ras el hanout means 'head of the shop' in Arabic. It is a complex spice blend of 20–30 spices with no fixed recipe. Each spice merchant's reputation rests on their unique blend, which typically includes cinnamon, cardamom, nutmeg, clove, turmeric, peppercorns, and often rosebuds." },
        },
        {
          "@type": "Question",
          "name": "What is the difference between a tagine and a tangia?",
          "acceptedAnswer": { "@type": "Answer", "text": "A tagine is a conical-lidded clay pot used across Morocco. A tangia is an amphora-shaped clay urn exclusive to Marrakech, traditionally slow-cooked in the embers of a public bathhouse (hammam) furnace. The tangia is sealed with meat, spices, preserved lemon, and smen (aged butter) and left to cook all day." },
        },
      ],
    },
    {
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Slow Morocco", "item": BASE_URL },
        { "@type": "ListItem", "position": 2, "name": "Stories", "item": `${BASE_URL}/stories` },
        { "@type": "ListItem", "position": 3, "name": "The Tagine Atlas", "item": CANONICAL },
      ],
    },
  ],
};

// ─────────────────────────────────────────────────────────────────────────────
// PAGE
// ─────────────────────────────────────────────────────────────────────────────

export default function TagineAtlasPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <TagineAtlasContent />
    </>
  );
}
