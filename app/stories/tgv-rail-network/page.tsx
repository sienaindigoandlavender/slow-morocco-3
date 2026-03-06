import { Metadata } from "next";
import { TgvRailNetworkContent } from "./TgvRailNetworkContent";

export const revalidate = 3600;

const BASE_URL = "https://www.slowmorocco.com";
const SLUG = "tgv-rail-network";
const CANONICAL = `${BASE_URL}/stories/${SLUG}`;

export const metadata: Metadata = {
  title: "The TGV & Rail Network — Africa's Only High-Speed Rail, 55M Passengers & the 2040 Vision | Slow Morocco",
  description: "Africa's only high-speed rail. 55 million passengers a year. A $9.5 billion investment plan that will connect 43 cities by 2040. And a feasibility study for a tunnel under the Strait of Gibraltar.",
  keywords: ["Morocco TGV", "Al Boraq", "Morocco high-speed rail", "ONCF", "Morocco rail network", "Africa rail", "Strait of Gibraltar tunnel"],
  authors: [{ name: "J. Ng", url: `${BASE_URL}/about` }],
  alternates: { canonical: CANONICAL },
  openGraph: {
    title: "The TGV & Rail Network — Africa's Only High-Speed Rail",
    description: "320 km/h. 55M passengers. $9.5B investment. 43 cities by 2040. Morocco's rail revolution.",
    url: CANONICAL, siteName: "Slow Morocco", locale: "en_GB", type: "article",
    authors: ["J. Ng"], tags: ["Morocco", "TGV", "Al Boraq", "high-speed rail", "ONCF", "infrastructure"],
  },
  twitter: { card: "summary_large_image", title: "The TGV & Rail Network", description: "Africa's only high-speed rail. 55M passengers. $9.5B investment. 43 cities by 2040." },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-snippet": -1, "max-image-preview": "large" } },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Article", "@id": `${CANONICAL}#article`,
      "headline": "The TGV & Rail Network — Africa's Only High-Speed Rail, 55M Passengers & the 2040 Vision",
      "description": "Africa's only high-speed rail. 55 million passengers a year. A $9.5 billion investment plan connecting 43 cities by 2040.",
      "datePublished": "2025-01-01", "dateModified": new Date().toISOString().split("T")[0],
      "author": { "@type": "Person", "name": "J. Ng", "url": `${BASE_URL}/about` },
      "publisher": { "@type": "Organization", "name": "Slow Morocco", "url": BASE_URL },
      "mainEntityOfPage": CANONICAL, "articleSection": "Infrastructure",
    },
    {
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Slow Morocco", "item": BASE_URL },
        { "@type": "ListItem", "position": 2, "name": "Stories", "item": `${BASE_URL}/stories` },
        { "@type": "ListItem", "position": 3, "name": "The TGV & Rail Network", "item": CANONICAL },
      ],
    },
  ],
};

export default function TgvRailNetworkPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <TgvRailNetworkContent />
    </>
  );
}
