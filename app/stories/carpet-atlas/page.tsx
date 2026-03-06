import type { Metadata } from 'next'
import CarpetAtlasContent from './CarpetAtlasContent'
import { RUG_TRADITIONS, SYMBOLS } from './data'

const SLUG = 'carpet-atlas'
const BASE_URL = 'https://www.slowmorocco.com'

const title = 'The Carpet Atlas — Moroccan Rug Traditions & Amazigh Textile Intelligence'
const description =
  'An atlas of 12 Moroccan rug traditions — Beni Ourain, Azilal, Boucherouite, Taznakht and more. Tribal origins, Amazigh symbols, natural dyes, and weaving techniques mapped across Morocco.'

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

export default function CarpetAtlasPage() {
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
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${BASE_URL}/stories/${SLUG}`,
    },
    about: [
      {
        '@type': 'Thing',
        name: 'Moroccan Rug Traditions',
        description: `Covers ${RUG_TRADITIONS.length} weaving traditions across Morocco.`,
      },
      {
        '@type': 'Thing',
        name: 'Amazigh Symbols',
        description: `${SYMBOLS.length} core motifs encoded by Amazigh women for millennia.`,
      },
    ],
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <CarpetAtlasContent />
    </>
  )
}
