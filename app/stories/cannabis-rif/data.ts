// ─────────────────────────────────────────────────
// Cannabis & the Rif — Morocco's Other Cash Crop
// Module 054 — Economic Intelligence
// Sources: UNODC, Global Initiative, LSE/JIED,
// Wikipedia, AP, PMC, TNI, ScienceDirect
// ─────────────────────────────────────────────────

export interface TimelineEvent {
  year: string
  event: string
  detail: string
  era: 'pre-colonial' | 'colonial' | 'prohibition' | 'legalization'
}

export const TIMELINE: TimelineEvent[] = [
  { year: '7th–15th C', event: 'Cannabis introduced to Morocco', detail: 'Likely arrived during the Arab conquests. Grown nationwide on a small scale in gardens and orchards for local use. Not yet concentrated in the Rif.', era: 'pre-colonial' },
  { year: '16th–17th C', event: 'Kif spreads through Saadian era', detail: 'Cannabis use reaches all social strata. The Saadian sultans attempt periodic prohibitions — publicly burning kif at weekly markets. Ulemas (Islamic scholars) debate whether it is haram.', era: 'pre-colonial' },
  { year: '18th C', event: 'The Rif becomes the center', detail: 'Cultivation concentrates in the mountainous northwest. The Rif\'s poor soil and harsh climate mean cannabis is one of the few viable crops. The region\'s remoteness makes enforcement difficult.', era: 'pre-colonial' },
  { year: '~1890', event: 'Sultan Hassan I grants tribal privileges', detail: 'Strict regulations on trade, but cultivation authorized in five douars of the Amazigh Ketama, Beni Seddat, and Beni Khaled tribes. This area remains the heartland today. 90% of France\'s pharmaceutical cannabis came from Morocco.', era: 'pre-colonial' },
  { year: '1912', event: 'Protectorate splits the Rif', detail: 'France and Spain divide Morocco. The French create a tobacco and kif monopoly (Régie Marocaine des Kifs et Tabac). Spanish-controlled Rif remains beyond the Régie\'s reach. Two parallel systems emerge.', era: 'colonial' },
  { year: '1921–26', event: 'Rif War — Abdelkrim bans cannabis', detail: 'Abdelkrim el-Khattabi declares the Rif Republic and bans cannabis as contrary to Islam. After his defeat, Spanish and French authorities allow cultivation again.', era: 'colonial' },
  { year: '1930s', event: 'Paul Bowles arrives in Tangier', detail: 'Kif sold freely in tobacco shops. A government monopoly product. Moroccans preferred to prepare it themselves. Two products coexisted: official manufactured and smuggled.', era: 'colonial' },
  { year: '1954', event: 'French protectorate prohibits all cultivation', detail: 'The Spanish zone still authorizes it under license with a 5 kg possession threshold. The inconsistency between zones creates permanent arbitrage.', era: 'colonial' },
  { year: '1956', event: 'Independence — nationwide ban', detail: 'King Mohammed V prohibits cannabis. But traditional tolerance in the Rif continues. The crop supports too many families for enforcement to succeed.', era: 'prohibition' },
  { year: '1960s–70s', event: 'Hippie trail transforms the industry', detail: 'Young Western tourists arrive. Before this, cannabis was consumed locally as kif in sebsi pipes. Europeans teach Moroccans hashish sieving techniques imported from Afghanistan and Lebanon. Production industrializes.', era: 'prohibition' },
  { year: '1974', event: 'Total drug ban (Dahir)', detail: 'Royal decree makes the entire cannabis supply chain illegal — production, trade, and consumption. But cultivation continues expanding, driven by European demand for hashish.', era: 'prohibition' },
  { year: '2003', event: 'Peak cultivation: 134,000 hectares', detail: 'UNODC satellite survey records the historical maximum. 96,000 families in the Rif depend on cannabis. Approximately 800,000 people rely on it for a living. Morocco supplies 70% of Europe\'s hashish.', era: 'prohibition' },
  { year: '2013', event: 'Cultivation drops to 47,500 hectares', detail: '65% reduction from the 2003 peak due to international pressure and eradication programs. But yield per hectare increases — new high-THC hybrids replace traditional varieties.', era: 'prohibition' },
  { year: '2021', event: 'Law 13-21: Medical/industrial legalization', detail: 'Parliament votes to legalize cannabis for medical, cosmetic, and industrial purposes. Recreational use remains illegal. ANRAC (National Regulatory Agency) established. Three provinces authorized: Al Hoceima, Chefchaouen, Taounate.', era: 'legalization' },
  { year: '2023', event: 'First legal harvest: 296 tonnes', detail: 'Morocco produces the first legal cannabis crop of any major hashish-producing country. Less than 300 hectares cultivated legally. Farmers begin transitioning.', era: 'legalization' },
  { year: '2024', event: 'First legal export to Europe', detail: '100 kg of resin (<1% THC) exported to Switzerland at €1,400–1,800/kg. Royal pardon for 4,800+ farmers convicted of illegal cultivation. 2,700 hectares legal. Over 3,300 authorizations issued.', era: 'legalization' },
  { year: '2025', event: 'Expansion continues', detail: '~200 operators active. Cannabis-derived products (soap, oil, cream) appear on pharmacy shelves. Foreign investment from German, Israeli, South African, and American companies. Target: 10–15% European market share.', era: 'legalization' },
]

export interface ProductionStat {
  metric: string
  value: string
  note: string
  color: string
}

export const PRODUCTION_STATS: ProductionStat[] = [
  { metric: 'Total cultivation area', value: '50,000–70,000 ha', note: 'Estimated illegal cultivation (2024). Down from 134,000 ha peak in 2003.', color: '#A0452E' },
  { metric: 'Legal cultivation (2024)', value: '~2,700 ha', note: 'Up from <300 ha in 2023. Still a fraction of total.', color: '#5C7C3E' },
  { metric: 'People dependent on cannabis', value: '400,000+', note: 'Direct and indirect participants in the trade across the Rif.', color: '#F59E0B' },
  { metric: 'Europe\'s hashish from Morocco', value: '~70%', note: 'Spain is the primary transit route across the Strait of Gibraltar.', color: '#2D5F8A' },
  { metric: 'Spain seizures (2021)', value: '672 tonnes', note: 'Resin seized coming from Morocco. 80%+ of all EU hashish seizures.', color: '#7B506F' },
  { metric: 'Black market revenue (Europe)', value: '$4–11B/year', note: 'Revenue generated for European drug dealers. UNODC estimate.', color: '#78716C' },
]

export interface GeographyFact {
  id: string
  title: string
  detail: string
}

export const GEOGRAPHY: GeographyFact[] = [
  { id: 'rif', title: 'The Rif Mountains', detail: 'Rugged mountain range in northern Morocco, running parallel to the Mediterranean coast. Poor soil, harsh climate — hot dry summers, cold wet winters. Cannabis is one of the few viable crops in the higher elevations. The terrain\'s inaccessibility has historically shielded cultivation from enforcement.' },
  { id: 'ketama', title: 'Ketama — The Epicenter', detail: 'Small rural town in Al Hoceima province. The original heartland authorized by Sultan Hassan I in 1890. Still the symbolic center of cannabis culture. Hub for cannabis tourism despite its illegality. The name is synonymous with Moroccan hashish worldwide.' },
  { id: 'chefchaouen', title: 'Chefchaouen Province', detail: 'The famous Blue City. One of three provinces where legal cultivation is now authorized under Law 13-21. Bab Berred, nearby, is where many cooperatives are forming to sell legal cannabis products.' },
  { id: 'alhoceima', title: 'Al Hoceima Province', detail: 'Coastal Rif province. One of three authorized for legal cultivation. Also an epicenter of anti-government sentiment — the 2016–17 Hirak Rif protests originated here.' },
  { id: 'taounate', title: 'Taounate Province', detail: 'Third authorized province. Southern edge of the Rif. The expansion of cultivation beyond the traditional Ketama zone into provinces like Taounate was a major driver of the 2003 peak.' },
  { id: 'route', title: 'The Route to Europe', detail: 'The Strait of Gibraltar — 14 km of water between Morocco and Spain. The primary trafficking corridor. Hashish moves through Spain and into the Netherlands, France, and beyond. Morocco\'s proximity to Europe is both its market advantage and its enforcement challenge.' },
]

export interface LegalizationFact {
  title: string
  detail: string
  color: string
}

export const LEGALIZATION: LegalizationFact[] = [
  { title: 'What Law 13-21 allows', detail: 'Cultivation of cannabis for medical, pharmaceutical, cosmetic, and industrial purposes. Not recreational. ANRAC regulates licensing, monitoring, seed certification, and export/import. Only the three northern provinces are authorized.', color: '#5C7C3E' },
  { title: 'What it doesn\'t allow', detail: 'Recreational use, possession, or consumption remain illegal. No provisions for cannabis cafés or retail dispensaries. No THC thresholds for recreational products. The law targets producers, not consumers.', color: '#A0452E' },
  { title: 'The price gap', detail: 'Legal producers receive ~75 MAD/kg. Illegal market pays 10–20 MAD/kg but offers volume and no paperwork. Legal exports sell at €1,400–1,800/kg in Europe. The value chain favors processors and exporters, not farmers — echoing the old black market structure.', color: '#F59E0B' },
  { title: 'The pardon', detail: 'August 2024: King Mohammed VI pardons 4,800+ people convicted of illegal cannabis cultivation. A reconciliatory gesture toward Rif farmers who lived under arrest warrants for decades. Further pardons expected.', color: '#7B506F' },
  { title: 'The scale problem', detail: '2,700 legal hectares vs. 50,000–70,000 illegal hectares. 3,300 licenses vs. 400,000+ people in the trade. The legal market absorbs a tiny fraction. The informal economy is resilient because it is efficient, established, and profitable.', color: '#78716C' },
  { title: 'The Beldia question', detail: 'ANRAC has authorized the use of Beldia — the indigenous cannabis variety of the Rif. But modern high-THC hybrids introduced since the 1980s have largely replaced traditional strains. The genetic heritage is disappearing.', color: '#2D5F8A' },
]

export const VOCABULARY = [
  { term: 'Kif', termAr: 'كيف', meaning: 'Moroccan name for cannabis. Also means "perfect bliss" in Arabic. Traditionally refers to dried and ground female flowers mixed with black tobacco, smoked in a sebsi pipe.' },
  { term: 'Sebsi', termAr: 'سبسي', meaning: 'Traditional long-stemmed pipe with a small clay bowl (chqouf). Used to smoke kif. Still found throughout the Rif and Jbala regions.' },
  { term: 'Majoun', termAr: 'معجون', meaning: 'Traditional edible. A candy or jam made from cannabis, honey, chocolate, and nuts. Ingested rather than smoked. Predates modern edibles by centuries.' },
  { term: 'Chira', termAr: 'شيرة', meaning: 'Moroccan slang for hashish resin. The pressed and heated product made from kif trichomes.' },
  { term: 'Maalem', termAr: 'معلم', meaning: 'the master hash-maker. The person who oversees the sieving process and grades the quality of each extraction.' },
]

export const HERO_STATS = [
  { value: '70%', label: 'Of Europe\'s hashish' },
  { value: '400K+', label: 'People in the trade' },
  { value: '2021', label: 'Legalization law' },
  { value: '5', label: 'Centuries of cultivation' },
]

export const ERA_COLORS: Record<string, string> = {
  'pre-colonial': '#D4A373',
  'colonial': '#2D5F8A',
  'prohibition': '#A0452E',
  'legalization': '#5C7C3E',
}

export const MAP_POINTS = [
  { name: 'Ketama', lat: 34.9167, lng: -4.5833, detail: 'Capital of cannabis cultivation. Rif heartland. ~800 tonnes/year.', color: '#5C7C3E' },
  { name: 'Issaguen', lat: 34.9000, lng: -4.4167, detail: 'Chefchaouen province. Traditional growing area.', color: '#5C7C3E' },
  { name: 'Bab Berred', lat: 35.0, lng: -4.7, detail: 'Northern Rif. Major production zone.', color: '#5C7C3E' },
  { name: 'Al Hoceima', lat: 35.2517, lng: -3.9372, detail: 'Coastal city. Gateway to growing regions.', color: '#F59E0B' },
  { name: 'Chefchaouen', lat: 35.17, lng: -5.26, detail: 'Tourist gateway. Hash cafés. Legal grey zone.', color: '#F59E0B' },
  { name: 'Tangier', lat: 35.76, lng: -5.83, detail: 'Transit port. European export route. 14km to Spain.', color: '#A0452E' },
  { name: 'Nador / Melilla', lat: 35.29, lng: -2.94, detail: 'Eastern export corridor. Spanish enclave border.', color: '#A0452E' },
]
