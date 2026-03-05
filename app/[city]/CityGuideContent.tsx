"use client";

import Image from "next/image";
import Link from "next/link";
import dynamic from "next/dynamic";
import { useState, useEffect } from "react";

const CityMap = dynamic(() => import("@/components/CityMap"), { ssr: false });

// ─── Types ────────────────────────────────────────────────────────────────────

interface Destination {
  slug: string;
  title: string;
  subtitle: string | null;
  region: string | null;
  hero_image: string | null;
  excerpt: string | null;
  body: string | null;
}

interface Journey {
  slug: string;
  title: string;
  hero_image_url: string | null;
  short_description: string | null;
  arc_description: string | null;
  duration_days: number | null;
  price_eur: number | null;
  category: string | null;
  focus_type: string | null;
  destinations: string | null;
  start_city: string | null;
}

interface Place {
  slug: string;
  title: string;
  hero_image: string | null;
  excerpt: string | null;
  category: string | null;
  destination: string | null;
  latitude: number | null;
  longitude: number | null;
}

interface Story {
  slug: string;
  title: string;
  hero_image: string | null;
  excerpt: string | null;
  category: string | null;
  mood?: string | null;
  tags: string | null;
}

interface Props {
  destination: Destination;
  journeys: Journey[];
  connectingJourneys: Journey[];
  places: Place[];
  stories: Story[];
  citySlug: string;
}

// ─── City coordinates + attraction data ───────────────────────────────────────

const CITY_DATA: Record<string, {
  center: [number, number];
  zoom: number;
  bestMonths: string;
  climate: string;
  intro: string;
}> = {
  marrakech: {
    center: [-7.9811, 31.6295],
    zoom: 13.5,
    bestMonths: "Mar–May · Sep–Nov",
    climate: "Hot semi-arid",
    intro: "The ochre walls absorb the sun all day and release it at dusk, turning the medina a colour that has no name in any language except Marrakech. A thousand-year maze that somehow still works.",
  },
  fes: {
    center: [-4.9998, 34.0331],
    zoom: 13.5,
    bestMonths: "Mar–May · Sep–Nov",
    climate: "Semi-arid continental",
    intro: "Nine thousand alleys, the world's largest car-free urban area, and a tannery that has been dyeing leather the same way since the eleventh century. The medieval city that refuses to become a museum.",
  },
  tangier: {
    center: [-5.8128, 35.7595],
    zoom: 13,
    bestMonths: "Apr–Jun · Sep–Oct",
    climate: "Mediterranean",
    intro: "Where the Mediterranean meets the Atlantic and Africa faces Europe across fourteen kilometres of water. The city that invented its own mythology — and the writers who came to find it stayed to write it.",
  },
  rabat: {
    center: [-6.8498, 34.0209],
    zoom: 13,
    bestMonths: "Apr–Jun · Sep–Oct",
    climate: "Mediterranean",
    intro: "The capital that nobody visits on purpose, and leaves reluctantly. Roman ruins, a twelfth-century tower, and a UNESCO medina that breathes at human scale. The city that governs Morocco and quietly keeps its own counsel.",
  },
  essaouira: {
    center: [-9.7595, 31.5085],
    zoom: 13.5,
    bestMonths: "Jun–Sep",
    climate: "Mediterranean coastal",
    intro: "The wind city. Portuguese ramparts on an Atlantic headland, a medina painted blue and white, and a permanent gale that clears the head of everything unnecessary. Artists came for the light. Musicians came for the Gnawa. Everyone stayed longer than planned.",
  },
  casablanca: {
    center: [-7.5898, 33.5731],
    zoom: 13,
    bestMonths: "Mar–May · Sep–Nov",
    climate: "Mediterranean",
    intro: "Morocco's economic engine wearing its Art Deco inheritance like a suit that still fits. The Corniche, the Hassan II mosque rising from the Atlantic, the white villas of the Quartier des Habous — a city most tourists pass through and shouldn't.",
  },
  meknes: {
    center: [-5.5548, 33.8935],
    zoom: 13,
    bestMonths: "Apr–Jun · Sep–Oct",
    climate: "Semi-arid continental",
    intro: "Moulay Ismail's monument to ambition. The sultan who built walls forty kilometres long, stabled twelve thousand horses, and imagined a Moroccan Versailles in the seventeenth century. The city that finished second in every imperial ranking, and carries it with considerable dignity.",
  },
  ouarzazate: {
    center: [-6.9063, 30.9189],
    zoom: 13,
    bestMonths: "Mar–May · Sep–Nov",
    climate: "Hot semi-arid",
    intro: "Gateway to the south. Where the High Atlas drops into the pre-Saharan plateau and the light turns everything amber by four o'clock. Hollywood discovered the kasbahs and the silence. The kasbahs are indifferent to Hollywood.",
  },
  agadir: {
    center: [-9.5981, 30.4278],
    zoom: 13,
    bestMonths: "Oct–Apr",
    climate: "Hot desert coastal",
    intro: "Rebuilt after the 1960 earthquake, Agadir faces the Atlantic with the composed practicality of a city that has already survived the worst. The beach is eleven kilometres long. The argan forest begins where the city ends.",
  },
  dakhla: {
    center: [-15.9329, 23.6848],
    zoom: 12.5,
    bestMonths: "Oct–May",
    climate: "Hot desert",
    intro: "A narrow peninsula in the Western Sahara where the wind arrives from the north and the kite surfers follow. The lagoon is turquoise, the dunes are a twenty-minute drive, and the oysters are pulled from the water still cold. The end of the mapped world, more or less.",
  },
  chefchaouen: {
    center: [-5.2636, 35.1688],
    zoom: 14,
    bestMonths: "Apr–Jun · Sep–Oct",
    climate: "Mediterranean mountain",
    intro: "The blue medina in the Rif mountains. Every surface painted in shades of indigo and cerulean, the reason so unclear that the theories multiply. A town that became famous for a colour and stayed famous for the light that colour catches.",
  },
};

// ─── Weather widget ────────────────────────────────────────────────────────────

function WeatherLine({ bestMonths, climate }: { bestMonths: string; climate: string }) {
  return (
    <div className="flex items-center gap-3 text-[10px] tracking-[0.2em] uppercase font-mono text-foreground/40">
      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <circle cx="12" cy="12" r="4" />
        <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
      </svg>
      <span>{climate}</span>
      <span className="text-foreground/20">·</span>
      <span>Best: {bestMonths}</span>
    </div>
  );
}

// ─── Section header ────────────────────────────────────────────────────────────

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-[10px] tracking-[0.3em] uppercase font-mono text-foreground/30 mb-8">
      {children}
    </p>
  );
}

// ─── Main component ────────────────────────────────────────────────────────────

export default function CityGuideContent({
  destination,
  journeys,
  connectingJourneys,
  places,
  stories,
  citySlug,
}: Props) {
  const cityData = CITY_DATA[citySlug] || {
    center: [-6.0, 32.0] as [number, number],
    zoom: 12,
    bestMonths: "Mar–May · Sep–Nov",
    climate: "Semi-arid",
    intro: destination.excerpt || "",
  };

  // Build attraction markers from places that have coordinates
  const attractions = places
    .filter((p) => p.latitude && p.longitude)
    .map((p) => ({
      title: p.title,
      slug: p.slug,
      coordinates: [p.longitude!, p.latitude!] as [number, number],
      category: p.category || undefined,
    }));

  const showMap = attractions.length > 0 || true; // always show map, city center at minimum

  return (
    <main className="bg-background text-foreground">

      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section className="relative h-[70vh] min-h-[500px] max-h-[800px]">
        {destination.hero_image ? (
          <Image
            src={destination.hero_image}
            alt={destination.title}
            fill
            className="object-cover"
            priority
          />
        ) : (
          <div className="absolute inset-0 bg-foreground/10" />
        )}
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/60" />

        <div className="absolute bottom-0 left-0 right-0 px-8 md:px-16 lg:px-20 pb-14">
          {destination.subtitle && (
            <p className="text-[10px] tracking-[0.35em] uppercase text-white/50 mb-3">
              {destination.subtitle}
            </p>
          )}
          <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl text-white mb-4">
            {destination.title}
          </h1>
          <WeatherLine bestMonths={cityData.bestMonths} climate={cityData.climate} />
        </div>
      </section>

      {/* ── Intro / Body ──────────────────────────────────────────────────── */}
      <section className="px-8 md:px-16 lg:px-20 py-16 md:py-20">
        {destination.body ? (
          // Database body — multi-paragraph
          <div className="max-w-3xl space-y-6">
            {destination.body.split(/\n\n+/).filter(Boolean).map((para, i) => (
              <p
                key={i}
                className={
                  i === 0
                    ? "font-serif text-xl md:text-2xl leading-relaxed text-foreground"
                    : "text-base leading-relaxed text-foreground"
                }
              >
                {para}
              </p>
            ))}
          </div>
        ) : (
          // Fallback to hardcoded one-liner
          <p className="font-serif text-xl md:text-2xl leading-relaxed text-foreground max-w-3xl">
            {cityData.intro}
          </p>
        )}
      </section>

      {/* ── Map + Places ──────────────────────────────────────────────────── */}
      <section className="px-8 md:px-16 lg:px-20 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 border border-border">

          {/* Map */}
          <div className="h-[480px] lg:h-[600px] border-b lg:border-b-0 lg:border-r border-border">
            {showMap && (
              <CityMap
                citySlug={citySlug}
                cityTitle={destination.title}
                center={cityData.center}
                zoom={cityData.zoom}
                attractions={attractions}
              />
            )}
          </div>

          {/* Places list */}
          <div className="p-8 md:p-10 overflow-y-auto max-h-[600px]">
            <SectionLabel>Places</SectionLabel>
            {places.length > 0 ? (
              <div className="space-y-0">
                {places.map((place, i) => (
                  <Link
                    key={place.slug}
                    href={`/places/${place.slug}`}
                    className="group flex items-start gap-5 py-5 border-b border-border last:border-0 hover:bg-foreground/2 -mx-2 px-2 transition-colors"
                  >
                    <span className="text-[10px] font-mono text-foreground/20 mt-1 w-5 flex-shrink-0">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <div className="flex-1 min-w-0">
                      {place.category && (
                        <p className="text-[9px] tracking-[0.25em] uppercase text-foreground/30 mb-1">
                          {place.category}
                        </p>
                      )}
                      <h3 className="font-serif text-base group-hover:text-foreground/60 transition-colors">
                        {place.title}
                      </h3>
                      {place.excerpt && (
                        <p className="text-xs text-foreground/40 mt-1 leading-relaxed line-clamp-2">
                          {place.excerpt}
                        </p>
                      )}
                    </div>
                    <span className="text-foreground/20 group-hover:text-foreground/60 transition-colors text-xs mt-1">→</span>
                  </Link>
                ))}
              </div>
            ) : (
              <p className="text-sm text-foreground/30">
                Places being added — check back soon.
              </p>
            )}

            {places.length > 0 && (
              <div className="mt-8">
                <Link
                  href={`/places?destination=${citySlug}`}
                  className="text-[10px] tracking-[0.2em] uppercase text-foreground/40 hover:text-foreground transition-colors"
                >
                  All places in {destination.title} →
                </Link>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ── Stories ───────────────────────────────────────────────────────── */}
      {stories.length > 0 && (
        <section className="px-8 md:px-16 lg:px-20 pb-20 md:pb-28">
          <div className="border-b border-border pb-5 mb-12">
            <SectionLabel>Stories from {destination.title}</SectionLabel>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-14">
            {stories.slice(0, 6).map((story) => (
              <article key={story.slug}>
                <Link href={`/stories/${story.slug}`} className="group">
                  <div className="aspect-[3/4] relative overflow-hidden bg-foreground/5 mb-5">
                    {story.hero_image && (
                      <Image
                        src={story.hero_image}
                        alt={story.title}
                        fill
                        className="object-cover group-hover:scale-[1.02] transition-transform duration-700"
                      />
                    )}
                  </div>
                  {story.category && (
                    <p className="text-[10px] tracking-[0.3em] uppercase text-foreground/30 mb-2">
                      {story.category}
                    </p>
                  )}
                  <h3 className="font-serif text-xl mb-2 group-hover:text-foreground/60 transition-colors">
                    {story.title}
                  </h3>
                  {story.excerpt && (
                    <p className="text-sm text-foreground/50 leading-relaxed line-clamp-2">
                      {story.excerpt}
                    </p>
                  )}
                </Link>
              </article>
            ))}
          </div>

          {stories.length > 6 && (
            <div className="mt-14 text-center">
              <Link
                href={`/stories?city=${citySlug}`}
                className="text-[10px] tracking-[0.2em] uppercase text-foreground/40 hover:text-foreground transition-colors"
              >
                More stories →
              </Link>
            </div>
          )}
        </section>
      )}

      {/* ── Journeys ──────────────────────────────────────────────────────── */}
      {journeys.length > 0 && (
        <section className="px-8 md:px-16 lg:px-20 pb-20 md:pb-28 border-t border-border pt-16">
          <div className="mb-12">
            <SectionLabel>Journeys to {destination.title}</SectionLabel>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-14">
            {journeys.slice(0, 6).map((journey) => (
              <article key={journey.slug}>
                <Link href={`/journeys/${journey.slug}`} className="group">
                  <div className="aspect-[4/3] relative overflow-hidden bg-foreground/5 mb-5">
                    {journey.hero_image_url && (
                      <Image
                        src={journey.hero_image_url}
                        alt={journey.title}
                        fill
                        className="object-cover group-hover:scale-[1.02] transition-transform duration-700"
                      />
                    )}
                  </div>
                  <div className="flex items-center gap-3 mb-2">
                    {journey.duration_days ? (
                      <span className="text-[10px] tracking-[0.2em] uppercase font-mono text-foreground/30">
                        {journey.duration_days}d
                      </span>
                    ) : null}
                    {journey.category && (
                      <span className="text-[10px] tracking-[0.2em] uppercase font-mono text-foreground/30">
                        {journey.category}
                      </span>
                    )}
                  </div>
                  <h3 className="font-serif text-xl mb-2 group-hover:text-foreground/60 transition-colors">
                    {journey.title}
                  </h3>
                  {(journey.short_description || journey.arc_description) && (
                    <p className="text-sm text-foreground/50 leading-relaxed line-clamp-2">
                      {journey.short_description || journey.arc_description}
                    </p>
                  )}
                  {journey.price_eur ? (
                    <p className="text-xs text-foreground/30 mt-3 font-mono">
                      From €{journey.price_eur}
                    </p>
                  ) : null}
                </Link>
              </article>
            ))}
          </div>

          {journeys.length > 6 && (
            <div className="mt-14 text-center">
              <Link
                href="/journeys"
                className="text-[10px] tracking-[0.2em] uppercase text-foreground/40 hover:text-foreground transition-colors"
              >
                All journeys →
              </Link>
            </div>
          )}
        </section>
      )}

      {/* ── You might also consider ──────────────────────────────────────── */}
      {connectingJourneys.length > 0 && (
        <section className="px-8 md:px-16 lg:px-20 pb-20 md:pb-28 border-t border-border pt-16">
          <div className="mb-12">
            <p className="text-[10px] tracking-[0.3em] uppercase font-mono text-foreground/30 mb-2">
              You might also consider
            </p>
            <p className="font-serif text-2xl md:text-3xl text-foreground/70">
              Journeys that pass through {destination.title}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-14">
            {connectingJourneys.slice(0, 3).map((journey) => {
              // Extract the other cities this journey visits
              const otherDests = (journey.destinations || "")
                .split(",")
                .map((d: string) => d.trim())
                .filter((d: string) => d !== citySlug && d.length > 0)
                .slice(0, 3);

              return (
                <article key={journey.slug}>
                  <Link href={`/journeys/${journey.slug}`} className="group">
                    <div className="aspect-[4/3] relative overflow-hidden bg-foreground/5 mb-5">
                      {journey.hero_image_url && (
                        <Image
                          src={journey.hero_image_url}
                          alt={journey.title}
                          fill
                          className="object-cover group-hover:scale-[1.02] transition-transform duration-700"
                        />
                      )}
                    </div>

                    {/* Route line */}
                    {otherDests.length > 0 && (
                      <div className="flex items-center gap-1.5 mb-3 flex-wrap">
                        <span className="text-[9px] tracking-[0.2em] uppercase font-mono text-foreground/25">
                          {destination.title}
                        </span>
                        {otherDests.map((dest: string) => (
                          <span key={dest} className="flex items-center gap-1.5">
                            <span className="text-foreground/15 text-[9px]">→</span>
                            <span className="text-[9px] tracking-[0.2em] uppercase font-mono text-foreground/25 capitalize">
                              {dest.replace(/-/g, " ")}
                            </span>
                          </span>
                        ))}
                      </div>
                    )}

                    <div className="flex items-center gap-3 mb-2">
                      {journey.duration_days ? (
                        <span className="text-[10px] tracking-[0.2em] uppercase font-mono text-foreground/30">
                          {journey.duration_days}d
                        </span>
                      ) : null}
                      {journey.category && (
                        <span className="text-[10px] tracking-[0.2em] uppercase font-mono text-foreground/30">
                          {journey.category}
                        </span>
                      )}
                    </div>

                    <h3 className="font-serif text-xl mb-2 group-hover:text-foreground/60 transition-colors">
                      {journey.title}
                    </h3>
                    {(journey.short_description || journey.arc_description) && (
                      <p className="text-sm text-foreground/50 leading-relaxed line-clamp-2">
                        {journey.short_description || journey.arc_description}
                      </p>
                    )}
                    {journey.price_eur ? (
                      <p className="text-xs text-foreground/30 mt-3 font-mono">
                        From €{journey.price_eur}
                      </p>
                    ) : null}
                  </Link>
                </article>
              );
            })}
          </div>
        </section>
      )}

      {/* ── Footer bridge ─────────────────────────────────────────────────── */}
      <section className="px-8 md:px-16 lg:px-20 py-20 border-t border-border">
        <div className="max-w-xl">
          <p className="text-[10px] tracking-[0.3em] uppercase text-foreground/30 mb-4">
            Plan your visit
          </p>
          <h2 className="font-serif text-3xl md:text-4xl mb-6">
            Coming to {destination.title}?
          </h2>
          <p className="text-sm text-foreground/50 leading-relaxed mb-8">
            Every journey we design includes private guiding, accommodation chosen for character rather than category, and the kind of access that takes eleven years in Morocco to arrange.
          </p>
          <Link
            href="/plan-your-trip"
            className="inline-block text-[11px] tracking-[0.2em] uppercase border border-foreground px-8 py-4 hover:bg-foreground hover:text-background transition-colors"
          >
            Plan Your Trip
          </Link>
        </div>
      </section>

    </main>
  );
}
