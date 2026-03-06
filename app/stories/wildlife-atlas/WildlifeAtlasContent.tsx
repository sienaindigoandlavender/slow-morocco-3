'use client'

import { useState, useEffect, useRef } from 'react'


const C = {
  ink: '#0a0a0a', text: '#262626', muted: '#737373', border: '#e5e5e5',
  extinct: '#1a1a1a', critical: '#991B1B', endangered: '#9A3412', vulnerable: '#A16207',
  nearThreat: '#4D7C0F', leastConcern: '#15803D', ghost: '#A1A1AA',
}

function useReveal(threshold = 0.08) {
  const ref = useRef<HTMLDivElement>(null)
  const [vis, setVis] = useState(false)
  useEffect(() => {
    const el = ref.current; if (!el) return
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVis(true); obs.disconnect() } }, { threshold })
    obs.observe(el); return () => obs.disconnect()
  }, [threshold])
  return { ref, vis }
}

// ═══════════════════════════════════════════════════
// DATA
// ═══════════════════════════════════════════════════

type IUCNStatus = 'EX' | 'EW' | 'CR' | 'EN' | 'VU' | 'NT' | 'LC'

const STATUS_LABELS: Record<IUCNStatus, string> = {
  EX: 'Extinct', EW: 'Extinct in Wild', CR: 'Critically Endangered',
  EN: 'Endangered', VU: 'Vulnerable', NT: 'Near Threatened', LC: 'Least Concern',
}

const STATUS_COLORS: Record<IUCNStatus, string> = {
  EX: C.extinct, EW: C.extinct, CR: C.critical, EN: C.endangered,
  VU: C.vulnerable, NT: C.nearThreat, LC: C.leastConcern,
}

interface Species {
  name: string
  scientific: string
  arabic?: string
  status: IUCNStatus
  type: 'mammal' | 'bird' | 'reptile' | 'fish' | 'invertebrate'
  population: string
  range: string
  habitat: string
  threats: string[]
  note: string
  keyFact: string
  lastRecord?: string // for extinct species
  highlight?: boolean // featured endangered species
}

const SPECIES: Species[] = [
  // ─── THE GHOSTS (Extinct) ───
  {
    name: 'Barbary Lion', scientific: 'Panthera leo leo', arabic: 'أسد بربري',
    status: 'EW', type: 'mammal',
    population: '~90 in captivity worldwide (32 at Rabat Zoo). Zero in the wild.',
    range: 'Atlas Mountains, Rif Mountains — once from Morocco to Egypt',
    habitat: 'Mountain forests, high plateaus, cedar woodland edges',
    threats: ['Hunting (sport and fur)', 'Deforestation of Atlas Mountains', 'Roman arena capture (thousands)', 'French colonial firearms'],
    note: 'Largest lion subspecies in recorded history. Males weighed up to 300 kg with dark manes extending over belly and between hind legs. Hunted by Romans for Colosseum spectacles — thousands were captured and shipped across the Mediterranean. The Moroccan royal family kept lions as symbols of power for centuries; Berber tribes presented captured lions to sultans as pledges of loyalty. When the royal family was exiled in 1953, 21 lions were transferred to zoos in Rabat and Casablanca. These "Royal Lions" are now the only known descendants.',
    keyFact: 'The last confirmed wild Barbary lion was shot in the Atlas Mountains in 1922 by a French colonial hunter. But research published in PLoS ONE (2013) found eyewitness accounts suggesting lions survived in remote areas until the 1960s — possibly as late as 1965 in Algeria.',
    lastRecord: '1922 (confirmed) — possibly 1960s (eyewitness accounts)',
    highlight: true,
  },
  {
    name: 'Atlas Bear', scientific: 'Ursus arctos crowtheri', arabic: 'دب الأطلس',
    status: 'EX', type: 'mammal',
    population: 'Zero. Extinct since ~1870s.',
    range: 'Atlas Mountains, Rif Mountains',
    habitat: 'Oak and cedar forests of the Atlas range',
    threats: ['Hunting', 'Roman arena capture', 'Habitat destruction'],
    note: 'Africa\'s only native bear. Smaller and stockier than European brown bears with shorter fur. A darker muzzle and shorter claws. Used in Roman arenas alongside Barbary lions. The last known specimen was likely killed in the Tetouan area of the Rif Mountains around 1870, though some accounts suggest a few survived into the 1890s.',
    keyFact: 'The Atlas bear was the only bear species native to Africa in modern times. It had inhabited North Africa since at least the Pleistocene.',
    lastRecord: '~1870 (Rif Mountains, near Tetouan)',
  },
  {
    name: 'Bubal Hartebeest', scientific: 'Alcelaphus buselaphus buselaphus',
    status: 'EX', type: 'mammal',
    population: 'Zero. Extinct since 1925.',
    range: 'Morocco, Algeria, Tunisia, Libya, Egypt',
    habitat: 'Plains, open woodland, light bush',
    threats: ['Overhunting', 'Habitat loss to agriculture', 'French colonial sport hunting'],
    note: 'A large antelope that once grazed across all of North Africa. It was the northernmost member of the hartebeest family and had been domesticated by ancient Egyptians. The last confirmed individual died in 1925 — probably in Algeria, though some accounts place the final sighting in Morocco.',
    keyFact: 'Ancient Egyptians kept tame Bubal hartebeest as sacrificial animals. Tomb paintings at Saqqara show them being led by ropes.',
    lastRecord: '1925 (Algeria)',
  },
  {
    name: 'North African Elephant', scientific: 'Loxodonta africana pharaohensis',
    status: 'EX', type: 'mammal',
    population: 'Zero. Extinct since ~300 AD.',
    range: 'Atlas Mountains, coastal North Africa — Morocco to Tunisia',
    habitat: 'Mountain forests, coastal woodland',
    threats: ['Roman arena capture (massive scale)', 'Habitat destruction', 'Ivory trade'],
    note: 'Smaller than savannah elephants — standing about 2.5 metres at the shoulder. These were the war elephants Hannibal marched over the Alps in 218 BC. The Roman demand for arena spectacles drove mass capture. By the time of the Roman Empire\'s decline, the population was functionally extinct.',
    keyFact: 'Hannibal\'s famous crossing of the Alps in 218 BC used North African elephants, not Asian ones. They were smaller and more agile in mountainous terrain — traits evolved from living in the Atlas range.',
    lastRecord: '~300 AD (Roman-era collapse)',
  },
  {
    name: 'Atlas Wild Ass', scientific: 'Equus africanus atlanticus',
    status: 'EX', type: 'mammal',
    population: 'Zero. Extinct since ~300 AD.',
    range: 'Atlas Mountains, northern Sahara fringe',
    habitat: 'Arid steppe, mountain scrub',
    threats: ['Hunting for meat and hides', 'Competition with livestock', 'Roman capture'],
    note: 'A subspecies of the African wild ass that lived in the Atlas range and surrounding steppe. Like the North African elephant, it was hunted to extinction during the Roman period. Roman mosaics in Volubilis depict these animals in hunting scenes.',
    keyFact: 'Depicted in Roman mosaics at Volubilis (near Meknes) — one of the few visual records of the living animal.',
    lastRecord: '~300 AD',
  },

  // ─── HOLDING ON (Endangered / Critical) ───
  {
    name: 'Barbary Macaque', scientific: 'Macaca sylvanus', arabic: 'زعطوط',
    status: 'EN', type: 'mammal',
    population: '<7,500 in the wild (Morocco and Algeria). Declining.',
    range: 'Middle Atlas (Ifrane, Azrou), High Atlas, Rif Mountains; small population in Algeria',
    habitat: 'Cedar and oak forests at 600–2,200m elevation',
    threats: ['Deforestation (cedar forest loss)', 'Illegal pet trade (young captured for tourists)', 'Tourism disturbance', 'Climate change (drought stress on forests)'],
    note: 'The only primate in Africa north of the Sahara, and the only macaque outside Asia. A small introduced population on the Rock of Gibraltar makes them the only wild monkeys in Europe. Highly social, living in troops of 10–80 individuals. Known for male parental care — unusual among primates. Males carry and groom infants regardless of paternity.',
    keyFact: 'The Gibraltar population (~230 animals) descends from Moroccan macaques. Legend says that when the apes leave Gibraltar, so will the British. Churchill had reinforcements shipped from Morocco during WWII.',
    highlight: true,
  },
  {
    name: 'Barbary Leopard', scientific: 'Panthera pardus pardus', arabic: 'نمر بربري',
    status: 'CR', type: 'mammal',
    population: 'Possibly fewer than 5. May already be functionally extinct.',
    range: 'High Atlas, Middle Atlas — formerly across entire Atlas range',
    habitat: 'Remote rocky outcrops at 1,500–3,000m elevation, forest edges',
    threats: ['Retaliatory killing (livestock)', 'Hunting', 'Habitat fragmentation', 'Prey depletion'],
    note: 'One of Africa\'s rarest cats. Exceptionally large for leopards — comparable in size to jaguars, according to 19th-century naturalist Ángel Cabrera. By the 1950s, only 50–100 remained in the Mid- and High Atlas. By 1984, just 5–10 were estimated in the Oued El Abid region. The last confirmed killing was in 1983. The last verified record was in 1996. Occasional unconfirmed sightings continued into the 2000s near the Morocco-Algeria border.',
    keyFact: 'Leopard DNA detected in scat analysis in the Hoggar Mountains of southern Algeria in 2005 — proving big cats still survive somewhere in North Africa\'s mountains.',
    highlight: true,
  },
  {
    name: 'Mediterranean Monk Seal', scientific: 'Monachus monachus', arabic: 'فقمة الراهب',
    status: 'EN', type: 'mammal',
    population: '<700 worldwide. Morocco hosts a critical population along Atlantic coast.',
    range: 'Atlantic coast (scattered), Mediterranean coast (rare)',
    habitat: 'Remote rocky shores, sea caves for pupping',
    threats: ['Human disturbance of breeding caves', 'Fishing net entanglement', 'Coastal development', 'Pollution'],
    note: 'The world\'s rarest pinniped species. Once common across the entire Mediterranean and Northwest African coast. Now survives in scattered populations in Morocco, Mauritania, Greece, Turkey, and Portugal (Madeira). Morocco is one of four countries (with Spain, Portugal, Mauritania) that signed a conservation agreement for the species. Solitary and extremely wary of humans.',
    keyFact: 'Morocco\'s Atlantic coast caves are among the last natural pupping sites for this species. A single breeding colony in Mauritania\'s Cabo Blanco holds the largest remaining group — about 350 animals.',
    highlight: true,
  },
  {
    name: 'Northern Bald Ibis', scientific: 'Geronticus eremita', arabic: 'أبو منجل أقرع',
    status: 'EN', type: 'bird',
    population: '~700+ in Morocco (wild). The only surviving wild population on Earth.',
    range: 'Souss-Massa National Park (3 colonies), Tamri coast (1 colony), plus 2 new colonies discovered 2017–2018',
    habitat: 'Coastal cliffs for nesting, semi-arid grassland for foraging',
    threats: ['Predation (ravens on eggs)', 'Human disturbance', 'Loss of foraging habitat', 'Drought reducing insect prey'],
    note: 'Morocco\'s most important conservation success. Once common across North Africa, Middle East, and southern Europe — it nested on castle battlements along the Danube. By 1940, Morocco had ~1,500 birds across 70 colonies. By 1975, just 600 birds in 13 sites. Down to 59 breeding pairs by 1997. The creation of Souss-Massa National Park (1991) and community-based wardening reversed the decline: 147 breeding pairs by 2018, earning a downgrade from Critically Endangered to Endangered on the IUCN Red List.',
    keyFact: 'Souss-Massa fishermen, recruited as wardens, helped save the species from extinction. Morocco now holds the world\'s entire wild breeding population.',
    highlight: true,
  },
  {
    name: 'Cuvier\'s Gazelle', scientific: 'Gazella cuvieri',
    status: 'VU', type: 'mammal',
    population: '~1,800 worldwide. Most in Morocco.',
    range: 'Atlas foothills, northern scrub, rocky slopes',
    habitat: 'Maquis, open forest, rocky hillsides at 500–2,500m',
    threats: ['Hunting (illegal but persistent)', 'Habitat loss to agriculture', 'Competition with livestock'],
    note: 'A pale, slender gazelle with lyre-shaped horns and black facial stripes. Named after naturalist Georges Cuvier. Crepuscular — most active at dawn and dusk. Extremely shy and difficult to observe.',
    keyFact: 'One of only three gazelle species found in the Atlas Mountains — the others are the Dorcas gazelle and the now-reintroduced Addax.',
  },
  {
    name: 'Dorcas Gazelle', scientific: 'Gazella dorcas',
    status: 'VU', type: 'mammal',
    population: 'Several thousand across North Africa. Declining.',
    range: 'Southern Morocco, Saharan fringe, pre-desert steppe',
    habitat: 'Arid plains, sand dunes, rocky desert',
    threats: ['Hunting', 'Habitat degradation', 'Drought'],
    note: 'The smallest of Morocco\'s gazelles — adults weigh just 15–20 kg. Adapted to survive without drinking water, extracting moisture from Acacia leaves and other desert plants. Both sexes carry curved horns.',
    keyFact: 'Can survive its entire life without drinking free water — all hydration comes from plants. One of the Sahara\'s most resilient mammals.',
  },
  {
    name: 'Barbary Sheep (Aoudad)', scientific: 'Ammotragus lervia', arabic: 'أروي',
    status: 'VU', type: 'mammal',
    population: 'Unknown, declining. Present in remote Atlas and Saharan ranges.',
    range: 'High Atlas, Anti-Atlas, Saharan Atlas, Jbel Saghro',
    habitat: 'Steep rocky slopes, mountain cliffs, dry gorges',
    threats: ['Hunting', 'Competition with domestic livestock', 'Habitat fragmentation'],
    note: 'A stocky wild sheep with heavy curved horns and a sandy coat. Known locally as aoudad. Males have long chaps of hair hanging from throat and forelegs. Remarkably agile on vertical rock faces. The only wild sheep native to Africa.',
    keyFact: 'Africa\'s only wild sheep. Introduced to Texas, New Mexico, and California where it has become invasive — thriving in the very rocky desert habitat it evolved for.',
  },
  {
    name: 'Addax', scientific: 'Addax nasomaculatus',
    status: 'CR', type: 'mammal',
    population: '<100 in the wild globally. Reintroduced in fenced reserves in Morocco.',
    range: 'Formerly across Saharan Morocco. Now only in managed reserves.',
    habitat: 'Sand dunes, arid steppe, desert plains',
    threats: ['Hunting (devastating)', 'Drought', 'Military disturbance in Saharan regions'],
    note: 'A Saharan antelope with spiraling horns, once common across the desert. Now functionally extinct in the wild except for tiny pockets in Niger. Morocco has reintroduced captive-bred addax into fenced reserves — part of a multi-country effort alongside Tunisia and Chad.',
    keyFact: 'Fewer than 100 remain in the wild. More addax live in Texas ranches than in all of Africa.',
  },
  {
    name: 'Egyptian Vulture', scientific: 'Neophron percnopterus',
    status: 'EN', type: 'bird',
    population: 'Scattered breeding pairs across Morocco. Declining across range.',
    range: 'Atlas Mountains, coastal cliffs, gorges',
    habitat: 'Mountain cliffs for nesting, open country for scavenging',
    threats: ['Poisoning (secondary — eating poisoned carcasses)', 'Electrocution on power lines', 'Habitat loss', 'Reduced food availability'],
    note: 'A small white vulture with a yellow face and tapered wings. Known for using stones to crack open ostrich eggs — one of the few tool-using birds. A carrion feeder that also eats human refuse. Migrates between Europe and Africa.',
    keyFact: 'One of very few birds known to use tools. Picks up stones and drops them on ostrich eggs to break the shells — observed and documented since ancient Egypt.',
  },
  {
    name: 'Fennec Fox', scientific: 'Vulpes zerda', arabic: 'فنك',
    status: 'LC', type: 'mammal',
    population: 'Stable. Common in Saharan regions.',
    range: 'Southern Morocco, Saharan desert, Erg Chebbi, Erg Chigaga',
    habitat: 'Sand dunes, arid desert with burrow-friendly soil',
    threats: ['Illegal pet trade', 'Trapping for fur'],
    note: 'The world\'s smallest fox — weighing just 0.7–1.6 kg with enormously oversized ears (up to 15 cm) that radiate body heat and detect underground prey. Nocturnal and nearly impossible to spot during the day. Lives in family groups in elaborate burrow systems.',
    keyFact: 'Ears make up a third of its body height — the largest ear-to-body ratio of any canid. Can hear insects moving underground.',
  },
  {
    name: 'Sand Cat', scientific: 'Felis margarita', arabic: 'هر الرمال',
    status: 'LC', type: 'mammal',
    population: 'Unknown. Rarely observed. Likely stable.',
    range: 'Saharan Morocco, Erg regions, southern desert fringe',
    habitat: 'Sandy desert, rocky desert with sparse vegetation',
    threats: ['Habitat degradation', 'Feral dogs', 'Trapping'],
    note: 'A small desert-adapted feline with a broad, flat head and fur-covered paws that act as snowshoes on sand. Almost impossible to track — its padded feet leave no prints. Survives entirely without drinking water. One of the most elusive mammals in Morocco.',
    keyFact: 'Leaves almost no footprints in sand. Was not scientifically documented in Morocco until relatively recently due to its extreme stealth.',
  },
  {
    name: 'West African Crocodile', scientific: 'Crocodylus suchus',
    status: 'LC', type: 'reptile',
    population: 'Extinct in Morocco. Relict populations survived in Draa River until 20th century.',
    range: 'Formerly in Draa River, southern oases',
    habitat: 'River systems, gueltas (desert water pools)',
    threats: ['Hunting', 'Water diversion', 'Habitat loss'],
    note: 'Crocodiles persisted in Morocco\'s Draa River into the 20th century — a relict population from when the Sahara was green. These were not Nile crocodiles but the recently reclassified West African species. Related populations survive in isolated Saharan gueltas in Mauritania and Chad.',
    keyFact: 'The Sahara once held vast lakes and river systems. Desert crocodiles are living fossils from that wetter era — some populations in Mauritania still survive in pools just metres wide.',
  },
]

// ─── NATIONAL PARKS ───

interface NationalPark {
  name: string
  established: number
  area: string
  region: string
  keySpecies: string[]
  note: string
  lat: number; lng: number
}

const PARKS: NationalPark[] = [
  { name: 'Toubkal', established: 1942, area: '38,000 ha', region: 'High Atlas', lat: 31.06, lng: -7.92, keySpecies: ['Barbary macaque', 'Barbary sheep', 'Golden eagle', 'Bearded vulture'], note: 'North Africa\'s highest peak (4,167m). Morocco\'s oldest national park. Alpine meadows and cedar forests.' },
  { name: 'Souss-Massa', established: 1991, area: '33,800 ha', region: 'Agadir / Atlantic coast', lat: 30.06, lng: -9.66, keySpecies: ['Northern bald ibis', 'Scimitar oryx (reintroduced)', 'Addax (reintroduced)', 'Flamingos'], note: 'Holds the world\'s only wild breeding colonies of northern bald ibis. Morocco\'s most important bird conservation site.' },
  { name: 'Ifrane', established: 2004, area: '53,800 ha', region: 'Middle Atlas', lat: 33.53, lng: -5.11, keySpecies: ['Barbary macaque (largest population)', 'Atlas cedar forests', 'Barbary stag', 'Booted eagle'], note: 'Africa\'s largest remaining Barbary macaque population. Atlas cedar forests — some trees over 800 years old.' },
  { name: 'Al Hoceima', established: 2004, area: '48,460 ha', region: 'Rif / Mediterranean coast', lat: 35.15, lng: -3.93, keySpecies: ['Mediterranean monk seal', 'Osprey', 'Eleonora\'s falcon', 'Bottlenose dolphin'], note: 'Marine and terrestrial park. Secluded coves provide refuge for Mediterranean monk seal.' },
  { name: 'Talassemtane', established: 2004, area: '58,950 ha', region: 'Rif Mountains (near Chefchaouen)', lat: 35.08, lng: -5.14, keySpecies: ['Barbary macaque', 'Moroccan fir (Abies marocana)', 'Golden jackal'], note: 'Home to the critically endangered Moroccan fir — a relict species from the Ice Age. Dense forests near Chefchaouen.' },
  { name: 'Tazekka', established: 1950, area: '13,737 ha', region: 'Middle Atlas (near Taza)', lat: 34.10, lng: -4.13, keySpecies: ['Barbary macaque (reintroduction site)', 'Wild boar', 'Atlas deer'], note: '"Born to be Wild" programme returns confiscated macaques to protected habitat here.' },
  { name: 'Iriqui', established: 1994, area: '123,000 ha', region: 'Draa-Tafilalt (Saharan fringe)', lat: 29.97, lng: -6.33, keySpecies: ['Dorcas gazelle', 'Fennec fox', 'Desert hedgehog', 'Houbara bustard'], note: 'Former lake bed on the Saharan edge. Seasonal wetland that attracts migratory birds and desert species.' },
  { name: 'Khenifiss', established: 2006, area: '185,000 ha', region: 'Atlantic Sahara coast', lat: 28.02, lng: -12.28, keySpecies: ['Flamingos', 'Monk seal (occasional)', 'Spoonbills', 'Marbled teal'], note: 'Coastal lagoon and desert. Major wintering ground for European migratory birds.' },
]

// ─── LOSS TIMELINE ───

interface LossEvent {
  year: string
  event: string
  type: 'extinction' | 'decline' | 'conservation' | 'discovery'
}

const TIMELINE: LossEvent[] = [
  { year: '~300 AD', event: 'North African elephant and Atlas wild ass hunted to extinction — driven by Roman arena demand and ivory trade', type: 'extinction' },
  { year: '~1870', event: 'Last Atlas bear killed near Tetouan in the Rif Mountains. Africa loses its only native bear.', type: 'extinction' },
  { year: '1912', event: 'French Protectorate begins. Firearms flood the countryside. Systematic deforestation of Atlas cedar forests accelerates.', type: 'decline' },
  { year: '1922', event: 'Last confirmed wild Barbary lion shot in the Atlas Mountains by a French colonial hunter.', type: 'extinction' },
  { year: '1925', event: 'Bubal hartebeest declared extinct. The last North African antelope vanishes.', type: 'extinction' },
  { year: '1942', event: 'Toubkal National Park established — Morocco\'s first protected area. A lion reportedly shot near Tizi-n-Tichka pass.', type: 'conservation' },
  { year: '1950s', event: 'Barbary leopard population drops to 50–100 in the Atlas. Crocodiles disappear from the Draa River system.', type: 'decline' },
  { year: '1953', event: 'Royal family exiled. 21 royal Barbary lions transferred to Rabat and Casablanca zoos — unknowingly saving the lineage.', type: 'conservation' },
  { year: '1975', event: 'Northern bald ibis population crashes to ~600 birds in 13 colonies. Down from 1,500 in 1940.', type: 'decline' },
  { year: '1983', event: 'Last confirmed killing of a Barbary leopard in Morocco.', type: 'extinction' },
  { year: '1991', event: 'Souss-Massa National Park created — the decision that saved the northern bald ibis from extinction.', type: 'conservation' },
  { year: '1996', event: 'Last verified record of Barbary leopard in Morocco. Fewer than 5 estimated to remain.', type: 'decline' },
  { year: '1997', event: 'Northern bald ibis reaches rock bottom: 59 breeding pairs. Community wardens recruited from local fishing villages.', type: 'conservation' },
  { year: '2004', event: 'Ifrane, Al Hoceima, and Talassemtane national parks established. Protected area network expands.', type: 'conservation' },
  { year: '2005', event: 'Leopard DNA detected in scat in Algeria\'s Hoggar Mountains — big cats still survive somewhere in North Africa.', type: 'discovery' },
  { year: '2013', event: 'PLoS ONE study reveals Barbary lions likely survived until 1960s based on eyewitness interviews. Northern bald ibis reaches 113 breeding pairs.', type: 'discovery' },
  { year: '2017', event: 'Two new northern bald ibis breeding colonies discovered on the Atlantic coast — first range expansion in decades.', type: 'conservation' },
  { year: '2018', event: 'Northern bald ibis downlisted from Critically Endangered to Endangered. 147 breeding pairs, 708+ individuals. Population growing.', type: 'conservation' },
  { year: '2020s', event: 'Rabat Zoo houses ~32 Royal Barbary lions — around half of the estimated 90 worldwide. European breeding programmes expand. Atlas Lion Project proposes reintroduction, but remains unfunded.', type: 'conservation' },
]

// ═══════════════════════════════════════════════════
// COMPONENTS
// ═══════════════════════════════════════════════════

const MAPBOX_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_TOKEN || ''

function StatusBadge({ status }: { status: IUCNStatus }) {
  return (
    <span className="text-[10px] uppercase tracking-[0.08em] font-semibold px-2 py-0.5 inline-block"
      style={{ background: STATUS_COLORS[status], color: '#fff' }}>
      {STATUS_LABELS[status]}
    </span>
  )
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between items-baseline gap-4 py-1.5 border-b border-dotted" style={{ borderColor: '#e5e5e5' }}>
      <span className="text-[10px] uppercase tracking-[0.06em] text-dwl-muted flex-shrink-0">{label}</span>
      <span className="text-[13px] text-dwl-black text-right">{value}</span>
    </div>
  )
}

function SpeciesCard({ s, expanded, onToggle, delay }: { s: Species; expanded: boolean; onToggle: () => void; delay: number }) {
  const reveal = useReveal()
  return (
    <div ref={reveal.ref}
      className="border border-dwl-border transition-all"
      style={{
        opacity: reveal.vis ? 1 : 0,
        transform: reveal.vis ? 'none' : 'translateY(16px)',
        transition: `all 0.5s ${delay * 0.04}s`,
      }}>
      <button onClick={onToggle} className="w-full text-left p-5 md:p-6 hover:bg-dwl-offwhite transition-colors">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-3 flex-wrap">
              <StatusBadge status={s.status} />
              <span className="text-[10px] uppercase tracking-[0.06em] text-dwl-muted">{s.type}</span>
              {s.highlight && <span className="text-[10px] uppercase tracking-[0.06em] text-dwl-muted">★ Featured</span>}
            </div>
            <h3 className="font-serif text-[22px] md:text-[26px] text-dwl-black leading-tight mt-2">{s.name}</h3>
            <p className="text-[13px] text-dwl-muted italic mt-0.5">{s.scientific}</p>
            {s.arabic && <p className="text-[13px] text-dwl-muted mt-0.5" dir="rtl">{s.arabic}</p>}
          </div>
          <div className="text-[18px] text-dwl-muted flex-shrink-0 mt-2">{expanded ? '−' : '+'}</div>
        </div>
      </button>

      {expanded && (
        <div className="px-5 md:px-6 pb-6 border-t border-dwl-border pt-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <InfoRow label="Population" value={s.population} />
              <InfoRow label="Range" value={s.range} />
              <InfoRow label="Habitat" value={s.habitat} />
              {s.lastRecord && <InfoRow label="Last Record" value={s.lastRecord} />}
              <div className="mt-4">
                <p className="text-[10px] uppercase tracking-[0.06em] text-dwl-muted mb-2">Threats</p>
                <div className="flex flex-wrap gap-1.5">
                  {s.threats.map(t => (
                    <span key={t} className="text-[11px] px-2 py-1 bg-dwl-light text-dwl-gray">{t}</span>
                  ))}
                </div>
              </div>
            </div>
            <div>
              <p className="text-[14px] text-dwl-text leading-relaxed">{s.note}</p>
              <div className="mt-4 p-4 bg-dwl-offwhite">
                <p className="text-[10px] uppercase tracking-[0.06em] text-dwl-muted mb-2">Key Fact</p>
                <p className="text-[14px] text-dwl-black leading-relaxed">{s.keyFact}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

function ParkMap({ parks, selected, onSelect }: { parks: NationalPark[]; selected: number; onSelect: (i: number) => void }) {
  const mapContainer = useRef<HTMLDivElement>(null)
  const mapRef = useRef<any>(null)
  const markersRef = useRef<any[]>([])
  const [mapLoaded, setMapLoaded] = useState(false)

  useEffect(() => {
    if (!mapContainer.current || mapRef.current || !MAPBOX_TOKEN) return
    let cancelled = false
    import('mapbox-gl').then((mapboxgl) => {
      if (cancelled || !mapContainer.current) return
      if (!document.querySelector('link[href*="mapbox-gl"]')) {
        const link = document.createElement('link'); link.rel = 'stylesheet'
        link.href = 'https://api.mapbox.com/mapbox-gl-js/v3.9.0/mapbox-gl.css'
        document.head.appendChild(link)
      }
      mapboxgl.default.accessToken = MAPBOX_TOKEN
      const map = new mapboxgl.default.Map({
        container: mapContainer.current!, style: 'mapbox://styles/mapbox/light-v11',
        center: [-6.5, 31.5], zoom: 5, minZoom: 4.5, maxZoom: 9,
        attributionControl: false, pitchWithRotate: false, dragRotate: false,
      })
      map.addControl(new mapboxgl.default.AttributionControl({ compact: true }), 'bottom-left')
      map.addControl(new mapboxgl.default.NavigationControl({ showCompass: false }), 'top-right')
      map.on('load', () => { mapRef.current = map; setMapLoaded(true) })
    })
    return () => { cancelled = true; mapRef.current?.remove(); mapRef.current = null }
  }, [])

  useEffect(() => {
    if (!mapRef.current || !mapLoaded) return
    markersRef.current.forEach(m => m.remove()); markersRef.current = []
    import('mapbox-gl').then((mapboxgl) => {
      parks.forEach((p, i) => {
        const isSel = i === selected; const size = isSel ? 18 : 11
        const el = document.createElement('div')
        el.style.cssText = `width:${size}px;height:${size}px;background:${isSel ? '#15803D' : '#0a0a0a'};border:2px solid #fff;border-radius:50%;cursor:pointer;transition:all 0.2s;opacity:${isSel ? '1' : '0.7'};box-shadow:${isSel ? '0 0 0 2px #15803D' : 'none'}`
        el.title = p.name; el.addEventListener('click', () => onSelect(i))
        const label = document.createElement('div')
        label.style.cssText = `position:absolute;left:${size + 6}px;top:50%;transform:translateY(-50%);white-space:nowrap;font-size:${isSel ? '12px' : '10px'};font-weight:${isSel ? '700' : '500'};font-family:Inter,system-ui,sans-serif;color:${isSel ? '#0a0a0a' : '#737373'};text-shadow:0 0 4px #FAFAF8,0 0 4px #FAFAF8,0 0 4px #FAFAF8`
        label.textContent = p.name
        const w = document.createElement('div'); w.style.position = 'relative'; w.appendChild(el); w.appendChild(label)
        markersRef.current.push(new mapboxgl.default.Marker({ element: w, anchor: 'center' }).setLngLat([p.lng, p.lat]).addTo(mapRef.current!))
      })
    })
  }, [mapLoaded, parks, selected, onSelect])

  useEffect(() => {
    if (!mapRef.current || !mapLoaded) return
    const p = parks[selected]
    mapRef.current.flyTo({ center: [p.lng, p.lat], zoom: 7.5, duration: 800 })
  }, [selected, mapLoaded, parks])

  return (
    <div className="relative w-full">
      <div ref={mapContainer} className="w-full h-[400px] md:h-[500px]" style={{ background: '#f2f0eb' }} />
      {mapLoaded && (
        <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-sm p-4 max-w-[200px] border border-dwl-border">
          <p className="font-serif text-[16px] text-dwl-black leading-tight">{parks[selected].name}</p>
          <p className="text-[11px] text-dwl-muted mt-1">{parks[selected].region}</p>
          <p className="text-[10px] text-dwl-muted mt-1">{parks[selected].area} · Est. {parks[selected].established}</p>
        </div>
      )}
      {!mapLoaded && <div className="absolute inset-0 flex items-center justify-center bg-[#f2f0eb]"><p className="text-[13px] text-dwl-gray uppercase tracking-[0.08em]">Loading map...</p></div>}
    </div>
  )
}

// ═══════════════════════════════════════════════════
// MAIN PAGE
// ═══════════════════════════════════════════════════

export function WildlifeAtlasContent() {
  const [filter, setFilter] = useState<IUCNStatus | 'all' | 'highlight'>('all')
  const [expanded, setExpanded] = useState<string | null>('Barbary Lion')
  const [selectedPark, setSelectedPark] = useState(0)

  const hero = useReveal()
  const numbers = useReveal()
  const parks = useReveal()
  const tl = useReveal()
  const reading = useReveal()

  const filtered = filter === 'all' ? SPECIES
    : filter === 'highlight' ? SPECIES.filter(s => s.highlight)
    : SPECIES.filter(s => s.status === filter)

  const extinctCount = SPECIES.filter(s => s.status === 'EX' || s.status === 'EW').length
  const endangeredCount = SPECIES.filter(s => s.status === 'CR' || s.status === 'EN').length

  return (
    <div className="min-h-screen bg-white">
      {/* ─── HERO ─── */}
      <div ref={hero.ref}>
        <section className="px-8 md:px-[8%] lg:px-[12%] pt-16 md:pt-24 pb-section">
          <h1 className="font-serif text-hero text-dwl-black leading-[0.95] mt-2"
            style={{ opacity: hero.vis ? 1 : 0, transform: hero.vis ? 'none' : 'translateY(20px)', transition: 'all 0.7s' }}>
            The Wildlife<br />Atlas
          </h1>
          <p className="text-[17px] md:text-[19px] text-dwl-gray mt-6 max-w-[620px] leading-relaxed"
            style={{ opacity: hero.vis ? 1 : 0, transition: 'opacity 0.7s 0.2s' }}>
            What still roams the Atlas. What was hunted to silence. Morocco holds 118 mammal species,
            490 bird species, and 40 ecosystems — but its three apex predators are gone from the wild.
            The Barbary lion, the Atlas bear, the leopard: each a ghost in its own mountains.
          </p>
        </section>
      </div>

      <div className="px-8 md:px-[8%] lg:px-[12%]"><div className="border-t border-dwl-border" /></div>

      {/* ─── KEY NUMBERS ─── */}
      <div ref={numbers.ref}>
        <section className="px-8 md:px-[8%] lg:px-[12%] py-24 md:py-40">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { n: '118', l: 'Mammal species recorded', sub: '3 extinct, 3 critically endangered, 7 endangered' },
              { n: '490', l: 'Bird species documented', sub: '~12 globally threatened. 1 endemic (northern bald ibis)' },
              { n: '40+', l: 'Ecosystems', sub: 'Mediterranean to Saharan, alpine to coastal' },
              { n: `${extinctCount}`, l: 'Species lost from Morocco', sub: 'Barbary lion, Atlas bear, hartebeest, elephant, wild ass' },
              { n: '<7,500', l: 'Barbary macaques remaining', sub: 'Africa\'s only primate north of the Sahara' },
              { n: '~700', l: 'Northern bald ibis (wild)', sub: 'World\'s entire wild population in Morocco' },
              { n: '~90', l: 'Royal Barbary lions (captive)', sub: '32 at Rabat Zoo — half the world total' },
              { n: '8', l: 'National parks', sub: 'From Toubkal (1942) to Khenifiss (2006)' },
            ].map((s, i) => (
              <div key={i} style={{ opacity: numbers.vis ? 1 : 0, transform: numbers.vis ? 'none' : 'translateY(12px)', transition: `all 0.5s ${i * 0.05}s` }}>
                <div className="font-serif text-[clamp(1.8rem,4vw,2.4rem)] text-dwl-black leading-none">{s.n}</div>
                <div className="text-[13px] text-dwl-gray mt-2 leading-snug">{s.l}</div>
                <div className="text-[11px] text-dwl-muted mt-1">{s.sub}</div>
              </div>
            ))}
          </div>
        </section>
      </div>

      <div className="px-8 md:px-[8%] lg:px-[12%]"><div className="border-t border-dwl-border" /></div>

      {/* ─── IUCN SCALE ─── */}
      <section className="px-8 md:px-[8%] lg:px-[12%] py-20 md:py-32">
        <p className="micro-label mb-4">IUCN Red List — Conservation Status Scale</p>
        <div className="flex flex-wrap gap-1">
          {(['EX', 'EW', 'CR', 'EN', 'VU', 'NT', 'LC'] as IUCNStatus[]).map(s => (
            <div key={s} className="flex items-center gap-1.5 mr-4 mb-1">
              <div className="w-3 h-3 flex-shrink-0" style={{ background: STATUS_COLORS[s] }} />
              <span className="text-[11px] text-dwl-gray">{STATUS_LABELS[s]}</span>
            </div>
          ))}
        </div>
      </section>

      <div className="px-8 md:px-[8%] lg:px-[12%]"><div className="border-t border-dwl-border" /></div>

      {/* ─── SPECIES CARDS ─── */}
      <section className="px-8 md:px-[8%] lg:px-[12%] py-24 md:py-40">
        <p className="micro-label mb-3">Species Profiles</p>
        <p className="text-[15px] text-dwl-gray mb-8 max-w-[580px]">
          {extinctCount} species lost. {endangeredCount} critically endangered or endangered.
          Select a category to filter, or explore featured species for the full story.
        </p>

        {/* Filter tabs */}
        <div className="flex flex-wrap gap-1.5 mb-10">
          {([
            ['all', 'All Species'],
            ['highlight', '★ Featured'],
            ['EX', 'Extinct'],
            ['EW', 'Extinct in Wild'],
            ['CR', 'Critical'],
            ['EN', 'Endangered'],
            ['VU', 'Vulnerable'],
            ['LC', 'Least Concern'],
          ] as [string, string][]).map(([key, label]) => (
            <button key={key} onClick={() => setFilter(key as typeof filter)}
              className="text-[11px] px-3 py-1.5 transition-colors border"
              style={{
                background: filter === key ? C.ink : 'transparent',
                color: filter === key ? '#fff' : C.muted,
                borderColor: filter === key ? C.ink : C.border,
              }}>
              {label} {key !== 'all' && key !== 'highlight' && `(${SPECIES.filter(s => s.status === key).length})`}
            </button>
          ))}
        </div>

        {/* Species list */}
        <div className="space-y-3">
          {filtered.map((s, i) => (
            <SpeciesCard
              key={s.name} s={s}
              expanded={expanded === s.name}
              onToggle={() => setExpanded(expanded === s.name ? null : s.name)}
              delay={i}
            />
          ))}
        </div>

        {filtered.length === 0 && (
          <p className="text-[15px] text-dwl-muted py-12 text-center">No species match this filter.</p>
        )}
      </section>

      <div className="px-8 md:px-[8%] lg:px-[12%]"><div className="border-t border-dwl-border" /></div>

      {/* ─── THE BARBARY LION (Feature section) ─── */}
      <section className="px-8 md:px-[8%] lg:px-[12%] py-24 md:py-40 bg-dwl-offwhite -mx-0">
        <div className="max-w-[1400px] mx-auto">
          <p className="micro-label mb-6">Feature — The Atlas Lion</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
              <h2 className="font-serif text-[clamp(2rem,5vw,3.5rem)] text-dwl-black leading-[0.95]">
                The Ghost in<br />the Mountains
              </h2>
              <p className="text-[15px] text-dwl-gray mt-6 leading-relaxed">
                The <span className="underline underline-offset-2 hover:text-[#0a0a0a] transition-colors">Barbary lion</span> was not just a predator. It was the symbol of North African
                power for three thousand years. Nubian deities wore its face. Roman emperors
                filled colosseums with its rage. Moroccan sultans kept it behind palace walls
                as proof of divine authority. The football team still carries its name.
              </p>
              <p className="text-[15px] text-dwl-gray mt-4 leading-relaxed">
                What killed it was not spectacular. Deforestation of the <span className="underline underline-offset-2 hover:text-[#0a0a0a] transition-colors">Atlas Mountains</span> for timber and
                agriculture shrank its range decade by decade. The arrival of modern firearms in the 19th
                century made what remained a target. <span className="underline underline-offset-2 hover:text-[#0a0a0a] transition-colors">French colonial</span> hunters treated it as a trophy.
                By 1922, the gunshot that killed the last confirmed wild lion echoed through empty cedar forests.
              </p>
            </div>
            <div>
              <p className="text-[15px] text-dwl-gray leading-relaxed">
                But the story has a strange coda. When Morocco&apos;s royal family was exiled in 1953,
                twenty-one lions from the palace collection were transferred to zoos. These &ldquo;Royal Lions&rdquo;
                — descendants of animals that Berber tribes had presented to sultans as pledges of loyalty —
                carried genetics that may be the last link to the wild Barbary population.
              </p>
              <p className="text-[15px] text-dwl-gray mt-4 leading-relaxed">
                Today, the Rabat Zoo houses 32 of approximately 90 Royal Barbary lions known worldwide.
                A studbook tracks every descendant. European zoos in Germany, Czech Republic, Switzerland,
                and the UK run coordinated breeding programmes. The Atlas Lion Project proposes eventual
                reintroduction to the wild — a return to the mountains — though it remains unfunded and controversial.
              </p>
              <p className="text-[15px] text-dwl-gray mt-4 leading-relaxed">
                And then there are the eyewitnesses. A 2013 study in PLoS ONE interviewed elderly
                residents of remote Algerian communities who described seeing lions well after 1922.
                Statistical modelling placed the probable extinction date in Morocco at 1948 — possibly
                as late as the 1960s. The last mountain forests near Algeria&apos;s coast were destroyed
                during the French-Algerian War. The lions, if any still lived, would have burned with the trees.
              </p>
            </div>
          </div>

          {/* Lion timeline */}
          <div className="mt-12 grid grid-cols-2 md:grid-cols-5 gap-4">
            {[
              { y: '218 BC', e: 'Hannibal crosses Alps with North African elephants — the lion\'s ecosystem still intact' },
              { y: '~100 AD', e: 'Thousands of Barbary lions captured and shipped to Roman arenas across the empire' },
              { y: '1700s', e: 'Sultans and kings maintain royal lion collections — Berber tribes gift captured animals' },
              { y: '1922', e: 'Last confirmed wild Barbary lion killed by French colonial hunter in Atlas Mountains' },
              { y: '2020s', e: '~90 Royal Lions survive in captivity. Reintroduction proposed but unfunded.' },
            ].map((m, i) => (
              <div key={i} className="p-3 bg-white">
                <div className="font-serif text-[18px] text-dwl-black">{m.y}</div>
                <p className="text-[11px] text-dwl-gray mt-1 leading-snug">{m.e}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="px-8 md:px-[8%] lg:px-[12%]"><div className="border-t border-dwl-border" /></div>

      {/* ─── NATIONAL PARKS ─── */}
      <div ref={parks.ref}>
        <section className="px-8 md:px-[8%] lg:px-[12%] py-24 md:py-40">
          <p className="micro-label mb-3">Protected Areas</p>
          <h2 className="font-serif text-[clamp(1.6rem,4vw,2.8rem)] text-dwl-black leading-tight mb-8">
            National Parks of Morocco
          </h2>

          <div className="mb-10">
            <ParkMap parks={PARKS} selected={selectedPark} onSelect={setSelectedPark} />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {PARKS.map((p, i) => (
              <div key={p.name}
                className="border border-dwl-border p-5"
                style={{
                  opacity: parks.vis ? 1 : 0,
                  transform: parks.vis ? 'none' : 'translateY(12px)',
                  transition: `all 0.5s ${i * 0.06}s`,
                }}>
                <div className="flex items-baseline justify-between mb-3">
                  <h3 className="font-serif text-[20px] text-dwl-black">{p.name}</h3>
                  <span className="text-[11px] text-dwl-muted tabular-nums">{p.established}</span>
                </div>
                <div className="flex gap-4 text-[11px] text-dwl-muted mb-3">
                  <span>{p.area}</span>
                  <span>·</span>
                  <span>{p.region}</span>
                </div>
                <p className="text-[13px] text-dwl-gray leading-snug mb-3">{p.note}</p>
                <div className="flex flex-wrap gap-1">
                  {p.keySpecies.map(s => (
                    <span key={s} className="text-[10px] px-2 py-0.5 bg-dwl-light text-dwl-gray">{s}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>

      <div className="px-8 md:px-[8%] lg:px-[12%]"><div className="border-t border-dwl-border" /></div>

      {/* ─── LOSS TIMELINE ─── */}
      <div ref={tl.ref}>
        <section className="px-8 md:px-[8%] lg:px-[12%] py-24 md:py-40">
          <p className="micro-label mb-3">Timeline</p>
          <h2 className="font-serif text-[clamp(1.6rem,4vw,2.8rem)] text-dwl-black leading-tight mb-10">
            What Was Lost &amp; What Was Saved
          </h2>

          <div className="space-y-0">
            {TIMELINE.map((e, i) => {
              const dotColor = e.type === 'extinction' ? C.critical
                : e.type === 'decline' ? C.vulnerable
                : e.type === 'conservation' ? C.leastConcern
                : C.muted
              return (
                <div key={i}
                  className="flex gap-4 md:gap-6 py-3 border-b border-dwl-border"
                  style={{
                    opacity: tl.vis ? 1 : 0,
                    transform: tl.vis ? 'none' : 'translateY(8px)',
                    transition: `all 0.4s ${i * 0.03}s`,
                  }}>
                  <div className="flex items-start gap-2 flex-shrink-0 w-[80px] md:w-[100px]">
                    <div className="w-2.5 h-2.5 rounded-full flex-shrink-0 mt-1.5" style={{ background: dotColor }} />
                    <span className="text-[13px] text-dwl-black font-medium tabular-nums whitespace-nowrap">{e.year}</span>
                  </div>
                  <p className="text-[14px] text-dwl-gray leading-snug">{e.event}</p>
                </div>
              )
            })}
          </div>

          <div className="flex gap-6 mt-6">
            {[
              { color: C.critical, label: 'Extinction' },
              { color: C.vulnerable, label: 'Decline' },
              { color: C.leastConcern, label: 'Conservation' },
              { color: C.muted, label: 'Discovery' },
            ].map(l => (
              <div key={l.label} className="flex items-center gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full" style={{ background: l.color }} />
                <span className="text-[10px] text-dwl-gray">{l.label}</span>
              </div>
            ))}
          </div>
        </section>
      </div>

      <div className="px-8 md:px-[8%] lg:px-[12%]"><div className="border-t border-dwl-border" /></div>

      {/* ─── READING NOTES ─── */}
      <div ref={reading.ref}>
        <section className="px-8 md:px-[8%] lg:px-[12%] py-24 md:py-40">
          <p className="micro-label mb-6">Reading Notes</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: 'The Roman Debt',
                text: 'Rome did not just watch North African animals die — it engineered their decline. Thousands of Barbary lions, elephants, bears, and leopards were captured and shipped to arenas across the empire. Condemned criminals and gladiators fought them for entertainment. By the time Rome fell, the ecosystem it had plundered was already collapsing. What 19th-century French colonial hunters finished, Roman spectacle had begun seventeen centuries earlier.',
              },
              {
                title: 'The Ibis Miracle',
                text: 'In 1997, fifty-nine breeding pairs of northern bald ibis remained on Earth. All of them in Morocco. The decision to recruit local fishermen as wardens — paying them to protect cliffs they had fished below their entire lives — turned the tide. By 2018, the count was 147 pairs. New colonies appeared for the first time in decades. It is the rarest kind of conservation story: one that worked. The bird that was about to vanish was saved by people who lived next to it.',
              },
              {
                title: 'The Royal Accident',
                text: 'Nobody planned to save the Barbary lion. Sultans kept them for prestige, not conservation. When the royal family was exiled in 1953, the lions were parcelled off to zoos as afterthoughts. Decades later, scientists realised these 21 animals carried the last known Barbary genetics. A captive population of about 90 lions now exists because of political exile and zoo transfers — the most accidental conservation programme in history.',
              },
            ].map((note, i) => (
              <div key={i} style={{ opacity: reading.vis ? 1 : 0, transform: reading.vis ? 'none' : 'translateY(12px)', transition: `all 0.5s ${i * 0.1}s` }}>
                <h3 className="font-serif text-[22px] text-dwl-black leading-tight mb-3">{note.title}</h3>
                <p className="text-[14px] text-dwl-gray leading-relaxed">{note.text}</p>
              </div>
            ))}
          </div>
        </section>
      </div>

      <div className="px-8 md:px-[8%] lg:px-[12%]"><div className="border-t border-dwl-border" /></div>

      {/* ─── SOURCES ─── */}
      <section style={{ backgroundColor: '#1f1f1f' }} className="px-8 md:px-[8%] lg:px-[12%] py-20 md:py-32">
        <p className="micro-label mb-4">Sources &amp; Methodology</p>
        <p className="text-[13px] text-dwl-gray leading-relaxed max-w-[640px]">
          Species data from IUCN Red List assessments and Wikipedia species profiles. Barbary lion research:
          Black, Fellous, Yamaguchi &amp; Roberts (2013) &ldquo;Examining the Extinction of the Barbary Lion&rdquo;,
          PLoS ONE. Northern bald ibis: BirdLife International / IUCN 2018 assessment; Souss-Massa monitoring data
          (Oubrou &amp; El Bekkay). Barbary leopard: Mammals Maroc / Cabrera (1932). National park data from
          Morocco&apos;s Haut Commissariat aux Eaux et Forêts et à la Lutte Contre la Désertification (HCEFLCD).
          Population estimates are editorial estimates compiled from multiple sources and should be treated as
          approximate. © Slow Morocco.
        </p>
      </section>
    </div>
  )
}
