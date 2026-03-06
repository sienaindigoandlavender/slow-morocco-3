import type { Metadata } from 'next'
import { HarvestCalendarContent } from './HarvestCalendarContent'

const SLUG = 'harvest-calendar'
const BASE_URL = 'https://www.slowmorocco.com'

const title = 'The Harvest Calendar — Slow Morocco'
const description =
  'A living clock of Moroccan agriculture. Thirty-two crops rotating through twelve months — what\'s glowing is what\'s growing right now.'

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

export default function HarvestCalendarPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'The Harvest Calendar',
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
      <HarvestCalendarContent />
    </>
  )
}
