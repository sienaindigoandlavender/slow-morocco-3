'use client'

import { useState, useEffect, useRef } from 'react'

const C = {
  mosque: '#2D6E4F', palace: '#722F37', gate: '#8B3A3A', fountain: '#1A5276',
  hammam: '#5D3A5E', garden: '#4A6741', tomb: '#5C4033', museum: '#6B5B3E',
  textile: '#8B3A6E', spice: '#C17F28', metal: '#4A5568', leather: '#8B5A2B',
  wood: '#6B4226', dye: '#6A4C93', carpet: '#9B2335', pottery: '#B86B4A',
  ink: '#0a0a0a', text: '#262626', muted: '#737373', border: '#e5e5e5', wall: '#B8705A',
}

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

const GATES = [
  { name: 'Bab Agnaou', period: 'Almohad 1188', note: 'Kasbah entrance — carved stone. Most ornate gate in Marrakech.' },
  { name: 'Bab Doukkala', period: 'Almohad', note: 'Western plains route. Mosque nearby with identical name.' },
  { name: 'Bab Debbagh', period: 'Almoravid', note: "Tanners' gate. Leads to tannery quarter. Smell announces it." },
  { name: 'Bab el-Khemis', period: 'Almoravid', note: 'Thursday market gate. Flea market outside.' },
  { name: 'Bab Aghmat', period: 'Almoravid', note: 'Eastern route gate. Road to the Ourika valley.' },
  { name: 'Bab Aylan', period: 'Almoravid', note: 'Berber tribe gate. Eastern wall.' },
  { name: 'Bab er-Robb', period: 'Almohad', note: '"Grape juice" gate. Southern exit to Taroudant road.' },
  { name: 'Bab el-Makhzen', period: 'Almoravid', note: 'Palace gate. Royal quarter access.' },
  { name: 'Bab el-Jedid', period: 'Modern', note: 'La Mamounia entrance. Tourist gate.' },
  { name: 'Bab Taghzout', period: 'Almoravid', note: 'Sidi Bel Abbes quarter. Northern medina.' },
  { name: 'Bab Nkob', period: 'Modern', note: 'Gueliz connection. Where old city meets new.' },
  { name: 'Bab Laksour', period: 'Post-Almoravid', note: 'Northern entry. Riad di Siena neighbourhood.' },
]

const QUARTERS = [
  'Mouassine', 'Riad Laarous', 'Sidi Bel Abbès', 'Bab Doukkala', 'Kennaria',
  'Dabachi', 'Arset el-Maach', 'Riad Zitoun Jdid', 'Riad Zitoun Kdim',
  'Mellah', 'Kasbah', 'Berrima', 'Laksour', 'Hart Soura', 'Sidi Moussa', 'Azbezt',
]

const SOUKS = [
  { name: 'Souk Semmarine', craft: 'Textile', color: C.textile, note: 'Main covered souk artery. Cloth, clothing, souvenirs.' },
  { name: 'Souk el-Kebir', craft: 'Textile', color: C.textile, note: 'Large textile souk. Bulk fabrics.' },
  { name: 'Souk Attarine', craft: 'Spice', color: C.spice, note: 'Spice market. Cumin pyramids, saffron, ras el hanout.' },
  { name: 'Souk Haddadine', craft: 'Metalwork', color: C.metal, note: 'Blacksmith souk. Lanterns, door knockers.' },
  { name: 'Souk Chouari', craft: 'Wood', color: C.wood, note: 'Woodturners. Cedar and thuya.' },
  { name: 'Souk Cherratine', craft: 'Leather', color: C.leather, note: 'Leather workers. Bags, belts.' },
  { name: 'Souk Sebbaghine', craft: 'Dye', color: C.dye, note: 'Wool dyers. Coloured skeins hanging.' },
  { name: 'Souk des Teinturiers', craft: 'Dye', color: C.dye, note: 'Dyers quarter. Water-intensive.' },
  { name: 'Rahba Kedima', craft: 'Spice', color: C.spice, note: 'Old spice square. Apothecary herbs, potions.' },
  { name: 'Criée Berbère', craft: 'Carpet', color: C.carpet, note: 'Carpet auction. Rugs from Atlas, Sahara, Rif.' },
  { name: 'Souk des Babouches', craft: 'Leather', color: C.leather, note: 'Slipper souk. Hundreds of colours.' },
  { name: 'Souk Zrabi', craft: 'Carpet', color: C.carpet, note: 'Carpet souk. Tribal and city rugs.' },
  { name: 'Souk Siyyaghin', craft: 'Metal', color: C.metal, note: 'Goldsmiths, jewellers. Near Jemaa el-Fna.' },
  { name: 'Kissaria', craft: 'Textile', color: C.textile, note: 'Covered market. The innermost, most precious goods.' },
  { name: 'Souk Fekharine', craft: 'Pottery', color: C.pottery, note: 'Ceramics. Tamegroute green, Fes blue, Safi polychrome.' },
  { name: 'Tanneries', craft: 'Leather', color: C.leather, note: 'Bab Debbagh. Stone vats, pigeon dung. 800-year tradition.' },
]

const LANDMARKS = [
  { name: 'Jemaa el-Fna', type: 'Square', period: 'UNESCO 2001', note: 'Heart of the medina. Storytellers, musicians, food stalls after dark.' },
  { name: 'Bahia Palace', type: 'Palace', period: '1866', note: "Grand Vizier's palace. Zellige, carved cedar, painted ceilings." },
  { name: 'El Badi Palace', type: 'Palace', period: 'Saadian 1578', note: 'Ruins of "The Incomparable." Storks nest on the walls.' },
  { name: 'Royal Palace', type: 'Palace', period: 'Alaouite', note: 'Dar el-Makhzen — still in use. Not open to public.' },
  { name: 'Ben Youssef Medersa', type: 'School', period: 'Saadian 1565', note: 'Largest medersa in Morocco. 130 student rooms.' },
  { name: 'Saadian Tombs', type: 'Tomb', period: 'Saadian 1557', note: 'Hidden for 200 years. Rediscovered 1917.' },
  { name: 'Koubba Almoravid', type: 'Monument', period: 'Almoravid 1117', note: 'Oldest structure in Marrakech.' },
  { name: 'Dar el-Bacha', type: 'Museum', period: '17thC', note: 'Musée des Confluences. Former Glaoui residence.' },
  { name: 'Le Jardin Secret', type: 'Garden', period: 'Saadian/2016', note: 'Restored riad garden. Two garden systems.' },
  { name: 'Lazama Synagogue', type: 'Synagogue', period: '1492', note: 'Slat al-Azama — Mellah. Jewish heritage.' },
  { name: 'Agdal Gardens', type: 'Garden', period: 'Almohad 12thC', note: 'Royal orchards — 400 hectares.' },
]

type Category = 'gates' | 'souks' | 'landmarks'


const MEDINA_ATLAS_MAP_POINTS = [
  { name: 'Fez el Bali', lat: 34.0622, lng: -4.9737, detail: 'Largest car-free urban area. 9,400 alleys. Founded 789.', color: '#722F37' },
  { name: 'Marrakech Medina', lat: 31.6310, lng: -7.9891, detail: 'Djemaa el-Fna. 600 hectares. Almoravid, 1070.', color: '#B8705A' },
  { name: 'Meknès Medina', lat: 33.8935, lng: -5.5547, detail: 'Moulay Ismaïl\'s capital. 40km of walls.', color: '#5C4033' },
  { name: 'Tétouan Medina', lat: 35.5715, lng: -5.3684, detail: 'Andalusian character. White walls. Spanish influence.', color: '#4A6741' },
  { name: 'Essaouira Medina', lat: 31.5125, lng: -9.7700, detail: 'Mogador. Portuguese-Moroccan. Wind city.', color: '#1A5276' },
  { name: 'Chefchaouen', lat: 35.1688, lng: -5.2636, detail: 'The blue city. Rif mountain medina. Founded 1471.', color: '#2D5F8A' },
]
const MAPBOX_TOKEN_MEDINA_ATLAS = process.env.NEXT_PUBLIC_MAPBOX_TOKEN
function MedinaatlasMap() {
  const mapContainer = useRef<HTMLDivElement>(null)
  const mapRef = useRef<mapboxgl.Map | null>(null)
  useEffect(() => {
    if (!mapContainer.current || !MAPBOX_TOKEN_MEDINA_ATLAS || mapRef.current) return
    import('mapbox-gl').then((mapboxgl) => {
      (mapboxgl as typeof mapboxgl & { accessToken: string }).accessToken = MAPBOX_TOKEN_MEDINA_ATLAS!
      const map = new mapboxgl.Map({ container: mapContainer.current!, style: 'mapbox://styles/mapbox/dark-v11', center: [-6.0, 33], zoom: 5.5, attributionControl: false })
      map.addControl(new mapboxgl.NavigationControl(), 'top-right')
      mapRef.current = map
      map.on('load', () => {
        MEDINA_ATLAS_MAP_POINTS.forEach(p => {
          const el = document.createElement('div')
          el.style.cssText = `width:14px;height:14px;border-radius:50%;background:${p.color};border:2px solid rgba(255,255,255,0.8);cursor:pointer;transition:transform 0.2s;box-shadow:0 0 10px ${p.color}55;`
          el.addEventListener('mouseenter', () => { el.style.transform = 'scale(1.4)' })
          el.addEventListener('mouseleave', () => { el.style.transform = 'scale(1)' })
          el.addEventListener('click', () => { map.flyTo({ center: [p.lng, p.lat], zoom: 8, duration: 1200 }) })
          new mapboxgl.Marker({ element: el }).setLngLat([p.lng, p.lat])
            .setPopup(new mapboxgl.Popup({ offset: 14, closeButton: false, maxWidth: '220px' })
              .setHTML(`<div style="font-family:monospace;padding:4px 0"><p style="font-size:15px;font-weight:600;margin:0 0 4px;color:#f5f5f5">${p.name}</p><p style="font-size:12px;color:#aaa;margin:0;line-height:1.4">${p.detail}</p></div>`))
            .addTo(map)
        })
      })
    })
    return () => { mapRef.current?.remove(); mapRef.current = null }
  }, [])
  return <div ref={mapContainer} className="w-full" style={{ height: '480px', background: '#0a0a0a' }} />
}

export function MedinaAtlasContent() {
  const heroR = useReveal()
  const numsR = useReveal()
  const [tab, setTab] = useState<Category>('landmarks')

  return (
    <div className="min-h-screen bg-white" style={{ color: C.ink }}>
      <section className="px-8 md:px-[8%] lg:px-[12%] pt-36 pb-16">
        <p className="micro-label mb-3" style={{ color: C.muted }}>Spatial Cartography</p>
        <div ref={heroR.ref}>
          <h1 className="font-serif text-[clamp(2.5rem,7vw,4.5rem)] leading-[0.9] tracking-[-0.02em] mb-3 transition-all duration-1000"
            style={{ opacity: heroR.vis ? 1 : 0, transform: heroR.vis ? 'translateY(0)' : 'translateY(20px)' }}>
            <em>The Medina Atlas</em>
          </h1>
          <p className="font-serif italic text-[clamp(1rem,2.5vw,1.5rem)]" style={{ color: C.muted }}>
            Marrakech medina. 600 hectares. Every gate, souk, and landmark.
          </p>
        </div>
        <p className="text-[13px] max-w-[560px] leading-[1.7] mt-6" style={{ color: C.text }}>
          The medina of Marrakech is a walled city within a city — 16 km of ramparts enclosing
          a labyrinth of 400+ dead-end lanes, 16 quarters, 18 souks, 12 gates, and thousands of
          <span className="underline underline-offset-2 hover:text-[#0a0a0a] transition-colors">courtyard house</span>s. Founded by the <span className="underline underline-offset-2 hover:text-[#0a0a0a] transition-colors">Almoravid</span>s around 1070, expanded by the Almohads,
          embellished by the Saadians, it is a UNESCO World Heritage Site and the most visited
          medina in Morocco.
        </p>

        <div ref={numsR.ref} className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-8">
          {[
            { v: '12', l: 'gates (Bab)', c: C.gate },
            { v: '16', l: 'quarters', c: C.wall },
            { v: '18', l: 'named souks', c: C.spice },
            { v: '16 km', l: 'of ramparts', c: C.wall },
          ].map((n, i) => (
            <div key={n.l} className="transition-all duration-700"
              style={{ opacity: numsR.vis ? 1 : 0, transitionDelay: `${i * 120}ms` }}>
              <p className="font-mono text-[28px] font-bold" style={{ color: n.c }}>{n.v}</p>
              <p className="font-mono text-[11px]" style={{ color: C.muted }}>{n.l}</p>
            </div>
          ))}
        </div>
      </section>

      {/* TABBED INVENTORY */}
      <section className="px-8 md:px-[8%] lg:px-[12%] py-8">
        <div className="border-t pt-6" style={{ borderColor: C.border }}>
          <div className="flex gap-3 mb-6">
            {([
              { key: 'landmarks', label: `Landmarks (${LANDMARKS.length})`, c: C.palace },
              { key: 'gates', label: `Gates (${GATES.length})`, c: C.gate },
              { key: 'souks', label: `Souks (${SOUKS.length})`, c: C.spice },
            ] as const).map(t => (
              <button key={t.key} onClick={() => setTab(t.key)}
                className="font-mono text-[11px] px-4 py-1.5 rounded-full border transition-all"
                style={{
                  borderColor: tab === t.key ? t.c : C.border,
                  color: tab === t.key ? t.c : C.muted,
                  background: tab === t.key ? `${t.c}06` : 'transparent',
                }}>
                {t.label}
              </button>
            ))}
          </div>

          {tab === 'landmarks' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {LANDMARKS.map((l, i) => (
                <ItemCard key={l.name} name={l.name} sub={`${l.type} · ${l.period}`} note={l.note} color={C.palace} index={i} />
              ))}
            </div>
          )}

          {tab === 'gates' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {GATES.map((g, i) => (
                <ItemCard key={g.name} name={g.name} sub={g.period} note={g.note} color={C.gate} index={i} />
              ))}
            </div>
          )}

          {tab === 'souks' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {SOUKS.map((s, i) => (
                <ItemCard key={s.name} name={s.name} sub={s.craft} note={s.note} color={s.color} index={i} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* QUARTERS */}
      <section className="px-8 md:px-[8%] lg:px-[12%] py-8">
        <div className="border-t pt-6" style={{ borderColor: C.border }}>
          <p className="micro-label mb-1" style={{ color: C.wall }}>The 16 Quarters</p>
          <p className="font-mono text-[11px] mb-4" style={{ color: C.muted }}>
            Each quarter (hay) is a neighbourhood with its own mosque, fountain, hammam, and bread oven.
          </p>
          <div className="flex flex-wrap gap-2">
            {QUARTERS.map(q => (
              <span key={q} className="font-mono text-[11px] px-3 py-1.5 rounded-full border" style={{ borderColor: C.border, color: C.text }}>{q}</span>
            ))}
          </div>
        </div>
      </section>

      {/* SOUK CRAFT MAP */}
      <section className="px-8 md:px-[8%] lg:px-[12%] py-8">
        <div className="border-t pt-6" style={{ borderColor: C.border }}>
          <p className="micro-label mb-1" style={{ color: C.muted }}>Souk by Craft</p>
          <p className="font-mono text-[11px] mb-4" style={{ color: C.muted }}>
            The souk organises by trade: precious goods near the centre, heavy trades at the edge.
          </p>
          {(() => {
            const crafts = Array.from(new Set(SOUKS.map(s => s.craft)))
            return crafts.map(craft => {
              const items = SOUKS.filter(s => s.craft === craft)
              return (
                <div key={craft} className="flex items-center gap-3 mb-2">
                  <span className="font-mono text-[11px] font-semibold w-20 shrink-0" style={{ color: items[0].color }}>{craft}</span>
                  <div className="flex-1 flex gap-1 flex-wrap">
                    {items.map(s => (
                      <span key={s.name} className="font-mono text-[10px] px-2 py-0.5 rounded-full" style={{ background: `${s.color}08`, color: s.color, border: `1px solid ${s.color}20` }}>
                        {s.name.replace('Souk ', '').replace('des ', '')}
                      </span>
                    ))}
                  </div>
                  <span className="font-mono text-[10px] w-4 text-right" style={{ color: C.muted }}>{items.length}</span>
                </div>
              )
            })
          })()}
        </div>
      </section>


      {/* ═══ MAP ═══ */}
      <section style={{ background: '#0a0a0a' }}><div className="px-8 md:px-[8%] lg:px-[12%] py-16 md:py-24">
        <p className="text-[11px] uppercase tracking-[0.12em] mb-4" style={{ color: 'rgba(255,255,255,0.7)' }}>The Medinas — Mapped</p>
        <MedinaatlasMap />
      </div></section>

{/* CLOSING + SOURCES */}
      <section style={{ backgroundColor: '#1f1f1f' }} className="px-8 md:px-[8%] lg:px-[12%] py-12">
        <div className="border-t pt-8 max-w-[560px]" style={{ borderColor: 'rgba(255,255,255,0.15)' }}>
          <p className="font-serif italic text-[20px] leading-[1.4]" style={{ color: C.ink }}>
            The medina is not a maze — it is a system. The Koutoubia minaret is the
            compass point. The gates are the ports. The souks are organised by trade,
            not chance. The dead-end lanes are security, not confusion. Every element
            has a logic. You just need to learn the grammar.
          </p>
        </div>
        <div className="border-t mt-8 pt-4" style={{ borderColor: 'rgba(255,255,255,0.15)' }}>
          <p className="micro-label mb-2" style={{ color: 'rgba(255,255,255,0.7)' }}>Sources</p>
          <p className="text-[11px] leading-[1.6] max-w-[640px]" style={{ color: 'rgba(255,255,255,0.7)' }}>
            Spatial data from UNESCO World Heritage nomination file (1985), Wilbaux (2001)
            &ldquo;La Médina de Marrakech,&rdquo; and ADER-Fès/Marrakech rehabilitation surveys.
            Gate periods from Deverdun (1959) &ldquo;Marrakech.&rdquo; Souk inventory from
            Ministry of Artisanat craft census. Landmark dates from individual monument records.
          </p>
          <p className="font-mono text-[11px] mt-4" style={{ color: C.wall }}>&copy; Slow Morocco</p>
        </div>
      </section>
    </div>
  )
}

function ItemCard({ name, sub, note, color, index }: { name: string; sub: string; note: string; color: string; index: number }) {
  const [expanded, setExpanded] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  const [vis, setVis] = useState(false)
  useEffect(() => {
    const el = ref.current; if (!el) return
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVis(true); obs.disconnect() } }, { threshold: 0.05 })
    obs.observe(el); return () => obs.disconnect()
  }, [])

  return (
    <div ref={ref} className="border rounded-sm p-3 cursor-pointer transition-all duration-500"
      style={{ borderColor: expanded ? color : C.border, opacity: vis ? 1 : 0, transitionDelay: `${index * 30}ms` }}
      onClick={() => setExpanded(!expanded)}>
      <div className="flex items-center gap-2">
        <div className="w-2 h-6 rounded-sm shrink-0" style={{ background: color }} />
        <div className="flex-1">
          <p className="font-mono text-[12px] font-semibold" style={{ color: C.ink }}>{name}</p>
          <p className="font-mono text-[10px]" style={{ color }}>{sub}</p>
        </div>
      </div>
      {expanded && <p className="font-mono text-[11px] mt-2 leading-[1.6]" style={{ color: C.text }}>{note}</p>}
    </div>
  )
}
