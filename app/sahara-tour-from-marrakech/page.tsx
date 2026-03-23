import { notFound } from "next/navigation";
import { Metadata } from "next";
import Script from "next/script";
import { getJourneyBySlug, getRoutesByIds } from "@/lib/supabase";
import SaharaLandingContent from "./SaharaLandingContent";

export const revalidate = 3600;

const JOURNEY_SLUG = "3-Day-Sahara-Circle";

export async function generateMetadata(): Promise<Metadata> {
  const journey = await getJourneyBySlug(JOURNEY_SLUG);
  const title = journey?.title
    ? `${journey.title} | Slow Morocco`
    : "3-Day Sahara Desert Tour from Marrakech | Slow Morocco";
  const description =
    journey?.short_description ||
    journey?.arc_description ||
    "Private 3-day desert journey from Marrakech through Ouarzazate, the Draa Valley, and into the Erg Chebbi dunes at Merzouga.";

  return {
    title,
    description,
    alternates: { canonical: "https://www.slowmorocco.com/sahara-tour-from-marrakech" },
    openGraph: {
      title: journey?.title || "3-Day Sahara Desert Tour from Marrakech",
      description,
      url: "https://www.slowmorocco.com/sahara-tour-from-marrakech",
      siteName: "Slow Morocco",
      type: "website",
      ...(journey?.hero_image_url
        ? { images: [{ url: journey.hero_image_url, width: 1200, height: 630 }] }
        : {}),
    },
  };
}

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "TouristTrip",
  "name": "3-Day Sahara Desert Tour from Marrakech",
  "description": "Private 3-day desert journey from Marrakech through Ouarzazate, the Draa Valley, and into the Erg Chebbi dunes at Merzouga. Private driver, 2 nights accommodation included.",
  "url": "https://www.slowmorocco.com/sahara-tour-from-marrakech",
  "provider": {
    "@type": "TravelAgency",
    "name": "Slow Morocco",
    "url": "https://www.slowmorocco.com",
  },
  "offers": {
    "@type": "Offer",
    "price": "450",
    "priceCurrency": "EUR",
    "description": "Per person, minimum 2 participants. Private driver and 2 nights accommodation included.",
    "availability": "https://schema.org/InStock",
  },
  "itinerary": {
    "@type": "ItemList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Day 1: Marrakech to Ouarzazate via Tizi n'Tichka and Ait Benhaddou",
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Day 2: Ouarzazate through the Draa Valley to Merzouga",
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": "Day 3: Sunrise at Erg Chebbi dunes, return to Marrakech",
      },
    ],
  },
  "touristType": "Cultural Tourism",
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "5",
    "reviewCount": "4",
    "bestRating": "5",
  },
  "review": [
    {
      "@type": "Review",
      "author": { "@type": "Person", "name": "Angela A." },
      "reviewBody": "A brilliant introduction to Morocco. Well organised and thought out. I couldn't wish for a better introduction.",
      "reviewRating": { "@type": "Rating", "ratingValue": "5" },
    },
    {
      "@type": "Review",
      "author": { "@type": "Person", "name": "Rhonda" },
      "reviewBody": "The desert was memorable. So many things were over and above what you would expect. The details were so thoughtful.",
      "reviewRating": { "@type": "Rating", "ratingValue": "5" },
    },
  ],
  "mainEntityOfPage": {
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "How far is Merzouga from Marrakech?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Merzouga is approximately 550 kilometres from Marrakech — about 9 hours by road. It is not a day trip. Anyone offering the Sahara as a day trip from Marrakech is selling you the Agafay plateau, which is a rocky desert outside the city.",
        },
      },
      {
        "@type": "Question",
        "name": "What is the best time of year for a Sahara desert tour from Marrakech?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "October to April. The desert in summer reaches 45 C — not enjoyable. Spring and autumn offer the best conditions. October coincides with the date harvest in the Draa Valley.",
        },
      },
      {
        "@type": "Question",
        "name": "Is this a private tour or a group tour?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Private. Your own vehicle, your own driver, your own schedule. No shared minibuses, no fixed stops at tourist shops.",
        },
      },
      {
        "@type": "Question",
        "name": "What is included in the 3-day Sahara tour price?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Private driver for three days, two nights accommodation (Ouarzazate and a desert camp at Merzouga), and all transfers. Meals are not included.",
        },
      },
    ],
  },
};

export default async function SaharaLandingPage() {
  const journeyData = await getJourneyBySlug(JOURNEY_SLUG);

  if (!journeyData) {
    notFound();
  }

  // Build itinerary from route_sequence
  const routeSequence = journeyData.route_sequence || "";
  const routeIds = routeSequence
    .split(",")
    .map((id: string) => id.trim())
    .filter((id: string) => id.length > 0);

  const routes = await getRoutesByIds(routeIds);

  const itinerary = routeIds.map((routeId: string, index: number) => {
    const route = routes.find((r) => r.id === routeId);
    return {
      dayNumber: index + 1,
      fromCity: route?.from_city || "",
      toCity: route?.to_city || "",
      description: route?.route_narrative || "",
      travelTime: String(route?.travel_time_hours || ""),
      activities: route?.activities || "",
    };
  });

  return (
    <>
      <Script
        id="sahara-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <SaharaLandingContent
        itinerary={itinerary}
        price={journeyData.price_eur || 450}
        heroImage={journeyData.hero_image_url || ""}
        title={journeyData.title || "Sahara Desert Tour from Marrakech"}
        arcDescription={journeyData.arc_description || ""}
      />
    </>
  );
}
