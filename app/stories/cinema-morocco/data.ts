// ─────────────────────────────────────────────────
// Cinema Morocco — Ouarzawood
// Module 071 — Cultural & Economic Intelligence
// Sources: Wikipedia (Atlas Corporation Studios,
// Ouarzazate), AramcoWorld, Grokipedia, CCM,
// Morocco World News, Caestus Films, Morocco Film
// Commission, Laure Wanders, Tuljak
// ─────────────────────────────────────────────────

export interface Studio {
  name: string
  lat: number
  lng: number
  founded: string
  detail: string
  color: string
}

export const STUDIOS: Studio[] = [
  { name: 'Atlas Corporation Studios', lat: 30.9417, lng: -6.9667, founded: '1983', detail: 'Founded by Mohamed Belghmi. Largest film studio by area (~31,000 m² / 20 hectares). Sets: Roman Colosseum (Gladiator), Egyptian temples (Asterix & Obelix: Mission Cleopatra), Jerusalem (Kingdom of Heaven), Pentos (Game of Thrones). Open for public guided tours.', color: '#A0452E' },
  { name: 'CLA Studios', lat: 30.938, lng: -6.970, founded: '2004', detail: 'Managed by Amine Tazi alongside Atlas. Used for Game of Thrones (Essos desert scenes), Prison Break (S4–S5), The Wheel of Time (S2). Can mobilise the Royal Moroccan Army as extras. 20-hectare production complex.', color: '#2D5F8A' },
  { name: 'Cinema Museum', lat: 30.919, lng: -6.893, founded: '2007', detail: 'Housed in a former Italian production company space. Opposite the Taourirt Kasbah. Props, costumes, history. Occasionally used for shooting.', color: '#F59E0B' },
]

export interface FilmingLocation {
  name: string
  lat: number
  lng: number
  fictional: string
  production: string
  detail: string
  color: string
}

export const FILMING_LOCATIONS: FilmingLocation[] = [
  { name: 'Essaouira', lat: 31.5085, lng: -9.7595, fictional: 'Astapor (GoT)', production: 'Game of Thrones S3 / Othello (1952)', detail: 'Ramparts = Walk of Punishment. "Dracarys!" scene. Orson Welles filmed Othello here — Palme d\'Or 1952.', color: '#A0452E' },
  { name: 'Aït Benhaddou', lat: 31.0471, lng: -7.1319, fictional: 'Yunkai (GoT)', production: 'GoT S3 / Gladiator / Lawrence of Arabia', detail: 'UNESCO ksar. "MHYSA!" scene. Used in 20+ films since 1962. Mud-brick architecture.', color: '#F59E0B' },
  { name: 'Ouarzazate & Studios', lat: 30.9417, lng: -6.9667, fictional: 'Pentos / Meereen (GoT)', production: 'GoT / Gladiator / Kingdom of Heaven', detail: 'Atlas + CLA Studios. Colosseum set, Jerusalem set, Ka\'bah replica. 3,000 soldiers as extras.', color: '#A0452E' },
  { name: 'Marrakech', lat: 31.6295, lng: -7.9811, fictional: '—', production: 'John Wick 3 / MI: Rogue Nation', detail: 'Medina rooftops and souks for chase sequences. Riad interiors for fight scenes.', color: '#7B506F' },
  { name: 'Erfoud / Merzouga', lat: 31.4314, lng: -4.2286, fictional: '—', production: 'The Mummy / Prince of Persia', detail: 'Erg Chebbi dunes as ancient Egypt, Persia. Hamunaptra scenes.', color: '#C17F28' },
  { name: 'Casablanca', lat: 33.5731, lng: -7.5898, fictional: '—', production: 'MI: Rogue Nation', detail: 'Tom Cruise car chase. Irony: the 1942 film Casablanca was shot entirely in Hollywood.', color: '#5C7C3E' },
  { name: 'Tangier', lat: 35.7595, lng: -5.834, fictional: '"Mombasa"', production: 'Inception / The Bourne Ultimatum', detail: 'Nolan\'s Inception used Tangier medina for the Mombasa chase. Bourne Ultimatum rooftop sequence.', color: '#2D5F8A' },
]

export interface Production {
  title: string
  year: string
  type: string
  director: string
  locations: string
  detail: string
}

export const PRODUCTIONS: Production[] = [
  { title: 'Lawrence of Arabia', year: '1962', type: 'Film', director: 'David Lean', locations: 'Ouarzazate, Aït Benhaddou', detail: 'The film that started it all. David Lean discovered Morocco\'s crystal-clear atmosphere.' },
  { title: 'The Man Who Would Be King', year: '1975', type: 'Film', director: 'John Huston', locations: 'Ouarzazate', detail: 'Connery & Caine. Atlas Mountains as the Hindu Kush.' },
  { title: 'The Living Daylights', year: '1987', type: 'Film', director: 'John Glen', locations: 'Atlas Studios', detail: 'James Bond 007. Timothy Dalton. Afghan/Middle Eastern sequences.' },
  { title: 'The Last Temptation of Christ', year: '1988', type: 'Film', director: 'Martin Scorsese', locations: 'Ouarzazate', detail: 'Scorsese chose Morocco for its Biblical landscape.' },
  { title: 'Kundun', year: '1997', type: 'Film', director: 'Martin Scorsese', locations: 'Atlas Studios', detail: 'Scorsese returns. Morocco as Tibet. Atlas Mountains as the Himalayas.' },
  { title: 'The Mummy', year: '1999', type: 'Film', director: 'Stephen Sommers', locations: 'Erfoud, Atlas Studios', detail: 'Brendan Fraser. Hamunaptra. Erg Chebbi dunes as ancient Egypt.' },
  { title: 'Gladiator', year: '2000', type: 'Film', director: 'Ridley Scott', locations: 'Atlas Studios, Aït Benhaddou', detail: 'Russell Crowe. Colosseum replica. Slave market at Aït Benhaddou. 5 Oscars. Defined Atlas Studios globally.' },
  { title: 'Black Hawk Down', year: '2001', type: 'Film', director: 'Ridley Scott', locations: 'Ouarzazate, Salé', detail: 'Scott returns. Morocco as Mogadishu.' },
  { title: 'Asterix & Obelix: Mission Cleopatra', year: '2002', type: 'Film', director: 'Alain Chabat', locations: 'Atlas Studios', detail: 'Depardieu, Bellucci. Largest Egyptian temple sets at Atlas. French blockbuster.' },
  { title: 'Alexander', year: '2004', type: 'Film', director: 'Oliver Stone', locations: 'Atlas Studios', detail: 'Colin Farrell. Morocco as ancient Persia and Central Asia.' },
  { title: 'Kingdom of Heaven', year: '2005', type: 'Film', director: 'Ridley Scott', locations: 'Atlas Studios, Aït Benhaddou', detail: 'Scott\'s third. Jerusalem set reused for GoT. 3,000 Moroccan soldiers as extras.' },
  { title: 'Babel', year: '2006', type: 'Film', director: 'A. G. Iñárritu', locations: 'Ouarzazate, Taguenzalt', detail: 'Pitt, Blanchett. Moroccan narrative central. Oscar-nominated.' },
  { title: 'Inception', year: '2010', type: 'Film', director: 'Christopher Nolan', locations: 'Tangier', detail: 'DiCaprio. Tangier medina as "Mombasa" chase sequence.' },
  { title: 'Game of Thrones', year: '2011–19', type: 'TV (HBO)', director: 'Benioff & Weiss', locations: 'Essaouira, Aït Benhaddou, Atlas, CLA', detail: 'Morocco = Essos. Essaouira → Astapor. Aït Benhaddou → Yunkai. Atlas → Pentos. "Dracarys!" "Mhysa!" Unaired pilot: Drogo-Daenerys wedding, GRRM cameo.' },
  { title: 'Mission: Impossible – Rogue Nation', year: '2015', type: 'Film', director: 'Christopher McQuarrie', locations: 'Casablanca, Marrakech, Rabat', detail: 'Tom Cruise. Casablanca car chase.' },
  { title: 'Prison Break', year: '2017', type: 'TV (Fox)', director: 'Various', locations: 'CLA Studios', detail: 'S4–S5. Desert as Panama/Yemen. Prison bus still on tour.' },
  { title: 'John Wick: Chapter 3', year: '2019', type: 'Film', director: 'Chad Stahelski', locations: 'Essaouira, Marrakech', detail: 'Keanu Reeves. Desert fights, riad interiors, Marrakech streets.' },
  { title: 'The Wheel of Time', year: '2021–', type: 'TV (Amazon)', director: 'Rafe Judkins', locations: 'Atlas, CLA Studios', detail: 'S2 desert battles and Falme city. Three-month shoot, 2022.' },
  { title: 'Gladiator II', year: '2024', type: 'Film', director: 'Ridley Scott', locations: 'Atlas Studios', detail: 'Scott\'s fifth Morocco production. Paul Mescal. Returns to the Colosseum 24 years later.' },
]

export const GOT_LOCATIONS = [
  { location: 'Essaouira', fictional: 'Astapor', season: 'S3', scenes: 'Walk of Punishment, Unsullied, "Dracarys!"' },
  { location: 'Aït Benhaddou', fictional: 'Yunkai', season: 'S3', scenes: 'Battle of Yunkai, "Mhysa!" crowd scene' },
  { location: 'Atlas Studios', fictional: 'Pentos / interiors', season: 'S1–S3', scenes: 'Free City, Jerusalem set reused' },
  { location: 'CLA Studios', fictional: 'Essos / Red Waste', season: 'S1–S4', scenes: 'Dothraki camp, Slaver\'s Bay' },
  { location: 'Tazentoute', fictional: 'Yunkai camp', season: 'S3', scenes: 'Daenerys\'s tent negotiations' },
  { location: 'Ouarzazate', fictional: 'Pentos', season: 'Pilot', scenes: 'Drogo–Dany wedding (unaired). GRRM cameo.' },
]

export const INCENTIVES = [
  { label: 'Cash rebate', value: '30%', detail: 'Of eligible local expenses. Increased from 20% in March 2022.' },
  { label: 'Min. spend', value: '$1M', detail: '10 million dirhams minimum qualified expenditure.' },
  { label: 'Min. days', value: '18', detail: 'Including set-building.' },
  { label: 'Moroccan crew', value: '~80%', detail: 'Of staff on foreign productions (2017).' },
  { label: 'Annual foreign productions', value: '20–50', detail: 'Shot in Ouarzazate every year.' },
  { label: 'Army extras licence', value: '3,000+', detail: 'Royal Moroccan Army available for productions.' },
]

export const HERO_STATS = [
  { value: '1962', label: 'First major production' },
  { value: '20+', label: 'Blockbusters filmed' },
  { value: '30%', label: 'Cash rebate' },
  { value: '6', label: 'Decades of cinema' },
]

export const KEY_NUMBERS = [
  { value: '31,000 m²', label: 'Atlas Studios area', note: 'Largest by land area. "Not clear where studio ends and desert begins."' },
  { value: '5', label: 'Ridley Scott films', note: 'Gladiator, Black Hawk Down, Kingdom of Heaven, Body of Lies, Gladiator II. Morocco\'s most frequent auteur.' },
  { value: '41%', label: 'Tourism surge (2017)', note: 'Ouarzazate arrivals surged 41% Jan–Jul 2017 vs prior year. Film-induced tourism.' },
  { value: '$75M', label: 'Infrastructure plan', note: 'MAD 820M government investment 2023–2026. Hotel reopenings adding ~1,800 beds.' },
  { value: '1952', label: 'Orson Welles in Essaouira', note: 'Othello. Palme d\'Or. Morocco\'s cinema pedigree predates the studios by 31 years.' },
  { value: '80%', label: 'Local workforce', note: 'Of crew on foreign productions are Moroccan. Trained technicians, École de Cinéma de Ouarzazate.' },
]
