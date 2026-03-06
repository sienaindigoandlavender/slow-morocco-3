import { Metadata } from "next";
import { TheEnergyParadoxContent } from "./TheEnergyParadoxContent";

export const revalidate = 3600;

const BASE_URL = "https://www.slowmorocco.com";
const SLUG = "the-energy-paradox";
const CANONICAL = `${BASE_URL}/stories/${SLUG}`;

export const metadata: Metadata = {
  title: "The Energy Paradox — Africa's Solar Potential & the Financing Gap | Slow Morocco",
  description: "Africa holds 60% of the world's best solar resources and attracts less than 3% of global energy financing. 600 million people lack electricity. The continent that could power the planet can't power itself.",
  keywords: ["Africa energy paradox", "Africa solar potential", "renewable energy Africa", "energy access Africa", "off-grid solar Africa", "Africa energy financing"],
  authors: [{ name: "J. Ng", url: `${BASE_URL}/about` }],
  alternates: { canonical: CANONICAL },
  openGraph: {
    title: "The Energy Paradox — Africa's Solar Potential & the Financing Gap",
    description: "60% of the world's solar resources. 3% of global energy financing. 600 million without electricity. The numbers are starting to move.",
    url: CANONICAL, siteName: "Slow Morocco", locale: "en_GB", type: "article",
    authors: ["J. Ng"], tags: ["energy", "solar", "Africa", "renewables", "off-grid"],
  },
  twitter: { card: "summary_large_image", title: "The Energy Paradox", description: "60% of solar resources. 3% of financing. 600M without electricity. Africa's energy paradox." },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-snippet": -1, "max-image-preview": "large" } },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Article", "@id": `${CANONICAL}#article`,
      "headline": "The Energy Paradox — Africa's Solar Potential & the Financing Gap",
      "description": "Africa holds 60% of the world's best solar resources and attracts less than 3% of global energy financing. 600 million people lack electricity.",
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
        { "@type": "ListItem", "position": 3, "name": "The Energy Paradox", "item": CANONICAL },
      ],
    },
  ],
};

export default function TheEnergyParadoxPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <TheEnergyParadoxContent />
    </>
  );
}
