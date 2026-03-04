import { Metadata } from "next";
import MoroccoLifeContent from "./MoroccoLifeContent";

const BASE_URL = "https://www.slowmorocco.com";

export const metadata: Metadata = {
  title: "Morocco — The Country: Safety, Infrastructure, Data & 2030 | Slow Morocco",
  description:
    "Morocco in data. Crime index, safety rankings, climate zones, flight connections, infrastructure investment, city statistics, cost of living, demographics. Everything a serious traveller or researcher needs in one place.",
  keywords: [
    "Morocco safety statistics",
    "Morocco crime rate",
    "Morocco infrastructure 2030",
    "Morocco World Cup 2030",
    "Morocco cost of living",
    "Morocco flight connections",
    "Morocco climate zones",
    "Morocco population data",
    "Morocco economy statistics",
    "Morocco terrain map",
    "Morocco stability index",
    "living in Morocco data",
    "Morocco facts statistics",
    "Morocco travel intelligence",
  ],
  alternates: { canonical: `${BASE_URL}/life` },
  openGraph: {
    title: "Morocco — The Country: Data, Safety & Infrastructure",
    description:
      "Morocco in numbers. Safety index, climate zones, flight connections, 2030 infrastructure, city data, demographics. One stop.",
    url: `${BASE_URL}/life`,
    siteName: "Slow Morocco",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
    "max-snippet": -1,
    "max-image-preview": "large",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "Morocco — The Country",
  description:
    "Comprehensive data intelligence on Morocco: safety statistics, climate zones, flight connections, infrastructure investment, city profiles, demographics, and 2030 World Cup context.",
  url: `${BASE_URL}/life`,
  inLanguage: "en",
  isAccessibleForFree: true,
  publisher: {
    "@type": "Organization",
    name: "Slow Morocco",
    url: BASE_URL,
    parentOrganization: {
      "@type": "Organization",
      name: "Dancing with Lions",
      url: "https://www.dancingwiththelions.com",
    },
  },
  author: {
    "@type": "Person",
    name: "J. Ng",
    jobTitle: "Founder",
    worksFor: { "@type": "Organization", name: "Dancing with Lions" },
  },
  about: [
    {
      "@type": "Country",
      name: "Morocco",
      alternateName: ["Maroc", "Al-Mamlaka al-Maghribiya", "Kingdom of Morocco"],
      geo: { "@type": "GeoShape", box: "27.6 -13.2 35.9 -1.0" },
      population: 37840000,
      areaTotal: 710850,
    },
  ],
  keywords:
    "Morocco safety, Morocco statistics, Morocco 2030 World Cup, Morocco infrastructure, Morocco demographics, Morocco climate, Morocco flights, Morocco cost of living",
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Is Morocco safe for tourists?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Morocco ranks as one of the safest countries in Africa and the broader Arab world. The Global Peace Index 2024 ranks Morocco 82nd globally — above several European countries and significantly above its regional neighbours. The crime index (Numbeo 2024) is 46.7, comparable to Portugal or Greece. Violent crime against tourists is rare.",
      },
    },
    {
      "@type": "Question",
      name: "What is Morocco's crime rate?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Morocco's crime index is 46.7 (Numbeo 2024), placing it in the moderate range globally. The safety index is 53.3. Petty theft in tourist areas (Marrakech medina, Fes souks) is the most common issue. Violent crime against foreign visitors is rare and statistically low.",
      },
    },
    {
      "@type": "Question",
      name: "Is Morocco hosting the 2030 FIFA World Cup?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. Morocco is co-hosting the 2030 FIFA World Cup with Spain and Portugal, with centenary matches in Argentina, Uruguay, and Paraguay. Morocco will host the majority of matches. Six Moroccan cities have been confirmed as host cities: Casablanca, Rabat, Marrakech, Fes, Tangier, and Agadir. Stadium construction and infrastructure investment began in 2023.",
      },
    },
    {
      "@type": "Question",
      name: "What are Morocco's climate zones?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Morocco has five distinct climate zones: Mediterranean coastal (north), Semi-arid Atlantic (west coast), Continental interior (Marrakech, Fes, Meknes), High mountain (Atlas ranges, snow in winter), and Saharan desert (southeast, Merzouga, Zagora). The country spans from the Strait of Gibraltar to the Sahara — a vertical range of climate that is unusual for a country of its size.",
      },
    },
    {
      "@type": "Question",
      name: "What is Morocco's population?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Morocco's population is approximately 37.8 million (2024 estimate). The largest city is Casablanca (3.7 million in the city proper, 4.7 million in the greater urban area). Other major cities: Rabat (the capital, 600,000), Fes (1.2 million), Marrakech (1.0 million), Tangier (1.1 million), Agadir (600,000). The urban population is approximately 65%, with rapid urbanisation ongoing.",
      },
    },
  ],
};

export default function LifePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <MoroccoLifeContent />
    </>
  );
}
