import type { Metadata } from 'next'
import { TanneriesContent } from './TanneriesContent'

const SLUG = 'tanneries'
const BASE_URL = 'https://www.slowmorocco.com'

const title = 'The Tanneries — Nine Centuries of Craft & Industrial Heritage'
const description =
  'Fez. Chouara. 1,200 stone basins. Pigeon dung, quicklime, poppy, indigo. No machinery. No shortcuts. The same hands, the same method, for nine hundred years.'

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

export default function TanneriesPage() {
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
      <TanneriesContent />
    </>
  )
}
