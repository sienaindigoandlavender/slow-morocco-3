import { Metadata } from "next";
import { TheGreenSaharaContent } from "./TheGreenSaharaContent";

export const revalidate = 3600;

const BASE_URL = "https://www.slowmorocco.com";
const SLUG = "the-green-sahara";
const CANONICAL = `${BASE_URL}/stories/${SLUG}`;

// ─────────────────────────────────────────────────────────────────────────────
// METADATA
// ─────────────────────────────────────────────────────────────────────────────

export const metadata: Metadata = {
  title: "The Green Sahara — The African Humid Period | Slow Morocco",
  description:
    "Eleven thousand years ago the Sahara was green. Rivers, lakes, hippos, elephants, crocodiles — 9 million km² of savannah where desert stands today. The African Humid Period mapped, measured, and explained.",
  keywords: [
    "Green Sahara", "African Humid Period", "Lake Mega-Chad",
    "Sahara lakes", "Sahara rivers", "Bodélé Depression",
    "Tassili rock art", "Gobero", "orbital wobble",
    "Sahara drying", "paleoclimate", "Holocene climate",
    "Amazon dust fertilisation", "diatomite", "earth systems",
  ],
  authors: [{ name: "J. Ng", url: `${BASE_URL}/about` }],
  alternates: { canonical: CANONICAL },
  openGraph: {
    title: "The Green Sahara — The African Humid Period",
    description: "9 million km² of green. 400,000 km² lake. 230+ cycles in 8 million years. ~200 years to collapse. The world before the dust.",
    url: CANONICAL,
    siteName: "Slow Morocco",
    locale: "en_GB",
    type: "article",
    authors: ["J. Ng"],
    tags: ["Green Sahara", "African Humid Period", "paleoclimate", "Sahara", "earth systems"],
  },
  twitter: {
    card: "summary_large_image",
    title: "The Green Sahara — The African Humid Period",
    description: "9 million km² of green. 400,000 km² lake. ~200 years to collapse. The African Humid Period mapped and explained.",
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
      "headline": "The Green Sahara — The African Humid Period",
      "description": "Eleven thousand years ago the Sahara was green. Rivers, lakes, hippos, elephants, crocodiles — 9 million km² of savannah where desert stands today. The African Humid Period mapped, measured, and explained.",
      "datePublished": "2025-01-01",
      "dateModified": new Date().toISOString().split("T")[0],
      "author": { "@type": "Person", "name": "J. Ng", "url": `${BASE_URL}/about` },
      "publisher": { "@type": "Organization", "name": "Slow Morocco", "url": BASE_URL },
      "mainEntityOfPage": CANONICAL,
      "keywords": "Green Sahara, African Humid Period, Lake Mega-Chad, Bodélé Depression, Tassili rock art, paleoclimate, Amazon dust fertilisation",
      "articleSection": "Earth Systems",
      "spatialCoverage": { "@type": "Place", "name": "Sahara, North Africa", "geo": { "@type": "GeoCoordinates", "latitude": 23.0, "longitude": 12.0 } },
    },
    {
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Slow Morocco", "item": BASE_URL },
        { "@type": "ListItem", "position": 2, "name": "Stories", "item": `${BASE_URL}/stories` },
        { "@type": "ListItem", "position": 3, "name": "The Green Sahara", "item": CANONICAL },
      ],
    },
  ],
};

// ─────────────────────────────────────────────────────────────────────────────
// PAGE
// ─────────────────────────────────────────────────────────────────────────────

export default function TheGreenSaharaPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <TheGreenSaharaContent />
    </>
  );
}
