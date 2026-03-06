// ─────────────────────────────────────────────────
// Trans-Saharan Trade Routes
// Module 069 — Historical & Trade Intelligence
// Sources: Wikipedia (Trans-Saharan trade, slave trade),
// Encyclopedia.com, OER Project, BlackPast,
// Desert-Morocco.net, Morocco Travel Blog
// ─────────────────────────────────────────────────

export interface TradeRoute {
  id: string
  name: string
  from: string
  through: string
  to: string
  primaryGoods: string
  detail: string
  fromCoords: [number, number]
  toCoords: [number, number]
  color: string
}

export const ROUTES: TradeRoute[] = [
  { id: 'taghaza-trail', name: 'The Taghaza Trail', from: 'Sijilmasa (Morocco)', through: 'Taghaza salt mines → Tichitt-Walata', to: 'Timbuktu → Djenné', primaryGoods: 'Salt south, gold north', detail: 'The great western route. Salt from Taghaza\'s mines (buildings made of salt blocks — Ibn Battuta, 1352) carried south to Timbuktu where it was traded almost weight-for-weight with gold. Gold went to Sijilmasa, struck into Almoravid dinars, shipped to Mediterranean. Peak under Mali Empire.', fromCoords: [-4.28, 31.28], toCoords: [-3.0, 16.77], color: '#F59E0B' },
  { id: 'audaghost-trail', name: 'The Audaghost Trail', from: 'Fez / Marrakech (Morocco)', through: 'Sijilmasa → Wadan → Audaghost', to: 'Kumbi Saleh (Ghana Empire)', primaryGoods: 'Cloth & manufactures south, Bambuk gold north', detail: 'Primary route to the Ghana Empire\'s Bambuk goldfields. Traders from Fez and Marrakech rented camels from Berber pastoralists. Ghana\'s capital Kumbi Saleh had separate quarters for Muslim traders. Route declined when Ghana fell to Almoravids (1076).', fromCoords: [-5.0, 34.03], toCoords: [-7.97, 15.77], color: '#A0452E' },
  { id: 'timbuktu-gao', name: 'Timbuktu–Gao–Takedda', from: 'Algiers / Wargla', through: 'In Salah → Arawan → Timbuktu', to: 'Gao (Songhai Empire)', primaryGoods: 'Textiles south, Lobi-Pourra gold north', detail: 'Central route active during Songhai Empire. Connected Algiers through the Sahara to Gao. Timbuktu served as both trade hub and Islamic scholarly centre. Caravans of 12,000+ camels recorded passing near Takedda. Route to Egypt branched east through Agades and Bilma.', fromCoords: [3.06, 36.75], toCoords: [0.05, 16.27], color: '#2D5F8A' },
  { id: 'tripoli-chad', name: 'Tripoli–Fezzan–Lake Chad', from: 'Tripoli (Libya)', through: 'Fezzan → Bilma salt mines → Kanem', to: 'Bornu (Lake Chad)', primaryGoods: 'Salt south, slaves & ivory north', detail: 'The oldest route. "Most of the trans-Saharan traffic from the Mediterranean coast during the last 2,000 years has passed along this road." Shortest crossing. Primary exchanges: slaves and ivory from the south for Bilma rock salt.', fromCoords: [13.18, 32.90], toCoords: [13.15, 12.10], color: '#7B506F' },
  { id: 'marrakech-essaouira', name: 'Marrakech–Essaouira–Timbuktu', from: 'Essaouira / Marrakech', through: 'Draa Valley → Tindouf', to: 'Timbuktu', primaryGoods: 'European goods south, gold & slaves north', detail: 'Western Atlantic route. Essaouira (Mogador) served as the port connecting trans-Saharan trade to European maritime networks. Jewish traders in both Essaouira and Timbuktu exchanged goods as late as the 19th century — including gunpowder tea from China. Aït Benhaddou served as fortified caravan stop.', fromCoords: [-9.77, 31.51], toCoords: [-3.0, 16.77], color: '#5C7C3E' },
]

export interface TradedGood {
  name: string
  direction: 'Northbound' | 'Southbound' | 'Both'
  detail: string
  significance: string
}

export const COMMODITIES: TradedGood[] = [
  { name: 'Gold', direction: 'Northbound', detail: 'From Bambuk, Bure, and Lobi-Pourra goldfields. Transported as dust, bricks, bars, and blank coins to Sijilmasa, struck into Almoravid dinars. Reached Mediterranean and European markets.', significance: 'Funded the Almoravid and Almohad empires. West African gold was first minted for European markets c. 1000 CE. Mansa Musa\'s 1324 pilgrimage displayed so much gold it crashed Egypt\'s economy.' },
  { name: 'Salt', direction: 'Southbound', detail: 'Mined by slaves at Taghaza, Teghaza, and Taoudenni as rectangular slabs cut from the desert floor. Transport fee: ~80% of value. Traded almost weight-for-weight with gold at Timbuktu. Also mined at Bilma (eastern route).', significance: 'Essential for human survival. In short supply in West Africa. The salt-gold axis was the engine of the entire trade system. Buildings in Taghaza were made entirely of salt blocks.' },
  { name: 'Enslaved people', direction: 'Northbound', detail: 'Purchased in West African cities. Ibn Battuta recorded a caravan of 600 enslaved women travelling to Morocco (1353). Slaves served as household servants, concubines, sugar plantation labour (Saadian dynasty), and porters carrying goods and water across the desert.', significance: 'Estimated 7,000+ enslaved people transported northward into Morocco over 10th–19th centuries. Under the Saadians, Moroccan sugar industry depended on sub-Saharan slave labour — a major motive for the 1591 invasion of Songhai.' },
  { name: 'Manuscripts & knowledge', direction: 'Both', detail: 'Scholars accompanied caravans. Arabic, Hebrew, and Latin manuscripts traded. Timbuktu accumulated libraries of thousands of manuscripts. Islamic scholarship, mathematics, medicine flowed south; indigenous knowledge flowed north.', significance: 'Timbuktu became one of the world\'s great centres of learning. Sankore University. 700,000+ manuscripts survive. Trade spread Islam from North Africa to West Africa.' },
  { name: 'Ivory, ostrich feathers, hides', direction: 'Northbound', detail: 'Luxury goods from the savanna. Ivory for European and Mediterranean markets. Ostrich feathers for fashion and military display. Animal hides for leather.', significance: 'Supplementary luxury goods that diversified trade beyond the gold-salt axis.' },
  { name: 'Textiles, copper, weapons, horses', direction: 'Southbound', detail: 'Cloth from North Africa and Europe. Copper vessels (al-Bakri recorded 2,000+ brass rods in one caravan). Horses for cavalry. Weapons. Sugar, dates, wheat, perfumes, paper, books.', significance: 'Manufactured goods from the north fuelled demand for raw materials from the south, creating reciprocal dependency.' },
]

export interface TradeCity {
  name: string
  role: string
  detail: string
  lat: number
  lng: number
  color: string
}

export const CITIES: TradeCity[] = [
  { name: 'Sijilmasa', role: 'Northern gateway', detail: 'Founded 8th C near present-day Rissani (Tafilalt). "Northern port of the Sahara." Where black Africa and white Africa intersected. Peaked 11th–12th C under Almoravids. Minted gold dinars. Now in ruins.', lat: 31.28, lng: -4.28, color: '#F59E0B' },
  { name: 'Timbuktu', role: 'Southern hub & scholarly centre', detail: 'Started as a caravanserai (pitstop). Became centre of learning and commerce under Mali Empire. Sankore University. 700,000+ manuscripts. Djinguereber Mosque (1327, architect from Andalusia). UNESCO World Heritage.', lat: 16.77, lng: -3.00, color: '#A0452E' },
  { name: 'Marrakech', role: 'Northern terminus & dynastic capital', detail: 'Founded by Almoravids (1070) partly on wealth from trans-Saharan trade. Controlled last leg of western routes. Fez and Marrakech were "ports on the edge of a great sea — the Sahara."', lat: 31.63, lng: -7.98, color: '#A0452E' },
  { name: 'Fez', role: 'Northern terminus & trading centre', detail: 'Merchants from Fez travelled the Audaghost Trail to Ghana. Private residences in Fez were "built and maintained by wealth hard-earned in the trans-Saharan trade." Intellectual hub receiving scholars from both sides.', lat: 34.03, lng: -5.00, color: '#2D5F8A' },
  { name: 'Essaouira (Mogador)', role: 'Atlantic port connecting desert & sea', detail: 'Connected trans-Saharan routes to European maritime trade. Jewish merchants traded between Essaouira and Timbuktu into the 19th century. Gunpowder tea from China reached Timbuktu via Essaouira.', lat: 31.51, lng: -9.77, color: '#5C7C3E' },
  { name: 'Aït Benhaddou', role: 'Fortified caravan stop (ighrem)', detail: 'Walled village along the Sahara-Marrakech route. Fresh water and refuge for caravans. UNESCO World Heritage. Draa Valley staging point.', lat: 31.05, lng: -7.13, color: '#D4A373' },
  { name: 'Taghaza', role: 'Salt mine', detail: 'Buildings made entirely of salt blocks. Mined by slaves. Transported south to Timbuktu. Under Almoravid hegemony. Replaced by Taoudenni mines.', lat: 23.65, lng: -3.99, color: '#9CA3AF' },
  { name: 'Kumbi Saleh', role: 'Ghana Empire capital', detail: 'Capital of the Ghana Empire. Separate quarters for Muslim traders and locals. Connected to Sijilmasa via the Audaghost Trail. Sacked by Almoravids 1076.', lat: 15.77, lng: -7.97, color: '#7B506F' },
  { name: 'Gao', role: 'Songhai Empire capital', detail: 'Eastern terminus. Capital of Songhai. Connected to Algiers and Tripoli via central routes. Major river port on the Niger. Invaded by Morocco 1591.', lat: 16.27, lng: 0.05, color: '#2D5F8A' },
  { name: 'Djenné', role: 'River trade hub', detail: 'Salt from Timbuktu broken into smaller pieces here, carried into forest by Dyula-Wangara traders. Great Mosque (world\'s largest mud-brick structure). UNESCO.', lat: 13.90, lng: -4.55, color: '#C17F28' },
]

export interface TimelineEvent {
  year: string
  event: string
  color: string
}

export const TIMELINE: TimelineEvent[] = [
  { year: '~300 BCE', event: 'Dromedary camel reintroduced to North Africa. Berbers begin desert crossings.', color: '#9CA3AF' },
  { year: '~830 CE', event: 'First historical references to Ghana Empire. Kumbi Saleh as capital. Western Sahara route to Sijilmasa.', color: '#7B506F' },
  { year: '8th C', event: 'Sijilmasa founded near present-day Rissani (Tafilalt). Becomes "northern port of the Sahara."', color: '#F59E0B' },
  { year: '~1000', event: 'West African gold first minted for European markets. Almoravid dinars circulate in Mediterranean.', color: '#F59E0B' },
  { year: '1062', event: 'Almoravids from Senegal River valley conquer Morocco, establish Marrakech. Control trans-Saharan routes.', color: '#A0452E' },
  { year: '1076', event: 'Almoravids sack Kumbi Saleh. Ghana Empire collapses. Trade shifts eastward.', color: '#A0452E' },
  { year: '13th C', event: 'Mali Empire rises. Caravans of 5,000–10,000 camels. Timbuktu becomes centre of learning and trade.', color: '#2D5F8A' },
  { year: '1324', event: 'Mansa Musa\'s hajj to Mecca. Displays so much gold he crashes Egypt\'s economy. "The richest human being who ever lived."', color: '#F59E0B' },
  { year: '1327', event: 'Djinguereber Mosque built in Timbuktu. Architect As-Sahili from Andalusia (Spain). Trade spreads Islamic architecture.', color: '#D4A373' },
  { year: '1352', event: 'Ibn Battuta visits Taghaza and Mali. Records buildings of salt, caravans of 600 enslaved women, 12,000-camel trains.', color: '#5C7C3E' },
  { year: '1468', event: 'Songhai takes Timbuktu from Mali. Gao becomes new imperial centre.', color: '#2D5F8A' },
  { year: '1591', event: 'Saadian Morocco invades Songhai (Battle of Tondibi). Seeking direct control of salt mines and gold routes. Gnawa origins.', color: '#A0452E' },
  { year: '17th C+', event: 'Decline begins. European maritime trade bypasses Sahara. Gold discovered in Americas. Caravan cities lose influence.', color: '#9CA3AF' },
  { year: '19th C', event: 'Last active Essaouira–Timbuktu trade. Jewish merchants exchange European goods for gold and slaves. Routes fade.', color: '#9CA3AF' },
]

export const HERO_STATS = [
  { value: '5', label: 'Major routes' },
  { value: '2,400', label: 'Km — typical crossing' },
  { value: '12,000', label: 'Camels in largest caravans' },
  { value: '1,200+', label: 'Years of active trade' },
]

export const KEY_NUMBERS = [
  { value: '1:1', label: 'Salt-to-gold ratio', note: 'At Timbuktu, salt traded almost weight-for-weight with gold. A slab of salt was worth its equivalent in gold.' },
  { value: '400 lbs', label: 'Single camel capacity', note: 'Standard desert crossing load. Up to 1,200 lbs over shorter distances. Berbers improved the saddle for heavier loads.' },
  { value: '80%', label: 'Transport fee on salt', note: 'Caravan merchants charged ~80% of salt\'s value for the crossing. Logistics were the real business.' },
  { value: '1324', label: 'Mansa Musa\'s hajj', note: 'Tens of thousands of camels. A fortune in gold. Crashed Egypt\'s economy. Created European myths of African gold.' },
  { value: '1591', label: 'Morocco invades Songhai', note: 'Saadian sultan sought direct control of salt and gold. Brought thousands of captives — origins of Gnawa culture.' },
  { value: '700,000+', label: 'Timbuktu manuscripts', note: 'Centuries of scholarly accumulation via trade routes. Arabic, Hebrew, Latin. Mathematics, medicine, astronomy, law.' },
]
