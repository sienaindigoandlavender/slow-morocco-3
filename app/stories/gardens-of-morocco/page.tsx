import type { Metadata } from 'next'
import { GardensOfMoroccoContent } from './GardensOfMoroccoContent'

const SLUG = 'gardens-of-morocco'
const BASE_URL = 'https://www.slowmorocco.com'

const title = 'Gardens of Morocco — Slow Morocco'
const description =
  'Four gardens. The chahar bagh principle. Khettara engineering. A thousand years of water, geometry, and paradise made visible.'

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

export default function GardensOfMoroccoPage() {
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
      <GardensOfMoroccoContent />
    </>
  )
}
