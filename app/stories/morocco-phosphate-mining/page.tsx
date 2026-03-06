import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getStoryBySlug, getStoryImages, getJourneys } from "@/lib/supabase";
import PhosphateKingdomContent from "./PhosphateKingdomContent";

export const revalidate = 3600;

const BASE_URL = "https://www.slowmorocco.com";
const SLUG = "phosphate-kingdom";               // URL path
const DB_SLUG = "morocco-phosphate-mining";      // Supabase slug
const CANONICAL = `${BASE_URL}/stories/${SLUG}`;

// ─────────────────────────────────────────────────────────────────────────────
// METADATA
// ─────────────────────────────────────────────────────────────────────────────

export const metadata: Metadata = {
  title: "The Phosphate Kingdom — Morocco's Geological Empire | Slow Morocco",
  description:
    "Morocco holds 70% of the world's phosphate reserves — 50 billion tonnes in four basins. OCP Group controls extraction, processing, and export. Five mines, two processing hubs, $9.76 billion in revenue. The geology that feeds the planet.",
  keywords: [
    "Morocco phosphate", "OCP Group", "Khouribga mine", "Jorf Lasfar",
    "phosphate reserves Morocco", "Morocco fertilizer", "phosphoric acid Morocco",
    "Boucraa mine", "Benguerir mine", "Youssoufia mine", "Morocco mining",
    "phosphate rock Morocco", "Morocco economy", "OCP revenue",
    "Morocco exports", "Africa fertilizer", "slurry pipeline Morocco",
  ],
  authors: [{ name: "J. Ng", url: `${BASE_URL}/about` }],
  alternates: { canonical: CANONICAL },
  openGraph: {
    title: "The Phosphate Kingdom — Morocco's Geological Empire",
    description: "70% of world reserves. 5 mines. 2 processing hubs. $9.76B revenue. The geology that feeds the planet.",
    url: CANONICAL,
    siteName: "Slow Morocco",
    locale: "en_GB",
    type: "article",
    authors: ["J. Ng"],
    tags: ["phosphate", "mining", "OCP", "Morocco", "economy", "fertilizer"],
  },
  twitter: {
    card: "summary_large_image",
    title: "The Phosphate Kingdom — Morocco's Geological Empire",
    description: "70% of world reserves. 50 billion tonnes. The mineral that feeds the planet.",
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
      "headline": "The Phosphate Kingdom — Morocco's Geological Empire",
      "description": "Morocco holds 70% of the world's phosphate reserves. OCP Group controls extraction, processing, and export from five mines and two processing hubs. $9.76 billion in revenue. The geology that feeds the planet.",
      "datePublished": "2025-01-01",
      "dateModified": new Date().toISOString().split("T")[0],
      "author": { "@type": "Person", "name": "J. Ng", "url": `${BASE_URL}/about` },
      "publisher": { "@type": "Organization", "name": "Slow Morocco", "url": BASE_URL },
      "mainEntityOfPage": CANONICAL,
      "keywords": "Morocco phosphate, OCP Group, Khouribga, Jorf Lasfar, fertilizer, phosphoric acid, mining, Africa",
      "articleSection": "Economy",
      "spatialCoverage": { "@type": "Place", "name": "Morocco", "geo": { "@type": "GeoShape", "box": "20.77 -17.02 35.92 -1.12" } },
    },
    {
      "@type": "Dataset",
      "@id": `${CANONICAL}#dataset`,
      "name": "Morocco Phosphate Industry — Mines, Processing, and Global Flows",
      "description": "Data on Morocco's phosphate mining operations, OCP Group processing infrastructure, global export flows, value chain, and 105-year timeline. Sources: USGS, OCP Group, Deloitte, AfDB.",
      "url": CANONICAL,
      "creator": { "@type": "Organization", "name": "Slow Morocco", "url": BASE_URL },
      "spatialCoverage": "Morocco",
      "temporalCoverage": "1920/2025",
      "license": "https://creativecommons.org/licenses/by-nc-nd/4.0/",
    },
    {
      "@type": "FAQPage",
      "@id": `${CANONICAL}#faq`,
      "mainEntity": [
        {
          "@type": "Question",
          "name": "How much of the world's phosphate does Morocco have?",
          "acceptedAnswer": { "@type": "Answer", "text": "Morocco holds approximately 70% of the world's known phosphate reserves — roughly 50 billion tonnes, distributed across four basins: Ouled Abdoun (Khouribga), Gantour (Benguerir/Youssoufia), Meskala, and the Southern Provinces (Boucraa). No other country comes close." },
        },
        {
          "@type": "Question",
          "name": "What is OCP Group?",
          "acceptedAnswer": { "@type": "Answer", "text": "OCP Group (formerly Office Chérifien des Phosphates) is Morocco's state-owned phosphate company, founded in 1920. It controls the entire phosphate value chain from extraction to fertilizer export. 95% state-owned, 5% Banque Centrale Populaire. Revenue reached $9.76 billion in 2024 with 21,000 employees." },
        },
        {
          "@type": "Question",
          "name": "Where are Morocco's phosphate mines?",
          "acceptedAnswer": { "@type": "Answer", "text": "Morocco has five mining operations: Khouribga (Ouled Abdoun Basin, 70% of output), Benguerir and Youssoufia (Gantour Basin), Boucraa (Southern Provinces, connected by a 102km conveyor belt), and Mzinda (Meskala Basin, under construction). Processing occurs at Jorf Lasfar and Safi." },
        },
        {
          "@type": "Question",
          "name": "Why is phosphate important?",
          "acceptedAnswer": { "@type": "Answer", "text": "Phosphorus is one of three essential plant nutrients (along with nitrogen and potassium). There is no synthetic substitute. Without phosphate fertilizer, global agriculture could not feed the current population. Morocco's dominance means its phosphate industry is a matter of global food security." },
        },
        {
          "@type": "Question",
          "name": "What is the Khouribga slurry pipeline?",
          "acceptedAnswer": { "@type": "Answer", "text": "A 235km gravity-powered pipeline connecting Khouribga mine to Jorf Lasfar processing complex. Launched in 2014, it transports phosphate slurry without pumping energy and saves 3 million cubic metres of water per year. One of the longest pipelines of its kind in the world." },
        },
      ],
    },
    {
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Slow Morocco", "item": BASE_URL },
        { "@type": "ListItem", "position": 2, "name": "Stories", "item": `${BASE_URL}/stories` },
        { "@type": "ListItem", "position": 3, "name": "Economy", "item": `${BASE_URL}/stories/category/economy` },
        { "@type": "ListItem", "position": 4, "name": "The Phosphate Kingdom", "item": CANONICAL },
      ],
    },
  ],
};

// ─────────────────────────────────────────────────────────────────────────────
// PAGE
// ─────────────────────────────────────────────────────────────────────────────

export default async function PhosphateKingdomPage() {
  const [story, images, allJourneys] = await Promise.all([
    getStoryBySlug(DB_SLUG),
    getStoryImages(DB_SLUG),
    getJourneys(),
  ]);

  if (!story) notFound();

  const relatedJourneys = allJourneys
    ?.filter((j) =>
      j.title?.toLowerCase().includes("economy") ||
      j.title?.toLowerCase().includes("industry") ||
      j.category?.toLowerCase().includes("economy") ||
      j.destinations?.toLowerCase().includes("khouribga")
    )
    .slice(0, 2) || [];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <PhosphateKingdomContent story={story} images={images || []} relatedJourneys={relatedJourneys} />
    </>
  );
}
