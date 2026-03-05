import { Metadata } from "next";
import BirdAtlasDossier from "./BirdAtlasDossier";

export const metadata: Metadata = {
  title: "The Bird Atlas | Slow Morocco",
  description:
    "Morocco sits on the narrowest crossing between Europe and Africa. 500+ species, live migration sightings, the Atlantic flyway, and the sites where it all happens.",
  openGraph: {
    title: "The Bird Atlas — Slow Morocco",
    description:
      "500+ species. The Atlantic flyway. Live sightings from eBird. Where to be and when.",
    url: "https://www.slowmorocco.com/dossiers/bird-atlas",
  },
  alternates: {
    canonical: "https://www.slowmorocco.com/dossiers/bird-atlas",
  },
};

export default function BirdAtlasPage() {
  return <BirdAtlasDossier />;
}
