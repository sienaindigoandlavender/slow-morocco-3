import { Metadata } from "next";
import { MoroccanGenomeContent } from "./MoroccanGenomeContent";

export const revalidate = 3600;

const BASE_URL = "https://www.slowmorocco.com";
const SLUG = "moroccan-genome";
const CANONICAL = `${BASE_URL}/stories/${SLUG}`;

export const metadata: Metadata = {
  title: "The Moroccan Genome — 300,000 Years of DNA, Migration and Identity | Slow Morocco",
  description: "What DNA says about who Moroccans are. 51% North African, 11% European, 11% Middle Eastern, 7% West African. The Moroccan Genome Project's 109 whole genomes mapped.",
  keywords: ["Moroccan genome", "Moroccan DNA", "Morocco genetics", "E-M81", "Berber DNA", "North African ancestry", "Moroccan Genome Project", "Morocco ethnicity"],
  authors: [{ name: "J. Ng", url: `${BASE_URL}/about` }],
  alternates: { canonical: CANONICAL },
  openGraph: {
    title: "The Moroccan Genome — 300,000 Years of DNA, Migration and Identity",
    description: "51% North African ancestry found nowhere else on Earth. E-M81 at 98% in Amazigh men. Almost no genetic difference between Arab and Berber Moroccans.",
    url: CANONICAL, siteName: "Slow Morocco", locale: "en_GB", type: "article",
    authors: ["J. Ng"], tags: ["Morocco", "genetics", "DNA", "ancestry", "ethnicity"],
  },
  twitter: { card: "summary_large_image", title: "The Moroccan Genome — 300,000 Years of DNA", description: "51% autochthonous North African. E-M81 at 98% in Amazigh men. What 109 whole genomes reveal." },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-snippet": -1, "max-image-preview": "large" } },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Article", "@id": `${CANONICAL}#article`,
      "headline": "The Moroccan Genome — 300,000 Years of DNA, Migration and Identity",
      "description": "What DNA says about who Moroccans are. Autosomal ancestry, Y-chromosome haplogroups, maternal lineages, and the identity question mapped from 109 whole genomes.",
      "datePublished": "2025-01-01", "dateModified": new Date().toISOString().split("T")[0],
      "author": { "@type": "Person", "name": "J. Ng", "url": `${BASE_URL}/about` },
      "publisher": { "@type": "Organization", "name": "Slow Morocco", "url": BASE_URL },
      "mainEntityOfPage": CANONICAL, "articleSection": "Genetics & Identity",
    },
    {
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Slow Morocco", "item": BASE_URL },
        { "@type": "ListItem", "position": 2, "name": "Stories", "item": `${BASE_URL}/stories` },
        { "@type": "ListItem", "position": 3, "name": "The Moroccan Genome", "item": CANONICAL },
      ],
    },
  ],
};

export default function MoroccanGenomePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <MoroccanGenomeContent />
    </>
  );
}
