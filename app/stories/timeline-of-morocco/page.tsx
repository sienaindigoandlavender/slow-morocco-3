import type { Metadata } from 'next'
import { TimelineOfMoroccoContent } from './TimelineOfMoroccoContent'

const SLUG = 'timeline-of-morocco'
const BASE_URL = 'https://www.slowmorocco.com'

export const metadata: Metadata = {
  title: 'Timeline of Morocco — Slow Morocco',
  description:
    '315,000 years in one vertical line. From the oldest Homo sapiens at Jebel Irhoud through Phoenician traders, Roman provinces, eight Islamic dynasties, colonial resistance, and modern renaissance.',
  openGraph: {
    title: 'Timeline of Morocco — Slow Morocco',
    description:
      '315,000 years in one vertical line. From the oldest Homo sapiens at Jebel Irhoud through Phoenician traders, Roman provinces, eight Islamic dynasties, colonial resistance, and modern renaissance.',
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
            headline: 'Timeline of Morocco',
            description: metadata.description,
            url: `${BASE_URL}/stories/${SLUG}`,
            publisher: { '@type': 'Organization', name: 'Slow Morocco' },
          }),
        }}
      />
      <TimelineOfMoroccoContent />
    </>
  )
}
