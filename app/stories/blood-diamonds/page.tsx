import { Metadata } from "next";
import { BloodDiamondsContent } from "./BloodDiamondsContent";

export const revalidate = 3600;

const BASE_URL = "https://www.slowmorocco.com";
const SLUG = "blood-diamonds";
const CANONICAL = `${BASE_URL}/stories/${SLUG}`;

export const metadata: Metadata = {
  title: "Blood Diamonds — Conflict, Death & the Kimberley Process Failure | Slow Morocco",
  description: "4M+ dead in diamond wars. 7M+ displaced in DRC. The Kimberley Process was designed to produce a statistic, not to solve a problem. Zero ways to trace a cut stone to its origin.",
  keywords: ["blood diamonds", "conflict diamonds", "Kimberley Process", "DRC conflict", "diamond wars", "Sierra Leone", "M23", "conflict minerals"],
  authors: [{ name: "J. Ng", url: `${BASE_URL}/about` }],
  alternates: { canonical: CANONICAL },
  openGraph: {
    title: "Blood Diamonds — Conflict, Death & the Kimberley Process Failure",
    description: "4M+ dead. 7M+ displaced. The Kimberley Process redefined conflict until the statistic improved.",
    url: CANONICAL, siteName: "Slow Morocco", locale: "en_GB", type: "article",
    authors: ["J. Ng"], tags: ["blood diamonds", "conflict diamonds", "Kimberley Process", "DRC", "Sierra Leone"],
  },
  twitter: { card: "summary_large_image", title: "Blood Diamonds — Conflict, Death & the Kimberley Process Failure", description: "4M+ dead. 7M+ displaced. Zero ways to trace a cut stone." },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-snippet": -1, "max-image-preview": "large" } },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Article", "@id": `${CANONICAL}#article`,
      "headline": "Blood Diamonds — Conflict, Death & the Kimberley Process Failure",
      "description": "4M+ dead in diamond wars. 7M+ displaced in DRC. The Kimberley Process was designed to produce a statistic, not to solve a problem.",
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
        { "@type": "ListItem", "position": 3, "name": "Blood Diamonds", "item": CANONICAL },
      ],
    },
  ],
};

export default function BloodDiamondsPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <BloodDiamondsContent />
    </>
  );
}
