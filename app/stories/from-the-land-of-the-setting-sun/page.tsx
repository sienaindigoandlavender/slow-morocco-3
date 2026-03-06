import { Metadata } from "next";
import FromTheLandContent from "./FromTheLandContent";

export const revalidate = 3600;

const BASE_URL = "https://www.slowmorocco.com";
const SLUG = "from-the-land-of-the-setting-sun";
const CANONICAL = `${BASE_URL}/stories/${SLUG}`;

export const metadata: Metadata = {
  title: "From the Land of the Setting Sun — The Amazigh in the Bible | Slow Morocco",
  description: "The Imazighen appear throughout the Bible — from Genesis to Acts. Warriors who sacked Solomon's temple, the man who carried Christ's cross, three popes from the Maghreb, and the theologian who shaped Western thought for 1,500 years.",
  keywords: ["Amazigh Bible", "Berber Bible", "Imazighen scripture", "Simon of Cyrene", "Augustine of Hippo", "Lubim", "Lehabim", "African popes", "Maghreb history", "North Africa Christianity"],
  authors: [{ name: "J. Ng", url: `${BASE_URL}/about` }],
  alternates: { canonical: CANONICAL },
  openGraph: {
    title: "From the Land of the Setting Sun — The Amazigh in the Bible",
    description: "14 scripture references, 3 popes from the Maghreb, and the Berber theologian who shaped Western thought. The Imazighen in the Bible.",
    url: CANONICAL, siteName: "Slow Morocco", locale: "en_GB", type: "article",
    authors: ["J. Ng"], tags: ["Amazigh", "Bible", "Berber", "Maghreb", "Christianity", "North Africa"],
  },
  twitter: { card: "summary_large_image", title: "From the Land of the Setting Sun", description: "The Amazigh in the Bible. 14 scripture references, 3 popes, and the theologian who shaped Western thought." },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-snippet": -1, "max-image-preview": "large" } },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Article", "@id": `${CANONICAL}#article`,
      "headline": "From the Land of the Setting Sun — The Amazigh in the Bible",
      "description": "The Imazighen appear throughout the Bible — from Genesis to Acts. Warriors, cross-bearers, popes, and the theologian who shaped Western Christianity.",
      "datePublished": "2025-01-01", "dateModified": new Date().toISOString().split("T")[0],
      "author": { "@type": "Person", "name": "J. Ng", "url": `${BASE_URL}/about` },
      "publisher": { "@type": "Organization", "name": "Slow Morocco", "url": BASE_URL },
      "mainEntityOfPage": CANONICAL, "articleSection": "History & Identity",
    },
    {
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Slow Morocco", "item": BASE_URL },
        { "@type": "ListItem", "position": 2, "name": "Stories", "item": `${BASE_URL}/stories` },
        { "@type": "ListItem", "position": 3, "name": "From the Land of the Setting Sun", "item": CANONICAL },
      ],
    },
  ],
};

export default function FromTheLandPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <FromTheLandContent />
    </>
  );
}
