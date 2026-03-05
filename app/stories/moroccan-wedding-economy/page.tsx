import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getStoryBySlug, getStoryImages, getJourneys } from "@/lib/supabase";
import MarriageEconomyContent from "./MarriageEconomyContent";

export const revalidate = 3600;

const BASE_URL = "https://www.slowmorocco.com";
const SLUG = "marriage-economy"; // Supabase slug
const URL_PATH = "moroccan-wedding-economy"; // URL / folder name
const CANONICAL = `${BASE_URL}/stories/${URL_PATH}`;

export const metadata: Metadata = {
  title: "What a Moroccan Wedding Actually Costs | Slow Morocco",
  description:
    "A Moroccan wedding can cost as much as a car. The groom's family traditionally pays. Divorce is rising, the average age of first marriage is climbing, and 89% of divorces are now by mutual consent. The numbers behind Morocco's marriage economy.",
  keywords: [
    "Moroccan wedding cost", "Morocco marriage statistics", "Morocco divorce rate",
    "average age marriage Morocco", "Moroccan wedding traditions", "mahr Morocco",
    "Morocco family code", "Mudawwana Morocco", "Morocco wedding budget",
    "marriage economy Morocco", "Morocco divorce 2024", "Moroccan wedding ceremony",
    "négafa Morocco", "amariya Morocco", "Morocco HCP marriage statistics",
  ],
  authors: [{ name: "J. Ng", url: `${BASE_URL}/about` }],
  alternates: { canonical: CANONICAL },
  openGraph: {
    title: "What a Moroccan Wedding Actually Costs",
    description: "The groom's family pays. The divorce rate is rising. The age of first marriage is climbing. The data behind Morocco's marriage economy.",
    url: CANONICAL,
    siteName: "Slow Morocco",
    locale: "en_GB",
    type: "article",
    authors: ["J. Ng"],
    tags: ["Morocco", "culture", "marriage", "society", "economics"],
  },
  twitter: {
    card: "summary_large_image",
    title: "What a Moroccan Wedding Actually Costs",
    description: "The numbers behind Morocco's marriage economy — costs, divorce rates, shifting ages, changing norms.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-snippet": -1, "max-image-preview": "large" },
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Article",
      "@id": `${CANONICAL}#article`,
      "headline": "What a Moroccan Wedding Actually Costs",
      "description": "The economic and social data behind marriage in Morocco — costs, divorce rates, shifting ages, and changing norms.",
      "datePublished": "2025-01-01",
      "dateModified": new Date().toISOString().split("T")[0],
      "author": { "@type": "Person", "name": "J. Ng", "url": `${BASE_URL}/about` },
      "publisher": {
        "@type": "Organization", "name": "Slow Morocco", "url": BASE_URL,
        "parentOrganization": { "@type": "Organization", "name": "Dancing with Lions", "url": "https://www.dancingwiththelions.com" },
      },
      "mainEntityOfPage": CANONICAL,
      "keywords": "Morocco wedding, marriage statistics, divorce rate Morocco, Moroccan wedding cost, Mudawwana",
      "articleSection": "Culture",
      "about": { "@type": "Place", "name": "Morocco" },
    },
    // ── Entity definitions ──────────────────────────────────────────
    {
      "@type": "Thing",
      "@id": `${CANONICAL}#mahr`,
      "name": "Mahr (Moroccan Wedding Dowry)",
      "description": "The mahr is a mandatory gift from the groom to the bride under Islamic law, required for a valid marriage contract in Morocco. It is the bride's legal property and cannot be claimed by the groom's family. In Morocco, the mahr is typically a sum of money, though it can take other forms. Under the 2004 Family Code (Mudawwana), the mahr remains compulsory.",
    },
    {
      "@type": "Thing",
      "@id": `${CANONICAL}#mudawwana`,
      "name": "Mudawwana — Morocco's Family Code",
      "description": "The Mudawwana is Morocco's Family Code, last substantially reformed in 2004 under King Mohammed VI. The 2004 reform gave women significantly more rights: equal right to initiate divorce, raised minimum marriage age from 15 to 18, restricted polygamy, and gave mothers custody rights. A further reform was proposed by the Ministry of Justice in December 2024, addressing remaining inequalities in inheritance, custody, and marriage conditions.",
    },
    {
      "@type": "Thing",
      "@id": `${CANONICAL}#amariya`,
      "name": "Amariya — Moroccan Bridal Throne",
      "description": "The Amariya is a ceremonial gilded throne or palanquin in which the Moroccan bride is carried around the wedding hall by several men, as a formal announcement of the marriage. Originating in Fez approximately 600 years ago, the original Amariya was a wooden box with windows to preserve the bride's modesty while she was transported by camel. Today it is an elaborate gilded structure. Rental costs range from 5,000 to 50,000 dirhams ($500–$5,000) depending on the region and elaborateness.",
    },
    // ── FAQ ─────────────────────────────────────────────────────────
    {
      "@type": "FAQPage",
      "@id": `${CANONICAL}#faq`,
      "mainEntity": [
        {
          "@type": "Question",
          "name": "How much does a Moroccan wedding cost?",
          "acceptedAnswer": { "@type": "Answer", "text": "A traditional Moroccan wedding for local families typically costs between $10,000 and $20,000 (100,000–200,000 dirhams), though this varies significantly by region, family size, and social expectations. Costs include the venue (often rented for multiple nights), food for hundreds of guests, the négafa (wedding stylist), multiple bridal caftans, the Amariya rental, musicians, and the mahr. In rural areas, community contributions traditionally helped offset costs; in cities, the burden falls almost entirely on the couple's families." },
        },
        {
          "@type": "Question",
          "name": "What is the divorce rate in Morocco?",
          "acceptedAnswer": { "@type": "Answer", "text": "Morocco's divorce rate has risen steadily. According to the HCP (Haut-Commissariat au Plan), for every 100 marriage requests between 2017 and 2021, approximately 50 divorce cases were filed. In raw numbers, divorces rose from 44,408 in 2014 to 67,556 in 2023, before slightly declining to 65,475 in 2024. By 2024, 89.3% of divorces were by mutual consent (chiqaq), up from 63.1% in 2014, indicating a sharp shift toward amicable settlements." },
        },
        {
          "@type": "Question",
          "name": "What is the average age of marriage in Morocco?",
          "acceptedAnswer": { "@type": "Answer", "text": "According to HCP data, the average age at first marriage in Morocco is 25.5 years for women and 31.9 years for men. Both figures have been rising steadily since 2004, driven by economic pressures — particularly housing costs and youth unemployment — that delay men's ability to meet the financial expectations of marriage. The minimum legal age of marriage was raised from 15 to 18 for both genders under the 2004 Mudawwana reform." },
        },
        {
          "@type": "Question",
          "name": "Who pays for a wedding in Morocco?",
          "acceptedAnswer": { "@type": "Answer", "text": "Traditionally, the groom's family bears the majority of wedding costs in Morocco, including the mahr (mandatory dowry paid to the bride), the venue, food, and entertainment. The bride's family typically provides her trousseau (caftans, jewelry, household items). In modern urban marriages, particularly in Casablanca and Marrakech, couples increasingly split costs equally. A common saying — 'May God help Moroccan men' — reflects the financial pressure historically placed on grooms." },
        },
        {
          "@type": "Question",
          "name": "What is the Mudawwana?",
          "acceptedAnswer": { "@type": "Answer", "text": "The Mudawwana is Morocco's Family Code, governing marriage, divorce, inheritance, and child custody. It was last substantially reformed in 2004 under King Mohammed VI, significantly expanding women's rights: equal right to initiate divorce, minimum marriage age raised to 18, polygamy heavily restricted, and mothers granted custody rights. A further reform was proposed by the Ministry of Justice in December 2024." },
        },
        {
          "@type": "Question",
          "name": "How many marriages are registered in Morocco each year?",
          "acceptedAnswer": { "@type": "Answer", "text": "Morocco registered approximately 252,000 marriages in 2022, down from around 280,000 in 2018, according to HCP data. The decline reflects rising average marriage ages, economic pressures on young Moroccans, and a growing share of women — particularly urban, educated women — remaining single by choice. The share of women over 50 who have never married rose from 3.9% in 2004 to 11.1% in 2024." },
        },
        {
          "@type": "Question",
          "name": "What is the négafa in a Moroccan wedding?",
          "acceptedAnswer": { "@type": "Answer", "text": "The négafa (also spelled negaffa) is the professional wedding stylist in a Moroccan wedding — responsible for dressing the bride in her multiple ceremonial caftans, styling her hair and makeup for each outfit change, and managing the choreography of the evening's rituals. A single négafa typically assists one bride per weekend and commands fees that can reach several thousand dirhams. She is considered essential to a proper Moroccan wedding." },
        },
      ],
    },
    {
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Slow Morocco", "item": BASE_URL },
        { "@type": "ListItem", "position": 2, "name": "Stories", "item": `${BASE_URL}/stories` },
        { "@type": "ListItem", "position": 3, "name": "Culture", "item": `${BASE_URL}/stories/category/culture` },
        { "@type": "ListItem", "position": 4, "name": "What a Moroccan Wedding Actually Costs", "item": CANONICAL },
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
      j.title?.toLowerCase().includes("culture") ||
      j.title?.toLowerCase().includes("marrakech") ||
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
