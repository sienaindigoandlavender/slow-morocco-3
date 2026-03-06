// ─────────────────────────────────────────────────
// Not All Desert Is Sand
// Module 082 — Geographic & Environmental Intelligence
// ─────────────────────────────────────────────────

export interface DesertType {
  name: string
  arabic: string
  pronunciation: string
  type: string
  coverage: string
  detail: string
  morocco: string
  keyFact: string
}

export const DESERT_TYPES: DesertType[] = [
  {
    name: 'Erg',
    arabic: 'عرق',
    pronunciation: 'from Arabic "arq" — dune field',
    type: 'Sand sea / dune field',
    coverage: '~25% of the Sahara. The part everyone imagines. The part that is the minority.',
    detail: 'A vast area of wind-blown sand where dunes cover more than 20% of the surface. Technically, an erg must exceed 125 km² to qualify — smaller areas are "dune fields." Individual dunes in ergs exceed 500m in width or length. Sand depths range from centimetres (Selima Sand Sheet, Egypt) to 21–43m in the Sahara. Dunes are constantly migrating, reshaping, and burying. The sand itself is a geological product: wind sorts sediment, carrying away fine dust and silt, leaving heavier grains to accumulate in basins downwind of dry riverbeds, floodplains, and lake beds. 85% of all Earth\'s mobile sand is found in ergs exceeding 32,000 km². The largest erg on Earth is the Rub\' al Khali (Empty Quarter) in Arabia.',
    morocco: 'Two famous ergs: Erg Chebbi (near Merzouga) — 28km north-south × 5–7km east-west, dunes to 150–160m, ~200 km². Erg Chegaga (near M\'Hamid) — 40km expanse, dunes to 120m, more remote and wild. Also: Erg Lihoudi, Tinfou Dunes. All are on the far western edge of the Sahara, along the Algerian border.',
    keyFact: '~25% of the Sahara is sand. The erg is the minority landscape',
  },
  {
    name: 'Reg',
    arabic: 'رق',
    pronunciation: 'also called serir (Libya), gibber (Australia), or desert pavement',
    type: 'Gravel plain / stony desert',
    coverage: '~50% of desert surfaces worldwide. The dominant desert landscape.',
    detail: 'Vast, flat expanses of compacted earth covered with closely packed, interlocking angular or rounded rock fragments — pebbles and cobbles. Formed by deflation: wind strips away fine sand and silt, leaving behind a pavement of larger stones too heavy to move. Rain and thermal expansion crack rocks; wind takes the fragments it can carry and leaves the rest. The surface appears solid, almost paved. Vehicles can drive across reg at speed. The landscape is stark, monotonous, and extends to every horizon. Reg forms the "other 75%" — the desert nobody photographs, nobody dreams about, and almost everybody crosses without knowing its name.',
    morocco: 'The vast plains between Ouarzazate and Merzouga. The territory south of the Anti-Atlas. The hammada du Drâa. The flat, stony landscape that fills hours of driving between the mountains and the dunes.',
    keyFact: 'The landscape between cities and dunes. Flat, stony, featureless in tourist photos',
  },
  {
    name: 'Hammada',
    arabic: 'حمادة',
    pronunciation: 'ḥammāda — from an Arabic root suggesting "barren"',
    type: 'Rocky plateau / exposed bedrock',
    coverage: 'The majority of the Sahara is hammada. The skeleton of the desert.',
    detail: 'High, barren, hard rocky plateaus where most sand has been removed by deflation — wind erosion that strips away all loose material. What remains is basalt, limestone, or sandstone bedrock, polished by millennia of abrasion. Hammada differs from reg: reg is a gravel plain (stones on flat ground); hammada is an elevated plateau of exposed bedrock. Hammada is the Sahara\'s skeleton — the geological infrastructure revealed when everything softer has been blown away. Temperatures swing wildly: the rock absorbs heat by day and radiates it at night. Some hammadas show evidence of ancient rivers and lakes — fossils, water-carved canyons — that predate the Sahara\'s desertification 5,400 years ago.',
    morocco: 'The Hammada du Drâa stretches across southeastern Morocco. The landscape surrounding Erg Chebbi is "pancake-flat, grey hammada" (Lonely Planet). The Hamada du Guir extends east toward Algeria. These plateaus form the geological foundation on which Morocco\'s Saharan margin sits.',
    keyFact: 'Hammada predates the desert by millions of years. The Sahara is mainly rock, not sand',
  },
  {
    name: 'Oued',
    arabic: 'واد',
    pronunciation: 'wadi (Eastern Arabic) / oued (Maghrebi Arabic / French transliteration)',
    type: 'Dry valley / seasonal riverbed',
    coverage: 'The hidden river network. Dry for months or years, then flash-flood torrents.',
    detail: 'A valley carved by water that flows only intermittently — after rare rainfall, or seasonally fed by Atlas Mountain snowmelt. Most of the year, an oued is a dry gravel bed. But the valley form proves water was here. And will return. Flash floods in oueds are among the most dangerous natural events in the Sahara — walls of water arrive without warning in bone-dry valleys. Oueds are the desert\'s memory of rain. They mark routes for nomadic migration, host the only vegetation (acacia, tamarisk, date palm), and determine where oases form. The French colonial transliteration "oued" (from Arabic "wadi") is standard in Morocco. Every river name in Morocco is an oued.',
    morocco: 'Oued Drâa — Morocco\'s longest river (1,100km), flowing from the Atlas to (occasionally) the Atlantic, sustaining the Drâa Valley palm oases. Oued Ziz — feeds the Tafilalet oasis near Erfoud/Rissani. Oued Dadès — carves the Dadès Gorge. Oued Rheris — seasonal flow through the pre-Saharan south. These oueds made civilisation possible at the desert\'s edge.',
    keyFact: 'Dry for years, then a wall of water',
  },
]

export interface SaharaFact {
  metric: string
  value: string
  source: string
}

export const SAHARA_FACTS: SaharaFact[] = [
  { metric: 'Total area', value: '9.2–9.4 million km² (~3.6M sq mi). Largest hot desert on Earth', source: 'Wikipedia / National Geographic' },
  { metric: 'Sand coverage', value: '20–30% of surface is sand dunes and sand sheets. Sources vary: Britannica says 25%, Nat Geo says 20% (ergs), others 30%', source: 'Britannica / Nat Geo / IFLScience' },
  { metric: 'Dominant landscape', value: 'Rocky hammada (stone plateaus) and reg (gravel plains) — 70–80% of surface', source: 'Wikipedia / IFLScience' },
  { metric: 'Countries spanned', value: '10+ countries including Morocco, Algeria, Tunisia, Libya, Egypt, Mali, Niger, Chad, Sudan, Mauritania', source: 'National Geographic' },
  { metric: 'Green Sahara', value: 'Just 5,400–10,000 years ago: lakes, rivers, grasslands, forests. Desertification triggered by Earth\'s axial shift', source: 'Multiple geological studies' },
  { metric: 'Oases', value: '~90 major oases across the Sahara. Including Morocco\'s Tafilalet (among the largest in the world)', source: 'Conservation Institute' },
  { metric: 'Temperature extremes', value: 'Record high: 58°C (136°F) in Libya. Winter nights can drop below freezing. 35°C+ daily swing', source: 'Various' },
  { metric: 'Morocco\'s Saharan margin', value: 'Southeastern Morocco: Drâa-Tafilalet region. 88,836 km². The interface zone where Atlas meets Sahara', source: 'Moroccan census / DWL Module 079' },
]

export interface ErgProfile {
  name: string
  location: string
  dimensions: string
  maxHeight: string
  character: string
  access: string
}

export const MOROCCAN_ERGS: ErgProfile[] = [
  { name: 'Erg Chebbi', location: 'Near Merzouga, southeastern Morocco. ~40km from Erfoud, on the Algerian border', dimensions: '28km north-south × 5–7km east-west. ~200 km²', maxHeight: '150–160m (some sources cite 300m for tallest peak)', character: 'Morocco\'s most famous dunes. Rose-gold to orange. Dramatic against flat grey hammada. Tourist infrastructure since 1980s. 70+ hotels in Merzouga. Camel treks, luxury camps, sandboarding. Legend: God sent the dunes as punishment for refusing a weary traveller', access: 'Paved road from Erfoud to Merzouga. 8–10hr drive from Marrakech or Fez. October–April best season. Summer: 45°C+' },
  { name: 'Erg Chegaga', location: 'Beyond M\'Hamid el Ghizlane, end of paved road. Deep Sahara', dimensions: '40km expanse — larger footprint than Erg Chebbi', maxHeight: '~120m — lower than Chebbi but broader', character: 'Wild, remote, less developed. No village lights, no morning roosters. 4×4 access only from M\'Hamid (~60km off-road). The erg for those who want true desert silence. Eco-camps and bivouacs. Fewer tourists, bigger sky', access: 'Requires 4×4 from M\'Hamid. 1.5–2hr off-road. Often combined with Drâa Valley route. Add 1–2 days vs Chebbi itinerary' },
  { name: 'Tinfou Dunes', location: 'Near Zagora, Drâa Valley', dimensions: 'Small dune field — more a taster than a full erg', maxHeight: '~15–20m', character: 'The gateway dunes for travellers coming from Ouarzazate. A brief taste of sand before the road continues to M\'Hamid. Quick camel rides, sunset photos', access: 'Roadside, paved N9 between Zagora and M\'Hamid. Easy stop' },
]

export interface HistoryEvent {
  year: string
  event: string
  thread: string
}

export const HISTORY: HistoryEvent[] = [
  { year: '~10,000 years ago', event: 'The Green Sahara. Lakes, rivers, forests, grasslands cover what is now desert. Humans fish, farm, paint rock art', thread: 'geology' },
  { year: '~5,400 years ago', event: 'Earth\'s axial tilt shifts. Precipitation collapses. The Sahara desertifies rapidly — a geological catastrophe measured in centuries, not millennia', thread: 'geology' },
  { year: '~3,000 years ago', event: 'Sahara reaches approximately its current extent. Erg, reg, and hammada landscapes established. Trans-Saharan trade routes develop along oued valleys and oases', thread: 'geology' },
  { year: '8th–14th C', event: 'Sijilmassa flourishes at the edge of the erg, controlling trans-Saharan caravan routes. Gold, salt, and slaves flow through the reg', thread: 'trade' },
  { year: '1850s–1930s', event: 'European exploration and colonial mapping of the Sahara. French introduce terms like "erg," "reg," and "hammada" to Western geographic vocabulary', thread: 'naming' },
  { year: '1963', event: 'Morocco\'s southeastern border with Algeria formalised. Erg Chebbi and Erg Chegaga fall on Morocco\'s side', thread: 'modern' },
  { year: '1980s', event: 'Tourism arrives at Erg Chebbi. Merzouga develops from a small hamlet to a desert gateway town with hotels and camps', thread: 'tourism' },
  { year: '2006', event: 'Rare flooding near Erg Chebbi destroys buildings and kills three — a reminder that "desert" does not mean "waterless"', thread: 'geology' },
  { year: '2020s', event: 'Sahara expanding southward at ~48km/year (some estimates). Climate change + deforestation. Morocco\'s pre-Saharan steppe under pressure', thread: 'climate' },
]

export const HERO_STATS = [
  { value: '25%', label: 'of the Sahara is sand' },
  { value: '75%', label: 'is rock, gravel, and bedrock' },
  { value: '9.2M', label: 'km² — largest hot desert on Earth' },
  { value: '4', label: 'desert landscapes most travellers can\'t name' },
]

export const KEY_NUMBERS = [
  { number: '25%', context: 'The fraction of the Sahara covered by sand dunes and sand sheets. The rest is hammada, reg, oued, salt flat, and mountain. The desert of imagination is the minority' },
  { number: '150m', context: 'Maximum dune height at Erg Chebbi — Morocco\'s tallest sand dunes. Rising from flat grey hammada like an orange cathedral' },
  { number: '40km', context: 'The expanse of Erg Chegaga — Morocco\'s largest erg. Broader than Chebbi but lower. Reachable only by 4×4 from M\'Hamid' },
  { number: '1,100km', context: 'Length of the Oued Drâa — Morocco\'s longest river. It flows from the Atlas to (sometimes) the Atlantic, creating the oases that sustain life at the desert\'s edge' },
  { number: '5,400', context: 'Years since the Green Sahara ended. The desert is geologically young. What is now hammada was once grassland. What is now erg was once lake bed' },
  { number: '90', context: 'Major oases across the Sahara — the life-support systems of the desert. Morocco\'s Tafilalet oasis is among the largest in the world' },
]

export const BIBLIOGRAPHY = [
  { source: 'Wikipedia', detail: 'Erg (landform), Hamada, Sahara. Geological definitions, coverage statistics, aeolian processes' },
  { source: 'Encyclopædia Britannica', detail: 'Sahara Desert — sand sheets and dunes cover approximately 25% of surface' },
  { source: 'National Geographic', detail: 'Ergs cover 20% of the Sahara. Algeria desert coverage. Sahara ecosystem descriptions' },
  { source: 'IFLScience', detail: '"The Sahara Desert Isn\'t As Sandy As You Think." 25% sand, 75% hammada and reg. Grand Erg Oriental at 308,210 km²' },
  { source: 'Lonely Planet', detail: 'Erg Chebbi: "rose-gold dunes rise dramatically above pancake-flat, grey hamada." Shape-shifting over 28km' },
  { source: 'Desert Stories (Morocco)', detail: 'Erg, reg, hamada terrain types. Morocco-specific desert landscape descriptions and travel guidance' },
]

export const MAP_POINTS = [
  { name: 'Erg Chebbi', lat: 31.1417, lng: -3.9667, detail: 'Iconic dunes. 22km long, 5km wide. Up to 150m high. Near Merzouga.', color: '#F59E0B' },
  { name: 'Erg Chegaga', lat: 29.8000, lng: -6.2833, detail: 'Remote grand erg. 40km long. Wilder, less visited. Near Mhamid.', color: '#F59E0B' },
  { name: 'Hammada du Draa', lat: 30.5, lng: -5.5, detail: 'Stone desert. Flat rock pavement. Largest hammada in Morocco.', color: '#8B7355' },
  { name: 'Reg (Tanezrouft)', lat: 27.0, lng: -3.0, detail: 'Gravel plain. Land of Thirst. Most desolate landscape on Earth.', color: '#A0522D' },
  { name: 'Draa Valley (Oued)', lat: 30.2, lng: -5.8, detail: 'Longest river in Morocco. 1,100km. Seasonal flow. Palm oases.', color: '#1A5276' },
  { name: 'Zagora', lat: 30.3300, lng: -5.8400, detail: 'Gateway to the Sahara. Timbuktu 52 days sign.', color: '#737373' },
  { name: 'Mhamid el Ghizlane', lat: 29.8281, lng: -5.7222, detail: 'Last town before the desert. End of the road.', color: '#737373' },
]
