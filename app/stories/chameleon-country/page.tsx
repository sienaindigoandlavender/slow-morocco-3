import type { Metadata } from 'next'
import { ChameleonCountryContent } from './ChameleonCountryContent'

const SLUG = 'chameleon-country'
const BASE_URL = 'https://www.slowmorocco.com'

export const metadata: Metadata = {
  title: 'The Chameleon Country — Slow Morocco',
  description: 'Every landscape Morocco has pretended to be. 27 productions mapped with colour palettes, budgets, and the Look-Alike Index.',
  openGraph: {
    title: 'The Chameleon Country — Slow Morocco',
    description: 'Every landscape Morocco has pretended to be. 27 productions mapped with colour palettes, budgets, and the Look-Alike Index.',
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
            headline: 'The Chameleon Country',
            description: metadata.description,
            url: `${BASE_URL}/stories/${SLUG}`,
            publisher: { '@type': 'Organization', name: 'Slow Morocco' },
          }),
        }}
      />
      <ChameleonCountryContent />
    </>
  )
}
