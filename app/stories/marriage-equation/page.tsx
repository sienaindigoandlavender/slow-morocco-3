import type { Metadata } from 'next'
import { MarriageEquationContent } from './MarriageEquationContent'

const SLUG = 'marriage-equation'
const BASE_URL = 'https://www.slowmorocco.com'

const title = 'The Marriage Equation — Morocco\'s Evolving Union'
const description =
  'Fewer marriages, later marriages, more divorces. How Morocco is renegotiating its oldest contract — from the 2004 Moudawana reform to the rise of women-led households.'

export const metadata: Metadata = {
  title,
  description,
  openGraph: {
    title,
    description,
    url: `${BASE_URL}/stories/${SLUG}`,
    siteName: 'Slow Morocco',
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

export default function MarriageEquationPage() {
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
      <MarriageEquationContent />
    </>
  )
}
