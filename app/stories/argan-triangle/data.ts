// ─────────────────────────────────────────────────
// The Argan Triangle
// Module 070 — Agricultural & Economic Intelligence
// Sources: UNESCO, UN, FAO, Wikipedia (Argan oil,
// Sideroxylon spinosum), Morocco World News,
// The Ecologist, Springer (Human Ecology, LCA),
// SNS Insider, Market.us, Persistence Market Research
// ─────────────────────────────────────────────────

export interface BiosphereZone {
  name: string
  detail: string
  lat: number
  lng: number
  color: string
}

export const BIOSPHERE_ZONES: BiosphereZone[] = [
  { name: 'Essaouira Province', detail: '~300 small firms and cooperatives (25 km inland). Fastest-growing production zone. Traditional hand-extraction heartland.', lat: 31.51, lng: -9.77, color: '#5C7C3E' },
  { name: 'Agadir Ida Outanane', detail: 'Largest volumes. Souss-Massa dominates with ~44% revenue share. Modern mechanical extraction expanding. Proximity to processing units.', lat: 30.42, lng: -9.60, color: '#5C7C3E' },
  { name: 'Taroudant Province', detail: 'High Atlas southern slopes. Traditional agro-sylvo-pastoral system. FAO Globally Important Agricultural Heritage System (Ait Souab–Ait Mansour, 2018).', lat: 30.47, lng: -8.88, color: '#F59E0B' },
  { name: 'Chtouka Ait Baha', detail: 'Remote desert mountainscapes. Highest-quality fruit (affiyache). Deep-rooted trees on arid slopes. ANDZOA conservation focus.', lat: 30.07, lng: -9.15, color: '#F59E0B' },
  { name: 'Tiznit Province', detail: 'Anti-Atlas northern slopes. Traditional Amazigh harvesting rights controlled by village law. Cooperative growth zone.', lat: 29.70, lng: -9.80, color: '#D4A373' },
  { name: 'Inezgane-Ait Melloul', detail: 'Urban processing and export hub near Agadir. Industrial-scale cold pressing. Packaging and distribution centre.', lat: 30.35, lng: -9.51, color: '#9CA3AF' },
]

export interface ArganProduct {
  name: string
  type: string
  detail: string
  color: string
}

export const PRODUCTS: ArganProduct[] = [
  { name: 'Cosmetic argan oil', type: 'Beauty', detail: 'Cold-pressed from unroasted kernels. Rich in vitamin E, omega-6 and omega-9 fatty acids, ferulic acid, triterpenoids. Anti-aging, moisturising, hair repair. ~66% of market (cosmetic grade dominated 2024). L\'Oréal, The Body Shop, Josie Maran source from cooperatives.', color: '#7B506F' },
  { name: 'Culinary argan oil', type: 'Food', detail: 'Pressed from roasted kernels — distinctive nutty flavour. Used in salads, couscous, tagines, drizzled on bread. Darker colour than cosmetic grade. Shelf life 3–6 months (traditional) to 12–18 months (dry-pressed).', color: '#F59E0B' },
  { name: 'Amlou', type: 'Food', detail: 'Traditional Amazigh spread: argan oil + ground almonds + honey. Breakfast staple in Souss region. Morocco\'s answer to peanut butter. Tourist cooperative staple.', color: '#D4A373' },
  { name: 'Pharmaceutical argan oil', type: 'Health', detail: 'Anti-inflammatory compounds. Research into cardiovascular health, cholesterol reduction, diabetes, cancer prevention. Traditional medicine: skin conditions, wound healing.', color: '#2D5F8A' },
  { name: 'Press cake (byproduct)', type: 'Feed & materials', detail: 'Protein-rich residue after oil extraction. Animal feed, cosmetic uses. Research into bioplastics, sudan dyes, biochar. Shells used as firewood alternative in hammams.', color: '#9CA3AF' },
]

export interface CooperativeData {
  stat: string
  label: string
  detail: string
}

export const COOPERATIVE_STATS: CooperativeData[] = [
  { stat: '1,014', label: 'Cooperatives', detail: 'Across the Argan Biosphere Reserve. 688 are women\'s cooperatives.' },
  { stat: '13,774+', label: 'Workers employed', detail: 'Predominantly Amazigh (Berber) women. Traditional skills passed through generations.' },
  { stat: '22', label: 'UCFA member cooperatives', detail: 'Union des Coopératives des Femmes de l\'Arganeraie — largest union, EU co-sponsored.' },
  { stat: '~300', label: 'Small firms near Essaouira', detail: '25 km inland from the coast. Mostly cooperatives. Traditional hand-extraction.' },
  { stat: '80 MAD → 12 MAD/kg', label: 'Fruit price collapse (2020–22)', detail: 'Argan fruit (affiyache) price surged from 2 to 12 dirhams/kg post-Covid. Squeezed cooperative margins.' },
  { stat: '$22/litre', label: 'Mechanical oil price', detail: 'Less than half the cooperative price. Industrial scale driving down prices, threatening artisanal producers.' },
]

export interface Recognition {
  year: string
  body: string
  designation: string
  detail: string
}

export const RECOGNITIONS: Recognition[] = [
  { year: '1998', body: 'UNESCO', designation: 'Arganeraie Biosphere Reserve', detail: 'Morocco\'s first Biosphere Reserve. ~2.5 million hectares. Covers 8 provinces: Agadir Ida Outanane, Inezgane-Ait Melloul, Chtouka Ait Baha, Taroudant, Tiznit, Sidi Ifni, Guelmim, Essaouira.' },
  { year: '2010', body: 'Morocco', designation: 'ANDZOA founded', detail: 'Agence Nationale pour le Développement des Zones Oasiennes et de l\'Arganier. Government conservation and development agency.' },
  { year: '2014', body: 'UNESCO', designation: 'Intangible Cultural Heritage', detail: '"Argan, practices and know-how concerning the argan tree" inscribed on Representative List.' },
  { year: '2018', body: 'FAO', designation: 'Globally Important Agricultural Heritage System', detail: 'Argan-based agro-sylvo-pastoral system, Ait Souab–Ait Mansour area.' },
  { year: '2021', body: 'United Nations', designation: 'International Day of the Argan Tree (May 10)', detail: 'Resolution proposed by Morocco, co-sponsored by 113 member states, adopted by consensus.' },
]

export const HERO_STATS = [
  { value: '830,000', label: 'Hectares of argan forest' },
  { value: '~20M', label: 'Trees — all in Morocco' },
  { value: '3M+', label: 'People supported' },
  { value: '$370M+', label: 'Global market (2024)' },
]

export const KEY_NUMBERS = [
  { value: '40 kg', label: 'Fruit per litre of oil', note: '40 kg dried argan fruit produces just 1 litre of oil. One tree yields ~8 kg fruit/year — 5 trees per litre.' },
  { value: '200', label: 'Years — tree lifespan', note: 'Roots reach 30 metres deep. Withstands 50°C. Grows on poor soils. Thorny, gnarled trunks. Crown circumference up to 70m.' },
  { value: '50%', label: 'Forest lost in 100 years', note: 'Density dropped from 100 to 30 trees/hectare. Charcoal, overgrazing, urbanisation, drought.' },
  { value: '1:1', label: 'Cosmetic-to-culinary split', note: 'Cosmetics & personal care: ~66% of market. Culinary: growing segment. Pharmaceuticals emerging.' },
  { value: '688', label: 'Women\'s cooperatives', note: 'Of 1,014 total. Women lead the entire extraction process. Fair wages, literacy training, community reinvestment.' },
  { value: 'May 10', label: 'International Argan Day', note: 'UN resolution 2021. Proposed by Morocco. 113 co-sponsors. The only UN day for a single tree.' },
]
