import type { Metadata } from 'next'
import { JewishHeritageContent } from './JewishHeritageContent'

const SLUG = 'jewish-heritage'
const BASE_URL = 'https://www.slowmorocco.com'

export const metadata: Metadata = {
  title: 'Jewish Heritage in Morocco — Slow Morocco',
  description: 'Mellahs, synagogues, cemeteries. From 265,000 Jews in 1948 to approximately 1,000 today — two thousand years of presence compressed into three decades of departure.',
  openGraph: {
    title: 'Jewish Heritage in Morocco — Slow Morocco',
    description: 'From 265,000 Jews in 1948 to approximately 1,000 today — two thousand years of presence compressed into three decades of departure.',
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
            headline: 'Jewish Heritage in Morocco',
            description: metadata.description,
            url: `${BASE_URL}/stories/${SLUG}`,
            publisher: { '@type': 'Organization', name: 'Slow Morocco' },
          }),
        }}
      />
      <JewishHeritageContent />
    </>
  )
}
