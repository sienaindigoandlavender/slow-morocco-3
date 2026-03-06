// ─────────────────────────────────────────────────
// The Souk Decoded — How a Moroccan Market Works
// Module 050 — Urban Intelligence
// Sources: Field documentation, Marrakech medina
// mapping, guild records, cultural ethnography
// ─────────────────────────────────────────────────

export interface SoukSection {
  id: string
  name: string
  specialty: string
  position: string
  note: string
  color: string
}

export const SOUKS_MARRAKECH: SoukSection[] = [
  { id: 'semmarine', name: 'Souk Semmarine', specialty: 'Textiles, general goods', position: 'Main artery — starts at Jemaa el-Fna', note: 'The widest, most covered passage. Begins with pâtisserie and pottery, transitions into premium textiles deeper in. Forks into two branches.', color: '#7B506F' },
  { id: 'attarine', name: 'Souk el Attarine', specialty: 'Copper, brass, spices', position: 'Left fork off Semmarine', note: 'Named for perfume/spice sellers (attar). Now copper and brass craftwork. Leads toward the Medersa Ben Youssef.', color: '#F59E0B' },
  { id: 'ableuh', name: 'Souk Ableuh', specialty: 'Olives, preserved foods', position: 'Right fork off Semmarine', note: 'Mountains of olives — green, black, cracked, spiced. Preserved lemons, pickled vegetables. A kitchen souk.', color: '#5C7C3E' },
  { id: 'smata', name: 'Souk Smata', specialty: 'Babouches (slippers)', position: 'Side passage off main spine', note: 'Rows of leather slippers in every color. Pointed-toe for men, rounded for women. ', color: '#EC4899' },
  { id: 'cherratine', name: 'Souk Cherratine', specialty: 'Leather goods', position: 'Near the Medersa', note: 'Bags, belts, poufs, wallets. Tanned hides from the tanneries. Marrakech leather has been exported since the medieval period.', color: '#C17F28' },
  { id: 'haddadine', name: 'Souk Haddadine', specialty: 'Metalwork, lanterns', position: 'Deep interior', note: 'Blacksmiths and lantern-makers. The sound of hammering is constant. Iron, brass, and copper punched into geometric patterns.', color: '#2D5F8A' },
  { id: 'zrabia', name: 'Souk Zrabia', specialty: 'Carpets, rugs', position: 'Near the Criée Berbère', note: 'The carpet auction. Berber rugs, kilims, Boucherouite. Historically the site of the Berber slave market (Criée Berbère) until 1912.', color: '#A0452E' },
  { id: 'chouari', name: 'Souk Chouari', specialty: 'Woodwork, carpentry', position: 'Northern edge', note: 'Cedar, thuya wood, walnut. Boxes, chessboards, furniture. Strong scent of cedar shavings.', color: '#78716C' },
  { id: 'sebbaghine', name: 'Souk Sebbaghine', specialty: 'Dyers', position: 'Near tanneries (downwind)', note: 'Skeins of freshly dyed wool and silk hang from poles to dry. Vivid reds, yellows, blues. Always downwind from residential areas.', color: '#7B506F' },
  { id: 'dabbaghin', name: 'Souk Dabbaghin', specialty: 'Tanneries', position: 'Eastern edge, outside residential core', note: 'Stone vats of natural dyes. Pigeon dung for softening. Deliberately placed at the medina\'s edge because of the smell.', color: '#78716C' },
]

export interface SpatialRule {
  rule: string
  explanation: string
}

export const SPATIAL_LOGIC: SpatialRule[] = [
  { rule: 'Most valuable goods at the center', explanation: 'Gold, silver, and spices historically occupied the innermost, most protected positions — closest to the mosque and the kissaria (covered market).' },
  { rule: 'Smelly trades at the edges', explanation: 'Tanneries, dyers, and slaughterhouses were always placed downwind and at the medina\'s periphery. Practical, not accidental.' },
  { rule: 'Noisy trades away from textiles', explanation: 'Metalworkers (haddadine) were separated from fabric and carpet sellers. Hammering and weaving don\'t mix.' },
  { rule: 'Food near the gates', explanation: 'Fresh produce, bread, and meat were placed near medina entrances for daily access. You shouldn\'t have to cross the entire souk for dinner.' },
  { rule: 'Similar trades cluster together', explanation: 'The guild system (hanta) mandated that craftsmen of the same trade work side by side. Competition drives quality; proximity enables price comparison.' },
  { rule: 'The kissaria is the inner sanctum', explanation: 'The covered, lockable kissaria housed luxury goods — fabrics, jewelry, perfume. Locked at night. The safest, most controlled part of the souk.' },
]

export interface GuildRole {
  role: string
  roleAr: string
  description: string
}

export const GUILD_SYSTEM: GuildRole[] = [
  { role: 'Amine', roleAr: 'الأمين', description: 'Elected leader of each guild. Arbitrates disputes between craftsmen. Sets quality standards. Represents the trade to the city authorities. Still active in Marrakech and Fes.' },
  { role: 'Mohtasib', roleAr: 'المحتسب', description: 'Market inspector. Historically checked weights, measures, and pricing fairness. Enforced Islamic commercial ethics (no fraud, no hoarding). Position dates to the 9th century.' },
  { role: 'Maalem', roleAr: 'المعلم', description: 'Master craftsman. The highest rank. A maalem has completed years of apprenticeship and can train others. The title carries social prestige beyond the workshop.' },
  { role: 'Sanayi', roleAr: 'الصانع', description: 'Journeyman craftsman. Skilled worker who has completed basic training but has not yet reached maalem status. Does the production work.' },
  { role: 'Moutaallim', roleAr: 'المتعلم', description: 'Apprentice. Learns by doing — sweeping, fetching, watching, then slowly handling tools. Formal apprenticeship can last 3–7 years.' },
]

export interface NegotiationRule {
  step: string
  detail: string
  number: number
}

export const NEGOTIATION: NegotiationRule[] = [
  { number: 1, step: 'The greeting (Salam)', detail: 'Never begin with the price. Exchange greetings. Accept tea if offered. The transaction is social before it is economic.' },
  { number: 2, step: 'The browse', detail: 'Touch, ask questions, show interest without commitment. The vendor reads your body language to gauge seriousness and budget.' },
  { number: 3, step: 'The first price', detail: 'The vendor\'s opening offer is typically 2–3× the expected final price. This is not deception — it\'s the starting position in a known ritual.' },
  { number: 4, step: 'The counter', detail: 'Offer 30–50% of the asking price. This is your starting position. Both parties know the fair price lies somewhere between.' },
  { number: 5, step: 'The dance', detail: 'Back and forth. Stories, humor, fake outrage, "my friend" appeals. The negotiation is the entertainment. Rushing is disrespectful.' },
  { number: 6, step: 'The walk-away', detail: 'If you leave, you\'ll hear "final price!" behind you. If the vendor calls you back, the deal is close. If not, you offered too low.' },
  { number: 7, step: 'The handshake', detail: 'Agreement is sealed. In traditional commerce, a handshake is binding. The vendor wraps your purchase. You are now a "friend of the house."' },
]

export const HERO_STATS = [
  { value: '18', label: 'Named souks (Marrakech)' },
  { value: '2,600+', label: 'Artisan shops in the medina' },
  { value: '40,000+', label: 'Artisans (Marrakech)' },
  { value: '11th c.', label: 'Origins (trade routes)' },
]

export const ECONOMICS = [
  { value: '40,000+', label: 'Artisans in Marrakech medina', note: 'North Africa\'s largest traditional marketplace' },
  { value: '2,600+', label: 'Guild-organized shops', note: 'Grouped by trade, regulated by Amine' },
  { value: '18', label: 'Distinct souk sections', note: 'Each with specialty — leather, metal, spice, carpet, wood' },
  { value: '9,000', label: 'Alleys in Fes medina', note: 'The world\'s largest car-free urban area' },
  { value: '30–50%', label: 'Typical negotiation range', note: 'Off first asking price in non-fixed shops' },
  { value: '~€60', label: 'Traditional Moroccan catering/head', note: 'Wedding-scale souk economics' },
]
