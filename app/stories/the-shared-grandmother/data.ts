// ══════════════════════════════════════════════════
// THE SHARED GRANDMOTHER — DATA
// Amazigh & Sámi DNA
// Module 126
// ══════════════════════════════════════════════════

// ── THE COMPARISON ──

export interface ComparisonRow {
  label: string
  amazigh: string
  sami: string
  note?: string
}

export const COMPARISON: ComparisonRow[] = [
  { label: 'Signature Y-DNA', amazigh: 'E-M81 (up to 80–98%)', sami: 'N1c (up to 60%)', note: 'Completely different paternal origins. E-M81 is North African. N1c traces to Siberia via the Volga-Ural region.' },
  { label: 'Shared mtDNA', amazigh: 'U5b1b (~2%)', sami: 'U5b1b1 (~48%)', note: 'The connection. This maternal branch is ~9,000 years old. Highest frequencies on earth are found in these two populations.' },
  { label: 'Population', amazigh: '~30–40 million', sami: '~80,000–100,000' },
  { label: 'Territory', amazigh: 'Sahara, Atlas, Mediterranean coast', sami: 'Arctic Fennoscandia, Kola Peninsula' },
  { label: 'Latitude range', amazigh: '15°N to 37°N', sami: '62°N to 71°N' },
  { label: 'Climate', amazigh: 'Desert to Mediterranean', sami: 'Subarctic to Arctic' },
  { label: 'Temperature extremes', amazigh: '+50°C summers, –10°C Atlas winters', sami: '–40°C winters, +25°C brief summers' },
  { label: 'Political status', amazigh: 'Indigenous, multi-state (Morocco, Algeria, Tunisia, Libya, Mali, Niger, Burkina Faso)', sami: 'Indigenous, multi-state (Norway, Sweden, Finland, Russia)' },
  { label: 'Language family', amazigh: 'Afroasiatic (Tamazight)', sami: 'Uralic (Sámi, 9 distinct languages)' },
  { label: 'Script', amazigh: 'Tifinagh (ancient, revived)', sami: 'Latin adaptation (no indigenous script survived)' },
  { label: 'Traditional economy', amazigh: 'Pastoral, agricultural, trans-Saharan trade', sami: 'Reindeer herding, fishing, hunting' },
  { label: 'Animal partner', amazigh: 'Camel, goat, sheep', sami: 'Reindeer (~260,000 in Sweden alone)' },
  { label: 'Built empires?', amazigh: 'No. Served in all of them.', sami: 'No. Preceded all of them.' },
  { label: 'Genetic classification', amazigh: '"Extreme outliers" within African populations', sami: '"Extreme outliers" within European populations' },
  { label: 'Self-name', amazigh: 'Imazighen — "the free people"', sami: 'Sámi (origin debated)' },
  { label: 'Colonial experience', amazigh: 'Phoenician, Roman, Arab, Ottoman, French, Spanish', sami: 'Norwegian, Swedish, Finnish, Russian' },
  { label: 'Forced assimilation', amazigh: 'Arabisation policies, Berber language bans (repealed)', sami: 'Norwegianisation, nomad schools, "racial biology" studies, language bans' },
  { label: 'Legal recognition', amazigh: 'Constitutional recognition in Morocco (2011), Algeria (2016)', sami: 'Constitutional recognition in Norway, Sweden, Finland. Three Sámi parliaments.' },
  { label: 'UNESCO protections', amazigh: 'Multiple sites (Tassili n\'Ajjer, Djémila, etc.)', sami: 'Sámi yoik added to Memory of World Register (2025)' },
]

// ── DNA DATA ──

export interface HaplogroupData {
  name: string
  type: 'paternal' | 'maternal'
  origin: string
  age: string
  detail: string
  people: 'amazigh' | 'sami' | 'shared'
  frequency: string
}

export const HAPLOGROUPS: HaplogroupData[] = [
  // Paternal — Amazigh
  { name: 'E-M81 (E1b1b1b)', type: 'paternal', origin: 'North Africa', age: '~5,600 years (TMRCA ~2,000–3,000 years for M183 subclade)', detail: 'The Berber marker. Found in 80–98% of Berber-speaking males in Morocco. Frequency decreases eastward: ~10% in Egypt. Found at low levels in Iberia (5.6%), Sicily (6.6%), and southern Italy (3.6%) — traces of Al-Andalus and the Islamic period. Also found in Tuareg populations of Mali and Burkina Faso at 77–82%. Virtually absent elsewhere on earth.', people: 'amazigh', frequency: '80–98% in Berber males' },
  { name: 'E-M78 (E1b1b1a)', type: 'paternal', origin: 'Northeast Africa', age: '>10,000 years', detail: 'Second most common Amazigh paternal line. Higher in eastern North Africa, declining westward — the mirror image of E-M81. Found in the Balkans and southern Europe, likely via Neolithic migration.', people: 'amazigh', frequency: '~15–30% in some North African groups' },
  // Paternal — Sámi
  { name: 'N1c (N-M178)', type: 'paternal', origin: 'Siberia / Volga-Ural region', age: 'Arrived in Fennoscandia ~3,500 years ago', detail: 'The dominant Sámi paternal line. Originated near the Altai Mountains, expanded westward during the Bronze Age with Uralic-speaking peoples. The Sámi carry a distinct subset (N1c-L1025) different from Finnish or Estonian N1c. Also found in Finns (61%), Estonians (34%), Latvians (38%), Lithuanians (42%), Yakuts (90%). The Rurik dynasty of medieval Russia also carried N1c.', people: 'sami', frequency: '~35–60% in Sámi males' },
  { name: 'I1 (I-M253)', type: 'paternal', origin: 'Mesolithic Europe', age: '>10,000 years', detail: 'Second most common Sámi paternal line. Shared with Scandinavian populations — likely absorbed through contact with Norse/Swedish settlers from the Iron Age onward. Found in 20–30% of Sámi men.', people: 'sami', frequency: '~20–30% in Sámi males' },
  // Maternal — SHARED
  { name: 'U5b1b', type: 'maternal', origin: 'Franco-Cantabrian refuge, southwestern Europe', age: '~9,000 years', detail: 'The shared grandmother. This mitochondrial DNA branch connects two populations 5,000 km apart. U5b1b reaches ~48% in some Sámi groups and ~2% in Berber populations. It also appears at low frequencies in the Fulbe of West Africa and in Iberian populations. The paper that identified this link — Achilli et al. (2005) — titled it "An Unexpected Mitochondrial DNA Link." The branch traces to hunter-gatherers who sheltered in the Franco-Cantabrian refuge during the Last Glacial Maximum (~20,000 years ago). When the ice retreated, they moved in two directions: north to Scandinavia, south across Gibraltar to North Africa.', people: 'shared', frequency: '~48% Sámi / ~2% Berber' },
  { name: 'U5b1b1', type: 'maternal', origin: 'From U5b1b, differentiated in northern Europe', age: '~5,500–7,600 years', detail: 'The Sámi-dominant subclade. Found at highest frequencies among Norwegian Sámi (56.8%) and Finnish Sámi (40.6%). One of Europe\'s oldest maternal lineages — U5 itself dates to over 30,000 years ago, found in remains across Mesolithic Europe. U5b1b1 is found almost exclusively among Sámi and populations with Sámi ancestry in Scandinavia.', people: 'sami', frequency: '~40–57% in Sámi women' },
  // Other maternal
  { name: 'Haplogroup V', type: 'maternal', origin: 'Southwestern Europe', age: '~7,600 years (Sámi divergence)', detail: 'Also common in Sámi. Found in the Basques and Cantabrians of Spain, the Maris of Russia, and at low frequencies across Europe. Another Franco-Cantabrian refuge lineage that went both north and south. Present in some Berber groups.', people: 'shared', frequency: 'Variable — present in both' },
]

// ── THE REFUGE ──

export interface RefugeEvent {
  year: string
  sortYear: number
  title: string
  detail: string
  type: 'glacial' | 'migration' | 'genetic' | 'modern'
}

export const TIMELINE: RefugeEvent[] = [
  { year: '~45,000 BP', sortYear: -45000, title: 'Modern humans reach Europe', detail: 'Homo sapiens arrive in Europe from Africa via the Middle East. They carry haplogroup U, which will become the foundation of European maternal genetics.', type: 'migration' },
  { year: '~30,000 BP', sortYear: -30000, title: 'U5 appears', detail: 'Haplogroup U5 emerges in Europe. It is one of the oldest European maternal lineages. Found in remains across the continent from this period onward.', type: 'genetic' },
  { year: '~26,000 BP', sortYear: -26000, title: 'Last Glacial Maximum begins', detail: 'Ice sheets advance across northern Europe. Scandinavia is buried under 3 km of ice. Humans retreat to refugia — pockets of habitable land in southern Europe.', type: 'glacial' },
  { year: '~20,000 BP', sortYear: -20000, title: 'Franco-Cantabrian refuge', detail: 'The most important refuge area: southwestern France and northern Spain. Lascaux, Altamira, the Dordogne. The people who shelter here carry U5b, haplogroup V, H1, and H3. They are the ancestors of both the Sámi and the Amazigh.', type: 'glacial' },
  { year: '~15,000 BP', sortYear: -15000, title: 'Ice retreats, humans radiate', detail: 'As temperatures rise, hunter-gatherers leave the refuge. They move in multiple directions: north along the Atlantic coast toward Scandinavia, east into central Europe, and south across the Strait of Gibraltar into North Africa.', type: 'migration' },
  { year: '~12,000 BP', sortYear: -12000, title: 'First humans reach northern Scandinavia', detail: 'The earliest settlers of what is now Sápmi arrive. They carry U5b1b and haplogroup V — Franco-Cantabrian refuge lineages. Archaeological artifacts in northern Sweden date to this period.', type: 'migration' },
  { year: '~9,000 BP', sortYear: -9000, title: 'U5b1b branch point', detail: 'The shared branch between Sámi and Berber populations dates to approximately this period. The ancestral population has already split: one group in the north, one in the south. But the maternal signature remains.', type: 'genetic' },
  { year: '~7,000 BP', sortYear: -7000, title: 'Neolithic farmers arrive in Europe', detail: 'Farmers from the Middle East spread across Europe, displacing and absorbing hunter-gatherer populations. But in the far north (Sápmi) and the far south (the Maghreb), the hunter-gatherer lineages persist. The extremes of the continent become genetic refuges.', type: 'migration' },
  { year: '~5,600 BP', sortYear: -5600, title: 'E-M81 emerges in North Africa', detail: 'The Berber paternal marker E-M81 emerges or begins rapid expansion. The Amazigh become genetically distinct on their paternal side, while retaining ancient maternal lineages including U5b1b.', type: 'genetic' },
  { year: '~3,500 BP', sortYear: -3500, title: 'N1c arrives in Fennoscandia', detail: 'Uralic-speaking peoples from the Volga-Ural region bring haplogroup N1c to Scandinavia. The Sámi absorb this paternal lineage while retaining their ancient maternal lines (U5b1b1, V). The same pattern: new fathers, old mothers.', type: 'genetic' },
  { year: '2005 CE', sortYear: 2005, title: 'Achilli et al. publish "An Unexpected Link"', detail: 'Achilli, Rengo, Battaglia et al. publish in the American Journal of Human Genetics: "Saami and Berbers — An Unexpected Mitochondrial DNA Link." The 9,000-year-old maternal connection between the Sahara and the Arctic is identified for the first time.', type: 'modern' },
]

// ── MAP LOCATIONS ──

export interface MapLocation {
  name: string
  coords: [number, number]
  type: 'amazigh' | 'sami' | 'refuge' | 'route'
  detail: string
}

export const LOCATIONS: MapLocation[] = [
  // Refuge
  { name: 'Franco-Cantabrian Refuge', coords: [-1.0, 43.5], type: 'refuge', detail: 'Southwestern France / northern Spain. Lascaux, Altamira, the Dordogne. The shelter where the shared ancestor lived during the Last Glacial Maximum. The source of U5b1b, haplogroup V, H1, H3.' },
  { name: 'Strait of Gibraltar', coords: [-5.6, 35.95], type: 'route', detail: '14 km of water. The crossing point for hunter-gatherers moving south from the Franco-Cantabrian refuge into North Africa. The U5b1b lineage crossed here ~9,000–15,000 years ago.' },
  // Amazigh
  { name: 'Atlas Mountains, Morocco', coords: [-6.0, 31.5], type: 'amazigh', detail: 'Heart of Amazigh territory. E-M81 frequency reaches 80–98% in Berber-speaking communities. Some of the most genetically isolated populations in North Africa.' },
  { name: 'Kabylie, Algeria', coords: [4.0, 36.7], type: 'amazigh', detail: 'Kabyle Berber region. Among the highest E-M81 frequencies globally. Maintained genetic distinctiveness through mountain isolation.' },
  { name: 'Tuareg, Mali/Niger', coords: [2.0, 17.0], type: 'amazigh', detail: 'Saharan Tuareg populations. E-M81 at 77–82%. The same paternal marker as the Atlas Berbers, carried across the Sahara.' },
  { name: 'Siwa Oasis, Egypt', coords: [25.5, 29.2], type: 'amazigh', detail: 'Easternmost Amazigh outpost. E-M81 drops to ~1% here — the gradient\'s end. Linguistic island: Siwi is the only Berber language spoken in Egypt.' },
  // Sámi
  { name: 'Finnmark, Norway', coords: [25.0, 70.0], type: 'sami', detail: 'Highest concentration of Sámi in Norway. Norwegian Sámi show U5b1b1 at 56.8% — the highest anywhere on earth.' },
  { name: 'Kola Peninsula, Russia', coords: [35.0, 68.0], type: 'sami', detail: 'Eastern Sámi territory. Ancient DNA from Bolshoy Oleni Ostrov cemetery (~3,500 years ago) shows significant Siberian ancestry mixed with ancient European lineages. N1c first appears here.' },
  { name: 'Jokkmokk, Sweden', coords: [19.8, 66.6], type: 'sami', detail: 'Lule Sámi heartland. Annual Sámi market since 1605. Reindeer herding remains central. Swedish Sámi show lower U5b1b1 (~35%) due to more admixture with Swedish populations.' },
  { name: 'Inari, Finland', coords: [27.0, 69.1], type: 'sami', detail: 'Finnish Sámi territory. Three distinct Sámi languages spoken in one municipality: Northern, Inari, and Skolt Sámi. Finnish Sámi show U5b1b1 at ~40.6%.' },
]

export const BIBLIOGRAPHY = [
  'Achilli, A., Rengo, C., Battaglia, V. et al. (2005). "Saami and Berbers — An Unexpected Mitochondrial DNA Link." American Journal of Human Genetics, 76(5), 883–886.',
  'Tambets, K., Rootsi, S., Kivisild, T. et al. (2004). "The western and eastern roots of the Saami — the story of genetic outliers told by mitochondrial DNA and Y chromosomes." American Journal of Human Genetics, 74(4), 661–682.',
  'Reguig, A., Harich, N. et al. (2014). "Phylogeography of E1b1b1b-M81 Haplogroup and Analysis of Its Subclades in Morocco." Human Biology, 86(2), 105–112.',
  'Solé-Morata, N., García-Fernández, C. et al. (2017). "Whole Y-chromosome sequences reveal an extremely recent origin of the most common North African paternal lineage E-M183 (M81)." Scientific Reports, 7, 15941.',
  'Ingman, M. & Gyllensten, U. (2007). "A recent genetic link between Sami and the Volga-Ural region of Russia." European Journal of Human Genetics, 15(1), 115–120.',
  'Semino, O. et al. (2004). "Origin, diffusion, and differentiation of Y-chromosome haplogroups E and J." American Journal of Human Genetics, 74(5), 1023–1034.',
  'Bosch, E. et al. (2001). "High-resolution analysis of human Y-chromosome variation shows a sharp discontinuity and limited gene flow between northwestern Africa and the Iberian Peninsula." American Journal of Human Genetics, 68(4), 1019–1029.',
  'Lamnidis, T.C. et al. (2018). "Ancient Fennoscandian genomes reveal origin and spread of Siberian ancestry in Europe." Nature Communications, 9, 5018.',
  'IWGIA (2025). The Indigenous World 2025: Sápmi.',
]
