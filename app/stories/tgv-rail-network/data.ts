// ─────────────────────────────────────────────────
// The TGV & Rail Network
// Module 060 — Infrastructure Intelligence
// Sources: Wikipedia, ONCF, Morocco World News,
// Atalayar, Maghreb Magazine
// ─────────────────────────────────────────────────

export interface RailLine {
  id: string
  name: string
  type: 'high-speed' | 'conventional' | 'planned' | 'night'
  route: string
  distance: string
  topSpeed: string
  travelTime: string
  detail: string
  status: 'operational' | 'under-construction' | 'planned'
  color: string
  coords: [number, number][]  // key stations [lng, lat]
}

export const LINES: RailLine[] = [
  {
    id: 'al-boraq', name: 'Al Boraq', type: 'high-speed',
    route: 'Tangier → Kenitra → Rabat → Casablanca',
    distance: '323 km (186 km true high-speed)', topSpeed: '320 km/h', travelTime: '2h 10min',
    detail: 'Africa\'s only high-speed rail. Opened 15 November 2018. Named after the mythical creature that transported the Prophet Muhammad. 186 km dedicated high-speed track (Tangier–Kenitra) + 137 km upgraded conventional (Kenitra–Casablanca). 12 Alstom Euroduplex trainsets, 533 passengers each. Hourly departures 06:00–21:00. African speed record: 357 km/h set during testing (2017). 5.6 million passengers in 2025.',
    status: 'operational', color: '#A0452E',
    coords: [[-5.81, 35.76], [-6.58, 34.26], [-6.85, 34.02], [-7.59, 33.57]],
  },
  {
    id: 'ns-mainline', name: 'North–South Mainline', type: 'conventional',
    route: 'Tangier → Kenitra → Rabat → Casablanca → Marrakech',
    distance: '~600 km', topSpeed: '160 km/h', travelTime: '~7h end-to-end (conventional)',
    detail: 'Morocco\'s spine. Connects all major Atlantic coast cities. The Casablanca–Kenitra section is shared with Al Boraq. South of Casablanca, the line continues to El Jadida junction, Settat, and Marrakech. Al Atlas intercity service. Night trains with couchettes and private compartments.',
    status: 'operational', color: '#2D5F8A',
    coords: [[-5.81, 35.76], [-6.58, 34.26], [-6.85, 34.02], [-7.59, 33.57], [-8.01, 32.30], [-7.99, 31.63]],
  },
  {
    id: 'ew-mainline', name: 'East–West Mainline', type: 'conventional',
    route: 'Oujda → Taza → Fes → Meknes → Sidi Kacem → (joins N–S)',
    distance: '~600 km', topSpeed: '160 km/h', travelTime: '~10h Oujda–Casablanca',
    detail: 'Connects the eastern border to the Atlantic corridor. Junction at Sidi Kacem. Night hotel train Casablanca–Oujda (departs 21:15, arrives 07:00). The Fes–Meknes segment is one of Morocco\'s most scenic. Branch line from Taourirt to Nador (100 km, opened 2009).',
    status: 'operational', color: '#F59E0B',
    coords: [[-1.91, 34.68], [-4.01, 34.22], [-4.98, 34.03], [-5.54, 33.90], [-5.71, 34.23]],
  },
  {
    id: 'hsr-marrakech', name: 'Al Boraq Extension to Marrakech', type: 'planned',
    route: 'Kenitra → Casablanca Airport → Marrakech',
    distance: '~492 km new dedicated track', topSpeed: '320 km/h', travelTime: '2h 45min Tangier–Marrakech (target)',
    detail: 'Three construction segments: Kenitra–Aïn Sebaâ (150 km), Aïn Sebaâ–Nouaceur via Casablanca Airport (130 km), Nouaceur–Marrakech (212 km). Will replace current shared conventional track. 18 new Alstom Avelia Horizon trainsets ordered (€781M, March 2025, delivery from 2027). Target completion by 2029–2030, ahead of 2030 FIFA World Cup.',
    status: 'under-construction', color: '#7B506F',
    coords: [[-6.58, 34.26], [-7.59, 33.57], [-7.59, 33.37], [-7.99, 31.63]],
  },
  {
    id: 'hsr-agadir', name: 'Marrakech–Agadir High-Speed', type: 'planned',
    route: 'Marrakech → Chichaoua → Agadir',
    distance: '~230 km', topSpeed: '320 km/h', travelTime: 'TBD',
    detail: 'Land procurement has begun. Stop at Chichaoua (pop. <16,000). Original extension to Essaouira dropped due to difficult terrain and economics — Essaouira to be connected via 200 km/h intercity service instead. Would bring rail to the Souss-Massa region for the first time.',
    status: 'planned', color: '#5C7C3E',
    coords: [[-7.99, 31.63], [-8.76, 31.35], [-9.60, 30.43]],
  },
  {
    id: 'hsr-fes', name: 'Rabat–Fes–Oujda High-Speed', type: 'planned',
    route: 'Rabat → Meknes → Fes → (Taza → Oujda)',
    distance: '~480 km', topSpeed: '320 km/h', travelTime: 'TBD',
    detail: 'Feasibility studies underway for Rabat–Fes via Meknes. ONCF has announced intent to extend to Oujda via Taza and Taourirt. Would connect Morocco\'s eastern gateway to the high-speed network. Part of the 2040 Rail Strategy\'s 1,100 km high-speed target.',
    status: 'planned', color: '#78716C',
    coords: [[-6.85, 34.02], [-5.54, 33.90], [-4.98, 34.03], [-1.91, 34.68]],
  },
]

export interface PassengerStat {
  year: string
  totalPassengers: string
  alBoraqPassengers: string
  revenue: string
  freight: string
  note: string
}

export const PASSENGER_DATA: PassengerStat[] = [
  { year: '2022', totalPassengers: '~47M', alBoraqPassengers: '~4.2M', revenue: '—', freight: '—', note: 'Post-COVID recovery year' },
  { year: '2023', totalPassengers: '53M', alBoraqPassengers: '5.2M', revenue: '~$450M', freight: '17M tonnes', note: 'Al Boraq +25% over 2022' },
  { year: '2024', totalPassengers: '55M', alBoraqPassengers: '5.5M', revenue: '$480M+', freight: '20M tonnes', note: 'Freight +17% YoY. Phosphate recovery.' },
  { year: '2025 (proj)', totalPassengers: '56–57M', alBoraqPassengers: '5.6M', revenue: '$500M+', freight: '21M tonnes', note: 'Largest investment plan in ONCF history begins.' },
  { year: '2026 (target)', totalPassengers: '58.5M', alBoraqPassengers: 'TBD', revenue: '5.4B MAD', freight: '24M tonnes', note: '+4% passenger growth. Investment: 23B MAD.' },
]

export interface MilestoneFact {
  value: string
  label: string
  detail: string
  color: string
}

export const MILESTONES: MilestoneFact[] = [
  { value: '2018', label: 'Al Boraq opens', detail: 'Africa\'s first (and still only) high-speed rail. Casablanca–Tangier in 2h 10min vs. 4h 45min previously.', color: '#A0452E' },
  { value: '357 km/h', label: 'African speed record', detail: 'Set during testing in February 2017. Revenue service tops out at 320 km/h.', color: '#F59E0B' },
  { value: '€781M', label: '18 new trainsets ordered', detail: 'Alstom Avelia Horizon. Ordered March 2025. Deliveries from 2027 for the Marrakech extension.', color: '#7B506F' },
  { value: '$9.5B', label: '2030 rail investment', detail: 'Total planned investment to 2030. New stations, rolling stock, extensions, regional express services.', color: '#2D5F8A' },
  { value: '43 cities', label: '2040 network target', detail: 'Up from 23 cities currently connected. 87% population coverage (from 51%). 12 ports, 15 airports linked.', color: '#5C7C3E' },
  { value: '300,000', label: 'Jobs projected', detail: 'Direct and indirect employment from the 2040 Rail Strategy expansion.', color: '#78716C' },
]

export interface StraitOfGibraltar {
  title: string
  detail: string
}

export const STRAIT: StraitOfGibraltar = {
  title: 'The Strait of Gibraltar Tunnel',
  detail: 'Just 14 km separates Morocco from Spain. No rail connection exists. But a tunnel — deeper than the Channel Tunnel — remains a "strategic project" for both nations. In January 2025, Spain contracted a feasibility study expected by mid-2025. If built, it would connect Africa\'s high-speed network to Europe\'s. Tangier to Madrid by train.',
}

export const HERO_STATS = [
  { value: '320', label: 'Km/h top speed' },
  { value: '55M', label: 'Passengers (2024)' },
  { value: '1,100', label: 'Km planned HSR' },
  { value: '2018', label: 'Africa\'s first' },
]

export const NETWORK_STATS = [
  { value: '2,110 km', label: 'Total track length', note: '1,060 km electrified' },
  { value: '23', label: 'Cities connected', note: 'Target: 43 by 2040' },
  { value: '186 km', label: 'True high-speed track', note: 'Tangier–Kenitra segment' },
  { value: '533', label: 'Seats per trainset', note: '2 first-class, 5 second-class, 1 restaurant car' },
  { value: '51%', label: 'Population served', note: 'Target: 87% by 2040' },
  { value: '20M tonnes', label: 'Freight (2024)', note: 'Phosphate is the dominant cargo' },
]

export const LINE_COLORS: Record<string, string> = {
  'high-speed': '#A0452E',
  'conventional': '#2D5F8A',
  'planned': '#5C7C3E',
  'night': '#7B506F',
}
