import { Metadata } from "next";
import { ThePoachingEconomicsContent } from "./ThePoachingEconomicsContent";

export const revalidate = 3600;

const BASE_URL = "https://www.slowmorocco.com";
const SLUG = "the-poaching-economics";
const CANONICAL = `${BASE_URL}/stories/${SLUG}`;

export const metadata: Metadata = {
  title: "The Poaching Economics — Conservation Economics & the Illegal Wildlife Trade | Slow Morocco",
  description: "A ranger earns $200 a month. A poacher earns $5,000 for one rhino horn. The syndicate earns $60,000 per kilogram. The war on poaching is a war on poverty dressed up as a war on crime.",
  keywords: ["poaching economics", "rhino horn trade", "illegal wildlife trade", "conservation economics", "anti-poaching", "wildlife trafficking"],
  authors: [{ name: "J. Ng", url: `${BASE_URL}/about` }],
  alternates: { canonical: CANONICAL },
  openGraph: {
    title: "The Poaching Economics — Conservation Economics & the Illegal Wildlife Trade",
    description: "$60k/kg rhino horn. $200/month ranger salary. $23B illegal wildlife trade. The economics of poaching laid bare.",
    url: CANONICAL, siteName: "Slow Morocco", locale: "en_GB", type: "article",
    authors: ["J. Ng"], tags: ["poaching", "rhino horn", "conservation", "wildlife trade", "Africa"],
  },
  twitter: { card: "summary_large_image", title: "The Poaching Economics", description: "$60k/kg rhino horn. $200/month ranger salary. The war on poaching is a war on poverty." },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-snippet": -1, "max-image-preview": "large" } },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Article", "@id": `${CANONICAL}#article`,
      "headline": "The Poaching Economics — Conservation Economics & the Illegal Wildlife Trade",
      "description": "A ranger earns $200 a month. A poacher earns $5,000 for one rhino horn. The syndicate earns $60,000 per kilogram. The war on poaching is a war on poverty dressed up as a war on crime.",
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
        { "@type": "ListItem", "position": 3, "name": "The Poaching Economics", "item": CANONICAL },
      ],
    },
  ],
};

export default function ThePoachingEconomicsPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <ThePoachingEconomicsContent />
    </>
  );
}
