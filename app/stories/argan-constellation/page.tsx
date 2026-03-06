import { Metadata } from "next";
import ArganConstellationContent from "./ArganConstellationContent";

export const revalidate = 3600;

const BASE_URL = "https://www.slowmorocco.com";
const SLUG = "argan-constellation";
const CANONICAL = `${BASE_URL}/stories/${SLUG}`;

export const metadata: Metadata = {
  title: "The Argan Constellation — 20 Hours, 40 Kilograms, 1 Litre: Morocco's Liquid Gold | Slow Morocco",
  description: "Argan oil takes 20 hours of manual labour and 40kg of fruit per litre. $0.80/hour at the cooperative. $980/litre on the luxury shelf. 1,225× markup. The forest is shrinking.",
  keywords: ["argan oil Morocco", "argan cooperative", "Morocco argan tree", "argan extraction", "argan forest loss", "Morocco women cooperatives", "Moroccanoil"],
  authors: [{ name: "J. Ng", url: `${BASE_URL}/about` }],
  alternates: { canonical: CANONICAL },
  openGraph: {
    title: "The Argan Constellation — Morocco's Liquid Gold",
    description: "20 hours. 40kg. 1 litre. $0.80/hour to $980/litre. The argan oil story.",
    url: CANONICAL, siteName: "Slow Morocco", locale: "en_GB", type: "article",
    authors: ["J. Ng"], tags: ["argan", "Morocco", "cooperatives", "sustainability", "women"],
  },
  twitter: { card: "summary_large_image", title: "The Argan Constellation — Morocco's Liquid Gold", description: "20 hours of labour. $0.80/hr to $980/litre. The argan story." },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-snippet": -1, "max-image-preview": "large" } },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Article", "@id": `${CANONICAL}#article`,
      "headline": "The Argan Constellation — 20 Hours, 40 Kilograms, 1 Litre",
      "description": "Argan oil extraction, pricing, cooperative economy, and forest loss in Morocco's UNESCO Biosphere Reserve.",
      "datePublished": "2025-01-01", "dateModified": new Date().toISOString().split("T")[0],
      "author": { "@type": "Person", "name": "J. Ng", "url": `${BASE_URL}/about` },
      "publisher": { "@type": "Organization", "name": "Slow Morocco", "url": BASE_URL },
      "mainEntityOfPage": CANONICAL, "articleSection": "Sustainability & Labour",
    },
    {
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Slow Morocco", "item": BASE_URL },
        { "@type": "ListItem", "position": 2, "name": "Stories", "item": `${BASE_URL}/stories` },
        { "@type": "ListItem", "position": 3, "name": "The Argan Constellation", "item": CANONICAL },
      ],
    },
  ],
};

export default function ArganConstellationPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <ArganConstellationContent />
    </>
  );
}
