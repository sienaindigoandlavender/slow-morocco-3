import type { Metadata } from 'next'
import CalendarOfLightContent from './CalendarOfLightContent'

const SLUG = 'calendar-of-light'
const BASE_URL = 'https://www.slowmorocco.com'
const URL = `${BASE_URL}/stories/${SLUG}`

const title = 'The Calendar of Light — How Latitude Shapes Morocco\'s Seasons'
const description =
  'An astronomical cartography of daylight across six Moroccan cities. From Tangier at 35.8°N to Agadir at 30.4°N, explore how 5.4 degrees of latitude create a gradient of light that shapes Ramadan fasting hours, agriculture, and World Cup scheduling.'

export const metadata: Metadata = {
  title,
  description,
  openGraph: {
    title,
    description,
    url: URL,
    siteName: 'Slow Morocco',
    type: 'article',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title,
    description,
  },
  alternates: {
    canonical: URL,
  },
}

export default function CalendarOfLightPage() {
  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: title,
    description,
    url: URL,
    publisher: {
      '@type': 'Organization',
      name: 'Slow Morocco',
      url: BASE_URL,
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': URL,
    },
  }

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: BASE_URL,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Stories',
        item: `${BASE_URL}/stories`,
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: 'The Calendar of Light',
        item: URL,
      },
    ],
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <CalendarOfLightContent />
    </>
  )
}
