// ══════════════════════════════════════════════════
// THE GUANCHE GHOST — DATA
// Europe's First Colonial Genocide
// Module 127
// ══════════════════════════════════════════════════

// ── THE ISLANDS ──

export interface IslandData {
  name: string
  nativeName: string
  nativePeople: string
  coords: [number, number]
  area: string
  population?: string
  conquestYear: number
  detail: string
  menceyatos?: number
}

export const ISLANDS: IslandData[] = [
  { name: 'Lanzarote', nativeName: 'Titerogaka', nativePeople: 'Majos', coords: [-13.63, 29.05], area: '846 km²', conquestYear: 1402, detail: 'First island conquered. Jean de Béthencourt, a Norman mercenary backed by Castile, landed on 1 July 1402. Built a fortress and began raiding. The population was small and weakened by prior slave raids. Fell quickly.', },
  { name: 'Fuerteventura', nativeName: 'Erbania', nativePeople: 'Majoreros', coords: [-14.02, 28.36], area: '1,660 km²', conquestYear: 1405, detail: 'Second to fall. Béthencourt used alliances with some native leaders against others. Divided, the Majoreros could not resist. Fell by 1405.', },
  { name: 'El Hierro', nativeName: 'Esero', nativePeople: 'Bimbaches', coords: [-18.0, 27.75], area: '269 km²', conquestYear: 1405, detail: 'Smallest island. The Bimbache population was estimated at only 1,000–2,000. Taken by Béthencourt with minimal resistance. Many enslaved.', },
  { name: 'La Gomera', nativeName: 'Gomera', nativePeople: 'Gomeros', coords: [-17.23, 28.1], area: '370 km²', conquestYear: 1488, detail: 'Not conquered by battle but incorporated through agreements — and then betrayed. Repeated uprisings. In 1488, Hernán Peraza the Younger was killed by Gomeros. His widow called in Pedro de Vera, who killed 200 rebels and sold many into slavery. Columbus stopped here in 1492 to resupply before crossing the Atlantic. The Guanche were still holding out on other islands when he left.', },
  { name: 'Gran Canaria', nativeName: 'Tamarán', nativePeople: 'Canarios', coords: [-15.43, 27.96], area: '1,560 km²', population: '~30,000 pre-conquest', conquestYear: 1483, detail: 'The wealthiest and most densely populated island. Five years of brutal war (1478–1483). Pedro de Vera led the conquest. The guanarteme (king) Fernando Guanarteme eventually surrendered and was baptised. Mass enslavement followed. Indigenous ancestry in modern Gran Canarians: 16–31% autosomal (Rodríguez-Varela et al. 2017).', menceyatos: 2 },
  { name: 'La Palma', nativeName: 'Benahoare', nativePeople: 'Auaritas', coords: [-17.87, 28.68], area: '706 km²', conquestYear: 1493, detail: 'Alonso Fernández de Lugo conquered it with treachery. The last chief, Tanausú, was lured to a supposed peace negotiation and captured. He refused to eat on the ship taking him to Spain and died. Modern La Palma shows 41% indigenous autosomal ancestry — second highest in the archipelago.', },
  { name: 'Tenerife', nativeName: 'Achinet', nativePeople: 'Guanches (stricto sensu)', coords: [-16.55, 28.27], area: '2,034 km²', population: '~15,000–30,000 pre-conquest', conquestYear: 1496, detail: 'The last island to fall. Nine menceyatos (kingdoms). Alonso Fernández de Lugo invaded in 1494. At the First Battle of Acentejo (31 May 1494), the Guanche ambushed the Castilians in a valley — only one in five Spanish soldiers survived. Lugo returned with southern mencey allies and defeated the northern kingdoms at the Second Battle of Acentejo (1495). Bentor, last Mencey of Taoro, threw himself from a cliff rather than surrender. Tenerife fell in 1496. The ninety-four-year conquest was complete.', menceyatos: 9 },
]

// ── THE NINE MENCEYATOS OF TENERIFE ──

export interface Menceyato {
  name: string
  mencey: string
  territory: string
  stance: 'resistance' | 'alliance' | 'neutral'
  detail: string
}

export const MENCEYATOS: Menceyato[] = [
  { name: 'Taoro', mencey: 'Bencomo (then Bentor)', territory: 'La Orotava Valley', stance: 'resistance', detail: 'The most powerful menceyato. Bencomo led the resistance at the First Battle of Acentejo. His son Bentor threw himself from a cliff rather than submit after the final defeat. "Vacaguaré" — he reportedly cried, meaning "I want to die" in Guanche.' },
  { name: 'Anaga', mencey: 'Beneharo', territory: 'Anaga peninsula', stance: 'resistance', detail: 'Rugged mountain territory. Beneharo joined Bencomo in resistance. The terrain made conquest difficult.' },
  { name: 'Tegueste', mencey: 'Tegueste II', territory: 'Modern Tegueste / La Laguna', stance: 'resistance', detail: 'Guerrilla fighters. The terrain of ravines and forests favoured ambush tactics.' },
  { name: 'Tacoronte', mencey: 'Acaymo', territory: 'Modern Tacoronte', stance: 'resistance', detail: 'Joined the northern alliance against the Spanish.' },
  { name: 'Icod', mencey: 'Pelicar', territory: 'Modern Icod de los Vinos', stance: 'resistance', detail: 'Northwestern menceyato. Held out with Taoro.' },
  { name: 'Daute', mencey: 'Romen', territory: 'Modern Buenavista', stance: 'neutral', detail: 'Western coast. Position unclear during the final battles.' },
  { name: 'Güímar', mencey: 'Añaterve', territory: 'Modern Güímar', stance: 'alliance', detail: 'Allied with the Spanish. The mencey of Güímar was baptised and cooperated with Lugo. This is the pattern: some accept, some resist. Both are destroyed.' },
  { name: 'Abona', mencey: 'Adjona', territory: 'Southern Tenerife', stance: 'alliance', detail: 'Southern menceyato. Allied with the Spanish.' },
  { name: 'Adeje', mencey: 'Pelinor', territory: 'Modern Adeje', stance: 'alliance', detail: 'Southwestern coast. Cooperated with the invaders.' },
]

// ── DNA ──

export interface DnaMarker {
  name: string
  type: 'paternal' | 'maternal'
  context: string
  ancientFreq: string
  modernFreq: string
  detail: string
}

export const DNA_MARKERS: DnaMarker[] = [
  { name: 'E-M183 (E-M81)', type: 'paternal', context: 'The Berber marker', ancientFreq: '~27% of ancient Guanche males', modernFreq: '~8.3% of modern Canarian males', detail: 'The same haplogroup found at 80–98% in Moroccan Berber populations. Three ancient Guanche males sequenced all carried E-M183. Modern Canarian males show 8.3% — meaning male Guanche lineages have been largely replaced by European ones. The men were killed or displaced. The women survived.' },
  { name: 'E-M78', type: 'paternal', context: 'Northeast African', ancientFreq: '~23% of ancient Guanche males', modernFreq: 'Low', detail: 'Second most common Guanche paternal line. Found across North Africa, the Balkans, and southern Europe. Confirms northeastern African connections.' },
  { name: 'J-M267', type: 'paternal', context: 'Middle Eastern / North African', ancientFreq: '~17% of ancient Guanche males', modernFreq: 'Low', detail: 'Also found in Berber populations. Part of the North African male genetic package.' },
  { name: 'R1b', type: 'paternal', context: 'European', ancientFreq: '~10% of ancient Guanche males', modernFreq: '~50.6% of modern Canarian males', detail: 'The dominant European male lineage — now 50.6% of Canarian men. Was present at low levels even before conquest, suggesting earlier Mediterranean contact. After 1496, it replaced indigenous lineages.' },
  { name: 'U6b1a', type: 'maternal', context: 'Canary Islands endemic', ancientFreq: 'Present in ancient remains', modernFreq: 'Present in modern Canarians', detail: 'A mitochondrial lineage hypothesised to be endemic to and a founder lineage of the Canary Islands. Found in ancient Tenerife and Gran Canaria remains. Not found in mainland African populations — it evolved in isolation on the islands.' },
  { name: 'U6b', type: 'maternal', context: 'North African', ancientFreq: 'Common in ancient Guanche', modernFreq: '~14% U6 total in modern Canarians', detail: 'The phylogenetically closest ancestor of U6b1a, found in North Africa. Present in Guanche remains but NOT in modern Canary Islands — meaning the mainland lineage was replaced by U6b1a on the islands over centuries of isolation.' },
  { name: 'H1, H3, J1c3, T2c1', type: 'maternal', context: 'West Eurasian / North African', ancientFreq: 'Present in ancient remains', modernFreq: 'Common', detail: 'Standard West Eurasian maternal lineages also found in North Africa. The female Guanche genetic signature survived the conquest at much higher rates than the male one.' },
]

// ── THE GENETIC ASYMMETRY ──

export interface GeneticSurvival {
  label: string
  indigenous: string
  european: string
  note: string
}

export const GENETIC_ASYMMETRY: GeneticSurvival[] = [
  { label: 'Autosomal (whole genome)', indigenous: '16–31%', european: '69–84%', note: 'Rodríguez-Varela et al. 2017. Measured from Gran Canaria. Varies by island: La Gomera 55.5%, La Palma 41%, Tenerife 22%, El Hierro 0%.' },
  { label: 'Paternal (Y-DNA)', indigenous: '~14% (E-M81 + E-M78)', european: '~67% (R1b + I + J + G)', note: 'Indigenous male lineages dropped constantly, replaced by European ones. The conquest killed men.' },
  { label: 'Maternal (mtDNA)', indigenous: '~20% (U6 + L haplogroups)', european: '~80%', note: 'Indigenous female lineages survived at significantly higher rates than male ones. Sex-biased colonial violence: men killed, women absorbed.' },
]

// ── WHAT SURVIVED ──

export interface Survival {
  name: string
  type: 'language' | 'food' | 'sport' | 'practice' | 'dna' | 'belief'
  detail: string
  status: 'alive' | 'trace' | 'extinct'
}

export const SURVIVALS: Survival[] = [
  { name: 'Silbo Gomero', type: 'language', detail: 'A whistled language that carries up to 5 km across volcanic ravines. Invented by the Guanche, adapted to Spanish in the 16th century after the original Guanche language died. UNESCO Intangible Cultural Heritage since 2009. Taught in all La Gomera schools since 1999. Over 22,000 speakers. Six sounds — two vowels, four consonants — expressing more than 4,000 words. The only surviving whistle of a dead people, now carrying the language of their conquerors.', status: 'alive' },
  { name: 'Gofio', type: 'food', detail: 'Toasted grain flour — barley, wheat, or maize — mixed with water, milk, or honey. The Guanche staple food. Still eaten daily across the Canary Islands. Found in every supermarket, every restaurant, every home. The conquerors killed the culture but kept the recipe.', status: 'alive' },
  { name: 'Lucha canaria', type: 'sport', detail: 'Canarian wrestling. Two opponents in a sand circle (terrero), grip each other\'s shorts, try to force any part of the body above the knee to touch the ground. Pre-Hispanic origin. Still practised competitively across the islands. Official sport of the Canary Islands.', status: 'alive' },
  { name: 'Salto del pastor', type: 'sport', detail: 'Shepherd\'s leap. Using a long wooden pole (astia/lance) to vault across ravines and descend cliffs. Guanche herders invented it to navigate volcanic terrain. Now a competitive sport and tourist attraction.', status: 'alive' },
  { name: 'Guanche language', type: 'language', detail: 'Extinct since the 17th century. A few hundred words survive — mostly place names, proper nouns, and terms recorded by Spanish chroniclers. Believed to be related to the Berber/Tamazight language family based on vocabulary and numeral comparisons. No grammar survived. No texts. No speakers.', status: 'extinct' },
  { name: 'Mummification', type: 'practice', detail: 'The Guanche embalmed their elite dead using pine resin, dragon tree sap, aromatic herbs, and goat-skin wrappings. On Tenerife, mummies were placed in hidden caves — one cave reportedly held 1,000 bodies. Only ~20 complete mummies survive. Many were ground into pharmaceutical powder ("mummia") in Europe. CT scans show some preserved organs intact, including brains — better preserved than Egyptian equivalents.', status: 'extinct' },
  { name: 'Pottery (El Cercado)', type: 'practice', detail: 'Women in the village of El Cercado on La Gomera still make pottery using Guanche techniques — without a wheel, coil-built, fired in the open. The only place in the Canary Islands where pre-Hispanic pottery methods survive unbroken.', status: 'alive' },
  { name: 'Guanche DNA', type: 'dna', detail: 'E-M81 and E-M183 in modern Canarian men. U6b1a in modern Canarian women. 16–55% autosomal ancestry depending on island. Found in Puerto Rico at ~15% via Canarian emigration to the Americas. The Guanche crossed the Atlantic twice — once to the islands, once inside the blood of their conquerors\' descendants.', status: 'alive' },
  { name: 'Place names', type: 'language', detail: 'Tenerife (from Achinet), Taoro, Tegueste, Güímar, Anaga, Adeje, Abona, Icod, Daute, Tacoronte, Gomera, Benahoare. The names outlasted the people who gave them.', status: 'alive' },
  { name: 'Beñesmen (August festival)', type: 'belief', detail: 'The Guanche harvest festival, held in August, coincided with the worship of Chaxiraxi (mother goddess). After conquest, it was absorbed into the Catholic feast of the Virgin of Candelaria on August 15. The date, the place, the celebration — all survive. The meaning was overwritten.', status: 'trace' },
]

// ── TIMELINE ──

export interface TimelineEvent {
  year: string
  sortYear: number
  title: string
  detail: string
  type: 'settlement' | 'contact' | 'conquest' | 'aftermath' | 'modern'
}

export const TIMELINE: TimelineEvent[] = [
  { year: '~1000 BCE', sortYear: -1000, title: 'First settlers arrive', detail: 'Berber-speaking peoples from North Africa reach the Canary Islands, likely via Phoenician or early Mauretanian vessels. They bring goats, sheep, barley, pottery — but no metals, no wheels, no maritime knowledge. Over time, they lose the ability to build boats. They are marooned.', type: 'settlement' },
  { year: '~5th c. BCE', sortYear: -500, title: 'Earliest archaeological evidence', detail: 'Radiocarbon dates on charcoal, seeds, and domestic animal bones confirm human habitation from the 5th century BCE onward. Each island develops separately — different dialects, different governance, different customs.', type: 'settlement' },
  { year: '~50 BCE', sortYear: -50, title: 'Juba II sends expedition', detail: 'King Juba II of Mauretania (modern Morocco/Algeria) sends an expedition. Pliny the Elder records they found ruins of great buildings but no current inhabitants on some islands. The Guanche and the mainland have lost contact.', type: 'contact' },
  { year: '1st–4th c. CE', sortYear: 100, title: 'Roman contact', detail: 'Roman artifacts found on Lanzarote and surrounding islets. Sporadic contact during Roman North Africa. No permanent settlement.', type: 'contact' },
  { year: '1341', sortYear: 1341, title: 'Recco expedition maps the islands', detail: 'Genoese captain Nicoloso da Recco leads a Portuguese-sponsored expedition. Maps 13 islands. Records the first description of the Guanche language. Brings four natives back to Lisbon. European interest in slave-raiding begins immediately.', type: 'contact' },
  { year: '1402', sortYear: 1402, title: 'Béthencourt invades Lanzarote', detail: 'Norman mercenary Jean de Béthencourt, backed by Castile, lands on Lanzarote on 1 July 1402. Builds a fortress. Begins the conquest. Mohamed Adhikari calls this "Europe\'s first overseas settler colonial genocide."', type: 'conquest' },
  { year: '1405', sortYear: 1405, title: 'Fuerteventura and El Hierro fall', detail: 'Béthencourt uses alliances and division to conquer the eastern islands. Hundreds enslaved and sold in Spanish markets.', type: 'conquest' },
  { year: '1478–1483', sortYear: 1478, title: 'Conquest of Gran Canaria', detail: 'Five years of war. Pedro de Vera leads the campaign. The wealthiest island fights hard. Guanarteme Fernando Guanarteme eventually surrenders and is baptised. Mass enslavement follows. Slave markets established in Las Palmas.', type: 'conquest' },
  { year: '1488', sortYear: 1488, title: 'La Gomera uprising', detail: 'Hernán Peraza the Younger is killed by Gomero rebels. His widow calls in Pedro de Vera. 200 rebels executed. Many sold into slavery.', type: 'conquest' },
  { year: '1492', sortYear: 1492, title: 'Columbus stops at La Gomera', detail: 'Columbus resupplies at La Gomera before crossing the Atlantic. The Guanche are still holding out on Tenerife and La Palma. The template for the Americas — enslavement, disease, deportation, sugar plantations — is already running in the Canaries.', type: 'conquest' },
  { year: '1493', sortYear: 1493, title: 'La Palma conquered by treachery', detail: 'Alonso Fernández de Lugo lures the last chief Tanausú to a peace negotiation and captures him. Tanausú starves himself to death on the ship to Spain.', type: 'conquest' },
  { year: '31 May 1494', sortYear: 1494, title: 'First Battle of Acentejo — La Matanza', detail: 'The Guanche of Tenerife ambush Lugo\'s forces in a valley. Four out of five Spanish soldiers are killed. The town is still called La Matanza — "the slaughter." Lugo barely escapes. It is the Guanche\'s greatest victory.', type: 'conquest' },
  { year: '1495', sortYear: 1495, title: 'Second Battle of Acentejo', detail: 'Lugo returns with allied southern menceys and fresh troops. Defeats the northern menceyatos. Bentor, last Mencey of Taoro, refuses to surrender. He climbs a cliff and jumps. "Vacaguaré" — "I want to die."', type: 'conquest' },
  { year: '1496', sortYear: 1496, title: 'Tenerife falls. Conquest complete.', detail: 'The Peace of Los Realejos. After 94 years, all seven islands are under Castilian control. The sugar economy begins. The template is exported to the Caribbean.', type: 'conquest' },
  { year: '1498', sortYear: 1498, title: 'Catholic Monarchs order Guanche freedom', detail: 'Isabella and Ferdinand order the freeing of enslaved Guanche who have been baptised. Encomienda (forced labour) replaces outright slavery. The distinction is legal, not practical.', type: 'aftermath' },
  { year: '~1520', sortYear: 1520, title: 'Last enslaved Guanche freed', detail: 'Guanche encomienda ends. Replaced by African chattel slavery on the sugar plantations. The Canaries become a waystation in the Atlantic slave trade.', type: 'aftermath' },
  { year: '~1600', sortYear: 1600, title: 'Guanche effectively extinct as a people', detail: 'Disease, slavery, deportation, forced conversion, and intermarriage have eliminated the Guanche as a distinct cultural group. The language survives in fragments. The DNA survives in the population. The culture is overwritten.', type: 'aftermath' },
  { year: '17th c.', sortYear: 1650, title: 'Last Guanche speakers die', detail: 'The language is extinct. Only recorded words, place names, and personal names survive. Silbo Gomero adapts to Spanish, preserving the whistle but losing the original tongue.', type: 'aftermath' },
  { year: '2004', sortYear: 2004, title: 'First ancient mtDNA study', detail: 'Maca-Meyer et al. analyse ancient Guanche mitochondrial DNA. Confirm North African/Berber origin. Discover U6b1a as an endemic Canary Islands lineage.', type: 'modern' },
  { year: '2009', sortYear: 2009, title: 'Silbo Gomero: UNESCO heritage', detail: 'UNESCO declares Silbo Gomero an Intangible Cultural Heritage of Humanity. 22,000 speakers. Taught in every school on La Gomera. The whistle survives.', type: 'modern' },
  { year: '2017', sortYear: 2017, title: 'First genome-wide Guanche study', detail: 'Rodríguez-Varela et al. publish the first autosomal ancient DNA from Guanche remains. Confirm closest genetic affinity to modern Northwest African Berbers. Estimate 16–31% Guanche ancestry in modern Gran Canarians. E-M183 found in all three sequenced males — the Berber marker, 100 km off the African coast.', type: 'modern' },
]

export const BIBLIOGRAPHY = [
  'Rodríguez-Varela, R., Günther, T., Krzewińska, M. et al. (2017). "Genomic Analyses of Pre-European Conquest Human Remains from the Canary Islands Reveal Close Affinity to Modern North Africans." Current Biology, 27(21), 3396–3402.',
  'Maca-Meyer, N., Arnay, M., Rando, J. et al. (2004). "Ancient mtDNA analysis and the origin of the Guanches." European Journal of Human Genetics, 12, 155–162.',
  'Fregel, R., Gomes, V., Gusmão, L. et al. (2009). "Demographic history of Canary Islands male gene-pool: replacement of native lineages by European." BMC Evolutionary Biology, 9, 181.',
  'Adhikari, M. (2017). "Europe\'s First Settler Colonial Incursion into Africa: The Genocide of Aboriginal Canary Islanders." African Historical Review, 49(1), 1–26.',
  'Conversi, D. (2020). "The Spanish Destruction of the Canary Islands." In The Cambridge World History of Genocide, Vol. II, pp. 594–621.',
  'Crosby, A. W. (2004). Ecological Imperialism: The Biological Expansion of Europe, 900–1900. Cambridge University Press.',
  'UNESCO (2009). "Whistled language of the island of La Gomera (Canary Islands), the Silbo Gomero." Representative List of the Intangible Cultural Heritage of Humanity.',
  'Pliny the Elder. Natural History, Book VI.',
]
