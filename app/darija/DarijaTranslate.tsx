"use client";

import { useState, useMemo, useEffect, useRef } from "react";
import Link from "next/link";
import type { DarijaWord, DarijaPhrase } from "@/lib/darija";

export default function DarijaTranslate({
  words,
  phrases,
}: {
  words: DarijaWord[];
  phrases: DarijaPhrase[];
}) {
  const [query, setQuery] = useState("");
  const [direction, setDirection] = useState<"to-darija" | "from-darija">("to-darija");
  const inputRef = useRef<HTMLInputElement>(null);

  const results = useMemo(() => {
    if (!query.trim()) return { words: [], phrases: [] };
    const q = query.trim().toLowerCase();

    let matchedWords: DarijaWord[];
    let matchedPhrases: DarijaPhrase[];

    if (direction === "to-darija") {
      // English/French → Darija
      matchedWords = words.filter(
        (w) =>
          w.english.toLowerCase().includes(q) ||
          w.french.toLowerCase().includes(q)
      );
      matchedPhrases = phrases.filter(
        (p) =>
          p.english.toLowerCase().includes(q) ||
          p.french.toLowerCase().includes(q)
      );
    } else {
      // Darija/Arabic → English
      matchedWords = words.filter(
        (w) =>
          w.darija.toLowerCase().includes(q) ||
          w.arabic.includes(query.trim())
      );
      matchedPhrases = phrases.filter(
        (p) =>
          p.darija.toLowerCase().includes(q) ||
          p.arabic.includes(query.trim())
      );
    }

    // Sort: exact matches first, then starts-with, then contains
    const sortByRelevance = (arr: any[], field: string) => {
      return arr.sort((a, b) => {
        const aVal = a[field].toLowerCase();
        const bVal = b[field].toLowerCase();
        const aExact = aVal === q;
        const bExact = bVal === q;
        if (aExact && !bExact) return -1;
        if (!aExact && bExact) return 1;
        const aStarts = aVal.startsWith(q);
        const bStarts = bVal.startsWith(q);
        if (aStarts && !bStarts) return -1;
        if (!aStarts && bStarts) return 1;
        return 0;
      });
    };

    const sortField = direction === "to-darija" ? "english" : "darija";
    return {
      words: sortByRelevance(matchedWords, sortField).slice(0, 8),
      phrases: sortByRelevance(matchedPhrases, sortField).slice(0, 4),
    };
  }, [query, direction, words, phrases]);

  const hasResults = results.words.length > 0 || results.phrases.length > 0;
  const topResult = results.words[0] || null;

  return (
    <div className="w-full">
      {/* Direction toggle */}
      <div className="flex items-center gap-4 mb-6">
        <button
          onClick={() => {
            setDirection("to-darija");
            setQuery("");
          }}
          className={`text-xs tracking-[0.15em] uppercase font-sans pb-1 transition-colors ${
            direction === "to-darija"
              ? "text-foreground border-b border-foreground"
              : "text-foreground/30 hover:text-foreground/50"
          }`}
        >
          English → Darija
        </button>
        <button
          onClick={() => {
            setDirection("from-darija");
            setQuery("");
          }}
          className={`text-xs tracking-[0.15em] uppercase font-sans pb-1 transition-colors ${
            direction === "from-darija"
              ? "text-foreground border-b border-foreground"
              : "text-foreground/30 hover:text-foreground/50"
          }`}
        >
          Darija → English
        </button>
      </div>

      {/* Two-panel layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-0 border border-border">
        {/* Input panel */}
        <div className="p-6 md:p-8 md:border-r border-b md:border-b-0 border-border">
          <p className="text-[10px] tracking-[0.3em] uppercase text-foreground/30 mb-4 font-sans">
            {direction === "to-darija" ? "English or French" : "Darija or Arabic"}
          </p>
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={
              direction === "to-darija"
                ? "Type a word... e.g. bread, water, thank you"
                : "Type in Darija... e.g. khobz, salam, shukran"
            }
            className="w-full bg-transparent text-foreground font-serif text-2xl md:text-3xl placeholder:text-foreground/20 outline-none"
            autoComplete="off"
            spellCheck={false}
          />
        </div>

        {/* Result panel */}
        <div className="p-6 md:p-8 bg-foreground/[0.02] min-h-[120px]">
          <p className="text-[10px] tracking-[0.3em] uppercase text-foreground/30 mb-4 font-sans">
            {direction === "to-darija" ? "Darija" : "English"}
          </p>
          {!query.trim() ? (
            <p className="text-foreground/20 font-serif text-2xl md:text-3xl">
              ...
            </p>
          ) : topResult ? (
            <Link href={`/darija/dictionary/${topResult.id}`} className="group block">
              <p className="font-serif text-2xl md:text-3xl group-hover:text-foreground/70 transition-colors">
                {direction === "to-darija" ? topResult.darija : topResult.english}
              </p>
              <p className="text-foreground/40 text-lg mt-1" dir={direction === "to-darija" ? "rtl" : "ltr"} lang={direction === "to-darija" ? "ar" : "en"}>
                {direction === "to-darija" ? topResult.arabic : topResult.french}
              </p>
              <p className="text-sm text-foreground/40 mt-2 italic font-serif">
                /{topResult.pronunciation}/
              </p>
            </Link>
          ) : (
            <p className="text-foreground/30 font-serif text-lg">
              No match found
            </p>
          )}
        </div>
      </div>

      {/* More results */}
      {query.trim() && hasResults && (results.words.length > 1 || results.phrases.length > 0) && (
        <div className="border-x border-b border-border p-6 md:p-8">
          {/* Additional word matches */}
          {results.words.length > 1 && (
            <div className="mb-6">
              <p className="text-[10px] tracking-[0.3em] uppercase text-foreground/30 mb-3 font-sans">
                {results.words.length} word{results.words.length !== 1 && "s"} found
              </p>
              <div className="space-y-0">
                {results.words.slice(1).map((word) => (
                  <Link
                    key={word.id}
                    href={`/darija/dictionary/${word.id}`}
                    className="flex items-baseline gap-4 py-2.5 border-b border-border/30 group hover:bg-foreground/[0.02] transition-colors"
                  >
                    <span className="font-serif text-base min-w-[100px] md:min-w-[140px] group-hover:text-foreground/70 transition-colors">
                      {word.darija}
                    </span>
                    <span className="text-foreground/40 text-sm" dir="rtl" lang="ar">
                      {word.arabic}
                    </span>
                    <span className="text-foreground/60 font-serif text-sm flex-1">
                      {word.english}
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Phrase matches */}
          {results.phrases.length > 0 && (
            <div>
              <p className="text-[10px] tracking-[0.3em] uppercase text-foreground/30 mb-3 font-sans">
                Related phrases
              </p>
              <div className="space-y-3">
                {results.phrases.map((phrase) => (
                  <div key={phrase.id} className="py-2">
                    <p className="font-serif text-base">{phrase.darija}</p>
                    <p className="text-foreground/50 text-sm font-serif">
                      {phrase.english}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Link to full dictionary */}
          <div className="mt-6 pt-4 border-t border-border/30">
            <Link
              href={`/darija/dictionary?search=${encodeURIComponent(query)}`}
              className="text-xs tracking-[0.15em] uppercase text-foreground/40 hover:text-foreground transition-colors font-sans"
            >
              Search full dictionary →
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
