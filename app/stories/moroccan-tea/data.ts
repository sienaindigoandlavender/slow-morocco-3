// ─────────────────────────────────────────────────
// The Anatomy of Moroccan Tea
// Module 072 — Food & Cultural Intelligence
// ─────────────────────────────────────────────────

export interface Ingredient {
  name: string
  arabic: string
  origin: string
  detail: string
  color: string
}

export const INGREDIENTS: Ingredient[] = [
  { name: 'Gunpowder green tea', arabic: 'اتاي / atay', origin: 'Zhejiang Province, China', detail: 'Chinese green tea rolled into small pellets resembling gunpowder — "Zhu cha" (pearl tea) in Chinese. Strong, slightly astringent, full-bodied. The smaller and shinier the pellets, the higher the quality. Morocco imports ~60,000 tonnes annually from China, 95% from Zhejiang Province, with Shaoxing supplying half. Morocco absorbs 46% of China\'s gunpowder exports and 16% of all Chinese tea exports. The country does not produce its own tea.', color: '#5C7C3E' },
  { name: 'Mint (Nanah)', arabic: 'نعناع / na\'na\'', origin: 'Morocco — grown domestically', detail: 'Spearmint (Mentha spicata), called "nanah" in Darija. Sweeter and milder than peppermint. Most Moroccans grow their own rather than buying it. Commercially insignificant but aromatically essential — the dominant flavour of the drink. Hides the slight bitterness of the relatively low-quality green tea. Regional variations: flio (pennyroyal) in some areas, chiba (wormwood/absinthe) in the south, sage or verbena in winter, sometimes saffron.', color: '#2D6E4F' },
  { name: 'Sugar', arabic: 'سكر / sukkar', origin: 'Imported — historically French colonial supply', detail: 'Traditionally sold in large hard cones (pain de sucre), broken by hand. Moroccans add generously: 6–8 teaspoons per pot is normal. Sugar consumption deepened under the French Protectorate (1912–1956), which made it cheap and widely available to serve French commercial interests. Sugar rounds off mint\'s sweetness and brings out its aromatic compounds. The combination of foreign tea, local mint, and colonial sugar is the drink itself.', color: '#F59E0B' },
]

export interface PreparationStep {
  step: number
  name: string
  detail: string
  duration: string
}

export const PREPARATION: PreparationStep[] = [
  { step: 1, name: 'The Rinse', detail: 'Boiling water poured over gunpowder pellets in the berrad (teapot). Swirled. Discarded. Removes dust and excess bitterness.', duration: '30 sec' },
  { step: 2, name: 'The Spirit', detail: 'Fresh boiling water added. Steeped briefly. The first pour — the "roh" (spirit/soul of the tea) — is poured into a glass and set aside. This golden liquid is the most flavourful concentrate.', duration: '1 min' },
  { step: 3, name: 'The Marriage', detail: 'The spirit is returned to the pot. Fresh mint stuffed in generously — the leaves must permeate the infusion. Sugar added directly to the pot. Remaining boiling water fills it.', duration: '—' },
  { step: 4, name: 'The Steep', detail: 'Pot placed on low heat. The tea, mint, and sugar fuse. Moroccan atay uses boiling water — not the cooler temperatures of East Asian green tea preparation.', duration: '5 min' },
  { step: 5, name: 'The Pour', detail: 'Poured back and forth between pot and glass from a height of 30–50 cm. This aerates the liquid and produces the essential foam (rghwa). No foam means the tea is not ready. Repeat until it crowns.', duration: 'Until foam' },
  { step: 6, name: 'The Serve', detail: 'Three glasses, minimum. Served on a sinia (silver tray) in small decorated glasses. The head of the household or the most esteemed person pours. Refusing a glass is a discourtesy.', duration: '—' },
]

export interface HistoryEvent {
  year: string
  event: string
  detail: string
}

export const HISTORY: HistoryEvent[] = [
  { year: 'c. 9th C', event: 'Tea known in the Muslim world', detail: 'Arab and Muslim merchants active across trans-Saharan and Indian Ocean trade networks bring knowledge of tea\'s medicinal properties to the Maghreb.' },
  { year: 'c. 1700', event: 'Queen Anne\'s gift', detail: 'Queen Anne of England sends chests of green tea to Sultan Moulay Ismail as a diplomatic gesture, hoping to secure release of English captives. The sultan, already a lover of sugar, establishes a "tea division" at court.' },
  { year: '18th C', event: 'British merchants arrive', detail: 'British traders introduce Chinese gunpowder tea through Moroccan ports. Morocco already consumes mint infusions (decoctions of nanah leaves). The two meet.' },
  { year: '1850s', event: 'Crimean War — the flood', detail: 'Ports in the Baltic region close. The British East India Company diverts Chinese green tea meant for Northern Europe to Morocco. Availability surges. Consumption spreads beyond the court to the general population.' },
  { year: 'Late 19th C', event: 'Sufi resistance', detail: 'Muhammad Bin Abdul-Kabir Al-Kattani and other Sufi leaders urge followers to boycott European-imported tea and sugar. The boycott fails. Tea is already too embedded.' },
  { year: '1912–56', event: 'French Protectorate deepens sugar', detail: 'French colonial rule makes sugar the cheapest, most available caloric source. Moroccan sugar consumption rises sharply — serving French commercial interests disguised as cultural respect for the Moroccan "sweet tooth."' },
  { year: 'Early 20th C', event: 'Atay is established', detail: 'Mint tea is now the national drink. The ritual is codified: berrad, sinia, three glasses, the pour from height, the foam.' },
  { year: '1993', event: 'Market liberalisation', detail: 'Morocco liberalises its tea market. Number of brands grows rapidly. Tea consumption becomes a significant household expense.' },
  { year: '2023', event: 'China\'s top customer', detail: 'Morocco imports ~60,000 tonnes of Chinese tea annually. Remains China\'s single largest tea-export partner. Per capita consumption: 1.85 kg/year.' },
]

export const HERO_STATS = [
  { value: '~60,000', unit: 'tonnes', label: 'Annual tea imports' },
  { value: '95%', unit: '', label: 'From China' },
  { value: '1.85', unit: 'kg', label: 'Per capita / year' },
  { value: '3', unit: '', label: 'Glasses minimum' },
]

export const KEY_NUMBERS = [
  { value: '46%', label: 'Of China\'s gunpowder exports', note: 'Morocco absorbs nearly half of all gunpowder green tea China ships worldwide. Also 54% of Chunmee variety.' },
  { value: '~82,000', label: 'Tonnes average annual import', note: 'Making Morocco one of the world\'s leading tea importers despite growing none. $207M in 2021.' },
  { value: '1.85 kg', label: 'Per capita consumption', note: 'Per year. Tea is not a luxury — it is a staple consumed from dawn to dusk, in every season, at every occasion.' },
  { value: '3', label: 'Glasses served', note: 'Minimum. Traditionally: the first is gentle as life, the second strong as love, the third bitter as death.' },
  { value: '6–8 tsp', label: 'Sugar per pot', note: 'Moroccan atay is sweet. Some prefer more. The large sugar cone (pain de sucre) is still sold in souks.' },
  { value: '0', label: 'Tonnes produced domestically', note: 'Morocco grows mint, not tea. Experimental plantings in Larache (1970s) never scaled. All tea is imported.' },
]

export interface BibliographyEntry {
  author: string
  title: string
  year: string
  detail: string
}

export const BIBLIOGRAPHY: BibliographyEntry[] = [
  { author: 'Saberi, Helen', title: 'Tea: A Global History', year: '2010', detail: 'Reaktion Books. The definitive food history of tea worldwide, including the spread of gunpowder tea to North Africa through British merchants.' },
  { author: 'Benn, James A.', title: 'Tea in China: A Religious and Cultural History', year: '2015', detail: 'University of Hawai\'i Press. Traces tea from its origins in Chinese Buddhist monasteries to its global dispersion.' },
  { author: 'Liu, Tong', title: 'Chinese Tea: A Cultural History and Drinking Guide', year: '2012', detail: 'China Intercontinental Press. Covers gunpowder tea production in Zhejiang and the export trade to the Maghreb.' },
  { author: 'Silverstein, Paul', title: 'Algeria in France: Transpolitics, Race, and Nation', year: '2004', detail: 'Indiana University Press. Includes analysis of tea and coffee cultures in the Maghreb, the Fassi/Tlemceni distinction.' },
  { author: 'Mintz, Sidney', title: 'Sweetness and Power: The Place of Sugar in Modern History', year: '1985', detail: 'Penguin. The foundational text on sugar as colonial instrument. Essential context for understanding sugar in Moroccan tea.' },
  { author: 'Mack, John', title: 'The Sea: A Cultural History', year: '2011', detail: 'Reaktion Books. Trade routes connecting China, Britain, and Morocco via maritime commerce.' },
]
