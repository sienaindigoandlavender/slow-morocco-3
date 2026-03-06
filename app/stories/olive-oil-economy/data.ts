// ─────────────────────────────────────────────────
// The Olive Oil Economy
// Module 067 — Agricultural & Trade Intelligence
// Sources: Olive Oil Times, Interprolive, Milling MEA,
// African Agribusiness, FAOSTAT, Morocco Gold,
// ScienceDirect, IOC, INRA Morocco
// ─────────────────────────────────────────────────

export interface OliveRegion {
  id: string
  name: string
  detail: string
  hectares: string
  profile: string
  lat: number
  lng: number
  color: string
}

export const REGIONS: OliveRegion[] = [
  { id: 'fes-meknes', name: 'Fès-Meknès', detail: 'Morocco\'s "olive oil capital." Largest volumes. Fruity, mild oils. Home to Volubilis — Roman-era oil presses still visible. Saïss Plains ideal conditions. ~1,000 new continuous-system mills created here. Picholine Marocaine dominant (70%).', hectares: '~300,000 ha', profile: 'Fruity, mild, balanced. Green fruitiness, almond notes.', lat: 33.89, lng: -5.00, color: '#5C7C3E' },
  { id: 'marrakech-safi', name: 'Marrakech-Safi', detail: '223,600 ha — 20% of national olive area. 487,000 tonnes production (24% of national). Organic farms blending tradition and innovation. Zaouia Cooperative reports strong 2025 season. Home to INRA\'s Menara experimental station (est. 1927).', hectares: '223,600 ha', profile: 'Full-bodied, herbaceous. Atlantic influence.', lat: 31.63, lng: -8.01, color: '#F59E0B' },
  { id: 'beni-mellal', name: 'Béni Mellal-Khénifra', detail: 'Middle Atlas foothills. Jurassic-era valleys with mineral-rich soils. Naturally high polyphenol levels. In good years, 22–24 litres oil per quintal. Home to Morocco Gold estate (2,000 ft elevation). Sanhaja Berber olive tradition spanning millennia.', hectares: '~200,000 ha', profile: 'Distinctive, fruity. High polyphenol. Peppery finish.', lat: 32.34, lng: -6.36, color: '#A0452E' },
  { id: 'tanger-tetouan', name: 'Tangier-Tétouan-Al Hoceima', detail: 'Northern Morocco. 150+ modern crushing units. Ouezzane province: 70 modern + 306 traditional mills. Picholine Marocaine 70%, Haouzia + Menara ~20%. Herbaceous, green oils. Small-scale artisan production. Organic Rif mountain farms.', hectares: '~180,000 ha', profile: 'Herbaceous, green, fresh. Rif mountain character.', lat: 35.17, lng: -5.27, color: '#2D5F8A' },
  { id: 'oriental', name: 'Oriental (Taourirt / Oujda)', detail: 'Eastern Morocco. Drier conditions produce concentrated flavours. Growing region with investment from Green Morocco Plan. Traditional Picholine groves.', hectares: '~80,000 ha', profile: 'Robust, concentrated. Arid-climate intensity.', lat: 34.68, lng: -1.90, color: '#7B506F' },
  { id: 'souss-massa', name: 'Souss-Massa (Taroudant)', detail: 'Southern region. Lighter, golden oils ideal for international markets. Arid conditions stress trees, concentrating flavour compounds. Growing export focus.', hectares: '~100,000 ha', profile: 'Light, golden. Ideal for export markets.', lat: 30.40, lng: -9.00, color: '#C17F28' },
]

export interface OliveVariety {
  name: string
  type: 'Autochthonous' | 'INRA Selection' | 'Imported'
  use: string
  detail: string
  oilContent: string
}

export const VARIETIES: OliveVariety[] = [
  { name: 'Picholine Marocaine', type: 'Autochthonous', use: 'Dual (oil + table)', detail: 'Morocco\'s national olive. 96% of planted trees. Cousin to Picholine Languedoc. Strong adaptation to Moroccan soil/climate. Green fruitiness, almond, herbs, peppery finish. High polyphenol count. Fruit weight 2.5–4g.', oilContent: '16–22%' },
  { name: 'Haouzia', type: 'INRA Selection', use: 'Oil + table', detail: 'Clonal selection from Picholine Marocaine by INRA. High productivity, golden aromatic oil. Adds fruitiness to blends. Rapid production start (3 years). 85% rhizogenic ability.', oilContent: '~40% (dry matter)' },
  { name: 'Menara', type: 'INRA Selection', use: 'Oil', detail: 'INRA clonal selection. Light texture, mild nutty flavour. Contributes polyphenol depth and shelf stability to blends. Named after Marrakech\'s Menara gardens. 72% oleic acid.', oilContent: '~40% (dry matter)' },
  { name: 'Dahbia', type: 'INRA Selection', use: 'Oil', detail: 'INRA clonal selection. Distinctive phenolic composition — lifts aroma in blends. Unique D-Lig Agl profile. Less widely planted but valued by premium producers.', oilContent: 'High' },
  { name: 'Arbequina', type: 'Imported', use: 'Oil', detail: 'Spanish variety. High yields. Planted in modern high-density orchards (1,852 trees/ha vs 100/ha traditional). Taste declines over time. 84% of modern plantings at some estates.', oilContent: 'High' },
  { name: 'Koroneiki', type: 'Imported', use: 'Oil', detail: 'Greek variety. Minor contributor. Grown in some modern orchards. Known for very high polyphenol content globally.', oilContent: 'Very high' },
]

export interface ProductionYear {
  year: string
  harvest: string
  oilOutput: string
  note: string
}

export const PRODUCTION_DATA: ProductionYear[] = [
  { year: '2020/21', harvest: '~1.96M tonnes', oilOutput: '~200,000 t', note: 'Record year. Favourable weather.' },
  { year: '2021/22', harvest: '~1.5M tonnes', oilOutput: '~160,000 t', note: 'Good year. Green Morocco Plan investment bearing fruit.' },
  { year: '2022/23', harvest: '~1.3M tonnes', oilOutput: '~130,000 t', note: 'Heatwaves begin. Drought year 4.' },
  { year: '2023/24', harvest: '~1.07M tonnes', oilOutput: '~100,000 t', note: 'Continued drought. Prices rise sharply.' },
  { year: '2024/25', harvest: '950,000 t', oilOutput: '90,000 t', note: '6th drought year. Deficit vs 140K domestic demand. Brazil import authorised (10K t). VAT exemption on 30K t imports.' },
  { year: '2025/26', harvest: '2M t (projected)', oilOutput: '200,000 t (projected)', note: 'Record forecast. Rains returned. 60K exportable surplus. US tariff advantage (10% vs 15% EU).' },
]

export const EXPORT_MARKETS = [
  { market: 'United States', detail: 'World\'s largest olive oil importer ($3.3B market). Morocco exported 3,835 t / $38.4M in 2024 (1.2% share). New advantage: 10% tariff vs 15% on EU, 25% on Tunisia. Growth target.', share: '1.2%' },
  { market: 'European Union', detail: 'Traditional export destination. Spain and Italy buy Moroccan bulk oil for blending. Growing premium direct sales. La Grande Épicerie (Paris) lists Moroccan single-estate oils.', share: 'Bulk + premium' },
  { market: 'Domestic', detail: '140,000 t/year consumption. Oil is staple: cooking, medicine, cosmetics, hospitality symbol. Deficit in drought years (2024: 90K produced vs 140K consumed). Prices reached 130 MAD/litre Sep 2024.', share: '~70% of production' },
  { market: 'Gulf States', detail: 'Growing demand for premium Moroccan EVOO. Cultural affinity. Halal certification straightforward.', share: 'Emerging' },
  { market: 'Brazil', detail: 'Unusual reverse flow: Morocco authorised 10,000 t Brazilian olive oil import in 2024 to cover domestic shortfall.', share: 'Import source' },
]

export const HERO_STATS = [
  { value: '1.2M', label: 'Hectares of olive trees' },
  { value: '200K', label: 'Tonnes oil — 2025 target' },
  { value: '5th', label: 'Global producer' },
  { value: '380,000', label: 'Permanent jobs' },
]

export const KEY_NUMBERS = [
  { value: '1,000 BCE', label: 'Phoenicians bring olives', note: 'Beginning millennia of tradition. Volubilis (near Meknes) preserves Roman-era oil presses.' },
  { value: '65%', label: 'Of Morocco\'s tree cover', note: '1.2M hectares. Olive is the dominant permanent crop. 55% of total arboreal area.' },
  { value: '500,000+', label: 'Families dependent on olive', note: '51 million working days/year. 20% of jobs held by women. Agriculture employs 40% of workforce.' },
  { value: '96%', label: 'Picholine Marocaine dominance', note: 'One cultivar. INRA selections (Haouzia, Menara, Dahbia) and imports (Arbequina, Koroneiki) are growing.' },
  { value: '$160M+', label: 'Olive oil exports (2023)', note: 'Rising year on year. US market growing fastest with tariff advantage.' },
  { value: '0.1–0.3%', label: 'Acidity — premium producers', note: 'EVOO max is 0.8%. Morocco\'s best achieve ultra-low acidity. High polyphenols from climate stress.' },
]
