'use client'

import { useState, useEffect, useRef } from 'react'

const C = {
  ink: '#0a0a0a', text: '#262626', muted: '#737373', border: '#e5e5e5',
  tingitana: '#8B6E4E', caesariensis: '#6B7E3E', numidia: '#B88B2E',
  proconsularis: '#A0452E', tripolitania: '#7A3B5E', cyrenaica: '#3E6B7A',
  rome: '#A0452E', berber: '#C8A415', vandal: '#4A5E6B', byzantine: '#6B4E8B',
  sea: '#89A8B8', land: '#D4C5A9',
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

// ═══ PROVINCES ═══
interface Province {
  name: string; modern: string; capital: string; capitalModern: string
  color: string; established: string; area: string; notes: string
  x1: number; x2: number; y: number // SVG map position
}

const PROVINCES: Province[] = [
  { name: 'Mauretania Tingitana', modern: 'Northern Morocco', capital: 'Tingis', capitalModern: 'Tangier',
    color: C.tingitana, established: '44 CE (Claudius)', area: '~50,000 km²',
    notes: 'Westernmost province. Administered under Diocese of Spain, not Africa. Garrison withdrawn 285 CE. Volubilis was its grandest inland city.',
    x1: 20, x2: 100, y: 115 },
  { name: 'Mauretania Caesariensis', modern: 'Western & Central Algeria', capital: 'Caesarea', capitalModern: 'Cherchell',
    color: C.caesariensis, established: '44 CE (Claudius)', area: '~200,000 km²',
    notes: 'Separated from Tingitana by the Mulucha (Moulouya) River. Largest by area. Rome controlled coast; interior remained Berber. Sitifensis split off under Diocletian.',
    x1: 100, x2: 230, y: 105 },
  { name: 'Numidia', modern: 'Northeastern Algeria', capital: 'Cirta / Lambaesis', capitalModern: 'Constantine',
    color: C.numidia, established: '~46 BCE (Caesar); formal ~197 CE (Severus)', area: '~80,000 km²',
    notes: 'Headquarters of Legio III Augusta — the only legion in Africa. Home to Timgad, Djémila, and Hippo Regius (Augustine\'s bishopric).',
    x1: 230, x2: 310, y: 95 },
  { name: 'Africa Proconsularis', modern: 'Tunisia + NW Libya coast', capital: 'Carthago', capitalModern: 'Carthage/Tunis',
    color: C.proconsularis, established: '146 BCE', area: '~100,000 km²',
    notes: 'The original province. Wealthiest in Africa. "Granary of the empire" — 1M tonnes of cereals/year. Carthage: 2nd city of Western Empire (~300,000 pop). Later split into Zeugitana and Byzacena.',
    x1: 310, x2: 400, y: 80 },
  { name: 'Tripolitania', modern: 'Northwestern Libya', capital: 'Leptis Magna', capitalModern: 'Al-Khums',
    color: C.tripolitania, established: '~293 CE (Diocletian)', area: '~60,000 km²',
    notes: 'Named for its three cities: Leptis Magna, Oea (Tripoli), Sabratha. Birthplace of Emperor Septimius Severus. Trans-Saharan trade in gold, ivory, wild animals.',
    x1: 400, x2: 490, y: 95 },
  { name: 'Cyrenaica', modern: 'Eastern Libya', capital: 'Cyrene', capitalModern: 'Shahhat',
    color: C.cyrenaica, established: '74 BCE (Roman); originally Greek colony 631 BCE', area: '~90,000 km²',
    notes: 'Originally Greek, not Punic. Five cities (Pentapolis). Combined with Crete as a single province. Silphium (extinct contraceptive plant) was its most famous export.',
    x1: 490, x2: 580, y: 100 },
]

// ═══ KEY CITIES / RUINS ═══
interface Site {
  name: string; modern: string; country: string; province: string
  founded: string; highlight: string; unesco: boolean
  x: number; y: number; color: string
}

const SITES: Site[] = [
  { name: 'Volubilis', modern: 'near Meknès', country: 'Morocco', province: 'Tingitana',
    founded: '3rd c. BCE', highlight: 'Westernmost major Roman city. Mosaics. Oil presses. Garrison withdrawn 285 CE. Later capital of Idris I.',
    unesco: true, x: 55, y: 110, color: C.tingitana },
  { name: 'Sala Colonia', modern: 'Chellah/Rabat', country: 'Morocco', province: 'Tingitana',
    founded: 'Phoenician', highlight: 'Atlantic garrison colony. Maintained until 6th century.',
    unesco: false, x: 35, y: 130, color: C.tingitana },
  { name: 'Caesarea', modern: 'Cherchell', country: 'Algeria', province: 'Caesariensis',
    founded: '4th c. BCE', highlight: 'Provincial capital. Juba II\'s court — marriage of Punic, Greek, Roman culture.',
    unesco: false, x: 155, y: 85, color: C.caesariensis },
  { name: 'Timgad', modern: 'Timgad', country: 'Algeria', province: 'Numidia',
    founded: '100 CE (Trajan)', highlight: 'Built ex nihilo as military colony. Perfect grid plan. "Pompeii of Africa." 14 bathhouses.',
    unesco: true, x: 260, y: 110, color: C.numidia },
  { name: 'Djémila', modern: 'Djémila', country: 'Algeria', province: 'Numidia',
    founded: '1st c. CE', highlight: 'Mountain town, 900m altitude. Adapted Roman grid to terrain. Exceptional mosaics.',
    unesco: true, x: 250, y: 95, color: C.numidia },
  { name: 'Hippo Regius', modern: 'Annaba', country: 'Algeria', province: 'Numidia',
    founded: 'Phoenician', highlight: 'Augustine\'s bishopric (396–430 CE). He died here during the Vandal siege.',
    unesco: false, x: 290, y: 80, color: C.numidia },
  { name: 'Carthago', modern: 'Tunis', country: 'Tunisia', province: 'Proconsularis',
    founded: '~814 BCE (Phoenician)', highlight: 'Destroyed 146 BCE, rebuilt by Caesar/Augustus. 300,000 pop. Capital of Africa. Antonine Baths — largest outside Rome.',
    unesco: true, x: 350, y: 70, color: C.proconsularis },
  { name: 'Dougga', modern: 'Téboursouk', country: 'Tunisia', province: 'Proconsularis',
    founded: '6th c. BCE', highlight: 'Best-preserved Roman small town in Africa. Capitol, theatre, baths. 75 hectares. 17 centuries of occupation.',
    unesco: true, x: 335, y: 80, color: C.proconsularis },
  { name: 'El Djem', modern: 'El Jem', country: 'Tunisia', province: 'Proconsularis',
    founded: 'Punic era', highlight: 'Amphitheatre: 35,000 capacity, 3rd largest in Roman world. Freestanding (not built into hillside). Built ~238 CE.',
    unesco: true, x: 365, y: 95, color: C.proconsularis },
  { name: 'Leptis Magna', modern: 'Al-Khums', country: 'Libya', province: 'Tripolitania',
    founded: '7th c. BCE (Phoenician)', highlight: 'Birthplace of Septimius Severus. 3rd most important city in Africa. Severan forum: 305×183m. Buried by sand — perfectly preserved.',
    unesco: true, x: 435, y: 90, color: C.tripolitania },
  { name: 'Sabratha', modern: 'Sabratha', country: 'Libya', province: 'Tripolitania',
    founded: '5th c. BCE', highlight: 'Theatre with 3-storey scaenae frons — most complete in Africa. Trade hub for ivory and wild animals.',
    unesco: true, x: 420, y: 85, color: C.tripolitania },
  { name: 'Cyrene', modern: 'Shahhat', country: 'Libya', province: 'Cyrenaica',
    founded: '631 BCE (Greek)', highlight: 'Greek colony that became Roman. Temple of Zeus larger than Parthenon. Birthplace of Eratosthenes.',
    unesco: true, x: 530, y: 90, color: C.cyrenaica },
]

// ═══ TIMELINE ═══
interface Event { year: string; label: string; era: string; color: string; detail: string }

const EVENTS: Event[] = [
  { year: '814 BCE', label: 'Carthage founded', era: 'Punic Prelude', color: C.proconsularis,
    detail: 'Phoenicians from Tyre found Carthage (Qart Hadasht — "New City") on the Gulf of Tunis. It grows into the dominant power of the western Mediterranean, with colonies along the entire North African coast from Libya to Morocco.' },
  { year: '264–146 BCE', label: 'The Punic Wars (three wars)', era: 'Punic Prelude', color: C.rome,
    detail: 'Rome and Carthage fight three devastating wars for control of the western Mediterranean. The First (264–241 BCE) costs Carthage Sicily. The Second (218–201 BCE) features Hannibal\'s crossing of the Alps. The Third (149–146 BCE) ends in Carthage\'s total destruction.' },
  { year: '146 BCE', label: 'Carthage destroyed — Africa Proconsularis created', era: 'Republic (146–27 BCE)', color: C.rome,
    detail: 'Scipio Aemilianus razes Carthage after a 3-year siege. The Senate salts the earth (tradition, likely exaggerated). Rome creates its first African province: Africa, governed from Utica. The land becomes ager publicus — Roman public land.' },
  { year: '112–106 BCE', label: 'Jugurthine War', era: 'Republic (146–27 BCE)', color: C.numidia,
    detail: 'Rome fights the Numidian king Jugurtha, who bribed half the Roman Senate. Marius and Sulla defeat him. Numidia is divided between client kings. Leptis Magna and other Tripolitanian cities come under indirect Roman control.' },
  { year: '46 BCE', label: 'Caesar creates Africa Nova', era: 'Republic (146–27 BCE)', color: C.rome,
    detail: 'After defeating Pompey\'s allies at Thapsus, Caesar abolishes the Numidian kingdom and creates Africa Nova alongside the existing Africa Vetus. He levies 200,000 medimni of wheat and 3 million librae of oil from the provinces annually.' },
  { year: '25 BCE', label: 'Juba II — Rome\'s scholar-king', era: 'Early Empire (27 BCE–117 CE)', color: C.caesariensis,
    detail: 'Augustus installs Juba II as client king of Mauretania. Raised in Rome, married to Cleopatra Selene II (daughter of Cleopatra and Mark Antony). He rules from Caesarea (Cherchell), creating a court that blends Punic, Greek, and Roman culture. Volubilis flourishes as his southern outpost.' },
  { year: '40 CE', label: 'Caligula murders Ptolemy of Mauretania', era: 'Early Empire (27 BCE–117 CE)', color: C.rome,
    detail: 'Emperor Caligula invites King Ptolemy (Juba II\'s son) to Rome, then has him arrested and executed — allegedly because the crowd admired Ptolemy\'s purple cloak. The assassination triggers a 4-year Berber revolt.' },
  { year: '44 CE', label: 'Claudius creates Tingitana & Caesariensis', era: 'Early Empire (27 BCE–117 CE)', color: C.tingitana,
    detail: 'After crushing the Berber revolt, Claudius annexes Mauretania and splits it into two provinces at the Moulouya River: Mauretania Tingitana (capital: Tangier) in the west and Mauretania Caesariensis (capital: Cherchell) in the east. Six Roman provinces now span North Africa.' },
  { year: '100 CE', label: 'Trajan founds Timgad', era: 'Early Empire (27 BCE–117 CE)', color: C.numidia,
    detail: 'Emperor Trajan creates Colonia Marciana Ulpia Traiana Thamugadi (Timgad) as a military colony for veterans of Legio III Augusta. Built ex nihilo on a perfect grid — the "Pompeii of Africa." It will grow to 15,000 inhabitants with 14 bathhouses and a 3,500-seat theatre.' },
  { year: '~100–200 CE', label: 'Golden age of Roman Africa', era: 'Peak (117–235 CE)', color: C.proconsularis,
    detail: 'Africa becomes the "granary of the empire" — producing an estimated 1 million tonnes of grain annually, one-quarter exported to Rome. Olive oil rivals cereals as the main export. The region has 500+ cities and over 3 million inhabitants. African Red Slip pottery becomes the empire\'s leading fine tableware.' },
  { year: '109 CE', label: 'Trajan grants Leptis Magna colonial status', era: 'Peak (117–235 CE)', color: C.tripolitania,
    detail: 'Leptis Magna becomes a Roman colonia under Trajan, receiving the title "Ulpia Traiana." The city\'s basilica, modelled on that of Leptis, is one of the finest in Africa. Trajan also builds a triumphal arch.' },
  { year: '193 CE', label: 'Septimius Severus — an African emperor', era: 'Peak (117–235 CE)', color: C.tripolitania,
    detail: 'Lucius Septimius Severus, born in Leptis Magna, becomes Roman Emperor. He grants Leptis the jus Italicum (tax immunity), builds a magnificent new forum (305×183m), colonnaded street, harbour, and basilica. Leptis becomes the 3rd most important city in Africa after Carthage and Alexandria.' },
  { year: '~155–240 CE', label: 'Apuleius, Tertullian, Cyprian', era: 'Peak (117–235 CE)', color: C.proconsularis,
    detail: 'Africa produces some of Rome\'s greatest intellectuals. Apuleius writes The Golden Ass in Carthage (~170 CE) — the only complete Latin novel to survive. Tertullian (~200 CE) and Cyprian (~250 CE) shape early Christian theology in Carthage. Africa is Christianity\'s intellectual engine.' },
  { year: '238 CE', label: 'El Djem amphitheatre built; Legio III disbanded', era: 'Crisis (235–285 CE)', color: C.proconsularis,
    detail: 'The amphitheatre at Thysdrus (El Djem) — 35,000 capacity, 3rd largest in the Roman world — is completed around this time. In the same year, Legio III Augusta is disbanded by Gordian III. Africa loses its only legion. The Limes Tripolitanus defence falls to local landholders.' },
  { year: '285 CE', label: 'Rome withdraws garrison from Volubilis', era: 'Crisis (235–285 CE)', color: C.tingitana,
    detail: 'Diocletian pulls the garrison from Volubilis and other inland cities of Mauretania Tingitana to relieve pressure elsewhere. Rome\'s westernmost African province shrinks to a few coastal cities. Volubilis continues as a Romanised Berber city for centuries.' },
  { year: '~293 CE', label: 'Diocletian\'s reforms — six African provinces', era: 'Late Empire (285–429 CE)', color: C.rome,
    detail: 'Diocletian reorganises Africa into the Diocese of Africa: Africa Zeugitana (old Proconsularis), Byzacena, Tripolitania, Numidia, Mauretania Sitifensis (split from Caesariensis), and Mauretania Caesariensis. Tingitana is transferred to the Diocese of Spain.' },
  { year: '354 CE', label: 'Augustine born in Thagaste', era: 'Late Empire (285–429 CE)', color: C.numidia,
    detail: 'Aurelius Augustinus is born in Thagaste (Souk Ahras, Algeria) to a Berber-Roman family. He will become Bishop of Hippo Regius (Annaba) in 396 and write the Confessions and City of God — arguably the two most influential Christian texts ever written. He dies during the Vandal siege of Hippo in 430.' },
  { year: '363–365 CE', label: 'Austuriani devastate Tripolitania', era: 'Late Empire (285–429 CE)', color: C.berber,
    detail: 'Berber Austuriani tribesmen raid Leptis Magna and the Tripolitanian coast. The city survives behind its walls but never recovers its former prosperity. The frontier is crumbling.' },
  { year: '429 CE', label: 'Vandals cross from Spain', era: 'Vandal Kingdom (429–534 CE)', color: C.vandal,
    detail: 'Gaiseric leads 80,000 Vandals (including women and children) across the Strait of Gibraltar from Spain into North Africa. They advance rapidly eastward along the coast, capturing city after city.' },
  { year: '430 CE', label: 'Siege of Hippo Regius — Augustine dies', era: 'Vandal Kingdom (429–534 CE)', color: C.vandal,
    detail: 'The Vandals besiege Hippo Regius for 14 months. Augustine of Hippo dies during the siege, aged 75. His library is one of the few things to survive the sack. The greatest mind of late antiquity dies as Roman Africa collapses around him.' },
  { year: '439 CE', label: 'Vandals take Carthage', era: 'Vandal Kingdom (429–534 CE)', color: C.vandal,
    detail: 'Gaiseric captures Carthage — capital of Roman Africa for 585 years. He makes it the Vandal capital. In 455 he sails from Carthage to sack Rome itself. The Vandal kingdom controls Proconsularis, Byzacena, most of Numidia, and Tripolitania. The Mauretanias are left to local Berber rulers.' },
  { year: '533 CE', label: 'Belisarius reconquers Africa', era: 'Byzantine (534–698 CE)', color: C.byzantine,
    detail: 'Emperor Justinian sends general Belisarius with 15,000 men to retake Africa. He defeats the Vandals in two battles and enters Carthage. Tripolitania, Byzacena, Proconsularis, and parts of Numidia are restored to Roman (Byzantine) rule. Mauretania Tingitana and much of Caesariensis remain under Berber control.' },
  { year: '534 CE', label: 'Prefecture of Africa established', era: 'Byzantine (534–698 CE)', color: C.byzantine,
    detail: 'Justinian creates the Praetorian Prefecture of Africa, reuniting the recovered provinces under a prefect at Carthage. Leptis Magna becomes a provincial capital again. But Berber rebellions continue — the frontier is never fully secured.' },
  { year: '~591 CE', label: 'Exarchate of Africa', era: 'Byzantine (534–698 CE)', color: C.byzantine,
    detail: 'Byzantium creates the Exarchate of Africa — combining civil and military authority under an exarch at Carthage. It is the last Roman administrative structure in Africa. It will endure just over a century.' },
  { year: '647 CE', label: 'First Arab raids into Africa', era: 'End (647–698 CE)', color: C.berber,
    detail: 'Arab armies from Egypt raid Byzantine Tripolitania. The Exarchate\'s eastern frontier begins to disintegrate. Berber resistance complicates both Arab and Byzantine positions.' },
  { year: '698 CE', label: 'Fall of Carthage — end of Roman Africa', era: 'End (647–698 CE)', color: C.berber,
    detail: 'Arab forces under Hassan ibn al-Nu\'man capture Carthage. The Exarchate of Africa ceases to exist. After 844 years — from 146 BCE to 698 CE — Roman rule in Africa ends. The Berber queen Dihya (Kahina) resists for a few more years before falling in battle ~703 CE.' },
]

const ERA_COLORS: Record<string, string> = {
  'Punic Prelude': C.proconsularis, 'Republic (146–27 BCE)': C.rome,
  'Early Empire (27 BCE–117 CE)': C.tingitana, 'Peak (117–235 CE)': C.tripolitania,
  'Crisis (235–285 CE)': C.numidia, 'Late Empire (285–429 CE)': C.rome,
  'Vandal Kingdom (429–534 CE)': C.vandal, 'Byzantine (534–698 CE)': C.byzantine,
  'End (647–698 CE)': C.berber,
}

// ═══ MAP ═══
function AfricaMap({ hoveredProvince, onHover }: { hoveredProvince: string | null; onHover: (n: string | null) => void }) {
  return (
    <svg viewBox="0 0 600 220" className="w-full">
      {/* Sea */}
      <rect width="600" height="220" fill={C.sea} opacity="0.06" />

      {/* Mediterranean label */}
      <text x="300" y="30" textAnchor="middle" className="font-mono" style={{ fontSize: 9, fill: C.sea, fontStyle: 'italic' }}>Mare Nostrum (Mediterranean Sea)</text>

      {/* Coastline */}
      <path d="M10,145 Q30,120 60,125 Q90,100 130,90 Q170,80 200,85 Q240,75 280,70 Q320,60 360,55 Q390,58 410,65 Q440,55 470,65 Q500,70 530,75 Q560,85 590,90"
        fill="none" stroke={C.ink} strokeWidth="1" opacity="0.4" />

      {/* Province territories (simplified bands) */}
      {PROVINCES.map(p => {
        const isHovered = hoveredProvince === p.name
        const w = p.x2 - p.x1
        return (
          <g key={p.name} onMouseEnter={() => onHover(p.name)} onMouseLeave={() => onHover(null)} className="cursor-pointer">
            <rect x={p.x1} y={p.y - 30} width={w} height={80} rx="2"
              fill={p.color} opacity={isHovered ? 0.25 : hoveredProvince ? 0.06 : 0.12}
              style={{ transition: 'opacity 0.3s' }} />
            <rect x={p.x1} y={p.y - 30} width={w} height={80} rx="2"
              fill="none" stroke={p.color} strokeWidth={isHovered ? 1.5 : 0.5}
              opacity={isHovered ? 0.8 : 0.3} />
            <text x={p.x1 + w / 2} y={p.y + 55} textAnchor="middle" className="font-mono"
              style={{ fontSize: w > 80 ? 7 : 5.5, fill: p.color, fontWeight: isHovered ? 700 : 400,
                transition: 'fill 0.3s' }}>
              {p.name.replace('Mauretania ', 'M. ')}
            </text>
          </g>
        )
      })}

      {/* City dots */}
      {SITES.map(s => (
        <g key={s.name}>
          <circle cx={s.x} cy={s.y} r={s.unesco ? 3.5 : 2.5} fill={s.color} opacity="0.7" />
          <text x={s.x} y={s.y - 6} textAnchor="middle" className="font-mono"
            style={{ fontSize: 5.5, fill: s.color, fontWeight: s.unesco ? 700 : 400 }}>
            {s.name}
          </text>
        </g>
      ))}

      {/* Scale reference */}
      <line x1="20" y1="200" x2="80" y2="200" stroke={C.muted} strokeWidth="0.5" />
      <text x="50" y="210" textAnchor="middle" className="font-mono" style={{ fontSize: 6, fill: C.muted }}>~500 km</text>

      {/* Sahara label */}
      <text x="300" y="195" textAnchor="middle" className="font-mono" style={{ fontSize: 8, fill: C.land, fontStyle: 'italic', fontWeight: 700 }}>S A H A R A</text>
    </svg>
  )
}

// ═══ TIMELINE CARD ═══
function TCard({ event, index }: { event: Event; index: number }) {
  const [exp, setExp] = useState(false)
  const r = useReveal(0.1)
  const isL = index % 2 === 0
  return (
    <div ref={r.ref} className="relative grid gap-4 mb-1 transition-all duration-700"
      style={{ gridTemplateColumns: 'minmax(0,1fr) 40px minmax(0,1fr)', opacity: r.vis ? 1 : 0, transform: r.vis ? 'translateY(0)' : 'translateY(16px)' }}>
      <div className={`flex ${isL ? 'justify-end' : ''}`}>
        {isL ? <CB e={event} exp={exp} tog={() => setExp(!exp)} a="right" /> :
          <div className="flex items-start justify-end pt-1"><span className="font-mono text-[11px] font-bold text-right" style={{ color: event.color }}>{event.year}</span></div>}
      </div>
      <div className="flex flex-col items-center">
        <div className="w-px flex-1" style={{ background: `${event.color}30` }} />
        <div className="w-3 h-3 rounded-full border-2 shrink-0 my-0.5" style={{ borderColor: event.color, background: exp ? event.color : 'white' }} />
        <div className="w-px flex-1" style={{ background: `${event.color}30` }} />
      </div>
      <div className={`flex ${!isL ? 'justify-start' : ''}`}>
        {!isL ? <CB e={event} exp={exp} tog={() => setExp(!exp)} a="left" /> :
          <div className="flex items-start pt-1"><span className="font-mono text-[11px] font-bold" style={{ color: event.color }}>{event.year}</span></div>}
      </div>
    </div>
  )
}

function CB({ e, exp, tog, a }: { e: Event; exp: boolean; tog: () => void; a: 'left'|'right' }) {
  return (
    <div className={`max-w-[380px] cursor-pointer group ${a === 'right' ? 'text-right' : 'text-left'}`} onClick={tog}>
      <p className="font-mono text-[11px] font-bold mb-0.5" style={{ color: e.color }}>{e.year}</p>
      <p className="font-mono text-[12px] font-bold leading-[1.3] group-hover:underline mb-1" style={{ color: C.ink }}>{e.label}</p>
      <p className="font-mono text-[9px] uppercase tracking-[0.1em] mb-1" style={{ color: C.muted }}>{e.era}</p>
      {exp && <p className="text-[11px] leading-[1.65] mt-2" style={{ color: C.text, textAlign: 'left' }}>{e.detail}</p>}
    </div>
  )
}

// ═══ PAGE ═══
export function RomaAfricanaContent() {
  const heroR = useReveal(); const numsR = useReveal(); const mapR = useReveal()
  const provR = useReveal(); const siteR = useReveal()
  const [hovProv, setHovProv] = useState<string | null>(null)

  const eras: { name: string; color: string }[] = []
  let lastEra = ''
  EVENTS.forEach(e => { if (e.era !== lastEra) { eras.push({ name: e.era, color: ERA_COLORS[e.era] || C.muted }); lastEra = e.era } })

  const hovProvData = hovProv ? PROVINCES.find(p => p.name === hovProv) : null

  return (
    <div className="min-h-screen bg-white" style={{ color: C.ink }}>
      <section className="px-8 md:px-[8%] lg:px-[12%] pt-36 pb-16">
        <p className="font-mono text-[10px] uppercase tracking-[0.12em] mb-3" style={{ color: C.muted }}>History · From Tangier to Cyrene</p>
        <div ref={heroR.ref}>
          <h1 className="font-serif text-[clamp(2.5rem,7vw,4.5rem)] leading-[0.88] tracking-[-0.02em] mb-3 transition-all duration-1000"
            style={{ opacity: heroR.vis ? 1 : 0, transform: heroR.vis ? 'translateY(0)' : 'translateY(20px)' }}>
            <em>Roma Africana</em></h1>
          <p className="font-serif italic text-[clamp(1rem,2.5vw,1.4rem)] leading-[1.3]" style={{ color: C.muted }}>
            844 years. Six provinces. 3,000 kilometres of coastline. From Volubilis in Morocco to Cyrene in Libya — the Roman empire in Africa.</p>
        </div>
        <p className="text-[13px] max-w-[560px] leading-[1.7] mt-6" style={{ color: C.text }}>
          Rome&apos;s presence in Africa lasted longer than any European colonial project by a factor
          of ten. From the destruction of <span className="underline underline-offset-2">Carthage</span> in 146 BCE to the Arab conquest of 698 CE,
          Roman rule shaped the entire North African coast. At its peak, the region had over 3
          million inhabitants in 500+ cities, produced a million tonnes of grain annually, and
          gave Rome an emperor (Septimius Severus), its greatest theologian (Augustine), and its
          only surviving complete novel (Apuleius&apos; <em>Golden Ass</em>). The provinces stretched
          from the <span className="underline underline-offset-2">Atlantic coast</span> of Morocco to the Greek cities of eastern Libya — a distance
          roughly equal to London to Baghdad.
        </p>
        <div ref={numsR.ref} className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-10">
          {[
            { v: '844', u: 'years', l: '146 BCE – 698 CE', c: C.rome },
            { v: '6', u: 'provinces', l: 'Tangier to Cyrene', c: C.tripolitania },
            { v: '3M+', u: '', l: 'inhabitants at peak', c: C.proconsularis },
            { v: '1M', u: 'tonnes', l: 'grain exported annually', c: C.numidia },
          ].map((n, i) => (
            <div key={n.l} className="transition-all duration-700" style={{ opacity: numsR.vis ? 1 : 0, transitionDelay: `${i * 120}ms` }}>
              <p className="font-mono leading-none" style={{ color: n.c }}>
                <span className="text-[28px] font-bold">{n.v}</span>
                {n.u && <span className="text-[13px] ml-1">{n.u}</span>}
              </p>
              <p className="font-mono text-[10px] mt-1" style={{ color: C.muted }}>{n.l}</p>
            </div>
          ))}
        </div>
      </section>

      {/* MAP */}
      <section className="px-8 md:px-[8%] lg:px-[12%] py-8">
        <div ref={mapR.ref} className="border-t pt-6" style={{ borderColor: C.border }}>
          <p className="font-mono text-[10px] uppercase tracking-[0.12em] mb-1" style={{ color: C.rome }}>The Six Provinces</p>
          <p className="font-mono text-[11px] mb-4" style={{ color: C.muted }}>
            Hover a province to see its details. UNESCO World Heritage sites in bold. From Morocco (left) to Libya (right).
          </p>
          <AfricaMap hoveredProvince={hovProv} onHover={setHovProv} />

          {/* Province legend */}
          <div className="flex flex-wrap gap-2 mt-3">
            {PROVINCES.map(p => (
              <button key={p.name}
                onMouseEnter={() => setHovProv(p.name)} onMouseLeave={() => setHovProv(null)}
                className="flex items-center gap-1 font-mono text-[9px] px-2 py-0.5 rounded-full border transition-all"
                style={{ borderColor: hovProv === p.name ? p.color : `${C.border}80`, color: hovProv === p.name ? p.color : C.muted,
                  fontWeight: hovProv === p.name ? 700 : 400 }}>
                <span className="w-2 h-2 rounded-full" style={{ background: p.color }} />
                {p.name}
              </button>
            ))}
          </div>

          {/* Hovered province detail */}
          {hovProvData && (
            <div className="mt-3 p-3 rounded-sm transition-all" style={{ background: `${hovProvData.color}06`, border: `1px solid ${hovProvData.color}20` }}>
              <p className="font-mono text-[12px] font-bold" style={{ color: hovProvData.color }}>{hovProvData.name}</p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mt-1">
                <div><p className="font-mono text-[8px] uppercase" style={{ color: C.muted }}>Modern</p><p className="font-mono text-[10px]">{hovProvData.modern}</p></div>
                <div><p className="font-mono text-[8px] uppercase" style={{ color: C.muted }}>Capital</p><p className="font-mono text-[10px]">{hovProvData.capital} ({hovProvData.capitalModern})</p></div>
                <div><p className="font-mono text-[8px] uppercase" style={{ color: C.muted }}>Established</p><p className="font-mono text-[10px]">{hovProvData.established}</p></div>
                <div><p className="font-mono text-[8px] uppercase" style={{ color: C.muted }}>Area</p><p className="font-mono text-[10px]">{hovProvData.area}</p></div>
              </div>
              <p className="text-[11px] leading-[1.6] mt-2" style={{ color: C.text }}>{hovProvData.notes}</p>
            </div>
          )}
        </div>
      </section>

      {/* PROVINCES TABLE */}
      <section className="px-8 md:px-[8%] lg:px-[12%] py-8">
        <div ref={provR.ref} className="border-t pt-6" style={{ borderColor: C.border }}>
          <p className="font-mono text-[10px] uppercase tracking-[0.12em] mb-3" style={{ color: C.muted }}>Province Data</p>
          <div className="space-y-2">
            {PROVINCES.map((p, i) => (
              <div key={p.name} className="flex items-center gap-3 transition-all duration-500"
                style={{ opacity: provR.vis ? 1 : 0, transitionDelay: `${i * 60}ms` }}>
                <span className="w-2 h-2 rounded-full shrink-0" style={{ background: p.color }} />
                <span className="font-mono text-[10px] w-48 shrink-0 font-bold truncate" style={{ color: p.color }}>{p.name}</span>
                <span className="font-mono text-[9px] w-40 shrink-0" style={{ color: C.muted }}>{p.modern}</span>
                <span className="font-mono text-[9px] flex-1 truncate" style={{ color: C.text }}>{p.capital} → {p.capitalModern}</span>
                <span className="font-mono text-[9px] w-20 text-right shrink-0" style={{ color: p.color }}>{p.area}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* UNESCO / KEY SITES */}
      <section className="px-8 md:px-[8%] lg:px-[12%] py-8">
        <div ref={siteR.ref} className="border-t pt-6" style={{ borderColor: C.border }}>
          <p className="font-mono text-[10px] uppercase tracking-[0.12em] mb-3" style={{ color: C.rome }}>Major Sites & Ruins</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {SITES.map((s, i) => (
              <div key={s.name} className="p-3 rounded-sm transition-all duration-500"
                style={{ background: `${s.color}05`, border: `1px solid ${C.border}`,
                  opacity: siteR.vis ? 1 : 0, transitionDelay: `${i * 40}ms` }}>
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-mono text-[12px] font-bold" style={{ color: s.color }}>{s.name}</span>
                  {s.unesco && <span className="font-mono text-[8px] px-1 rounded-sm" style={{ background: `${s.color}15`, color: s.color }}>UNESCO</span>}
                </div>
                <p className="font-mono text-[9px]" style={{ color: C.muted }}>{s.modern}, {s.country} · {s.province} · {s.founded}</p>
                <p className="text-[11px] leading-[1.5] mt-1" style={{ color: C.text }}>{s.highlight}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TIMELINE */}
      <section className="max-w-[900px] mx-auto px-4 md:px-10 py-8">
        <div className="border-t pt-6" style={{ borderColor: C.border }}>
          <p className="font-mono text-[10px] uppercase tracking-[0.12em] mb-4" style={{ color: C.muted }}>Timeline · Click to expand</p>
          <div className="flex flex-wrap gap-2 mb-6">
            {eras.map(e => (
              <span key={e.name} className="flex items-center gap-1 font-mono text-[9px]" style={{ color: e.color }}>
                <span className="w-2 h-2 rounded-full" style={{ background: e.color }} /> {e.name}
              </span>
            ))}
          </div>
          {EVENTS.map((event, i) => {
            const isNew = i === 0 || event.era !== EVENTS[i - 1].era
            return (
              <div key={`${event.year}-${i}`}>
                {isNew && (
                  <div className="flex items-center gap-3 my-6">
                    <div className="flex-1 h-px" style={{ background: `${ERA_COLORS[event.era] || C.muted}40` }} />
                    <span className="font-mono text-[10px] uppercase tracking-[0.12em] font-bold px-2" style={{ color: ERA_COLORS[event.era] || C.muted }}>{event.era}</span>
                    <div className="flex-1 h-px" style={{ background: `${ERA_COLORS[event.era] || C.muted}40` }} />
                  </div>
                )}
                <TCard event={event} index={i} />
              </div>
            )
          })}
          <div className="flex justify-center mt-4"><div className="w-4 h-4 rounded-full" style={{ background: C.berber }} /></div>
        </div>
      </section>

      {/* READING NOTES */}
      <section className="px-8 md:px-[8%] lg:px-[12%] py-8">
        <div className="border-t pt-6" style={{ borderColor: C.border }}>
          <p className="font-mono text-[10px] uppercase tracking-[0.12em] mb-4" style={{ color: C.muted }}>Reading Notes</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.12em] mb-2" style={{ color: C.proconsularis }}>The Granary</p>
              <p className="text-[12px] leading-[1.7]" style={{ color: C.text }}>
                Africa Proconsularis and Numidia together produced an estimated one million tonnes of
                grain annually. One quarter was exported to Rome. When the Vandals captured Carthage
                in 439, they didn&apos;t just take a city — they took Rome&apos;s food supply. By the 2nd century,
                olive oil had rivalled grain as the primary export. The olive presses at Volubilis are
                still visible. Rome ate because Africa grew.
              </p>
            </div>
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.12em] mb-2" style={{ color: C.tripolitania }}>The African Emperor</p>
              <p className="text-[12px] leading-[1.7]" style={{ color: C.text }}>
                Septimius Severus spoke Latin with a Punic accent so thick his sister embarrassed him
                at court by not speaking Latin at all. He ruled the empire from 193 to 211 CE and
                turned his hometown of Leptis Magna into the third city of Africa. His forum was built
                with marble imported from Greece, Turkey, and Egypt. An African from Libya built the last
                great monuments of Rome.
              </p>
            </div>
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.12em] mb-2" style={{ color: C.numidia }}>The Two Sections</p>
              <p className="text-[12px] leading-[1.7]" style={{ color: C.text }}>
                Roman Africa was always two things: a coastal strip of Romanised cities — Carthage,
                Leptis Magna, Volubilis — and a vast interior that remained Berber. Rome controlled
                the coast with 28,000 troops and a single legion (III Augusta). The Berbers accepted
                Roman roads, baths, and olive presses but never Roman identity. When the legion was
                disbanded in 238, the interior reverted. The map shows a continuous province. The
                reality was a thin line of Latin cities on a Berber continent.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CLOSING + SOURCES */}
      <section style={{ backgroundColor: '#1f1f1f' }} className="px-8 md:px-[8%] lg:px-[12%] py-12">
        <div className="border-t pt-8 max-w-[560px]" style={{ borderColor: 'rgba(255,255,255,0.15)' }}>
          <p className="font-serif italic text-[20px] leading-[1.4]" style={{ color: C.ink }}>
            The ruins at Volubilis face the ruins at Moulay Idris across a valley in Morocco.
            Roman columns on one hillside, Islamic minarets on the other. Between them, 800
            years of occupation and 1,300 years of abandonment. The olive trees are the same
            ones. The stones were quarried from the same mountain. The only thing that changed
            was who claimed to own them.
          </p>
        </div>
        <div className="border-t mt-8 pt-4" style={{ borderColor: 'rgba(255,255,255,0.15)' }}>
          <p className="font-mono text-[10px] uppercase tracking-[0.12em] mb-2" style={{ color: 'rgba(255,255,255,0.7)' }}>Sources</p>
          <p className="text-[11px] leading-[1.6] max-w-[640px]" style={{ color: 'rgba(255,255,255,0.7)' }}>
            Africa (Roman province): Wikipedia; Encyclopaedia Britannica &ldquo;Africa — Roman territory.&rdquo;
            Mauretania: Wikipedia; Britannica. Roman Africa: Wikipedia; Oxford Reference; World History
            Edu. Province dates and boundaries: UNRV.com; Omniatlas. Volubilis: UNESCO World Heritage;
            Wikipedia; African World Heritage Sites. Timgad: UNESCO World Heritage. Dougga: UNESCO World
            Heritage. Leptis Magna: Wikipedia; Britannica; World History Encyclopedia; EBSCO Research
            Starters. Tripolitania background: Haynes, &ldquo;Cities in the Sand&rdquo; (UChicago/Penelope).
            Roman colonies data (3M pop, 500+ cities): Wikipedia &ldquo;Roman colonies in North Africa&rdquo;
            (citing Gomez). Grain production (1M tonnes, 25% exported): UNRV; Oxford Reference.
            Military strength (28,000 troops): Wikipedia &ldquo;Africa (Roman province).&rdquo; Area estimates
            are editorial approximations. Province boundaries on the SVG map are schematic, not
            precise geographic projections.
          </p>
          <p className="font-mono text-[11px] mt-4" style={{ color: C.rome }}>&copy; Slow Morocco</p>
        </div>
      </section>
    </div>
  )
}
