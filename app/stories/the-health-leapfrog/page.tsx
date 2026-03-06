import { Metadata } from "next";
import { TheHealthLeapfrogContent } from "./TheHealthLeapfrogContent";

export const revalidate = 3600;

const BASE_URL = "https://www.slowmorocco.com";
const SLUG = "the-health-leapfrog";
const CANONICAL = `${BASE_URL}/stories/${SLUG}`;

export const metadata: Metadata = {
  title: "The Health Leapfrog — Drones, mRNA Hubs, AI Diagnostics and Africa's Health Innovation | Slow Morocco",
  description: "Africa carries 25% of the global disease burden with 3% of the world's health workers. Drones deliver blood faster than ambulances. mRNA vaccine hubs aim to end dependence on imported medicine.",
  keywords: ["Africa health leapfrog", "Zipline drones Rwanda", "mRNA vaccine Africa", "community health workers Africa", "Africa disease burden", "health innovation Africa"],
  authors: [{ name: "J. Ng", url: `${BASE_URL}/about` }],
  alternates: { canonical: CANONICAL },
  openGraph: {
    title: "The Health Leapfrog — Africa's Healthcare Innovation",
    description: "95% of malaria deaths. 3% of health workers. 70M+ drone deliveries. Africa is leapfrogging legacy healthcare.",
    url: CANONICAL, siteName: "Slow Morocco", locale: "en_GB", type: "article",
    authors: ["J. Ng"], tags: ["Africa", "health", "innovation", "drones", "mRNA", "leapfrog"],
  },
  twitter: { card: "summary_large_image", title: "The Health Leapfrog — Africa's Healthcare Innovation", description: "3% of health workers. 25% of disease burden. 70M+ drone deliveries. The leapfrog is survival." },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-snippet": -1, "max-image-preview": "large" } },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Article", "@id": `${CANONICAL}#article`,
      "headline": "The Health Leapfrog — Africa's Healthcare Innovation",
      "description": "Africa carries 25% of the global disease burden with 3% of the world's health workers. Drones, mRNA hubs, AI diagnostics, and community health workers are rewriting healthcare.",
      "datePublished": "2025-01-01", "dateModified": new Date().toISOString().split("T")[0],
      "author": { "@type": "Person", "name": "J. Ng", "url": `${BASE_URL}/about` },
      "publisher": { "@type": "Organization", "name": "Slow Morocco", "url": BASE_URL },
      "mainEntityOfPage": CANONICAL, "articleSection": "Africa Progression",
    },
    {
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Slow Morocco", "item": BASE_URL },
        { "@type": "ListItem", "position": 2, "name": "Stories", "item": `${BASE_URL}/stories` },
        { "@type": "ListItem", "position": 3, "name": "The Health Leapfrog", "item": CANONICAL },
      ],
    },
  ],
};

export default function TheHealthLeapfrogPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <TheHealthLeapfrogContent />
    </>
  );
}
