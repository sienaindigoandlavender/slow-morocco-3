import type { Metadata } from 'next'
import { GatesOfMarrakechContent } from './GatesOfMarrakechContent'

const SLUG = 'gates-of-marrakech'
const BASE_URL = 'https://www.slowmorocco.com'

const title = 'The 19 Gates of Marrakech — Slow Morocco'
const description =
  'Every bab in the walls of Marrakech. An interactive map and guide to all 19 historic gates — from the Almoravid originals of 1126 to the modern openings — with dynasty timelines, architecture notes, and the stories behind each name.'

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

export default function GatesOfMarrakechPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'The 19 Gates of Marrakech',
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
      <GatesOfMarrakechContent />
    </>
  )
}
