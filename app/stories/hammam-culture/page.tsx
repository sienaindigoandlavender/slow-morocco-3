import type { Metadata } from 'next'
import { HammamCultureContent } from './HammamCultureContent'

const SLUG = 'hammam-culture'
const BASE_URL = 'https://www.slowmorocco.com'

const title = 'Hammam Culture — The Social Architecture of the Bathhouse'
const description =
  'Three rooms of ascending heat. Six ritual steps. One of five elements that define every neighbourhood in the medina. The hammam is not a spa — it is social infrastructure.'

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

export default function HammamCulturePage() {
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
      <HammamCultureContent />
    </>
  )
}
