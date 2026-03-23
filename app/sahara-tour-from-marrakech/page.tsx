import { notFound } from "next/navigation";
import { Metadata } from "next";
import Script from "next/script";
import { getJourneyBySlug, getRoutesByIds, getJourneys, getStories, getAllPlaceFirstImages } from "@/lib/supabase";
import { findRelatedStories } from "@/lib/content-matcher";
import JourneyDetailContent from "../journeys/[slug]/JourneyDetailContent";

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

interface Journey {
  slug: string;
  title: string;
  duration: string;
  durationDays: number;
  description: string;
  arcDescription: string;
  heroImage: string;
  startCity: string;
  focus: string;
  destinations: string;
  journeyId: string;
  journeyType?: string;
  epicPrice?: number;
  price?: number;
}

interface ItineraryDay {
  dayNumber: number;
  cityName: string;
  fromCity: string;
  toCity: string;
  description: string;
  imageUrl: string;
  travelTime: string;
  difficulty: string;
  activities: string;
  meals: string;
  routeType: string;
}

async function getJourneyData() {
  const journeyData = await getJourneyBySlug(JOURNEY_SLUG);
  if (!journeyData) return null;

  const journey: Journey = {
    slug: journeyData.slug || "",
    title: journeyData.title || "",
    duration: journeyData.duration_days ? `${journeyData.duration_days}-Day` : "",
    durationDays: journeyData.duration_days || 0,
    description: journeyData.short_description || "",
    arcDescription: journeyData.arc_description || "",
    heroImage: journeyData.hero_image_url || "",
    price: journeyData.price_eur || 0,
    startCity: journeyData.start_city || "",
    focus: journeyData.focus_type || "",
    destinations: journeyData.destinations || "",
    journeyId: journeyData.id || "",
    journeyType: journeyData.journey_type || "regular",
    epicPrice: journeyData.epic_price_eur || undefined,
  };

  const routeSequence = journeyData.route_sequence || "";
  const routeIds = routeSequence
    .split(",")
    .map((id: string) => id.trim())
    .filter((id: string) => id.length > 0);

  const [routes, placeImages] = await Promise.all([
    getRoutesByIds(routeIds),
    getAllPlaceFirstImages(),
  ]);

  function isValidImageUrl(url: string | null | undefined): string {
    if (!url) return "";
    if (url.includes("soqcqlzerhgacdaggtch")) return "";
    return url;
  }

  function findPlaceImage(cityName: string): string {
    if (!cityName) return "";
    const slug = cityName.toLowerCase().replace(/\s+/g, "-");
    return placeImages[slug] || placeImages[cityName] || "";
  }

  const itinerary: ItineraryDay[] = routeIds.map(
    (routeId: string, index: number) => {
      const route = routes.find((r) => r.id === routeId);
      if (!route) {
        return {
          dayNumber: index + 1, cityName: "", fromCity: "", toCity: "",
          description: "", imageUrl: "", travelTime: "", difficulty: "",
          activities: "", meals: "", routeType: "",
        };
      }
      const imageUrl = isValidImageUrl(route.image_url)
        || isValidImageUrl(route.hero_image_url)
        || findPlaceImage(route.to_city || "")
        || findPlaceImage(route.from_city || "")
        || "";
      return {
        dayNumber: index + 1,
        cityName: route.to_city || "",
        fromCity: route.from_city || "",
        toCity: route.to_city || "",
        description: route.route_narrative || "",
        imageUrl,
        travelTime: String(route.travel_time_hours || ""),
        difficulty: route.difficulty_level || "",
        activities: route.activities || "",
        meals: route.meals || "",
        routeType: route.route_type || "",
      };
    }
  );

  return { journey, itinerary };
}

async function getOtherJourneys() {
  try {
    const allJourneys = await getJourneys({ published: true });
    return allJourneys
      .filter((j) => j.slug !== JOURNEY_SLUG)
      .map((j) => ({
        slug: j.slug || "",
        title: j.title || "",
        duration: j.duration_days ? `${j.duration_days}-Day` : "",
        durationDays: j.duration_days || 0,
        description: j.short_description || "",
        arcDescription: j.arc_description || "",
        heroImage: j.hero_image_url || "",
        price: j.price_eur || 0,
        startCity: j.start_city || "",
        focus: j.focus_type || "",
        destinations: j.destinations || "",
        journeyId: j.id || "",
        journeyType: j.journey_type || "regular",
        epicPrice: j.epic_price_eur || undefined,
      }));
  } catch {
    return [];
  }
}

async function getRelatedStoriesSSR(journey: Journey) {
  try {
    const allStories = await getStories({ published: true });
    const storiesForMatcher = allStories.map((s) => ({
      slug: s.slug || "",
      title: s.title || "",
      region: s.region || "",
      tags: s.tags || "",
      category: s.category || "",
      heroImage: s.hero_image || "",
      excerpt: s.excerpt || "",
    }));

    return findRelatedStories(
      journey.destinations,
      journey.focus,
      storiesForMatcher,
      4
    );
  } catch {
    return [];
  }
}

export default async function SaharaLandingPage() {
  const data = await getJourneyData();

  if (!data) {
    notFound();
  }

  const otherJourneys = await getOtherJourneys();
  const relatedStories = await getRelatedStoriesSSR(data.journey);

  const allJourneys = await getJourneys({ published: true });
  const visibleJourneys = allJourneys.filter((j) => j.show_on_journeys_page !== false && j.journey_type !== "epic");
  const currentIndex = visibleJourneys.findIndex((j) => j.slug === JOURNEY_SLUG);
  const prevJourney = currentIndex > 0 ? { slug: visibleJourneys[currentIndex - 1].slug, title: visibleJourneys[currentIndex - 1].title } : null;
  const nextJourney = currentIndex < visibleJourneys.length - 1 ? { slug: visibleJourneys[currentIndex + 1].slug, title: visibleJourneys[currentIndex + 1].title } : null;

  return (
    <>
      <Script
        id="sahara-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <JourneyDetailContent
        journey={data.journey}
        itinerary={data.itinerary}
        otherJourneys={otherJourneys}
        relatedStories={relatedStories}
        slug={JOURNEY_SLUG}
        prevJourney={prevJourney}
        nextJourney={nextJourney}
      />
    </>
  );
}
