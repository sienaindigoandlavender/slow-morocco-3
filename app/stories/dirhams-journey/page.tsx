import type { Metadata } from 'next'
import { DirhamsJourneyContent } from './DirhamsJourneyContent'

const SLUG = 'dirhams-journey'
const BASE_URL = 'https://www.slowmorocco.com'

const title = "The Dirham's Journey — 20 Years of MAD/EUR and MAD/USD"
const description =
  "20 years of Moroccan dirham exchange rates against the euro and US dollar — annotated with the events that caused every move. From the 2008 financial crisis through COVID to the 2030 World Cup boom."

export const metadata: Metadata = {
  title,
  description,
  openGraph: {
    title,
    description,
    url: `${BASE_URL}/stories/${SLUG}`,
    siteName: 'Slow Morocco',
    type: 'article',
  },
  twitter: {
    card: 'summary_large_image',
    title,
    description,
  },
  alternates: {
    canonical: `${BASE_URL}/stories/${SLUG}`,
  },
}

export default function DirhamsJourneyPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: title,
    description,
    url: `${BASE_URL}/stories/${SLUG}`,
    publisher: {
      '@type': 'Organization',
      name: 'Slow Morocco',
      url: BASE_URL,
    },
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <DirhamsJourneyContent />
    </>
  )
}
