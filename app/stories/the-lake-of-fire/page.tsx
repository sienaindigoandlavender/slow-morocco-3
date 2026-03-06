import { Metadata } from "next";
import { TheLakeOfFireContent } from "./TheLakeOfFireContent";

export const revalidate = 3600;

const BASE_URL = "https://www.slowmorocco.com";
const SLUG = "the-lake-of-fire";
const CANONICAL = `${BASE_URL}/stories/${SLUG}`;

export const metadata: Metadata = {
  title: "The Lake of Fire — Boko Haram, ISWAP & the Lake Chad Basin | Slow Morocco",
  description: "Boko Haram, ISWAP & the Lake Chad Basin: 50,000+ dead, 3 million displaced, 23 years of Africa's longest jihadi insurgency. Actor database, incident log, timeline, and connected intelligence.",
  keywords: ["Boko Haram", "ISWAP", "Lake Chad Basin", "Nigeria insurgency", "Islamic State West Africa", "Chibok", "Sahel conflict", "Africa security"],
  authors: [{ name: "J. Ng", url: `${BASE_URL}/about` }],
  alternates: { canonical: CANONICAL },
  openGraph: {
    title: "The Lake of Fire — Boko Haram, ISWAP & the Lake Chad Basin",
    description: "50,000+ dead, 3M displaced, 23 years. Africa's longest jihadi insurgency mapped.",
    url: CANONICAL, siteName: "Slow Morocco", locale: "en_GB", type: "article",
    authors: ["J. Ng"], tags: ["Boko Haram", "ISWAP", "Nigeria", "Lake Chad", "insurgency", "Africa"],
  },
  twitter: { card: "summary_large_image", title: "The Lake of Fire", description: "50,000+ dead, 3M displaced, 23 years. Boko Haram, ISWAP & the Lake Chad Basin." },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-snippet": -1, "max-image-preview": "large" } },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Article", "@id": `${CANONICAL}#article`,
      "headline": "The Lake of Fire — Boko Haram, ISWAP & the Lake Chad Basin",
      "description": "Boko Haram, ISWAP & the Lake Chad Basin: 50,000+ dead, 3 million displaced, 23 years of Africa's longest jihadi insurgency.",
      "datePublished": "2025-01-01", "dateModified": new Date().toISOString().split("T")[0],
      "author": { "@type": "Person", "name": "J. Ng", "url": `${BASE_URL}/about` },
      "publisher": { "@type": "Organization", "name": "Slow Morocco", "url": BASE_URL },
      "mainEntityOfPage": CANONICAL, "articleSection": "Security & Conflict Intelligence",
    },
    {
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Slow Morocco", "item": BASE_URL },
        { "@type": "ListItem", "position": 2, "name": "Stories", "item": `${BASE_URL}/stories` },
        { "@type": "ListItem", "position": 3, "name": "The Lake of Fire", "item": CANONICAL },
      ],
    },
  ],
};

export default function TheLakeOfFirePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <TheLakeOfFireContent />
    </>
  );
}
