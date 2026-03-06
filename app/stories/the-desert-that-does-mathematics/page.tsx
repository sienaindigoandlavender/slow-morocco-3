import { Metadata } from "next";
import { TheDesertThatDoesMathematicsContent } from "./TheDesertThatDoesMathematicsContent";

export const revalidate = 3600;

const BASE_URL = "https://www.slowmorocco.com";
const SLUG = "the-desert-that-does-mathematics";
const CANONICAL = `${BASE_URL}/stories/${SLUG}`;

// ─────────────────────────────────────────────────────────────────────────────
// METADATA
// ─────────────────────────────────────────────────────────────────────────────

export const metadata: Metadata = {
  title: "The Desert That Does Mathematics — Namibia's Fairy Circles | Slow Morocco",
  description:
    "Millions of bare circles dot the Namib Desert in near-perfect hexagonal grids stretching 2,400 km. Alan Turing predicted the pattern in 1952. Two research groups have argued for a decade over whether termites or vegetation self-organisation create them.",
  keywords: [
    "fairy circles Namibia", "Turing patterns", "Namib Desert", "hexagonal vegetation",
    "Psammotermes termites", "vegetation self-organisation", "reaction-diffusion",
    "Alan Turing morphogenesis", "NamibRand", "Stipagrostis", "desert mathematics",
    "Getzin fairy circles", "Jürgens fairy circles", "fairy circle debate",
  ],
  authors: [{ name: "J. Ng", url: `${BASE_URL}/about` }],
  alternates: { canonical: CANONICAL },
  openGraph: {
    title: "The Desert That Does Mathematics — Namibia's Fairy Circles",
    description: "Millions of hexagonal circles across 2,400 km of desert. Turing predicted the pattern in 1952. The debate over what causes them is still unresolved.",
    url: CANONICAL,
    siteName: "Slow Morocco",
    locale: "en_GB",
    type: "article",
    authors: ["J. Ng"],
    tags: ["fairy circles", "Namibia", "Turing patterns", "desert", "ecology", "mathematics"],
  },
  twitter: {
    card: "summary_large_image",
    title: "The Desert That Does Mathematics — Namibia's Fairy Circles",
    description: "Millions of hexagonal circles. One equation. No consensus. Turing predicted this in 1952.",
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
      "headline": "The Desert That Does Mathematics — Namibia's Fairy Circles",
      "description": "Millions of bare circles dot the Namib Desert grasslands in near-perfect hexagonal grids stretching 2,400 km from Angola to South Africa. Alan Turing predicted the pattern in 1952. Two research groups have argued for over a decade whether termites or vegetation self-organisation create them.",
      "datePublished": "2025-01-01",
      "dateModified": new Date().toISOString().split("T")[0],
      "author": { "@type": "Person", "name": "J. Ng", "url": `${BASE_URL}/about` },
      "publisher": { "@type": "Organization", "name": "Slow Morocco", "url": BASE_URL },
      "mainEntityOfPage": CANONICAL,
      "keywords": "fairy circles, Namibia, Turing patterns, Namib Desert, hexagonal vegetation, self-organisation, termites, reaction-diffusion, morphogenesis",
      "articleSection": "Science & Nature",
      "spatialCoverage": { "@type": "Place", "name": "Namib Desert, Namibia", "geo": { "@type": "GeoCoordinates", "latitude": -24.725, "longitude": 15.991 } },
    },
    {
      "@type": "FAQPage",
      "@id": `${CANONICAL}#faq`,
      "mainEntity": [
        {
          "@type": "Question",
          "name": "What are fairy circles?",
          "acceptedAnswer": { "@type": "Answer", "text": "Fairy circles are millions of bare circular patches, 2–12 metres across, arranged in near-perfect hexagonal grids across the Namib Desert grasslands. They stretch 2,400 km from Angola to South Africa and have lifespans of 30–75 years. They are found in a narrow rainfall band of 70–120 mm/year." },
        },
        {
          "@type": "Question",
          "name": "What causes fairy circles?",
          "acceptedAnswer": { "@type": "Answer", "text": "The cause is debated. The termite hypothesis (Jürgens, 2013) attributes them to sand termites killing grass roots. The vegetation self-organisation hypothesis (Getzin, 2022) attributes them to grasses competing for water via Turing-type reaction-diffusion feedback. A combined model (Bonachela/Tarnita, 2017) proposes both mechanisms interact." },
        },
        {
          "@type": "Question",
          "name": "What are Turing patterns?",
          "acceptedAnswer": { "@type": "Answer", "text": "Turing patterns are spatial patterns (spots, stripes, hexagons) that emerge spontaneously from two substances reacting and diffusing at different speeds — short-range activation and long-range inhibition. Proposed by Alan Turing in 1952, they explain leopard spots, zebra stripes, seashell markings, and fairy circles." },
        },
      ],
    },
    {
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Slow Morocco", "item": BASE_URL },
        { "@type": "ListItem", "position": 2, "name": "Stories", "item": `${BASE_URL}/stories` },
        { "@type": "ListItem", "position": 3, "name": "The Desert That Does Mathematics", "item": CANONICAL },
      ],
    },
  ],
};

// ─────────────────────────────────────────────────────────────────────────────
// PAGE
// ─────────────────────────────────────────────────────────────────────────────

export default function TheDesertThatDoesMathematicsPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <TheDesertThatDoesMathematicsContent />
    </>
  );
}
