import { Metadata } from "next";
import { TheCacaoEquationContent } from "./TheCacaoEquationContent";

export const revalidate = 3600;

const BASE_URL = "https://www.slowmorocco.com";
const SLUG = "the-cacao-equation";
const CANONICAL = `${BASE_URL}/stories/${SLUG}`;

export const metadata: Metadata = {
  title: "The Cacao Equation — From Olmec Sacred Drink to West Africa's Colonial Crop | Slow Morocco",
  description: "West Africa grows 70% of the world's cocoa. Europe grinds 43%. Farmers receive less than 6% of the retail price. The $169B chocolate industry's colonial equation.",
  keywords: ["cacao", "cocoa", "chocolate industry", "West Africa cocoa", "Côte d'Ivoire", "Ghana cocoa", "cocoa price crisis", "cacao history"],
  authors: [{ name: "J. Ng", url: `${BASE_URL}/about` }],
  alternates: { canonical: CANONICAL },
  openGraph: {
    title: "The Cacao Equation — Colonial Crop, Global Industry",
    description: "70% grown in West Africa. 43% ground in Europe. 6% to the farmer. The $169B chocolate equation.",
    url: CANONICAL, siteName: "Slow Morocco", locale: "en_GB", type: "article",
    authors: ["J. Ng"], tags: ["cacao", "cocoa", "chocolate", "West Africa", "colonial agriculture"],
  },
  twitter: { card: "summary_large_image", title: "The Cacao Equation", description: "70% grown in West Africa. 6% to the farmer. The $169B chocolate equation." },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-snippet": -1, "max-image-preview": "large" } },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Article", "@id": `${CANONICAL}#article`,
      "headline": "The Cacao Equation — From Olmec Sacred Drink to West Africa's Colonial Crop",
      "description": "West Africa grows 70% of the world's cocoa. Europe grinds 43%. Farmers receive less than 6% of the retail price. The chocolate industry's colonial equation.",
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
        { "@type": "ListItem", "position": 3, "name": "The Cacao Equation", "item": CANONICAL },
      ],
    },
  ],
};

export default function TheCacaoEquationPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <TheCacaoEquationContent />
    </>
  );
}
