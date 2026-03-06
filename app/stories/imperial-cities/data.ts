// ─────────────────────────────────────────────────
// The Four Imperial Cities
// Module 068 — Political & Cultural Intelligence
// Sources: UNESCO WHC, Wikipedia (Fez, Marrakech,
// Meknes, Rabat), Morocco World News, Visit Morocco,
// Wanderlust, Crossroads Cultural Exchange
// ─────────────────────────────────────────────────

export interface ImperialCity {
  id: string
  name: string
  arabicName: string
  founded: string
  foundedBy: string
  dynastiesAsCapital: string[]
  nickname: string
  population: string
  unesco: string
  monuments: string[]
  detail: string
  keyFact: string
  lat: number
  lng: number
  color: string
}

export const CITIES: ImperialCity[] = [
  {
    id: 'fez', name: 'Fez', arabicName: 'فاس',
    founded: '789 AD', foundedBy: 'Idris I (Idrisid dynasty)',
    dynastiesAsCapital: ['Idrisid (789–974)', 'Marinid (1244–1465)', 'Wattasid (1471–1554)', 'Dila\'ite (1659–1663)', 'Alaouite (1666–1672, 1727–1912)'],
    nickname: 'Spiritual & Cultural Capital · "Athens of Africa" · "Mecca of the West"',
    population: '~1.2 million',
    unesco: 'Medina of Fez — UNESCO World Heritage Site, 1981',
    monuments: ['University of al-Qarawiyyin (859 — oldest continuously operating university, founded by Fatima al-Fihri)', 'Bou Inania Madrasa (1351–56, Marinid — only madrasa functioning as congregational mosque)', 'Al-Attarine Madrasa (1325, Marinid)', 'Chouara Tanneries (11th century — still operating)', 'Zawiya of Moulay Idris II', 'Dar al-Magana Water Clock (14th C)', 'Al-Qarawiyyin Library (oldest in the world, ~4,000 manuscripts)', 'Fez Jdid (1276 — Marinid "New Fez")', 'Mellah (Jewish Quarter — first in Morocco)', 'Borj Nord & Borj Sud (16th C Saadian bastions)'],
    detail: 'The oldest of the four. Founded on the Wadi Fez by Idris I, expanded by Idris II (809). Became the largest city in the world under the Almohads (~200,000 people, 12th–13th C). Golden age under the Marinids (13th–15th C) who built Fez Jdid, the great madrasas, and the al-Qarawiyyin library (~1350). Fez el-Bali: 9,000+ alleys, ~300 hectares — one of the world\'s largest car-free urban areas. Walls extend nearly 10 miles. 13 kasbahs constructed throughout history. Lost capital status to Rabat in 1912 under the French Protectorate but retains its status as Morocco\'s cultural and spiritual centre. The intellectual exchange between Fez and European universities (via Toledo and Córdoba) helped catalyse the European Renaissance.',
    keyFact: 'Home to the oldest university in the world — al-Qarawiyyin (859 AD), founded by a woman, Fatima al-Fihri.',
    lat: 34.0331, lng: -5.0003, color: '#2D5F8A',
  },
  {
    id: 'marrakech', name: 'Marrakech', arabicName: 'مراكش',
    founded: '1070–1071 AD', foundedBy: 'Youssef Ibn Tachfin (Almoravid dynasty)',
    dynastiesAsCapital: ['Almoravid (1071–1147)', 'Almohad (1147–1269)', 'Saadian (1554–1659)', 'Alaouite (intermittent)'],
    nickname: 'The Red City · City of a Thousand and One Nights',
    population: '~1.0 million',
    unesco: 'Medina of Marrakech — UNESCO World Heritage Site, 1985',
    monuments: ['Koutoubia Mosque (1147–99, Almohad — 77m minaret, inspired Giralda of Seville & Hassan Tower)', 'Jemaa el-Fna (UNESCO Masterpiece of Oral & Intangible Heritage, 2008)', 'Madrasa Ben Youssef (16th C — largest in Morocco)', 'El Badi Palace (1578, Saadian Sultan Ahmad al-Mansur — "The Incomparable")', 'Saadian Tombs (16th C — discovered 1917)', 'Bahia Palace (19th C — 8,000 m²)', 'Majorelle Garden (1924, Jacques Majorelle / Yves Saint Laurent)', 'Walls (12th C Almohad — 2m thick, 9m tall, red clay)'],
    detail: 'The city that gave Morocco its name (from "Murrākuš"). Founded as an Almoravid military and trading post controlling trans-Saharan routes. The Almohads conquered it in 1147, destroyed Almoravid monuments, and built the Koutoubia Mosque — whose 77m minaret became the template for the Giralda in Seville and Hassan Tower in Rabat. Under the Saadian Sultan Ahmad al-Mansur al-Dhahabi ("The Golden"), Marrakech experienced a second golden age: El Badi Palace, the Saadian Tombs, and control of the Timbuktu gold routes. The 12th-century walls — made of red clay pisé — give the city its iconic colour and nickname. Jemaa el-Fna transforms from market to carnival nightly: storytellers, musicians, food vendors. Winston Churchill called Marrakech "Paris of the Sahara."',
    keyFact: 'Gave Morocco its name. The Koutoubia Mosque\'s 77m minaret inspired the Giralda of Seville.',
    lat: 31.6295, lng: -7.9811, color: '#A0452E',
  },
  {
    id: 'meknes', name: 'Meknès', arabicName: 'مكناس',
    founded: '11th century AD', foundedBy: 'Almoravids (on the site of Meknassa Berber settlement, 9th C)',
    dynastiesAsCapital: ['Alaouite (1672–1727, under Sultan Moulay Ismail)'],
    nickname: 'The Versailles of Morocco · Agricultural Capital',
    population: '~650,000',
    unesco: 'Historic City of Meknes — UNESCO World Heritage Site, 1996',
    monuments: ['Bab al-Mansour (one of the largest gates in North Africa)', 'Royal Stables (Heri es-Souani — designed for 12,000 horses, underground granaries)', 'Moulay Ismail Mausoleum', 'Place el-Hedim (central square)', 'Bou Inania Madrasa (14th C Marinid)', 'Dar Jamai Palace (1882, now Museum of Moroccan Arts)', '40+ km of walls, 15m high', 'Agdal Basin (vast water reservoir)'],
    detail: 'The youngest imperial city. Rose from military outpost to imperial capital under one man: Sultan Moulay Ismail (r. 1672–1727), the Alaouite ruler who made Meknès his "Versailles." He built over 40 km of walls (15m high), massive palaces, gardens, the legendary royal stables designed for 12,000 horses with underground granaries and an ingenious water-cooling system, and the Agdal Basin. His reign lasted 55 years — the longest of any Moroccan sultan. After his death, his sons fought for succession, and the capital moved to Fez, then Rabat. Meknès never regained its imperial status but retains the monumental scale of Ismail\'s ambition. Sits on the fertile Saïss Plain — known today as Morocco\'s agricultural capital. Nearby Volubilis preserves Roman-era ruins (UNESCO, 1997).',
    keyFact: 'Moulay Ismail\'s royal stables were designed for 12,000 horses. He ruled for 55 years.',
    lat: 33.8935, lng: -5.5547, color: '#F59E0B',
  },
  {
    id: 'rabat', name: 'Rabat', arabicName: 'الرباط',
    founded: '12th century AD (fortified)', foundedBy: 'Almohad caliph Yaqub al-Mansur (1195)',
    dynastiesAsCapital: ['Almohad (briefly, late 12th C)', 'Alaouite (from 18th C under Mohammed III)', 'French Protectorate (1912–1956)', 'Independent Morocco (1956–present)'],
    nickname: 'Modern Capital · City of Light',
    population: '~580,000 (1.8M+ metropolitan with Salé and Témara)',
    unesco: 'Rabat, Modern Capital and Historic City — UNESCO World Heritage Site, 2012',
    monuments: ['Hassan Tower (begun 1195, Almohad — intended as world\'s largest mosque, never completed)', 'Kasbah of the Udayas (12th C Almohad — winding steps added 17th C by Andalusian refugees)', 'Chellah Necropolis (Phoenician Sala Colonia → Roman → Marinid)', 'Mohammed V Mausoleum (1971 — tombs of Mohammed V, Hassan II, Prince Moulay Abdallah)', 'Dar al-Makhzan (Royal Palace)', 'Andalusian Wall (built by Morisco refugees after 1609 expulsion from Spain)', 'Mohammed VI Museum of Modern & Contemporary Art (2014)'],
    detail: 'The political capital. The Almohads built it as a ribat (fortified monastery) for launching campaigns into Iberia. Yaqub al-Mansur — fresh from victory at the Battle of Alarcos (1195) — began construction of what would have been the world\'s largest mosque. He died before completion. The unfinished Hassan Tower (44m of a planned 86m) and 200 remaining columns still stand as Morocco\'s most poignant monument. Morisco refugees from Spain settled here after 1609, building the Andalusian Wall. The French chose Rabat as administrative capital in 1912, and it remained the capital at independence (1956). Today it houses the Royal Palace, all foreign embassies, and Morocco\'s parliament. The 2012 UNESCO inscription uniquely recognises both the historic and modern city — from Almohad fortress to Art Deco Ville Nouvelle.',
    keyFact: 'Hassan Tower was meant to crown the world\'s largest mosque. The sultan died. It was never finished.',
    lat: 34.0209, lng: -6.8416, color: '#5C7C3E',
  },
]

export interface Dynasty {
  name: string
  period: string
  origin: string
  capital: string
  legacy: string
  color: string
}

export const DYNASTIES: Dynasty[] = [
  { name: 'Idrisid', period: '788–974', origin: 'Arab (descendant of Prophet Muhammad via Ali)', capital: 'Fez (founded 789)', legacy: 'First Muslim dynasty of Morocco. Founded Fez. Established Morocco as an independent state. Al-Qarawiyyin founded 859.', color: '#2D5F8A' },
  { name: 'Almoravid', period: '1040–1147', origin: 'Sanhaja Berber (Saharan)', capital: 'Marrakech (founded 1070)', legacy: 'Founded Marrakech. Empire from Sahara to Spain. Strict Maliki Islam. Built Ben Youssef Mosque.', color: '#A0452E' },
  { name: 'Almohad', period: '1121–1269', origin: 'Masmuda Berber (High Atlas)', capital: 'Marrakech, then Rabat', legacy: 'Built Koutoubia, Hassan Tower, Kasbah of Udayas. Empire stretched from Libya to Spain. Intellectual golden age.', color: '#7B506F' },
  { name: 'Marinid', period: '1244–1465', origin: 'Zenata Berber (eastern Morocco)', capital: 'Fez (Fez Jdid built 1276)', legacy: 'Fez\'s golden age. Built the great madrasas (Bou Inania, Al-Attarine). Al-Qarawiyyin library. First mellah.', color: '#2D5F8A' },
  { name: 'Wattasid', period: '1471–1554', origin: 'Zenata Berber (Marinid branch)', capital: 'Fez', legacy: 'Continued Marinid Fez. Weakened by Portuguese coastal incursions.', color: '#6B7280' },
  { name: 'Saadian', period: '1554–1659', origin: 'Arab (sharifs from Draa Valley)', capital: 'Marrakech', legacy: 'El Badi Palace, Saadian Tombs. Defeated Portuguese at Battle of Three Kings (1578). Timbuktu campaign (1591). Sugar dynasty.', color: '#A0452E' },
  { name: 'Alaouite', period: '1631–present', origin: 'Arab (sharifs from Tafilalt)', capital: 'Fez → Meknès → Fez → Rabat', legacy: 'Current ruling dynasty. Moulay Ismail built Meknès. Mohammed V led independence. Mohammed VI reigns today.', color: '#F59E0B' },
]

export const HERO_STATS = [
  { value: '4', label: 'Imperial cities' },
  { value: '7', label: 'Dynasties' },
  { value: '1,233', label: 'Years — Fez to Rabat' },
  { value: '789', label: 'AD — Morocco\'s first capital' },
]

export const KEY_NUMBERS = [
  { value: '859', label: 'Al-Qarawiyyin founded', note: 'By Fatima al-Fihri. Oldest continuously operating university. Founded by a woman.' },
  { value: '9,000+', label: 'Alleys in Fez medina', note: '~300 hectares. World\'s largest car-free urban area. UNESCO 1981.' },
  { value: '77m', label: 'Koutoubia minaret', note: 'Marrakech\'s Almohad masterpiece. Template for Seville\'s Giralda and Rabat\'s Hassan Tower.' },
  { value: '55', label: 'Years of Moulay Ismail\'s reign', note: '1672–1727. Longest-reigning Moroccan sultan. Built 40+ km of walls around Meknès.' },
  { value: '1912', label: 'Capital moves to Rabat', note: 'French Protectorate. Fez loses capital status after 1,100+ years of intermittent rule.' },
  { value: '2012', label: 'Rabat UNESCO inscription', note: 'Uniquely recognises both historic and modern city. From Almohad fortress to Art Deco.' },
]
