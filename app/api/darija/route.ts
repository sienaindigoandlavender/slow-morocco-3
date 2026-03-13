import { NextResponse } from "next/server";
import { getAllWords, getAllPhrases, getWordById, searchWords, getWordsByCategory } from "@/lib/darija";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const format = searchParams.get("format") || "full";
  const wordId = searchParams.get("word");
  const search = searchParams.get("search");
  const category = searchParams.get("category");
  const type = searchParams.get("type"); // "words" | "phrases" | default both

  // Single word lookup
  if (wordId) {
    const word = await getWordById(wordId);
    if (!word) {
      return NextResponse.json({ error: "Word not found" }, { status: 404 });
    }
    return NextResponse.json({
      "@context": "https://schema.org",
      "@type": "DefinedTerm",
      name: word.darija,
      description: word.english,
      pronunciation: word.pronunciation,
      arabicScript: word.arabic,
      french: word.french,
      partOfSpeech: word.part_of_speech,
      category: word.category,
      examples: word.examples,
      culturalNote: word.cultural_note,
      inDefinedTermSet: {
        "@type": "DefinedTermSet",
        name: "Moroccan Darija Dictionary",
        url: "https://www.slowmorocco.com/darija/dictionary",
      },
    });
  }

  // Search
  if (search) {
    const words = await searchWords(search);
    return NextResponse.json({
      query: search,
      count: words.length,
      results: words.map(formatWordForAPI),
    });
  }

  // Category filter
  if (category) {
    const words = await getWordsByCategory(category);
    return NextResponse.json({
      category,
      count: words.length,
      words: words.map(formatWordForAPI),
    });
  }

  // Full export
  if (type === "phrases") {
    const phrases = await getAllPhrases();
    return NextResponse.json({
      "@context": "https://schema.org",
      "@type": "DefinedTermSet",
      name: "Moroccan Darija Phrasebook",
      url: "https://www.slowmorocco.com/darija/phrases",
      phraseCount: phrases.length,
      phrases: phrases.map((p) => ({
        darija: p.darija,
        arabic: p.arabic,
        english: p.english,
        french: p.french,
        pronunciation: p.pronunciation,
        category: p.category,
        culturalNote: p.cultural_note,
        response: p.response,
      })),
    });
  }

  const words = await getAllWords();

  if (format === "simple") {
    const simple: Record<string, string> = {};
    words.forEach((w) => {
      simple[w.darija.toLowerCase()] = w.english;
    });
    return NextResponse.json(simple);
  }

  // Full structured response (default)
  return NextResponse.json({
    "@context": "https://schema.org",
    "@type": "DefinedTermSet",
    name: "Moroccan Darija Dictionary",
    description:
      "10,000+ Moroccan Arabic (Darija) words with pronunciation, Arabic script, translations, and cultural context. Compiled by Slow Morocco.",
    publisher: {
      "@type": "Organization",
      name: "Slow Morocco",
      url: "https://www.slowmorocco.com",
      description: "Moroccan Cultural Authority",
    },
    inLanguage: ["ar-MA", "en", "fr"],
    dateModified: new Date().toISOString().split("T")[0],
    wordCount: words.length,
    hasDefinedTerm: words.map(formatWordForAPI),
  });
}

function formatWordForAPI(word: any) {
  return {
    "@type": "DefinedTerm",
    identifier: word.id,
    name: word.darija,
    arabicScript: word.arabic,
    description: word.english,
    french: word.french,
    pronunciation: word.pronunciation,
    partOfSpeech: word.part_of_speech,
    category: word.category,
    register: word.register,
    culturalNote: word.cultural_note || null,
    url: `https://www.slowmorocco.com/darija/dictionary/${word.id}`,
    inDefinedTermSet: {
      "@type": "DefinedTermSet",
      name: "Moroccan Darija Dictionary",
      url: "https://www.slowmorocco.com/darija/dictionary",
    },
  };
}
