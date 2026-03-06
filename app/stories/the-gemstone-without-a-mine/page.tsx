import { Metadata } from "next";
import { TheGemstoneWithoutAMineContent } from "./TheGemstoneWithoutAMineContent";

export const revalidate = 3600;

const BASE_URL = "https://www.slowmorocco.com";
const SLUG = "the-gemstone-without-a-mine";
const CANONICAL = `${BASE_URL}/stories/${SLUG}`;

export const metadata: Metadata = {
  title: "The Gemstone Without a Mine — Libyan Desert Glass, 29 Million Years Old | Slow Morocco",
  description: "29 million years ago, something melted the Sahara into 98% pure silica glass scattered across 6,500 km². Tutankhamun wore it. Scientists still cannot find the crater.",
  keywords: ["Libyan Desert Glass", "LDG", "Tutankhamun scarab", "Hypatia stone", "impact glass", "Great Sand Sea", "Egypt Libya border"],
  authors: [{ name: "J. Ng", url: `${BASE_URL}/about` }],
  alternates: { canonical: CANONICAL },
  openGraph: {
    title: "The Gemstone Without a Mine — Libyan Desert Glass",
    description: "29 million years. 98% pure silica. 6,500 km². One pharaoh. Zero craters. The mystery of Libyan Desert Glass.",
    url: CANONICAL, siteName: "Slow Morocco", locale: "en_GB", type: "article",
    authors: ["J. Ng"], tags: ["Libyan Desert Glass", "geology", "Tutankhamun", "Hypatia stone", "impact glass"],
  },
  twitter: { card: "summary_large_image", title: "The Gemstone Without a Mine", description: "29 million years. 98% pure silica. One pharaoh. Zero craters." },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-snippet": -1, "max-image-preview": "large" } },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Article", "@id": `${CANONICAL}#article`,
      "headline": "The Gemstone Without a Mine — Libyan Desert Glass, 29 Million Years Old",
      "description": "29 million years ago, something melted the Sahara into 98% pure silica glass. Tutankhamun wore it. Scientists still cannot find the crater.",
      "datePublished": "2025-01-01", "dateModified": new Date().toISOString().split("T")[0],
      "author": { "@type": "Person", "name": "J. Ng", "url": `${BASE_URL}/about` },
      "publisher": { "@type": "Organization", "name": "Slow Morocco", "url": BASE_URL },
      "mainEntityOfPage": CANONICAL, "articleSection": "Geology & Science",
    },
    {
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Slow Morocco", "item": BASE_URL },
        { "@type": "ListItem", "position": 2, "name": "Stories", "item": `${BASE_URL}/stories` },
        { "@type": "ListItem", "position": 3, "name": "The Gemstone Without a Mine", "item": CANONICAL },
      ],
    },
  ],
};

export default function TheGemstoneWithoutAMinePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <TheGemstoneWithoutAMineContent />
    </>
  );
}
