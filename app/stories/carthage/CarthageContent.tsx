'use client'

import { useState, useEffect, useRef } from 'react'

// ═══════════════════════════════════════════════════
// CARTHAGE MUST BE DESTROYED
// Module 054 · Slow Morocco
// ═══════════════════════════════════════════════════

const C = {
  ink: '#0a0a0a', text: '#262626', muted: '#737373', border: '#e5e5e5',
  punic: '#6B1D2A',    // Phoenician / Punic
  roman: '#8B4513',    // Roman
  christian: '#2E5A6B', // Christian / Byzantine
  vandal: '#5A4A3A',   // Vandal
  arab: '#1a5c3e',     // Arab conquest
  modern: '#444',      // Modern
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
// TIMELINE DATA
// ═══════════════════════════════════════════════════

type TimelineEvent = {
  year: string; title: string; detail: string; era: string; color: string; major?: boolean
}

const TIMELINE: TimelineEvent[] = [
  // PHOENICIAN FOUNDATION
  { year: 'c. 814 BCE', title: 'Dido founds Carthage', detail: 'Princess Elissa (Dido) flees Tyre after her brother King Pygmalion murders her husband. She sails west and bargains with the Berber chieftain Iarbas for "as much land as an ox hide can cover." She cuts the hide into thin strips, encircles the hill of Byrsa, and founds Qart-Hadasht — "New City" in Phoenician. The name becomes Carthage.', era: 'Phoenician', color: C.punic, major: true },
  { year: 'c. 750 BCE', title: 'Archaeological founding confirmed', detail: 'Radiocarbon dating of the earliest finds at Carthage (revised in the 1990s) confirms settlement by the last quarter of the 9th century BCE, vindicating the traditional date. The earliest pottery comes from the Tophet — the sacred precinct.', era: 'Phoenician', color: C.punic },
  { year: 'c. 650 BCE', title: 'Carthage becomes independent', detail: 'Following Assyrian conquest of Phoenicia, Tyre can no longer support its colonies. Carthage emerges as the leading Phoenician city in the western Mediterranean, establishing its own magistrates (suffetes) to govern allied towns.', era: 'Punic Republic', color: C.punic },
  { year: 'c. 600 BCE', title: 'Hanno the Navigator sails to West Africa', detail: 'The Carthaginian admiral Hanno leads a fleet of 60 ships and 30,000 colonists along the Moroccan coast, founding colonies including Mogador (Essaouira). He reaches the Senegal River and possibly Mount Cameroon — the farthest documented voyage of antiquity.', era: 'Punic Republic', color: C.punic, major: true },
  { year: 'c. 550 BCE', title: 'Mago\'s agricultural treatise', detail: 'The Carthaginian writer Mago produces 28 books on agriculture — the most important agronomic work of the ancient world. The Romans later translate it into Latin and Greek. It will survive the destruction of Carthage\'s libraries, preserved by its conquerors.', era: 'Punic Republic', color: C.punic },
  { year: '480 BCE', title: 'Battle of Himera', detail: 'Carthage invades Sicily with a massive army. The Syracusan tyrant Gelon inflicts a devastating defeat at Himera. This begins two centuries of intermittent war between Carthage and the Greek city-states of Sicily — a rehearsal for the later struggle with Rome.', era: 'Punic Republic', color: C.punic },
  { year: '348 BCE', title: 'Second treaty with Rome', detail: 'Carthage and Rome sign their second treaty, defining spheres of influence. Rome acknowledges Carthage\'s dominance over the western Mediterranean. At this point, the relationship is still one of mutual respect between equals.', era: 'Punic Republic', color: C.punic },
  { year: '310 BCE', title: 'Population peaks at 400,000–500,000', detail: 'Carthage is now one of the largest cities in the ancient world. Its circular military harbour (cothon) can dock 220 warships. The commercial harbour handles trade from Iberia to Lebanon. Purple dye from murex shells is the city\'s most luxurious export.', era: 'Punic Republic', color: C.punic, major: true },
  // PUNIC WARS
  { year: '264 BCE', title: 'First Punic War begins', detail: 'Dispute over Sicily triggers the first war with Rome. Carthage is the dominant naval power; Rome has no fleet. The war will last 23 years and be decided at sea — a domain Carthage thought it owned.', era: 'Punic Wars', color: C.punic, major: true },
  { year: '241 BCE', title: 'First Punic War ends — Sicily lost', detail: 'After Rome builds a fleet from scratch and defeats Carthage at the Aegates Islands, Carthage cedes Sicily, the Lipari Islands, and pays 3,200 talents in indemnity. Sicily becomes Rome\'s first province.', era: 'Punic Wars', color: C.punic },
  { year: '237 BCE', title: 'Hamilcar Barca takes Spain', detail: 'Hamilcar Barca, Hannibal\'s father, begins building a new Carthaginian power base in Iberia. The silver mines of southern Spain fund Carthage\'s recovery. The Barcid family effectively rules Spain as a personal domain.', era: 'Punic Wars', color: C.punic },
  { year: '218 BCE', title: 'Second Punic War — Hannibal crosses the Alps', detail: 'Hannibal marches from Spain with 90,000 infantry, 12,000 cavalry, and war elephants across the Pyrenees, through Gaul, and over the Alps into Italy. It is the most audacious military campaign in ancient history. He will fight in Italy for 15 years without reinforcement.', era: 'Punic Wars', color: C.punic, major: true },
  { year: '216 BCE', title: 'Battle of Cannae', detail: 'Hannibal\'s masterpiece. Using double envelopment with inferior numbers, he destroys a Roman army of 86,000 — killing up to 70,000 in a single day. It remains one of the deadliest battles in human history and the textbook model of tactical annihilation studied at every military academy.', era: 'Punic Wars', color: C.punic, major: true },
  { year: '202 BCE', title: 'Battle of Zama — Hannibal defeated', detail: 'Scipio Africanus invades North Africa and defeats Hannibal at Zama (Naraggara). Carthage sues for peace. The treaty strips Carthage of all overseas territories, limits its navy to 10 ships, imposes 10,000 silver talents over 50 years, and forbids war without Rome\'s permission.', era: 'Punic Wars', color: C.punic, major: true },
  { year: '149 BCE', title: 'Third Punic War begins', detail: 'Cato the Elder ends every Senate speech with "Carthago delenda est" — Carthage must be destroyed. When Carthage defends itself against Numidian incursions (technically breaking the treaty), Rome launches the final war. Carthage surrenders 300 hostages and all weapons, but when Rome demands the city relocate 16 km inland — away from the sea that is its lifeblood — Carthage refuses.', era: 'Punic Wars', color: C.punic, major: true },
  { year: '146 BCE', title: 'Carthage destroyed', detail: 'After a two-year siege, Scipio Aemilianus breaks through the harbour wall. Six days of house-to-house fighting. Of a population that may have exceeded 250,000, only 50,000 survive — all sold into slavery. The city is burned, demolished, and the territory becomes the Roman province of Africa. The idea that Romans salted the earth is a 19th-century myth. But the destruction is total.', era: 'Punic Wars', color: C.punic, major: true },
  // ROMAN CARTHAGE
  { year: '122 BCE', title: 'Gaius Gracchus attempts colony', detail: 'Roman tribune Gaius Gracchus founds Colonia Junonia on the ruins of Carthage, aiming to resettle impoverished Roman farmers. The Senate abolishes the colony to undermine Gracchus. But settlers remain.', era: 'Roman', color: C.roman },
  { year: '46–44 BCE', title: 'Julius Caesar refounds Carthage', detail: 'Caesar orders Carthage rebuilt as Colonia Julia Concordia Carthago. He is assassinated before the plan is fully executed. Augustus completes it. Within five years, Carthage is chosen as capital of the province of Africa — Rome\'s breadbasket.', era: 'Roman', color: C.roman, major: true },
  { year: '1st century CE', title: 'Second-largest city in the western Empire', detail: 'Roman Carthage grows to 500,000 inhabitants — the second-largest city in the western Roman Empire after Rome itself. The province of Africa produces a quarter of the Empire\'s grain. The city boasts an amphitheatre, circus, theatre, and grand villas.', era: 'Roman', color: C.roman, major: true },
  { year: 'c. 145–162 CE', title: 'Antonine Baths constructed', detail: 'Begun under Hadrian, completed under Antoninus Pius. The third-largest Roman bath complex in the world (after Rome and Trier). Features caldarium, tepidarium, frigidarium, palaestras, gardens. Destroyed by the Vandals in 439 CE.', era: 'Roman', color: C.roman },
  // CHRISTIAN CARTHAGE
  { year: '180 CE', title: 'First recorded African Christians martyred', detail: 'The Scillitan Martyrs — 12 Christians from Numidia — are executed at Carthage. This is the earliest documented evidence of Christianity in Roman North Africa.', era: 'Christian', color: C.christian },
  { year: 'c. 197 CE', title: 'Tertullian writes at Carthage', detail: 'Tertullian — the first major Christian author to write in Latin — composes his Apology at Carthage. He invents much of the Latin theological vocabulary still used today (including "trinitas" — the Trinity). He later breaks with the Church over questions of discipline.', era: 'Christian', color: C.christian, major: true },
  { year: '203 CE', title: 'Perpetua and Felicitas martyred', detail: 'A young noblewoman (Perpetua) and her slave (Felicitas) are thrown to wild animals in the Carthage amphitheatre under Septimius Severus\' persecution. Perpetua\'s prison diary is one of the earliest surviving texts by a Christian woman. They become two of the most venerated early saints.', era: 'Christian', color: C.christian },
  { year: '311 CE', title: 'Donatist controversy begins', detail: 'The consecration of Caecilian as Bishop of Carthage splits the African Church. The Donatists argue that clergy who surrendered scriptures during persecution are invalid. The schism persists for over a century and defines North African Christianity.', era: 'Christian', color: C.christian },
  { year: '370s–380s CE', title: 'Augustine studies at Carthage', detail: 'The young Augustine of Hippo (later Saint Augustine) attends school in Carthage, takes a concubine, and lives a life he will later describe in the Confessions as dissolute. He writes: "I came to Carthage, where a cauldron of unholy loves sizzled about my ears."', era: 'Christian', color: C.christian, major: true },
  { year: '397 CE', title: 'Council of Carthage — Biblical canon confirmed', detail: 'The Council of Carthage confirms the Biblical canon for the Western Church — the list of books that constitute the Bible as known today. This is one of the most consequential decisions in the history of Christianity, made in Tunisia.', era: 'Christian', color: C.christian, major: true },
  // VANDAL, BYZANTINE, ARAB
  { year: '439 CE', title: 'Vandals capture Carthage', detail: 'The Germanic Vandals under King Gaiseric cross from Spain into Africa and take Carthage. They establish a pirate kingdom, raiding Mediterranean shipping and sacking Rome itself in 455 CE. The Antonine Baths are destroyed. Arian Christians persecute Catholics.', era: 'Vandal', color: C.vandal, major: true },
  { year: '533–534 CE', title: 'Belisarius reconquers for Byzantium', detail: 'The Byzantine general Belisarius arrives with a small army and defeats the Vandals in two battles. Carthage becomes the capital of Byzantine North Africa — the Exarchate of Africa — one of only two western bulwarks of the Eastern Roman Empire (the other being Ravenna).', era: 'Byzantine', color: C.christian },
  { year: '698 CE', title: 'Arab conquest — final destruction', detail: 'The Umayyad Caliphate captures Carthage. The city\'s walls are torn down, its harbours made unusable, and its water supply cut off. The population is relocated to the new city of Tunis, 16 km inland. This is the end of Carthage as a functioning city — 1,500 years after its founding.', era: 'Arab', color: C.arab, major: true },
  // MODERN
  { year: '1830', title: 'European archaeological interest begins', detail: 'Charles X of France sends the Danish consul Christian Tuxen Falbe to survey Carthage. His map becomes the first modern archaeological plan of the site. European powers compete for excavation rights throughout the 19th century.', era: 'Modern', color: C.modern },
  { year: '1921', title: 'Tophet discovered — 20,000 urns', detail: 'Excavation of the sacred precinct (Tophet) uncovers over 20,000 urns containing the cremated remains of children, all younger than four years old. This reignites the ancient debate about whether the Carthaginians practiced child sacrifice to Baal Hammon and Tanit. The controversy remains unresolved.', era: 'Modern', color: C.modern, major: true },
  { year: '1979', title: 'UNESCO World Heritage Site', detail: 'The Archaeological Site of Carthage is inscribed on the UNESCO World Heritage List. UNESCO launches a major international campaign ("Save Carthage") to protect the ruins from encroaching residential development in the wealthy Tunis suburb.', era: 'Modern', color: C.modern, major: true },
  { year: '1985', title: 'Rome and Carthage sign peace treaty', detail: 'The mayors of Rome and Carthage sign a symbolic peace treaty and pact of friendship — 2,131 years after the destruction of 146 BCE. The gesture acknowledges a wound that shaped the Mediterranean.', era: 'Modern', color: C.modern },
]

// ═══════════════════════════════════════════════════
// ARCHAEOLOGICAL SITES (MAPBOX)
// ═══════════════════════════════════════════════════

type Site = {
  name: string; lat: number; lng: number; period: string; description: string; type: 'ruin' | 'empire'
}

// Carthage archaeological sites
const CARTHAGE_SITES: Site[] = [
  { name: 'Byrsa Hill', lat: 36.8529, lng: 10.3217, period: 'Punic / Roman', description: 'The citadel. Temple of Eshmun in Punic times. Roman forum and quarter above. Now: Carthage National Museum and Saint-Louis Cathedral (Acropolium). Panoramic views over the ports and Gulf of Tunis.', type: 'ruin' },
  { name: 'Tophet (Salammbô)', lat: 36.8440, lng: 10.3230, period: 'Punic (8th–2nd c. BCE)', description: 'Sacred precinct to Baal Hammon and Tanit. 20,000+ urns of cremated infants discovered in 1921. Both cemetery and sanctuary. The oldest continuous sacred space in Carthage and the most controversial.', type: 'ruin' },
  { name: 'Punic Ports', lat: 36.8465, lng: 10.3268, period: 'Punic / Roman', description: 'The rectangular commercial harbour and circular military cothon — which could dock 220 warships around a central island. The outlines remain visible. Small museum with models explaining the ingenious design.', type: 'ruin' },
  { name: 'Antonine Baths', lat: 36.8578, lng: 10.3298, period: 'Roman (2nd c. CE)', description: 'Third-largest Roman bath complex in the world. Built under Hadrian, completed under Antoninus Pius. Only foundations and fragments survive. Punic tombs visible in the surrounding garden. Destroyed by Vandals (439 CE).', type: 'ruin' },
  { name: 'Roman Amphitheatre', lat: 36.8600, lng: 10.3115, period: 'Roman', description: 'One of the largest amphitheatres in the Roman Empire. Now only the base remains. This is where Perpetua and Felicitas were martyred in 203 CE.', type: 'ruin' },
  { name: 'Roman Theatre', lat: 36.8555, lng: 10.3202, period: 'Roman (2nd c. CE)', description: 'Capacity of 5,000–10,000 spectators. Magnificently restored and now used for the annual Carthage International Festival. Adjacent Odeon built in the 3rd century.', type: 'ruin' },
  { name: 'Roman Villas (Odeon Hill)', lat: 36.8560, lng: 10.3185, period: 'Roman (2nd c. CE)', description: 'District of luxurious dwellings including the "Villa de la Volière" (Villa of the Aviary) with preserved mosaic floors. Built after a great fire that allowed urban replanning of the hillside.', type: 'ruin' },
  { name: 'La Malga Cisterns', lat: 36.8620, lng: 10.3080, period: 'Roman (2nd c. CE)', description: 'Monumental water cisterns: 816 metres long, 8 metres wide. Capacity 50,000–60,000 m³. Fed by the Zaghouan Aqueduct. Among the best-preserved Roman cisterns anywhere.', type: 'ruin' },
  { name: 'Damous El Karita Basilica', lat: 36.8585, lng: 10.3120, period: 'Christian (4th–5th c. CE)', description: 'One of the largest Christian basilicas in North Africa. Associated with the councils that shaped Western Christianity. An underground chapel (rotunda) is preserved below.', type: 'ruin' },
]

// Empire reach — key Carthaginian/Phoenician settlements
const EMPIRE_SITES: Site[] = [
  { name: 'Tyre', lat: 33.27, lng: 35.19, period: 'Mother city', description: 'Phoenician city in modern Lebanon. Founded Carthage c. 814 BCE. Fell to Alexander the Great in 332 BCE.', type: 'empire' },
  { name: 'Utica', lat: 37.06, lng: 10.06, period: 'Pre-Carthaginian', description: 'Oldest Phoenician colony in North Africa. Predates Carthage by perhaps half a century. Allied with Rome during the Third Punic War.', type: 'empire' },
  { name: 'Hadrumetum (Sousse)', lat: 35.83, lng: 10.60, period: 'Punic colony', description: 'Major Carthaginian port. Modern Sousse, Tunisia. Important naval base during the Punic Wars.', type: 'empire' },
  { name: 'Leptis Magna', lat: 32.64, lng: 14.29, period: 'Punic / Roman', description: 'Phoenician colony in modern Libya. Became one of the greatest Roman cities. Birthplace of Emperor Septimius Severus.', type: 'empire' },
  { name: 'Lixus', lat: 35.20, lng: -6.11, period: 'Phoenician', description: 'Near modern Larache, Morocco. One of the most ancient Phoenician settlements in the western Mediterranean. Hanno the Navigator sailed from here.', type: 'empire' },
  { name: 'Mogador (Essaouira)', lat: 31.51, lng: -9.77, period: 'Phoenician / Punic', description: 'Atlantic outpost in modern Morocco. Founded by Hanno. The furthest permanent Carthaginian settlement — a trading post for gold and purple dye.', type: 'empire' },
  { name: 'Gadir (Cádiz)', lat: 36.53, lng: -6.29, period: 'Phoenician (c. 1100 BCE)', description: 'Among the oldest cities in Western Europe. Founded by Tyre, later controlled by Carthage. Gateway to Atlantic trade and Iberian silver mines.', type: 'empire' },
  { name: 'Carthago Nova (Cartagena)', lat: 37.60, lng: -0.98, period: 'Punic (228 BCE)', description: 'Founded by Hasdrubal the Fair as the Barcid capital in Spain. Silver mines funded Carthage\'s military revival. Captured by Scipio Africanus in 209 BCE.', type: 'empire' },
  { name: 'Panormus (Palermo)', lat: 38.12, lng: 13.36, period: 'Phoenician / Punic', description: 'Key Carthaginian stronghold in western Sicily. Captured by Rome in 254 BCE during the First Punic War.', type: 'empire' },
  { name: 'Motya', lat: 37.87, lng: 12.47, period: 'Phoenician (8th c. BCE)', description: 'Island fortress off western Sicily. Major Punic city destroyed by Syracuse in 397 BCE. Survivors founded Lilybaeum (Marsala).', type: 'empire' },
  { name: 'Ibiza', lat: 38.91, lng: 1.43, period: 'Punic (654 BCE)', description: 'First recorded independent Carthaginian colony. The Punic necropolis of Puig des Molins is a UNESCO World Heritage Site.', type: 'empire' },
]

// ═══════════════════════════════════════════════════
// MAP COMPONENT
// ═══════════════════════════════════════════════════

function CarthageMap() {
  const mapContainer = useRef<HTMLDivElement>(null)
  const mapRef = useRef<any>(null)
  const [layer, setLayer] = useState<'carthage' | 'empire'>('carthage')

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
        center: [10.32, 36.85], zoom: 13.5, minZoom: 3, maxZoom: 17,
      })
      map.addControl(new mapboxgl.default.NavigationControl({ showCompass: false }), 'top-right')
      const markers: any[] = []

      const addMarkers = (sites: Site[]) => {
        markers.forEach(m => m.remove())
        markers.length = 0
        sites.forEach(s => {
          const el = document.createElement('div')
          const isEmpire = s.type === 'empire'
          el.style.cssText = `width:${isEmpire ? 10 : 14}px;height:${isEmpire ? 10 : 14}px;border-radius:50%;background:${isEmpire ? C.punic : C.roman};border:2px solid white;box-shadow:0 1px 4px rgba(0,0,0,0.3);cursor:pointer;`
          const popup = new mapboxgl.default.Popup({ offset: 12, closeButton: false, maxWidth: '280px' })
            .setHTML(`<div style="font-family:system-ui;"><strong style="font-size:13px;">${s.name}</strong><br/><span style="font-size:10px;color:#737373;">${s.period}</span><br/><span style="font-size:11px;margin-top:4px;display:block;">${s.description}</span></div>`)
          const marker = new mapboxgl.default.Marker({ element: el, anchor: 'center' }).setLngLat([s.lng, s.lat]).setPopup(popup).addTo(map)
          markers.push(marker)
        })
      }

      map.on('load', () => addMarkers(CARTHAGE_SITES))

      ;(map as any)._addMarkers = addMarkers
      ;(map as any)._markers = markers
      mapRef.current = map
    })
    return () => { mapRef.current?.remove(); mapRef.current = null }
  }, [])

  const switchLayer = (l: 'carthage' | 'empire') => {
    setLayer(l)
    const map = mapRef.current
    if (!map) return
    if (l === 'carthage') {
      map.flyTo({ center: [10.32, 36.85], zoom: 13.5, duration: 1200 })
      map._addMarkers(CARTHAGE_SITES)
    } else {
      map.flyTo({ center: [8, 37], zoom: 4.2, duration: 1200 })
      map._addMarkers([...CARTHAGE_SITES, ...EMPIRE_SITES])
    }
  }

  return (
    <div>
      <div className="flex gap-2 mb-3">
        <button onClick={() => switchLayer('carthage')}
          className="text-[10px] font-mono px-3 py-1.5 border transition-all"
          style={{ borderColor: layer === 'carthage' ? C.roman : C.border, color: layer === 'carthage' ? C.roman : C.muted, fontWeight: layer === 'carthage' ? 700 : 400 }}>
          Archaeological Sites
        </button>
        <button onClick={() => switchLayer('empire')}
          className="text-[10px] font-mono px-3 py-1.5 border transition-all"
          style={{ borderColor: layer === 'empire' ? C.punic : C.border, color: layer === 'empire' ? C.punic : C.muted, fontWeight: layer === 'empire' ? 700 : 400 }}>
          Carthaginian Empire
        </button>
      </div>
      <div ref={mapContainer} style={{ width: '100%', height: 460, borderRadius: 0, border: `1px solid ${C.border}` }} />
      {!MAPBOX_TOKEN && (
        <p className="text-[11px] p-3" style={{ color: C.muted }}>Map requires NEXT_PUBLIC_MAPBOX_TOKEN environment variable.</p>
      )}
    </div>
  )
}


// ═══════════════════════════════════════════════════
// PAGE
// ═══════════════════════════════════════════════════

export function CarthageContent() {
  const heroR = useReveal()
  const [expandedIdx, setExpandedIdx] = useState<number | null>(null)

  const KEY_NUMBERS = [
    { stat: '814 BCE', label: 'Founded by Dido of Tyre' },
    { stat: '500,000', label: 'Peak population (Punic & Roman)' },
    { stat: '220', label: 'Warships in the military harbour' },
    { stat: '146 BCE', label: 'Destroyed by Rome' },
    { stat: '397 CE', label: 'Biblical canon confirmed here' },
    { stat: '698 CE', label: 'Final destruction — Arab conquest' },
  ]

  return (
    <div className="min-h-screen bg-white" style={{ color: C.ink }}>

      {/* ═══ HERO ═══ */}
      <section className="px-8 md:px-[8%] lg:px-[12%] pt-36 pb-10">
        <p className="text-[10px] font-mono tracking-wider uppercase mb-3" style={{ color: C.muted }}>Module 054 · Archaeological Intelligence</p>
        <div ref={heroR.ref}>
          <h1 className="font-serif text-[clamp(2.5rem,7vw,5rem)] leading-[0.9] tracking-[-0.02em] mb-4 transition-all duration-1000"
            style={{ opacity: heroR.vis ? 1 : 0, transform: heroR.vis ? 'translateY(0)' : 'translateY(20px)' }}>
            <em>Carthage Must<br />Be Destroyed</em>
          </h1>
          <p className="font-serif italic text-[clamp(1rem,2.5vw,1.4rem)] mb-6" style={{ color: C.muted }}>
            The rise and fall and rise and fall of a city that Rome could not forget.
          </p>
          <p className="text-[15px] leading-[1.8] max-w-[620px]" style={{ color: C.text }}>
            Founded by a Phoenician princess on a strip of ox-hide land in 814 BCE. Grew into the
            wealthiest city in the ancient Mediterranean — a naval superpower whose harbour could
            dock 220 warships, whose traders reached West Africa and Britain, and whose agricultural
            knowledge was so advanced that Rome translated its books before burning its libraries.
            Destroyed so completely in 146 BCE that the Romans debated whether to let it exist at all.
            Then rebuilt by Julius Caesar into the second-largest city of the western Roman Empire.
            Then became the intellectual capital of early Christianity — where the Biblical canon
            was confirmed and Augustine came of age. Then conquered by Vandals. Then by Byzantines.
            Then destroyed a final time by Arab armies in 698 CE. Today it is a wealthy residential
            suburb of Tunis with scattered ruins where elephants and senators once walked.
          </p>
        </div>
      </section>

      {/* Key numbers */}
      <section className="px-8 md:px-[8%] lg:px-[12%] pb-10">
        <div className="grid grid-cols-3 md:grid-cols-6 gap-4">
          {KEY_NUMBERS.map((k, i) => {
            const kR = useReveal()
            return (
              <div key={k.label} ref={kR.ref} className="border-t pt-2 transition-all duration-700"
                style={{ borderColor: C.punic, opacity: kR.vis ? 1 : 0, transitionDelay: `${i * 60}ms` }}>
                <p className="font-serif text-[clamp(0.9rem,2vw,1.3rem)] leading-none" style={{ color: C.punic }}>{k.stat}</p>
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
        <h2 className="font-serif text-[clamp(1.8rem,4vw,2.8rem)] mb-2">The Sites</h2>
        <p className="text-[13px] mb-8 max-w-[540px]" style={{ color: C.muted }}>
          Toggle between the archaeological ruins at Carthage (9 sites across a 2 × 2.5 km area,
          now a suburb of Tunis) and the Carthaginian Empire at its peak — colonies from Essaouira
          to Lebanon.
        </p>
        <CarthageMap />
      </section>

      <div className="px-8 md:px-[8%] lg:px-[12%]"><div className="border-t" style={{ borderColor: C.border }} /></div>

      {/* ═══ II. VERTICAL TIMELINE ═══ */}
      <section className="px-8 md:px-[8%] lg:px-[12%] py-16">
        <p className="text-[10px] font-mono tracking-wider uppercase mb-2" style={{ color: C.muted }}>Section II</p>
        <h2 className="font-serif text-[clamp(1.8rem,4vw,2.8rem)] mb-2">The Timeline</h2>
        <p className="text-[13px] mb-10 max-w-[540px]" style={{ color: C.muted }}>
          From Dido's ox-hide to a symbolic peace treaty. {TIMELINE.length} events across 2,800 years.
          Major events are highlighted. Click any event to expand.
        </p>

        <div className="relative ml-4 md:ml-8">
          {/* Vertical line */}
          <div className="absolute left-0 top-0 bottom-0 w-px" style={{ background: C.border }} />

          {TIMELINE.map((ev, i) => {
            const eR = useReveal()
            const isExpanded = expandedIdx === i
            // Era separator
            const prevEra = i > 0 ? TIMELINE[i - 1].era : null
            const showEra = ev.era !== prevEra

            return (
              <div key={i}>
                {showEra && (
                  <div className="relative pl-8 pt-6 pb-2">
                    <div className="absolute left-[-3px] w-[7px] h-[7px] rounded-full" style={{ background: ev.color, top: 28 }} />
                    <p className="text-[9px] font-mono tracking-widest uppercase" style={{ color: ev.color }}>{ev.era}</p>
                  </div>
                )}
                <div ref={eR.ref}
                  className="relative pl-8 py-2 cursor-pointer group transition-all duration-500"
                  style={{ opacity: eR.vis ? 1 : 0, transform: eR.vis ? 'translateX(0)' : 'translateX(-6px)' }}
                  onClick={() => setExpandedIdx(isExpanded ? null : i)}>
                  {/* Dot on the line */}
                  <div className="absolute left-[-4px] top-3 w-[9px] h-[9px] rounded-full border-2 transition-all"
                    style={{ borderColor: ev.color, background: ev.major ? ev.color : 'white' }} />
                  {/* Content */}
                  <div className="flex items-baseline gap-3">
                    <span className="text-[10px] font-mono shrink-0 w-[90px]" style={{ color: ev.color }}>{ev.year}</span>
                    <span className={`text-[13px] ${ev.major ? 'font-semibold' : ''} group-hover:underline`} style={{ color: ev.major ? C.ink : C.text }}>
                      {ev.title}
                    </span>
                  </div>
                  {isExpanded && (
                    <p className="text-[12px] leading-relaxed mt-2 ml-[90px] pr-4 pl-3 border-l-2" style={{ color: C.text, borderColor: ev.color }}>
                      {ev.detail}
                    </p>
                  )}
                </div>
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
            <p className="font-serif text-[18px] mb-2">The Ox-Hide Trick</p>
            <p className="text-[13px] leading-relaxed" style={{ color: C.text }}>
              The founding legend of Carthage is a story about intelligence defeating power.
              Dido asks for "as much land as an ox hide can cover" — a seemingly modest request.
              Then she cuts the hide into strips thin enough to encircle an entire hill. The Phoenicians
              called it Byrsa — which sounds like their word for "citadel" but may also echo the
              Greek byrsa, "ox hide." Whether history or myth, the story encodes the Carthaginian
              identity: wealth through cleverness, empire through trade, victory through the mind.
            </p>
          </div>
          <div>
            <p className="font-serif text-[18px] mb-2">The Missing Library</p>
            <p className="text-[13px] leading-relaxed" style={{ color: C.text }}>
              Almost nothing survives of Carthaginian literature. When Rome destroyed the city
              in 146 BCE, its libraries were either given to Numidian kings or burned. Only one
              work was deliberately preserved: Mago's 28 books on agriculture, translated into
              Latin and Greek because the Romans recognised its superior knowledge. This is the
              paradox of Carthage — a civilisation that contributed serial production, uncoloured
              glass, the threshing board, and the cothon harbour to human progress, known almost
              entirely through the words of the people who destroyed it.
            </p>
          </div>
          <div>
            <p className="font-serif text-[18px] mb-2">The Biblical Canon Was Decided in Tunisia</p>
            <p className="text-[13px] leading-relaxed" style={{ color: C.text }}>
              The Council of Carthage in 397 CE confirmed which books constitute the Bible as
              the Western Church knows it. Tertullian invented the Latin word for the Trinity
              here. Perpetua wrote one of the earliest women's texts in Christendom in a Carthaginian
              prison. Augustine — arguably the most influential Christian thinker after Paul —
              came of age in this city. North Africa was not peripheral to Christianity. It was
              the intellectual engine.
            </p>
          </div>
        </div>
      </section>

      <div className="px-8 md:px-[8%] lg:px-[12%]"><div className="border-t" style={{ borderColor: C.border }} /></div>

      {/* ═══ SOURCES ═══ */}
      <section style={{ backgroundColor: '#1f1f1f' }} className="px-8 md:px-[8%] lg:px-[12%] py-16">
        <p className="text-[10px] font-mono tracking-wider uppercase mb-4" style={{ color: 'rgba(255,255,255,0.7)' }}>Sources</p>
        <div className="text-[12px] leading-relaxed space-y-2" style={{ color: 'rgba(255,255,255,0.7)' }}>
          <p><strong>Foundation & Punic Republic:</strong> Wikipedia, "Ancient Carthage" and "History of Carthage." Britannica, "Carthage." World History Encyclopedia, "Carthage" and "Punic Wars." Livius.org, "Punic Carthage." Foundation date: Timaeus of Taormina (c. 300 BCE) gives 814 BCE; radiocarbon dating in the 1990s confirms last quarter of 9th century BCE. Hanno's voyage: Periplus of Hanno (Greek translation of Punic original). Population estimates: various sources cite 400,000–500,000 at peak for both Punic and Roman Carthage.</p>
          <p><strong>Punic Wars:</strong> Polybius, <em>The Histories</em> (primary source). Britannica, "Punic Wars" and "Third Punic War." HISTORY.com, "Punic Wars." Battle of Cannae casualties: estimates vary from 48,000 to 70,000 Roman dead. "Carthago delenda est": attributed to Cato the Elder, reported by Plutarch and Pliny. 146 BCE destruction: Appian, <em>Roman History</em>. Salt myth: no ancient source supports it; first attested 1863.</p>
          <p><strong>Roman & Christian Carthage:</strong> Wikipedia, "Roman Carthage." Caesar refounding: 49–44 BCE, Colonia Julia Concordia Carthago. Second-largest city: widely cited. Tertullian: "Apology" (c. 197 CE). Perpetua: <em>Passio Sanctarum Perpetuae et Felicitatis</em> (203 CE). Council of Carthage (397 CE): confirmation of Biblical canon per Augustine's influence. Augustine quote "cauldron of unholy loves": <em>Confessions</em>, Book 3.</p>
          <p><strong>Vandal to Arab:</strong> Vandal conquest 439 CE: Victor of Vita, <em>Historia Persecutionis</em>. Belisarius reconquest 533–534 CE: Procopius, <em>History of the Wars</em>. Arab conquest 698 CE: final destruction per Wikipedia "Carthage." UNESCO inscription: 1979 (whc.unesco.org/en/list/37). Peace treaty: 1985 per multiple sources.</p>
          <p><strong>Archaeological sites:</strong> UNESCO, "Archaeological Site of Carthage." Africanworldheritagesites.org. Wikipedia, "Archaeological site of Carthage." GPS: 36.8529°N, 10.3217°E (Byrsa Hill). Tophet discovery (1921): 20,000+ urns. Antonine Baths: third-largest in Roman world. La Malga Cisterns: 816m long, 50,000–60,000 m³ capacity.</p>
        </div>
        <p className="text-[11px] mt-6 pt-4 border-t" style={{ borderColor: C.border, color: 'rgba(255,255,255,0.7)' }}>
          © Slow Morocco · slowmorocco.com · All dates approximate before 264 BCE. Carthaginian perspective largely lost due to destruction of archives. This visualisation may not be reproduced without visible attribution.
        </p>
      </section>
    </div>
  )
}
