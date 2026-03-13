"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import type { DarijaPhrase } from "@/lib/darija";

function formatCategoryLabel(cat: string): string {
  return cat.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
}

export default function PhrasesClient({
  phrases,
  initialCategory,
}: {
  phrases: DarijaPhrase[];
  initialCategory: string | null;
}) {
  const [activeCategory, setActiveCategory] = useState<string | null>(
    initialCategory
  );
  const [search, setSearch] = useState("");

  const categories = useMemo(() => {
    return Array.from(new Set(phrases.map((p) => p.category))).sort();
  }, [phrases]);

  const filtered = useMemo(() => {
    let result = phrases;

    if (activeCategory) {
      result = result.filter((p) => p.category === activeCategory);
    }

    if (search.trim()) {
      const q = search.trim().toLowerCase();
      result = result.filter(
        (p) =>
          p.darija.toLowerCase().includes(q) ||
          p.english.toLowerCase().includes(q) ||
          p.french.toLowerCase().includes(q) ||
          p.arabic.includes(q)
      );
    }

    return result;
  }, [phrases, activeCategory, search]);

  // Group by category for display
  const grouped = useMemo(() => {
    const map = new Map<string, DarijaPhrase[]>();
    for (const p of filtered) {
      const arr = map.get(p.category) || [];
      arr.push(p);
      map.set(p.category, arr);
    }
    return Array.from(map.entries()).sort(([a], [b]) => a.localeCompare(b));
  }, [filtered]);

  return (
    <>
      {/* Search */}
      <div className="border-y border-border py-6">
        <div className="px-8 md:px-[8%] lg:px-[12%]">
          <input
            type="text"
            placeholder="Search phrases..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full max-w-xl bg-transparent text-foreground font-serif text-lg placeholder:text-foreground/30 outline-none"
          />
        </div>
      </div>

      {/* Category pills */}
      <div className="border-b border-border py-4 overflow-x-auto">
        <div className="px-8 md:px-[8%] lg:px-[12%]">
          <div className="flex gap-2 flex-wrap">
            <button
              onClick={() => setActiveCategory(null)}
              className={`text-xs px-3 py-1.5 transition-colors font-sans ${
                !activeCategory
                  ? "bg-foreground text-background"
                  : "bg-foreground/5 text-foreground/60 hover:bg-foreground/10"
              }`}
            >
              All
            </button>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() =>
                  setActiveCategory(activeCategory === cat ? null : cat)
                }
                className={`text-xs px-3 py-1.5 transition-colors font-sans ${
                  activeCategory === cat
                    ? "bg-foreground text-background"
                    : "bg-foreground/5 text-foreground/60 hover:bg-foreground/10"
                }`}
              >
                {formatCategoryLabel(cat)}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Results count */}
      <div className="py-4 border-b border-border">
        <div className="px-8 md:px-[8%] lg:px-[12%]">
          <p className="text-xs text-foreground/40 font-sans">
            {filtered.length.toLocaleString()} phrases
            {activeCategory && ` in ${formatCategoryLabel(activeCategory)}`}
            {search && ` matching "${search}"`}
          </p>
        </div>
      </div>

      {/* Phrases grouped by category */}
      <main className="py-8 md:py-12">
        <div className="px-8 md:px-[8%] lg:px-[12%]">
          <div className="max-w-3xl">
            {grouped.length === 0 ? (
              <p className="text-foreground/40 font-serif py-12">
                No phrases found.
              </p>
            ) : (
              grouped.map(([category, items]) => (
                <section key={category} className="mb-16">
                  <h2 className="font-serif text-2xl md:text-3xl mb-8">
                    {formatCategoryLabel(category)}
                  </h2>
                  <div className="space-y-8">
                    {items.map((phrase) => (
                      <div
                        key={phrase.id}
                        className="border-b border-border/50 pb-8"
                      >
                        <p className="font-serif text-xl mb-1">
                          {phrase.darija}
                        </p>
                        <p
                          className="text-foreground/50 text-base mb-2"
                          dir="rtl"
                          lang="ar"
                        >
                          {phrase.arabic}
                        </p>
                        <p className="text-foreground/70 font-serif mb-1">
                          {phrase.english}
                        </p>
                        <p className="text-sm text-foreground/40 italic font-serif mb-1">
                          {phrase.french}
                        </p>
                        <p className="text-xs text-foreground/40 italic font-serif">
                          /{phrase.pronunciation}/
                        </p>

                        {phrase.cultural_note && (
                          <p className="text-sm text-foreground/50 mt-3 font-serif italic">
                            {phrase.cultural_note}
                          </p>
                        )}

                        {phrase.response && (
                          <div className="mt-4 pl-4 border-l-2 border-border">
                            <p className="text-[10px] tracking-[0.2em] uppercase text-foreground/30 mb-2 font-sans">
                              Expected Reply
                            </p>
                            <p className="font-serif">
                              {phrase.response.darija}
                            </p>
                            <p
                              className="text-foreground/50 text-sm"
                              dir="rtl"
                              lang="ar"
                            >
                              {phrase.response.arabic}
                            </p>
                            <p className="text-foreground/60 text-sm font-serif">
                              {phrase.response.english}
                            </p>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </section>
              ))
            )}
          </div>
        </div>
      </main>

      {/* Back link */}
      <section className="py-8 border-t border-border">
        <div className="px-8 md:px-[8%] lg:px-[12%]">
          <Link
            href="/darija"
            className="text-sm text-foreground/40 hover:text-foreground transition-colors"
          >
            &larr; Back to Darija
          </Link>
        </div>
      </section>
    </>
  );
}
