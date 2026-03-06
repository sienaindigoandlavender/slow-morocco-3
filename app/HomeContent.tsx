"use client";

import { useState } from "react";
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

const CATEGORIES = [
  { slug: "history",      label: "History",      count: 53 },
  { slug: "architecture", label: "Architecture",  count: 26 },
  { slug: "culture",      label: "Culture",       count: 20 },
  { slug: "people",       label: "People",        count: 19 },
  { slug: "systems",      label: "Systems",       count: 19 },
  { slug: "food",         label: "Food",          count: 18 },
  { slug: "nature",       label: "Nature",        count: 13 },
  { slug: "art",          label: "Art",           count: 10 },
  { slug: "design",       label: "Design",        count: 9  },
  { slug: "music",        label: "Music",         count: 7  },
  { slug: "craft",        label: "Craft",         count: 6  },
];

export default function HomeContent({
  journeys,
  epicJourneys,
  stories,
  testimonials,
  settings,
}: HomeContentProps) {
  const [testimonialIndex, setTestimonialIndex] = useState(0);

  const heroImage = settings.hero_image_url;
  const featuredStory = stories[0] || null;
  const digestStories = stories.slice(1, 5);
  const moreStories = stories.slice(5, 8);

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
        <div className="absolute inset-0 flex flex-col justify-end px-8 md:px-16 lg:px-20 pb-16 md:pb-24">
          <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl text-white mb-8 max-w-3xl leading-[1.05]">
            Morocco, slowly.
          </h1>
          <HeroSearch />
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          DATELINE BAR — newspaper masthead energy
          ═══════════════════════════════════════════════════════════════ */}
      <div className="border-y border-border py-3 px-8 md:px-16 lg:px-20 flex items-center justify-between overflow-x-auto scrollbar-hide">
        <div className="flex items-center gap-6 md:gap-8 flex-shrink-0">
          {["History", "Architecture", "Food", "Culture", "People", "Music", "Craft"].map((cat) => (
            <Link
              key={cat}
              href={`/stories/category/${cat.toLowerCase()}`}
              className="text-[10px] tracking-[0.2em] uppercase text-foreground/40 hover:text-foreground transition-colors whitespace-nowrap"
            >
              {cat}
            </Link>
          ))}
        </div>
        <Link
          href="/stories"
          className="text-[10px] tracking-[0.2em] uppercase text-foreground/30 hover:text-foreground transition-colors whitespace-nowrap ml-8 flex-shrink-0"
        >
          173 stories →
        </Link>
      </div>

      {/* ═══════════════════════════════════════════════════════════════
          MAGAZINE FRONT PAGE — 3 column editorial layout
          ═══════════════════════════════════════════════════════════════ */}
      <section className="border-b border-border">
        <div className="container mx-auto px-8 md:px-16 lg:px-20 py-12 md:py-16">

          <div className="flex items-baseline justify-between mb-8 pb-4 border-b border-border">
            <p className="text-[10px] tracking-[0.35em] uppercase text-foreground/30 font-mono">
              From the archive
            </p>
            <Link
              href="/stories"
              className="text-[10px] tracking-[0.2em] uppercase text-foreground/30 hover:text-foreground transition-colors"
            >
              View all stories →
            </Link>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-[200px_1fr_280px] gap-0 lg:divide-x lg:divide-border">

            {/* LEFT — category index */}
            <div className="hidden lg:block pr-8">
              <p className="text-[9px] tracking-[0.3em] uppercase text-foreground/25 font-mono mb-5">
                Browse by subject
              </p>
              <div className="space-y-1">
                {CATEGORIES.map((cat) => (
                  <Link
                    key={cat.slug}
                    href={`/stories/category/${cat.slug}`}
                    className="group flex items-baseline justify-between py-1.5 border-b border-border/40 hover:border-foreground/20 transition-colors"
                  >
                    <span className="text-sm text-foreground/60 group-hover:text-foreground transition-colors">
                      {cat.label}
                    </span>
                    <span className="text-[9px] font-mono text-foreground/25 group-hover:text-foreground/40 transition-colors ml-2">
                      {cat.count}
                    </span>
                  </Link>
                ))}
              </div>
              <Link
                href="/stories"
                className="block mt-6 text-[9px] tracking-[0.25em] uppercase text-foreground/25 hover:text-foreground transition-colors"
              >
                All 173 stories →
              </Link>
            </div>

            {/* CENTRE — featured story */}
            {featuredStory && (
              <div className="lg:px-10">
                <Link href={`/stories/${featuredStory.slug}`} className="group block">
                  <div className="aspect-[16/10] relative overflow-hidden bg-[#f0f0f0] mb-6">
                    {featuredStory.heroImage && (
                      <Image
                        src={featuredStory.heroImage}
                        alt={featuredStory.title}
                        fill
                        className="object-cover group-hover:scale-[1.02] transition-transform duration-700"
                      />
                    )}
                  </div>
                  {featuredStory.category && (
                    <p className="text-[10px] tracking-[0.3em] uppercase text-foreground/35 mb-3">
                      {featuredStory.category}
                    </p>
                  )}
                  <h2 className="font-serif text-2xl md:text-3xl lg:text-4xl leading-[1.2] mb-4 group-hover:text-foreground/70 transition-colors">
                    {featuredStory.title}
                  </h2>
                  {featuredStory.subtitle && (
                    <p className="font-serif italic text-lg text-foreground/50 mb-4">
                      {featuredStory.subtitle}
                    </p>
                  )}
                  {featuredStory.excerpt && (
                    <p className="text-sm text-foreground/60 leading-relaxed mb-5 max-w-prose">
                      {featuredStory.excerpt}
                    </p>
                  )}
                  <span className="text-[10px] tracking-[0.2em] uppercase text-foreground/40 group-hover:text-foreground transition-colors">
                    Read more →
                  </span>
                </Link>
              </div>
            )}

            {/* RIGHT — digest */}
            <div className="lg:pl-8 mt-10 lg:mt-0 pt-8 lg:pt-0 border-t lg:border-t-0 border-border">
              <p className="text-[9px] tracking-[0.3em] uppercase text-foreground/25 font-mono mb-5">
                Also in the archive
              </p>
              <div className="space-y-0 divide-y divide-border">
                {digestStories.map((story) => (
                  <Link
                    key={story.slug}
                    href={`/stories/${story.slug}`}
                    className="group flex gap-4 py-4 hover:bg-[#fafafa] -mx-2 px-2 transition-colors"
                  >
                    <div className="w-16 h-16 relative overflow-hidden bg-[#f0f0f0] flex-shrink-0">
                      {story.heroImage && (
                        <Image
                          src={story.heroImage}
                          alt={story.title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      {story.category && (
                        <p className="text-[9px] tracking-[0.2em] uppercase text-foreground/30 mb-1">
                          {story.category}
                        </p>
                      )}
                      <h3 className="font-serif text-sm leading-snug group-hover:text-foreground/60 transition-colors line-clamp-2">
                        {story.title}
                      </h3>
                    </div>
                  </Link>
                ))}
              </div>

              {/* MORE STORIES — smaller list */}
              {moreStories.length > 0 && (
                <div className="mt-6 pt-6 border-t border-border space-y-3">
                  {moreStories.map((story) => (
                    <Link
                      key={story.slug}
                      href={`/stories/${story.slug}`}
                      className="group block"
                    >
                      {story.category && (
                        <p className="text-[9px] tracking-[0.2em] uppercase text-foreground/25 mb-0.5">
                          {story.category}
                        </p>
                      )}
                      <h4 className="font-serif text-sm leading-snug text-foreground/60 group-hover:text-foreground transition-colors">
                        {story.title}
                      </h4>
                    </Link>
                  ))}
                </div>
              )}
            </div>

          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          STATEMENT
          ═══════════════════════════════════════════════════════════════ */}
      <section className="py-24 md:py-32 border-b border-border">
        <div className="container mx-auto px-8 md:px-16 lg:px-20">
          <div className="max-w-4xl">
            <p className="text-[10px] tracking-[0.3em] uppercase text-foreground/30 mb-8">
              Our philosophy
            </p>
            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl leading-[1.2] text-foreground">
              We don&apos;t do bucket lists. We build routes that let Morocco reveal
              itself—<span className="italic">slowly</span>, on its own terms,
              through the people and places that make it unforgettable.
            </h2>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          CITY MAP
          ═══════════════════════════════════════════════════════════════ */}
      <section className="border-b border-border">
        <div className="container mx-auto px-8 md:px-16 lg:px-20 pt-16 pb-8">
          <div className="flex items-end justify-between">
            <div>
              <p className="text-[10px] tracking-[0.3em] uppercase text-foreground/30 mb-3 font-mono">
                Where to go
              </p>
              <h2 className="font-serif text-3xl md:text-4xl text-foreground">
                Eleven cities. One country.
              </h2>
            </div>
            <p className="hidden md:block text-xs text-foreground/25 tracking-[0.1em] pb-1">
              Hover to explore. Click to go.
            </p>
          </div>
        </div>
        <div className="h-[520px] md:h-[620px] w-full">
          <HomeCityMap />
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          JOURNEYS — editorial treatment, not carousel
          ═══════════════════════════════════════════════════════════════ */}
      {journeys.length > 0 && (
        <section className="py-20 md:py-28 border-b border-border">
          <div className="container mx-auto px-8 md:px-16 lg:px-20">
            <div className="flex items-baseline justify-between mb-12">
              <div>
                <p className="text-[10px] tracking-[0.35em] uppercase text-foreground/30 font-mono mb-3">
                  Private journeys
                </p>
                <h2 className="font-serif text-3xl md:text-4xl">Routes worth taking</h2>
              </div>
              <Link
                href="/journeys"
                className="text-[10px] tracking-[0.2em] uppercase text-foreground/30 hover:text-foreground transition-colors"
              >
                All journeys →
              </Link>
            </div>

            {/* Featured journey — large + two smaller */}
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_1fr_1fr] gap-6">
              {journeys.slice(0, 1).map((journey) => (
                <Link
                  key={journey.slug}
                  href={`/journeys/${journey.slug}`}
                  className="group lg:col-span-2"
                >
                  <div className="aspect-[16/9] relative overflow-hidden bg-[#f0f0f0] mb-4">
                    {journey.heroImage && (
                      <Image
                        src={journey.heroImage}
                        alt={journey.title}
                        fill
                        className="object-cover group-hover:scale-[1.02] transition-transform duration-700"
                      />
                    )}
                  </div>
                  <p className="text-[10px] tracking-[0.25em] uppercase text-foreground/30 mb-2">
                    {journey.duration} · Private
                  </p>
                  <h3 className="font-serif text-2xl md:text-3xl group-hover:text-foreground/60 transition-colors">
                    {journey.title}
                  </h3>
                  {journey.description && (
                    <p className="text-sm text-foreground/50 leading-relaxed mt-2 max-w-prose line-clamp-2">
                      {journey.description}
                    </p>
                  )}
                </Link>
              ))}

              <div className="flex flex-col gap-6 lg:pl-6 lg:border-l border-border">
                {journeys.slice(1, 4).map((journey) => (
                  <Link
                    key={journey.slug}
                    href={`/journeys/${journey.slug}`}
                    className="group flex gap-4"
                  >
                    <div className="w-20 h-20 relative overflow-hidden bg-[#f0f0f0] flex-shrink-0">
                      {journey.heroImage && (
                        <Image
                          src={journey.heroImage}
                          alt={journey.title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      )}
                    </div>
                    <div>
                      <p className="text-[9px] tracking-[0.2em] uppercase text-foreground/30 mb-1">
                        {journey.duration}
                      </p>
                      <h4 className="font-serif text-base leading-snug group-hover:text-foreground/60 transition-colors">
                        {journey.title}
                      </h4>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ═══════════════════════════════════════════════════════════════
          TESTIMONIALS
          ═══════════════════════════════════════════════════════════════ */}
      {testimonials.length > 0 && (
        <section className="py-20 md:py-28 border-b border-border">
          <div className="container mx-auto px-8 md:px-16 lg:px-20">
            <div className="max-w-4xl mx-auto">
              <div className="flex items-center gap-8">
                <button onClick={() => setTestimonialIndex((p) => (p - 1 + testimonials.length) % testimonials.length)}
                  className="p-2 border border-border hover:bg-foreground hover:text-background hover:border-foreground transition-colors hidden md:flex items-center justify-center flex-shrink-0"
                  aria-label="Previous">
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <div className="text-center flex-grow">
                  <blockquote className="font-serif text-xl md:text-2xl lg:text-3xl leading-relaxed text-foreground mb-6">
                    &ldquo;{testimonials[testimonialIndex]?.quote}&rdquo;
                  </blockquote>
                  <p className="text-[10px] tracking-[0.3em] uppercase text-foreground/40">
                    — {testimonials[testimonialIndex]?.author}
                  </p>
                </div>
                <button onClick={() => setTestimonialIndex((p) => (p + 1) % testimonials.length)}
                  className="p-2 border border-border hover:bg-foreground hover:text-background hover:border-foreground transition-colors hidden md:flex items-center justify-center flex-shrink-0"
                  aria-label="Next">
                  <ChevronRight className="w-4 h-4" />
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
          HOW IT WORKS
          ═══════════════════════════════════════════════════════════════ */}
      <section className="py-20 md:py-28 bg-[#1a1916] text-white">
        <div className="container mx-auto px-8 md:px-16 lg:px-20">
          <div className="mb-16">
            <p className="text-[10px] tracking-[0.3em] uppercase text-white/30 mb-4 font-mono">The process</p>
            <h2 className="font-serif text-3xl md:text-4xl">How it works</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8 max-w-5xl">
            {[
              { n: "1", title: "You reach out", body: "Tell us what's calling you. A journey that caught your eye. A question. A sense that something here is yours." },
              { n: "2", title: "We shape it", body: "We build the route around what matters to you. Add days. Remove cities. Stay longer where something pulls you." },
              { n: "3", title: "You go", body: "Deposit secures your dates. Balance due 60 days before. Then you pack light and show up." },
            ].map((step) => (
              <div key={step.n}>
                <div className="flex items-center gap-4 mb-6">
                  <span className="w-8 h-8 border border-white/20 flex items-center justify-center font-serif text-sm flex-shrink-0">{step.n}</span>
                  <div className="flex-1 h-px bg-white/10" />
                </div>
                <h3 className="font-serif text-xl mb-3">{step.title}</h3>
                <p className="text-sm text-white/50 leading-relaxed">{step.body}</p>
              </div>
            ))}
          </div>
          <div className="mt-16">
            <Link href="/plan-your-trip"
              className="inline-block bg-white text-[#1a1916] px-10 py-4 text-xs tracking-[0.15em] uppercase hover:bg-white/90 transition-colors">
              Start the conversation
            </Link>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          FINAL CTA
          ═══════════════════════════════════════════════════════════════ */}
      <section className="py-24 md:py-32 border-t border-border">
        <div className="container mx-auto px-8 md:px-16 lg:px-20">
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl mb-6 max-w-2xl">
            Ready to go slowly?
          </h2>
          <p className="text-foreground/50 max-w-lg mb-10 leading-relaxed">
            No forms. No packages. Just a conversation about what you&apos;re hoping to find.
          </p>
          <Link href="/plan-your-trip"
            className="inline-block border border-foreground px-10 py-4 text-xs tracking-[0.15em] uppercase hover:bg-foreground hover:text-background transition-colors">
            Plan your trip
          </Link>
        </div>
      </section>

    </div>
  );
}
