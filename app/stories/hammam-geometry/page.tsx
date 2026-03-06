import type { Metadata } from 'next'
import { HammamGeometryContent } from './HammamGeometryContent'

const SLUG = 'hammam-geometry'
const BASE_URL = 'https://www.slowmorocco.com'

const title = 'The Hammam Geometry — Architecture as Data'
const description =
  'Architecture as thermal machine — the geometry of water, fire, and stone. Three rooms on a single axis: cool, warm, hot. A 2,000-year-old blueprint still in daily use across Morocco.'

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

export default function HammamGeometryPage() {
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
      <HammamGeometryContent />
    </>
  )
}
