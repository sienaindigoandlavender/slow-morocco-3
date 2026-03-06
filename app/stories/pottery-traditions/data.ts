// ─────────────────────────────────────────────────
// The Pottery Traditions of Morocco
// Module 051 — Regional ceramics mapped
// Sources: UNESCO ICH, Moroccan Ministry of Artisans,
// World Crafts Council, field documentation
// ─────────────────────────────────────────────────

export interface PotteryRegion {
  id: string
  name: string
  nameAr: string
  coords: [number, number] // [lng, lat]
  color: string
  signature: string
  clay: string
  glaze: string
  period: string
  artisans: string
  description: string
  technique: string
  products: string[]
  distinction: string
}

export const REGIONS: PotteryRegion[] = [
  {
    id: 'fes',
    name: 'Fes',
    nameAr: 'فاس',
    coords: [-4.978, 34.064],
    color: '#1E3A5F',
    signature: 'Fassi Blue',
    clay: 'Grey clay from Fes riverbeds — fine texture, fires white',
    glaze: 'Cobalt oxide, locally sourced from surrounding mineral deposits. Double firing for brilliance.',
    period: 'Active since 13th century. Peaked under Marinid dynasty (14th–15th c.)',
    artisans: '~800 active potters in Ain Nokbi cooperative district',
    description: 'The aristocrat of Moroccan ceramics. Cobalt blue on white, intricate arabesque and geometric patterns drawn from Islamic geometry. Every shade of blue — from pale sky to near-black indigo — produced by varying cobalt concentration and firing temperature.',
    technique: 'Wheel-thrown grey clay. First firing (biscuit). Hand-painted with cobalt oxide using a single horsehair brush. Second firing at ~1000°C in wood-fueled kiln. Double firing technique introduced by Andalusi refugees after the Reconquista.',
    products: ['Plates', 'Bowls', 'Tagines', 'Vases', 'Mint tea sets', 'Zellige tiles'],
    distinction: 'Artisans sign the base with their name + "Fès" or "فاس". Turn the piece over — authenticity marker.',
  },
  {
    id: 'safi',
    name: 'Safi',
    nameAr: 'آسفي',
    coords: [-9.237, 32.299],
    color: '#DC2626',
    signature: 'Polychrome & Metal Inlay',
    clay: 'Red clay from Atlantic coastal deposits — iron-rich, fires terracotta',
    glaze: 'Multicolor palette: green, yellow, brown, blue, white. Lead-based traditional glaze (transitioning to lead-free).',
    period: 'Production centre since 15th century. Peak export era: 19th century to Europe and Middle East',
    artisans: '~2,000+ artisans in Quartier des Potiers. Largest pottery workforce in Morocco.',
    description: 'Morocco\'s pottery capital. Bold, colorful, accessible. Safi potters work in the open air, kilns visible from the street. The style is warmer and more playful than Fes — floral motifs alongside geometry, Berber symbols, and increasingly contemporary designs for the export market.',
    technique: 'Wheel-thrown red clay. Single or double firing. Hand-glazed and painted. Some pieces feature metal wire inlay (fil de cuivre) pressed into wet clay before firing. Open-air kilns visible from Kéchla fortress above.',
    products: ['Tagines', 'Serving platters', 'Decorative plates', 'Ashtrays', 'Garden pots', 'Sculptural pieces'],
    distinction: 'Climb the Kéchla fortress for a panoramic view of the entire pottery quarter — hundreds of workshops, kilns smoking in rows.',
  },
  {
    id: 'tamegroute',
    name: 'Tamegroute',
    nameAr: 'تامكروت',
    coords: [-5.680, 30.264],
    color: '#15803D',
    signature: 'Tamegroute Green',
    clay: 'Desert clay — coarse, mixed with sand. Fires with natural irregularities.',
    glaze: 'Manganese and copper oxide glaze produces the distinctive green. Each piece uniquely variegated — no two identical.',
    period: 'Ancient tradition, linked to the Nassiriyya zawiya (17th century). Techniques predate the zawiya.',
    artisans: '~30 active potters. Small family workshops. Entire production sold locally or via Marrakech traders.',
    description: 'Deep green glaze — sometimes jade, sometimes emerald, sometimes almost black — produced by a secret manganese-copper formula and ancient wood-ash kiln technique. Every piece is irregular, crackled, alive. Utilitarian first: storage jars, water vessels, oil lamps for the desert.',
    technique: 'Hand-built and wheel-thrown. Single firing in underground wood-fueled kilns. Pieces placed directly into ash, creating controlled irregularities. The green varies by position in the kiln — pieces near the flame are darker.',
    products: ['Storage jars', 'Water vessels', 'Oil lamps', 'Bowls', 'Candleholders', 'Serving dishes'],
    distinction: 'No two pieces are the same color. The irregularity is the point. Interior designers worldwide now pay premium for the authentic crackled green.',
  },
  {
    id: 'salé',
    name: 'Salé',
    nameAr: 'سلا',
    coords: [-6.798, 34.050],
    color: '#78716C',
    signature: 'Oulja Earth Tones',
    clay: 'Light brown clay from the Bou Regreg valley — smooth, even texture',
    glaze: 'Minimal glazing. Natural earth tones. Some pieces left entirely unglazed.',
    period: 'Potters\' complex (Oulja) established mid-20th century but tradition is older',
    artisans: '~500 artisans in the Oulja pottery complex, one of Africa\'s largest',
    description: 'The Oulja complex in Salé is a vast pottery production zone — rows of workshops, kilns, and showrooms spread across several hectares. Style is more contemporary than Fes or Safi, with designers collaborating with traditional potters. Earth tones, clean lines, modern shapes meeting ancestral technique.',
    technique: 'Wheel-thrown and mold-cast. Wood and gas kilns. Increasingly incorporating contemporary design sensibility while maintaining hand-production. Collaborative studio model — designers work alongside craftsmen.',
    products: ['Tableware', 'Vases', 'Planters', 'Architectural elements', 'Contemporary sculptures', 'Hotel commission pieces'],
    distinction: 'Where tradition meets contemporary design. The complex is open to visitors — a working factory-village, not a tourist show.',
  },
  {
    id: 'rif',
    name: 'Rif Mountains',
    nameAr: 'الريف',
    coords: [-4.980, 34.980],
    color: '#92400E',
    signature: 'Unglazed Berber Pottery',
    clay: 'Mountain clay — red-brown, coarse-grained',
    glaze: 'None. Unglazed. Color comes entirely from the clay and firing conditions.',
    period: 'Pre-Islamic tradition. Among the oldest continuous pottery practices in Morocco — 3,000+ years.',
    artisans: 'Women potters. Rural, household production. No workshop infrastructure — made at home.',
    description: 'The oldest tradition. Women hand-build (no wheel) vessels for cooking, storage, and ritual use. Geometric motifs — triangles, diamonds, zigzags — scratched into the surface before firing. These are Amazigh symbols: fertility, protection, the evil eye. No glaze, no color, no decoration beyond the marks. The pottery IS the symbol.',
    technique: 'Hand-coiled (no wheel). Open-air firing in brushwood. Burnished with river stones before firing. Geometric motifs incised with wooden tools. Smoke-darkened finishes from reduction firing.',
    products: ['Cooking pots', 'Water storage', 'Butter churns', 'Ritual vessels', 'Incense burners'],
    distinction: 'Made by women. Exclusively female. The symbols are the same as those on Amazigh tattoos and carpets — a shared visual language.',
  },
  {
    id: 'meknes',
    name: 'Meknes',
    nameAr: 'مكناس',
    coords: [-5.554, 33.893],
    color: '#6A4C93',
    signature: 'Zellige Mosaic Tilework',
    clay: 'Local clay — prepared specifically for flat tile production',
    glaze: 'Enamel glazes in limited palette: white, green, blue, yellow, brown, black. Each color fired separately.',
    period: 'Peaked under Marinid dynasty (13th–15th c.). Moulay Ismail era (17th c.) expanded production massively.',
    artisans: 'Maalem (master) + apprentice system. ~200 active zellige cutters in Meknes region.',
    description: 'Not pottery in the vessel sense — but the highest expression of Moroccan ceramic art. Zellige (from Arabic al-zulaij) are hand-cut mosaic tiles assembled into geometric patterns of staggering mathematical complexity. Each tiny piece is chipped by hand with a hammer (menqash) from larger glazed tiles.',
    technique: 'Clay formed into flat tiles, glazed in solid color, fired. Then each tile is hand-cut into geometric shapes (up to 300+ shape types) using a specialized hammer. Pieces assembled face-down on a flat surface, backed with plaster. Installed as architectural panels.',
    products: ['Fountain surrounds', 'Wall panels', 'Floor mosaics', 'Column cladding', 'Table tops', 'Architectural restoration'],
    distinction: 'A single zellige panel can contain 10,000+ hand-cut pieces. The maalem who designs the pattern works from memory — no templates, no drawings.',
  },
]

// ─────────────────────────────────────────────────
// HISTORICAL TIMELINE
// ─────────────────────────────────────────────────

export interface PotteryEra {
  period: string
  title: string
  detail: string
}

export const HISTORY: PotteryEra[] = [
  { period: '~4000 BCE', title: 'Neolithic Berber Pottery', detail: 'Earliest hand-built vessels in North Africa. Functional: storage, cooking, burial. Geometric motifs already present.' },
  { period: '~1000 BCE', title: 'Phoenician & Roman Influence', detail: 'Potter\'s wheel introduced. New firing techniques. Volubilis workshops produce refined tableware.' },
  { period: '8th–9th c.', title: 'Islamic Arrival', detail: 'Non-figurative art emphasis drives geometric and calligraphic decoration. First structured production centres in Fes under the Idrisids.' },
  { period: '11th–13th c.', title: 'Almoravid & Almohad Expansion', detail: 'Glazed ceramics flourish. Vibrant greens, blues, whites enter the palette. Architectural tilework begins.' },
  { period: '13th–15th c.', title: 'Marinid Golden Age', detail: 'Zellige reaches its peak. Fes and Meknes become centres of ceramic art. Bou Inania and Attarine madrasas showcase the craft.' },
  { period: '15th–16th c.', title: 'Andalusi Refugees', detail: 'Exiled potters from Spain bring double-firing technique to Fes. "Le Bleu de Fès" is born. Brighter, more durable glazes.' },
  { period: '17th c.', title: 'Moulay Ismail & Safi Rise', detail: 'Meknes becomes capital — massive zellige production. Safi emerges as an independent pottery centre for export.' },
  { period: '19th–20th c.', title: 'Export & Colonialism', detail: 'French protectorate documents and catalogues traditions. Safi exports to Europe. Salé\'s Oulja complex formalised.' },
  { period: '21st c.', title: 'Revival & Global Market', detail: 'Interior design boom drives demand. Tamegroute green becomes globally coveted. UNESCO recognises zellige. Contemporary designers collaborate with traditional potters.' },
]

// ─────────────────────────────────────────────────
// PRODUCTION DATA
// ─────────────────────────────────────────────────

export interface ProductionStat {
  label: string
  value: string
  note: string
}

export const PRODUCTION: ProductionStat[] = [
  { label: 'Active artisans', value: '~4,000+', note: 'Across all regions' },
  { label: 'Largest centre', value: 'Safi', note: '2,000+ potters in Quartier des Potiers' },
  { label: 'Oldest tradition', value: '6,000+ years', note: 'Neolithic Berber ceramics' },
  { label: 'Zellige shapes', value: '300+', note: 'Hand-cut geometric forms from memory' },
  { label: 'Annual ceramics export', value: '~$45M', note: 'Tableware, decorative, architectural' },
  { label: 'UNESCO recognition', value: 'Zellige', note: 'Intangible Cultural Heritage list' },
]

// ─────────────────────────────────────────────────
// HERO STATS
// ─────────────────────────────────────────────────

export const HERO_STATS = [
  { value: '6', label: 'Regional traditions' },
  { value: '6,000+', label: 'Years of production' },
  { value: '~4,000', label: 'Active artisans' },
  { value: '300+', label: 'Zellige shapes' },
]
