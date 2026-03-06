import { Metadata } from "next";
import { MoroccanFashionContent } from "./MoroccanFashionContent";

export const revalidate = 3600;

const BASE_URL = "https://www.slowmorocco.com";
const SLUG = "moroccan-fashion";
const CANONICAL = `${BASE_URL}/stories/${SLUG}`;

// ─────────────────────────────────────────────────────────────────────────────
// METADATA
// ─────────────────────────────────────────────────────────────────────────────

export const metadata: Metadata = {
  title: "Moroccan Fashion Intelligence — Caftan, Djellaba, Babouche & the Designers Rewriting the Rules | Slow Morocco",
  description:
    "Eight centuries of Moroccan dress — caftan, djellaba, babouche, takchita. Three regional embroidery schools. UNESCO Intangible Heritage. A $4.25 billion textile industry. The designers taking Moroccan fashion from Fez to Paris.",
  keywords: [
    "Moroccan fashion", "caftan", "djellaba", "babouche", "takchita",
    "Moroccan embroidery", "sfifa", "aakad", "Fassi embroidery", "Tetouani embroidery",
    "Casablanca brand", "Charaf Tajer", "Noureddine Amir", "Moroccan haute couture",
    "UNESCO caftan", "Moroccan textile industry", "Morocco designers",
    "gandoura", "selham", "Moroccan craft", "Morocco heritage",
  ],
  authors: [{ name: "J. Ng", url: `${BASE_URL}/about` }],
  alternates: { canonical: CANONICAL },
  openGraph: {
    title: "Moroccan Fashion Intelligence — Eight Centuries of Dress",
    description: "Caftan, djellaba, babouche, takchita. Three embroidery schools. UNESCO heritage. $4.25B industry. The designers rewriting the rules from Fez to Paris.",
    url: CANONICAL,
    siteName: "Slow Morocco",
    locale: "en_GB",
    type: "article",
    authors: ["J. Ng"],
    tags: ["Moroccan fashion", "caftan", "djellaba", "babouche", "UNESCO", "textile industry", "Moroccan designers"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Moroccan Fashion Intelligence — Eight Centuries of Dress",
    description: "Caftan, djellaba, babouche, takchita. Three embroidery schools. UNESCO heritage. A $4.25B industry.",
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
      "headline": "Moroccan Fashion Intelligence — Caftan, Djellaba, Babouche & the Designers Rewriting the Rules",
      "description": "Eight centuries of Moroccan dress — caftan, djellaba, babouche, takchita. Three regional embroidery schools. UNESCO Intangible Heritage. A $4.25 billion textile industry. The designers taking Moroccan fashion from Fez to Paris.",
      "datePublished": "2025-01-01",
      "dateModified": new Date().toISOString().split("T")[0],
      "author": { "@type": "Person", "name": "J. Ng", "url": `${BASE_URL}/about` },
      "publisher": { "@type": "Organization", "name": "Slow Morocco", "url": BASE_URL },
      "mainEntityOfPage": CANONICAL,
      "keywords": "Moroccan fashion, caftan, djellaba, babouche, takchita, embroidery, sfifa, aakad, UNESCO, textile industry, Moroccan designers",
      "articleSection": "Culture & Heritage",
      "spatialCoverage": { "@type": "Place", "name": "Morocco", "geo": { "@type": "GeoShape", "box": "27.0 -13.0 36.0 -1.0" } },
    },
    {
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Slow Morocco", "item": BASE_URL },
        { "@type": "ListItem", "position": 2, "name": "Stories", "item": `${BASE_URL}/stories` },
        { "@type": "ListItem", "position": 3, "name": "Moroccan Fashion Intelligence", "item": CANONICAL },
      ],
    },
  ],
};

// ─────────────────────────────────────────────────────────────────────────────
// PAGE
// ─────────────────────────────────────────────────────────────────────────────

export default function MoroccanFashionPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <MoroccanFashionContent />
    </>
  );
}
