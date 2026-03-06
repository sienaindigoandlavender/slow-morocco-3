import type { Metadata } from 'next'
import { GeometryOfCultureContent } from './GeometryOfCultureContent'

const SLUG = 'geometry-of-culture'
const BASE_URL = 'https://www.slowmorocco.com'

const title = 'The Geometry of Culture — Slow Morocco'
const description =
  'The mathematics of Moroccan zellige and Islamic geometry. Star families, wallpaper groups, and the compass-and-straightedge traditions that built a visual civilisation.'
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
  headline: 'The Geometry of Culture',
  description,
  url,
  publisher: {
    '@type': 'Organization',
    name: 'Slow Morocco',
    url: BASE_URL,
  },
}

export default function GeometryOfCulturePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <GeometryOfCultureContent />
    </>
  )
}
