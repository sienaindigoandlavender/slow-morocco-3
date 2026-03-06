// ─────────────────────────────────────────────────
// The Route of a Thousand Kasbahs
// Module 079 — Architectural & Geographic Intelligence
// ─────────────────────────────────────────────────

export interface Kasbah {
  name: string
  arabic: string
  location: string
  built: string
  status: string
  detail: string
  keyFact: string
  coords: { lat: number; lng: number }
}

export const KASBAHS: Kasbah[] = [
  {
    name: 'Aït Benhaddou',
    arabic: 'آيت بن حدو',
    location: 'Ounila Valley, 30km NW of Ouarzazate',
    built: 'Fortified since 11th C (Almoravid). Current structures 17th C+',
    status: 'UNESCO World Heritage Site since 1987. Sparsely inhabited — 5 families remain (90+ in the 1940s)',
    detail: 'The most famous ksar in Morocco. Strategic location on trans-Saharan trade route via Tizi n\'Tichka pass — one of few routes across the Atlas connecting Marrakech to the Drâa Valley. Built on hillside above Ounila River. Defensive walls, corner towers, baffle gate. Mosque, caravanserai, two cemeteries (Muslim and Jewish). Agadir (fortified granary) crowns the summit. Rammed earth lower floors, lighter adobe upper floors. Hollywood\'s favourite backdrop — 20+ productions filmed here.',
    keyFact: 'Featured on more film posters than any building in Africa',
    coords: { lat: 31.0470, lng: -7.1318 },
  },
  {
    name: 'Kasbah Telouet',
    arabic: 'قصبة تلوات',
    location: 'Telouet, High Atlas, 1,800m elevation',
    built: '1860 by Mohammed Ibiyet. 300 craftsmen. 5 years. Expanded until 1956',
    status: 'Partially ruined, partially restored. Privately funded restoration by El Glaoui descendants. Damaged in 2023 earthquake',
    detail: 'Seat of the Glaoui clan\'s power. Thami El Glaoui — "Lord of the Atlas" — ruled from here as Pasha of Marrakech (1912–1956). Austere exterior belies dazzling interiors: zellij tiles, carved stucco, painted cedar ceilings. 300 craftsmen from across Morocco including Fez decorated it. After El Glaoui\'s death (January 23, 1956) and Morocco\'s independence, all Glaoui properties were seized by the state. The kasbah has been crumbling ever since. Still being expanded when the Pasha died — unfinished rooms haunt the corridors.',
    keyFact: 'The unfinished palace of a man who died two months after begging the Sultan\'s forgiveness',
    coords: { lat: 31.2847, lng: -7.2403 },
  },
  {
    name: 'Kasbah Taourirt',
    arabic: 'قصبة تاوريرت',
    location: 'Central Ouarzazate',
    built: '17th C origin. Major expansion by Si Hammadi El Glaoui (1882–1937)',
    status: 'National monument since 1954. Getty Conservation Institute + CERKAS restoration (2011–2016). 75M MAD tourism revival plan announced Oct 2025',
    detail: 'Ouarzazate\'s defining landmark. 12,000 square metres. Labyrinthine courtyards, double defensive walls, geometric painted motifs, tataoui ceilings (reeds and wood). The Glaoui family\'s primary residence before independence. Occupied by 48 squatter families (243 people) by 1994 after abandonment. CERKAS headquarters now on site. The Getty Conservation Institute developed its Conservation and Rehabilitation Plan here as a model for earthen heritage worldwide. 67% sand to 33% clay ratio confirmed as optimal for restoration.',
    keyFact: 'The model site — restoration techniques developed here are now used worldwide',
    coords: { lat: 30.9200, lng: -6.8937 },
  },
  {
    name: 'Kasbah Amridil',
    arabic: 'قصبة أمريديل',
    location: 'Skoura Oasis, 30km NE of Ouarzazate',
    built: 'Ksar since 17th C. Kasbah (tighremt) added late 19th C by commission of Madani El Glaoui for M\'hamed Ben Brahim Nasiri',
    status: 'Best-preserved kasbah in the Dadès Valley. Still owned and maintained by the Nasiri family. Museum + guesthouse',
    detail: 'Built as gratitude — Madani El Glaoui commissioned it for the local faqih (religious teacher) who educated his sons. The Nasiri family has maintained it for over 300 years. Square plan, four corner towers plus a fifth added on the south side. The most elaborate geometric decoration in the oasis — Skoura\'s kasbahs are considered the finest in southern Morocco. Featured on the old 50-dirham note. Réda Nassiri, current custodian, has managed the site since 2009. Museum contains traditional Berber tools, olive presses, manuscripts.',
    keyFact: 'The kasbah on the banknote — featured on Morocco\'s 50-dirham note',
    coords: { lat: 31.0469, lng: -6.5803 },
  },
  {
    name: 'Kasbah Tamnougalt',
    arabic: 'قصبة تمنوكالت',
    location: 'Agdz, Drâa Valley',
    built: '16th C — one of the oldest surviving kasbahs',
    status: 'Partially restored. Two kasbahs: Tamnougalt and the Kasbah des Caïds. Guesthouse conversion',
    detail: 'Gateway to the Drâa Valley. The Kasbah des Caïds is considered one of the older Berber fortifications in Morocco. Situated on the critical route between Marrakech and Timbuktu. Multiple films shot here. The village\'s position allowed control of the valley\'s southern entrance. Jewish quarter once occupied part of the complex — one of many examples of mixed communities within ksour.',
    keyFact: 'Gateway to the 200km Drâa Valley — 55 villages, each with its own ksar',
    coords: { lat: 30.6917, lng: -6.8819 },
  },
  {
    name: 'N\'Kob',
    arabic: 'نقوب',
    location: 'Southern slopes of Jebel Saghro',
    built: 'Various — 17th–19th C',
    status: 'Over 40 kasbahs surviving — highest concentration in a single settlement',
    detail: 'An oasis at the base of the Jebel Saghro mountains, receiving Saharan winds that have sculpted sandstone into singular forms over millennia. Important Berber tribal centre on the caravan routes to Timbuktu. The sheer density of kasbahs reflects the settlement\'s former wealth and the number of competing families who built competing towers. Each kasbah represents a family\'s claim to status.',
    keyFact: '40+ kasbahs in one settlement — a whole town built as a status competition',
    coords: { lat: 30.8667, lng: -5.8667 },
  },
]

export interface ArchitecturalElement {
  name: string
  amazigh: string
  arabic: string
  function: string
  detail: string
}

export const ARCHITECTURE: ArchitecturalElement[] = [
  { name: 'Tighremt', amazigh: 'ⵜⵉⵖⵔⵎⵜ', arabic: 'قصبة', function: 'Fortified family mansion', detail: 'The kasbah proper. Square plan, corner towers, multiple storeys (up to six). Built for wealthy families. Decorated upper floors signal status. The word the Amazigh use instead of "kasbah."' },
  { name: 'Ksar (pl. Ksour)', amazigh: 'ⵉⵖⵔⵎ', arabic: 'قصر', function: 'Fortified village', detail: 'Walled settlement containing multiple dwellings, granaries, mosque, public spaces. Defensive walls with corner towers and baffle gates. The communal version of the tighremt.' },
  { name: 'Agadir', amazigh: 'ⴰⴳⴰⴷⵉⵔ', arabic: 'أكادير', function: 'Fortified communal granary', detail: 'Perched on hilltops above ksour. Stores grain, oil, valuables. Each family has a locked chamber. If the village falls, the food supply survives. Gives the modern city of Agadir its name.' },
  { name: 'Pisé / Tabiya', amazigh: '—', arabic: 'طابية', function: 'Rammed earth wall construction', detail: 'Earth, straw, and pebbles compressed in wooden formwork (al-luh). Courses of ~80cm height. Walls 1 metre thick at base, tapering to 50cm on upper floors. Lime-free. Wooden beams and palm trunks for lintels and roofs. Requires constant maintenance — abandoned structures begin crumbling within decades.' },
  { name: 'Adobe', amazigh: '—', arabic: 'لبن', function: 'Sun-dried mud brick', detail: 'Lighter than pisé. Used on upper floors and for decorative elements. Geometric motifs carved into wet earth — triangles, diamonds, Amazigh symbols. ' },
  { name: 'Tataoui', amazigh: '—', arabic: 'ططاوي', function: 'Reed and wood ceiling', detail: 'Reeds laid across wooden beams, creating patterned ceilings. Found in principal rooms of kasbahs. Painted with colourful motifs in wealthier households. Characteristic of Glaoui palaces.' },
]

export interface HistoryEvent {
  year: string
  event: string
  thread: string
}

export const HISTORY: HistoryEvent[] = [
  { year: '~550 BC', event: 'Hanno of Carthage makes first known reference to the Drâa Valley', thread: 'ancient' },
  { year: '90–168 AD', event: 'Ptolemy maps the Drâa River — it appears on his map of Africa', thread: 'ancient' },
  { year: '680 AD', event: 'Umayyad conquest brings Islam to the Atlas and Drâa Valley. Berbers convert', thread: 'ancient' },
  { year: '11th C', event: 'Almoravid period — Aït Benhaddou first fortified as strategic trade post', thread: 'construction' },
  { year: '12th C', event: 'Almohad dynasty establishes Skoura oasis settlement. Irrigation systems built', thread: 'construction' },
  { year: '16th C', event: 'Tamnougalt kasbah built — among the oldest surviving. Saadian trade routes peak', thread: 'construction' },
  { year: '1672–1727', event: 'Moulay Ismail orders fortresses built throughout southern Morocco for defence', thread: 'power' },
  { year: '1860', event: 'Mohammed Ibiyet begins construction of Kasbah Telouet. 300 craftsmen. 5 years', thread: 'power' },
  { year: '1893', event: 'Sultan Moulay Hassan trapped in Atlas blizzard. Glaoui brothers rescue him. Rewarded with Krupp cannon and feudal titles', thread: 'power' },
  { year: '1912', event: 'Thami El Glaoui becomes Pasha of Marrakech. French Protectorate begins. Glaoui allies with colonial power', thread: 'power' },
  { year: '1953', event: 'El Glaoui conspires to exile Sultan Mohammed V. Declares Ben Arafa as imam. Insurrection follows', thread: 'power' },
  { year: '1956', event: 'Morocco\'s independence. El Glaoui dies January 23. All Glaoui properties seized. Kasbahs abandoned', thread: 'decline' },
  { year: '1962', event: 'Lawrence of Arabia filmed at Aït Benhaddou — Hollywood discovers the route', thread: 'cinema' },
  { year: '1987', event: 'Aït Benhaddou inscribed as UNESCO World Heritage Site', thread: 'conservation' },
  { year: '1990', event: 'CERKAS established in Ouarzazate — dedicated to conservation of earthen architecture in the Atlas region', thread: 'conservation' },
  { year: '2000', event: 'Gladiator filmed at Aït Benhaddou and Ouarzazate. Arena purpose-built with traditional mud bricks', thread: 'cinema' },
  { year: '2011–2019', event: 'Game of Thrones films at Aït Benhaddou (Yunkai, Pentos). Global tourism surges', thread: 'cinema' },
  { year: '2011–2016', event: 'Getty Conservation Institute + CERKAS develop Conservation and Rehabilitation Plan for Kasbah Taourirt', thread: 'conservation' },
  { year: '2023', event: 'Marrakesh–Safi earthquake damages Kasbah Telouet and other Atlas structures', thread: 'decline' },
  { year: 'Oct 2025', event: '75 million MAD tourism revival plan for Ouarzazate announced — heritage enhancements at Kasbah Taourirt Square', thread: 'conservation' },
]

export interface FilmCredit {
  title: string
  year: number
  location: string
  role: string
}

export const FILMS: FilmCredit[] = [
  { title: 'Lawrence of Arabia', year: 1962, location: 'Aït Benhaddou', role: 'Arabian desert settings' },
  { title: 'Oedipus Rex', year: 1967, location: 'Aït Benhaddou', role: 'Ancient world backdrop' },
  { title: 'The Man Who Would Be King', year: 1975, location: 'Aït Benhaddou', role: 'Kafiristan fortress' },
  { title: 'The Jewel of the Nile', year: 1985, location: 'Aït Benhaddou', role: 'North African settings' },
  { title: 'The Living Daylights', year: 1987, location: 'Ouarzazate region', role: '007 desert sequences' },
  { title: 'The Last Temptation of Christ', year: 1988, location: 'Ouarzazate region', role: 'Biblical landscapes' },
  { title: 'The Mummy', year: 1999, location: 'Aït Benhaddou', role: 'Ancient Egyptian city' },
  { title: 'Gladiator', year: 2000, location: 'Aït Benhaddou + Atlas Studios', role: 'Zucchabar gladiatorial arena' },
  { title: 'Alexander', year: 2004, location: 'Ouarzazate', role: 'Ancient world' },
  { title: 'Kingdom of Heaven', year: 2005, location: 'Ouarzazate', role: 'Medieval Jerusalem' },
  { title: 'Babel', year: 2006, location: 'Ouarzazate', role: 'Moroccan storyline' },
  { title: 'Prince of Persia', year: 2010, location: 'Aït Benhaddou', role: 'Alamut' },
  { title: 'Game of Thrones', year: 2013, location: 'Aït Benhaddou', role: 'Yunkai + Pentos' },
]

export interface RouteStop {
  name: string
  km: number
  elevation: string
  highlight: string
}

export const ROUTE_STOPS: RouteStop[] = [
  { name: 'Tizi n\'Tichka Pass', km: 0, elevation: '2,260m', highlight: 'Highest paved pass in North Africa. The gateway. Where Mediterranean ends and Sahara begins.' },
  { name: 'Telouet', km: 21, elevation: '1,800m', highlight: 'Glaoui palace. Crumbling grandeur. Off the main road — most tourists miss it.' },
  { name: 'Aït Benhaddou', km: 50, elevation: '1,300m', highlight: 'UNESCO ksar. Hollywood\'s desert. The most photographed mud-brick in the world.' },
  { name: 'Ouarzazate', km: 80, elevation: '1,160m', highlight: 'Gateway to the desert. Atlas Studios. Kasbah Taourirt. "The city without noise."' },
  { name: 'Skoura', km: 120, elevation: '1,100m', highlight: 'Palm oasis. Kasbah Amridil. 100+ bird species. The quiet one.' },
  { name: 'El Kelaa M\'Gouna', km: 160, elevation: '1,450m', highlight: 'Valley of Roses. Rosa damascena. April–May harvest. Rose festival.' },
  { name: 'Boumalne Dadès', km: 180, elevation: '1,586m', highlight: 'Dadès Gorge entrance. 1,000ft canyon walls. Hairpin road.' },
  { name: 'Tinghir', km: 220, elevation: '1,342m', highlight: 'Todra Gorge. 30km gorge, 300m walls. Kasbah El Glaoui ruins.' },
  { name: 'N\'Kob', km: 280, elevation: '1,100m', highlight: '40+ kasbahs. Jebel Saghro foothills. Berber tribal centre.' },
  { name: 'Merzouga', km: 370, elevation: '700m', highlight: 'Erg Chebbi dunes. End of the road. Beginning of the Sahara.' },
]

export const HERO_STATS = [
  { value: '4,000+', label: 'earthen settlements in southern Morocco' },
  { value: '370', label: 'km — Tichka Pass to Merzouga' },
  { value: '88,836', label: 'km² — Drâa-Tafilalet region' },
  { value: '1987', label: 'Aït Benhaddou UNESCO inscription' },
]

export const KEY_NUMBERS = [
  { number: '20+', context: 'Films shot at Aït Benhaddou — from Lawrence of Arabia (1962) to Game of Thrones (2019)' },
  { number: '12,000', context: 'm² — Kasbah Taourirt\'s total area. One of Morocco\'s largest earthen complexes' },
  { number: '300', context: 'Craftsmen who built Kasbah Telouet over 5 years. Artisans brought from across Morocco, including Fez' },
  { number: '67:33', context: 'Sand to clay ratio — optimal for earthen wall restoration. Confirmed by Getty Conservation Institute' },
  { number: '1,800', context: 'Metres elevation — Kasbah Telouet. The highest major kasbah on the route' },
  { number: '75M', context: 'MAD — tourism revival plan for Ouarzazate announced October 2025. Heritage enhancements at Taourirt' },
]

export const BIBLIOGRAPHY = [
  { source: 'UNESCO World Heritage Centre', detail: 'Ksar of Ait-Ben-Haddou — Inscription 1987, criteria (iv) and (v)', url: 'https://whc.unesco.org/en/list/444/' },
  { source: 'Getty Conservation Institute', detail: 'Conservation and Rehabilitation Plan for Tighermt (Kasbah) Taourirt, Southern Morocco (2016)', url: 'https://www.getty.edu/conservation/publications_resources/pdf_publications/cons_plan_taourirt.html' },
  { source: 'CERKAS (Ouarzazate)', detail: 'Centre de Conservation et de Réhabilitation du Patrimoine Architectural Atlasique et Subatlasique. Systematic aerial photography inventory of Drâa Valley since 2001' },
  { source: 'Rom Landau', detail: 'The Kasbahs of Southern Morocco. Faber and Faber Ltd, London, 1969' },
  { source: 'Wikipedia / Multiple Academic Sources', detail: 'Thami El Glaoui (1879–1956). Pasha of Marrakech. Glaoui clan history. Telouet Kasbah construction and abandonment' },
  { source: 'Drâa-Tafilalet Region — 2014 Census', detail: '1,635,008 population. 88,836 km². Oases occupy 88% of regional area. Five provinces.' },
]
