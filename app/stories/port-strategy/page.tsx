import { Metadata } from "next";
import { PortStrategyContent } from "./PortStrategyContent";

export const revalidate = 3600;

const BASE_URL = "https://www.slowmorocco.com";
const SLUG = "port-strategy";
const CANONICAL = `${BASE_URL}/stories/${SLUG}`;

export const metadata: Metadata = {
  title: "Morocco's Port Strategy — Tanger Med, Nador West Med, Dakhla Atlantique | Slow Morocco",
  description: "In 2004, Morocco ranked 78th in global maritime connectivity. By 2024, it ranked 17th. One port — Tanger Med — changed everything. Now two more deepwater ports are under construction.",
  keywords: ["Morocco port strategy", "Tanger Med", "Nador West Med", "Dakhla Atlantique", "Morocco maritime", "Morocco trade infrastructure", "Morocco shipping"],
  authors: [{ name: "J. Ng", url: `${BASE_URL}/about` }],
  alternates: { canonical: CANONICAL },
  openGraph: {
    title: "Morocco's Port Strategy — From 78th to 17th in Maritime Connectivity",
    description: "11.1M TEUs at Tanger Med. Two new deepwater ports under construction. How Morocco built itself into a continental gateway.",
    url: CANONICAL, siteName: "Slow Morocco", locale: "en_GB", type: "article",
    authors: ["J. Ng"], tags: ["Morocco", "ports", "trade", "infrastructure", "Tanger Med"],
  },
  twitter: { card: "summary_large_image", title: "Morocco's Port Strategy — From 78th to 17th", description: "11.1M TEUs. 17th globally. Two new deepwater ports rising. Morocco's port strategy mapped." },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-snippet": -1, "max-image-preview": "large" } },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Article", "@id": `${CANONICAL}#article`,
      "headline": "Morocco's Port Strategy — Tanger Med, Nador West Med, Dakhla Atlantique",
      "description": "In 2004, Morocco ranked 78th in global maritime connectivity. By 2024, it ranked 17th. One port — Tanger Med — changed everything. Now two more deepwater ports are under construction.",
      "datePublished": "2025-01-01", "dateModified": new Date().toISOString().split("T")[0],
      "author": { "@type": "Person", "name": "J. Ng", "url": `${BASE_URL}/about` },
      "publisher": { "@type": "Organization", "name": "Slow Morocco", "url": BASE_URL },
      "mainEntityOfPage": CANONICAL, "articleSection": "Trade & Infrastructure",
    },
    {
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Slow Morocco", "item": BASE_URL },
        { "@type": "ListItem", "position": 2, "name": "Stories", "item": `${BASE_URL}/stories` },
        { "@type": "ListItem", "position": 3, "name": "Morocco's Port Strategy", "item": CANONICAL },
      ],
    },
  ],
};

export default function PortStrategyPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <PortStrategyContent />
    </>
  );
}
