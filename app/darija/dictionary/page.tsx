import { Metadata } from "next";
import { getAllWords, getWordCategories } from "@/lib/darija";
import DictionaryClient from "./DictionaryClient";

export const metadata: Metadata = {
  title: "Darija Dictionary | 10,000+ Moroccan Arabic Words",
  description:
    "Searchable dictionary of Moroccan Arabic (Darija). 10,000+ words with pronunciation, Arabic script, English and French translations, and cultural context.",
  keywords: [
    "Darija dictionary",
    "Moroccan Arabic words",
    "Darija vocabulary",
    "learn Moroccan Arabic",
    "Darija translation",
  ],
  openGraph: {
    title: "Darija Dictionary | Moroccan Arabic Words | Slow Morocco",
    description:
      "Searchable dictionary of 10,000+ Moroccan Arabic (Darija) words with pronunciation and cultural context.",
    type: "website",
    url: "https://www.slowmorocco.com/darija/dictionary",
  },
  alternates: {
    canonical: "https://www.slowmorocco.com/darija/dictionary",
  },
};

export default async function DictionaryPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>;
}) {
  const params = await searchParams;
  const [words, categories] = await Promise.all([
    getAllWords(),
    getWordCategories(),
  ]);

  const activeCategory = params.category || null;

  return (
    <div className="bg-background min-h-screen">
      {/* Hero */}
      <header className="pt-32 pb-10 md:pt-40 md:pb-14">
        <div className="px-8 md:px-[8%] lg:px-[12%]">
          <div className="max-w-3xl">
            <p className="text-[10px] tracking-[0.3em] uppercase text-foreground/40 mb-4 font-sans">
              Darija Dictionary
            </p>
            <h1 className="font-serif text-4xl md:text-5xl mb-4">
              Dictionary
            </h1>
            <p className="text-foreground/60 font-serif">
              {words.length.toLocaleString()} Moroccan Arabic words
            </p>
          </div>
        </div>
      </header>

      <DictionaryClient
        words={words}
        categories={categories}
        initialCategory={activeCategory}
      />
    </div>
  );
}
