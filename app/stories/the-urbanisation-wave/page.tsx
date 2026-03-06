import { Metadata } from "next";
import { TheUrbanisationWaveContent } from "./TheUrbanisationWaveContent";

export const revalidate = 3600;

const BASE_URL = "https://www.slowmorocco.com";
const SLUG = "the-urbanisation-wave";
const CANONICAL = `${BASE_URL}/stories/${SLUG}`;

export const metadata: Metadata = {
  title: "The Urbanisation Wave — Africa's 950M Urban Explosion by 2050 | Slow Morocco",
  description: "Africa will add 950 million urban residents by 2050. Lagos could reach 88 million by 2100. 256 million live in slums. The largest construction project in human history is about to begin.",
  keywords: ["Africa urbanisation", "Lagos megacity", "African cities growth", "urban population Africa", "infrastructure deficit Africa", "Kinshasa growth"],
  authors: [{ name: "J. Ng", url: `${BASE_URL}/about` }],
  alternates: { canonical: CANONICAL },
  openGraph: {
    title: "The Urbanisation Wave — Africa's 950M Urban Explosion",
    description: "950M new urban residents by 2050. Lagos at 88M by 2100. 256M in slums. The largest construction project in history.",
    url: CANONICAL, siteName: "Slow Morocco", locale: "en_GB", type: "article",
    authors: ["J. Ng"], tags: ["urbanisation", "Africa", "Lagos", "megacities", "infrastructure"],
  },
  twitter: { card: "summary_large_image", title: "The Urbanisation Wave", description: "950M new urban residents. Lagos 88M by 2100. The largest construction project in human history." },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-snippet": -1, "max-image-preview": "large" } },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Article", "@id": `${CANONICAL}#article`,
      "headline": "The Urbanisation Wave — Africa's 950M Urban Explosion by 2050",
      "description": "Africa will add 950 million urban residents by 2050. Lagos could reach 88 million by 2100. The largest construction project in human history.",
      "datePublished": "2025-01-01", "dateModified": new Date().toISOString().split("T")[0],
      "author": { "@type": "Person", "name": "J. Ng", "url": `${BASE_URL}/about` },
      "publisher": { "@type": "Organization", "name": "Slow Morocco", "url": BASE_URL },
      "mainEntityOfPage": CANONICAL, "articleSection": "Africa Progression",
    },
    {
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Slow Morocco", "item": BASE_URL },
        { "@type": "ListItem", "position": 2, "name": "Stories", "item": `${BASE_URL}/stories` },
        { "@type": "ListItem", "position": 3, "name": "The Urbanisation Wave", "item": CANONICAL },
      ],
    },
  ],
};

export default function TheUrbanisationWavePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <TheUrbanisationWaveContent />
    </>
  );
}
