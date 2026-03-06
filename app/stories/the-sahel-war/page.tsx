import { Metadata } from "next";
import { TheSahelWarContent } from "./TheSahelWarContent";

export const revalidate = 3600;

const BASE_URL = "https://www.slowmorocco.com";
const SLUG = "the-sahel-war";
const CANONICAL = `${BASE_URL}/stories/${SLUG}`;

export const metadata: Metadata = {
  title: "The Sahel War — JNIM, ISSP & the Collapse of the Center | Slow Morocco",
  description: "10,400+ dead in 2024. 51% of global terrorism deaths. JNIM, ISSP, and Wagner/Africa Corps across the Sahel — actor database, fatality escalation, territorial control, incident log. 2012–present.",
  keywords: ["Sahel war", "JNIM", "ISSP", "Islamic State Sahel Province", "Wagner Group", "Africa Corps", "Burkina Faso", "Mali", "Niger", "Benin", "ACLED", "terrorism"],
  authors: [{ name: "J. Ng", url: `${BASE_URL}/about` }],
  alternates: { canonical: CANONICAL },
  openGraph: {
    title: "The Sahel War — JNIM, ISSP & the Collapse of the Center",
    description: "10,400+ dead in 2024. 51% of global terrorism deaths. The complete Sahel conflict dataset — actors, fatalities, territorial control, incident log.",
    url: CANONICAL, siteName: "Slow Morocco", locale: "en_GB", type: "article",
    authors: ["J. Ng"], tags: ["Sahel war", "JNIM", "ISSP", "Wagner Group", "Africa Corps", "terrorism", "Burkina Faso", "Mali"],
  },
  twitter: { card: "summary_large_image", title: "The Sahel War — JNIM, ISSP & the Collapse of the Center", description: "10,400+ dead in 2024. 51% of global terrorism deaths. The complete Sahel conflict dataset." },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-snippet": -1, "max-image-preview": "large" } },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Article", "@id": `${CANONICAL}#article`,
      "headline": "The Sahel War — JNIM, ISSP & the Collapse of the Center",
      "description": "10,400+ dead in 2024. 51% of global terrorism deaths. JNIM, ISSP, and Wagner/Africa Corps across the Sahel — actor database, fatality escalation, territorial control, incident log. 2012–present.",
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
        { "@type": "ListItem", "position": 3, "name": "The Sahel War", "item": CANONICAL },
      ],
    },
  ],
};

export default function TheSahelWarPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <TheSahelWarContent />
    </>
  );
}
