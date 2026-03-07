"use client";

import { useState, useRef, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import dynamic from "next/dynamic";
import { ChevronLeft, ChevronRight } from "lucide-react";
import HeroSearch from "@/components/HeroSearch";

const HomeCityMap = dynamic(() => import("@/components/HomeCityMap"), {
  ssr: false,
  loading: () => <div className="w-full h-full bg-[#0d0d0d]" />,
});

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

/* ─── Horizontal scroll strip (Kinfolk-style) ─── */
function StoryStrip({ stories, label }: { stories: Story[]; label: string }) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = useCallback((dir: "left" | "right") => {
    if (!scrollRef.current) return;
    const amount = scrollRef.current.clientWidth * 0.6;
    scrollRef.current.scrollBy({
      left: dir === "left" ? -amount : amount,
      behavior: "smooth",
    });
  }, []);

  if (stories.length === 0) return null;

  return (
    <section className="py-16 md:py-24">
      {/* Header row */}
      <div className="px-6 md:px-[6%] lg:px-[6%] flex items-end justify-between mb-8">
        <p className="text-[11px] tracking-[0.15em] uppercase text-foreground/70">
          {label}
        </p>
        <div className="flex items-center gap-2">
          <Link
            href="/stories"
            className="text-[11px] tracking-[0.15em] uppercase text-foreground/60 hover:text-foreground transition-colors mr-4"
          >
            View All
          </Link>
          <button
            onClick={() => scroll("left")}
            className="w-9 h-9 border border-foreground/20 flex items-center justify-center hover:border-foreground/60 transition-colors"
            aria-label="Scroll left"
          >
            <ChevronLeft className="w-4 h-4 text-foreground/60" />
          </button>
          <button
            onClick={() => scroll("right")}
            className="w-9 h-9 border border-foreground/20 flex items-center justify-center hover:border-foreground/60 transition-colors"
            aria-label="Scroll right"
          >
            <ChevronRight className="w-4 h-4 text-foreground/60" />
          </button>
        </div>
      </div>

      {/* Scroll track — bleeds right */}
      <div
        ref={scrollRef}
        className="flex gap-4 overflow-x-auto scrollbar-hide pl-6 md:pl-[6%] lg:pl-[6%] pr-6"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {stories.map((story) => (
          <Link
            key={story.slug}
            href={`/stories/${story.slug}`}
            className="group flex-shrink-0 w-[200px] md:w-[210px] lg:w-[220px]"
          >
            {/* Portrait image */}
            <div className="aspect-[3/4] relative overflow-hidden bg-[#f0f0f0] mb-3">
              {story.heroImage && (
                <Image
                  src={story.heroImage}
                  alt={story.title}
                  fill
                  sizes="220px"
                  unoptimized
                  className="object-cover group-hover:scale-[1.03] transition-transform duration-700"
                />
              )}
            </div>
            {/* Category */}
            {story.category && (
              <p className="text-[11px] text-foreground/70 mb-1">
                {story.category}
              </p>
            )}
            {/* Title */}
            <h3 className="text-[13px] tracking-[0.04em] uppercase leading-snug text-foreground group-hover:text-foreground/70 transition-colors">
              {story.title}
            </h3>
            {/* Subtitle */}
            {story.subtitle && (
              <p className="text-[12px] text-foreground/60 leading-relaxed mt-1 line-clamp-2">
                {story.subtitle}
              </p>
            )}
          </Link>
        ))}
      </div>
    </section>
  );
}

/* ─── Journey horizontal strip ─── */
function JourneyStrip({ journeys }: { journeys: Journey[] }) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = useCallback((dir: "left" | "right") => {
    if (!scrollRef.current) return;
    const amount = scrollRef.current.clientWidth * 0.6;
    scrollRef.current.scrollBy({
      left: dir === "left" ? -amount : amount,
      behavior: "smooth",
    });
  }, []);

  if (journeys.length === 0) return null;

  return (
    <section className="py-16 md:py-24">
      <div className="px-6 md:px-[6%] lg:px-[6%] flex items-end justify-between mb-8">
        <p className="text-[11px] tracking-[0.15em] uppercase text-foreground/70">
          Private Journeys
        </p>
        <div className="flex items-center gap-2">
          <Link
            href="/journeys"
            className="text-[11px] tracking-[0.15em] uppercase text-foreground/60 hover:text-foreground transition-colors mr-4"
          >
            View All
          </Link>
          <button onClick={() => scroll("left")}
            className="w-9 h-9 border border-foreground/20 flex items-center justify-center hover:border-foreground/60 transition-colors"
            aria-label="Scroll left">
            <ChevronLeft className="w-4 h-4 text-foreground/60" />
          </button>
          <button onClick={() => scroll("right")}
            className="w-9 h-9 border border-foreground/20 flex items-center justify-center hover:border-foreground/60 transition-colors"
            aria-label="Scroll right">
            <ChevronRight className="w-4 h-4 text-foreground/60" />
          </button>
        </div>
      </div>

      <div
        ref={scrollRef}
        className="flex gap-4 overflow-x-auto pl-6 md:pl-[6%] lg:pl-[6%] pr-6"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {journeys.map((journey) => (
          <Link
            key={journey.slug}
            href={`/journeys/${journey.slug}`}
            className="group flex-shrink-0 w-[200px] md:w-[210px] lg:w-[220px]"
          >
            <div className="aspect-[3/4] relative overflow-hidden bg-[#f0f0f0] mb-3">
              {journey.heroImage && (
                <Image
                  src={journey.heroImage}
                  alt={journey.title}
                  fill
                  sizes="220px"
                  unoptimized
                  className="object-cover group-hover:scale-[1.03] transition-transform duration-700"
                />
              )}
            </div>
            <p className="text-[11px] text-foreground/70 mb-1">
              {journey.duration} · {journey.destinations}
            </p>
            <h3 className="text-[13px] tracking-[0.04em] uppercase leading-snug text-foreground group-hover:text-foreground/70 transition-colors">
              {journey.title}
            </h3>
            {journey.description && (
              <p className="text-[12px] text-foreground/60 leading-relaxed mt-1 line-clamp-2">
                {journey.description}
              </p>
            )}
          </Link>
        ))}
      </div>
    </section>
  );
}

export default function HomeContent({
  journeys,
  epicJourneys,
  stories,
  testimonials,
  settings,
}: HomeContentProps) {
  const [testimonialIndex, setTestimonialIndex] = useState(0);

  const heroImage = settings.hero_image_url;
  const stripOneStories = stories.slice(0, 7);
  const stripTwoStories = stories.slice(7, 14);

  return (
    <div className="bg-background min-h-screen">

      {/* ═══════════════════════════════════════════════════════════════
          HERO
          ═══════════════════════════════════════════════════════════════ */}
      <section className="relative h-screen">
        {heroImage ? (
          <Image src={heroImage} alt="Slow Morocco" fill sizes="100vw" className="object-cover" priority />
        ) : (
          <div className="absolute inset-0 bg-foreground/90" />
        )}
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/20 to-black/70" />
        <div className="absolute inset-0 flex flex-col justify-end px-8 md:px-[8%] lg:px-[12%] pb-16 md:pb-24">
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-white mb-3 max-w-3xl leading-[1.05]">
            Morocco, slowly.
          </h1>
          <p className="font-serif text-lg md:text-xl lg:text-2xl text-white/80 mb-8 max-w-2xl">
            236 stories. 122 places. The knowledge that makes it unforgettable.
          </p>
          <HeroSearch />
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          DATELINE BAR
          ═══════════════════════════════════════════════════════════════ */}
      <div className="border-y border-border py-3 px-8 md:px-[8%] lg:px-[12%] flex items-center justify-between overflow-x-auto"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}>
        <div className="flex items-center gap-6 md:gap-8 flex-shrink-0">
          {["History", "Architecture", "Food", "Culture", "People", "Music", "Craft"].map((cat) => (
            <Link
              key={cat}
              href={`/stories/category/${cat.toLowerCase()}`}
              className="text-[10px] tracking-[0.2em] uppercase text-foreground/70 hover:text-foreground transition-colors whitespace-nowrap"
            >
              {cat}
            </Link>
          ))}
        </div>
        <Link
          href="/stories"
          className="text-[10px] tracking-[0.2em] uppercase text-foreground/60 hover:text-foreground transition-colors whitespace-nowrap ml-8 flex-shrink-0"
        >
          All stories
        </Link>
      </div>

      {/* ═══════════════════════════════════════════════════════════════
          STORY STRIP 1 — Kinfolk-style horizontal scroll
          ═══════════════════════════════════════════════════════════════ */}
      <StoryStrip stories={stripOneStories} label="From the Archive" />

      <hr className="border-border mx-8 md:mx-[8%] lg:mx-[12%]" />

      {/* ═══════════════════════════════════════════════════════════════
          STATEMENT
          ═══════════════════════════════════════════════════════════════ */}
      <section className="py-24 md:py-32">
        <div className="px-8 md:px-[8%] lg:px-[12%]">
          <div className="max-w-4xl">
            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl leading-[1.2] text-foreground">
              Morocco has been written about for centuries. Most of it skims the
              surface. We went <span className="italic">deeper</span> — into the history, the craft,
              the food, the music, the people who make the country what it is.
            </h2>
          </div>
        </div>
      </section>

      <hr className="border-border mx-8 md:mx-[8%] lg:mx-[12%]" />

      {/* ═══════════════════════════════════════════════════════════════
          STORY STRIP 2 — second batch
          ═══════════════════════════════════════════════════════════════ */}
      <StoryStrip stories={stripTwoStories} label="Keep Reading" />

      <hr className="border-border mx-8 md:mx-[8%] lg:mx-[12%]" />

      {/* ═══════════════════════════════════════════════════════════════
          CITY MAP
          ═══════════════════════════════════════════════════════════════ */}
      <section>
        <div className="px-8 md:px-[8%] lg:px-[12%] pt-16 pb-8">
          <div className="flex items-end justify-between">
            <div>
              <p className="text-[11px] tracking-[0.25em] uppercase text-foreground/70 mb-3">
                Where to go
              </p>
              <h2 className="font-serif text-3xl md:text-4xl text-foreground">
                Eleven cities. One country.
              </h2>
            </div>
            <p className="hidden md:block text-xs text-foreground/50 tracking-[0.1em] pb-1">
              Hover to explore. Click to go.
            </p>
          </div>
        </div>
        <div className="h-[520px] md:h-[620px] w-full">
          <HomeCityMap />
        </div>
      </section>

      <hr className="border-border mx-8 md:mx-[8%] lg:mx-[12%]" />

      {/* ═══════════════════════════════════════════════════════════════
          JOURNEYS — Kinfolk-style horizontal strip
          ═══════════════════════════════════════════════════════════════ */}
      <JourneyStrip journeys={journeys} />

      <hr className="border-border mx-8 md:mx-[8%] lg:mx-[12%]" />

      {/* ═══════════════════════════════════════════════════════════════
          TESTIMONIALS
          ═══════════════════════════════════════════════════════════════ */}
      {testimonials.length > 0 && (
        <section className="py-20 md:py-28">
          <div className="px-8 md:px-[8%] lg:px-[12%]">
            <div className="max-w-4xl mx-auto">
              <div className="flex items-center gap-8">
                <button onClick={() => setTestimonialIndex((p) => (p - 1 + testimonials.length) % testimonials.length)}
                  className="w-9 h-9 border border-foreground/20 flex items-center justify-center hover:border-foreground/60 transition-colors hidden md:flex flex-shrink-0"
                  aria-label="Previous">
                  <ChevronLeft className="w-4 h-4 text-foreground/60" />
                </button>
                <div className="text-center flex-grow">
                  <blockquote className="font-serif text-xl md:text-2xl lg:text-3xl leading-relaxed text-foreground mb-6">
                    &ldquo;{testimonials[testimonialIndex]?.quote}&rdquo;
                  </blockquote>
                  <p className="text-[10px] tracking-[0.3em] uppercase text-foreground/70">
                    — {testimonials[testimonialIndex]?.author}
                  </p>
                </div>
                <button onClick={() => setTestimonialIndex((p) => (p + 1) % testimonials.length)}
                  className="w-9 h-9 border border-foreground/20 flex items-center justify-center hover:border-foreground/60 transition-colors hidden md:flex flex-shrink-0"
                  aria-label="Next">
                  <ChevronRight className="w-4 h-4 text-foreground/60" />
                </button>
              </div>
              <div className="flex justify-center gap-2 mt-8">
                {testimonials.map((_, idx) => (
                  <button key={idx} onClick={() => setTestimonialIndex(idx)}
                    className={`w-1.5 h-1.5 transition-colors ${idx === testimonialIndex ? "bg-foreground" : "bg-foreground/20"}`}
                    aria-label={`Testimonial ${idx + 1}`} />
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ═══════════════════════════════════════════════════════════════
          QUIET CLOSE
          ═══════════════════════════════════════════════════════════════ */}
      <hr className="border-border mx-8 md:mx-[8%] lg:mx-[12%]" />
      <section className="py-24 md:py-32">
        <div className="px-8 md:px-[8%] lg:px-[12%]">
          <div className="max-w-3xl">
            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl mb-6">
              When you&apos;re ready, we&apos;ll build the route.
            </h2>
            <p className="text-foreground/70 leading-relaxed mb-10 max-w-lg">
              No forms. No packages. Just a conversation about what you&apos;re hoping to find.
            </p>
            <Link href="/plan-your-trip"
              className="inline-block border border-foreground px-10 py-4 text-[11px] tracking-[0.15em] uppercase hover:bg-foreground hover:text-background transition-colors">
              Start a conversation
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
