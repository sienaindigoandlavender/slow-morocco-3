import { Metadata } from "next";
import { TheInfrastructureRevolutionContent } from "./TheInfrastructureRevolutionContent";

export const revalidate = 3600;

const BASE_URL = "https://www.slowmorocco.com";
const SLUG = "the-infrastructure-revolution";
const CANONICAL = `${BASE_URL}/stories/${SLUG}`;

export const metadata: Metadata = {
  title: "The Infrastructure Revolution — $2.5 Trillion in Projects Reshaping Africa | Slow Morocco",
  description: "Africa is building more infrastructure than at any point in human history. $2.5 trillion in projects planned. China invested $61 billion in 2025 alone. Two rival pipelines race to connect Nigerian gas to Europe.",
  keywords: ["Africa infrastructure", "Belt and Road Africa", "Nigeria-Morocco pipeline", "GERD dam", "Lobito Corridor", "Africa megaprojects", "China BRI Africa", "Trans-Saharan pipeline"],
  authors: [{ name: "J. Ng", url: `${BASE_URL}/about` }],
  alternates: { canonical: CANONICAL },
  openGraph: {
    title: "The Infrastructure Revolution — Africa's $2.5 Trillion Build",
    description: "$61B Chinese investment in 2025. Two rival pipelines. Twelve megaprojects worth $157B. The continent's biggest construction boom mapped.",
    url: CANONICAL, siteName: "Slow Morocco", locale: "en_GB", type: "article",
    authors: ["J. Ng"], tags: ["Africa", "infrastructure", "China", "BRI", "pipelines", "Morocco"],
  },
  twitter: { card: "summary_large_image", title: "The Infrastructure Revolution — Africa's $2.5 Trillion Build", description: "$61B Chinese investment. Two rival pipelines. Twelve megaprojects. Africa's biggest construction boom mapped." },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-snippet": -1, "max-image-preview": "large" } },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Article", "@id": `${CANONICAL}#article`,
      "headline": "The Infrastructure Revolution — $2.5 Trillion in Projects Reshaping Africa",
      "description": "Africa is building more infrastructure than at any point in human history. China, the US, and African nations compete to finance and construct the continent's future.",
      "datePublished": "2025-01-01", "dateModified": new Date().toISOString().split("T")[0],
      "author": { "@type": "Person", "name": "J. Ng", "url": `${BASE_URL}/about` },
      "publisher": { "@type": "Organization", "name": "Slow Morocco", "url": BASE_URL },
      "mainEntityOfPage": CANONICAL, "articleSection": "Infrastructure & Development",
    },
    {
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Slow Morocco", "item": BASE_URL },
        { "@type": "ListItem", "position": 2, "name": "Stories", "item": `${BASE_URL}/stories` },
        { "@type": "ListItem", "position": 3, "name": "The Infrastructure Revolution", "item": CANONICAL },
      ],
    },
  ],
};

export default function TheInfrastructureRevolutionPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <TheInfrastructureRevolutionContent />
    </>
  );
}
