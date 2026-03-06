// ─────────────────────────────────────────────────
// Morocco's Port Strategy
// Module 064 — Trade & Infrastructure Intelligence
// Sources: Tanger Med Port Authority, Morocco World
// News, Wikipedia, AGBI, Financial Ports, Reuters
// ─────────────────────────────────────────────────

export interface Port {
  id: string
  name: string
  coast: 'Mediterranean' | 'Atlantic'
  status: 'Operational' | 'Under construction' | 'Planned'
  containerCapacity: string
  depth: string
  keyStats: string[]
  detail: string
  lat: number
  lng: number
  color: string
}

export const PORTS: Port[] = [
  {
    id: 'tanger-med', name: 'Tanger Med', coast: 'Mediterranean',
    status: 'Operational', containerCapacity: '9M TEU (current) / 11.1M handled 2025',
    depth: '18m', lat: 35.8868, lng: -5.5005, color: '#F59E0B',
    keyStats: ['11.1M TEUs in 2025 (+8.4%)', '10.2M TEUs in 2024 (+18.8%)', '17th globally (Lloyd\'s List)', '#1 port in Africa and Mediterranean', '180 ports / 70 countries connected', '4 container terminals', '600,872 vehicles handled 2024', '3.2M passengers 2025', '1,319 mega-ships (290m+) in 2025', '1,400 companies / 130,000 jobs in industrial zones'],
    detail: 'Inaugurated 2007. Located at the Strait of Gibraltar on the world\'s busiest shipping lane. Tanger Med 2 opened 2019, doubling capacity. Primarily a transshipment hub — goods move between large intercontinental vessels and smaller feeder ships bound for West Africa, Northern Europe, and the Americas. Operators: APM Terminals (Maersk), Eurogate, Contship Italia, Marsa Maroc. ACWA Power consortium. The port\'s industrial zones have attracted Renault, Stellantis, and hundreds of tier-1 automotive suppliers. Morocco\'s maritime connectivity ranking jumped from 78th (2004) to 17th (2024).',
  },
  {
    id: 'nador-west-med', name: 'Nador West Med', coast: 'Mediterranean',
    status: 'Under construction', containerCapacity: '5M TEU initial / 12M expandable',
    depth: 'Deep water', lat: 35.1833, lng: -3.2333, color: '#A0452E',
    keyStats: ['$5.6B total investment', '800 ha industrial zone (expandable to 5,000 ha)', 'First LNG terminal in Morocco', 'CMA CGM contracted for 3M containers/year', 'Operational late 2026', 'Green hydrogen export quays planned'],
    detail: 'Morocco\'s third deepwater port. Located in the Bay of Betoya, 30 km west of Nador, on the eastern Rif coast. Designed for containers, hydrocarbons, coal, and general cargo. Will host Morocco\'s first floating LNG storage and regasification unit (FSRU), connecting via pipeline to industrial hubs in the northwest. Industrial zone will eventually surpass Tanger Med\'s footprint. Financed by AfDB, European funds (€300M+), and Arab Fund for Economic and Social Development. Highway construction between Guercif and Nador will link to Fes–Meknes corridor.',
  },
  {
    id: 'dakhla-atlantique', name: 'Dakhla Atlantique', coast: 'Atlantic',
    status: 'Under construction', containerCapacity: 'Multi-purpose (fishing, industry, energy)',
    depth: '23m (deepest in Morocco)', lat: 23.7147, lng: -15.9370, color: '#2D5F8A',
    keyStats: ['$1B+ investment', '1,600 ha industrial zone', '5,200 ha irrigated farmland (desalinated water)', 'Deepest port in Morocco (23m)', 'Completion target: 2028', 'Green hydrogen export quays', 'Gateway to sub-Saharan Africa'],
    detail: 'Morocco\'s Atlantic gateway to West and Central Africa. Located in the Southern Provinces (Western Sahara). Designed for fishing, shipbuilding, processing industries, and energy value chains. Will integrate desalination to irrigate 5,200 hectares of farmland — food security infrastructure built into the port. Positioned to process raw materials from Sahel countries and export green hydrogen to Europe. Construction ~50% complete as of late 2025.',
  },
  {
    id: 'casablanca', name: 'Casablanca', coast: 'Atlantic',
    status: 'Operational', containerCapacity: '~1.3M TEU',
    depth: '13.5m', lat: 33.5931, lng: -7.6142, color: '#5C7C3E',
    keyStats: ['Morocco\'s historic commercial port', '36% of national maritime trade', 'Largest city port in Morocco', 'Being repositioned for cruise and urban development'],
    detail: 'Morocco\'s original major port, operational since the French Protectorate. Handles a broad mix: containers, bulk, general cargo, phosphates, and passengers. Increasingly constrained by urban encroachment. Tanger Med has absorbed much of the growth, but Casablanca remains essential for import/export serving the Casablanca–Rabat economic corridor (home to ~40% of GDP).',
  },
  {
    id: 'jorf-lasfar', name: 'Jorf Lasfar', coast: 'Atlantic',
    status: 'Operational', containerCapacity: 'Bulk-focused (phosphates, chemicals)',
    depth: '16m', lat: 33.1167, lng: -8.6333, color: '#7B506F',
    keyStats: ['World\'s largest phosphate processing hub', 'OCP\'s main export terminal', '15M tonnes/yr plant nutrition capacity', 'Adjacent to 2,000 ha Jorf Lasfar industrial complex'],
    detail: 'Not a container port — this is Morocco\'s phosphate superport. Adjacent to OCP\'s Jorf Lasfar processing complex (the world\'s largest integrated phosphate facility). Handles fertilizer exports to 50+ countries. Morocco\'s second deepwater port after Tanger Med. Also handles coal imports for the nearby thermal power station and general industrial cargo.',
  },
  {
    id: 'safi', name: 'Safi', coast: 'Atlantic',
    status: 'Operational', containerCapacity: 'Bulk (phosphates, sardines)',
    depth: '10m', lat: 32.2833, lng: -9.2333, color: '#78716C',
    keyStats: ['OCP processing plant (since 1965)', 'Sardine capital of Morocco', 'Industrial port'],
    detail: 'Industrial port serving OCP\'s second phosphate processing plant and Morocco\'s sardine fishing fleet. Smaller than Jorf Lasfar but historically important — the first phosphate export terminal. Being studied for expansion as part of the national port strategy.',
  },
  {
    id: 'kenitra-atlantic', name: 'Kénitra Atlantique', coast: 'Atlantic',
    status: 'Planned', containerCapacity: 'Under study',
    depth: 'TBD', lat: 34.2610, lng: -6.5802, color: '#0EA5E9',
    keyStats: ['Proposed new Atlantic port', 'Near Kénitra automotive free zone', 'Would serve Rabat–Kénitra industrial corridor'],
    detail: 'Under feasibility study. Would serve the growing Kénitra Atlantic Free Zone, home to Stellantis\'s second Moroccan assembly plant and tier-1 suppliers. Would reduce logistics pressure on Casablanca and complement Tanger Med for Atlantic-facing trade.',
  },
]

export interface ThroughputYear {
  year: string
  teu: string
  growth: string
  note: string
}

export const TANGER_MED_GROWTH: ThroughputYear[] = [
  { year: '2015', teu: '~2.96M', growth: '—', note: 'Baseline. Tanger Med 1 only.' },
  { year: '2018', teu: '~3.47M', growth: '+17%', note: 'Tanger Med 2 under construction.' },
  { year: '2019', teu: '~4.80M', growth: '+38%', note: 'Tanger Med 2 opens. Capacity doubles.' },
  { year: '2020', teu: '~5.77M', growth: '+20%', note: 'Grows through COVID. Global trade disruption.' },
  { year: '2022', teu: '~7.55M', growth: '+6%', note: 'Post-pandemic recovery. Joins Top 25 globally.' },
  { year: '2023', teu: '~8.61M', growth: '+14%', note: 'Red Sea crisis reroutes traffic via Gibraltar.' },
  { year: '2024', teu: '10.24M', growth: '+18.8%', note: 'Crosses 10M TEU. First African port in Top 20.' },
  { year: '2025', teu: '11.11M', growth: '+8.4%', note: 'TC4 extension commissioned. 17th globally.' },
]

export const TRADE_ROUTES = [
  { route: 'Europe ↔ West Africa', detail: 'Tanger Med\'s primary feeder corridor. Containers from Asia/Europe are transshipped onto smaller vessels bound for Lagos, Abidjan, Dakar, Lomé.' },
  { route: 'Asia ↔ Europe (via Gibraltar)', detail: '~100,000 ships pass the Strait annually. Tanger Med captures transshipment from vessels too large to call at smaller Mediterranean ports.' },
  { route: 'Mediterranean ↔ Americas', detail: 'Growing corridor. Direct lines to US East Coast, Brazil, and Caribbean from Tanger Med.' },
  { route: 'Morocco ↔ Spain', detail: '900 MW electricity interconnector + RoPax passenger ferries. 14 km across the Strait. 3.2M passengers in 2025.' },
  { route: 'Atlantic Africa (Dakhla corridor)', detail: 'Planned. Dakhla Atlantique will open direct maritime access from Morocco\'s south to Mauritania, Senegal, and the Gulf of Guinea.' },
  { route: 'Green hydrogen to Europe', detail: 'Both Nador West Med and Dakhla will include dedicated hydrogen export quays. Morocco aims to be Europe\'s primary green hydrogen supplier.' },
]

export const HERO_STATS = [
  { value: '11.1M', label: 'TEUs — Tanger Med 2025' },
  { value: '17th', label: 'Global port ranking' },
  { value: '4', label: 'Deepwater ports (by 2028)' },
  { value: '245%', label: 'Tanger Med growth 2015–2024' },
]

export const KEY_NUMBERS = [
  { value: '180', label: 'Ports connected to Tanger Med', note: 'Across 70 countries. All major alliances: 2M, Ocean, THE Alliance.' },
  { value: '130,000', label: 'Jobs in Tanger Med zones', note: '1,400 companies. Renault, Stellantis, aerospace, textiles, renewables.' },
  { value: '$5.6B', label: 'Nador West Med investment', note: 'Third deepwater port. Operational late 2026.' },
  { value: '23m', label: 'Dakhla port depth', note: 'Deepest in Morocco. Gateway to sub-Saharan Africa.' },
  { value: '142M', label: 'Tonnes cargo — Tanger Med 2024', note: 'Containers + vehicles + hydrocarbons + bulk + passengers.' },
  { value: '78th → 17th', label: 'Morocco\'s connectivity ranking', note: '2004 → 2024. One port changed everything.' },
]
