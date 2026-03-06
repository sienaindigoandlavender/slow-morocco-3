import type { Metadata } from 'next'
import { HighSpeedHorizonContent } from './HighSpeedHorizonContent'

const SLUG = 'high-speed-horizon'
const BASE_URL = 'https://www.slowmorocco.com'

const title = 'The High-Speed Horizon — Slow Morocco'
const description =
  'How Morocco is shrinking: four eras of rail from colonial narrow gauge to Africa\'s longest high-speed network. Interactive isochrone maps, route comparisons, and the Al Boraq HSR timeline.'

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
  headline: 'The High-Speed Horizon',
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

export default function HighSpeedHorizonPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <HighSpeedHorizonContent />
    </>
  )
}
