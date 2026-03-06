// ─────────────────────────────────────────────────
// Amazigh Identity Map
// Module 011 — Cultural & Linguistic Intelligence
// ─────────────────────────────────────────────────

export interface Language {
  name: string
  endonym: string
  tifinagh: string
  region: string
  speakers2024: string
  percentage2024: number
  speakers2004: string
  percentage2004: number
  percentage1960: number
  description: string
  keyFeatures: string
  urbanRural: string
  majorCities: string[]
  confederationOrigin: string
  status: string
}

export const THREE_LANGUAGES: Language[] = [
  {
    name: 'Tashelhit',
    endonym: 'Taclḥit / ⵜⴰⵛⵍⵃⵉⵜ',
    tifinagh: 'ⵜⴰⵛⵍⵃⵉⵜ',
    region: 'Souss Valley, Anti-Atlas, western High Atlas, Draa Valley',
    speakers2024: '~5.2 million',
    percentage2024: 14.2,
    speakers2004: '~3.9 million',
    percentage2004: 14.6,
    percentage1960: 15,
    description: 'Spoken across the Souss-Massa, Anti-Atlas, western High Atlas, and Draa Valley. Speakers call themselves Ishilhayen or Chleuh and descend from the Masmuda confederation. Religious manuscripts in Arabic script survive from the 16th century onward, concentrated in the Souss. Present in 1,512 of Morocco\'s 1,538 municipalities — a trade diaspora of small merchants who settled across the kingdom.',
    keyFeatures: 'Three-vowel system (a, i, u). Voiceless consonant clusters so dense some words contain no vowels (tskrkst, "you made it shrivel"). SVO word order. Rich oral literature: fairy tales (timucuha), riddles (tilgitin), improvisational poetry (amarg). Home of Amazigh cinema.',
    urbanRural: 'Souss-Massa: 63.2% Tashelhit speakers, the only majority region. Large urban diaspora in Casablanca and Rabat. Soussi Amazigh trade networks built the corner-shop economy across Morocco.',
    majorCities: ['Agadir', 'Taroudant', 'Tiznit', 'Guelmim', 'Ouarzazate'],
    confederationOrigin: 'Masmuda',
    status: 'Stable but declining in urban areas. Strongest rural retention.',
  },
  {
    name: 'Central Atlas Tamazight',
    endonym: 'Tamaziɣt / ⵜⴰⵎⴰⵣⵉⵖⵜ',
    tifinagh: 'ⵜⴰⵎⴰⵣⵉⵖⵜ',
    region: 'Middle Atlas, central and eastern High Atlas, Tafilalet oases',
    speakers2024: '~2.7 million',
    percentage2024: 7.4,
    speakers2004: '~2.3 million',
    percentage2004: 8.8,
    percentage1960: 10,
    description: 'Central Atlas speakers call themselves Imazighen and use "Tamazight" exclusively for their own language. Spoken across the Middle Atlas, central and eastern High Atlas, east to Taza, west toward Rabat. The territory runs from forested mountains to Tafilalet oases. Home of the Ait Atta ("supertribe," 40 sons of ancestor Dadda Atta), the Ait Yafelman ("those who found peace"), and the Zayanes around Khenifra.',
    keyFeatures: 'High dialectal diversity, valley to valley. Three-vowel phonemic system. Pharyngealized ("emphatic") consonants. No writing tradition before the 20th century. Mutually intelligible with Tashelhit, not with Tarifit.',
    urbanRural: 'Strong presence in Beni Mellal-Khénifra region. Significant urban migration to Casablanca and Meknes. Declining faster than Tashelhit in urban areas.',
    majorCities: ['Khenifra', 'Beni Mellal', 'Azrou', 'Ifrane', 'Errachidia'],
    confederationOrigin: 'Mixed Sanhaja/Zenata',
    status: 'Declining. Lost ~1.4 percentage points between 2004–2024.',
  },
  {
    name: 'Tarifit',
    endonym: 'Tarifit / ⵜⴰⵔⵉⴼⵉⵜ',
    tifinagh: 'ⵜⴰⵔⵉⴼⵉⵜ',
    region: 'Rif Mountains, northeastern Morocco',
    speakers2024: '~1.2 million',
    percentage2024: 3.2,
    speakers2004: '~1.3 million',
    percentage2004: 4.8,
    percentage1960: 7,
    description: 'Spoken in the Rif Mountains by the Riffians (Irifiyen). The Rif produced the only successful anti-colonial guerrilla state in the Maghreb: the Rif Republic (1921–1926) under Abd el-Krim. Tarifit is not mutually intelligible with the southern languages. It shares interdental consonants θ and ð with Kabyle and Shawiya in Algeria, rare cross-linguistically. Smallest Amazigh population in Morocco. Strongest European diaspora, concentrated in the Netherlands, Belgium, and northeastern Spain.',
    keyFeatures: 'Interdental consonants θ and ð, shared only with Kabyle and Shawiya across Berber. Higher Arabic borrowing than Tashelhit. VSO order with restructuring under Arabic contact. Losing speakers faster than any other major Amazigh language.',
    urbanRural: 'Strongest in rural Rif towns. Large diaspora in Netherlands (especially Amsterdam, Utrecht), Belgium, and northeastern Spain (Catalonia). Spanish historically spoken as second language in the Rif zone.',
    majorCities: ['Al Hoceima', 'Nador', 'Driouch', 'Targuist'],
    confederationOrigin: 'Mixed Zenata/Sanhaja (Sanhadjan Rif)',
    status: 'Most endangered. Lost 1.6 percentage points (33%) between 2004–2024.',
  },
]

export interface MinorLanguage {
  name: string
  region: string
  estimatedSpeakers: string
  status: string
  note: string
}

export const MINOR_LANGUAGES: MinorLanguage[] = [
  {
    name: 'Ghomara',
    region: 'Western Rif, between Chefchaouen and Tétouan',
    estimatedSpeakers: '~10,000',
    status: 'Critically endangered',
    note: 'Isolated Masmuda-related language in the northern Rif. Not mutually intelligible with Tarifit. Arabic borrowing exceeds 15% of core vocabulary. Being replaced by Arabic and Tarifit.',
  },
  {
    name: 'Senhaja de Srair',
    region: 'Central Rif Mountains, Ketama area',
    estimatedSpeakers: '~50,000–60,000',
    status: 'Severely endangered',
    note: 'Spoken by the Senhaja tribes of the Srair (central Rif). Related to neither Tarifit nor Ghomara. Unique vocabulary not found elsewhere in Moroccan Amazigh. Arabic borrowing above 15%. The cannabis-growing Ketama region falls within Senhaja territory.',
  },
  {
    name: 'Eastern Zenati / Iznasen',
    region: 'Far northeast, near Berkane and Algerian border',
    estimatedSpeakers: '~20,000–50,000',
    status: 'Endangered',
    note: 'Part of the Zenati branch. Iznasen speakers in the far northeast do not identify with the three IRCAM-recognized languages. Part of a dialect continuum stretching into Algeria.',
  },
  {
    name: 'Figuig',
    region: 'Figuig oasis, far east on Algerian border',
    estimatedSpeakers: '~15,000–20,000',
    status: 'Endangered',
    note: 'Oasis language in the far east. Uses only eight Berber calendar months. Countable mass nouns with gendered forms (a-ɣo "buttermilk" singular vs u-ɣa "bulls" plural). Shares features with Algerian Zenati.',
  },
  {
    name: 'Judeo-Berber',
    region: 'Formerly Souss, Atlas, Draa',
    estimatedSpeakers: '~2,000 (in Israel)',
    status: 'Nearly extinct',
    note: 'Spoken by Jewish Amazigh communities who emigrated to Israel after 1948. Written in Hebrew script. Surviving speakers are elderly, concentrated in Ashkelon and Netivot.',
  },
]

export interface Confederation {
  name: string
  arabic: string
  territory: string
  character: string
  dynastiesBuilt: string[]
  descendants: string
  keyTribes: string[]
}

export const THREE_CONFEDERATIONS: Confederation[] = [
  {
    name: 'Masmuda',
    arabic: 'مصمودة',
    territory: 'High Atlas, Anti-Atlas, Souss Valley, Atlantic plains (Doukkala, Haha)',
    character: 'Sedentary agriculturalists and mountain dwellers. Aristocratic seat at Aghmat in the High Atlas foothills. Practiced irrigation agriculture in terraced valleys. The population base of southern Morocco.',
    dynastiesBuilt: ['Almohad Empire (1121–1269) — united the Masmuda under Ibn Tumart\'s religious movement', 'Hafsid Dynasty (Tunis, 1229–1574) — descended from the Hintata Masmuda'],
    descendants: 'Today\'s Tashelhit speakers. The Shilha/Chleuh people. Sub-tribes include Haha (Essaouira–Agadir coast), Seksawa (western High Atlas), Ida Ou Tanan (Anti-Atlas), Amanouz (Ait Baha), Hintata, Glawa (eastern High Atlas). The Regraga of Essaouira held pre-Islamic religious authority.',
    keyTribes: ['Haha (Ihahan)', 'Seksawa', 'Hintata', 'Glawa', 'Regraga', 'Gedmiwa', 'Ida Ou Tanan', 'Ait Baamrane'],
  },
  {
    name: 'Sanhaja',
    arabic: 'صنهاجة',
    territory: 'Three separate confederations: (1) Kabyle mountains of Algeria, (2) Saharan "veiled Sanhaja" from Mauritania to Niger, (3) Atlas Mountains of Morocco — Middle Atlas, parts of the Rif',
    character: 'The most geographically dispersed. Ranged from Kabyle Algeria to Saharan Mauritania. In Morocco: Middle Atlas and parts of the Rif. The Saharan Sanhaja (Lamtuna, Massufa, Guddala) were veiled Tuareg-related nomads who became the Almoravids.',
    dynastiesBuilt: ['Almoravid Empire (1040–1147) — founded by Sanhaja Lamtuna nomads, unified Morocco and al-Andalus', 'Zirid Dynasty (Algeria, 972–1148)', 'Hammadid Dynasty (Algeria, 1014–1152)', 'Fatimid Caliphate (initially, via Kutama Sanhaja)'],
    descendants: 'Central Atlas Tamazight speakers. The Ait Yafelman confederation ("those who found peace"): Ait Marghad, Ait Hadiddou, Ait Izdeg, Ait Ayach. Also the Sanhadjan Rif — Sanhaja groups integrated into the northern Rif under the Almohads, now speaking Tarifit.',
    keyTribes: ['Ait Yafelman', 'Ait Hadiddou', 'Zayanes (Khenifra)', 'Lamtuna', 'Massufa', 'Kutama (Algeria)', 'Haskura'],
  },
  {
    name: 'Zenata',
    arabic: 'زناتة',
    territory: 'Eastern Morocco, northern plains, Fez region, stretching east into Algeria, Tunisia, Libya (Tripolitania origin)',
    character: 'Nomadic and semi-nomadic pastoralists. Ibn Khaldun classified them as "Butr" (nomads), emphasizing their horsemanship. Migrated from Tripolitania (Libya) westward across the Maghreb. Dominated post-Almohad Morocco.',
    dynastiesBuilt: ['Marinid Dynasty (1244–1465) — "Zenata century" of Moroccan history', 'Wattasid Dynasty (1472–1554)', 'Zayyanid Dynasty (Tlemcen, Algeria, 1235–1556)', 'Midrarid Emirate (Sijilmasa, 757–976)'],
    descendants: 'Historically dominant in eastern Morocco. Much of their territory is now Arabized — the Zenata language zone shifted to Arabic during the post-Almohad period and the Banu Hilal invasions. Small Zenati-speaking pockets survive in the far east (Iznasen, Figuig).',
    keyTribes: ['Maghrawa (controlled Fez, 10th–11th C)', 'Banu Ifran (Tlemcen, Tadla)', 'Miknasa (founded Sijilmasa)', 'Jarawa', 'Banu Marin (Marinids)'],
  },
]

export interface TifinaghPhase {
  name: string
  period: string
  description: string
  geography: string
  keyFact: string
}

export const TIFINAGH_EVOLUTION: TifinaghPhase[] = [
  {
    name: 'Libyco-Berber (Eastern)',
    period: '~6th century BCE – 4th century CE',
    description: 'Abjad (consonantal) writing system, ~24 signs, no vowels. Used by the Numidian kingdoms (202–25 BCE). The Dougga bilingual inscription (Punic-Libyc, ~146 BCE) cracked 22 of 24 Eastern characters through Punic comparison.',
    geography: 'Constantine, Aurès, Tunisia — concentrated in eastern Numidia.',
    keyFact: 'Over 1,300 known inscriptions across North Africa, mostly short: personal names, funerary dedications, and territorial markers.',
  },
  {
    name: 'Libyco-Berber (Western)',
    period: '~1st century BCE – 4th century CE',
    description: 'Western variant, sometimes called proto-Tifinagh. Found across Morocco and western Algeria. The Azib n\'Ikkis inscription in the Yagour plateau (High Atlas) and the Oukaïmeden engravings are among the most significant Moroccan examples. Undeciphered — no bilingual keys exist. More angular, geometric signs than the Eastern form.',
    geography: 'Morocco (High Atlas, Volubilis), western Algeria, debated presence in the Canary Islands.',
    keyFact: 'The Azib n\'Ikkis "Man with the Inscription" — a human figure engraved beside Libyco-Berber text — may date to the Bronze Age, potentially making it 3,000+ years old.',
  },
  {
    name: 'Traditional Tuareg Tifinagh',
    period: '~5th century CE – present',
    description: 'Libyco-Berber died out in Roman-controlled northern Africa. The script survived among the Tuareg in the Sahara. Tuareg Tifinagh evolved new letters and introduced a vertical line for the vowel /a/. Still used in southern Algeria, Mali, Niger, and Burkina Faso. Four distinct Tuareg alphabets exist (Ahaggar, Ajjer, Air, and others).',
    geography: 'Sahara: Tadrart Acacus (Libya), Tassili n\'Ajjer (Algeria), Aïr Mountains (Niger).',
    keyFact: 'Modern Tuareg can still read and interpret ancient Tifinagh inscriptions — a living continuity of 2,500+ years.',
  },
  {
    name: 'Neo-Tifinagh',
    period: '1966 – present',
    description: 'Created by the Académie Berbère (Agraw Imazighen), founded 1966 by Kabyle expatriates in Paris. They adapted Tuareg characters into a modern alphabet, rejecting Latin and Arabic scripts. Ammar Negadi and Messaoud Nedjahi refined the set from ~50 to 26 signs. Morocco arrested people using Neo-Tifinagh in the 1980s–90s. IRCAM adopted a 33-character version in 2003 as official orthography. Most Amazigh speakers cannot read it. A 2011 survey found 45.5% considered it the most appropriate script. Use remains restricted to signage, road signs, and public visibility. 1.5% of literate Moroccans read and write Berber.',
    geography: 'Now official in Morocco and Algeria. Visible on Moroccan road signs, government buildings, banknotes (though Amazigh activists note Tifinagh was absent from new 2023 banknotes).',
    keyFact: 'One reader of the Académie Berbère\'s Neo-Tifinagh publications described its effect as "the proof that we actually existed."',
  },
]

export interface HistoryEvent {
  year: string
  event: string
  thread: string
}

export const HISTORY: HistoryEvent[] = [
  { year: '~1000 BCE', event: 'Earliest Libyco-Berber inscriptions. Geometric signs carved alongside rock art in the High Atlas (Oukaïmeden, Azib n\'Ikkis) and across the Sahara.', thread: 'script' },
  { year: '~146 BCE', event: 'Dougga bilingual inscription (Tunisia). Punic-Libyc text on Prince Ateban\'s mausoleum. Becomes the key to deciphering 22 of 24 Eastern Libyco-Berber characters.', thread: 'script' },
  { year: '~40 CE', event: 'Roman annexation of Mauretania. Libyco-Berber writing begins to decline in northern Africa under Roman, then Byzantine, administration. Survives in the Sahara among the Tuareg.', thread: 'script' },
  { year: '682 CE', event: 'Arab conquest reaches Morocco. Uqba ibn Nafi\'s expedition. Gradual Islamization of Berber populations begins — Arabic becomes the language of religion, administration, and trade. Berber remains the spoken language of the mountains.', thread: 'decline' },
  { year: '740', event: 'Great Berber Revolt. Zenata chieftain Khalid ibn Hamid al-Zanati leads Berber rebels against the Umayyad Caliphate. Major victories at the Battle of the Nobles and Battle of Bagdoura. Morocco breaks from caliphal control.', thread: 'resistance' },
  { year: '1040–1147', event: 'Almoravid Empire. Sanhaja Lamtuna Berbers from Mauritania conquer Morocco and al-Andalus. Arabic remains language of court and religion; Berber language maintains dominance in daily life.', thread: 'dynasty' },
  { year: '1121–1269', event: 'Almohad Empire. Masmuda Berbers under Ibn Tumart (from Tinmal, High Atlas) unify the entire Maghreb and al-Andalus. The last great Berber empire — but Arabic consolidates as the administrative language.', thread: 'dynasty' },
  { year: '12th–15th C', event: 'Banu Hilal and Banu Ma\'qil Arab Bedouins settle across Moroccan plains. Zenata and some Masmuda lowland populations begin shifting to Arabic. Mountains and south remain Amazigh-speaking.', thread: 'decline' },
  { year: '1244–1465', event: 'Marinid Dynasty. Zenata Berbers rule Morocco but administer in Arabic. Berber identity fragments as political power and prestige shift to Arabized urban culture.', thread: 'dynasty' },
  { year: '1912', event: 'French Protectorate begins. Colonial "Berber policy" (politique berbère) attempts to separate Amazigh from Arab populations, codifying customary law separately. The Berber Dahir of 1930 becomes a rallying point for Moroccan nationalism — but also permanently links Amazigh identity to a divisive colonial strategy.', thread: 'decline' },
  { year: '1930', event: 'Berber Dahir. French decree placing Amazigh regions under customary law instead of Islamic law. Provokes massive nationalist protests in Arab cities. The nationalists\' slogan — "Islam is in danger" — establishes the Arab-Islamic frame that will dominate post-independence Morocco, marginalizing Amazigh identity as a colonial relic.', thread: 'decline' },
  { year: '1956', event: 'Moroccan independence. Arabization policy begins immediately. Arabic declared sole official language. Amazigh language excluded from schools, courts, civil registry. Amazigh first names banned. The new state treats Berber identity as a threat to national unity — a direct legacy of the French Berber Dahir controversy.', thread: 'decline' },
  { year: '1960', event: 'First post-independence census. 32–34% of Moroccans reported as Berber-speaking. Down from estimated 40–45% at the start of colonialism. The trajectory of decline accelerates with urbanization, schooling exclusively in Arabic, and the prestige economy of Arabized cities.', thread: 'census' },
  { year: '1966', event: 'Académie Berbère (Agraw Imazighen) founded in Paris by Kabyle Algerians. Develops Neo-Tifinagh as a modern alphabet. Creates calendars, publications, and the Yaz symbol (ⵣ) that will become the Amazigh flag emblem. Seeds of a pan-Amazigh identity movement.', thread: 'resistance' },
  { year: '1970', event: 'Amazigh flag designed. Blue (Mediterranean), green (nature/Atlas), yellow (Sahara) horizontal stripes with the red Tifinagh letter Yaz (ⵣ) at center. Begins appearing at demonstrations in the 1980s.', thread: 'resistance' },
  { year: '1980', event: 'Berber Spring (Algeria). Authorities cancel a lecture by Kabyle poet Mouloud Mammeri. Weeks of protests and arrests. The event catalyzes Amazigh cultural movements across North Africa. In Morocco, the movement proclaims itself "Amazigh Cultural Movement" under intensifying state repression.', thread: 'resistance' },
  { year: '1991', event: 'Agadir Charter. First common platform of the Moroccan Amazigh Movement. Demands linguistic rights, cultural recognition, and historical justice. Addressed to the Royal Cabinet and political forces.', thread: 'resistance' },
  { year: '1994', event: 'King Hassan II acknowledges Amazigh heritage in a speech. Announces that Amazigh dialects will acquire formal status. Tamazight TV summaries begin — three times daily in Tashelhit, Tamazight, and Tarifit. A cautious opening.', thread: 'recognition' },
  { year: '2001', event: 'King Mohammed VI creates the Royal Institute of Amazigh Culture (IRCAM) by royal decree (Dahir 1-01-299, 17 October). Board of experts, artists, and activists — all royally appointed. Tasked with standardizing the language, developing teaching materials, and promoting Amazigh culture. A landmark, but critics note IRCAM answers to the king, not the movement.', thread: 'recognition' },
  { year: '2003', event: 'IRCAM adopts Neo-Tifinagh as the official script for Standard Moroccan Amazigh. Controversial: the decision was "political rather than practical" — most speakers do not use Tifinagh. The choice was a compromise between Latin-script advocates (associated with Western influence) and Arabic-script advocates (associated with Islamic identity). Teaching in schools officially begins.', thread: 'recognition' },
  { year: '2004', event: 'Census counts 28.2% Amazigh speakers: Tashelhit 14.6%, Central Tamazight 8.8%, Tarifit 4.8%.', thread: 'census' },
  { year: '2010', event: 'Tamazight TV channel launches — Morocco\'s first dedicated Amazigh television.', thread: 'recognition' },
  { year: '2011', event: 'Arab Spring protests. February 20 Movement prominently includes Amazigh demands. New constitution recognizes Tamazight as an official language alongside Arabic (Article 5). First such recognition in a North African state\'s foundational document.', thread: 'recognition' },
  { year: '2014', event: 'Census counts 26% Amazigh speakers: Tashelhit 14.1%, Central Tamazight 7.9%, Tarifit 4.0%. Amazigh organizations contest methodology.', thread: 'census' },
  { year: '2019', event: 'Organic Law 26-16 finally passed — operationalizes Article 5 of the 2011 Constitution. Provides for Tamazight use in parliament, public institutions, courts, and workplaces. Eight years after the constitutional recognition.', thread: 'recognition' },
  { year: '2023', event: 'Yennayer (Amazigh New Year, ~January 13) officially recognized as a national paid holiday by King Mohammed VI on 3 May. Morocco joins Algeria (2018) in formal recognition. But the same month, the Education Minister declares full Tamazight teaching rollout impossible before 2030.', thread: 'recognition' },
  { year: '2024 (census)', event: '24.8% of Moroccans speak Tamazight: Tashelhit 14.2%, Central Tamazight 7.4%, Tarifit 3.2%. 19.9% in urban areas, 33.3% in rural areas. Only 1.5% of literate Moroccans can read and write Berber. Only 31% of primary schools teach Tamazight. Amazigh Movement rejects the figures as "cultural and linguistic genocide" — claims the real rate is 65–85%.', thread: 'census' },
  { year: '2024 (land)', event: 'Moroccan Ministry of Agriculture demarcates 111,000 hectares of Indigenous Amazigh collective lands (Official Bulletin No. 7282). Part of a larger plan to privatize 15 million hectares of "collective lands" (Melkisation) — enacted without Amazigh Free, Prior and Informed Consent.', thread: 'land' },
]

export const THREAD_META: Record<string, { label: string; color: string }> = {
  script: { label: 'Script', color: '#E8A94E' },
  decline: { label: 'Decline', color: '#A0452E' },
  resistance: { label: 'Resistance', color: '#8B2FC9' },
  dynasty: { label: 'Dynasties', color: '#8B7355' },
  census: { label: 'Census', color: '#2D5F8A' },
  recognition: { label: 'Recognition', color: '#5C7C3E' },
  land: { label: 'Land Rights', color: '#D97706' },
}

export interface CensusPoint {
  year: number
  label: string
  total: number
  tashelhit?: number
  tamazight?: number
  tarifit?: number
  note: string
}

export const CENSUS_DATA: CensusPoint[] = [
  { year: 1900, label: '~1900', total: 45, note: 'Colonial-era estimates: 40–45% Berber-speaking at the start of French/Spanish protectorate period.' },
  { year: 1960, label: '1960', total: 34, note: 'First post-independence census. 32–34% Berber-speaking. Arabization policy already in effect.' },
  { year: 2004, label: '2004', total: 28.2, tashelhit: 14.6, tamazight: 8.8, tarifit: 4.8, note: '3.89M Tashelhit, 2.34M Central Tamazight, 1.27M Tarifit.' },
  { year: 2014, label: '2014', total: 26, tashelhit: 14.1, tamazight: 7.9, tarifit: 4.0, note: 'Contested by Amazigh organizations.' },
  { year: 2024, label: '2024', total: 24.8, tashelhit: 14.2, tamazight: 7.4, tarifit: 3.2, note: '19.9% urban, 33.3% rural. Movement claims 65–85%.' },
]

export const HERO_STATS = [
  { value: '24.8%', label: 'speakers (2024 census)' },
  { value: '3', label: 'major languages' },
  { value: '3,000+', label: 'years of Tifinagh script' },
  { value: '2011', label: 'official language status' },
]

export const KEY_NUMBERS = [
  { value: '~9.1M', context: 'Amazigh speakers in Morocco (2024 census). Movement claims 29.6M+ (including those who lost the language but retain identity).' },
  { value: '5', context: 'Minor languages on the edge: Ghomara, Senhaja de Srair, Iznasen, Figuig, and Judeo-Berber. Most critically endangered or extinct.' },
  { value: '1,300+', context: 'Known Libyco-Berber inscriptions across North Africa — from the Canary Islands to the Siwa Oasis of Egypt.' },
  { value: '31%', context: 'Of Moroccan primary schools teach Tamazight. Government target: 50% by 2025–26 school year. Full rollout by 2030.' },
  { value: '900+', context: 'Amazigh associations active in Morocco. Successor to a century of armed tribal resistance against France.' },
  { value: '1.5%', context: 'Of literate Moroccans read and write Berber. Tifinagh appears on every road sign. Functional literacy lags symbolic recognition.' },
]

export const TIFINAGH_ALPHABET = [
  { letter: 'ⵣ', name: 'Yaz', latin: 'z', note: 'The emblem on the Amazigh flag. From the root of "Amazigh."' },
  { letter: 'ⴰ', name: 'Ya', latin: 'a', note: 'The vowel /a/.' },
  { letter: 'ⴱ', name: 'Yab', latin: 'b', note: '' },
  { letter: 'ⴳ', name: 'Yag', latin: 'g', note: '' },
  { letter: 'ⴷ', name: 'Yad', latin: 'd', note: '' },
  { letter: 'ⴻ', name: 'Yey', latin: 'e', note: 'Central vowel, often written but not always pronounced.' },
  { letter: 'ⴼ', name: 'Yaf', latin: 'f', note: '' },
  { letter: 'ⴽ', name: 'Yak', latin: 'k', note: '' },
  { letter: 'ⵀ', name: 'Yah', latin: 'h', note: '' },
  { letter: 'ⵃ', name: 'Yaḥ', latin: 'ḥ', note: 'Pharyngeal fricative. Shared with Arabic.' },
  { letter: 'ⵄ', name: 'Yaɛ', latin: 'ɛ', note: 'Pharyngeal approximant. Shared with Arabic (ع).' },
  { letter: 'ⵅ', name: 'Yakh', latin: 'x', note: '' },
  { letter: 'ⵇ', name: 'Yaq', latin: 'q', note: '' },
  { letter: 'ⵉ', name: 'Yi', latin: 'i', note: 'The vowel /i/.' },
  { letter: 'ⵊ', name: 'Yaj', latin: 'j', note: '' },
  { letter: 'ⵍ', name: 'Yal', latin: 'l', note: '' },
  { letter: 'ⵎ', name: 'Yam', latin: 'm', note: '' },
  { letter: 'ⵏ', name: 'Yan', latin: 'n', note: '' },
  { letter: 'ⵓ', name: 'Yu', latin: 'u', note: 'The vowel /u/.' },
  { letter: 'ⵔ', name: 'Yar', latin: 'r', note: '' },
  { letter: 'ⵖ', name: 'Yaɣ', latin: 'ɣ', note: 'Voiced velar fricative. The "gh" sound.' },
  { letter: 'ⵙ', name: 'Yas', latin: 's', note: '' },
  { letter: 'ⵛ', name: 'Yash', latin: 'c/š', note: '' },
  { letter: 'ⵜ', name: 'Yat', latin: 't', note: '' },
  { letter: 'ⵟ', name: 'Yaṭ', latin: 'ṭ', note: 'Pharyngealized (emphatic) T.' },
  { letter: 'ⵡ', name: 'Yaw', latin: 'w', note: 'Semi-vowel.' },
  { letter: 'ⵢ', name: 'Yay', latin: 'y', note: 'Semi-vowel.' },
]

export const BIBLIOGRAPHY = [
  { id: 1, source: 'Morocco High Commission for Planning (HCP)', detail: '2024 General Census of Population and Housing (RGPH). December 2024. 24.8% Amazigh speakers.' },
  { id: 2, source: 'IWGIA', detail: 'The Indigenous World 2025: Morocco. International Work Group for Indigenous Affairs.' },
  { id: 3, source: 'Ibn Khaldun', detail: 'Kitāb al-ʿIbar (The Book of Lessons). 14th century. Primary source on Masmuda, Sanhaja, Zenata confederations.' },
  { id: 4, source: 'IRCAM', detail: 'Royal Institute of Amazigh Culture. Standardization of Neo-Tifinagh (2003), MOOC platform (2024).' },
  { id: 5, source: 'Wikipedia / Ethnologue', detail: 'Berber languages, Tifinagh, Libyco-Berber alphabet, Standard Moroccan Amazigh entries. Multiple access dates 2024–2025.' },
  { id: 6, source: 'Minority Rights Group', detail: 'Amazigh New Year in Morocco: A Milestone for Indigenous Rights? March 2024.' },
  { id: 7, source: 'British Museum / TARA', detail: 'Rock Art Image Project: "Written in Stone" — Libyco-Berber inscriptions documentation.' },
  { id: 8, source: 'INALCO', detail: 'The Tifinagh/Berber Alphabet: History and Current Status. Institut National des Langues et Civilisations Orientales.' },
]

export const MAP_POINTS = [
  { name: 'Tashelhit Zone', lat: 30.4, lng: -8.5, detail: 'Souss, Anti-Atlas, High Atlas west. ~8M speakers. Largest Amazigh group.', color: '#A0452E' },
  { name: 'Tamazight Zone', lat: 32.3, lng: -5.8, detail: 'Central Atlas, eastern High Atlas. ~5M speakers. Aït Atta, Aït Hadiddou.', color: '#2D5F8A' },
  { name: 'Tarifit Zone', lat: 35.0, lng: -3.5, detail: 'Rif mountains. ~4M speakers. Declining fastest in urban areas.', color: '#5C7C3E' },
  { name: 'Casablanca', lat: 33.57, lng: -7.59, detail: 'Urban diaspora. Soussi trade networks built the corner-shop economy.', color: '#737373' },
  { name: 'Rabat', lat: 34.02, lng: -6.84, detail: 'IRCAM headquarters (Royal Institute of Amazigh Culture, est. 2001).', color: '#737373' },
  { name: 'Agadir', lat: 30.43, lng: -9.60, detail: 'Souss capital. Tashelhit heartland. University offers Amazigh studies.', color: '#A0452E' },
  { name: 'Nador', lat: 35.17, lng: -2.93, detail: 'Tarifit stronghold. Rif movement center.', color: '#5C7C3E' },
  { name: 'Errachidia', lat: 31.93, lng: -4.43, detail: 'Draa-Tafilalet. Central Tamazight. Oasis communities.', color: '#2D5F8A' },
]
