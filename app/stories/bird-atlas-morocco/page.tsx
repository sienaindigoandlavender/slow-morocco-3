import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getStoryBySlug, getStoryImages, getJourneys } from "@/lib/supabase";
import BirdAtlasContent from "./BirdAtlasContent";

export const revalidate = 3600;

const BASE_URL = "https://www.slowmorocco.com";
const SLUG = "bird-atlas-morocco";
const CANONICAL = `${BASE_URL}/stories/${SLUG}`;

// ─────────────────────────────────────────────────────────────────────────────
// METADATA
// ─────────────────────────────────────────────────────────────────────────────

export const metadata: Metadata = {
  title: "The Bird Atlas — Morocco's Migration Corridor | Slow Morocco",
  description:
    "Morocco sits on the narrowest crossing between Europe and Africa. Over 500 species recorded. Live migration sightings, the Atlantic flyway mapped, 12 key sites from Gibraltar to Khnifiss Lagoon.",
  keywords: [
    "birding Morocco", "Morocco bird migration", "Atlantic flyway Morocco",
    "Northern Bald Ibis Morocco", "Merja Zerga birds", "Souss-Massa National Park birds",
    "Gibraltar bird migration", "Morocco wetlands birds", "Khnifiss lagoon birds",
    "eBird Morocco sightings", "Morocco birdwatching sites", "flamingo Morocco",
    "raptor migration Morocco", "white stork migration Africa", "bird atlas Morocco",
    "murmuration starlings", "Neels Castillon bird ballet",
  ],
  authors: [{ name: "J. Ng", url: `${BASE_URL}/about` }],
  alternates: { canonical: CANONICAL },
  openGraph: {
    title: "The Bird Atlas — Morocco's Migration Corridor",
    description: "500+ species. The Atlantic flyway. Live daily sightings. Where to be and when.",
    url: CANONICAL,
    siteName: "Slow Morocco",
    locale: "en_GB",
    type: "article",
    authors: ["J. Ng"],
    tags: ["birds", "migration", "Morocco", "wildlife", "Atlantic flyway"],
  },
  twitter: {
    card: "summary_large_image",
    title: "The Bird Atlas — Morocco's Migration Corridor",
    description: "500+ species. Live eBird sightings. The Atlantic flyway mapped.",
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
      "headline": "The Bird Atlas — Morocco's Migration Corridor",
      "description": "Morocco sits on the narrowest crossing between Europe and Africa. Over 500 species recorded. Live migration sightings, the Atlantic flyway mapped, the 12 key sites.",
      "datePublished": "2025-01-01",
      "dateModified": new Date().toISOString().split("T")[0],
      "author": { "@type": "Person", "name": "J. Ng", "url": `${BASE_URL}/about` },
      "publisher": {
        "@type": "Organization", "name": "Slow Morocco", "url": BASE_URL,
        "parentOrganization": { "@type": "Organization", "name": "Dancing with Lions", "url": "https://www.dancingwiththelions.com" },
      },
      "mainEntityOfPage": CANONICAL,
      "keywords": "Morocco birds, bird migration, Atlantic flyway, Northern Bald Ibis, Merja Zerga, Souss-Massa, Gibraltar crossing",
      "articleSection": "Nature",
      "spatialCoverage": { "@type": "Place", "name": "Morocco", "geo": { "@type": "GeoShape", "box": "20.77 -17.02 35.92 -1.12" } },
    },
    {
      "@type": "Dataset",
      "@id": `${CANONICAL}#dataset`,
      "name": "Morocco Bird Sightings — Live eBird Feed",
      "description": "Real-time bird observation records from Morocco, sourced from the eBird citizen science platform (Cornell Lab of Ornithology). Updated daily. 14-day rolling window.",
      "url": CANONICAL,
      "creator": { "@type": "Organization", "name": "Cornell Lab of Ornithology / eBird", "url": "https://ebird.org" },
      "spatialCoverage": "Morocco",
      "temporalCoverage": "2025/..",
      "license": "https://creativecommons.org/licenses/by/4.0/",
    },
    {
      "@type": "Thing",
      "@id": `${CANONICAL}#atlantic-flyway`,
      "name": "Atlantic Flyway — Morocco",
      "description": "The Atlantic Flyway is one of the primary bird migration routes between Europe and sub-Saharan Africa. In Morocco it follows the Atlantic coastline from the Strait of Gibraltar south through Merja Zerga, Lac de Sidi Bourhaba, Oualidia, Souss-Massa, Oued Massa, and Khnifiss Lagoon near Tarfaya — approximately 1,800km of wetland chain critical for raptors, storks, waders, flamingos, and waterbirds.",
    },
    {
      "@type": "Thing",
      "@id": `${CANONICAL}#northern-bald-ibis`,
      "name": "Northern Bald Ibis (Geronticus eremita)",
      "description": "The Northern Bald Ibis is critically endangered with fewer than 700 wild individuals remaining globally. Morocco holds approximately 95% of the wild population, breeding at Souss-Massa National Park and Tamri Estuary near Agadir. The species went extinct in Europe by the 17th century and across the Middle East by the late 20th century.",
    },
    {
      "@type": "Thing",
      "@id": `${CANONICAL}#strait-of-gibraltar`,
      "name": "Strait of Gibraltar — Bird Migration",
      "description": "The Strait of Gibraltar, at its narrowest 14km wide, is one of the five most significant raptor migration bottlenecks on Earth. Each year approximately 300,000 raptors and 400,000+ White Storks cross the strait. Peak southbound migration is August–October; northbound is March–May.",
    },
    {
      "@type": "FAQPage",
      "@id": `${CANONICAL}#faq`,
      "mainEntity": [
        {
          "@type": "Question",
          "name": "How many bird species are recorded in Morocco?",
          "acceptedAnswer": { "@type": "Answer", "text": "Over 500 bird species have been recorded in Morocco — more than France or Spain. Morocco straddles four biomes (Mediterranean, Atlantic, Saharan, sub-Saharan) and sits at the narrowest crossing between Europe and Africa." },
        },
        {
          "@type": "Question",
          "name": "What is the best time for birdwatching in Morocco?",
          "acceptedAnswer": { "@type": "Answer", "text": "August–October for raptor and stork migration through Gibraltar. November–March for wintering waterbirds at Atlantic wetlands. February–June for Northern Bald Ibis breeding at Souss-Massa. May–August for High Atlas specialties including Bearded Vulture." },
        },
        {
          "@type": "Question",
          "name": "Where can I see the Northern Bald Ibis in Morocco?",
          "acceptedAnswer": { "@type": "Answer", "text": "The primary site is Souss-Massa National Park south of Agadir, where the main colony breeds on coastal cliffs from February to June. A second colony breeds at Tamri Estuary, 80km north of Agadir. Morocco holds approximately 95% of the global wild population of fewer than 700 birds." },
        },
        {
          "@type": "Question",
          "name": "What is the Atlantic flyway in Morocco?",
          "acceptedAnswer": { "@type": "Answer", "text": "The Atlantic Flyway in Morocco is a chain of coastal wetlands running 1,800km from the Strait of Gibraltar south to Khnifiss Lagoon near Tarfaya. Key sites include Merja Zerga, Lac de Sidi Bourhaba, Oualidia, Souss-Massa, Oued Massa, and Khnifiss Lagoon." },
        },
        {
          "@type": "Question",
          "name": "What birds cross the Strait of Gibraltar into Morocco?",
          "acceptedAnswer": { "@type": "Answer", "text": "White Stork (400,000+ annually), Black Kite, Honey Buzzard, Short-toed Eagle, Booted Eagle, Egyptian Vulture, Montagu's Harrier, and Osprey. Passerines including warblers, flycatchers, and redstarts cross at night. Peak southbound migration is August–October." },
        },
        {
          "@type": "Question",
          "name": "What is Merja Zerga?",
          "acceptedAnswer": { "@type": "Answer", "text": "Merja Zerga is a Ramsar-designated coastal lagoon on Morocco's Atlantic coast, 80km north of Rabat. It hosts 50,000+ wintering waterbirds including Greater Flamingo, Spoonbill, and Marbled Duck. It holds the last confirmed sightings of the Slender-billed Curlew, a species now possibly extinct." },
        },
      ],
    },
    {
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Slow Morocco", "item": BASE_URL },
        { "@type": "ListItem", "position": 2, "name": "Stories", "item": `${BASE_URL}/stories` },
        { "@type": "ListItem", "position": 3, "name": "Nature", "item": `${BASE_URL}/stories/category/nature` },
        { "@type": "ListItem", "position": 4, "name": "The Bird Atlas", "item": CANONICAL },
      ],
    },
  ],
};

// ─────────────────────────────────────────────────────────────────────────────
// PAGE
// ─────────────────────────────────────────────────────────────────────────────

export default async function BirdAtlasPage() {
  const [story, images, allJourneys] = await Promise.all([
    getStoryBySlug(SLUG),
    getStoryImages(SLUG),
    getJourneys(),
  ]);

  if (!story) notFound();

  const relatedJourneys = allJourneys
    ?.filter((j) =>
      j.title?.toLowerCase().includes("bird") ||
      j.title?.toLowerCase().includes("nature") ||
      j.category?.toLowerCase().includes("nature")
    )
    .slice(0, 2) || [];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <BirdAtlasContent story={story} images={images || []} relatedJourneys={relatedJourneys} />
    </>
  );
}
