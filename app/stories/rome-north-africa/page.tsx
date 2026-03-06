import type { Metadata } from 'next'
import { RomeNorthAfricaContent } from './RomeNorthAfricaContent'

const SLUG = 'rome-north-africa'
const BASE_URL = 'https://www.slowmorocco.com'

const title = 'Rome in North Africa — Slow Morocco'
const description =
  'Five provinces, eight centuries, the empire\'s breadbasket. Roman North Africa from Morocco to Libya — provinces, cities, timeline, key figures, and UNESCO World Heritage Sites mapped and explained.'

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

export default function RomeNorthAfricaPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'Rome in North Africa',
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
      <RomeNorthAfricaContent />
    </>
  )
}
