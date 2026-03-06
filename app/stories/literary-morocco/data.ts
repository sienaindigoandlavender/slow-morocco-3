// ─────────────────────────────────────────────────
// Literary Morocco
// Module 062 — Cultural Intelligence
// Sources: Wikipedia, NYRB, Britannica,
// Explore Parts Unknown, Beatdom
// ─────────────────────────────────────────────────

export interface Writer {
  id: string
  name: string
  years: string
  nationality: string
  moroccoConnection: string
  keyWork: string
  keyWorkYear: string
  otherWorks: string[]
  detail: string
  location: string
  era: 'pre-interzone' | 'interzone' | 'moroccan-voices' | 'modern'
  color: string
}

export const WRITERS: Writer[] = [
  {
    id: 'bowles', name: 'Paul Bowles', years: '1910–1999', nationality: 'American',
    moroccoConnection: 'Lived in Tangier 1947–1999. Died there. Buried in New York.',
    keyWork: 'The Sheltering Sky', keyWorkYear: '1949',
    otherWorks: ['Let It Come Down (1952)', 'The Spider\'s House (1955)', 'Points in Time (1982)'],
    detail: 'The gravitational center of literary Tangier. Arrived on Gertrude Stein\'s advice in 1931. Settled permanently in 1947 at the Immeuble Itesa. Composer turned novelist. Translated Moroccan oral storytellers (Choukri, Mrabet, Layachi) into English. Recorded 60 hours of Moroccan folk music for the Library of Congress. His apartment became a pilgrimage site. Every major writer of the mid-century passed through his door.',
    location: 'Tangier', era: 'interzone', color: '#2D5F8A',
  },
  {
    id: 'burroughs', name: 'William S. Burroughs', years: '1914–1997', nationality: 'American',
    moroccoConnection: 'Lived in Tangier 1953–1958. Wrote Naked Lunch there.',
    keyWork: 'Naked Lunch', keyWorkYear: '1959',
    otherWorks: ['Interzone (1989, Tangier material)', 'Letters 1945–59'],
    detail: 'Arrived in 1953 after reading Bowles\'s fiction. Rented a room at the Hotel Muniria above a brothel. Drugs were cheap, sex was available, and nobody cared. Typed pages covered his floor with dirty footprints on them. Kerouac and Ginsberg arrived in 1957 to help assemble the manuscript. Burroughs reinvented Tangier\'s International Zone as "Interzone" — a liminal nowhere-space that became one of the most influential concepts in postwar literature.',
    location: 'Tangier', era: 'interzone', color: '#A0452E',
  },
  {
    id: 'choukri', name: 'Mohamed Choukri', years: '1935–2003', nationality: 'Moroccan',
    moroccoConnection: 'Born in the Rif. Migrated to Tangier. Learned to read at 21.',
    keyWork: 'For Bread Alone', keyWorkYear: '1973',
    otherWorks: ['Streetwise (1996)', 'In Tangier (portraits of Genet, Williams, Bowles)'],
    detail: 'Born in poverty in the Rif during famine. His father killed his brother. Migrated to Tangier as a child. Illiterate until 21, when he enrolled in primary school. Became a schoolteacher, then a writer. For Bread Alone — dictated to Bowles in Spanish, translated into English — was banned in Morocco and across the Arab world for its unflinching depiction of poverty, sex, and survival. French edition translated by Tahar Ben Jelloun became a bestseller in France.',
    location: 'Tangier / Rif', era: 'moroccan-voices', color: '#F59E0B',
  },
  {
    id: 'mrabet', name: 'Mohammed Mrabet', years: '1936–2022', nationality: 'Moroccan',
    moroccoConnection: 'Born and lived in Tangier. Oral storyteller.',
    keyWork: 'Love with a Few Hairs', keyWorkYear: '1967',
    otherWorks: ['The Lemon (1969)', 'Look and Move On (1976)', 'The Boy Who Set the Fire (1974)'],
    detail: 'Illiterate fisherman, hustler, and golf caddie who became one of Morocco\'s most translated authors without ever writing a word. He told his stories in Darija to Paul Bowles, who translated and edited them into English. His tales capture Tangier street life with dark humor and supernatural elements — jinn, sorcery, desire, betrayal. His work represents some of the only Moroccan literature composed in Darija rather than fusha or French.',
    location: 'Tangier', era: 'moroccan-voices', color: '#5C7C3E',
  },
  {
    id: 'canetti', name: 'Elias Canetti', years: '1905–1994', nationality: 'Bulgarian-British',
    moroccoConnection: 'Visited Marrakech in 1954. Wrote The Voices of Marrakesh.',
    keyWork: 'The Voices of Marrakesh', keyWorkYear: '1967',
    otherWorks: ['Crowds and Power (1960)', 'Auto-da-Fé (1935)'],
    detail: 'Nobel Prize winner (1981). Spent only a few weeks in Marrakech in 1954 but produced one of the sharpest books on Morocco. Fourteen short episodes — the souks, the Djemaa el-Fna, the mellah, the blind beggars, the storytellers. Written in German, published 13 years after the visit. A masterclass in the essay form. No orientalist gaze — Canetti writes with humility about what he cannot understand.',
    location: 'Marrakech', era: 'interzone', color: '#7B506F',
  },
  {
    id: 'gysin', name: 'Brion Gysin', years: '1916–1986', nationality: 'British-Canadian',
    moroccoConnection: 'Lived in Tangier intermittently 1950s–1970s. Opened 1001 Nights restaurant.',
    keyWork: 'The Process', keyWorkYear: '1969',
    otherWorks: ['The Third Mind (with Burroughs, 1978)', 'Here to Go: Planet R-101 (1982)'],
    detail: 'Painter, writer, inventor of the cut-up technique (which Burroughs made famous). Met Bowles in 1938. Opened the 1001 Nights restaurant in Tangier, where he introduced the Master Musicians of Joujouka to the Western world. Brian Jones of the Rolling Stones recorded them there. Gysin was the connector — between Moroccan Sufi music, Beat literature, and the counterculture.',
    location: 'Tangier', era: 'interzone', color: '#78716C',
  },
  {
    id: 'genet', name: 'Jean Genet', years: '1910–1986', nationality: 'French',
    moroccoConnection: 'Lived intermittently in Tangier and Larache. Buried in Larache.',
    keyWork: 'The Thief\'s Journal', keyWorkYear: '1949',
    otherWorks: ['Our Lady of the Flowers (1943)', 'Prisoner of Love (1986)'],
    detail: 'Orphan, thief, prostitute, convict, playwright, political radical. Genet was drawn to Tangier\'s underworld and to Morocco\'s young men. He spent years between Tangier and Larache, where he is buried — one of only a handful of major French writers interred on African soil. Choukri wrote a sympathetic portrait of him. His presence in Morocco was more about living than writing — he found a freedom there that France denied him.',
    location: 'Tangier / Larache', era: 'interzone', color: '#EC4899',
  },
  {
    id: 'wharton', name: 'Edith Wharton', years: '1862–1937', nationality: 'American',
    moroccoConnection: 'Traveled through Morocco in 1917. One of the first Western women to do so.',
    keyWork: 'In Morocco', keyWorkYear: '1920',
    otherWorks: ['The Age of Innocence (1920)'],
    detail: 'Traveled through Morocco in 1917 at the invitation of French Resident-General Lyautey, during a period when the country was largely closed to foreign visitors. Her travelogue describes Fes, Marrakech, Rabat, and Salé with the sharp eye she brought to New York society. Criticized for colonial perspective, but the book remains one of the earliest detailed Western accounts of Moroccan architecture, gardens, and domestic life.',
    location: 'Fes / Marrakech / Rabat', era: 'pre-interzone', color: '#D4A373',
  },
  {
    id: 'eberhardt', name: 'Isabelle Eberhardt', years: '1877–1904', nationality: 'Swiss-Russian',
    moroccoConnection: 'Lived in North Africa from 1897. Traveled extensively in Morocco.',
    keyWork: 'The Oblivion Seekers', keyWorkYear: '1920 (posthumous)',
    otherWorks: ['Vagabond (posthumous)', 'Prisoner of Dunes (posthumous)'],
    detail: 'Converted to Islam, dressed as a man, rode horses through the Sahara, drank and smoked kif, survived an assassination attempt, and drowned in a flash flood at 27. Swiss-born, Russian-speaking, French-writing, Arabic-fluent. She became Si Mahmoud Essaadi. Her journals and stories were published posthumously — fragmentary, fierce, and unlike anything else in colonial-era literature. Bowles translated some of her work.',
    location: 'Across North Africa', era: 'pre-interzone', color: '#0EA5E9',
  },
  {
    id: 'ben-jelloun', name: 'Tahar Ben Jelloun', years: '1944–', nationality: 'Moroccan-French',
    moroccoConnection: 'Born in Fes. Morocco is central to all his work.',
    keyWork: 'The Sacred Night', keyWorkYear: '1987',
    otherWorks: ['The Sand Child (1985)', 'Leaving Tangier (2006)', 'This Blinding Absence of Light (2001)'],
    detail: 'Prix Goncourt winner (1987) — the first Moroccan to win France\'s highest literary prize. Born in Fes, educated in Rabat, lives in Paris. Writes in French about Moroccan realities: gender, immigration, political prisoners, the gap between tradition and modernity. Translated Choukri\'s For Bread Alone into French. His work bridges Moroccan experience and the French literary establishment.',
    location: 'Fes / Rabat / Paris', era: 'modern', color: '#6366F1',
  },
  {
    id: 'matisse', name: 'Henri Matisse', years: '1869–1954', nationality: 'French',
    moroccoConnection: 'Painted in Tangier 1912–1913. Two extended stays.',
    keyWork: 'Window at Tangier', keyWorkYear: '1912',
    otherWorks: ['Zorah on the Terrace (1912)', 'Moroccan Garden (1912)', 'Entrance to the Casbah (1912)'],
    detail: 'Not a writer but essential to Morocco\'s creative mythology. Stayed at the Hotel Villa de France in Tangier. The light changed his palette permanently. His Moroccan paintings are among his most important — luminous, flat, saturated with color. "Morocco helped me make the necessary transition," he said. Room 35 at the Villa de France is now the Matisse Room.',
    location: 'Tangier', era: 'pre-interzone', color: '#C17F28',
  },
  {
    id: 'ibn-battuta', name: 'Ibn Battuta', years: '1304–1368', nationality: 'Moroccan',
    moroccoConnection: 'Born in Tangier. The greatest traveler of the medieval world.',
    keyWork: 'The Rihla', keyWorkYear: '~1355',
    otherWorks: [],
    detail: 'Left Tangier in 1325 at age 21 for the hajj to Mecca. Didn\'t return for 24 years. Traveled 120,000 km across the Islamic world — three times the distance Marco Polo covered. From Mali to China, from the Volga to the Maldives. His Rihla (journey) was dictated to a court scholar in Fes. The original literary Moroccan. Every journey since is a footnote to his.',
    location: 'Tangier / the known world', era: 'pre-interzone', color: '#D4A373',
  },
]

export interface LiteraryLocation {
  name: string
  detail: string
  writers: string[]
}

export const LOCATIONS: LiteraryLocation[] = [
  { name: 'Hotel Muniria, Tangier', detail: 'Room 9. Where Burroughs wrote Naked Lunch. Kerouac and Ginsberg stayed here in 1957.', writers: ['Burroughs', 'Kerouac', 'Ginsberg'] },
  { name: 'Immeuble Itesa, Tangier', detail: 'Bowles\'s apartment from 1947 until his death in 1999. Pilgrimage site for writers worldwide.', writers: ['Bowles'] },
  { name: 'Café de Paris, Tangier', detail: 'Boulevard Pasteur. Haunt of Genet, Bowles, and half the expat intelligentsia.', writers: ['Genet', 'Bowles', 'Capote'] },
  { name: 'Librairie des Colonnes, Tangier', detail: 'Bookshop opened 1949. Beckett, Genet, Bowles, Choukri all associated. Still operating.', writers: ['Beckett', 'Genet', 'Bowles', 'Choukri'] },
  { name: 'Hotel Villa de France, Tangier', detail: 'Where Matisse painted in 1912. Room 35. Where Stein and Toklas stayed in the 1920s.', writers: ['Matisse', 'Stein'] },
  { name: 'Petit Socco (Souq Dakhli), Tangier', detail: 'Heart of the medina. Cafés where kif was smoked and stories were told. Burroughs\'s territory.', writers: ['Burroughs', 'Choukri', 'Mrabet'] },
  { name: 'Djemaa el-Fna, Marrakech', detail: 'The square of storytellers. Where Canetti listened. Where the oral tradition lives.', writers: ['Canetti'] },
  { name: 'Cemetery, Larache', detail: 'Where Jean Genet is buried. Overlooking the Atlantic. One of few major French writers buried in Africa.', writers: ['Genet'] },
]

export const ERAS = [
  { key: 'pre-interzone', label: 'Pre-Interzone (before 1924)', color: '#D4A373', detail: 'Before the International Zone. Ibn Battuta, Eberhardt, Wharton, Matisse. Morocco as expedition.' },
  { key: 'interzone', label: 'The Interzone (1924–1960)', color: '#2D5F8A', detail: 'Tangier as International Zone. Bowles, Burroughs, Gysin, Genet, Canetti. Freedom, drugs, espionage, literature.' },
  { key: 'moroccan-voices', label: 'Moroccan Voices (1960s–1990s)', color: '#F59E0B', detail: 'Choukri, Mrabet, Layachi. Moroccan writers tell their own stories. Often through Bowles\'s translations.' },
  { key: 'modern', label: 'Modern (1980s–present)', color: '#5C7C3E', detail: 'Ben Jelloun, Laila Lalami, Fouad Laroui. Moroccan literature in French, Arabic, and English. Global recognition.' },
]

export const HERO_STATS = [
  { value: '12', label: 'Writers mapped' },
  { value: '1304', label: 'Earliest — Ibn Battuta' },
  { value: '52', label: 'Years Bowles lived in Tangier' },
  { value: '4', label: 'Literary eras' },
]

export const MAP_POINTS = [
  { name: 'Tangier', lat: 35.7595, lng: -5.8340, detail: 'Bowles, Burroughs, Choukri, Mrabet. The Interzone.', color: '#F59E0B' },
  { name: 'Fez', lat: 34.0181, lng: -5.0078, detail: 'Ibn Battuta. Al-Qarawiyyin scholars. Ben Jelloun born here.', color: '#2D5F8A' },
  { name: 'Marrakech', lat: 31.6295, lng: -7.9811, detail: 'Canetti, Orwell. Djemaa el-Fna as literary landscape.', color: '#A0452E' },
  { name: 'Essaouira', lat: 31.5085, lng: -9.7595, detail: 'Orson Welles, Hendrix myth. Wind & writers.', color: '#5D3A5E' },
  { name: 'Casablanca', lat: 33.5731, lng: -7.5898, detail: 'Driss Chraïbi. Urban modernity. Laroui.', color: '#737373' },
  { name: 'Safi', lat: 32.2994, lng: -9.2372, detail: 'Khatibi birthplace. Atlantic intellectual tradition.', color: '#4A7C6F' },
  { name: 'El Jadida', lat: 33.2561, lng: -8.5007, detail: 'Portuguese heritage. Laroui\'s The Year of the Elephant.', color: '#4A7C6F' },
]
