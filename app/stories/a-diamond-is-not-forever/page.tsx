import { Metadata } from "next";
import DiamondContent from "./DiamondContent";

export const revalidate = 3600;

const BASE_URL = "https://www.slowmorocco.com";
const SLUG = "a-diamond-is-not-forever";
const CANONICAL = `${BASE_URL}/stories/${SLUG}`;

export const metadata: Metadata = {
  title: "A Diamond Is Not Forever — De Beers, Lab-Grown Disruption & Africa's Diamond Collapse | Slow Morocco",
  description: "De Beers wrote down $6.8B in three years. Lab-grown diamonds took 50% of US engagement rings. Botswana's economy is contracting. The 138-year diamond monopoly is ending.",
  keywords: ["De Beers collapse", "lab-grown diamonds", "Botswana diamonds", "diamond industry crisis", "Anglo American De Beers", "Africa diamonds"],
  authors: [{ name: "J. Ng", url: `${BASE_URL}/about` }],
  alternates: { canonical: CANONICAL },
  openGraph: {
    title: "A Diamond Is Not Forever — De Beers & the Diamond Collapse",
    description: "$6.8B in writedowns. Lab-grown took 50% of engagement rings. The 138-year monopoly is ending.",
    url: CANONICAL, siteName: "Slow Morocco", locale: "en_GB", type: "article",
    authors: ["J. Ng"], tags: ["diamonds", "De Beers", "Botswana", "lab-grown", "Africa"],
  },
  twitter: { card: "summary_large_image", title: "A Diamond Is Not Forever", description: "$6.8B writedowns. 50% lab-grown. The diamond monopoly is ending." },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-snippet": -1, "max-image-preview": "large" } },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Article", "@id": `${CANONICAL}#article`,
      "headline": "A Diamond Is Not Forever — De Beers, Lab-Grown Disruption & Africa's Diamond Collapse",
      "description": "De Beers wrote down $6.8B in three years. Lab-grown diamonds disrupted a 138-year monopoly. Botswana's economy contracts.",
      "datePublished": "2025-01-01", "dateModified": new Date().toISOString().split("T")[0],
      "author": { "@type": "Person", "name": "J. Ng", "url": `${BASE_URL}/about` },
      "publisher": { "@type": "Organization", "name": "Slow Morocco", "url": BASE_URL },
      "mainEntityOfPage": CANONICAL, "articleSection": "Economy & Resources",
    },
    {
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Slow Morocco", "item": BASE_URL },
        { "@type": "ListItem", "position": 2, "name": "Stories", "item": `${BASE_URL}/stories` },
        { "@type": "ListItem", "position": 3, "name": "A Diamond Is Not Forever", "item": CANONICAL },
      ],
    },
  ],
};

export default function DiamondPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <DiamondContent />
    </>
  );
}
