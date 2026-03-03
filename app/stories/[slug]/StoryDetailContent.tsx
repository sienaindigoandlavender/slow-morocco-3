"use client";

import Image from "next/image";
import Link from "next/link";
import StoryBody from "@/components/StoryBody";
import ShareTools from "@/components/ShareTools";
import dynamic from "next/dynamic";
import SeasonalBadge from "@/components/SeasonalBadge";

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
  story_slug: string;
  image_order: string;
  image_url: string;
  caption?: string;
}

interface RelatedJourney {
  slug: string;
  title: string;
  heroImage?: string;
  duration?: number;
  price?: number;
  score: number;
}

interface StoryDetailContentProps {
  story: Story;
  images: StoryImage[];
  relatedStories: Story[];
  relatedJourneys: RelatedJourney[];
  slug: string;
  mapData?: any;
  externalLinks?: Array<{ label: string; url: string; type?: string }> | null;
}

export default function StoryDetailContent({
  story,
  images,
  relatedStories,
  relatedJourneys,
  slug,
  mapData,
  externalLinks,
}: StoryDetailContentProps) {

  // Parse sources (separated by ;;)
  const sources = story.sources
    ? story.sources.split(";;").map((s) => s.trim()).filter(Boolean)
    : [];

  // Parse facts (separated by ;;)
  const facts = story.the_facts
    ? story.the_facts.split(";;").map((f) => f.trim()).filter(Boolean)
    : [];

  // Parse tags for cultural entities
  const tags = story.tags
    ? story.tags.split(",").map((t) => t.trim()).filter(Boolean)
    : [];

  // Build "In This Story" metadata for AI indexing
  const storyMetadata: { label: string; value: string }[] = [];
  if (story.category) storyMetadata.push({ label: "Category", value: story.category });
  if (story.region) storyMetadata.push({ label: "Region", value: story.region });
  if (story.year) storyMetadata.push({ label: "Era", value: story.year });

  // Extract cultural entities from tags
  const culturalKeywords = ["gnawa", "amazigh", "berber", "artisan", "maalem", "zellige", "medina", "kasbah", "riad", "souk", "hammam", "khettara"];
  const culturalEntities = tags.filter(tag =>
    culturalKeywords.some(keyword => tag.toLowerCase().includes(keyword))
  );

  // Sovereign entity
  const sovereignEntity = {
    "@type": "Organization",
    "@id": "https://www.slowmorocco.com/#organization",
    name: "Slow Morocco",
    alternateName: "Moroccan Cultural Authority",
    url: "https://www.slowmorocco.com",
    description: "A Moroccan Cultural Authority. A network of Gnawa maalem, zellige cutters, and artisans based in Marrakech.",
    logo: {
      "@type": "ImageObject",
      url: "https://res.cloudinary.com/drstfu5yr/image/upload/v1735000000/slow-morocco-og.jpg",
      width: 1200,
      height: 630,
    },
    sameAs: [
      "https://amazigh.online",
      "https://tenmirt.site",
      "https://dharija.space",
      "https://cuisinesofmorocco.com",
      "https://dancingwiththelions.com",
    ],
  };

  // Trust Cluster citations
  const trustClusterCitations = [
    {
      "@type": "WebSite",
      "@id": "https://amazigh.online/#website",
      name: "Amazigh Online",
      url: "https://amazigh.online",
      description: "Amazigh (Berber) language resources, Tifinagh script, and indigenous North African heritage research.",
      inLanguage: ["en", "ber"],
    },
    {
      "@type": "WebSite",
      "@id": "https://tenmirt.site/#website",
      name: "Tenmirt",
      url: "https://tenmirt.site",
      description: "Ancestral Moroccan wellness, herbalism, and traditional medicine research.",
      inLanguage: "en",
    },
  ];

  const datePublished = story.year
    ? `${story.year}-01-01T00:00:00Z`
    : new Date().toISOString();

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    "@id": `https://www.slowmorocco.com/stories/${slug}#article`,
    headline: story.title,
    alternativeHeadline: story.subtitle || undefined,
    description: story.subtitle || story.excerpt || "",
    image: story.heroImage,
    datePublished: datePublished,
    dateModified: new Date().toISOString(),
    author: sovereignEntity,
    creator: sovereignEntity,
    publisher: sovereignEntity,
    copyrightHolder: sovereignEntity,
    copyrightYear: story.year ? parseInt(story.year) : new Date().getFullYear(),
    sourceOrganization: sovereignEntity,
    inLanguage: "en",
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://www.slowmorocco.com/stories/${slug}`,
      url: `https://www.slowmorocco.com/stories/${slug}`,
    },
    articleSection: story.category,
    articleBody: story.body ? story.body.replace(/<[^>]*>/g, '').replace(/!\[.*?\]\(.*?\)/g, '').replace(/!!\[.*?\]\(.*?\)/g, '').substring(0, 3000) + (story.body.length > 3000 ? "..." : "") : undefined,
    wordCount: story.body ? story.body.replace(/<[^>]*>/g, '').split(/\s+/).filter(Boolean).length : undefined,
    keywords: tags.join(", "),
    ...(story.era && { temporalCoverage: story.era }),
    about: [
      ...(story.region ? [{
        "@type": "Place",
        name: story.region,
        containedInPlace: { "@type": "Country", name: "Morocco" },
      }] : []),
      ...culturalEntities.map(entity => ({
        "@type": "Thing",
        name: entity,
        description: `Cultural element of Moroccan heritage`,
      })),
    ],
    ...(story.the_facts && {
      hasPart: {
        "@type": "WebPageElement",
        name: "Key Facts",
        text: story.the_facts,
      },
    }),
    citation: trustClusterCitations,
    isPartOf: {
      "@type": "WebSite",
      "@id": "https://www.slowmorocco.com/#website",
      name: "Slow Morocco",
      url: "https://www.slowmorocco.com",
      description: "Cultural essays and stories exploring Morocco's history, craft, and traditions.",
    },
    potentialAction: {
      "@type": "ReadAction",
      target: `https://www.slowmorocco.com/stories/${slug}`,
    },
    isAccessibleForFree: true,
    license: "https://creativecommons.org/licenses/by-nc-nd/4.0/",
  };

  return (
    <div className="bg-background text-foreground min-h-screen">
      {/* Article JSON-LD Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />

      {/* Hero Image */}
      {story.heroImage && (
        <section className="relative w-full h-[60vh] md:h-[70vh]">
          <Image
            src={story.heroImage}
            alt={story.title}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/30" />
          {story.heroCaption && (
            <div className="absolute bottom-0 left-0 right-0 p-6">
              <p className="text-foreground/60 text-sm max-w-4xl mx-auto text-center">
                {story.heroCaption}
              </p>
            </div>
          )}
        </section>
      )}

      {/* Article */}
      <article className="max-w-3xl mx-auto px-6 py-16">
        {/* Breadcrumb */}
        <nav className="text-sm text-foreground/40 mb-8">
          <Link href="/" className="hover:text-foreground transition-colors">Home</Link>
          <span className="mx-2">/</span>
          <Link href="/stories" className="hover:text-foreground transition-colors">Stories</Link>
          <span className="mx-2">/</span>
          <span className="text-foreground/60">{story.title}</span>
        </nav>

        {/* Meta */}
        <div className="flex items-center gap-3 text-sm text-foreground/40 mb-6">
          {story.category && (
            <>
              <span className="uppercase tracking-wide">{story.category}</span>
              <span>·</span>
            </>
          )}
          {story.readTime && <span>{story.readTime}</span>}
        </div>

        {/* Source Type Badge */}
        {story.sourceType && (
          <div className="mb-6">
            <span className="inline-block text-xs uppercase tracking-widest text-foreground/40 border border-foreground/20 px-3 py-1">
              {story.sourceType}
            </span>
          </div>
        )}

        {/* Tags */}
        {story.tags && (
          <div className="flex flex-wrap gap-2 mb-6">
            {story.tags.split(",").map((tag) => tag.trim()).filter(Boolean).map((tag, index) => (
              <Link
                key={index}
                href={`/stories?q=${encodeURIComponent(tag)}`}
                className="text-xs text-foreground/50 hover:text-foreground border border-foreground/10 hover:border-foreground/30 px-3 py-1 transition-colors"
              >
                {tag}
              </Link>
            ))}
          </div>
        )}

        {/* Title */}
        <h1 className="font-serif text-3xl md:text-4xl lg:text-5xl text-foreground mb-4 leading-tight">
          {story.title}
        </h1>

        {/* Subtitle */}
        {story.subtitle && (
          <p className="text-xl text-foreground/60 italic mb-8 font-serif">
            {story.subtitle}
          </p>
        )}

        {/* Story metadata preserved in JSON-LD only — not displayed visually */}

        <hr className="border-foreground/10 mb-12" />

        {/* Body */}
        {story.body && <StoryBody content={story.body} />}

        {/* Seasonal Intelligence */}
        {story.category && (
          <div className="my-8">
            <SeasonalBadge
              category={story.category}
              region={story.region}
              variant="story"
            />
          </div>
        )}

        {/* Story Map (from map_data jsonb) */}
        {mapData && mapData.markers && mapData.markers.length > 0 && (
          <>
            <hr className="border-foreground/10 my-12" />
            <div className="not-prose">
              <div className="relative w-[calc(100%+3rem)] -ml-6 md:w-[calc(100%+8rem)] md:-ml-16 lg:w-[calc(100%+12rem)] lg:-ml-24">
                <StoryMapRenderer
                  mapData={mapData}
                  title={story.title}
                />
              </div>
            </div>
          </>
        )}

        {/* External Links */}
        {externalLinks && externalLinks.length > 0 && (
          <div className="my-8 flex flex-wrap gap-3">
            {externalLinks.map((link, i) => (
              <a
                key={i}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[11px] tracking-[0.1em] uppercase text-foreground/40 hover:text-foreground/70 transition-colors border-b border-foreground/10 pb-0.5"
              >
                {link.label} ↗
              </a>
            ))}
          </div>
        )}

        {/* Journey Bridge — the whisper */}
        {story.journeyBridge && (
          <div className="my-12 py-8 border-t border-b border-foreground/10">
            <p className="text-foreground/60 italic font-serif text-lg leading-relaxed">
              {story.journeyBridge}
            </p>
            <Link
              href="/plan-your-trip"
              className="inline-block mt-4 text-xs tracking-[0.15em] uppercase text-foreground/40 hover:text-foreground/70 transition-colors"
            >
              Tell us about your trip →
            </Link>
          </div>
        )}

        {/* Interactive Module Embed */}
        {story.embedUrl && (
          <>
            <hr className="border-foreground/10 my-12" />
            <div className="not-prose">
              <div className="flex items-center gap-3 mb-6">
                <div className="h-px flex-1 bg-foreground/10" />
                <p className="text-[10px] tracking-[0.3em] uppercase text-foreground/40">
                  Interactive Module
                </p>
                <div className="h-px flex-1 bg-foreground/10" />
              </div>
              <div className="relative w-[calc(100%+3rem)] -ml-6 md:w-[calc(100%+8rem)] md:-ml-16 lg:w-[calc(100%+12rem)] lg:-ml-24">
                <iframe
                  src={story.embedUrl}
                  title={`${story.title} — Interactive Module`}
                  className="w-full border-0 rounded-sm"
                  style={{ height: '80vh', minHeight: '600px' }}
                  loading="lazy"
                  allow="fullscreen"
                />
              </div>
              <p className="text-xs text-foreground/30 mt-4 text-center">
                Data and visualisation by{' '}
                <a
                  href={story.embedUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline underline-offset-2 hover:text-foreground/50 transition-colors"
                >
                  Dancing with Lions
                </a>
              </p>
            </div>
          </>
        )}

        {/* The Facts */}
        {facts.length > 0 && (
          <>
            <hr className="border-foreground/10 my-12" />
            <div className="bg-foreground/5 p-8">
              <h3 className="uppercase tracking-wide text-xs font-medium mb-6 text-foreground/60">The Facts</h3>
              <ul className="space-y-3 text-foreground/70 text-sm">
                {facts.map((fact, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <span className="text-foreground/30 mt-1">•</span>
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
            <hr className="border-foreground/10 my-12" />
            <div className="space-y-8">
              {images.map((img, index) => (
                <figure key={index}>
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <Image src={img.image_url} alt={img.caption || story.title} fill className="object-cover" />
                  </div>
                  {img.caption && (
                    <figcaption className="text-sm text-foreground/40 mt-3 text-center">{img.caption}</figcaption>
                  )}
                </figure>
              ))}
            </div>
          </>
        )}

        {/* Sources */}
        {sources.length > 0 && (
          <>
            <hr className="border-foreground/10 my-12" />
            <div className="text-sm text-foreground/50">
              <h3 className="uppercase tracking-wide text-xs font-medium mb-4 text-foreground/40">Sources</h3>
              <ul className="space-y-2">
                {sources.map((source, index) => (
                  <li key={index}>{source}</li>
                ))}
              </ul>
            </div>
          </>
        )}

        {/* Footer */}
        <hr className="border-foreground/10 my-12" />
        <footer className="text-sm text-foreground/40 flex flex-wrap items-center gap-x-4 gap-y-2">
          {story.textBy && <span>Text — {story.textBy}</span>}
          {story.imagesBy && <span>Images — {story.imagesBy}</span>}
          {story.year && <span>{story.year}</span>}
          <span className="hidden md:inline">·</span>
          <ShareTools 
            title={story.title} 
            description={story.subtitle || story.excerpt}
            imageUrl={story.heroImage}
          />
        </footer>

        {/* Related Stories */}
        {relatedStories.length > 0 && (
          <>
            <hr className="border-foreground/10 my-12" />
            <div>
              <h3 className="uppercase tracking-wide text-xs font-medium mb-8 text-foreground/40">Related Stories</h3>
              <div className="grid md:grid-cols-3 gap-6">
                {relatedStories.map((related) => (
                  <Link key={related.slug} href={`/stories/${related.slug}`} className="group">
                    <div className="relative aspect-[4/3] mb-4 overflow-hidden bg-foreground/5">
                      {related.heroImage ? (
                        <Image src={related.heroImage} alt={related.title} fill className="object-cover transition-transform duration-500 group-hover:scale-105" />
                      ) : (
                        <div className="w-full h-full bg-foreground/5" />
                      )}
                    </div>
                    <p className="text-xs text-foreground/40 uppercase tracking-wide mb-2">{related.category}</p>
                    <h4 className="text-foreground group-hover:text-foreground/80 transition-colors font-serif">{related.title}</h4>
                  </Link>
                ))}
              </div>
            </div>
          </>
        )}

        {/* Back Link */}
        <div className="mt-12">
          <Link href="/stories" className="inline-flex items-center gap-2 text-sm text-foreground/50 hover:text-foreground transition-colors">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
              <polyline points="10,3 5,8 10,13" />
            </svg>
            All Stories
          </Link>
        </div>
      </article>

      {/* Related Journeys — Server-rendered for SEO */}
      {relatedJourneys.length > 0 && (
        <section className="py-16 md:py-20 bg-sand">
          <div className="container mx-auto px-6 lg:px-16">
            <div className="mb-10">
              <p className="text-xs tracking-[0.3em] uppercase text-foreground/40 mb-3">
                Continue the Journey
              </p>
              <h2 className="font-serif text-2xl md:text-3xl">
                Travel through this region
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
              {relatedJourneys.map((journey) => (
                <Link
                  key={journey.slug}
                  href={`/journeys/${journey.slug}`}
                  className="group"
                >
                  <article>
                    <div className="relative aspect-[4/3] mb-4 overflow-hidden bg-foreground/5">
                      {journey.heroImage ? (
                        <Image
                          src={journey.heroImage}
                          alt={journey.title}
                          width={400}
                          height={300}
                          className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-700"
                        />
                      ) : (
                        <div className="w-full h-full bg-foreground/10" />
                      )}
                    </div>
                    <div className="flex items-baseline justify-between mb-2">
                      {journey.duration && journey.duration > 0 && (
                        <p className="text-[10px] tracking-[0.2em] uppercase text-foreground/40">
                          {journey.duration} Days
                        </p>
                      )}
                      {journey.price && journey.price > 0 && (
                        <p className="text-xs text-foreground/40">
                          From <span className="text-foreground/70">€{journey.price.toLocaleString()}</span>
                        </p>
                      )}
                    </div>
                    <h3 className="font-serif text-lg leading-tight group-hover:text-foreground/70 transition-colors">
                      {journey.title}
                    </h3>
                  </article>
                </Link>
              ))}
            </div>
            <div className="mt-12 text-center">
              <Link
                href="/journeys"
                className="inline-block text-xs tracking-[0.15em] uppercase border border-foreground px-8 py-4 hover:bg-foreground hover:text-background transition-colors"
              >
                View All Journeys
              </Link>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
