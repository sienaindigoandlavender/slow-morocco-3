import { Metadata } from "next";
import { TheGorongosaResurrectionContent } from "./TheGorongosaResurrectionContent";

export const revalidate = 3600;

const BASE_URL = "https://www.slowmorocco.com";
const SLUG = "the-gorongosa-resurrection";
const CANONICAL = `${BASE_URL}/stories/${SLUG}`;

export const metadata: Metadata = {
  title: "The Gorongosa Resurrection — Conservation Economics & Wildlife Recovery | Slow Morocco",
  description: "Civil war killed 95% of the wildlife. One man spent $100 million. Ten thousand animals became 110,000. Six lions became two hundred. The most dramatic wildlife recovery in modern conservation.",
  keywords: ["Gorongosa", "wildlife recovery", "conservation economics", "Greg Carr", "Mozambique", "national park restoration", "Africa conservation"],
  authors: [{ name: "J. Ng", url: `${BASE_URL}/about` }],
  alternates: { canonical: CANONICAL },
  openGraph: {
    title: "The Gorongosa Resurrection — Conservation Economics & Wildlife Recovery",
    description: "Civil war killed 95% of the wildlife. $100M invested. 10,000 animals became 110,000. The most dramatic wildlife recovery in modern conservation.",
    url: CANONICAL, siteName: "Slow Morocco", locale: "en_GB", type: "article",
    authors: ["J. Ng"], tags: ["Gorongosa", "conservation", "Mozambique", "wildlife", "Africa"],
  },
  twitter: { card: "summary_large_image", title: "The Gorongosa Resurrection", description: "Civil war killed 95% of the wildlife. $100M invested. 10,000 animals became 110,000." },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-snippet": -1, "max-image-preview": "large" } },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Article", "@id": `${CANONICAL}#article`,
      "headline": "The Gorongosa Resurrection — Conservation Economics & Wildlife Recovery",
      "description": "Civil war killed 95% of the wildlife. One man spent $100 million. Ten thousand animals became 110,000. The most dramatic wildlife recovery in modern conservation.",
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
        { "@type": "ListItem", "position": 3, "name": "The Gorongosa Resurrection", "item": CANONICAL },
      ],
    },
  ],
};

export default function TheGorongosaResurrectionPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <TheGorongosaResurrectionContent />
    </>
  );
}
