// ─────────────────────────────────────────────────
// Morocco's Automotive Revolution
// Module 042 — Industrial Intelligence
// Sources: AMDIE, AIVAM, Tanger Med Port Authority,
// Ministry of Industry and Trade, Renault Group,
// Stellantis, World Bank, Automotive Logistics
// ─────────────────────────────────────────────────

export interface Plant {
  id: string
  name: string
  operator: string
  city: string
  coords: [number, number]
  color: string
  opened: number
  hectares: number
  employees: string
  capacity: string
  models: string[]
  note: string
}

export const PLANTS: Plant[] = [
  {
    id: 'renault-tangier',
    name: 'Renault Mellousa',
    operator: 'Renault Group',
    city: 'Tangier',
    coords: [-5.745, 35.720],
    color: '#C8A415',
    opened: 2012,
    hectares: 300,
    employees: '~6,400',
    capacity: '~340,000 vehicles/year',
    models: ['Dacia Sandero 3', 'Dacia Jogger', 'Renault Express', 'Mobilize Duo', 'Mobilize Bento'],
    note: 'Renault\'s largest production site worldwide. 90% of output exported. Rail-connected to Tanger Med port.',
  },
  {
    id: 'somaca',
    name: 'SOMACA Casablanca',
    operator: 'Renault Group',
    city: 'Casablanca',
    coords: [-7.589, 33.573],
    color: '#C8A415',
    opened: 1959,
    hectares: 20,
    employees: '~3,000',
    capacity: '~160,000 vehicles/year',
    models: ['Dacia Sandero 3 (EU spec)', 'Dacia Logan'],
    note: 'Morocco\'s original auto plant. State-founded 1959 with Fiat/SIMCA. Privatised 2003, Renault-owned.',
  },
  {
    id: 'stellantis-kenitra',
    name: 'Stellantis Kenitra',
    operator: 'Stellantis',
    city: 'Kenitra',
    coords: [-6.578, 34.261],
    color: '#2D5F8A',
    opened: 2019,
    hectares: 62,
    employees: '~4,500',
    capacity: '200,000 → 535,000 by 2030',
    models: ['Peugeot 208', 'Citroën Ami', 'Fiat Topolino', 'Opel Rocks-e'],
    note: 'First EV production in Morocco (2023). €1.2B expansion announced July 2025. Africa Technical Centre for R&D.',
  },
]

export interface SupplierZone {
  id: string
  name: string
  coords: [number, number]
  companies: string[]
  jobs: string
}

export const SUPPLIER_ZONES: SupplierZone[] = [
  { id: 'tac', name: 'Tangier Automotive City', coords: [-5.760, 35.735], companies: ['Valeo', 'Aptiv', 'Yazaki', 'Denso', 'Magna'], jobs: '40,000+' },
  { id: 'kenitra-az', name: 'Kenitra Atlantic Free Zone', coords: [-6.560, 34.275], companies: ['Saint-Gobain', 'Leoni', 'Sumitomo', 'Lear'], jobs: '15,000+' },
  { id: 'midparc', name: 'Midparc Casablanca', coords: [-7.600, 33.380], companies: ['Delphi', 'TE Connectivity', 'Nexans'], jobs: '10,000+' },
  { id: 'tangier-fz', name: 'Tangier Free Zone', coords: [-5.785, 35.752], companies: ['Yazaki HQ', 'Aptiv', 'Lear', 'Fujikura'], jobs: '55,000+' },
]

export interface ProductionYear {
  year: number
  vehicles: number
  note?: string
}

export const PRODUCTION_TIMELINE: ProductionYear[] = [
  { year: 2010, vehicles: 45000, note: 'SOMACA only' },
  { year: 2012, vehicles: 167000, note: 'Renault Tangier opens' },
  { year: 2014, vehicles: 228000 },
  { year: 2016, vehicles: 314000 },
  { year: 2018, vehicles: 402000 },
  { year: 2019, vehicles: 395000, note: 'Stellantis Kenitra opens' },
  { year: 2020, vehicles: 308000, note: 'COVID impact' },
  { year: 2021, vehicles: 403000 },
  { year: 2022, vehicles: 465000 },
  { year: 2023, vehicles: 536000, note: 'Africa\'s #1' },
  { year: 2024, vehicles: 700000, note: 'EU\'s top exporter by value' },
  { year: 2025, vehicles: 1000000, note: '1M capacity reached' },
]

export interface ExportMarket {
  country: string
  share: number
}

export const EXPORT_MARKETS: ExportMarket[] = [
  { country: 'Spain', share: 28 },
  { country: 'France', share: 22 },
  { country: 'Germany', share: 12 },
  { country: 'Italy', share: 10 },
  { country: 'Turkey', share: 8 },
  { country: 'Saudi Arabia', share: 5 },
  { country: 'Belgium', share: 4 },
  { country: 'Other', share: 11 },
]

export interface Milestone {
  year: number
  title: string
  detail: string
}

export const MILESTONES: Milestone[] = [
  { year: 1959, title: 'SOMACA founded', detail: 'State-created with Fiat/SIMCA technical support. Morocco\'s first auto plant.' },
  { year: 2003, title: 'SOMACA privatised', detail: 'Renault acquires majority stake. Shift from assembly to integrated manufacturing.' },
  { year: 2005, title: 'Industrial Acceleration Plan', detail: 'Government launches automotive strategy: tax exemptions, free zones, training.' },
  { year: 2012, title: 'Renault Tangier opens', detail: '300-hectare plant. Renault\'s largest facility worldwide. 90% exported.' },
  { year: 2013, title: 'IFMIA training institutes', detail: 'Auto training campuses in Tangier, Kenitra, Casablanca. 98% employment rate.' },
  { year: 2019, title: 'Stellantis Kenitra opens', detail: 'Peugeot, Citroën, Opel, Fiat production. €550M investment.' },
  { year: 2023, title: 'First EV production', detail: 'Stellantis Kenitra — first Moroccan plant producing electric vehicles.' },
  { year: 2024, title: 'EU\'s #1 auto exporter', detail: 'Morocco overtakes China & Japan. $17B exports. 600,872 vehicles via Tanger Med.' },
  { year: 2025, title: '1M capacity reached', detail: 'H1 production +36%. Stellantis announces €1.2B expansion to 535K units.' },
]

export interface EvInvestment {
  company: string
  origin: string
  amount: string
  focus: string
}

export const EV_INVESTMENTS: EvInvestment[] = [
  { company: 'Gotion High-Tech', origin: 'China', amount: '$6.4B', focus: 'Lithium battery & cathode facility' },
  { company: 'Stellantis', origin: 'Europe', amount: '€1.2B', focus: 'Kenitra EV/hybrid expansion to 535K units' },
  { company: 'Renault', origin: 'France', amount: '—', focus: 'R&D centre + employment agreement' },
  { company: 'NamX', origin: 'Morocco', amount: '—', focus: 'Hydrogen-powered SUV prototype' },
  { company: 'Sentury Tyres', origin: 'China', amount: '—', focus: 'Tyre manufacturing' },
]

export const HERO_STATS = [
  { value: '$17B', label: 'Exports (2024)' },
  { value: '1M+', label: 'Vehicle capacity' },
  { value: '270+', label: 'Suppliers' },
  { value: '#1', label: 'In Africa' },
]

export const KEY_FIGURES = [
  { value: '~$17B', label: 'Automotive exports (2024)', note: 'Ministry of Industry' },
  { value: '1M+', label: 'Vehicle capacity (2025)', note: 'AMDIE' },
  { value: '270+', label: 'Automotive suppliers', note: 'Up from 35 in 2000' },
  { value: '~120,000', label: 'Direct industry jobs', note: 'Ministry of Industry' },
  { value: '33%', label: 'Share of total exports', note: 'World Bank' },
  { value: '14 km', label: 'Distance to Spain', note: 'Strait of Gibraltar' },
  { value: '65.5%', label: 'Local integration rate', note: 'Renault Group, 2024' },
  { value: '600,872', label: 'Vehicles via Tanger Med', note: '2024, Port Authority' },
]
