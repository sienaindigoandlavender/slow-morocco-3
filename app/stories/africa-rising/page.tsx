import { Metadata } from "next";
import AfricaRisingContent from "./AfricaRisingContent";

export const revalidate = 3600;

const BASE_URL = "https://www.slowmorocco.com";
const SLUG = "africa-rising";
const CANONICAL = `${BASE_URL}/stories/${SLUG}`;

export const metadata: Metadata = {
  title: "Africa Rising — Morocco's Rank Among 54 African Nations, Six Metrics, Twenty Years | Slow Morocco",
  description: "In 2005, Morocco was Africa's 7th largest economy. Twenty years later: 5th in GDP, 1st in tourism, 2nd in renewable energy and infrastructure. The trajectory mapped.",
  keywords: ["Morocco Africa ranking", "Morocco GDP Africa", "Morocco tourism Africa", "Morocco renewable energy", "Africa Rising Morocco", "Morocco infrastructure"],
  authors: [{ name: "J. Ng", url: `${BASE_URL}/about` }],
  alternates: { canonical: CANONICAL },
  openGraph: {
    title: "Africa Rising — Morocco's Twenty-Year Climb",
    description: "From 7th to 5th in GDP. From 3rd to 1st in tourism. Morocco's rise among 54 African nations mapped.",
    url: CANONICAL, siteName: "Slow Morocco", locale: "en_GB", type: "article",
    authors: ["J. Ng"], tags: ["Morocco", "Africa", "economy", "tourism", "infrastructure"],
  },
  twitter: { card: "summary_large_image", title: "Africa Rising — Morocco's Twenty-Year Climb", description: "#1 in tourism. #2 in renewables. #5 in GDP. Morocco's rise mapped." },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-snippet": -1, "max-image-preview": "large" } },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Article", "@id": `${CANONICAL}#article`,
      "headline": "Africa Rising — Morocco's Rank Among 54 African Nations",
      "description": "Morocco's competitive position across GDP, tourism, FDI, renewable energy, HDI, and infrastructure from 2005 to 2025.",
      "datePublished": "2025-01-01", "dateModified": new Date().toISOString().split("T")[0],
      "author": { "@type": "Person", "name": "J. Ng", "url": `${BASE_URL}/about` },
      "publisher": { "@type": "Organization", "name": "Slow Morocco", "url": BASE_URL },
      "mainEntityOfPage": CANONICAL, "articleSection": "Economy & Competitiveness",
    },
    {
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Slow Morocco", "item": BASE_URL },
        { "@type": "ListItem", "position": 2, "name": "Stories", "item": `${BASE_URL}/stories` },
        { "@type": "ListItem", "position": 3, "name": "Africa Rising", "item": CANONICAL },
      ],
    },
  ],
};

export default function AfricaRisingPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <AfricaRisingContent />
    </>
  );
}
