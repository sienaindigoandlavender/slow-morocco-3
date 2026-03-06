import type { Metadata } from 'next'
import { ColourIndexContent } from './ColourIndexContent'

const SLUG = 'colour-index'
const BASE_URL = 'https://www.slowmorocco.com'

export const metadata: Metadata = {
  title: 'The Colour Index — Slow Morocco',
  description: 'Morocco\'s chromatic DNA: 24 colours mapped to their mineral source, craft tradition, and cultural meaning. A Pantone book for a country.',
  openGraph: {
    title: 'The Colour Index — Slow Morocco',
    description: 'Morocco\'s chromatic DNA: 24 colours mapped to their mineral source, craft tradition, and cultural meaning.',
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
            headline: 'The Colour Index',
            description: metadata.description,
            url: `${BASE_URL}/stories/${SLUG}`,
            publisher: { '@type': 'Organization', name: 'Slow Morocco' },
          }),
        }}
      />
      <ColourIndexContent />
    </>
  )
}
