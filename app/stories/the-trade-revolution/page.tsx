import { Metadata } from "next";
import { TheTradeRevolutionContent } from "./TheTradeRevolutionContent";

export const revalidate = 3600;

const BASE_URL = "https://www.slowmorocco.com";
const SLUG = "the-trade-revolution";
const CANONICAL = `${BASE_URL}/stories/${SLUG}`;

export const metadata: Metadata = {
  title: "The Trade Revolution — AfCFTA, Intra-African Trade & the $3.4T Single Market | Slow Morocco",
  description: "The African Continental Free Trade Area connects 54 countries, 1.4 billion people, and $3.4 trillion in combined GDP. Intra-African trade is just 15%. Can paperwork, politics, and potholes be overcome?",
  keywords: ["AfCFTA", "African Continental Free Trade Area", "intra-African trade", "PAPSS", "Africa trade", "African single market"],
  authors: [{ name: "J. Ng", url: `${BASE_URL}/about` }],
  alternates: { canonical: CANONICAL },
  openGraph: {
    title: "The Trade Revolution — AfCFTA & the $3.4T African Single Market",
    description: "54 countries. $3.4T combined GDP. 1.4B people. Intra-African trade is just 15%. The largest free trade area in the world exists — on paper.",
    url: CANONICAL, siteName: "Slow Morocco", locale: "en_GB", type: "article",
    authors: ["J. Ng"], tags: ["AfCFTA", "trade", "Africa", "PAPSS", "single market"],
  },
  twitter: { card: "summary_large_image", title: "The Trade Revolution", description: "54 countries. $3.4T GDP. 15% intra-African trade. The largest free trade area exists — on paper." },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-snippet": -1, "max-image-preview": "large" } },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Article", "@id": `${CANONICAL}#article`,
      "headline": "The Trade Revolution — AfCFTA, Intra-African Trade & the $3.4T Single Market",
      "description": "The African Continental Free Trade Area connects 54 countries and $3.4 trillion in combined GDP. Intra-African trade is just 15%. Can it be unlocked?",
      "datePublished": "2025-01-01", "dateModified": new Date().toISOString().split("T")[0],
      "author": { "@type": "Person", "name": "J. Ng", "url": `${BASE_URL}/about` },
      "publisher": { "@type": "Organization", "name": "Slow Morocco", "url": BASE_URL },
      "mainEntityOfPage": CANONICAL, "articleSection": "Economy & Trade",
    },
    {
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Slow Morocco", "item": BASE_URL },
        { "@type": "ListItem", "position": 2, "name": "Stories", "item": `${BASE_URL}/stories` },
        { "@type": "ListItem", "position": 3, "name": "The Trade Revolution", "item": CANONICAL },
      ],
    },
  ],
};

export default function TheTradeRevolutionPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <TheTradeRevolutionContent />
    </>
  );
}
