// ─────────────────────────────────────────────────
// Morocco's Solar Atlas
// Module 063 — Energy Intelligence
// Sources: Wikipedia, MASEN, Morocco World News,
// MDPI, CIF, SolarPower Europe, ResearchGate
// ─────────────────────────────────────────────────

export interface NoorPhase {
  name: string
  capacity: string
  technology: string
  area: string
  storage: string
  commissioned: string
  detail: string
  color: string
}

export const NOOR_PHASES: NoorPhase[] = [
  {
    name: 'Noor I', capacity: '160 MW', technology: 'CSP — Parabolic Trough',
    area: '450 hectares', storage: '3 hours (molten salt)',
    commissioned: 'February 2016',
    detail: 'The first phase. 12-metre-tall parabolic mirrors track the sun, concentrating heat onto a tube of synthetic oil, which generates steam to drive turbines. Wet cooling system. Connected to the grid 5 February 2016. Offsets 240,000 tonnes CO₂/year.',
    color: '#F59E0B',
  },
  {
    name: 'Noor II', capacity: '200 MW', technology: 'CSP — Parabolic Trough',
    area: '680 hectares', storage: '7 hours (molten salt)',
    commissioned: 'January 2018',
    detail: 'Larger troughs, longer storage. Switched to dry cooling to reduce water consumption in the arid Draa-Tafilalet region. Seven hours of storage means electricity after sunset. Supplies power to approximately one million people.',
    color: '#A0452E',
  },
  {
    name: 'Noor III', capacity: '150 MW', technology: 'CSP — Solar Tower',
    area: '750 hectares', storage: '7 hours (molten salt)',
    commissioned: 'December 2018',
    detail: 'A 243-metre tower surrounded by 7,400 heliostats. Sunlight is concentrated onto a receiver at the top, heating molten salt to 565°C. The tower is visible from 20 km away. Suffered a molten salt leak in February 2024 ($47M loss), repaired and restarted by late 2024.',
    color: '#7B506F',
  },
  {
    name: 'Noor IV', capacity: '72 MW', technology: 'Photovoltaic (PV)',
    area: '137 hectares', storage: 'None',
    commissioned: '2018',
    detail: 'Polycrystalline PV modules with sun-tracking systems. The cost comparison: Noor IV\'s PV cost $78M versus the billions for CSP. This is the technology that has since won the global cost race, but without CSP\'s ability to store heat and generate at night.',
    color: '#2D5F8A',
  },
]

export interface SolarProject {
  name: string
  location: string
  capacity: string
  technology: string
  status: string
  detail: string
  lat: number
  lng: number
}

export const SOLAR_PROJECTS: SolarProject[] = [
  {
    name: 'Noor Ouarzazate', location: 'Ouarzazate', capacity: '580 MW',
    technology: 'CSP + PV', status: 'Operational',
    detail: 'World\'s largest CSP complex. 3,000+ hectares. Supplies 1.1 million people, ~5–6% of Morocco\'s electricity. $2.5B+ investment. ACWA Power consortium. 690,000 tonnes CO₂ offset/year.',
    lat: 31.0297, lng: -6.8633,
  },
  {
    name: 'Noor Midelt I', location: 'Midelt', capacity: '800 MW',
    technology: 'Hybrid CSP + PV', status: 'Under construction',
    detail: 'First-of-its-kind hybrid: 300 MW CSP with 500 MW PV. Five hours post-sunset generation. $0.068/kWh — among the lowest CSP tariffs globally. EPC by consortium led by EDF Renewables and Masdar.',
    lat: 32.6833, lng: -4.7333,
  },
  {
    name: 'Noor Midelt II', location: 'Midelt', capacity: '800 MW',
    technology: 'Hybrid CSP + PV', status: 'Planned',
    detail: 'Second phase of the Midelt complex. Will bring total Midelt capacity to 1,600 MW — nearly three times Ouarzazate.',
    lat: 32.70, lng: -4.75,
  },
  {
    name: 'Noor Tata', location: 'Tata', capacity: '800 MW',
    technology: 'PV', status: 'Planned',
    detail: 'Large-scale PV in Morocco\'s deep south. Part of MASEN\'s strategy to distribute generation across the country\'s highest-irradiance zones.',
    lat: 29.75, lng: -7.97,
  },
  {
    name: 'Noor PV II', location: 'Multi-site', capacity: '400 MW',
    technology: 'PV', status: 'Tendering',
    detail: 'Distributed across six sites: Sidi Bennour (48 MW), Kelaa Sraghna (48 MW), Taroudant (36 MW), Bejaad (48 MW), El Hajeb (36 MW), Ain Beni Mathar (184 MW). Decentralised model.',
    lat: 32.3, lng: -6.5,
  },
  {
    name: 'Ain Beni Mathar ISCC', location: 'Ain Beni Mathar', capacity: '470 MW (20 MW solar)',
    technology: 'Integrated Solar Combined Cycle', status: 'Operational',
    detail: 'Hybrid natural gas + 20 MW parabolic trough CSP. Morocco\'s first solar thermal plant (2010). Proved the concept before Noor Ouarzazate.',
    lat: 34.0167, lng: -2.0167,
  },
]

export interface IrradianceZone {
  region: string
  ghi: string
  dni: string
  sunshineHours: string
  note: string
}

export const IRRADIANCE_ZONES: IrradianceZone[] = [
  { region: 'Southern Sahara (Ouarzazate, Zagora, Errachidia)', ghi: '2,100–2,264 kWh/m²/yr', dni: '2,200–2,500+ kWh/m²/yr', sunshineHours: '3,000–3,400 h/yr', note: 'Morocco\'s solar heartland. Site of Noor Ouarzazate. Among the world\'s top 5 DNI zones.' },
  { region: 'Anti-Atlas & Deep South (Tata, Guelmim, Tan-Tan)', ghi: '2,000–2,200 kWh/m²/yr', dni: '2,100–2,400 kWh/m²/yr', sunshineHours: '3,000–3,200 h/yr', note: 'Site of proposed Xlinks generation. Excellent wind + solar co-location. Noor Tata planned here.' },
  { region: 'Middle Atlas & Central Plateau (Midelt, Beni Mellal)', ghi: '1,900–2,100 kWh/m²/yr', dni: '2,000–2,300 kWh/m²/yr', sunshineHours: '2,800–3,100 h/yr', note: 'Site of Noor Midelt. High altitude (1,500m+) increases DNI clarity. Cold winters improve PV efficiency.' },
  { region: 'Atlantic Plain (Marrakech, Agadir)', ghi: '1,800–2,000 kWh/m²/yr', dni: '1,800–2,100 kWh/m²/yr', sunshineHours: '2,800–3,000 h/yr', note: 'Major population centers. Irradiation exceeds 5.5 kWh/m²/day. Excellent for distributed rooftop PV.' },
  { region: 'Northern Morocco (Tangier, Fes, Rabat)', ghi: '1,600–1,900 kWh/m²/yr', dni: '1,500–1,800 kWh/m²/yr', sunshineHours: '2,400–2,800 h/yr', note: 'Lowest irradiance in Morocco — still higher than Germany (1,050 kWh/m²/yr), which leads Europe in solar capacity.' },
]

export interface TimelineEvent {
  year: string
  event: string
  type: 'policy' | 'project' | 'milestone'
}

export const TIMELINE: TimelineEvent[] = [
  { year: '2009', event: 'King Mohammed VI launches the Moroccan Solar Plan: 2,000 MW solar by 2020', type: 'policy' },
  { year: '2009', event: 'MASEN (Moroccan Agency for Solar Energy) established', type: 'policy' },
  { year: '2010', event: 'Ain Beni Mathar ISCC commissioned — Morocco\'s first solar thermal plant (20 MW)', type: 'project' },
  { year: '2013', event: 'Noor I construction begins at Ouarzazate', type: 'project' },
  { year: '2015', event: 'Morocco raises target: 52% renewable electricity by 2030 (20% solar, 20% wind, 12% hydro)', type: 'policy' },
  { year: '2016', event: 'Noor I CSP (160 MW) commissioned. Morocco hosts COP22 in Marrakech', type: 'milestone' },
  { year: '2018', event: 'Noor II (200 MW), Noor III (150 MW), and Noor IV (72 MW) commissioned. Complex reaches 580 MW', type: 'milestone' },
  { year: '2019', event: 'Noor Midelt I procurement launched — world\'s first hybrid CSP+PV at scale', type: 'project' },
  { year: '2021', event: 'Xlinks Morocco–UK Power Project announced: 11.5 GW generation, 3.6 GW delivered via 4,000 km subsea HVDC', type: 'project' },
  { year: '2024', event: 'Noor III molten salt leak ($47M loss). Repaired and restarted. 4,680 MW renewable capacity operational nationwide', type: 'milestone' },
  { year: '2025', event: 'UK government rejects Xlinks CfD. Xlinks explores alternative routes. Morocco reaches ~831 MW installed solar', type: 'milestone' },
  { year: '2030', event: 'Target: 52% of installed capacity from renewables. Noor Midelt fully operational. Total solar target: 4,560 MW', type: 'policy' },
]

export const ENERGY_MIX = [
  { source: 'Coal', share: '~38%', trend: 'Declining', note: 'Still largest single source. 68% in 2022.' },
  { source: 'Natural Gas', share: '~18%', trend: 'Stable', note: 'LNG imports increasing. Pipeline from Algeria.' },
  { source: 'Wind', share: '~15%', trend: 'Growing', note: '1,430+ MW installed. Target: 4,200 MW by 2030.' },
  { source: 'Solar', share: '~7%', trend: 'Growing fast', note: '831 MW installed. Target: 4,560 MW by 2030.' },
  { source: 'Hydro', share: '~5%', trend: 'Declining (drought)', note: 'Dam capacity exists but drought reduces output.' },
  { source: 'Oil + Other', share: '~17%', trend: 'Declining', note: 'Diesel backup + imports. Energy dependence ~90%.' },
]

export const HERO_STATS = [
  { value: '580', label: 'MW at Noor Ouarzazate' },
  { value: '52%', label: 'Renewable target by 2030' },
  { value: '2,500+', label: 'kWh/m²/yr DNI (south)' },
  { value: '90%', label: 'Energy import dependence' },
]

export const KEY_NUMBERS = [
  { value: '11,987 MW', label: 'Total installed capacity', note: 'As of 2024. Thermal 6,676 MW.' },
  { value: '4,680 MW', label: 'Renewable capacity operational', note: 'Solar + wind + hydro combined.' },
  { value: '831 MW', label: 'Solar capacity installed', note: '510 MW CSP + 321 MW PV.' },
  { value: '$2.5B+', label: 'Noor Ouarzazate investment', note: 'World Bank, EIB, AfDB, KfW, CTF.' },
  { value: '690,000', label: 'Tonnes CO₂ offset/year', note: 'Noor Ouarzazate complex alone.' },
  { value: '9th', label: 'Global solar radiation ranking', note: 'Per MASEN. Top 5 for DNI.' },
]
