import { Metadata } from "next";
import { TheNamibiaModelContent } from "./TheNamibiaModelContent";

export const revalidate = 3600;

const BASE_URL = "https://www.slowmorocco.com";
const SLUG = "the-namibia-model";
const CANONICAL = `${BASE_URL}/stories/${SLUG}`;

export const metadata: Metadata = {
  title: "The Namibia Model — Community Conservation at Continental Scale | Slow Morocco",
  description: "The country that put conservation in its constitution. 86 communal conservancies. 20% of the country managed by communities. 45.6% under conservation. Elephants tripled. Desert lions returned. Then drought, COVID, and a cull tested everything.",
  keywords: ["Namibia conservation", "communal conservancies", "CBNRM", "desert lions", "community conservation", "Namibia wildlife"],
  authors: [{ name: "J. Ng", url: `${BASE_URL}/about` }],
  alternates: { canonical: CANONICAL },
  openGraph: {
    title: "The Namibia Model — Community Conservation at Continental Scale",
    description: "86 conservancies. 45.6% of land under conservation. Elephants tripled. The model that put wildlife in community hands.",
    url: CANONICAL, siteName: "Slow Morocco", locale: "en_GB", type: "article",
    authors: ["J. Ng"], tags: ["Namibia", "conservation", "communal conservancies", "desert lions", "Africa"],
  },
  twitter: { card: "summary_large_image", title: "The Namibia Model", description: "86 conservancies. 45.6% under conservation. The country that gave wildlife to its people." },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-snippet": -1, "max-image-preview": "large" } },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Article", "@id": `${CANONICAL}#article`,
      "headline": "The Namibia Model — Community Conservation at Continental Scale",
      "description": "The country that put conservation in its constitution. 86 communal conservancies. 45.6% under conservation. Elephants tripled. Desert lions returned.",
      "datePublished": "2025-01-01", "dateModified": new Date().toISOString().split("T")[0],
      "author": { "@type": "Person", "name": "J. Ng", "url": `${BASE_URL}/about` },
      "publisher": { "@type": "Organization", "name": "Slow Morocco", "url": BASE_URL },
      "mainEntityOfPage": CANONICAL, "articleSection": "Community Conservation",
    },
    {
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Slow Morocco", "item": BASE_URL },
        { "@type": "ListItem", "position": 2, "name": "Stories", "item": `${BASE_URL}/stories` },
        { "@type": "ListItem", "position": 3, "name": "The Namibia Model", "item": CANONICAL },
      ],
    },
  ],
};

export default function TheNamibiaModelPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <TheNamibiaModelContent />
    </>
  );
}
