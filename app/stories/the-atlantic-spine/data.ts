// ─────────────────────────────────────────────────
// The Atlantic Spine
// Module 138 — Energy & Geopolitical Intelligence
// Sources: NNPCL, ONHYM, Maroc.ma, Global Energy
// Monitor, ECOWAS, OPEC Fund, IntelliNews, Energy
// Circle, Pipeline Technology Journal, Al Majalla,
// Geopolitical Monitor, The Africa Report, Enerdata,
// Ecofin Agency, APA News, Arab Weekly, Wikipedia
// ─────────────────────────────────────────────────

// ═══ PIPELINE ROUTE ═══
// Coordinates for the Atlantic coastal route (Lagos → Tangier)
// These trace the offshore/coastal path through 13 countries

export interface RouteCountry {
  id: string
  name: string
  nameFr: string
  capital: string
  coords: [number, number]  // lng, lat
  population: string
  gasAccess: string  // % of population with gas/electricity access
  role: string
  language: 'Anglophone' | 'Francophone' | 'Lusophone' | 'Bilingual'
  note: string
}

export const ROUTE_COUNTRIES: RouteCountry[] = [
  {
    id: 'nigeria', name: 'Nigeria', nameFr: 'Nigéria', capital: 'Abuja',
    coords: [3.3792, 6.5244],  // Lagos — pipeline origin
    population: '230M', gasAccess: '55% electricity access',
    role: 'Source — Niger Delta gas reserves (206.53 tcf proven)',
    language: 'Anglophone',
    note: 'Africa\'s largest proven gas reserves. Most currently flared or reinjected. NNPCL holds 50% equity. Origin connects to existing Escravos–Lagos pipeline system.',
  },
  {
    id: 'benin', name: 'Benin', nameFr: 'Bénin', capital: 'Porto-Novo',
    coords: [2.3158, 6.3703],  // Cotonou
    population: '13.7M', gasAccess: '42% electricity access',
    role: 'Transit — coastal passage, gas delivery lateral',
    language: 'Francophone',
    note: 'Already connected to Nigerian gas via the existing WAGP (operational since 2011). NMGP extends this westward.',
  },
  {
    id: 'togo', name: 'Togo', nameFr: 'Togo', capital: 'Lomé',
    coords: [1.2146, 6.1375],  // Lomé
    population: '9M', gasAccess: '54% electricity access',
    role: 'Transit — SOTOGAZ signed MoU with NNPCL and ONHYM (July 2025)',
    language: 'Francophone',
    note: 'SOTOGAZ (state gas company) formally joined as public partner in 2025. Existing WAGP delivery point at Lomé.',
  },
  {
    id: 'ghana', name: 'Ghana', nameFr: 'Ghana', capital: 'Accra',
    coords: [-0.1870, 5.6037],  // Accra
    population: '34M', gasAccess: '85% electricity access',
    role: 'Transit + major consumer — end point of existing WAGP at Takoradi',
    language: 'Anglophone',
    note: 'Current WAGP terminus. Has own offshore gas from Jubilee field. NMGP extends the network westward from Takoradi.',
  },
  {
    id: 'cote-divoire', name: 'Côte d\'Ivoire', nameFr: 'Côte d\'Ivoire', capital: 'Yamoussoukro',
    coords: [-4.0083, 5.3600],  // Abidjan
    population: '28.9M', gasAccess: '70% electricity access',
    role: 'Transit + industrial consumer — aluminium processing potential',
    language: 'Francophone',
    note: 'CFA franc zone. Signed NMGP agreement. Pipeline could enable gas-powered aluminium smelting — Guinea holds world\'s largest bauxite reserves nearby.',
  },
  {
    id: 'liberia', name: 'Liberia', nameFr: 'Libéria', capital: 'Monrovia',
    coords: [-10.7957, 6.3156],  // Monrovia
    population: '5.4M', gasAccess: '28% electricity access',
    role: 'Transit — one of the lowest electrification rates on the route',
    language: 'Anglophone',
    note: 'Post-conflict reconstruction. Only 28% electricity access. Gas-to-power transformative potential.',
  },
  {
    id: 'sierra-leone', name: 'Sierra Leone', nameFr: 'Sierra Leone', capital: 'Freetown',
    coords: [-13.2317, 8.4657],  // Freetown
    population: '8.8M', gasAccess: '26% electricity access',
    role: 'Transit — extremely low energy access',
    language: 'Anglophone',
    note: 'Among the world\'s lowest electrification rates. Pipeline gas for power generation could be transformative.',
  },
  {
    id: 'guinea', name: 'Guinea', nameFr: 'Guinée', capital: 'Conakry',
    coords: [-13.5784, 9.6412],  // Conakry
    population: '14.2M', gasAccess: '44% electricity access',
    role: 'Transit — bauxite powerhouse, gas needed for processing',
    language: 'Francophone',
    note: 'World\'s largest bauxite reserves. Currently exports raw ore. Gas supply could enable domestic aluminium processing — massive value-add.',
  },
  {
    id: 'guinea-bissau', name: 'Guinea-Bissau', nameFr: 'Guinée-Bissau', capital: 'Bissau',
    coords: [-15.5980, 11.8037],  // Bissau
    population: '2.1M', gasAccess: '33% electricity access',
    role: 'Transit — smallest economy on the route',
    language: 'Lusophone',
    note: 'Portuguese-speaking. One of the world\'s poorest countries. Pipeline transit revenue could exceed current government revenue from cashew exports.',
  },
  {
    id: 'gambia', name: 'The Gambia', nameFr: 'Gambie', capital: 'Banjul',
    coords: [-16.5780, 13.4549],  // Banjul
    population: '2.7M', gasAccess: '62% electricity access',
    role: 'Transit — small but strategically located',
    language: 'Anglophone',
    note: 'Narrow country bisecting Senegal. Signed NMGP agreements. Anglophone enclave in francophone West Africa.',
  },
  {
    id: 'senegal', name: 'Senegal', nameFr: 'Sénégal', capital: 'Dakar',
    coords: [-17.4467, 14.6937],  // Dakar
    population: '18M', gasAccess: '73% electricity access',
    role: 'Phase 1 country — emerging gas producer (GTA field)',
    language: 'Francophone',
    note: 'Greater Tortue Ahmeyim (GTA) field with Mauritania reached first gas in late 2024. Emerging LNG exporter. Phase 1 of NMGP connects Morocco–Mauritania–Senegal.',
  },
  {
    id: 'mauritania', name: 'Mauritania', nameFr: 'Mauritanie', capital: 'Nouakchott',
    coords: [-15.9582, 18.0735],  // Nouakchott
    population: '4.9M', gasAccess: '47% electricity access',
    role: 'Phase 1 country — GTA + BirAllah fields, northern hinge',
    language: 'Francophone',
    note: 'BirAllah field: 50+ tcf reserves — among Africa\'s largest undeveloped gas. Sits at the hinge between West Africa and the Maghreb. Pipeline participation converts marginal geography into diplomatic weight.',
  },
  {
    id: 'morocco', name: 'Morocco', nameFr: 'Maroc', capital: 'Rabat',
    coords: [-5.8128, 35.7595],  // Tangier — pipeline terminus
    population: '37.8M', gasAccess: '100% electricity access',
    role: 'Terminus + European gateway — connects to Maghreb–Europe Pipeline',
    language: 'Bilingual',
    note: 'Pipeline terminus at Tangier. Connects to existing Maghreb–Europe Pipeline (GME) and European gas network. Moroccan segment: 1,672 km from Nador to Dakhla. ONHYM co-leads the project. $6B Phase 1 investment for Morocco segment.',
  },
]

// Landlocked countries supplied via internal connections
export const LANDLOCKED_COUNTRIES = [
  { name: 'Niger', nameFr: 'Niger', population: '27M', note: 'Connected via internal branch from Nigerian mainline' },
  { name: 'Burkina Faso', nameFr: 'Burkina Faso', population: '23M', note: 'Connected via internal branch through Côte d\'Ivoire or Ghana' },
  { name: 'Mali', nameFr: 'Mali', population: '23M', note: 'Connected via internal branch through Senegal or Guinea' },
]

// ═══ GeoJSON route line ═══
export const PIPELINE_ROUTE_COORDS: [number, number][] = [
  [3.38, 6.52],    // Lagos, Nigeria
  [2.63, 6.37],    // offshore Cotonou, Benin
  [1.21, 6.14],    // Lomé, Togo
  [-0.19, 5.55],   // Tema/Accra, Ghana
  [-1.76, 4.93],   // Takoradi, Ghana (current WAGP end)
  [-4.01, 5.30],   // Abidjan, Côte d'Ivoire
  [-7.54, 4.38],   // offshore Liberia
  [-10.80, 6.30],  // Monrovia, Liberia
  [-13.23, 8.47],  // Freetown, Sierra Leone
  [-13.58, 9.64],  // Conakry, Guinea
  [-15.60, 11.80], // Bissau, Guinea-Bissau
  [-16.58, 13.45], // Banjul, The Gambia
  [-17.45, 14.69], // Dakar, Senegal
  [-16.02, 18.07], // Nouakchott, Mauritania
  [-15.94, 23.71], // Dakhla, Morocco (Western Sahara)
  [-9.77, 30.43],  // Agadir, Morocco
  [-7.61, 33.59],  // Casablanca, Morocco
  [-5.81, 35.76],  // Tangier, Morocco — terminus
]

// ═══ RIVAL PIPELINE — Trans-Saharan (TSGP) ═══
export const TSGP_ROUTE_COORDS: [number, number][] = [
  [3.38, 6.52],    // Lagos, Nigeria
  [5.62, 6.34],    // Warri, Nigeria (Niger Delta)
  [7.49, 9.06],    // Abuja, Nigeria
  [7.99, 13.51],   // Niamey, Niger
  [7.36, 19.83],   // Agadez, Niger
  [5.73, 24.50],   // midpoint Sahara
  [3.36, 32.38],   // Hassi R'Mel, Algeria (gas hub)
  [3.06, 36.75],   // Algiers / Mediterranean coast
]

export interface PipelineComparison {
  metric: string
  nmgp: string
  tsgp: string
}

export const PIPELINE_COMPARISON: PipelineComparison[] = [
  { metric: 'Length', nmgp: '5,660 km (offshore + coastal)', tsgp: '4,128 km (overland)' },
  { metric: 'Estimated cost', nmgp: '$25 billion', tsgp: '$13 billion' },
  { metric: 'Capacity', nmgp: '30 bcm/year', tsgp: '30 bcm/year' },
  { metric: 'Countries crossed', nmgp: '13 (coastal West Africa)', tsgp: '3 (Nigeria, Niger, Algeria)' },
  { metric: 'Route type', nmgp: 'Offshore/coastal — Atlantic', tsgp: 'Overland — Sahara/Sahel' },
  { metric: 'European connection', nmgp: 'Maghreb–Europe Pipeline (Morocco → Spain)', tsgp: 'Transmed (Algeria → Italy) + Medgaz (Algeria → Spain)' },
  { metric: 'Security risk', nmgp: 'Lower — avoids Sahel conflict zone', tsgp: 'Higher — crosses AES military junta territory' },
  { metric: 'Lead partners', nmgp: 'NNPCL + ONHYM (Morocco)', tsgp: 'NNPC + Sonatrach (Algeria)' },
  { metric: 'Existing infrastructure', nmgp: 'Extends WAGP (678 km, operational since 2011)', tsgp: 'Algerian domestic network 70%+ built' },
  { metric: 'European backers', nmgp: 'EIB, IsDB, OPEC Fund, UAE', tsgp: 'Italy (Eni/Sasol via Hybla project)' },
  { metric: 'US interest', nmgp: 'Trump admin expressed interest (April 2025)', tsgp: 'Aligned with Russian-leaning security corridor' },
  { metric: 'Construction status', nmgp: 'Phase 1 launched (Morocco segment, late 2025)', tsgp: 'Sonatrach to start Niger section post-Ramadan 2026' },
  { metric: 'Beneficiary population', nmgp: '~400 million across 16 countries', tsgp: '~300 million (mainly European end-users)' },
  { metric: 'Geopolitical alignment', nmgp: 'Pro-Western: US ally, Abraham Accords signatory', tsgp: 'AES/Wagner/Russian security architecture' },
]

// ═══ TIMELINE ═══
export interface TimelineEvent {
  year: string
  event: string
  significance: 'milestone' | 'agreement' | 'setback' | 'rivalry' | 'current'
}

export const TIMELINE: TimelineEvent[] = [
  { year: '1982', event: 'ECOWAS proposes West African gas pipeline network', significance: 'milestone' },
  { year: '2002', event: 'Algeria and Nigeria sign MoU for Trans-Saharan Gas Pipeline (TSGP)', significance: 'rivalry' },
  { year: '2009', event: 'TSGP intergovernmental agreement signed (Nigeria–Niger–Algeria)', significance: 'rivalry' },
  { year: '2011', event: 'West African Gas Pipeline (WAGP) becomes operational: Lagos → Ghana, 678 km', significance: 'milestone' },
  { year: 'Dec 2016', event: 'NNPC and ONHYM sign agreement for Nigeria-Morocco Gas Pipeline (NMGP)', significance: 'milestone' },
  { year: 'May 2017', event: 'Nigeria and Morocco sign gas pipeline and fertiliser deals', significance: 'agreement' },
  { year: 'Aug 2017', event: 'Feasibility study launched. Morocco argues Atlantic route avoids Sahel militancy', significance: 'agreement' },
  { year: 'Jan 2019', event: 'Feasibility study completed. Penspen contracted for FEED Phase I', significance: 'milestone' },
  { year: 'Aug 2019', event: 'NMGP presented to ECOWAS — positive reception', significance: 'agreement' },
  { year: 'Mar 2020', event: 'FEED Phase II begins', significance: 'agreement' },
  { year: 'Oct 2021', event: 'Algeria closes Maghreb–Europe Pipeline through Morocco — cuts gas supply to Rabat', significance: 'setback' },
  { year: 'May 2022', event: 'OPEC Fund contributes $14.3M for FEED Phase II. WorleyParsons/Intecsea contracted. ILF + DORIS for project management', significance: 'milestone' },
  { year: 'Sep 2022', event: 'MoU signed by NNPC, ONHYM, and ECOWAS energy director', significance: 'agreement' },
  { year: 'Jun 2023', event: 'Nigeria, Morocco, and transit countries sign multiple agreements', significance: 'agreement' },
  { year: 'Jul 2023', event: 'Niger military coup — threatens both pipeline projects', significance: 'setback' },
  { year: 'Dec 2024', event: 'ECOWAS 66th summit: intergovernmental agreement approved. Countries assigned roles', significance: 'milestone' },
  { year: 'Late 2024', event: 'Greater Tortue Ahmeyim (Mauritania/Senegal) reaches first gas', significance: 'milestone' },
  { year: 'Apr 2025', event: 'Trump administration expresses interest in investing in NMGP', significance: 'agreement' },
  { year: 'May 2025', event: 'Minister Benali confirms route finalised. Special-purpose company being established', significance: 'milestone' },
  { year: 'Jul 2025', event: 'Togo formally joins as public partner (SOTOGAZ). Morocco segment launch announced: $6B, Nador → Dakhla', significance: 'milestone' },
  { year: 'Sep 2025', event: 'Project company created. UAE, EIB, IsDB, OPEC Fund join financing pool. Final investment decision targeted end 2025', significance: 'milestone' },
  { year: 'Feb 2026', event: 'Algeria–Niger diplomatic thaw. Sonatrach to build Niger section of rival TSGP post-Ramadan. Pipeline race accelerates', significance: 'current' },
]

// ═══ KEY NUMBERS ═══
export const KEY_NUMBERS = [
  { value: '5,660 km', label: 'Total pipeline length', detail: 'Lagos to Tangier along the Atlantic coast' },
  { value: '$25B', label: 'Estimated cost', detail: 'Phased construction over 25 years' },
  { value: '30 bcm/yr', label: 'Annual capacity', detail: '30 billion cubic metres of natural gas' },
  { value: '13', label: 'Countries connected', detail: 'Plus 3 landlocked via internal branches' },
  { value: '~400M', label: 'People served', detail: 'Across 16 West and North African countries' },
  { value: '206.53 tcf', label: 'Nigeria\'s proven gas reserves', detail: 'Africa\'s largest — mostly untapped' },
]

// ═══ GEOPOLITICAL CONTEXT ═══
export const GEOPOLITICS = {
  westernSahara: 'The Moroccan segment runs from Nador (northeast) through Dakhla (southwest) — through territory internationally disputed as Western Sahara but administered by Morocco. US, Spain, and France have all recognised Moroccan sovereignty since 2020–2024.',
  algeriaRivalry: 'Algeria closed the Maghreb–Europe Pipeline through Morocco in October 2021, cutting gas supply. The NMGP would permanently bypass Algeria as a transit country for gas reaching Europe from sub-Saharan Africa.',
  ecowasIntegration: 'The pipeline is formally an ECOWAS project — part of Morocco\'s broader Atlantic Initiative. Despite Morocco not being an ECOWAS member, the pipeline embeds it as the economic terminus of the West African bloc.',
  trumpInterest: 'In April 2025, Nigeria\'s Finance Minister reported the Trump administration had expressed interest in investing — aligning with US strategy to diversify European gas supply away from Russian-aligned corridors.',
  aesRisk: 'The Alliance of Sahel States (AES) — military juntas in Mali, Niger, Burkina Faso — have expelled Western military presence in favour of Russian security contractors (Wagner/Africa Corps). The rival TSGP must cross AES territory.',
  zeroSumGame: 'Analysts widely agree there is only enough Nigerian gas and European demand to justify one major trans-continental pipeline. The NMGP and TSGP are competing for the same resource and the same market.',
}

// ═══ SOURCES ═══
export const SOURCES = [
  { name: 'NNPCL / ONHYM', detail: 'Joint project owners — Nigerian National Petroleum Company Limited and Morocco\'s Office National des Hydrocarbures et des Mines' },
  { name: 'Maroc.ma', detail: 'Official Moroccan government portal — Minister Benali statements, May 2025' },
  { name: 'Global Energy Monitor', detail: 'Nigeria-Morocco Gas Pipeline project profile' },
  { name: 'ECOWAS', detail: '66th Summit intergovernmental agreement, December 2024' },
  { name: 'OPEC Fund', detail: 'FEED Phase II financing ($14.3M), 2022' },
  { name: 'IntelliNews', detail: 'Project advances toward construction phase, August 2025' },
  { name: 'Pipeline Technology Journal', detail: 'Tenders set to launch in 2025' },
  { name: 'Energy Capital & Power', detail: 'Morocco segment details — 1,672 km, Phase 1' },
  { name: 'Geopolitical Monitor', detail: 'Mauritania\'s role analysis, November 2025' },
  { name: 'Al Majalla', detail: 'TSGP challenges and stakes analysis' },
  { name: 'The Africa Report', detail: 'Algeria rivalry, Trans-Saharan pipeline competition' },
  { name: 'Enerdata', detail: 'Niger–Algeria diplomatic thaw, February 2026' },
  { name: 'Ecofin Agency', detail: 'Algeria–Morocco pipeline duel editorial' },
  { name: 'APA News', detail: 'Project company creation, UAE financing, September 2025' },
  { name: 'The Arab Weekly', detail: 'Morocco breaks ground, Nador–Dakhla segment' },
  { name: 'Universidad de Navarra', detail: 'TSGP vs NMGP comparative analysis' },
  { name: 'Wikipedia', detail: 'West African Gas Pipeline, Trans-Saharan Gas Pipeline, WAGP' },
]
