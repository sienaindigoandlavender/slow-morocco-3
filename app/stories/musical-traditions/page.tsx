import { Metadata } from "next";
import { MusicalTraditionsContent } from "./MusicalTraditionsContent";

export const revalidate = 3600;

const BASE_URL = "https://www.slowmorocco.com";
const SLUG = "musical-traditions";
const CANONICAL = `${BASE_URL}/stories/${SLUG}`;

// ─────────────────────────────────────────────────────────────────────────────
// METADATA
// ─────────────────────────────────────────────────────────────────────────────

export const metadata: Metadata = {
  title: "Morocco's Musical Traditions — Five Lineages of Sound from Gnawa to Raï | Slow Morocco",
  description:
    "Five musical lineages. Sub-Saharan trance, Andalusian courtly suites, Amazigh village drums, urban protest pop, and Algerian rebellion. Each carried across centuries by oral tradition, and each still alive in tonight's Moroccan streets.",
  keywords: [
    "Moroccan music", "Gnawa", "Andalusi", "Amazigh music", "Chaabi",
    "Raï", "guembri", "Essaouira Gnaoua Festival", "UNESCO Gnawa",
    "Nass El Ghiwane", "Moroccan musical traditions", "Maalem",
    "lila ceremony", "Andalusi nuba", "Ahwash", "Ahidous",
    "Morocco cultural heritage", "North African music",
  ],
  authors: [{ name: "J. Ng", url: `${BASE_URL}/about` }],
  alternates: { canonical: CANONICAL },
  openGraph: {
    title: "Morocco's Musical Traditions — Five Lineages of Sound",
    description: "Five musical lineages spanning Sub-Saharan trance, Andalusian courtly suites, Amazigh village drums, urban protest pop, and Algerian rebellion.",
    url: CANONICAL,
    siteName: "Slow Morocco",
    locale: "en_GB",
    type: "article",
    authors: ["J. Ng"],
    tags: ["Gnawa", "Andalusi", "Amazigh", "Chaabi", "Raï", "Morocco", "music", "cultural heritage"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Morocco's Musical Traditions — Five Lineages of Sound",
    description: "Gnawa, Andalusi, Amazigh, Chaabi, Raï — five musical lineages mapped across Morocco.",
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
      "headline": "Morocco's Musical Traditions — Five Lineages of Sound from Gnawa to Raï",
      "description": "Five musical lineages. Sub-Saharan trance, Andalusian courtly suites, Amazigh village drums, urban protest pop, and Algerian rebellion. Each carried across centuries by oral tradition, and each still alive in tonight's Moroccan streets.",
      "datePublished": "2025-01-01",
      "dateModified": new Date().toISOString().split("T")[0],
      "author": { "@type": "Person", "name": "J. Ng", "url": `${BASE_URL}/about` },
      "publisher": { "@type": "Organization", "name": "Slow Morocco", "url": BASE_URL },
      "mainEntityOfPage": CANONICAL,
      "keywords": "Moroccan music, Gnawa, Andalusi, Amazigh, Chaabi, Raï, guembri, UNESCO, Essaouira, Nass El Ghiwane, lila ceremony",
      "articleSection": "Culture & Heritage",
      "spatialCoverage": { "@type": "Place", "name": "Morocco", "geo": { "@type": "GeoShape", "box": "27.0 -13.0 36.0 -1.0" } },
    },
    {
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Slow Morocco", "item": BASE_URL },
        { "@type": "ListItem", "position": 2, "name": "Stories", "item": `${BASE_URL}/stories` },
        { "@type": "ListItem", "position": 3, "name": "Morocco's Musical Traditions", "item": CANONICAL },
      ],
    },
  ],
};

// ─────────────────────────────────────────────────────────────────────────────
// PAGE
// ─────────────────────────────────────────────────────────────────────────────

export default function MusicalTraditionsPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <MusicalTraditionsContent />
    </>
  );
}
