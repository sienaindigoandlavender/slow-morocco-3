import { Metadata } from "next";
import { TheSonWhoTookTheFireContent } from "./TheSonWhoTookTheFireContent";

export const revalidate = 3600;

const BASE_URL = "https://www.slowmorocco.com";
const SLUG = "the-son-who-took-the-fire";
const CANONICAL = `${BASE_URL}/stories/${SLUG}`;

export const metadata: Metadata = {
  title: "The Son Who Took the Fire — Menelik I, the Ark & the Solomonic Dynasty | Slow Morocco",
  description: "Menelik I, the Ark of the Covenant, and the most successful political myth in human history. The Kebra Nagast, the Solomonic dynasty, and 704 years of Ethiopian imperial legitimacy.",
  keywords: ["Menelik I", "Kebra Nagast", "Ark of the Covenant", "Solomonic dynasty", "Ethiopia", "Queen of Sheba", "Haile Selassie", "Axum"],
  authors: [{ name: "J. Ng", url: `${BASE_URL}/about` }],
  alternates: { canonical: CANONICAL },
  openGraph: {
    title: "The Son Who Took the Fire — Menelik I, the Ark & the Solomonic Dynasty",
    description: "Menelik I, the Ark of the Covenant, and the most successful political myth in human history. 704 years of Ethiopian imperial legitimacy.",
    url: CANONICAL, siteName: "Slow Morocco", locale: "en_GB", type: "article",
    authors: ["J. Ng"], tags: ["Menelik I", "Kebra Nagast", "Ark of the Covenant", "Solomonic dynasty", "Ethiopia"],
  },
  twitter: { card: "summary_large_image", title: "The Son Who Took the Fire", description: "Menelik I, the Ark of the Covenant, and the most successful political myth in human history." },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-snippet": -1, "max-image-preview": "large" } },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Article", "@id": `${CANONICAL}#article`,
      "headline": "The Son Who Took the Fire — Menelik I, the Ark & the Solomonic Dynasty",
      "description": "Menelik I, the Ark of the Covenant, and the most successful political myth in human history. The Kebra Nagast, the Solomonic dynasty, and 704 years of Ethiopian imperial legitimacy.",
      "datePublished": "2025-01-01", "dateModified": new Date().toISOString().split("T")[0],
      "author": { "@type": "Person", "name": "J. Ng", "url": `${BASE_URL}/about` },
      "publisher": { "@type": "Organization", "name": "Slow Morocco", "url": BASE_URL },
      "mainEntityOfPage": CANONICAL, "articleSection": "Cultural Intelligence",
    },
    {
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Slow Morocco", "item": BASE_URL },
        { "@type": "ListItem", "position": 2, "name": "Stories", "item": `${BASE_URL}/stories` },
        { "@type": "ListItem", "position": 3, "name": "The Son Who Took the Fire", "item": CANONICAL },
      ],
    },
  ],
};

export default function TheSonWhoTookTheFirePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <TheSonWhoTookTheFireContent />
    </>
  );
}
