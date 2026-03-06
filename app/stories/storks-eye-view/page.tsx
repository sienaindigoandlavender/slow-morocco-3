import { Metadata } from "next";
import { StorksEyeViewContent } from "./StorksEyeViewContent";

export const revalidate = 3600;

const BASE_URL = "https://www.slowmorocco.com";
const SLUG = "storks-eye-view";
const CANONICAL = `${BASE_URL}/stories/${SLUG}`;

// ─────────────────────────────────────────────────────────────────────────────
// METADATA
// ─────────────────────────────────────────────────────────────────────────────

export const metadata: Metadata = {
  title: "The Stork's Eye View — Ciconia ciconia in Morocco | Slow Morocco",
  description:
    "White storks nest on the minarets of Chellah, the ruins of El Badi Palace, and the Roman columns of Volubilis. 11 colony sites mapped, migration flyway, population census 1984–2024, and interactive Chellah nest survey.",
  keywords: [
    "white stork Morocco", "Ciconia ciconia Morocco", "Chellah storks Rabat",
    "El Badi Palace storks Marrakech", "Volubilis storks", "stork nesting Morocco",
    "Morocco bird migration", "Strait of Gibraltar stork crossing",
    "Morocco stork colony map", "Chellah necropolis birds", "Hassan Tower storks",
    "Ait Benhaddou storks", "Merja Zerga storks", "Souss-Massa storks",
    "white stork population Morocco", "GREPOM BirdLife Morocco",
    "stork migration western flyway", "Morocco heritage birds",
  ],
  authors: [{ name: "J. Ng", url: `${BASE_URL}/about` }],
  alternates: { canonical: CANONICAL },
  openGraph: {
    title: "The Stork's Eye View — Ciconia ciconia in Morocco",
    description: "11 colony sites. Migration flyway. Interactive Chellah nest map. Population census 1984–2024.",
    url: CANONICAL,
    siteName: "Slow Morocco",
    locale: "en_GB",
    type: "article",
    authors: ["J. Ng"],
    tags: ["storks", "birds", "Morocco", "wildlife", "heritage", "ruins"],
  },
  twitter: {
    card: "summary_large_image",
    title: "The Stork's Eye View — Ciconia ciconia in Morocco",
    description: "11 colony sites. Migration flyway. Interactive Chellah nest map. Population census 1984–2024.",
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
      "headline": "The Stork's Eye View — Ciconia ciconia in Morocco",
      "description": "White storks nest on Morocco's most iconic ruins — Chellah, El Badi Palace, Volubilis, Hassan Tower. 11 colony sites mapped with migration flyway and population census data.",
      "datePublished": "2025-01-01",
      "dateModified": new Date().toISOString().split("T")[0],
      "author": { "@type": "Person", "name": "J. Ng", "url": `${BASE_URL}/about` },
      "publisher": { "@type": "Organization", "name": "Slow Morocco", "url": BASE_URL },
      "mainEntityOfPage": CANONICAL,
      "keywords": "white stork Morocco, Ciconia ciconia, Chellah storks, El Badi Palace, Volubilis, stork migration, western flyway, Gibraltar crossing",
      "articleSection": "Nature",
      "spatialCoverage": { "@type": "Place", "name": "Morocco", "geo": { "@type": "GeoShape", "box": "20.77 -17.02 35.92 -1.12" } },
    },
    {
      "@type": "Dataset",
      "@id": `${CANONICAL}#dataset`,
      "name": "Morocco White Stork Colony Sites",
      "description": "11 landmark nesting sites across Morocco with nest counts, elevation, seasonality, and coordinates. Population census data 1984–2024 from NABU/GREPOM BirdLife Morocco.",
      "url": CANONICAL,
      "creator": { "@type": "Organization", "name": "NABU / GREPOM BirdLife Morocco" },
      "spatialCoverage": "Morocco",
      "temporalCoverage": "1984/2024",
    },
    {
      "@type": "Thing",
      "@id": `${CANONICAL}#western-flyway`,
      "name": "Western Flyway — White Stork Migration",
      "description": "The western migration route for white storks runs from Northern Europe through Iberia, across the Strait of Gibraltar (14 km), into Morocco, and for some birds onward across the Sahara to the Sahel. An increasing number of storks now overwinter in Morocco rather than completing the trans-Saharan crossing.",
    },
    {
      "@type": "Thing",
      "@id": `${CANONICAL}#chellah-colony`,
      "name": "Chellah Necropolis Stork Colony — Rabat",
      "description": "The most photographed stork colony in Morocco. 25+ nests built on the Marinid minaret, Roman columns from Sala Colonia, and crumbling medieval walls within the Chellah necropolis in Rabat. Year-round colony with nests up to 15 years old and 1.5m in diameter.",
    },
    {
      "@type": "FAQPage",
      "@id": `${CANONICAL}#faq`,
      "mainEntity": [
        {
          "@type": "Question",
          "name": "Why do white storks nest on ruins in Morocco?",
          "acceptedAnswer": { "@type": "Answer", "text": "Storks prefer elevated flat surfaces with easy landing access. Minarets, broken walls, and Roman columns offer exactly this. Modern rooftops are too smooth, too sloped, and too well-maintained. Restored monuments lose storks; abandoned ones gain them." },
        },
        {
          "@type": "Question",
          "name": "How many white stork breeding pairs are in Morocco?",
          "acceptedAnswer": { "@type": "Answer", "text": "Approximately 3,200 breeding pairs as of the 2024 preliminary census (NABU/GREPOM BirdLife Morocco). The population crashed to a low of ~5,500 pairs in 1994, partially recovering since then due to changing migration behaviour and landfill feeding." },
        },
        {
          "@type": "Question",
          "name": "Where are the best places to see storks in Morocco?",
          "acceptedAnswer": { "@type": "Answer", "text": "Chellah Necropolis in Rabat (25+ nests on Roman/Marinid ruins), El Badi Palace in Marrakech (18 nests on Saadian walls), Volubilis near Meknès (12 nests on Roman columns), Merja Zerga lagoon (1,000+ wintering storks), and Souss-Massa National Park near Agadir." },
        },
        {
          "@type": "Question",
          "name": "When do white storks migrate through Morocco?",
          "acceptedAnswer": { "@type": "Answer", "text": "Southbound migration through the Strait of Gibraltar peaks in September–October. Northbound return is February–March. However, an increasing number of storks (~30%) now overwinter in Morocco year-round, feeding at urban landfills rather than crossing the Sahara." },
        },
        {
          "@type": "Question",
          "name": "Are storks considered sacred in Morocco?",
          "acceptedAnswer": { "@type": "Answer", "text": "Yes. In Moroccan folklore, white storks are believed to carry human souls, bring good fortune, and be humans transformed. Harming a stork is taboo. The Arabic name 'laqluq' is onomatopoeic, imitating the bill-clattering sound storks make at their nests." },
        },
      ],
    },
    {
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Slow Morocco", "item": BASE_URL },
        { "@type": "ListItem", "position": 2, "name": "Stories", "item": `${BASE_URL}/stories` },
        { "@type": "ListItem", "position": 3, "name": "Nature", "item": `${BASE_URL}/stories/category/nature` },
        { "@type": "ListItem", "position": 4, "name": "The Stork's Eye View", "item": CANONICAL },
      ],
    },
  ],
};

// ─────────────────────────────────────────────────────────────────────────────
// PAGE
// ─────────────────────────────────────────────────────────────────────────────

export default function StorksEyeViewPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <StorksEyeViewContent />
    </>
  );
}
