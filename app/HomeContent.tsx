"use client";

import Image from "next/image";
import { cloudinaryUrl } from "@/lib/cloudinary";
import Link from "next/link";

// ─── Types (unchanged) ─────────────────────────────────────────────────────

interface Journey {
  slug: string;
  title: string;
  description?: string;
  heroImage?: string;
  duration?: string;
  destinations?: string;
  journeyType?: string;
  price?: number;
  epicPrice?: number;
}

interface Story {
  slug: string;
  title: string;
  subtitle?: string;
  excerpt?: string;
  heroImage?: string;
  mood?: string;
  category?: string;
  read_time?: number;
}

interface Testimonial {
  id: string;
  quote: string;
  author: string;
  journeyTitle?: string;
}

interface HomeContentProps {
  journeys: Journey[];
  epicJourneys: Journey[];
  stories: Story[];
  testimonials: Testimonial[];
  settings: Record<string, string>;
}

// ─── Story Card (Kinfolk portrait) ──────────────────────────────────────────

function StoryCard({ story, priority = false }: { story: Story; priority?: boolean }) {
  return (
    <Link href={`/stories/${story.slug}`} className="group block">
      <div className="aspect-[29/39] relative overflow-hidden bg-[#e8e6e1] mb-4">
        {story.heroImage && (
          <Image
            src={cloudinaryUrl(story.heroImage, 600)}
            alt={story.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
            className="object-cover group-hover:scale-[1.02] transition-transform duration-[1.2s] ease-out"
            priority={priority}
            unoptimized
          />
        )}
      </div>
      {story.category && (
        <p className="text-[10px] tracking-[0.2em] uppercase text-foreground/40 mb-2">
          {story.category}
        </p>
      )}
      <h3 className="text-[13px] tracking-[0.06em] uppercase leading-[1.4] text-foreground group-hover:text-foreground/60 transition-colors duration-500">
        {story.title}
      </h3>
      {story.subtitle && (
        <p className="text-[12.5px] text-foreground/50 leading-[1.6] mt-1.5 line-clamp-2">
          {story.subtitle}
        </p>
      )}
    </Link>
  );
}

// ─── Journey Card (same portrait treatment) ─────────────────────────────────

function JourneyCard({ journey }: { journey: Journey }) {
  return (
    <Link href={`/journeys/${journey.slug}`} className="group block">
      <div className="aspect-[29/39] relative overflow-hidden bg-[#e8e6e1] mb-4">
        {journey.heroImage && (
          <Image
            src={cloudinaryUrl(journey.heroImage, 600)}
            alt={journey.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
            className="object-cover group-hover:scale-[1.02] transition-transform duration-[1.2s] ease-out"
            unoptimized
          />
        )}
      </div>
      <p className="text-[10px] tracking-[0.2em] uppercase text-foreground/40 mb-2">
        {journey.duration ? `${journey.duration} Journey` : "Private Journey"}
      </p>
      <h3 className="text-[13px] tracking-[0.06em] uppercase leading-[1.4] text-foreground group-hover:text-foreground/60 transition-colors duration-500">
        {journey.title}
      </h3>
      {journey.description && (
        <p className="text-[12.5px] text-foreground/50 leading-[1.6] mt-1.5 line-clamp-2">
          {journey.description}
        </p>
      )}
    </Link>
  );
}

// ─── Main ───────────────────────────────────────────────────────────────────

export default function HomeContent({
  journeys,
  epicJourneys,
  stories,
  settings,
}: HomeContentProps) {
  const heroImage = settings.hero_image_url;

  // Editorial curation: lead story, grids, interstitial journey
  const leadStory = stories[0];
  const gridOne = stories.slice(1, 5);
  const gridTwo = stories.slice(5, 9);
  const interstitialJourney = epicJourneys[0] || journeys[0];
  const remainingJourneys = [...epicJourneys, ...journeys]
    .filter((j) => j.slug !== interstitialJourney?.slug)
    .slice(0, 4);
  const gridThree = stories.slice(9, 13);

  return (
    <div className="bg-background min-h-screen">

      {/* ═══════════════════════════════════════════════════════════════════
          HERO — Magazine cover. Full-bleed. Lead story as the cover feature.
          ═══════════════════════════════════════════════════════════════════ */}
      <section className="relative h-[100svh] min-h-[600px]">
        {leadStory?.heroImage ? (
          <Image
            src={cloudinaryUrl(leadStory.heroImage, 1920)}
            alt={leadStory.title}
            fill
            sizes="100vw"
            className="object-cover"
            priority
            unoptimized
          />
        ) : heroImage ? (
          <Image
            src={cloudinaryUrl(heroImage, 1920)}
            alt="Slow Morocco"
            fill
            sizes="100vw"
            className="object-cover"
            priority
            unoptimized
          />
        ) : (
          <div className="absolute inset-0 bg-[#2a2520]" />
        )}

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/70" />

        {/* Cover content — bottom-aligned */}
        {leadStory && (
          <Link
            href={`/stories/${leadStory.slug}`}
            className="absolute inset-0 flex flex-col justify-end group"
          >
            <div className="px-8 md:px-12 lg:px-16 pb-16 md:pb-20 max-w-4xl">
              {leadStory.category && (
                <p className="text-[10px] tracking-[0.25em] uppercase text-white/50 mb-4">
                  {leadStory.category}
                </p>
              )}
              <h2 className="font-serif text-3xl md:text-5xl lg:text-6xl text-white leading-[1.1] mb-4 group-hover:text-white/80 transition-colors duration-500">
                {leadStory.title}
              </h2>
              {leadStory.subtitle && (
                <p className="text-sm md:text-base text-white/60 leading-relaxed max-w-xl">
                  {leadStory.subtitle}
                </p>
              )}
            </div>
          </Link>
        )}
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          STORIES GRID ONE — 4 across, Kinfolk portrait cards
          ═══════════════════════════════════════════════════════════════════ */}
      {gridOne.length > 0 && (
        <section className="px-8 md:px-12 lg:px-16 py-16 md:py-24">
          <div className="flex items-baseline justify-between mb-12">
            <p className="text-[10px] tracking-[0.25em] uppercase text-foreground/35">
              Latest
            </p>
            <Link
              href="/stories"
              className="text-[10px] tracking-[0.2em] uppercase text-foreground/35 hover:text-foreground/60 transition-colors"
            >
              View All
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-x-5 md:gap-x-6 gap-y-12">
            {gridOne.map((story, i) => (
              <StoryCard key={story.slug} story={story} priority={i < 2} />
            ))}
          </div>
        </section>
      )}

      {/* ═══════════════════════════════════════════════════════════════════
          FULL-BLEED INTERSTITIAL — A journey as editorial feature
          ═══════════════════════════════════════════════════════════════════ */}
      {interstitialJourney && (
        <section className="relative h-[75vh] min-h-[500px] max-h-[900px]">
          {interstitialJourney.heroImage && (
            <Image
              src={cloudinaryUrl(interstitialJourney.heroImage, 1920)}
              alt={interstitialJourney.title}
              fill
              sizes="100vw"
              className="object-cover"
              unoptimized
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/60" />
          <Link
            href={`/journeys/${interstitialJourney.slug}`}
            className="absolute inset-0 flex flex-col justify-end group"
          >
            <div className="px-8 md:px-12 lg:px-16 pb-14 md:pb-20 max-w-3xl">
              <p className="text-[10px] tracking-[0.25em] uppercase text-white/40 mb-4">
                {interstitialJourney.duration ? `${interstitialJourney.duration} Journey` : "Private Journey"}
              </p>
              <h2 className="font-serif text-3xl md:text-5xl text-white leading-[1.1] mb-3 group-hover:text-white/80 transition-colors duration-500">
                {interstitialJourney.title}
              </h2>
              {interstitialJourney.description && (
                <p className="text-sm text-white/50 leading-relaxed max-w-lg">
                  {interstitialJourney.description}
                </p>
              )}
            </div>
          </Link>
        </section>
      )}

      {/* ═══════════════════════════════════════════════════════════════════
          STORIES GRID TWO
          ═══════════════════════════════════════════════════════════════════ */}
      {gridTwo.length > 0 && (
        <section className="px-8 md:px-12 lg:px-16 py-16 md:py-24">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-x-5 md:gap-x-6 gap-y-12">
            {gridTwo.map((story) => (
              <StoryCard key={story.slug} story={story} />
            ))}
          </div>
        </section>
      )}

      {/* ═══════════════════════════════════════════════════════════════════
          EDITORIAL STATEMENT
          ═══════════════════════════════════════════════════════════════════ */}
      <section className="py-20 md:py-32">
        <div className="px-8 md:px-12 lg:px-16">
          <div className="max-w-3xl mx-auto text-center">
            <p className="font-serif text-2xl md:text-3xl lg:text-[2.1rem] leading-[1.5] text-foreground/80">
              Two hundred stories about Morocco — the history, the craft,
              the food, the music, the people who make the country what it is.
              Written for people who want to understand, not just visit.
            </p>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          JOURNEYS — Same grid treatment. Editorial, not commerce.
          ═══════════════════════════════════════════════════════════════════ */}
      {remainingJourneys.length > 0 && (
        <section className="px-8 md:px-12 lg:px-16 py-16 md:py-24 border-t border-foreground/[0.08]">
          <div className="flex items-baseline justify-between mb-12">
            <p className="text-[10px] tracking-[0.25em] uppercase text-foreground/35">
              Private Journeys
            </p>
            <Link
              href="/journeys"
              className="text-[10px] tracking-[0.2em] uppercase text-foreground/35 hover:text-foreground/60 transition-colors"
            >
              View All
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-x-5 md:gap-x-6 gap-y-12">
            {remainingJourneys.map((journey) => (
              <JourneyCard key={journey.slug} journey={journey} />
            ))}
          </div>
        </section>
      )}

      {/* ═══════════════════════════════════════════════════════════════════
          STORIES GRID THREE
          ═══════════════════════════════════════════════════════════════════ */}
      {gridThree.length > 0 && (
        <section className="px-8 md:px-12 lg:px-16 py-16 md:py-24 border-t border-foreground/[0.08]">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-x-5 md:gap-x-6 gap-y-12">
            {gridThree.map((story) => (
              <StoryCard key={story.slug} story={story} />
            ))}
          </div>
        </section>
      )}

    </div>
  );
}
