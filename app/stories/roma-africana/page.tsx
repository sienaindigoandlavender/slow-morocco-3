import type { Metadata } from 'next'
import { RomaAfricanaContent } from './RomaAfricanaContent'

const SLUG = 'roma-africana'
const BASE_URL = 'https://www.slowmorocco.com'

const title = 'Roma Africana — Slow Morocco'
const description =
  '844 years of Roman rule across six provinces, from Volubilis in Morocco to Cyrene in Libya. Timeline, interactive map, province data, and major archaeological sites spanning 3,000 kilometres of North African coastline.'

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

export default function RomaAfricanaPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'Roma Africana',
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
      <RomaAfricanaContent />
    </>
  )
}
