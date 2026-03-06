import { Metadata } from "next";
import { TheConservationPlaybookContent } from "./TheConservationPlaybookContent";

export const revalidate = 3600;

const BASE_URL = "https://www.slowmorocco.com";
const SLUG = "the-conservation-playbook";
const CANONICAL = `${BASE_URL}/stories/${SLUG}`;

export const metadata: Metadata = {
  title: "The Conservation Playbook — Five Mechanisms, Ten Models, What Actually Works in Africa | Slow Morocco",
  description: "Five mechanisms. Ten models. Four success stories. Six failure patterns. Every working conservation programme in Africa shares the same structural DNA. This is the field guide to what actually works.",
  keywords: ["conservation Africa", "wildlife conservation", "Namibia conservancies", "Rwanda gorilla permits", "Lion Guardians", "Gorongosa", "African Parks", "conservation economics"],
  authors: [{ name: "J. Ng", url: `${BASE_URL}/about` }],
  alternates: { canonical: CANONICAL },
  openGraph: {
    title: "The Conservation Playbook — What Actually Works in African Conservation",
    description: "Five mechanisms. Ten models. Six failure patterns. The field guide to what works in African conservation — and why it has not been replicated.",
    url: CANONICAL, siteName: "Slow Morocco", locale: "en_GB", type: "article",
    authors: ["J. Ng"], tags: ["conservation", "Africa", "wildlife", "Namibia", "Rwanda", "Gorongosa"],
  },
  twitter: { card: "summary_large_image", title: "The Conservation Playbook", description: "Five mechanisms. Ten models. Six failure patterns. What actually works in African conservation." },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-snippet": -1, "max-image-preview": "large" } },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Article", "@id": `${CANONICAL}#article`,
      "headline": "The Conservation Playbook — Five Mechanisms, Ten Models, What Actually Works in Africa",
      "description": "Five mechanisms. Ten models. Four success stories. Six failure patterns. The field guide to what actually works in African conservation.",
      "datePublished": "2025-01-01", "dateModified": new Date().toISOString().split("T")[0],
      "author": { "@type": "Person", "name": "J. Ng", "url": `${BASE_URL}/about` },
      "publisher": { "@type": "Organization", "name": "Slow Morocco", "url": BASE_URL },
      "mainEntityOfPage": CANONICAL, "articleSection": "Conservation",
    },
    {
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Slow Morocco", "item": BASE_URL },
        { "@type": "ListItem", "position": 2, "name": "Stories", "item": `${BASE_URL}/stories` },
        { "@type": "ListItem", "position": 3, "name": "The Conservation Playbook", "item": CANONICAL },
      ],
    },
  ],
};

export default function TheConservationPlaybookPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <TheConservationPlaybookContent />
    </>
  );
}
