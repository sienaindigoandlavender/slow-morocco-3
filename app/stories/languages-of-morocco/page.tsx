import type { Metadata } from 'next'
import { LanguagesOfMoroccoContent } from './LanguagesOfMoroccoContent'

const SLUG = 'languages-of-morocco'
const BASE_URL = 'https://www.slowmorocco.com'

export const metadata: Metadata = {
  title: 'The Languages of Morocco — Slow Morocco',
  description:
    'Five mother tongues, four scripts, three colonial languages, one country. A linguistic cartography of Morocco — from Darija and Amazigh to French, Arabic, and English.',
  openGraph: {
    title: 'The Languages of Morocco — Slow Morocco',
    description:
      'Five mother tongues, four scripts, three colonial languages, one country. A linguistic cartography of Morocco.',
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
            headline: 'The Languages of Morocco',
            description: metadata.description,
            url: `${BASE_URL}/stories/${SLUG}`,
            publisher: { '@type': 'Organization', name: 'Slow Morocco' },
          }),
        }}
      />
      <LanguagesOfMoroccoContent />
    </>
  )
}
