import { Metadata } from "next";
import { TheQueenWhoDidNotKneelContent } from "./TheQueenWhoDidNotKneelContent";

export const revalidate = 3600;

const BASE_URL = "https://www.slowmorocco.com";
const SLUG = "the-queen-who-did-not-kneel";
const CANONICAL = `${BASE_URL}/stories/${SLUG}`;

// ─────────────────────────────────────────────────────────────────────────────
// METADATA
// ─────────────────────────────────────────────────────────────────────────────

export const metadata: Metadata = {
  title: "The Queen Who Did Not Kneel — Bilqis, the Incense Road, and the Geopolitics Behind the Visit | Slow Morocco",
  description: "Three thousand years of retelling reduced Bilqis to a love story. The data says she ruled the wealthiest trade monopoly on earth and negotiated from a position of enormous wealth.",
  keywords: ["Queen of Sheba", "Bilqis", "Kingdom of Saba", "incense trade", "Marib Dam", "Solomon", "ancient trade routes", "geopolitics", "diplomatic history"],
  authors: [{ name: "J. Ng", url: `${BASE_URL}/about` }],
  alternates: { canonical: CANONICAL },
  openGraph: {
    title: "The Queen Who Did Not Kneel — Bilqis and the Geopolitics Behind the Visit",
    description: "Bilqis ruled the wealthiest trade monopoly on earth. She controlled the only product the ancient world could not live without. The 1,500-mile journey was not a pilgrimage — it was a board meeting.",
    url: CANONICAL,
    siteName: "Slow Morocco",
    locale: "en_GB",
    type: "article",
    authors: ["J. Ng"],
    tags: ["Queen of Sheba", "Bilqis", "Kingdom of Saba", "incense trade", "Marib Dam", "Solomon", "ancient diplomacy"],
  },
  twitter: {
    card: "summary_large_image",
    title: "The Queen Who Did Not Kneel — Bilqis and the Geopolitics Behind the Visit",
    description: "Three thousand years of retelling reduced Bilqis to a love story. The data says she ruled the wealthiest trade monopoly on earth.",
  },
  robots: {
    index: true, follow: true,
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
      "headline": "The Queen Who Did Not Kneel — Bilqis, the Incense Road, and the Geopolitics Behind the Visit",
      "description": "Three thousand years of retelling reduced Bilqis to a love story. The data says she ruled the wealthiest trade monopoly on earth and negotiated from a position of enormous wealth.",
      "datePublished": "2025-01-01",
      "dateModified": new Date().toISOString().split("T")[0],
      "author": { "@type": "Person", "name": "J. Ng", "url": `${BASE_URL}/about` },
      "publisher": { "@type": "Organization", "name": "Slow Morocco", "url": BASE_URL },
      "mainEntityOfPage": CANONICAL,
      "articleSection": "Cultural Intelligence",
    },
    {
      "@type": "Dataset",
      "@id": `${CANONICAL}#dataset`,
      "name": "The Queen Who Did Not Kneel — Kingdom of Saba & Incense Trade",
      "description": "Dataset covering the Kingdom of Saba, Marib Dam engineering, incense trade routes, diplomatic sequence between Bilqis and Solomon, and source comparison across Hebrew Bible, Quran, Midrash, and Kebra Nagast.",
      "url": CANONICAL,
      "creator": { "@type": "Organization", "name": "Primary Sources / Archaeological Record" },
      "spatialCoverage": "Yemen, Ethiopia, Israel, Arabian Peninsula",
      "temporalCoverage": "-0950/1974",
    },
    {
      "@type": "FAQPage",
      "@id": `${CANONICAL}#faq`,
      "mainEntity": [
        {
          "@type": "Question",
          "name": "Who was the Queen of Sheba?",
          "acceptedAnswer": { "@type": "Answer", "text": "Known as Bilqis in the Islamic tradition and Makeda in Ethiopian tradition, the Queen of Sheba ruled the Kingdom of Saba (capital: Ma'rib, in modern Yemen). She controlled the ancient world's most valuable trade monopoly — frankincense and myrrh — and commanded an engineered agricultural superpower sustained by the Marib Dam, which irrigated 10,000 hectares of desert for over 1,200 years." },
        },
        {
          "@type": "Question",
          "name": "Why did the Queen of Sheba visit Solomon?",
          "acceptedAnswer": { "@type": "Answer", "text": "Solomon had built a Red Sea fleet at Ezion-geber with Phoenician shipbuilders, threatening to bypass the Sabaean overland incense monopoly with a sea route. Bilqis's visit was a diplomatic mission to negotiate the preservation of her trade routes — she brought 4 tonnes of gold as a demonstration of cooperative value, not tribute." },
        },
        {
          "@type": "Question",
          "name": "What was the Marib Dam?",
          "acceptedAnswer": { "@type": "Answer", "text": "The Marib Dam was one of the engineering marvels of the ancient world, located in what is now Yemen. It was 550 metres long, up to 14 metres high, irrigated approximately 10,000 hectares (25,000 acres), fed around 50,000 people, and operated for approximately 1,200 years (8th century BCE to 6th century CE). Its final collapse is recorded in the Quran (Surah 34:15–17)." },
        },
      ],
    },
    {
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Slow Morocco", "item": BASE_URL },
        { "@type": "ListItem", "position": 2, "name": "Stories", "item": `${BASE_URL}/stories` },
        { "@type": "ListItem", "position": 3, "name": "The Queen Who Did Not Kneel", "item": CANONICAL },
      ],
    },
  ],
};

// ─────────────────────────────────────────────────────────────────────────────
// PAGE
// ─────────────────────────────────────────────────────────────────────────────

export default function TheQueenWhoDidNotKneelPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <TheQueenWhoDidNotKneelContent />
    </>
  );
}
