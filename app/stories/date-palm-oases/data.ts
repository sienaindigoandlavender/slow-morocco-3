// ─────────────────────────────────────────────────
// The Date Palm Oases
// Module 075 — Ecological & Agricultural Intelligence
// ─────────────────────────────────────────────────

export interface OasisValley {
  name: string
  lat: number
  lng: number
  detail: string
  color: string
  stat: string
}

export const VALLEYS: OasisValley[] = [
  { name: 'Draa Valley', lat: 30.33, lng: -5.84, detail: 'Morocco\'s longest river (1,100 km). The valley stretches 200 km from Ouarzazate to Zagora. Over 4.5 million date palms. Bayoud disease first discovered here in 1870, north of Zagora. Ternata, Fezouata, and Ktaoua oases. Kasbahs of Tamnougalt and Aït Benhaddou nearby. Ancient caravan route to Timbuktu.', color: '#5C7C3E', stat: '4.5M+ palms' },
  { name: 'Ziz Valley', lat: 31.93, lng: -4.43, detail: 'Cuts south from the High Atlas through the Ziz Gorges to Erfoud and Rissani. Palm groves extend over 50 km along the river. Source Bleue de Meski — the springwater pool at the oasis meeting point. Er Rachidia is the administrative gateway. Cinematic — the landscape that made Erfoud a film location.', color: '#2D5F8A', stat: '50 km palmery' },
  { name: 'Tafilalet', lat: 31.28, lng: -4.27, detail: 'Largest oasis in Morocco. Cradle of the Alaouite dynasty that rules Morocco today. South of Erfoud: Rissani, Arab Sebah de Ziz, Safla, Aoufous, Jerf. Historically the most important territory south of the Atlas. Draa-Tafilalet region contains 80% of Morocco\'s date palms and produces 90% of national date output.', color: '#F59E0B', stat: '80% of national palms' },
  { name: 'Tata-Bani', lat: 29.75, lng: -7.97, detail: 'Western oasis belt between the Anti-Atlas and the Sahara. Smaller but significant — part of the 90% trio with Draa and Tafilalet. Less visited. Traditional Amazigh communities. Emerging agri-tourism.', color: '#7B506F', stat: 'Western belt' },
]

export interface DateVariety {
  name: string
  arabic: string
  detail: string
  quality: string
}

export const VARIETIES: DateVariety[] = [
  { name: 'Mejhoul (Medjool)', arabic: 'مجهول', detail: 'The world\'s most sought-after date variety. Large, soft, honey-caramel flavour. Morocco\'s flagship export cultivar. Tissue-culture propagation at 100,000 plants/year (Maghreb Palm Laboratory). Highly susceptible to Bayoud disease. Named "Mejhoul" — the unknown — because it was once so rare.', quality: 'Premium export' },
  { name: 'Boufeggous', arabic: 'بوفقوس', detail: 'Caramel-rich, semi-soft. The Tafilalet\'s signature variety alongside Mejhoul. Highly prized locally. Extremely susceptible to Bayoud — one of the hardest hit by the epidemic. Stores well for up to four years. The date you find at Zagora\'s twice-weekly souk.', quality: 'Premium local' },
  { name: 'Najda', arabic: 'نجدة', detail: 'Bayoud-resistant cultivar developed by INRA Morocco over 40 years of directed crossing. High-quality fruit on a resistant rootstock — the breakthrough. Name means "rescue" or "aid." Only six naturally resistant cultivars exist; all produce poor fruit. Najda broke the trade-off.', quality: 'Resistant + quality' },
  { name: 'Jihel', arabic: 'جيهل', detail: 'Important Moroccan variety. Semi-dry, smaller than Mejhoul. Highly susceptible to Bayoud. Used in genetic research as the benchmark "susceptible cultivar" against which resistance is tested.', quality: 'Research benchmark' },
  { name: 'Bouskri', arabic: 'بوسكري', detail: 'Early-maturing variety. Dry texture. Locally consumed. Less commercially valuable but culturally significant — the first dates of the season.', quality: 'Early harvest' },
  { name: 'Khalts', arabic: 'خلط', detail: 'Not a single variety but a heterogeneous population of seedling-origin palms — unidentified, unclassified. Now over 50% of Morocco\'s palm stock. The Bayoud killed the named varieties. What survived and reseeded is the Khalts. Low commercial value. High genetic diversity. A reservoir.', quality: 'Mixed / reservoir' },
]

export interface EcologyLayer {
  layer: string
  detail: string
}

export const THREE_TIERS: EcologyLayer[] = [
  { layer: 'Canopy — Date palms', detail: 'The top tier. 15–25 metres high. Creates the microclimate. Provides shade, wind protection, humidity retention. Without the canopy, the layers below cannot survive. The palm is not just a crop — it is the architecture of the oasis.' },
  { layer: 'Middle — Fruit trees', detail: 'Apricots, pomegranates, figs, almonds, olives grow in the shade of the palms. Sheltered from direct sun and desiccating wind. This layer would not exist in the open desert.' },
  { layer: 'Ground — Crops & fodder', detail: 'Tomatoes, carrots, barley, mint, alfalfa, henna grow at ground level in the irrigated soil beneath the trees. The coolest, most humid layer. The oasis feeds its population from all three levels simultaneously.' },
]

export interface ThreatFactor {
  name: string
  detail: string
  severity: string
}

export const THREATS: ThreatFactor[] = [
  { name: 'Bayoud Disease', detail: 'Fusarium oxysporum f. sp. albedinis. Soil-borne fungal pathogen. Infects roots, colonises the vascular system, kills the palm. First reported in Morocco in 1870 in the Draa Valley north of Zagora. Has destroyed 10–12 million date palms in Morocco alone — two-thirds of the best commercial varieties. Spread via irrigation water, wind, root contact, and infected offshoots carried along caravan routes. Now a quarantine pathogen in the EU. No cure. Only prevention and resistant cultivars.', severity: 'Catastrophic' },
  { name: 'Water Scarcity', detail: 'Rainfall declining across the Draa-Tafilalet. Traditional khettara (underground irrigation channels, some running for kilometres) are drying up as water tables drop. Modern wells pump faster than aquifers recharge. Drip irrigation introduced under the Green Morocco plan, but demand outstrips supply. Without water, the oasis ecosystem collapses tier by tier.', severity: 'Existential' },
  { name: 'Desertification', detail: 'When palms die — from Bayoud, drought, or neglect — the canopy breaks. The middle and ground tiers lose their microclimate. Underlying crops die. Sand advances. The Bayoud did not just kill trees. It destroyed the three-tier ecology, collapsing the food system and driving rural exodus.', severity: 'Structural' },
  { name: 'Rural Exodus', detail: 'Young people leave. Oasis agriculture is labour-intensive: hand-pollination, irrigation management, harvest. Without labour, palm groves are abandoned. Without maintenance, khettara channels silt up. The social infrastructure of the oasis — families who have farmed the same plots for generations — erodes.', severity: 'Generational' },
]

export interface WaterSystem {
  name: string
  arabic: string
  detail: string
}

export const WATER_SYSTEMS: WaterSystem[] = [
  { name: 'Khettara', arabic: 'خطارة', detail: 'Underground irrigation channels, some running for kilometres across the hammada (stony desert). Gravity-fed from upland aquifers. No pumps. Centuries old. Same principle as the Iranian qanat and the Omani falaj. Maintained by collective labour. Drying up as water tables fall.' },
  { name: 'Seguia', arabic: 'سقية', detail: 'Open-air irrigation canals distributing water from rivers, springs, or khettara outlets to individual plots. Water is funnelled to each family in turn — every household receives the same allocation of time to irrigate its crops.' },
  { name: 'Wells (Hassi)', arabic: 'حاسي', detail: 'Communal and private wells. Increasingly mechanised with motor pumps. Draw water faster than the aquifer recharges. The modern solution that creates the long-term problem.' },
  { name: 'Drip Irrigation', arabic: 'التنقيط', detail: 'Introduced under Morocco\'s Green Morocco plan (Plan Maroc Vert). Reduces water use per palm by 40–60% compared to flood irrigation. Essential but requires capital investment most smallholders cannot afford.' },
]

export const HERO_STATS = [
  { value: '4.8M', label: 'Date palms' },
  { value: '453', label: 'Cultivars recorded' },
  { value: '117K', label: 'Tonnes/year' },
  { value: '10M+', label: 'Trees killed by Bayoud' },
]

export const KEY_NUMBERS = [
  { value: '4.8M', unit: 'date palms', note: 'Across ~50,000 hectares. 77% in Draa-Tafilalet. 41% currently productive. The rest are juvenile, senescent, or damaged.' },
  { value: '453', unit: 'cultivars', note: 'Recorded genetic diversity. 52% are named varieties, 48% are khalts — heterogeneous seedling populations. A reservoir of genes for the future.' },
  { value: '60%', unit: 'of agricultural income', note: 'For 1 million oasis inhabitants. The date palm is not a luxury crop. It is the economy.' },
  { value: '10–12M', unit: 'trees destroyed', note: 'By Bayoud disease since 1870. Two-thirds of the best commercial varieties. The catastrophe reshaped Morocco\'s genetic landscape.' },
  { value: '100,000', unit: 'tissue-culture plants/year', note: 'Propagated at the Maghreb Palm Laboratory. Mainly Mejhoul and Najda. The programme to replant what Bayoud took.' },
  { value: '1870', unit: 'first Bayoud report', note: 'Draa Valley, north of Zagora. The fungus spread east to Algeria and south to Mauritania. Still no cure — only resistant varieties and quarantine.' },
]

export interface BibliographyEntry {
  author: string
  title: string
  year: string
  detail: string
}

export const BIBLIOGRAPHY: BibliographyEntry[] = [
  { author: 'Sedra, My Hassan', title: 'Date Palm Status and Perspective in Morocco', year: '2015', detail: 'INRA Morocco. The definitive survey: 453 cultivars, varietal composition of Tafilalet, khalts dominance, Bayoud impact, genetic improvement programme. Sedra led the 40-year effort to develop resistant cultivars.' },
  { author: 'Munier, P.', title: 'Le Palmier Dattier: Techniques Agricoles et Productions Tropicales', year: '1973', detail: 'Maisonneuve & Larose, Paris. The classic French-language reference on date palm agronomy across North Africa. Cultivation, irrigation, harvest, processing.' },
  { author: 'Barrow, Sarah', title: 'Oasis Settlements: Irrigation, Social Organization and the Date Palm', year: '2000', detail: 'Traces how water distribution systems (khettara, seguia) shape social hierarchies in Moroccan oases. Water rights determine land rights determine political power.' },
  { author: 'Zaid, Abdelouahhab & de Wet, P.F.', title: 'Date Palm Cultivation', year: '2002', detail: 'FAO Plant Production and Protection Paper No. 156 (Revised). The international standard. Covers botany, ecology, propagation, diseases, post-harvest. The section on Bayoud is foundational.' },
  { author: 'El Modafar, C.', title: 'Mechanisms of Date Palm Resistance to Bayoud Disease', year: '2010', detail: 'Physiologia Plantarum. Reviews five decades of research into how date palms defend against Fusarium oxysporum f. sp. albedinis. Only six naturally resistant cultivars exist — all with poor fruit quality. The breeding dilemma.' },
  { author: 'Lightfoot, Dale R.', title: 'Moroccan Khettara: Traditional Irrigation and Progressive Desiccation', year: '1996', detail: 'Annals of the Association of American Geographers. Documents the decline of khettara systems in the Tafilalet as water tables drop. Maps the infrastructure. Quantifies the loss.' },
]
