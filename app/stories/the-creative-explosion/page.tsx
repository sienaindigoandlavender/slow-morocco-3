import { Metadata } from "next";
import { TheCreativeExplosionContent } from "./TheCreativeExplosionContent";

export const revalidate = 3600;

const BASE_URL = "https://www.slowmorocco.com";
const SLUG = "the-creative-explosion";
const CANONICAL = `${BASE_URL}/stories/${SLUG}`;

export const metadata: Metadata = {
  title: "The Creative Explosion — Afrobeats, Nollywood, and Africa's $50B Creative Economy | Slow Morocco",
  description: "Afrobeats went from 2 billion to 24 billion streams in seven years. Nollywood produces 2,500 films annually. Africa's creative economy is projected to reach $50 billion by 2030.",
  keywords: ["Africa creative economy", "Afrobeats streaming", "Nollywood", "Africa fashion industry", "Africa cultural exports", "creative explosion Africa"],
  authors: [{ name: "J. Ng", url: `${BASE_URL}/about` }],
  alternates: { canonical: CANONICAL },
  openGraph: {
    title: "The Creative Explosion — Africa's $50B Creative Economy",
    description: "Afrobeats: 24B streams. Nollywood: 2,500 films/year. Fashion: $31B. Africa's creative economy mapped.",
    url: CANONICAL, siteName: "Slow Morocco", locale: "en_GB", type: "article",
    authors: ["J. Ng"], tags: ["Africa", "creative economy", "Afrobeats", "Nollywood", "fashion"],
  },
  twitter: { card: "summary_large_image", title: "The Creative Explosion — Africa's $50B Creative Economy", description: "24B Afrobeats streams. 2,500 Nollywood films/year. $31B fashion industry. The explosion mapped." },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-snippet": -1, "max-image-preview": "large" } },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Article", "@id": `${CANONICAL}#article`,
      "headline": "The Creative Explosion — Africa's Creative Economy",
      "description": "Afrobeats, Nollywood, fashion, and the full spectrum of Africa's creative industries projected to reach $50 billion by 2030.",
      "datePublished": "2025-01-01", "dateModified": new Date().toISOString().split("T")[0],
      "author": { "@type": "Person", "name": "J. Ng", "url": `${BASE_URL}/about` },
      "publisher": { "@type": "Organization", "name": "Slow Morocco", "url": BASE_URL },
      "mainEntityOfPage": CANONICAL, "articleSection": "Creative Economy",
    },
    {
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Slow Morocco", "item": BASE_URL },
        { "@type": "ListItem", "position": 2, "name": "Stories", "item": `${BASE_URL}/stories` },
        { "@type": "ListItem", "position": 3, "name": "The Creative Explosion", "item": CANONICAL },
      ],
    },
  ],
};

export default function TheCreativeExplosionPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <TheCreativeExplosionContent />
    </>
  );
}
