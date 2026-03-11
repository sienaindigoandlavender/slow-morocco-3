import { Metadata } from "next";
import Link from "next/link";
import { getDestinations, convertDriveUrl } from "@/lib/supabase";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Destinations — Slow Morocco",
  description:
    "Every city, valley, mountain, and coast we cover. The definitive guide to Morocco, destination by destination.",
  alternates: {
    canonical: "https://www.slowmorocco.com/destinations",
  },
};

export default async function DestinationsPage() {
  const destinations = await getDestinations({ published: true });

  // Group by region
  const grouped: Record<string, typeof destinations> = {};
  const noRegion: typeof destinations = [];

  destinations.forEach((d) => {
    if (d.region) {
      if (!grouped[d.region]) grouped[d.region] = [];
      grouped[d.region].push(d);
    } else {
      noRegion.push(d);
    }
  });

  // Sort regions alphabetically, put ungrouped at end
  const regionOrder = Object.keys(grouped).sort();

  const allGroups = [
    ...regionOrder.map((r) => ({ label: r, items: grouped[r] })),
    ...(noRegion.length > 0
      ? [{ label: "Other Destinations", items: noRegion }]
      : []),
  ];

  return (
    <main className="min-h-screen bg-background">
      {/* Hero */}
      <section className="pt-32 pb-16 md:pt-40 md:pb-20 px-6 md:px-10 lg:px-14">
        <div className="max-w-4xl">
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-foreground leading-[1.15] mb-6">
            Destinations
          </h1>
          <p className="text-base md:text-lg text-foreground/70 max-w-2xl leading-relaxed">
            Every city, valley, mountain, and coast we cover. Each page
            connects to the stories, places, and journeys that explain what
            makes it worth understanding — not just visiting.
          </p>
        </div>
      </section>

      {/* Destination grid */}
      <section className="px-6 md:px-10 lg:px-14 pb-24">
        {allGroups.map((group) => (
          <div key={group.label} className="mb-16 last:mb-0">
            <h2 className="text-xs tracking-[0.2em] uppercase text-foreground/40 mb-6">
              {group.label}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-6">
              {group.items.map((d) => (
                <Link
                  key={d.slug}
                  href={`/${d.slug}`}
                  className="group block"
                >
                  {d.hero_image && (
                    <div className="aspect-[16/10] overflow-hidden mb-3">
                      <img
                        src={convertDriveUrl(d.hero_image)}
                        alt={d.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                        loading="lazy"
                      />
                    </div>
                  )}
                  <h3 className="font-serif text-xl md:text-2xl text-foreground group-hover:text-foreground/60 transition-colors">
                    {d.title}
                  </h3>
                  {d.subtitle && (
                    <p className="text-sm text-foreground/50 mt-1">
                      {d.subtitle}
                    </p>
                  )}
                </Link>
              ))}
            </div>
          </div>
        ))}
      </section>
    </main>
  );
}
