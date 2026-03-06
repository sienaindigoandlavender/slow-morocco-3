import { Metadata } from "next";
import { TheUngovernablePatternContent } from "./TheUngovernablePatternContent";

export const revalidate = 3600;

const BASE_URL = "https://www.slowmorocco.com";
const SLUG = "the-ungovernable-pattern";
const CANONICAL = `${BASE_URL}/stories/${SLUG}`;

export const metadata: Metadata = {
  title: "The Ungovernable Pattern — Convergent Political Evolution | Slow Morocco",
  description: "Nine peoples. Five continents. One political architecture. Why the peoples who refuse empires keep inventing the same governance structure — assembly, removable leaders, customary law.",
  keywords: ["ungovernable pattern", "convergent political evolution", "Amazigh governance", "jemaa", "jirga", "kurultai", "stateless peoples", "self-governing"],
  authors: [{ name: "J. Ng", url: `${BASE_URL}/about` }],
  alternates: { canonical: CANONICAL },
  openGraph: {
    title: "The Ungovernable Pattern — Convergent Political Evolution",
    description: "Nine peoples on five continents independently invented the same governance structure. Assembly, removable leaders, customary law, and the refusal to centralise.",
    url: CANONICAL, siteName: "Slow Morocco", locale: "en_GB", type: "article",
    authors: ["J. Ng"], tags: ["governance", "Amazigh", "Kurds", "Mongols", "Haudenosaunee", "Pashtun", "political evolution"],
  },
  twitter: { card: "summary_large_image", title: "The Ungovernable Pattern", description: "Nine peoples. Five continents. One political architecture. Convergent political evolution." },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-snippet": -1, "max-image-preview": "large" } },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Article", "@id": `${CANONICAL}#article`,
      "headline": "The Ungovernable Pattern — Convergent Political Evolution",
      "description": "Nine peoples on five continents independently invented the same governance structure: assembly governance, removable leaders, customary law, and confederation for war.",
      "datePublished": "2025-01-01", "dateModified": new Date().toISOString().split("T")[0],
      "author": { "@type": "Person", "name": "J. Ng", "url": `${BASE_URL}/about` },
      "publisher": { "@type": "Organization", "name": "Slow Morocco", "url": BASE_URL },
      "mainEntityOfPage": CANONICAL, "articleSection": "Demographics & Society",
    },
    {
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Slow Morocco", "item": BASE_URL },
        { "@type": "ListItem", "position": 2, "name": "Stories", "item": `${BASE_URL}/stories` },
        { "@type": "ListItem", "position": 3, "name": "The Ungovernable Pattern", "item": CANONICAL },
      ],
    },
  ],
};

export default function TheUngovernablePatternPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <TheUngovernablePatternContent />
    </>
  );
}
