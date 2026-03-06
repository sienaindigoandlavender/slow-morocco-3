// ─────────────────────────────────────────────────
// The Atlantic Coast — Tangier to Dakhla
// Module 059 — Coastal Intelligence
// Sources: CNN, African Business, Wikipedia,
// Moroccan Ministry of Fisheries, wind atlas data
// ─────────────────────────────────────────────────

export interface CoastalCity {
  id: string
  name: string
  coords: [number, number]  // [lng, lat]
  km: number  // approx km from Tangier along coast
  character: string
  detail: string
  tags: string[]
  color: string
}

export const CITIES: CoastalCity[] = [
  {
    id: 'tangier', name: 'Tangier', coords: [-5.8128, 35.7595], km: 0,
    character: 'The gateway. Where the Atlantic meets the Mediterranean.',
    detail: 'Strait of Gibraltar — 14 km from Spain. Tanger Med is Africa\'s largest container port by volume, handling 9M+ TEUs. Wind speeds 8–11 m/s make the region Morocco\'s most powerful wind corridor. The city straddles two oceans, two continents, and two identities.',
    tags: ['port', 'wind', 'trade'], color: '#2D5F8A',
  },
  {
    id: 'asilah', name: 'Asilah', coords: [-6.0340, 35.4653], km: 46,
    character: 'The whitewashed art town.',
    detail: 'Portuguese-built ramparts on the Atlantic. Annual arts festival since 1978. Quiet fishing harbour. The walls are painted by international muralists every summer. A slower, gentler Tangier.',
    tags: ['culture', 'fishing'], color: '#7B506F',
  },
  {
    id: 'rabat', name: 'Rabat', coords: [-6.8498, 34.0209], km: 250,
    character: 'The capital at the river mouth.',
    detail: 'Where the Bouregreg river meets the Atlantic. UNESCO World Heritage medina. The royal palace faces the ocean. Hassan Tower, unfinished since 1199. Morocco\'s administrative center — quiet authority where Casablanca is noise.',
    tags: ['capital', 'culture'], color: '#F59E0B',
  },
  {
    id: 'casablanca', name: 'Casablanca', coords: [-7.5898, 33.5731], km: 350,
    character: 'The economic engine.',
    detail: 'Morocco\'s largest city. 3.7M people. Casablanca port handles 36% of national maritime trade. Hassan II Mosque — the world\'s largest functioning mosque — built on a promontory over the Atlantic, minaret 210 m tall. Art Deco heritage from the French Protectorate.',
    tags: ['port', 'trade', 'industry'], color: '#A0452E',
  },
  {
    id: 'el-jadida', name: 'El Jadida', coords: [-8.5007, 33.2316], km: 450,
    character: 'The Portuguese cistern.',
    detail: 'Portuguese city of Mazagan — UNESCO World Heritage. The underground cistern draws more cameras than any ruin in Morocco. Offshore wind peaks here at 9 m/s. Jorf Lasfar — world\'s largest phosphate fertilizer complex — is 20 km south.',
    tags: ['heritage', 'wind', 'industry'], color: '#2D5F8A',
  },
  {
    id: 'safi', name: 'Safi', coords: [-9.2372, 32.2994], km: 600,
    character: 'The sardine capital.',
    detail: 'Morocco\'s sardine processing hub. One of the world\'s largest sardine ports. Also a major pottery center — Safi ceramics are distinct from Fes. OCP phosphate processing plant since 1965. The coast here shifts south — Atlantic swells build.',
    tags: ['fishing', 'industry', 'craft'], color: '#5C7C3E',
  },
  {
    id: 'essaouira', name: 'Essaouira', coords: [-9.7695, 31.5085], km: 750,
    character: 'The wind city.',
    detail: 'Trade winds blow year-round. Alizé winds make it a global kitesurfing and windsurfing destination. Gnawa music capital — annual festival draws tens of thousands. Thuya wood workshops inside the ramparts. Portuguese-designed fortress town. The most European-feeling city on the coast.',
    tags: ['wind', 'culture', 'surf'], color: '#7B506F',
  },
  {
    id: 'agadir', name: 'Agadir', coords: [-9.5981, 30.4278], km: 950,
    character: 'The rebuilt resort.',
    detail: 'Destroyed by earthquake in 1960 (15,000 killed). Rebuilt from scratch — Morocco\'s most modern city. Largest fishing port in Africa. Handles 65% of Morocco\'s fish exports. Year-round sun. The Souss-Massa region produces most of Morocco\'s citrus and vegetables.',
    tags: ['fishing', 'tourism', 'trade'], color: '#F59E0B',
  },
  {
    id: 'tiznit', name: 'Tiznit', coords: [-9.8000, 29.6974], km: 1100,
    character: 'The silver capital.',
    detail: 'Last walled city built in Morocco (1882). Famous for Amazigh silver jewelry. Gateway to the Anti-Atlas and the road south. The coast below here becomes wilder — fewer tourists, bigger waves.',
    tags: ['craft', 'culture'], color: '#78716C',
  },
  {
    id: 'tarfaya', name: 'Tarfaya', coords: [-12.9306, 27.9381], km: 1600,
    character: 'The wind farm frontier.',
    detail: 'Wind speeds 7–8.5 m/s. Site of the 300 MW Tiskrad wind farm. Saint-Exupéry was stationed here as an airmail pilot in the 1920s — inspiration for The Little Prince. Cap Juby. The landscape is flat, empty, and relentless.',
    tags: ['wind', 'heritage'], color: '#5C7C3E',
  },
  {
    id: 'laayoune', name: 'Laayoune', coords: [-13.2028, 27.1536], km: 1800,
    character: 'The southern provinces\' capital.',
    detail: 'Largest city in Western Sahara. 100 MW Boujdour wind farm nearby. Phosboucraa phosphate conveyor belt terminus (102 km from Boucraa mine). Administrative center of Morocco\'s sovereignty claim. New development projects funded by OCP profits.',
    tags: ['wind', 'industry', 'politics'], color: '#A0452E',
  },
  {
    id: 'dakhla', name: 'Dakhla', coords: [-15.9570, 23.6848], km: 3100,
    character: 'The end of the road. The beginning of Africa.',
    detail: 'Sandbar peninsula between the Atlantic and a vast lagoon. World-class kitesurfing. $1.6B Dakhla Atlantic Port under construction — deepwater facility on an island, connected by 1.3 km bridge. Designed to handle 35M tonnes/year. Green hydrogen hub planned. Gateway to West Africa and the Sahel. Expected operational by 2030.',
    tags: ['port', 'wind', 'surf', 'trade'], color: '#2D5F8A',
  },
]

export interface CoastalStat {
  value: string
  label: string
  note: string
}

export const STATS: CoastalStat[] = [
  { value: '3,500 km', label: 'Atlantic coastline', note: 'From the Strait of Gibraltar to the Mauritanian border' },
  { value: '#1', label: 'Fish producer in Africa', note: 'Agadir alone handles 65% of Morocco\'s fish exports' },
  { value: '9M+ TEUs', label: 'Tanger Med throughput', note: 'Africa\'s largest container port by volume' },
  { value: '25 GW', label: 'Onshore wind potential', note: '6 GW targeted by 2030. Peak winds Tangier–Essaouira–Tarfaya–Dakhla' },
  { value: '$1.6B', label: 'Dakhla Atlantic Port', note: 'Under construction. 1,650 hectares. Gateway to West Africa.' },
  { value: '52%', label: 'Renewable energy target by 2030', note: 'Wind is the largest contributor after solar' },
]

export interface CoastalTheme {
  theme: string
  title: string
  detail: string
  color: string
}

export const THEMES: CoastalTheme[] = [
  {
    theme: 'fishing', title: 'The Fishing Coast',
    detail: 'Morocco is Africa\'s largest fish producer and the world\'s largest exporter of sardines. The Atlantic upwelling — cold, nutrient-rich water rising from the deep — makes these waters among the most productive on Earth. Agadir is the industrial hub. Safi processes sardines. Essaouira and Dakhla serve artisanal fleets. Fishing supports hundreds of thousands of families from Tangier to the Saharan coast.',
    color: '#5C7C3E',
  },
  {
    theme: 'wind', title: 'The Wind Corridor',
    detail: 'Morocco\'s Atlantic coast is one of the windiest in Africa. The Tangier–Tétouan region records 8–11 m/s. Essaouira\'s alizé trades blow year-round. Tarfaya and Dakhla average 7–8.5 m/s. The national energy strategy targets 52% renewables by 2030 with 6 GW of onshore wind capacity. Major wind farms: Tarfaya (301 MW), Tanger (140 MW), Jbel Lahdid/Essaouira (200 MW), Tiskrad/Laayoune (300 MW), Boujdour (100 MW).',
    color: '#2D5F8A',
  },
  {
    theme: 'ports', title: 'The Port Strategy',
    detail: 'Morocco is building a chain of world-class ports along its Atlantic coast. Tanger Med (north) handles European trade — Africa\'s #1 container port. Casablanca (center) handles 36% of national maritime traffic. Agadir (south) dominates fish exports. Dakhla Atlantic Port (far south, under construction) is the $1.6B gateway to West Africa and the Sahel. The strategy: connect the Atlantic to the continent\'s fastest-growing inland markets.',
    color: '#F59E0B',
  },
  {
    theme: 'surf', title: 'The Surf & Wind Coast',
    detail: 'The Atlantic swell corridor runs from Essaouira to Dakhla. Taghazout (near Agadir) is Morocco\'s surf capital — consistent right-hand point breaks. Essaouira is the wind sports capital — kitesurfing, windsurfing. Dakhla\'s lagoon is world-class for flat-water kite speed. Imsouane has one of the longest right-hand breaks in Africa. The coast between Sidi Ifni and Tan-Tan is the uncrowded frontier.',
    color: '#7B506F',
  },
]

export const HERO_STATS = [
  { value: '3,500', label: 'Km of coastline' },
  { value: '12', label: 'Coastal cities mapped' },
  { value: '#1', label: 'Fishing in Africa' },
  { value: '25 GW', label: 'Wind potential' },
]
