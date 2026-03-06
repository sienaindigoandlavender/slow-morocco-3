import { Metadata } from "next";
import { TheRhinoUndergroundContent } from "./TheRhinoUndergroundContent";

export const revalidate = 3600;

const BASE_URL = "https://www.slowmorocco.com";
const SLUG = "the-rhino-underground";
const CANONICAL = `${BASE_URL}/stories/${SLUG}`;

export const metadata: Metadata = {
  title: "The Rhino Underground — 2,000 Rhinos, One Arrest & the Largest Wildlife Translocation in History | Slow Morocco",
  description: "One man bred 2,000 rhinos. Nobody bid at auction. African Parks bought them all and launched the largest wildlife translocation in history. Then the breeder was arrested for trafficking horns.",
  keywords: ["rhino rewilding", "African Parks", "John Hume", "rhino poaching", "Kruger rhinos", "wildlife translocation", "rhino horn trafficking", "conservation economics"],
  authors: [{ name: "J. Ng", url: `${BASE_URL}/about` }],
  alternates: { canonical: CANONICAL },
  openGraph: {
    title: "The Rhino Underground — 2,000 Rhinos, One Arrest & the Largest Rewilding Ever",
    description: "2,000 rhinos. Zero auction bids. 376 rewilded in year one. 55 criminal charges. The story of how 15% of the world's white rhinos went from farm to freedom.",
    url: CANONICAL, siteName: "Slow Morocco", locale: "en_GB", type: "article",
    authors: ["J. Ng"], tags: ["rhinos", "African Parks", "rewilding", "poaching", "conservation"],
  },
  twitter: { card: "summary_large_image", title: "The Rhino Underground", description: "2,000 rhinos. Zero bids. 376 rewilded. 55 charges. The largest wildlife translocation in history." },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-snippet": -1, "max-image-preview": "large" } },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Article", "@id": `${CANONICAL}#article`,
      "headline": "The Rhino Underground — 2,000 Rhinos, One Arrest & the Largest Wildlife Translocation in History",
      "description": "One man bred 2,000 rhinos. African Parks launched the largest wildlife translocation in history. Then the breeder was arrested for horn trafficking.",
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
        { "@type": "ListItem", "position": 3, "name": "The Rhino Underground", "item": CANONICAL },
      ],
    },
  ],
};

export default function TheRhinoUndergroundPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <TheRhinoUndergroundContent />
    </>
  );
}
