// ══════════════════════════════════════════════════
// YENNAYER — DATA
// The Berber Pharaoh & the 3,000-Year Calendar
// ══════════════════════════════════════════════════

// ── KEY PLACES (Mapbox) ──

export interface Place {
  name: string
  coords: [number, number]
  type: 'origin' | 'dynasty' | 'campaign' | 'celebration'
  detail: string
}

export const PLACES: Place[] = [
  // Sheshonq's world
  { name: 'Bubastis', coords: [31.52, 30.57], type: 'origin', detail: 'Sheshonq\'s power base. Eastern Nile Delta. Seat of the Meshwesh Libyan chiefs. Capital of the 22nd Dynasty. Temple of the goddess Bastet.' },
  { name: 'Tanis', coords: [31.88, 30.97], type: 'dynasty', detail: 'Royal capital inherited from the 21st Dynasty. Sheshonq maintained it as the administrative centre. Royal tombs discovered here.' },
  { name: 'Karnak', coords: [32.66, 25.72], type: 'dynasty', detail: 'The Bubastite Portal. 6 metres tall. Sheshonq carved his Levantine victories here — over 150 conquered towns listed. The relief is still visible today.' },
  { name: 'Thebes / Luxor', coords: [32.64, 25.69], type: 'dynasty', detail: 'Sheshonq appointed his son Iuput as High Priest of Amun at Thebes — controlling Egypt\'s most powerful religious institution from within.' },
  { name: 'Herakleopolis Magna', coords: [30.93, 29.09], type: 'origin', detail: 'Near modern Beni Suef. A Meshwesh military base. Sheshonq\'s ancestors may have settled here before migrating to the Delta.' },
  { name: 'Megiddo', coords: [35.18, 32.58], type: 'campaign', detail: 'Sheshonq erected a victory stele here. Archaeological evidence of a destruction layer matches ~925 BC. Biblical Armageddon.' },
  { name: 'Jerusalem', coords: [35.23, 31.77], type: 'campaign', detail: '"Shishak king of Egypt came up against Jerusalem" — 1 Kings 14:25. Sheshonq plundered Solomon\'s temple. Rehoboam surrendered the treasury\'s gold and silver.' },
  { name: 'Arad', coords: [35.13, 31.28], type: 'campaign', detail: 'Listed on the Bubastite Portal at Karnak. A fortress city in the Negev, conquered during Sheshonq\'s Levantine campaign.' },
  { name: 'Beth-Shean', coords: [35.50, 32.50], type: 'campaign', detail: 'Northern Israel. Listed among Sheshonq\'s conquered cities at Karnak. Strategic crossroads of the Jezreel and Jordan valleys.' },

  // Yennayer celebration regions
  { name: 'Rabat', coords: [-6.83, 33.97], type: 'celebration', detail: 'Morocco\'s capital. Yennayer became a national holiday in 2023 by royal decree of King Mohammed VI. Celebrated January 13.' },
  { name: 'High Atlas', coords: [-7.50, 31.20], type: 'celebration', detail: 'Ourkemen — seven varieties of dried legumes and grains simmered with sheep\'s foot. Bonfires on mountain slopes. "Thabbourth Aseggas" — the door of the year.' },
  { name: 'Ouirgane Valley', coords: [-8.12, 31.15], type: 'celebration', detail: 'An hour south of Marrakech. Families prepare fine couscous garnished with peeled hard-boiled eggs and cinnamon.' },
  { name: 'Souss', coords: [-9.20, 30.40], type: 'celebration', detail: 'Tagoula — thick porridge of cornmeal or barley cooked over wood fire. A date pit hidden inside — whoever finds it is blessed for the year.' },
  { name: 'Rif Mountains', coords: [-4.50, 35.00], type: 'celebration', detail: 'Tarifit-speaking communities. Regional variations of the communal meal. Children sent to collect fruits from the farm — agricultural initiation.' },
  { name: 'Kabylie (Algeria)', coords: [4.00, 36.60], type: 'celebration', detail: 'The strongest Yennayer traditions. Algeria made it a national holiday in 2018. "Thabbourth Aseggas" — the door of the year. Imensi n\'Yennayer — the dinner of Yennayer.' },
  { name: 'Ghardaia (Algeria)', coords: [3.67, 32.49], type: 'celebration', detail: 'Mozabite Amazigh community. Ibadi Muslims who maintain distinct Yennayer customs alongside their religious practice.' },
  { name: 'Siwa Oasis (Egypt)', coords: [25.52, 29.20], type: 'celebration', detail: 'The easternmost Amazigh-speaking community. Siwi language. Yennayer celebrated at the edge of the Western Desert, 560 km from Cairo.' },
  { name: 'Tuareg Sahara', coords: [5.00, 23.00], type: 'celebration', detail: 'Tuareg communities across the central Sahara — Algeria, Libya, Niger, Mali. Yennayer celebrated in the deep desert.' },
]

// ── SHESHONQ'S CAMPAIGN ROUTE ──

export const CAMPAIGN_ROUTE: [number, number][] = [
  [31.52, 30.57],  // Bubastis
  [32.30, 30.90],  // Across Delta
  [34.00, 31.50],  // Gaza corridor
  [35.13, 31.28],  // Arad
  [35.23, 31.77],  // Jerusalem
  [35.18, 32.58],  // Megiddo
  [35.50, 32.50],  // Beth-Shean
]

// ── THE 22nd DYNASTY ──

export interface Pharaoh { name: string; reign: string; note: string }

export const DYNASTY: Pharaoh[] = [
  { name: 'Sheshonq I', reign: 'c. 943–922 BC', note: 'The founder. Meshwesh Libyan chief. Commander-in-chief of the Egyptian army. Married his son to the previous pharaoh\'s daughter. Invaded Jerusalem. Built the Bubastite Portal at Karnak.' },
  { name: 'Osorkon I', reign: 'c. 922–887 BC', note: 'Sheshonq\'s son. Erected a granite pillar at Bubastis boasting offerings of 383 tons of gold and silver to Egyptian gods — possibly from the plunder of Jerusalem.' },
  { name: 'Sheshonq II', reign: 'c. 887–885 BC', note: 'Buried in a coffin of pure silver at Tanis. Gold face mask. Where did the silver come from?' },
  { name: 'Takelot I', reign: 'c. 885–872 BC', note: 'Continued Libyan rule. The dynasty begins to fragment as regional governors gain independence.' },
  { name: 'Osorkon II', reign: 'c. 872–837 BC', note: 'Built extensively at Bubastis and Tanis. The dynasty\'s second great builder after Sheshonq I.' },
  { name: 'Sheshonq III', reign: 'c. 837–798 BC', note: 'Long reign during increasing fragmentation. Rival dynasties emerge in Thebes and Leontopolis.' },
]

// ── YENNAYER CALENDAR vs OTHERS ──

export interface CalendarSystem { name: string; epoch: string; currentYear: string; type: string; color: string }

export const CALENDARS: CalendarSystem[] = [
  { name: 'Amazigh', epoch: '950 BCE (Sheshonq\'s throne)', currentYear: '2976', type: 'Solar (Julian-derived)', color: '#2D6E4F' },
  { name: 'Gregorian', epoch: '1 CE (birth of Jesus)', currentYear: '2026', type: 'Solar', color: '#5E60CE' },
  { name: 'Islamic (Hijri)', epoch: '622 CE (Hijra to Medina)', currentYear: '1447', type: 'Lunar', color: '#C4963C' },
  { name: 'Hebrew', epoch: '3761 BCE (creation)', currentYear: '5786', type: 'Lunisolar', color: '#48BFE3' },
  { name: 'Chinese', epoch: '~2637 BCE (Yellow Emperor)', currentYear: '4723', type: 'Lunisolar', color: '#E63946' },
  { name: 'Ethiopian', epoch: '8 CE (Annunciation)', currentYear: '2018', type: 'Solar', color: '#722F37' },
]

// ── REGIONAL YENNAYER TRADITIONS ──

export interface Tradition { region: string; country: string; dish: string; ritual: string; greeting: string }

export const TRADITIONS: Tradition[] = [
  { region: 'High Atlas', country: 'Morocco', dish: 'Ourkemen — seven legumes and grains with sheep\'s foot', ritual: 'Bonfires on slopes. House cleaning. Herbal smoke purification. Food shared with nature.', greeting: 'Aseggas Ameggaz' },
  { region: 'Souss / Anti-Atlas', country: 'Morocco', dish: 'Tagoula — thick barley or cornmeal porridge', ritual: 'Date pit hidden in the dish. Finder is blessed (amnaz). Children collect farm fruits.', greeting: 'Aseggas Ambarki' },
  { region: 'Ouirgane Valley', country: 'Morocco', dish: 'Fine couscous with hard-boiled eggs and cinnamon', ritual: 'Family feast. Symbolic abundance. Seven-vegetable tradition (sebaa khodhar).', greeting: 'Id Suggas' },
  { region: 'Rif Mountains', country: 'Morocco', dish: 'Berkoukch — coarse hand-rolled couscous', ritual: 'Agricultural initiation for children. Communal eating from tazlaft (large bowl).', greeting: 'Aseggas Amaynou' },
  { region: 'Kabylie', country: 'Algeria', dish: 'Couscous with chicken, dried fruits. Sfenj (doughnuts).', ritual: 'Thabbourth Aseggas — "the door of the year." Imensi n\'Yennayer — the dinner. Augury from the hidden token.', greeting: 'Aseggas Amegaz' },
  { region: 'M\'zab Valley', country: 'Algeria', dish: 'Chakhchoukha — torn flatbread in tomato sauce', ritual: 'Mozabite Ibadi customs. Prayer alongside agricultural tradition.', greeting: 'Aseggas Ameggaz' },
  { region: 'Tuareg Sahara', country: 'Algeria / Niger / Mali', dish: 'Taguella — sand-baked flatbread', ritual: 'Desert adaptation of the agrarian calendar. Community gathering around fire.', greeting: 'Aséggas Amégas' },
  { region: 'Siwa Oasis', country: 'Egypt', dish: 'Abrid — date and olive dishes', ritual: 'The easternmost Amazigh celebration. Siwi-speaking. At the edge of the Western Desert, 560 km from Cairo.', greeting: 'Aseggas Ameggaz' },
]

// ── TIMELINE ──

export interface TimelineEvent { year: string; sortYear: number; title: string; detail: string; type: 'sheshonq' | 'calendar' | 'recognition' | 'tradition' }

export const TIMELINE: TimelineEvent[] = [
  { year: '~1200 BC', sortYear: -1200, title: 'Meshwesh settle in Egypt', detail: 'Libyan Meshwesh (Ma) and Libu tribes settle in the Nile Delta after centuries of migration and mercenary service. They establish military bases and rise through Egyptian ranks.', type: 'sheshonq' },
  { year: '~1000 BC', sortYear: -1000, title: 'Meshwesh chiefs gain power', detail: 'The title "Great Chief of the Meshwesh" becomes hereditary. Libyan families control key Delta cities. Sheshonq\'s grandfather holds the title.', type: 'sheshonq' },
  { year: '943 BC', sortYear: -943, title: 'Sheshonq takes the throne', detail: 'A Meshwesh general becomes Pharaoh of Egypt. He founds the 22nd Dynasty, marries his son into the previous royal family, and appoints his other son as High Priest of Amun at Thebes. Egypt has a Berber king.', type: 'sheshonq' },
  { year: '~925 BC', sortYear: -925, title: 'The invasion of Jerusalem', detail: '"Shishak king of Egypt came up against Jerusalem." Sheshonq plunders Solomon\'s temple and the royal treasury. Over 150 towns conquered. His victories carved on the Bubastite Portal at Karnak — still visible today.', type: 'sheshonq' },
  { year: '922 BC', sortYear: -922, title: 'Sheshonq dies', detail: 'The founder dies. His son Osorkon I inherits. The 22nd Dynasty will rule Egypt for over 200 years — one of the longest dynasties in Egyptian history.', type: 'sheshonq' },
  { year: '~716 BC', sortYear: -716, title: '22nd Dynasty ends', detail: 'After over 200 years, the Libyan dynasty fades. Kushite pharaohs from Nubia take power. But the Meshwesh legacy is permanent — they reshaped Egyptian politics, religion, and culture.', type: 'sheshonq' },
  { year: 'Antiquity', sortYear: -500, title: 'Yennayer predates the calendar', detail: 'Agrarian celebrations at mid-January existed across North Africa long before anyone formalised a Berber calendar. The customs — communal meals, augury, purification — are older than any written record.', type: 'tradition' },
  { year: '~1960s', sortYear: 1960, title: 'Académie Berbère founded', detail: 'The Amazigh cultural association in Paris begins discussing a formal Berber calendar. The question: what event should mark Year 1?', type: 'calendar' },
  { year: '1980', sortYear: 1980, title: 'Ammar Negadi creates the calendar', detail: 'Algerian scholar Ammar Negadi proposes 950 BCE as Year 1 — the accession of Sheshonq I, the Berber pharaoh. The Amazigh calendar is born. A political act of cultural sovereignty.', type: 'calendar' },
  { year: '2018', sortYear: 2018, title: 'Algeria makes Yennayer a national holiday', detail: 'January 12 becomes an official public holiday in Algeria. A major victory for the Amazigh identity movement after decades of Arabisation policies.', type: 'recognition' },
  { year: '2023', sortYear: 2023, title: 'Morocco makes Yennayer a national holiday', detail: 'King Mohammed VI signs a decree making January 13 an official public holiday. "Aseggas Ameggaz" — Happy New Year — becomes a national greeting.', type: 'recognition' },
  { year: '2026', sortYear: 2026, title: 'Yennayer 2976', detail: 'January 13, 2026. The Amazigh calendar turns 2976. 2,976 years since a Berber chief from the Nile Delta became Pharaoh of the most powerful civilisation on earth.', type: 'calendar' },
]

export const BIBLIOGRAPHY = [
  'Kitchen, Kenneth. The Third Intermediate Period in Egypt (1100–650 BC). Aris & Phillips, 1996.',
  'Britannica. Sheshonk I. Encyclopaedia Britannica.',
  'Black, S.A. et al. (2013). Examining the extinction of the Barbary lion. PLOS ONE.',
  'Negadi, Ammar. Proposal for a Berber Calendar (1980). Académie Berbère, Paris.',
  'Middle East Eye. Yennayer: What you need to know about Amazigh New Year.',
  'Morocco World News. Aseggas Amaynou 2976: Yennayer, the Ancient Calendar (2026).',
  'Wikipedia. Shoshenq I; Yennayer. Retrieved February 2026.',
  '1 Kings 14:25–26. Hebrew Bible. "Shishak king of Egypt came up against Jerusalem."',
  'Bubastite Portal reliefs, Temple of Amun, Karnak. ~925 BCE.',
]
