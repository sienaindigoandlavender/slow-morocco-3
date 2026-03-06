import type { Metadata } from 'next'
import { MoroccoPopulationContent } from './MoroccoPopulationContent'

const SLUG = 'morocco-population'
const BASE_URL = 'https://www.slowmorocco.com'

const title = 'Morocco Population — 36.8 Million by Region | Census 2024'
const description =
  'Interactive visualization of Morocco\'s 2024 census data: 36.8 million people across 12 regions. Explore population density, growth rates, and regional distribution with treemaps, bubble charts, and waffle grids.'

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

export default function MoroccoPopulationPage() {
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
      <MoroccoPopulationContent />
    </>
  )
}
