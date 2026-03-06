import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getStoryBySlug, getStoryImages, getJourneys } from "@/lib/supabase";
import MarriageEconomyContent from "./MarriageEconomyContent";

export const revalidate = 3600;

const BASE_URL = "https://www.slowmorocco.com";
const SLUG = "marriage-economy";
const CANONICAL = `${BASE_URL}/stories/${SLUG}`;

export const metadata: Metadata = {
  title: "The Marriage Economy | Slow Morocco",
  description:
    "Morocco's divorce rate is rising. The average age of first marriage is climbing. The share of women who never marry at all has nearly tripled since 2004. The data behind who is marrying, who isn't, and why.",
  keywords: [
    "Morocco divorce rate", "Morocco marriage statistics", "average age marriage Morocco",
    "Morocco singlehood women", "Morocco family code", "Mudawwana Morocco",
    "Morocco HCP statistics", "Morocco marriage age", "chiqaq Morocco",
    "Morocco demographic change", "marriage economy Morocco",
  ],
  authors: [{ name: "J. Ng", url: `${BASE_URL}/about` }],
  alternates: { canonical: CANONICAL },
  openGraph: {
    title: "The Marriage Economy",
    description: "Morocco's divorce rate is rising. The age of first marriage is climbing. The numbers behind who is marrying in Morocco — and who isn't.",
    url: CANONICAL,
    siteName: "Slow Morocco",
    locale: "en_GB",
    type: "article",
    authors: ["J. Ng"],
  },
  robots: { index: true, follow: true },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Article",
      "@id": `${CANONICAL}#article`,
      "headline": "The Marriage Economy",
      "description": "Statistical and social analysis of marriage patterns in Morocco — divorce rates, average marriage age, singlehood, and the impact of the Mudawwana reform.",
      "dateModified": new Date().toISOString().split("T")[0],
      "author": { "@type": "Person", "name": "J. Ng", "url": `${BASE_URL}/about` },
      "publisher": { "@type": "Organization", "name": "Slow Morocco", "url": BASE_URL },
      "mainEntityOfPage": CANONICAL,
      "articleSection": "Culture",
      "about": { "@type": "Place", "name": "Morocco" },
    },
    {
      "@type": "Dataset",
      "@id": `${CANONICAL}#dataset`,
      "name": "Morocco Marriage and Divorce Statistics 2004–2024",
      "description": "Data on marriage rates, divorce rates, average age at first marriage, singlehood rates, and child marriage in Morocco, sourced from HCP (Haut-Commissariat au Plan) and CSPJ.",
      "url": CANONICAL,
      "creator": { "@type": "Organization", "name": "Slow Morocco" },
      "temporalCoverage": "2004/2024",
      "spatialCoverage": { "@type": "Place", "name": "Morocco" },
    },
    {
      "@type": "FAQPage",
      "@id": `${CANONICAL}#faq`,
      "mainEntity": [
        {
          "@type": "Question",
          "name": "What is the divorce rate in Morocco?",
          "acceptedAnswer": { "@type": "Answer", "text": "Morocco's divorce rate has risen steadily. According to HCP data, for every 100 marriage requests between 2017 and 2021, approximately 50 divorce cases were filed. In raw numbers, divorces rose from 44,408 in 2014 to 67,556 in 2023, before slightly declining to 65,475 in 2024." },
        },
        {
          "@type": "Question",
          "name": "What is the average age of marriage in Morocco?",
          "acceptedAnswer": { "@type": "Answer", "text": "According to HCP data, the average age at first marriage in Morocco is 25.5 years for women and 31.9 years for men. Both figures have been rising since 2004, driven primarily by economic pressures that delay young men's ability to meet the financial expectations of marriage." },
        },
        {
          "@type": "Question",
          "name": "What is the Mudawwana?",
          "acceptedAnswer": { "@type": "Answer", "text": "The Mudawwana is Morocco's Family Code, last substantially reformed in 2004 under King Mohammed VI. The reform gave women the equal right to initiate divorce, raised the minimum marriage age to 18, restricted polygamy, and gave mothers custody rights. A further reform was proposed by the Ministry of Justice in December 2024." },
        },
        {
          "@type": "Question",
          "name": "How many women in Morocco never marry?",
          "acceptedAnswer": { "@type": "Answer", "text": "The share of women over 50 who have never married rose from 3.9% in 2004 to 11.1% in 2024, according to HCP. The rate is higher in rural areas and is growing fastest among urban, educated women." },
        },
      ],
    },
    {
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Slow Morocco", "item": BASE_URL },
        { "@type": "ListItem", "position": 2, "name": "Stories", "item": `${BASE_URL}/stories` },
        { "@type": "ListItem", "position": 3, "name": "Culture", "item": `${BASE_URL}/stories/category/culture` },
        { "@type": "ListItem", "position": 4, "name": "The Marriage Economy", "item": CANONICAL },
      ],
    },
  ],
};

export default async function MarriageEconomyPage() {
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
      <MarriageEconomyContent story={story} images={images || []} relatedJourneys={relatedJourneys} />
    </>
  );
}
