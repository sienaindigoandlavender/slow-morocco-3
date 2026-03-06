import { Metadata } from "next";
import { WeatherPortraitsContent } from "./WeatherPortraitsContent";

export const revalidate = 3600;

const BASE_URL = "https://www.slowmorocco.com";
const SLUG = "weather-portraits";
const CANONICAL = `${BASE_URL}/stories/${SLUG}`;

// ─────────────────────────────────────────────────────────────────────────────
// METADATA
// ─────────────────────────────────────────────────────────────────────────────

export const metadata: Metadata = {
  title: "Weather Portraits — Eight Cities, Twelve Months, 73.5°C of Range | Slow Morocco",
  description:
    "Eight Moroccan cities mapped by temperature, rainfall, and sunshine. From Ifrane's −23.9°C (Africa's coldest) to Marrakech's 49.6°C. Live weather, radial climate charts, satellite imagery, and six climate zones in one country.",
  keywords: [
    "Morocco weather", "Morocco climate", "Marrakech temperature", "Ifrane coldest Africa",
    "Morocco climate zones", "Casablanca weather", "Fes temperature", "Tangier rainfall",
    "Agadir climate", "Ouarzazate desert", "Errachidia heat", "Morocco sunshine hours",
    "chergui wind", "Canary Current Morocco", "Atlas Mountains snow", "Sahara Morocco",
  ],
  authors: [{ name: "J. Ng", url: `${BASE_URL}/about` }],
  alternates: { canonical: CANONICAL },
  openGraph: {
    title: "Weather Portraits — Eight Cities, 73.5°C of Range",
    description: "Morocco holds Africa's coldest recorded temperature and some of its hottest. Eight cities. Twelve months. Live weather, radial charts, satellite views.",
    url: CANONICAL,
    siteName: "Slow Morocco",
    locale: "en_GB",
    type: "article",
    authors: ["J. Ng"],
    tags: ["weather", "climate", "Morocco", "data", "temperature", "rainfall"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Weather Portraits — Eight Cities, 73.5°C of Range",
    description: "Morocco's climate mapped: from −23.9°C to 49.6°C across eight cities.",
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
      "headline": "Weather Portraits — Eight Cities, Twelve Months, 73.5°C of Range",
      "description": "Eight Moroccan cities mapped by temperature, rainfall, and sunshine. From Ifrane's −23.9°C (Africa's coldest recorded temperature) to Marrakech's 49.6°C. Live weather, radial climate charts, satellite imagery, and six climate zones contained in one country.",
      "datePublished": "2025-01-01",
      "dateModified": new Date().toISOString().split("T")[0],
      "author": { "@type": "Person", "name": "J. Ng", "url": `${BASE_URL}/about` },
      "publisher": { "@type": "Organization", "name": "Slow Morocco", "url": BASE_URL },
      "mainEntityOfPage": CANONICAL,
      "keywords": "Morocco weather, Morocco climate, Marrakech temperature, Ifrane coldest Africa, Morocco climate zones, chergui wind, Canary Current, Atlas Mountains snow",
      "articleSection": "Climate & Geography",
      "spatialCoverage": { "@type": "Place", "name": "Morocco", "geo": { "@type": "GeoShape", "box": "27.0 -13.0 36.0 -1.0" } },
    },
    {
      "@type": "Dataset",
      "@id": `${CANONICAL}#dataset`,
      "name": "Morocco City Climate Portraits — Temperature, Rainfall & Sunshine",
      "description": "Monthly temperature highs and lows, rainfall, and sunshine hours for eight Moroccan cities: Marrakech, Casablanca, Fes, Tangier, Agadir, Ouarzazate, Ifrane, and Errachidia. Includes record extremes and live weather data.",
      "url": CANONICAL,
      "creator": { "@type": "Organization", "name": "WMO / Open-Meteo / Climate-Data.org" },
      "spatialCoverage": "Morocco",
      "temporalCoverage": "1935/2025",
    },
    {
      "@type": "FAQPage",
      "@id": `${CANONICAL}#faq`,
      "mainEntity": [
        {
          "@type": "Question",
          "name": "What is the coldest temperature ever recorded in Africa?",
          "acceptedAnswer": { "@type": "Answer", "text": "The coldest temperature ever recorded in Africa is −23.9°C, measured at Ifrane, Morocco on 11 February 1935. Ifrane is a mountain town at 1,665m elevation in the Middle Atlas Mountains, known for cedar forests, Barbary macaques, and snow half the year." },
        },
        {
          "@type": "Question",
          "name": "How many climate zones does Morocco have?",
          "acceptedAnswer": { "@type": "Answer", "text": "Morocco has six distinct climate zones: Atlantic Coast (mild, oceanic), Mediterranean Coast (hot dry summers), Interior Plains (continental extremes), Atlas Mountains (snow, sub-zero winters), Pre-Saharan (desert, extreme diurnal range), and True Sahara (hyper-arid, 40°C+ summers). This gives Morocco a total temperature range of 73.5°C." },
        },
        {
          "@type": "Question",
          "name": "What is Morocco's hottest recorded temperature?",
          "acceptedAnswer": { "@type": "Answer", "text": "Morocco's verified hottest temperature is 49.6°C, recorded at Marrakech on 17 July 2012. A reading of 50.4°C was reported at Agadir-Inezgane on 11 August 2023 but remains disputed and unverified." },
        },
      ],
    },
    {
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Slow Morocco", "item": BASE_URL },
        { "@type": "ListItem", "position": 2, "name": "Stories", "item": `${BASE_URL}/stories` },
        { "@type": "ListItem", "position": 3, "name": "Weather Portraits", "item": CANONICAL },
      ],
    },
  ],
};

// ─────────────────────────────────────────────────────────────────────────────
// PAGE
// ─────────────────────────────────────────────────────────────────────────────

export default function WeatherPortraitsPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <WeatherPortraitsContent />
    </>
  );
}
