'use client'

import { useState, useEffect, useRef } from 'react'

const MAPBOX_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_TOKEN

const C = {
  wall: '#B85C38', almoravid: '#8B3A3A', almohad: '#C17F28', saadian: '#6B5B3A',
  kasbah: '#5D4E7A', modern: '#737373',
  ink: '#1a1a1a', text: '#3a3a3a', muted: '#8c8c8c', border: '#e0e0e0',
}

// ═══ DYNASTY COLORS ═══
type Era = 'almoravid' | 'almohad' | 'saadian' | 'alaouite' | 'modern' | 'destroyed'
const ERA_LABEL: Record<Era, string> = {
  almoravid: 'Almoravid (1126)', almohad: 'Almohad (1147–1190s)',
  saadian: 'Saadian (16th c.)', alaouite: 'Alaouite (17th–18th c.)',
  modern: 'Modern (19th–20th c.)', destroyed: 'Destroyed / Lost',
}
const ERA_COLOR: Record<Era, string> = {
  almoravid: C.almoravid, almohad: C.almohad, saadian: C.saadian,
  alaouite: '#2D6E4F', modern: C.modern, destroyed: '#aaa',
}

// ═══ THE GATES ═══
interface Gate {
  name: string; arabic: string; meaning: string; era: Era
  lat: number; lng: number; facing: string
  story: string; architecture: string; status: string
  zone: 'medina' | 'kasbah'
}

const GATES: Gate[] = [
  // ═══ MEDINA GATES — counterclockwise from southeast ═══
  {
    name: 'Bab Aghmat', arabic: 'باب أغمات', meaning: 'Gate of Aghmat (ancient city near Ourika)',
    era: 'almoravid', lat: 31.6148, lng: -7.9758, facing: 'Southeast',
    story: 'Named after the Almoravid capital before Marrakech was founded. The road through this gate leads to Aghmat, 32km away in Berber country, where the last Almoravid rulers are buried. The Almohads entered Marrakech through this gate in 1147, ending one dynasty and beginning another. One of the Seven Saints — Sidi Yusuf ibn Ali — is buried in a zawiya just outside.',
    architecture: 'Two large ancient arches. Has survived multiple eras. The gate opens to the Bouskri neighborhood and the corner of Sidi Mohamed Ben Saleh.',
    status: 'Standing. Active traffic gate.', zone: 'medina',
  },
  {
    name: 'Bab Aylan', arabic: 'باب أيلان', meaning: 'Gate of the Aylan (Berber tribe)',
    era: 'almoravid', lat: 31.6295, lng: -7.9790, facing: 'East',
    story: 'Named after a Berber people. One of the oldest gates, built during the original Almoravid wall construction of 1126. Recognizable by its bent (elbow) form — the passage turns before exiting, a defensive design forcing attackers to slow down. Qadi Iyyad, one of the Seven Saints, is buried nearby.',
    architecture: 'Distinctive bent passage (chicane). Almoravid military engineering at its most practical. The turn slows cavalry charges.',
    status: 'Standing. Heavily used.', zone: 'medina',
  },
  {
    name: 'Bab Debbagh', arabic: 'باب الدباغ', meaning: 'Gate of the Tanners',
    era: 'almoravid', lat: 31.6355, lng: -7.9770, facing: 'Northeast',
    story: 'The most complex gate in the city. Named for the tanneries that have operated here since the Almoravid period — nearly 900 years. The passage bends five times in an almost S-shaped path through two open-air courts and one covered chamber. Designed to make breach impossible.',
    architecture: 'Five successive turns. Two open-air courtyards. One vaulted interior chamber. The most layered defensive gate in Marrakech. Still smells of the tanneries.',
    status: 'Standing. Major tourist landmark.', zone: 'medina',
  },
  {
    name: 'Bab el-Khemis', arabic: 'باب الخميس', meaning: 'Thursday Gate (market day)',
    era: 'almoravid', lat: 31.6430, lng: -7.9865, facing: 'North',
    story: 'Named for the Thursday souk held outside. The structure shows Andalusian influence. One of the first gates built with the original wall. The Seven Saints pilgrimage passes through this area on Thursday — the day of Sidi Bel Abbes.',
    architecture: 'Andalusian-influenced structure. The northern face of the city walls is among the best preserved.',
    status: 'Standing. Flea market operates outside.', zone: 'medina',
  },
  {
    name: 'Bab Taghzout', arabic: 'باب تاغزوت', meaning: 'Gate of Taghzout',
    era: 'almoravid', lat: 31.6380, lng: -7.9910, facing: 'North-northwest',
    story: 'The gateway to the zawiya quarter of Sidi Bel Abbes, patron saint of Marrakech. The neighborhood beyond this gate was originally outside the city walls — built around the saint\'s tomb, it grew until the walls were extended to embrace it. Behind this gate, the medina feels different: quieter, more devotional, less touristic.',
    architecture: 'Gateway between the commercial medina and the spiritual northern quarter.',
    status: 'Standing. Gateway to Sidi Bel Abbes quarter.', zone: 'medina',
  },
  {
    name: 'Bab Moussoufa', arabic: 'باب موسوفة', meaning: 'Gate of Moussoufa (unknown reference)',
    era: 'almoravid', lat: 31.6375, lng: -7.9980, facing: 'Northwest',
    story: 'One of the twelve original Almoravid gates. Less prominent than Bab Doukkala but part of the same northwestern defensive face. The name\'s origin is debated — possibly referring to a Berber tribal group.',
    architecture: 'Part of the northwestern wall section. Simpler than the major gates.',
    status: 'Standing but minor.', zone: 'medina',
  },
  {
    name: 'Bab Doukkala', arabic: 'باب دكالة', meaning: 'Gate of the Doukkala (Atlantic plains tribe)',
    era: 'almohad', lat: 31.6350, lng: -8.0050, facing: 'West',
    story: ' Named for the Doukkala and Chaouia plains — caravans from the Atlantic coast entered through here. Two massive flanking towers with a corridor between them. The Bab Doukkala Mosque is just inside. In 2005, the Place des Sept Saints monument was erected outside — seven towers commemorating the Seven Saints, standing without signage.',
    architecture: 'Two large square towers. Wide passage. One of the best-preserved defensive gate complexes. The bus station nearby makes it the first gate many visitors see.',
    status: 'Standing. Major entry point. Seven Saints monument outside.', zone: 'medina',
  },
  {
    name: 'Bab ar-Raha', arabic: 'باب الراحة', meaning: 'Gate of Rest / Gate of the Mill',
    era: 'almoravid', lat: 31.6310, lng: -8.0060, facing: 'West',
    story: 'One of the twelve original gates. Located on the western face between Bab Doukkala and Bab al-Makhzen. Less documented than the major gates but part of the continuous western defensive line.',
    architecture: 'Part of the western wall face. The western walls are among the best preserved sections.',
    status: 'Standing.', zone: 'medina',
  },
  {
    name: 'Bab al-Makhzen', arabic: 'باب المخزن', meaning: 'Gate of the Treasury / Government Gate',
    era: 'almoravid', lat: 31.6270, lng: -8.0070, facing: 'West',
    story: 'The gate of royal authority. Al-Makhzen refers to the central government — the state apparatus. This gate may correspond to the western entrance of the original Almoravid citadel, the Ksar al-Hajjar ("Palace of Stone"), which stood near the site of the Koutoubia Mosque.',
    architecture: 'Western face. Connected to the original Almoravid royal quarter.',
    status: 'Standing.', zone: 'medina',
  },
  {
    name: 'Bab el-Jedid', arabic: 'باب الجديد', meaning: 'The New Gate',
    era: 'modern', lat: 31.6230, lng: -8.0050, facing: 'West-southwest',
    story: 'The busiest gate today. Located between the legendary La Mamounia hotel and the Hivernage district. "Jedid" means "new" — it was cut through the walls later to ease modern traffic flow. The gateway between the old city and the French-built new town.',
    architecture: 'Modern opening. Wide enough for vehicle traffic. Functional rather than defensive.',
    status: 'Standing. Busiest gate in the city.', zone: 'medina',
  },
  {
    name: 'Bab er-Robb', arabic: 'باب الروب', meaning: 'Gate of Grape Juice',
    era: 'almohad', lat: 31.6165, lng: -7.9960, facing: 'South-southwest',
    story: 'Named for a fermented fig-and-berry drink (robb) that was popular with the Almohads. When religious scholars issued a fatwa declaring it forbidden, merchants sold it secretly just outside this gate — beyond the city\'s jurisdiction. The name stuck. The tomb of Imam al-Suhayli, last stop of the Seven Saints pilgrimage, is in the cemetery just outside.',
    architecture: 'Ochre-red coloring. Gateway to the cemetery district and the southwestern approach to the Kasbah.',
    status: 'Standing. Entry to Kasbah area.', zone: 'medina',
  },
  {
    name: 'Bab as-Saliha', arabic: 'باب الصالحة', meaning: 'Gate of the Garden of Saliha',
    era: 'almoravid', lat: 31.6150, lng: -7.9900, facing: 'South',
    story: 'Named after the Garden of Saliha, a green area south of the Almoravid city. One of the original twelve gates. It survived the medieval era but disappeared at some point for unknown reasons. The neighborhood around it was called Houma al-Saliha under Caliph Abu Yaqub Yusuf.',
    architecture: 'Original form lost.',
    status: 'Destroyed. Location approximate.', zone: 'medina',
  },

  // ═══ KASBAH GATES ═══
  {
    name: 'Bab Agnaou', arabic: 'باب أكناو', meaning: '"Gate of the Hornless Ram" / "Gate of the Gnawa"',
    era: 'almohad', lat: 31.6185, lng: -7.9935, facing: 'Interior (medina → Kasbah)',
    story: 'The most beautiful gate in Marrakech. Built circa 1188 by the Almohad caliph Yaqub al-Mansur as the ceremonial entrance to the royal Kasbah. The name "agnaou" is Amazigh — variously translated as "mutes," "hornless ram," or "Black people" (Gnawa). Originally flanked by two bastion towers with a bent interior passage, like Bab er-Rouah in Rabat. The towers have disappeared but the exquisite stone-carved decoration survives: a horseshoe arch surrounded by radiating bands, shell motifs, and a Quranic inscription from Surah al-Hijr in foliated Kufic.',
    architecture: 'Grey-blue Gueliz sandstone, now reddened by centuries of desert wind. Horseshoe arch with alternating decorated bands. Quranic Kufic inscription frieze. The finest surviving Almohad gate decoration in Marrakech.',
    status: 'Standing. UNESCO World Heritage component. Marrakech\'s most photographed gate.', zone: 'kasbah',
  },
  {
    name: 'Bab Berrima', arabic: 'باب بريمة', meaning: 'Gate of Berrima',
    era: 'saadian', lat: 31.6198, lng: -7.9880, facing: 'North (Kasbah → medina)',
    story: 'Gate between the Kasbah and the main medina, at the south end of what is now Place des Ferblantiers (Tinsmiths\' Square). Created during the Saadian period, possibly to allow workers to come and go during the construction of the Badi Palace nearby.',
    architecture: 'Simple arched passage cut through a tower in the Kasbah wall. Functional rather than decorative.',
    status: 'Standing. Active passage to Place des Ferblantiers.', zone: 'kasbah',
  },
  {
    name: 'Bab Ksiba', arabic: 'باب القصيبة', meaning: 'Gate of the Small Fortress',
    era: 'almohad', lat: 31.6150, lng: -7.9935, facing: 'South (toward Agdal Gardens)',
    story: 'Southern gate of the Kasbah opening toward the Agdal Gardens and the countryside beyond. Named for a small fortress (qsiba) near its location. The Mechouar (royal ceremonial ground) is nearby.',
    architecture: 'Kasbah southern approach. Connects the palatial district to the gardens.',
    status: 'Standing.', zone: 'kasbah',
  },
  {
    name: 'Bab Ahmar', arabic: 'باب أحمر', meaning: 'The Red Gate',
    era: 'alaouite', lat: 31.6120, lng: -7.9870, facing: 'Southeast (Kasbah outer)',
    story: 'Located south of the Kasbah, on the road toward the Ouled Ahmar tribe. The name literally means "red" — for the rammed-earth color of the walls. Part of the Kasbah\'s outer defensive ring.',
    architecture: 'Part of the extended Kasbah perimeter. Southern approach.',
    status: 'Standing.', zone: 'kasbah',
  },
  {
    name: 'Bab Ighli', arabic: 'باب إغلي', meaning: 'Gate of Ighli',
    era: 'alaouite', lat: 31.6130, lng: -7.9920, facing: 'South-southwest',
    story: 'Outer Kasbah gate on the southwestern approach. Gives access to the Agdal Gardens and the modern Bab Ighli neighborhood that has grown outside the walls.',
    architecture: 'Part of the Kasbah perimeter wall system.',
    status: 'Standing. Neighborhood named after it.', zone: 'kasbah',
  },
  {
    name: 'Bab Nkob', arabic: 'باب النقوب', meaning: 'Gate of the Holes / Tunnels',
    era: 'alaouite', lat: 31.6140, lng: -7.9850, facing: 'East (Kasbah outer)',
    story: 'Eastern outer gate of the Kasbah. The name may refer to irrigation channels or underground passages in the area. Part of the complex water management system that fed the royal gardens and palaces.',
    architecture: 'Part of the Kasbah outer wall. Connected to the Agdal irrigation network.',
    status: 'Standing.', zone: 'kasbah',
  },
  {
    name: 'Bab al-Bustan', arabic: 'باب البستان', meaning: 'Gate of the Garden',
    era: 'almohad', lat: 31.6100, lng: -7.9910, facing: 'South (Kasbah → Agdal)',
    story: 'The gate between the palace district and the Agdal Gardens to the south. Historian Deverdun believed it may correspond to the main entrance of the current royal palace. The Agdal — 400 hectares of orchards and olive groves — was created in 1156 by the Almohads as a royal pleasure garden and water reservoir.',
    architecture: 'May correspond to the current Dar al-Makhzen entrance. Connected the palace directly to its gardens.',
    status: 'Modified. Location incorporated into royal palace complex.', zone: 'kasbah',
  },
]

// ═══ WALL PERIMETER (approximate medina wall trace) ═══
const WALL_COORDS: [number, number][] = [
  [-7.9758, 31.6148], // Bab Aghmat SE
  [-7.9770, 31.6250], // east face
  [-7.9770, 31.6355], // Bab Debbagh NE
  [-7.9865, 31.6430], // Bab el-Khemis N
  [-7.9910, 31.6380], // Bab Taghzout NW
  [-7.9980, 31.6375], // Bab Moussoufa
  [-8.0050, 31.6350], // Bab Doukkala W
  [-8.0060, 31.6310], // Bab ar-Raha
  [-8.0070, 31.6270], // Bab al-Makhzen
  [-8.0050, 31.6230], // Bab el-Jedid
  [-7.9960, 31.6165], // Bab er-Robb SW
  [-7.9935, 31.6150], // south
  [-7.9900, 31.6148], // Bab as-Saliha (destroyed)
  [-7.9758, 31.6148], // close loop back to Aghmat
]

function useReveal(threshold = 0.1) {
  const ref = useRef<HTMLDivElement>(null)
  const [vis, setVis] = useState(false)
  useEffect(() => {
    const el = ref.current; if (!el) return
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVis(true); obs.disconnect() } }, { threshold })
    obs.observe(el); return () => obs.disconnect()
  }, [threshold])
  return { ref, vis }
}

// ═══ MAP ═══
function GatesMap({ selected, onSelect, filter }: {
  selected: number | null; onSelect: (i: number) => void; filter: Era | null
}) {
  const mapContainer = useRef<HTMLDivElement>(null)
  const map = useRef<mapboxgl.Map | null>(null)
  const markersRef = useRef<mapboxgl.Marker[]>([])

  useEffect(() => {
    if (!mapContainer.current || !MAPBOX_TOKEN) return
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const mapboxgl = (window as any).mapboxgl
    if (!mapboxgl) return

    const m = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/light-v11',
      center: [-7.993, 31.627],
      zoom: 13.6,
      accessToken: MAPBOX_TOKEN,
      attributionControl: false,
      pitch: 15,
    })
    m.addControl(new mapboxgl.NavigationControl(), 'top-right')
    m.addControl(new mapboxgl.AttributionControl({ compact: true }), 'bottom-right')

    m.on('load', () => {
      // Wall perimeter
      m.addSource('walls', {
        type: 'geojson',
        data: { type: 'Feature', properties: {}, geometry: { type: 'LineString', coordinates: WALL_COORDS } }
      })
      m.addLayer({
        id: 'wall-line', type: 'line', source: 'walls',
        paint: { 'line-color': C.wall, 'line-width': 3, 'line-opacity': 0.6 }
      })
      // Wall glow
      m.addLayer({
        id: 'wall-glow', type: 'line', source: 'walls',
        paint: { 'line-color': C.wall, 'line-width': 10, 'line-opacity': 0.1, 'line-blur': 6 }
      })

      // Gate markers
      GATES.forEach((g, i) => {
        const el = document.createElement('div')
        const color = ERA_COLOR[g.era]
        const size = g.name === 'Bab Agnaou' || g.name === 'Bab Doukkala' || g.name === 'Bab Debbagh' ? 16 : g.era === 'destroyed' ? 8 : 12
        el.style.cssText = `
          width:${size}px;height:${size}px;
          background:${g.era === 'destroyed' ? 'transparent' : color};
          border:2px solid ${color};
          border-radius:${g.zone === 'kasbah' ? '2px' : '50%'};
          cursor:pointer;transition:all 0.3s;
          box-shadow:0 1px 4px rgba(0,0,0,0.2);
          opacity:${g.era === 'destroyed' ? 0.5 : 1};
        `
        el.title = g.name
        el.addEventListener('click', () => onSelect(i))
        el.addEventListener('mouseenter', () => { el.style.transform = 'scale(1.5)'; el.style.boxShadow = `0 0 12px ${color}60` })
        el.addEventListener('mouseleave', () => { el.style.transform = 'scale(1)'; el.style.boxShadow = '0 1px 4px rgba(0,0,0,0.2)' })
        const marker = new mapboxgl.Marker({ element: el }).setLngLat([g.lng, g.lat]).addTo(m)
        markersRef.current.push(marker)
      })
    })

    map.current = m
    return () => m.remove()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Filter
  useEffect(() => {
    markersRef.current.forEach((marker, i) => {
      const el = marker.getElement()
      const g = GATES[i]
      const visible = !filter || g.era === filter
      el.style.opacity = visible ? (g.era === 'destroyed' ? '0.5' : '1') : '0.15'
    })
  }, [filter])

  // Fly to
  useEffect(() => {
    if (selected !== null && map.current) {
      const g = GATES[selected]
      map.current.flyTo({ center: [g.lng, g.lat], zoom: 16, duration: 1000 })
      markersRef.current.forEach((marker, i) => {
        const el = marker.getElement()
        el.style.transform = i === selected ? 'scale(1.8)' : 'scale(1)'
      })
    }
  }, [selected])

  return <div ref={mapContainer} className="w-full rounded-sm" style={{ height: '540px' }} />
}

// ═══ PAGE ═══
export function GatesOfMarrakechContent() {
  const [selected, setSelected] = useState<number | null>(null)
  const [filter, setFilter] = useState<Era | null>(null)
  const [mapLoaded, setMapLoaded] = useState(false)
  const heroR = useReveal()
  const mapR = useReveal()
  const listR = useReveal()

  useEffect(() => {
    if (typeof window !== 'undefined' && !document.getElementById('mapbox-gl-gates')) {
      const link = document.createElement('link')
      link.rel = 'stylesheet'
      link.href = 'https://api.mapbox.com/mapbox-gl-js/v3.9.0/mapbox-gl.css'
      document.head.appendChild(link)
      const script = document.createElement('script')
      script.id = 'mapbox-gl-gates'
      script.src = 'https://api.mapbox.com/mapbox-gl-js/v3.9.0/mapbox-gl.js'
      script.onload = () => setMapLoaded(true)
      document.head.appendChild(script)
    } else {
      setMapLoaded(true)
    }
  }, [])

  const selectedGate = selected !== null ? GATES[selected] : null
  const medinaGates = GATES.filter(g => g.zone === 'medina')
  const kasbahGates = GATES.filter(g => g.zone === 'kasbah')

  return (
    <div className="min-h-screen bg-white" style={{ color: C.ink }}>

      {/* ═══ HERO ═══ */}
      <section className="px-8 md:px-[8%] lg:px-[12%] pt-36 pb-16">
        <p className="font-mono text-[10px] uppercase tracking-[0.12em] mb-3" style={{ color: C.muted }}>Module 061 · Urban Archaeology</p>
        <div ref={heroR.ref}>
          <h1 className="font-serif text-[clamp(2.5rem,7vw,4.5rem)] leading-[0.9] tracking-[-0.02em] mb-3 transition-all duration-1000"
            style={{ opacity: heroR.vis ? 1 : 0, transform: heroR.vis ? 'translateY(0)' : 'translateY(20px)' }}>
            <em>The 19 Gates</em>
          </h1>
          <p className="font-serif italic text-[clamp(1rem,2.5vw,1.5rem)]" style={{ color: C.muted }}>
            Every bab in the walls of Marrakech
          </p>
        </div>
        <p className="text-[13px] max-w-[560px] leading-[1.7] mt-6" style={{ color: C.text }}>
          The walls went up in eight months. In 1126, the Almoravid ruler Ali ibn Yusuf
          ordered Marrakech fortified against the Almohad rebels advancing from the High
          Atlas. Workers raised 19 kilometres of rammed earth — clay, lime, limestone,
          reddish from the Gueliz quarries — nine metres high, two metres thick, punctured
          by twelve gates and flanked by two hundred watchtowers. Those walls still stand.
          The city they were built to protect has changed dynasties five times. The gates
          remember all of them.
        </p>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-10">
          {[
            { v: '19', l: 'gates (bab)', c: C.wall },
            { v: '19km', l: 'wall perimeter', c: C.almohad },
            { v: '200', l: 'watchtowers', c: C.almoravid },
            { v: '1126', l: 'year walls built', c: C.muted },
          ].map((n, i) => (
            <div key={i} className="transition-all duration-700" style={{ opacity: heroR.vis ? 1 : 0, transitionDelay: `${i * 120}ms` }}>
              <p className="font-mono leading-none" style={{ color: n.c }}>
                <span className="text-[28px] font-bold">{n.v}</span>
              </p>
              <p className="font-mono text-[10px] mt-1" style={{ color: C.muted }}>{n.l}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ═══ MAP ═══ */}
      <section className="px-8 md:px-[8%] lg:px-[12%] pb-8">
        <div ref={mapR.ref} className="border-t pt-8" style={{ borderColor: C.border }}>
          <div className="flex items-start justify-between mb-4 flex-wrap gap-2">
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.12em]" style={{ color: C.wall }}>The Walls & Gates</p>
              <p className="text-[12px]" style={{ color: C.muted }}>
                Circles = medina gates. Squares = Kasbah gates. Red line = wall perimeter. Click any gate.
              </p>
            </div>
          </div>

          {/* Era filter */}
          <div className="flex flex-wrap gap-1.5 mb-4">
            <button onClick={() => setFilter(null)}
              className="px-3 py-1.5 text-[10px] uppercase tracking-wider font-mono transition-all"
              style={{ background: !filter ? C.ink : 'transparent', color: !filter ? 'white' : C.muted, border: `1px solid ${!filter ? C.ink : C.border}` }}>
              All ({GATES.length})
            </button>
            {(Object.keys(ERA_LABEL) as Era[]).map(era => {
              const count = GATES.filter(g => g.era === era).length
              if (count === 0) return null
              return (
                <button key={era} onClick={() => setFilter(filter === era ? null : era)}
                  className="px-3 py-1.5 text-[10px] tracking-wider font-mono transition-all"
                  style={{
                    background: filter === era ? ERA_COLOR[era] : 'transparent',
                    color: filter === era ? 'white' : ERA_COLOR[era],
                    border: `1px solid ${filter === era ? ERA_COLOR[era] : `${ERA_COLOR[era]}40`}`,
                  }}>
                  {ERA_LABEL[era].split('(')[0].trim()} ({count})
                </button>
              )
            })}
          </div>

          <div className="relative">
            {mapLoaded && <GatesMap selected={selected} onSelect={setSelected} filter={filter} />}

            {selectedGate && (
              <div className="absolute bottom-4 left-4 right-4 md:right-auto md:w-[380px] p-5 bg-white/95 backdrop-blur-sm rounded-sm shadow-lg"
                style={{ borderLeft: `3px solid ${ERA_COLOR[selectedGate.era]}` }}>
                <button onClick={() => setSelected(null)} className="absolute top-3 right-3 text-[11px] hover:opacity-60" style={{ color: C.muted }}>&#x2715;</button>
                <span className="inline-block px-2 py-0.5 text-[9px] uppercase tracking-wider font-mono mb-2"
                  style={{ background: `${ERA_COLOR[selectedGate.era]}15`, color: ERA_COLOR[selectedGate.era] }}>
                  {ERA_LABEL[selectedGate.era]}
                </span>
                <h3 className="font-serif text-[20px] leading-tight">{selectedGate.name}</h3>
                <p className="font-mono text-[12px]" style={{ color: C.muted, direction: 'rtl' }}>{selectedGate.arabic}</p>
                <p className="text-[11px] mt-1" style={{ color: ERA_COLOR[selectedGate.era] }}>{selectedGate.meaning}</p>
                <p className="text-[12px] mt-3 leading-[1.6]" style={{ color: C.text }}>{selectedGate.story}</p>
                <div className="mt-3 pt-3 border-t" style={{ borderColor: C.border }}>
                  <p className="font-mono text-[9px] uppercase tracking-wider mb-1" style={{ color: C.muted }}>Architecture</p>
                  <p className="text-[11px] leading-[1.5]" style={{ color: C.muted }}>{selectedGate.architecture}</p>
                </div>
                <p className="text-[10px] mt-2 italic" style={{ color: C.muted }}>
                  Facing {selectedGate.facing} · {selectedGate.status}
                </p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ═══ GATE LIST ═══ */}
      <section className="px-8 md:px-[8%] lg:px-[12%] py-8">
        <div ref={listR.ref} className="border-t pt-8" style={{ borderColor: C.border }}>

          {/* Medina gates */}
          <p className="font-mono text-[10px] uppercase tracking-[0.12em] mb-4" style={{ color: C.wall }}>Medina Gates ({medinaGates.length})</p>
          <div className="space-y-3 mb-8">
            {medinaGates.map((g, i) => {
              const idx = GATES.indexOf(g)
              return (
                <button key={i} onClick={() => setSelected(idx)}
                  className="w-full text-left flex items-start gap-3 py-2 hover:opacity-80 transition-all"
                  style={{ opacity: listR.vis ? 1 : 0, transitionDelay: `${i * 40}ms`, borderLeft: selected === idx ? `3px solid ${ERA_COLOR[g.era]}` : '3px solid transparent', paddingLeft: '12px' }}>
                  <span className="w-3 h-3 rounded-full mt-1 shrink-0" style={{ background: g.era === 'destroyed' ? 'transparent' : ERA_COLOR[g.era], border: `2px solid ${ERA_COLOR[g.era]}` }} />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-baseline gap-2 flex-wrap">
                      <span className="font-serif text-[15px]">{g.name}</span>
                      <span className="font-mono text-[11px]" style={{ color: C.muted, direction: 'rtl' }}>{g.arabic}</span>
                    </div>
                    <p className="text-[11px]" style={{ color: ERA_COLOR[g.era] }}>{g.meaning}</p>
                    <p className="font-mono text-[9px] mt-0.5" style={{ color: C.muted }}>{ERA_LABEL[g.era]} · {g.facing} · {g.status}</p>
                  </div>
                </button>
              )
            })}
          </div>

          {/* Kasbah gates */}
          <p className="font-mono text-[10px] uppercase tracking-[0.12em] mb-4" style={{ color: C.kasbah }}>Kasbah Gates ({kasbahGates.length})</p>
          <div className="space-y-3">
            {kasbahGates.map((g, i) => {
              const idx = GATES.indexOf(g)
              return (
                <button key={i} onClick={() => setSelected(idx)}
                  className="w-full text-left flex items-start gap-3 py-2 hover:opacity-80 transition-all"
                  style={{ opacity: listR.vis ? 1 : 0, transitionDelay: `${(i + medinaGates.length) * 40}ms`, borderLeft: selected === idx ? `3px solid ${ERA_COLOR[g.era]}` : '3px solid transparent', paddingLeft: '12px' }}>
                  <span className="w-3 h-3 mt-1 shrink-0" style={{ background: g.era === 'destroyed' ? 'transparent' : ERA_COLOR[g.era], border: `2px solid ${ERA_COLOR[g.era]}`, borderRadius: '2px' }} />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-baseline gap-2 flex-wrap">
                      <span className="font-serif text-[15px]">{g.name}</span>
                      <span className="font-mono text-[11px]" style={{ color: C.muted, direction: 'rtl' }}>{g.arabic}</span>
                    </div>
                    <p className="text-[11px]" style={{ color: ERA_COLOR[g.era] }}>{g.meaning}</p>
                    <p className="font-mono text-[9px] mt-0.5" style={{ color: C.muted }}>{ERA_LABEL[g.era]} · {g.facing} · {g.status}</p>
                  </div>
                </button>
              )
            })}
          </div>
        </div>
      </section>

      {/* ═══ SOURCES ═══ */}
      <section style={{ backgroundColor: '#1f1f1f' }} className="px-8 md:px-[8%] lg:px-[12%] py-8 pb-24">
        <div className="border-t pt-6" style={{ borderColor: 'rgba(255,255,255,0.15)' }}>
          <p className="font-mono text-[9px] leading-[1.8]" style={{ color: 'rgba(255,255,255,0.7)' }}>
            Sources: Deverdun, Gaston. <em>Marrakech: des origines à 1912</em>. Éditions Techniques Nord-Africaines, 1959.
            Archnet: &quot;Walls and Gates of Marrakech.&quot;
            Salmon, Georges. &quot;Les Remparts de Marrakech.&quot; <em>Archives Marocaines</em>, Vol. 3, 1905.
            Hillenbrand, Robert. <em>Islamic Architecture</em>. Edinburgh University Press, 1999.
            Parker, Richard. <em>A Practical Guide to Islamic Monuments in Morocco</em>. Baraka Press, 1981.
            Wikipedia: &quot;Walls of Marrakesh,&quot; &quot;Bab Agnaou,&quot; &quot;Zawiya of Sidi Bel Abbes.&quot;
            Coordinates verified via Google Earth, OpenStreetMap, and field observation.
          </p>
          <p className="font-mono text-[9px] mt-3" style={{ color: 'rgba(255,255,255,0.7)' }}>
            © Slow Morocco. All rights reserved. This visualization may not be reproduced without visible attribution.
          </p>
        </div>
      </section>
    </div>
  )
}
