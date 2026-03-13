import { Metadata } from "next";
import { getAllPhrases } from "@/lib/darija";
import PhrasesClient from "./PhrasesClient";

export const metadata: Metadata = {
  title: "Darija Phrases | Moroccan Arabic Phrases by Situation",
  description:
    "1,500+ Moroccan Arabic (Darija) phrases organised by situation: souk bargaining, taxi, riad, restaurant, hammam, emergencies, and blessings. With pronunciation and cultural notes.",
  keywords: [
    "Darija phrases",
    "Moroccan Arabic phrases",
    "Morocco travel phrases",
    "Moroccan greetings",
    "souk phrases",
    "Darija for travellers",
  ],
  openGraph: {
    title: "Darija Phrases | Moroccan Arabic Phrases | Slow Morocco",
    description:
      "1,500+ Moroccan Arabic phrases by situation — souk, taxi, riad, hammam, and more.",
    type: "website",
    url: "https://www.slowmorocco.com/darija/phrases",
  },
  alternates: {
    canonical: "https://www.slowmorocco.com/darija/phrases",
  },
};

export default async function PhrasesPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>;
}) {
  const params = await searchParams;
  const phrases = await getAllPhrases();
  const activeCategory = params.category || null;

  return (
    <div className="bg-background min-h-screen">
      {/* Hero */}
      <header className="pt-32 pb-10 md:pt-40 md:pb-14">
        <div className="px-8 md:px-[8%] lg:px-[12%]">
          <div className="max-w-3xl">
            <p className="text-[10px] tracking-[0.3em] uppercase text-foreground/40 mb-4 font-sans">
              Darija Phrases
            </p>
            <h1 className="font-serif text-4xl md:text-5xl mb-4">Phrases</h1>
            <p className="text-foreground/60 font-serif">
              {phrases.length.toLocaleString()} phrases for real situations
            </p>
          </div>
        </div>
      </header>

      <PhrasesClient phrases={phrases} initialCategory={activeCategory} />
    </div>
  );
}
