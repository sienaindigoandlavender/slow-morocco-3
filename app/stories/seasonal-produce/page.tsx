import type { Metadata } from 'next'
import { SeasonalProduceContent } from './SeasonalProduceContent'

const SLUG = 'seasonal-produce'
const BASE_URL = 'https://www.slowmorocco.com'

const title = 'What Grows When — Slow Morocco'
const description =
  'A seasonal calendar of Moroccan fruits and vegetables. Thirty-two crops mapped across twelve months — with the Darija name, the region where it grows, and when it tastes best.'

export const metadata: Metadata = {
  title,
  description,
  openGraph: {
    title,
    description,
    url: `${BASE_URL}/stories/${SLUG}`,
    siteName: 'Slow Morocco',
    locale: 'en_US',
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

export default function SeasonalProducePage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'What Grows When',
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
      <SeasonalProduceContent />
    </>
  )
}
