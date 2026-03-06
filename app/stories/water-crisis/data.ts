// ─────────────────────────────────────────────────
// Morocco's Water Crisis — & the Rains That Broke It
// Module 006 — Environmental Data
// Sources: Ministry of Equipment & Water, Tanger Med,
// Maroc.ma, Yabiladi, Frontiers, AGBI, World Bank,
// Morocco World News, ACCIONA, Fanack Water
// ─────────────────────────────────────────────────

export interface DamFillYear {
  year: number
  fillRate: number // percentage
  storedBcm: number // billion cubic meters
  note?: string
}

export const DAM_FILL_HISTORY: DamFillYear[] = [
  { year: 2015, fillRate: 72, storedBcm: 13.7, note: 'Last comfortable year' },
  { year: 2016, fillRate: 65, storedBcm: 12.4 },
  { year: 2017, fillRate: 57, storedBcm: 10.8 },
  { year: 2018, fillRate: 53, storedBcm: 10.1, note: 'Drought begins' },
  { year: 2019, fillRate: 47, storedBcm: 8.9 },
  { year: 2020, fillRate: 43, storedBcm: 8.2 },
  { year: 2021, fillRate: 38, storedBcm: 7.2 },
  { year: 2022, fillRate: 33, storedBcm: 6.3, note: 'Water emergency declared' },
  { year: 2023, fillRate: 30, storedBcm: 5.7, note: 'Driest year in 80 years' },
  { year: 2024, fillRate: 28, storedBcm: 4.8, note: 'Al Massira at ~1%' },
  { year: 2025, fillRate: 46, storedBcm: 7.7, note: 'Rains begin Dec 2025' },
  { year: 2026, fillRate: 70.7, storedBcm: 11.86, note: 'Recovery — Feb 2026' },
]

export interface Basin {
  id: string
  name: string
  nameAr: string
  coords: [number, number]
  fillRate: number // Feb 2026
  storedMcm: number // million cubic meters, Feb 2026
  fillRateLastYear: number // Feb 2025
  keyDam?: string
  color: string
  region: 'north' | 'central' | 'south'
}

export const BASINS: Basin[] = [
  { id: 'loukkos', name: 'Loukkos', nameAr: 'اللكوس', coords: [-5.5, 35.2], fillRate: 94.2, storedMcm: 1803, fillRateLastYear: 42, keyDam: 'Oued El Makhazine', color: '#2D5F8A', region: 'north' },
  { id: 'sebou', name: 'Sebou', nameAr: 'سبو', coords: [-5.0, 34.3], fillRate: 91.2, storedMcm: 5064, fillRateLastYear: 35, keyDam: 'Al Wahda (largest in Morocco)', color: '#1A5276', region: 'north' },
  { id: 'bouregreg', name: 'Bouregreg', nameAr: 'أبي رقراق', coords: [-6.8, 33.9], fillRate: 93.6, storedMcm: 1013, fillRateLastYear: 38, keyDam: 'Sidi Mohammed Ben Abdellah', color: '#1D4ED8', region: 'central' },
  { id: 'tensift', name: 'Tensift', nameAr: 'تانسيفت', coords: [-8.0, 31.6], fillRate: 84.7, storedMcm: 193, fillRateLastYear: 22, keyDam: 'Lalla Takerkoust', color: '#60A5FA', region: 'central' },
  { id: 'oum-er-rbia', name: 'Oum Er-Rbia', nameAr: 'أم الربيع', coords: [-7.0, 32.5], fillRate: 62, storedMcm: 1850, fillRateLastYear: 15, keyDam: 'Al Massira', color: '#93C5FD', region: 'central' },
  { id: 'souss-massa', name: 'Souss-Massa', nameAr: 'سوس ماسة', coords: [-9.3, 30.4], fillRate: 55, storedMcm: 420, fillRateLastYear: 18, color: '#C8A415', region: 'south' },
  { id: 'guir-ziz', name: 'Guir-Ziz-Rheris', nameAr: 'غير زيز غريس', coords: [-4.5, 32.0], fillRate: 28, storedMcm: 180, fillRateLastYear: 12, color: '#C17F28', region: 'south' },
  { id: 'draa-noun', name: 'Draa-Oued Noun', nameAr: 'درعة واد نون', coords: [-6.5, 30.0], fillRate: 22, storedMcm: 95, fillRateLastYear: 8, color: '#A0452E', region: 'south' },
]

export interface DesalProject {
  name: string
  location: string
  coords: [number, number]
  capacity: string // m³/day or m³/year
  operator: string
  status: string
  note: string
}

export const DESAL_PROJECTS: DesalProject[] = [
  { name: 'Casablanca SWRO', location: 'Sidi Rahal', coords: [-7.5, 33.3], capacity: '300M m³/year', operator: 'ACCIONA (50%) + Green of Africa + AfriquiaGaz', status: 'Under construction — operational 2027–2028', note: 'World\'s largest desalination plant powered 100% by renewable energy. €613M investment. Serves 7.5M people.' },
  { name: 'Rabat-Kénitra', location: 'Rabat', coords: [-6.8, 34.0], capacity: '300M m³/year', operator: 'Veolia', status: 'Planned — MoU signed Oct 2024', note: 'Drinking water for 9M people across Rabat-Salé-Kénitra and Fès-Meknès regions.' },
  { name: 'Agadir (expanded)', location: 'Agadir', coords: [-9.6, 30.4], capacity: '125,000 m³/day', operator: 'Abengoa / ONEE', status: 'Operational — capacity upgraded', note: 'Backbone of Souss-Massa water supply. Serves agriculture and city.' },
  { name: 'Nador West Med', location: 'Nador', coords: [-3.0, 35.2], capacity: '250M m³/year', operator: 'TBD', status: 'Under construction', note: 'Paired with Nador West Med port development.' },
  { name: 'Dakhla', location: 'Dakhla', coords: [-15.9, 23.7], capacity: 'Operational', operator: 'ONEE', status: 'Operational', note: 'Supplies southern provinces.' },
  { name: 'Jorf Lasfar (OCP)', location: 'El Jadida', coords: [-8.6, 33.1], capacity: '80M m³/year', operator: 'OCP Green Water', status: 'Pipeline under construction', note: '200km pipeline to Khouribga mines. Reduces dam water use by 80%.' },
]

export const HERO_STATS = [
  { value: '70.7%', label: 'Dam fill rate (Feb 2026)' },
  { value: '11.86B', label: 'Cubic meters stored' },
  { value: '+155%', label: 'Recovery in 12 months' },
  { value: '7', label: 'Years of drought (2018–2025)' },
]

export const KEY_NUMBERS = [
  { value: '152', label: 'Large dams', note: '19.1B m³ total capacity' },
  { value: '~500 m³', label: 'Water per capita/year', note: 'Down from 2,560 m³ in 1960s' },
  { value: '17', label: 'Desalination plants operating', note: '4 under construction, 9 planned' },
  { value: '30%', label: 'Workforce in agriculture', note: '80% farmland is rain-fed' },
  { value: '720,000', label: 'Farm jobs lost (2019–2024)', note: 'Due to consecutive droughts' },
  { value: '2030', label: 'Desal = 50% of drinking water', note: 'Government target' },
]

export interface RainfallData {
  label: string
  value: string
  detail: string
}

export const RAINFALL_RECOVERY: RainfallData[] = [
  { label: 'Sept 2025–Feb 2026 inflows', value: '12.17B m³', detail: '134% above normal average' },
  { label: 'Winter rainfall increase', value: '+95%', detail: 'Year on year (Jan 12, 2026 data)' },
  { label: 'vs seasonal average', value: '+17.6%', detail: 'Above long-term norm' },
  { label: 'Dec 2025 alone', value: '3.1B m³', detail: 'Into dams in a single month' },
  { label: 'Al Wahda Dam', value: '41% → 95%', detail: 'Record recovery time' },
  { label: 'Minister\'s statement', value: 'Jan 12, 2026', detail: '"Seven-year drought is officially over"' },
]
