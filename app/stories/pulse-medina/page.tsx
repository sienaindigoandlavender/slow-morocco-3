import { Metadata } from "next";
import { PulseMedinaContent } from "./PulseMedinaContent";

export const revalidate = 3600;

const BASE_URL = "https://www.slowmorocco.com";
const SLUG = "pulse-medina";
const CANONICAL = `${BASE_URL}/stories/${SLUG}`;

// ─────────────────────────────────────────────────────────────────────────────
// METADATA
// ─────────────────────────────────────────────────────────────────────────────

export const metadata: Metadata = {
  title: "The Pulse of the Medina — Marrakech as a Living Organism | Slow Morocco",
  description:
    "Generative visualization of Marrakech's medina as a living organism. Streets as pulsating threads coloured by craft quarter, thickening with the crowd. Drag the time slider from 5AM fajr to midnight silence.",
  keywords: [
    "Marrakech medina", "pulse of the medina", "medina visualization", "Marrakech souks",
    "Jemaa el-Fna", "craft quarters", "coppersmiths", "tanneries", "zellige",
    "Moroccan artisans", "medina rhythm", "generative art", "sensory map",
  ],
  authors: [{ name: "J. Ng", url: `${BASE_URL}/about` }],
  alternates: { canonical: CANONICAL },
  openGraph: {
    title: "The Pulse of the Medina — Marrakech as a Living Organism",
    description: "Generative visualization of Marrakech's medina as a living organism. Streets as pulsating threads coloured by craft quarter, thickening with the crowd.",
    url: CANONICAL,
    siteName: "Slow Morocco",
    locale: "en_GB",
    type: "article",
    authors: ["J. Ng"],
    tags: ["medina", "Marrakech", "Morocco", "generative", "visualization", "craft"],
  },
  twitter: {
    card: "summary_large_image",
    title: "The Pulse of the Medina — Marrakech as a Living Organism",
    description: "Generative visualization of Marrakech's medina as a living organism. Streets as pulsating threads coloured by craft quarter, thickening with the crowd.",
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
      "headline": "The Pulse of the Medina — Marrakech as a Living Organism",
      "description": "Generative visualization of Marrakech's medina as a living organism. Streets as pulsating threads coloured by craft quarter, thickening with the crowd. From 5AM fajr to midnight silence.",
      "datePublished": "2025-01-01",
      "dateModified": new Date().toISOString().split("T")[0],
      "author": { "@type": "Person", "name": "J. Ng", "url": `${BASE_URL}/about` },
      "publisher": { "@type": "Organization", "name": "Slow Morocco", "url": BASE_URL },
      "mainEntityOfPage": CANONICAL,
      "keywords": "Marrakech medina, pulse of the medina, medina visualization, craft quarters, Jemaa el-Fna, generative art, sensory map",
      "articleSection": "Generative Sensory Map",
      "spatialCoverage": { "@type": "Place", "name": "Morocco", "geo": { "@type": "GeoShape", "box": "27.6 -13.2 35.9 -1.0" } },
    },
    {
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Slow Morocco", "item": BASE_URL },
        { "@type": "ListItem", "position": 2, "name": "Stories", "item": `${BASE_URL}/stories` },
        { "@type": "ListItem", "position": 3, "name": "The Pulse of the Medina", "item": CANONICAL },
      ],
    },
  ],
};

// ─────────────────────────────────────────────────────────────────────────────
// PAGE
// ─────────────────────────────────────────────────────────────────────────────

export default function PulseMedinaPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <PulseMedinaContent />
    </>
  );
}
