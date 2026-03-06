import { Metadata } from "next";
import { TheEmptyQuarterContent } from "./TheEmptyQuarterContent";

export const revalidate = 3600;

const BASE_URL = "https://www.slowmorocco.com";
const SLUG = "the-empty-quarter";
const CANONICAL = `${BASE_URL}/stories/${SLUG}`;

export const metadata: Metadata = {
  title: "The Empty Quarter — Sahara Geography, Ecosystem & People | Slow Morocco",
  description: "9.2 million square kilometres. 11 countries. The largest hot desert on Earth — terrain, peoples, biodiversity, and the 20,000-year green cycle.",
  keywords: ["Sahara desert", "Empty Quarter", "Sahara geography", "Sahara terrain", "hamada", "erg", "Tuareg", "Sahara biodiversity", "Green Sahara", "Morocco desert"],
  authors: [{ name: "J. Ng", url: `${BASE_URL}/about` }],
  alternates: { canonical: CANONICAL },
  openGraph: {
    title: "The Empty Quarter — Sahara Geography, Ecosystem & People",
    description: "9.2 million km². 11 countries. The largest hot desert on Earth — terrain types, peoples, biodiversity, and the 20,000-year green cycle.",
    url: CANONICAL, siteName: "Slow Morocco", locale: "en_GB", type: "article",
    authors: ["J. Ng"], tags: ["Sahara", "desert", "geography", "ecosystem", "Morocco"],
  },
  twitter: { card: "summary_large_image", title: "The Empty Quarter", description: "9.2 million km². 11 countries. The largest hot desert on Earth — and one of its most misunderstood ecosystems." },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-snippet": -1, "max-image-preview": "large" } },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Article", "@id": `${CANONICAL}#article`,
      "headline": "The Empty Quarter — Sahara Geography, Ecosystem & People",
      "description": "9.2 million square kilometres. 11 countries. The largest hot desert on Earth — terrain, peoples, biodiversity, and the 20,000-year green cycle.",
      "datePublished": "2025-01-01", "dateModified": new Date().toISOString().split("T")[0],
      "author": { "@type": "Person", "name": "J. Ng", "url": `${BASE_URL}/about` },
      "publisher": { "@type": "Organization", "name": "Slow Morocco", "url": BASE_URL },
      "mainEntityOfPage": CANONICAL, "articleSection": "Geographic & Environmental Intelligence",
    },
    {
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Slow Morocco", "item": BASE_URL },
        { "@type": "ListItem", "position": 2, "name": "Stories", "item": `${BASE_URL}/stories` },
        { "@type": "ListItem", "position": 3, "name": "The Empty Quarter", "item": CANONICAL },
      ],
    },
  ],
};

export default function TheEmptyQuarterPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <TheEmptyQuarterContent />
    </>
  );
}
