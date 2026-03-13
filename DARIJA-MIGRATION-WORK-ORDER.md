# CLAUDE CODE WORK ORDER: Migrate Darija Dictionary to Slow Morocco

Read CLAUDE.md first. Then follow these instructions.

## Context

The Darija Dictionary currently lives at dharija.space with its own Supabase project 
(URL: https://dpigsglyabtzajddsuai.supabase.co). We're migrating the content into 
slowmorocco.com under /darija. The dharija.space domain will eventually redirect to 
slowmorocco.com/darija.

## Step 1: Create tables in Slow Morocco Supabase

The Slow Morocco Supabase already has stories, places, journeys, glossary tables.
Add the Darija tables to the SAME project. Run this in Slow Morocco's SQL Editor:

```sql
CREATE TABLE IF NOT EXISTS darija_words (
  id TEXT PRIMARY KEY,
  darija TEXT NOT NULL,
  arabic TEXT NOT NULL,
  english TEXT NOT NULL,
  french TEXT NOT NULL,
  pronunciation TEXT NOT NULL,
  category TEXT NOT NULL,
  part_of_speech TEXT NOT NULL,
  gender TEXT,
  plural TEXT,
  conjugation JSONB,
  examples JSONB DEFAULT '[]'::jsonb,
  cultural_note TEXT,
  register TEXT NOT NULL DEFAULT 'universal',
  related_words TEXT[],
  audio_file TEXT,
  tags TEXT[] DEFAULT '{}',
  published BOOLEAN DEFAULT true,
  "order" INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE IF NOT EXISTS darija_phrases (
  id TEXT PRIMARY KEY,
  darija TEXT NOT NULL,
  arabic TEXT NOT NULL,
  english TEXT NOT NULL,
  french TEXT NOT NULL,
  pronunciation TEXT NOT NULL,
  literal_translation TEXT,
  category TEXT NOT NULL,
  situation TEXT,
  cultural_note TEXT,
  register TEXT NOT NULL DEFAULT 'universal',
  response JSONB,
  tags TEXT[] DEFAULT '{}',
  published BOOLEAN DEFAULT true,
  "order" INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE darija_words ENABLE ROW LEVEL SECURITY;
ALTER TABLE darija_phrases ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read darija_words" ON darija_words FOR SELECT USING (true);
CREATE POLICY "Public read darija_phrases" ON darija_phrases FOR SELECT USING (true);

CREATE INDEX IF NOT EXISTS idx_darija_words_category ON darija_words(category);
CREATE INDEX IF NOT EXISTS idx_darija_words_tags ON darija_words USING GIN(tags);
CREATE INDEX IF NOT EXISTS idx_darija_words_search ON darija_words USING GIN(
  to_tsvector('simple', darija || ' ' || english || ' ' || french || ' ' || arabic)
);
CREATE INDEX IF NOT EXISTS idx_darija_phrases_category ON darija_phrases(category);
CREATE INDEX IF NOT EXISTS idx_darija_phrases_tags ON darija_phrases USING GIN(tags);
```

## Step 2: Migrate data

Export all words and phrases from the OLD Darija Supabase 
(https://dpigsglyabtzajddsuai.supabase.co) and import into Slow Morocco's Supabase.

In the OLD Darija Supabase SQL Editor:
```sql
-- Export words (copy output)
SELECT * FROM darija_words WHERE published = true ORDER BY category, "order";

-- Export phrases (copy output)  
SELECT * FROM darija_phrases WHERE published = true ORDER BY category, "order";
```

Then INSERT into Slow Morocco's Supabase. Use ON CONFLICT (id) DO NOTHING.

## Step 3: Create lib/darija.ts

Add to the existing lib/ directory in the slow-morocco repo. Use the SAME Supabase 
client that stories/places/journeys use (lib/supabase.ts). Do NOT create a separate 
Supabase connection.

```typescript
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
  const cats = [...new Set((data || []).map(d => d.category))];
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
```

## Step 4: Build the pages

### URL structure:
- `/darija` — landing page
- `/darija/dictionary` — searchable word list (all words, filterable by category)
- `/darija/phrases` — situation-based phrases (grouped by category)
- `/darija/dictionary/[id]` — individual word page

### /darija/page.tsx — Landing page

Editorial intro: "What is Darija?" Brief, warm, not academic. Explain that Darija is 
Moroccan Arabic — not MSA, not French, not Amazigh — the actual language people speak. 
Link to dictionary and phrases sections. Include a "Word of the Day" feature pulling 
a random word from Supabase. Show category cards linking to filtered views.

Design: Same editorial style as the rest of Slow Morocco. EB Garamond body text. 
No data-module aesthetic. Clean, warm, readable.

### /darija/dictionary/page.tsx — Dictionary

- Search bar at top (searches darija, english, french, arabic fields)
- Category filter (horizontal pills/tabs)
- Word cards showing: darija (large), arabic script, english, french, pronunciation
- Click through to individual word page
- Alphabetical letter navigation (A-Z by darija romanization)
- Server-rendered for SEO — each category view is a real URL

### /darija/phrases/page.tsx — Phrases

- Grouped by situation: Greetings, At the Souk, In a Taxi, At the Riad, 
  Food & Restaurants, Blessings, Emergencies, etc.
- Each phrase shows: darija, arabic, english, pronunciation
- Cultural notes where they exist
- Response phrase where applicable (e.g., greeting → expected reply)

### /darija/dictionary/[id]/page.tsx — Individual word page

- Full word detail: darija, arabic, english, french, pronunciation
- Part of speech, gender, plural
- Examples with translations
- Cultural note
- Conjugation table (if verb)
- Related words (linked)
- JSON-LD DefinedTerm schema for SEO/GEO
- "Back to dictionary" link

## Step 5: Navigation

Add "Darija" to the main nav. Position: after "Before You Go", before "Plan a Trip".

In the mobile menu, add it in the same position.

## Step 6: SEO / GEO

### Sitemap
Add all darija word pages to the existing sitemap.ts:
- /darija
- /darija/dictionary
- /darija/phrases  
- /darija/dictionary/[id] for each published word

### JSON-LD
Each word page gets DefinedTerm schema:
```json
{
  "@context": "https://schema.org",
  "@type": "DefinedTerm",
  "name": "[darija word]",
  "description": "[english translation]",
  "inDefinedTermSet": {
    "@type": "DefinedTermSet",
    "name": "Moroccan Darija Dictionary",
    "url": "https://www.slowmorocco.com/darija/dictionary"
  }
}
```

### API endpoint for AI citation
Add `/api/darija` that returns JSON of all words — same pattern as the existing 
`/api/glossary` and `/api/knowledge/facts` endpoints. Machine-readable, citable.

Update `llms.txt` to include the Darija dictionary section.

## Step 7: Cross-linking

- From the existing `/glossary` page, add a prominent link: 
  "Looking for Moroccan Arabic? See our Darija Dictionary →"
- From relevant stories (the-three-glasses, moroccan-souk-guide, the-rules-of-bargaining, 
  your-first-hammam, etc.), the story-linker should pick up Darija terms automatically
  if they appear in the glossary pipeline

## Design rules

- Same design system as rest of Slow Morocco
- EB Garamond for body text, DM Sans for labels
- Arabic script displayed in Noto Sans Arabic or similar
- RTL text handling for Arabic script fields
- No dark/moody aesthetic — clean, editorial, warm
- Mobile-first — the dictionary must work on phones (travelers use it on the ground)
- Search must be fast — debounced input, no full page reload

## What NOT to do

- Do NOT create a separate Supabase connection — use the existing one
- Do NOT use a separate design system — match Slow Morocco exactly  
- Do NOT import any data visualization libraries — this is a text reference tool
- Do NOT add gamification or streak features — just the dictionary
- Do NOT reference dharija.space, "Darija for Dummies", or any previous branding
- Do NOT use the word "Dummies" anywhere — the section is called "Darija Dictionary"
  or "Everyday Darija"
