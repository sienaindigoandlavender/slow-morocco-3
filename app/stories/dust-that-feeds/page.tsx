import { Metadata } from 'next'
import { DustThatFeedsContent } from './DustThatFeedsContent'

const SLUG = 'dust-that-feeds'
const BASE_URL = 'https://www.slowmorocco.com'

const title = 'The Dust That Feeds — How the Sahara Keeps the Amazon Alive'
const description =
  '182 million tons of Saharan dust cross the Atlantic every year. 27.7 million tons fall on the Amazon. 22,000 tons of phosphorus replace exactly what the rainforest loses to rain.'

export const metadata: Metadata = {
  title,
  description,
  openGraph: {
    title,
    description,
    url: `${BASE_URL}/stories/${SLUG}`,
    siteName: 'Slow Morocco',
    type: 'article',
    locale: 'en_US',
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

export default function DustThatFeedsPage() {
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
      <DustThatFeedsContent />
    </>
  )
}
