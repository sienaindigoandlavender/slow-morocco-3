import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getStoryBySlug, getStoryImages, getJourneys } from "@/lib/supabase";
import { TheFreePeopleContent } from "./TheFreePeopleContent";

export const revalidate = 3600;

const BASE_URL = "https://www.slowmorocco.com";
const SLUG = "the-free-people";
const CANONICAL = `${BASE_URL}/stories/${SLUG}`;

// ─────────────────────────────────────────────────────────────────────────────
// METADATA
// ─────────────────────────────────────────────────────────────────────────────

export const metadata: Metadata = {
  title: "The Free People — Amazigh Confederations, Tribes & Languages | Slow Morocco",
  description:
    "Imazighen — the free people. 30–40 million Amazigh across ten African countries. Morocco's confederations mapped, tribal histories, language data, and a 12,000-year timeline from cave paintings to constitutional recognition.",
  keywords: [
    "Amazigh Morocco", "Berber tribes Morocco", "Imazighen", "Amazigh confederations",
    "Aït Atta", "Aït Yafelman", "Masmuda", "Sanhaja", "Zenata", "Tashelhit",
    "Central Atlas Tamazight", "Tarifit", "Riffians", "Tifinagh", "Berber languages",
    "Amazigh identity", "Morocco census Tamazight", "Tuareg", "Kabyle",
    "North Africa indigenous", "Amazigh history", "Berber map Morocco",
  ],
  authors: [{ name: "J. Ng", url: `${BASE_URL}/about` }],
  alternates: { canonical: CANONICAL },
  openGraph: {
    title: "The Free People — Amazigh Confederations, Tribes & Languages",
    description: "30–40 million Amazigh across ten countries. Morocco's confederations mapped. 12,000 years of history.",
    url: CANONICAL,
    siteName: "Slow Morocco",
    locale: "en_GB",
    type: "article",
    authors: ["J. Ng"],
    tags: ["Amazigh", "Berber", "Morocco", "tribes", "confederations", "languages"],
  },
  twitter: {
    card: "summary_large_image",
    title: "The Free People — Amazigh Confederations, Tribes & Languages",
    description: "30–40 million Amazigh across ten countries. Morocco's confederations mapped.",
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
      "headline": "The Free People — Amazigh Confederations, Tribes & Languages",
      "description": "Imazighen — the free people. 30–40 million Amazigh across ten African countries. Morocco's confederations mapped, tribal histories, language data, and a 12,000-year timeline.",
      "datePublished": "2025-01-01",
      "dateModified": new Date().toISOString().split("T")[0],
      "author": { "@type": "Person", "name": "J. Ng", "url": `${BASE_URL}/about` },
      "publisher": { "@type": "Organization", "name": "Slow Morocco", "url": BASE_URL },
      "mainEntityOfPage": CANONICAL,
      "keywords": "Amazigh, Berber, Imazighen, Morocco tribes, Aït Atta, Masmuda, Sanhaja, Zenata, Tashelhit, Tamazight, Tarifit, Tifinagh",
      "articleSection": "Culture",
      "spatialCoverage": { "@type": "Place", "name": "Morocco", "geo": { "@type": "GeoShape", "box": "20.77 -17.02 35.92 -1.12" } },
    },
    {
      "@type": "Dataset",
      "@id": `${CANONICAL}#dataset`,
      "name": "Amazigh Confederations & Language Data — Morocco",
      "description": "Tribal confederations, language groups, and demographic data for Amazigh communities across Morocco and North Africa. Includes 2024 census language statistics and historical population estimates.",
      "url": CANONICAL,
      "creator": { "@type": "Organization", "name": "Slow Morocco", "url": BASE_URL },
      "spatialCoverage": "North Africa",
      "temporalCoverage": "10000 BC/..",
      "license": "https://creativecommons.org/licenses/by/4.0/",
    },
    {
      "@type": "Thing",
      "@id": `${CANONICAL}#amazigh-identity`,
      "name": "Amazigh (Imazighen) — The Free People",
      "description": "The Amazigh (singular: Amazigh, plural: Imazighen) are the indigenous people of North Africa. The name means 'free people' in Tamazight. An estimated 30–40 million Amazigh live across ten countries from Morocco to Egypt, from the Mediterranean to the Sahel. In Morocco, Tamazight became an official language in the 2011 constitution.",
    },
    {
      "@type": "Thing",
      "@id": `${CANONICAL}#ait-atta`,
      "name": "Aït Atta Confederation",
      "description": "The dominant tribal confederation of southeastern Morocco from the 16th to 20th centuries. Divided into 'five fifths' (khams khmas), all claiming descent from the ancestor Dadda Atta. Practiced annual rotational democracy — electing a supreme chief (amghar n-ufilla) each year. Made their last stand against France at the Battle of Bougafer in 1933.",
    },
    {
      "@type": "FAQPage",
      "@id": `${CANONICAL}#faq`,
      "mainEntity": [
        {
          "@type": "Question",
          "name": "Who are the Amazigh people?",
          "acceptedAnswer": { "@type": "Answer", "text": "The Amazigh (Imazighen, meaning 'free people') are the indigenous people of North Africa. They have lived across the region for at least 12,000 years. An estimated 30–40 million Amazigh live in ten countries including Morocco, Algeria, Libya, Tunisia, Mali, Niger, Burkina Faso, Mauritania, Egypt, and the Canary Islands." },
        },
        {
          "@type": "Question",
          "name": "What percentage of Morocco is Amazigh?",
          "acceptedAnswer": { "@type": "Answer", "text": "Morocco's 2024 census recorded 24.8% Tamazight speakers. Amazigh associations claim the real figure is 65–85%. The gap reflects centuries of Arabization and contested census methodology. The three main Amazigh languages in Morocco are Tashelhit (14.2%), Central Atlas Tamazight (7.4%), and Tarifit (3.2%)." },
        },
        {
          "@type": "Question",
          "name": "What are the main Amazigh tribal confederations in Morocco?",
          "acceptedAnswer": { "@type": "Answer", "text": "Morocco's Amazigh world includes three medieval super-confederations: Masmuda (who built the Almohad Empire), Sanhaja (who built the Almoravid Empire), and Zenata (who built the Marinid dynasty). Modern confederations include the Aït Atta and Aït Yafelman, plus three major language groups: Ishilhayen (Tashelhit speakers), Riffians (Tarifit speakers), and Central Atlas Imazighen (Tamazight speakers)." },
        },
        {
          "@type": "Question",
          "name": "What languages do the Amazigh speak?",
          "acceptedAnswer": { "@type": "Answer", "text": "The Amazigh speak approximately 40 distinct Berber languages, all part of the Afroasiatic language family. The largest are Tashelhit (8 million+ speakers in Morocco), Kabyle (~6 million in Algeria), Central Atlas Tamazight (4.7 million in Morocco), Chaoui (~3 million in Algeria), and Tuareg varieties (~2.5 million across the Sahel). Most are mutually unintelligible." },
        },
      ],
    },
    {
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Slow Morocco", "item": BASE_URL },
        { "@type": "ListItem", "position": 2, "name": "Stories", "item": `${BASE_URL}/stories` },
        { "@type": "ListItem", "position": 3, "name": "Culture", "item": `${BASE_URL}/stories/category/culture` },
        { "@type": "ListItem", "position": 4, "name": "The Free People", "item": CANONICAL },
      ],
    },
  ],
};

// ─────────────────────────────────────────────────────────────────────────────
// PAGE
// ─────────────────────────────────────────────────────────────────────────────

export default async function TheFreePeoplePage() {
  const [story, images, allJourneys] = await Promise.all([
    getStoryBySlug(SLUG),
    getStoryImages(SLUG),
    getJourneys(),
  ]);

  if (!story) notFound();

  const relatedJourneys = allJourneys
    ?.filter((j) =>
      j.title?.toLowerCase().includes("amazigh") ||
      j.title?.toLowerCase().includes("berber") ||
      j.title?.toLowerCase().includes("culture") ||
      j.category?.toLowerCase().includes("culture")
    )
    .slice(0, 2) || [];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <TheFreePeopleContent />
    </>
  );
}
