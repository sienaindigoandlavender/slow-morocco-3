// ─────────────────────────────────────────────────
// The Bread of Morocco
// Module 080 — Food & Agricultural Intelligence
// ─────────────────────────────────────────────────

export interface Bread {
  name: string
  arabic: string
  type: string
  method: string
  flour: string
  when: string
  detail: string
  keyFact: string
}

export const BREADS: Bread[] = [
  {
    name: 'Khobz',
    arabic: 'خبز',
    type: 'Oven-baked round loaf',
    method: 'Yeast-leavened dough, kneaded, proofed, baked in oven or ferran',
    flour: 'White, whole wheat, semolina, barley, or mixed. Varies by region, household, and budget',
    when: 'Every meal. Breakfast, lunch, dinner. Every day. The default bread of Morocco',
    detail: 'The bread. Round, thick, crusty exterior, soft interior. Scored with fork marks before baking (creates crumb and vents steam). Families mark their loaves with distinctive patterns to identify them at the communal oven. Sized from small personal rounds to family loaves of 30cm+. In Darija, "khobz" also means livelihood — "ghadi n-qelleb 3la khobz" (I\'m going to look for bread) means "I\'m going to work." Also called "aïch" — literally "life." Bread dropped on the ground is kissed and placed somewhere higher. Wasting bread is considered haram. Used as a utensil — torn, not cut — to scoop tagine, salad, harira. The right hand only.',
    keyFact: 'Khobz means both "bread" and "livelihood" in Darija — the word itself equates food with work',
  },
  {
    name: 'Msemen',
    arabic: 'مسمن',
    type: 'Square layered griddle pancake',
    method: 'Dough stretched paper-thin on oiled surface, dotted with butter/semolina, folded into thirds twice to form square layers, cooked on griddle',
    flour: 'White flour + semolina. Butter or smen (aged cultured butter) between layers',
    when: 'Breakfast, tea time, Ramadan iftar. Street food staple. Can be stuffed with meat, onion, cheese',
    detail: 'The name comes from Arabic "samen" (clarified butter) — "msemen" means "with clarified butter." Square shape. Crispy exterior, chewy layered interior. The lamination technique is nearly identical to South Indian roti prata and Malaysian roti canai — a parallel evolution across trade routes. Also called rghaif in some regions (though rghaif can also refer to stuffed versions). Sold at every bakery and street corner. The dough is stretched to translucency before folding — an acquired skill passed from mother to daughter. Can be frozen before cooking.',
    keyFact: 'Same lamination technique as South Indian roti prata — parallel evolution across Indian Ocean trade routes',
  },
  {
    name: 'Baghrir',
    arabic: 'البغرير',
    type: 'Spongy semolina pancake — "the thousand-hole pancake"',
    method: 'Batter (not dough) poured onto hot pan. Cooked on one side only. Bubbles create holes as steam escapes',
    flour: 'Semolina + flour + yeast. Batter must rest ~1 hour for fermentation to create characteristic holes',
    when: 'Weekends, special occasions, Ramadan. More time-intensive than msemen — reserved for unhurried mornings',
    detail: 'Porous surface traps every drop of honey-butter sauce. Cooked on one side only — bottom golden, top stays soft and riddled with holes. The word "baghrir" may derive from Arabic "baghir" — one who drinks without being able to quench thirst (said of animals). Fitting: the pancake absorbs endlessly. Also known as ghrayef in Tunisia and eastern Algeria. On the 9th day of Ramadan, Mozabite communities in Algeria exchange baghrir as tradition ("m\'layin"), also distributed to the poor. The batter must be exactly right — too thick and no holes form, too thin and it falls apart.',
    keyFact: 'Named for an animal that drinks without being able to quench its thirst — the pancake that absorbs everything',
  },
  {
    name: 'Rghaif',
    arabic: 'رغايف',
    type: 'Layered flatbread — stuffed or plain',
    method: 'Similar to msemen but often stuffed with spiced kefta (meat), onion-tomato mix, or cheese before folding and cooking on griddle',
    flour: 'White flour + semolina. Amazigh (Berber) origin',
    when: 'Any time. Street food. Quick meal. The stuffed versions are a meal in themselves',
    detail: 'Rghaif and msemen are closely related — sometimes the terms are used interchangeably. But properly, rghaif tends to refer to the stuffed version while msemen is plain. The word is ⴰⵖⵔⵓⵎ (aghrum) in Amazigh. Of Berber origin. Can be cooked in chilli oil for a fiery variation. The dough is the same elastic, bread-like dough as msemen — unleavened or barely leavened. Found across the Maghreb: Morocco, Algeria, Tunisia. Each region adds its own filling traditions.',
    keyFact: 'The Amazigh ancestor — ⴰⵖⵔⵓⵎ (aghrum) in Tamazight. The original stuffed street bread',
  },
  {
    name: 'Harcha',
    arabic: 'حرشة',
    type: 'Semolina griddle cake',
    method: 'Semolina, buttermilk, baking powder shaped into thick rounds and dry-cooked on griddle. No oil needed',
    flour: 'Fine semolina (not flour). Buttermilk or milk. No yeast — baking powder for leavening',
    when: 'Breakfast, snack, tea time. Quick to make — the fast bread. Native to the Middle Atlas region',
    detail: 'The cornbread of Morocco. Grainy exterior, crumbly interior. Dense and satisfying. The name "harcha" comes from "harsh/coarse" — describing its texture. Hockey-puck shape. Golden when cooked. Mild flavour that works with both sweet (honey, jam) and savoury (butter, jben cheese, olive oil). The quickest of the griddle breads to prepare — no resting time, no layering, no special technique. Gluten-sensitive travellers take note: traditional harcha from the Middle Atlas sometimes uses corn flour mixed with wheat.',
    keyFact: 'The name means "rough/coarse" — and the semolina texture delivers exactly that promise',
  },
  {
    name: 'Batbout',
    arabic: 'بطبوط',
    type: 'Pita-like pocket bread',
    method: 'Yeast dough rested until doubled, then cooked on griddle (not oven). Puffs slightly to create pocket',
    flour: 'White flour or semolina. Yeast-leavened',
    when: 'Daily — especially in homes without ovens. The stovetop alternative to oven-baked khobz',
    detail: 'The Moroccan pita. Soft, round, slightly puffy. The pocket makes it ideal for stuffing with grilled meat, vegetables, or kefta. Cooked on a griddle or pan — no oven required. Resting time is crucial: the dough must fully proof to create the fluffy interior pockets. The bread of street-food vendors and sandwich makers. Simpler and softer than khobz, less flaky than msemen. The everyday compromise.',
    keyFact: 'Morocco\'s stovetop bread — no oven needed, which made it the default in homes without a ferran nearby',
  },
  {
    name: 'Tafarnout',
    arabic: 'تافرنوت',
    type: 'Berber flatbread — baked in embers or clay oven',
    method: 'Unleavened or minimally leavened dough cooked directly in fire embers, on hot stones, or pressed to the inside wall of a clay oven',
    flour: 'Barley, corn, or wheat — whatever is available. Often mixed grains',
    when: 'Rural Morocco, Atlas Mountains, nomadic camps. The bread of the bled (countryside)',
    detail: 'The oldest bread method in Morocco. Amazigh bread baked in tannourt (clay oven) — gives the bread its name. In the High Atlas, it\'s pressed onto the inner wall of the oven like tandoori naan. In the Sahara, buried under hot sand and embers. In the Dadès Valley, baked on an elevated tray over a small wood fire. No electricity, no gas — just earth, fire, and grain. Each region has its own variation. The bread that sustained generations through famine and drought.',
    keyFact: 'Baked in sand, on stones, pressed to oven walls — the bread that predates all ovens',
  },
  {
    name: 'Krachel',
    arabic: 'كراشل',
    type: 'Sweet anise rolls',
    method: 'Enriched yeast dough with eggs, butter, anise, sesame. Shaped into small rolls, glazed, baked',
    flour: 'White flour. Enriched with eggs, butter, orange blossom water, anise seeds, sesame seeds',
    when: 'Breakfast, tea time, celebrations, Ramadan. The sweet bread',
    detail: 'Morocco\'s brioche. Soft, fragrant, slightly sweet. Topped with sesame seeds. The anise and orange blossom water give it its distinctive Moroccan character. Sold in bakeries stacked in pyramids. The bread for dipping in morning coffee or tea. A step up from daily khobz — reserved for occasions or when the household wants something special. Children\'s favourite.',
    keyFact: 'Morocco\'s brioche — anise and orange blossom water mark it as unmistakably Moroccan',
  },
]

export interface FerranDetail {
  aspect: string
  detail: string
}

export const FERRAN: FerranDetail[] = [
  { aspect: 'What it is', detail: 'The ferran (فران) is a neighbourhood communal oven. Every quartier in the medina had one. Families prepared dough at home, then carried it on wooden boards to the ferran to be baked.' },
  { aspect: 'Identification', detail: 'Each family marked their loaf with a distinctive pattern — fork tines, knife scores, thumb prints, stamps. The ferrani (oven operator) knew every household by their bread mark.' },
  { aspect: 'Social function', detail: 'More than a bakery — a daily gathering point. Women exchanged news while waiting. Children were sent to collect the bread. The ferran was the social network of the medina.' },
  { aspect: 'Decline', detail: 'Until the 1980s, most families used the ferran. Modern home ovens and commercial bakeries have reduced the tradition, but ferrans survive in medinas and rural areas. The smell of fresh bread from a ferran is "something you never forget."' },
  { aspect: 'Economics', detail: 'The ferrani charges a small fee per loaf — traditionally 1–2 dirhams. Fuel is typically wood or compressed sawdust. Some ferrans also bake pastries, roast meats, and dry herbs for the neighbourhood.' },
  { aspect: 'Modern status', detail: 'Today, neighbourhood bakeries (furns) sell their own bread alongside baking customers\' dough. Many produce flavoured loaves — olive, anise, poppy seed, sunflower seed. The daily queue remains a ritual.' },
]

export interface WheatStat {
  metric: string
  value: string
  source: string
}

export const WHEAT_DEPENDENCY: WheatStat[] = [
  { metric: 'Annual wheat demand', value: '~9.6 million tonnes', source: 'USDA FAS 2025' },
  { metric: 'Domestic production (2024)', value: '2.47 million tonnes — down 40.6% from previous year', source: 'USDA / AgriSource Morocco' },
  { metric: 'Import dependency', value: '60%+ of annual consumption covered by imports', source: 'AgriSource Morocco 2024' },
  { metric: 'Wheat imports (2024)', value: '6.3 million tonnes — $1.78 billion (17.83B MAD)', source: 'Milling MEA / ONICL' },
  { metric: 'Import forecast (2025–26)', value: '~6.5 million tonnes — 8.3% above 2023–24', source: 'USDA September 2025 update' },
  { metric: 'Cereal imports forecast', value: '11 million tonnes total — 20%+ above average', source: 'FAO 2025' },
  { metric: 'Top supplier shift', value: 'France declining (was 50.9% in 2022–23). Russia rising (1.19M tonnes to May 2025). Diversification underway', source: 'Grain Central / USDA' },
  { metric: 'Industrial mills', value: '120+ mills processing soft wheat. 20 for durum. 8 for barley flour', source: 'World Grain / FAS 2025' },
  { metric: 'Flour extraction rates', value: '81% for national (subsidised) flour. 74% for special flour. Mandated by government', source: 'ONICL regulation' },
  { metric: 'Subsidy mechanism', value: 'Government sets reference price at MAD 270/quintal. Pays difference when import price exceeds threshold. Stabilises bread prices nationwide', source: 'ONICL / Radarr Africa 2025' },
  { metric: 'Consecutive drought years', value: '2023–24 and 2024–25 — two consecutive early-season droughts. Below-average rainfall 60%+ in key growing regions', source: 'FAO / USDA' },
  { metric: 'Agriculture GDP share', value: '10% of GDP. 45% of workforce (with fishing and forestry)', source: 'World Grain 2024' },
]

export interface BreadEtiquette {
  rule: string
  detail: string
}

export const ETIQUETTE: BreadEtiquette[] = [
  { rule: 'Tear, never cut', detail: 'Bread is torn by hand, not sliced with a knife. Cutting bread with a blade is considered disrespectful to the grain.' },
  { rule: 'Right hand only', detail: 'Bread is handled and food is scooped with the right hand. The left hand rests in the lap or holds the bread steady.' },
  { rule: 'Kiss it if it falls', detail: 'Bread that falls on the ground is picked up, kissed, and placed somewhere higher. To step on bread or leave it on the ground is deeply offensive.' },
  { rule: 'Never waste', detail: 'Discarding bread is haram. Stale bread is dried and reused — ground into breadcrumbs, soaked in soup, fed to animals. Nothing is thrown away.' },
  { rule: 'Bread as utensil', detail: 'A piece of khobz is used to scoop vegetables, meat, sauces from the communal tagine. Each diner eats from the section of the dish in front of them — an unspoken etiquette of territory.' },
  { rule: 'Break before eating', detail: 'The head of the household or the host breaks the first bread. "Bismillah" is spoken before eating begins.' },
  { rule: 'Bread with everything', detail: 'Even dishes that seem complete — couscous, pastilla, harira — are served alongside bread. To serve a meal without bread is to serve no meal at all.' },
]

export interface HistoryEvent {
  year: string
  event: string
  thread: string
}

export const HISTORY: HistoryEvent[] = [
  { year: 'Ancient', event: 'Amazigh communities bake tafarnout in clay tannourt ovens and under hot embers. Barley and corn — wheat is a later arrival', thread: 'origin' },
  { year: '7th–8th C', event: 'Arab expansion brings wheat cultivation and Islamic bread traditions to Morocco. Bread becomes sacred — connected to barakah (divine blessing)', thread: 'origin' },
  { year: '11th–12th C', event: 'Almoravid and Almohad empires expand irrigated agriculture. Wheat becomes primary grain in lowlands. Barley remains staple in mountains', thread: 'grain' },
  { year: '15th–16th C', event: 'Andalusian refugees bring new baking techniques after fall of Granada (1492). Msemen, pastilla traditions enriched', thread: 'origin' },
  { year: '19th C', event: 'Communal ferran system becomes standard in medinas. Every neighbourhood has its oven. The ferrani becomes a social institution', thread: 'ferran' },
  { year: '1912–1956', event: 'French Protectorate introduces industrial flour milling. White flour ("force" from French "farine de force") becomes widely available. Baguettes appear alongside khobz', thread: 'modern' },
  { year: '1981', event: '"Bread riots" in Casablanca after government raises bread and flour prices. 66 officially killed (estimates far higher). Bread subsidy policy permanently shapes Moroccan politics', thread: 'politics' },
  { year: '1980s', event: 'Modern home ovens begin replacing the communal ferran in cities. Transition from communal to private baking accelerates', thread: 'ferran' },
  { year: '2007', event: 'Morocco riots again over bread prices. Government doubles down on wheat subsidy policy. Bread price stability becomes a political imperative', thread: 'politics' },
  { year: '2022', event: 'Russia-Ukraine war disrupts global wheat supply. Morocco scrambles to diversify import sources beyond traditional French and Black Sea suppliers', thread: 'dependency' },
  { year: '2023–24', event: 'First of two consecutive drought years. Wheat production collapses 42% to 3.3M tonnes. Imports surge to 7.5M tonnes', thread: 'dependency' },
  { year: '2024', event: 'Domestic wheat production falls to 2.47M tonnes. 6.3M tonnes imported ($1.78B). Government extends wheat import subsidy', thread: 'dependency' },
  { year: '2025', event: 'FAO forecasts cereal imports of 11M tonnes — 20%+ above average. Annual food inflation rises. Wheat subsidy extended again through December', thread: 'dependency' },
]

export const HERO_STATS = [
  { value: '9.6M', label: 'tonnes annual wheat demand' },
  { value: '60%+', label: 'of wheat consumption imported' },
  { value: '120+', label: 'industrial mills processing soft wheat' },
  { value: '8', label: 'breads that define a nation' },
]

export const KEY_NUMBERS = [
  { number: '$1.78B', context: 'Annual wheat import bill (2024) — 17.83 billion MAD. Morocco imports more wheat than any Arab country' },
  { number: '81%', context: 'Mandated flour extraction rate for subsidised national flour — maximises yield per kernel. 74% for special flour' },
  { number: '1981', context: 'The year bread riots in Casablanca killed 66+ ' },
  { number: '3', context: 'Meals per day where bread is served — breakfast, lunch, and dinner. Bread at every meal' },
  { number: '1,300', context: 'm³ of water required to produce one tonne of wheat — why Morocco\'s drought-hit agriculture cannot keep pace with demand' },
  { number: 'MAD 270', context: 'Government reference price per quintal of wheat — the price ceiling above which subsidies are activated to stabilise bread costs' },
]

export const BIBLIOGRAPHY = [
  { source: 'USDA Foreign Agricultural Service', detail: 'Morocco Grain and Feed Update, multiple years (2024–2025). Production, import, and subsidy data' },
  { source: 'FAO', detail: 'Crop Prospects and Food Situation (March 2025). Cereal import forecasts. Drought analysis' },
  { source: 'World Grain', detail: 'Focus on Morocco (December 2025). Mill counts, flour extraction rates, import diversification' },
  { source: 'Milling Middle East & Africa', detail: 'Morocco extends wheat import subsidy (March 2025). Import volumes, cost data, supplier shifts' },
  { source: 'AgriSource Morocco', detail: 'Balance of food security and export growth (January 2026). Paradox analysis: $8B agricultural exports vs $3B+ wheat imports' },
  { source: 'Moroccan Food Tour / Mohamed', detail: 'Traditional bread types, ferran culture, regional variations. Darija bread terminology' },
]
