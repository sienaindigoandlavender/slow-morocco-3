import type { Metadata } from 'next'
import { CinemaMoroccoContent } from './CinemaMoroccoContent'

const SLUG = 'cinema-morocco'
const BASE_URL = 'https://www.slowmorocco.com'

export const metadata: Metadata = {
  title: 'Cinema Morocco — Slow Morocco',
  description: 'Ouarzawood: six decades of blockbusters from Lawrence of Arabia to Gladiator II. Filming locations, Game of Thrones in Morocco, and the 30% rebate.',
  openGraph: {
    title: 'Cinema Morocco — Slow Morocco',
    description: 'Ouarzawood: six decades of blockbusters from Lawrence of Arabia to Gladiator II.',
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
            headline: 'Cinema Morocco',
            description: metadata.description,
            url: `${BASE_URL}/stories/${SLUG}`,
            publisher: { '@type': 'Organization', name: 'Slow Morocco' },
          }),
        }}
      />
      <CinemaMoroccoContent />
    </>
  )
}
