import { Metadata } from "next";
import { ReconquistaExodusContent } from "./ReconquistaExodusContent";

export const revalidate = 3600;

const BASE_URL = "https://www.slowmorocco.com";
const SLUG = "reconquista-exodus";
const CANONICAL = `${BASE_URL}/stories/${SLUG}`;

// ─────────────────────────────────────────────────────────────────────────────
// METADATA
// ─────────────────────────────────────────────────────────────────────────────

export const metadata: Metadata = {
  title: "The Reconquista & The Exodus — Where the Expelled Went When Spain Chose Purity Over Civilization | Slow Morocco",
  description:
    "770 years of Reconquista, the fall of Granada, the Alhambra Decree, and the expulsion of 300,000 Moriscos. An interactive timeline and diaspora map tracing where Spain's expelled Muslims and Jews went — from Fes and Tetouan to Istanbul and Amsterdam — and what they carried with them.",
  keywords: [
    "Reconquista", "Al-Andalus", "Alhambra Decree", "Sephardic Jews", "Moriscos",
    "1492", "Granada", "expulsion", "diaspora", "Morocco", "Fes", "Tetouan",
    "Chefchaouen", "Ottoman Empire", "Thessaloniki", "Amsterdam", "conversos",
    "Inquisition", "Islamic Spain", "Jewish Spain", "Mediterranean diaspora",
  ],
  authors: [{ name: "J. Ng", url: `${BASE_URL}/about` }],
  alternates: { canonical: CANONICAL },
  openGraph: {
    title: "The Reconquista & The Exodus — Where the Expelled Went",
    description: "770 years of Reconquista. 300,000 expelled. 16 diaspora cities mapped. An interactive timeline and map of Spain's religious cleansing and the civilizations it seeded across the Mediterranean.",
    url: CANONICAL,
    siteName: "Slow Morocco",
    locale: "en_GB",
    type: "article",
    authors: ["J. Ng"],
    tags: ["Reconquista", "Al-Andalus", "diaspora", "Morocco", "Sephardic", "Moriscos", "1492"],
  },
  twitter: {
    card: "summary_large_image",
    title: "The Reconquista & The Exodus",
    description: "770 years. 300,000 expelled. 16 cities mapped. Where Spain's Muslims and Jews went, and what they brought.",
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
      "headline": "The Reconquista & The Exodus — Where the Expelled Went When Spain Chose Purity Over Civilization",
      "description": "770 years of Reconquista, the fall of Granada, the Alhambra Decree, and the expulsion of 300,000 Moriscos. An interactive timeline and diaspora map tracing where Spain's expelled Muslims and Jews went and what they carried with them.",
      "datePublished": "2025-01-01",
      "dateModified": new Date().toISOString().split("T")[0],
      "author": { "@type": "Person", "name": "J. Ng", "url": `${BASE_URL}/about` },
      "publisher": { "@type": "Organization", "name": "Slow Morocco", "url": BASE_URL },
      "mainEntityOfPage": CANONICAL,
      "keywords": "Reconquista, Al-Andalus, Alhambra Decree, Sephardic Jews, Moriscos, 1492, Granada, diaspora, Morocco, Fes, Tetouan, Ottoman Empire",
      "articleSection": "Culture & Heritage",
      "spatialCoverage": { "@type": "Place", "name": "Mediterranean — Iberia to Ottoman Empire", "geo": { "@type": "GeoShape", "box": "30.0 -10.0 53.0 32.0" } },
    },
    {
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Slow Morocco", "item": BASE_URL },
        { "@type": "ListItem", "position": 2, "name": "Stories", "item": `${BASE_URL}/stories` },
        { "@type": "ListItem", "position": 3, "name": "The Reconquista & The Exodus", "item": CANONICAL },
      ],
    },
  ],
};

// ─────────────────────────────────────────────────────────────────────────────
// PAGE
// ─────────────────────────────────────────────────────────────────────────────

export default function ReconquistaExodusPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ReconquistaExodusContent />
    </>
  );
}
