import { Metadata } from "next";
import { TheDemographicDividendContent } from "./TheDemographicDividendContent";

export const revalidate = 3600;

const BASE_URL = "https://www.slowmorocco.com";
const SLUG = "the-demographic-dividend";
const CANONICAL = `${BASE_URL}/stories/${SLUG}`;

export const metadata: Metadata = {
  title: "The Demographic Dividend — Africa's Population, Youth Bulge & the Window of Opportunity | Slow Morocco",
  description: "By 2050, one in four humans will be African. The median age is 19. By 2035, more young Africans will enter the workforce than in the rest of the world combined. Dividend or time bomb — only policy decides.",
  keywords: ["Africa demographic dividend", "Africa population growth", "youth bulge Africa", "Africa median age", "Africa megacities", "Lagos population", "Africa workforce"],
  authors: [{ name: "J. Ng", url: `${BASE_URL}/about` }],
  alternates: { canonical: CANONICAL },
  openGraph: {
    title: "The Demographic Dividend — Africa's Population & the Window of Opportunity",
    description: "1.53B today. 2.5B by 2050. Median age 19. The greatest economic opportunity of the 21st century — or its greatest crisis.",
    url: CANONICAL, siteName: "Slow Morocco", locale: "en_GB", type: "article",
    authors: ["J. Ng"], tags: ["demographics", "Africa", "population", "youth bulge", "megacities"],
  },
  twitter: { card: "summary_large_image", title: "The Demographic Dividend", description: "By 2050, one in four humans will be African. Median age 19. Dividend or time bomb — only policy decides." },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-snippet": -1, "max-image-preview": "large" } },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Article", "@id": `${CANONICAL}#article`,
      "headline": "The Demographic Dividend — Africa's Population, Youth Bulge & the Window of Opportunity",
      "description": "By 2050, one in four humans will be African. The median age is 19. By 2035, more young Africans will enter the workforce than in the rest of the world combined.",
      "datePublished": "2025-01-01", "dateModified": new Date().toISOString().split("T")[0],
      "author": { "@type": "Person", "name": "J. Ng", "url": `${BASE_URL}/about` },
      "publisher": { "@type": "Organization", "name": "Slow Morocco", "url": BASE_URL },
      "mainEntityOfPage": CANONICAL, "articleSection": "Demographics & Population",
    },
    {
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Slow Morocco", "item": BASE_URL },
        { "@type": "ListItem", "position": 2, "name": "Stories", "item": `${BASE_URL}/stories` },
        { "@type": "ListItem", "position": 3, "name": "The Demographic Dividend", "item": CANONICAL },
      ],
    },
  ],
};

export default function TheDemographicDividendPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <TheDemographicDividendContent />
    </>
  );
}
