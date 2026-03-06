import { Metadata } from "next";
import { TheLionGuardiansContent } from "./TheLionGuardiansContent";

export const revalidate = 3600;

const BASE_URL = "https://www.slowmorocco.com";
const SLUG = "the-lion-guardians";
const CANONICAL = `${BASE_URL}/stories/${SLUG}`;

export const metadata: Metadata = {
  title: "The Lion Guardians — Maasai Warriors Protecting Lions in Amboseli-Tsavo | Slow Morocco",
  description: "In 2006, 42 lions were killed in Amboseli. Today, Maasai warriors track them by name. Lion killing dropped 99%. The population tripled. The idea came from the warriors themselves.",
  keywords: ["Lion Guardians", "Maasai warriors", "Amboseli lions", "lion conservation Kenya", "Leela Hazzah", "wildlife coexistence"],
  authors: [{ name: "J. Ng", url: `${BASE_URL}/about` }],
  alternates: { canonical: CANONICAL },
  openGraph: {
    title: "The Lion Guardians — Maasai Warriors Protecting Lions",
    description: "42 lions killed in 2006. Zero in 2024. Maasai warriors became lion protectors. 99% reduction in killing. Population tripled.",
    url: CANONICAL, siteName: "Slow Morocco", locale: "en_GB", type: "article",
    authors: ["J. Ng"], tags: ["lions", "Maasai", "Amboseli", "conservation", "Kenya", "wildlife"],
  },
  twitter: { card: "summary_large_image", title: "The Lion Guardians", description: "42 lions killed in 2006. Zero in 2024. The warriors who once killed them now protect them." },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-snippet": -1, "max-image-preview": "large" } },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Article", "@id": `${CANONICAL}#article`,
      "headline": "The Lion Guardians — Maasai Warriors Protecting Lions in Amboseli-Tsavo",
      "description": "In 2006, 42 lions were killed in Amboseli. Today, Maasai warriors track them by name. Lion killing dropped 99%. The population tripled.",
      "datePublished": "2025-01-01", "dateModified": new Date().toISOString().split("T")[0],
      "author": { "@type": "Person", "name": "J. Ng", "url": `${BASE_URL}/about` },
      "publisher": { "@type": "Organization", "name": "Slow Morocco", "url": BASE_URL },
      "mainEntityOfPage": CANONICAL, "articleSection": "Wildlife & Conservation",
    },
    {
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Slow Morocco", "item": BASE_URL },
        { "@type": "ListItem", "position": 2, "name": "Stories", "item": `${BASE_URL}/stories` },
        { "@type": "ListItem", "position": 3, "name": "The Lion Guardians", "item": CANONICAL },
      ],
    },
  ],
};

export default function TheLionGuardiansPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <TheLionGuardiansContent />
    </>
  );
}
