import { Metadata } from "next";
import MarriagesDivorcesContent from "./MarriagesDivorcesContent";

export const revalidate = 86400;

const BASE_URL = "https://www.slowmorocco.com";
const CANONICAL = `${BASE_URL}/stories/marriages-divorces-morocco`;

export const metadata: Metadata = {
  title: "Marriages & Divorces in Morocco | Slow Morocco",
  description:
    "Morocco registers around 252,000 marriages and 65,000 divorces per year. The divorce rate has nearly doubled since 2014. The average man marries at 32. The share of women who never marry has tripled since 2004. The data, charted.",
  keywords: [
    "Morocco divorce rate", "Morocco marriage statistics", "Morocco marriages divorces",
    "average age marriage Morocco", "Morocco singlehood", "Mudawwana Morocco",
    "HCP Morocco statistics", "chiqaq Morocco divorce", "Morocco demographic data",
    "Morocco family statistics 2024",
  ],
  authors: [{ name: "J. Ng", url: `${BASE_URL}/about` }],
  alternates: { canonical: CANONICAL },
  openGraph: {
    title: "Marriages & Divorces in Morocco",
    description: "252,000 marriages. 65,000 divorces. 89% by mutual consent. The numbers behind who is marrying in Morocco — and who isn't.",
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
      "headline": "Marriages & Divorces in Morocco",
      "description": "Data analysis of marriage and divorce trends in Morocco 2004–2024, sourced from HCP and CSPJ.",
      "dateModified": new Date().toISOString().split("T")[0],
      "author": { "@type": "Person", "name": "J. Ng", "url": `${BASE_URL}/about` },
      "publisher": { "@type": "Organization", "name": "Slow Morocco", "url": BASE_URL },
      "mainEntityOfPage": CANONICAL,
      "articleSection": "Culture",
    },
    {
      "@type": "Dataset",
      "@id": `${CANONICAL}#dataset`,
      "name": "Morocco Marriage and Divorce Statistics 2004–2024",
      "description": "Marriage rates, divorce rates, average age at first marriage, singlehood rates, and consensual divorce trends in Morocco, sourced from HCP (Haut-Commissariat au Plan) and CSPJ.",
      "url": CANONICAL,
      "creator": { "@type": "Organization", "name": "Slow Morocco" },
      "temporalCoverage": "2004/2024",
      "spatialCoverage": { "@type": "Place", "name": "Morocco" },
    },
    {
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "What is the divorce rate in Morocco?",
          "acceptedAnswer": { "@type": "Answer", "text": "According to HCP data, Morocco registered 65,475 divorces in 2024, against approximately 252,000 marriages — roughly one divorce for every four marriages. Between 2017 and 2021, for every 100 marriage applications, 50 divorce cases were filed. The rate peaked in 2020 at 55 divorces per 100 marriages." },
        },
        {
          "@type": "Question",
          "name": "What is the average age of marriage in Morocco?",
          "acceptedAnswer": { "@type": "Answer", "text": "According to HCP, the average age at first marriage in Morocco is 25.5 years for women and 31.9 years for men. Both figures have risen steadily since 2004, driven by economic pressures including housing costs and wedding expenses." },
        },
        {
          "@type": "Question",
          "name": "How many marriages are registered in Morocco each year?",
          "acceptedAnswer": { "@type": "Answer", "text": "Morocco registered approximately 252,000 marriages in 2022 and 2024, down from around 280,000 in 2018. The decline reflects rising average marriage ages and economic pressures on young Moroccans." },
        },
        {
          "@type": "Question",
          "name": "What percentage of divorces in Morocco are by mutual consent?",
          "acceptedAnswer": { "@type": "Answer", "text": "By 2024, 89.3% of divorces in Morocco were by mutual consent (chiqaq), up from 63.1% in 2014, according to HCP. This shift reflects both legal reform and changing social norms around marital dissolution." },
        },
      ],
    },
    {
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Slow Morocco", "item": BASE_URL },
        { "@type": "ListItem", "position": 2, "name": "Stories", "item": `${BASE_URL}/stories` },
        { "@type": "ListItem", "position": 3, "name": "Marriages & Divorces in Morocco", "item": CANONICAL },
      ],
    },
  ],
};

export default function MarriagesDivorcesPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <MarriagesDivorcesContent />
    </>
  );
}
