import type { Metadata } from 'next'
import { FrenchProtectorateContent } from './FrenchProtectorateContent'

const SLUG = 'french-protectorate'
const BASE_URL = 'https://www.slowmorocco.com'

const title = 'The French Protectorate — 1912–1956 | Slow Morocco'
const description =
  'Forty-four years between the Treaty of Fez and the Joint Declaration. Timeline, key figures, villes nouvelles map, and the data behind French colonial rule in Morocco.'
const url = `${BASE_URL}/stories/${SLUG}`
const image = `${BASE_URL}/images/stories/${SLUG}/og.jpg`

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: url },
  openGraph: {
    title,
    description,
    url,
    siteName: 'Slow Morocco',
    images: [{ url: image, width: 1200, height: 630, alt: title }],
    type: 'article',
  },
  twitter: {
    card: 'summary_large_image',
    title,
    description,
    images: [image],
  },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'The French Protectorate — 1912–1956',
  description,
  url,
  image,
  publisher: {
    '@type': 'Organization',
    name: 'Slow Morocco',
    url: BASE_URL,
  },
}

export default function FrenchProtectoratePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <FrenchProtectorateContent />
    </>
  )
}
