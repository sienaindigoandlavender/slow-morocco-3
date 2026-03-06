import { Metadata } from "next";
import { TheEducationGapContent } from "./TheEducationGapContent";

export const revalidate = 3600;

const BASE_URL = "https://www.slowmorocco.com";
const SLUG = "the-education-gap";
const CANONICAL = `${BASE_URL}/stories/${SLUG}`;

export const metadata: Metadata = {
  title: "The Education Gap — 98M Children Out of School, 86% Learning Poverty, and the Counternarrative | Slow Morocco",
  description: "98 million children out of school. 86% of 10-year-olds cannot read a simple story. But university enrollment has tripled, coding academies are booming, and EdTech startups have raised $800M. The education paradox mapped.",
  keywords: ["Africa education gap", "learning poverty Africa", "EdTech Africa", "coding academies Africa", "university enrollment Africa", "brain drain Africa", "literacy rates Africa"],
  authors: [{ name: "J. Ng", url: `${BASE_URL}/about` }],
  alternates: { canonical: CANONICAL },
  openGraph: {
    title: "The Education Gap — Africa's Education Paradox Mapped",
    description: "98M children out of school. 86% learning poverty. But university enrollment tripled and EdTech raised $800M. Two realities, one continent.",
    url: CANONICAL, siteName: "Slow Morocco", locale: "en_GB", type: "article",
    authors: ["J. Ng"], tags: ["Africa", "education", "EdTech", "literacy", "demographic dividend"],
  },
  twitter: { card: "summary_large_image", title: "The Education Gap — Africa's Education Paradox Mapped", description: "98M out of school. 86% learning poverty. But universities tripled and EdTech raised $800M." },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-snippet": -1, "max-image-preview": "large" } },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Article", "@id": `${CANONICAL}#article`,
      "headline": "The Education Gap — Africa's Education Paradox",
      "description": "98 million children out of school and 86% learning poverty alongside tripling university enrollment and $800M in EdTech investment. The paradox that shapes everything.",
      "datePublished": "2025-01-01", "dateModified": new Date().toISOString().split("T")[0],
      "author": { "@type": "Person", "name": "J. Ng", "url": `${BASE_URL}/about` },
      "publisher": { "@type": "Organization", "name": "Slow Morocco", "url": BASE_URL },
      "mainEntityOfPage": CANONICAL, "articleSection": "Education & Human Capital",
    },
    {
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Slow Morocco", "item": BASE_URL },
        { "@type": "ListItem", "position": 2, "name": "Stories", "item": `${BASE_URL}/stories` },
        { "@type": "ListItem", "position": 3, "name": "The Education Gap", "item": CANONICAL },
      ],
    },
  ],
};

export default function TheEducationGapPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <TheEducationGapContent />
    </>
  );
}
