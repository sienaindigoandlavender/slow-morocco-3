// ─────────────────────────────────────────────────
// Before the Sahara — Desertification & the Green Frontier
// Module 049 — Environmental Intelligence
// Sources: IPCC SRCCL, UNCCD, MDPI Land (2025),
// NASA Earth Observatory, Geographical, Nature
// Scientific Reports, FAO, Morocco PANLCD
// ─────────────────────────────────────────────────

export interface ClimateZone {
  id: string
  name: string
  rainfall: string
  area: string
  vegetation: string
  threat: string
  coords: [number, number]
  color: string
}

export const CLIMATE_ZONES: ClimateZone[] = [
  { id: 'humid', name: 'Humid (Rif & Northwest)', rainfall: '>600 mm/year, peaks >1,000 mm', area: '~5% of territory', vegetation: 'Cedar, cork oak, evergreen forests', threat: 'Deforestation, overgrazing of forest margins', coords: [-5.0, 35.0], color: '#5C7C3E' },
  { id: 'subhumid', name: 'Sub-humid (Atlantic plains)', rainfall: '400–600 mm/year', area: '~10% of territory', vegetation: 'Croplands, argan forests, maquis', threat: 'Soil erosion, urbanization, intensive farming', coords: [-7.5, 33.5], color: '#84CC16' },
  { id: 'semiarid', name: 'Semi-arid (Interior plains)', rainfall: '200–400 mm/year', area: '~25% of territory', vegetation: 'Steppe, alfa grass, degraded rangelands', threat: 'Overgrazing, soil salinization, drought intensification', coords: [-5.5, 32.0], color: '#F59E0B' },
  { id: 'arid', name: 'Arid (Pre-Sahara)', rainfall: '100–200 mm/year', area: '~25% of territory', vegetation: 'Sparse shrubs, oasis palms, acacias', threat: 'Sand encroachment, oasis collapse, groundwater depletion', coords: [-5.0, 30.5], color: '#A0452E' },
  { id: 'hyperarid', name: 'Hyper-arid (Sahara)', rainfall: '<100 mm/year', area: '~35% of territory', vegetation: 'Bare sand, reg (gravel desert), isolated oases', threat: 'Expansion northward, extreme heat intensification', coords: [-6.0, 28.5], color: '#991B1B' },
]

export interface NDVIDataPoint {
  year: number
  ndvi: number // normalized 0-1 scale, approximate mean for pre-Saharan belt
  rainfall: number // mm annual approximate
  note?: string
}

export const NDVI_TIMELINE: NDVIDataPoint[] = [
  { year: 1984, ndvi: 0.18, rainfall: 150, note: 'Drought era baseline' },
  { year: 1988, ndvi: 0.15, rainfall: 120 },
  { year: 1992, ndvi: 0.19, rainfall: 180 },
  { year: 1996, ndvi: 0.20, rainfall: 190 },
  { year: 2000, ndvi: 0.17, rainfall: 140, note: 'Severe drought year' },
  { year: 2004, ndvi: 0.21, rainfall: 200 },
  { year: 2008, ndvi: 0.19, rainfall: 170 },
  { year: 2010, ndvi: 0.24, rainfall: 240, note: 'Good rainfall year — NDVI spike' },
  { year: 2012, ndvi: 0.20, rainfall: 180 },
  { year: 2015, ndvi: 0.23, rainfall: 220, note: 'Cropland expansion correlates with rainfall' },
  { year: 2018, ndvi: 0.16, rainfall: 130, note: 'Drought begins — 7-year dry spell' },
  { year: 2020, ndvi: 0.14, rainfall: 110, note: 'COVID year + severe drought' },
  { year: 2022, ndvi: 0.13, rainfall: 100, note: 'Worst year — pre-Saharan NDVI collapse' },
  { year: 2024, ndvi: 0.15, rainfall: 140, note: 'Sept 2024: Sahara greening event (NASA)' },
  { year: 2025, ndvi: 0.22, rainfall: 280, note: 'Winter 2025–26 rains — dramatic recovery' },
]

export interface OasisData {
  name: string
  nameAr: string
  coords: [number, number]
  palmCount: string
  status: string
  threat: string
  color: string
}

export const OASES: OasisData[] = [
  { name: 'Draa Valley', nameAr: 'وادي درعة', coords: [-6.0, 30.1], palmCount: 'Was 4,575 km² → now ~1,342 km²', status: 'Critical', threat: 'Dam upstream, groundwater depletion, 8m water table drop (2012–2021)', color: '#A0452E' },
  { name: 'Tafilalet (Errachidia)', nameAr: 'تافيلالت', coords: [-4.4, 31.9], palmCount: 'Largest oasis in Morocco', status: 'Threatened', threat: 'Fires destroyed thousands of palms (2,485 between 2008–2010, 5,500 in 2021)', color: '#F59E0B' },
  { name: 'Skoura', nameAr: 'سكورة', coords: [-6.6, 31.1], palmCount: 'UNESCO Biosphere Reserve', status: 'Degrading', threat: 'Desertified lands expanded +168% (1991–2021). Cultivated land shrank −30%.', color: '#A0452E' },
  { name: 'Zagora / Ternata', nameAr: 'زاكورة', coords: [-5.8, 30.3], palmCount: 'Ternata oasis ~26,000 ha', status: 'Critical', threat: 'Draa River flows less and less frequently. Illegal well drilling.', color: '#A0452E' },
  { name: 'Tinghir / Todra', nameAr: 'تنغير', coords: [-5.5, 31.5], palmCount: 'Todra Gorge oasis system', status: 'Moderate', threat: 'Tourism water demand. Upstream irrigation pressure.', color: '#F59E0B' },
  { name: 'Figuig', nameAr: 'فكيك', coords: [-1.2, 32.1], palmCount: 'Eastern border oasis', status: 'Threatened', threat: 'Algeria border tensions. Water table declining. Isolation.', color: '#F59E0B' },
]

export interface GreenProject {
  name: string
  scope: string
  status: string
  detail: string
  color: string
}

export const GREEN_PROJECTS: GreenProject[] = [
  { name: 'National Action Plan (PANLCD)', scope: 'National', status: 'Ongoing since 2001', detail: 'Morocco\'s UNCCD framework. Coordinates reforestation, soil conservation, sustainable agriculture, and desertification monitoring across all zones.', color: '#5C7C3E' },
  { name: 'Oasis Zone Strategy (ANDZOA)', scope: 'Oasis provinces (~208,000 km²)', status: 'Active', detail: 'Dedicated agency for oasis and argan zones. Drip irrigation subsidies (11,770 ha equipped). Water savings of ~38M m³/year. Palm replanting programs.', color: '#5C7C3E' },
  { name: 'National Reforestation Plan', scope: '40,000 ha/year target', status: 'Ongoing', detail: 'Managed by ANEF (Agence Nationale des Eaux et Forêts). Focus on watershed protection, dune fixation, and restoring degraded rangelands.', color: '#84CC16' },
  { name: 'Great Green Wall (GGW)', scope: 'Continental (11 countries)', status: '~30% complete as of 2024', detail: 'Africa\'s flagship anti-desertification initiative. 100M ha restoration target by 2030. Morocco participates in northern fringe. $14.3B pledged (2021). 30M ha restored continent-wide.', color: '#5C7C3E' },
  { name: 'Dune Fixation Programs', scope: 'Southern Morocco', status: 'Active', detail: 'Planting tamarisk, acacia, and native vegetation to stabilize moving sand dunes. Protecting oases from sand encroachment. Community-managed.', color: '#F59E0B' },
  { name: 'Iriqui Lake Restoration', scope: 'Iriqui National Park', status: 'Planned', detail: 'ANEF plan to divert water to restore the dry Iriqui lakebed. Reintroduce addax antelope and red-necked ostrich. Anti-desertification + ecotourism.', color: '#2D5F8A' },
]

export const HERO_STATS = [
  { value: '93%', label: 'Of territory affected by desertification' },
  { value: '$2.1B', label: 'Annual economic cost of land degradation' },
  { value: '⅔', label: 'Of oasis area lost in the past century' },
  { value: '15M→6M', label: 'Date palms remaining' },
]

export const KEY_NUMBERS = [
  { value: '71M ha', label: 'Total land area', note: '8% forest, 13% farmland, 65% pasture + desert' },
  { value: '93%', label: 'Territory affected', note: 'Desertification at varying severity (PANLCD)' },
  { value: '5.5M ha', label: 'Under water erosion', note: 'Sloping areas losing topsoil' },
  { value: '1.5M', label: 'Households at risk', note: 'Livelihoods depend on degrading land' },
  { value: '35%', label: 'Rural population in severe degradation zones', note: 'Heavily dependent on forest/range resources' },
  { value: '2.2M', label: 'Oasis population', note: '~6% of national total. Agriculture-dependent.' },
  { value: '40,000 ha', label: 'Annual reforestation target', note: 'ANEF national program' },
  { value: '<100 mm', label: 'Saharan rainfall', note: 'Southern 35% of territory' },
]

export const DESERTIFICATION_DRIVERS = [
  { driver: 'Drought', detail: '7-year drought (2018–2025). Pre-Saharan rainfall dropped below 100 mm/year. 80% of farmland is rain-fed.' },
  { driver: 'Overgrazing', detail: '46 million hectares of rangelands under pressure. Livestock numbers exceed carrying capacity across the pre-Sahara and eastern plateaus.' },
  { driver: 'Groundwater depletion', detail: 'Illegal wells proliferating. Motorized pumps lowering water tables 8m+ in some oases. Draa River nearly stopped flowing.' },
  { driver: 'Deforestation', detail: 'Firewood collection, land clearing for agriculture. 5.8M ha of forests remaining — down from historical extent.' },
  { driver: 'Dam impacts', detail: 'Upstream dams retain water that once sustained downstream oases. Ternata oasis directly correlated with reservoir levels.' },
  { driver: 'Climate change', detail: 'Temperatures rising 1.5× faster than global average in North Africa. Longer dry spells. Intense but rare rainfall events cause flash floods, not recharge.' },
]
