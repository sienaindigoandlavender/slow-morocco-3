import { Metadata } from "next";
import Link from "next/link";
import { getAllWords, getWordCategories, getAllPhrases } from "@/lib/darija";

export const metadata: Metadata = {
  title: "Darija Dictionary | Moroccan Arabic | Slow Morocco",
  description:
    "Learn Moroccan Arabic (Darija) — 10,000+ words and 1,500 phrases with pronunciation, Arabic script, and cultural context. The language Moroccans actually speak.",
  keywords: [
    "Darija",
    "Moroccan Arabic",
    "learn Darija",
    "Moroccan language",
    "Darija dictionary",
    "Darija phrases",
    "Moroccan words",
    "Arabic Morocco",
  ],
  openGraph: {
    title: "Darija Dictionary | Moroccan Arabic | Slow Morocco",
    description:
      "Learn Moroccan Arabic (Darija) — the language Moroccans actually speak. 10,000+ words and phrases with pronunciation and cultural context.",
    type: "website",
    url: "https://www.slowmorocco.com/darija",
  },
  alternates: {
    canonical: "https://www.slowmorocco.com/darija",
  },
};

function formatCategoryLabel(cat: string): string {
  return cat
    .replace(/_/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

export default async function DarijaLandingPage() {
  const [words, categories, phrases] = await Promise.all([
    getAllWords(),
    getWordCategories(),
    getAllPhrases(),
  ]);

  // Pick a pseudo-random word for "Word of the Day" based on the date
  const dayIndex =
    Math.floor(Date.now() / (1000 * 60 * 60 * 24)) % (words.length || 1);
  const wordOfTheDay = words[dayIndex] || null;

  // Phrase categories
  const phraseCategories = [
    ...new Set(phrases.map((p) => p.category)),
  ].sort();

  return (
    <div className="bg-background min-h-screen">
      {/* Hero */}
      <header className="pt-32 pb-16 md:pt-40 md:pb-24">
        <div className="px-8 md:px-[8%] lg:px-[12%]">
          <div className="max-w-3xl">
            <p className="text-[10px] tracking-[0.3em] uppercase text-foreground/40 mb-4 font-sans">
              Language
            </p>
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl mb-6">
              Everyday Darija
            </h1>
            <p className="text-lg text-foreground/70 leading-relaxed font-serif">
              Darija is Moroccan Arabic — not the formal Arabic of newscasters,
              not French, not Amazigh. It is the language thirty-seven million
              Moroccans actually speak: in the souk, at the cafe, on the phone
              with their mothers. It borrows from Arabic, Amazigh, French,
              Spanish, and a few words nobody can trace at all. No textbook
              teaches it properly. This dictionary tries.
            </p>
          </div>
        </div>
      </header>

      {/* Word of the Day */}
      {wordOfTheDay && (
        <section className="border-y border-border py-12 md:py-16">
          <div className="px-8 md:px-[8%] lg:px-[12%]">
            <div className="max-w-3xl">
              <p className="text-[10px] tracking-[0.3em] uppercase text-foreground/40 mb-6 font-sans">
                Word of the Day
              </p>
              <Link
                href={`/darija/dictionary/${wordOfTheDay.id}`}
                className="group block"
              >
                <p className="font-serif text-3xl md:text-4xl mb-2 group-hover:text-foreground/70 transition-colors">
                  {wordOfTheDay.darija}
                </p>
                <p
                  className="text-xl text-foreground/50 mb-3"
                  dir="rtl"
                  lang="ar"
                >
                  {wordOfTheDay.arabic}
                </p>
                <p className="text-foreground/70 font-serif">
                  {wordOfTheDay.english}
                </p>
                <p className="text-sm text-foreground/40 mt-1 italic font-serif">
                  /{wordOfTheDay.pronunciation}/
                </p>
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* Stats + Links */}
      <section className="py-16 md:py-24">
        <div className="px-8 md:px-[8%] lg:px-[12%]">
          <div className="max-w-4xl">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20">
              {/* Dictionary */}
              <Link href="/darija/dictionary" className="group block">
                <p className="text-[10px] tracking-[0.3em] uppercase text-foreground/40 mb-3 font-sans">
                  Dictionary
                </p>
                <p className="font-serif text-2xl md:text-3xl mb-3 group-hover:text-foreground/70 transition-colors">
                  {words.length.toLocaleString()} words
                </p>
                <p className="text-foreground/60 font-serif leading-relaxed">
                  Searchable by Darija, English, French, or Arabic script.
                  Every entry includes pronunciation, part of speech, and
                  example sentences.
                </p>
              </Link>

              {/* Phrases */}
              <Link href="/darija/phrases" className="group block">
                <p className="text-[10px] tracking-[0.3em] uppercase text-foreground/40 mb-3 font-sans">
                  Phrases
                </p>
                <p className="font-serif text-2xl md:text-3xl mb-3 group-hover:text-foreground/70 transition-colors">
                  {phrases.length.toLocaleString()} phrases
                </p>
                <p className="text-foreground/60 font-serif leading-relaxed">
                  Organised by situation: at the souk, in a taxi, at the riad,
                  blessings, emergencies. What to say and how to say it.
                </p>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Category cards — Dictionary */}
      <section className="py-16 md:py-24 border-t border-border">
        <div className="px-8 md:px-[8%] lg:px-[12%]">
          <div className="max-w-5xl">
            <p className="text-[10px] tracking-[0.3em] uppercase text-foreground/40 mb-8 font-sans">
              Browse by Category
            </p>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {categories.map((cat) => (
                <Link
                  key={cat}
                  href={`/darija/dictionary?category=${cat}`}
                  className="py-4 px-5 border border-border hover:border-foreground/30 transition-colors group"
                >
                  <p className="font-serif text-base group-hover:text-foreground/70 transition-colors">
                    {formatCategoryLabel(cat)}
                  </p>
                  <p className="text-xs text-foreground/40 mt-1 font-sans">
                    {words.filter((w) => w.category === cat).length} words
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Phrase situations */}
      <section className="py-16 md:py-24 border-t border-border">
        <div className="px-8 md:px-[8%] lg:px-[12%]">
          <div className="max-w-5xl">
            <p className="text-[10px] tracking-[0.3em] uppercase text-foreground/40 mb-8 font-sans">
              Phrases by Situation
            </p>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {phraseCategories.map((cat) => (
                <Link
                  key={cat}
                  href={`/darija/phrases?category=${cat}`}
                  className="py-4 px-5 border border-border hover:border-foreground/30 transition-colors group"
                >
                  <p className="font-serif text-base group-hover:text-foreground/70 transition-colors">
                    {formatCategoryLabel(cat)}
                  </p>
                  <p className="text-xs text-foreground/40 mt-1 font-sans">
                    {phrases.filter((p) => p.category === cat).length} phrases
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Back link */}
      <section className="py-8 border-t border-border">
        <div className="px-8 md:px-[8%] lg:px-[12%]">
          <Link
            href="/"
            className="text-sm text-foreground/40 hover:text-foreground transition-colors"
          >
            &larr; Back to Slow Morocco
          </Link>
        </div>
      </section>
    </div>
  );
}
