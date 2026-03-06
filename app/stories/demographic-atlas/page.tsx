import type { Metadata } from 'next'
import { DemographicAtlasContent } from './DemographicAtlasContent'

const SLUG = 'demographic-atlas'
const BASE_URL = 'https://www.slowmorocco.com'

const title = 'The Demographic Atlas — Slow Morocco'
const description =
  '36.8 million people. Two countries in one census. Morocco\'s 2024 RGPH census reveals a nation splitting into two demographic timelines — coastal modernity and interior tradition.'

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

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'The Demographic Atlas',
  description,
  url: `${BASE_URL}/stories/${SLUG}`,
  publisher: {
    '@type': 'Organization',
    name: 'Slow Morocco',
    url: BASE_URL,
  },
  mainEntityOfPage: {
    '@type': 'WebPage',
    '@id': `${BASE_URL}/stories/${SLUG}`,
  },
}

export default function DemographicAtlasPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <DemographicAtlasContent />
    </>
  )
}
