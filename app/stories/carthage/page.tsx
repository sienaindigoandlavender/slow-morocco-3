import type { Metadata } from 'next'
import { CarthageContent } from './CarthageContent'

const SLUG = 'carthage'
const BASE_URL = 'https://www.slowmorocco.com'

const title = 'Carthage Must Be Destroyed — Slow Morocco'
const description =
  'The rise and fall and rise and fall of a city that Rome could not forget. From Dido\'s founding in 814 BCE through the Punic Wars, Roman rebirth, early Christianity, and final destruction in 698 CE. Timeline, maps, and archaeological sites.'

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

export default function CarthagePage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'Carthage Must Be Destroyed',
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
      <CarthageContent />
    </>
  )
}
