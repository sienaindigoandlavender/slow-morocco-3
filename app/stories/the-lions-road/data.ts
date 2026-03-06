// ── LION RANGE — historic Asiatic lion range coordinates for Mapbox polygon ──

export const HISTORIC_RANGE: [number, number][] = [
  // Greece → Turkey → Caucasus → Iran → Afghanistan → Pakistan → India
  [22.0, 39.5], // Greece
  [26.0, 40.0], // Thrace
  [29.0, 40.5], // Bosphorus
  [33.0, 37.5], // Central Anatolia
  [36.0, 37.0], // SE Turkey
  [40.0, 37.0], // Iraq/Syria border
  [44.0, 36.0], // Northern Iraq
  [48.0, 34.0], // Western Iran
  [52.0, 32.0], // Central Iran
  [56.0, 30.0], // Eastern Iran
  [60.0, 30.0], // Afghanistan/Balochistan
  [64.0, 28.0], // Southern Pakistan
  [68.0, 24.0], // Sindh
  [72.0, 22.0], // Gujarat
  [76.0, 22.0], // Central India
  [80.0, 20.0], // Eastern India
  [82.0, 22.0], // Bengal border
  // Return south and west
  [80.0, 16.0], // Deccan
  [76.0, 14.0], // Southern limit
  [72.0, 18.0], // Western India coast
  [68.0, 22.0], // Gujarat coast
  [60.0, 24.0], // Persian Gulf
  [52.0, 26.0], // Southern Iran
  [48.0, 28.0], // Kuwait area
  [44.0, 30.0], // Southern Iraq
  [40.0, 32.0], // Levant
  [36.0, 32.0], // Palestine
  [34.0, 34.0], // Syria coast
  [30.0, 36.0], // SW Turkey
  [26.0, 37.0], // Western Turkey
  [22.0, 39.5], // Close polygon
]

export const CURRENT_RANGE = {
  center: [70.86, 21.14] as [number, number],
  label: 'Gir Forest, Gujarat',
  population: '~700',
  area: '1,412 km²',
}

// China — no native lions ever
export const CHINA_CENTER: [number, number] = [104.0, 35.0]

// ── SILK ROAD ROUTES — lion transmission corridors ──

export interface TradeRoute {
  name: string
  coords: [number, number][]
  color: string
}

export const SILK_ROUTES: TradeRoute[] = [
  {
    name: 'Northern Silk Road',
    color: '#E63946',
    coords: [
      [44.4, 33.3],   // Ctesiphon (Parthia capital)
      [51.4, 35.7],   // Tehran
      [58.8, 37.6],   // Merv
      [64.4, 39.7],   // Samarkand
      [69.3, 41.3],   // Tashkent
      [75.6, 39.5],   // Kashgar
      [80.0, 40.0],   // Tarim Basin
      [87.6, 43.8],   // Urumqi
      [95.0, 40.0],   // Dunhuang
      [104.0, 36.0],  // Lanzhou
      [108.9, 34.3],  // Xi'an (Chang'an)
    ],
  },
  {
    name: 'Southern Maritime Route',
    color: '#48BFE3',
    coords: [
      [72.8, 19.1],   // Mumbai
      [79.9, 6.9],    // Sri Lanka
      [100.5, 13.8],  // Gulf of Thailand
      [106.6, 10.8],  // Vietnam
      [113.3, 23.1],  // Guangzhou
      [121.5, 31.2],  // Shanghai (later)
    ],
  },
  {
    name: 'Buddhist Transmission',
    color: '#FCBF49',
    coords: [
      [83.0, 25.3],   // Sarnath (Ashoka pillar)
      [78.5, 28.6],   // Delhi
      [71.4, 34.0],   // Gandhara
      [69.2, 34.5],   // Kabul
      [75.6, 39.5],   // Kashgar
      [95.0, 40.0],   // Dunhuang
      [108.9, 34.3],  // Xi'an
      [116.4, 39.9],  // Beijing
    ],
  },
]

// ── KEY LOCATIONS ──

export interface KeyPoint {
  name: string
  coords: [number, number]
  type: 'source' | 'relay' | 'destination' | 'artwork'
  year: string
  detail: string
}

export const KEY_POINTS: KeyPoint[] = [
  { name: 'Gir Forest', coords: [70.86, 21.14], type: 'source', year: 'Present', detail: 'Last wild Asiatic lions. ~700 individuals. The only surviving population.' },
  { name: 'Sarnath', coords: [83.0, 25.3], type: 'source', year: '250 BCE', detail: 'Lion Capital of Ashoka. Four Asiatic lions back-to-back. Now India\'s national emblem. The key Buddhist image that launched the lion eastward.' },
  { name: 'Gandhara', coords: [71.4, 34.0], type: 'relay', year: '1st–5th c. CE', detail: 'Greco-Buddhist art workshop. Greek sculptors carved Buddhist subjects — including lions. Fusion point: Mediterranean realism meets Asian symbolism.' },
  { name: 'Ctesiphon', coords: [44.4, 33.3], type: 'relay', year: '87 CE', detail: 'Parthian Empire capital. Sent the first recorded live lion to China as diplomatic tribute. The envoy also brought an ostrich.' },
  { name: 'Samarkand', coords: [66.9, 39.6], type: 'relay', year: '2nd c. CE', detail: 'Sogdian trading hub. Sogdian merchants carried lion pelts, stories, and Buddhist imagery east along the Silk Road.' },
  { name: 'Kashgar', coords: [75.6, 39.5], type: 'relay', year: '133 CE', detail: 'The ruler of Kashgar sent a live lion tribute to the Han court. Second recorded lion delivery to China.' },
  { name: 'Dunhuang', coords: [94.7, 40.1], type: 'relay', year: '4th–10th c.', detail: 'Mogao Caves. 492 cave temples along the Silk Road. Lion guardians carved at temple entrances. The visual relay station between India and China.' },
  { name: 'Xi\'an (Chang\'an)', coords: [108.9, 34.3], type: 'destination', year: '87 CE –', detail: 'Han and Tang dynasty capital. Where the first live lions arrived. Where Buddhist lion imagery fused with Chinese mythology.' },
  { name: 'Luoyang', coords: [112.5, 34.6], type: 'destination', year: '2nd c. CE', detail: 'Eastern Han capital. The Gaoyi Que tomb lions — among the oldest surviving Chinese lion sculptures (209 CE).' },
  { name: 'Beijing', coords: [116.4, 39.9], type: 'destination', year: '1420 –', detail: 'Forbidden City. Bronze guardian lions at the Gate of Supreme Harmony. The form standardised under Ming and Qing dynasties.' },
  { name: 'Cangzhou', coords: [116.8, 38.3], type: 'artwork', year: '953 CE', detail: 'The Iron Lion of Cangzhou. Cast in iron, 5.78m tall, 40 tonnes. The largest and oldest surviving iron-cast artwork in China.' },
]

// ── TIMELINE ──

export interface TimelineEvent {
  year: string
  sortYear: number
  title: string
  detail: string
  type: 'biology' | 'trade' | 'religion' | 'art' | 'text' | 'extinction'
}

export const TIMELINE: TimelineEvent[] = [
  { year: '~120,000 BCE', sortYear: -120000, title: 'Lions expand from East Africa into West Asia', detail: 'First wave of lion expansion. Asiatic lions (Panthera leo leo) spread from Africa through the Middle East to India. Genetically closer to North African lions than to East/Southern African lions.', type: 'biology' },
  { year: '~900 BCE', sortYear: -900, title: 'Animal Style art on the Ordos Plateau', detail: 'Steppe cultures develop zoomorphic "Animal Style" art. Feline predators among the core motifs. This visual language will later merge with Buddhist lion imagery as it travels the Silk Road.', type: 'art' },
  { year: '250 BCE', sortYear: -250, title: 'Lion Capital of Ashoka erected at Sarnath', detail: 'Emperor Ashoka places a pillar topped with four Asiatic lions at Sarnath, where the Buddha first taught. Lions become symbols of dharma — the Buddha as the "Lion of the Shakya clan." Now India\'s national emblem.', type: 'religion' },
  { year: '138 BCE', sortYear: -138, title: 'Zhang Qian opens the Silk Road', detail: 'Han emperor Wudi sends envoy Zhang Qian west. His journeys connect China to Central Asia for the first time. The trade network that will carry lions — as pelts, tribute, and idea — is born.', type: 'trade' },
  { year: '87 CE', sortYear: 87, title: 'First lion arrives in China', detail: 'A Parthian envoy delivers a live lion and an ostrich to the Han court of Emperor Zhang. Recorded in the Book of the Later Han (後漢書). China sees a real lion for the first time.', type: 'trade' },
  { year: '88 CE', sortYear: 88, title: 'Yuezhi send a second lion', detail: 'The Central Asian Yuezhi kingdom sends another lion tribute to the Han court. The lion is now established as an exotic prestige gift from the Western Regions (西域).', type: 'trade' },
  { year: '133 CE', sortYear: 133, title: 'Kashgar sends a lion tribute', detail: 'The ruler of Kashgar presents a live lion to the Han court. Third recorded lion delivery. The animal is becoming a fixture of diplomatic exchange.', type: 'trade' },
  { year: '147 CE', sortYear: 147, title: 'Wu Family Shrines, Shandong', detail: 'Lion imagery carved in the Wu Family Shrines. Among the earliest surviving examples of lion art in China. Semi-realistic, elongated forms showing possible contact with actual specimens.', type: 'art' },
  { year: '209 CE', sortYear: 209, title: 'Gaoyi Que tomb lions, Sichuan', detail: 'Two stone lions guard the Gaoyi Que ceremonial gate. Among the oldest surviving Chinese lion sculptures. Realistic Asiatic lion features — maned, slender, four-legged. Still recognisably a lion.', type: 'art' },
  { year: '~1st–4th c. CE', sortYear: 200, title: 'Buddhism enters China', detail: 'Buddhist missionaries bring lion imagery from India and Gandhara. The lion as protector of dharma merges with Chinese guardian traditions. Lions begin appearing at temple entrances.', type: 'religion' },
  { year: '~5th c. CE', sortYear: 450, title: 'Monk Huilin identifies suan-ni as lion', detail: 'The Buddhist monk Huilin (慧琳) declares: "The mythic suan-ni (狻猊) is actually the lion, coming from the Western Regions." The Chinese merge their own mythical feline with the foreign import.', type: 'text' },
  { year: '~5th–6th c. CE', sortYear: 500, title: 'Lions lose their wings', detail: 'Early Chinese guardian lions had wings (modelled on Assyrian lamassu). Under Buddhist influence, the wings disappear. The lion transforms from a mythological hybrid into a recognisable, if stylised, feline.', type: 'art' },
  { year: '618–907 CE', sortYear: 700, title: 'Tang Dynasty golden age', detail: 'Peak of Silk Road trade. Buddhism becomes imperial religion. Thousands of cave temples built with lion reliefs at entrances. The lion dance (shīwǔ) evolves from Central Asian performers into a Chinese tradition.', type: 'art' },
  { year: '953 CE', sortYear: 953, title: 'Iron Lion of Cangzhou cast', detail: 'Weighing 40 tonnes and standing 5.78m tall, it is the largest and oldest surviving iron-cast artwork in China. A guardian lion that also served as a base for a Buddhist temple\'s incense burner.', type: 'art' },
  { year: '1189–1192', sortYear: 1190, title: 'Marco Polo Bridge completed', detail: 'The Lugouqiao bridge in Beijing adorned with hundreds of stone lions along its balustrades. So many that a Chinese saying asks: "Who can count the lions on Marco Polo Bridge?"', type: 'art' },
  { year: '1271–1368', sortYear: 1300, title: 'Yuan Dynasty — Mongol lions', detail: 'Mongol rulers in Beijing receive lion tributes from fellow Mongol khans in Western Asia. The lion remains a prestige gift 1,200 years after the first delivery.', type: 'trade' },
  { year: '1368–1644', sortYear: 1500, title: 'Ming Dynasty — the lion becomes mythological', detail: 'Silk Road trade dwindles. Asiatic lion populations shrink in the wild. Chinese artists lose their living reference. Working from copies of copies, the lion joins the dragon and phoenix as a mythological creature.', type: 'art' },
  { year: 'c. 1500', sortYear: 1502, title: 'Ali Akbar Khan records lion trade', detail: 'Persian trader Ali Akbar Khan describes Muslim merchants bringing lions along the Silk Road to the Ming court. One of the last records of the live lion trade.', type: 'text' },
  { year: '1420 –', sortYear: 1420, title: 'Forbidden City guardian lions', detail: 'Bronze lion pairs placed at key gates of the Forbidden City. Male holds an orb (dominion over the world), female restrains a cub (nurture). The form standardised under Ming and Qing — the image we know today.', type: 'art' },
  { year: '1891', sortYear: 1891, title: 'Last lion in Syria', detail: 'The last sighting of a wild lion in Syria. The species is being pushed to extinction across its entire western range.', type: 'extinction' },
  { year: '1920', sortYear: 1920, title: 'Last Barbary lion killed in Morocco', detail: 'The last recorded wild Barbary lion shot in the Atlas Mountains. The species that ancient Romans imported for the Colosseum is gone from North Africa.', type: 'extinction' },
  { year: '1940s', sortYear: 1942, title: 'Last lion in Iran', detail: 'The last pride of five Asiatic lions hunted in Iran. Persia — which gave China the word "lion" — no longer has any.', type: 'extinction' },
  { year: 'Present', sortYear: 2026, title: 'Gir Forest: the last population', detail: 'Approximately 700 Asiatic lions survive in Gujarat, India. From Turkey to Greece to Iran to China — the range that once spanned three continents is now 1,412 square kilometres.', type: 'biology' },
]

// ── KEY ARTWORKS & TEXTS ──

export interface Artwork {
  title: string
  date: string
  location: string
  medium: string
  significance: string
  category: 'sculpture' | 'architecture' | 'text' | 'painting' | 'performance'
}

export const ARTWORKS: Artwork[] = [
  { title: 'Lion Capital of Ashoka', date: '250 BCE', location: 'Sarnath, India (now Delhi museum)', medium: 'Polished sandstone', significance: 'Four Asiatic lions on a pillar. The foundational Buddhist lion image. Now India\'s national emblem. This single artwork launched the lion eastward along the Silk Road.', category: 'sculpture' },
  { title: 'Gaoyi Que Tomb Lions', date: '209 CE', location: 'Ya\'an, Sichuan', medium: 'Stone', significance: 'Among the oldest surviving Chinese lion sculptures. Realistic features — recognisable as Asiatic lions. Placed as spirit road guardians at a ceremonial gate.', category: 'sculpture' },
  { title: 'Wu Family Shrine Carvings', date: 'c. 147 CE', location: 'Jiaxiang, Shandong', medium: 'Stone relief', significance: 'Early lion imagery in a Chinese funerary context. Shows the animal when Chinese artists still had some reference to actual specimens.', category: 'sculpture' },
  { title: 'Mogao Cave Guardian Lions', date: '4th–10th c. CE', location: 'Dunhuang, Gansu', medium: 'Stone relief, painted murals', significance: 'The visual relay station. Buddhist lion imagery from India arrived here and was transmitted to central China. 492 caves with lion guardians at entrances.', category: 'architecture' },
  { title: 'Iron Lion of Cangzhou', date: '953 CE', location: 'Cangzhou, Hebei', medium: 'Cast iron, 40 tonnes', significance: 'The largest and oldest surviving iron-cast artwork in China. By this point, the lion has been in China for 866 years. It no longer resembles the Asiatic original.', category: 'sculpture' },
  { title: 'Marco Polo Bridge Lions', date: '1189–1192', location: 'Beijing', medium: 'Stone balustrade', significance: 'Hundreds of individually carved lions line the bridge. Chinese saying: "Who can count the lions on Lugouqiao?" Each one different — the lion as infinite variation.', category: 'architecture' },
  { title: 'Forbidden City Bronze Lions', date: '1420 onwards', location: 'Beijing', medium: 'Gilt bronze', significance: 'The canonical form: male with orb, female with cub. Standardised under Ming and Qing. The image exported globally via Chinese diaspora.', category: 'sculpture' },
  { title: 'Book of the Later Han (後漢書)', date: '5th c. CE (records from 87 CE)', location: 'China', medium: 'Text', significance: 'The first written record of a live lion reaching China. Parthian envoy, 87 CE. The founding document of China\'s relationship with an animal it had never seen.', category: 'text' },
  { title: 'Tang Dynasty Lion Dance (獅舞)', date: '618–907 CE', location: 'China-wide', medium: 'Performance', significance: 'Bai Juyi describes Central Asian performers in a lion costume with a wooden head and silk tail. The origin of Chinese New Year lion dance — now performed worldwide.', category: 'performance' },
]

// ── CULTURAL TRANSMISSION LAYERS ──

export interface TransmissionLayer {
  name: string
  color: string
  origin: string
  contribution: string
  period: string
}

export const LAYERS: TransmissionLayer[] = [
  { name: 'Persian Power', color: '#E63946', origin: 'Persia / Parthia', contribution: 'The word shizi (狮子) derives from Persian shir. The lion as symbol of royal power and imperial prestige. Diplomatic tribute tradition.', period: '1st c. BCE – 15th c. CE' },
  { name: 'Buddhist Protection', color: '#FCBF49', origin: 'India via Gandhara', contribution: 'Buddha as "Lion of the Shakya Clan." Lion as protector of dharma. Ashoka\'s pillar as foundational image. Temple entrance guardian tradition.', period: '1st – 10th c. CE' },
  { name: 'Steppe Fluidity', color: '#72EFDD', origin: 'Central Asian nomads', contribution: 'Ordos "Animal Style" feline predator — fluid, powerful, zoomorphic. Merged with Buddhist lion as imagery moved through nomadic territory.', period: '9th c. BCE – 5th c. CE' },
  { name: 'Chinese Mythology', color: '#5E60CE', origin: 'Indigenous tradition', contribution: 'The suan-ni (狻猊) — mythical feline, one of nine sons of the dragon king. Chinese artists fused the foreign lion with their own pre-existing mythical beast.', period: 'Ancient – present' },
  { name: 'Imperial Authority', color: '#F4845F', origin: 'Chinese dynasties', contribution: 'Guardian of liminal space — the threshold between physical and spiritual worlds. Male with orb (dominion), female with cub (nurture). Status symbol for the elite.', period: 'Han dynasty – present' },
]

export const BIBLIOGRAPHY = [
  'Book of the Later Han (後漢書), compiled by Fan Ye, 5th century CE.',
  'Paludan, Ann. The Chinese Spirit Road: The Classical Tradition of Stone Tomb Statuary. Yale University Press, 1991.',
  'Sirén, Osvald. Chinese Sculpture from the Fifth to the Fourteenth Century. London: Benn, 1925.',
  'Chavannes, Édouard. Mission archéologique dans la Chine septentrionale. Paris: Leroux, 1909.',
  'Von Krenner, Walther. "Guardian Lions of China." Journal of Asian Art History, vol. 14, 2008.',
  'Singh, H.S. "The Asiatic Lion: ecology and conservation." Journal of Wildlife Science, 2017.',
  'Thapar, V. et al. Exotic Aliens: The Lion & the Cheetah in India. Aleph, 2013.',
  'Sun, Zhixin Jason. Age of Empires: Chinese Art of the Qin and Han Dynasties. Metropolitan Museum of Art, 2017.',
  'Ali Akbar Khan, Khatayi-nama (China Report), c. 1500 CE.',
]
