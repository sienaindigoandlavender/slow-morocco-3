import { Metadata } from "next";
import { TheAtlanticSpineContent } from "./TheAtlanticSpineContent";

export const revalidate = 3600;

const BASE_URL = "https://www.slowmorocco.com";
const SLUG = "the-atlantic-spine";
const CANONICAL = `${BASE_URL}/stories/${SLUG}`;

export const metadata: Metadata = {
  title: "The Atlantic Spine — Nigeria-Morocco Gas Pipeline & Africa's Energy Future | Slow Morocco",
  description: "The Nigeria-Morocco Gas Pipeline: 5,660 km along the Atlantic coast, 13 countries, $25 billion. The largest energy infrastructure project in African history, racing against Algeria's Trans-Saharan rival.",
  keywords: ["Nigeria-Morocco Gas Pipeline", "NMGP", "Atlantic pipeline", "Trans-Saharan pipeline", "Africa energy", "ECOWAS gas", "Morocco pipeline"],
  authors: [{ name: "J. Ng", url: `${BASE_URL}/about` }],
  alternates: { canonical: CANONICAL },
  openGraph: {
    title: "The Atlantic Spine — Nigeria-Morocco Gas Pipeline",
    description: "5,660 km, 13 countries, $25B. The largest energy infrastructure project in African history.",
    url: CANONICAL, siteName: "Slow Morocco", locale: "en_GB", type: "article",
    authors: ["J. Ng"], tags: ["pipeline", "Nigeria", "Morocco", "gas", "energy", "Africa"],
  },
  twitter: { card: "summary_large_image", title: "The Atlantic Spine", description: "5,660 km, 13 countries, $25B. The Nigeria-Morocco Gas Pipeline." },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-snippet": -1, "max-image-preview": "large" } },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Article", "@id": `${CANONICAL}#article`,
      "headline": "The Atlantic Spine — Nigeria-Morocco Gas Pipeline & Africa's Energy Future",
      "description": "The Nigeria-Morocco Gas Pipeline: 5,660 km along the Atlantic coast, 13 countries, $25 billion. Racing against Algeria's Trans-Saharan rival.",
      "datePublished": "2025-01-01", "dateModified": new Date().toISOString().split("T")[0],
      "author": { "@type": "Person", "name": "J. Ng", "url": `${BASE_URL}/about` },
      "publisher": { "@type": "Organization", "name": "Slow Morocco", "url": BASE_URL },
      "mainEntityOfPage": CANONICAL, "articleSection": "Energy & Geopolitical Intelligence",
    },
    {
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Slow Morocco", "item": BASE_URL },
        { "@type": "ListItem", "position": 2, "name": "Stories", "item": `${BASE_URL}/stories` },
        { "@type": "ListItem", "position": 3, "name": "The Atlantic Spine", "item": CANONICAL },
      ],
    },
  ],
};

export default function TheAtlanticSpinePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <TheAtlanticSpineContent />
    </>
  );
}
