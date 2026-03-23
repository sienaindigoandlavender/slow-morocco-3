import { Metadata } from "next";
import { getJourneyBySlug, getRoutesByIds } from "@/lib/supabase";
import SaharaLandingContent from "./SaharaLandingContent";

export const revalidate = 3600;

const JOURNEY_SLUG = "3-Day-Sahara-Circle";

export async function generateMetadata(): Promise<Metadata> {
  const journey = await getJourneyBySlug(JOURNEY_SLUG);
  const title = journey?.title
    ? `${journey.title} | Slow Morocco`
    : "Sahara Tour from Marrakech | Slow Morocco";
  const description =
    journey?.short_description ||
    journey?.arc_description ||
    "A 3-day desert circuit from Marrakech through the Atlas and into the Sahara.";

  return {
    title,
    description,
    alternates: { canonical: "https://www.slowmorocco.com/sahara-tour-from-marrakech" },
    openGraph: {
      title: journey?.title || "Sahara Tour from Marrakech",
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

export interface ItineraryDay {
  dayNumber: number;
  dayTitle: string;
  fromCity: string;
  toCity: string;
  description: string;
  travelTimeHours: number | null;
  activities: string;
}

async function getItinerary(): Promise<ItineraryDay[]> {
  const journey = await getJourneyBySlug(JOURNEY_SLUG);
  if (!journey) return [];

  const routeSequence = journey.route_sequence || "";
  const routeIds = routeSequence
    .split(",")
    .map((id: string) => id.trim())
    .filter((id: string) => id.length > 0);

  if (routeIds.length === 0) return [];

  const routes = await getRoutesByIds(routeIds);

  return routeIds.map((routeId: string, index: number) => {
    const route = routes.find((r) => r.id === routeId);
    if (!route) {
      return {
        dayNumber: index + 1,
        dayTitle: "",
        fromCity: "",
        toCity: "",
        description: "",
        travelTimeHours: null,
        activities: "",
      };
    }
    return {
      dayNumber: index + 1,
      dayTitle: route.day_title || "",
      fromCity: route.from_city || "",
      toCity: route.to_city || "",
      description: route.route_narrative || "",
      travelTimeHours: route.travel_time_hours,
      activities: route.activities || "",
    };
  });
}

export default async function SaharaTourPage() {
  const itinerary = await getItinerary();

  return <SaharaLandingContent itinerary={itinerary} />;
}
