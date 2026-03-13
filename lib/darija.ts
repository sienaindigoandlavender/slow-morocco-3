// lib/darija.ts
import { supabase } from './supabase';

export interface DarijaWord {
  id: string;
  darija: string;
  arabic: string;
  english: string;
  french: string;
  pronunciation: string;
  category: string;
  part_of_speech: string;
  gender?: string;
  plural?: string;
  conjugation?: Record<string, Record<string, string>>;
  examples: { darija: string; arabic: string; english: string; french: string }[];
  cultural_note?: string;
  register: string;
  related_words?: string[];
  audio_file?: string;
  tags: string[];
}

export interface DarijaPhrase {
  id: string;
  darija: string;
  arabic: string;
  english: string;
  french: string;
  pronunciation: string;
  literal_translation?: string;
  category: string;
  situation?: string;
  cultural_note?: string;
  register: string;
  response?: { darija: string; arabic: string; english: string; french: string };
  tags: string[];
}

// Paginated fetch — Supabase defaults to 1000 row limit
export async function getAllWords(): Promise<DarijaWord[]> {
  const all: DarijaWord[] = [];
  let from = 0;
  const batchSize = 1000;

  while (true) {
    const { data } = await supabase
      .from('darija_words')
      .select('*')
      .eq('published', true)
      .order('category')
      .order('order')
      .range(from, from + batchSize - 1);
    if (!data || data.length === 0) break;
    all.push(...data);
    if (data.length < batchSize) break;
    from += batchSize;
  }

  return all;
}

// Lightweight paginated fetch — IDs only, for sitemap
export async function getAllWordIds(): Promise<string[]> {
  const ids: string[] = [];
  let from = 0;
  const batchSize = 1000;

  while (true) {
    const { data } = await supabase
      .from('darija_words')
      .select('id')
      .eq('published', true)
      .order('id')
      .range(from, from + batchSize - 1);
    if (!data || data.length === 0) break;
    ids.push(...data.map(d => d.id));
    if (data.length < batchSize) break;
    from += batchSize;
  }

  return ids;
}

export async function getWordsByCategory(category: string): Promise<DarijaWord[]> {
  const all: DarijaWord[] = [];
  let from = 0;
  const batchSize = 1000;

  while (true) {
    const { data } = await supabase
      .from('darija_words')
      .select('*')
      .eq('category', category)
      .eq('published', true)
      .order('order')
      .range(from, from + batchSize - 1);
    if (!data || data.length === 0) break;
    all.push(...data);
    if (data.length < batchSize) break;
    from += batchSize;
  }

  return all;
}

export async function getWordById(id: string): Promise<DarijaWord | null> {
  const { data } = await supabase
    .from('darija_words')
    .select('*')
    .eq('id', id)
    .eq('published', true)
    .single();
  return data;
}

export async function searchWords(query: string): Promise<DarijaWord[]> {
  const { data } = await supabase
    .from('darija_words')
    .select('*')
    .eq('published', true)
    .or(`darija.ilike.%${query}%,english.ilike.%${query}%,french.ilike.%${query}%,arabic.ilike.%${query}%`)
    .order('category')
    .limit(50);
  return data || [];
}

export async function getWordCategories(): Promise<string[]> {
  const all: { category: string }[] = [];
  let from = 0;
  const batchSize = 1000;

  while (true) {
    const { data } = await supabase
      .from('darija_words')
      .select('category')
      .eq('published', true)
      .range(from, from + batchSize - 1);
    if (!data || data.length === 0) break;
    all.push(...data);
    if (data.length < batchSize) break;
    from += batchSize;
  }

  const cats = Array.from(new Set(all.map(d => d.category)));
  return cats.sort();
}

// Paginated fetch for phrases — 1500 entries, needs pagination too
export async function getAllPhrases(): Promise<DarijaPhrase[]> {
  const all: DarijaPhrase[] = [];
  let from = 0;
  const batchSize = 1000;

  while (true) {
    const { data } = await supabase
      .from('darija_phrases')
      .select('*')
      .eq('published', true)
      .order('category')
      .order('order')
      .range(from, from + batchSize - 1);
    if (!data || data.length === 0) break;
    all.push(...data);
    if (data.length < batchSize) break;
    from += batchSize;
  }

  return all;
}

export async function getPhrasesByCategory(category: string): Promise<DarijaPhrase[]> {
  const { data } = await supabase
    .from('darija_phrases')
    .select('*')
    .eq('category', category)
    .eq('published', true)
    .order('order');
  return data || [];
}

export async function searchPhrases(query: string): Promise<DarijaPhrase[]> {
  const { data } = await supabase
    .from('darija_phrases')
    .select('*')
    .eq('published', true)
    .or(`darija.ilike.%${query}%,english.ilike.%${query}%,french.ilike.%${query}%`)
    .limit(50);
  return data || [];
}
