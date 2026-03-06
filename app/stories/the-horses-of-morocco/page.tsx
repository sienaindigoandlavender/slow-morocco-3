import type { Metadata } from 'next'
import { TheHorsesOfMoroccoContent } from './TheHorsesOfMoroccoContent'

const SLUG = 'the-horses-of-morocco'
const BASE_URL = 'https://www.slowmorocco.com'

export const metadata: Metadata = {
  title: 'The Horses of Morocco — Slow Morocco',
  description:
    'From Numidian cavalry to the Thoroughbred. 3,500 years of the Barb horse — the most underrated breed in history. Five breeds, global descendants, and the Godolphin story.',
  openGraph: {
    title: 'The Horses of Morocco — Slow Morocco',
    description:
      'From Numidian cavalry to the Thoroughbred. 3,500 years of the Barb horse — the most underrated breed in history.',
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
            headline: 'The Horses of Morocco',
            description: metadata.description,
            url: `${BASE_URL}/stories/${SLUG}`,
            publisher: { '@type': 'Organization', name: 'Slow Morocco' },
          }),
        }}
      />
      <TheHorsesOfMoroccoContent />
    </>
  )
}
