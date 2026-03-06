// ══════════════════════════════════════════════════
// THE GREEN SAHARA — DATA
// The African Humid Period · 11,000–5,000 years ago
// Prequel to "The Dust That Feeds"
// ══════════════════════════════════════════════════

// ── ANCIENT LAKES (Mapbox polygons/points) ──

export interface AncientLake {
  name: string
  coords: [number, number]
  areaKm2: string
  status: string
  detail: string
}

export const LAKES: AncientLake[] = [
  { name: 'Lake Mega-Chad', coords: [14.5, 14.0], areaKm2: '~400,000', status: 'Now: Bodélé Depression (dust) + remnant Lake Chad (~1,350 km²)', detail: '1,000 km north-south. 600 km east-west. Larger than all the Great Lakes combined. Possibly the world\'s largest lake at the time. Fed by rivers from the Tibesti, Hoggar, and Ennedi mountains. Skeletons of elephants, hippos, and hominins found on its ancient shorelines. When it dried, it left behind a bed of diatomite — the fossilised shells of billions of diatoms. That diatomite is now the dust that feeds the Amazon.' },
  { name: 'Lake Mega-Fezzan', coords: [13.0, 26.5], areaKm2: '~120,000', status: 'Now: dry sabkha, southern Libya', detail: 'A massive lake in what is now the Libyan Sahara. Fed by rivers from the Tibesti and Tassili mountains. Crocodiles and hippos lived in it.' },
  { name: 'Lake Darfur', coords: [24.0, 14.0], areaKm2: '~30,000', status: 'Now: dry lake beds, western Sudan', detail: 'Part of a chain of lakes across the central Sahara. Connected to the Nile drainage during the wettest phases.' },
  { name: 'Lake Ptolemy (Jebel Arkenu)', coords: [24.5, 22.5], areaKm2: '~5,000', status: 'Now: dry, southeastern Libya', detail: 'Named by Ptolemy who mapped it from Alexandrian reports. A lake in the deep Sahara that no longer exists.' },
  { name: 'Gobero (Lake)', coords: [9.5, 17.5], areaKm2: 'Small lakeside site', status: 'Now: Ténéré Desert, Niger', detail: 'The "Stone Age Graveyard." Two distinct populations buried here over 5,000 years. Kiffian people (tall, powerful, fishing culture, 10,000–8,000 BP) and Tenerian people (shorter, more gracile, 7,000–5,000 BP). Harpoon heads. The lake that sustained them vanished.' },
  { name: 'Ancient Nile overflow', coords: [30.5, 25.0], areaKm2: 'Expanded flood system', status: 'Now: standard Nile flow', detail: 'During the AHP the Nile flooded much more than today. Enhanced runoff poured into the eastern Mediterranean, creating anoxic conditions and depositing organic-rich sapropel layers on the seafloor — still measurable today.' },
]

// ── ANCIENT RIVERS ──

export interface AncientRiver {
  name: string
  path: [number, number][]
  detail: string
}

export const RIVERS: AncientRiver[] = [
  { name: 'Irharhar River', path: [[2.0, 27.0], [1.5, 25.0], [1.0, 23.5]], detail: 'Algeria/Libya/Tunisia. A major river system now completely dry. Visible from satellite as fossil river channels carved into rock.' },
  { name: 'Sahabi River', path: [[16.0, 28.0], [17.5, 30.0], [19.0, 31.0]], detail: 'Libya. Once flowed north to the Mediterranean. Now: gravel ridges in the Egyptian desert mark where rivers ran.' },
  { name: 'Kufra River', path: [[22.0, 23.0], [23.0, 25.0]], detail: 'Libya. Fed into interior lake basins. Active during the AHP.' },
  { name: 'Taffassasset River', path: [[8.0, 23.0], [10.0, 19.0], [14.0, 14.5]], detail: 'Draining the Hoggar Mountains southward into Lake Mega-Chad. A 600+ km river system, now dry wadis.' },
  { name: 'Wadi Tanezzuft', path: [[10.5, 25.5], [11.0, 24.0]], detail: 'Algeria/Libya. Carried water during the AHP into endorheic basins. Now a dry wadi bordered by rock art.' },
]

// ── FAUNA ──

export interface Animal { name: string; evidence: string; category: 'megafauna' | 'aquatic' | 'savannah' | 'predator' }

export const FAUNA: Animal[] = [
  { name: 'Hippopotamus', evidence: 'Bones in lake sediments. Rock art depictions. Found across the entire Sahara during the AHP.', category: 'aquatic' },
  { name: 'Nile crocodile', evidence: 'Propagated through connected river/lake systems. Still survives in Saharan guelta pools in Mauritania and Chad — relict populations from the Green Sahara.', category: 'aquatic' },
  { name: 'Elephant', evidence: 'Rock art across Tassili, Acacus, Hoggar. Skeletons found at Angamma delta of Lake Mega-Chad.', category: 'megafauna' },
  { name: 'Giraffe', evidence: 'Rock art. The famous Dabous Giraffes in Niger — two life-sized giraffes carved into rock, 6,000 years old, 6 metres tall.', category: 'megafauna' },
  { name: 'Rhinoceros', evidence: 'Rock art depictions in Tassili n\'Ajjer and Acacus Mountains.', category: 'megafauna' },
  { name: 'Aurochs (wild cattle)', evidence: 'Rock art shows large herds. The ancestor of domesticated cattle. Pastoralism began in the Green Sahara.', category: 'savannah' },
  { name: 'African buffalo', evidence: 'Fossils in Egyptian Sahara sites. Rock art.', category: 'savannah' },
  { name: 'Warthog', evidence: 'Fossils in Egyptian sites.', category: 'savannah' },
  { name: 'Hartebeest', evidence: 'Bone deposits at lake sites across the central Sahara.', category: 'savannah' },
  { name: 'Nile perch', evidence: 'Fish bones in lake sediments. A freshwater giant — up to 2 metres.', category: 'aquatic' },
  { name: 'Tilapia', evidence: 'Found in multiple ancient lake sites. A staple protein source.', category: 'aquatic' },
  { name: 'Catfish', evidence: 'Bone deposits at Gobero and other lakeside sites.', category: 'aquatic' },
  { name: 'Pelican', evidence: 'Fossil evidence in multiple lake deposits.', category: 'aquatic' },
  { name: 'Spotted hyena', evidence: 'Fossils in Egyptian Sahara.', category: 'predator' },
  { name: 'Wildebeest', evidence: 'Fossils in Egyptian Sahara sites.', category: 'savannah' },
  { name: 'Zebra', evidence: 'Fossils in Egyptian sites. Savannah species requiring grasslands and water.', category: 'savannah' },
]

// ── ROCK ART SITES ──

export interface RockArtSite { name: string; coords: [number, number]; country: string; detail: string }

export const ROCK_ART: RockArtSite[] = [
  { name: 'Tassili n\'Ajjer', coords: [8.0, 25.5], country: 'Algeria', detail: 'UNESCO World Heritage. Over 15,000 drawings and engravings. Elephants, giraffes, hippos, crocodiles, cattle herds, hunters, swimmers. "The world\'s largest open-air museum." Heinrich Barth was the first European to see these in the 1850s.' },
  { name: 'Acacus Mountains', coords: [10.5, 24.8], country: 'Libya', detail: 'UNESCO World Heritage. Rock art spanning 12,000 years. Includes the "Cave of Swimmers" scenes — people swimming in what is now the driest place on earth.' },
  { name: 'Dabous Giraffes', coords: [9.0, 20.0], country: 'Niger', detail: 'Two life-sized giraffes carved into a single rock outcrop. 6 metres tall. ~6,000 years old. One of the largest single rock engravings in the world.' },
  { name: 'Aïr Mountains', coords: [8.5, 19.0], country: 'Niger', detail: 'Thousands of petroglyphs. Cattle, oryx, giraffes, ostriches. Evidence of pastoralist cultures before the drying.' },
  { name: 'Jebel Uweinat', coords: [25.0, 22.0], country: 'Egypt/Libya/Sudan', detail: 'The "Mountain of Springs." Rock art depicting cattle, humans, and giraffes at the triple border point.' },
  { name: 'Hoggar Mountains', coords: [6.0, 23.5], country: 'Algeria', detail: 'Ahaggar massif. Rock art sites along ancient river valleys. Pastoral scenes. The rivers that fed these valleys now drain only dust.' },
]

// ── TIMELINE OF THE DRYING ──

export interface DryingEvent { year: string; sortYear: number; title: string; detail: string; type: 'wet' | 'transition' | 'dry' | 'consequence' }

export const TIMELINE: DryingEvent[] = [
  { year: '~14,600 BP', sortYear: -14600, title: 'The greening begins', detail: 'Earth\'s axial tilt shifts. More solar energy hits the Northern Hemisphere in summer. The African monsoon strengthens. Rain begins to fall on what had been desert since the Last Glacial Maximum. The Sahara starts to grow grass.', type: 'wet' },
  { year: '~12,700 BP', sortYear: -12700, title: 'Younger Dryas interruption', detail: 'A sudden cold snap. 1,200 years of drying. The monsoon weakens. The greening pauses. Then the cold ends — and the rain returns stronger than before.', type: 'transition' },
  { year: '~11,500 BP', sortYear: -11500, title: 'Full Green Sahara', detail: '9 million km² transforms. Rivers fill. Lakes form. Mega-Chad grows to 400,000 km². Grasslands, acacia woodland, and in places, actual forest. Elephants, hippos, crocodiles everywhere. Humans settle.', type: 'wet' },
  { year: '~9,000 BP', sortYear: -9000, title: 'Peak humidity', detail: 'Maximum rainfall. The Sahara is at its greenest. Lake levels at their highest. Rock art flourishes across Tassili, Acacus, Hoggar, Aïr. Pastoralism begins — people domesticate cattle in the Green Sahara.', type: 'wet' },
  { year: '~8,200 BP', sortYear: -8200, title: 'The 8.2 kiloyear event', detail: 'A sharp cold snap. The Green Sahara "pauses." Neolithic humans temporarily abandon occupation sites. Lakes shrink. Then conditions recover — but not fully.', type: 'transition' },
  { year: '~6,000 BP', sortYear: -6000, title: 'The drying begins', detail: 'Earth\'s axial wobble shifts again. The monsoon weakens. Rainfall decreases. Vegetation retreats southward. Lakes begin to shrink. The process is slow at first. Then it accelerates.', type: 'dry' },
  { year: '~5,500 BP', sortYear: -5500, title: 'Abrupt collapse', detail: 'In some areas the transition from green to desert happens within one to two centuries. Dust flux increases dramatically in ocean sediment cores. The Sahara turns off like a switch.', type: 'dry' },
  { year: '~5,000 BP', sortYear: -5000, title: 'The desert returns', detail: 'Mega-Chad shrinks. Rivers stop flowing. Animals retreat south to the Sahel or die. Humans migrate — to the Nile Valley, to the coast, to the south. The civilisations that will become Pharaonic Egypt are born in this migration.', type: 'dry' },
  { year: '~3,000 BP', sortYear: -3000, title: 'Full desert', detail: 'The Sahara looks like it does today. 9 million km² of sand, rock, and dust. The rivers are gone. The lakes are gone. Only the rock art remembers.', type: 'dry' },
  { year: 'Present', sortYear: 0, title: 'The Bodélé Depression', detail: 'What was the northern shore of Lake Mega-Chad is now the dustiest place on earth. The diatomite — fossilised shells of billions of diatoms that once lived in the lake — is picked up by wind and blown across the Atlantic. 182 million tons per year. 27.7 million tons land on the Amazon. The dead lake feeds the living forest.', type: 'consequence' },
]

// ── SCALE COMPARISON ──

export interface ScaleItem { label: string; areaKm2: number; color: string }

export const SCALE: ScaleItem[] = [
  { label: 'Green Sahara', areaKm2: 9000000, color: '#2D6E4F' },
  { label: 'Sahara today', areaKm2: 9200000, color: '#C4963C' },
  { label: 'Lake Mega-Chad', areaKm2: 400000, color: '#48BFE3' },
  { label: 'All Great Lakes combined', areaKm2: 244106, color: '#5E60CE' },
  { label: 'Lake Chad today', areaKm2: 1350, color: '#E63946' },
]

// ── ORBITAL WOBBLE DATA (simplified) ──

export interface OrbitalPoint { yearBP: number; tilt: string; monsoonStrength: string; saharaState: string }

export const ORBITAL: OrbitalPoint[] = [
  { yearBP: 20000, tilt: 'Low', monsoonStrength: 'Weak', saharaState: 'Hyper-arid desert' },
  { yearBP: 14600, tilt: 'Increasing', monsoonStrength: 'Strengthening', saharaState: 'First grasses' },
  { yearBP: 11000, tilt: 'Near maximum', monsoonStrength: 'Strong', saharaState: 'Green savannah' },
  { yearBP: 9000, tilt: 'Maximum', monsoonStrength: 'Peak', saharaState: 'Peak green' },
  { yearBP: 6000, tilt: 'Declining', monsoonStrength: 'Weakening', saharaState: 'Drying begins' },
  { yearBP: 5000, tilt: 'Low', monsoonStrength: 'Weak', saharaState: 'Desert returns' },
  { yearBP: 0, tilt: 'Low (present)', monsoonStrength: 'Weak (present)', saharaState: 'Full desert' },
]

export const BIBLIOGRAPHY = [
  'Tierney, J.E. et al. (2017). Rainfall regimes of the Green Sahara. Science Advances, 3(1).',
  'deMenocal, P.B. et al. (2000). Abrupt onset and termination of the African Humid Period. Quaternary Science Reviews.',
  'Drake, N. & Bristow, C. (2006). Shorelines in the Sahara: geomorphological evidence from Palaeolake Megachad. The Holocene.',
  'Schuster, M. et al. (2005). Holocene Lake Mega-Chad palaeoshorelines from space. Quaternary Science Reviews.',
  'Koren, I. et al. (2006). The Bodélé Depression: a single spot in the Sahara that provides most of the mineral dust to the Amazon. Environmental Research Letters.',
  'Yu, H. et al. (2015). The fertilizing role of African dust in the Amazon. Geophysical Research Letters.',
  'Washington, R. et al. (2009). Dust as a tipping element: The Bodélé Depression, Chad. PNAS.',
  'Sereno, P. et al. (2008). Lakeside Cemeteries in the Sahara. PLOS ONE. (Gobero site)',
  'NASA Earth Observatory. Bodélé Depression imagery. MODIS/CALIPSO.',
  'Nature Scitable. Green Sahara: African Humid Periods Paced by Earth\'s Orbital Changes.',
]
