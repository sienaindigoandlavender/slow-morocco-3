import { notFound } from "next/navigation";
import { Metadata } from "next";
import {
  getDestinationBySlug,
  getPlaces,
  getStories,
  getJourneys,
} from "@/lib/supabase";
import CityGuideContent from "./CityGuideContent";

export const revalidate = 3600;

// The 9 city slugs — only these resolve as city guides
const CITY_SLUGS = [
  "marrakech",
  "fes",
  "tangier",
  "rabat",
  "essaouira",
  "casablanca",
  "meknes",
  "ouarzazate",
  "agadir",
  "dakhla",
  "chefchaouen",
];

export async function generateStaticParams() {
  return CITY_SLUGS.map((city) => ({ city }));
}

interface Props {
  params: { city: string };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const destination = await getDestinationBySlug(params.city);
  if (!destination) return {};

  const BASE_URL = "https://www.slowmorocco.com";
  const title = `${destination.title} — Slow Morocco`;
  const description =
    destination.excerpt ||
    `Explore ${destination.title}: stories, places, and private journeys.`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `${BASE_URL}/${params.city}`,
      images: destination.hero_image
        ? [{ url: destination.hero_image }]
        : [],
    },
    alternates: {
      canonical: `${BASE_URL}/${params.city}`,
    },
  };
}

async function fetchCityData(citySlug: string) {
  const [destination, allJourneys, places, stories] = await Promise.all([
    getDestinationBySlug(citySlug),
    getJourneys({ published: true }),
    getPlaces({ published: true, destination: citySlug }),
    getStories({ published: true }),
  ]);

  if (!destination) return null;

  // Filter journeys that include this city
  const journeys = allJourneys.filter((j) => {
    const dests = (j.destinations || "").toLowerCase();
    const start = (j.start_city || "").toLowerCase();
    const slug = citySlug.toLowerCase();
    return dests.includes(slug) || start.includes(slug);
  });

  // Filter stories by tags or region matching city
  const cityStories = stories.filter((s) => {
    const tags = (s.tags || "").toLowerCase();
    const region = (s.region || "").toLowerCase();
    const slug = citySlug.toLowerCase();
    const title = destination.title.toLowerCase();
    return tags.includes(slug) || tags.includes(title) || region.includes(slug) || region.includes(title);
  });

  return { destination, journeys, places, stories: cityStories };
}

export default async function CityGuidePage({ params }: Props) {
  if (!CITY_SLUGS.includes(params.city)) notFound();

  const data = await fetchCityData(params.city);
  if (!data) notFound();

  return (
    <CityGuideContent
      destination={data.destination}
      journeys={data.journeys}
      places={data.places}
      stories={data.stories}
      citySlug={params.city}
    />
  );
}
