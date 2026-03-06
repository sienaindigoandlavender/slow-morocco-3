'use client'

import { useState, useEffect, useRef } from 'react'

// ═══════════════════════════════════════════════════
// ROME IN NORTH AFRICA
// Module 055 · Slow Morocco
// ═══════════════════════════════════════════════════

const C = {
  ink: '#0a0a0a', text: '#262626', muted: '#737373', border: '#e5e5e5',
  rome: '#8B1A1A',      // Imperial red
  gold: '#9B7B2F',
  province: '#5A3E2B',
  unesco: '#1a5c3e',
}

const MAPBOX_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_TOKEN || ''

function useReveal() {
  const ref = useRef<HTMLDivElement>(null)
  const [vis, setVis] = useState(false)
  useEffect(() => {
    const el = ref.current; if (!el) return
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVis(true); obs.disconnect() } }, { threshold: 0.08 })
    obs.observe(el); return () => obs.disconnect()
  }, [])
  return { ref, vis }
}

// ═══════════════════════════════════════════════════
// DATA — PROVINCES
// ═══════════════════════════════════════════════════

const PROVINCES = [
  { name: 'Africa Proconsularis', modern: 'Tunisia, western Libya', established: '146 BCE', capital: 'Carthage (from 44 BCE)', governor: 'Proconsul (senatorial)', exports: 'Grain, olive oil, pottery, garum', notes: 'The original and wealthiest province. Called "the granary of the empire." Produced ~1 million tons of cereals annually, a quarter exported to Rome. 180+ cities in Tunisia alone. One of only two senatorial provinces with a legion.' },
  { name: 'Numidia', modern: 'Algeria (north-east)', established: '46 BCE (as Africa Nova)', capital: 'Cirta (Constantine)', governor: 'Imperial legate', exports: 'Grain, marble, pottery, wine, wool', notes: 'Home of Legio III Augusta — the only legion permanently stationed in North Africa for four centuries. Originally the kingdom of Masinissa and Jugurtha. Timgad and Djemila are its architectural masterpieces.' },
  { name: 'Mauretania Caesariensis', modern: 'Algeria (central/western)', established: '42 CE', capital: 'Caesarea (Cherchell)', governor: 'Imperial procurator', exports: 'Olives, marble, wine, timber', notes: 'Created when Claudius annexed the client kingdom of Mauretania after the assassination of King Ptolemy (son of Juba II). The city of Tipaza, between mountains and sea, became a jewel.' },
  { name: 'Mauretania Tingitana', modern: 'Northern Morocco', established: '42 CE', capital: 'Tingis (Tangier)', governor: 'Imperial procurator', exports: 'Grain, olive oil, wild animals, garum', notes: 'Rome\'s westernmost African province. Volubilis was its most important inland city. Unusually, it was administered under the Diocese of Spain, not Africa. Rome withdrew from most of it by the late 3rd century — the earliest African province abandoned.' },
  { name: 'Cyrenaica', modern: 'Eastern Libya', established: '74 BCE', capital: 'Cyrene', governor: 'Proconsul (with Crete)', exports: 'Silphium, grain, horses', notes: 'Greek colony founded in 631 BCE, long before Rome. Famous for silphium — a now-extinct medicinal plant so valuable it appeared on coins. Combined administratively with Crete.' },
]

// ═══════════════════════════════════════════════════
// DATA — SITES
// ═══════════════════════════════════════════════════

type Site = {
  name: string; ancient: string; country: string; lat: number; lng: number
  province: string; unesco: boolean; founded: string; peak_pop?: string
  highlights: string; description: string
}

const SITES: Site[] = [
  // TUNISIA
  { name: 'Carthage', ancient: 'Carthago', country: 'Tunisia', lat: 36.853, lng: 10.322, province: 'Africa Proconsularis', unesco: true, founded: 'Refounded 44 BCE by Caesar', peak_pop: '500,000', highlights: 'Antonine Baths, Byrsa Hill, Punic Ports, amphitheatre', description: 'Capital of Roman Africa. Second-largest city in the western Empire. Seat of Christianity\'s most important African councils.' },
  { name: 'Dougga', ancient: 'Thugga', country: 'Tunisia', lat: 36.422, lng: 9.220, province: 'Africa Proconsularis', unesco: true, founded: 'Pre-Roman Numidian', highlights: 'Capitol (166 CE), theatre (3,500 seats), Licinian Baths, Libyo-Punic Mausoleum', description: 'Best-preserved Afro-Roman town in North Africa. Built over Numidian capital — streets are irregularly winding, unlike typical Roman grids. 12 temples. 25 hectares.' },
  { name: 'El Jem', ancient: 'Thysdrus', country: 'Tunisia', lat: 35.296, lng: 10.707, province: 'Africa Proconsularis', unesco: true, founded: 'Punic origin', peak_pop: '~40,000', highlights: 'Amphitheatre (35,000 capacity) — largest in Africa, 3rd in Roman world', description: 'The amphitheatre is freestanding (not built into a hillside), like the Colosseum. Built c. 238 CE. Now hosts the annual El Jem International Symphonic Music Festival.' },
  { name: 'Sbeitla', ancient: 'Sufetula', country: 'Tunisia', lat: 35.228, lng: 8.112, province: 'Africa Proconsularis', unesco: false, founded: '1st century CE', highlights: 'Capitoleum (three separate temples to Jupiter, Juno, Minerva), forum, triumphal arch', description: 'Unique triple-temple Capitoleum — most Roman towns had a single building for the triad. Golden-pink stone. Site of the last stand of Byzantine prefect Gregory against the Arab invasion in 647 CE.' },
  { name: 'Bulla Regia', ancient: 'Bulla Regia', country: 'Tunisia', lat: 36.559, lng: 8.756, province: 'Africa Proconsularis', unesco: false, founded: 'Numidian, then Roman', highlights: 'Underground villas with mosaics — built below ground to escape summer heat', description: 'The only known Roman city where wealthy residents built elaborate subterranean houses. The underground rooms retain stunning mosaic floors and frescoed walls.' },
  // ALGERIA
  { name: 'Timgad', ancient: 'Thamugadi', country: 'Algeria', lat: 35.485, lng: 6.468, province: 'Numidia', unesco: true, founded: '100 CE by Trajan', peak_pop: '~15,000', highlights: 'Perfect grid plan, Trajan\'s Arch, library, forum, theatre', description: '"Pompeii of Africa." Founded for retired legionaries of Legio III Augusta. The most perfect surviving example of Roman grid planning. Public library is one of the few surviving from antiquity.' },
  { name: 'Djemila', ancient: 'Cuicul', country: 'Algeria', lat: 36.321, lng: 5.737, province: 'Numidia', unesco: true, founded: '1st century CE', highlights: 'Arch of Caracalla, Temple of the Severans, Christian Quarter with baptistery, mosaics', description: 'At 900m altitude, adapted Roman urban planning to a mountain spur. Two forums (old and Severan). Christian Quarter with two basilicas shows the transition from pagan to Christian city.' },
  { name: 'Tipaza', ancient: 'Tipasa', country: 'Algeria', lat: 36.589, lng: 2.449, province: 'Mauretania Caesariensis', unesco: true, founded: 'Punic origin, Roman colony under Claudius', highlights: 'Basilica, nymphaeum, theatre, amphitheatre, royal Mauritanian mausoleum', description: 'Between mountains and sea. Camus wrote of Tipaza: "In the spring, Tipaza is inhabited by gods and the gods speak in the sun and the scent of absinthe leaves." Punic, Roman, Christian, and Byzantine layers.' },
  { name: 'Cherchell', ancient: 'Caesarea', country: 'Algeria', lat: 36.606, lng: 2.193, province: 'Mauretania Caesariensis', unesco: false, founded: 'Juba II\'s capital, Roman from 42 CE', peak_pop: '~30,000', highlights: 'Museum with statues (Juba II collection), harbour, forum', description: 'Capital of Mauretania Caesariensis. Under Juba II it was a centre of Hellenistic culture — the king married Cleopatra Selene (daughter of Cleopatra VII and Mark Antony). His art collection survives in the museum.' },
  { name: 'Lambaesis', ancient: 'Lambaesis', country: 'Algeria', lat: 35.488, lng: 6.255, province: 'Numidia', unesco: false, founded: '81 CE (legionary camp)', highlights: 'Legionary fortress of Legio III Augusta, praetorium, temple of Aesculapius', description: 'Headquarters of the only permanent Roman legion in Africa. The praetorium (commander\'s residence) and a temple of Aesculapius are well preserved. The legion protected the frontier for 400+ years.' },
  // MOROCCO
  { name: 'Volubilis', ancient: 'Volubilis', country: 'Morocco', lat: 34.073, lng: -5.554, province: 'Mauretania Tingitana', unesco: true, founded: '3rd century BCE (Numidian)', peak_pop: '~20,000', highlights: 'Triumphal Arch of Caracalla, Basilica, Capitol, in-situ mosaics (Orpheus, Labours of Hercules)', description: 'Rome\'s most important city in Morocco. Capital of client-king Juba II. Mosaics still in their original villa locations — rare anywhere in the Roman world. Abandoned by Rome c. 285 CE. Later briefly capital of Idrisid dynasty.' },
  { name: 'Lixus', ancient: 'Lixus', country: 'Morocco', lat: 35.200, lng: -6.112, province: 'Mauretania Tingitana', unesco: false, founded: 'Phoenician (c. 8th century BCE)', highlights: 'Garum factory, amphitheatre, mosaic of Neptune, acropolis', description: 'Ancient Phoenician trading post on the Loukkos River near Larache. Massive garum (fish sauce) production facility. The amphitheatre overlooking the river is one of the most atmospheric in North Africa.' },
  { name: 'Banasa', ancient: 'Colonia Iulia Valentia Banasa', country: 'Morocco', lat: 34.602, lng: -6.131, province: 'Mauretania Tingitana', unesco: false, founded: 'Pre-Roman, colony under Augustus', highlights: 'Tabula Banasitana (bronze inscription), forum, baths', description: 'The Tabula Banasitana (found here) is one of the most important Roman legal documents — it records the granting of Roman citizenship to a Berber chief and his family, showing how Romanisation worked in practice.' },
  { name: 'Tangier', ancient: 'Tingis', country: 'Morocco', lat: 35.759, lng: -5.834, province: 'Mauretania Tingitana', unesco: false, founded: 'Phoenician, Roman from 38 BCE', highlights: 'Provincial capital, Pillars of Hercules', description: 'Capital of Mauretania Tingitana. Mythologically linked to Hercules and Antaeus. Granted colonial status by Claudius. Uniquely administered under the Diocese of Spain, not Africa.' },
  // LIBYA
  { name: 'Leptis Magna', ancient: 'Lepcis Magna', country: 'Libya', lat: 32.638, lng: 14.289, province: 'Africa Proconsularis', unesco: true, founded: 'Phoenician (7th century BCE)', peak_pop: '~100,000', highlights: 'Severan Forum, Arch of Septimius Severus, theatre, Hunting Baths, harbour, 12-mile aqueduct', description: 'The greatest Roman city in Africa. Birthplace of Emperor Septimius Severus (r. 193–211 CE), who lavished it with monuments. Buried by sand for centuries, now exceptionally preserved. Caesar imposed 3 million pounds of olive oil as annual tax.' },
  { name: 'Sabratha', ancient: 'Sabratha', country: 'Libya', lat: 32.805, lng: 12.484, province: 'Africa Proconsularis', unesco: true, founded: 'Phoenician', highlights: 'Theatre (three-storey columned backdrop, intact seating), forum, temples, Punic mausoleum', description: 'The theatre is one of the most complete and beautiful in the Roman world — three stories of columns in pink local stone against the Mediterranean. One of two Punic mausoleums surviving in North Africa (the other at Dougga).' },
  { name: 'Cyrene', ancient: 'Cyrene', country: 'Libya', lat: 32.824, lng: 21.857, province: 'Cyrenaica', unesco: true, founded: '631 BCE (Greek colony)', highlights: 'Temple of Zeus, agora, theatre, Sanctuary of Apollo, necropolis', description: 'Greek colony older than Rome itself. Temple of Zeus was larger than the Parthenon. Famous for silphium — a medicinal plant so valuable it\'s depicted on coins, now extinct. Birthplace of the philosopher Eratosthenes.' },
]

// Key figures
const FIGURES = [
  { name: 'Septimius Severus', dates: '145–211 CE', origin: 'Leptis Magna, Libya', role: 'Roman Emperor (193–211)', note: 'First African-born emperor. Spoke Latin with a Punic accent. Lavished his hometown with some of the grandest buildings in the Roman world. Founded a dynasty. His wife Julia Domna was from Syria — the empire was ruled from its periphery.' },
  { name: 'Juba II', dates: '48 BCE – 23 CE', origin: 'Numidia → Caesarea (Cherchell)', role: 'Client King of Mauretania', note: 'Raised in Rome after his father\'s defeat. Married Cleopatra Selene (daughter of Cleopatra VII and Mark Antony). Made Caesarea a centre of Hellenistic learning. Wrote encyclopaedic works on geography, art, and natural history — all lost.' },
  { name: 'Augustine of Hippo', dates: '354–430 CE', origin: 'Thagaste (Souk Ahras, Algeria)', role: 'Bishop, theologian', note: 'The most influential Christian thinker after Saint Paul. Berber by heritage. Studied in Carthage. Wrote the Confessions and City of God. His theology shaped Western Christianity for 1,500 years. His mother Monica is also a saint.' },
  { name: 'Apuleius', dates: 'c. 124–170 CE', origin: 'Madauros (M\'Daourouch, Algeria)', role: 'Author', note: 'Wrote The Golden Ass — the only Latin novel to survive complete. A Berber who studied in Carthage and Athens. His trial for witchcraft (Apologia) is one of the most entertaining Roman legal texts.' },
  { name: 'Masinissa', dates: 'c. 238–148 BCE', origin: 'Numidia', role: 'King of Numidia', note: 'Allied with Rome against Carthage in the Second Punic War. Unified Numidia into a prosperous kingdom. His descendants\' infighting gave Rome the pretext to annex the territory. Lived to 90, reportedly still leading cavalry charges.' },
]

// ═══════════════════════════════════════════════════
// TIMELINE
// ═══════════════════════════════════════════════════

const TIMELINE = [
  { year: '146 BCE', title: 'Rome destroys Carthage', detail: 'Africa becomes Rome\'s first African province. Utica is made capital. Most land becomes ager publicus (state land). Masinissa\'s Numidia remains a client kingdom.', color: C.rome, major: true },
  { year: '112–105 BCE', title: 'Jugurthine War', detail: 'Rome fights Jugurtha, Numidian king. Sallust\'s account becomes a classic of Roman historiography. The war exposes Roman political corruption and ends with Jugurtha\'s capture by Sulla.', color: C.rome },
  { year: '46 BCE', title: 'Caesar creates Africa Nova', detail: 'After defeating Pompey\'s allies at Thapsus, Caesar annexes Numidian territory. Juba I of Numidia commits suicide. Caesar levies 3 million pounds of olive oil annually from Leptis Magna.', color: C.rome, major: true },
  { year: '44 BCE', title: 'Caesar refounds Carthage', detail: 'Colonia Julia Concordia Carthago. Augustus completes the project. Carthage becomes capital of Africa Proconsularis — the administrative centre of Rome\'s wealthiest African territory.', color: C.rome },
  { year: '25 BCE', title: 'Juba II installed as client king', detail: 'Augustus installs Juba II as client King of Mauretania. Raised in Rome, married to Cleopatra\'s daughter, Juba transforms Caesarea (Cherchell) into a Hellenistic cultural capital.', color: C.rome },
  { year: '42 CE', title: 'Claudius annexes Mauretania', detail: 'After the assassination of Juba II\'s son Ptolemy (allegedly for wearing a fine purple cloak that offended Caligula), Claudius creates Mauretania Caesariensis and Mauretania Tingitana.', color: C.rome, major: true },
  { year: '100 CE', title: 'Trajan founds Timgad', detail: 'Thamugadi built as a colony for retired veterans of Legio III Augusta. Perfect grid plan. Library, forum, theatre, baths. The "Pompeii of Africa" — later buried by Saharan sand for centuries.', color: C.rome, major: true },
  { year: '2nd century CE', title: 'Golden age of Roman Africa', detail: 'Peak urbanisation and prosperity. 180+ cities in Tunisia alone. Africa produces 1 million tons of grain annually (a quarter exported). Olive oil rivals cereals. The Antonine Baths at Carthage are the third-largest in the Roman world.', color: C.gold, major: true },
  { year: '193 CE', title: 'Septimius Severus becomes emperor', detail: 'A native of Leptis Magna becomes Rome\'s first African-born emperor. He speaks Latin with a Punic accent. He pours money into Leptis — the Severan Forum, the Basilica, the colonnaded street. Africa reaches its peak prestige.', color: C.rome, major: true },
  { year: 'c. 238 CE', title: 'El Jem amphitheatre built', detail: 'The third-largest amphitheatre in the Roman world rises at Thysdrus (El Jem). Capacity: 35,000. Freestanding, like the Colosseum. A statement of wealth: a provincial town builds on an imperial scale.', color: C.rome },
  { year: '3rd century', title: 'Crisis and contraction', detail: 'Rome withdraws from most of Mauretania Tingitana (Morocco) by c. 285 CE — the earliest African province abandoned. Political instability across the empire. Volubilis continues as a Latin-speaking city under local rule.', color: C.province },
  { year: '312–430 CE', title: 'Christian North Africa', detail: 'Donatist controversy splits the African Church. Augustine of Hippo (354–430) becomes the most influential voice. Council of Carthage (397) confirms Biblical canon. North Africa is Christianity\'s intellectual engine.', color: C.province, major: true },
  { year: '429 CE', title: 'Vandals cross to Africa', detail: 'Gaiseric leads 80,000 Vandals from Spain into Africa. By 439 they take Carthage. The Vandal Kingdom controls Rome\'s former breadbasket, raids Mediterranean shipping, and sacks Rome itself in 455.', color: C.province, major: true },
  { year: '533–534 CE', title: 'Belisarius reconquers', detail: 'Byzantine general Belisarius defeats the Vandals. Carthage becomes capital of the Praetorian Prefecture of Africa. Byzantine rule restores Roman administration but faces constant Berber resistance.', color: C.province },
  { year: '647–698 CE', title: 'Arab conquest ends Roman Africa', detail: 'The first Arab raid defeats Byzantine prefect Gregory at Sbeitla (647). By 698, Carthage falls for the last time. The population moves to Tunis. Eight centuries of Roman civilisation in Africa come to an end.', color: C.province, major: true },
]

// ═══════════════════════════════════════════════════
// MAP COMPONENT
// ═══════════════════════════════════════════════════

function RomanMap() {
  const mapContainer = useRef<HTMLDivElement>(null)
  const mapRef = useRef<any>(null)

  useEffect(() => {
    if (!mapContainer.current || mapRef.current || !MAPBOX_TOKEN) return
    import('mapbox-gl').then((mapboxgl) => {
      if (!document.querySelector('link[href*="mapbox-gl"]')) {
        const link = document.createElement('link'); link.rel = 'stylesheet'
        link.href = 'https://api.mapbox.com/mapbox-gl-js/v3.9.0/mapbox-gl.css'
        document.head.appendChild(link)
      }
      mapboxgl.default.accessToken = MAPBOX_TOKEN
      const map = new mapboxgl.default.Map({
        container: mapContainer.current!, style: 'mapbox://styles/mapbox/light-v11',
        center: [6, 34.5], zoom: 4.5, minZoom: 3, maxZoom: 14,
      })
      map.addControl(new mapboxgl.default.NavigationControl({ showCompass: false }), 'top-right')
      map.on('load', () => {
        SITES.forEach(s => {
          const el = document.createElement('div')
          const size = s.unesco ? 14 : 10
          el.style.cssText = `width:${size}px;height:${size}px;border-radius:50%;background:${s.unesco ? C.rome : C.province};border:2px solid white;box-shadow:0 1px 4px rgba(0,0,0,0.3);cursor:pointer;`
          const popup = new mapboxgl.default.Popup({ offset: 12, closeButton: false, maxWidth: '300px' })
            .setHTML(`<div style="font-family:system-ui;"><strong style="font-size:13px;">${s.name}</strong> <span style="font-size:10px;color:#737373;">${s.ancient !== s.name ? '(' + s.ancient + ')' : ''}</span><br/><span style="font-size:10px;color:#737373;">${s.country} · ${s.province}${s.unesco ? ' · UNESCO' : ''}${s.peak_pop ? ' · Pop. ' + s.peak_pop : ''}</span><br/><span style="font-size:11px;margin-top:3px;display:block;">${s.highlights}</span></div>`)
          new mapboxgl.default.Marker({ element: el, anchor: 'center' }).setLngLat([s.lng, s.lat]).setPopup(popup).addTo(map)
        })
      })
      mapRef.current = map
    })
    return () => { mapRef.current?.remove(); mapRef.current = null }
  }, [])

  return (
    <div>
      <div ref={mapContainer} style={{ width: '100%', height: 460, border: `1px solid ${C.border}` }} />
      {!MAPBOX_TOKEN && <p className="text-[11px] p-3" style={{ color: C.muted }}>Map requires NEXT_PUBLIC_MAPBOX_TOKEN.</p>}
      <div className="flex gap-4 mt-2 text-[9px] font-mono" style={{ color: C.muted }}>
        <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full inline-block" style={{ background: C.rome }} /> UNESCO World Heritage</span>
        <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full inline-block" style={{ background: C.province }} /> Other sites</span>
      </div>
    </div>
  )
}

// ═══════════════════════════════════════════════════
// PAGE
// ═══════════════════════════════════════════════════

export function RomeNorthAfricaContent() {
  const heroR = useReveal()
  const [expandedIdx, setExpandedIdx] = useState<number | null>(null)

  const KEY = [
    { stat: '5', label: 'Provinces (Morocco to Libya)' },
    { stat: '180+', label: 'Cities in Tunisia alone' },
    { stat: '1M tons', label: 'Grain produced annually' },
    { stat: '28,000', label: 'Troops (1 legion + auxiliaries)' },
    { stat: '500,000', label: 'Peak population of Carthage' },
    { stat: '8 centuries', label: 'Duration of Roman rule' },
  ]

  return (
    <div className="min-h-screen bg-white" style={{ color: C.ink }}>

      {/* ═══ HERO ═══ */}
      <section className="px-8 md:px-[8%] lg:px-[12%] pt-36 pb-10">
        <p className="text-[10px] font-mono tracking-wider uppercase mb-3" style={{ color: C.muted }}>Module 055 · Archaeological Intelligence</p>
        <div ref={heroR.ref}>
          <h1 className="font-serif text-[clamp(2.5rem,7vw,5rem)] leading-[0.9] tracking-[-0.02em] mb-4 transition-all duration-1000"
            style={{ opacity: heroR.vis ? 1 : 0, transform: heroR.vis ? 'translateY(0)' : 'translateY(20px)' }}>
            <em>Rome in<br />North Africa</em>
          </h1>
          <p className="font-serif italic text-[clamp(1rem,2.5vw,1.4rem)] mb-6" style={{ color: C.muted }}>
            Five provinces. Eight centuries. The empire's breadbasket.
          </p>
          <p className="text-[15px] leading-[1.8] max-w-[620px]" style={{ color: C.text }}>
            Rome's North African provinces — stretching from Morocco's <span className="underline underline-offset-2">Atlantic coast</span> to Libya's
            Gulf of Sidra — were among the wealthiest territories in the empire. They produced a million
            tons of grain a year. They built 180 cities in Tunisia alone. They gave Rome an emperor
            (Septimius Severus, born in Leptis Magna), a theologian who shaped Western thought for
            1,500 years (Augustine, from Algeria), and the only surviving complete Latin novel (Apuleius'
            <em> Golden Ass</em>, also from Algeria). The military presence was astonishingly thin — a single
            legion and 28,000 auxiliaries controlled a territory the size of Western Europe. This was
            not occupation by force. It was integration through infrastructure: roads, aqueducts, forums,
            baths, and the promise that a <span className="underline underline-offset-2">Berber</span> farmer's grandson could become a Roman citizen, and
            his great-grandson an emperor.
          </p>
        </div>
      </section>

      {/* Key numbers */}
      <section className="px-8 md:px-[8%] lg:px-[12%] pb-10">
        <div className="grid grid-cols-3 md:grid-cols-6 gap-4">
          {KEY.map((k, i) => {
            const kR = useReveal()
            return (
              <div key={k.label} ref={kR.ref} className="border-t pt-2 transition-all duration-700"
                style={{ borderColor: C.rome, opacity: kR.vis ? 1 : 0, transitionDelay: `${i * 60}ms` }}>
                <p className="font-serif text-[clamp(0.9rem,2vw,1.3rem)] leading-none" style={{ color: C.rome }}>{k.stat}</p>
                <p className="text-[9px] font-mono mt-1" style={{ color: C.muted }}>{k.label}</p>
              </div>
            )
          })}
        </div>
      </section>

      <div className="px-8 md:px-[8%] lg:px-[12%]"><div className="border-t" style={{ borderColor: C.border }} /></div>

      {/* ═══ I. THE MAP ═══ */}
      <section className="px-8 md:px-[8%] lg:px-[12%] py-16">
        <p className="text-[10px] font-mono tracking-wider uppercase mb-2" style={{ color: C.muted }}>Section I</p>
        <h2 className="font-serif text-[clamp(1.8rem,4vw,2.8rem)] mb-2">The Cities</h2>
        <p className="text-[13px] mb-8 max-w-[540px]" style={{ color: C.muted }}>
          {SITES.length} Roman cities and sites across five modern countries. UNESCO World Heritage
          Sites are shown larger. Click any marker for detail.
        </p>
        <RomanMap />
      </section>

      <div className="px-8 md:px-[8%] lg:px-[12%]"><div className="border-t" style={{ borderColor: C.border }} /></div>

      {/* ═══ II. THE PROVINCES ═══ */}
      <section className="px-8 md:px-[8%] lg:px-[12%] py-16">
        <p className="text-[10px] font-mono tracking-wider uppercase mb-2" style={{ color: C.muted }}>Section II</p>
        <h2 className="font-serif text-[clamp(1.8rem,4vw,2.8rem)] mb-2">The Provinces</h2>
        <p className="text-[13px] mb-8 max-w-[540px]" style={{ color: C.muted }}>
          Five provinces from the Atlantic to Cyrenaica. Each governed differently — senatorial,
          imperial, or procuratorial — reflecting Rome's pragmatic approach to distant territories.
        </p>
        <div className="space-y-4">
          {PROVINCES.map((p, i) => {
            const pR = useReveal()
            return (
              <div key={p.name} ref={pR.ref} className="border-l-4 pl-5 py-3 transition-all duration-500"
                style={{ borderColor: C.rome, opacity: pR.vis ? 1 : 0, transform: pR.vis ? 'translateX(0)' : 'translateX(-8px)', transitionDelay: `${i * 60}ms` }}>
                <div className="flex flex-wrap items-baseline gap-3 mb-1">
                  <p className="font-serif text-[17px]">{p.name}</p>
                  <span className="text-[10px] font-mono" style={{ color: C.rome }}>{p.established}</span>
                </div>
                <p className="text-[10px] font-mono mb-1" style={{ color: C.muted }}>
                  Modern: {p.modern} · Capital: {p.capital} · Governor: {p.governor}
                </p>
                <p className="text-[10px] font-mono mb-2" style={{ color: C.muted }}>Exports: {p.exports}</p>
                <p className="text-[12px] leading-relaxed" style={{ color: C.text }}>{p.notes}</p>
              </div>
            )
          })}
        </div>
      </section>

      <div className="px-8 md:px-[8%] lg:px-[12%]"><div className="border-t" style={{ borderColor: C.border }} /></div>

      {/* ═══ III. TIMELINE ═══ */}
      <section className="px-8 md:px-[8%] lg:px-[12%] py-16">
        <p className="text-[10px] font-mono tracking-wider uppercase mb-2" style={{ color: C.muted }}>Section III</p>
        <h2 className="font-serif text-[clamp(1.8rem,4vw,2.8rem)] mb-2">The Timeline</h2>
        <p className="text-[13px] mb-10 max-w-[540px]" style={{ color: C.muted }}>
          From destruction to integration to abandonment. {TIMELINE.length} events across eight centuries.
        </p>
        <div className="relative ml-4 md:ml-8">
          <div className="absolute left-0 top-0 bottom-0 w-px" style={{ background: C.border }} />
          {TIMELINE.map((ev, i) => {
            const eR = useReveal()
            const isExpanded = expandedIdx === i
            return (
              <div key={i} ref={eR.ref}
                className="relative pl-8 py-2 cursor-pointer group transition-all duration-500"
                style={{ opacity: eR.vis ? 1 : 0, transform: eR.vis ? 'translateX(0)' : 'translateX(-6px)' }}
                onClick={() => setExpandedIdx(isExpanded ? null : i)}>
                <div className="absolute left-[-4px] top-3 w-[9px] h-[9px] rounded-full border-2 transition-all"
                  style={{ borderColor: ev.color, background: ev.major ? ev.color : 'white' }} />
                <div className="flex items-baseline gap-3">
                  <span className="text-[10px] font-mono shrink-0 w-[100px]" style={{ color: ev.color }}>{ev.year}</span>
                  <span className={`text-[13px] ${ev.major ? 'font-semibold' : ''} group-hover:underline`} style={{ color: ev.major ? C.ink : C.text }}>{ev.title}</span>
                </div>
                {isExpanded && (
                  <p className="text-[12px] leading-relaxed mt-2 ml-[100px] pr-4 pl-3 border-l-2" style={{ color: C.text, borderColor: ev.color }}>{ev.detail}</p>
                )}
              </div>
            )
          })}
        </div>
      </section>

      <div className="px-8 md:px-[8%] lg:px-[12%]"><div className="border-t" style={{ borderColor: C.border }} /></div>

      {/* ═══ IV. KEY FIGURES ═══ */}
      <section className="px-8 md:px-[8%] lg:px-[12%] py-16">
        <p className="text-[10px] font-mono tracking-wider uppercase mb-2" style={{ color: C.muted }}>Section IV</p>
        <h2 className="font-serif text-[clamp(1.8rem,4vw,2.8rem)] mb-2">The People</h2>
        <p className="text-[13px] mb-8 max-w-[540px]" style={{ color: C.muted }}>
          Five figures who define Roman North Africa — an emperor, a client king, a theologian,
          a novelist, and a warrior. All were North African. All changed the Mediterranean.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {FIGURES.map((f, i) => {
            const fR = useReveal()
            return (
              <div key={f.name} ref={fR.ref} className="border p-4 transition-all duration-500"
                style={{ borderColor: C.border, opacity: fR.vis ? 1 : 0, transitionDelay: `${i * 60}ms` }}>
                <p className="font-serif text-[16px] mb-0.5">{f.name}</p>
                <p className="text-[9px] font-mono mb-0.5" style={{ color: C.rome }}>{f.dates}</p>
                <p className="text-[9px] font-mono mb-2" style={{ color: C.muted }}>{f.origin} · {f.role}</p>
                <p className="text-[12px] leading-relaxed" style={{ color: C.text }}>{f.note}</p>
              </div>
            )
          })}
        </div>
      </section>

      <div className="px-8 md:px-[8%] lg:px-[12%]"><div className="border-t" style={{ borderColor: C.border }} /></div>

      {/* ═══ READING NOTES ═══ */}
      <section className="px-8 md:px-[8%] lg:px-[12%] py-16">
        <p className="text-[10px] font-mono tracking-wider uppercase mb-4" style={{ color: C.muted }}>Reading Notes</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <p className="font-serif text-[18px] mb-2">The Purple Cloak Murder</p>
            <p className="text-[13px] leading-relaxed" style={{ color: C.text }}>
              In 40 CE, the emperor Caligula invited Ptolemy — son of Juba II, grandson of Cleopatra VII
              and Mark Antony — to Rome. Ptolemy arrived wearing a fine purple cloak that reportedly
              outshone the emperor's. Caligula had him executed. Within two years, Claudius annexed
              Mauretania as two new provinces. Whether the murder was really about a cloak or about
              absorbing a strategically valuable client kingdom is debated. Either way, a descendant
              of Cleopatra died so Rome could govern Morocco.
            </p>
          </div>
          <div>
            <p className="font-serif text-[18px] mb-2">One Legion for a Continent</p>
            <p className="text-[13px] leading-relaxed" style={{ color: C.text }}>
              Rome controlled all of North Africa west of Egypt with a single legion (Legio III Augusta)
              and about 28,000 auxiliary troops. By the 2nd century, these garrisons were mostly
              recruited locally. This was not an occupation — it was a system. Roads, aqueducts,
              forums, and citizenship created buy-in. A Berber chief could petition for citizenship
              (the Tabula Banasitana proves it). His children could serve in the legion. His
              grandchildren could govern provinces. The thinnest military screen in the empire
              held the longest.
            </p>
          </div>
          <div>
            <p className="font-serif text-[18px] mb-2">Volubilis After Rome</p>
            <p className="text-[13px] leading-relaxed" style={{ color: C.text }}>
              When Rome withdrew from Morocco around 285 CE, Volubilis didn't die. Latin
              inscriptions continue into the 6th century. The city was still inhabited when
              Idris I — founder of the first <span className="underline underline-offset-2">Moroccan dynasty</span> — arrived in 788 CE. He made
              nearby Moulay Idriss his capital, but Volubilis remained occupied. The mosaics of
              Orpheus and the Labours of Hercules are still in their original villa floors —
              one of the rarest survivals anywhere in the Roman world. Rome left Morocco, but
              Morocco didn't leave Rome.
            </p>
          </div>
        </div>
      </section>

      <div className="px-8 md:px-[8%] lg:px-[12%]"><div className="border-t" style={{ borderColor: C.border }} /></div>

      {/* ═══ SOURCES ═══ */}
      <section style={{ backgroundColor: '#1f1f1f' }} className="px-8 md:px-[8%] lg:px-[12%] py-16">
        <p className="text-[10px] font-mono tracking-wider uppercase mb-4" style={{ color: 'rgba(255,255,255,0.7)' }}>Sources</p>
        <div className="text-[12px] leading-relaxed space-y-2" style={{ color: 'rgba(255,255,255,0.7)' }}>
          <p><strong>Provinces:</strong> Wikipedia, "Africa (Roman province)," "Roman colonies in North Africa," "Byzantine North Africa." Britannica, "Africa, Proconsular Roman province." UNRV.com, "Africa." Oxford Reference, "Roman Africa." Province dates and structure per standard Roman administrative history. Military: 28,000 troops (one legion plus auxiliaries), UNRV and factsanddetails.com. Grain: 1 million tons annual production, one-quarter exported — widely cited. 180 cities in Tunisia: factsanddetails.com citing standard scholarship.</p>
          <p><strong>Sites:</strong> UNESCO World Heritage listings: Carthage (1979), Dougga (1997), El Jem (1979), Timgad (1982), Djemila (1982), Tipaza (1982), Volubilis (1997), Leptis Magna (1982), Sabratha (1982), Cyrene (1982). African World Heritage Sites (africanworldheritagesites.org). Site descriptions synthesised from UNESCO, Britannica, and heritage-key.com "Top 10 Roman Sites in North Africa." Bulla Regia underground villas: widely documented. El Jem amphitheatre: 35,000 capacity, 3rd largest, freestanding.</p>
          <p><strong>Figures:</strong> Septimius Severus: first African emperor, Punic accent per Historia Augusta. Juba II: married Cleopatra Selene per Plutarch. Augustine: Confessions, "cauldron of unholy loves" (Book 3). Apuleius: The Golden Ass, only complete Latin novel. Masinissa: Livy, Polybius. Purple cloak murder: Suetonius, Life of Caligula; Cassius Dio. Tabula Banasitana: Roman citizenship grant to Berber family, archaeological find at Banasa.</p>
        </div>
        <p className="text-[11px] mt-6 pt-4 border-t" style={{ borderColor: C.border, color: 'rgba(255,255,255,0.7)' }}>
          © Slow Morocco · slowmorocco.com · Population figures are scholarly estimates with wide ranges. This visualisation may not be reproduced without visible attribution.
        </p>
      </section>
    </div>
  )
}
