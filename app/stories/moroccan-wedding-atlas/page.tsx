import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getStoryBySlug, getStoryImages, getJourneys } from "@/lib/supabase";
import WeddingAtlasContent from "./WeddingAtlasContent";

export const revalidate = 3600;

const BASE_URL = "https://www.slowmorocco.com";
const SLUG = "moroccan-wedding-atlas";
const CANONICAL = `${BASE_URL}/stories/${SLUG}`;

export const metadata: Metadata = {
  title: "A Moroccan Wedding | Slow Morocco",
  description:
    "Seven days. Three outfit changes. Two families negotiating. A Moroccan wedding is not a party — it is a ceremony of alliance, protection, and performance. Everything that happens, and why.",
  keywords: [
    "Moroccan wedding", "moroccan wedding traditions", "amariya Morocco",
    "négafa Morocco", "henna night Morocco", "Moroccan wedding ceremony",
    "moroccan wedding cost", "mahr Morocco", "moroccan bridal caftans",
    "Moroccan wedding music", "Imilchil marriage", "moroccan wedding atlas",
  ],
  authors: [{ name: "J. Ng", url: `${BASE_URL}/about` }],
  alternates: { canonical: CANONICAL },
  openGraph: {
    title: "A Moroccan Wedding",
    description: "Seven days. Three outfit changes. Two families negotiating. Everything that happens at a Moroccan wedding, and why.",
    url: CANONICAL,
    siteName: "Slow Morocco",
    locale: "en_GB",
    type: "article",
    authors: ["J. Ng"],
  },
  twitter: {
    card: "summary_large_image",
    title: "A Moroccan Wedding",
    description: "The ceremony, the costs, the rituals — everything that happens at a Moroccan wedding.",
  },
  robots: { index: true, follow: true },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Article",
      "@id": `${CANONICAL}#article`,
      "headline": "A Moroccan Wedding",
      "description": "The ceremony, rituals, costs, and traditions of a traditional Moroccan wedding — from henna night to the amariya procession.",
      "dateModified": new Date().toISOString().split("T")[0],
      "author": { "@type": "Person", "name": "J. Ng", "url": `${BASE_URL}/about` },
      "publisher": { "@type": "Organization", "name": "Slow Morocco", "url": BASE_URL },
      "mainEntityOfPage": CANONICAL,
      "articleSection": "Culture",
      "about": { "@type": "Place", "name": "Morocco" },
    },
    {
      "@type": "FAQPage",
      "@id": `${CANONICAL}#faq`,
      "mainEntity": [
        {
          "@type": "Question",
          "name": "How long does a Moroccan wedding last?",
          "acceptedAnswer": { "@type": "Answer", "text": "A traditional Moroccan wedding spans multiple days — historically up to seven. In modern practice, most weddings run two to three days: the henna night (laylat al-henna), the wedding night itself, and sometimes a day-after celebration. Wealthier families maintain the longer format." },
        },
        {
          "@type": "Question",
          "name": "What is the amariya at a Moroccan wedding?",
          "acceptedAnswer": { "@type": "Answer", "text": "The amariya is a gilded ceremonial throne or palanquin in which the bride is carried around the wedding hall on the shoulders of several men, as a formal announcement of the marriage. It originated in Fez approximately 600 years ago as a wooden box with windows for modesty. Today it is an elaborate gilded structure rented for 5,000 to 50,000 dirhams depending on the region." },
        },
        {
          "@type": "Question",
          "name": "What is the négafa?",
          "acceptedAnswer": { "@type": "Answer", "text": "The négafa is the professional wedding dresser and stylist, responsible for the bride's multiple ceremonial outfit changes, hair, makeup, and the ritual choreography of the evening. She is considered essential to a proper Moroccan wedding and typically works one wedding per weekend." },
        },
        {
          "@type": "Question",
          "name": "How many outfits does a Moroccan bride wear?",
          "acceptedAnswer": { "@type": "Answer", "text": "A Moroccan bride typically wears between three and seven caftans during the wedding night, each representing a different region or stage of the ceremony. The number depends on family wealth and tradition. Each change is a performance managed by the négafa." },
        },
      ],
    },
    {
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Slow Morocco", "item": BASE_URL },
        { "@type": "ListItem", "position": 2, "name": "Stories", "item": `${BASE_URL}/stories` },
        { "@type": "ListItem", "position": 3, "name": "Culture", "item": `${BASE_URL}/stories/category/culture` },
        { "@type": "ListItem", "position": 4, "name": "A Moroccan Wedding", "item": CANONICAL },
      ],
    },
  ],
};

export default async function WeddingAtlasPage() {
  const [story, images, allJourneys] = await Promise.all([
    getStoryBySlug(SLUG),
    getStoryImages(SLUG),
    getJourneys(),
  ]);

  if (!story) notFound();

  const relatedJourneys = allJourneys
    ?.filter((j) =>
      j.title?.toLowerCase().includes("marrakech") ||
      j.title?.toLowerCase().includes("culture") ||
      j.category?.toLowerCase().includes("culture")
    )
    .slice(0, 2) || [];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <WeddingAtlasContent story={story} images={images || []} relatedJourneys={relatedJourneys} />
    </>
  );
}
