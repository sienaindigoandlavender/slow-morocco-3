import { Metadata } from "next";
import { TheTechLeapfrogContent } from "./TheTechLeapfrogContent";

export const revalidate = 3600;

const BASE_URL = "https://www.slowmorocco.com";
const SLUG = "the-tech-leapfrog";
const CANONICAL = `${BASE_URL}/stories/${SLUG}`;

export const metadata: Metadata = {
  title: "The Tech Leapfrog — Africa Skipped Landlines, Bank Branches, and Legacy Payments | Slow Morocco",
  description: "1.1 billion mobile users. $1.1 trillion in mobile transactions. Nine unicorns. Africa skipped legacy infrastructure and built the future first.",
  keywords: ["Africa tech leapfrog", "M-Pesa", "African fintech", "African unicorns", "mobile money Africa", "Flutterwave", "African VC funding", "African tech hubs"],
  authors: [{ name: "J. Ng", url: `${BASE_URL}/about` }],
  alternates: { canonical: CANONICAL },
  openGraph: {
    title: "The Tech Leapfrog — Africa Built the Future First",
    description: "1.1B mobile users. $1.1T in transactions. 9 unicorns. Africa skipped legacy infrastructure and leapfrogged ahead.",
    url: CANONICAL, siteName: "Slow Morocco", locale: "en_GB", type: "article",
    authors: ["J. Ng"], tags: ["Africa", "technology", "fintech", "mobile money", "leapfrog"],
  },
  twitter: { card: "summary_large_image", title: "The Tech Leapfrog — Africa Built the Future First", description: "1.1B mobile users. $1.1T transactions. 9 unicorns. Africa leapfrogged legacy infrastructure." },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-snippet": -1, "max-image-preview": "large" } },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Article", "@id": `${CANONICAL}#article`,
      "headline": "The Tech Leapfrog — Africa Skipped Landlines, Bank Branches, and Legacy Payments",
      "description": "How Africa bypassed legacy infrastructure to build the world's largest mobile money market, nine tech unicorns, and a $30 billion digital economy.",
      "datePublished": "2025-01-01", "dateModified": new Date().toISOString().split("T")[0],
      "author": { "@type": "Person", "name": "J. Ng", "url": `${BASE_URL}/about` },
      "publisher": { "@type": "Organization", "name": "Slow Morocco", "url": BASE_URL },
      "mainEntityOfPage": CANONICAL, "articleSection": "Technology & Innovation",
    },
    {
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Slow Morocco", "item": BASE_URL },
        { "@type": "ListItem", "position": 2, "name": "Stories", "item": `${BASE_URL}/stories` },
        { "@type": "ListItem", "position": 3, "name": "The Tech Leapfrog", "item": CANONICAL },
      ],
    },
  ],
};

export default function TheTechLeapfrogPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <TheTechLeapfrogContent />
    </>
  );
}
