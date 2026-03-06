import { Metadata } from "next";
import { TheLongRiseContent } from "./TheLongRiseContent";

export const revalidate = 3600;

const BASE_URL = "https://www.slowmorocco.com";
const SLUG = "the-long-rise";
const CANONICAL = `${BASE_URL}/stories/${SLUG}`;

export const metadata: Metadata = {
  title: "The Long Rise — Morocco's Tourist Arrivals, 2000–2025 | Slow Morocco",
  description: "From 4.28 million in 2000 to 20 million in 2025. One line, twenty-five years. Watch Morocco become a destination in real time.",
  keywords: ["Morocco tourism", "Morocco tourist arrivals", "Morocco tourism growth", "Morocco UNWTO", "Morocco travel statistics", "Morocco 2025 tourism"],
  authors: [{ name: "J. Ng", url: `${BASE_URL}/about` }],
  alternates: { canonical: CANONICAL },
  openGraph: {
    title: "The Long Rise — Morocco's Tourist Arrivals, 2000–2025",
    description: "From 4.28M to 20M in twenty-five years. Every crisis produced a higher floor. The line draws itself.",
    url: CANONICAL, siteName: "Slow Morocco", locale: "en_GB", type: "article",
    authors: ["J. Ng"], tags: ["Morocco", "tourism", "arrivals", "data", "UNWTO"],
  },
  twitter: { card: "summary_large_image", title: "The Long Rise — Morocco's Tourist Arrivals, 2000–2025", description: "4.28M → 20M. One line. Twenty-five years. The line draws itself." },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-snippet": -1, "max-image-preview": "large" } },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Article", "@id": `${CANONICAL}#article`,
      "headline": "The Long Rise — Morocco's Tourist Arrivals, 2000–2025",
      "description": "Morocco's overnight tourist arrivals from 4.28 million in 2000 to 20 million in 2025, charted year by year with milestones, crises, and recoveries.",
      "datePublished": "2025-01-01", "dateModified": new Date().toISOString().split("T")[0],
      "author": { "@type": "Person", "name": "J. Ng", "url": `${BASE_URL}/about` },
      "publisher": { "@type": "Organization", "name": "Slow Morocco", "url": BASE_URL },
      "mainEntityOfPage": CANONICAL, "articleSection": "Tourism",
    },
    {
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Slow Morocco", "item": BASE_URL },
        { "@type": "ListItem", "position": 2, "name": "Stories", "item": `${BASE_URL}/stories` },
        { "@type": "ListItem", "position": 3, "name": "The Long Rise", "item": CANONICAL },
      ],
    },
  ],
};

export default function TheLongRisePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <TheLongRiseContent />
    </>
  );
}
