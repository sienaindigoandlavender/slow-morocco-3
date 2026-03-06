// ─────────────────────────────────────────────────
// Morocco's Musical Traditions
// Module 066 — Cultural & Sound Intelligence
// Sources: Wikipedia (multiple), UNESCO ICH,
// Afropop Worldwide, Melodigging, Souffles Monde,
// Music of Morocco (Weebly), MarocMama
// ─────────────────────────────────────────────────

export interface Tradition {
  id: string
  name: string
  arabicName: string
  origin: string
  era: string
  region: string
  instruments: string[]
  keyArtists: string[]
  ritual?: string
  unescoStatus?: string
  detail: string
  color: string
  lat: number
  lng: number
}

export const TRADITIONS: Tradition[] = [
  {
    id: 'gnawa', name: 'Gnawa', arabicName: 'كناوة',
    origin: 'Sub-Saharan Africa via trans-Saharan slave trade',
    era: '16th century onward',
    region: 'Essaouira, Marrakech, Casablanca, Rabat, Tangier',
    instruments: ['Guembri (sintir) — 3-string bass lute, walnut body, camel skin, sheep-gut strings', 'Qraqeb (krakeb) — heavy iron double castanets', 'Tbel — large drum, curved stick', 'Call-and-response vocals'],
    keyArtists: ['Maalem Mahmoud Guinia (Essaouira)', 'Maalem Mokhtar Gania (Essaouira)', 'Maalem Mustapha Baqbou (Marrakech)', 'Hamid El Kasri (Tangier/Rabat)', 'Maalem Hassan Hakmoun', 'Maalem Abdellah El Gourd (Essaouira)', 'Asmaa Hamzaoui & Bnat Timbouktou'],
    ritual: 'Lila — all-night healing ceremony. Led by maalem (master) and moqadma (priestess). Begins with animal sacrifice (dbiha), then aada (procession with acrobatic dance). Seven suites invoke mlouk (spirits) through colours, incense, and rhythms. Participants enter jadba (trance). Each spirit has a colour: white (Moulay Abdelkader), blue (Sidi Moussa/sea), red (Sidi Hamu), black (Lalla Mimouna), yellow (Lalla Mira).',
    unescoStatus: 'UNESCO Intangible Cultural Heritage — inscribed December 2019',
    detail: ' Rooted in the experience of enslaved West Africans (many Bambara-speaking, from present-day Mali) brought to Morocco from the 16th century. The Gnawa claim Bilal ibn Rabah — the first muezzin and the Prophet\'s freed companion — as their patron saint. A Sufi brotherhood fusing African, Arab-Muslim, and Amazigh practices. Once marginalized, now celebrated globally. The Essaouira Gnaoua Festival (founded 1998) draws hundreds of thousands annually. Western collaborators include Brian Jones (1968), Randy Weston, Bill Laswell, Robert Plant, Jimmy Page, Pat Metheny, and Jacob Collier. Nass El Ghiwane drew heavily on Gnawa rhythms in the 1970s.',
    color: '#6A4C93', lat: 31.5085, lng: -9.7595,
  },
  {
    id: 'andalusi', name: 'Andalusi (Al-Ala)', arabicName: 'الآلة',
    origin: 'Al-Andalus (Islamic Iberia), carried to Morocco after Reconquista',
    era: '9th century origins, 13th–15th century migration',
    region: 'Fez, Tetouan, Tangier, Rabat, Meknes, Chefchaouen, Oujda',
    instruments: ['Oud (lute)', 'Rabab (rebec)', 'Kamanja (violin, held vertically)', 'Qanun (zither)', 'Darbouka (goblet drum)', 'Taarija (tambourine)', 'Nay (end-blown flute)'],
    keyArtists: ['Haj Abdelkrim al-Rais (Fez)', 'Ahmed Zaitouni (Tangier)', 'Mohammed Larbi Temsamani (Tetouan)', 'Orchestre al-Brihi de Fès', 'Orchestre du Conservatoire de Tétouan'],
    detail: 'Morocco\'s courtly classical tradition. Attributed to Ziryab (Abu Hassan Ali Ben Nafi), the Iraqi musician who fled Baghdad for Cordoba in the 9th century and invented the nuba suite system. After the fall of Granada (1492), Muslim and Jewish refugees carried the repertoire to Fez, Tetouan, Rabat. Morocco preserves 11 of the original 24 nubat. Each nuba uses one tab\' (mode) and contains 5 mizan (rhythmic sections): basit, qayim wa-nisf, btayhi, darj, quddam. A complete nuba lasts 6–7 hours — rarely performed in full. The Kunnash al-Haik (~1788, Tetouan) is the canonical songbook. Jewish musicians were central to preservation. Andalusi music profoundly shaped flamenco through shared modal structures and rhythmic patterns.',
    color: '#D4A373', lat: 34.0331, lng: -5.0003,
  },
  {
    id: 'amazigh', name: 'Amazigh', arabicName: 'ⵎⵓⵙⵉⴽⴰ ⵏ ⵉⵎⴰⵣⵉⵖⵏ',
    origin: 'Indigenous — pre-dates Arab arrival (7th century)',
    era: 'Thousands of years',
    region: 'High Atlas, Middle Atlas, Anti-Atlas, Souss, Rif, Sahara',
    instruments: ['Bendir (frame drum with snare)', 'Tbel (large double-headed drum)', 'Rebab (single-string fiddle)', 'Lutar (Amazigh lute)', 'Tazammart (double clarinet)', 'Naqus (bell)', 'Hand-clapping'],
    keyArtists: ['Ammouri Mbarek ("John Lennon of the Berbers")', 'Najat Aatabou (500,000-copy debut)', 'Rais Haj Belaid (Souss legend)', 'Ousmane (first Tamazight pop group, 1974)', 'Tinariwen (Grammy 2011)', 'Master Musicians of Joujouka'],
    detail: 'The oldest musical tradition in Morocco. Three main forms: Ahwash — collective village music of southern Morocco (Ouarzazate, Draa, Souss), men and women in rows or circles, call-and-response over bendir drums. Ahidous — collective dance-song of Middle/Eastern High Atlas, facing lines moving in sync. Rrways (Raïs) — travelling professional poet-musicians of the Souss/Chleuh tradition, up to 12 musicians. 9-segment performance: astara (rebab prelude), amarg (sung poetry), tamssust (transition), aberdag (dance), tabbayt (accelerating finale). Guedra — Saharan trance music of the Tuareg. Each village develops its own variant. The rrways historically served as intermediaries between isolated communities, sharing news through poetry.',
    color: '#5C7C3E', lat: 31.50, lng: -6.50,
  },
  {
    id: 'chaabi', name: 'Chaabi', arabicName: 'الشعبي',
    origin: 'Moroccan folk + Andalusi influence + Gnawa grooves',
    era: 'Modern form mid-20th century; roots in centuries-old al-Aita',
    region: 'All urban centres — Casablanca, Marrakech, Fez, Rif',
    instruments: ['Kamanja (violin)', 'Oud', 'Bendir', 'Taarija', 'Darbouka', 'Banjo (introduced by Nass El Ghiwane)', 'Electric guitar'],
    keyArtists: ['Nass El Ghiwane ("Rolling Stones of Africa")', 'Jil Jilala', 'Larbi Batma', 'Attarazat Addahabia (funk pioneer)', 'Hoba Hoba Spirit', 'Bab L\'Bluz'],
    detail: 'Morocco\'s popular music — the soundtrack of weddings, markets, and celebrations. "Chaabi" literally means "of the people." Its oldest ancestor is al-Aita, rural songs in Darija from the Atlantic plains. Modern chaabi blends Andalusi melody, Malhun poetry, Amazigh rhythms, and Gnawa grooves into danceable 6/8 and 2/4 beats. Nass El Ghiwane (formed Casablanca, 1970s) revolutionised chaabi by mixing Gnawa rhythms with protest themes and Western instruments. Member Abderrahman Paco was a Gnawa master from Essaouira. The "Nayda" movement continues to fuse chaabi with rock, reggae, hip-hop, and electronic music.',
    color: '#F59E0B', lat: 33.5731, lng: -7.5898,
  },
  {
    id: 'rai', name: 'Raï', arabicName: 'الراي',
    origin: 'Algeria (Oran), adopted in eastern Morocco',
    era: '1920s origins; entered Morocco mid-20th century',
    region: 'Oujda, Nador, eastern Morocco (Oriental region)',
    instruments: ['Gasba (end-blown flute)', 'Guellal (goblet drum)', 'Synthesizer', 'Electric guitar', 'Derbouka', 'Accordion', 'Drum machines'],
    keyArtists: ['Cheb Khaled (Algeria, global icon)', 'Cheb Mimoun El Oujdi (17 albums)', 'Cheb Hanino', 'Chaba Zahouania'],
    detail: 'Born in Oran, Algeria in the 1920s as expression of social frustration and taboo subjects — alcohol, love, sex, politics. "Raï" means "opinion" or "point of view." Crossed into eastern Morocco through Oujda (14 km from the Algerian border). Known for code-switching between French and Arabic, adding rhetorical effect while expanding audience reach. Addressed subjects other Moroccan genres avoided. The synthesizer-driven "pop raï" of the 1980s–90s became the region\'s first transnational popular music, with Cheb Khaled\'s "Didi" (1992) a global hit.',
    color: '#A0452E', lat: 34.6814, lng: -1.9086,
  },
]

export interface SubTradition {
  name: string
  parent: string
  detail: string
  region: string
}

export const SUB_TRADITIONS: SubTradition[] = [
  { name: 'Malhun', parent: 'andalusi', detail: 'Sung vernacular poetry in Darija. Lengthy qasidas with monorhyme, refrain (harba), and chorus. Rooted in urban craft guilds and Sufi circles. Bridges classical poetics with popular accessibility.', region: 'Meknes, Fez, Marrakech' },
  { name: 'Gharnati', parent: 'andalusi', detail: 'Distinct style from the Granada diaspora. In Morocco, a separate tradition alongside Al-Ala. Preserved particularly in Oujda and Rabat.', region: 'Oujda, Rabat' },
  { name: 'Ahwash', parent: 'amazigh', detail: 'Collective village music of southern Morocco. Men and women in rows or circles. Call-and-response singing with bendir and tbel drums.', region: 'Ouarzazate, Draa, Souss' },
  { name: 'Ahidous', parent: 'amazigh', detail: 'Collective dance-song of Middle/Eastern High Atlas. Men and women form large circles, singing and clapping in synchronisation.', region: 'Middle & Eastern High Atlas' },
  { name: 'Rrways (Raïs)', parent: 'amazigh', detail: 'Travelling poet-musicians of the Souss. Up to 12 musicians. 9-segment performance. Won Académie Charles Cross prize 2021.', region: 'Souss, Agadir, Tiznit' },
  { name: 'Guedra', parent: 'amazigh', detail: 'Saharan trance music of the Tuareg. Named after cooking vessel used as drum. Hypnotic, spiritual, communal.', region: 'Sahara, Guelmim' },
  { name: 'Sufi Samaa', parent: 'andalusi', detail: 'Religious a cappella devotional music. Vocal-only. Music as vehicle for mystical ecstasy.', region: 'Fez, nationwide' },
  { name: 'Al-Aita', parent: 'chaabi', detail: 'Oldest form of chaabi. Rural songs in Darija. Themes of love, hardship, resistance.', region: 'Doukkala, Chaouia' },
]

export const INSTRUMENTS = [
  { name: 'Guembri', arabicName: 'كمبري', type: 'String', tradition: 'Gnawa', detail: '3-string bass lute. Carved from single walnut/mahogany log, camel-skin cover, sheep-gut strings. Register of a double bass.' },
  { name: 'Qraqeb', arabicName: 'قراقب', type: 'Percussion', tradition: 'Gnawa', detail: 'Heavy iron double castanets. Relentless metallic triplet rhythm. Historically evocative of slave chains.' },
  { name: 'Oud', arabicName: 'عود', type: 'String', tradition: 'Andalusi', detail: 'Short-necked fretless lute. 11 or 13 strings. Arabic word gave English "lute."' },
  { name: 'Rabab', arabicName: 'رباب', type: 'String', tradition: 'Andalusi / Amazigh', detail: 'Single-string bowed fiddle. Conductor often leads from rabab. Used in Andalusi orchestras and Amazigh rrways.' },
  { name: 'Kamanja', type: 'String', tradition: 'Andalusi / Chaabi', detail: 'Violin held vertically. Most prominent in Andalusi orchestras. Also the lead instrument in chaabi.' },
  { name: 'Bendir', arabicName: 'بندير', type: 'Percussion', tradition: 'Amazigh', detail: 'Frame drum with snare strings. The heartbeat of Amazigh communal music.' },
  { name: 'Tbel', arabicName: 'طبل', type: 'Percussion', tradition: 'Amazigh / Gnawa', detail: 'Large double-headed drum worn at the waist. Central to ahwash and Ganga performances.' },
  { name: 'Qanun', arabicName: 'قانون', type: 'String', tradition: 'Andalusi', detail: 'Plucked trapezoidal zither. 78 strings in triple courses. Harmonic foundation in orchestras.' },
]

export const HERO_STATS = [
  { value: '5', label: 'Major traditions' },
  { value: '11', label: 'Surviving Andalusi nubat' },
  { value: '2019', label: 'Gnawa — UNESCO inscription' },
  { value: '1', label: 'Language: call-and-response' },
]

export const KEY_NUMBERS = [
  { value: '24 → 11', label: 'Nubat surviving in Morocco', note: 'Of the original 24 suites, 11 survive. A complete nuba lasts 6–7 hours.' },
  { value: '1998', label: 'Essaouira Gnaoua Festival', note: 'Now one of the world\'s largest music festivals. Hundreds of thousands annually.' },
  { value: '1970s', label: 'Nass El Ghiwane era', note: '"Rolling Stones of Africa." Fused Gnawa + protest. Most popular Moroccan band of the century.' },
  { value: '500K', label: 'Najat Aatabou debut copies', note: 'Unprecedented. "J\'en ai Marre" — Amazigh music addressing women\'s rights.' },
  { value: '1492', label: 'Fall of Granada', note: 'Muslims and Jews fled to Fez, Tetouan, Rabat. Carried the Andalusi nuba repertoire.' },
  { value: '7', label: 'Spirit colours in Gnawa lila', note: 'White, blue, red, black, yellow, green, purple. Each invokes specific mlouk.' },
]
