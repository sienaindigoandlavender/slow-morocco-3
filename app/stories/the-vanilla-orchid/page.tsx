import { Metadata } from "next";
import { TheVanillaOrchidContent } from "./TheVanillaOrchidContent";

export const revalidate = 3600;

const BASE_URL = "https://www.slowmorocco.com";
const SLUG = "the-vanilla-orchid";
const CANONICAL = `${BASE_URL}/stories/${SLUG}`;

export const metadata: Metadata = {
  title: "The Vanilla Orchid — From Edmond Albius to Madagascar's $1.8B Industry | Slow Morocco",
  description: "Madagascar produces 80% of the world's vanilla. Prices have swung from $20 to $600/kg. The second most expensive spice on Earth, built on a 12-year-old enslaved boy's discovery.",
  keywords: ["vanilla", "vanilla orchid", "Madagascar vanilla", "Edmond Albius", "vanilla price", "SAVA region", "hand-pollination", "vanilla industry"],
  authors: [{ name: "J. Ng", url: `${BASE_URL}/about` }],
  alternates: { canonical: CANONICAL },
  openGraph: {
    title: "The Vanilla Orchid — Madagascar's $1.8B Industry",
    description: "80% of the world's vanilla from one island. $20 to $600/kg. The most labour-intensive crop on Earth.",
    url: CANONICAL, siteName: "Slow Morocco", locale: "en_GB", type: "article",
    authors: ["J. Ng"], tags: ["vanilla", "Madagascar", "Edmond Albius", "spice trade", "SAVA"],
  },
  twitter: { card: "summary_large_image", title: "The Vanilla Orchid", description: "80% of the world's vanilla from one island. $20 to $600/kg. The most labour-intensive crop on Earth." },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-snippet": -1, "max-image-preview": "large" } },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Article", "@id": `${CANONICAL}#article`,
      "headline": "The Vanilla Orchid — From Edmond Albius to Madagascar's $1.8B Industry",
      "description": "Madagascar produces 80% of the world's vanilla. Prices have swung from $20 to $600/kg. The second most expensive spice on Earth, built on a 12-year-old enslaved boy's discovery.",
      "datePublished": "2025-01-01", "dateModified": new Date().toISOString().split("T")[0],
      "author": { "@type": "Person", "name": "J. Ng", "url": `${BASE_URL}/about` },
      "publisher": { "@type": "Organization", "name": "Slow Morocco", "url": BASE_URL },
      "mainEntityOfPage": CANONICAL, "articleSection": "Cultural Intelligence",
    },
    {
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Slow Morocco", "item": BASE_URL },
        { "@type": "ListItem", "position": 2, "name": "Stories", "item": `${BASE_URL}/stories` },
        { "@type": "ListItem", "position": 3, "name": "The Vanilla Orchid", "item": CANONICAL },
      ],
    },
  ],
};

export default function TheVanillaOrchidPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <TheVanillaOrchidContent />
    </>
  );
}
