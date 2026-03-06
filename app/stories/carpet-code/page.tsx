import type { Metadata } from 'next'
import CarpetCodeContent from './CarpetCodeContent'

const SLUG = 'carpet-code'
const BASE_URL = 'https://www.slowmorocco.com'

const title = 'The Carpet Code — A Field Guide to Reading a Rug'
const description =
  'A field guide to reading a rug. 30 Amazigh motifs decoded — protection, fertility, identity, nature, daily life, and cosmology woven into geometric patterns for over 3,000 years.'

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

export default function CarpetCodePage() {
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
      <CarpetCodeContent />
    </>
  )
}
