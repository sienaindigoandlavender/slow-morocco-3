import type { Metadata } from "next";
import SaharaLandingContent from "./SaharaLandingContent";

export const metadata: Metadata = {
  title: "3-Day Sahara Desert Tour from Marrakech | Slow Morocco",
  description: "Private 3-day desert journey from Marrakech through Ouarzazate, the Draa Valley, and into the Erg Chebbi dunes at Merzouga. €450 per person, minimum 2.",
  alternates: { canonical: "https://www.slowmorocco.com/sahara-tour-from-marrakech" },
  openGraph: {
    title: "3-Day Sahara Desert Tour from Marrakech",
    description: "Private 3-day desert journey from Marrakech to the Erg Chebbi dunes. Through Ouarzazate, the Draa Valley oases, and into the Sahara.",
    url: "https://www.slowmorocco.com/sahara-tour-from-marrakech",
    siteName: "Slow Morocco",
  },
};

export default function SaharaLandingPage() {
  return <SaharaLandingContent />;
}
