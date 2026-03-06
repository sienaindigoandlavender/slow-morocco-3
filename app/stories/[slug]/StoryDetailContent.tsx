"use client";

import Image from "next/image";
import Link from "next/link";
import StoryBody from "@/components/StoryBody";
import ShareTools from "@/components/ShareTools";
import SeasonalBadge from "@/components/SeasonalBadge";
import dynamic from "next/dynamic";

const StoryMapRenderer = dynamic(() => import("@/components/StoryMapRenderer"), { ssr: false });

interface Story {
  slug: string;
  title: string;
  subtitle?: string;
  category?: string;
  sourceType?: string;
  heroImage?: string;
  heroCaption?: string;
  excerpt?: string;
  body?: string;
  readTime?: string;
  year?: string;
  textBy?: string;
  imagesBy?: string;
  sources?: string;
  the_facts?: string;
  tags?: string;
  region?: string;
  country?: string;
  era?: string;
  theme?: string;
  embedUrl?: string;
  journeyBridge?: string;
}

interface StoryImage {
  id: number;
  story_slug: string;
  image_url: string;
  caption: string | null;
  attribution: string | null;
  license: string | null;
  license_url: string | null;
  source_url: string | null;
  position: number;
  width: number | null;
  height: number | null;
}

interface RelatedJourney {
  slug: string;
  title: string;
  heroImage?: string;
  duration?: number;
  price?: number;
  score: number;
}

interface NavItem {
  slug: string;
  title: string;
}

interface StoryDetailContentProps {
  story: Story;
  images: StoryImage[];
  relatedStories: Story[];
  relatedJourneys: RelatedJourney[];
  slug: string;
  mapData?: any;
  externalLinks?: Array<{ label: string; url: string; type?: string }> | null;
  prevStory?: NavItem | null;
  nextStory?: NavItem | null;
}

export default function StoryDetailContent({
  story,
  images,
  relatedStories,
  relatedJourneys,
  slug,
  mapData,
  externalLinks,
  prevStory,
  nextStory,
}: StoryDetailContentProps) {
  const sources = story.sources
    ? story.sources.split(";;").map((s) => s.trim()).filter(Boolean)
    : [];

  const facts = story.the_facts
    ? story.the_facts.split(";;").map((f) => f.trim()).filter(Boolean)
    : [];

  const tags = story.tags
    ? story.tags.split(",").map((t) => t.trim()).filter(Boolean)
    : [];

  const culturalKeywords = ["gnawa", "amazigh", "berber", "artisan", "maalem", "zellige", "medina", "kasbah", "riad", "souk", "hammam", "khettara"];
  const culturalEntities = tags.filter(tag =>
    culturalKeywords.some(keyword => tag.toLowerCase().includes(keyword))
  );

  const sovereignEntity = {
    "@type": "Organization",
    "@id": "https://www.slowmorocco.com/#organization",
    name: "Slow Morocco",
    url: "https://www.slowmorocco.com",
  };

  const datePublished = story.year ? `${story.year}-01-01T00:00:00Z` : new Date().toISOString();

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    "@id": `https://www.slowmorocco.com/stories/${slug}#article`,
    headline: story.title,
    alternativeHeadline: story.subtitle || undefined,
    description: story.subtitle || story.excerpt || "",
    image: story.heroImage,
    datePublished,
    dateModified: new Date().toISOString(),
    author: sovereignEntity,
    publisher: sovereignEntity,
    articleSection: story.category,
    keywords: tags.join(", "),
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://www.slowmorocco.com/stories/${slug}`,
    },
    about: [
      ...(story.region ? [{ "@type": "Place", name: story.region, containedInPlace: { "@type": "Country", name: "Morocco" } }] : []),
      ...culturalEntities.map(entity => ({ "@type": "Thing", name: entity })),
    ],
    isAccessibleForFree: true,
    license: "https://creativecommons.org/licenses/by-nc-nd/4.0/",
  };

  return (
    <div className="bg-background text-foreground min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />

      {/* ── Hero ─────────────────────────────────────────────────────── */}
      {story.heroImage && (
        <section className="relative w-full h-[55vh] md:h-[65vh]">
          <Image
            src={story.heroImage}
            alt={story.title}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />
          {story.heroCaption && (
            <p className="absolute bottom-4 left-1/2 -translate-x-1/2 text-[11px] text-white/50 tracking-wide text-center max-w-xl px-6">
              {story.heroCaption}
            </p>
          )}
        </section>
      )}

      {/* ── Article header ───────────────────────────────────────────── */}
      <div className="border-b border-border">
        <div className="container mx-auto px-8 md:px-16 lg:px-20 py-10 md:py-14 max-w-5xl">
          {/* Breadcrumb + prev/next */}
          <div className="flex items-center justify-between mb-6">
            <nav className="flex items-center gap-2 text-[10px] tracking-[0.2em] uppercase text-foreground/30">
              <Link href="/stories" className="hover:text-foreground transition-colors">Explore all stories</Link>
              {story.category && (
                <>
                  <span>/</span>
                  <Link
                    href={`/stories/category/${story.category.toLowerCase()}`}
                    className="hover:text-foreground transition-colors"
                  >
                    {story.category}
                  </Link>
                </>
              )}
            </nav>
            <div className="flex items-center gap-3">
              {prevStory && (
                <Link
                  href={`/stories/${prevStory.slug}`}
                  className="w-9 h-9 flex items-center justify-center border border-foreground/20 hover:border-foreground/40 transition-colors"
                  aria-label={`Previous story: ${prevStory.title}`}
                  title={prevStory.title}
                >
                  <svg className="w-4 h-4 text-foreground/60" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 19l-7-7 7-7" /></svg>
                </Link>
              )}
              {nextStory && (
                <Link
                  href={`/stories/${nextStory.slug}`}
                  className="w-9 h-9 flex items-center justify-center border border-foreground/20 hover:border-foreground/40 transition-colors"
                  aria-label={`Next story: ${nextStory.title}`}
                  title={nextStory.title}
                >
                  <svg className="w-4 h-4 text-foreground/60" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5l7 7-7 7" /></svg>
                </Link>
              )}
            </div>
          </div>

          {/* Title block */}
          <h1 className="font-serif text-3xl md:text-5xl lg:text-6xl leading-[1.1] mb-5 max-w-3xl">
            {story.title}
          </h1>
          {story.subtitle && (
            <p className="font-serif italic text-xl md:text-2xl text-foreground/50 mb-8 max-w-2xl">
              {story.subtitle}
            </p>
          )}

          {/* Meta row */}
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-[11px] tracking-[0.15em] uppercase text-foreground/35">
            {story.textBy && <span>By {story.textBy}</span>}
            {story.year && <span>{story.year}</span>}
            {story.readTime && <span>{story.readTime} min read</span>}
            {story.region && <span>{story.region}</span>}
            <div className="ml-auto">
              <ShareTools
                title={story.title}
                description={story.subtitle || story.excerpt}
                imageUrl={story.heroImage}
              />
            </div>
          </div>
        </div>
      </div>

      {/* ── Two-column body ──────────────────────────────────────────── */}
      <div className="container mx-auto px-8 md:px-16 lg:px-20 max-w-5xl">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_260px] gap-0 lg:gap-16 py-14 md:py-20">

          {/* LEFT — article */}
          <article className="min-w-0">

            {/* Body */}
            {story.body && <StoryBody content={story.body} inlineImages={images} />}

            {/* Seasonal */}
            {story.category && (
              <div className="my-10">
                <SeasonalBadge category={story.category} region={story.region} variant="story" />
              </div>
            )}

            {/* Map */}
            {mapData?.markers?.length > 0 && (
              <>
                <hr className="border-border my-12" />
                <StoryMapRenderer mapData={mapData} title={story.title} />
              </>
            )}

            {/* Journey bridge */}
            {story.journeyBridge && (
              <div className="my-12 py-8 border-t border-b border-border">
                <p className="text-foreground/60 italic font-serif text-lg leading-relaxed">
                  {story.journeyBridge}
                </p>
                <Link
                  href="/plan-your-trip"
                  className="inline-block mt-4 text-[10px] tracking-[0.2em] uppercase text-foreground/40 hover:text-foreground transition-colors"
                >
                  Tell us about your trip →
                </Link>
              </div>
            )}

            {/* Embed */}
            {story.embedUrl && (
              <>
                <hr className="border-border my-12" />
                <div className="text-center mb-4">
                  <p className="text-[10px] tracking-[0.3em] uppercase text-foreground/30">Interactive Module</p>
                </div>
                <iframe
                  src={story.embedUrl}
                  title={`${story.title} — Interactive Module`}
                  className="w-full border-0"
                  style={{ height: "80vh", minHeight: "600px" }}
                  loading="lazy"
                  allow="fullscreen"
                />
                <p className="text-[11px] text-foreground/30 mt-3 text-center">
                  Data and visualisation by{" "}
                  <a href={story.embedUrl} target="_blank" rel="noopener noreferrer" className="underline underline-offset-2">
                    Dancing with Lions
                  </a>
                </p>
              </>
            )}

            {/* Facts */}
            {facts.length > 0 && (
              <>
                <hr className="border-border my-12" />
                <div className="bg-foreground/[0.03] border border-border p-8">
                  <h3 className="text-[10px] tracking-[0.3em] uppercase text-foreground/40 font-mono mb-6">
                    The Facts
                  </h3>
                  <ul className="space-y-3">
                    {facts.map((fact, i) => (
                      <li key={i} className="flex items-start gap-3 text-sm text-foreground/70 leading-relaxed">
                        <span className="text-foreground/25 mt-0.5 flex-shrink-0">—</span>
                        <span>{fact}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </>
            )}

            {/* Gallery */}
            {images.length > 0 && (
              <>
                <hr className="border-border my-12" />
                <div className="space-y-8">
                  {images.map((img, i) => (
                    <figure key={i}>
                      <div className="relative aspect-[16/10] overflow-hidden">
                        <Image src={img.image_url} alt={img.caption || story.title} fill className="object-cover" />
                      </div>
                      {img.caption && (
                        <figcaption className="text-[11px] text-foreground/40 mt-3 text-center italic">
                          {img.caption}
                        </figcaption>
                      )}
                    </figure>
                  ))}
                </div>
              </>
            )}

            {/* Sources */}
            {sources.length > 0 && (
              <>
                <hr className="border-border my-12" />
                <div>
                  <h3 className="text-[10px] tracking-[0.3em] uppercase text-foreground/30 font-mono mb-4">
                    Sources
                  </h3>
                  <ul className="space-y-2">
                    {sources.map((source, i) => (
                      <li key={i} className="text-sm text-foreground/40 leading-relaxed">{source}</li>
                    ))}
                  </ul>
                </div>
              </>
            )}

            {/* Further reading */}
            {externalLinks && externalLinks.length > 0 && (
              <div className="mt-8">
                <h3 className="text-[10px] tracking-[0.3em] uppercase text-foreground/30 font-mono mb-4">
                  Further Reading
                </h3>
                <div className="flex flex-wrap gap-2">
                  {externalLinks.map((link, i) => (
                    <a key={i} href={link.url} target="_blank" rel="noopener noreferrer"
                      className="text-[11px] tracking-[0.1em] uppercase text-foreground/40 hover:text-foreground border border-border hover:border-foreground/30 px-3 py-1.5 transition-colors">
                      {link.label} ↗
                    </a>
                  ))}
                </div>
              </div>
            )}

            {/* Footer + tags */}
            <hr className="border-border my-12" />
            <footer>
              <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-[11px] text-foreground/35 mb-8">
                {story.textBy && <span>Text — {story.textBy}</span>}
                {story.imagesBy && <span>Images — {story.imagesBy}</span>}
                {story.year && <span>{story.year}</span>}
                <span className="text-foreground/20">·</span>
                <span>© Slow Morocco</span>
              </div>

              {/* Tag chips */}
              {tags.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {tags.map((tag, i) => (
                    <Link
                      key={i}
                      href={`/stories?q=${encodeURIComponent(tag)}`}
                      className="text-[10px] tracking-[0.15em] uppercase text-foreground/40 hover:text-foreground border border-border hover:border-foreground/40 px-3 py-1.5 transition-colors"
                    >
                      {tag}
                    </Link>
                  ))}
                </div>
              )}
            </footer>

          </article>

          {/* RIGHT — sticky sidebar */}
          <aside className="hidden lg:block">
            <div className="sticky top-28 space-y-10">

              {/* Category link */}
              {story.category && (
                <div>
                  <p className="text-[9px] tracking-[0.3em] uppercase text-foreground/25 font-mono mb-3">
                    Filed under
                  </p>
                  <Link
                    href={`/stories/category/${story.category.toLowerCase()}`}
                    className="font-serif text-lg text-foreground/60 hover:text-foreground transition-colors"
                  >
                    {story.category}
                  </Link>
                </div>
              )}

              {/* Related stories — numbered */}
              {relatedStories.length > 0 && (
                <div>
                  <p className="text-[9px] tracking-[0.3em] uppercase text-foreground/25 font-mono mb-5 pb-3 border-b border-border">
                    Related stories
                  </p>
                  <div className="space-y-0 divide-y divide-border">
                    {relatedStories.map((s, i) => (
                      <Link key={s.slug} href={`/stories/${s.slug}`} className="group flex gap-3 py-4">
                        <span className="font-serif text-2xl text-foreground/10 leading-none flex-shrink-0 w-6">
                          {i + 1}
                        </span>
                        <div>
                          {s.category && (
                            <p className="text-[9px] tracking-[0.2em] uppercase text-foreground/25 mb-1">
                              {s.category}
                            </p>
                          )}
                          <h4 className="text-sm font-serif leading-snug text-foreground/60 group-hover:text-foreground transition-colors">
                            {s.title}
                          </h4>
                        </div>
                      </Link>
                    ))}
                  </div>
                  <Link
                    href={story.category ? `/stories/category/${story.category.toLowerCase()}` : "/stories"}
                    className="block mt-4 text-[9px] tracking-[0.25em] uppercase text-foreground/25 hover:text-foreground transition-colors"
                  >
                    More {story.category || "stories"} →
                  </Link>
                </div>
              )}

              {/* Journey whisper */}
              {relatedJourneys.length > 0 && (
                <div className="border border-border p-5">
                  <p className="text-[9px] tracking-[0.3em] uppercase text-foreground/25 font-mono mb-4">
                    Travel this region
                  </p>
                  <Link href={`/journeys/${relatedJourneys[0].slug}`} className="group block">
                    {relatedJourneys[0].heroImage && (
                      <div className="relative aspect-[4/3] overflow-hidden mb-3 bg-[#f0f0f0]">
                        <Image
                          src={relatedJourneys[0].heroImage}
                          alt={relatedJourneys[0].title}
                          fill
                          className="object-cover group-hover:scale-[1.02] transition-transform duration-500"
                        />
                      </div>
                    )}
                    <h4 className="font-serif text-sm leading-snug group-hover:text-foreground/60 transition-colors mb-2">
                      {relatedJourneys[0].title}
                    </h4>
                    {relatedJourneys[0].duration && (
                      <p className="text-[10px] tracking-[0.15em] uppercase text-foreground/30">
                        {relatedJourneys[0].duration} days
                      </p>
                    )}
                  </Link>
                  <Link
                    href="/plan-your-trip"
                    className="block mt-4 text-[10px] tracking-[0.2em] uppercase text-foreground/30 hover:text-foreground transition-colors border-t border-border pt-4"
                  >
                    Plan your trip →
                  </Link>
                </div>
              )}

            </div>
          </aside>

        </div>
      </div>

      {/* ── Keep Exploring — full bleed ──────────────────────────────── */}
      {relatedStories.length > 0 && (
        <section className="border-t border-border py-16 md:py-20">
          <div className="container mx-auto px-8 md:px-16 lg:px-20">
            <div className="flex items-baseline justify-between mb-10">
              <div>
                <p className="text-[10px] tracking-[0.35em] uppercase text-foreground/30 font-mono mb-2">
                  Keep exploring
                </p>
                <h2 className="font-serif text-2xl md:text-3xl">
                  More from the archive
                </h2>
              </div>
              <Link
                href="/stories"
                className="text-[10px] tracking-[0.2em] uppercase text-foreground/30 hover:text-foreground transition-colors"
              >
                All stories →
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {relatedStories.map((s) => (
                <Link key={s.slug} href={`/stories/${s.slug}`} className="group">
                  <div className="aspect-[3/2] relative overflow-hidden bg-[#f0f0f0] mb-4">
                    {s.heroImage ? (
                      <Image
                        src={s.heroImage}
                        alt={s.title}
                        fill
                        className="object-cover group-hover:scale-[1.02] transition-transform duration-700"
                      />
                    ) : (
                      <div className="absolute inset-0 bg-[#f0f0f0]" />
                    )}
                  </div>
                  {s.category && (
                    <p className="text-[10px] tracking-[0.25em] uppercase text-foreground/30 mb-2">
                      {s.category}
                    </p>
                  )}
                  <h3 className="font-serif text-lg leading-snug group-hover:text-foreground/60 transition-colors mb-2">
                    {s.title}
                  </h3>
                  {s.excerpt && (
                    <p className="text-sm text-foreground/50 leading-relaxed line-clamp-2">
                      {s.excerpt}
                    </p>
                  )}
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── Related Journeys ─────────────────────────────────────────── */}
      {relatedJourneys.length > 0 && (
        <section className="py-16 md:py-20 bg-[#1a1916] text-white">
          <div className="container mx-auto px-8 md:px-16 lg:px-20">
            <div className="flex items-baseline justify-between mb-10">
              <div>
                <p className="text-[10px] tracking-[0.35em] uppercase text-white/30 font-mono mb-2">
                  Private journeys
                </p>
                <h2 className="font-serif text-2xl md:text-3xl">
                  Travel through this region
                </h2>
              </div>
              <Link
                href="/journeys"
                className="text-[10px] tracking-[0.2em] uppercase text-white/30 hover:text-white transition-colors"
              >
                All journeys →
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
              {relatedJourneys.map((journey) => (
                <Link key={journey.slug} href={`/journeys/${journey.slug}`} className="group">
                  <div className="relative aspect-[4/3] mb-4 overflow-hidden bg-white/10">
                    {journey.heroImage && (
                      <Image
                        src={journey.heroImage}
                        alt={journey.title}
                        fill
                        className="object-cover group-hover:scale-[1.02] transition-transform duration-700"
                      />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                  </div>
                  <div className="flex items-baseline justify-between mb-2">
                    {journey.duration && journey.duration > 0 && (
                      <p className="text-[10px] tracking-[0.2em] uppercase text-white/40">
                        {journey.duration} days
                      </p>
                    )}

                  </div>
                  <h3 className="font-serif text-lg leading-snug group-hover:text-white/60 transition-colors">
                    {journey.title}
                  </h3>
                </Link>
              ))}
            </div>
            <div className="mt-12">
              <Link
                href="/plan-your-trip"
                className="inline-block bg-white text-[#1a1916] px-10 py-4 text-xs tracking-[0.15em] uppercase hover:bg-white/90 transition-colors"
              >
                Plan your trip
              </Link>
            </div>
          </div>
        </section>
      )}

    </div>
  );
}
