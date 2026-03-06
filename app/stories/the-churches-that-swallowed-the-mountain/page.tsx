import type { Metadata } from 'next'
import { TheChurchesThatSwallowedTheMountainContent } from './TheChurchesThatSwallowedTheMountainContent'

const SLUG = 'the-churches-that-swallowed-the-mountain'
const BASE_URL = 'https://www.slowmorocco.com'

export const metadata: Metadata = {
  title: 'The Churches That Swallowed the Mountain — Slow Morocco',
  description:
    'Lalibela, the Zagwe Dynasty, and the architecture that survived its own erasure. Eleven churches carved from living rock — 800 years standing.',
  openGraph: {
    title: 'The Churches That Swallowed the Mountain — Slow Morocco',
    description:
      'Lalibela, the Zagwe Dynasty, and the architecture that survived its own erasure. Eleven churches carved from living rock — 800 years standing.',
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
            headline: 'The Churches That Swallowed the Mountain',
            description: metadata.description,
            url: `${BASE_URL}/stories/${SLUG}`,
            publisher: { '@type': 'Organization', name: 'Slow Morocco' },
          }),
        }}
      />
      <TheChurchesThatSwallowedTheMountainContent />
    </>
  )
}
