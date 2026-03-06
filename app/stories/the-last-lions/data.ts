// ══════════════════════════════════════════════════
// THE LAST LIONS — DATA
// Barbary / Atlas Lion · Panthera leo leo
// ══════════════════════════════════════════════════

// ── BARBARY LION HISTORIC RANGE (Mapbox polygon) ──
// Morocco → Algeria → Tunisia → Libya → Egypt — Atlas Mountains to Mediterranean

export const BARBARY_RANGE: [number, number][] = [
  [-9.8, 30.0],   // SW Morocco (Anti-Atlas)
  [-8.0, 29.5],   // Atlas foothills
  [-5.5, 30.5],   // Central Atlas
  [-4.0, 32.0],   // Middle Atlas
  [-2.5, 33.5],   // Rif / NE Morocco
  [-1.8, 34.8],   // Nador coast
  [0.0, 35.5],    // Algeria coast
  [2.0, 36.5],    // Algiers area
  [3.5, 36.8],    // Kabylie
  [5.0, 36.5],    // Setif
  [7.0, 37.0],    // Annaba
  [8.5, 37.2],    // Tunisia coast
  [9.5, 37.0],    // Tunis
  [10.5, 35.5],   // Central Tunisia
  [15.0, 33.0],   // Tripolitania (Libya)
  [20.0, 32.0],   // Cyrenaica
  [25.0, 31.5],   // Western Egypt
  [30.0, 31.0],   // Nile Delta
  [30.0, 29.0],   // Upper Egypt limit
  [25.0, 28.0],   // Libyan Desert edge
  [15.0, 29.0],   // Central Sahara edge
  [10.0, 32.0],   // Southern Tunisia
  [5.0, 33.0],    // Saharan Atlas
  [1.0, 33.0],    // Ksour Range
  [-1.0, 32.5],   // Amour Range
  [-3.0, 31.0],   // Moroccan Sahara edge
  [-6.0, 29.5],   // Southern Anti-Atlas
  [-9.8, 30.0],   // Close polygon
]

// ── LAST SIGHTINGS IN THE WILD (1900-1960s) ──

export interface LastSighting {
  year: number
  coords: [number, number]
  location: string
  detail: string
  country: 'morocco' | 'algeria' | 'tunisia'
}

export const LAST_SIGHTINGS: LastSighting[] = [
  { year: 1891, coords: [5.0, 36.2], location: 'Batna Province', detail: 'Last reliable sighting in eastern Algeria. The Aurès Mountains population collapses.', country: 'algeria' },
  { year: 1893, coords: [3.5, 36.3], location: 'Sétif Province', detail: 'Lion reported killed near Sétif. Among the last in northeastern Algeria.', country: 'algeria' },
  { year: 1898, coords: [1.0, 33.5], location: 'Saharan Atlas', detail: 'Sighting in the Saharan Atlas range. A central population possibly connecting east and west.', country: 'algeria' },
  { year: 1912, coords: [-4.5, 33.5], location: 'Middle Atlas', detail: 'Lions still present in the Moroccan Middle Atlas forests.', country: 'morocco' },
  { year: 1920, coords: [-5.0, 31.5], location: 'Atlas Mountains', detail: 'Widely cited as the year the last Barbary lion was shot by a hunter. The most famous date in the story — but not the last sighting.', country: 'morocco' },
  { year: 1922, coords: [-6.5, 31.0], location: 'High Atlas', detail: 'A Barbary lion shot in the Atlas Mountains. Another candidate for "the last one."', country: 'morocco' },
  { year: 1935, coords: [0.5, 34.0], location: 'Saharan Atlas', detail: 'Late sighting in the Saharan Atlas. Solitary animal, not a group — a sign of a dying population.', country: 'algeria' },
  { year: 1942, coords: [-7.4, 31.3], location: 'Tizi n\'Tichka, High Atlas', detail: 'A lioness killed at the Tizi n\'Tichka pass. Long considered the last wild Barbary lion — but research suggests otherwise.', country: 'morocco' },
  { year: 1956, coords: [5.5, 36.0], location: 'Forests north of Sétif', detail: 'Possible sighting in Algerian forests. These areas were being used as military hideouts during the Algerian War.', country: 'algeria' },
  { year: 1958, coords: [5.2, 36.3], location: 'North of Sétif', detail: 'Estimated final extinction in Algeria. The forests that sheltered the last lions were destroyed by arson during the French-Algerian War (1954–62).', country: 'algeria' },
  { year: 1965, coords: [-4.0, 32.5], location: 'Remote Atlas', detail: 'Statistical upper bound for persistence in Morocco (95% CI). Small groups may have survived undetected.', country: 'morocco' },
]

// ── ZOO POPULATIONS — Descendants of Moroccan Royal Lions ──

export interface ZooSite {
  name: string
  city: string
  country: string
  coords: [number, number]
  status: 'breeding' | 'holding' | 'origin'
  note: string
}

export const ZOO_SITES: ZooSite[] = [
  { name: 'Rabat National Zoo', city: 'Rabat', country: 'Morocco', coords: [-6.83, 33.95], status: 'origin', note: 'The source. 30–40 individuals. World\'s largest Barbary lion collection. Descendants of the King of Morocco\'s royal palace collection. Cub "Azaghar" born July 2024.' },
  { name: 'Port Lympne Wild Animal Park', city: 'Kent', country: 'UK', coords: [1.03, 51.08], status: 'breeding', note: 'Key European breeding group. Male "Suliman" from Rabat sired ~25% of all European descendants. Cub "Saffi" born here.' },
  { name: 'Belfast Zoo', city: 'Belfast', country: 'UK', coords: [-5.95, 54.65], status: 'holding', note: 'Three Barbary lions obtained from Port Lympne in 2005. New enclosure opened 2023.' },
  { name: 'Erlebnis-Zoo Hannover', city: 'Hannover', country: 'Germany', coords: [9.74, 52.38], status: 'breeding', note: 'Active breeding programme. Male "Chalid" transferred from Port Lympne. Multiple cubs born.' },
  { name: 'Zoo Neuwied', city: 'Neuwied', country: 'Germany', coords: [7.45, 50.44], status: 'breeding', note: 'mtDNA testing in 2006 confirmed lion here is very likely a Barbary descendant. Active breeding.' },
  { name: 'Zoo Heidelberg', city: 'Heidelberg', country: 'Germany', coords: [8.69, 49.41], status: 'breeding', note: 'Part of the European studbook programme. Cubs born from royal lineage pairs.' },
  { name: 'Thüringer Zoopark Erfurt', city: 'Erfurt', country: 'Germany', coords: [11.02, 50.98], status: 'holding', note: 'Holds Moroccan royal descendants. Part of the European network.' },
  { name: 'Zoo Pilsen', city: 'Pilsen', country: 'Czech Republic', coords: [13.38, 49.75], status: 'breeding', note: 'Four cubs born 2025. Active breeding programme with Moroccan-lineage lions.' },
  { name: 'Zoo Olomouc', city: 'Olomouc', country: 'Czech Republic', coords: [17.25, 49.59], status: 'breeding', note: 'Lion photographed here in 2000 showed many of the 12 morphological traits of a "pure" Barbary lion.' },
  { name: 'Plättli Zoo', city: 'Frauenfeld', country: 'Switzerland', coords: [8.90, 47.56], status: 'holding', note: 'Part of the European studbook. Holds Moroccan-lineage lions.' },
  { name: 'Zoo Madrid', city: 'Madrid', country: 'Spain', coords: [-3.69, 40.42], status: 'holding', note: 'Females sourced from Madrid have been transferred to Port Lympne for breeding.' },
  { name: 'Addis Ababa Zoo', city: 'Addis Ababa', country: 'Ethiopia', coords: [38.75, 9.01], status: 'holding', note: '16 lions with dark manes resembling Barbary/Cape lions. Descendants of Emperor Haile Selassie\'s collection, caught in SW Ethiopia.' },
]

// ── SIZE COMPARISON — Barbary vs Asiatic vs African ──

export interface LionType {
  name: string
  subspecies: string
  color: string
  maleLength: string // head-to-tail
  maleWeight: string
  femaleWeight: string
  shoulderHeight: string
  mane: string
  habitat: string
  population: string
  status: string
}

export const LION_TYPES: LionType[] = [
  {
    name: 'Barbary / Atlas Lion',
    subspecies: 'Panthera leo leo (North Africa)',
    color: '#E63946',
    maleLength: '2.35–2.8 m',
    maleWeight: '200–270 kg (claims to 300 kg)',
    femaleWeight: '150–180 kg',
    shoulderHeight: '~1.0 m',
    mane: 'Long, dark, extending to chest, front legs, and belly. Most distinctive feature.',
    habitat: 'Atlas Mountains, Mediterranean forests, scrubland, semi-arid Sahara fringe. Cold winters.',
    population: '~90 in captivity (royal descent)',
    status: 'Extinct in wild',
  },
  {
    name: 'Asiatic Lion',
    subspecies: 'Panthera leo leo (India)',
    color: '#FCBF49',
    maleLength: '2.0–2.9 m',
    maleWeight: '160–190 kg',
    femaleWeight: '110–120 kg',
    shoulderHeight: '~1.07 m',
    mane: 'Shorter, sparser than African. Ears visible through mane. Belly fold unique to subspecies.',
    habitat: 'Dry deciduous forest, scrubland. Gir Forest, Gujarat, India.',
    population: '~700 in wild',
    status: 'Endangered (IUCN)',
  },
  {
    name: 'African Lion',
    subspecies: 'Panthera leo melanochaita (E/S Africa)',
    color: '#48BFE3',
    maleLength: '2.5–3.3 m',
    maleWeight: '150–225 kg (up to 272 kg)',
    femaleWeight: '110–152 kg',
    shoulderHeight: '~1.2 m',
    mane: 'Varies widely. Tsavo males often maneless. Serengeti males with full golden manes.',
    habitat: 'Savannah, grassland, open woodland. Sub-Saharan Africa.',
    population: '~20,000–25,000 in wild',
    status: 'Vulnerable (IUCN)',
  },
]

// ── POPULATION DECLINE — Global lion numbers over time ──

export interface PopPoint { year: number; population: number; label: string }

export const DECLINE: PopPoint[] = [
  { year: 1900, population: 200000, label: '~200,000 lions across Africa + Asia' },
  { year: 1920, population: 180000, label: 'Barbary lion "extinct" in Morocco. North Africa gone.' },
  { year: 1940, population: 150000, label: 'Last Barbary lioness shot at Tizi n\'Tichka (1942). Iran\'s last lions hunted (1940s).' },
  { year: 1950, population: 100000, label: 'Post-war expansion. Habitat conversion accelerates.' },
  { year: 1960, population: 80000, label: 'Algerian War destroys last Barbary forest refuges. Independence era across Africa.' },
  { year: 1970, population: 70000, label: 'Lions present in 40+ African countries. Decline intensifying.' },
  { year: 1980, population: 55000, label: 'Human-wildlife conflict rising. Livestock retaliation killings.' },
  { year: 1990, population: 40000, label: 'Lions extinct in 16 African countries.' },
  { year: 2000, population: 30000, label: 'West African lion critically endangered. ~400 individuals remain.' },
  { year: 2010, population: 23000, label: 'IUCN lists lion as Vulnerable. 43% decline in 20 years.' },
  { year: 2015, population: 20000, label: 'Cecil the lion killed in Zimbabwe. Global attention.' },
  { year: 2025, population: 20000, label: '~20,000–25,000. Extinct in 26+ countries. 94% of historic range lost.' },
]

// ── CONTEMPORARY WILD POPULATIONS — Where lions still roam ──

export interface WildPopulation {
  name: string
  country: string
  coords: [number, number]
  population: string
  trend: 'increasing' | 'stable' | 'declining' | 'critical'
  type: 'african' | 'asiatic'
}

export const WILD_POPULATIONS: WildPopulation[] = [
  // ── EAST AFRICA ──
  { name: 'Serengeti-Mara', country: 'Tanzania / Kenya', coords: [35.0, -2.3], population: '~3,000', trend: 'stable', type: 'african' },
  { name: 'Selous-Niassa', country: 'Tanzania / Mozambique', coords: [37.5, -9.0], population: '~4,000', trend: 'declining', type: 'african' },
  { name: 'Ruaha-Rungwa', country: 'Tanzania', coords: [34.5, -7.5], population: '~2,000', trend: 'declining', type: 'african' },
  { name: 'Murchison Falls', country: 'Uganda', coords: [31.7, 2.3], population: '~240', trend: 'stable', type: 'african' },
  { name: 'Queen Elizabeth NP', country: 'Uganda', coords: [30.0, -0.2], population: '~40', trend: 'declining', type: 'african' },
  { name: 'Kidepo Valley', country: 'Uganda', coords: [33.8, 3.9], population: '~22', trend: 'critical', type: 'african' },
  // ── SOUTHERN AFRICA ──
  { name: 'Okavango Delta', country: 'Botswana', coords: [22.5, -19.8], population: '~1,200', trend: 'stable', type: 'african' },
  { name: 'Central Kalahari', country: 'Botswana', coords: [24.5, -22.0], population: '~700', trend: 'stable', type: 'african' },
  { name: 'Kgalagadi Transfrontier', country: 'Botswana / South Africa', coords: [20.5, -25.5], population: '~750', trend: 'stable', type: 'african' },
  { name: 'Chobe-Linyanti', country: 'Botswana', coords: [25.0, -18.5], population: '~800', trend: 'increasing', type: 'african' },
  { name: 'Kruger National Park', country: 'South Africa', coords: [31.5, -24.0], population: '~1,600', trend: 'stable', type: 'african' },
  { name: 'Hwange', country: 'Zimbabwe', coords: [26.5, -19.0], population: '~500', trend: 'stable', type: 'african' },
  { name: 'Luangwa Valley', country: 'Zambia', coords: [31.5, -13.0], population: '~800', trend: 'stable', type: 'african' },
  // ── NAMIBIA ──
  { name: 'Etosha', country: 'Namibia', coords: [16.0, -18.8], population: '~500', trend: 'stable', type: 'african' },
  { name: 'Kunene Desert Lions', country: 'Namibia', coords: [13.5, -19.5], population: '~56–60', trend: 'critical', type: 'african' },
  // ── WEST AFRICA ── (Critically Endangered — fewer than 250 mature adults across the entire region)
  { name: 'W-Arly-Pendjari (WAP)', country: 'Benin / Burkina Faso / Niger', coords: [1.5, 11.5], population: '~250–400', trend: 'critical', type: 'african' },
  { name: 'Niokolo-Koba', country: 'Senegal', coords: [-12.7, 13.0], population: '~30–40', trend: 'critical', type: 'african' },
  // ── ASIA ──
  { name: 'Gir Forest', country: 'India', coords: [70.86, 21.14], population: '~700', trend: 'increasing', type: 'asiatic' },
]

// ── TIMELINE ──

export interface TimelineEvent {
  year: string
  sortYear: number
  title: string
  detail: string
  type: 'ancient' | 'roman' | 'royal' | 'colonial' | 'extinction' | 'conservation'
}

export const TIMELINE: TimelineEvent[] = [
  { year: '~100,000 BCE', sortYear: -100000, title: 'Fossils in the cave of Bizmoune', detail: 'Barbary lion fossils dating to 100,000–110,000 years found near Essaouira, Morocco. The lion has been in North Africa since before modern humans left the continent.', type: 'ancient' },
  { year: '~10,000 BCE', sortYear: -10000, title: 'Lions across three continents', detail: 'Lions range from Southern Africa to India, through the Middle East, across North Africa, and into Southern Europe. The largest range of any land mammal except humans.', type: 'ancient' },
  { year: '~3100 BCE', sortYear: -3100, title: 'Lion burials at Hierakonpolis', detail: 'Seven mostly subadult lions buried at the necropolis of Umm El Qa\'ab in Upper Egypt, in the tomb of Pharaoh Hor-Aha. Lions as royal companions from the very beginning of Egyptian civilization.', type: 'ancient' },
  { year: '250 BCE', sortYear: -250, title: 'Lion Capital of Ashoka', detail: 'Emperor Ashoka\'s pillar at Sarnath topped with four Asiatic lions. Now India\'s national emblem. The lion as symbol of Buddhist dharma begins its journey east.', type: 'ancient' },
  { year: '46 BCE', sortYear: -46, title: 'Caesar\'s 400 lions', detail: 'Julius Caesar parades 400 lions in Rome to celebrate his African victories. The Barbary lion enters the arena. Thousands will die in gladiatorial games over the next four centuries.', type: 'roman' },
  { year: '55 BCE', sortYear: -55, title: 'Pompey\'s 600 lions', detail: 'Pompey the Great brings 600 lions to Rome. The scale of the slaughter is staggering — but North Africa\'s lion population is still vast.', type: 'roman' },
  { year: '80 CE', sortYear: 80, title: 'Colosseum opens', detail: 'The Flavian Amphitheatre opens in Rome. Barbary lions are a staple of the venationes (beast hunts). An estimated 9,000 animals killed in the 100-day inaugural games alone.', type: 'roman' },
  { year: '~1st c. CE', sortYear: 100, title: 'Lions vanish from Europe', detail: 'The last European lions (likely in Greece and the Balkans) disappear around the 1st century CE. North Africa remains the nearest lion territory to Rome.', type: 'extinction' },
  { year: '~1200s', sortYear: 1250, title: 'Tower of London menagerie', detail: 'Barbary lions kept in the Tower of London. DNA testing of two skulls excavated in 1936–37 confirmed Barbary origin. Radiocarbon-dated to ~1280–1480.', type: 'royal' },
  { year: '~1500s–1900s', sortYear: 1700, title: 'Moroccan Royal lion collection', detail: 'Berber tribes present captured Atlas lions to the Sultans of Morocco as pledges of loyalty. These royal menagerie lions will become the last genetic reservoir of the subspecies.', type: 'royal' },
  { year: '1700', sortYear: 1700, title: 'Extinct in Libya', detail: 'The last wild Barbary lions in Libya are killed by farmers protecting livestock. The range shrinks westward.', type: 'extinction' },
  { year: '1800', sortYear: 1800, title: 'Extinct in Egypt', detail: 'The Barbary lion disappears from Egypt. The range is now confined to the Atlas Mountains of Morocco, Algeria, and Tunisia.', type: 'extinction' },
  { year: '1826', sortYear: 1826, title: 'First scientific description', detail: 'Austrian zoologist Johann N. Meyer publishes the first scientific description of the Barbary lion, based on a specimen from the Barbary Coast. Named Felis leo barbaricus.', type: 'colonial' },
  { year: '1891', sortYear: 1891, title: 'Last lion in eastern Algeria', detail: 'Final reliable sighting near Batna. The eastern population is gone. Only the Atlas Mountains of Morocco and western Algeria harbour survivors.', type: 'extinction' },
  { year: '1893', sortYear: 1893, title: 'Lion killed near Sétif', detail: 'Often cited as the last lion in Algeria. But the 2013 University of Kent study revealed they persisted much longer.', type: 'extinction' },
  { year: '1920', sortYear: 1920, title: 'The famous date', detail: 'A Barbary lion shot by a hunter in the Moroccan Atlas. The most widely cited extinction date — but not the true end.', type: 'extinction' },
  { year: '1925', sortYear: 1925, title: 'Last photograph from the wild', detail: 'A photograph taken from an aircraft on the Casablanca–Agadir–Dakar route captures what is believed to be the last image of a wild Barbary lion crossing the Atlas.', type: 'extinction' },
  { year: '1942', sortYear: 1942, title: 'The lioness at Tizi n\'Tichka', detail: 'A lioness killed at the Tizi n\'Tichka pass in the High Atlas. Long considered the absolute last wild Barbary lion. The pass is on the road from Marrakech to Ouarzazate.', type: 'extinction' },
  { year: '1953', sortYear: 1953, title: 'Royal family exiled', detail: 'The Moroccan royal family is forced into exile. 21 lions from the palace collection are transferred to zoos in Rabat, Casablanca, and Meknès.', type: 'royal' },
  { year: '1958', sortYear: 1958, title: 'The forests burn', detail: 'During the French-Algerian War (1954–62), forests north of Sétif — the last potential refuge — are systematically destroyed by arson. Any surviving lions are killed or die.', type: 'extinction' },
  { year: '~1960s', sortYear: 1963, title: 'True extinction in the wild', detail: 'University of Kent statistical analysis (2013) estimates final extinction: Morocco ~1948 (upper bound 1965), Algeria ~1958 (upper bound 1962). The Barbary lion is gone from the wild.', type: 'extinction' },
  { year: '1969', sortYear: 1969, title: 'Lions return to Rabat', detail: 'The remaining royal lions are consolidated at the palace in Rabat. This group — traced back through the studbook — becomes the foundation of every Barbary descendant alive today.', type: 'conservation' },
  { year: '1973', sortYear: 1973, title: 'Temara Zoo built', detail: 'New enclosures built at Temara near Rabat. The royal lions are moved to purpose-built facilities. The studbook begins.', type: 'conservation' },
  { year: '1998', sortYear: 1998, title: '52 descendants identified', detail: '52 lions in Rabat and European zoos confirmed as descendants of King Hassan II\'s collection. The breeding network is mapped.', type: 'conservation' },
  { year: '2006', sortYear: 2006, title: 'DNA confirms Neuwied lion', detail: 'mtDNA testing confirms a lion at Zoo Neuwied (Germany) is very likely a Barbary descendant from the Moroccan royal collection.', type: 'conservation' },
  { year: '2013', sortYear: 2013, title: 'University of Kent study', detail: 'Black et al. publish landmark analysis showing Barbary lions survived decades longer than assumed. "Micro-populations can remain undetected for generations."', type: 'conservation' },
  { year: '2020', sortYear: 2020, title: '~90 descendants worldwide', detail: 'The captive population of Moroccan royal lion descendants reaches approximately 90 individuals across European and Moroccan zoos.', type: 'conservation' },
  { year: '2024', sortYear: 2024, title: 'Cub "Azaghar" born in Rabat', detail: 'A male cub born July 26, 2024 at Rabat National Zoo. Named Azaghar. The breeding programme that began in 2022 delivers results.', type: 'conservation' },
  { year: '2025', sortYear: 2025, title: 'Four cubs born in Pilsen', detail: 'Zoo Pilsen (Czech Republic) announces four Barbary lion cubs. Morocco plans a reintroduction feasibility conference for late 2025/early 2026.', type: 'conservation' },
]

export const BIBLIOGRAPHY = [
  'Black, S.A., Fellous, A., Yamaguchi, N., Roberts, D.L. (2013). Examining the extinction of the Barbary lion and its implications for felid conservation. PLOS ONE 8(4): e60174.',
  'Yamaguchi, N., Haddane, B. (2002). The North African Barbary lion and the Atlas lion project. International Zoo News 49: 465–481.',
  'Black, S., Yamaguchi, N., Harland, A., Groombridge, J. (2010). Maintaining the genetic health of putative Barbary lions in captivity. European Journal of Wildlife Research 56: 21–31.',
  'Lehocká, K. et al. (2021). Genetic diversity of the captive Moroccan Royal Lion population. PLOS ONE.',
  'Bauer, H. et al. (2015). Lion populations are declining rapidly across Africa, except in intensively managed areas. PNAS 112(48): 14894–14899.',
  'Lee, T. et al. (2015). Assessing uncertainty in sighting records: an example of the Barbary lion. PeerJ 3: e1224.',
  'Burger, J., Hemmer, H. (2005). Urgent call for further breeding of the critically endangered Barbary lion. European Journal of Wildlife Research 52(1): 54–58.',
  'IUCN SSC Cat Specialist Group. Panthera leo. IUCN Red List of Threatened Species.',
  'Linnaeus, C. (1758). Systema Naturae. Type specimen from Constantine, Algeria.',
]
