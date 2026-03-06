import type { Metadata } from 'next'
import { OttomanNorthAfricaContent } from './OttomanNorthAfricaContent'

const SLUG = 'ottoman-north-africa'
const BASE_URL = 'https://www.slowmorocco.com'

const title = 'The Ottoman Empire in North Africa — Slow Morocco'
const description =
  'Four regencies, one exception, and the corsairs who ran it all. From the Barbarossa brothers capturing Algiers in 1516 to Italy seizing Libya in 1911 — the Ottoman Empire\'s three-century hold on North Africa, and why Morocco alone stayed free. Interactive map, timeline, and reading notes.'

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

export default function OttomanNorthAfricaPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'The Ottoman Empire in North Africa',
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
      <OttomanNorthAfricaContent />
    </>
  )
}
