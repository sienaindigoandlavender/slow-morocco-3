// ─────────────────────────────────────────────────
// The Anatomy of a Riad — Deconstructing the
// Moroccan House Form
// Module 053 — Architectural Intelligence
// Sources: Field documentation, Islamic architecture,
// Metropolis Magazine, Wikipedia, riad surveys
// ─────────────────────────────────────────────────

export interface ArchitecturalElement {
  id: string
  name: string
  nameAr: string
  category: 'structure' | 'material' | 'craft'
  description: string
  detail: string
  color: string
}

export const ELEMENTS: ArchitecturalElement[] = [
  // Structure
  {
    id: 'wust-al-dar', name: 'Wust al-Dar (Courtyard)', nameAr: 'وسط الدار',
    category: 'structure',
    description: 'The heart. An open-sky rectangle divided into four quadrants by paved paths, with a fountain at the center.',
    detail: 'From the Arabic for "center of the house." All rooms face inward to this space. Planted with orange, lemon, or palm trees. The courtyard is both living room and climate engine — hot air rises out, cool air circulates below. In Islam, paradise is a garden with a fountain of nourishing water. The courtyard is paradise made architectural.',
    color: '#5C7C3E',
  },
  {
    id: 'sahridj', name: 'Sahridj (Fountain/Basin)', nameAr: 'الصهريج',
    category: 'structure',
    description: 'The central water feature. Marble or zellige. Functional cooling and spiritual purification.',
    detail: 'More than decoration. The fountain cools the air through evaporation, produces white noise that masks city sounds, and represents spiritual purification in Islamic tradition. Connected to drainage systems centuries old that still function. Water channels often radiate to the four quadrants of the garden, echoing the Persian chahar bagh (four-garden) form.',
    color: '#2D5F8A',
  },
  {
    id: 'bayt', name: 'Bâyt (Elongated Room)', nameAr: 'البيت',
    category: 'structure',
    description: 'The long rooms lining the courtyard perimeter. Public salons and dining rooms on the ground floor.',
    detail: 'Each bâyt has a central open arched passage looking onto the courtyard and fountain. Typically taller than they are wide — proportions that channel airflow. Ground floor bâyts are semi-public: salons, dining, receiving rooms. They stay cool in summer. Upper floor rooms are private bedrooms.',
    color: '#F59E0B',
  },
  {
    id: 'douiria', name: 'Douiria (Guest Apartment)', nameAr: 'الدويرية',
    category: 'structure',
    description: 'A private apartment with its own street entrance. For receiving guests without entering the family home.',
    detail: 'A riad within a riad. The douiria has its own door to the street, a couple of rooms, a lounge, and sometimes a private terrace. It allowed hosts to receive male visitors without disrupting the household\'s female spaces — a solution to Islamic privacy requirements that is also architecturally elegant.',
    color: '#7B506F',
  },
  {
    id: 'douriya', name: 'Douriya (Bent Entrance)', nameAr: 'الضورية',
    category: 'structure',
    description: 'The angled corridor between the front door and the courtyard. Prevents the street seeing inside.',
    detail: 'Never a straight line from street to courtyard. The passage bends — sometimes twice — so no passerby can glimpse the private interior when the door opens. The transition moves from dark (the setwan entrance vestibule) to brilliant light (the open courtyard). The contrast is deliberate: arrival is a passage from the profane to the sacred.',
    color: '#78716C',
  },
  {
    id: 'setwan', name: 'Setwan (Entrance Vestibule)', nameAr: 'السطوان',
    category: 'structure',
    description: 'The modest sitting area just inside the front door. Guests can be received here without entering the house.',
    detail: 'Subdued lighting. A transitional space. If you are a stranger, this is as far as you go. If you are a guest, the host leads you past the angled corridor into the courtyard. The setwan is the gatekeeper — social architecture that sorts intimacy levels.',
    color: '#78716C',
  },
  {
    id: 'terrace', name: 'Terrace (Stah)', nameAr: 'السطح',
    category: 'structure',
    description: 'The rooftop. Open sky, panoramic views over the medina. Traditionally a women\'s domain.',
    detail: 'Surrounded by low walls. Historically where women socialized — the one outdoor space invisible from the street. Today the riad terrace is where guests eat breakfast and watch the sunset. Roof edges slope inward so rainwater flows into the courtyard garden, not onto the street. Functional to the last detail.',
    color: '#EC4899',
  },
  // Materials
  {
    id: 'tadelakt', name: 'Tadelakt', nameAr: 'تادلاكت',
    category: 'material',
    description: 'Waterproof lime plaster polished with river stones and sealed with black olive oil soap. Silky, marble-like.',
    detail: ' Made from lime plaster mixed with regional mineral pigments, applied by hand, then polished with flat river stones until it gleams. Sealed with black soap (savon noir) made from olive oil. The result is waterproof, slightly glossy, and develops a patina over decades. Used in bathrooms, hammams, and feature walls. Each application is unique — no two surfaces are identical.',
    color: '#D4A373',
  },
  {
    id: 'zellige', name: 'Zellige (Mosaic Tilework)', nameAr: 'الزليج',
    category: 'craft',
    description: 'Hand-cut geometric terracotta tiles assembled into mathematical mosaics. No two tiles are exactly alike.',
    detail: 'Each tile is hand-cut from glazed terracotta by a maalem (master craftsman) using a hammer and chisel. Tiles are cut face-down — the artisan works blind, feeling the geometry. No grout lines in authentic zellige; tiles fit perfectly like a jigsaw. A single room can take months. Colors are symbolic: blue for sky and water, green for paradise, white for purity, earth tones for the land. In Islamic art, no living figures — only geometry, because only God creates life.',
    color: '#2D5F8A',
  },
  {
    id: 'moucharabieh', name: 'Moucharabieh (Lattice Screen)', nameAr: 'المشربية',
    category: 'craft',
    description: 'Hand-carved wooden lattice screens. Allow airflow and filtered light while maintaining privacy.',
    detail: 'Carved from Atlas cedar — the wood that defines Moroccan interiors. The lattice is dense enough that those inside can see out, but those outside cannot see in. Simultaneously a privacy screen, air filter, and light diffuser. The geometric patterns cast moving shadows throughout the day. Found on windows, balconies, and room dividers. The craft requires years of apprenticeship.',
    color: '#C17F28',
  },
  {
    id: 'gebs', name: 'Gebs (Carved Stucco)', nameAr: 'الجبص',
    category: 'craft',
    description: 'Intricate plaster carving — Islamic calligraphy, arabesques, muqarnas. Applied wet, carved before it sets.',
    detail: 'Applied as wet plaster to walls and ceilings, then carved by hand before it hardens. Floral arabesques, geometric interlace, and Quranic calligraphy. The most elaborate gebs is in Fes — entire rooms carved floor to ceiling. The craft allows no erasure: one wrong cut and the panel must be redone. Often painted white or left natural, sometimes highlighted with color.',
    color: '#A0452E',
  },
  {
    id: 'cedar', name: 'Cedar Wood (Khashab al-Arz)', nameAr: 'خشب الأرز',
    category: 'material',
    description: 'Atlas cedar. Ceilings, doors, window frames, moucharabieh. Naturally insect-resistant. Warm, aromatic.',
    detail: 'Harvested from the Middle Atlas forests (protected since 1927). Cedar is the prestige wood of Morocco — its scent fills the riad. Used for coffered ceilings (sometimes painted in polychrome), carved doors, and structural beams. Naturally resistant to insects and rot. The warm reddish tone darkens with age. A cedar ceiling in a riad can last centuries.',
    color: '#92400E',
  },
]

export interface ClimateFeature {
  feature: string
  mechanism: string
}

export const CLIMATE_SYSTEM: ClimateFeature[] = [
  { feature: 'Thermal chimney effect', mechanism: 'The open courtyard acts as a chimney. Hot air rises and escapes upward through the open roof. Cooler air is drawn in at ground level through doorways and passages. No mechanical cooling required.' },
  { feature: 'Evaporative cooling', mechanism: 'The central fountain evaporates water, lowering air temperature in the courtyard. Plants transpire moisture. The combined effect can reduce temperatures 5–8°C below the street outside.' },
  { feature: 'Thermal mass', mechanism: 'Thick rammed-earth or brick walls (40–60 cm) absorb heat during the day and release it slowly at night. Interior temperatures remain stable while exterior temperatures swing 20°C between day and night.' },
  { feature: 'Inward orientation', mechanism: 'No windows face the street. All openings face the courtyard. This minimizes direct solar gain on living spaces and maximizes reflected, indirect light — bright without harsh sun.' },
  { feature: 'Rainwater harvesting', mechanism: 'Roof edges slope inward. Rainwater flows into the courtyard garden and fountain, not onto the street. Water is channeled to cisterns or garden beds. Nothing is wasted in an arid climate.' },
  { feature: 'Seasonal room assignment', mechanism: 'Ground floor rooms stay cool in summer. Upper rooms capture more warmth in winter. Traditional households moved between floors with the seasons. Architecture as calendar.' },
]

export interface RiadVocabulary {
  term: string
  termAr: string
  meaning: string
}

export const VOCABULARY: RiadVocabulary[] = [
  { term: 'Riad (Riyad)', termAr: 'رياض', meaning: 'From Arabic for "gardens" (plural of rawḍa). Historically refers to a rectangular courtyard garden divided into four quadrants. Now commonly means any traditional Moroccan house with a courtyard.' },
  { term: 'Dar', termAr: 'دار', meaning: 'A traditional house without a garden in the courtyard. Simpler than a riad. No fountain, no planted quadrants. Same inward-facing structure, less ornate.' },
  { term: 'Sahn', termAr: 'الصحن', meaning: 'The central open-air courtyard itself. The architectural and social heart of the house.' },
  { term: 'Koubba', termAr: 'القبة', meaning: '"Dome" in Arabic. The first room when you enter the riad. A reception space under a domed or vaulted ceiling.' },
  { term: 'Bâyt', termAr: 'البيت', meaning: 'The elongated rooms lining the courtyard. Public salons on ground floor, private bedrooms above.' },
  { term: 'Bhou', termAr: 'البهو', meaning: 'The main reception salon. The most elaborately decorated room. Where honored guests are received.' },
  { term: 'Menzeh', termAr: 'المنزه', meaning: 'A rooftop pavilion or belvedere. A covered structure on the terrace for shade and views.' },
  { term: 'Bortal', termAr: 'البرطال', meaning: 'The covered gallery surrounding the courtyard on the upper floor. A colonnaded walkway connecting rooms.' },
]

export const HERO_STATS = [
  { value: '12', label: 'Architectural elements' },
  { value: '6', label: 'Climate systems' },
  { value: '1,000+', label: 'Years of evolution' },
  { value: '0', label: 'Street-facing windows' },
]

export const RIAD_VS_DAR = [
  { feature: 'Courtyard garden', riad: 'Yes — four planted quadrants', dar: 'Courtyard but no garden' },
  { feature: 'Central fountain', riad: 'Yes — marble or zellige', dar: 'Not always' },
  { feature: 'Scale', riad: 'Larger — merchant or wealthy family', dar: 'Smaller — middle-class family' },
  { feature: 'Decoration', riad: 'Elaborate — zellige, gebs, cedar', dar: 'Simpler — tadelakt, basic tilework' },
  { feature: 'Douiria', riad: 'Often present', dar: 'Rarely' },
  { feature: 'Rooms', riad: '5–12+', dar: '3–6' },
]
