import type { Metadata } from 'next'
import { CannabisRifContent } from './CannabisRifContent'

const SLUG = 'cannabis-rif'
const BASE_URL = 'https://www.slowmorocco.com'

const title = 'Cannabis & the Rif — Morocco\'s Other Cash Crop'
const description =
  'The Rif Mountains produce most of Europe\'s hashish. Over 400,000 people depend on the trade. In 2021, Morocco became the first major hashish-producing country to legalize — partially.'

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

export default function CannabisRifPage() {
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
      <CannabisRifContent />
    </>
  )
}
