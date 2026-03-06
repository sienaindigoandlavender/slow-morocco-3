import type { Metadata } from 'next'
import { DatePalmOasesContent } from './DatePalmOasesContent'

const SLUG = 'date-palm-oases'
const BASE_URL = 'https://www.slowmorocco.com'

export const metadata: Metadata = {
  title: 'The Date Palm Oases — Slow Morocco',
  description: 'Draa Valley, Ziz Valley, Tafilalet: 4.8 million date palms, 453 cultivars, the three-tier oasis ecology, and the Bayoud disease that destroyed 10 million trees.',
  openGraph: {
    title: 'The Date Palm Oases — Slow Morocco',
    description: 'Draa Valley, Ziz Valley, Tafilalet: 4.8 million date palms, the three-tier oasis ecology.',
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
            headline: 'The Date Palm Oases',
            description: metadata.description,
            url: `${BASE_URL}/stories/${SLUG}`,
            publisher: { '@type': 'Organization', name: 'Slow Morocco' },
          }),
        }}
      />
      <DatePalmOasesContent />
    </>
  )
}
