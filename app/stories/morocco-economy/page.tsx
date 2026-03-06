import { Metadata } from "next";
import { MoroccoEconomyContent } from "./MoroccoEconomyContent";

export const revalidate = 3600;

const BASE_URL = "https://www.slowmorocco.com";
const SLUG = "morocco-economy";
const CANONICAL = `${BASE_URL}/stories/${SLUG}`;

// ─────────────────────────────────────────────────────────────────────────────
// METADATA
// ─────────────────────────────────────────────────────────────────────────────

export const metadata: Metadata = {
  title: "Morocco Economy — GDP, Exports, FDI, Tourism & Key Sectors in One Page | Slow Morocco",
  description:
    "Morocco's economy at a glance: $183B GDP, automotive-led exports, FDI sources, tourism revenue, diaspora remittances, and phosphate dominance. Data from IMF, World Bank, HCP, and Office des Changes. Updated annually.",
  keywords: [
    "Morocco economy", "Morocco GDP", "Morocco exports", "Morocco FDI",
    "Morocco tourism revenue", "Morocco remittances", "Morocco phosphates",
    "Morocco automotive industry", "OCP Group", "Morocco economic data",
    "Morocco trade", "Morocco investment", "Morocco key sectors",
    "Morocco 2030 vision", "Morocco green energy",
  ],
  authors: [{ name: "J. Ng", url: `${BASE_URL}/about` }],
  alternates: { canonical: CANONICAL },
  openGraph: {
    title: "Morocco Economy — GDP, Exports, FDI & Key Sectors in One Page",
    description: "$183B GDP, automotive-led exports, five revenue rivers, 75% of the world's phosphate reserves. All the numbers on one page.",
    url: CANONICAL,
    siteName: "Slow Morocco",
    locale: "en_GB",
    type: "article",
    authors: ["J. Ng"],
    tags: ["Morocco economy", "GDP", "exports", "FDI", "tourism", "phosphates", "automotive"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Morocco Economy — in One Page",
    description: "$183B GDP, automotive-led exports, five revenue rivers, and a geological monopoly on phosphates.",
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
      "headline": "Morocco Economy — GDP, Exports, FDI, Tourism & Key Sectors in One Page",
      "description": "Morocco's economy at a glance: $183B GDP, automotive-led exports, FDI sources, tourism revenue, diaspora remittances, and phosphate dominance. Data from IMF, World Bank, HCP, and Office des Changes.",
      "datePublished": "2025-01-01",
      "dateModified": new Date().toISOString().split("T")[0],
      "author": { "@type": "Person", "name": "J. Ng", "url": `${BASE_URL}/about` },
      "publisher": { "@type": "Organization", "name": "Slow Morocco", "url": BASE_URL },
      "mainEntityOfPage": CANONICAL,
      "keywords": "Morocco economy, GDP, exports, FDI, tourism, remittances, phosphates, automotive, OCP Group, Morocco 2030",
      "articleSection": "Economic Intelligence",
      "spatialCoverage": { "@type": "Place", "name": "Morocco", "geo": { "@type": "GeoShape", "box": "27.6 -13.2 35.9 -1.0" } },
    },
    {
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Slow Morocco", "item": BASE_URL },
        { "@type": "ListItem", "position": 2, "name": "Stories", "item": `${BASE_URL}/stories` },
        { "@type": "ListItem", "position": 3, "name": "Morocco Economy", "item": CANONICAL },
      ],
    },
  ],
};

// ─────────────────────────────────────────────────────────────────────────────
// PAGE
// ─────────────────────────────────────────────────────────────────────────────

export default function MoroccoEconomyPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <MoroccoEconomyContent />
    </>
  );
}
