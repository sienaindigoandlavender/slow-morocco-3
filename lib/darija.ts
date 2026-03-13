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

export async function getAllWords(): Promise<DarijaWord[]> {
  const { data } = await supabase
    .from('darija_words')
    .select('*')
    .eq('published', true)
    .order('category')
    .order('order');
  return data || [];
}

export async function getWordsByCategory(category: string): Promise<DarijaWord[]> {
  const { data } = await supabase
    .from('darija_words')
    .select('*')
    .eq('category', category)
    .eq('published', true)
    .order('order');
  return data || [];
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
  const { data } = await supabase
    .from('darija_words')
    .select('category')
    .eq('published', true);
  const cats = Array.from(new Set((data || []).map(d => d.category)));
  return cats.sort();
}

export async function getAllPhrases(): Promise<DarijaPhrase[]> {
  const { data } = await supabase
    .from('darija_phrases')
    .select('*')
    .eq('published', true)
    .order('category')
    .order('order');
  return data || [];
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
