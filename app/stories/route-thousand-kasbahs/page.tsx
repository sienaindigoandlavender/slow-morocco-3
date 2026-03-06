import { Metadata } from "next";
import { RouteThousandKasbahsContent } from "./RouteThousandKasbahsContent";

const BASE_URL = "https://www.slowmorocco.com";
const SLUG = "route-thousand-kasbahs";
const CANONICAL = `${BASE_URL}/stories/${SLUG}`;

// ─────────────────────────────────────────────────────────────────────────────
// METADATA
// ─────────────────────────────────────────────────────────────────────────────

export const metadata: Metadata = {
  title: "Route of a Thousand Kasbahs — Architectural & Geographic Intelligence | Slow Morocco",
  description:
    "Tizi n'Tichka to Ouarzazate to the Drâa Valley. 370km of pisé fortresses, Glaoui palaces, and Hollywood sets dissolving back into the earth. Aït Benhaddou, Telouet, Taourirt, and the route mapped.",
  keywords: [
    "Route of a Thousand Kasbahs", "kasbahs Morocco", "Aït Benhaddou",
    "Kasbah Telouet", "Kasbah Taourirt", "Ouarzazate", "Drâa Valley",
    "Glaoui", "pisé architecture Morocco", "earthen architecture",
    "Tizi n'Tichka", "Skoura", "Dadès Gorge", "Todra Gorge",
    "UNESCO Morocco", "ksar Morocco", "Erg Chebbi", "Merzouga",
  ],
  authors: [{ name: "J. Ng", url: `${BASE_URL}/about` }],
  alternates: { canonical: CANONICAL },
  openGraph: {
    title: "Route of a Thousand Kasbahs — Architectural & Geographic Intelligence",
    description: "370km. Tizi n'Tichka to Merzouga. Pisé fortresses, Glaoui palaces, and Hollywood sets dissolving back into the earth.",
    url: CANONICAL,
    siteName: "Slow Morocco",
    locale: "en_GB",
    type: "article",
    authors: ["J. Ng"],
    tags: ["kasbahs", "architecture", "Morocco", "Drâa Valley", "Ouarzazate"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Route of a Thousand Kasbahs",
    description: "370km. Pisé fortresses, Glaoui palaces, and Hollywood sets dissolving back into the earth.",
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
      "headline": "Route of a Thousand Kasbahs — Architectural & Geographic Intelligence",
      "description": "Tizi n'Tichka to Ouarzazate to the Drâa Valley. 370km of pisé fortresses, Glaoui palaces, and Hollywood sets dissolving back into the earth they were built from.",
      "datePublished": "2025-01-01",
      "dateModified": new Date().toISOString().split("T")[0],
      "author": { "@type": "Person", "name": "J. Ng", "url": `${BASE_URL}/about` },
      "publisher": { "@type": "Organization", "name": "Slow Morocco", "url": BASE_URL },
      "mainEntityOfPage": CANONICAL,
      "keywords": "Route of a Thousand Kasbahs, kasbahs Morocco, Aït Benhaddou, Kasbah Telouet, Ouarzazate, Drâa Valley, Glaoui, pisé architecture",
      "articleSection": "Architecture",
      "spatialCoverage": { "@type": "Place", "name": "Southern Morocco — Drâa-Tafilalet", "geo": { "@type": "GeoShape", "box": "30.5 -7.5 31.5 -5.5" } },
    },
    {
      "@type": "FAQPage",
      "@id": `${CANONICAL}#faq`,
      "mainEntity": [
        {
          "@type": "Question",
          "name": "What is the Route of a Thousand Kasbahs?",
          "acceptedAnswer": { "@type": "Answer", "text": "The Route of a Thousand Kasbahs is a 370km corridor through southern Morocco from the Tizi n'Tichka pass (2,260m) across the High Atlas to Merzouga at the edge of the Sahara. It passes through Ouarzazate, Skoura, the Dadès and Todra Gorges, and features thousands of earthen fortresses (kasbahs and ksour) built from the 11th century onward." },
        },
        {
          "@type": "Question",
          "name": "What is Aït Benhaddou?",
          "acceptedAnswer": { "@type": "Answer", "text": "Aït Benhaddou is a UNESCO World Heritage Site (inscribed 1987) in the Ounila Valley, 30km northwest of Ouarzazate. It is the most famous ksar in Morocco — a fortified village of rammed earth on a hillside above the Ounila River. It has been used as a filming location for over 20 productions including Lawrence of Arabia, Gladiator, and Game of Thrones." },
        },
        {
          "@type": "Question",
          "name": "Who were the Glaoui?",
          "acceptedAnswer": { "@type": "Answer", "text": "The Glaoui were a powerful Berber clan who controlled southern Morocco from the late 19th century until independence in 1956. Thami El Glaoui (1879–1956), the 'Lord of the Atlas', served as Pasha of Marrakech under the French Protectorate. Their kasbahs — including Telouet and Taourirt — line the route. After independence, all Glaoui properties were seized by the state." },
        },
      ],
    },
    {
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Slow Morocco", "item": BASE_URL },
        { "@type": "ListItem", "position": 2, "name": "Stories", "item": `${BASE_URL}/stories` },
        { "@type": "ListItem", "position": 3, "name": "Route of a Thousand Kasbahs", "item": CANONICAL },
      ],
    },
  ],
};

// ─────────────────────────────────────────────────────────────────────────────
// PAGE
// ─────────────────────────────────────────────────────────────────────────────

export default function RouteThousandKasbahsPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <RouteThousandKasbahsContent />
    </>
  );
}
