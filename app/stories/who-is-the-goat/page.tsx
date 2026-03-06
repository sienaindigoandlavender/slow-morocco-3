import type { Metadata } from 'next'
import { WhoIsTheGoatContent } from './WhoIsTheGoatContent'

const SLUG = 'who-is-the-goat'
const BASE_URL = 'https://www.slowmorocco.com'

export const metadata: Metadata = {
  title: 'Who Is the GOAT? Marco Polo vs Ibn Battuta — Slow Morocco',
  description:
    'Everyone knows Marco Polo. Fewer know the man who travelled nearly five times farther. A data-driven comparison of history\'s two greatest travellers — distance, duration, cultural immersion, and literary impact.',
  openGraph: {
    title: 'Who Is the GOAT? Marco Polo vs Ibn Battuta — Slow Morocco',
    description:
      'A data-driven comparison of history\'s two greatest travellers — distance, duration, cultural immersion, and literary impact.',
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
            headline: 'Who Is the GOAT? Marco Polo vs Ibn Battuta',
            description: metadata.description,
            url: `${BASE_URL}/stories/${SLUG}`,
            publisher: { '@type': 'Organization', name: 'Slow Morocco' },
          }),
        }}
      />
      <WhoIsTheGoatContent />
    </>
  )
}
