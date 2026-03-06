import type { Metadata } from 'next'
import { DigitalZelligeContent } from './DigitalZelligeContent'

const SLUG = 'digital-zellige'
const BASE_URL = 'https://www.slowmorocco.com'

const title = 'Digital Zellige — Morocco Handicraft Export Data 2025'
const description =
  'MAD 1.23 billion in handicraft exports visualised as 120 zellige tiles. ' +
  'Product categories, destination countries, and yearly trends from 2019 to 2025.'
const url = `${BASE_URL}/stories/${SLUG}`
const ogImage = `${BASE_URL}/og/${SLUG}.png`

export const metadata: Metadata = {
  title,
  description,
  openGraph: {
    title,
    description,
    url,
    siteName: 'Slow Morocco',
    type: 'article',
    images: [{ url: ogImage, width: 1200, height: 630, alt: title }],
  },
  twitter: {
    card: 'summary_large_image',
    title,
    description,
    images: [ogImage],
  },
  alternates: { canonical: url },
}

export default function DigitalZelligePage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: title,
    description,
    url,
    image: ogImage,
    publisher: {
      '@type': 'Organization',
      name: 'Slow Morocco',
      url: BASE_URL,
    },
    mainEntityOfPage: { '@type': 'WebPage', '@id': url },
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <DigitalZelligeContent />
    </>
  )
}
