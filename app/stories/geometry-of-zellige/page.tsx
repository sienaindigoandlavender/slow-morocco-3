import type { Metadata } from 'next'
import { GeometryOfZelligeContent } from './GeometryOfZelligeContent'

const SLUG = 'geometry-of-zellige'
const BASE_URL = 'https://www.slowmorocco.com'

const title = 'The Geometry of Zellige — Slow Morocco'
const description =
  'Every zellige panel is a solved equation. Explore the 17 wallpaper groups, five star families, compass-and-straightedge construction, and the mathematics of Moroccan tilework.'

export const metadata: Metadata = {
  title,
  description,
  openGraph: {
    title,
    description,
    url: `${BASE_URL}/stories/${SLUG}`,
    siteName: 'Slow Morocco',
    type: 'article',
    locale: 'en_US',
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

export default function GeometryOfZelligePage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'The Geometry of Zellige',
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
      <GeometryOfZelligeContent />
    </>
  )
}
