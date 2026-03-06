import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getStoryBySlug, getStoryImages, getJourneys } from "@/lib/supabase";
import { TheVerticalMigrationContent } from "./TheVerticalMigrationContent";

export const revalidate = 3600;

const BASE_URL = "https://www.slowmorocco.com";
const SLUG = "the-vertical-migration";
const CANONICAL = `${BASE_URL}/stories/${SLUG}`;

// ─────────────────────────────────────────────────────────────────────────────
// METADATA
// ─────────────────────────────────────────────────────────────────────────────

export const metadata: Metadata = {
  title: "The Vertical Migration — Transhumance in the Atlas Mountains | Slow Morocco",
  description:
    "The agdal is a 4,500-year-old ecological governance system. Close the mountain in spring so the plants can seed. Open it in summer so the animals can eat. 500 families made the journey in the 1980s. In 2018, 17 did.",
  keywords: [
    "agdal system", "transhumance Morocco", "Atlas Mountains pastoralism",
    "Amazigh herders", "Oukaïmeden rock art", "Yagour Plateau",
    "pastoral nomadism Morocco", "High Atlas transhumance", "Igourdane agdal",
    "vertical migration", "seasonal grazing", "Amazigh commons",
    "rock engravings Morocco", "agdal governance", "pastoral ecology",
  ],
  authors: [{ name: "J. Ng", url: `${BASE_URL}/about` }],
  alternates: { canonical: CANONICAL },
  openGraph: {
    title: "The Vertical Migration — Transhumance in the Atlas Mountains",
    description: "Close the mountain in spring so the plants can seed. Open it in summer so the animals can eat. Repeat for 4,500 years. 500 families made the journey in the 1980s. In 2018, 17 did.",
    url: CANONICAL,
    siteName: "Slow Morocco",
    locale: "en_GB",
    type: "article",
    authors: ["J. Ng"],
    tags: ["agdal", "transhumance", "Atlas Mountains", "Amazigh", "pastoralism", "Morocco"],
  },
  twitter: {
    card: "summary_large_image",
    title: "The Vertical Migration — Transhumance in the Atlas Mountains",
    description: "Close the mountain in spring so the plants can seed. Open it in summer so the animals can eat. Repeat for 4,500 years. 500 families made the journey in the 1980s. In 2018, 17 did.",
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
      "headline": "The Vertical Migration — Transhumance in the Atlas Mountains",
      "description": "The agdal is a 4,500-year-old ecological governance system — possibly the world's oldest functioning commons management. Rock engravings at Oukaïmeden prove the system was operating by the mid-3rd millennium BCE.",
      "datePublished": "2026-02-01",
      "dateModified": new Date().toISOString().split("T")[0],
      "author": { "@type": "Person", "name": "J. Ng", "url": `${BASE_URL}/about` },
      "publisher": { "@type": "Organization", "name": "Slow Morocco", "url": BASE_URL },
      "mainEntityOfPage": CANONICAL,
      "keywords": "agdal, transhumance, Atlas Mountains, Amazigh, pastoralism, Morocco, Oukaïmeden, rock art, Yagour",
      "articleSection": "Culture",
      "spatialCoverage": { "@type": "Place", "name": "High Atlas, Morocco", "geo": { "@type": "GeoCoordinates", "latitude": 31.06, "longitude": -7.86 } },
    },
    {
      "@type": "Dataset",
      "@id": `${CANONICAL}#dataset`,
      "name": "Atlas Mountains Agdal System — Transhumance, Rock Art & Pastoral Decline Data",
      "description": "Data on 6 named agdals (communal highland pastures) in the High Atlas, including Oukaïmeden (1,068 engravings), Yagour Plateau (2,000+ engravings), and Igourdane (97% collapse from 500 families to 17). Covers 4,500 years of pastoral governance, rock art evidence, elevation bands, and timeline of transhumance decline.",
      "url": CANONICAL,
      "creator": { "@type": "Organization", "name": "Slow Morocco", "url": BASE_URL },
      "spatialCoverage": "High Atlas, Morocco",
      "temporalCoverage": "-2500/..",
      "license": "https://creativecommons.org/licenses/by/4.0/",
    },
    {
      "@type": "Thing",
      "@id": `${CANONICAL}#agdal-system`,
      "name": "Agdal System",
      "description": "A communal highland pasture governance system practised by Amazigh peoples in the Atlas Mountains for at least 4,500 years. The tribal assembly (jmaâ) closes mountain pastures in spring to allow plant reproduction, then opens them in summer for grazing. Biodiversity and vegetation cover are measurably higher inside agdals than outside. The word derives from the Amazigh root GDL: to prohibit, to protect, a territory.",
    },
    {
      "@type": "Thing",
      "@id": `${CANONICAL}#transhumance-decline`,
      "name": "Transhumance Decline in the High Atlas",
      "description": "At the Igourdane agdal in the eastern High Atlas, 500 families made the summer transhumance journey in the 1980s. By 2018, only 17 did — a 97% collapse in one generation. Government programmes that replaced rain-fed cereals with commercial fruit trees destroyed fodder self-sufficiency, making the 200-kilometre trek unnecessary.",
    },
    {
      "@type": "FAQPage",
      "@id": `${CANONICAL}#faq`,
      "mainEntity": [
        {
          "@type": "Question",
          "name": "What is the agdal system?",
          "acceptedAnswer": { "@type": "Answer", "text": "The agdal is a communal highland pasture governance system practised by Amazigh peoples in the Atlas Mountains for at least 4,500 years. The tribal assembly (jmaâ) closes mountain pastures in spring to allow plant reproduction, then opens them in summer for grazing. The word derives from the Amazigh root GDL, meaning simultaneously 'to prohibit,' 'to protect,' and 'a territory.' Research shows biodiversity is measurably higher inside agdals than outside." },
        },
        {
          "@type": "Question",
          "name": "What are the rock engravings at Oukaïmeden?",
          "acceptedAnswer": { "@type": "Answer", "text": "Oukaïmeden, at 2,630 metres in the High Atlas, contains 1,068 rock engravings across 249 sites — the largest concentration of rock art in the High Atlas. The earliest images (mid-3rd millennium BCE) depict cattle, proving an established summer grazing system. By ~1500 BCE, the images shift to weapons and warriors, indicating increasing conflict over pasture access." },
        },
        {
          "@type": "Question",
          "name": "What is transhumance in Morocco?",
          "acceptedAnswer": { "@type": "Answer", "text": "Transhumance is seasonal vertical migration — moving herds between lowland winter pastures and highland summer pastures in the Atlas Mountains. Herders exploit four elevation bands: valley floor (800–1,200m) in winter, mid-slope shelters (1,200–2,000m) in spring/autumn, forest belt (1,500–2,500m), and high pasture agdals (2,000–3,000m+) in summer. Some families, like the Aït Atta, walk 200km from Nkob to the Igourdane agdal each summer." },
        },
        {
          "@type": "Question",
          "name": "Why is transhumance declining in Morocco?",
          "acceptedAnswer": { "@type": "Answer", "text": "At Igourdane, 500 families made the journey in the 1980s; by 2018, only 17 did — a 97% collapse. In the 1970s, government and NGOs pushed farmers to replace rain-fed cereals with commercial fruit trees, destroying fodder self-sufficiency. Without fodder, herds shrank; without large herds, the trek became unnecessary. Despite Morocco's 2016 Law 113.13 on pastoral transhumance, agdals are still not formally recognised." },
        },
      ],
    },
    {
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Slow Morocco", "item": BASE_URL },
        { "@type": "ListItem", "position": 2, "name": "Stories", "item": `${BASE_URL}/stories` },
        { "@type": "ListItem", "position": 3, "name": "Culture", "item": `${BASE_URL}/stories/category/culture` },
        { "@type": "ListItem", "position": 4, "name": "The Vertical Migration", "item": CANONICAL },
      ],
    },
  ],
};

// ─────────────────────────────────────────────────────────────────────────────
// PAGE
// ─────────────────────────────────────────────────────────────────────────────

export default async function TheVerticalMigrationPage() {
  const [story, images, allJourneys] = await Promise.all([
    getStoryBySlug(SLUG),
    getStoryImages(SLUG),
    getJourneys(),
  ]);

  if (!story) notFound();

  const relatedJourneys = allJourneys
    ?.filter((j) =>
      j.title?.toLowerCase().includes("transhumance") ||
      j.title?.toLowerCase().includes("atlas") ||
      j.title?.toLowerCase().includes("pastoral") ||
      j.category?.toLowerCase().includes("culture")
    )
    .slice(0, 2) || [];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <TheVerticalMigrationContent />
    </>
  );
}
