import { Metadata } from "next";
import AmazighIdentityContent from "./AmazighIdentityContent";

export const revalidate = 3600;

const BASE_URL = "https://www.slowmorocco.com";
const SLUG = "amazigh-identity-map";
const CANONICAL = `${BASE_URL}/stories/${SLUG}`;

// ─────────────────────────────────────────────────────────────────────────────
// METADATA
// ─────────────────────────────────────────────────────────────────────────────

export const metadata: Metadata = {
  title: "Amazigh Identity Map — Three Languages, Three Confederations, One Alphabet Older Than Arabic | Slow Morocco",
  description:
    "The Imazighen — 'the free people' — and their 3,000-year fight to remain visible. 24.8% of Moroccans speak Tamazight. Three languages, three confederations, Tifinagh script evolution, census decline data, and a 3,000-year chronology mapped.",
  keywords: [
    "Amazigh Morocco", "Berber languages", "Tashelhit", "Tarifit", "Tamazight",
    "Tifinagh script", "Amazigh identity", "Morocco census Amazigh",
    "Masmuda confederation", "Sanhaja confederation", "Zenata confederation",
    "IRCAM Morocco", "Neo-Tifinagh", "Amazigh cultural movement",
    "Berber decline Morocco", "Imazighen",
  ],
  authors: [{ name: "J. Ng", url: `${BASE_URL}/about` }],
  alternates: { canonical: CANONICAL },
  openGraph: {
    title: "Amazigh Identity Map — Three Languages, One 3,000-Year Script",
    description: "24.8% of Moroccans speak Tamazight. Three languages, three confederations, one alphabet older than Arabic. The Imazighen mapped.",
    url: CANONICAL,
    siteName: "Slow Morocco",
    locale: "en_GB",
    type: "article",
    authors: ["J. Ng"],
    tags: ["Amazigh", "Berber", "Morocco", "Tifinagh", "identity", "languages"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Amazigh Identity Map — Three Languages, One 3,000-Year Script",
    description: "24.8% speakers. Three languages. Three confederations. The Imazighen mapped.",
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
      "headline": "Amazigh Identity Map — Three Languages, Three Confederations, One Alphabet Older Than Arabic",
      "description": "The Imazighen — 'the free people' — and their 3,000-year fight to remain visible. 24.8% of Moroccans speak Tamazight. Census data, language zones, confederation histories, and Tifinagh script evolution.",
      "datePublished": "2025-01-01",
      "dateModified": new Date().toISOString().split("T")[0],
      "author": { "@type": "Person", "name": "J. Ng", "url": `${BASE_URL}/about` },
      "publisher": { "@type": "Organization", "name": "Slow Morocco", "url": BASE_URL },
      "mainEntityOfPage": CANONICAL,
      "keywords": "Amazigh Morocco, Berber languages, Tashelhit, Tarifit, Tamazight, Tifinagh, IRCAM, Masmuda, Sanhaja, Zenata",
      "articleSection": "Culture & Identity",
      "spatialCoverage": { "@type": "Place", "name": "Morocco", "geo": { "@type": "GeoShape", "box": "27.0 -13.5 36.0 -1.0" } },
    },
    {
      "@type": "Dataset",
      "@id": `${CANONICAL}#dataset`,
      "name": "Moroccan Amazigh Census Data — 1900–2024",
      "description": "Percentage of Moroccan population identifying as Amazigh-speaking from colonial estimates through the 2024 census. Includes breakdown by language (Tashelhit, Central Tamazight, Tarifit).",
      "url": CANONICAL,
      "creator": { "@type": "Organization", "name": "Morocco HCP / IRCAM" },
      "spatialCoverage": "Morocco",
      "temporalCoverage": "1900/2024",
    },
    {
      "@type": "FAQPage",
      "@id": `${CANONICAL}#faq`,
      "mainEntity": [
        {
          "@type": "Question",
          "name": "What percentage of Moroccans speak Amazigh languages?",
          "acceptedAnswer": { "@type": "Answer", "text": "According to the 2024 census, 24.8% of Moroccans speak Tamazight: Tashelhit 14.2%, Central Atlas Tamazight 7.4%, Tarifit 3.2%. The rate is 19.9% in urban areas and 33.3% in rural areas. Amazigh movement organizations contest these figures, claiming the real rate is 65–85%." },
        },
        {
          "@type": "Question",
          "name": "What is Tifinagh?",
          "acceptedAnswer": { "@type": "Answer", "text": "Tifinagh is the script of the Amazigh (Berber) peoples, with roots in the Libyco-Berber alphabet dating to approximately 1000 BCE. Neo-Tifinagh, a modernized 33-character version, was adopted by Morocco's Royal Institute of Amazigh Culture (IRCAM) in 2003 as the official script for Standard Moroccan Amazigh. It appears on road signs and government buildings, though only 1.5% of literate Moroccans can read and write it." },
        },
        {
          "@type": "Question",
          "name": "What are the three Amazigh confederations?",
          "acceptedAnswer": { "@type": "Answer", "text": "The three great Amazigh confederations are the Masmuda (sedentary mountain dwellers of the High Atlas and Souss, ancestors of today's Tashelhit speakers, builders of the Almohad Empire), the Sanhaja (geographically dispersed from the Sahara to the Middle Atlas, founders of the Almoravid Empire), and the Zenata (nomadic pastoralists from eastern Morocco, founders of the Marinid Dynasty)." },
        },
      ],
    },
    {
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Slow Morocco", "item": BASE_URL },
        { "@type": "ListItem", "position": 2, "name": "Stories", "item": `${BASE_URL}/stories` },
        { "@type": "ListItem", "position": 3, "name": "Amazigh Identity Map", "item": CANONICAL },
      ],
    },
  ],
};

// ─────────────────────────────────────────────────────────────────────────────
// PAGE
// ─────────────────────────────────────────────────────────────────────────────

export default function AmazighIdentityMapPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <AmazighIdentityContent />
    </>
  );
}
