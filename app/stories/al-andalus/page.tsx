import type { Metadata } from 'next'
import { AlAndalusContent } from './AlAndalusContent'

const SLUG = 'al-andalus'
const BASE_URL = 'https://www.slowmorocco.com'

export const metadata: Metadata = {
  title: 'The Al-Andalus Corridor — Slow Morocco',
  description:
    'One continuous cultural bridge from Seville to Fes. Architecture, music, food, language — four layers of shared DNA mapped across 28 cultural points spanning Spain, Portugal, and Morocco.',
  openGraph: {
    title: 'The Al-Andalus Corridor — Slow Morocco',
    description:
      'Architecture, music, food, language — four layers of shared DNA mapped across 28 cultural points spanning Spain, Portugal, and Morocco.',
    url: `${BASE_URL}/stories/${SLUG}`,
    siteName: 'Slow Morocco',
    type: 'article',
  },
  twitter: { card: 'summary_large_image' },
  alternates: { canonical: `${BASE_URL}/stories/${SLUG}` },
}

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Article',
            headline: 'The Al-Andalus Corridor',
            description: metadata.description,
            url: `${BASE_URL}/stories/${SLUG}`,
            publisher: { '@type': 'Organization', name: 'Slow Morocco' },
          }),
        }}
      />
      <AlAndalusContent />
    </>
  )
}
