import { Metadata } from "next";
import AlmohadAtlasContent from "./AlmohadAtlasContent";

export const revalidate = 3600;

const BASE_URL = "https://www.slowmorocco.com";
const SLUG = "almohad-atlas";
const CANONICAL = `${BASE_URL}/stories/${SLUG}`;

export const metadata: Metadata = {
  title: "The Almohad Atlas — Every Surviving Monument of an Empire That Built in Stone | Slow Morocco",
  description: "Between 1130 and 1269, the Almohad caliphate built across Morocco, Spain, Portugal, and Tunisia. The Kutubiyya, the Giralda, the Hassan Tower — every surviving monument mapped.",
  keywords: ["Almohad architecture", "Almohad caliphate", "Kutubiyya Mosque", "Giralda", "Hassan Tower", "Morocco Islamic architecture", "Almohad monuments"],
  authors: [{ name: "J. Ng", url: `${BASE_URL}/about` }],
  alternates: { canonical: CANONICAL },
  openGraph: {
    title: "The Almohad Atlas — Monuments of an Empire",
    description: "139 years. 4 countries. Every surviving Almohad monument mapped and documented.",
    url: CANONICAL, siteName: "Slow Morocco", locale: "en_GB", type: "article",
    authors: ["J. Ng"], tags: ["Almohad", "architecture", "Morocco", "monuments", "Islamic art"],
  },
  twitter: { card: "summary_large_image", title: "The Almohad Atlas — Monuments of an Empire", description: "139 years. 4 countries. Every surviving Almohad monument mapped." },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-snippet": -1, "max-image-preview": "large" } },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Article", "@id": `${CANONICAL}#article`,
      "headline": "The Almohad Atlas — Every Surviving Monument of an Empire",
      "description": "Between 1130 and 1269, the Almohad caliphate controlled from the Sahara to the Tagus. Their monuments still define skylines in three cities across two continents.",
      "datePublished": "2025-01-01", "dateModified": new Date().toISOString().split("T")[0],
      "author": { "@type": "Person", "name": "J. Ng", "url": `${BASE_URL}/about` },
      "publisher": { "@type": "Organization", "name": "Slow Morocco", "url": BASE_URL },
      "mainEntityOfPage": CANONICAL, "articleSection": "Architecture & History",
    },
    {
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Slow Morocco", "item": BASE_URL },
        { "@type": "ListItem", "position": 2, "name": "Stories", "item": `${BASE_URL}/stories` },
        { "@type": "ListItem", "position": 3, "name": "The Almohad Atlas", "item": CANONICAL },
      ],
    },
  ],
};

export default function AlmohadAtlasPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <AlmohadAtlasContent />
    </>
  );
}
