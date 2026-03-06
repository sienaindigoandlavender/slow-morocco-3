// ─────────────────────────────────────────────────
// The Carpet Atlas
// Module 065 — Textile & Cultural Intelligence
// Sources: Wikipedia, Casa Amar, Benisouk, Nouvelle
// Nomad, 1stDibs, Salam Hello, MoroccanZest,
// Afrikesh, Iwziwn, Nazmiyal
// ─────────────────────────────────────────────────

export interface RugTradition {
  id: string
  name: string
  arabicName?: string
  region: string
  tribe: string
  technique: 'Hand-knotted pile' | 'Flat-weave (kilim)' | 'Mixed technique' | 'Upcycled / rag rug' | 'Embroidered flat-weave'
  material: string
  pile: string
  palette: string
  motifs: string
  detail: string
  modernNote: string
  lat: number
  lng: number
  color: string
}

export const RUG_TRADITIONS: RugTradition[] = [
  {
    id: 'beni-ourain', name: 'Beni Ourain', arabicName: 'بني ورين',
    region: 'Middle Atlas — between Fez, Taza & Mermoucha',
    tribe: '17 tribes of the Beni Ouarain confederation',
    technique: 'Hand-knotted pile', material: 'Undyed sheep\'s wool (warp & weft)',
    pile: 'Deep, soft, plush (2–4 cm)', palette: 'Ivory/cream with charcoal or brown lines',
    motifs: 'Diamonds (lozenges), X-crosses, minimalist linear geometry. Lozenges = femininity/fertility. Crosses = metalworkers / ward off djinn.',
    detail: 'Le Corbusier, Alvar Aalto, and Marcel Breuer paired them with modernist furniture in the 1920s–30s. Originally made to insulate entire tent floors against Atlas winters. The tribes settled around Jebel Bouiblane circa 9th century, bringing flat weaving traditions. The wool comes from Atlas mountain sheep — finer and more supple than western Moroccan breeds.',
    modernNote: 'Mid-century modern revival drove global demand. Widely copied. Authentic pieces identified by hand-spun irregularity, natural lanolin smell, and tribal provenance.',
    lat: 33.8, lng: -3.9, color: '#F5F0E6',
  },
  {
    id: 'beni-mrirt', name: 'Beni Mrirt',
    region: 'Middle Atlas — Khénifra Province',
    tribe: 'Beni Mrirt tribes',
    technique: 'Hand-knotted pile', material: 'Very fine hand-spun wool, tight knots',
    pile: 'Dense, refined, firm support (2–3 cm)', palette: 'Neutral grounds with occasional bright orange or deep green',
    motifs: 'Similar to Beni Ourain — diamonds, linear geometry — but finer knotting and occasionally more vivid tones.',
    detail: 'Often confused with Beni Ourain. Distinguished by exceptionally tight knotting that creates a denser, more durable surface. The fine wool has a refined feel and firm underfoot support. Prized by collectors for craftsmanship.',
    modernNote: 'Growing recognition in design circles. The tighter knot structure makes these more durable than Beni Ourains for high-traffic spaces.',
    lat: 33.15, lng: -5.57, color: '#E8DFD0',
  },
  {
    id: 'azilal', name: 'Azilal',
    region: 'High Atlas — Azilal Province, ~100 km from Marrakech',
    tribe: 'Azilali Amazigh tribes',
    technique: 'Hand-knotted pile', material: 'Wool + undyed cotton or coloured yarn, natural dyes (henna, pomegranate, indigo, saffron, madder)',
    pile: 'Thin to medium (1–2 cm)', palette: 'Cream/ivory base with bold polychrome — reds, blues, oranges, pinks, yellows',
    motifs: 'Freeform abstract compositions. Asymmetric diamonds, imperfect repeating lines, Amazigh symbols for marriage, birth, protection, love. ',
    detail: 'Unknown to the market until the 1990s. Not made for sale — created as family heirlooms expressing the weaver\'s inner life. Weavers use asymmetrical (Persian) knots for softer designs. Rural life, motherhood, and childbirth are primary themes. The matriarch weaves following ancestral process passed from mother to daughter.',
    modernNote: 'Discovered by Western collectors in the late 20th century. Now sought-after. Often compared to abstract expressionism.',
    lat: 31.95, lng: -6.57, color: '#E74C3C',
  },
  {
    id: 'boujaad', name: 'Boujaad', arabicName: 'بوجاد',
    region: 'Haouz plain — Chaouia-Ouardigha, central Morocco',
    tribe: 'Multiple tribes; Boujaad was a sacred site',
    technique: 'Hand-knotted pile', material: '100% wool with natural dyes',
    pile: 'Low to medium, loop-knotted', palette: 'Pinks, magentas, reds, purples, oranges — all natural dyes',
    motifs: 'Lozenges, mixed lines, other geometric shapes. Described as "surrealist" or "hypnotic." Uses twice as many horizontal knots per square inch as vertical.',
    detail: 'From a small town that was once a sacred site belonging to many tribes. The bold hues are entirely plant-derived — no artificial chemicals. The limp profile makes them easy to move. Vintage pieces (pre-1970s) are collectible. Often copied by commercial brands going for bohemian style, but rarely matched.',
    modernNote: 'Authentic vintage Boujaads are increasingly rare and command premium prices.',
    lat: 32.75, lng: -6.41, color: '#C2185B',
  },
  {
    id: 'beni-mguild', name: 'Beni M\'Guild', arabicName: 'بني مگيلد',
    region: 'Middle Atlas Mountains',
    tribe: 'Beni M\'Guild tribal confederation',
    technique: 'Hand-knotted pile', material: 'Wool, double loop knots on sturdy wool base',
    pile: 'Thick and heavy, reversible (plush side for winter, flat side for summer)',
    palette: 'Deep plums, violet, burgundy reds, royal blues, natural pinks, terracottas. Known for indigo use.',
    motifs: 'Distinct geometric zigzag patterns. Color-driven rather than symbol-rich — the hues carry the meaning. Red = strength/protection, blue = wisdom, yellow = eternity, green = peace.',
    detail: 'The only major Moroccan rug tradition featuring both a soft and a flat side, making them truly reversible. Double loop knots create exceptional density. Older pieces develop a softly faded tonal quality over decades. Famous for indigo blues and purples. Bright pink pieces may indicate a bleach wash on vintage originals.',
    modernNote: 'Coveted by Frank Lloyd Wright and other modernists. One was used at Fallingwater. Vintage Beni M\'Guilds from the 1950s–60s are highly collectible.',
    lat: 33.35, lng: -5.25, color: '#4A148C',
  },
  {
    id: 'kilim-hanbel', name: 'Kilim / Hanbel', arabicName: 'حنبل',
    region: 'All regions — especially Middle Atlas',
    tribe: 'Multiple tribes across Morocco',
    technique: 'Flat-weave (kilim)', material: 'Sheep\'s wool (weft) with wool or cotton warps. Some include "sabra" (viscose/rayon).',
    pile: 'No pile — flat, lightweight, reversible',
    palette: 'Varies by region. Southern kilims use brighter yellows and saffrons. Northern kilims favour deeper reds and earth tones.',
    motifs: 'Diamonds, zigzags, triangles, lozenges, raised knot details, corded lines, thread embroideries. Some mimic ornate mashrabiya window lattice patterns.',
    detail: 'Kilim is the international term; Hanbel is the Moroccan name. The lightest, most practical Moroccan rug — originally made by nomadic tribes who needed easy-to-pack floor coverings. Compared to Persian or Anatolian kilims, Moroccan Hanbel favour bolder geometry and graphic rhythm. Often hung as wall tapestries or headboards.',
    modernNote: 'Ideal for dining rooms, hallways, and layering over pile rugs. Their slim profile suits high-traffic areas and easy cleaning.',
    lat: 33.00, lng: -5.00, color: '#D4A373',
  },
  {
    id: 'zanafi', name: 'Zanafi',
    region: 'High Atlas — Taznakht area, Ouarzazate Province',
    tribe: 'Zanafi tribe (part of Aït Ouaouzguite confederation)',
    technique: 'Flat-weave (kilim)', material: '100% wool, naturally dyed with saffron, henna, indigo, madder',
    pile: 'Flat-weave, no pile. Reversible — colours invert on each side.',
    palette: 'Neutral and earthy tones — cream, black, white, brown, occasional bold grounds',
    motifs: 'Intricate system of counting creates precise geometric patterns. Each row requires acute concentration. Side tassels are a distinctive feature.',
    detail: 'Requires the highest level of skill among Moroccan flat-weaves. The reversible design means colours of symbols invert on each side — Traditionally from the Southeast, but Middle Atlas weavers have developed a non-reversible interpretation without side tassels. Made with Siroua sheep wool, known for long, smooth, lustrous fibres.',
    modernNote: 'Prized by textile collectors for technical virtuosity. Growing recognition alongside the broader Taznakht rug revival.',
    lat: 30.57, lng: -7.20, color: '#795548',
  },
  {
    id: 'taznakht', name: 'Taznakht', arabicName: 'تزناخت',
    region: 'Anti-Atlas / High Atlas — between Ouarzazate and Taznakht',
    tribe: 'Aït Ouaouzguite tribal confederation',
    technique: 'Mixed technique', material: 'Siroua sheep wool — long, smooth, shiny fleece. Natural dyes: saffron, madder, henna, indigo.',
    pile: 'Variable — flat-weave base with raised embroidered and knotted elements',
    palette: 'Deep reds, saffrons, ochres, blacks. Earthy with silky feel.',
    motifs: 'Large central lozenge shapes, borders, geometric and floral motifs, stylised animals. Diamond (female principle/fertility), zigzag (water/protection).',
    detail: 'A major hub for Amazigh rug production. Encompasses multiple sub-styles: Glaoui (three techniques: weaving + knotting + chedwi embroidery), Akhnif (fine micro-motifs on monochrome ground), and Zanafi. The Siroua sheep breed produces wool with natural lustre. Vintage pieces from the 1940s–60s are collectible.',
    modernNote: 'Often described as "the connoisseur\'s Moroccan rug." Less commercially known than Beni Ourain but revered for quality and artistry.',
    lat: 30.61, lng: -7.18, color: '#BF360C',
  },
  {
    id: 'boucherouite', name: 'Boucherouite', arabicName: 'بوشروية',
    region: 'All regions — especially Middle Atlas and urban peripheries',
    tribe: 'Various — rural and peri-urban women across Morocco',
    technique: 'Upcycled / rag rug', material: 'Recycled textiles: old clothes, t-shirts, synthetic yarns, fabric scraps, cotton, polyester',
    pile: 'Variable — shaggy, textured, knotted onto flat cotton backing',
    palette: 'Wildly polychrome — neon pinks, electric blues, every colour available from salvaged materials',
    motifs: 'Freeform, highly expressive, often abstract. Contemporary echo of traditional symbolism. Each piece entirely unique.',
    detail: '"Boucherouite" means "a torn garment" or "a piece of cloth" in Arabic (from "bu sherwit"). Emerged mid-20th century when Amazigh women began using whatever materials they had — old clothes, synthetics — to create domestic rugs. Originally a necessity-born craft, now celebrated as eco-conscious art. Vintage pieces (pre-1970s) with natural dyes are serious collectors\' items.',
    modernNote: 'Newer pieces include synthetics; older pieces use naturally dyed cottons and fabrics.',
    lat: 33.40, lng: -4.80, color: '#FF6F00',
  },
  {
    id: 'zemmour', name: 'Zemmour',
    region: 'Middle Atlas — Zemmour territory near Rabat-Salé-Khémisset',
    tribe: 'Zemmour tribal confederation',
    technique: 'Flat-weave (kilim)', material: 'Thinnest sheep\'s wool yarn. Symmetrical (Turkish) knots.',
    pile: 'Flat-weave with complex geometry', palette: 'Vivid reds, complex multi-colour lozenges. Cream and earthy accents.',
    motifs: 'Labyrinth-like patterns requiring meticulous counting. Complex lozenges and intricate geometric designs. Each symbol created with precision counting system.',
    detail: 'Made with the thinnest wool yarn of any Moroccan tradition. The labyrinth-like weaving technique requires acute focus — each symbol is created through a precise counting system. Located in fertile territory near Morocco\'s political capital, giving these rugs exposure to both rural tradition and urban trade networks.',
    modernNote: 'Recognised for technical precision. Less commercially known but growing in collector interest for their graphic complexity.',
    lat: 33.82, lng: -6.07, color: '#D32F2F',
  },
  {
    id: 'marmoucha', name: 'Marmoucha',
    region: 'Middle Atlas — near Beni Ourain territory',
    tribe: 'Marmoucha tribal confederation',
    technique: 'Hand-knotted pile', material: 'Undyed 100% wool',
    pile: 'Lighter weight and thickness than Beni Ourain',
    palette: 'Natural grey, brown, black on undyed wool. No added colour.',
    motifs: 'Large criss-cross diamond design. Often mistaken for Beni Ourain. Simpler, bolder geometry.',
    detail: 'Close neighbours to the Beni Ourain tribes, often confused with them. Distinguished by lighter weight, smaller size, and their signature large criss-cross diamond pattern. Multiple sub-tribe names exist within the Marmoucha confederation.',
    modernNote: 'Growing appreciation as a more affordable, lighter alternative to Beni Ourain with similar aesthetic DNA.',
    lat: 33.50, lng: -3.70, color: '#A1887F',
  },
  {
    id: 'talsint', name: 'Talsint (Aït Bou Ichaouen)',
    region: 'Eastern Morocco — Talsint area',
    tribe: 'Aït Bou Ichaouen tribal confederation',
    technique: 'Hand-knotted pile', material: 'Wool, sometimes incorporating flat-weave and knotted sections',
    pile: 'Medium, mixed technique', palette: 'Vibrant — oranges, yellows, reds, blues. More linear patterns.',
    motifs: 'More linear than diamond-dominated. Vibrant tones reflecting eastern Morocco\'s different light and landscape.',
    detail: 'Named after Talsint, the largest town in the weaving area. Eastern Morocco\'s answer to the Atlas traditions — distinct colour palette reflecting the transition zone between mountains and pre-Saharan steppe. Less documented than western Atlas traditions. Often incorporates multiple techniques within a single rug.',
    modernNote: 'Emerging collector interest. The vibrant linear aesthetic fills a different niche from the diamond-dominant Atlas styles.',
    lat: 32.53, lng: -3.43, color: '#FF8F00',
  },
]

export interface AmazighSymbol {
  id: string
  name: string
  meaning: string
  shape: string
  detail: string
}

export const SYMBOLS: AmazighSymbol[] = [
  { id: 'diamond', name: 'Diamond (Lozenge)', meaning: 'Femininity, fertility, protection', shape: '◇', detail: 'Represents the woman. A single lozenge = a womb. Chains of diamonds = continuity of life and lineage.' },
  { id: 'cross', name: 'Cross (X)', meaning: 'Metalworkers, ward off djinn', shape: '✕', detail: 'Symbol of metal workers, highly respected because metal is believed to ward off evil energy. Series of crosses form geometric patterns with lozenges.' },
  { id: 'zigzag', name: 'Zigzag', meaning: 'Water, life\'s journey, protection', shape: '⩘', detail: 'Represents rivers, rain, and water — the source of life. In Amazigh belief, zigzags also confuse evil spirits, acting as a mystical fence.' },
  { id: 'eye', name: 'Eye', meaning: 'Protection against evil eye', shape: '◈', detail: 'Diamond with a cross at the centre. Deflects evil in four directions — north, south, east, west. Often paired with the Khamsa for double protection.' },
  { id: 'triangle', name: 'Triangle', meaning: 'Stability, balance, feminine/masculine unity', shape: '△', detail: 'Symbolizes stability and harmony. Two triangles joined at the base represent the unity of masculine and feminine principles.' },
  { id: 'khamsa', name: 'Khamsa (Hand of Fatima)', meaning: 'Protection, blessings, strength', shape: '✋', detail: 'Five fingers ward off the evil eye. Used across Moroccan crafts — jewelry, rugs, doors. One of North Africa\'s most universal protective symbols.' },
  { id: 'seed', name: 'Seed (Hourglass)', meaning: 'Fertility, new beginnings', shape: '⧗', detail: 'Hourglass shape — the weaver may have been pregnant when creating the rug, or at an age where fertility was celebrated.' },
  { id: 'comb', name: 'Comb', meaning: 'Purification, ward off evil', shape: '|||', detail: 'Purifies the path of life. The comb motif is one of the oldest Amazigh symbols, found in cave paintings predating 3000 BCE.' },
  { id: 'frog', name: 'Frog', meaning: 'Fertility, magical rites', shape: '⟐', detail: 'Diamond with smaller diamonds at top and bottom, legs extending from sides. Associated with fertility due to the frog\'s prolific egg-laying.' },
  { id: 'lions-paw', name: 'Lion\'s Paw', meaning: 'Strength, courage, protection', shape: '⬡', detail: 'Maze of diamonds forming a paw print. Protects those facing situations that test strength or courage. Found on rugs made during times of hardship.' },
  { id: 'fish', name: 'Fish Skeleton', meaning: 'Holy person, healing', shape: '⋈', detail: 'Vertical line intersecting a column of chevrons. Represents a holy person with magical and medicinal skills.' },
  { id: 'yaz', name: 'Yaz (ⵣ)', meaning: 'Amazigh identity, freedom', shape: 'ⵣ', detail: 'The Tifinagh letter for "free man." Proclaims Amazigh heritage.' },
]

export const NATURAL_DYES = [
  { source: 'Madder root', color: '#C0392B', produces: 'Deep reds, crimson', note: 'Root is boiled and fermented.' },
  { source: 'Indigo', color: '#1A237E', produces: 'Blues, purples', note: 'Used extensively by Beni M\'Guild. ' },
  { source: 'Saffron', color: '#F9A825', produces: 'Yellows, golds', note: 'Morocco\'s Taliouine region produces the world\'s finest saffron — also used in dyeing.' },
  { source: 'Henna', color: '#8D6E63', produces: 'Browns, oranges, warm tones', note: 'Same plant used for body art. Leaves boiled for textile dye.' },
  { source: 'Pomegranate rind', color: '#E65100', produces: 'Oranges, deep yellows', note: 'The rind — not the fruit — yields dye. Boiled with alum mordant.' },
  { source: 'Walnut bark', color: '#4E342E', produces: 'Dark browns, blacks', note: 'Creates the darkest natural tones. Often used for Beni Ourain lines.' },
  { source: 'Mint / wild thyme', color: '#388E3C', produces: 'Greens', note: 'Rarer in traditional rugs. Green symbolizes peace and Islam.' },
  { source: 'Terracotta (undyed)', color: '#A1887F', produces: 'Natural wool tones', note: 'Many rugs use undyed wool — cream, brown, grey, black from different sheep breeds.' },
]

export const WEAVING_TECHNIQUES = [
  { name: 'Pile weave (zrbya)', detail: 'Thick, warm, visible knots. The "shag" texture. Each knot tied individually by hand. Beni Ourain, Azilal, Beni M\'Guild.' },
  { name: 'Flat weave (hanbel/kilim)', detail: 'Lightweight, reversible, no pile. Weft threads interlocked or pulled over warps. Nomadic — easy to roll and transport.' },
  { name: 'Mixed weave', detail: 'Combines pile and flat-weave in a single rug. Creates texture and depth. Glaoui tradition is the most complex — adding embroidery (chedwi) to knotting and weaving.' },
  { name: 'Symmetrical (Turkish) knot', detail: 'Common in Zemmour and Middle Atlas. Thread wraps around two warp threads, creating a symmetrical surface. Durable.' },
  { name: 'Asymmetrical (Persian) knot', detail: 'Found in Azilal and Taznakht. Thread wraps one warp, loops under the next. Creates softer, more flowing designs.' },
  { name: 'Chedwi embroidery', detail: 'Glaoui tradition. Pairs black and white wool to create diagonals, curves, and figures over a flat-weave base. Requires three techniques in one rug.' },
]

export const HERO_STATS = [
  { value: '12', label: 'Major weaving traditions' },
  { value: '400+', label: 'Tribes with distinct styles' },
  { value: '3000 BCE', label: 'Oldest known Amazigh symbols' },
  { value: '0', label: 'Identical rugs in existence' },
]

export const KEY_NUMBERS = [
  { value: '17', label: 'Beni Ourain sub-tribes', note: 'Confederation between Fez, Taza, and Mermoucha. Each with distinct motif variations.' },
  { value: '1920s', label: 'Western discovery', note: 'Le Corbusier, Aalto, Breuer paired Beni Ourains with modernist furniture.' },
  { value: '1990s', label: 'Azilal enters the market', note: 'Unknown to Western collectors until the late 20th century. ' },
  { value: 'Mid-20th C', label: 'Boucherouite emerges', note: 'Women began using recycled textiles when wool became scarce. ' },
  { value: '25%', label: 'Morocco\'s sheep in Middle Atlas', note: 'The region housing Beni Ourain territory held a quarter of the national flock (1991).' },
  { value: 'Siroua', label: 'Prized sheep breed', note: 'Long, smooth, lustrous fleece. Exclusive to Taznakht region. ' },
]
