import { Metadata } from "next";
import { TheSilkRoadIntoAfricaContent } from "./TheSilkRoadIntoAfricaContent";

export const revalidate = 3600;

const BASE_URL = "https://www.slowmorocco.com";
const SLUG = "the-silk-road-into-africa";
const CANONICAL = `${BASE_URL}/stories/${SLUG}`;

export const metadata: Metadata = {
  title: "The Silk Road Into Africa — China's Belt & Road Initiative Dataset | Slow Morocco",
  description: "$182.3 billion in loans. 52 countries signed. 10,000km of railways. China's Belt & Road Initiative in Africa — operations dataset, 2000–2025.",
  keywords: ["Belt and Road Initiative", "BRI", "China Africa", "Chinese loans Africa", "infrastructure", "FOCAC", "debt trap", "Kenya SGR", "Angola", "Djibouti"],
  authors: [{ name: "J. Ng", url: `${BASE_URL}/about` }],
  alternates: { canonical: CANONICAL },
  openGraph: {
    title: "The Silk Road Into Africa — China's Belt & Road Initiative Dataset",
    description: "$182.3 billion in loans. 52 countries signed. 10,000km of railways. The largest infrastructure programme in human history, mapped and measured.",
    url: CANONICAL, siteName: "Slow Morocco", locale: "en_GB", type: "article",
    authors: ["J. Ng"], tags: ["Belt and Road Initiative", "BRI", "China Africa", "infrastructure", "FOCAC"],
  },
  twitter: { card: "summary_large_image", title: "The Silk Road Into Africa — China's Belt & Road Initiative Dataset", description: "$182.3 billion in loans. 52 countries signed. 10,000km of railways." },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-snippet": -1, "max-image-preview": "large" } },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Article", "@id": `${CANONICAL}#article`,
      "headline": "The Silk Road Into Africa — China's Belt & Road Initiative Dataset",
      "description": "$182.3 billion in loans. 52 countries signed. 10,000km of railways. China's Belt & Road Initiative in Africa — operations dataset, 2000–2025.",
      "datePublished": "2025-01-01", "dateModified": new Date().toISOString().split("T")[0],
      "author": { "@type": "Person", "name": "J. Ng", "url": `${BASE_URL}/about` },
      "publisher": { "@type": "Organization", "name": "Slow Morocco", "url": BASE_URL },
      "mainEntityOfPage": CANONICAL, "articleSection": "Geopolitical & Economic Intelligence",
    },
    {
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Slow Morocco", "item": BASE_URL },
        { "@type": "ListItem", "position": 2, "name": "Stories", "item": `${BASE_URL}/stories` },
        { "@type": "ListItem", "position": 3, "name": "The Silk Road Into Africa", "item": CANONICAL },
      ],
    },
  ],
};

export default function TheSilkRoadIntoAfricaPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <TheSilkRoadIntoAfricaContent />
    </>
  );
}
