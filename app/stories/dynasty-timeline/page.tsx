import type { Metadata } from 'next'
import { DynastyTimelineContent } from './DynastyTimelineContent'

const SLUG = 'dynasty-timeline'
const BASE_URL = 'https://www.slowmorocco.com'

const title = 'The Dynasty Timeline — Seven Dynasties, 1,237 Years'
const description =
  'An interactive timeline of Morocco\u2019s seven ruling dynasties from the Idrisids (789) to the Alaouites today. Explore capitals, key rulers, monuments, and the patterns that shaped the oldest continuous state in Africa.'

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

export default function DynastyTimelinePage() {
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
      <DynastyTimelineContent />
    </>
  )
}
