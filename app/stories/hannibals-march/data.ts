// ══════════════════════════════════════════════════
// HANNIBAL'S MARCH — DATA
// 218 BC · Carthage → Alps → Rome
// ══════════════════════════════════════════════════

// ── ROUTE WAYPOINTS (Mapbox line) ──

export interface Waypoint {
  name: string
  modernName: string
  coords: [number, number]
  date: string
  event: string
  troops: string
  elephants: number
  phase: 'carthage' | 'spain' | 'pyrenees' | 'gaul' | 'rhone' | 'alps' | 'italy'
}

export const ROUTE: Waypoint[] = [
  { name: 'Carthage', modernName: 'Tunis, Tunisia', coords: [10.18, 36.80], date: 'Winter 219/218 BC', event: 'The plan is formed. Hannibal\'s father made him swear at age nine to be Rome\'s eternal enemy. Now 28, he commands the Carthaginian army in Iberia. The Senate in Carthage approves the invasion.', troops: '~90,000 infantry + 12,000 cavalry', elephants: 37, phase: 'carthage' },
  { name: 'Carthago Nova', modernName: 'Cartagena, Spain', coords: [-0.99, 37.60], date: 'Late spring 218 BC', event: 'Hannibal departs from New Carthage with his full army. The march begins. He leaves garrisons behind to hold Iberia. Five months. 1,600 kilometres. 37 elephants.', troops: '~90,000 + 12,000 cavalry', elephants: 37, phase: 'spain' },
  { name: 'Saguntum', modernName: 'Sagunto, Spain', coords: [-0.27, 39.68], date: 'Spring 218 BC', event: 'Hannibal had already besieged and taken Saguntum (a Roman ally) in 219 BC — the trigger for the Second Punic War. He passes the ruins.', troops: '~90,000 + 12,000 cavalry', elephants: 37, phase: 'spain' },
  { name: 'Crossing the Ebro', modernName: 'Ebro River, Spain', coords: [0.60, 40.73], date: 'Summer 218 BC', event: 'Crossing the Ebro means entering Roman-allied territory. Hannibal fights through hostile Iberian tribes in northern Spain. Clever mountain tactics, stubborn combat.', troops: '~70,000 + 12,000 cavalry', elephants: 37, phase: 'spain' },
  { name: 'The Pyrenees', modernName: 'Pyrenees, France/Spain', coords: [1.50, 42.50], date: 'Summer 218 BC', event: '11,000 Iberian troops refuse to leave their homeland. Hannibal releases them — he needs willing soldiers, not conscripts. He leaves 20,000 to garrison conquered territory. The army shrinks by design.', troops: '~50,000 + 9,000 cavalry', elephants: 37, phase: 'pyrenees' },
  { name: 'Ruscino', modernName: 'Perpignan, France', coords: [2.90, 42.70], date: 'Late summer 218 BC', event: 'Into Gaul. Hannibal negotiates passage with Gallic chiefs, buying their cooperation with gold and promises of shared plunder from Rome.', troops: '~50,000 + 9,000 cavalry', elephants: 37, phase: 'gaul' },
  { name: 'Nemausus', modernName: 'Nîmes, France', coords: [4.36, 43.84], date: 'Late summer 218 BC', event: 'Moving fast through Languedoc. Roman consul Scipio has sailed to Massalia (Marseille) expecting to intercept — but Hannibal is heading inland, not along the coast.', troops: '~46,000 + 9,000 cavalry', elephants: 37, phase: 'gaul' },
  { name: 'Rhône Crossing', modernName: 'Near Fourques/Arles, France', coords: [4.60, 43.68], date: 'September 218 BC', event: 'The great river crossing. The elephants are loaded onto enormous rafts disguised with soil so they think they\'re still on land. Some rafts capsize — but the river is shallow enough for elephants to wade, trunks above water. All 37 survive.', troops: '~38,000 + 8,000 cavalry', elephants: 37, phase: 'rhone' },
  { name: 'Confluence of the Isère', modernName: 'Valence, France', coords: [4.89, 44.93], date: 'Late September 218 BC', event: 'Hannibal turns north along the Rhône rather than marching straight east. He\'s avoiding the Roman army at Massalia. Gallic guides lead the way — or mislead it.', troops: '~38,000 + 8,000 cavalry', elephants: 37, phase: 'alps' },
  { name: 'Gateway to the Alps', modernName: 'Near Grenoble, France', coords: [5.72, 45.19], date: 'Early October 218 BC', event: 'The Allobroges attack the rear of Hannibal\'s column in a narrow pass. Heavy losses. Hannibal captures a Gallic town and seizes provisions for three days.', troops: '~35,000 + 7,000 cavalry', elephants: 37, phase: 'alps' },
  { name: 'The Alpine Pass', modernName: 'Col de la Traversette (probable)', coords: [7.08, 44.68], date: 'Late October 218 BC', event: 'The summit. Snow. Ice. The path blocked by landslides. Hannibal orders fires built against the rock face, pours vinegar on the heated stone to crack it, and his engineers cut a path wide enough for elephants. 16 days crossing the Alps. Nine days up, six days down.', troops: '~26,000 + 6,000 cavalry', elephants: 20, phase: 'alps' },
  { name: 'Po Valley Descent', modernName: 'Near Turin, Italy', coords: [7.68, 45.07], date: 'Early November 218 BC', event: 'Hannibal descends into Italy. Warmer. Green. But his army is shattered. He left Spain with 90,000. He arrives with 26,000 infantry and 6,000 cavalry. Over 17 elephants died in the Alps. The rest are exhausted but alive.', troops: '~26,000 + 6,000 cavalry', elephants: 20, phase: 'italy' },
  { name: 'Battle of Ticinus', modernName: 'Near Pavia, Italy', coords: [9.16, 45.18], date: 'November 218 BC', event: 'First battle in Italy. Hannibal\'s Numidian cavalry defeat Scipio\'s forces. Scipio is severely wounded — his teenage son rescues him on horseback. A minor victory, but it convinces Gallic tribes to join Hannibal.', troops: '~40,000 (Gauls join)', elephants: 20, phase: 'italy' },
  { name: 'Battle of Trebia', modernName: 'Near Piacenza, Italy', coords: [9.69, 45.05], date: 'December 218 BC', event: 'Hannibal lures the Roman army of Sempronius Longus across the freezing Trebbia River at dawn, then ambushes them. Elephants charge the flanks. A devastating Carthaginian victory. ~20,000 Romans killed.', troops: '~40,000 combined', elephants: ~15, phase: 'italy' },
  { name: 'Battle of Lake Trasimene', modernName: 'Lake Trasimeno, Umbria, Italy', coords: [12.10, 43.10], date: 'June 217 BC', event: 'The largest ambush in military history. Hannibal hides his army in the morning fog along the lake shore and traps an entire Roman army. ~15,000 Romans killed, 10,000 captured. Hannibal loses an eye to infection after the battle.', troops: '~50,000 (with allies)', elephants: ~5, phase: 'italy' },
  { name: 'Battle of Cannae', modernName: 'Cannae, Puglia, Italy', coords: [16.13, 41.31], date: 'August 216 BC', event: 'The masterpiece. Hannibal\'s double-envelopment annihilates a Roman army of 86,000. At least 50,000 Romans killed in a single day — the worst defeat in Roman history. By this point, only one elephant remains: Surus, "The Syrian," a one-tusked Asian elephant. Hannibal rides him with a howdah.', troops: '~50,000', elephants: 1, phase: 'italy' },
]

export const ROUTE_COORDS: [number, number][] = ROUTE.map(w => w.coords)

// ── ARMY ATTRITION ──

export interface AttritionPoint { label: string; infantry: number; cavalry: number; elephants: number; x: number }

export const ATTRITION: AttritionPoint[] = [
  { label: 'Cartagena', infantry: 90000, cavalry: 12000, elephants: 37, x: 0 },
  { label: 'Pyrenees', infantry: 50000, cavalry: 9000, elephants: 37, x: 20 },
  { label: 'Rhône', infantry: 38000, cavalry: 8000, elephants: 37, x: 45 },
  { label: 'Alps summit', infantry: 26000, cavalry: 6000, elephants: 20, x: 65 },
  { label: 'Po Valley', infantry: 26000, cavalry: 6000, elephants: 20, x: 75 },
  { label: 'After Gauls join', infantry: 40000, cavalry: 8000, elephants: 20, x: 80 },
  { label: 'Cannae', infantry: 40000, cavalry: 10000, elephants: 1, x: 100 },
]

// ── BATTLES ──

export interface Battle {
  name: string
  date: string
  location: string
  coords: [number, number]
  romanLosses: string
  carthaginianLosses: string
  significance: string
  elephantsPresent: number
}

export const BATTLES: Battle[] = [
  { name: 'Ticinus', date: 'November 218 BC', location: 'Near Pavia', coords: [9.16, 45.18], romanLosses: '~2,000', carthaginianLosses: 'Minimal', significance: 'First engagement. Numidian cavalry superiority established. Scipio wounded. Gallic tribes switch to Hannibal.', elephantsPresent: 20 },
  { name: 'Trebia', date: 'December 218 BC', location: 'Near Piacenza', coords: [9.69, 45.05], romanLosses: '~20,000 killed', carthaginianLosses: '~5,000', significance: 'Classic ambush. Romans lured across freezing river. Elephants used on the flanks to panic Roman cavalry.', elephantsPresent: 15 },
  { name: 'Lake Trasimene', date: 'June 217 BC', location: 'Umbria', coords: [12.10, 43.10], romanLosses: '~15,000 killed, 10,000 captured', carthaginianLosses: '~1,500', significance: 'Largest ambush in military history. Fog, lake, hills — perfect trap. Hannibal loses eye to infection afterward.', elephantsPresent: 5 },
  { name: 'Cannae', date: 'August 216 BC', location: 'Puglia', coords: [16.13, 41.31], romanLosses: '~50,000–70,000 killed', carthaginianLosses: '~6,000', significance: 'The double-envelopment. The worst defeat in Roman history. Still studied in military academies worldwide. Only one elephant remains: Surus.', elephantsPresent: 1 },
]

// ── ELEPHANT TRACKER ──

export interface ElephantMilestone { phase: string; count: number; note: string }

export const ELEPHANTS: ElephantMilestone[] = [
  { phase: 'Departure from Cartagena', count: 37, note: 'North African war elephants — likely a mix of the now-extinct North African forest elephant and possibly some Asian elephants. Trained in Carthaginian war camps.' },
  { phase: 'Through Spain & Pyrenees', count: 37, note: 'All 37 survive the march through Iberia. Elephants are hardy on flat terrain and can swim rivers.' },
  { phase: 'Rhône River crossing', count: 37, note: 'Elephants loaded onto enormous rafts covered with soil. Some rafts capsize. The elephants wade the rest — trunks held above water. All survive.' },
  { phase: 'Alpine crossing', count: 20, note: '17 elephants die in the Alps. Cold, ice, narrow paths, rockslides. The descent is worse than the ascent — animals slip on ice and tumble.', },
  { phase: 'Arrival in Po Valley', count: 20, note: '20 elephants reach Italy. Exhausted, starving, but alive. They will fight at Trebia.' },
  { phase: 'After Trebia', count: 15, note: 'Five more die during the winter and battle. The surviving elephants are used to cross the Arno marshes.' },
  { phase: 'After Lake Trasimene', count: 5, note: 'Most remaining elephants die crossing the Arno marshes. Disease, exhaustion, mud.' },
  { phase: 'Battle of Cannae', count: 1, note: 'Only Surus remains. A one-tusked Asian elephant — "The Syrian." Hannibal rides him with a howdah and a red cloth. The last of 37.' },
]

// ── TIMELINE ──

export interface TimelineEvent { year: string; sortYear: number; title: string; detail: string; type: 'politics' | 'march' | 'battle' | 'aftermath' }

export const TIMELINE: TimelineEvent[] = [
  { year: '264–241 BC', sortYear: -264, title: 'First Punic War', detail: 'Rome defeats Carthage. Carthage loses Sicily, Corsica, and Sardinia. Forced to pay massive war indemnities. Hamilcar Barca swears revenge.', type: 'politics' },
  { year: '237 BC', sortYear: -237, title: 'Hamilcar takes 9-year-old Hannibal to Spain', detail: 'Hannibal\'s father makes him swear over flames: "I will use fire and steel to arrest the destiny of Rome." The boy will keep this oath for the rest of his life.', type: 'politics' },
  { year: '221 BC', sortYear: -221, title: 'Hannibal takes command', detail: 'At 26, Hannibal becomes commander of Carthaginian forces in Spain after his father and brother-in-law are killed.', type: 'politics' },
  { year: '219 BC', sortYear: -219, title: 'Siege of Saguntum', detail: 'Hannibal besieges and takes Saguntum, a Roman ally in Spain. Rome declares war. The Second Punic War begins.', type: 'politics' },
  { year: 'Spring 218 BC', sortYear: -218.5, title: 'The march begins', detail: 'Hannibal departs Cartagena with ~90,000 infantry, 12,000 cavalry, and 37 war elephants. Destination: Rome. Route: overland through Spain, France, and over the Alps.', type: 'march' },
  { year: 'Summer 218 BC', sortYear: -218.3, title: 'Crossing the Pyrenees', detail: '11,000 Iberian troops released. 20,000 left as garrison. The army is deliberately reduced to committed fighters.', type: 'march' },
  { year: 'September 218 BC', sortYear: -218.1, title: 'Crossing the Rhône', detail: 'Elephants rafted across. Some rafts capsize. Elephants wade with trunks above water. All 37 survive. Roman army at Marseille misses the interception.', type: 'march' },
  { year: 'October 218 BC', sortYear: -218.05, title: 'Crossing the Alps', detail: '16 days. Snow, ice, hostile tribes, rockslides. Fires lit against cliff faces, vinegar poured on heated rock to crack it. 17 elephants die. Army loses over half its men.', type: 'march' },
  { year: 'November 218 BC', sortYear: -218.0, title: 'Battle of Ticinus', detail: 'First battle in Italy. Numidian cavalry defeats Scipio. Minor victory but Gallic tribes defect to Hannibal, rebuilding his army.', type: 'battle' },
  { year: 'December 218 BC', sortYear: -217.9, title: 'Battle of Trebia', detail: 'Romans lured across freezing river at dawn. Ambushed on both flanks. Elephants used to charge cavalry. ~20,000 Romans killed.', type: 'battle' },
  { year: 'June 217 BC', sortYear: -217, title: 'Battle of Lake Trasimene', detail: 'Largest ambush in military history. Hannibal hides army in fog, traps Romans against the lake. ~15,000 killed, 10,000 captured.', type: 'battle' },
  { year: 'August 216 BC', sortYear: -216, title: 'Battle of Cannae', detail: 'The masterpiece. Double-envelopment destroys a Roman army of 86,000. At least 50,000 killed in one day. The worst defeat in Roman history. Only Surus, one elephant, remains.', type: 'battle' },
  { year: '216–203 BC', sortYear: -210, title: '13 years in Italy', detail: 'Hannibal occupies southern Italy for 13 years. Never has resources to attack Rome directly. Carthage fails to reinforce him — possibly due to political rivalry at home.', type: 'aftermath' },
  { year: '207 BC', sortYear: -207, title: 'Hasdrubal\'s head', detail: 'Hannibal\'s brother Hasdrubal crosses the Alps with reinforcements but is defeated at Metaurus. Romans throw his severed head into Hannibal\'s camp. "There lies the fate of Carthage."', type: 'aftermath' },
  { year: '202 BC', sortYear: -202, title: 'Battle of Zama', detail: 'Hannibal recalled to defend Carthage. Scipio Africanus defeats him in Tunisia. Carthage sues for peace. The Second Punic War ends.', type: 'aftermath' },
  { year: '146 BC', sortYear: -146, title: 'Carthage destroyed', detail: 'Rome razes Carthage to the ground in the Third Punic War. The city is burned for 17 days. The civilisation that produced Hannibal ceases to exist.', type: 'aftermath' },
]

export const BIBLIOGRAPHY = [
  'Polybius. The Histories, Book III (c. 150 BC). Primary source.',
  'Livy. Ab Urbe Condita, Book XXI (c. 27–25 BC). Primary source.',
  'Mahaney, W.C. et al. (2016). Biostratigraphic evidence relating to the age-old question of Hannibal\'s invasion of Italy. Archaeometry 58(1): 164–178.',
  'Lendering, Jona. Hannibal in the Alps (2022). Review of primary sources.',
  'de Beer, Gavin. Hannibal: The Struggle for Power in the Mediterranean (1969).',
  'Hunt, Patrick. Alpine Archaeology (Stanford University). Col de la Traversette research.',
  'PBS Secrets of the Dead: Hannibal in the Alps (2018). Documentary.',
  'Goldsworthy, Adrian. The Fall of Carthage (2000). Cassell Military.',
]
