// ─────────────────────────────────────────────────
// Migration Routes Through Morocco
// Module 085 — Human Mobility Intelligence
// ─────────────────────────────────────────────────

export interface Route {
  id: string
  name: string
  description: string
  origin: string
  entry: string
  path: string
  destination: string
  distance: string
  dangers: string
  status: string
}

export const ROUTES: Route[] = [
  {
    id: 'western-med',
    name: 'Western Mediterranean Route',
    description: '13 kilometres separate Morocco from Spain at the Strait\'s narrowest point. Migrants cross by small boats (pateras), rubber dinghies, jet skis, or by swimming. This route also includes overland crossings into the Spanish enclaves of Ceuta and Melilla.',
    origin: 'Sub-Saharan West and Central Africa (Guinea, Côte d\'Ivoire, Mali, Cameroon, Senegal, DRC) via internal African routes through Mauritania, Mali, Niger, or Algeria',
    entry: 'Oujda (from Algeria, eastern border) or through Mauritania and up the Atlantic coast',
    path: 'Oujda → Nador (Melilla fence) or Tetouan/Fnideq (Ceuta fence) or Tangier (Strait of Gibraltar by sea)',
    destination: 'Spain (mainland via Strait, or Ceuta/Melilla enclaves)',
    distance: '~13 km sea crossing at the Strait. The fence at Melilla: three barriers of 6m, 3m, and 6m height over 7.5 miles',
    dangers: 'Drowning in the Strait (2,000–4,000 died between 1991–1996 alone). Violence at fence crossings. Razor wire. Tear gas. Security force beatings. Pushbacks. Hypothermia in winter sea crossings',
    status: 'In 2018, 56,000+ reached Spain via this route — the year\'s most active route. Morocco prevents 45,000+ crossings in 2024. Since the 2022 Melilla massacre, overland crossings have decreased; more attempt sea routes or redirect via Algeria to Tunisia.',
  },
  {
    id: 'atlantic',
    name: 'West African Atlantic Route',
    description: 'The deadliest route. From West African coastal countries or Morocco\'s Atlantic coast, migrants sail toward the Spanish Canary Islands — 100 km off the African coast — or attempt the longer crossing to mainland Spain. In 2024, this became the most active passageage from Africa to Europe.',
    origin: 'Senegal, Gambia, Guinea coast, Mauritania. Also Morocco\'s Atlantic coast (Tan-Tan, Laayoune, Dakhla)',
    entry: 'Coastal departure points in Morocco or direct from Senegal/Mauritania bypassing Morocco',
    path: 'Atlantic coast → Canary Islands (100+ km) or longer crossings toward mainland Europe',
    destination: 'Canary Islands (Spanish territory, EU)',
    distance: '100 km minimum to Canaries. Some crossings from Senegal: 1,500+ km',
    dangers: 'Open ocean. 10,457 dead or missing on this route in 2024 — a record. Overcrowded wooden boats (cayucos/pirogues). Dehydration, exposure, engine failure. Bodies seldom recovered',
    status: '36,000 intercepted in 2024 — the busiest route that year. Increased 18% while other routes decreased. Mali was leading country of origin (~16,500). The shift reflects intensified EU-funded interdiction along the Mediterranean.',
  },
  {
    id: 'overland-east',
    name: 'Eastern Overland Route (via Algeria)',
    description: 'The main entry point for sub-Saharan migrants into Morocco. From West Africa through Mali or Niger, across the Sahara into Algeria, then to the Moroccan border at Oujda. The Algeria-Morocco border has been formally closed since 1994, but smuggling and transit routes persist across its 1,400-km length.',
    origin: 'Guinea, Mali, Niger, Senegal, Côte d\'Ivoire, Cameroon, DRC, and increasingly Sudan',
    entry: 'Oujda (Morocco-Algeria border). Secured with trenches/embankments (Morocco) and electronic fence (Algeria). Since 2022, further militarised',
    path: 'West Africa → Mali/Niger → Algeria (often Tamanrasset) → Oujda → north to Nador/Tangier',
    destination: 'Morocco (transit) → Spain/EU (intended)',
    distance: 'Thousands of km across the Sahara. Mali to Oujda: ~3,000 km. Desert crossing alone can take weeks',
    dangers: 'Desert heat and dehydration. Banditry. Exploitation by smugglers. Costs of thousands of euros for people earning <€1/day. Deportations back to Algeria. Migrants report being deported to Oujda region 30+ times over a decade',
    status: 'Since the 2022 Melilla massacre, many continue via Algeria to Tunisia for the Central Mediterranean Route instead. Forest camps near Ceuta/Melilla destroyed.',
  },
  {
    id: 'overland-south',
    name: 'Southern/Mauritanian Route',
    description: 'From West Africa through Mauritania into southern Morocco. An alternative to the Algeria route. Connects to Atlantic coast departure points in both countries.',
    origin: 'Senegal, Guinea, Gambia, Mali, Burkina Faso',
    entry: 'Guerguerat (Morocco-Mauritania border) or informal desert crossings into southern Morocco/Western Sahara',
    path: 'West Africa → Mauritania → southern Morocco (Dakhla, Laayoune) → north to Casablanca/Rabat/Tangier, or Atlantic coast departure',
    destination: 'Morocco (transit) → Canary Islands or northern Morocco',
    distance: 'Senegal to Tangier via Mauritania: ~4,000 km',
    dangers: 'Desert crossings. Military zones in Western Sahara. Interception by security forces. Limited water and shelter',
    status: 'Growing as eastern routes become more securitised. Southern Morocco (Agadir, Laayoune) emerging as new transit hubs.',
  },
]

export interface TransitCity {
  name: string
  role: string
  description: string
  detail: string
}

export const TRANSIT_CITIES: TransitCity[] = [
  { name: 'Oujda', role: 'Eastern gateway', description: 'Main entry from Algeria. Hub for trafficking networks. Makeshift camps (dismantled 2015). Migrants deported here repeatedly — some bused back 30+ times over a decade. Catholic Church provides aid.', detail: 'Key deportation destination & entry point. UNHCR/MSF presence.' },
  { name: 'Nador', role: 'Gateway to Melilla', description: 'Less than 16 km from Melilla. Gourougou forest camp dismantled 2015. Site of the June 2022 massacre (~23 killed). Regular raids. Women/children vulnerable to trafficking. Morocco\'s only detention centres nearby.', detail: '"Repressive atmosphere towards illegalised black migrants." Extremely difficult to find informal work.' },
  { name: 'Tangier', role: 'Strait departure point', description: 'Principal departure for sea crossings. Boukhalef neighborhood known as "the Africans neighborhood." Belyounech forest staging camp destroyed 2019. More economic opportunity than border towns.', detail: 'Both transit and increasingly a destination. Community organizations and informal churches active.' },
  { name: 'Casablanca', role: 'Economic hub & air entry', description: 'Largest city. Airport main formal entry (visa-free for many Africans). Ouled Ziane bus station: hundreds camp in streets and construction sites. Greater opportunity but also raids and forced displacement southward.', detail: 'Highest concentration of foreign residents (2024 census). Civil society most active.' },
  { name: 'Rabat', role: 'Capital & institutional hub', description: 'UNHCR offices, NGOs, policymaking centre. West/Central African community neighborhoods with informal Pentecostal/Protestant churches. African Migration Observatory established here.', detail: 'Most institutional support. Universities draw 55% sub-Saharan student residents.' },
  { name: 'Tetouan/Fnideq', role: 'Gateway to Ceuta', description: 'Less than 40 km from Ceuta. Second-choice for fence attempts. Belyounech forest camp destroyed in 2019 crackdown. Security cordon now prevents new gatherings.', detail: 'Diminished transit role since 2019.' },
  { name: 'Fez', role: 'Central transit hub', description: 'Waypoint between Oujda and northern coast. Migrants pass through or are forcefully relocated here from border areas. UNHCR Protection Working Group active.', detail: 'Growing migrant community.' },
  { name: 'Marrakech', role: 'Southern destination', description: 'Increasingly a destination. University students from sub-Saharan Africa. UNHCR presence. Less hostile than border towns. Among the top eight cities for migrant concentration.', detail: 'Growing community. Protection Working Group active.' },
]

export interface PolicyEvent {
  year: string
  event: string
  type: 'moroccan' | 'european' | 'crisis' | 'international'
}

export const POLICY_TIMELINE: PolicyEvent[] = [
  { year: '1990', event: 'Spain introduces visa requirement for Moroccans under EU pressure — triggering mass boat crossings of the Strait', type: 'european' },
  { year: '1991–96', event: '2,000–4,000 drown in the Strait of Gibraltar. It becomes "the largest mass grave in post-war Europe"', type: 'crisis' },
  { year: '1992', event: 'Spain signs Schengen. Spanish-Moroccan Readmission Agreement — one of the first EU-third country readmission deals. ~30,000 cross the Strait', type: 'european' },
  { year: '1994', event: 'Algeria-Morocco border formally closed (remains closed). First fences erected at Ceuta and Melilla', type: 'european' },
  { year: '2003', event: 'Morocco adopts Law 02-03 criminalising irregular migration. First comprehensive immigration legislation', type: 'moroccan' },
  { year: '2005', event: 'Ceuta and Melilla crisis: hundreds storm fences, at least 11 die. Morocco raids forests, buses migrants to desert. Watershed moment for civil society', type: 'crisis' },
  { year: '2011', event: 'New constitution: national identity diversity, non-discrimination, right to asylum, equality between nationals and foreigners', type: 'moroccan' },
  { year: 'Mar 2013', event: 'MSF withdraws from Morocco citing "gravity and continuity of fundamental human-rights violations" against sub-Saharan Africans', type: 'crisis' },
  { year: 'Sep 2013', event: 'CNDH report: "Foreigners and Human Rights in Morocco." King Mohammed VI endorses, announces "humanitarian approach." Regularisation committee created', type: 'moroccan' },
  { year: '2014', event: 'First regularisation campaign: ~27,000 applications, ~18,000+ approved. 116 nationalities. All women and children approved. SNIA adopted in December', type: 'moroccan' },
  { year: '2016–17', event: 'Second regularisation campaign: ~27,660 applications. Combined total: ~50,000 regularised across both waves', type: 'moroccan' },
  { year: '2017', event: 'AU Summit designates Morocco to promote African Agenda on Migration. African Migration Observatory established in Rabat', type: 'international' },
  { year: '2018', event: 'Massive urban crackdown on migrants. EU allocates €140M to Morocco for border management. Western Mediterranean Route peaks: 56,000+. Global Compact adopted in Marrakech', type: 'european' },
  { year: 'May 2021', event: 'Ceuta crisis: ~8,000 enter (including 2,000 minors) in one night. Moroccan guards absent — seen as political leverage over Spain re: Western Sahara', type: 'crisis' },
  { year: 'Jun 2022', event: 'Melilla massacre: ~2,000 attempt crossing. At least 23 killed, 70+ injured, 70+ missing. Forest camps destroyed. International condemnation', type: 'crisis' },
  { year: '2024', event: 'Census: 142,152 foreign nationals (0.4%). Morocco prevents 45,000+ crossings, arrests 177 trafficking gangs. Atlantic route becomes most active (36,000 intercepted). 10,457 dead/missing on Atlantic route — record', type: 'crisis' },
]

export const HERO_STATS = [
  { value: '13 km', label: 'Strait of Gibraltar — Africa to Europe' },
  { value: '142,152', label: 'foreign nationals in Morocco (2024 census)' },
  { value: '~50,000', label: 'regularised under SNIA (2014 & 2017)' },
  { value: '10,457', label: 'dead/missing, Atlantic route, 2024' },
]

export const KEY_NUMBERS = [
  { number: '14', unit: 'km', context: 'Strait of Gibraltar at narrowest. Between 1991–96, 2,000–4,000 drowned here. The most patrolled waterway in the world' },
  { number: '40,000+', unit: 'deaths', context: 'Recorded deaths and disappearances on all African migration routes since 2014 — undoubtedly an incomplete figure' },
  { number: '€140M', unit: '', context: 'EU funding to Morocco in 2018 alone for "border management." Morocco: testing ground for EU border externalisation' },
  { number: '59.9%', unit: '', context: 'Of all foreign residents: Senegalese, Ivorians, Guineans, Malians (2024 census). Sub-Saharan Africans are the largest migrant group' },
  { number: '3.6M', unit: '', context: 'Moroccan-born emigrants abroad (2024). Morocco is origin, transit, AND destination — a migration transition country' },
  { number: '10×', unit: '', context: 'Per capita income gap: north of the Ceuta/Melilla border vs south. The deepest economic divide at any EU-Africa land border' },
]

export interface KeyConcept {
  term: string
  arabic: string
  definition: string
}

export const KEY_CONCEPTS: KeyConcept[] = [
  { term: 'Transit Country → Destination Country', arabic: 'بلد العبور ← بلد الإقامة', definition: 'Morocco\'s transformation since the 1990s. Once purely emigration, then transit for sub-Saharans heading to Europe, now increasingly a destination as European borders harden. An estimated 700,000 sub-Saharan Africans live in Morocco — most in precarious conditions.' },
  { term: 'EU Externalisation', arabic: 'إخراج الحدود الأوروبية', definition: 'The EU policy of pushing border enforcement to non-EU countries. Morocco is the "testing ground." Billions in EU funding for surveillance, fencing, coast guard, "migration management." Critics: it outsources human rights violations.' },
  { term: 'SNIA', arabic: 'الاستراتيجية الوطنية للهجرة واللجوء', definition: 'National Strategy on Immigration and Asylum (2014). Born from the 2013 CNDH report and royal endorsement. Two regularisation campaigns (50,000), three draft laws (only trafficking law adopted). Hailed internationally but implementation incomplete.' },
  { term: 'Harraga', arabic: 'الحراقة', definition: '"Those who burn" — Moroccan Arabic for irregular migrants who "burn" documents and "burn" borders. Originally for Moroccans crossing to Europe. Evokes desperation: burning the past to pursue an uncertain future.' },
  { term: 'Pushback / Refoulement', arabic: 'الترحيل القسري', definition: 'Forcing migrants back without due process, violating international law. Documented at fences, at sea, and internally — migrants bused from northern cities to desert areas and abandoned.' },
  { term: 'Gourougou Forest', arabic: 'غابة كوروكو', definition: 'Forest camp near Nador, <16 km from Melilla. For years, hundreds waited here to storm fences. Dismantled 2015. Memorialised in Alexander-Nathani\'s "Burning at Europe\'s Borders."' },
  { term: 'Global Compact for Migration', arabic: 'الميثاق العالمي للهجرة', definition: 'Adopted in Marrakech, December 2018. Morocco took leadership. First inter-governmental agreement covering all dimensions of international migration. Non-binding.' },
  { term: 'Regularisation', arabic: 'تسوية الوضعية', definition: 'Granting legal residence to undocumented migrants. Two campaigns: 2014 (~27,000 applications) and 2016–17 (~27,660). ~50,000 total. All women and children approved. But renewal remains difficult.' },
]

export const TYPE_COLORS: Record<string, string> = {
  moroccan: '#5C7C3E',
  european: '#2D5F8A',
  crisis: '#A0452E',
  international: '#7B506F',
}

export const BIBLIOGRAPHY = [
  { source: 'Africa Center for Strategic Studies', detail: '"African Migration Trends 2024/2025." Interception data, Atlantic route statistics, EU interdiction, origin countries' },
  { source: 'Migration Policy Institute (MPI)', detail: '"A Growing Destination for Sub-Saharan Africans." Morocco\'s transition. 700,000 sub-Saharan estimates' },
  { source: 'Carnegie Endowment', detail: '"Sub-Saharan African Migrants in Morocco" (2026). 2024 census: 142,152 foreign nationals, 59.9% from four nationalities' },
  { source: 'Migration-Control.info', detail: 'Morocco profile. EU externalisation. Transit cities. Gourougou/Belyounech camps. Security operations' },
  { source: 'Global Detention Project', detail: 'SNIA history. Regularisation campaigns. CNDH report. MSF withdrawal. Draft laws status' },
  { source: 'GADEM / FIDH', detail: '"Between Raids and Regularisations." Regularisation analysis. Civil society advocacy' },
  { source: 'The New Humanitarian', detail: 'Melilla massacre (June 2022). Ceuta crisis (May 2021). Western Mediterranean Route analysis' },
  { source: 'World Bank', detail: 'Regularisation campaign figures. Morocco migration profile. Remittance data' },
  { source: 'UNHCR Morocco (April 2025)', detail: '9,094 refugees, 9,784 asylum seekers. Syria, Guinea, Senegal, Sudan, Côte d\'Ivoire. Six-city Protection Working Groups' },
  { source: 'Wikipedia: Migrants\' African Routes', detail: 'Route mapping. Mortality data. 2024 Atlantic route record. Caminando Fronteras data' },
]

export const MAP_POINTS = [
  { name: 'Oujda', lat: 34.6814, lng: -1.9086, type: 'transit', detail: 'Eastern border entry from Algeria. First stop for sub-Saharan migrants.' },
  { name: 'Nador', lat: 35.1740, lng: -2.9287, type: 'transit', detail: 'Near Melilla fence. Attempt point for Spanish enclave.' },
  { name: 'Tangier', lat: 35.7595, lng: -5.8340, type: 'transit', detail: 'Strait crossing point. 14km to Spain.' },
  { name: 'Tetouan / Fnideq', lat: 35.5889, lng: -5.3626, type: 'transit', detail: 'Ceuta border. Daily crossing attempts.' },
  { name: 'Casablanca', lat: 33.5731, lng: -7.5898, type: 'transit', detail: 'Largest city. Hub for informal employment.' },
  { name: 'Rabat', lat: 34.0209, lng: -6.8416, type: 'transit', detail: 'UNHCR presence. Regularization offices.' },
  { name: 'Fez', lat: 34.0181, lng: -5.0078, type: 'transit', detail: 'Eastern corridor waypoint.' },
  { name: 'Marrakech', lat: 31.6295, lng: -7.9811, type: 'transit', detail: 'Southern arrival point from Saharan routes.' },
  { name: 'Laayoune', lat: 27.1536, lng: -13.2033, type: 'transit', detail: 'Saharan route waypoint. Fishing boat departures.' },
  { name: 'Dakhla', lat: 23.6848, lng: -15.9580, type: 'transit', detail: 'Southernmost departure point. Atlantic route to Canaries.' },
]

export const MAP_ROUTES = [
  { name: 'Western Mediterranean', coords: [[-5.83, 35.76], [-5.35, 36.14]] as [number, number][], color: '#A0452E' },
  { name: 'Atlantic to Canaries', coords: [[-15.96, 23.68], [-13.20, 27.15], [-15.42, 28.12]] as [number, number][], color: '#F59E0B' },
  { name: 'Eastern Overland', coords: [[-1.91, 34.68], [-2.93, 35.17], [-5.83, 35.76]] as [number, number][], color: '#2D5F8A' },
]
