import type { Metadata } from 'next'
import { WatersOfEmpireContent } from './WatersOfEmpireContent'

const SLUG = 'waters-of-empire'
const BASE_URL = 'https://www.slowmorocco.com'

const title = 'Waters of Empire — How Rome Exported Bathing Culture and Islam Kept It Alive'
const description =
  'Rome invented communal bathing. Islam perfected it. The hammam is not Arab — it is Roman, inherited, transformed, and kept alive while Europe forgot how to wash.'

export const metadata: Metadata = {
  title,
  description,
  openGraph: {
    title,
    description,
    url: `${BASE_URL}/stories/${SLUG}`,
    siteName: 'Slow Morocco',
    locale: 'en_US',
    type: 'article',
  },
  twitter: {
    card: 'summary_large_image',
    title,
    description,
  },
  alternates: {
    canonical: `${BASE_URL}/stories/${SLUG}`,
  },
}

export default function WatersOfEmpirePage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: title,
    description,
    url: `${BASE_URL}/stories/${SLUG}`,
    publisher: {
      '@type': 'Organization',
      name: 'Slow Morocco',
      url: BASE_URL,
    },
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <WatersOfEmpireContent />
    </>
  )
}
