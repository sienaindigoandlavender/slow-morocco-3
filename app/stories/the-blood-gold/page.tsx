import { Metadata } from "next";
import { TheBloodGoldContent } from "./TheBloodGoldContent";

export const revalidate = 3600;

const BASE_URL = "https://www.slowmorocco.com";
const SLUG = "the-blood-gold";
const CANONICAL = `${BASE_URL}/stories/${SLUG}`;

export const metadata: Metadata = {
  title: "The Blood Gold — Wagner Group / Africa Corps Operations Dataset | Slow Morocco",
  description: "7 countries. 5,000+ fighters. 1,800+ civilians killed. $2.5B+ in gold laundered since Feb 2022. Wagner Group and Africa Corps Africa operations dataset, 2017–present.",
  keywords: ["blood gold", "Wagner Group", "Africa Corps", "gold laundering", "CAR", "Mali", "Sudan", "conflict minerals", "ACLED", "Sahel"],
  authors: [{ name: "J. Ng", url: `${BASE_URL}/about` }],
  alternates: { canonical: CANONICAL },
  openGraph: {
    title: "The Blood Gold — Wagner Group / Africa Corps Operations Dataset",
    description: "7 countries. 1,800+ civilians killed. $2.5B+ in gold laundered. The complete Wagner/Africa Corps Africa operations dataset.",
    url: CANONICAL, siteName: "Slow Morocco", locale: "en_GB", type: "article",
    authors: ["J. Ng"], tags: ["blood gold", "Wagner Group", "Africa Corps", "gold laundering", "conflict minerals"],
  },
  twitter: { card: "summary_large_image", title: "The Blood Gold — Wagner Group / Africa Corps Operations Dataset", description: "7 countries. 1,800+ civilians killed. $2.5B+ in gold laundered since Feb 2022." },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-snippet": -1, "max-image-preview": "large" } },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Article", "@id": `${CANONICAL}#article`,
      "headline": "The Blood Gold — Wagner Group / Africa Corps Operations Dataset",
      "description": "7 countries. 5,000+ fighters. 1,800+ civilians killed. $2.5B+ in gold laundered since Feb 2022. Wagner Group and Africa Corps Africa operations dataset, 2017–present.",
      "datePublished": "2025-01-01", "dateModified": new Date().toISOString().split("T")[0],
      "author": { "@type": "Person", "name": "J. Ng", "url": `${BASE_URL}/about` },
      "publisher": { "@type": "Organization", "name": "Slow Morocco", "url": BASE_URL },
      "mainEntityOfPage": CANONICAL, "articleSection": "Conflict & Resources",
    },
    {
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Slow Morocco", "item": BASE_URL },
        { "@type": "ListItem", "position": 2, "name": "Stories", "item": `${BASE_URL}/stories` },
        { "@type": "ListItem", "position": 3, "name": "The Blood Gold", "item": CANONICAL },
      ],
    },
  ],
};

export default function TheBloodGoldPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <TheBloodGoldContent />
    </>
  );
}
