import { Metadata } from "next";
import { SolarAtlasContent } from "./SolarAtlasContent";

export const revalidate = 3600;

const BASE_URL = "https://www.slowmorocco.com";
const SLUG = "solar-atlas";
const CANONICAL = `${BASE_URL}/stories/${SLUG}`;

export const metadata: Metadata = {
  title: "Morocco's Solar Atlas — Noor Ouarzazate, MASEN & the 52% Renewable Target | Slow Morocco",
  description: "Morocco imports 90% of its energy but is building the world's largest concentrated solar power complex. Noor Ouarzazate powers a million homes. Target: 52% renewable by 2030.",
  keywords: ["Morocco solar energy", "Noor Ouarzazate", "MASEN", "concentrated solar power", "Morocco renewables", "Noor Midelt"],
  authors: [{ name: "J. Ng", url: `${BASE_URL}/about` }],
  alternates: { canonical: CANONICAL },
  openGraph: {
    title: "Morocco's Solar Atlas — Noor Ouarzazate & the 52% Renewable Target",
    description: "580 MW across 3,000+ hectares. The world's largest CSP complex. 90% energy import dependence driving Africa's boldest solar programme.",
    url: CANONICAL, siteName: "Slow Morocco", locale: "en_GB", type: "article",
    authors: ["J. Ng"], tags: ["solar energy", "Morocco", "Noor Ouarzazate", "MASEN", "renewables"],
  },
  twitter: { card: "summary_large_image", title: "Morocco's Solar Atlas", description: "580 MW. 3,000+ hectares. The world's largest CSP complex and Africa's boldest renewable target." },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-snippet": -1, "max-image-preview": "large" } },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Article", "@id": `${CANONICAL}#article`,
      "headline": "Morocco's Solar Atlas — Noor Ouarzazate, MASEN & the 52% Renewable Target",
      "description": "Morocco imports 90% of its energy but is building the world's largest concentrated solar power complex. Noor Ouarzazate powers a million homes.",
      "datePublished": "2025-01-01", "dateModified": new Date().toISOString().split("T")[0],
      "author": { "@type": "Person", "name": "J. Ng", "url": `${BASE_URL}/about` },
      "publisher": { "@type": "Organization", "name": "Slow Morocco", "url": BASE_URL },
      "mainEntityOfPage": CANONICAL, "articleSection": "Energy & Infrastructure",
    },
    {
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Slow Morocco", "item": BASE_URL },
        { "@type": "ListItem", "position": 2, "name": "Stories", "item": `${BASE_URL}/stories` },
        { "@type": "ListItem", "position": 3, "name": "Morocco's Solar Atlas", "item": CANONICAL },
      ],
    },
  ],
};

export default function SolarAtlasPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <SolarAtlasContent />
    </>
  );
}
