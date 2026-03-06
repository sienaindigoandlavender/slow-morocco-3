import type { Metadata } from 'next'
import { WeddingAtlasContent } from './WeddingAtlasContent'

const SLUG = 'wedding-atlas'
const BASE_URL = 'https://www.slowmorocco.com'

const title = 'The Moroccan Wedding — A Multi-Day Atlas'
const description =
  'Three to seven days. Seven outfit changes. Hundreds of guests. From the hammam purification to the henna night, the amariya entrance to the mechoui feast — mapped ceremony by ceremony, region by region.'

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

export default function WeddingAtlasPage() {
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
      <WeddingAtlasContent />
    </>
  )
}
