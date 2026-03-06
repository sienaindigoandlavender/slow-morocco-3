// ─────────────────────────────────────────────────
// The Tanneries
// Module 076 — Craft & Industrial Heritage
// ─────────────────────────────────────────────────

export interface ProcessStep {
  name: string
  duration: string
  detail: string
}

export const PROCESS_STEPS: ProcessStep[] = [
  { name: 'The Soak', duration: '2–3 days', detail: 'Raw hides — cow, sheep, goat, camel — are submerged in rectangular stone vats filled with a mixture of cow urine, quicklime, salt, and water. The alkaline solution loosens hair, dissolves fat, and halts decomposition. The smell starts here.' },
  { name: 'The Scrape', duration: '1 day', detail: 'Workers pull the hides from the lime vats and scrape off remaining hair, flesh, and fat with razor-sharp curved blades. Done by hand. Every hide, every time. The scraper works on a wooden beam, the hide draped over it like a surgeon\'s table.' },
  { name: 'The Softening', duration: '2–3 days', detail: 'Hides are transferred to vats of water mixed with pigeon droppings. The ammonia in the dung softens the leather and opens the fibres to absorb dye. Workers knead the hides by foot — three hours of stomping per batch. This is the step that produces the smell tourists remember.' },
  { name: 'The Dye', duration: '3–5 days', detail: 'Softened hides are submerged in round stone vats filled with natural plant dyes. Poppy for red. Indigo for blue. Saffron for yellow. Henna for orange. Mint for green. Cedarwood for brown. Pomegranate rinds for the golden babouche. Workers stand thigh-deep in colour, agitating the hides by hand.' },
  { name: 'The Dry', duration: '3 days', detail: 'Dyed hides are pulled from the vats, rinsed, and spread on rooftops and courtyard floors under direct sun. The Fez skyline becomes a patchwork of colour. Three days minimum. The sun does what no machine can replicate.' },
  { name: 'The Finish', duration: 'Ongoing', detail: 'Dried leather is cut, trimmed, and sold to artisans who transform it into babouches, bags, jackets, poufs, belts, wallets, book covers, and gloves. The tannery produces the material. The medina produces the goods.' },
]

export interface NaturalDye {
  color: string
  hex: string
  source: string
  note: string
}

export const DYES: NaturalDye[] = [
  { color: 'Red', hex: '#DC2626', source: 'Poppy flower', note: 'Deep crimson.  Used for bags, poufs, decorative leather.' },
  { color: 'Blue', hex: '#1A5276', source: 'Indigo', note: 'Imported historically from sub-Saharan trade routes. Deep and resistant to fading.' },
  { color: 'Yellow', hex: '#EAB308', source: 'Saffron / Turmeric', note: 'Saffron for premium yellow. Turmeric as the affordable alternative. Golden tones.' },
  { color: 'Orange', hex: '#EA580C', source: 'Henna', note: 'The warm orange that defines Moroccan leather. Same plant used for body art.' },
  { color: 'Green', hex: '#2D6E4F', source: 'Mint', note: 'Less common. Subtle. The same mint given to visitors to mask the smell.' },
  { color: 'Brown', hex: '#78350F', source: 'Cedarwood bark', note: 'Atlas cedar. Deep warm brown. Used for bookbindings, belts, formal goods.' },
  { color: 'Gold', hex: '#CA8A04', source: 'Pomegranate rinds', note: 'The canary-gold of babouche slippers. Soaked pomegranate peels yield a rich golden hue.' },
]

export interface Tannery {
  name: string
  lat: number
  lng: number
  detail: string
  specialty: string
  status: string
}

export const THREE_TANNERIES: Tannery[] = [
  { name: 'Chouara', lat: 34.0640, lng: -4.9730, detail: 'Dar Dbagh al-Chouara — "the tanning house." Largest and oldest. Over 1,200 basins. 500 master craftsmen. Located on the Oued Fes near Saffarin Madrasa. Local tradition dates it to the 9th century under Idris II. Historical documentation confirms 11th century. The one tourists photograph.', specialty: 'All leather types', status: 'Active — largest' },
  { name: 'Sidi Moussa', lat: 34.0626, lng: -4.9815, detail: 'Also called Guerniz Tannery. Southwest of the Zawiya of Moulay Idris II, near Nejjarine Museum. Historically specialised in cow skins. One of the oldest in Fez. Renovated in 2015. Quieter, less touristic.', specialty: 'Cow leather', status: 'Active — renovated 2015' },
  { name: 'Ain Azliten', lat: 34.0672, lng: -4.9870, detail: 'Northern medina. Created at the end of the 18th century — the youngest of the three. Known for babouche production. Intricate embroidery and designs. The artisan\'s tannery.', specialty: 'Babouches', status: 'Active — specialised' },
]

export interface HistoryEvent {
  year: string
  event: string
  thread: 'founding' | 'trade' | 'craft' | 'modern'
}

export const HISTORY: HistoryEvent[] = [
  { year: 'c. 9th C', event: 'Local tradition dates Chouara and Sidi Moussa tanneries to the founding of Fez by Idris II. Tanning linked to the city from its beginning.', thread: 'founding' },
  { year: '11th C', event: 'Historical records confirm active tanneries in Fez. Leather becomes a major export. Products reach markets across the Islamic world.', thread: 'trade' },
  { year: '12th–13th C', event: 'Al-Jazna\'i records the Almohads counted 86 tanning workshops in Fez. Leather exported as far as Baghdad. Fez becomes the leather capital of the western Islamic world.', thread: 'trade' },
  { year: 'c. 1325', event: 'Marinid period. Around 100 tanning workshops operating. The craft is at its medieval peak. Guilds structure the trade.', thread: 'craft' },
  { year: '16th C', event: 'Morocco leather crosses the Strait of Gibraltar. By Shakespeare\'s era, Moroccan goatskin — "Morocco leather" — becomes the premium choice for European bookbindings.', thread: 'trade' },
  { year: '18th C', event: 'Ain Azliten Tannery created in northern Fez. Third and youngest of the surviving three. Specialises in babouche slippers.', thread: 'founding' },
  { year: '19th C', event: 'Chromium introduced to accelerate tanning. Faster but toxic. The beginning of contamination that persists for two centuries.', thread: 'modern' },
  { year: '2009', event: 'Aziza Chaouni launches Fez River rehabilitation project. Proposal to relocate Chouara. Chromium-III deposits found in soil beneath the tannery. Workers report skin cancer and respiratory illness. Holcim Foundation Awards Gold for the project.', thread: 'modern' },
  { year: '2015', event: 'Sidi Moussa Tannery renovated. Rehabilitation programmes launched: restoration, "real leather" quality mark, acquisition of technical equipment. Tanneries remain in place.', thread: 'modern' },
  { year: 'Present', event: 'Three tanneries survive from 86. They operate as large-scale cooperatives. More than 300 families employed. International brands source leather from Fez. The same techniques, the same vats, the same hands.', thread: 'craft' },
]

export interface Product {
  name: string
  arabic: string
  detail: string
}

export const PRODUCTS: Product[] = [
  { name: 'Babouches', arabic: 'بلغة', detail: 'Pointed-toe leather slippers. Canary-gold from pomegranate rinds is the classic. Ain Azliten tannery specialises in these. Worn daily by millions. Exported worldwide.' },
  { name: 'Bags & Satchels', arabic: 'شكارة', detail: 'Handbags, shoulder bags, satchels, messenger bags. Goatskin absorbs dye deeply — the saturated colours of Moroccan leather. International brands source from Fez cooperatives.' },
  { name: 'Poufs', arabic: 'بوف', detail: 'Round leather floor cushions, hand-stitched. Sold stuffed or flat (buyer fills at home). Available in every dye colour. The product that launched Moroccan leather into Western interior design.' },
  { name: 'Jackets & Coats', arabic: 'جاكيطة', detail: 'Leather outerwear. Tailored in medina workshops from tannery leather. Goatskin for flexibility. Cowhide for structure. The quality varies enormously — provenance matters.' },
  { name: 'Bookbindings', arabic: 'تجليد', detail: 'Morocco leather has been the premium choice for European bookbinding since the 16th century. Goatskin\'s visible grain and durability allow hand-tooled patterns, gold stamping, and jewels. Antiquarian Morocco leather bindings remain the most sought-after.' },
  { name: 'Belts, Wallets, Gloves', arabic: 'حزام / محفظة', detail: 'Smaller goods. High margin. The everyday products that keep the economy running between tourist seasons.' },
]

export const HERO_STATS = [
  { value: '~900', label: 'Years of continuous operation' },
  { value: '1,200', label: 'Stone basins at Chouara' },
  { value: '3', label: 'Surviving tanneries of 86' },
  { value: '30', label: 'Days per hide' },
]

export const KEY_NUMBERS = [
  { value: '86', unit: 'tanning workshops', note: 'Counted by al-Jazna\'i under the Almohads (12th–13th century). ~100 under the Marinids. Three survive today: Chouara, Sidi Moussa, Ain Azliten.' },
  { value: '500', unit: 'master craftsmen', note: 'Working daily at Chouara alone. 1,200 stone basins. 200 men in the vats. Some families have tanned leather for generations.' },
  { value: '300+', unit: 'families employed', note: 'Across the three tanneries, now operating as large-scale cooperatives with their own administration. Auction hides in the medina like a fish market.' },
  { value: '30', unit: 'days per hide', note: 'The full process: soak, scrape, soften, dye, dry, finish. No machinery at any stage. The same duration as in the 11th century.' },
  { value: '25', unit: 'days per dye cycle', note: 'Every 25 days, the dyes lose potency and the vats are refreshed. Chemical-laden water from hundreds of vats is drained into the Oued Fes each month.' },
  { value: '0', unit: 'machines', note: 'The entire production process is manual. No modern machinery. No shortcuts. The method has not changed since medieval Fez.' },
]

export interface BibliographyEntry {
  author: string
  title: string
  year: string
  detail: string
}

export const BIBLIOGRAPHY: BibliographyEntry[] = [
  { author: 'Le Tourneau, Roger', title: 'Fez in the Age of the Marinides', year: '1961', detail: 'University of Oklahoma Press. The standard English-language history of medieval Fez. Documents the city\'s craft economy, guild structure, and the tanneries\' central role in trade and taxation.' },
  { author: 'Chaouni, Aziza', title: 'Depolluting the Medina: Fez River Rehabilitation Project', year: '2009–present', detail: 'Harvard GSD / University of Toronto. Architect and engineer leading the 20-year project to rehabilitate the Fez River. Documented chromium contamination beneath Chouara. Proposed relocation; tanneries were restored in place instead. Holcim Foundation Awards Gold, TED Talk 2014.' },
  { author: 'Parker, Richard', title: 'A Practical Guide to Islamic Monuments in Morocco', year: '1981', detail: 'Baraka Press. Locates the tanneries within the medina\'s architectural and social fabric. Maps Chouara relative to Saffarin Madrasa, Oued Fes, and the surrounding fundouks.' },
  { author: 'Touri, Abdelaziz & Benaboud, Mhammad', title: 'Fès: Patrimoine Universel', year: '2003', detail: 'IRCAM / UNESCO. Comprehensive documentation of Fez\'s World Heritage status. Includes tanneries as integral to the medina\'s living heritage and economic identity.' },
  { author: 'Jemma, Driss', title: 'Les Tanneurs de Fès', year: '1971', detail: 'The definitive ethnography of Fez\'s tanning trade. Documents the daily labour, guild organisation, seasonal rhythms, and economic networks connecting tanners to the broader medina craft economy.' },
  { author: 'Strong Sense of Place', title: 'Everything You Need to Know About Morocco Leather and the Tanneries in Fez', year: '2019', detail: 'Traces Morocco leather from 7th-century Islamic bookbinding culture through Shakespeare-era European luxury to present-day export. Goatskin\'s visible grain, dye absorption, and durability as the material foundation.' },
]
