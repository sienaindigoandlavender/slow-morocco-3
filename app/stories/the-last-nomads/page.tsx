import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getStoryBySlug, getStoryImages, getJourneys } from "@/lib/supabase";
import { TheLastNomadsContent } from "./TheLastNomadsContent";

export const revalidate = 3600;

const BASE_URL = "https://www.slowmorocco.com";
const SLUG = "the-last-nomads";
const CANONICAL = `${BASE_URL}/stories/${SLUG}`;

// ─────────────────────────────────────────────────────────────────────────────
// METADATA
// ─────────────────────────────────────────────────────────────────────────────

export const metadata: Metadata = {
  title: "The Last Nomads — 12 Peoples, 4 Continents, One Vanishing Way of Life | Slow Morocco",
  description:
    "12 nomadic peoples across 4 continents who independently chose the same answer: move with the land. Morocco's 25,274 remaining nomads, the Tuareg, Bedouin, Maasai, Fulani, Sámi, Mongolian herders — mapped, measured, and running out of time.",
  keywords: [
    "nomads Morocco", "Amazigh nomads", "pastoral nomadism", "Tuareg", "Bedouin",
    "Maasai", "Fulani", "Sámi reindeer herders", "Mongolian nomads", "nomadic pastoralism",
    "Morocco census nomads", "agdal system", "transhumance Morocco", "Atlas Mountains herders",
    "disappearing nomads", "last nomads", "nomad decline", "pastoral peoples",
  ],
  authors: [{ name: "J. Ng", url: `${BASE_URL}/about` }],
  alternates: { canonical: CANONICAL },
  openGraph: {
    title: "The Last Nomads — 12 Peoples, 4 Continents, One Vanishing Way of Life",
    description: "30–40 million humans still move with the seasons. They are disappearing — not because the lifestyle failed, but because every border was drawn for people who stay put.",
    url: CANONICAL,
    siteName: "Slow Morocco",
    locale: "en_GB",
    type: "article",
    authors: ["J. Ng"],
    tags: ["nomads", "Morocco", "pastoralism", "Tuareg", "Bedouin", "Maasai", "Fulani"],
  },
  twitter: {
    card: "summary_large_image",
    title: "The Last Nomads — 12 Peoples, 4 Continents, One Vanishing Way of Life",
    description: "30–40 million humans still move with the seasons. They are disappearing — not because the lifestyle failed, but because every border was drawn for people who stay put.",
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
      "headline": "The Last Nomads — 12 Peoples, 4 Continents, One Vanishing Way of Life",
      "description": "12 nomadic peoples across 4 continents who independently chose the same answer: move with the land. Morocco's 25,274 remaining nomads mapped alongside the Tuareg, Bedouin, Maasai, Fulani, Sámi, and Mongolian herders.",
      "datePublished": "2026-02-01",
      "dateModified": new Date().toISOString().split("T")[0],
      "author": { "@type": "Person", "name": "J. Ng", "url": `${BASE_URL}/about` },
      "publisher": { "@type": "Organization", "name": "Slow Morocco", "url": BASE_URL },
      "mainEntityOfPage": CANONICAL,
      "keywords": "nomads, Morocco, pastoral nomadism, Tuareg, Bedouin, Maasai, Fulani, Sámi, Mongolia, agdal, transhumance",
      "articleSection": "Culture",
      "spatialCoverage": { "@type": "Place", "name": "Global", "geo": { "@type": "GeoShape", "box": "-34.83 -17.02 71.19 174.76" } },
    },
    {
      "@type": "Dataset",
      "@id": `${CANONICAL}#dataset`,
      "name": "Global Nomadic Peoples — Population, Decline & Territorial Data",
      "description": "Population data, decline rates, territorial ranges, and governance systems for 12 nomadic peoples across 4 continents. Includes Morocco census data (2004, 2014), Tuareg confederations, Bedouin settlement rates, Maasai land loss, Fulani demographics, Sámi herding statistics, and Mongolian pastoral data.",
      "url": CANONICAL,
      "creator": { "@type": "Organization", "name": "Slow Morocco", "url": BASE_URL },
      "spatialCoverage": "Global",
      "temporalCoverage": "1935/..",
      "license": "https://creativecommons.org/licenses/by/4.0/",
    },
    {
      "@type": "Thing",
      "@id": `${CANONICAL}#nomadic-pastoralism`,
      "name": "Nomadic Pastoralism",
      "description": "A form of subsistence in which people move with herds of domesticated animals across seasonal grazing lands. At least 12 separate peoples on 4 continents independently developed this way of life. An estimated 30–40 million people worldwide still practice some form of pastoral nomadism, though the number is declining rapidly due to borders, drought, rangeland privatisation, and state modernisation programmes.",
    },
    {
      "@type": "Thing",
      "@id": `${CANONICAL}#morocco-nomads`,
      "name": "Morocco's Last Nomads",
      "description": "In 1935, 16% of all Moroccan households lived under tents. By 2014, only 25,274 nomads remained — a 97% decline in 80 years. These are Amazigh pastoralists who practice the agdal system of collective rangeland management in the Atlas Mountains, the Oriental steppe, and the pre-Saharan regions.",
    },
    {
      "@type": "FAQPage",
      "@id": `${CANONICAL}#faq`,
      "mainEntity": [
        {
          "@type": "Question",
          "name": "How many nomads are left in Morocco?",
          "acceptedAnswer": { "@type": "Answer", "text": "Morocco's 2014 census counted 25,274 nomads in 4,044 households — down 63% from 68,540 in just ten years (2004). In 1935, 16% of all Moroccan households lived under tents. The decline is approximately 97% over 80 years." },
        },
        {
          "@type": "Question",
          "name": "What is the agdal system?",
          "acceptedAnswer": { "@type": "Answer", "text": "The agdal is a traditional Amazigh system of collective rangeland management. High mountain pastures in the Atlas are opened and closed by collective agreement, allowing vegetation to regenerate. The Berber verb 'gdel' — meaning 'to graze cattle in a meadow' — gives the system its name. Rock engravings at Oukaïmeden suggest this practice dates to 2000 BCE." },
        },
        {
          "@type": "Question",
          "name": "How many nomadic peoples still exist in the world?",
          "acceptedAnswer": { "@type": "Answer", "text": "At least 12 major nomadic peoples exist across 4 continents: Amazigh/Berber (Morocco), Tuareg (Sahara/Sahel), Bedouin (Arabia/North Africa), Fulani (West/Central Africa), Maasai (East Africa), Sámi (Scandinavia), Mongolian herders, Tibetan pastoralists, Qashqai (Iran), Kuchi (Afghanistan), Nenets (Siberia), and Australian Aboriginal peoples. Combined, an estimated 30–40 million people still practice some form of pastoral nomadism." },
        },
        {
          "@type": "Question",
          "name": "Why are nomads disappearing?",
          "acceptedAnswer": { "@type": "Answer", "text": "Nomads are disappearing because every nation-state was designed for people who stay put. The causes include: borders that split traditional territories, drought and climate change, rangeland privatisation, government modernisation programmes that treat mobility as backwardness, and conflict with settled populations over resources. The decline is global — from Morocco's 97% drop to Saudi Arabia's near-total Bedouin settlement." },
        },
      ],
    },
    {
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Slow Morocco", "item": BASE_URL },
        { "@type": "ListItem", "position": 2, "name": "Stories", "item": `${BASE_URL}/stories` },
        { "@type": "ListItem", "position": 3, "name": "Culture", "item": `${BASE_URL}/stories/category/culture` },
        { "@type": "ListItem", "position": 4, "name": "The Last Nomads", "item": CANONICAL },
      ],
    },
  ],
};

// ─────────────────────────────────────────────────────────────────────────────
// PAGE
// ─────────────────────────────────────────────────────────────────────────────

export default async function TheLastNomadsPage() {
  const [story, images, allJourneys] = await Promise.all([
    getStoryBySlug(SLUG),
    getStoryImages(SLUG),
    getJourneys(),
  ]);

  if (!story) notFound();

  const relatedJourneys = allJourneys
    ?.filter((j) =>
      j.title?.toLowerCase().includes("nomad") ||
      j.title?.toLowerCase().includes("berber") ||
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
      <TheLastNomadsContent />
    </>
  );
}
