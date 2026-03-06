import type { Metadata } from 'next'
import { TheShipOfTheDesertContent } from './TheShipOfTheDesertContent'

const SLUG = 'the-ship-of-the-desert'
const BASE_URL = 'https://www.slowmorocco.com'

export const metadata: Metadata = {
  title: 'The Ship of the Desert — Slow Morocco',
  description:
    'Three species. Two trade routes. One animal that built civilisation across the most hostile terrain on earth. 46 million years of camel evolution, from North America to the Sahara.',
  openGraph: {
    title: 'The Ship of the Desert — Slow Morocco',
    description:
      'Three species. Two trade routes. One animal that built civilisation across the most hostile terrain on earth.',
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
            headline: 'The Ship of the Desert',
            description: metadata.description,
            url: `${BASE_URL}/stories/${SLUG}`,
            publisher: { '@type': 'Organization', name: 'Slow Morocco' },
          }),
        }}
      />
      <TheShipOfTheDesertContent />
    </>
  )
}
