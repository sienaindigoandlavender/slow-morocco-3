import type { Metadata } from 'next'
import { JewishAtlasContent } from './JewishAtlasContent'

const SLUG = 'jewish-atlas'
const BASE_URL = 'https://www.slowmorocco.com'

export const metadata: Metadata = {
  title: 'The Jewish Atlas of Morocco — Slow Morocco',
  description: 'Toshavim and Megorashim: two Jewish communities, one country, 2,500 years. An interactive map and timeline of Morocco\'s Jewish heritage, from ancient origins to the present day.',
  openGraph: {
    title: 'The Jewish Atlas of Morocco — Slow Morocco',
    description: 'Two Jewish communities shared Morocco for centuries — the indigenous Toshavim and the Sephardic Megorashim. An interactive atlas of 2,500 years of heritage.',
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
            headline: 'The Jewish Atlas of Morocco',
            description: metadata.description,
            url: `${BASE_URL}/stories/${SLUG}`,
            publisher: { '@type': 'Organization', name: 'Slow Morocco' },
          }),
        }}
      />
      <JewishAtlasContent />
    </>
  )
}
