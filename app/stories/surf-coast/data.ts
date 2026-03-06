// ─────────────────────────────────────────────────
// Morocco's Surf Coast
// Module 047 — Coastal Intelligence
// Sources: Surfline, Stormrider, Surf-Forecast,
// Taghazout Surf Expo, Wavelength, TelQuel,
// Royal Moroccan Surfing Federation, Wikipedia
// ─────────────────────────────────────────────────

export interface SurfSpot {
  id: string
  name: string
  localName?: string
  zone: string
  coords: [number, number]
  type: 'point break' | 'beach break' | 'reef break'
  direction: 'right' | 'left' | 'both'
  level: 'beginner' | 'intermediate' | 'advanced' | 'expert'
  bestSwell: string
  bestTide: string
  bestWind: string
  maxRide: string
  note: string
  color: string
}

export const SPOTS: SurfSpot[] = [
  // ── TAGHAZOUT ZONE ──
  {
    id: 'anchor-point', name: 'Anchor Point', localName: 'Madraba / Ikhflout', zone: 'Taghazout',
    coords: [-9.712, 30.545], type: 'point break', direction: 'right', level: 'advanced',
    bestSwell: 'NW ground swell, 4–8 ft, 10–15s period', bestTide: 'Low to mid', bestWind: 'NE offshore',
    maxRide: '500m+ on big days', color: '#C8A415',
    note: 'Morocco\'s most legendary wave. Long right peeling along a rock shelf. Multiple hollow sections. Named for old anchors visible at extreme low tide. Needs solid NW ground swell to light up.',
  },
  {
    id: 'killer-point', name: 'Killer Point', zone: 'Taghazout',
    coords: [-9.722, 30.548], type: 'point break', direction: 'right', level: 'expert',
    bestSwell: 'NW, 6–10 ft', bestTide: 'All tides when big', bestWind: 'NE offshore',
    maxRide: '300m+', color: '#A0452E',
    note: 'Named after orca sightings. Major swell magnet — picks up the biggest waves in the area. 20-minute paddle out thins the crowd. Handles massive swells.',
  },
  {
    id: 'hash-point', name: 'Hash Point', zone: 'Taghazout',
    coords: [-9.710, 30.541], type: 'point break', direction: 'right', level: 'intermediate',
    bestSwell: 'NW, 3–6 ft', bestTide: 'Mid to high', bestWind: 'NE offshore',
    maxRide: '150m', color: '#2D5F8A',
    note: 'Mellow right-hander breaking right below the surf camps. Perfect for all levels when small; fast and hollow when big. Visible from most Taghazout rooftops.',
  },
  {
    id: 'panoramas', name: 'Panoramas', zone: 'Taghazout',
    coords: [-9.708, 30.539], type: 'beach break', direction: 'both', level: 'beginner',
    bestSwell: 'NW, 2–4 ft', bestTide: 'Mid to high', bestWind: 'NE offshore',
    maxRide: '100m', color: '#60A5FA',
    note: 'Central Taghazout beach break. Popular with surf schools. Versatile — can also deliver clean walls on bigger days.',
  },
  {
    id: 'la-source', name: 'La Source', zone: 'Taghazout',
    coords: [-9.714, 30.547], type: 'reef break', direction: 'right', level: 'intermediate',
    bestSwell: 'NW, 3–6 ft', bestTide: 'Mid', bestWind: 'NE offshore',
    maxRide: '150m', color: '#2D5F8A',
    note: 'Performance wave between Anchor Point and Mysteries. Rock reef bottom. Less crowded than Anchor.',
  },
  {
    id: 'boilers', name: 'Boilers', zone: 'Taghazout',
    coords: [-9.726, 30.552], type: 'point break', direction: 'right', level: 'expert',
    bestSwell: 'NW, 4–8 ft', bestTide: 'Low', bestWind: 'NE offshore',
    maxRide: '200m', color: '#A0452E',
    note: 'Named for a wrecked ship\'s boiler visible at low tide. Fast, powerful right. Shallow reef with sea urchins. Cap Ghir lighthouse nearby provides heavy offshore wind. Barreling.',
  },
  // ── TAMRAGHT / AOURIR ZONE ──
  {
    id: 'banana-point', name: 'Banana Point', zone: 'Aourir',
    coords: [-9.690, 30.507], type: 'point break', direction: 'right', level: 'beginner',
    bestSwell: 'NW, 2–4 ft', bestTide: 'Mid to high', bestWind: 'NE offshore',
    maxRide: '200m', color: '#5C7C3E',
    note: 'Named for the banana plantations of Aourir village. Long, easy right-hander protected from wind by the cape. One of the best beginner point breaks in Morocco.',
  },
  {
    id: 'devils-rock', name: 'Devil\'s Rock', zone: 'Tamraght',
    coords: [-9.695, 30.517], type: 'beach break', direction: 'both', level: 'beginner',
    bestSwell: 'NW, 2–5 ft', bestTide: 'Mid', bestWind: 'NE offshore',
    maxRide: '80m', color: '#5C7C3E',
    note: 'Below a striking rock formation. Sandy bottom. Favorite of surf schools. Predominantly left but offers mellow rights depending on sandbanks.',
  },
  // ── IMSOUANE ZONE ──
  {
    id: 'the-bay', name: 'The Bay (La Baie)', zone: 'Imsouane',
    coords: [-9.831, 30.842], type: 'point break', direction: 'right', level: 'beginner',
    bestSwell: 'NW, 2–5 ft', bestTide: 'Low to mid (rising)', bestWind: 'NE offshore',
    maxRide: '700m — one of the longest in Africa', color: '#C8A415',
    note: 'Longboard paradise. Sand bottom, mellow, peeling forever. Up to 700m rides on perfect days. Walk back to the peak — don\'t paddle. Becomes a swimming pool at high tide.',
  },
  {
    id: 'cathedral', name: 'Cathedral Point', zone: 'Imsouane',
    coords: [-9.825, 30.845], type: 'point break', direction: 'right', level: 'intermediate',
    bestSwell: 'NW, 3–6 ft', bestTide: 'Mid to high', bestWind: 'NE offshore',
    maxRide: '200m', color: '#2D5F8A',
    note: 'Punchier than The Bay. Reef and rock bottom. Consistent during winter and autumn. Appreciated by shortboarders and bodyboarders.',
  },
  // ── ESSAOUIRA ZONE ──
  {
    id: 'sidi-kaouki', name: 'Sidi Kaouki', zone: 'Essaouira',
    coords: [-9.793, 31.359], type: 'beach break', direction: 'both', level: 'beginner',
    bestSwell: 'NW, 3–6 ft', bestTide: 'All tides', bestWind: 'Variable — often windy',
    maxRide: '100m', color: '#5C7C3E',
    note: 'Long sandy beach 25km south of Essaouira. Kitesurfing and surfing side by side. Remote, uncrowded, spiritual. Sufi marabout shrine at the point.',
  },
  {
    id: 'essaouira-bay', name: 'Essaouira Bay', zone: 'Essaouira',
    coords: [-9.770, 31.506], type: 'beach break', direction: 'both', level: 'beginner',
    bestSwell: 'NW, 3–6 ft', bestTide: 'Mid', bestWind: 'Morning calm — afternoon wind',
    maxRide: '80m', color: '#60A5FA',
    note: 'Morning surf, afternoon kite. Strong cross-shore winds from midday. UNESCO medina as the backdrop. Mornings are glassy and uncrowded.',
  },
  // ── TAMRI ──
  {
    id: 'tamri', name: 'Tamri', zone: 'Between Taghazout & Imsouane',
    coords: [-9.810, 30.688], type: 'beach break', direction: 'both', level: 'intermediate',
    bestSwell: 'NW, 3–6 ft', bestTide: 'Mid', bestWind: 'NE offshore',
    maxRide: '120m', color: '#2D5F8A',
    note: 'Untouched fishing village with a river mouth. Picks up more swell than any spot nearby. The "savior when it\'s flat in Tamraght." Not touristic. Goat tagine for lunch.',
  },
  // ── SAFI ──
  {
    id: 'safi', name: 'Safi', zone: 'Safi',
    coords: [-9.237, 32.310], type: 'point break', direction: 'right', level: 'expert',
    bestSwell: 'NW, 6–10 ft', bestTide: 'Low to mid', bestWind: 'E offshore',
    maxRide: '300m', color: '#A0452E',
    note: 'Semi-secret barrel. One of the best sand point breaks in the world — but fickle, rare, and extremely heavy. Pros and barrel-hounds only. North of Essaouira.',
  },
]

export interface SurfZone {
  id: string
  name: string
  description: string
  spots: number
  coords: [number, number]
  color: string
}

export const ZONES: SurfZone[] = [
  { id: 'taghazout', name: 'Taghazout Bay', description: 'Morocco\'s surf capital. World-class points packed into a few km of coast. 78+ registered surf schools.', spots: 8, coords: [-9.715, 30.543], color: '#C8A415' },
  { id: 'aourir', name: 'Aourir / Tamraght', description: 'Mellow surf village between Agadir and Taghazout. Banana plantations and beginner-friendly waves.', spots: 3, coords: [-9.692, 30.512], color: '#5C7C3E' },
  { id: 'imsouane', name: 'Imsouane', description: 'Fishing village. Home to one of Africa\'s longest waves. Longboard paradise. Laid-back and remote.', spots: 2, coords: [-9.828, 30.843], color: '#C8A415' },
  { id: 'essaouira', name: 'Essaouira', description: 'Wind city. Morning surf, afternoon kite. UNESCO medina. Cross-shore winds from midday.', spots: 2, coords: [-9.780, 31.430], color: '#60A5FA' },
  { id: 'safi', name: 'Safi', description: 'Morocco\'s barrel capital. Fickle, heavy, world-class sand point. Experts only.', spots: 1, coords: [-9.237, 32.310], color: '#A0452E' },
]

export interface Season {
  months: string
  label: string
  swell: string
  waterTemp: string
  airTemp: string
  wetsuit: string
  wind: string
  crowd: string
  rating: number // 1-5
  color: string
}

export const SEASONS: Season[] = [
  { months: 'Oct–Dec', label: 'Early Winter', swell: '3–8 ft NW ground swells arrive. Consistency builds through Nov.', waterTemp: '18–20°C', airTemp: '20–26°C', wetsuit: '3/2mm', wind: 'Light, often offshore mornings', crowd: 'Moderate — season opening', rating: 5, color: '#C8A415' },
  { months: 'Jan–Mar', label: 'Peak Season', swell: '4–10 ft+ consistent NW swells. Biggest waves of the year.', waterTemp: '16–18°C', airTemp: '16–22°C', wetsuit: '4/3mm', wind: 'Glassy mornings, onshore afternoons', crowd: 'High — full surf camps', rating: 5, color: '#A0452E' },
  { months: 'Apr–Jun', label: 'Spring', swell: '2–5 ft, decreasing. Last good swells in April.', waterTemp: '17–19°C', airTemp: '20–28°C', wetsuit: '3/2mm', wind: 'NW thermal winds increase', crowd: 'Low–moderate', rating: 3, color: '#2D5F8A' },
  { months: 'Jul–Sep', label: 'Summer', swell: '1–3 ft. Mostly flat. Occasional windswells.', waterTemp: '19–22°C', airTemp: '25–35°C', wetsuit: '2mm / shorty', wind: 'Strong NW thermal winds', crowd: 'Low — mainly beginners', rating: 1, color: '#D4D4D4' },
]

export const HERO_STATS = [
  { value: '15', label: 'Mapped spots' },
  { value: '700m', label: 'Longest ride (The Bay)' },
  { value: '78+', label: 'Surf schools (Taghazout)' },
  { value: '50K+', label: 'Surf camp guests/year' },
]

export const ECONOMY = [
  { value: '78+', label: 'Registered surf schools', note: 'Taghazout Bay — plus informal operators' },
  { value: '50,000+', label: 'Surf camp guests/year', note: 'Taghazout alone' },
  { value: '~500', label: 'Direct surf industry jobs', note: 'Instructors, camp staff, equipment' },
  { value: '20,000', label: 'Jobs target (Azur Plan)', note: 'Government coastal tourism investment' },
  { value: '3', label: 'Taghazout Surf Expo editions', note: '40,000 attendees at 2024 expo, 80+ exhibitors' },
  { value: '3,500 km', label: 'Coastline', note: 'Atlantic + Mediterranean' },
  { value: '3 hrs', label: 'From Europe', note: 'Direct flights to Agadir from major cities' },
  { value: '~$8', label: 'Average meal cost', note: 'Tagine, seafood, couscous' },
]

export const SPOT_LEVELS = {
  beginner: { color: '#5C7C3E', count: SPOTS.filter(s => s.level === 'beginner').length },
  intermediate: { color: '#2D5F8A', count: SPOTS.filter(s => s.level === 'intermediate').length },
  advanced: { color: '#C8A415', count: SPOTS.filter(s => s.level === 'advanced').length },
  expert: { color: '#A0452E', count: SPOTS.filter(s => s.level === 'expert').length },
} as const
