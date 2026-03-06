import { Metadata } from "next";
import { TheBuildContent } from "./TheBuildContent";

export const revalidate = 3600;

const BASE_URL = "https://www.slowmorocco.com";
const SLUG = "the-build";
const CANONICAL = `${BASE_URL}/stories/${SLUG}`;

export const metadata: Metadata = {
  title: "The Build — 27 Years of Morocco's Infrastructure & Economic Transformation | Slow Morocco",
  description: "From 560 km of highway to 3,000. From $57B GDP to $220B. Morocco's infrastructure and economic transformation from 2004 to 2030, visualised year by year.",
  keywords: ["Morocco infrastructure", "Morocco GDP", "Morocco World Cup 2030", "Morocco highway", "Morocco HSR", "Morocco renewable energy", "Morocco tourism", "Morocco economy"],
  authors: [{ name: "J. Ng", url: `${BASE_URL}/about` }],
  alternates: { canonical: CANONICAL },
  openGraph: {
    title: "The Build — 27 Years of Morocco's Transformation",
    description: "Highway, rail, airports, hotels, tourism, GDP, FDI, renewables, urbanisation. 2004 to 2030. Press play.",
    url: CANONICAL, siteName: "Slow Morocco", locale: "en_GB", type: "article",
    authors: ["J. Ng"], tags: ["Morocco", "infrastructure", "economy", "World Cup 2030", "renewable energy"],
  },
  twitter: { card: "summary_large_image", title: "The Build — 27 Years of Morocco's Transformation", description: "From 560 km of highway to 3,000. From $57B GDP to $220B. Press play." },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-snippet": -1, "max-image-preview": "large" } },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Article", "@id": `${CANONICAL}#article`,
      "headline": "The Build — 27 Years of Morocco's Infrastructure & Economic Transformation",
      "description": "Morocco's infrastructure and economic data from 2004 to 2030: highway, rail, airports, hotels, tourism, GDP, FDI, renewable energy, and urbanisation.",
      "datePublished": "2025-01-01", "dateModified": new Date().toISOString().split("T")[0],
      "author": { "@type": "Person", "name": "J. Ng", "url": `${BASE_URL}/about` },
      "publisher": { "@type": "Organization", "name": "Slow Morocco", "url": BASE_URL },
      "mainEntityOfPage": CANONICAL, "articleSection": "Infrastructure & Economy",
    },
    {
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Slow Morocco", "item": BASE_URL },
        { "@type": "ListItem", "position": 2, "name": "Stories", "item": `${BASE_URL}/stories` },
        { "@type": "ListItem", "position": 3, "name": "The Build", "item": CANONICAL },
      ],
    },
  ],
};

export default function TheBuildPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <TheBuildContent />
    </>
  );
}
