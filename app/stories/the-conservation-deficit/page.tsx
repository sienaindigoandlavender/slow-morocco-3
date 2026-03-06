import { Metadata } from "next";
import { TheConservationDeficitContent } from "./TheConservationDeficitContent";

export const revalidate = 3600;

const BASE_URL = "https://www.slowmorocco.com";
const SLUG = "the-conservation-deficit";
const CANONICAL = `${BASE_URL}/stories/${SLUG}`;

export const metadata: Metadata = {
  title: "The Conservation Deficit — Africa's Wildlife Funding Crisis | Slow Morocco",
  description: "Africa's wildlife generates $29.3B in tourism GDP. The illegal trade extracts $23B. Conservation funding: $1.1B. 94% of threatened species receive zero dedicated support. The arithmetic does not work.",
  keywords: ["conservation deficit", "wildlife funding", "Africa conservation", "illegal wildlife trade", "30x30", "endangered species", "conservation economics", "poaching"],
  authors: [{ name: "J. Ng", url: `${BASE_URL}/about` }],
  alternates: { canonical: CANONICAL },
  openGraph: {
    title: "The Conservation Deficit — Africa's Wildlife Funding Crisis",
    description: "$29.3B in tourism GDP. $23B illegal trade. $1.1B conservation funding. 94% of threatened species unfunded.",
    url: CANONICAL, siteName: "Slow Morocco", locale: "en_GB", type: "article",
    authors: ["J. Ng"], tags: ["conservation deficit", "wildlife funding", "Africa conservation", "illegal wildlife trade"],
  },
  twitter: { card: "summary_large_image", title: "The Conservation Deficit — Africa's Wildlife Funding Crisis", description: "$29.3B in tourism GDP. $23B illegal trade. $1.1B conservation funding. The arithmetic does not work." },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-snippet": -1, "max-image-preview": "large" } },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Article", "@id": `${CANONICAL}#article`,
      "headline": "The Conservation Deficit — Africa's Wildlife Funding Crisis",
      "description": "Africa's wildlife generates $29.3B in tourism GDP. The illegal trade extracts $23B. Conservation funding: $1.1B. The arithmetic does not work.",
      "datePublished": "2025-01-01", "dateModified": new Date().toISOString().split("T")[0],
      "author": { "@type": "Person", "name": "J. Ng", "url": `${BASE_URL}/about` },
      "publisher": { "@type": "Organization", "name": "Slow Morocco", "url": BASE_URL },
      "mainEntityOfPage": CANONICAL, "articleSection": "Conservation Economics",
    },
    {
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Slow Morocco", "item": BASE_URL },
        { "@type": "ListItem", "position": 2, "name": "Stories", "item": `${BASE_URL}/stories` },
        { "@type": "ListItem", "position": 3, "name": "The Conservation Deficit", "item": CANONICAL },
      ],
    },
  ],
};

export default function TheConservationDeficitPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <TheConservationDeficitContent />
    </>
  );
}
