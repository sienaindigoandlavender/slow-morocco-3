import { Metadata } from "next";
import { TheShadowStateContent } from "./TheShadowStateContent";

export const revalidate = 3600;

const BASE_URL = "https://www.slowmorocco.com";
const SLUG = "the-shadow-state";
const CANONICAL = `${BASE_URL}/stories/${SLUG}`;

export const metadata: Metadata = {
  title: "The Shadow State — Al-Shabaab, IS Somalia & Horn of Africa Dataset | Slow Morocco",
  description: "$200M+ annual revenue. 7,000–12,000 fighters. 6,224 fatalities past year. 40km from Mogadishu. Al-Shabaab, IS Somalia & the Horn of Africa security dataset, 2006–present.",
  keywords: ["shadow state", "Al-Shabaab", "IS Somalia", "Horn of Africa", "Somalia", "terrorism", "al-Qaeda", "ISIS", "Mogadishu", "Sahel"],
  authors: [{ name: "J. Ng", url: `${BASE_URL}/about` }],
  alternates: { canonical: CANONICAL },
  openGraph: {
    title: "The Shadow State — Al-Shabaab, IS Somalia & Horn of Africa Dataset",
    description: "$200M+ annual revenue. 7,000–12,000 fighters. 6,224 fatalities past year. The complete Horn of Africa security dataset.",
    url: CANONICAL, siteName: "Slow Morocco", locale: "en_GB", type: "article",
    authors: ["J. Ng"], tags: ["Al-Shabaab", "IS Somalia", "Horn of Africa", "Somalia", "terrorism", "security"],
  },
  twitter: { card: "summary_large_image", title: "The Shadow State — Al-Shabaab, IS Somalia & Horn of Africa Dataset", description: "$200M+ annual revenue. 7,000–12,000 fighters. 6,224 fatalities past year. 40km from Mogadishu." },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-snippet": -1, "max-image-preview": "large" } },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Article", "@id": `${CANONICAL}#article`,
      "headline": "The Shadow State — Al-Shabaab, IS Somalia & Horn of Africa Dataset",
      "description": "$200M+ annual revenue. 7,000–12,000 fighters. 6,224 fatalities past year. 40km from Mogadishu. Al-Shabaab, IS Somalia & the Horn of Africa security dataset, 2006–present.",
      "datePublished": "2025-01-01", "dateModified": new Date().toISOString().split("T")[0],
      "author": { "@type": "Person", "name": "J. Ng", "url": `${BASE_URL}/about` },
      "publisher": { "@type": "Organization", "name": "Slow Morocco", "url": BASE_URL },
      "mainEntityOfPage": CANONICAL, "articleSection": "Security & Conflict",
    },
    {
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Slow Morocco", "item": BASE_URL },
        { "@type": "ListItem", "position": 2, "name": "Stories", "item": `${BASE_URL}/stories` },
        { "@type": "ListItem", "position": 3, "name": "The Shadow State", "item": CANONICAL },
      ],
    },
  ],
};

export default function TheShadowStatePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <TheShadowStateContent />
    </>
  );
}
