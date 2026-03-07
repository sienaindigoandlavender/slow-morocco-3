"use client";

import ControlBar from "@/components/ControlBar";

import { useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { Search } from "lucide-react";
import PageBanner from "@/components/PageBanner";

interface Story {
  slug: string;
  title: string;
  subtitle?: string;
  mood?: string;
  heroImage?: string;
  excerpt?: string;
}

interface StoriesContentProps {
  initialStories: Story[];
  dataLoaded?: boolean;
}

const STORIES_PER_PAGE = 12;

export default function StoriesContent({
  initialStories,
  dataLoaded = true,
}: StoriesContentProps) {
  const [activeFilter, setActiveFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState<"default" | "alpha">("default");

  const filters = [
    { id: "all", label: "All" },
    { id: "fierce", label: "Fierce" },
    { id: "tender", label: "Tender" },
    { id: "sacred", label: "Sacred" },
    { id: "golden", label: "Golden" },
  ];

  // Filter and search stories
  const filteredStories = useMemo(() => {
    let result = initialStories;

    if (activeFilter !== "all") {
      result = result.filter(
        (s) => s.mood?.toLowerCase() === activeFilter.toLowerCase()
      );
    }

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (s) =>
          s.title.toLowerCase().includes(query) ||
          s.subtitle?.toLowerCase().includes(query) ||
          s.excerpt?.toLowerCase().includes(query)
      );
    }

    if (sortBy === "alpha") {
      result = [...result].sort((a, b) => a.title.localeCompare(b.title));
    }

    return result;
  }, [initialStories, activeFilter, searchQuery, sortBy]);

  // When filtering/searching, skip the editorial layout and go straight to grid
  const isFiltered = activeFilter !== "all" || searchQuery.trim() !== "" || sortBy === "alpha";

  // Editorial splits — only on page 1 with no filters
  const leadStory = !isFiltered && currentPage === 1 ? filteredStories[0] : null;
  const secondaryStories = !isFiltered && currentPage === 1 ? filteredStories.slice(1, 4) : [];
  const remainingStories = !isFiltered && currentPage === 1
    ? filteredStories.slice(4)
    : filteredStories;

  // Pagination on the remaining grid
  const totalPages = Math.ceil(remainingStories.length / STORIES_PER_PAGE);
  const startIndex = isFiltered ? (currentPage - 1) * STORIES_PER_PAGE : 0;
  const paginatedStories = isFiltered
    ? remainingStories.slice(startIndex, startIndex + STORIES_PER_PAGE)
    : currentPage === 1
      ? remainingStories.slice(0, STORIES_PER_PAGE)
      : remainingStories.slice((currentPage - 2) * STORIES_PER_PAGE, (currentPage - 2) * STORIES_PER_PAGE + STORIES_PER_PAGE);

  const goToPage = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 400, behavior: "smooth" });
  };

  const handleFilterChange = (id: string) => {
    setActiveFilter(id);
    setCurrentPage(1);
  };

  const handleSortChange = () => {
    setSortBy(sortBy === "default" ? "alpha" : "default");
    setCurrentPage(1);
  };

  const handleSearchChange = (value: string) => {
    setSearchQuery(value);
    setCurrentPage(1);
  };

  return (
    <div className="bg-background min-h-screen">
      {/* Hero Banner */}
      <PageBanner
        slug="stories"
        fallback={{
          title: "Stories worth knowing",
          subtitle:
            "The history, craft, and culture that make Morocco make sense. Understanding its layers transforms a trip into a revelation.",
          label: "The Edit",
        }}
      />

      {/* ── Dateline bar — search + filters + count ──────────────── */}
      <div className="border-b border-border sticky top-20 md:top-24 bg-background z-40">
        <div className="container mx-auto px-8 md:px-16 lg:px-20">
          <div className="flex items-center justify-between py-4 gap-8">
            {/* Filters */}
            <div className="flex items-center gap-6 overflow-x-auto scrollbar-hide">
              {filters.map((filter) => (
                <button
                  key={filter.id}
                  onClick={() => handleFilterChange(filter.id)}
                  className={`text-[11px] tracking-[0.15em] uppercase whitespace-nowrap pb-1 transition-colors ${
                    activeFilter === filter.id
                      ? "text-foreground border-b border-foreground"
                      : "text-foreground/70 hover:text-foreground/70"
                  }`}
                >
                  {filter.label}
                </button>
              ))}
            </div>

            {/* Search + count */}
            <div className="flex items-center gap-6 flex-shrink-0">
              <div className="relative hidden md:block">
                <Search className="absolute left-0 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-foreground/70" />
                <input
                  type="text"
                  placeholder="Search..."
                  value={searchQuery}
                  onChange={(e) => handleSearchChange(e.target.value)}
                  className="w-48 bg-transparent border-b border-foreground/15 py-2 pl-6 pr-2 text-sm text-foreground placeholder:text-foreground/70 focus:border-foreground focus:outline-none transition-colors"
                />
              </div>
              <p className="text-[10px] tracking-[0.2em] uppercase font-mono text-foreground/70 whitespace-nowrap">
                {filteredStories.length} {filteredStories.length === 1 ? "story" : "stories"}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ── Mobile search ────────────────────────────────────────── */}
      <div className="md:hidden px-8 py-6">
        <div className="relative">
          <Search className="absolute left-0 top-1/2 -translate-y-1/2 w-4 h-4 text-foreground/70" />
          <input
            type="text"
            placeholder="Search stories..."
            value={searchQuery}
            onChange={(e) => handleSearchChange(e.target.value)}
            className="w-full bg-transparent border-b border-foreground/20 py-3 pl-8 pr-4 text-foreground placeholder:text-foreground/70 focus:border-foreground focus:outline-none transition-colors"
          />
        </div>
      </div>

      {!dataLoaded ? (
        /* ── Empty state ─────────────────────────────────────────── */
        <section className="py-12 container mx-auto px-8 md:px-16 lg:px-20">
          <div className="max-w-3xl">
            <h2 className="font-serif text-2xl md:text-3xl text-foreground mb-6">Explore Our Stories</h2>
            <div className="space-y-4 text-foreground/70 leading-relaxed">
              <p><strong className="text-foreground">Fierce</strong> — Stories of resilience, resistance, and the raw edges of Moroccan history and identity.</p>
              <p><strong className="text-foreground">Tender</strong> — Intimate portraits of craft, family, and the quiet traditions that hold communities together.</p>
              <p><strong className="text-foreground">Sacred</strong> — The spiritual dimensions of Morocco — Sufi shrines, Gnawa ceremonies, and the spaces where faith lives.</p>
              <p><strong className="text-foreground">Golden</strong> — Light, beauty, and the moments where Morocco reveals itself as something extraordinary.</p>
            </div>
          </div>
        </section>
      ) : filteredStories.length === 0 ? (
        /* ── No results ──────────────────────────────────────────── */
        <div className="text-center py-20">
          <p className="text-foreground/70 mb-4">
            {searchQuery ? "No stories match your search." : "No stories match this filter."}
          </p>
          <button
            onClick={() => { setActiveFilter("all"); setSearchQuery(""); }}
            className="text-sm underline text-foreground/70 hover:text-foreground transition-colors"
          >
            View all stories
          </button>
        </div>
      ) : (
        <>
          {/* ═══════════════════════════════════════════════════════════
              EDITORIAL LEAD — featured story + secondary stories
              Only on page 1 with no active filters
              ═══════════════════════════════════════════════════════════ */}
          {leadStory && (
            <section className="border-b border-border">
              <div className="container mx-auto px-8 md:px-16 lg:px-20 py-14 md:py-20">
                <div className="grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-0 lg:gap-16 lg:divide-x lg:divide-border">

                  {/* LEAD — dominant story */}
                  <div>
                    <Link href={`/stories/${leadStory.slug}`} className="group block">
                      <div className="aspect-[16/10] relative overflow-hidden bg-[#d4cdc4] mb-6">
                        {leadStory.heroImage && (
                          <Image
                            src={leadStory.heroImage}
                            alt={leadStory.title}
                            fill
                            unoptimized
                            className="object-cover group-hover:scale-[1.02] transition-transform duration-700"
                          />
                        )}
                      </div>
                      {leadStory.mood && (
                        <p className="text-[10px] tracking-[0.3em] uppercase text-foreground/70 mb-3">
                          {leadStory.mood}
                        </p>
                      )}
                      <h2 className="font-serif text-2xl md:text-3xl lg:text-4xl leading-[1.2] mb-4 group-hover:text-foreground/70 transition-colors max-w-2xl">
                        {leadStory.title}
                      </h2>
                      {leadStory.subtitle && (
                        <p className="font-serif italic text-lg text-foreground/70 mb-4 max-w-xl">
                          {leadStory.subtitle}
                        </p>
                      )}
                      {leadStory.excerpt && (
                        <p className="text-sm text-foreground/70 leading-relaxed max-w-prose line-clamp-3">
                          {leadStory.excerpt}
                        </p>
                      )}
                    </Link>
                  </div>

                  {/* SECONDARY — stacked list */}
                  {secondaryStories.length > 0 && (
                    <div className="lg:pl-10 mt-10 lg:mt-0 pt-8 lg:pt-0 border-t lg:border-t-0 border-border">
                      <p className="text-[9px] tracking-[0.3em] uppercase text-foreground/70 font-mono mb-5">
                        Also in the archive
                      </p>
                      <div className="space-y-0 divide-y divide-border">
                        {secondaryStories.map((story) => (
                          <Link
                            key={story.slug}
                            href={`/stories/${story.slug}`}
                            className="group flex gap-5 py-5"
                          >
                            <div className="w-20 h-20 relative overflow-hidden bg-[#d4cdc4] flex-shrink-0">
                              {story.heroImage && (
                                <Image
                                  src={story.heroImage}
                                  alt={story.title}
                                  fill
                                  unoptimized
                                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                                />
                              )}
                            </div>
                            <div className="flex-1 min-w-0 flex flex-col justify-center">
                              {story.mood && (
                                <p className="text-[9px] tracking-[0.2em] uppercase text-foreground/70 mb-1.5">
                                  {story.mood}
                                </p>
                              )}
                              <h3 className="font-serif text-base leading-snug group-hover:text-foreground/70 transition-colors line-clamp-2">
                                {story.title}
                              </h3>
                            </div>
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </section>
          )}

          {/* ═══════════════════════════════════════════════════════════
              THE ARCHIVE — clean grid, all stories equal
              ═══════════════════════════════════════════════════════════ */}
          <section className="py-14 md:py-20">
            <div className="container mx-auto px-8 md:px-16 lg:px-20">

              {/* Section header — only when editorial lead is showing */}
              {leadStory && (
                <div className="flex items-baseline justify-between mb-10 pb-4 border-b border-border">
                  <p className="text-[10px] tracking-[0.35em] uppercase text-foreground/70 font-mono">
                    The archive
                  </p>
                  <button
                    onClick={handleSortChange}
                    className={`text-[10px] tracking-[0.2em] uppercase font-mono transition-colors ${
                      sortBy === "alpha"
                        ? "text-foreground"
                        : "text-foreground/70 hover:text-foreground/70"
                    }`}
                  >
                    A → Z
                  </button>
                </div>
              )}

              {/* Grid */}
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-x-4 gap-y-10">
                {paginatedStories.map((story) => (
                  <article key={story.slug} itemScope itemType="https://schema.org/Article">
                    <Link
                      href={`/stories/${story.slug}`}
                      className="group"
                    >
                      <div className="aspect-[3/4] relative overflow-hidden bg-[#f0f0f0] mb-3">
                        {story.heroImage && (
                          <Image
                            src={story.heroImage}
                            alt={story.title}
                            fill
                            sizes="(max-width: 768px) 50vw, 20vw"
                            unoptimized
                            className="object-cover group-hover:scale-[1.03] transition-transform duration-700"
                            itemProp="image"
                          />
                        )}
                      </div>
                      {story.mood && (
                        <p className="text-[11px] text-foreground/70 mb-1">
                          {story.mood}
                        </p>
                      )}
                      <h3 className="text-[13px] tracking-[0.04em] uppercase leading-snug text-foreground group-hover:text-foreground/70 transition-colors" itemProp="headline">
                        {story.title}
                      </h3>
                      {story.excerpt && (
                        <p className="text-[12px] text-foreground/70 leading-relaxed mt-1 line-clamp-2" itemProp="description">
                          {story.excerpt}
                        </p>
                      )}
                    </Link>
                  </article>
                ))}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="mt-16">
                  <ControlBar
                    count={filteredStories.length}
                    noun="story"
                    sortBy={sortBy}
                    onSortChange={handleSortChange}
                    currentPage={currentPage}
                    totalPages={isFiltered ? totalPages : totalPages + 1}
                    onPageChange={goToPage}
                    showCount={false}
                    showSort={false}
                  />
                </div>
              )}
            </div>
          </section>

          {/* ═══════════════════════════════════════════════════════════
              SEO paragraph — always rendered for crawlers
              ═══════════════════════════════════════════════════════════ */}
          <section className="border-t border-border py-14 md:py-20">
            <div className="container mx-auto px-8 md:px-16 lg:px-20">
              <div className="max-w-3xl">
                <p className="text-foreground/70 leading-relaxed text-sm">
                  Cultural essays, artisan profiles, and deep-cuts from life in Morocco. Each story explores a thread of the country&apos;s living heritage — from Gnawa music and Amazigh weaving traditions to the architecture of Fes and the silence of the Sahara. {filteredStories.length} stories and growing.
                </p>
              </div>
            </div>
          </section>
        </>
      )}
    </div>
  );
}
