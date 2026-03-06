import { Metadata } from "next";
import { TheCreativeEconomyContent } from "./TheCreativeEconomyContent";

export const revalidate = 3600;

const BASE_URL = "https://www.slowmorocco.com";
const SLUG = "the-creative-economy";
const CANONICAL = `${BASE_URL}/stories/${SLUG}`;

export const metadata: Metadata = {
  title: "The Creative Economy — Africa's $4.2B Cultural Export Engine | Slow Morocco",
  description: "Afrobeats is the fastest-growing genre on Earth. Nollywood produces 2,500 films per year. African fashion and art are breaking global records. The creative economy mapped.",
  keywords: ["Africa creative economy", "Afrobeats", "Nollywood", "African fashion", "African contemporary art", "creative industries Africa", "cultural export"],
  authors: [{ name: "J. Ng", url: `${BASE_URL}/about` }],
  alternates: { canonical: CANONICAL },
  openGraph: {
    title: "The Creative Economy — Africa's $4.2B Cultural Export Engine",
    description: "Afrobeats, Nollywood, fashion, art, gaming. Africa's creative economy is the continent's most powerful soft power engine.",
    url: CANONICAL, siteName: "Slow Morocco", locale: "en_GB", type: "article",
    authors: ["J. Ng"], tags: ["Africa", "creative economy", "Afrobeats", "Nollywood", "fashion", "art"],
  },
  twitter: { card: "summary_large_image", title: "The Creative Economy — Africa's $4.2B Cultural Export Engine", description: "Afrobeats. Nollywood. Fashion. Art. Gaming. The $4.2B cultural export machine mapped." },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-snippet": -1, "max-image-preview": "large" } },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Article", "@id": `${CANONICAL}#article`,
      "headline": "The Creative Economy — Africa's $4.2B Cultural Export Engine",
      "description": "Afrobeats, Nollywood, fashion, art, and gaming. Africa's creative economy is worth $4.2 billion and accelerating.",
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
        { "@type": "ListItem", "position": 3, "name": "The Creative Economy", "item": CANONICAL },
      ],
    },
  ],
};

export default function TheCreativeEconomyPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <TheCreativeEconomyContent />
    </>
  );
}
