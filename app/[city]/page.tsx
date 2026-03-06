import { notFound } from "next/navigation";
import { Metadata } from "next";
import {
  getDestinationBySlug,
  getPlaces,
  getStories,
  getJourneys,
  convertDriveUrl,
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
  if (!destination) {
    const fallbackTitle = CITY_TITLES[params.city] || params.city;
    return {
      title: `${fallbackTitle} — Slow Morocco`,
      description: `Explore ${fallbackTitle}: stories, places, and private journeys.`,
      alternates: { canonical: `https://www.slowmorocco.com/${params.city}` },
    };
  }

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
        ? [{ url: convertDriveUrl(destination.hero_image) }]
        : [],
    },
    alternates: {
      canonical: `${BASE_URL}/${params.city}`,
    },
  };
}

// Fallback titles for cities without a destinations row
const CITY_TITLES: Record<string, string> = {
  marrakech: "Marrakech", fes: "Fes", tangier: "Tangier", rabat: "Rabat",
  essaouira: "Essaouira", casablanca: "Casablanca", meknes: "Meknes",
  ouarzazate: "Ouarzazate", agadir: "Agadir", dakhla: "Dakhla", chefchaouen: "Chefchaouen",
};

async function fetchCityData(citySlug: string) {
  const [destination, allJourneys, places, stories] = await Promise.all([
    getDestinationBySlug(citySlug),
    getJourneys({ published: true }),
    getPlaces({ published: true, destination: citySlug }),
    getStories({ published: true }),
  ]);

  // Build a destination object even if no DB row exists
  const dest = destination || {
    slug: citySlug,
    title: CITY_TITLES[citySlug] || citySlug.charAt(0).toUpperCase() + citySlug.slice(1),
    subtitle: null,
    region: null,
    hero_image: null,
    hero_caption: null,
    excerpt: null,
    body: null,
    published: true,
    featured: false,
    sort_order: null,
    created_at: "",
    updated_at: "",
  };

  const CITY_SLUGS_ALL = [
    "marrakech", "fes", "tangier", "rabat", "essaouira",
    "casablanca", "meknes", "ouarzazate", "agadir", "dakhla", "chefchaouen",
  ];

  // Featured journeys — city is start point or first/only destination
  const featuredJourneys = allJourneys.filter((j) => {
    const dests = (j.destinations || "").toLowerCase();
    const start = (j.start_city || "").toLowerCase();
    const slug = citySlug.toLowerCase();
    const destList = dests.split(",").map((d: string) => d.trim());
    return (
      start === slug ||
      destList[0] === slug ||
      (destList.length === 1 && destList[0] === slug)
    );
  });

  // Connecting journeys — city appears in route but not as start/primary
  // Must connect through at least one other known city
  const featuredSlugs = new Set(featuredJourneys.map((j) => j.slug));
  const connectingJourneys = allJourneys.filter((j) => {
    if (featuredSlugs.has(j.slug)) return false;
    const dests = (j.destinations || "").toLowerCase();
    const slug = citySlug.toLowerCase();
    if (!dests.includes(slug)) return false;
    const otherCities = CITY_SLUGS_ALL.filter((c) => c !== slug);
    return otherCities.some((c) => dests.includes(c));
  });

  // Filter stories by tags or region matching city
  const cityStories = stories.filter((s) => {
    const tags = (s.tags || "").toLowerCase();
    const region = (s.region || "").toLowerCase();
    const slug = citySlug.toLowerCase();
    const title = dest.title.toLowerCase();
    return tags.includes(slug) || tags.includes(title) || region.includes(slug) || region.includes(title);
  });

  return { destination: dest, featuredJourneys, connectingJourneys, places, stories: cityStories };
}

export default async function CityGuidePage({ params }: Props) {
  if (!CITY_SLUGS.includes(params.city)) notFound();

  const data = await fetchCityData(params.city);

  return (
    <CityGuideContent
      destination={data.destination}
      journeys={data.featuredJourneys}
      connectingJourneys={data.connectingJourneys}
      places={data.places}
      stories={data.stories}
      citySlug={params.city}
    />
  );
}
