import { Metadata } from "next";
import { TransSaharanTradeContent } from "./TransSaharanTradeContent";

export const revalidate = 3600;

const BASE_URL = "https://www.slowmorocco.com";
const SLUG = "trans-saharan-trade";
const CANONICAL = `${BASE_URL}/stories/${SLUG}`;

export const metadata: Metadata = {
  title: "Trans-Saharan Trade Routes — Salt, Gold & 1,200 Years of Desert Commerce | Slow Morocco",
  description: "Five major routes, 12,000-camel caravans, salt traded weight-for-weight with gold. The trans-Saharan trade network that built empires, spread Islam, and made Timbuktu and Marrakech two of the richest cities on earth.",
  keywords: ["trans-Saharan trade", "Saharan trade routes", "Timbuktu trade", "Sijilmasa", "salt gold trade", "Morocco trade history", "camel caravans"],
  authors: [{ name: "J. Ng", url: `${BASE_URL}/about` }],
  alternates: { canonical: CANONICAL },
  openGraph: {
    title: "Trans-Saharan Trade Routes — Salt, Gold & Desert Commerce",
    description: "Five routes, 12,000-camel caravans, salt for gold. 1,200 years of trade that built empires and spread Islam.",
    url: CANONICAL, siteName: "Slow Morocco", locale: "en_GB", type: "article",
    authors: ["J. Ng"], tags: ["trans-Saharan trade", "Morocco", "Timbuktu", "salt", "gold", "caravans"],
  },
  twitter: { card: "summary_large_image", title: "Trans-Saharan Trade Routes", description: "Five routes, 12,000-camel caravans, salt for gold. 1,200 years of desert commerce." },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-snippet": -1, "max-image-preview": "large" } },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Article", "@id": `${CANONICAL}#article`,
      "headline": "Trans-Saharan Trade Routes — Salt, Gold & 1,200 Years of Desert Commerce",
      "description": "Five major routes, 12,000-camel caravans, salt traded weight-for-weight with gold. The trade network that built empires and spread Islam across West Africa.",
      "datePublished": "2025-01-01", "dateModified": new Date().toISOString().split("T")[0],
      "author": { "@type": "Person", "name": "J. Ng", "url": `${BASE_URL}/about` },
      "publisher": { "@type": "Organization", "name": "Slow Morocco", "url": BASE_URL },
      "mainEntityOfPage": CANONICAL, "articleSection": "History & Trade",
    },
    {
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Slow Morocco", "item": BASE_URL },
        { "@type": "ListItem", "position": 2, "name": "Stories", "item": `${BASE_URL}/stories` },
        { "@type": "ListItem", "position": 3, "name": "Trans-Saharan Trade Routes", "item": CANONICAL },
      ],
    },
  ],
};

export default function TransSaharanTradePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <TransSaharanTradeContent />
    </>
  );
}
