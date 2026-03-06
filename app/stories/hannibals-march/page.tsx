import type { Metadata } from 'next'
import { HannibalsMarchContent } from './HannibalsMarchContent'

const SLUG = 'hannibals-march'
const BASE_URL = 'https://www.slowmorocco.com'

const title = 'Hannibal\u2019s March \u2014 37 Elephants Across the Alps \u00b7 218 BC \u2014 Slow Morocco'
const description =
  'The march from Carthage to Cannae: 37 war elephants, 90,000 troops, 1,600 kilometres overland, and across the Alps in winter. Interactive route map, army attrition chart, elephant tracker, battle breakdowns, and full timeline of the Second Punic War.'

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

export default function HannibalsMarchPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'Hannibal\u2019s March \u2014 37 Elephants Across the Alps',
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
      <HannibalsMarchContent />
    </>
  )
}
