import type { Metadata } from 'next'
import { SevenSaintsContent } from './SevenSaintsContent'

const SLUG = 'seven-saints'
const BASE_URL = 'https://www.slowmorocco.com'

export const metadata: Metadata = {
  title: 'Sab\'atou Rijāl — The Seven Saints of Marrakech — Slow Morocco',
  description:
    'The seven awliya of Marrakech mapped across a counterclockwise pilgrimage circuit through the medina. Seven tombs, seven days, four centuries of Sufi devotion from 1149 to 1528.',
  openGraph: {
    title: 'Sab\'atou Rijāl — The Seven Saints of Marrakech — Slow Morocco',
    description:
      'The seven awliya of Marrakech mapped across a counterclockwise pilgrimage circuit through the medina. Seven tombs, seven days, four centuries of Sufi devotion.',
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
            headline: 'Sab\'atou Rijāl — The Seven Saints of Marrakech',
            description: metadata.description,
            url: `${BASE_URL}/stories/${SLUG}`,
            publisher: { '@type': 'Organization', name: 'Slow Morocco' },
          }),
        }}
      />
      <SevenSaintsContent />
    </>
  )
}
