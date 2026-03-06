import { Metadata } from "next";
import { TheGuancheGhostContent } from "./TheGuancheGhostContent";

export const revalidate = 3600;

const BASE_URL = "https://www.slowmorocco.com";
const SLUG = "the-guanche-ghost";
const CANONICAL = `${BASE_URL}/stories/${SLUG}`;

// ─────────────────────────────────────────────────────────────────────────────
// METADATA
// ─────────────────────────────────────────────────────────────────────────────

export const metadata: Metadata = {
  title: "The Guanche Ghost — Europe's First Colonial Genocide | Slow Morocco",
  description:
    "Berber DNA in the Atlantic. The Guanche people of the Canary Islands — conquered 1402–1496, extinct by 1600. Their E-M183 haplogroup survives in 8.3% of modern Canarian men. Seven islands, nine kingdoms, ninety-four years of conquest. The template for the Americas.",
  keywords: [
    "Guanche", "Canary Islands", "Guanche DNA", "E-M183", "Berber Canary Islands",
    "colonial genocide", "Canary Islands conquest", "Tenerife menceyatos",
    "Guanche mummies", "Silbo Gomero", "gofio", "Bencomo", "Tanausú",
    "Acentejo battle", "Guanche genetics", "U6b1a", "indigenous Canary Islands",
    "Jean de Béthencourt", "Alonso Fernández de Lugo",
  ],
  authors: [{ name: "J. Ng", url: `${BASE_URL}/about` }],
  alternates: { canonical: CANONICAL },
  openGraph: {
    title: "The Guanche Ghost — Europe's First Colonial Genocide",
    description: "Berber DNA in the Atlantic. Seven islands conquered 1402–1496. 16–55% of modern Canarian DNA is Guanche. The ghost is in the blood.",
    url: CANONICAL,
    siteName: "Slow Morocco",
    locale: "en_GB",
    type: "article",
    authors: ["J. Ng"],
    tags: ["Guanche", "Canary Islands", "genetics", "colonialism", "Berber", "DNA"],
  },
  twitter: {
    card: "summary_large_image",
    title: "The Guanche Ghost — Europe's First Colonial Genocide",
    description: "Berber DNA in the Atlantic. Seven islands, ninety-four years of conquest. The template for the Americas.",
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
      "headline": "The Guanche Ghost — Europe's First Colonial Genocide",
      "description": "Berber DNA in the Atlantic. The Guanche people of the Canary Islands were conquered between 1402 and 1496 — Europe's first overseas colonial genocide. Their E-M183 haplogroup survives in 8.3% of modern Canarian men. The template for the Americas was built here.",
      "datePublished": "2025-01-01",
      "dateModified": new Date().toISOString().split("T")[0],
      "author": { "@type": "Person", "name": "J. Ng", "url": `${BASE_URL}/about` },
      "publisher": { "@type": "Organization", "name": "Slow Morocco", "url": BASE_URL },
      "mainEntityOfPage": CANONICAL,
      "keywords": "Guanche, Canary Islands, E-M183, Berber DNA, colonial genocide, Tenerife, menceyatos, Silbo Gomero, gofio, U6b1a",
      "articleSection": "Genetics & History",
      "spatialCoverage": { "@type": "Place", "name": "Canary Islands", "geo": { "@type": "GeoShape", "box": "27.5 -18.5 29.5 -13.0" } },
    },
    {
      "@type": "Dataset",
      "@id": `${CANONICAL}#dataset`,
      "name": "Guanche Genetic Markers — Ancient vs Modern Canary Islands",
      "description": "Paternal and maternal DNA markers comparing ancient Guanche remains with modern Canarian populations. Includes E-M183, E-M78, J-M267, R1b, U6b1a haplogroups and autosomal ancestry estimates by island.",
      "url": CANONICAL,
      "creator": { "@type": "Organization", "name": "Rodríguez-Varela et al. / Maca-Meyer et al. / Fregel et al." },
      "spatialCoverage": "Canary Islands",
      "temporalCoverage": "-1000/2017",
    },
    {
      "@type": "FAQPage",
      "@id": `${CANONICAL}#faq`,
      "mainEntity": [
        {
          "@type": "Question",
          "name": "Who were the Guanche?",
          "acceptedAnswer": { "@type": "Answer", "text": "The Guanche were Berber-speaking peoples who settled the Canary Islands around 1000 BCE from North Africa. They developed separate cultures on seven islands over two millennia of isolation, losing the ability to build boats. They were conquered by Castile between 1402 and 1496 and were effectively extinct as a distinct people by 1600." },
        },
        {
          "@type": "Question",
          "name": "How much Guanche DNA survives in modern Canarians?",
          "acceptedAnswer": { "@type": "Answer", "text": "Modern Canarians carry 16–55% indigenous Guanche autosomal DNA depending on island (La Gomera 55.5%, La Palma 41%, Tenerife 22%, Gran Canaria 16–31%, El Hierro 0%). The E-M183 Berber paternal marker survives in ~8.3% of Canarian men, down from ~27% in ancient remains — evidence of sex-biased colonial replacement." },
        },
        {
          "@type": "Question",
          "name": "What is the connection between the Canary Islands conquest and the Americas?",
          "acceptedAnswer": { "@type": "Answer", "text": "The Canary Islands conquest (1402–1496) was Europe's first overseas colonial genocide. Every tool of New World colonialism — enslavement, deportation, disease, sugar plantations, forced conversion, encomienda — was prototyped here. Columbus resupplied at La Gomera in 1492 while the Guanche still fought on Tenerife. The encomienda system was exported directly to Hispaniola." },
        },
      ],
    },
    {
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Slow Morocco", "item": BASE_URL },
        { "@type": "ListItem", "position": 2, "name": "Stories", "item": `${BASE_URL}/stories` },
        { "@type": "ListItem", "position": 3, "name": "The Guanche Ghost", "item": CANONICAL },
      ],
    },
  ],
};

// ─────────────────────────────────────────────────────────────────────────────
// PAGE
// ─────────────────────────────────────────────────────────────────────────────

export default function TheGuancheGhostPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <TheGuancheGhostContent />
    </>
  );
}
