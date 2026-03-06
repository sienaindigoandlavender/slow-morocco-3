import type { Metadata } from 'next'
import { CouscousFridayContent } from './CouscousFridayContent'

const SLUG = 'couscous-friday'
const BASE_URL = 'https://www.slowmorocco.com'

export const metadata: Metadata = {
  title: 'Couscous Friday — Slow Morocco',
  description: 'The sacred Friday meal: seven regional variations, a three-steam technique, and the social contract that holds Morocco together over a shared plate.',
  openGraph: {
    title: 'Couscous Friday — Slow Morocco',
    description: 'The sacred Friday meal: seven regional variations, a three-steam technique, and the social contract.',
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
            headline: 'Couscous Friday',
            description: metadata.description,
            url: `${BASE_URL}/stories/${SLUG}`,
            publisher: { '@type': 'Organization', name: 'Slow Morocco' },
          }),
        }}
      />
      <CouscousFridayContent />
    </>
  )
}
