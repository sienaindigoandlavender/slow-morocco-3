"use client";

import { useState, useMemo, useCallback } from "react";
import Link from "next/link";
import type { DarijaWord } from "@/lib/darija";

function formatCategoryLabel(cat: string): string {
  return cat.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
}

export default function DictionaryClient({
  words,
  categories,
  initialCategory,
}: {
  words: DarijaWord[];
  categories: string[];
  initialCategory: string | null;
}) {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState<string | null>(
    initialCategory
  );
  const [activeLetter, setActiveLetter] = useState<string | null>(null);

  const filtered = useMemo(() => {
    let result = words;

    if (activeCategory) {
      result = result.filter((w) => w.category === activeCategory);
    }

    if (activeLetter) {
      result = result.filter((w) =>
        w.darija.toLowerCase().startsWith(activeLetter.toLowerCase())
      );
    }

    if (search.trim()) {
      const q = search.trim().toLowerCase();
      result = result.filter(
        (w) =>
          w.darija.toLowerCase().includes(q) ||
          w.english.toLowerCase().includes(q) ||
          w.french.toLowerCase().includes(q) ||
          w.arabic.includes(q)
      );
    }

    return result;
  }, [words, activeCategory, activeLetter, search]);

  // Available first letters from current filtered set (before letter filter)
  const availableLetters = useMemo(() => {
    let base = words;
    if (activeCategory) {
      base = base.filter((w) => w.category === activeCategory);
    }
    if (search.trim()) {
      const q = search.trim().toLowerCase();
      base = base.filter(
        (w) =>
          w.darija.toLowerCase().includes(q) ||
          w.english.toLowerCase().includes(q) ||
          w.french.toLowerCase().includes(q) ||
          w.arabic.includes(q)
      );
    }
    const letters = new Set(base.map((w) => w.darija[0]?.toUpperCase()));
    return Array.from(letters).sort();
  }, [words, activeCategory, search]);

  const handleCategoryClick = useCallback(
    (cat: string | null) => {
      setActiveCategory(cat === activeCategory ? null : cat);
      setActiveLetter(null);
    },
    [activeCategory]
  );

  return (
    <>
      {/* Search */}
      <div className="border-y border-border py-6">
        <div className="px-8 md:px-[8%] lg:px-[12%]">
          <input
            type="text"
            placeholder="Search Darija, English, French, or Arabic..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setActiveLetter(null);
            }}
            className="w-full max-w-xl bg-transparent text-foreground font-serif text-lg placeholder:text-foreground/30 outline-none"
          />
        </div>
      </div>

      {/* Category pills */}
      <div className="border-b border-border py-4 overflow-x-auto">
        <div className="px-8 md:px-[8%] lg:px-[12%]">
          <div className="flex gap-2 flex-wrap">
            <button
              onClick={() => handleCategoryClick(null)}
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
                onClick={() => handleCategoryClick(cat)}
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

      {/* Letter navigation */}
      <div className="border-b border-border py-3">
        <div className="px-8 md:px-[8%] lg:px-[12%]">
          <div className="flex gap-1 flex-wrap">
            {availableLetters.map((letter) => (
              <button
                key={letter}
                onClick={() =>
                  setActiveLetter(activeLetter === letter ? null : letter)
                }
                className={`text-xs w-7 h-7 flex items-center justify-center transition-colors font-sans ${
                  activeLetter === letter
                    ? "bg-foreground text-background"
                    : "text-foreground/50 hover:text-foreground"
                }`}
              >
                {letter}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Results count */}
      <div className="py-4 border-b border-border">
        <div className="px-8 md:px-[8%] lg:px-[12%]">
          <p className="text-xs text-foreground/40 font-sans">
            {filtered.length.toLocaleString()} words
            {activeCategory && ` in ${formatCategoryLabel(activeCategory)}`}
            {activeLetter && ` starting with ${activeLetter}`}
            {search && ` matching "${search}"`}
          </p>
        </div>
      </div>

      {/* Word list */}
      <main className="py-8 md:py-12">
        <div className="px-8 md:px-[8%] lg:px-[12%]">
          <div className="max-w-4xl">
            {filtered.length === 0 ? (
              <p className="text-foreground/40 font-serif py-12">
                No words found.
              </p>
            ) : (
              <div className="space-y-0">
                {filtered.slice(0, 200).map((word) => (
                  <Link
                    key={word.id}
                    href={`/darija/dictionary/${word.id}`}
                    className="flex items-baseline gap-4 md:gap-8 py-4 border-b border-border/50 group hover:bg-foreground/[0.02] -mx-4 px-4 transition-colors"
                  >
                    <span className="font-serif text-lg md:text-xl min-w-[80px] md:min-w-[180px] group-hover:text-foreground/70 transition-colors">
                      {word.darija}
                    </span>
                    <span
                      className="text-foreground/40 text-sm min-w-[60px] md:min-w-[120px] hidden sm:inline"
                      dir="rtl"
                      lang="ar"
                    >
                      {word.arabic}
                    </span>
                    <span className="text-foreground/60 font-serif text-sm flex-1">
                      {word.english}
                    </span>
                    <span className="text-[10px] text-foreground/30 uppercase tracking-wider font-sans hidden md:block">
                      {word.part_of_speech}
                    </span>
                  </Link>
                ))}
                {filtered.length > 200 && (
                  <p className="text-sm text-foreground/40 font-sans py-8">
                    Showing 200 of {filtered.length.toLocaleString()} words.
                    Use search or filters to narrow results.
                  </p>
                )}
              </div>
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
