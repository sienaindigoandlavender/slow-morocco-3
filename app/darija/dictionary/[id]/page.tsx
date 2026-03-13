import { Metadata } from "next";
import Link from "next/link";
import { getWordById, getAllWords } from "@/lib/darija";
import { notFound } from "next/navigation";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const word = await getWordById(id);
  if (!word) return { title: "Word Not Found" };

  return {
    title: `${word.darija} — ${word.english} | Darija Dictionary`,
    description: `${word.darija} (${word.pronunciation}) means "${word.english}" in Moroccan Arabic (Darija). ${word.cultural_note || ""}`.trim(),
    openGraph: {
      title: `${word.darija} — ${word.english} | Darija Dictionary | Slow Morocco`,
      description: `${word.darija} (${word.pronunciation}) means "${word.english}" in Moroccan Arabic.`,
      type: "website",
      url: `https://www.slowmorocco.com/darija/dictionary/${word.id}`,
    },
    alternates: {
      canonical: `https://www.slowmorocco.com/darija/dictionary/${word.id}`,
    },
  };
}

function formatCategoryLabel(cat: string): string {
  return cat.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
}

export default async function WordDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const word = await getWordById(id);

  if (!word) notFound();

  // Fetch related words if any
  let relatedWordData: { id: string; darija: string; english: string }[] = [];
  if (word.related_words && word.related_words.length > 0) {
    const allWords = await getAllWords();
    relatedWordData = allWords
      .filter((w) => word.related_words!.includes(w.id))
      .map((w) => ({ id: w.id, darija: w.darija, english: w.english }));
  }

  // JSON-LD DefinedTerm schema
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "DefinedTerm",
    name: word.darija,
    description: word.english,
    inDefinedTermSet: {
      "@type": "DefinedTermSet",
      name: "Moroccan Darija Dictionary",
      url: "https://www.slowmorocco.com/darija/dictionary",
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="bg-background min-h-screen">
        {/* Header */}
        <header className="pt-32 pb-12 md:pt-40 md:pb-16">
          <div className="px-8 md:px-[8%] lg:px-[12%]">
            <div className="max-w-3xl">
              <p className="text-[10px] tracking-[0.3em] uppercase text-foreground/40 mb-6 font-sans">
                <Link
                  href="/darija/dictionary"
                  className="hover:text-foreground transition-colors"
                >
                  Dictionary
                </Link>
                {" / "}
                <Link
                  href={`/darija/dictionary?category=${word.category}`}
                  className="hover:text-foreground transition-colors"
                >
                  {formatCategoryLabel(word.category)}
                </Link>
              </p>

              <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl mb-4">
                {word.darija}
              </h1>
              <p
                className="text-3xl md:text-4xl text-foreground/40 mb-4"
                dir="rtl"
                lang="ar"
              >
                {word.arabic}
              </p>
              <p className="text-lg text-foreground/50 italic font-serif">
                /{word.pronunciation}/
              </p>
            </div>
          </div>
        </header>

        {/* Translations */}
        <section className="border-y border-border py-10 md:py-14">
          <div className="px-8 md:px-[8%] lg:px-[12%]">
            <div className="max-w-3xl grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <p className="text-[10px] tracking-[0.3em] uppercase text-foreground/30 mb-2 font-sans">
                  English
                </p>
                <p className="font-serif text-xl">{word.english}</p>
              </div>
              <div>
                <p className="text-[10px] tracking-[0.3em] uppercase text-foreground/30 mb-2 font-sans">
                  French
                </p>
                <p className="font-serif text-xl">{word.french}</p>
              </div>
            </div>
          </div>
        </section>

        {/* Details */}
        <section className="py-10 md:py-14">
          <div className="px-8 md:px-[8%] lg:px-[12%]">
            <div className="max-w-3xl">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
                <div>
                  <p className="text-[10px] tracking-[0.3em] uppercase text-foreground/30 mb-1 font-sans">
                    Part of Speech
                  </p>
                  <p className="text-sm text-foreground/70 font-serif">
                    {word.part_of_speech}
                  </p>
                </div>
                <div>
                  <p className="text-[10px] tracking-[0.3em] uppercase text-foreground/30 mb-1 font-sans">
                    Register
                  </p>
                  <p className="text-sm text-foreground/70 font-serif">
                    {word.register}
                  </p>
                </div>
                {word.gender && (
                  <div>
                    <p className="text-[10px] tracking-[0.3em] uppercase text-foreground/30 mb-1 font-sans">
                      Gender
                    </p>
                    <p className="text-sm text-foreground/70 font-serif">
                      {word.gender}
                    </p>
                  </div>
                )}
                {word.plural && (
                  <div>
                    <p className="text-[10px] tracking-[0.3em] uppercase text-foreground/30 mb-1 font-sans">
                      Plural
                    </p>
                    <p className="text-sm text-foreground/70 font-serif">
                      {word.plural}
                    </p>
                  </div>
                )}
              </div>

              {/* Cultural note */}
              {word.cultural_note && (
                <div className="mb-12">
                  <p className="text-[10px] tracking-[0.3em] uppercase text-foreground/30 mb-3 font-sans">
                    Cultural Note
                  </p>
                  <p className="text-foreground/70 font-serif leading-relaxed">
                    {word.cultural_note}
                  </p>
                </div>
              )}

              {/* Examples */}
              {word.examples && word.examples.length > 0 && (
                <div className="mb-12">
                  <p className="text-[10px] tracking-[0.3em] uppercase text-foreground/30 mb-6 font-sans">
                    Examples
                  </p>
                  <div className="space-y-6">
                    {word.examples.map((ex, i) => (
                      <div
                        key={i}
                        className="border-l-2 border-border pl-4"
                      >
                        <p className="font-serif text-base mb-1">
                          {ex.darija}
                        </p>
                        <p
                          className="text-foreground/40 text-sm mb-1"
                          dir="rtl"
                          lang="ar"
                        >
                          {ex.arabic}
                        </p>
                        <p className="text-foreground/60 font-serif text-sm">
                          {ex.english}
                        </p>
                        <p className="text-foreground/40 font-serif text-sm italic">
                          {ex.french}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Conjugation */}
              {word.conjugation && Object.keys(word.conjugation).length > 0 && (
                <div className="mb-12">
                  <p className="text-[10px] tracking-[0.3em] uppercase text-foreground/30 mb-6 font-sans">
                    Conjugation
                  </p>
                  <div className="space-y-8">
                    {Object.entries(word.conjugation).map(([tense, forms]) => (
                      <div key={tense}>
                        <p className="text-xs uppercase tracking-wider text-foreground/40 mb-3 font-sans">
                          {tense}
                        </p>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                          {Object.entries(forms).map(([person, form]) => (
                            <div key={person} className="text-sm">
                              <span className="text-foreground/40 font-sans">
                                {person}:
                              </span>{" "}
                              <span className="font-serif">{form}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Related words */}
              {relatedWordData.length > 0 && (
                <div className="mb-12">
                  <p className="text-[10px] tracking-[0.3em] uppercase text-foreground/30 mb-4 font-sans">
                    Related Words
                  </p>
                  <div className="flex flex-wrap gap-3">
                    {relatedWordData.map((rw) => (
                      <Link
                        key={rw.id}
                        href={`/darija/dictionary/${rw.id}`}
                        className="text-sm border border-border px-3 py-1.5 hover:border-foreground/30 transition-colors font-serif"
                      >
                        {rw.darija}{" "}
                        <span className="text-foreground/40">
                          ({rw.english})
                        </span>
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {/* Tags */}
              {word.tags && word.tags.length > 0 && (
                <div className="mb-12">
                  <div className="flex flex-wrap gap-2">
                    {word.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-[10px] uppercase tracking-wider text-foreground/30 bg-foreground/5 px-2 py-1 font-sans"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Back link */}
        <section className="py-8 border-t border-border">
          <div className="px-8 md:px-[8%] lg:px-[12%]">
            <Link
              href="/darija/dictionary"
              className="text-sm text-foreground/40 hover:text-foreground transition-colors"
            >
              &larr; Back to dictionary
            </Link>
          </div>
        </section>
      </div>
    </>
  );
}
