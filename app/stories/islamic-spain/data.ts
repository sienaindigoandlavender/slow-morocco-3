// Islamic Spain — 781 Years of Al-Andalus
// Sources: Historical records, UNESCO research
// Synthesized from: Britannica, World History Encyclopedia, Met Museum,
// Richard Bulliet conversion model, Colmeiro, Lévi-Provençal

// ─────────────────────────────────────────────────
// ERAS
// ─────────────────────────────────────────────────

export type EraId = 'conquest' | 'emirate' | 'caliphate' | 'taifas' | 'berber' | 'decline' | 'fall'

export interface Era {
  id: EraId
  label: string
  range: string
  color: string
  summary: string
}

export const ERAS: Era[] = [
  {
    id: 'conquest',
    label: 'The Conquest',
    range: '711–756',
    color: '#E63946',
    summary: 'Tariq ibn Ziyad crosses the Strait. Within seven years, nearly all of Iberia is under Muslim rule.',
  },
  {
    id: 'emirate',
    label: 'The Emirate',
    range: '756–929',
    color: '#F77F00',
    summary: 'An Umayyad prince escapes massacre in Damascus and founds an independent emirate in Córdoba. 173 years of consolidation.',
  },
  {
    id: 'caliphate',
    label: 'The Caliphate',
    range: '929–1031',
    color: '#FCBF49',
    summary: 'Abd al-Rahman III declares a caliphate. Córdoba becomes the largest city in Europe by population. ',
  },
  {
    id: 'taifas',
    label: 'The Taifa Kingdoms',
    range: '1031–1086',
    color: '#72EFDD',
    summary: 'The caliphate fractures into ~30 rival kingdoms. Toledo falls to Castile.',
  },
  {
    id: 'berber',
    label: 'The Berber Dynasties',
    range: '1086–1238',
    color: '#48BFE3',
    summary: 'Almoravids and Almohads cross from Morocco to rescue — then absorb — Al-Andalus. North Africa rules Iberia.',
  },
  {
    id: 'decline',
    label: 'The Retreat',
    range: '1212–1248',
    color: '#F77F00',
    summary: 'Las Navas de Tolosa breaks the Almohad spine. Córdoba, Seville, Valencia fall in rapid succession. Only Granada remains.',
  },
  {
    id: 'fall',
    label: 'The Nasrid Emirate & Fall',
    range: '1238–1492',
    color: '#E63946',
    summary: 'Granada: the last Muslim kingdom. 254 years as a vassal state — building the Alhambra while paying tribute to Castile.',
  },
]

export const ERA_MAP: Record<EraId, Era> = Object.fromEntries(ERAS.map(e => [e.id, e])) as Record<EraId, Era>

// ─────────────────────────────────────────────────
// TIMELINE EVENTS
// ─────────────────────────────────────────────────

export interface TimelineEvent {
  id: string
  year: string
  title: string
  detail: string
  era: EraId
  major?: boolean
  dataValue?: string
  dataLabel?: string
  mapFocus?: { center: [number, number]; zoom: number }
}

export const TIMELINE: TimelineEvent[] = [
  // THE CONQUEST
  {
    id: 'tariq-711',
    year: '711',
    title: 'Tariq ibn Ziyad Crosses the Strait',
    detail: 'A Berber commander with ~7,000 troops lands at Gibraltar — Jabal Ṭāriq, "Mountain of Tariq." The Visigothic kingdom collapses at the Battle of Guadalete. Within months, Córdoba and Toledo fall.',
    era: 'conquest',
    major: true,
    dataValue: '~7,000',
    dataLabel: 'initial troops',
    mapFocus: { center: [-5.345, 36.14], zoom: 8 },
  },
  {
    id: 'musa-712',
    year: '712',
    title: 'Musa ibn Nusayr Arrives with Reinforcements',
    detail: 'The Arab governor of Ifriqiya crosses with 18,000 Arab soldiers. Seville, Mérida, Zaragoza taken. By 714, Muslim forces reach the Pyrenees.',
    era: 'conquest',
    dataValue: '18,000',
    dataLabel: 'Arab reinforcements',
  },
  {
    id: 'narbonne-720',
    year: '720',
    title: 'Narbonne Taken — The Furthest Point',
    detail: 'Muslim armies push into southern Gaul. Narbonne becomes the northernmost outpost of the Islamic world. Held until 759.',
    era: 'conquest',
    mapFocus: { center: [3.0, 43.18], zoom: 7 },
  },
  {
    id: 'tours-732',
    year: '732',
    title: 'Battle of Tours',
    detail: 'Charles Martel halts the Muslim advance near Poitiers. The frontier stabilizes along the Pyrenees.',
    era: 'conquest',
    major: true,
    mapFocus: { center: [0.7, 46.5], zoom: 6 },
  },

  // THE EMIRATE
  {
    id: 'abd-rahman-756',
    year: '756',
    title: 'Abd al-Rahman I — The Exile Becomes Emir',
    detail: 'The last Umayyad prince escapes the Abbasid massacre in Damascus, crosses North Africa, and declares an independent emirate in Córdoba. He plants Syrian palms in the courtyard and weeps for the homeland he will never see again.',
    era: 'emirate',
    major: true,
    mapFocus: { center: [-4.779, 37.879], zoom: 9 },
  },
  {
    id: 'mosque-785',
    year: '785',
    title: 'Great Mosque of Córdoba — Construction Begins',
    detail: 'Abd al-Rahman I begins building the Great Mosque on the site of a Visigothic church. Double-tiered horseshoe arches in red and white. It will be expanded four times over 200 years.',
    era: 'emirate',
    major: true,
    dataValue: '856',
    dataLabel: 'columns at completion',
    mapFocus: { center: [-4.779, 37.879], zoom: 13 },
  },
  {
    id: 'agriculture-800',
    year: 'c. 800',
    title: 'The Agricultural Revolution',
    detail: 'The Moors introduce irrigation systems (acequias), waterwheels (norias), and new crops: oranges, lemons, rice, sugarcane, cotton, saffron, pomegranates. Spain\'s landscape transforms.',
    era: 'emirate',
  },
  {
    id: 'ziryab-822',
    year: '822',
    title: 'Ziryab Arrives in Córdoba',
    detail: 'A Baghdad-trained polymath revolutionizes Andalusi culture: introduces seasonal fashion, three-course dining, new musical modes on the oud (adding a fifth string), toothpaste, deodorant, and tablecloths.',
    era: 'emirate',
  },

  // THE CALIPHATE
  {
    id: 'caliphate-929',
    year: '929',
    title: 'Abd al-Rahman III Declares the Caliphate',
    detail: 'After 17 years crushing revolts and unifying the peninsula, he claims the title of Caliph — challenging both Baghdad and Cairo.  His 49-year reign is the longest.',
    era: 'caliphate',
    major: true,
    dataValue: '49',
    dataLabel: 'year reign',
  },
  {
    id: 'azahara-936',
    year: '936',
    title: 'Medina Azahara — The Palace City',
    detail: 'Abd al-Rahman III builds a palatial city 8 km west of Córdoba. 4,000 columns, mercury pools that catch sunlight, 15,000 doors. It lasts 65 years before civil war destroys it.',
    era: 'caliphate',
    major: true,
    dataValue: '4,000',
    dataLabel: 'columns',
    mapFocus: { center: [-4.866, 37.886], zoom: 12 },
  },
  {
    id: 'hakam-961',
    year: '961',
    title: 'Al-Hakam II — The Scholar-Caliph',
    detail: 'Inherits the caliphate and builds a royal library of 400,000+ volumes — when the largest library in Christian Europe holds 400. Sends agents across the Islamic world to acquire manuscripts.',
    era: 'caliphate',
    dataValue: '400,000+',
    dataLabel: 'library volumes',
  },
  {
    id: 'cordoba-1000',
    year: 'c. 1000',
    title: 'Córdoba — Largest City in Europe',
    detail: 'Population ~500,000. Paved streets with oil lamps. 70 libraries. 900 public baths. 80,000 shops. Running water in homes. London has ~20,000 people. Paris fewer still.',
    era: 'caliphate',
    major: true,
    dataValue: '~500,000',
    dataLabel: 'population',
    mapFocus: { center: [-4.779, 37.879], zoom: 9 },
  },
  {
    id: 'almanzor-997',
    year: '997',
    title: 'Almanzor Sacks Santiago de Compostela',
    detail: 'The vizier who rules in all but name. 57 campaigns, never defeated. He forces Christian prisoners to carry the cathedral bells to Córdoba — where they are melted into lamps for the Great Mosque.',
    era: 'caliphate',
    dataValue: '57',
    dataLabel: 'campaigns undefeated',
    mapFocus: { center: [-8.544, 42.880], zoom: 8 },
  },

  // THE TAIFAS
  {
    id: 'fitna-1009',
    year: '1009–31',
    title: 'Fitna — The Civil War',
    detail: 'After Almanzor\'s sons lose power, a brutal civil war shatters the caliphate. Medina Azahara is looted and burned. Berber and Slavic factions tear the state apart. By 1031, the caliphate is formally abolished.',
    era: 'taifas',
    major: true,
  },
  {
    id: 'taifas-1031',
    year: '1031',
    title: 'The Taifa Kingdoms Emerge',
    detail: 'Al-Andalus fractures into ~30 rival kingdoms: Seville, Granada, Zaragoza, Badajoz, Valencia, Toledo, Almería. Each court a miniature caliphate — brilliant poets, paralyzed armies.',
    era: 'taifas',
    dataValue: '~30',
    dataLabel: 'rival kingdoms',
  },
  {
    id: 'toledo-1085',
    year: '1085',
    title: 'Toledo Falls to Alfonso VI',
    detail: 'The first major city to fall to the Reconquista. Sends shockwaves across the peninsula. The taifa kings panic — and turn to Morocco for help. The decision changes everything.',
    era: 'taifas',
    major: true,
    mapFocus: { center: [-4.022, 39.857], zoom: 8 },
  },

  // BERBER DYNASTIES
  {
    id: 'almoravids-1086',
    year: '1086',
    title: 'Yusuf ibn Tashfin Crosses the Strait',
    detail: 'The Almoravid sultan answers the taifas\' call. Defeats Castile at the Battle of Sagrajas. Then — instead of leaving — deposes the taifa kings and absorbs Al-Andalus into his Moroccan empire.',
    era: 'berber',
    major: true,
    mapFocus: { center: [-5.3, 36.0], zoom: 6 },
  },
  {
    id: 'cid-1094',
    year: '1094',
    title: 'El Cid Takes Valencia',
    detail: 'Rodrigo Díaz de Vivar — a Castilian exile who fought for Muslim and Christian lords alike — captures Valencia and rules it until his death. A man between worlds.',
    era: 'berber',
    mapFocus: { center: [-0.375, 39.469], zoom: 8 },
  },
  {
    id: 'almohads-1147',
    year: '1147',
    title: 'The Almohads Replace the Almoravids',
    detail: 'A new Berber dynasty from the Atlas Mountains. Stricter theology, grander architecture. They build the Koutoubia, the Giralda, and the Hassan Tower — three sister minarets across two continents.',
    era: 'berber',
    major: true,
  },
  {
    id: 'averroes-1180',
    year: 'c. 1180',
    title: 'Ibn Rushd (Averroes) — The Commentator',
    detail: 'Born in Córdoba. His commentaries on Aristotle reignite Greek philosophy in medieval Europe. Thomas Aquinas calls him simply "The Commentator." Europe\'s Renaissance starts here.',
    era: 'berber',
    mapFocus: { center: [-4.779, 37.879], zoom: 9 },
  },
  {
    id: 'maimonides',
    year: 'c. 1190',
    title: 'Maimonides — Guide for the Perplexed',
    detail: 'Moses ben Maimon: born in Córdoba, educated in Fes, died in Cairo. Jewish, writing in Arabic, synthesizing Greek philosophy. His masterwork shapes both Jewish and Islamic thought. The convivencia made flesh.',
    era: 'berber',
  },

  // THE RETREAT
  {
    id: 'navas-1212',
    year: '1212',
    title: 'Las Navas de Tolosa',
    detail: 'A combined Christian army breaks the Almohad lines in Sierra Morena. The decisive battle of the Reconquista. Almohad power collapses. The frontier that held for centuries now moves south every year.',
    era: 'decline',
    major: true,
    mapFocus: { center: [-3.572, 38.31], zoom: 8 },
  },
  {
    id: 'cordoba-falls-1236',
    year: '1236',
    title: 'Córdoba Falls to Castile',
    detail: 'Ferdinand III takes the old caliphal capital. The Great Mosque becomes a cathedral — but the horseshoe arches remain. 525 years of Muslim rule end.',
    era: 'decline',
    major: true,
    dataValue: '525',
    dataLabel: 'years of Muslim rule',
    mapFocus: { center: [-4.779, 37.879], zoom: 9 },
  },
  {
    id: 'seville-falls-1248',
    year: '1248',
    title: 'Seville Falls',
    detail: 'The Almohad Iberian capital surrenders after a 16-month siege. Most of its Muslim population is expelled. The Giralda becomes a bell tower. Only Granada remains.',
    era: 'decline',
    major: true,
    mapFocus: { center: [-5.994, 37.389], zoom: 9 },
  },

  // NASRID EMIRATE & FALL
  {
    id: 'nasrid-1238',
    year: '1238',
    title: 'The Nasrid Emirate of Granada',
    detail: 'Muhammad I founds the last Muslim state in Iberia. A vassal of Castile from the beginning — paying tribute, providing troops, surviving on diplomacy. Survives 254 years.',
    era: 'fall',
    major: true,
    mapFocus: { center: [-3.598, 37.176], zoom: 9 },
  },
  {
    id: 'alhambra-1350',
    year: 'c. 1350',
    title: 'The Alhambra — Pinnacle of Andalusi Art',
    detail: 'Yusuf I and Muhammad V build the Court of the Lions, the Hall of the Ambassadors, the Hall of the Two Sisters. Muqarnas ceilings with 5,000 cells. The most beautiful building in the Islamic world — built while the state crumbles.',
    era: 'fall',
    major: true,
    dataValue: '5,000',
    dataLabel: 'muqarnas cells',
    mapFocus: { center: [-3.588, 37.176], zoom: 14 },
  },
  {
    id: 'translation',
    year: '13th–15th c.',
    title: 'The Toledo School of Translators',
    detail: 'In conquered Toledo, Christian, Muslim, and Jewish scholars work together translating Arabic texts into Latin. Aristotle, Galen, Ptolemy, al-Khwarizmi — Europe receives its classical inheritance through Arabic.',
    era: 'fall',
    mapFocus: { center: [-4.022, 39.857], zoom: 8 },
  },
  {
    id: 'granada-1492',
    year: '1492',
    title: 'The Fall of Granada',
    detail: 'January 2. Muhammad XII surrenders the keys of the Alhambra to Ferdinand and Isabella. 781 years of Muslim presence in Iberia end. Columbus receives his commission the same year.',
    era: 'fall',
    major: true,
    dataValue: '781',
    dataLabel: 'years',
    mapFocus: { center: [-3.598, 37.176], zoom: 9 },
  },
  {
    id: 'inquisition-1502',
    year: '1502',
    title: 'Forced Conversion: Convert or Leave',
    detail: 'Isabella decrees: all Muslims in Castile must convert to Christianity or leave Spain. Islam goes underground. The Moriscos — outwardly Christian, privately Muslim — endure for another century.',
    era: 'fall',
    major: true,
  },
  {
    id: 'moriscos-1609',
    year: '1609–14',
    title: 'Expulsion of the Moriscos',
    detail: 'Philip III expels the last descendants of Al-Andalus. ~300,000 people forced across the Mediterranean — to Morocco, Tunisia, Algeria, the Ottoman Empire. They carry recipes, music, architecture.',
    era: 'fall',
    major: true,
    dataValue: '~300,000',
    dataLabel: 'expelled',
  },
]

// ─────────────────────────────────────────────────
// MAP POINTS
// ─────────────────────────────────────────────────

export type PointType = 'capital' | 'city' | 'battle' | 'frontier' | 'african'

export interface MapPoint {
  id: string
  name: string
  nameAr: string
  coords: [number, number] // [lng, lat]
  type: PointType
  color: string
  detail: string
}

export const MAP_POINTS: MapPoint[] = [
  // Capitals & major cities
  { id: 'cordoba', name: 'Córdoba', nameAr: 'قرطبة (Qurṭuba)', coords: [-4.779, 37.879], type: 'capital', color: '#E63946', detail: 'Capital 716–1031. Largest city in Europe by 10th century.' },
  { id: 'granada', name: 'Granada', nameAr: 'غرناطة (Gharnāṭa)', coords: [-3.598, 37.176], type: 'capital', color: '#E63946', detail: 'Last Muslim city. Nasrid Emirate 1238–1492.' },
  { id: 'seville', name: 'Seville', nameAr: 'إشبيلية (Ishbīliyya)', coords: [-5.994, 37.389], type: 'capital', color: '#E63946', detail: 'Almohad Iberian capital. Fell 1248.' },
  { id: 'toledo', name: 'Toledo', nameAr: 'طليطلة (Ṭulayṭula)', coords: [-4.022, 39.857], type: 'city', color: '#FCBF49', detail: 'Fell 1085. Centre of translation movement.' },
  { id: 'zaragoza', name: 'Zaragoza', nameAr: 'سرقسطة (Saraqusṭa)', coords: [-0.876, 41.648], type: 'city', color: '#FCBF49', detail: 'Northeast taifa. Philosophy centre.' },
  { id: 'valencia', name: 'Valencia', nameAr: 'بلنسية (Balansiyya)', coords: [-0.375, 39.469], type: 'city', color: '#FCBF49', detail: 'Briefly ruled by El Cid (1094–1099).' },
  { id: 'badajoz', name: 'Badajoz', nameAr: 'بطليوس (Baṭalyaws)', coords: [-6.970, 38.878], type: 'city', color: '#FCBF49', detail: 'Western taifa. Key border with Portugal.' },
  { id: 'malaga', name: 'Málaga', nameAr: 'مالقة (Mālaqa)', coords: [-4.420, 36.720], type: 'city', color: '#FCBF49', detail: 'Strategic Mediterranean port.' },
  { id: 'almeria', name: 'Almería', nameAr: 'المرية (al-Mariyya)', coords: [-2.465, 36.838], type: 'city', color: '#FCBF49', detail: 'Silk centre. Mediterranean trade hub.' },
  { id: 'lisbon', name: 'Lisbon', nameAr: 'أشبونة (Ushbūna)', coords: [-9.139, 38.722], type: 'city', color: '#FCBF49', detail: 'Under Muslim rule 711–1147.' },

  // Battle & frontier sites
  { id: 'gibraltar', name: 'Gibraltar', nameAr: 'جبل طارق (Jabal Ṭāriq)', coords: [-5.345, 36.140], type: 'frontier', color: '#72EFDD', detail: '"Mountain of Tariq." 711 landing site.' },
  { id: 'navas', name: 'Las Navas de Tolosa', nameAr: 'العقاب (al-ʿIqāb)', coords: [-3.572, 38.310], type: 'battle', color: '#F77F00', detail: '1212. Decisive Almohad defeat. Reconquista accelerates.' },
  { id: 'sagrajas', name: 'Sagrajas', nameAr: 'الزلاقة (al-Zallāqa)', coords: [-6.830, 38.850], type: 'battle', color: '#F77F00', detail: '1086. Almoravid victory rescues the taifas.' },
  { id: 'guadalete', name: 'Guadalete', nameAr: 'وادي لكة (Wādī Lakka)', coords: [-5.870, 36.690], type: 'battle', color: '#F77F00', detail: '711. Visigothic kingdom destroyed in a single afternoon.' },
  { id: 'tours', name: 'Tours / Poitiers', nameAr: 'بلاط الشهداء', coords: [0.700, 46.580], type: 'battle', color: '#F77F00', detail: '732. High-water mark. Charles Martel halts the advance.' },
  { id: 'narbonne', name: 'Narbonne', nameAr: 'أربونة (Arbūna)', coords: [3.003, 43.184], type: 'frontier', color: '#72EFDD', detail: 'Furthest permanent territory in Gaul. 720–759.' },
  { id: 'santiago', name: 'Santiago de Compostela', nameAr: 'شنت ياقب', coords: [-8.544, 42.880], type: 'battle', color: '#F77F00', detail: 'Sacked by Almanzor, 997. Bells carried to Córdoba.' },

  // North African power centres
  { id: 'marrakech', name: 'Marrakech', nameAr: 'مراكش (Marrākush)', coords: [-7.982, 31.631], type: 'african', color: '#48BFE3', detail: 'Almoravid capital. Almohad capital. Power behind Al-Andalus.' },
  { id: 'fes', name: 'Fes', nameAr: 'فاس (Fās)', coords: [-5.000, 34.034], type: 'african', color: '#48BFE3', detail: 'Andalusi refugees settle here. World\'s oldest university.' },
  { id: 'tangier', name: 'Tangier', nameAr: 'طنجة (Ṭanja)', coords: [-5.813, 35.767], type: 'african', color: '#48BFE3', detail: 'Gateway between Africa and Iberia.' },
  { id: 'ceuta', name: 'Ceuta', nameAr: 'سبتة (Sabta)', coords: [-5.313, 35.889], type: 'african', color: '#48BFE3', detail: 'Launching point for 711 invasion.' },
  { id: 'tinmel', name: 'Tinmel', nameAr: 'تينمل (Tīnmal)', coords: [-7.954, 31.000], type: 'african', color: '#48BFE3', detail: 'Atlas Mountains. Almohad birthplace (~1121).' },
  { id: 'kairouan', name: 'Kairouan', nameAr: 'القيروان (al-Qayrawān)', coords: [10.095, 35.672], type: 'african', color: '#48BFE3', detail: 'Military base for the 711 invasion. Initial governor seat.' },
]

// ─────────────────────────────────────────────────
// TERRITORY OVER TIME (% of Iberia under Muslim control)
// ─────────────────────────────────────────────────

export interface TerritoryPoint {
  year: string
  percentage: number
  note: string
}

export const TERRITORY: TerritoryPoint[] = [
  { year: '718', percentage: 90, note: 'Near-total conquest' },
  { year: '800', percentage: 75, note: 'Asturias holds the north' },
  { year: '950', percentage: 70, note: 'Caliphate at peak' },
  { year: '1031', percentage: 60, note: 'Taifa fragmentation' },
  { year: '1100', percentage: 50, note: 'Almoravid recovery' },
  { year: '1212', percentage: 40, note: 'Las Navas de Tolosa' },
  { year: '1250', percentage: 12, note: 'Córdoba & Seville fallen' },
  { year: '1300', percentage: 8, note: 'Granada only' },
  { year: '1400', percentage: 6, note: 'Shrinking emirate' },
  { year: '1492', percentage: 0, note: 'The fall' },
]

// ─────────────────────────────────────────────────
// KEY FIGURES
// ─────────────────────────────────────────────────

export interface Figure {
  id: string
  name: string
  dates: string
  role: string
  detail: string
  era: EraId
}

export const FIGURES: Figure[] = [
  { id: 'tariq', name: 'Tariq ibn Ziyad', dates: 'c. 670–720', role: 'Commander · Berber', detail: 'Led the 711 invasion. Gibraltar bears his name.', era: 'conquest' },
  { id: 'abd-rahman-i', name: 'Abd al-Rahman I', dates: '731–788', role: 'Emir · Umayyad exile', detail: 'Last Umayyad prince. Founded the independent emirate. Began the Great Mosque.', era: 'emirate' },
  { id: 'ziryab', name: 'Ziryab', dates: '789–857', role: 'Polymath · Trendsetter', detail: 'Revolutionized dining, fashion, and music. Added the fifth string to the oud.', era: 'emirate' },
  { id: 'abd-rahman-iii', name: 'Abd al-Rahman III', dates: '891–961', role: 'Caliph · Golden Age', detail: 'Declared the Caliphate. Built Medina Azahara. 49-year reign.', era: 'caliphate' },
  { id: 'al-hakam-ii', name: 'Al-Hakam II', dates: '915–976', role: 'Caliph · Scholar-patron', detail: 'Royal library: 400,000+ volumes. Expanded the Great Mosque.', era: 'caliphate' },
  { id: 'almanzor', name: 'Almanzor', dates: '938–1002', role: 'Vizier · Shadow ruler', detail: '57 campaigns, never defeated. Sacked Santiago. Extended the empire, hollowed its core.', era: 'caliphate' },
  { id: 'yusuf', name: 'Yusuf ibn Tashfin', dates: '1009–1106', role: 'Almoravid Sultan', detail: 'Founded Marrakech. Crossed to rescue the taifas, then conquered them.', era: 'berber' },
  { id: 'el-cid', name: 'El Cid', dates: 'c. 1040–1099', role: 'Castilian warlord', detail: 'Fought for both sides. Captured Valencia (1094). A man between worlds.', era: 'berber' },
  { id: 'averroes', name: 'Ibn Rushd (Averroes)', dates: '1126–1198', role: 'Philosopher · Judge', detail: 'Aristotle commentaries reignited Greek philosophy in Europe.', era: 'berber' },
  { id: 'maimonides-f', name: 'Maimonides', dates: '1138–1204', role: 'Philosopher · Physician', detail: 'Born Córdoba. Jewish, writing in Arabic. Guide for the Perplexed.', era: 'berber' },
  { id: 'muhammad-xii', name: 'Muhammad XII (Boabdil)', dates: '1460–1533', role: 'Last Emir of Granada', detail: 'Surrendered the Alhambra Jan 2, 1492. Died in exile in Fez.', era: 'fall' },
]

// ─────────────────────────────────────────────────
// INVASION ROUTE — for map line
// ─────────────────────────────────────────────────

export const INVASION_ROUTE: [number, number][] = [
  [10.095, 35.672],  // Kairouan
  [-5.313, 35.889],  // Ceuta
  [-5.345, 36.140],  // Gibraltar
  [-5.870, 36.690],  // Guadalete
  [-4.779, 37.879],  // Córdoba
  [-4.022, 39.857],  // Toledo
  [-0.876, 41.648],  // Zaragoza
  [3.003, 43.184],   // Narbonne
]

// ─────────────────────────────────────────────────
// RECONQUISTA DATES — for map territorial overlay
// ─────────────────────────────────────────────────

export const HERO_STATS = [
  { value: '781', label: 'Years' },
  { value: '711–1492', label: 'Span' },
  { value: '~500,000', label: 'Córdoba peak population' },
  { value: '~300,000', label: 'Moriscos expelled' },
]
