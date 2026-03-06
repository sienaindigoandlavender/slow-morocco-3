'use client'

import { useState, useEffect, useRef } from 'react'

// ═══════════════════════════════════════════════════
// THE COLOUR INDEX — Morocco's Chromatic DNA
// Module 044 · Slow Morocco
// ═══════════════════════════════════════════════════

// ─── COLOUR SYSTEM ───

const C = {
  ink: '#0a0a0a', text: '#262626', muted: '#737373', border: '#e5e5e5',
  bg: '#FAFAF8',
}

function useReveal() {
  const ref = useRef<HTMLDivElement>(null)
  const [vis, setVis] = useState(false)
  useEffect(() => {
    const el = ref.current; if (!el) return
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVis(true); obs.disconnect() } }, { threshold: 0.1 })
    obs.observe(el); return () => obs.disconnect()
  }, [])
  return { ref, vis }
}

// ─── COLOUR DATA ───

type ColourCategory = 'city' | 'craft' | 'earth' | 'sacred' | 'textile' | 'food'

interface MoroccanColour {
  name: string
  arabic?: string
  hex: string
  pantone?: string
  category: ColourCategory
  source: string
  where: string
  meaning: string
  chemistry?: string
  city?: string
  note?: string
  featured?: boolean
}

const CATEGORY_META: Record<ColourCategory, { label: string; color: string }> = {
  city: { label: 'City Signatures', color: '#8B3A3A' },
  craft: { label: 'Craft & Tile', color: '#1B6B4A' },
  earth: { label: 'Earth & Stone', color: '#9A7B4F' },
  sacred: { label: 'Sacred & Symbolic', color: '#1A4A6E' },
  textile: { label: 'Textile Dyes', color: '#7B2D5F' },
  food: { label: 'Food & Spice', color: '#C17F28' },
}

const COLOURS: MoroccanColour[] = [
  // ─── CITY SIGNATURES ───
  {
    name: 'Marrakech Terracotta',
    arabic: 'الحمراء',
    hex: '#C1440E',
    pantone: '1675 C',
    category: 'city',
    source: 'Iron oxide (Fe₂O₃) in Haouz plain clay',
    where: 'Medina ramparts, riad walls, kasbahs of the south',
    meaning: '"The Red City" — al-Hamra. The colour IS the city. Planning law requires all buildings in the medina to match this hue.',
    chemistry: 'Rammed earth (pisé/tabia): clay + sand + straw + lime compacted in wooden frames. The iron oxide in Al Haouz plain clay gives the characteristic salmon-red. Same technique as the 12th-century Almoravid ramparts — 10 miles of wall, 200 towers, 20 gates.',
    city: 'Marrakech',
    note: 'The Badii Palace (1578) pisé contains 5.21% Fe₂O₃. At sunset, the walls shift from salmon to burnt copper. Strict municipal code preserves the hue — even modern concrete must be tinted to match.',
    featured: true,
  },
  {
    name: 'Chefchaouen Blue',
    arabic: 'أزرق شفشاون',
    hex: '#4A90D9',
    pantone: '279 C',
    category: 'city',
    source: 'Indigo powder + lime whitewash (azuulee technique)',
    where: 'Every wall, stair, alley, and doorframe in the medina',
    meaning: 'Tekhelet — the Jewish tradition of blue thread in prayer shawls, representing sky and heaven. The blue reminds the faithful of God\'s presence above.',
    chemistry: 'Indigo powder ground from dried leaves, mixed with hydrated lime and water. Lime acts as binder and lightener — varying indigo concentration creates shades from pale sky to deep navy. Some formulations add copper sulfate as insect repellent.',
    city: 'Chefchaouen',
    note: 'Founded 1471. Sephardic Jews fleeing the Spanish Inquisition brought the blue tradition. Most Jewish residents left for Israel by 1948, but the practice spread. Every spring, the municipality distributes paint to maintain the hue. Local women repaint in pairs, by tradition, after dark.',
    featured: true,
  },
  {
    name: 'Fes Emerald',
    arabic: 'أخضر فاسي',
    hex: '#1B6B4A',
    pantone: '349 C',
    category: 'city',
    source: 'Copper oxide (Cu₂O) in zellige glaze; chromium oxide in later periods',
    where: 'Royal palace roofs, mosque minarets, madrasa zellige, cemetery tiles',
    meaning: 'The colour of paradise in Islam. Associated with the Prophet Muhammad. In Morocco, green roofs mark royal or sacred buildings — mosques, mausoleums, palaces.',
    chemistry: 'Traditional: copper-based glaze fired on Fes terracotta clay at 900–1050°C. The copper compounds oxidize during firing to produce greens ranging from sage to deep emerald. Later glazes introduced chromium oxide for more stable greens.',
    city: 'Fes',
    note: 'The Qarawiyyin Mosque (859 CE), the world\'s oldest degree-granting university, has a green-tiled roof that has been maintained continuously for 1,166 years. Fes artisans distinguish 40+ shades of green in their zellige palette.',
    featured: true,
  },
  {
    name: 'Majorelle Blue',
    arabic: 'أزرق ماجوريل',
    hex: '#6050DC',
    pantone: '2725 C',
    category: 'city',
    source: 'Synthetic ultramarine (NaAlSiO compound) custom-mixed by Jacques Majorelle',
    where: 'Majorelle Garden (Jardin Majorelle), Marrakech',
    meaning: 'A Frenchman\'s obsession. Majorelle spent decades perfecting this shade — neither ultramarine nor cobalt, but a violet-blue that intensifies in Moroccan light.',
    chemistry: 'Synthetic ultramarine with violet undertones, originally oil-based house paint. Majorelle (1886–1962) registered the colour in 1937. Yves Saint Laurent and Pierre Bergé purchased the garden in 1980 and trademarked the shade.',
    city: 'Marrakech',
    note: 'Over 800,000 visitors per year make the garden Marrakech\'s most visited private site. The blue appears to change hue throughout the day — lavender at dawn, electric at noon, deep violet at dusk.',
    featured: true,
  },
  {
    name: 'Essaouira White',
    hex: '#F0EDE5',
    pantone: '7527 C',
    category: 'city',
    source: 'Lime wash (calcium hydroxide) from local limestone',
    where: 'Medina facades, rampart interiors, Portuguese-era fortifications',
    meaning: 'Purity, spiritual cleanliness, and Atlantic light. The Portuguese (who called it Mogador) whitewashed their fortifications. Moroccan residents kept the tradition.',
    chemistry: 'Calcium hydroxide (slaked lime) from fired local limestone. Applied in thin washes, the lime carbonates on exposure to CO₂, forming a hard calcium carbonate shell. The slight warmth comes from iron traces in the stone.',
    city: 'Essaouira',
    note: 'The white and blue palette reflects the Atlantic. Orson Welles filmed Othello here in 1952. Jimi Hendrix visited in 1969. The medina is UNESCO-listed.',
  },
  {
    name: 'Rabat Blonde',
    hex: '#D4B896',
    pantone: '468 C',
    category: 'city',
    source: 'Bouregreg sandstone + lime render',
    where: 'Hassan Tower, Kasbah des Oudayas, Chellah necropolis',
    meaning: 'Administrative elegance. Less theatrical than Marrakech\'s red, less mystical than Fes\'s green. A capital\'s composure in stone.',
    chemistry: 'Local sandstone from the Bouregreg valley, rich in calcium carbonate with low iron content. The resulting pale gold darkens to honey with age as the calcite weathers.',
    city: 'Rabat',
    note: 'The Hassan Tower (1195) was intended to be the world\'s largest minaret. It stands unfinished at 44m — the pale stone columns in the forecourt are nesting platforms for white storks.',
  },

  // ─── CRAFT & TILE ───
  {
    name: 'Zellige Cobalt',
    arabic: 'زرقة',
    hex: '#1E3A5F',
    pantone: '2758 C',
    category: 'craft',
    source: 'Cobalt oxide (CoO) in zellige glaze',
    where: 'Bou Inania Madrasa, Attarine Madrasa, Qarawiyyin Mosque — all in Fes',
    meaning: 'The sky brought indoors. Cobalt blue zellige represents infinity and the celestial dome in Islamic architecture.',
    chemistry: 'Cobalt oxide is one of the oldest known blue pigments in ceramics. Applied to Fes terracotta and fired at 950–1050°C. The depth of blue depends on cobalt concentration and firing temperature. Has been used in Fes zellige since the 14th-century Marinid dynasty.',
    note: 'Cobalt was imported via trans-Saharan trade routes — some evidence suggests Moroccan cobalt came from the Congo via Timbuktu. A single kilogram of cobalt could colour hundreds of tiles.',
    featured: true,
  },
  {
    name: 'Zellige Saffron',
    hex: '#E8A317',
    pantone: '137 C',
    category: 'craft',
    source: 'Antimony oxide (Sb₂O₃) or lead-tin oxide in traditional glazes; iron oxide variants',
    where: 'Zellige borders, fountain basins, palace floors',
    meaning: 'Wealth, harvest, and the desert sun. Yellow zellige often frames doorways and mihrab niches — the threshold colours.',
    chemistry: 'Traditional Moroccan yellows used antimony-based compounds or lead-tin yellow. Modern formulations use iron oxide or synthetic stains. The glaze appears amber-gold after firing, warmer than the raw pigment suggests.',
    note: 'Yellow tiles are the rarest in traditional zellige palettes — they required the most expensive pigments and the most precise firing temperatures.',
  },
  {
    name: 'Tadelakt Rose',
    arabic: 'تادلاكت',
    hex: '#C4786B',
    pantone: '7607 C',
    category: 'craft',
    source: 'Marrakech limestone + red ochre pigment + olive oil soap (sabun beldi)',
    where: 'Hammam walls, riad bathrooms, palace interiors',
    meaning: 'Tadelakt means "to rub in." The deep rose of traditional tadelakt evokes the warmth of the hammam — the closest Morocco comes to a colour you can feel.',
    chemistry: 'Hydrated lime from Marrakech quarries (90% calcium hydroxide + silica, alumina, quartz). Red ochre pigment added before application. Polished with river stones, then sealed with sabun beldi — the olive oil soap triggers saponification, creating waterproof calcium stearate.',
    note: 'A hammam maalem (master plasterer) can spend 4 hours polishing a single square metre. The surface hardens over years, developing a patina. Good tadelakt lasts centuries.',
    featured: true,
  },
  {
    name: 'Thuya Amber',
    hex: '#8B5E3C',
    pantone: '7568 C',
    category: 'craft',
    source: 'Thuya wood (Tetraclinis articulata) — burl grain',
    where: 'Essaouira woodworking souks, marquetry boxes, chess sets',
    meaning: 'The scent of Essaouira. Thuya is an aromatic tree endemic to the Atlas and Rif — its burl produces the distinctive knotted grain prized by Essaouira\'s marquetry artisans.',
    chemistry: 'The amber-brown comes from high resin content and tannins in the burl wood. When polished, the oils in the grain create a natural sheen without varnish. The scent is cedar-like, warm, slightly sweet.',
    note: 'Thuya is now protected under Moroccan law due to over-harvesting. Essaouira artisans increasingly work with sustainably sourced wood. A good marquetry box can take 3 days to complete.',
  },

  // ─── EARTH & STONE ───
  {
    name: 'Sahara Gold',
    arabic: 'ذهب الصحراء',
    hex: '#D4A843',
    pantone: '7407 C',
    category: 'earth',
    source: 'Quartz sand + iron hydroxide (limonite)',
    where: 'Erg Chebbi dunes, Erg Chigaga, Draa Valley kasbah walls',
    meaning: 'The colour of endurance. Gold sand = time made visible. The Sahara\'s palette ranges from pale cream to deep bronze depending on iron content and time of day.',
    chemistry: 'Saharan sand is 95%+ quartz (SiO₂) with trace iron compounds — limonite (FeOOH) gives the gold, hematite (Fe₂O₃) the deeper reds. The dunes at Erg Chebbi reach 150m. Wind sorts grains by size: finer grains = paler colour.',
    note: 'Erg Chebbi changes colour every hour. Dawn: pale rose. Noon: bleached gold. Sunset: burnt copper. Moonlight: silver. Photographers call it "the colour clock."',
    featured: true,
  },
  {
    name: 'Atlas Cedar',
    hex: '#4A6741',
    pantone: '364 C',
    category: 'earth',
    source: 'Cedrus atlantica canopy — endemic to Morocco\'s Middle Atlas',
    where: 'Ifrane National Park, Azrou cedar forests, Khénifra highlands',
    meaning: 'The green lung of Morocco. Cedar forests = water, shelter, and Barbary macaques. The trees are sacred to local Amazigh communities.',
    chemistry: 'Chlorophyll in the mature needles of Cedrus atlantica gives a dark blue-green — colder and more muted than Mediterranean pines. Some trees are 800+ years old. The forest floor adds a brown-green moss component.',
    note: 'Ifrane: 53,800 hectares of protected cedar forest. Africa\'s largest Barbary macaque population lives under this canopy. In winter, the forest gets snow — "Little Switzerland" at 1,665m elevation.',
  },
  {
    name: 'Red Ochre of Ait Benhaddou',
    hex: '#A0522D',
    pantone: '7586 C',
    category: 'earth',
    source: 'Red ochre clay (hematite + kaolinite) from the Draa-Tafilalt region',
    where: 'Ait Benhaddou ksar, Ouarzazate kasbahs, Draa Valley fortifications',
    meaning: 'The colour of the caravan route. These mud-brick kasbahs dissolve slowly back into the earth — the colour cycle of building and decay.',
    chemistry: 'Red ochre is a natural earth pigment — hematite (Fe₂O₃) mixed with varying amounts of clay (kaolinite) and quartz. The Draa Valley has particularly high hematite concentrations. Mud-brick construction uses the clay directly, unprocessed.',
    note: 'UNESCO World Heritage site. Filming location for Gladiator, Game of Thrones, Lawrence of Arabia. The ksar requires constant maintenance — rain literally washes the buildings away.',
  },
  {
    name: 'Phosphate White',
    hex: '#E8E3D8',
    pantone: '7534 C',
    category: 'earth',
    source: 'Calcium phosphate (apatite) — Morocco holds 75% of world reserves',
    where: 'Khouribga mines, OCP processing facilities, export ports',
    meaning: 'Morocco\'s invisible fortune. The whitish-grey of raw phosphate rock — the most valuable colour in the country, worth more than all the zellige combined.',
    chemistry: 'Sedimentary phosphate rock: fluorapatite (Ca₅(PO₄)₃F) with carbonate substitutions. Formed from marine organisms 70+ million years ago. Khouribga deposit is the world\'s largest — stretching across the Moroccan meseta.',
    note: 'OCP Group is the world\'s largest phosphate exporter. This mineral feeds a quarter of the world\'s crops. The pale grey of phosphate rock is worth $9.4 billion annually.',
  },

  // ─── SACRED & SYMBOLIC ───
  {
    name: 'Moulay Green',
    arabic: 'أخضر مولاي',
    hex: '#2D6A4F',
    pantone: '7733 C',
    category: 'sacred',
    source: 'Chrome oxide (Cr₂O₃) on glazed roof tiles',
    where: 'Every royal palace, every mosque, every mausoleum in Morocco',
    meaning: 'Haram — the forbidden colour for common buildings. Green roofs signal divine authority. Only religious structures and royal properties may wear this colour.',
    chemistry: 'Modern tiles use chrome oxide green; historical tiles used copper-based verdigris. The distinctive pyramidal roofing tiles are fired at high temperature, creating a vitreous, weather-resistant surface that maintains colour for centuries.',
    note: 'Count the green roofs from any minaret — they map the sacred geography of the city. Marrakech has 200+ mosques. Each green roof is maintained by a specific habous (religious endowment).',
    featured: true,
  },
  {
    name: 'Henna Copper',
    arabic: 'حناء',
    hex: '#8B4513',
    pantone: '7568 C',
    category: 'sacred',
    source: 'Lawsonia inermis (henna plant) — leaves dried, ground, mixed with water + lemon + sugar',
    where: 'Bridal hands and feet, Eid celebrations, newborn ceremonies',
    meaning: 'Baraka — blessing. Henna marks the transitions of life: marriage, birth, return from hajj. The deeper the colour, the stronger the blessing (and the longer it was left on).',
    chemistry: 'Lawsone (2-hydroxy-1,4-naphthoquinone) binds to keratin protein in skin and hair. The stain develops from orange to deep brown over 24–48 hours as the lawsone oxidizes. Lemon juice and sugar in the paste help release the dye.',
    note: 'A bridal henna ceremony (laylat al-henna) is the night before the wedding. The hennaya (henna artist) draws for 4–6 hours. Tradition: the bride does no housework until the henna fades — 1 to 3 weeks.',
  },
  {
    name: 'Kohl Black',
    arabic: 'كحل',
    hex: '#1C1C1C',
    pantone: 'Black 6 C',
    category: 'sacred',
    source: 'Galena (PbS) or antimony trisulphide (stibnite), ground to fine powder',
    where: 'Eyes of men, women, and children across Morocco',
    meaning: 'Protection. Kohl predates Islam — used since ancient Egypt. Believed to protect against the evil eye (al-ayn) and strengthen vision. Also: beauty, identity, defiance.',
    chemistry: 'Traditional kohl: galena (lead sulphide) or stibnite (antimony trisulphide) ground with mortar and pestle. Modern formulations may substitute carbon black or iron oxide for safety. Applied with a thin stick (mirwed) inside the lower eyelid.',
    note: 'The Prophet Muhammad reportedly used kohl. In Morocco, it\'s applied to newborns\' eyes within days of birth. Both men and women wear it. The mirwed applicator is often made of bone, silver, or carved wood.',
  },

  // ─── TEXTILE DYES ───
  {
    name: 'Indigo of the Tuareg',
    arabic: 'نيلة',
    hex: '#1B3A5C',
    pantone: '2965 C',
    category: 'textile',
    source: 'Indigofera tinctoria leaves, fermented in alkaline vats',
    where: 'Tuareg and Sahrawi turbans (tagelmust), Fes dyeing vats, Saharan caravan trade',
    meaning: 'The "blue men of the desert." Indigo was so expensive it was beaten into fabric rather than dissolved — the dye transferred onto skin, staining Tuareg faces blue. A walking ledger of wealth.',
    chemistry: 'Indigo dye (C₁₆H₁₀N₂O₂) is insoluble in water. Requires fermentation in alkaline solution (traditionally wood ash lye) to reduce it to soluble leucoindigo. Fabric absorbs the pale compound, which re-oxidizes to blue on exposure to air.',
    note: 'Trans-Saharan caravans traded indigo alongside gold and salt. The deeper the blue, the higher the status. Some Tuareg tagelmust turbans require 10m of indigo-beaten fabric. The colour literally defined a people.',
    featured: true,
  },
  {
    name: 'Pomegranate Yellow',
    arabic: 'رمان',
    hex: '#C8A630',
    pantone: '7751 C',
    category: 'textile',
    source: 'Pomegranate rind (Punica granatum) — boiled and mordanted with alum',
    where: 'Carpet dyes in Middle Atlas, wool yarn at Souk Semmarine',
    meaning: 'Fertility and abundance. The pomegranate is a symbol of prosperity in both Islamic and Jewish traditions — it appears in Quranic gardens and on Moroccan wedding tables.',
    chemistry: 'The rind contains ellagitannins and punicalagin. When boiled and mordanted with alum (potassium aluminium sulphate), it produces a stable gold-yellow on wool. Iron mordant shifts the colour toward olive green.',
    note: 'Fes dyers have used pomegranate since at least the 14th century. In the Chouara tannery, the honeycomb-shaped vats are visible from rooftop terraces — the yellow vats are pomegranate, the red are poppy.',
  },
  {
    name: 'Saffron Amber',
    arabic: 'زعفران',
    hex: '#D4930D',
    pantone: '7564 C',
    category: 'textile',
    source: 'Crocus sativus stigmas — 200,000 flowers = 1 kg',
    where: 'Taliouine, Anti-Atlas — world\'s second-largest producer after Iran',
    meaning: 'More expensive than gold by weight. Saffron colours wedding rice, dyes silk, flavours tea. In the Anti-Atlas, it\'s currency, medicine, and inheritance.',
    chemistry: 'Crocin (C₄₄H₆₄O₂₄) is the primary pigment — a water-soluble carotenoid that produces intense golden-yellow. The compound is unstable in light, which is why saffron is stored in dark containers. Taliouine saffron has PDO protection.',
    note: '90% of Morocco\'s saffron comes from Taliouine. Harvest: October–November, by hand, at dawn before the flowers open. One hectare yields 3–5 kg. Each flower has exactly 3 stigmas.',
    featured: true,
  },
  {
    name: 'Cochineal Crimson',
    hex: '#991B1B',
    pantone: '1807 C',
    category: 'textile',
    source: 'Dactylopius coccus (cochineal insect) — traded via Spain from the Americas post-1500',
    where: 'Luxury carpet dyes, royal textile workshops',
    meaning: 'The colour of power. Before synthetic dyes, deep red was the most expensive colour in Morocco — reserved for sultans\' caftans and ceremonial carpets.',
    chemistry: 'Carminic acid (C₂₂H₂₀O₁₃) from the cochineal insect, mordanted with alum or tin to fix on wool. Produces a range from pink to deep crimson depending on mordant. Entered Morocco via Spanish trade post-1492 — replaced earlier madder root reds.',
    note: 'Before cochineal, Moroccan red came from madder root (Rubia tinctorum) and kermes insect. The transition happened after the fall of Al-Andalus, when Spanish trade routes brought New World dyes to North Africa.',
  },

  // ─── FOOD & SPICE ───
  {
    name: 'Ras el Hanout Umber',
    arabic: 'رأس الحانوت',
    hex: '#7B4B2A',
    pantone: '7568 C',
    category: 'food',
    source: '25–40 ground spices including cumin, coriander, turmeric, cinnamon, nutmeg, galangal, and rose petals',
    where: 'Every spice souk in Morocco, every family kitchen',
    meaning: '"Head of the shop" — the spice merchant\'s masterpiece. Each blend is proprietary. The colour is the merchant\'s signature — amber-brown with warm undertones.',
    chemistry: 'The umber tone comes from the aggregate of curcumin (turmeric), cinnamaldehyde (cinnamon), and Maillard reaction products from dried, roasted spices. No two blends are identical.',
    note: 'Some traditional ras el hanout included Spanish fly (cantharidin) as an aphrodisiac — now banned. A good attarin (spice merchant) adjusts the blend to the customer\'s dish, nose, and budget.',
  },
  {
    name: 'Argan Gold',
    arabic: 'أركان',
    hex: '#C19A3E',
    pantone: '4013 C',
    category: 'food',
    source: 'Argania spinosa nut oil — endemic to the Souss-Massa region',
    where: 'Souss valley cooperatives, restaurant finishing oil, cosmetic formulations',
    meaning: 'Liquid gold. The argan tree grows nowhere else on earth except southwest Morocco. UNESCO Biosphere Reserve. Women\'s cooperatives control 80% of production.',
    chemistry: 'The golden colour comes from carotenoids and tocopherols (vitamin E) in the kernel oil. Culinary argan is roasted before pressing — the Maillard reaction deepens the gold to amber and adds the distinctive nutty flavour.',
    note: 'Goats climb argan trees to eat the fruit — the kernels pass through and are collected. (This "goat argan" is no longer used for food oil.) Cold-pressed argan takes 30 kg of fruit to produce 1 litre.',
    featured: true,
  },
  {
    name: 'Mint Viridian',
    arabic: 'نعناع',
    hex: '#3A7D44',
    pantone: '7741 C',
    category: 'food',
    source: 'Mentha spicata (spearmint) — Morocco\'s most consumed aromatic',
    where: 'Every glass of atay, every table, every greeting',
    meaning: 'Hospitality incarnate. The green of fresh mint in a glass of tea is the first colour a guest sees in a Moroccan home. Refusing it is refusing the household.',
    chemistry: 'The vibrant green comes from chlorophyll a and b in the young leaves. Menthol and carvone provide the scent. Meknes is the capital of Moroccan mint — daily shipments supply the entire country.',
    note: 'Morocco consumes 15,000 tonnes of fresh mint annually. Tea ritual: gunpowder green tea + fresh spearmint + sugar, poured from height to create foam. Three glasses: the first is gentle as life, the second strong as love, the third bitter as death.',
  },
  {
    name: 'Preserved Lemon',
    hex: '#E8C547',
    pantone: '7405 C',
    category: 'food',
    source: 'Citrus limon rind — salt-cured for 30+ days in brine',
    where: 'Tagine, chermoula, olive dishes, Fassi cuisine',
    meaning: 'The colour of patience. Raw lemons are bright yellow. After a month in salt and their own juice, they turn translucent gold — the colour of fermented time.',
    chemistry: 'Lactic acid fermentation softens the rind. The yellow deepens as carotenoids concentrate and Maillard reactions occur in the salted, acidic environment. The rind becomes the ingredient — the flesh is discarded.',
    note: 'No Moroccan kitchen lacks a jar. Fassi cooks insist on 6-month preservation for the deepest flavour. Preserved lemons appear in chicken tagine with olives — arguably Morocco\'s national dish.',
  },
]

// ─── KEY NUMBERS ───

const KEY_NUMBERS = [
  { n: '24', l: 'Colours indexed', unit: '' },
  { n: '6', l: 'Colour categories', unit: '' },
  { n: '1122', l: 'Year the ramparts were built', unit: 'CE' },
  { n: '75%', l: 'World\'s phosphate reserves', unit: '' },
  { n: '200,000', l: 'Flowers for 1 kg saffron', unit: '' },
  { n: '40+', l: 'Shades of green in Fes zellige', unit: '' },
  { n: '1,166', l: 'Years of green roof tiles at Qarawiyyin', unit: '' },
  { n: '800K', l: 'Visitors/year to Majorelle Garden', unit: '' },
]

// ═══════════════════════════════════════════════════
// SWATCH COMPONENT
// ═══════════════════════════════════════════════════

function ColourSwatch({ colour, isExpanded, onToggle, delay }: {
  colour: MoroccanColour; isExpanded: boolean; onToggle: () => void; delay: number
}) {
  const isDark = parseInt(colour.hex.slice(1, 3), 16) < 128
  const textOnSwatch = isDark ? '#fff' : '#0a0a0a'
  const mutedOnSwatch = isDark ? 'rgba(255,255,255,0.6)' : 'rgba(0,0,0,0.5)'
  const catMeta = CATEGORY_META[colour.category]

  return (
    <div className="transition-all duration-500" style={{ animationDelay: `${delay}ms` }}>
      {/* Giant swatch */}
      <div
        className="relative cursor-pointer group"
        onClick={onToggle}
        style={{ background: colour.hex }}
      >
        {/* Pantone-style layout */}
        <div className="p-6 md:p-8 min-h-[200px] md:min-h-[260px] flex flex-col justify-between">
          {/* Top: category + featured badge */}
          <div className="flex items-start justify-between">
            <span className="text-[9px] uppercase tracking-[0.12em] font-mono" style={{ color: mutedOnSwatch }}>
              {catMeta.label}
            </span>
            {colour.featured && (
              <span className="text-[8px] uppercase tracking-[0.1em] px-2 py-0.5" style={{
                background: isDark ? 'rgba(255,255,255,0.15)' : 'rgba(0,0,0,0.08)',
                color: mutedOnSwatch,
              }}>
                ★ Featured
              </span>
            )}
          </div>

          {/* Bottom: name + hex */}
          <div>
            {colour.arabic && (
              <p className="font-serif text-[20px] mb-1 opacity-60" style={{ color: textOnSwatch, direction: 'rtl' }}>
                {colour.arabic}
              </p>
            )}
            <p className="font-serif text-[clamp(1.5rem,3.5vw,2.2rem)] leading-tight" style={{ color: textOnSwatch }}>
              {colour.name}
            </p>
            <div className="flex items-center gap-3 mt-2">
              <span className="font-mono text-[12px] uppercase tracking-wider" style={{ color: mutedOnSwatch }}>
                {colour.hex}
              </span>
              {colour.pantone && (
                <span className="font-mono text-[10px]" style={{ color: mutedOnSwatch }}>
                  Pantone {colour.pantone}
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Hover indicator */}
        <div className="absolute bottom-3 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
          <span className="text-[10px] font-mono" style={{ color: mutedOnSwatch }}>
            {isExpanded ? '− close' : '+ detail'}
          </span>
        </div>
      </div>

      {/* White detail card below swatch */}
      {isExpanded && (
        <div className="bg-white border border-t-0 p-6 md:p-8" style={{ borderColor: C.border }}>
          {/* Source + Chemistry */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <p className="text-[9px] uppercase tracking-[0.1em] mb-1 font-mono" style={{ color: C.muted }}>Pigment Source</p>
              <p className="text-[14px] leading-relaxed" style={{ color: C.text }}>{colour.source}</p>
            </div>
            <div>
              <p className="text-[9px] uppercase tracking-[0.1em] mb-1 font-mono" style={{ color: C.muted }}>Where It Appears</p>
              <p className="text-[14px] leading-relaxed" style={{ color: C.text }}>{colour.where}</p>
            </div>
          </div>

          {/* Meaning */}
          <div className="mb-6">
            <p className="text-[9px] uppercase tracking-[0.1em] mb-1 font-mono" style={{ color: C.muted }}>Cultural Meaning</p>
            <p className="text-[15px] leading-relaxed" style={{ color: C.ink }}>{colour.meaning}</p>
          </div>

          {/* Chemistry */}
          {colour.chemistry && (
            <div className="mb-6">
              <p className="text-[9px] uppercase tracking-[0.1em] mb-1 font-mono" style={{ color: C.muted }}>Chemistry</p>
              <p className="text-[14px] leading-relaxed" style={{ color: C.text }}>{colour.chemistry}</p>
            </div>
          )}

          {/* Note */}
          {colour.note && (
            <div className="border-t pt-4" style={{ borderColor: C.border }}>
              <p className="text-[13px] leading-relaxed italic" style={{ color: C.muted }}>{colour.note}</p>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

// ═══════════════════════════════════════════════════
// MAIN COMPONENT
// ═══════════════════════════════════════════════════

export function ColourIndexContent() {
  const heroR = useReveal()
  const numsR = useReveal()
  const swatchR = useReveal()
  const [filter, setFilter] = useState<ColourCategory | 'all' | 'featured'>('all')
  const [expanded, setExpanded] = useState<string | null>('Marrakech Terracotta')

  const filtered = filter === 'all'
    ? COLOURS
    : filter === 'featured'
      ? COLOURS.filter(c => c.featured)
      : COLOURS.filter(c => c.category === filter)

  const categories: (ColourCategory | 'all' | 'featured')[] = ['all', 'featured', 'city', 'craft', 'earth', 'sacred', 'textile', 'food']

  return (
    <div className="min-h-screen bg-white" style={{ color: C.ink }}>

      {/* ═══ HERO ═══ */}
      <section className="px-8 md:px-[8%] lg:px-[12%] pt-36 pb-16">
        <p className="micro-label mb-3" style={{ color: C.muted }}>Module 044 · Chromatic Intelligence</p>
        <div ref={heroR.ref}>
          <h1 className="font-serif text-[clamp(2.5rem,7vw,5rem)] leading-[0.9] tracking-[-0.02em] mb-3 transition-all duration-1000"
            style={{ opacity: heroR.vis ? 1 : 0, transform: heroR.vis ? 'translateY(0)' : 'translateY(20px)' }}>
            <em>The Colour Index</em>
          </h1>
          <p className="font-serif italic text-[clamp(1rem,2.5vw,1.5rem)]" style={{ color: C.muted }}>
            Morocco&apos;s chromatic DNA — a Pantone book for a country
          </p>
        </div>

        <div className="max-w-[660px] mt-6 space-y-4">
          <p className="text-[15px] leading-[1.8]" style={{ color: C.text }}>
            Every colour in Morocco has a chemistry and a biography. Marrakech is red because the Haouz
            plain is rich in iron oxide. Chefchaouen is blue because Sephardic Jews fleeing the Inquisition
            painted their exile the colour of heaven. <span className="underline underline-offset-2">Fes</span> is green because Islam reserves it for the sacred.
          </p>
          <p className="text-[15px] leading-[1.8]" style={{ color: C.text }}>
            This index maps 24 colours to their mineral source, their craft tradition, and their meaning.
            Each swatch is a specimen. Click to open the field notes.
          </p>
        </div>
      </section>

      {/* ═══ CHROMATIC STRIP ═══ */}
      <section className="px-8 md:px-[8%] lg:px-[12%] mb-8">
        <div className="flex h-12 md:h-16">
          {COLOURS.filter(c => c.featured).map(c => (
            <div key={c.hex} className="flex-1 transition-all duration-300 hover:flex-[2] cursor-pointer"
              style={{ background: c.hex }}
              title={c.name}
              onClick={() => { setFilter('all'); setExpanded(c.name) }}
            />
          ))}
        </div>
        <p className="text-[10px] mt-2 font-mono" style={{ color: C.muted }}>
          Featured colours — click to explore. Full index below.
        </p>
      </section>

      {/* ═══ KEY NUMBERS ═══ */}
      <section className="px-8 md:px-[8%] lg:px-[12%] py-24 md:py-40">
        <div ref={numsR.ref} className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {KEY_NUMBERS.map((k, i) => (
            <div key={k.l} className="border-t pt-3 transition-all duration-700"
              style={{
                borderColor: C.border,
                opacity: numsR.vis ? 1 : 0,
                transitionDelay: `${i * 60}ms`,
              }}>
              <p className="font-serif text-[clamp(1.6rem,3vw,2.4rem)] leading-none">
                {k.n}<span className="text-[0.5em] ml-1" style={{ color: C.muted }}>{k.unit}</span>
              </p>
              <p className="text-[11px] mt-1 font-mono" style={{ color: C.muted }}>{k.l}</p>
            </div>
          ))}
        </div>
      </section>

      <div className="px-8 md:px-[8%] lg:px-[12%]"><div className="border-t" style={{ borderColor: C.border }} /></div>

      {/* ═══ FILTER TABS ═══ */}
      <section className="px-8 md:px-[8%] lg:px-[12%] py-4">
        <div className="flex flex-wrap gap-2">
          {categories.map(cat => {
            const label = cat === 'all' ? `All (${COLOURS.length})`
              : cat === 'featured' ? `★ Featured (${COLOURS.filter(c => c.featured).length})`
                : `${CATEGORY_META[cat].label} (${COLOURS.filter(c => c.category === cat).length})`
            const isActive = filter === cat
            const catColor = cat === 'all' || cat === 'featured' ? C.ink : CATEGORY_META[cat].color
            return (
              <button key={cat} onClick={() => setFilter(cat)}
                className="text-[11px] px-3 py-1.5 transition-all font-mono tracking-wider border"
                style={{
                  background: isActive ? catColor : 'transparent',
                  color: isActive ? '#fff' : C.muted,
                  borderColor: isActive ? catColor : C.border,
                }}>
                {label}
              </button>
            )
          })}
        </div>
      </section>

      {/* ═══ SWATCH GARDEN ═══ */}
      <section ref={swatchR.ref} className="px-8 md:px-[8%] lg:px-[12%] pb-section">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filtered.map((colour, i) => (
            <ColourSwatch
              key={colour.name}
              colour={colour}
              isExpanded={expanded === colour.name}
              onToggle={() => setExpanded(expanded === colour.name ? null : colour.name)}
              delay={i * 60}
            />
          ))}
        </div>
      </section>

      <div className="px-8 md:px-[8%] lg:px-[12%]"><div className="border-t" style={{ borderColor: C.border }} /></div>

      {/* ═══ READING NOTES ═══ */}
      <section className="px-8 md:px-[8%] lg:px-[12%] py-24 md:py-40">
        <p className="micro-label mb-6" style={{ color: C.muted }}>Reading Notes</p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="font-serif text-[18px] mb-3">The Geology of Identity</h3>
            <p className="text-[14px] leading-relaxed" style={{ color: C.text }}>
              Moroccan cities are coloured by what lies beneath them. Marrakech is red because
              the Haouz plain is red. Fes tiles are earth-toned because the Saïss basin provides
              specific clays. Essaouira is white because the <span className="underline underline-offset-2">Atlantic coast</span> is limestone.
              Before branding, before municipal codes, before Instagram — geology was the stylist.
            </p>
          </div>
          <div>
            <h3 className="font-serif text-[18px] mb-3">Exile Paints Cities</h3>
            <p className="text-[14px] leading-relaxed" style={{ color: C.text }}>
              Chefchaouen&apos;s blue came from Jewish refugees. Essaouira&apos;s Portuguese fortifications brought
              European whitewash. Fes&apos;s <span className="underline underline-offset-2">Andalusian</span> quarter carries design patterns from Córdoba and
              Granada. Morocco&apos;s most famous colours arrived with people who were forced to leave somewhere else.
              The palette is a map of displacement.
            </p>
          </div>
          <div>
            <h3 className="font-serif text-[18px] mb-3">Chemistry Before Chemistry</h3>
            <p className="text-[14px] leading-relaxed" style={{ color: C.text }}>
              Tadelakt is saponification — soap-making inside a wall. Zellige glazing is controlled
              oxidation of metal compounds at precise temperatures. Indigo dyeing is a fermentation
              process. Moroccan artisans were practicing industrial chemistry centuries before the
              periodic table existed. They just called it craft.
            </p>
          </div>
        </div>
      </section>

      <div className="px-8 md:px-[8%] lg:px-[12%]"><div className="border-t" style={{ borderColor: C.border }} /></div>

      {/* ═══ SOURCES ═══ */}
      <section style={{ backgroundColor: '#1f1f1f' }} className="px-8 md:px-[8%] lg:px-[12%] py-24 md:py-40">
        <p className="micro-label mb-4" style={{ color: 'rgba(255,255,255,0.7)' }}>Sources &amp; Methodology</p>
        <div className="text-[12px] leading-relaxed space-y-2" style={{ color: 'rgba(255,255,255,0.7)' }}>
          <p>Hex values are editorial approximations sampled from documentary photography, architectural surveys, and material specimens — not Pantone-certified measurements.</p>
          <p>Marrakech pisé composition: El Fgaier et al. (2018), "Characterization of rammed-earth materials from the XVIth century Badii Palace in Marrakech." Zellige chemistry: Zellige de Fès certification documentation. Tadelakt process: Traditional Moroccan Lime Plaster guide (Marrakeche.com). Chefchaouen history: Wikipedia, AFAR Magazine, Times of Israel. Saffron data: Taliouine PDO documentation. Indigo chemistry: Artisans of Morocco. Phosphate reserves: OCP Group annual reports.</p>
          <p>Pantone references are nearest visual matches, not official Pantone colour assignments. "Majorelle Blue" is a registered trademark of the Majorelle Garden / Fondation Jardin Majorelle.</p>
        </div>
        <p className="text-[11px] mt-6 pt-4 border-t" style={{ borderColor: C.border, color: 'rgba(255,255,255,0.7)' }}>
          © Slow Morocco · slowmorocco.com · All data editorial estimates unless otherwise sourced. This visualization may not be reproduced without visible attribution.
        </p>
      </section>
    </div>
  )
}
