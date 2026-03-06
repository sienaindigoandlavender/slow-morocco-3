import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getStoryBySlug, getStoryImages, getJourneys } from "@/lib/supabase";
import { TheSharedGrandmotherContent } from "./TheSharedGrandmotherContent";

export const revalidate = 3600;

const BASE_URL = "https://www.slowmorocco.com";
const SLUG = "the-shared-grandmother";
const CANONICAL = `${BASE_URL}/stories/${SLUG}`;

// ─────────────────────────────────────────────────────────────────────────────
// METADATA
// ─────────────────────────────────────────────────────────────────────────────

export const metadata: Metadata = {
  title: "The Shared Grandmother — Amazigh & Sámi DNA | Slow Morocco",
  description:
    "Amazigh and Sámi — two peoples 5,000 km apart share a 9,000-year-old mitochondrial DNA branch. U5b1b: one grandmother, two directions. From the Franco-Cantabrian refuge to the Sahara and the Arctic.",
  keywords: [
    "Amazigh Sámi DNA", "U5b1b", "mitochondrial DNA", "shared grandmother",
    "Berber Sámi genetics", "Franco-Cantabrian refuge", "E-M81", "N1c",
    "Achilli 2005", "Amazigh genetics", "Sámi genetics", "haplogroup U5b",
    "Ice Age migration", "North Africa genetics", "Fennoscandia genetics",
    "indigenous peoples DNA", "Amazigh identity", "Morocco genetics",
  ],
  authors: [{ name: "J. Ng", url: `${BASE_URL}/about` }],
  alternates: { canonical: CANONICAL },
  openGraph: {
    title: "The Shared Grandmother — Amazigh & Sámi DNA",
    description: "Two peoples 5,000 km apart share a 9,000-year-old mitochondrial DNA branch. One grandmother, two directions.",
    url: CANONICAL,
    siteName: "Slow Morocco",
    locale: "en_GB",
    type: "article",
    authors: ["J. Ng"],
    tags: ["Amazigh", "Sámi", "genetics", "DNA", "mitochondrial", "U5b1b"],
  },
  twitter: {
    card: "summary_large_image",
    title: "The Shared Grandmother — Amazigh & Sámi DNA",
    description: "Two peoples 5,000 km apart share a 9,000-year-old mitochondrial DNA branch.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-snippet": -1, "max-image-preview": "large" },
  },
};

// ─────────────────────────────────────────────────────────────────────────────
// JSON-LD
// ─────────────────────────────────────────────────────────────────────────────

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Article",
      "@id": `${CANONICAL}#article`,
      "headline": "The Shared Grandmother — Amazigh & Sámi DNA",
      "description": "Amazigh and Sámi — two peoples 5,000 km apart share a 9,000-year-old mitochondrial DNA branch. U5b1b: one grandmother, two directions.",
      "datePublished": "2025-01-01",
      "dateModified": new Date().toISOString().split("T")[0],
      "author": { "@type": "Person", "name": "J. Ng", "url": `${BASE_URL}/about` },
      "publisher": { "@type": "Organization", "name": "Slow Morocco", "url": BASE_URL },
      "mainEntityOfPage": CANONICAL,
      "keywords": "Amazigh, Sámi, U5b1b, mitochondrial DNA, genetics, Franco-Cantabrian refuge, E-M81, N1c, Ice Age migration",
      "articleSection": "Genetics & Identity",
      "spatialCoverage": { "@type": "Place", "name": "North Africa & Fennoscandia", "geo": { "@type": "GeoShape", "box": "15.0 -17.02 71.0 35.0" } },
    },
    {
      "@type": "Dataset",
      "@id": `${CANONICAL}#dataset`,
      "name": "Amazigh & Sámi Genetic Comparison Data",
      "description": "Haplogroup data, migration timelines, and comparative demographic data for Amazigh and Sámi populations. Includes Y-DNA, mtDNA frequencies, and geographic distribution.",
      "url": CANONICAL,
      "creator": { "@type": "Organization", "name": "Slow Morocco", "url": BASE_URL },
      "spatialCoverage": "North Africa, Fennoscandia",
      "temporalCoverage": "45000 BC/..",
      "license": "https://creativecommons.org/licenses/by/4.0/",
    },
    {
      "@type": "Thing",
      "@id": `${CANONICAL}#u5b1b`,
      "name": "Haplogroup U5b1b — The Shared Grandmother",
      "description": "A mitochondrial DNA branch approximately 9,000 years old, found at highest frequencies in Sámi (~48%) and Amazigh (~2%) populations. Traces to hunter-gatherers who sheltered in the Franco-Cantabrian refuge during the Last Glacial Maximum. When the ice retreated, descendants moved north to Scandinavia and south across Gibraltar to North Africa.",
    },
    {
      "@type": "FAQPage",
      "@id": `${CANONICAL}#faq`,
      "mainEntity": [
        {
          "@type": "Question",
          "name": "How are the Amazigh and Sámi genetically related?",
          "acceptedAnswer": { "@type": "Answer", "text": "The Amazigh (Berber) and Sámi share a mitochondrial DNA branch called U5b1b, approximately 9,000 years old. This maternal lineage traces to hunter-gatherers who sheltered in the Franco-Cantabrian refuge (southwestern France/northern Spain) during the Last Glacial Maximum. When the ice retreated, some moved north to Scandinavia (becoming ancestors of the Sámi) and some moved south across Gibraltar to North Africa (becoming ancestors of the Amazigh)." },
        },
        {
          "@type": "Question",
          "name": "What is haplogroup U5b1b?",
          "acceptedAnswer": { "@type": "Answer", "text": "U5b1b is a mitochondrial DNA haplogroup approximately 9,000 years old. It reaches ~48% frequency in some Sámi groups and ~2% in Berber populations. It was identified as the link between these two distant populations by Achilli et al. in 2005 in a paper titled 'Saami and Berbers — An Unexpected Mitochondrial DNA Link' published in the American Journal of Human Genetics." },
        },
        {
          "@type": "Question",
          "name": "What is the Franco-Cantabrian refuge?",
          "acceptedAnswer": { "@type": "Answer", "text": "The Franco-Cantabrian refuge was a habitable area in southwestern France and northern Spain where humans sheltered during the Last Glacial Maximum (~20,000 years ago), when ice sheets covered northern Europe. This refuge area, home to Lascaux and Altamira caves, was the source of several maternal DNA lineages including U5b1b, haplogroup V, H1, and H3 that later spread both north to Scandinavia and south to North Africa." },
        },
      ],
    },
    {
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Slow Morocco", "item": BASE_URL },
        { "@type": "ListItem", "position": 2, "name": "Stories", "item": `${BASE_URL}/stories` },
        { "@type": "ListItem", "position": 3, "name": "Genetics & Identity", "item": `${BASE_URL}/stories/category/culture` },
        { "@type": "ListItem", "position": 4, "name": "The Shared Grandmother", "item": CANONICAL },
      ],
    },
  ],
};

// ─────────────────────────────────────────────────────────────────────────────
// PAGE
// ─────────────────────────────────────────────────────────────────────────────

export default async function TheSharedGrandmotherPage() {
  const [story, images, allJourneys] = await Promise.all([
    getStoryBySlug(SLUG),
    getStoryImages(SLUG),
    getJourneys(),
  ]);

  if (!story) notFound();

  const relatedJourneys = allJourneys
    ?.filter((j) =>
      j.title?.toLowerCase().includes("amazigh") ||
      j.title?.toLowerCase().includes("genetics") ||
      j.title?.toLowerCase().includes("dna") ||
      j.category?.toLowerCase().includes("culture")
    )
    .slice(0, 2) || [];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <TheSharedGrandmotherContent />
    </>
  );
}
