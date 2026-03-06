import { Metadata } from "next";
import { NotAllDesertIsSandContent } from "./NotAllDesertIsSandContent";

export const revalidate = 3600;

const BASE_URL = "https://www.slowmorocco.com";
const SLUG = "not-all-desert-is-sand";
const CANONICAL = `${BASE_URL}/stories/${SLUG}`;

export const metadata: Metadata = {
  title: "Not All Desert Is Sand — Erg, Reg, Hammada & Oued | Slow Morocco",
  description: "Hammada, reg, erg, oued. Four Arabic words for four types of desert. Sand dunes are the minority landscape — rock, stone, and gravel cover 75% of the Sahara.",
  keywords: ["Sahara desert types", "erg", "reg", "hammada", "oued", "Erg Chebbi", "Erg Chegaga", "Morocco desert", "Sahara landscape"],
  authors: [{ name: "J. Ng", url: `${BASE_URL}/about` }],
  alternates: { canonical: CANONICAL },
  openGraph: {
    title: "Not All Desert Is Sand — Erg, Reg, Hammada & Oued",
    description: "Sand dunes cover only 25% of the Sahara. Rock, gravel, and bedrock make up the rest. Four Arabic words name four desert landscapes.",
    url: CANONICAL, siteName: "Slow Morocco", locale: "en_GB", type: "article",
    authors: ["J. Ng"], tags: ["Sahara", "desert", "erg", "reg", "hammada", "oued", "Morocco"],
  },
  twitter: { card: "summary_large_image", title: "Not All Desert Is Sand", description: "Sand dunes cover only 25% of the Sahara. Rock, gravel, and bedrock make up the rest." },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-snippet": -1, "max-image-preview": "large" } },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Article", "@id": `${CANONICAL}#article`,
      "headline": "Not All Desert Is Sand — Erg, Reg, Hammada & Oued",
      "description": "Hammada, reg, erg, oued. Four Arabic words for four types of desert. Sand dunes are the minority landscape — rock, stone, and gravel cover 75% of the Sahara.",
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
        { "@type": "ListItem", "position": 3, "name": "Not All Desert Is Sand", "item": CANONICAL },
      ],
    },
  ],
};

export default function NotAllDesertIsSandPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <NotAllDesertIsSandContent />
    </>
  );
}
