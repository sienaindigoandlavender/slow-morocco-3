// Al-Andalus Corridor — Cultural DNA Dataset
// Sources: Historical records, UNESCO research, synthesized from academic sources
// Each point is a documented cultural landmark or connection

export type LayerType = 'architecture' | 'music' | 'food' | 'language'

export interface CulturalPoint {
  id: string
  name: string
  nameAr?: string
  layer: LayerType
  lat: number
  lng: number
  city: string
  country: 'spain' | 'portugal' | 'morocco'
  period?: string
  description: string
  connection?: string // What it connects to on the other side
}

export const LAYER_CONFIG: Record<LayerType, { label: string; color: string; icon: string }> = {
  architecture: { label: 'Architecture', color: '#E63946', icon: '◉' },
  music:        { label: 'Music',        color: '#48BFE3', icon: '♪' },
  food:         { label: 'Food',         color: '#FCBF49', icon: '◆' },
  language:     { label: 'Language',      color: '#72EFDD', icon: '◈' },
}

export const POINTS: CulturalPoint[] = [
  // ═══ ARCHITECTURE ═══
  {
    id: 'alhambra',
    name: 'The Alhambra',
    layer: 'architecture',
    lat: 37.1760,
    lng: -3.5881,
    city: 'Granada',
    country: 'spain',
    period: '13th–14th c.',
    description: 'Nasrid palace complex. Muqarnas vaulting, zellige tilework, horseshoe arches, courtyard gardens. The pinnacle of Hispano-Moorish architecture.',
    connection: 'Shares geometric vocabulary with Bou Inania Madrasa in Fes',
  },
  {
    id: 'mezquita',
    name: 'Mezquita de Córdoba',
    layer: 'architecture',
    lat: 37.8789,
    lng: -4.7794,
    city: 'Córdoba',
    country: 'spain',
    period: '8th–10th c.',
    description: 'Great Mosque. 856 columns, double-tiered horseshoe arches in red and white, ribbed domes over the maqsura. Model for every mosque in the western Islamic world.',
    connection: 'Ribbed dome technique replicated at Qarawiyyin Mosque in Fes',
  },
  {
    id: 'alcazar-seville',
    name: 'Real Alcázar',
    layer: 'architecture',
    lat: 37.3826,
    lng: -5.9911,
    city: 'Seville',
    country: 'spain',
    period: '14th c.',
    description: 'Mudéjar palace built by Christian kings using Moorish craftsmen. Zellige, carved stucco, horseshoe arches. The style survived the Reconquista.',
    connection: 'Mudéjar craftsmen trained in the same workshops as Marinid builders',
  },
  {
    id: 'torre-oro',
    name: 'Torre del Oro',
    layer: 'architecture',
    lat: 37.3824,
    lng: -5.9964,
    city: 'Seville',
    country: 'spain',
    period: '1220–1221',
    description: 'Almohad defensive tower on the Guadalquivir. Dodecagonal plan. Built during the same dynasty that ruled both Seville and Marrakech.',
    connection: 'Built by the Almohads who simultaneously built the Koutoubia in Marrakech',
  },
  {
    id: 'giralda',
    name: 'La Giralda',
    layer: 'architecture',
    lat: 37.3861,
    lng: -5.9926,
    city: 'Seville',
    country: 'spain',
    period: '12th c.',
    description: 'Former Almohad minaret, now the cathedral bell tower. Sister to the Hassan Tower in Rabat and the Koutoubia in Marrakech — all three built under the same dynasty.',
    connection: 'Triplet minarets: Giralda (Seville), Hassan Tower (Rabat), Koutoubia (Marrakech)',
  },
  {
    id: 'koutoubia',
    name: 'Koutoubia Mosque',
    layer: 'architecture',
    lat: 31.6235,
    lng: -7.9940,
    city: 'Marrakech',
    country: 'morocco',
    period: '12th c.',
    description: 'Almohad mosque with 77-meter minaret. Sister to the Giralda in Seville. Same proportions, same dynasty, different continent.',
    connection: 'Sister minaret to La Giralda in Seville',
  },
  {
    id: 'hassan-tower',
    name: 'Hassan Tower',
    layer: 'architecture',
    lat: 34.0242,
    lng: -6.8226,
    city: 'Rabat',
    country: 'morocco',
    period: '12th c.',
    description: 'Unfinished Almohad minaret. Intended as the tallest in the world. 348 columns of an unfinished mosque. Third sister to the Giralda and Koutoubia.',
    connection: 'Third triplet minaret with Giralda and Koutoubia',
  },
  {
    id: 'bou-inania',
    name: 'Bou Inania Madrasa',
    layer: 'architecture',
    lat: 34.0635,
    lng: -4.9824,
    city: 'Fes',
    country: 'morocco',
    period: '14th c.',
    description: 'Marinid madrasa. Zellige, carved cedar, muqarnas, marble, onyx. The geometric patterns share mathematical DNA with the Alhambra — built in the same century.',
    connection: 'Contemporaneous with the Alhambra — same geometric language',
  },
  {
    id: 'qarawiyyin',
    name: 'Al-Qarawiyyin',
    layer: 'architecture',
    lat: 34.0642,
    lng: -4.9737,
    city: 'Fes',
    country: 'morocco',
    period: '9th c.',
    description: 'Founded 859 CE. Oldest continuously operating university in the world. Horseshoe arches, ribbed domes, courtyard plan — the architectural source of the tradition.',
    connection: 'Founded by Andalusi refugees from Kairouan. The name "Qarawiyyin" = "from Kairouan"',
  },
  {
    id: 'kasbah-udayas',
    name: 'Kasbah of the Udayas',
    layer: 'architecture',
    lat: 34.0326,
    lng: -6.8367,
    city: 'Rabat',
    country: 'morocco',
    period: '12th c.',
    description: 'Almohad fortress with monumental gate. Blue and white Andalusian quarter inside — settled by Moriscos expelled from Spain in the 17th century.',
    connection: 'Andalusian quarter populated by refugees from Hornachos, Spain',
  },

  // ═══ MUSIC ═══
  {
    id: 'flamenco-seville',
    name: 'Flamenco Heartland',
    layer: 'music',
    lat: 37.3886,
    lng: -5.9823,
    city: 'Seville',
    country: 'spain',
    description: 'Cante jondo (deep song) shares modal structures with Arabic maqam. The melismatic vocal ornaments trace directly to Andalusi singing traditions.',
    connection: 'Cante jondo modal system mirrors Andalusi maqam',
  },
  {
    id: 'flamenco-jerez',
    name: 'Flamenco Birthplace',
    layer: 'music',
    lat: 36.6850,
    lng: -6.1374,
    city: 'Jerez de la Frontera',
    country: 'spain',
    description: 'One of the claimed birthplaces of flamenco. The Romani, Moorish, and Sephardic traditions converged here into cante, baile, and toque.',
    connection: 'Roma migration carried musical DNA from North Africa and the East',
  },
  {
    id: 'fado-lisbon',
    name: 'Fado Tradition',
    layer: 'music',
    lat: 38.7139,
    lng: -9.1394,
    city: 'Lisbon',
    country: 'portugal',
    description: 'Portuguese fado. Some musicologists trace its melancholic modes to the Arabic influence during Moorish rule of Portugal (711–1249).',
    connection: 'Moorish musical legacy in the Portuguese fado tradition',
  },
  {
    id: 'andalusi-fes',
    name: 'Andalusi Nuba',
    layer: 'music',
    lat: 34.0600,
    lng: -4.9780,
    city: 'Fes',
    country: 'morocco',
    description: 'Fes preserves the Andalusi music tradition (al-Ala) — elaborate orchestral suites originally developed in Córdoba. 11 nubas survive of the original 24.',
    connection: 'Direct descendant of the Córdoban court music tradition',
  },
  {
    id: 'andalusi-tetuan',
    name: 'Tétouan Conservatory',
    layer: 'music',
    lat: 35.5727,
    lng: -5.3687,
    city: 'Tétouan',
    country: 'morocco',
    description: 'Tétouan preserves the gharnati style of Andalusi music — from Granada. The city was founded by Andalusi refugees. The music came with them.',
    connection: 'Gharnati style = "from Granada" — music carried by refugees',
  },
  {
    id: 'gnawa-essaouira',
    name: 'Gnawa Tradition',
    layer: 'music',
    lat: 31.5085,
    lng: -9.7595,
    city: 'Essaouira',
    country: 'morocco',
    description: 'Gnawa music — Sub-Saharan spiritual tradition. The guembri (bass lute) connects to older African musical systems that also fed into the blues.',
    connection: 'Sub-Saharan musical DNA that runs parallel to the Andalusi tradition',
  },

  // ═══ FOOD ═══
  {
    id: 'pastilla-fes',
    name: 'Pastilla / Bastilla',
    layer: 'food',
    lat: 34.0550,
    lng: -4.9900,
    city: 'Fes',
    country: 'morocco',
    description: 'Layers of warqa pastry, pigeon, almonds, cinnamon, powdered sugar. Sweet-savory combination. The dish the Moors carried across the strait.',
    connection: 'Ancestor of Spanish empanada and Portuguese pastéis',
  },
  {
    id: 'saffron-spain',
    name: 'Saffron Route',
    layer: 'food',
    lat: 38.9942,
    lng: -1.8585,
    city: 'La Mancha',
    country: 'spain',
    description: 'The Moors brought saffron cultivation to Spain. "Azafrán" from Arabic "za\'faran." Still grown in the same La Mancha fields.',
    connection: 'Saffron: Arabic za\'faran → Spanish azafrán. Same spice, same fields, Moorish origin',
  },
  {
    id: 'almonds-algarve',
    name: 'Almond Orchards',
    layer: 'food',
    lat: 37.0194,
    lng: -7.9304,
    city: 'Algarve',
    country: 'portugal',
    description: 'The Moors planted almond orchards across the Algarve. "Al-Gharb" (the west) gave the region its name. Marzipan traditions survive.',
    connection: 'Algarve = Al-Gharb. Almond-based sweets shared across both sides of the strait',
  },
  {
    id: 'preserved-lemons',
    name: 'Preserved Lemons',
    layer: 'food',
    lat: 31.6295,
    lng: -7.9811,
    city: 'Marrakech',
    country: 'morocco',
    description: 'Preserved lemons — foundational Moroccan ingredient. Citrus cultivation introduced by Arabs. Same lemons appear in Andalusian gardens.',
    connection: 'Citrus cultivation spread by the same agricultural revolution across both territories',
  },
  {
    id: 'tagine-morocco',
    name: 'Tagine Tradition',
    layer: 'food',
    lat: 31.6300,
    lng: -8.0089,
    city: 'Marrakech',
    country: 'morocco',
    description: 'Slow-cooked stews using cumin, coriander, cinnamon — the Moorish spice vocabulary that also defines Andalusian cuisine.',
    connection: 'Same spice palette found in traditional Andalusian cooking',
  },
  {
    id: 'churros-spain',
    name: 'Churros Origin',
    layer: 'food',
    lat: 40.4168,
    lng: -3.7038,
    city: 'Madrid',
    country: 'spain',
    description: 'Churros may derive from the Moorish star-shaped pastry tradition. Fried dough with sugar — a pattern found across North Africa as sfenj.',
    connection: 'Sfenj (Moroccan doughnuts) and churros — same fried-dough DNA',
  },

  // ═══ LANGUAGE ═══
  {
    id: 'ojala',
    name: 'Ojalá (inshallah)',
    layer: 'language',
    lat: 40.4168,
    lng: -3.7038,
    city: 'Madrid',
    country: 'spain',
    description: '"Ojalá" — "hopefully" in Spanish. Directly from Arabic "inshallah" (إن شاء الله). One of ~4,000 Arabic-origin words in Spanish.',
    connection: 'Spanish ojalá = Arabic inshallah. The most common Arabic word in daily Spanish.',
  },
  {
    id: 'azulejo',
    name: 'Azulejo (al-zulaij)',
    layer: 'language',
    lat: 38.7139,
    lng: -9.1394,
    city: 'Lisbon',
    country: 'portugal',
    description: '"Azulejo" — the iconic Portuguese/Spanish tile. From Arabic "al-zulaij" (الزُّلَيْج). Same word, same technique, same tradition as Moroccan zellige.',
    connection: 'Azulejo = al-zulaij = zellige. Same word, same craft, three countries',
  },
  {
    id: 'aldea',
    name: 'Aldea (al-day\'a)',
    layer: 'language',
    lat: 37.3886,
    lng: -5.9823,
    city: 'Seville',
    country: 'spain',
    description: '"Aldea" (village), "almohada" (pillow), "azúcar" (sugar), "algodón" (cotton) — the domestic vocabulary of daily life in Spanish is Arabic.',
    connection: 'The fabric of daily Spanish: village, pillow, sugar, cotton — all Arabic',
  },
  {
    id: 'guadalquivir',
    name: 'Guadalquivir (wadi al-kabir)',
    layer: 'language',
    lat: 37.3824,
    lng: -5.9964,
    city: 'Seville',
    country: 'spain',
    description: 'The Guadalquivir river. From Arabic "wadi al-kabir" (الوادي الكبير) — "the great river." The geography itself speaks Arabic.',
    connection: 'Rivers, mountains, towns across Andalusia carry Arabic names',
  },
  {
    id: 'darija-fes',
    name: 'Darija (Moroccan Arabic)',
    layer: 'language',
    lat: 34.0600,
    lng: -4.9780,
    city: 'Fes',
    country: 'morocco',
    description: 'Moroccan Darija contains Spanish loanwords — "simana" (semana/week), "tabla" (table), "kuzhina" (cocina/kitchen). The borrowing went both directions.',
    connection: 'Spanish → Darija loanwords prove the cultural exchange was bilateral',
  },
  {
    id: 'algarve-name',
    name: 'Al-Gharb (Algarve)',
    layer: 'language',
    lat: 37.0194,
    lng: -7.9304,
    city: 'Faro',
    country: 'portugal',
    description: '"Algarve" from Arabic "al-gharb" (الغرب) — "the west." Portugal\'s southernmost region named by its Moorish rulers. The name outlasted the dynasty.',
    connection: 'Portuguese geography speaks Arabic: Algarve, Alfama, Alcácer do Sal',
  },
]

// The corridor route — Seville to Fes via key waypoints
export const CORRIDOR_ROUTE: [number, number][] = [
  [-9.1394, 38.7139],   // Lisbon
  [-7.9304, 37.0194],   // Algarve
  [-5.9911, 37.3826],   // Seville
  [-4.7794, 37.8789],   // Córdoba
  [-3.5881, 37.1760],   // Granada
  [-5.3687, 35.5727],   // Tétouan (cross the strait)
  [-5.8100, 35.7672],   // Tangier
  [-6.8367, 34.0326],   // Rabat
  [-4.9780, 34.0600],   // Fes
  [-7.9940, 31.6235],   // Marrakech
  [-9.7595, 31.5085],   // Essaouira
]
