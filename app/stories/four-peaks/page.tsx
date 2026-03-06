import type { Metadata } from 'next'
import { FourPeaksContent } from './FourPeaksContent'

const SLUG = 'four-peaks'
const BASE_URL = 'https://www.slowmorocco.com'

const title = 'Four Peaks — Slow Morocco'
const description =
  "Morocco's mountains in the context of the world. From the drought-sculpted Saghro to the summit of Everest — four peaks, four scales of ambition."
const url = `${BASE_URL}/stories/${SLUG}`

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: url },
  openGraph: {
    title,
    description,
    url,
    siteName: 'Slow Morocco',
    type: 'article',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title,
    description,
  },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'Four Peaks',
  description,
  url,
  publisher: {
    '@type': 'Organization',
    name: 'Slow Morocco',
    url: BASE_URL,
  },
}

export default function FourPeaksPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <FourPeaksContent />
    </>
  )
}
