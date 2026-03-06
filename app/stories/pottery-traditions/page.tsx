import type { Metadata } from 'next'
import { PotteryTraditionsContent } from './PotteryTraditionsContent'

const SLUG = 'pottery-traditions'
const BASE_URL = 'https://www.slowmorocco.com'

export const metadata: Metadata = {
  title: 'The Pottery Traditions of Morocco — Slow Morocco',
  description: 'Six regional ceramic traditions mapped. Fes blue, Safi polychrome, Tamegroute green, Rif Berber, Salé contemporary, Meknes zellige — each one a different clay, a different glaze, a different history.',
  openGraph: {
    title: 'The Pottery Traditions of Morocco — Slow Morocco',
    description: 'Six regional ceramic traditions mapped. Fes blue, Safi polychrome, Tamegroute green, Rif Berber, Salé contemporary, Meknes zellige.',
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
            headline: 'The Pottery Traditions of Morocco',
            description: metadata.description,
            url: `${BASE_URL}/stories/${SLUG}`,
            publisher: { '@type': 'Organization', name: 'Slow Morocco' },
          }),
        }}
      />
      <PotteryTraditionsContent />
    </>
  )
}
