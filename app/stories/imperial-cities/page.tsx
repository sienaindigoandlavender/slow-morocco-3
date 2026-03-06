import type { Metadata } from 'next'
import { ImperialCitiesContent } from './ImperialCitiesContent'

const SLUG = 'imperial-cities'
const BASE_URL = 'https://www.slowmorocco.com'

export const metadata: Metadata = {
  title: 'The Four Imperial Cities — Slow Morocco',
  description: 'Seven dynasties, four capitals, 1,233 years of political architecture — from the Idrisids founding Fez in 789 AD to Rabat becoming the modern seat of power in 1912.',
  openGraph: {
    title: 'The Four Imperial Cities — Slow Morocco',
    description: 'Seven dynasties, four capitals, 1,233 years of political architecture — Fez, Marrakech, Meknès, and Rabat.',
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
            headline: 'The Four Imperial Cities',
            description: metadata.description,
            url: `${BASE_URL}/stories/${SLUG}`,
            publisher: { '@type': 'Organization', name: 'Slow Morocco' },
          }),
        }}
      />
      <ImperialCitiesContent />
    </>
  )
}
