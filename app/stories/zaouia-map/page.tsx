import type { Metadata } from 'next'
import { ZaouiaMapContent } from './ZaouiaMapContent'

const SLUG = 'zaouia-map'
const BASE_URL = 'https://www.slowmorocco.com'

export const metadata: Metadata = {
  title: 'The Zaouia Map — Where Power Meets Faith — Slow Morocco',
  description:
    'Morocco\'s Sufi brotherhoods mapped across sacred geography. Eight orders, twenty-two zaouias, twelve centuries of parallel authority where spiritual power and political legitimacy converge.',
  openGraph: {
    title: 'The Zaouia Map — Where Power Meets Faith — Slow Morocco',
    description:
      'Morocco\'s Sufi brotherhoods mapped across sacred geography. Eight orders, twenty-two zaouias, twelve centuries of parallel authority.',
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
            headline: 'The Zaouia Map — Where Power Meets Faith',
            description: metadata.description,
            url: `${BASE_URL}/stories/${SLUG}`,
            publisher: { '@type': 'Organization', name: 'Slow Morocco' },
          }),
        }}
      />
      <ZaouiaMapContent />
    </>
  )
}
